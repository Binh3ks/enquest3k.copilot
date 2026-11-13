/**
 * scripts/package_round89.mjs
 *
 * PACKAGES ROUND 89 DELIVERABLES INTO:
 *   docs/review_packages/round89_20261113.zip
 * and writes:
 *   docs/review_packages/manifest_round89.txt
 *
 * Commit ordering contract (matches Round 80-88):
 *   Commit 1: commit all Round 89 production deliverables, scripts, artifacts & regression logs
 *             (leaving unrelated pre-existing workspace dirt untouched/unstaged).
 *   Then run: node scripts/package_round89.mjs
 *             which fails unless all Round 89 deliverablesPaths are committed clean at HEAD.
 *   Commit 2: commit ONLY docs/review_packages/manifest_round89.txt
 *             (round89_20261113.zip is gitignored via .gitignore).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R88_BASELINE_COMMIT = '6e3e220578cf33b9577d6ec4cf302dc3888d8bd6';
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round89_20261113.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round89_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const WEEKS = [35, 38, 39, 41, 43, 45, 46, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 125];

const scriptPaths = [
  'scripts/expand_singapore_math_18weeks.mjs',
  'scripts/verify_round89_math_regression.mjs',
  'scripts/package_round89.mjs',
];

const artifactPaths = [
  'docs/agent_artifacts/round89_report.md',
  'docs/agent_artifacts/round89_math_regression_raw.txt',
];

const prodWeekPaths = WEEKS.map(w => `src/data/weeks/week_${w}/skill_practice_hub.js`);

const deliverablesPaths = [
  ...scriptPaths,
  ...artifactPaths,
  ...prodWeekPaths,
];

const untrackedOrModified = gitCmd(['status', '--porcelain', '--', ...deliverablesPaths]);
if (!ALLOW_UNCOMMITTED && untrackedOrModified) {
  fs.rmSync(TMP_STAGE, { recursive: true, force: true });
  console.error('❌ Refusing to stamp manifest while packaged deliverables have uncommitted/untracked changes:');
  console.error(untrackedOrModified);
  console.error('Commit all Round 89 deliverables FIRST (Commit 1), then run scripts/package_round89.mjs before Commit 2.');
  process.exit(1);
}

function copyIntoStage(relPath, targetRelPath = relPath) {
  const src = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(src)) throw new Error(`Missing required Round 89 file: ${relPath}`);
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

let zipManifest = `ROUND 89 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nScripts: ${scriptPaths.length} | Artifacts: ${artifactPaths.length} | Prod Weeks: ${prodWeekPaths.length}\n\nFILES:\n`;
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
const round89DeltaSummary = gitCmd(['diff', '--name-status', R88_BASELINE_COMMIT, deliverablesCommit]) || '(no committed delta vs baseline yet)';

const prodWeeksDelta = gitCmd(['diff', '--name-status', R88_BASELINE_COMMIT, deliverablesCommit, '--', 'src/data/weeks/']) || '(none)';
const govDelta = gitCmd([
  'diff', '--name-status', R88_BASELINE_COMMIT, deliverablesCommit, '--',
  'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md', 'docs/MASTER_ARCHITECTURE_W01_W156.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) || '(none)';
const unrelatedDirty = gitCmd(['status', '--short']) || '(clean)';

let hashLines = '';
for (const [f, h] of Object.entries(fileHashes)) {
  hashLines += `  ${h}  ${f}\n`;
}

// Calculate exact line deltas across the 18 production weeks
const lineDeltas = [];
for (const w of WEEKS) {
  const diffOutput = gitCmd(['diff', `${R88_BASELINE_COMMIT}..${deliverablesCommit}`, '--numstat', '--', `src/data/weeks/week_${w}/skill_practice_hub.js`]);
  lineDeltas.push(`   Week ${w.toString().padStart(3, ' ')}: numstat: ${diffOutput || '0 0'}`);
}

const manifestText = `ROUND 89 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round88_baseline_commit:   ${R88_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in Round 89 deliverables)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round89.txt
                           (round89_20261113.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round89_20261113.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

PER-WEEK NUMSTAT DELTAS IN skill_practice_hub.js (R88..Commit 1):
${lineDeltas.join('\n')}

ROUND 89 SCRIPTS, PROD WEEKS & ARTIFACT HASHES (SHA-256):
${hashLines}
LIVE GIT SCOPE DISCLOSURE (R88 BASELINE ${R88_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. Production weeks (src/data/weeks/) delta (18 skill_practice_hub.js expanded 2/5 -> 5/5):
   ${prodWeeksDelta.replace(/\n/g, '\n   ')}
2. Governance docs & freeze manifests delta (MUST be none):
   ${govDelta}
3. Full Round 89 deliverables delta (R88..deliverables_commit):
   ${round89DeltaSummary.replace(/\n/g, '\n   ')}
4. Remaining working-tree entries (pre-existing unrelated files left unstaged + current zip/manifest):
   ${unrelatedDirty.replace(/\n/g, '\n   ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round89.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);
