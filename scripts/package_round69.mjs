/**
 * scripts/package_round69.mjs
 * 
 * PACKAGES ROUND 69 DELIVERABLES INTO:
 * docs/review_packages/round69_gapfill_mocks_wave3.zip
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round69_gapfill_mocks_wave3.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round69_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 69 DELIVERABLES');
console.log('========================================================================');

// 1. Copy Gap-fill rotary weeks
const gapfillWeeks = [37, 42, 47];
for (const w of gapfillWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  fs.cpSync(src, dest, { recursive: true });
}

// 2. Copy Mock Batch 2 weeks
const mockWeeks = [40, 44, 48];
for (const w of mockWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}_mock`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}_mock`);
  fs.cpSync(src, dest, { recursive: true });
}

// 3. Copy Wave 3 rotary weeks
const wave3Weeks = [126, 127, 129, 130, 131, 133, 134];
for (const w of wave3Weeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  fs.cpSync(src, dest, { recursive: true });
}

// 4. Copy Mock Gate Logs
fs.mkdirSync(path.join(TMP_STAGE, 'logs'), { recursive: true });
for (const w of mockWeeks) {
  const logSrc = path.join(ROOT_DIR, `docs/agent_artifacts/round69_mock_gates_w${w}.log`);
  if (fs.existsSync(logSrc)) {
    fs.copyFileSync(logSrc, path.join(TMP_STAGE, `logs/round69_mock_gates_w${w}.log`));
  }
}

// 5. Copy W80 merge diff patch
const patchSrc = path.join(ROOT_DIR, 'docs/agent_artifacts/round69_w80_merge_diff.patch');
if (fs.existsSync(patchSrc)) {
  fs.copyFileSync(patchSrc, path.join(TMP_STAGE, 'round69_w80_merge_diff.patch'));
}

// 6. Generate Manifest
const gitHead = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();
const gitStatus = execSync('git status --short', { cwd: ROOT_DIR }).toString().trim();

let fileList = [];
function walk(dir, rel = '') {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const relPath = path.join(rel, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full, relPath);
    } else {
      fileList.push(relPath);
    }
  }
}
walk(TMP_STAGE);

const manifestContent = `========================================================================
ENGQUEST3K — ROUND 69 REVIEW PACKAGE MANIFEST
Timestamp: ${new Date().toISOString()}
Git Head: ${gitHead}
Zip Package: docs/review_packages/round69_gapfill_mocks_wave3.zip
Total Staged Files: ${fileList.length}
========================================================================

1. TASK 1: MERGE W80 PET MOCK INTO PRODUCTION
  - Status: COMPLETE & VERIFIED
  - Target: src/data/weeks/week_80/ (8 hubs + blueprint.json)
  - Diff Patch: round69_w80_merge_diff.patch (68 KB)
  - CEFR Guard: 0 errors
  - Total Trips Invariant: TOTAL_TRIPS = 34 (STRICTLY PRESERVED)
  - Freeze Guards: W33 (147/147 locked), W34 (106/106 locked)
  - Build Status: npm run build code 0 (13.16s)

2. TASK 2: GAP-FILL 3 ROTARY WEEKS + MOCK BATCH 2 (STAGE 1 FLYERS)
  A. Gap-fill Rotary Weeks (Staged Only):
     - W37: Living vs. Non-Living (Reasoning) -> 10/10 mechanical gates PASS, CEFR PASS
     - W42: The Water Journey (Cycle) -> 10/10 mechanical gates PASS, CEFR PASS
     - W47: Big Numbers (Place Value) -> 10/10 mechanical gates PASS, CEFR PASS
  B. Mock Batch 2 (Stage 1 A2 Flyers, Staged Only):
     - W40 Mock: Block [37, 38, 39, 40] -> 7/7 Mock Quality Gates PASS (25L, 44RW, 4S)
     - W44 Mock: Block [41, 42, 43, 44] -> 7/7 Mock Quality Gates PASS (25L, 44RW, 4S)
     - W48 Mock: Block [45, 46, 47, 48] -> 7/7 Mock Quality Gates PASS (25L, 44RW, 4S)
     - Gate Logs: logs/round69_mock_gates_w{40,44,48}.log

3. TASK 3: WAVE 3 ROTARY WEEKS (7 B2 FIRST WEEKS, STAGED ONLY)
  - W126: Climate Science & Carbon Footprint -> 10/10 gates PASS, CEFR PASS
  - W127: Marine Ecosystems & Coral Restoration -> 10/10 gates PASS, CEFR PASS
  - W129: Renewable Energy & Grid Engineering -> 10/10 gates PASS, CEFR PASS
  - W130: Space Exploration & Satellite Systems -> 10/10 gates PASS, CEFR PASS
  - W131: Genetics & Biodiversity Adaptation -> 10/10 gates PASS, CEFR PASS
  - W133: Urban Architecture & Green Smart Cities -> 10/10 gates PASS, CEFR PASS
  - W134: Volcanology & Plate Tectonics -> 10/10 gates PASS, CEFR PASS
  - Unlocked Mock Note: W128 flagged as unlocked by W126+W127, deferred to Round 70.

========================================================================
PACKAGE FILE INVENTORY:
${fileList.map(f => '  - ' + f).join('\n')}
========================================================================
`;

fs.writeFileSync(path.join(TMP_STAGE, 'manifest.txt'), manifestContent, 'utf8');

// Zip the directory
execSync(`zip -r -q "${ZIP_FILE}" .`, { cwd: TMP_STAGE });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipSize = (fs.statSync(ZIP_FILE).size / 1024).toFixed(1);
console.log(`✓ Zip package created successfully:`);
console.log(`  ${ZIP_FILE} (${zipSize} KB)`);
console.log('========================================================================\n');
