/**
 * scripts/package_round80.mjs
 *
 * PACKAGES ROUND 80 DELIVERABLES INTO:
 *   docs/review_packages/round80_20261111.zip
 * and writes:
 *   docs/review_packages/manifest_round80.txt
 *
 * Fixes both recurring manifest/packaging issues:
 *   1. Programmatic staging disclosure (git status + diff vs R79 baseline b14ae83b
 *      + git log -n 5 --stat + live provenance.json review_status readout).
 *   2. Explicit deliverables_commit cleanliness check & commit ordering contract
 *      so zip & manifest hashes strictly correspond to committed deliverables_commit HEAD.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync, execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const R79_BASELINE_COMMIT = 'b14ae83bfc81e12222d81e90c5ba603a926112b9';
const FIXED_17_WEEKS = [38, 39, 41, 43, 45, 46, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 125];
const STAGED_WEEKS = [79, 126, 127, 129, 130, 131, 133, 134];
const ALLOW_UNCOMMITTED = process.argv.includes('--allow-uncommitted');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round80_20261111.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round80_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const deliverablesPaths = [
  ...FIXED_17_WEEKS.map((w) => `src/data/weeks/week_${w}/index.js`),
  'docs/agent_artifacts/round80_loader_fix_raw.txt',
  'docs/agent_artifacts/round80_proposed_digital_map_v2.md',
  'docs/agent_artifacts/round80_mock_format_and_rotary_proposal.md',
  'docs/agent_artifacts/round80_decisions_raw.txt',
  'scripts/verify_round80_loader_fix.mjs',
  'scripts/generate_round80_decisions_and_proposals.mjs',
  'scripts/package_round80.mjs',
];

const untrackedOrModified = gitCmd(['status', '--porcelain', '--', ...deliverablesPaths]);
if (!ALLOW_UNCOMMITTED && untrackedOrModified) {
  fs.rmSync(TMP_STAGE, { recursive: true, force: true });
  console.error('❌ Refusing to stamp manifest while packaged deliverables have uncommitted/untracked changes:');
  console.error(untrackedOrModified);
  console.error('Commit all Round 80 deliverables FIRST (Commit 1), then run scripts/package_round80.mjs before Commit 2.');
  process.exit(1);
}

const artifactsToInclude = [
  'docs/agent_artifacts/round80_loader_fix_raw.txt',
  'docs/agent_artifacts/round80_proposed_digital_map_v2.md',
  'docs/agent_artifacts/round80_mock_format_and_rotary_proposal.md',
  'docs/agent_artifacts/round80_decisions_raw.txt',
  'docs/agent_artifacts/round79_proposed_digital_map_v2.md',
  'docs/agent_artifacts/round79_wave3_acceptance_spec_v2.md',
];

fs.mkdirSync(path.join(TMP_STAGE, 'artifacts'), { recursive: true });
const rawFileHashes = {};
for (const a of artifactsToInclude) {
  const src = path.join(ROOT_DIR, a);
  if (!fs.existsSync(src)) throw new Error(`Missing required artifact: ${a}`);
  fs.copyFileSync(src, path.join(TMP_STAGE, 'artifacts', path.basename(a)));
  rawFileHashes[a] = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
}

// Copy 17 fixed week_NN/index.js files preserving week folder structure
const weekIndexHashes = {};
for (const w of FIXED_17_WEEKS) {
  const rel = `src/data/weeks/week_${w}/index.js`;
  const src = path.join(ROOT_DIR, rel);
  if (!fs.existsSync(src)) throw new Error(`Missing required week index wrapper: ${rel}`);
  const dest = path.join(TMP_STAGE, 'fixed_week_indexes', `week_${w}`, 'index.js');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  weekIndexHashes[rel] = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
}

// Copy scripts
const scriptsToInclude = [
  'scripts/verify_round80_loader_fix.mjs',
  'scripts/generate_round80_decisions_and_proposals.mjs',
  'scripts/package_round80.mjs',
  'scripts/lib/source_b_part2_parser.mjs',
  'scripts/guard_governance_docs.mjs',
  'scripts/guard_golden_w33_freeze.mjs',
];
const scriptHashes = {};
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (!fs.existsSync(src)) throw new Error(`Missing required script: ${s}`);
  const dest = path.join(TMP_STAGE, s);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  scriptHashes[s] = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
}

// Copy governance JSON snapshots
fs.mkdirSync(path.join(TMP_STAGE, 'governance'), { recursive: true });
for (const g of ['docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json']) {
  const src = path.join(ROOT_DIR, g);
  fs.copyFileSync(src, path.join(TMP_STAGE, 'governance', path.basename(g)));
}

// Copy staging reference dirs
for (const w of STAGED_WEEKS) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  fs.cpSync(src, dest, { recursive: true });
}

// Build internal zip manifest
let zipManifest = `ROUND 80 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nFixed Week Indexes: ${FIXED_17_WEEKS.length}\n\nFILES:\n`;
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

// Compute live git introspection for manifest_round80.txt
const zipData = fs.readFileSync(ZIP_FILE);
const zipSha = crypto.createHash('sha256').update(zipData).digest('hex');
const deliverablesCommit = gitCmd(['rev-parse', 'HEAD']);
const round80DeltaSummary = gitCmd(['diff', '--name-status', R79_BASELINE_COMMIT, deliverablesCommit]);

// Scope introspection across sensitive paths
const prodWeeksDelta = gitCmd(['diff', '--name-status', R79_BASELINE_COMMIT, deliverablesCommit, '--', 'src/data/weeks/']) || '(none)';
const prodConfigDelta = gitCmd(['diff', '--name-status', R79_BASELINE_COMMIT, deliverablesCommit, '--', 'src/config/bossRotarySchedule.js']) || '(none)';
const prodMapDelta = gitCmd(['diff', '--name-status', R79_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md']) || '(none)';
const govDelta = gitCmd(['diff', '--name-status', R79_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/ARCHITECTURE_CURRENT.md', 'AGENTS.md', 'docs/WEEK_PRODUCTION_SOP.md', 'docs/MASTER_ARCHITECTURE_W01_W156.md']) || '(none)';

// Programmatic staging inspection (BOTH Round 80 delta AND historical touches + current review_status)
const stagingWorkingStatus = gitCmd(['status', '--porcelain', '--', 'docs/agent_artifacts/staging/']) || '(clean)';
const stagingR80Diff = gitCmd(['diff', '--name-status', R79_BASELINE_COMMIT, deliverablesCommit, '--', 'docs/agent_artifacts/staging/']) || '(none)';
const stagingRecentLog = gitCmd(['log', '-n', '5', '--oneline', '--name-status', '--', 'docs/agent_artifacts/staging/']);

const stagingProvenanceStatuses = STAGED_WEEKS.map((w) => {
  const pPath = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}/provenance.json`);
  if (!fs.existsSync(pPath)) return `  week_${w}: provenance.json MISSING`;
  const p = JSON.parse(fs.readFileSync(pPath, 'utf8'));
  return `  week_${w}: review_status=${JSON.stringify(p.review_status ?? null)}, status=${JSON.stringify(p.status ?? null)}, updated_at=${JSON.stringify(p.updated_at || p.generated_at || null)}`;
});

let hashLines = '';
for (const [f, h] of Object.entries(rawFileHashes)) hashLines += `  ${h}  ${f}\n`;
for (const [f, h] of Object.entries(scriptHashes)) hashLines += `  ${h}  ${f}\n`;
let idxLines = '';
for (const [f, h] of Object.entries(weekIndexHashes)) idxLines += `  ${h}  ${f}\n`;

const manifestText = `ROUND 80 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:                 ${new Date().toISOString()}
round79_baseline_commit:   ${R79_BASELINE_COMMIT}
deliverables_commit:       ${deliverablesCommit}
deliverables_clean_check:  ${untrackedOrModified ? 'WARN_ALLOW_UNCOMMITTED' : 'PASS (0 uncommitted/untracked changes in packaged paths)'}
manifest_commit_contract:  Generated strictly AFTER Commit 1 (deliverables_commit).
                           Commit 2 ONLY adds docs/review_packages/manifest_round80.txt
                           (round80_20261111.zip is gitignored via .gitignore; 0 code/artifact delta in Commit 2).

ZIP PACKAGE:
  Path:    docs/review_packages/round80_20261111.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

ROUND 80 ARTIFACTS & SCRIPTS (SHA-256):
${hashLines}
FIXED WEEK ENTRYPOINTS (${FIXED_17_WEEKS.length}/17 — PRIORITY 1):
${idxLines}
LIVE GIT SCOPE DISCLOSURE (R79 BASELINE ${R79_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}):
1. src/config/bossRotarySchedule.js delta:
   ${prodConfigDelta.replace(/\n/g, '\n   ')}
2. Digital Map & Governance docs delta:
   Digital Map: ${prodMapDelta}
   Governance:  ${govDelta}
3. src/data/weeks/ delta (expected ONLY 17 new week_{N}/index.js files; 0 edits to W33..37, blueprint.json, or hub content):
   ${prodWeeksDelta.replace(/\n/g, '\n   ')}
4. Full deliverables delta (R79..deliverables_commit):
   ${(round80DeltaSummary || '(allow-uncommitted pre-commit run)').replace(/\n/g, '\n   ')}

LIVE STAGING DISCLOSURE (docs/agent_artifacts/staging/ — PROGRAMMATICALLY INSPECTED):
- Working tree status: ${stagingWorkingStatus}
- Round 80 delta (${R79_BASELINE_COMMIT.slice(0, 8)}..${deliverablesCommit.slice(0, 8)}): ${stagingR80Diff}
- Current review_status on disk (all 8 staged weeks):
${stagingProvenanceStatuses.join('\n')}
- Recent historical git commits touching docs/agent_artifacts/staging/ (verbatim git log -n 5):
  ${stagingRecentLog.replace(/\n/g, '\n  ')}
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round80.txt');
fs.writeFileSync(MANIFEST_PATH, manifestText, 'utf8');

console.log(`\n✓ Package created:  ${path.relative(ROOT_DIR, ZIP_FILE)} (${zipData.length} bytes, sha256=${zipSha})`);
console.log(`✓ Manifest written: ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`✓ deliverables_commit: ${deliverablesCommit}`);

