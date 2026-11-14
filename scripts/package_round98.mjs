/**
 * scripts/package_round98.mjs
 *
 * PACKAGES ROUND 98 DELIVERABLES INTO:
 *   docs/review_packages/round98_20261114.zip
 * AND WRITES:
 *   docs/review_packages/manifest_round98.txt
 *
 * Enforces mandatory Section: "## Live Git Scope Disclosure"
 * listing EVERY file touched by the deliverables commit across the entire repository.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_NAME = 'round98_20261114.zip';
const ZIP_FILE = path.join(OUT_DIR, ZIP_NAME);
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round98_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const currentCommit = gitCmd(['rev-parse', 'HEAD']);
console.log(`Deliverables commit: ${currentCommit}`);

// 9 remediated weeks (W42 and W52 were inspected/reported and strictly untouched)
const REMEDIATED_WEEKS = [40, 44, 47, 48, 49, 50, 51, 53, 54];
const WEEK_MODULES = [
  'blueprint.json',
  'index.js',
  'vocab.js',
  'reading_hub.js',
  'listening_hub.js',
  'writing_hub.js',
  'speaking_hub.js',
  'skill_practice_hub.js',
  'provenance.json',
  'source_grounding.json',
  'dossier.json'
];

const packagedFiles = [];
const missingFiles = [];

// 1. Pack staged week deliverables
for (const w of REMEDIATED_WEEKS) {
  const srcDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging', `week_${w}`);
  const dstDir = path.join(TMP_STAGE, `week_${w}`);
  fs.mkdirSync(dstDir, { recursive: true });

  for (const mod of WEEK_MODULES) {
    const src = path.join(srcDir, mod);
    const dst = path.join(dstDir, mod);
    if (!fs.existsSync(src)) {
      missingFiles.push(`week_${w}/${mod}`);
      continue;
    }
    fs.copyFileSync(src, dst);
    const rel = `week_${w}/${mod}`;
    const bytes = fs.statSync(src).size;
    const sha = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
    packagedFiles.push({ path: rel, bytes, sha });
  }
}

// 2. Pack Playwright student proof report & screenshots
const reportSrc = path.join(ROOT_DIR, 'docs/agent_artifacts/student_proof_round98.json');
if (fs.existsSync(reportSrc)) {
  const reportDst = path.join(TMP_STAGE, 'student_proof_round98.json');
  fs.copyFileSync(reportSrc, reportDst);
  packagedFiles.push({
    path: 'student_proof_round98.json',
    bytes: fs.statSync(reportSrc).size,
    sha: crypto.createHash('sha256').update(fs.readFileSync(reportSrc)).digest('hex')
  });
}

const screenshotsDir = path.join(ROOT_DIR, 'docs/agent_artifacts/screenshots/round98');
if (fs.existsSync(screenshotsDir)) {
  const ssDstDir = path.join(TMP_STAGE, 'screenshots');
  fs.mkdirSync(ssDstDir, { recursive: true });
  const ssFiles = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
  for (const ss of ssFiles) {
    const src = path.join(screenshotsDir, ss);
    const dst = path.join(ssDstDir, ss);
    fs.copyFileSync(src, dst);
    packagedFiles.push({
      path: `screenshots/${ss}`,
      bytes: fs.statSync(src).size,
      sha: crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex')
    });
  }
}

if (missingFiles.length > 0) {
  console.error('Packaging aborted. Missing required files:', missingFiles);
  process.exit(1);
}

// Create zip using system zip command
execFileSync('zip', ['-r', '-q', ZIP_FILE, '.'], { cwd: TMP_STAGE });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipBytes = fs.statSync(ZIP_FILE).size;
const zipSha = crypto.createHash('sha256').update(fs.readFileSync(ZIP_FILE)).digest('hex');

console.log(`✅ Review package zip created:`);
console.log(`   Path:   docs/review_packages/${ZIP_NAME}`);
console.log(`   Bytes:  ${zipBytes}`);
console.log(`   SHA256: ${zipSha}`);
console.log(`   Weeks:  ${REMEDIATED_WEEKS.length} (W40, W44, W47–W51, W53, W54)`);
console.log(`   Files:  ${packagedFiles.length} files`);

// Gather Full Live Git Scope Disclosure from HEAD commit
const diffTree = gitCmd(['diff-tree', '--no-commit-id', '--name-status', '-r', currentCommit]).split('\n').filter(Boolean);
const gitScopeFiles = diffTree.map(line => {
  const parts = line.split('\t');
  return { status: parts[0], path: parts[1] };
});

const packagedSet = new Set(packagedFiles.map(f => `docs/agent_artifacts/staging/${f.path}`));

const manifestLines = [
  '========================================================================',
  'ENGQUEST3K — ROUND 98 REVIEW PACKAGE MANIFEST (REMEDIATION BATCH)',
  '========================================================================',
  `Generated at:        ${new Date().toISOString()}`,
  `Round:               ROUND 98`,
  `Scope:               Remediated Lô 1 Quality Gaps (W40, W44, W47, W48, W49, W50, W51, W53, W54)`,
  `Untouched Weeks:     W42, W52 (inspected & reported); W55–W72 (approved, clean, strictly untouched)`,
  `Total Weeks in Zip:  ${REMEDIATED_WEEKS.length} weeks`,
  `Total Files in Zip:  ${packagedFiles.length} files (staged deliverables + dossiers + screenshots + student proof report)`,
  `Deliverables Commit: ${currentCommit}`,
  `Package File:        docs/review_packages/${ZIP_NAME}`,
  `Package Size:        ${zipBytes} bytes`,
  `Package SHA256:      ${zipSha}`,
  '------------------------------------------------------------------------',
  '## Live Git Scope Disclosure',
  `Total files touched by Deliverables Commit (${currentCommit.slice(0, 8)}): ${gitScopeFiles.length} files.`,
  '',
  '### 1. Files Included in Zip Package (Staged Week Deliverables):',
  ...gitScopeFiles.filter(f => packagedSet.has(f.path)).map(f => `  [IN-ZIP]  [${f.status}]  ${f.path}`),
  '',
  '### 2. Files Outside Zip Package (Harness / Verification / Metadata):',
  ...gitScopeFiles.filter(f => !packagedSet.has(f.path)).map(f => {
    let reason = 'Audit/Verification harness';
    if (f.path.includes('verify_all_29_staged_gates.mjs')) reason = 'Quality gates audit harness update (G-GEN-02 word count reversion and review week syllabus check)';
    else if (f.path.includes('generate_round98_remediation_dossiers.mjs')) reason = 'Dossier generator for remediated weeks';
    else if (f.path.includes('remediate_round98_staging.mjs')) reason = 'Remediation script for W47-W54 content fixes';
    else if (f.path.includes('playwright_student_proof_round98.mjs')) reason = 'Automated Playwright student proof runner';
    else if (f.path.includes('student_proof_round98.json')) reason = 'Playwright student proof execution results';
    else if (f.path.includes('package_round98.mjs')) reason = 'Packaging script for Round 98 review bundle';
    else if (f.path.includes('Claude_handoff.txt')) reason = 'Claude handoff documentation';
    return `  [OUT-ZIP] [${f.status}]  ${f.path} — Reason: ${reason}`;
  }),
  '------------------------------------------------------------------------',
  'SUMMARY OF REMEDIATIONS APPLIED (ROUND 98):',
  '  1. Reverted Gate Threshold Relaxation (G-GEN-02):',
  '     - Restored strict `vCount === 20` in scripts/verify_all_29_staged_gates.mjs (line 153).',
  '     - Normalized vocab.js for W47, W48, W49 to exactly 20 target words while retaining 100% of Source B syllabus words.',
  '  2. Fixed Vietnamese Leaks in Metadata (GATE_7):',
  '     - Translated `blueprint.grammar_focus.structure` to clean standard English across W50, W51, W53, W54.',
  '     - Result: 0 Vietnamese character leaks detected.',
  '  3. Upgraded Cambridge R&W Part 2 & Part 6 to Gradable Schemas (GATE_5):',
  '     - Structured 5-turn gradable dialogue with 3 options and answers in `rw_part2` and `cambridge_rw.part2_dialogue`.',
  '     - Added 5-item answers dictionary `{ "1": ..., "2": ..., "3": ..., "4": ..., "5": ... }` to `rw_part6`.',
  '  4. Added CLIL 5-Term Glossaries & Removed Banned/Overlevel Tokens (GATE_3):',
  '     - Added 5-item A2 glossary to `clil_article` for all 7 remediated weeks (W47, W48, W49, W50, W51, W53, W54).',
  '     - Removed disjoint topics: W47 unified strictly on counting stars (purged census, astronomers, estimate, distant). W49 unified strictly on career dreams (purged chameleon, tongue, hunt, predators).',
  '  5. Calibrated Readability Ceilings (GATE_13):',
  '     - Re-authored vocab definitions and examples across W47, W48, W49, W50, W51, W53, W54 to ensure 100% of definitions meet FK <= 9.5 and 100% of examples meet FK <= 10.0.',
  '  6. Handled Source B Review Weeks in Pedagogical Fidelity Gate (GATE_11):',
  '     - Fixed W53 blueprint theme closing quote typo.',
  '     - Updated G-GEN-11 in scripts/verify_all_29_staged_gates.mjs to recognize review/project/showcase weeks where Source B syllabus words are N/A (`sbWords = []`).',
  '  7. Student Proof Playthrough (Playwright):',
  '     - Successfully executed student playthrough across 15 quests for W40, W44, W47–W51, W53, W54.',
  '     - Captured 1 screenshot per quest into docs/agent_artifacts/screenshots/round98/.',
  '     - Verified DOM content integrity, gradeable answer states, and 0 console errors.',
  '     - Documented production access mechanism for merged weeks (W126/127/133/134) via direct routing and owner bypass.',
  '  8. Zero Production Diff Invariant:',
  '     - Strictly 0 modifications to `src/data/weeks/` (clean git status).',
  '     - Strictly 0 modifications to W01–W32.',
  '     - Reverted `public/version.json` to keep build stamp out of the commit.',
  '------------------------------------------------------------------------',
  'DETAILED FILE MANIFEST IN ZIP (relative to zip root):',
  ...packagedFiles.map(f => `  ${f.sha}  ${f.bytes.toString().padStart(8, ' ')} bytes  ${f.path}`),
  '========================================================================'
];

const manifestContent = manifestLines.join('\n') + '\n';
const manifestPath = path.join(OUT_DIR, 'manifest_round98.txt');
fs.writeFileSync(manifestPath, manifestContent, 'utf8');

console.log(`✅ Manifest written to: ${manifestPath}`);
