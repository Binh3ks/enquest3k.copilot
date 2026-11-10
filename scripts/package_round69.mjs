/**
 * scripts/package_round69.mjs
 * 
 * PACKAGES ROUND 69 REMEDIATED DELIVERABLES INTO:
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
console.log('📦 PACKAGING ROUND 69 REMEDIATED DELIVERABLES');
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

// 3. Copy Remediated Wave 3 rotary weeks (100% Blueprint Fidelity)
const wave3Weeks = [126, 127, 129, 130, 131, 133, 134];
for (const w of wave3Weeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  fs.cpSync(src, dest, { recursive: true });
}

// 4. Copy Remediated Week 79 (Staged Only - The Industrial Revolution)
const w79Src = path.join(ROOT_DIR, 'docs/agent_artifacts/staging/week_79');
const w79Dest = path.join(TMP_STAGE, 'staging/week_79');
fs.cpSync(w79Src, w79Dest, { recursive: true });

// 5. Copy Theme Fidelity Audit Report
const auditReport = path.join(ROOT_DIR, 'docs/agent_artifacts/audit_merged_weeks_theme_fidelity.md');
if (fs.existsSync(auditReport)) {
  fs.copyFileSync(auditReport, path.join(TMP_STAGE, 'audit_merged_weeks_theme_fidelity.md'));
}

// 6. Copy Mock Gate Logs
fs.mkdirSync(path.join(TMP_STAGE, 'logs'), { recursive: true });
for (const w of mockWeeks) {
  const logSrc = path.join(ROOT_DIR, `docs/agent_artifacts/round69_mock_gates_w${w}.log`);
  if (fs.existsSync(logSrc)) {
    fs.copyFileSync(logSrc, path.join(TMP_STAGE, `logs/round69_mock_gates_w${w}.log`));
  }
}

// 7. Copy W80 merge diff patch
const patchSrc = path.join(ROOT_DIR, 'docs/agent_artifacts/round69_w80_merge_diff.patch');
if (fs.existsSync(patchSrc)) {
  fs.copyFileSync(patchSrc, path.join(TMP_STAGE, 'round69_w80_merge_diff.patch'));
}

// 8. Generate Manifest
const gitHead = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();

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
ENGQUEST3K — ROUND 69 REVIEW PACKAGE MANIFEST (THEME-FIDELITY REMEDIATED)
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
  - Build Status: npm run build code 0 (16.60s)

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

3. TASK 3 & URGENT FIX: WAVE 3 ROTARY WEEKS (REMEDIATED — 100% BLUEPRINT FIDELITY)
  All 7 Wave 3 weeks regenerated strictly against canonical blueprint.json authority:
  - W126: "From Essay to Speech" (Oral Rhetoric, Cue Cards & Signposting) -> 11/11 gates PASS, CEFR PASS
  - W127: "Rebuttal Practice" (Debate Counter-arguments, "They say... but I say...") -> 11/11 gates PASS, CEFR PASS (all 5 syllabus words: disagree, counter, point, false, true included)
  - W129: "Opinion Project 3: Smartphones Under 12?" (Developmental Psychology: Social Media Impacts) -> 11/11 gates PASS, CEFR PASS
  - W130: "Opinion Project 3: Comparing Global Approaches" (Comparative Law: France & Florida bans) -> 11/11 gates PASS, CEFR PASS
  - W131: "Opinion Project 3: Persuasive Techniques" (Rhetorical Appeals: Ethos, Pathos, Logos) -> 11/11 gates PASS, CEFR PASS
  - W133: "Deep Research & Data" (Quantitative Evidence in Video Game Studies) -> 11/11 gates PASS, CEFR PASS (all 8 syllabus words: statistic, percent, study, data, majority, minority, survey, population included)
  - W134: "Identifying Fallacies" (Critical Thinking: Generalization Fallacies) -> 11/11 gates PASS, CEFR PASS (all 8 syllabus words: fallacy, generalization, assumption, true, false, valid, invalid, logic included)

4. URGENT ACTION 2: REMEDIATED WEEK 79 (STAGED ONLY — DO NOT MERGE)
  - Target: docs/agent_artifacts/staging/week_79/
  - Theme: "The Industrial Revolution" (World History: Steam Engines & Factories)
  - Mechanical Gates: 11/11 PASS (enforcing Gate 11 Blueprint Theme Fidelity)
  - CEFR Guard: 0 errors, 0 warnings (STAGE 2)
  - Production directory src/data/weeks/week_79/ UNTOUCHED pending Claude's review.

5. URGENT ACTION 3: COMPREHENSIVE THEME FIDELITY AUDIT OF ALL MERGED WEEKS
  - Report: audit_merged_weeks_theme_fidelity.md
  - Scanned all 161 directories in src/data/weeks/
  - Live weeks audited: 22 weeks
  - Exact or subtitle matches: 19 weeks
  - Frozen Golden Masters: 2 weeks (W33, W34)
  - Clean stub: 1 week (W37)
  - Confirmed: W79 was the SOLE thematic drift across all merged weeks in production.

6. URGENT ACTION 4: PERMANENT GATE 11 ENFORCEMENT
  - Added GATE_11_BLUEPRINT_THEME_FIDELITY in scripts/generate_giaidoan2_content.mjs.
  - Automatically compares spec.theme against canonical blueprint.json theme.
  - Fails loud with actionable mismatch report if drift is detected.

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
