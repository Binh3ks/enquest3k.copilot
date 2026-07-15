#!/usr/bin/env node
/**
 * curate_shadowing_videos.js — Select the best shadowing video per week.
 *
 * Criteria (in priority order):
 *   1. Narrative/story content (not grammar explanations)
 *   2. Has subtitles (story videos usually do)
 *   3. Appropriate duration (90s-10min)
 *   4. Clear speech for kids
 *   5. Topic relevance to week's content
 *
 * Usage:
 *   node tools/curate_shadowing_videos.js              # Preview
 *   node tools/curate_shadowing_videos.js --apply      # Write changes
 *   node tools/curate_shadowing_videos.js --mode easy  # Easy mode
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Scoring ─────────────────────────────────────────────────────

// STRONG signals: PRIORITIZED channels for clean transcripts
const PRIORITY_CHANNELS = [
  'little fox',                  // Animated stories with manual captions
  'english singsing',           // Kids English with clear dialogue
  'super simple songs',         // Simple dialogues
  'fun kids english',           // Vocabulary + dialogue
  'dream english',              // Kids songs with lyrics
  'pinkfong',                   // Songs for kids
  'pinkfong songs for children',
  'tinkerly',                   // Clear narration
  'vooks',                      // Narrated storybooks
  'sci show kids',              // Science with narration
  'peekaboo kidz',              // Educational with clear speech
];

// STRONG signals: these are narrative/story videos — HIGH priority
const STORY_SIGNALS = [
  'story', 'stories', 'fairy tale', 'bedtime', 'long ago',
  'once upon', 'adventure', 'fable', 'legend',
  'little fox', 'peppa pig', 'paw patrol', 'dora',
  'episode', 'chapter', 'part 1', 'part 2',
  'cartoon', 'animation', 'animated',
  'the ant', 'the rabbit', 'the tortoise', 'the hare',
  'a little', 'a big', 'the little',
];

// MEDIUM signals: dialogue-heavy, conversational
const DIALOGUE_SIGNALS = [
  'dialogue', 'conversation', 'talk', 'speaking',
  'daily life', 'everyday', 'morning routine', 'at school',
  'at home', 'at the park', 'at the store',
  'vocabulary chant', 'words for kids', 'kids vocabulary',
  'learn english', 'esl', 'kids english',
  'prepositions', 'action verbs', 'emotions', 'feelings',
  'food', 'animals', 'family', 'clothes', 'weather',
  'colors', 'numbers', 'shapes', 'body parts',
  'town', 'village', 'city', 'country', 'farm',
  'time', 'clock', 'seasons', 'holidays',
];

// NEGATIVE signals: grammar explanation, NOT suitable for shadowing
const NEGATIVE_SIGNALS = [
  'grammar', 'tense', 'past simple', 'present simple',
  'was/were', 'was were', 'did you', 'modal verb',
  'exercise', 'quiz', 'test', 'worksheet',
  'explanation', 'explained', 'how to use',
  '规则', 'bài tập',
];

// Patterns to absolutely reject
const REJECT_PATTERNS = [
  /\bquiz\b/i, /\btest\b/i, /\bworksheet\b/i,
  /\bfull movie\b/i, /\bcompilation\b/i,
  /\blullaby\b/i, /\bnursery rhyme\b/i,
  /\bkaraoke\b/i, /\bminecraft\b/i, /\broblox\b/i,
];

function scoreVideo(video) {
  let score = 50;
  const title = (video.title || '').toLowerCase();
  const dur = video.sim_duration || 0;

  // Reject patterns
  for (const ch of PRIORITY_CHANNELS) {
    if (title.includes(ch)) { score += 40; break; }
  }
  for (const pat of REJECT_PATTERNS) {
    if (pat.test(title)) return -100;
  }

  // Negative signals: grammar videos get penalized heavily
  for (const sig of NEGATIVE_SIGNALS) {
    if (title.includes(sig)) score -= 30;
  }

  // Story signals: HIGH boost
  for (const sig of STORY_SIGNALS) {
    if (title.includes(sig)) score += 20;
  }

  // Dialogue signals: moderate boost
  for (const sig of DIALOGUE_SIGNALS) {
    if (title.includes(sig)) score += 10;
  }

  // Duration scoring
  if (dur >= 90 && dur <= 600) {
    score += 15; // ideal range
  } else if (dur < 60) {
    score -= 20; // too short
  } else if (dur > 600 && dur <= 900) {
    score += 5; // long but OK for stories
  } else {
    score -= 10;
  }

  return score;
}

function parseShadowScript(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const match = raw.match(/script:\s*\[([\s\S]*?)\]/);
    if (!match) return [];
    const entries = [];
    const re = /\{\s*id:\s*\d+\s*,\s*text:\s*"([^"]+)"/g;
    let m;
    while ((m = re.exec(match[1]))) {
      entries.push({ text: m[1] });
    }
    return entries;
  } catch {
    return [];
  }
}

function decodeHtmlEntities(s) {
  return s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function parseDailyWatch(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const videos = [];
    // Split by { id: and extract fields from each block
    const blocks = raw.split(/\{\s*id:/).slice(1);
    for (const b of blocks) {
      const vid = b.match(/videoId:\s*"([^"]+)"/);
      const dur = b.match(/sim_duration:\s*(\d+)/);
      const ttl = b.match(/title:\s*"([^"]+)"/);
      if (vid && dur) {
        videos.push({
          videoId: vid[1],
          sim_duration: parseInt(dur[1]),
          title: ttl ? decodeHtmlEntities(ttl[1]) : '',
        });
      }
    }
    return videos;
  } catch {
    return [];
  }
}

function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const modeIdx = args.indexOf('--mode');
  const mode = modeIdx >= 0 ? args[modeIdx + 1] || 'advanced' : 'advanced';
  const weeksDir = mode === 'easy'
    ? path.join(ROOT, 'src', 'data', 'weeks_easy')
    : path.join(ROOT, 'src', 'data', 'weeks');

  console.log(`\nShadowing Video Curation (${mode} mode)\n`);

  for (let w = 1; w <= 36; w++) {
    const pad = String(w).padStart(2, '0');
    const weekDir = path.join(weeksDir, `week_${pad}`);
    const shadowPath = path.join(weekDir, 'shadowing.js');
    const dailyPath = path.join(weekDir, 'daily_watch.js');

    if (!fs.existsSync(shadowPath)) continue;

    const videos = fs.existsSync(dailyPath) ? parseDailyWatch(dailyPath) : [];
    if (videos.length === 0) {
      console.log(`W${pad}: (no daily_watch videos)`);
      continue;
    }

    // Score all videos
    const scored = videos.map(v => ({ ...v, score: scoreVideo(v) }))
      .sort((a, b) => b.score - a.score);

    const best = scored[0];

    console.log(`W${pad}: ${best.score > 0 ? '✓' : '✗'} ${best.videoId} (${best.sim_duration}s) "${best.title}"`);
    if (scored.length > 1) {
      console.log(`     runner-up: ${scored[1].videoId} (${scored[1].score}pts) "${scored[1].title}"`);
    }

    if (apply && best.score > 0) {
      let content = fs.readFileSync(shadowPath, 'utf8');
      if (/videoId:\s*"/.test(content)) {
        content = content.replace(/videoId:\s*"[^"]+"/, `videoId: "${best.videoId}"`);
      } else {
        // Add after title or at top
        const titleMatch = content.match(/(title:\s*"[^"]+",\s*\n)/);
        if (titleMatch) {
          content = content.replace(titleMatch[1], `${titleMatch[1]}  videoId: "${best.videoId}",\n`);
        } else {
          content = content.replace(/export default \{/, `export default {\n  videoId: "${best.videoId}",`);
        }
      }
      fs.writeFileSync(shadowPath, content, 'utf8');
    }
  }

  if (!apply) console.log('\n[DRY RUN] Use --apply to write changes.');
}

main();
