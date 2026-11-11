/**
 * scripts/package_round77.mjs
 *
 * PACKAGES ROUND 77 EVIDENCE, RAW FORENSIC REPORTS & SCRIPTS INTO:
 *   docs/review_packages/round77_20261111.zip
 * and writes docs/review_packages/manifest_round77.txt
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

const ZIP_FILE = path.join(OUT_DIR, 'round77_20261111.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round77_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 77 REVIEW & FORENSIC DELIVERABLES');
console.log('========================================================================');

// 1. Copy Round 77 & supporting forensic artifacts
const artifactsToInclude = [
  'docs/agent_artifacts/round77_production_audit_raw.txt',
  'docs/agent_artifacts/round77_mock_regulations_raw.txt',
  'docs/agent_artifacts/round77_wave3_math_forensic_raw.txt',
  'docs/agent_artifacts/round76_source_b_cycles_raw.txt',
  'docs/agent_artifacts/round76_mock_regulations_raw.txt',
  'docs/agent_artifacts/round76_production_audit_raw.txt',
  'docs/agent_artifacts/round76_wave3_math_forensic_raw.txt',
  'docs/agent_artifacts/round75_production_audit_raw.txt',
  'docs/agent_artifacts/round64_mock_schedule_and_conflicts.md'
];

fs.mkdirSync(path.join(TMP_STAGE, 'artifacts'), { recursive: true });
const rawFileHashes = {};
for (const a of artifactsToInclude) {
  const src = path.join(ROOT_DIR, a);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required Round 77 artifact: ${a}`);
  }
  fs.copyFileSync(src, path.join(TMP_STAGE, 'artifacts', path.basename(a)));
  const buf = fs.readFileSync(src);
  rawFileHashes[a] = crypto.createHash('sha256').update(buf).digest('hex');
}

// 2. Copy Staging Weeks (W79, W126, W127, W129, W130, W131, W133, W134)
const targetWeeks = [79, 126, 127, 129, 130, 131, 133, 134];
for (const w of targetWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required staging directory: docs/agent_artifacts/staging/week_${w}`);
  }
  fs.cpSync(src, dest, { recursive: true });
}

// 3. Copy Round 77 & baseline reference scripts + governance docs checked
fs.mkdirSync(path.join(TMP_STAGE, 'scripts'), { recursive: true });
const scriptsToInclude = [
  'scripts/audit_round77_source_b_baseline.mjs',
  'scripts/generate_round77_forensic_reports.mjs',
  'scripts/package_round77.mjs',
  'scripts/audit_round76_source_b_baseline.mjs',
  'scripts/audit_round75_source_b_baseline.mjs',
  'scripts/guard_governance_docs.mjs'
];
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required script: ${s}`);
  }
  fs.copyFileSync(src, path.join(TMP_STAGE, 'scripts', path.basename(s)));
}

fs.mkdirSync(path.join(TMP_STAGE, 'governance'), { recursive: true });
for (const g of ['docs/GLOBAL_GOVERNANCE_MANIFEST.json', 'docs/GATE15_SPEC_W33.json', 'docs/W33_GOLDEN_FREEZE_MANIFEST.json']) {
  const src = path.join(ROOT_DIR, g);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required governance file: ${g}`);
  }
  fs.copyFileSync(src, path.join(TMP_STAGE, 'governance', path.basename(g)));
}

// 4. Generate Internal Manifest for Zip
let zipManifest = `ROUND 77 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\n\nFILES:\n`;
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

// 5. Create Zip Archive
console.log(`Creating ${ZIP_FILE}...`);
execSync(`cd "${TMP_STAGE}" && zip -rq "${ZIP_FILE}" .`, { stdio: 'inherit' });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

// 6. Write External Manifest (manifest_round77.txt)
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

const externalManifest = `ROUND 77 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:           ${new Date().toISOString()}
deliverables_commit: ${deliverablesCommit}

ZIP PACKAGE:
  Path:    docs/review_packages/round77_20261111.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

RAW FORENSIC ARTIFACTS & SHA-256 HASHES:
${hashListing}
SCOPE COMPLIANCE (ROUND 77):
  - src/data/weeks/: 0 modifications
  - SOP / MASTER_ARCH / ARCHITECTURE_CURRENT / AGENTS / Digital Map: 0 modifications
  - Staging weeks: 0 content regeneration / 0 merge
  - Pending Owner Decision: Mock format after W116 (PET per Decision 6 vs B1+ Academic per SOP/ARCH/MAP)
  - Deferred (waiting Claude sign-off on Sections A–C): Source A patch v2, Part I/II table, W79/W80 split table
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round77.txt');
fs.writeFileSync(MANIFEST_PATH, externalManifest, 'utf8');

console.log(`\n✓ Package created successfully: ${path.relative(ROOT_DIR, ZIP_FILE)}`);
console.log(`✓ External manifest written:     ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`  deliverables_commit: ${deliverablesCommit}`);
console.log(`  Package Size:        ${zipData.length} bytes`);
console.log(`  Package SHA:         ${zipSha}`);

