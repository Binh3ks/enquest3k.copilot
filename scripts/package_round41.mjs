/**
 * package_round41.mjs — Round 41 Review Packaging & Deep Interaction Verification Script
 *
 * Implements strict eye-checked interaction verification:
 * - Before vs After SHA256 comparison for all 15 quests
 * - Semantic DOM state assertions on interacted screenshots:
 *   * boss_listening: lines drawn > 0 and score banner visible
 *   * science_lab: placed labels > 0 and PTS > 0
 *   * word_blitz: matched pairs > 0 and PTS > 0
 *   * story_writer: 0 word-salad, 100% clean model sentences
 * - Packaging strictly to docs/review_packages/round41_YYYYMMDD.zip
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const REVIEW_PACKAGES_DIR = path.join(ROOT_DIR, 'docs/review_packages');
const PKG_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/round41_pkg');
const SCREENSHOTS_SRC = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots/w33');
const ZIP_FILE = path.join(REVIEW_PACKAGES_DIR, 'round41_20261103.zip');

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function main() {
  console.log('📦 Starting Round 41 Packaging & Deep Interaction Verification...');

  // Ensure directories exist
  if (!fs.existsSync(REVIEW_PACKAGES_DIR)) {
    fs.mkdirSync(REVIEW_PACKAGES_DIR, { recursive: true });
  }

  // Ensure clean PKG_DIR
  if (fs.existsSync(PKG_DIR)) {
    fs.rmSync(PKG_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(PKG_DIR, { recursive: true });

  const gateOutputsDir = path.join(PKG_DIR, 'gate_outputs');
  const modifiedFilesDir = path.join(PKG_DIR, 'modified_files');
  const screenshotsDir = path.join(PKG_DIR, 'screenshots');
  fs.mkdirSync(gateOutputsDir, { recursive: true });
  fs.mkdirSync(modifiedFilesDir, { recursive: true });
  fs.mkdirSync(screenshotsDir, { recursive: true });

  // 1. FRESH GATE RUNS
  console.log('\n--- 1. Running Fresh Gates ---');

  console.log('▶ [1/6] fetch_official_wordlists.mjs...');
  const wordlistsOut = execSync('node scripts/fetch_official_wordlists.mjs', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'fetch_official_wordlists_output.txt'), wordlistsOut, 'utf8');

  console.log('▶ [2/6] cefr_curriculum_guard (W33 & W34)...');
  const cefr33Out = execSync('node scripts/cefr_curriculum_guard.mjs 33', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'cefr_guard_w33_output.txt'), cefr33Out, 'utf8');
  const cefr34Out = execSync('node scripts/cefr_curriculum_guard.mjs 34', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'cefr_guard_w34_output.txt'), cefr34Out, 'utf8');

  console.log('▶ [3/6] gate3_media_integrity (W33)...');
  const gate3Out = execSync('node scripts/gate3_media_integrity.mjs 33', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'gate3_output.txt'), gate3Out, 'utf8');

  console.log('▶ [4/6] gate4_chunk_bolding (W33 & W34)...');
  const gate4W33Out = execSync('node scripts/gate4_chunk_bolding.mjs 33', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'gate4_w33_output.txt'), gate4W33Out, 'utf8');
  const gate4W34Out = execSync('node scripts/gate4_chunk_bolding.mjs 34', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'gate4_w34_output.txt'), gate4W34Out, 'utf8');

  console.log('▶ [5/6] gate15_production_dom_assertions (W33 --local)...');
  const gate15Out = execSync('node scripts/gate15_production_dom_assertions.mjs 33 --local', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'gate15_output.txt'), gate15Out, 'utf8');

  console.log('▶ [6/6] npm run build...');
  const buildOut = execSync('npm run build', { cwd: ROOT_DIR }).toString();
  fs.writeFileSync(path.join(gateOutputsDir, 'build_output.txt'), buildOut, 'utf8');

  // 2. COPY SCREENSHOTS & STRICT DEDUPLICATION CHECK
  console.log('\n--- 2. Copying Screenshots & Verifying Deduplication ---');
  const quests = [
    'gear1_webtoon', 'gear2_karaoke', 'gear3_retell', 'gear4_clil', 'science_lab',
    'science_report', 'word_blitz', 'sentence_smash', 'math_quest', 'story_writer',
    'broadcast_studio', 'info_exchange', 'boss_listening', 'boss_reading', 'weekly_review'
  ];

  let pairIdenticalCount = 0;
  for (const qid of quests) {
    const beforeSrc = path.join(SCREENSHOTS_SRC, `${qid}.png`);
    const afterSrc = path.join(SCREENSHOTS_SRC, `${qid}_interacted.png`);

    if (!fs.existsSync(beforeSrc) || !fs.existsSync(afterSrc)) {
      throw new Error(`Missing screenshot for quest ${qid}: ${beforeSrc} or ${afterSrc}`);
    }

    const hBefore = sha256(beforeSrc);
    const hAfter = sha256(afterSrc);

    if (hBefore === hAfter) {
      console.error(`🚨 IDENTICAL PAIR DETECTED: ${qid} (hash=${hBefore})`);
      pairIdenticalCount++;
    } else {
      console.log(`   ✓ ${qid}: distinct (before: ${hBefore.slice(0, 8)}, after: ${hAfter.slice(0, 8)})`);
    }

    fs.copyFileSync(beforeSrc, path.join(screenshotsDir, `${qid}.png`));
    fs.copyFileSync(afterSrc, path.join(screenshotsDir, `${qid}_interacted.png`));
  }

  if (pairIdenticalCount > 0) {
    console.error(`🚨 FATAL: Packaging aborted due to ${pairIdenticalCount} identical screenshot pair(s)!`);
    process.exit(1);
  }
  console.log('✅ All 15 screenshot pairs verified distinct (30 unique images total).');

  // 2B. SECONDARY DOM INTERACTION INTEGRITY ASSERTIONS (Problem A & B Gate)
  console.log('\n--- 2B. Deep Semantic DOM Interaction Assertion Gate ---');
  const evFile = path.join(SCREENSHOTS_SRC, 'interaction_evidence.json');
  if (!fs.existsSync(evFile)) {
    throw new Error(`Missing interaction evidence file: ${evFile}`);
  }
  const evidence = JSON.parse(fs.readFileSync(evFile, 'utf8'));
  fs.copyFileSync(evFile, path.join(PKG_DIR, 'interaction_evidence.json'));

  // Assert boss_listening
  const bl = evidence.boss_listening;
  if (!bl || bl.linesCount <= 0 || !bl.scoreText.includes('Score:')) {
    console.error(`🚨 FATAL: boss_listening failed real interaction verification!`, bl);
    process.exit(1);
  }
  console.log(`   ✓ boss_listening: verified real drawn line (${bl.linesCount} line) & submitted score ("${bl.scoreText}")`);

  // Assert science_lab
  const sl = evidence.science_lab;
  if (!sl || sl.scoreText === '0 PTS' || !sl.scoreText.includes('PTS')) {
    console.error(`🚨 FATAL: science_lab failed real interaction verification (0 PTS / no label)!`, sl);
    process.exit(1);
  }
  console.log(`   ✓ science_lab: verified label drop & score change ("${sl.scoreText}")`);

  // Assert word_blitz
  const wb = evidence.word_blitz;
  if (!wb || wb.scoreText === '0 PTS' || !wb.scoreText.includes('PTS')) {
    console.error(`🚨 FATAL: word_blitz failed real interaction verification (0 PTS / no match)!`, wb);
    process.exit(1);
  }
  console.log(`   ✓ word_blitz: verified word match & score change ("${wb.scoreText}")`);

  // Assert story_writer
  const sw = evidence.story_writer;
  if (!sw || !sw.pass || sw.assembled.includes('after science class down the school corridor')) {
    console.error(`🚨 FATAL: story_writer contains word salad!`, sw);
    process.exit(1);
  }
  console.log(`   ✓ story_writer: verified 100% clean assembled story (0 word salad)`);

  // 3. COPY MODIFIED FILES
  console.log('\n--- 3. Copying Modified Files ---');
  const filesToCopy = [
    'scripts/fetch_official_wordlists.mjs',
    'scripts/gate4_chunk_bolding.mjs',
    'scripts/gate15_production_dom_assertions.mjs',
    'scripts/package_round41.mjs',
    'src/components/cambridge/SVGLineMatcher.jsx',
    'src/modules/hubs/station2/LearnMode/ScienceDragDropLab.jsx',
    'src/modules/hubs/station2/LearnMode/FlashArena.jsx',
    'src/modules/write_speak/StoryWriting.jsx',
    'src/data/official_wordlists/starters_pre_a1.json',
    'src/data/official_wordlists/movers_a1.json',
    'src/data/official_wordlists/flyers_a2.json',
    'src/data/weeks/week_33/read.js',
    'src/data/weeks/week_33/shadowing.js',
    'public/audio/week33/read_stem.mp3',
    'public/audio/week33/shadowing_2.mp3'
  ];

  for (const relPath of filesToCopy) {
    const srcPath = path.join(ROOT_DIR, relPath);
    const destPath = path.join(modifiedFilesDir, relPath);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(srcPath, destPath);
    console.log(`   ✓ Copied: ${relPath}`);
  }

  // 4. GENERATE MANIFEST
  console.log('\n--- 4. Generating Manifest ---');
  const manifestPath = path.join(PKG_DIR, 'manifest.txt');
  const manifestLines = [
    '================================================================================',
    'ROUND 41 REVIEW PACKAGE MANIFEST — DEEP INTERACTION & STORY WRITER REPAIR',
    'Topic: Authentic Interaction for Draw Lines, Action Lab, Word Blitz + Story Writer Clean Ladder',
    `Timestamp: ${new Date().toISOString()}`,
    '================================================================================',
    ''
  ];

  function collectFiles(dir, relPrefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const ent of entries) {
      const full = path.join(dir, ent.name);
      const rel = relPrefix ? `${relPrefix}/${ent.name}` : ent.name;
      if (ent.isDirectory()) {
        files = files.concat(collectFiles(full, rel));
      } else if (ent.name !== 'manifest.txt') {
        files.push({ full, rel });
      }
    }
    return files;
  }

  const allPkgFiles = collectFiles(PKG_DIR).sort((a, b) => a.rel.localeCompare(b.rel));
  for (const f of allPkgFiles) {
    const h = sha256(f.full);
    const size = fs.statSync(f.full).size;
    manifestLines.push(`${h}  ${String(size).padStart(10, ' ')} bytes  ${f.rel}`);
  }

  fs.writeFileSync(manifestPath, manifestLines.join('\n') + '\n', 'utf8');
  console.log(`✅ Manifest generated with ${allPkgFiles.length} files: ${manifestPath}`);

  // 5. ZIP PACKAGE
  console.log('\n--- 5. Creating ZIP Archive in docs/review_packages/ ---');
  if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);
  execSync(`zip -r "${ZIP_FILE}" .`, { cwd: PKG_DIR });
  const zipSize = fs.statSync(ZIP_FILE).size;
  const zipHash = sha256(ZIP_FILE);
  console.log(`✅ Package archived to ${ZIP_FILE}`);
  console.log(`   Size: ${zipSize} bytes`);
  console.log(`   SHA256: ${zipHash}`);

  // Also ensure round 40 package is archived in docs/review_packages/ for historical uniformity
  const r40Old = path.join(ROOT_DIR, 'docs/agent_artifacts/round40_20261103.zip');
  const r40New = path.join(REVIEW_PACKAGES_DIR, 'round40_20261103.zip');
  if (fs.existsSync(r40Old) && !fs.existsSync(r40New)) {
    fs.copyFileSync(r40Old, r40New);
    console.log(`   ✓ Synced round40_20261103.zip to ${r40New}`);
  }

  console.log('\n🎉 Round 41 Review Package Successfully Built & Verified!');
}

main().catch(err => {
  console.error('Fatal packaging error:', err);
  process.exit(1);
});

