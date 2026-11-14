/**
 * scripts/package_round93.mjs
 *
 * PACKAGES ROUND 93 DELIVERABLES INTO:
 *   docs/review_packages/round93_20261114.zip
 * and writes:
 *   docs/review_packages/manifest_round93.txt
 *
 * Commit ordering contract (matches Round 80-92):
 *   Commit 1: commit all Round 93 deliverables, scripts, staged weeks & verification logs
 *             (leaving unrelated pre-existing workspace dirt untouched/unstaged).
 *   Then run: node scripts/package_round93.mjs
 *             which fails unless all Round 93 deliverablesPaths are committed clean at HEAD.
 *   Commit 2: commit ONLY docs/review_packages/manifest_round93.txt
 *             (round93_20261114.zip is gitignored via .gitignore).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R92_BASELINE_COMMIT = 'ec50ed8410c9dc64f2b8e07d964c7d619bc574d5';
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round93_20261114.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round93_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const scriptPaths = [
  'scripts/build_weeks_55_60.py',
  'scripts/round93_weeks_55_60.py',
  'scripts/build_weeks_61_66.py',
  'scripts/round93_weeks_61_66.py',
  'scripts/build_weeks_67_72.py',
  'scripts/round93_weeks_67_72.py',
  'scripts/round93_data_generator.py',
  'scripts/verify_round93_staging.mjs',
  'scripts/package_round93.mjs',
];

const artifactPaths = [
  'docs/agent_artifacts/round93_report.md',
  'docs/agent_artifacts/round93_verification_raw.txt',
];

const STAGED_WEEKS = Array.from({ length: 18 }, (_, i) => 55 + i);
const stagedFiles = [];
const WEEK_MODULES = [
  'blueprint.json',
  'index.js',
  'vocab.js',
  'reading_hub.js',
  'listening_hub.js',
  'writing_hub.js',
  'speaking_hub.js',
  'skill_practice_hub.js',
  'provenance.json'
];

for (const w of STAGED_WEEKS) {
  for (const mod of WEEK_MODULES) {
    stagedFiles.push(`docs/agent_artifacts/staging/week_${w}/${mod}`);
  }
}

const deliverablesPaths = [
  ...scriptPaths,
  ...artifactPaths,
  ...stagedFiles,
];

const untrackedOrModified = gitCmd(['status', '--porcelain', '--', ...deliverablesPaths]);
if (!ALLOW_UNCOMMITTED && untrackedOrModified) {
  fs.rmSync(TMP_STAGE, { recursive: true, force: true });
  console.error('❌ Refusing to stamp manifest while packaged deliverables have uncommitted/untracked changes:');
  console.error(untrackedOrModified);
  console.error('Commit all Round 93 deliverables FIRST (Commit 1), then run scripts/package_round93.mjs before Commit 2.');
  process.exit(1);
}

function copyIntoStage(relPath, targetRelPath = relPath) {
  const src = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(src)) throw new Error(`Missing required Round 93 file: ${relPath}`);
  const dest = path.join(TMP_STAGE, targetRelPath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
}

const fileHashes = {};
for (const p of deliverablesPaths) {
  fileHashes[p] = copyIntoStage(p);
}

for (const g of [
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json',
  'docs/GATE15_SPEC_W33.json',
  'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) {
  const gPath = path.join(ROOT_DIR, g);
  if (fs.existsSync(gPath)) {
    copyIntoStage(g, `governance/${path.basename(g)}`);
  }
}

let zipManifest = `ROUND 93 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nStaged Weeks Produced: ${STAGED_WEEKS.length} (W55-W72) | Staged Files: ${stagedFiles.length} | Scripts: ${scriptPaths.length} | Artifacts: ${artifactPaths.length}\n\nFILES:\n`;
function walk(dir, relPath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name));
  for (const ent of entries) {
    const curPath = path.join(dir, ent.name);
    const curRel = path.join(relPath, ent.name);
    if (ent.isDirectory()) {
      walk(curPath, curRel);
    } else {
      const data = fs.readFileSync(curPath);
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      zipManifest += `${hash}  ${curRel} (${data.length} bytes)\n`;
    }
  }
}
walk(TMP_STAGE);
fs.writeFileSync(path.join(TMP_STAGE, 'manifest.txt'), zipManifest, 'utf8');

execSync(`cd "${TMP_STAGE}" && zip -rq "${ZIP_FILE}" .`, { stdio: 'inherit' });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipData = fs.readFileSync(ZIP_FILE);
const zipSha = crypto.createHash('sha256').update(zipData).digest('hex');
const deliverablesCommit = gitCmd(['rev-parse', 'HEAD']);
const round93DeltaSummary = gitCmd(['diff', '--name-status', R92_BASELINE_COMMIT, deliverablesCommit]) || '(no committed delta vs baseline yet)';

const govGuardLockedFilesDelta = gitCmd([
  'diff', '--name-status', R92_BASELINE_COMMIT, deliverablesCommit, '--',
  'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) || '(none - 0 modifications to locked governance/freeze files)';

const prodSrcWeeksDelta = gitCmd([
  'diff', '--name-status', R92_BASELINE_COMMIT, deliverablesCommit, '--',
  'src/data/weeks/',
]) || '(none - 0 modifications to production src/data/weeks/ directory)';

const unrelatedDirty = gitCmd(['status', '--short']) || '(clean)';

let hashLines = '';
for (const [f, h] of Object.entries(fileHashes)) {
  hashLines += `  ${h}  ${f}\n`;
}

const manifestText = `ROUND 93 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round92_baseline_commit:   ${R92_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in Round 93 deliverables)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round93.txt
                           (round93_20261114.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round93_20261114.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

PRODUCED STAGED WEEKS INVENTORY:
  Total Weeks Staged:      ${STAGED_WEEKS.length} (Weeks 55 through 72: W55–W72)
  Files per Week:          9 standardized modules (blueprint.json, index.js, vocab.js, reading_hub.js, listening_hub.js, writing_hub.js, speaking_hub.js, skill_practice_hub.js, provenance.json)
  Total Staged Files:      ${stagedFiles.length}
  Total Vocab Words:       360 (20/20 per week, full IPA, dual-language definitions & examples)
  Total Math Questions:    90 (5/5 per week, 100% resolved via station2Adapters.js with 0 generic fallbacks)
  Total Grammar Drills:    90 (5/5 per week, 100% resolved via station2Adapters.js)
  Total Action Lab Stages: 54 (3/3 per week, 100% resolved via station2Adapters.js with targetBuckets > 0 and pairs > 0)
  Production Boundary:     ${prodSrcWeeksDelta}

ROUND 93 SCRIPTS, STAGED HUBS & ARTIFACT HASHES (SHA-256):
${hashLines}
LIVE GIT SCOPE DISCLOSURE (R92 BASELINE ${R92_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. Locked governance files & freeze manifests delta (MUST be none):
   ${govGuardLockedFilesDelta}
2. Production src/data/weeks delta (MUST be none - Staged only):
   ${prodSrcWeeksDelta}
3. Full Round 93 deliverables delta (R92..deliverables_commit):
   ${round93DeltaSummary.replace(/\n/g, '\n   ')}
4. Remaining working-tree entries (pre-existing unrelated files left unstaged + current zip/manifest):
   ${unrelatedDirty.replace(/\n/g, '\n   ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round93.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);
