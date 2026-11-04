#!/usr/bin/env node
/**
 * test_generic_freeze_pipeline.mjs
 * Round 47 — Multi-Week Generic Validation Suite
 *
 * Verifies:
 * 1. Test Case A (Incomplete Week): Week 34 fails loud on missing physical assets without corrupting repository.
 * 2. Test Case B (Generic Complete Fixture): Week 150 end-to-end generation, verification, and drift detection.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();

console.log('========================================================================');
console.log('🧪 ROUND 47 — GENERIC AUTO-FREEZE MULTI-WEEK VALIDATION SUITE');
console.log('========================================================================\n');

// ── TEST CASE A: INCOMPLETE WEEK (W34) ──────────────────────────────────────
console.log('--- TEST CASE A: Incomplete Week (Week 34 Fail-Loud Gate) ---');
let w34Threw = false;
let w34Output = '';
try {
  w34Output = execSync('node scripts/generate_golden_freeze.mjs 34', { cwd: rootDir, stdio: 'pipe' }).toString();
} catch (err) {
  w34Threw = true;
  w34Output = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
}

console.log(w34Output.trim());

if (!w34Threw) {
  throw new Error('Test Case A FAILED: generate_golden_freeze.mjs 34 should have failed loud on missing media assets!');
}

if (!w34Output.includes('Cannot freeze Week 34! Found 6 missing/corrupted media assets')) {
  throw new Error('Test Case A FAILED: Did not find expected 6 missing assets error message!');
}
console.log('✅ Test Case A PASSED: Incomplete week correctly rejected before freeze.\n');

// ── TEST CASE B: GENERIC COMPLETE FIXTURE (W150) ────────────────────────────
console.log('--- TEST CASE B: Generic Complete Fixture (Week 150 End-to-End) ---');
const testWeekNum = 150;
const testDataDir = path.join(rootDir, `src/data/weeks/week_${testWeekNum}`);
const testAudioDir = path.join(rootDir, `public/audio/week${testWeekNum}`);
const testImgDir = path.join(rootDir, `public/images/week${testWeekNum}`);
const testManifestPath = path.join(rootDir, `docs/W${testWeekNum}_GOLDEN_FREEZE_MANIFEST.json`);
const testGuardPath = path.join(rootDir, `scripts/guard_golden_w${testWeekNum}_freeze.mjs`);

try {
  fs.mkdirSync(testDataDir, { recursive: true });
  fs.mkdirSync(testAudioDir, { recursive: true });
  fs.mkdirSync(testImgDir, { recursive: true });

  // Create required media assets
  fs.writeFileSync(path.join(testAudioDir, 'test_story.mp3'), Buffer.from('TEST_AUDIO_DATA'));
  fs.writeFileSync(path.join(testImgDir, 'webtoon_scene_1.png'), Buffer.from('TEST_IMAGE_DATA'));
  fs.writeFileSync(path.join(testImgDir, 'webtoon_scene_2.png'), Buffer.from('TEST_IMAGE_DATA'));
  fs.writeFileSync(path.join(testImgDir, 'webtoon_scene_3.png'), Buffer.from('TEST_IMAGE_DATA'));
  fs.writeFileSync(path.join(testImgDir, 'webtoon_scene_4.png'), Buffer.from('TEST_IMAGE_DATA'));
  fs.writeFileSync(path.join(testImgDir, 'webtoon_scene_5.png'), Buffer.from('TEST_IMAGE_DATA'));
  fs.writeFileSync(path.join(testImgDir, `barmodel_w${testWeekNum}_adv_p1.svg`), Buffer.from('<svg></svg>'));
  fs.writeFileSync(path.join(testImgDir, `barmodel_w${testWeekNum}_adv_p2.svg`), Buffer.from('<svg></svg>'));
  fs.writeFileSync(path.join(testImgDir, `barmodel_w${testWeekNum}_adv_p3.svg`), Buffer.from('<svg></svg>'));
  fs.writeFileSync(path.join(testImgDir, `barmodel_w${testWeekNum}_adv_p4.svg`), Buffer.from('<svg></svg>'));
  fs.writeFileSync(path.join(testImgDir, `barmodel_w${testWeekNum}_adv_p5.svg`), Buffer.from('<svg></svg>'));
  fs.writeFileSync(path.join(testImgDir, `read_cover_w${testWeekNum}.jpg`), Buffer.from('TEST_COVER'));
  fs.writeFileSync(path.join(testImgDir, `explore_cover_w${testWeekNum}.jpg`), Buffer.from('TEST_COVER'));

  // Create canonical hubs with realistic non-stub content (>100 chars)
  fs.writeFileSync(path.join(testDataDir, 'reading_hub.js'), `
    export const readingHubData = {
      week: ${testWeekNum},
      theme: "Generic Pipeline Test Theme",
      cefr_level: "A2 Flyers",
      story_scenes: [
        { scene_id: "scene_1", audio_url: "/audio/week${testWeekNum}/test_story.mp3", image_url: "/images/week${testWeekNum}/webtoon_scene_1.png", description: "Test scene 1 description." }
      ]
    };
    export default readingHubData;
  `);
  fs.writeFileSync(path.join(testDataDir, 'listening_hub.js'), `
    export const listeningHub = {
      week: ${testWeekNum},
      listening_p1: { title: "Listening Part 1", audio_url: "/audio/week${testWeekNum}/test_story.mp3" },
      listening_p2: { title: "Listening Part 2" }
    };
    export default listeningHub;
  `);
  fs.writeFileSync(path.join(testDataDir, 'writing_hub.js'), `
    export const writingHub = {
      week: ${testWeekNum},
      story_writing: { title: "Writing Section", prompt: "Look at the pictures and write a short story." }
    };
    export default writingHub;
  `);
  fs.writeFileSync(path.join(testDataDir, 'speaking_hub.js'), `
    export const speakingHub = {
      week: ${testWeekNum},
      speaking_p1: { title: "Find Differences", prompt: "Describe differences between Picture A and Picture B." }
    };
    export default speakingHub;
  `);
  fs.writeFileSync(path.join(testDataDir, 'skill_practice_hub.js'), `
    export const skillPracticeHub = {
      week: ${testWeekNum},
      practice_sections: ["vocabulary", "grammar", "math_quest", "action_lab", "discovery_report"]
    };
    export default skillPracticeHub;
  `);
  fs.writeFileSync(path.join(testDataDir, 'vocab.js'), `
    export default [
      { id: 1, word: "experiment", definition_en: "a scientific test done to learn something", definition_vi: "thi nghiem khoa hoc" },
      { id: 2, word: "discovery", definition_en: "the act of finding something new", definition_vi: "su kham pha" }
    ];
  `);

  // Run generator for week 150
  console.log(`▶ Executing: node scripts/generate_golden_freeze.mjs ${testWeekNum}...`);
  const genOutput = execSync(`node scripts/generate_golden_freeze.mjs ${testWeekNum}`, { cwd: rootDir }).toString();
  console.log(genOutput.trim());

  if (!fs.existsSync(testManifestPath)) {
    throw new Error(`Test Case B FAILED: Manifest not generated at ${testManifestPath}`);
  }
  if (!fs.existsSync(testGuardPath)) {
    throw new Error(`Test Case B FAILED: Guard not generated at ${testGuardPath}`);
  }

  // Run generated guard script -> Expect PASS
  console.log(`\n▶ Executing generated guard: node scripts/guard_golden_w${testWeekNum}_freeze.mjs (Clean)...`);
  const guardPassOut = execSync(`node scripts/guard_golden_w${testWeekNum}_freeze.mjs`, { cwd: rootDir }).toString();
  console.log(guardPassOut.trim());
  if (!guardPassOut.includes('100% OF PROTECTED FILES LOCKED')) {
    throw new Error('Test Case B FAILED: Generated guard did not report 100% locked on clean state!');
  }

  // Mutate a file -> Expect FAIL
  console.log(`\n▶ Injecting mutation into week_${testWeekNum}/vocab.js...`);
  fs.appendFileSync(path.join(testDataDir, 'vocab.js'), '\n// DRIFT_INJECTION\n');

  let guardThrew = false;
  let guardFailOut = '';
  try {
    guardFailOut = execSync(`node scripts/guard_golden_w${testWeekNum}_freeze.mjs`, { cwd: rootDir, stdio: 'pipe' }).toString();
  } catch (err) {
    guardThrew = true;
    guardFailOut = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
  }

  console.log(guardFailOut.trim());
  if (!guardThrew || !guardFailOut.includes('GOLDEN FREEZE VIOLATION')) {
    throw new Error('Test Case B FAILED: Guard did not fail on mutated fixture!');
  }
  console.log('✅ Test Case B PASSED: Generic generator produced fully functioning manifest and fail-loud guard for Week 150.\n');

} finally {
  // Clean up fixture files
  try { fs.rmSync(testDataDir, { recursive: true, force: true }); } catch (_) {}
  try { fs.rmSync(testAudioDir, { recursive: true, force: true }); } catch (_) {}
  try { fs.rmSync(testImgDir, { recursive: true, force: true }); } catch (_) {}
  try { if (fs.existsSync(testManifestPath)) fs.unlinkSync(testManifestPath); } catch (_) {}
  try { if (fs.existsSync(testGuardPath)) fs.unlinkSync(testGuardPath); } catch (_) {}
  console.log('🧹 Cleaned up temporary Week 150 test fixture artifacts.');
}

console.log('\n========================================================================');
console.log('🎉 ROUND 47 MULTI-WEEK VALIDATION COMPLETE: 100% SUCCESS!');
console.log('========================================================================\n');
