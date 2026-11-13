/**
 * scripts/package_round86.mjs
 *
 * PACKAGES ROUND 86 DELIVERABLES INTO:
 *   docs/review_packages/round86_20261113.zip
 * and writes:
 *   docs/review_packages/manifest_round86.txt
 *
 * Commit ordering contract (matches Round 80-85):
 *   Commit 1: commit all Round 86 production deliverables, scripts, artifacts & regression logs
 *             (leaving unrelated pre-existing workspace dirt untouched/unstaged).
 *   Then run: node scripts/package_round86.mjs
 *             which fails unless all Round 86 deliverablesPaths are committed clean at HEAD.
 *   Commit 2: commit ONLY docs/review_packages/manifest_round86.txt
 *             (round86_20261113.zip is gitignored via .gitignore).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R85_BASELINE_COMMIT = '9d04116b416d1ba5d2d9fca9a56e98ecde7d4014';
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round86_20261113.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round86_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const scriptPaths = [
  'scripts/merge_wave3_production.mjs',
  'scripts/verify_round86_live_regression.mjs',
  'scripts/verify_round86_browser_e2e.mjs',
  'scripts/package_round86.mjs',
];

const artifactPaths = [
  'docs/agent_artifacts/round86_report.md',
  'docs/agent_artifacts/round86_live_regression_raw.txt',
  'docs/agent_artifacts/round86_browser_e2e_raw.txt',
  'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md',
];

const stagingPaths = [
  'docs/agent_artifacts/staging/week_126/provenance.json',
  'docs/agent_artifacts/staging/week_127/provenance.json',
  'docs/agent_artifacts/staging/week_133/provenance.json',
  'docs/agent_artifacts/staging/week_134/provenance.json',
];

const prodWeekPaths = [];
for (const w of [126, 127, 133, 134]) {
  for (const f of [
    'index.js',
    'vocab.js',
    'reading_hub.js',
    'listening_hub.js',
    'writing_hub.js',
    'speaking_hub.js',
    'skill_practice_hub.js',
    'provenance.json',
    'source_grounding.json',
  ]) {
    prodWeekPaths.push(`src/data/weeks/week_${w}/${f}`);
  }
}

// Add SVG files for W133 and W134 in src
const svgPaths = [];
for (let p = 1; p <= 5; p++) {
  svgPaths.push(`src/data/weeks/week_133/svg/w133_angle_p${p}.svg`);
  svgPaths.push(`src/data/weeks/week_134/svg/w134_triangle_p${p}.svg`);
}

const deliverablesPaths = [
  ...scriptPaths,
  ...artifactPaths,
  ...stagingPaths,
  ...prodWeekPaths,
  ...svgPaths,
];

const untrackedOrModified = gitCmd(['status', '--porcelain', '--', ...deliverablesPaths]);
if (!ALLOW_UNCOMMITTED && untrackedOrModified) {
  fs.rmSync(TMP_STAGE, { recursive: true, force: true });
  console.error('❌ Refusing to stamp manifest while packaged deliverables have uncommitted/untracked changes:');
  console.error(untrackedOrModified);
  console.error('Commit all Round 86 deliverables FIRST (Commit 1), then run scripts/package_round86.mjs before Commit 2.');
  process.exit(1);
}

function copyIntoStage(relPath, targetRelPath = relPath) {
  const src = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(src)) throw new Error(`Missing required Round 86 file: ${relPath}`);
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

let zipManifest = `ROUND 86 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nScripts: ${scriptPaths.length} | Artifacts: ${artifactPaths.length} | Staging: ${stagingPaths.length} | Prod Weeks: ${prodWeekPaths.length} | SVGs: ${svgPaths.length}\n\nFILES:\n`;
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
const round86DeltaSummary = gitCmd(['diff', '--name-status', R85_BASELINE_COMMIT, deliverablesCommit]) || '(no committed delta vs baseline yet)';

const prodWeeksDelta = gitCmd(['diff', '--name-status', R85_BASELINE_COMMIT, deliverablesCommit, '--', 'src/data/weeks/']) || '(none)';
const publicDelta = gitCmd(['diff', '--name-status', R85_BASELINE_COMMIT, deliverablesCommit, '--', 'public/']) || '(none)';
const prodMapDelta = gitCmd(['diff', '--name-status', R85_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md']) || '(none)';
const govDelta = gitCmd([
  'diff', '--name-status', R85_BASELINE_COMMIT, deliverablesCommit, '--',
  'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md', 'docs/MASTER_ARCHITECTURE_W01_W156.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) || '(none)';
const unrelatedDirty = gitCmd(['status', '--short']) || '(clean)';

let hashLines = '';
for (const [f, h] of Object.entries(fileHashes)) {
  hashLines += `  ${h}  ${f}\n`;
}

const manifestText = `ROUND 86 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round85_baseline_commit:   ${R85_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in Round 86 deliverables)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round86.txt
                           (round86_20261113.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round86_20261113.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

ROUND 86 SCRIPTS, PROD WEEKS & ARTIFACT HASHES (SHA-256):
${hashLines}
LIVE GIT SCOPE DISCLOSURE (R85 BASELINE ${R85_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. Production weeks (src/data/weeks/) delta (W126, W127, W133, W134 MERGED):
   ${prodWeeksDelta.replace(/\n/g, '\n   ')}
2. Public static assets (public/) delta (W133 & W134 SVGs):
   ${publicDelta.replace(/\n/g, '\n   ')}
3. Live Digital Map (docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md) delta (W126, W127, W133, W134 -> LIVE):
   ${prodMapDelta.replace(/\n/g, '\n   ')}
4. Governance docs & freeze manifests delta (MUST be none):
   ${govDelta}
5. Full Round 86 deliverables delta (R85..deliverables_commit):
   ${round86DeltaSummary.replace(/\n/g, '\n   ')}
6. Remaining working-tree entries (pre-existing unrelated files left unstaged + current zip/manifest):
   ${unrelatedDirty.replace(/\n/g, '\n   ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round86.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);
