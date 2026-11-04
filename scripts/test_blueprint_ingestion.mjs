#!/usr/bin/env node
/**
 * scripts/test_blueprint_ingestion.mjs
 * 
 * Comprehensive automated verification for Blueprint Ingestion Generator.
 * Verifies:
 * 1. Frozen integrity gate (W33 & W34 are blocked from regeneration).
 * 2. Multi-tier week generation & template selection:
 *    - W01 (Starters Lite) -> template_w01_starters_lite.js
 *    - W17 (Movers Full)   -> template_w17_movers_full.js
 *    - W24 (Movers Mock)   -> template_w24_movers_mid_mock.js
 *    - W37 (Flyers Mock)   -> template_flyers_mock.js
 *    - W38 (Flyers Rotary) -> template_flyers_rotary.js
 * 3. File generation & schema compliance on a sample week (W38).
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function runTest(desc, fn) {
  process.stdout.write(`Testing: ${desc}... `);
  try {
    fn();
    console.log('✅ PASS');
  } catch (err) {
    console.log('❌ FAIL');
    console.error(err);
    process.exit(1);
  }
}

console.log('========================================================================');
console.log('🧪 BLUEPRINT INGESTION TEST SUITE (NHÓM 1 AUTOMATION #1)');
console.log('========================================================================\n');

// ── Test 1: Frozen Week Guard (W33) ──
runTest('Frozen guard blocks Week 33 overwrite without --force', () => {
  let failed = false;
  try {
    execSync('node scripts/generate_week_blueprint.mjs 33', { cwd: ROOT_DIR, stdio: 'pipe' });
  } catch (e) {
    failed = true;
    const out = (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : '');
    if (!out.includes('Week 33 is CRYPTOGRAPHICALLY FROZEN')) {
      throw new Error(`Expected frozen error message, got: ${out}`);
    }
  }
  if (!failed) throw new Error('Expected command to exit with error code 1');
});

// ── Test 2: Frozen Week Guard (W34) ──
runTest('Frozen guard blocks Week 34 overwrite without --force', () => {
  let failed = false;
  try {
    execSync('node scripts/generate_week_blueprint.mjs 34', { cwd: ROOT_DIR, stdio: 'pipe' });
  } catch (e) {
    failed = true;
    const out = (e.stdout ? e.stdout.toString() : '') + (e.stderr ? e.stderr.toString() : '');
    if (!out.includes('Week 34 is CRYPTOGRAPHICALLY FROZEN')) {
      throw new Error(`Expected frozen error message, got: ${out}`);
    }
  }
  if (!failed) throw new Error('Expected command to exit with error code 1');
});

// ── Test 3: Out-of-bounds Week ──
runTest('Out-of-bounds week exits with error', () => {
  let failed = false;
  try {
    execSync('node scripts/generate_week_blueprint.mjs 999', { cwd: ROOT_DIR, stdio: 'pipe' });
  } catch (e) {
    failed = true;
  }
  if (!failed) throw new Error('Expected command to fail on week 999');
});

// ── Test 4: Template Mapping Across Generations ──
const templateTestCases = [
  { week: 1,  expectedTemplate: 'template_w01_starters_lite.js', isMock: false },
  { week: 16, expectedTemplate: 'template_w16_starters_mock.js', isMock: true },
  { week: 17, expectedTemplate: 'template_w17_movers_full.js',    isMock: false },
  { week: 24, expectedTemplate: 'template_w24_movers_mid_mock.js', isMock: true },
  { week: 37, expectedTemplate: 'template_flyers_mock.js',       isMock: true },
  { week: 38, expectedTemplate: 'template_flyers_rotary.js',     isMock: false }
];

for (const tc of templateTestCases) {
  runTest(`Template selection for W${tc.week} (${tc.expectedTemplate})`, () => {
    const rawOut = execSync(`node scripts/generate_week_blueprint.mjs ${tc.week} --dry-run`, { cwd: ROOT_DIR }).toString();
    const jsonStr = rawOut.substring(rawOut.indexOf('{'), rawOut.lastIndexOf('}') + 1);
    const parsed = JSON.parse(jsonStr);

    if (!parsed.template_used.includes(tc.expectedTemplate)) {
      throw new Error(`Expected template ${tc.expectedTemplate}, got ${parsed.template_used}`);
    }
    if (parsed.isFullMock !== tc.isMock) {
      throw new Error(`Expected isFullMock=${tc.isMock}, got ${parsed.isFullMock}`);
    }
  });
}

// ── Test 5: End-to-end Sample Blueprint Generation (W38) ──
runTest('End-to-end blueprint creation and schema validation for W38 (Animal Abilities)', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'blueprint_test_'));
  const testOutputPath = path.join(tmpDir, 'blueprint.json');

  try {
    execSync(`node scripts/generate_week_blueprint.mjs 38 --output "${testOutputPath}"`, { cwd: ROOT_DIR });
    
    if (!fs.existsSync(testOutputPath)) {
      throw new Error('Output file was not created');
    }

    const content = JSON.parse(fs.readFileSync(testOutputPath, 'utf8'));
    
    // Invariants
    if (content.week !== 38) throw new Error(`Wrong week: ${content.week}`);
    if (content.theme !== 'Animal Abilities (Modals)') throw new Error(`Wrong theme: ${content.theme}`);
    if (content.title_vi !== 'Khả năng Động vật') throw new Error(`Wrong title_vi: ${content.title_vi}`);
    if (content.cefr_level !== 'A2 Flyers') throw new Error(`Wrong CEFR level: ${content.cefr_level}`);
    if (content.week_type !== 'rotary_practice') throw new Error(`Wrong week type: ${content.week_type}`);
    if (!Array.isArray(content.keywords) || content.keywords.length !== 8) throw new Error('Keywords incorrect');
    if (!content.vocabulary_focus || content.vocabulary_focus.total_syllabus_words !== 8) {
      throw new Error('Vocabulary focus parsing incorrect');
    }
    if (!content.grammar_focus || !content.grammar_focus.structure.includes('Can / Cannot')) {
      throw new Error(`Grammar focus incorrect: ${content.grammar_focus?.structure}`);
    }
    if (!content.digital_map_reference || content.digital_map_reference.map_theme !== 'Energy All Around') {
      throw new Error(`Map theme reference missing or wrong: ${content.digital_map_reference?.map_theme}`);
    }
    if (content.digital_map_reference.alignment_status !== 'DIVERGENT_THEME_FALLBACK_TO_SOURCE_B') {
      throw new Error(`Alignment status wrong: ${content.digital_map_reference?.alignment_status}`);
    }
    if (!Array.isArray(content.pending_human_authoring) || content.pending_human_authoring.length === 0) {
      throw new Error('Pending human authoring tasks missing');
    }

  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// ── Test 6: Cross-Reference Validation for W39 (Habitats) ──
runTest('Cross-reference validation for W39 (Habitats vs Ocean Depths)', () => {
  const rawOut = execSync('node scripts/generate_week_blueprint.mjs 39 --dry-run', { cwd: ROOT_DIR }).toString();
  const jsonStr = rawOut.substring(rawOut.indexOf('{'), rawOut.lastIndexOf('}') + 1);
  const parsed = JSON.parse(jsonStr);

  if (parsed.week !== 39) throw new Error(`Wrong week: ${parsed.week}`);
  if (parsed.theme !== 'Habitats (Persuasion Intro)') throw new Error(`Wrong theme: ${parsed.theme}`);
  if (parsed.story_title !== 'Matching animals to habitats') throw new Error(`Wrong story_title: ${parsed.story_title}`);
  if (!parsed.grammar_focus.structure.includes('I think the [animal] lives in the [place]')) {
    throw new Error(`Wrong grammar structure: ${parsed.grammar_focus.structure}`);
  }
  if (!parsed.keywords.includes('desert') || !parsed.keywords.includes('rainforest')) {
    throw new Error(`Keywords missing expected habitat words: ${parsed.keywords}`);
  }
  if (parsed.digital_map_reference.map_theme !== 'Ocean Depths & Coral Reefs') {
    throw new Error(`Wrong map theme: ${parsed.digital_map_reference.map_theme}`);
  }
  if (parsed.digital_map_reference.alignment_status !== 'DIVERGENT_THEME_FALLBACK_TO_SOURCE_B') {
    throw new Error(`Wrong alignment status: ${parsed.digital_map_reference.alignment_status}`);
  }
});

// ── Test 7: Cross-Reference Validation for W45 (Shape Detectives) ──
runTest('Cross-reference validation for W45 (Shape Detectives vs Sound Studio)', () => {
  const rawOut = execSync('node scripts/generate_week_blueprint.mjs 45 --dry-run', { cwd: ROOT_DIR }).toString();
  const jsonStr = rawOut.substring(rawOut.indexOf('{'), rawOut.lastIndexOf('}') + 1);
  const parsed = JSON.parse(jsonStr);

  if (parsed.week !== 45) throw new Error(`Wrong week: ${parsed.week}`);
  if (parsed.theme !== 'Shape Detectives (Geometry)') throw new Error(`Wrong theme: ${parsed.theme}`);
  if (parsed.story_title !== 'Finding shapes in the classroom') throw new Error(`Wrong story_title: ${parsed.story_title}`);
  if (!parsed.grammar_focus.structure.includes('It has [number] sides')) {
    throw new Error(`Wrong grammar structure: ${parsed.grammar_focus.structure}`);
  }
  if (!parsed.keywords.includes('triangle') || !parsed.keywords.includes('rectangle')) {
    throw new Error(`Keywords missing expected geometry words: ${parsed.keywords}`);
  }
  if (parsed.digital_map_reference.map_theme !== 'The Sound Studio (Acoustics)') {
    throw new Error(`Wrong map theme: ${parsed.digital_map_reference.map_theme}`);
  }
  if (parsed.digital_map_reference.alignment_status !== 'DIVERGENT_THEME_FALLBACK_TO_SOURCE_B') {
    throw new Error(`Wrong alignment status: ${parsed.digital_map_reference.alignment_status}`);
  }
});

// ── Test 8: Cross-Reference Validation for W50 (Review Station 1) ──
runTest('Cross-reference validation for W50 (Review Station 1 vs Transportation)', () => {
  const rawOut = execSync('node scripts/generate_week_blueprint.mjs 50 --dry-run', { cwd: ROOT_DIR }).toString();
  const jsonStr = rawOut.substring(rawOut.indexOf('{'), rawOut.lastIndexOf('}') + 1);
  const parsed = JSON.parse(jsonStr);

  if (parsed.week !== 50) throw new Error(`Wrong week: ${parsed.week}`);
  if (parsed.theme !== 'Review Station 1 (Grammar Mix)') throw new Error(`Wrong theme: ${parsed.theme}`);
  if (parsed.story_title !== 'Past, Present, Future Mix') throw new Error(`Wrong story_title: ${parsed.story_title}`);
  if (parsed.digital_map_reference.map_theme !== 'Transportation of Tomorrow') {
    throw new Error(`Wrong map theme: ${parsed.digital_map_reference.map_theme}`);
  }
  if (parsed.digital_map_reference.alignment_status !== 'DIVERGENT_THEME_FALLBACK_TO_SOURCE_B') {
    throw new Error(`Wrong alignment status: ${parsed.digital_map_reference.alignment_status}`);
  }
});

console.log('\n========================================================================');
console.log('🎉 ALL BLUEPRINT INGESTION TESTS PASSED (100% SUCCESS)');
console.log('========================================================================\n');
