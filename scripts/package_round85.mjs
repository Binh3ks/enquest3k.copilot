/**
 * scripts/package_round85.mjs
 *
 * PACKAGES ROUND 85 DELIVERABLES INTO:
 *   docs/review_packages/round85_20261112.zip
 * and writes:
 *   docs/review_packages/manifest_round85.txt
 *
 * Commit ordering contract (matches Round 80-84):
 *   Commit 1: commit all Round 85 staged non-CLIL hubs, provenance, report, scripts & raw logs
 *             (leaving unrelated pre-existing workspace dirt untouched/unstaged).
 *   Then run: node scripts/package_round85.mjs
 *             which fails unless all Round 85 deliverablesPaths are committed clean at HEAD.
 *   Commit 2: commit ONLY docs/review_packages/manifest_round85.txt
 *             (round85_20261112.zip is gitignored via .gitignore).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R84_BASELINE_COMMIT = '0347975fb7f84808b23901179b562ba167853774';
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round85_20261112.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round85_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const scriptPaths = [
  'scripts/apply_round85_nonclil_b1.mjs',
  'scripts/audit_round85_nonclil_register.mjs',
  'scripts/audit_round84_b1_register.mjs',
  'scripts/package_round85.mjs',
];

const artifactPaths = [
  'docs/agent_artifacts/round85_report.md',
  'docs/agent_artifacts/round85_nonclil_register_raw.txt',
  'docs/agent_artifacts/round85_r84_check_raw.txt',
  'docs/agent_artifacts/round85_wave3_gate_raw.txt',
];

const stagingPaths = [];
for (const w of [126, 127, 133, 134]) {
  for (const f of [
    'vocab.js',
    'reading_hub.js',
    'listening_hub.js',
    'writing_hub.js',
    'speaking_hub.js',
    'skill_practice_hub.js',
    'provenance.json',
  ]) {
    stagingPaths.push(`docs/agent_artifacts/staging/week_${w}/${f}`);
  }
}

const deliverablesPaths = [...scriptPaths, ...artifactPaths, ...stagingPaths];

const untrackedOrModified = gitCmd(['status', '--porcelain', '--', ...deliverablesPaths]);
if (!ALLOW_UNCOMMITTED && untrackedOrModified) {
  fs.rmSync(TMP_STAGE, { recursive: true, force: true });
  console.error('❌ Refusing to stamp manifest while packaged deliverables have uncommitted/untracked changes:');
  console.error(untrackedOrModified);
  console.error('Commit all Round 85 deliverables FIRST (Commit 1), then run scripts/package_round85.mjs before Commit 2.');
  process.exit(1);
}

function copyIntoStage(relPath, targetRelPath = relPath) {
  const src = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(src)) throw new Error(`Missing required Round 85 file: ${relPath}`);
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

let zipManifest = `ROUND 85 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nScripts: ${scriptPaths.length} | Artifacts: ${artifactPaths.length} | Staging Files: ${stagingPaths.length}\n\nFILES:\n`;
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
const round85DeltaSummary = gitCmd(['diff', '--name-status', R84_BASELINE_COMMIT, deliverablesCommit]) || '(no committed delta vs baseline yet)';

const srcCodeDelta = gitCmd(['diff', '--name-status', R84_BASELINE_COMMIT, deliverablesCommit, '--', 'src/']) || '(none)';
const prodWeeksDelta = gitCmd(['diff', '--name-status', R84_BASELINE_COMMIT, deliverablesCommit, '--', 'src/data/weeks/']) || '(none)';
const publicDelta = gitCmd(['diff', '--name-status', R84_BASELINE_COMMIT, deliverablesCommit, '--', 'public/']) || '(none)';
const prodMapDelta = gitCmd(['diff', '--name-status', R84_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md']) || '(none)';
const govDelta = gitCmd([
  'diff', '--name-status', R84_BASELINE_COMMIT, deliverablesCommit, '--',
  'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md', 'docs/MASTER_ARCHITECTURE_W01_W156.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) || '(none)';
const unrelatedDirty = gitCmd(['status', '--short']) || '(clean)';

let hashLines = '';
for (const [f, h] of Object.entries(fileHashes)) {
  hashLines += `  ${h}  ${f}\n`;
}

const manifestText = `ROUND 85 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round84_baseline_commit:   ${R84_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in Round 85 deliverables)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round85.txt
                           (round85_20261112.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round85_20261112.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

ROUND 85 SCRIPTS, STAGING & ARTIFACT HASHES (SHA-256):
${hashLines}
LIVE GIT SCOPE DISCLOSURE (R84 BASELINE ${R84_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. src/ (including src/data/weeks/) delta (MUST be none):
   ${srcCodeDelta.replace(/\n/g, '\n   ')}
   (src/data/weeks/: ${prodWeeksDelta})
2. public/ delta (MUST be none):
   ${publicDelta}
3. Live Digital Map (docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md) delta (MUST be none):
   ${prodMapDelta}
4. Governance docs & freeze manifests delta (MUST be none):
   ${govDelta}
5. Full Round 85 deliverables delta (R84..deliverables_commit):
   ${round85DeltaSummary.replace(/\n/g, '\n   ')}
6. Remaining working-tree entries (pre-existing unrelated files left unstaged + current zip/manifest):
   ${unrelatedDirty.replace(/\n/g, '\n   ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round85.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);

