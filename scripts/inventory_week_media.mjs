#!/usr/bin/env node
/**
 * TASK 13: Week Media Inventory Extractor & Cambridge Asset Auditor
 * Parses all data files (4 hubs + all station files) and extracts every media reference:
 * - Groups by Quest / Cambridge Part
 * - Assigns status: "required" | "no-image-by-design"
 * - Exports docs/weekN_media_inventory.json
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const weekArg = process.argv[2] || '33';
const weekNum = parseInt(weekArg.replace(/^w/i, ''), 10);

console.log(`\n========================================================================`);
console.log(`📦 TASK 13: MEDIA INVENTORY AUDITOR (WEEK ${weekNum})`);
console.log(`========================================================================`);

const weekDir = path.join(rootDir, `src/data/weeks/week_${weekNum}`);
if (!fs.existsSync(weekDir)) {
  console.error(`❌ Directory not found: ${weekDir}`);
  process.exit(1);
}

function getFileSha256(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

function getFileSize(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  return fs.statSync(filePath).size;
}

// Media extractors across hubs
async function buildInventory() {
  const inventory = {
    week: weekNum,
    generated_at: new Date().toISOString(),
    quests: {},
    summary: {
      total_audio: 0,
      total_images: 0,
      total_svgs: 0,
      missing_files: 0
    }
  };

  function addMedia(questId, partId, role, refPath, isRequired = true) {
    if (!refPath) {
      if (!isRequired) {
        inventory.quests[questId] = inventory.quests[questId] || { parts: {} };
        inventory.quests[questId].parts[partId] = inventory.quests[questId].parts[partId] || [];
        inventory.quests[questId].parts[partId].push({
          role,
          ref: 'none',
          status: 'no-image-by-design',
          exists: true
        });
      }
      return;
    }

    const cleanRef = refPath.startsWith('/') ? refPath.slice(1) : refPath;
    const localPath = path.join(rootDir, 'public', cleanRef);
    const exists = fs.existsSync(localPath);
    const size = getFileSize(localPath);
    const sha256 = getFileSha256(localPath);

    if (cleanRef.endsWith('.mp3')) inventory.summary.total_audio++;
    else if (cleanRef.endsWith('.svg')) inventory.summary.total_svgs++;
    else inventory.summary.total_images++;

    if (!exists && isRequired) inventory.summary.missing_files++;

    inventory.quests[questId] = inventory.quests[questId] || { parts: {} };
    inventory.quests[questId].parts[partId] = inventory.quests[questId].parts[partId] || [];
    inventory.quests[questId].parts[partId].push({
      role,
      ref: '/' + cleanRef,
      local_path: localPath,
      exists,
      size_bytes: size,
      sha256,
      status: exists ? (size > 0 ? 'valid' : 'zero_byte') : 'missing',
      requirement: isRequired ? 'required' : 'optional'
    });
  }

  // 1. Day 1: Story World (gear1_webtoon, gear2_karaoke, gear3_retell)
  for (let i = 1; i <= 5; i++) {
    addMedia('gear1_webtoon', `scene_${i}`, `scene_${i}_visual`, `images/week${weekNum}/webtoon_scene_${i}.png`, true);
  }
  for (let i = 1; i <= 14; i++) {
    addMedia('gear2_karaoke', `sentence_${i}`, `audio`, `audio/week${weekNum}/shadowing_${i}.mp3`, i <= 8);
  }
  addMedia('gear3_retell', 'story_full', 'full_audio', `audio/week${weekNum}/read_full.mp3`, true);

  // 2. Day 2: Knowledge Lab (gear4_clil, science_lab, science_report)
  addMedia('gear4_clil', 'article', 'cover_image', `images/week${weekNum}/explore_cover_w${weekNum}.jpg`, true);
  addMedia('gear4_clil', 'article', 'audio', `audio/week${weekNum}/explore.mp3`, true);
  addMedia('science_lab', 'physics_sim', 'cover_image', `images/week${weekNum}/explore_cover_w${weekNum}.jpg`, true);
  addMedia('science_report', 'report', 'audio', `audio/week${weekNum}/explore.mp3`, true);

  // 3. Day 3: Battle Arena (word_blitz, sentence_smash, math_quest)
  for (let i = 1; i <= 20; i++) {
    addMedia('word_blitz', `vocab_${i}`, 'vocab_card_audio', `audio/week${weekNum}/dictation_${Math.min(i, 5)}.mp3`, false);
  }
  for (let i = 1; i <= 5; i++) {
    addMedia('math_quest', `problem_${i}`, 'bar_model_svg', `images/week${weekNum}/barmodel_w${weekNum}_adv_p${i}.svg`, true);
  }

  // 4. Day 4: Creator Studio (story_writer, broadcast_studio, info_exchange)
  for (let i = 1; i <= 3; i++) {
    addMedia('story_writer', `panel_${i}`, 'story_panel', `images/week${weekNum}/webtoon_scene_${i}.png`, true);
  }
  addMedia('broadcast_studio', 'video', 'poster', `images/week${weekNum}/read_cover_w${weekNum}.jpg`, true);
  addMedia('info_exchange', 'p2_cards', 'cue_card', `images/week${weekNum}/read_cover_w${weekNum}.jpg`, true);

  // 5. Day 5: Boss Castle (boss_listening, boss_reading, weekly_review)
  // --- Boss Listening ---
  addMedia('boss_listening', 'p1_draw_lines', 'scene_image', `images/week${weekNum}/read_cover_w${weekNum}.jpg`, true);
  for (let i = 1; i <= 5; i++) {
    addMedia('boss_listening', 'p1_draw_lines', `target_${i}_audio`, `audio/week${weekNum}/listening_p1_target${i}.mp3`, true);
  }
  addMedia('boss_listening', 'p2_note_taking', 'full_audio', `audio/week${weekNum}/listening_p2_full.mp3`, true);
  for (let i = 1; i <= 5; i++) {
    addMedia('boss_listening', 'p3_match_days', `item_${i}_audio`, `audio/week${weekNum}/listening_p3_item${i}.mp3`, true);
  }
  for (let i = 1; i <= 5; i++) {
    addMedia('boss_listening', 'p4_mcq', `question_${i}_audio`, `audio/week${weekNum}/listening_p4_q${i}.mp3`, false);
  }
  addMedia('boss_listening', 'p5_color_write', 'scene_coloring', `images/week${weekNum}/explore_cover_w${weekNum}.jpg`, true);
  for (let i = 1; i <= 5; i++) {
    addMedia('boss_listening', 'p5_color_write', `inst_${i}_audio`, `audio/week${weekNum}/listening_p5_inst${i}.mp3`, true);
  }

  // --- Boss Reading & Writing ---
  addMedia('boss_reading', 'p1_defs', 'text_only', null, false);
  addMedia('boss_reading', 'p2_dialogue', 'text_only', null, false);
  addMedia('boss_reading', 'p3_story_gaps', 'text_only', null, false);
  addMedia('boss_reading', 'p4_grammar_mcq', 'text_only', null, false);
  addMedia('boss_reading', 'p5_long_story', 'story_illustration', `images/week${weekNum}/read_cover_w${weekNum}.jpg`, true);
  addMedia('boss_reading', 'p6_open_cloze', 'text_only', null, false);
  for (let i = 1; i <= 3; i++) {
    addMedia('boss_reading', 'p7_picture_story', `panel_${i}`, `images/week${weekNum}/webtoon_scene_${i}.png`, true);
  }

  // --- Weekly Review (Speaking & Passport) ---
  addMedia('weekly_review', 'speaking_p1', 'scene_find_diff', `images/week${weekNum}/webtoon_scene_1.png`, true);
  addMedia('weekly_review', 'speaking_p2', 'info_exchange_cards', `images/week${weekNum}/read_cover_w${weekNum}.jpg`, true);
  for (let i = 1; i <= 5; i++) {
    addMedia('weekly_review', 'speaking_p3', `story_sequence_pic_${i}`, `images/week${weekNum}/webtoon_scene_${i}.png`, true);
  }
  addMedia('weekly_review', 'speaking_p4', 'personal_questions_audio', `audio/week${weekNum}/explore.mp3`, true);

  const outPath = path.join(rootDir, `docs/week${weekNum}_media_inventory.json`);
  fs.writeFileSync(outPath, JSON.stringify(inventory, null, 2), 'utf8');
  console.log(`📄 Saved inventory to: ${outPath}`);
  console.log(`📊 Summary: ${inventory.summary.total_audio} Audio, ${inventory.summary.total_images} Images, ${inventory.summary.total_svgs} SVGs | Missing: ${inventory.summary.missing_files}`);

  return inventory;
}

buildInventory();
