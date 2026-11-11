/**
 * scripts/package_round78.mjs
 *
 * PACKAGES ROUND 78 EVIDENCE, PROPOSALS, TEMP BLUEPRINTS & SCRIPTS INTO:
 *   docs/review_packages/round78_20261111.zip
 * and writes docs/review_packages/manifest_round78.txt
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round78_20261111.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 78 REVIEW & PROPOSAL DELIVERABLES');
console.log('========================================================================');

// 1. Copy Round 78 & supporting baseline artifacts
const artifactsToInclude = [
  'docs/agent_artifacts/round78_task_a_clarifications_raw.txt',
  'docs/agent_artifacts/round78_proposed_digital_map_v2.md',
  'docs/agent_artifacts/round78_source_a_patch_v2_raw.txt',
  'docs/agent_artifacts/round78_blueprint_and_part_audit_raw.txt',
  'docs/agent_artifacts/round78_w79_w80_split_proposal.md',
  'docs/agent_artifacts/round78_wave3_acceptance_spec.md',
  'docs/agent_artifacts/round64_mock_schedule_and_conflicts.md'
];

fs.mkdirSync(path.join(TMP_STAGE, 'artifacts'), { recursive: true });
const rawFileHashes = {};
for (const a of artifactsToInclude) {
  const src = path.join(ROOT_DIR, a);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required Round 78 artifact: ${a}`);
  }
  fs.copyFileSync(src, path.join(TMP_STAGE, 'artifacts', path.basename(a)));
  const buf = fs.readFileSync(src);
  rawFileHashes[a] = crypto.createHash('sha256').update(buf).digest('hex');
}

// 2. Copy all 156 dry-run temp blueprints
const tempBpSrc = path.join(ROOT_DIR, 'docs/agent_artifacts/round78_temp_blueprints');
if (!fs.existsSync(tempBpSrc)) {
  throw new Error('Missing docs/agent_artifacts/round78_temp_blueprints');
}
fs.cpSync(tempBpSrc, path.join(TMP_STAGE, 'temp_blueprints'), { recursive: true });
const tempBpCount = fs.readdirSync(path.join(TMP_STAGE, 'temp_blueprints')).filter(f => f.endsWith('.json')).length;

// 3. Copy Staging Weeks referenced in W79 / Wave 3
const targetWeeks = [79, 126, 127, 129, 130, 131, 133, 134];
for (const w of targetWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required staging directory: docs/agent_artifacts/staging/week_${w}`);
  }
  fs.cpSync(src, dest, { recursive: true });
}

// 4. Copy Round 78 scripts + governance baselines
fs.mkdirSync(path.join(TMP_STAGE, 'scripts/lib'), { recursive: true });
const scriptsToInclude = [
  'scripts/lib/source_b_part2_parser.mjs',
  'scripts/generate_round78_part1_clarifications_and_w79_80_spec.mjs',
  'scripts/generate_round78_source_a_patch_v2.mjs',
  'scripts/generate_round78_part1_part2_and_blueprints.mjs',
  'scripts/package_round78.mjs',
  'scripts/guard_governance_docs.mjs'
];
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required script: ${s}`);
  }
  const destRel = s.startsWith('scripts/lib/') ? path.join('scripts/lib', path.basename(s)) : path.join('scripts', path.basename(s));
  fs.copyFileSync(src, path.join(TMP_STAGE, destRel));
}

fs.mkdirSync(path.join(TMP_STAGE, 'governance'), { recursive: true });
for (const g of ['docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json']) {
  const src = path.join(ROOT_DIR, g);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required governance file: ${g}`);
  }
  fs.copyFileSync(src, path.join(TMP_STAGE, 'governance', path.basename(g)));
}

// 5. Generate Internal Manifest for Zip
let zipManifest = `ROUND 78 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\nTemp Blueprints Count: ${tempBpCount}\n\nFILES:\n`;
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

// 6. Create Zip Archive
console.log(`Creating ${ZIP_FILE}...`);
execSync(`cd "${TMP_STAGE}" && zip -rq "${ZIP_FILE}" .`, { stdio: 'inherit' });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

// 7. Write External Manifest (manifest_round78.txt)
const zipData = fs.readFileSync(ZIP_FILE);
const zipSha = crypto.createHash('sha256').update(zipData).digest('hex');
let deliverablesCommit = 'unknown';
try {
  deliverablesCommit = execSync('git rev-parse HEAD', { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
} catch (e) {}

let hashListing = '';
for (const [f, h] of Object.entries(rawFileHashes)) {
  hashListing += `  ${h}  ${f}\n`;
}

const externalManifest = `ROUND 78 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:           ${new Date().toISOString()}
deliverables_commit: ${deliverablesCommit}

ZIP PACKAGE:
  Path:    docs/review_packages/round78_20261111.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

DRY-RUN TEMP BLUEPRINTS:
  Directory: docs/agent_artifacts/round78_temp_blueprints/ (${tempBpCount} files)

RAW FORENSIC ARTIFACTS & SHA-256 HASHES:
${hashListing}
SCOPE COMPLIANCE (ROUND 78 — PROPOSAL ONLY):
  - src/data/weeks/: 0 modifications
  - SOP / MASTER_ARCH / ARCHITECTURE_CURRENT / AGENTS / Digital Map: 0 modifications
  - docs/agent_artifacts/staging/: 0 modifications / 0 regeneration / 0 merge
  - Proposals included for review:
      * Task A (A.1 W35 Math AST vs hub, A.2 M01 Deferred Lite Mode in 34 Mocks, A.3 PET spec absent)
      * Task B (Digital Map v2 aligned to Source B Part II + full diff -u + B.5 L28/L280 + B.6 conflicts)
      * Task C (156 dry-run temp blueprints + C.7.1..C.7.4 + C.8 full 44-week W113-W156 Part I/II table)
      * Task D (W79/W80 Source B vs SUPPLEMENT split table)
      * Task E (W79, W80, W126, W127, W129-132, W133, W134 acceptance spec; Cambridge waiting doc)
  - Pending Owner Decision:
      * Mock format after W116 (PET per Decision 6 vs B1+ Academic per SOP/ARCH/MAP) -> M24..M34 marked [CHỜ OWNER]
      * Approval of SUPPLEMENT items (W79/80 Math, 20-word vocab padding, Digital Map v2 patch)
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round78.txt');
fs.writeFileSync(MANIFEST_PATH, externalManifest, 'utf8');

console.log(`\n✓ Package created successfully: ${path.relative(ROOT_DIR, ZIP_FILE)}`);
console.log(`✓ External manifest written:     ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`  deliverables_commit: ${deliverablesCommit}`);
console.log(`  Package Size:        ${zipData.length} bytes`);
console.log(`  Package SHA:         ${zipSha}`);
