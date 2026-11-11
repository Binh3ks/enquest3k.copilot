/**
 * scripts/package_round81.mjs
 *
 * PACKAGES ROUND 81 DELIVERABLES INTO:
 *   docs/review_packages/round81_20261111.zip
 * and writes:
 *   docs/review_packages/manifest_round81.txt
 *
 * Commit ordering contract (matches Round 80):
 *   Commit 1: commit all Round 81 code, scripts, proposals & raw verification files
 *             (leaving unrelated pre-existing workspace dirt untouched/unstaged).
 *   Then run: node scripts/package_round81.mjs
 *             which fails unless all Round 81 deliverablesPaths are committed clean at HEAD.
 *   Commit 2: commit ONLY docs/review_packages/manifest_round81.txt
 *             (round81_20261111.zip is gitignored via .gitignore).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R80_BASELINE_COMMIT = '31d2e7202366acf9bde2110e59277f1af6fe8169';
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round81_20261111.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round81_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const codePaths = [
  'src/utils/station2Adapters.js',
  'src/components/cambridge/RWPart3PetMCQ.jsx',
  'src/modules/hubs/station2/LearnMode/BarModelQuest.jsx',
  'src/modules/hubs/station2/LearnMode/SentenceBuilderBattle.jsx',
  'src/modules/hubs/station2/LearnMode/ScienceDragDropLab.jsx',
  'src/config/zoneDataMapper.js',
  'src/config/bossRotarySchedule.js',
  'src/modules/zones/BossBattleZone.jsx',
  'src/modules/zones/BattleArenaZone.jsx',
  'src/components/zones/BossIntro.jsx',
];

const scriptPaths = [
  'scripts/gate13_rotary_schedule.mjs',
  'scripts/generate_round81_b5_proposal.mjs',
  'scripts/verify_round81_all.mjs',
  'scripts/verify_round81_browser_e2e.mjs',
  'scripts/package_round81.mjs',
];

const artifactPaths = [
  'docs/agent_artifacts/round81_verification_raw.txt',
  'docs/agent_artifacts/round81_browser_e2e_raw.txt',
  'docs/agent_artifacts/round81_proposed_digital_map_v2.md',
];

const tempBlueprintPaths = [];
for (let w = 1; w <= 156; w++) {
  tempBlueprintPaths.push(`docs/agent_artifacts/round81_temp_blueprints/week_${w}_blueprint.json`);
}

const deliverablesPaths = [...codePaths, ...scriptPaths, ...artifactPaths, ...tempBlueprintPaths];

const untrackedOrModified = gitCmd(['status', '--porcelain', '--', ...deliverablesPaths]);
if (!ALLOW_UNCOMMITTED && untrackedOrModified) {
  fs.rmSync(TMP_STAGE, { recursive: true, force: true });
  console.error('❌ Refusing to stamp manifest while packaged deliverables have uncommitted/untracked changes:');
  console.error(untrackedOrModified);
  console.error('Commit all Round 81 deliverables FIRST (Commit 1), then run scripts/package_round81.mjs before Commit 2.');
  process.exit(1);
}

function copyIntoStage(relPath, targetRelPath = relPath) {
  const src = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(src)) throw new Error(`Missing required Round 81 file: ${relPath}`);
  const dest = path.join(TMP_STAGE, targetRelPath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
}

const fileHashes = {};
for (const p of [...codePaths, ...scriptPaths, ...artifactPaths]) {
  fileHashes[p] = copyIntoStage(p);
}

// Stage all 156 temporary B.5 blueprints cleanly
let blueprintHashConcat = '';
for (const bp of tempBlueprintPaths) {
  const h = copyIntoStage(bp);
  blueprintHashConcat += `${h}  ${bp}\n`;
}
const blueprintsBundleSha = crypto.createHash('sha256').update(blueprintHashConcat).digest('hex');

// Governance snapshot files (read-only verification copy)
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

let zipManifest = `ROUND 81 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nCode files: ${codePaths.length} | Scripts: ${scriptPaths.length} | Artifacts: ${artifactPaths.length} | Temp Blueprints: ${tempBlueprintPaths.length}\n\nFILES:\n`;
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
const round81DeltaSummary = gitCmd(['diff', '--name-status', R80_BASELINE_COMMIT, deliverablesCommit]) || '(no committed delta vs baseline yet)';

// Sensitive scope guards
const prodWeeksDelta = gitCmd(['diff', '--name-status', R80_BASELINE_COMMIT, deliverablesCommit, '--', 'src/data/weeks/']) || '(none)';
const prodMapDelta = gitCmd(['diff', '--name-status', R80_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md']) || '(none)';
const stagingDelta = gitCmd(['diff', '--name-status', R80_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/agent_artifacts/staging/']) || '(none)';
const govDelta = gitCmd([
  'diff', '--name-status', R80_BASELINE_COMMIT, deliverablesCommit, '--',
  'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md', 'docs/MASTER_ARCHITECTURE_W01_W156.md',
  'docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json',
]) || '(none)';
const unrelatedDirty = gitCmd(['status', '--short']) || '(clean)';

let hashLines = '';
for (const [f, h] of Object.entries(fileHashes)) {
  hashLines += `  ${h}  ${f}\n`;
}

const manifestText = `ROUND 81 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round80_baseline_commit:   ${R80_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in Round 81 deliverables)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round81.txt
                           (round81_20261111.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round81_20261111.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

ROUND 81 CODE, SCRIPTS & ARTIFACT HASHES (SHA-256):
${hashLines}  ${blueprintsBundleSha}  docs/agent_artifacts/round81_temp_blueprints/*.json (${tempBlueprintPaths.length} files digest)

LIVE GIT SCOPE DISCLOSURE (R80 BASELINE ${R80_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. src/data/weeks/ delta (MUST be none):
   ${prodWeeksDelta.replace(/\n/g, '\n   ')}
2. Live Digital Map (docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md) delta (MUST be none):
   ${prodMapDelta}
3. Staging (docs/agent_artifacts/staging/) delta (MUST be none):
   ${stagingDelta}
4. Governance docs & freeze manifests delta (MUST be none):
   ${govDelta}
5. Full Round 81 deliverables delta (R80..deliverables_commit):
   ${round81DeltaSummary.replace(/\n/g, '\n   ')}
6. Remaining working-tree entries (pre-existing unrelated files left unstaged + current zip/manifest):
   ${unrelatedDirty.replace(/\n/g, '\n   ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round81.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);

