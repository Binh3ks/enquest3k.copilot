/**
 * scripts/package_round91.mjs
 *
 * PACKAGES ROUND 91 DELIVERABLES INTO:
 *   docs/review_packages/round91_20261113.zip
 * and writes:
 *   docs/review_packages/manifest_round91.txt
 *
 * Commit ordering contract (matches Round 80-90):
 *   Commit 1: commit all Round 91 deliverables, scripts, staged weeks & verification logs
 *             (leaving unrelated pre-existing workspace dirt untouched/unstaged).
 *   Then run: node scripts/package_round91.mjs
 *             which fails unless all Round 91 deliverablesPaths are committed clean at HEAD.
 *   Commit 2: commit ONLY docs/review_packages/manifest_round91.txt
 *             (round91_20261113.zip is gitignored via .gitignore).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R90_BASELINE_COMMIT = 'a30de82463e567f4cc49013ef284dec158497012';
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round91_20261113.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round91_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const scriptPaths = [
  'scripts/round91_data_generator.py',
  'scripts/round91_weeks_b.py',
  'scripts/round91_weeks_c.py',
  'scripts/generate_round91_weeks_c.py',
  'scripts/verify_round91_staging.mjs',
  'scripts/package_round91.mjs',
];

const artifactPaths = [
  'docs/agent_artifacts/round91_report.md',
  'docs/agent_artifacts/round91_verification_raw.txt',
];

const STAGED_WEEKS = [40, 42, 44, 47, 48, 49, 50, 51, 52, 53, 54];
const stagedFiles = [];
for (const w of STAGED_WEEKS) {
  const wDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging', `week_${w}`);
  if (fs.existsSync(wDir)) {
    const files = fs.readdirSync(wDir);
    for (const f of files) {
      stagedFiles.push(`docs/agent_artifacts/staging/week_${w}/${f}`);
    }
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
  console.error('Commit all Round 91 deliverables FIRST (Commit 1), then run scripts/package_round91.mjs before Commit 2.');
  process.exit(1);
}

function copyIntoStage(relPath, targetRelPath = relPath) {
  const src = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(src)) throw new Error(`Missing required Round 91 file: ${relPath}`);
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

let zipManifest = `ROUND 91 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nStaged Weeks: ${STAGED_WEEKS.length} | Staged Files: ${stagedFiles.length} | Scripts: ${scriptPaths.length} | Artifacts: ${artifactPaths.length}\n\nFILES:\n`;
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
const round91DeltaSummary = gitCmd(['diff', '--name-status', R90_BASELINE_COMMIT, deliverablesCommit]) || '(no committed delta vs baseline yet)';

const govGuardLockedFilesDelta = gitCmd([
  'diff', '--name-status', R90_BASELINE_COMMIT, deliverablesCommit, '--',
  'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) || '(none - 0 modifications to locked governance/freeze files)';

const prodSrcWeeksDelta = gitCmd([
  'diff', '--name-status', R90_BASELINE_COMMIT, deliverablesCommit, '--',
  'src/data/weeks/',
]) || '(none - 0 modifications to production src/data/weeks/ directory)';

const unrelatedDirty = gitCmd(['status', '--short']) || '(clean)';

let hashLines = '';
for (const [f, h] of Object.entries(fileHashes)) {
  hashLines += `  ${h}  ${f}\n`;
}

const manifestText = `ROUND 91 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round90_baseline_commit:   ${R90_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in Round 91 deliverables)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round91.txt
                           (round91_20261113.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round91_20261113.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

STAGED WEEKS INVENTORY:
  Total Weeks Staged:      ${STAGED_WEEKS.length} (W40, W42, W44, W47, W48, W49, W50, W51, W52, W53, W54)
  Total Staged Files:      ${stagedFiles.length} files across 11 directories
  Production Boundary:     ${prodSrcWeeksDelta}

ROUND 91 SCRIPTS, STAGED WEEKS & ARTIFACT HASHES (SHA-256):
${hashLines}
LIVE GIT SCOPE DISCLOSURE (R90 BASELINE ${R90_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. Locked governance files & freeze manifests delta (MUST be none):
   ${govGuardLockedFilesDelta}
2. Production src/data/weeks delta (MUST be none - Staged only):
   ${prodSrcWeeksDelta}
3. Full Round 91 deliverables delta (R90..deliverables_commit):
   ${round91DeltaSummary.replace(/\n/g, '\n   ')}
4. Remaining working-tree entries (pre-existing unrelated files left unstaged + current zip/manifest):
   ${unrelatedDirty.replace(/\n/g, '\n   ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round91.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);
