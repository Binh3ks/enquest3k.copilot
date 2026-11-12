/**
 * scripts/package_round83.mjs
 *
 * PACKAGES ROUND 83 DELIVERABLES INTO:
 *   docs/review_packages/round83_20261112.zip
 * and writes:
 *   docs/review_packages/manifest_round83.txt
 *
 * Commit ordering contract (matches Round 80-82):
 *   Commit 1: commit all Round 83 staged hubs, SVGs, provenance, scripts & raw logs
 *             (leaving unrelated pre-existing workspace dirt untouched/unstaged).
 *   Then run: node scripts/package_round83.mjs
 *             which fails unless all Round 83 deliverablesPaths are committed clean at HEAD.
 *   Commit 2: commit ONLY docs/review_packages/manifest_round83.txt
 *             (round83_20261112.zip is gitignored via .gitignore).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R82_BASELINE_COMMIT = '1e0039adbdf0ac56789b8d11e3e57888f5d00f44';
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round83_20261112.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round83_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const scriptPaths = [
  'scripts/run_round83_wave3_gates.mjs',
  'scripts/verify_round83.mjs',
  'scripts/package_round83.mjs',
];

const artifactPaths = [
  'docs/agent_artifacts/round83_wave3_gate_raw.txt',
  'docs/agent_artifacts/round83_verification_raw.txt',
];

const stagingPaths = [
  'docs/agent_artifacts/staging/week_126/reading_hub.js',
  'docs/agent_artifacts/staging/week_126/skill_practice_hub.js',
  'docs/agent_artifacts/staging/week_126/provenance.json',
  'docs/agent_artifacts/staging/week_127/reading_hub.js',
  'docs/agent_artifacts/staging/week_127/skill_practice_hub.js',
  'docs/agent_artifacts/staging/week_127/provenance.json',
  'docs/agent_artifacts/staging/week_133/reading_hub.js',
  'docs/agent_artifacts/staging/week_133/skill_practice_hub.js',
  'docs/agent_artifacts/staging/week_133/provenance.json',
  'docs/agent_artifacts/staging/week_134/reading_hub.js',
  'docs/agent_artifacts/staging/week_134/skill_practice_hub.js',
  'docs/agent_artifacts/staging/week_134/provenance.json',
  'docs/agent_artifacts/staging/week_133/svg/w133_angle_p1.svg',
  'docs/agent_artifacts/staging/week_133/svg/w133_angle_p2.svg',
  'docs/agent_artifacts/staging/week_133/svg/w133_angle_p3.svg',
  'docs/agent_artifacts/staging/week_133/svg/w133_angle_p4.svg',
  'docs/agent_artifacts/staging/week_133/svg/w133_angle_p5.svg',
  'docs/agent_artifacts/staging/week_134/svg/w134_triangle_p1.svg',
  'docs/agent_artifacts/staging/week_134/svg/w134_triangle_p2.svg',
  'docs/agent_artifacts/staging/week_134/svg/w134_triangle_p3.svg',
  'docs/agent_artifacts/staging/week_134/svg/w134_triangle_p4.svg',
  'docs/agent_artifacts/staging/week_134/svg/w134_triangle_p5.svg',
];

const deliverablesPaths = [...scriptPaths, ...artifactPaths, ...stagingPaths];

const untrackedOrModified = gitCmd(['status', '--porcelain', '--', ...deliverablesPaths]);
if (!ALLOW_UNCOMMITTED && untrackedOrModified) {
  fs.rmSync(TMP_STAGE, { recursive: true, force: true });
  console.error('❌ Refusing to stamp manifest while packaged deliverables have uncommitted/untracked changes:');
  console.error(untrackedOrModified);
  console.error('Commit all Round 83 deliverables FIRST (Commit 1), then run scripts/package_round83.mjs before Commit 2.');
  process.exit(1);
}

function copyIntoStage(relPath, targetRelPath = relPath) {
  const src = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(src)) throw new Error(`Missing required Round 83 file: ${relPath}`);
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

let zipManifest = `ROUND 83 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nScripts: ${scriptPaths.length} | Artifacts: ${artifactPaths.length} | Staging Files: ${stagingPaths.length}\n\nFILES:\n`;
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
const round83DeltaSummary = gitCmd(['diff', '--name-status', R82_BASELINE_COMMIT, deliverablesCommit]) || '(no committed delta vs baseline yet)';

const srcCodeDelta = gitCmd(['diff', '--name-status', R82_BASELINE_COMMIT, deliverablesCommit, '--', 'src/']) || '(none)';
const prodWeeksDelta = gitCmd(['diff', '--name-status', R82_BASELINE_COMMIT, deliverablesCommit, '--', 'src/data/weeks/']) || '(none)';
const publicDelta = gitCmd(['diff', '--name-status', R82_BASELINE_COMMIT, deliverablesCommit, '--', 'public/']) || '(none)';
const prodMapDelta = gitCmd(['diff', '--name-status', R82_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md']) || '(none)';
const govDelta = gitCmd([
  'diff', '--name-status', R82_BASELINE_COMMIT, deliverablesCommit, '--',
  'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md', 'docs/MASTER_ARCHITECTURE_W01_W156.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) || '(none)';
const unrelatedDirty = gitCmd(['status', '--short']) || '(clean)';

let hashLines = '';
for (const [f, h] of Object.entries(fileHashes)) {
  hashLines += `  ${h}  ${f}\n`;
}

const manifestText = `ROUND 83 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round82_baseline_commit:   ${R82_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in Round 83 deliverables)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round83.txt
                           (round83_20261112.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round83_20261112.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

ROUND 83 SCRIPTS, STAGING & ARTIFACT HASHES (SHA-256):
${hashLines}
LIVE GIT SCOPE DISCLOSURE (R82 BASELINE ${R82_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. src/ (including src/data/weeks/) delta (MUST be none):
   ${srcCodeDelta.replace(/\n/g, '\n   ')}
   (src/data/weeks/: ${prodWeeksDelta})
2. public/ delta (MUST be none):
   ${publicDelta}
3. Live Digital Map (docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md) delta (MUST be none):
   ${prodMapDelta}
4. Governance docs & freeze manifests delta (MUST be none):
   ${govDelta}
5. Full Round 83 deliverables delta (R82..deliverables_commit):
   ${round83DeltaSummary.replace(/\n/g, '\n   ')}
6. Remaining working-tree entries (pre-existing unrelated files left unstaged + current zip/manifest):
   ${unrelatedDirty.replace(/\n/g, '\n   ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round83.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);

