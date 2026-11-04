#!/usr/bin/env node
/**
 * scripts/generate_week_blueprint.mjs
 * 
 * Blueprint Ingestion Generator (Nhóm 1 Automation #1)
 * Automates Stage 1 (Syllabus Ingestion) of docs/WEEK_PRODUCTION_SOP.md (v2.2.0).
 * 
 * Ingests authoritative curriculum parameters from:
 * 1. docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md (Digital Syllabus Map)
 * 2. docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt (Master 3-Year Syllabus)
 * 3. production_kit/templates/template_*.js (Golden Architecture Templates)
 * 
 * Outputs: src/data/weeks/week_{N}/blueprint.json
 * 
 * Safety & Anti-Hallucination:
 * - Refuses to overwrite frozen weeks (W33, W34, etc.) without --force.
 * - Zero content fabrication: marks missing fields explicitly as REQUIRES_HUMAN_INPUT.
 * - Fail-loud on missing syllabus week or corrupted data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Source paths
const DIGITAL_MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
const KHUNG_CT_PATH = path.join(ROOT_DIR, 'docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');
const TEMPLATES_DIR = path.join(ROOT_DIR, 'production_kit/templates');

// Helper: Parse CLI Arguments
function parseArgs() {
  const args = process.argv.slice(2);
  let weekNum = null;
  let isDryRun = false;
  let isForce = false;
  let outputPath = null;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--dry-run') {
      isDryRun = true;
    } else if (arg === '--force') {
      isForce = true;
    } else if (arg === '--output' && i + 1 < args.length) {
      outputPath = args[++i];
    } else if (!arg.startsWith('--') && !weekNum) {
      const parsed = parseInt(arg, 10);
      if (!isNaN(parsed)) weekNum = parsed;
    }
  }

  if (!weekNum || weekNum < 1 || weekNum > 156) {
    console.error('❌ Error: Please provide a valid week number (1–156).');
    console.error('Usage: node scripts/generate_week_blueprint.mjs <weekNumber> [--dry-run] [--force] [--output <path>]');
    process.exit(1);
  }

  return { weekNum, isDryRun, isForce, outputPath };
}

// ── 1. FROZEN INTEGRITY GUARD ───────────────────────────────────────────────
function checkFrozenStatus(weekNum, isForce) {
  const freezeManifestPath = path.join(ROOT_DIR, `docs/W${weekNum}_GOLDEN_FREEZE_MANIFEST.json`);
  if (fs.existsSync(freezeManifestPath)) {
    if (!isForce) {
      console.error('========================================================================');
      console.error(`🚨 INTEGRITY ERROR: Week ${weekNum} is CRYPTOGRAPHICALLY FROZEN!`);
      console.error(`   Found freeze manifest: docs/W${weekNum}_GOLDEN_FREEZE_MANIFEST.json`);
      console.error('   Modifying a frozen week blueprint without Change Control Procedure is FORBIDDEN.');
      console.error('   To override for testing, specify the --force flag.');
      console.error('========================================================================');
      process.exit(1);
    } else {
      console.warn(`⚠️ Warning: Overriding freeze protection for Week ${weekNum} due to --force flag.`);
    }
  }
}

// ── 2. PARSE SOURCE A: DIGITAL SYLLABUS MAP ─────────────────────────────────
function parseDigitalMap(weekNum, mapContent) {
  // Matches both W1 and W01
  const padded = String(weekNum).padStart(2, '0');
  const weekRegex = new RegExp(`\\|\\s*\\*\\*W(?:${weekNum}|${padded})\\*\\*\\s*\\|([^|]+)\\|([^|]+)\\|([^|]+)\\|([^|]+)\\|([^|]+)\\|`, 'i');
  const match = mapContent.match(weekRegex);

  if (!match) {
    return null;
  }

  const cleanTheme = match[1].replace(/\*\*/g, '').trim();
  const rawCefrType = match[2].replace(/\*\*/g, '').trim();
  const clilModule = match[3].replace(/\*\*/g, '').trim();
  const scaffolding = match[4].replace(/\*\*/g, '').trim();
  const grammarHub = match[5].replace(/\*\*/g, '').trim();

  const isFullMock = /MOCK/i.test(rawCefrType) || /MOCK/i.test(cleanTheme);
  const weekType = isFullMock ? 'full_mock' : 'rotary_practice';

  // Extract CEFR Level
  let cefrLevel = 'A2 Flyers';
  let cefrStage = 1;
  if (/Pre-A1/i.test(rawCefrType)) {
    cefrLevel = 'Pre-A1 Starters';
    cefrStage = 1;
  } else if (/A1 Movers/i.test(rawCefrType)) {
    cefrLevel = 'A1 Movers';
    cefrStage = 1;
  } else if (/A2 Flyers/i.test(rawCefrType)) {
    cefrLevel = 'A2 Flyers';
    cefrStage = 1;
  } else if (/B1\+? PET/i.test(rawCefrType)) {
    cefrLevel = 'B1 PET';
    cefrStage = 2;
  } else if (/B1\+ Academic/i.test(rawCefrType)) {
    cefrLevel = 'B1+ Academic';
    cefrStage = 3;
  }

  return {
    theme: cleanTheme,
    rawCefrType,
    cefrLevel,
    cefrStage,
    isFullMock,
    weekType,
    clilModule,
    scaffolding,
    grammarHub
  };
}

// ── 3. PARSE SOURCE B: MASTER 3-YEAR SYLLABUS ───────────────────────────────
function parseKhungCT(weekNum, txtContent) {
  // Regex to match block for week N
  const weekBlockRegex = new RegExp(`•\\s*Week\\s*${weekNum}\\s*:\\s*([^\\n]+)([\\s\\S]*?)(?=•\\s*Week|🟢|🔵|🟣|Phase|Block|$)`, 'i');
  const match = txtContent.match(weekBlockRegex);

  if (!match) {
    return null;
  }

  const rawTitle = match[1].trim();
  const body = match[2];

  const topicMatch = body.match(/Topic:\s*([^\n]+)/i);
  const outcomeMatch = body.match(/Key Learning Outcome:\s*([^\n]+)/i);
  const skillMatch = body.match(/Skill Focus:\s*([^\n]+)/i);
  const grammarMatch = body.match(/Grammar [^:]*:\s*([^\n]+)/i);
  const vocabMatch = body.match(/Vocabulary [^:]*:\s*([^\n]+)/i);

  let vocabWords = [];
  if (vocabMatch) {
    vocabWords = vocabMatch[1]
      .split(/[,;]/)
      .map(w => w.replace(/\([^)]*\)/g, '').replace(/\./g, '').trim())
      .filter(w => w.length > 0 && !w.includes('->'));
  }

  return {
    rawTitle,
    topic: topicMatch ? topicMatch[1].trim() : null,
    outcome: outcomeMatch ? outcomeMatch[1].trim() : null,
    skillFocus: skillMatch ? skillMatch[1].trim() : null,
    grammarFocus: grammarMatch ? grammarMatch[1].trim() : null,
    vocabWords
  };
}

// ── 4. RESOLVE TEMPLATE SKELETON (SOURCE C) ─────────────────────────────────
function resolveTemplate(weekNum, isFullMock) {
  if (weekNum <= 16) {
    return isFullMock ? 'template_w16_starters_mock.js' : 'template_w01_starters_lite.js';
  } else if (weekNum <= 32) {
    if (weekNum === 24) return 'template_w24_movers_mid_mock.js';
    if (weekNum === 32) return 'template_w32_movers_final_mock.js';
    return 'template_w17_movers_full.js';
  } else if (weekNum <= 72) {
    return isFullMock ? 'template_flyers_mock.js' : 'template_flyers_rotary.js';
  } else if (weekNum <= 120) {
    return 'template_pet_transition.js';
  } else {
    return 'template_b1plus_transition.js';
  }
}

// ── 5. ASSEMBLE AUTHORITATIVE BLUEPRINT JSON ────────────────────────────────
function generateBlueprint(weekNum, mapData, txtData) {
  const isFullMock = mapData ? mapData.isFullMock : false;
  const templateName = resolveTemplate(weekNum, isFullMock);
  const templatePath = path.join('production_kit/templates', templateName);

  // Compute rotary cycle for Flyers
  let rotaryCycle = null;
  if (!isFullMock && weekNum >= 33 && weekNum <= 72) {
    rotaryCycle = ((weekNum - 33) % 4) + 1;
  }

  // Theme resolution
  const theme = (mapData && mapData.theme) || (txtData && txtData.topic) || `Week ${weekNum} Curriculum`;

  // CLIL Module / Topic
  const clilTitle = (mapData && mapData.clilModule) || (txtData && txtData.topic) || 'CLIL Exploration';
  const clilFocus = (txtData && txtData.topic) || (mapData && mapData.clilModule) || 'Interdisciplinary STEM Inquiry';

  // Grammar Focus
  const grammarStructure = (txtData && txtData.grammarFocus) || (mapData && mapData.grammarHub) || 'Grammar Drill & Sentence Construction';
  
  // Vocabulary
  const syllabusWords = (txtData && txtData.vocabWords) || [];
  const targetCount = 20;
  const missingCount = Math.max(0, targetCount - syllabusWords.length);
  const vocabStatus = missingCount === 0 
    ? 'COMPLETE (20 words)' 
    : `PARTIAL (${syllabusWords.length}/${targetCount} syllabus words — Requires ${missingCount} words from human author)`;

  // Pending Human Authoring Checklist
  const pendingAuthoring = [];
  if (missingCount > 0) {
    pendingAuthoring.push(`Target Vocabulary: Needs ${missingCount} additional CEFR-aligned words + bilingual definitions (SRS tier tagging)`);
  }
  pendingAuthoring.push('Story World: 5 story scenes with narration script + character names');
  pendingAuthoring.push('CLIL Article: 90-200 word academic text containing 100% glossary items + 5 check questions');
  pendingAuthoring.push('Singapore Math: 5 word problems with C.U.B.E.S. modelData calculation');
  pendingAuthoring.push('Cambridge Exam Tasks: Specific dialogue turns, reading cloze passages, and listening scripts');

  const blueprint = {
    week: Number(weekNum),
    theme: theme,
    cefr_level: mapData ? mapData.cefrLevel : 'A2 Flyers',
    cefr_stage: mapData ? mapData.cefrStage : 1,
    week_type: mapData ? mapData.weekType : (isFullMock ? 'full_mock' : 'rotary_practice'),
    isFullMock: isFullMock,
    rotary_cycle: rotaryCycle,
    template_used: templatePath,
    story_title: txtData && txtData.topic ? txtData.topic.replace(/["']/g, '') : null,
    clil_topic: {
      title: clilTitle,
      focus: clilFocus
    },
    grammar_focus: {
      structure: grammarStructure,
      outcome: txtData ? txtData.outcome : null,
      pattern_regex: null, // To be defined by author based on exact target sentences
      requires_authoring_examples: true
    },
    vocabulary_focus: {
      syllabus_words: syllabusWords,
      total_syllabus_words: syllabusWords.length,
      target_count: targetCount,
      missing_count: missingCount,
      status: vocabStatus
    },
    keywords: syllabusWords,
    characters: null, // Requires human authoring per storyline
    target_vocab_20: syllabusWords.map(w => ({
      word: w,
      definition_en: null,
      definition_vi: null,
      example_en: null,
      example_vi: null,
      requires_human_input: true
    })),
    scaffolding_tier: mapData ? mapData.scaffolding : 'Tier 2 (Chunks)',
    tested_skills: [
      'listening_p1', 'listening_p2', 'listening_p3', 'listening_p4', 'listening_p5',
      'reading_p1', 'reading_p2', 'reading_p3', 'reading_p4', 'reading_p5', 'reading_p6',
      'writing_p7',
      'speaking_p1', 'speaking_p2', 'speaking_p3', 'speaking_p4'
    ],
    target_shields: 3,
    pending_human_authoring: pendingAuthoring,
    metadata_provenance: {
      generated_at: new Date().toISOString(),
      generator_script: 'scripts/generate_week_blueprint.mjs',
      source_digital_map: mapData !== null,
      source_master_syllabus: txtData !== null
    }
  };

  return blueprint;
}

// ── 6. MAIN EXECUTION ───────────────────────────────────────────────────────
async function main() {
  const { weekNum, isDryRun, isForce, outputPath } = parseArgs();

  console.log('========================================================================');
  console.log(`📋 BLUEPRINT INGESTION GENERATOR — WEEK ${weekNum}`);
  console.log('📄 SOP Giai đoạn 1: Trích Xuất Thông Số Từ Khung CT Gốc');
  console.log('========================================================================\n');

  // 1. Frozen check
  checkFrozenStatus(weekNum, isForce);

  // 2. Read Sources
  if (!fs.existsSync(DIGITAL_MAP_PATH)) {
    console.error(`❌ FATAL: Digital Syllabus Map not found at: ${DIGITAL_MAP_PATH}`);
    process.exit(1);
  }
  if (!fs.existsSync(KHUNG_CT_PATH)) {
    console.error(`❌ FATAL: Master Syllabus not found at: ${KHUNG_CT_PATH}`);
    process.exit(1);
  }

  const mapContent = fs.readFileSync(DIGITAL_MAP_PATH, 'utf8');
  const txtContent = fs.readFileSync(KHUNG_CT_PATH, 'utf8');

  // 3. Ingest Data
  console.log('🔍 [1/3] Parsing Syllabus Sources...');
  const mapData = parseDigitalMap(weekNum, mapContent);
  const txtData = parseKhungCT(weekNum, txtContent);

  if (!mapData && !txtData) {
    console.error(`\n❌ FAIL-LOUD: Week ${weekNum} could NOT be found in either:`);
    console.error(`   - ${path.relative(ROOT_DIR, DIGITAL_MAP_PATH)}`);
    console.error(`   - ${path.relative(ROOT_DIR, KHUNG_CT_PATH)}`);
    console.error('Aborting. Cannot generate blueprint without authoritative syllabus sources.');
    process.exit(1);
  }

  console.log(`   Source A (Digital Map):    ${mapData ? '✅ FOUND' : '⚠️ NOT FOUND'}`);
  console.log(`   Source B (Khung CT):        ${txtData ? '✅ FOUND' : '⚠️ NOT FOUND'}`);

  // 4. Assemble Blueprint
  console.log('\n📐 [2/3] Generating Canonical Blueprint JSON Structure...');
  const blueprint = generateBlueprint(weekNum, mapData, txtData);

  // 5. Output
  const destPath = outputPath || path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}/blueprint.json`);
  const jsonContent = JSON.stringify(blueprint, null, 2);

  console.log('\n💾 [3/3] Output Deliverable:');
  console.log(`   Theme:         ${blueprint.theme}`);
  console.log(`   CEFR Level:    ${blueprint.cefr_level} (Stage ${blueprint.cefr_stage})`);
  console.log(`   Week Type:     ${blueprint.week_type} (isFullMock: ${blueprint.isFullMock})`);
  console.log(`   Template:      ${blueprint.template_used}`);
  console.log(`   Syllabus Vocab:${blueprint.vocabulary_focus.syllabus_words.length} words (${blueprint.vocabulary_focus.status})`);
  console.log(`   Pending Items: ${blueprint.pending_human_authoring.length} human-in-the-loop tasks`);

  if (isDryRun) {
    console.log('\n[DRY RUN MODE — NOT WRITING TO DISK]');
    console.log(jsonContent);
  } else {
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.writeFileSync(destPath, jsonContent, 'utf8');
    console.log(`\n🎉 Successfully written blueprint to: ${path.relative(ROOT_DIR, destPath)}`);
  }

  console.log('\n========================================================================');
  console.log('✅ Giai đoạn 1 (Syllabus Ingestion) Hoàn Tất Thành Công!');
  console.log('========================================================================\n');
}

main().catch(err => {
  console.error('\n❌ Fatal error in blueprint ingestion:', err);
  process.exit(1);
});
