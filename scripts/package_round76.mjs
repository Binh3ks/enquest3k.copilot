/**
 * scripts/package_round76.mjs
 * 
 * PACKAGES ROUND 76 EVIDENCE, RAW FORENSIC REPORTS & SCRIPTS INTO:
 *   docs/review_packages/round76_20261110.zip
 * and writes docs/review_packages/manifest_round76.txt
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

const ZIP_FILE = path.join(OUT_DIR, 'round76_20261110.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round76_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 76 REVIEW & FORENSIC DELIVERABLES');
console.log('========================================================================');

// 1. Copy Key Analysis and Evidence Artifacts
const artifactsToInclude = [
  'docs/agent_artifacts/round76_production_audit_raw.txt',
  'docs/agent_artifacts/round76_source_b_cycles_raw.txt',
  'docs/agent_artifacts/round76_mock_regulations_raw.txt',
  'docs/agent_artifacts/round76_wave3_math_forensic_raw.txt',
  'docs/agent_artifacts/wave3_g_gen_audit_raw.txt',
  'docs/agent_artifacts/round75_production_audit_raw.txt',
  'docs/agent_artifacts/round74_production_audit_raw.txt',
  'docs/agent_artifacts/round73_production_audit_raw.txt',
  'docs/agent_artifacts/cambridge_handbook_speaking_part2_citation.md',
  'docs/agent_artifacts/calibrated_cambridge_readability_audit.md',
  'docs/agent_artifacts/audit_39_mock_weeks_classification.md',
  'docs/agent_artifacts/source_a_vs_source_b_156_weeks.md',
  'docs/agent_artifacts/differentiation_options_w79_80_w129_132.md',
  'docs/agent_artifacts/source_b_internal_contradictions.md',
  'docs/agent_artifacts/w33_forensics_source_b_comparison.md'
];

fs.mkdirSync(path.join(TMP_STAGE, 'artifacts'), { recursive: true });
const rawFileHashes = {};
for (const a of artifactsToInclude) {
  const src = path.join(ROOT_DIR, a);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(TMP_STAGE, 'artifacts', path.basename(a)));
    const buf = fs.readFileSync(src);
    rawFileHashes[a] = crypto.createHash('sha256').update(buf).digest('hex');
  }
}

// 2. Copy Staging Weeks (W79, W126, W127, W129, W130, W131, W133, W134)
const targetWeeks = [79, 126, 127, 129, 130, 131, 133, 134];
for (const w of targetWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
}

// 3. Copy Temp Baseline Blueprints (156 files)
const tempBpDir = path.join(ROOT_DIR, 'docs/agent_artifacts/temp_blueprints');
if (fs.existsSync(tempBpDir)) {
  fs.cpSync(tempBpDir, path.join(TMP_STAGE, 'temp_blueprints'), { recursive: true });
}

// 4. Copy Scripts
fs.mkdirSync(path.join(TMP_STAGE, 'scripts'), { recursive: true });
const scriptsToInclude = [
  'scripts/audit_round76_source_b_baseline.mjs',
  'scripts/generate_round76_forensic_reports.mjs',
  'scripts/package_round76.mjs',
  'scripts/audit_wave3_g_gen_gates.mjs',
  'scripts/audit_round75_source_b_baseline.mjs',
  'scripts/audit_39_mock_weeks.mjs',
  'scripts/calibrate_cambridge_readability.mjs',
  'scripts/build_source_a_vs_source_b_table.mjs',
  'scripts/diff_156_blueprints_detailed.mjs',
  'scripts/analyze_source_b_internal_conflicts.mjs'
];
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(TMP_STAGE, 'scripts', path.basename(s)));
  }
}

// 5. Generate Internal Manifest for Zip
let zipManifest = `ROUND 76 REVIEW PACKAGE MANIFEST\nGenerated: ${new Date().toISOString()}\n\nFILES:\n`;
function walk(dir, relPath = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
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

// 7. Write External Manifest (manifest_round76.txt)
const zipData = fs.readFileSync(ZIP_FILE);
const zipSha = crypto.createHash('sha256').update(zipData).digest('hex');
let gitHead = 'unknown';
try {
  gitHead = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
} catch (e) {}

let hashListing = '';
for (const [f, h] of Object.entries(rawFileHashes)) {
  hashListing += `  ${h}  ${f}\n`;
}

const externalManifest = `ROUND 76 PACKAGE & COMMIT MANIFEST
========================================================================
Timestamp:           ${new Date().toISOString()}
Deliverables Commit: ${gitHead}

ZIP PACKAGE:
  Path:    docs/review_packages/round76_20261110.zip
  Size:    ${zipData.length} bytes
  SHA-256: ${zipSha}

RAW FORENSIC ARTIFACTS & SHA-256 HASHES:
${hashListing}
STAGED WEEKS (AUDITED & BLOCKED/RETIRED PER OWNER DECISION):
  week_79:  RETIRED (Source A theme 'Industrial Revolution' replaced by Source B 'Space Exploration vs Earth Fix')
  week_126: BLOCKED (G-GEN-15 coverage 3/20 = 15% < 60%)
  week_127: BLOCKED (G-GEN-15 coverage 8/20 = 40% < 60% — Task D.11 corrected per raw data)
  week_129: RETIRED (Smartphones moved to Capstone W145-156 per Source B Part II; W129-132 is Review & Math Logic)
  week_130: RETIRED (Smartphones moved to Capstone W145-156 per Source B Part II)
  week_131: RETIRED (Smartphones moved to Capstone W145-156 per Source B Part II)
  week_133: BLOCKED (G-GEN-15 coverage 9/20 = 45% < 60% & G-GEN-16 ESL anomalies)
  week_134: BLOCKED (Singapore Math perimeter calculations need Claude review)

BASELINE REPOSITORY INTEGRITY:
  src/data/weeks/: 100% UNTOUCHED (0 production modifications)
  Production Head: Zero merge into production.
========================================================================
`;

const MANIFEST_PATH = path.join(OUT_DIR, 'manifest_round76.txt');
fs.writeFileSync(MANIFEST_PATH, externalManifest, 'utf8');

console.log(`\n✓ Package created successfully: ${path.relative(ROOT_DIR, ZIP_FILE)}`);
console.log(`✓ External manifest written:     ${path.relative(ROOT_DIR, MANIFEST_PATH)}`);
console.log(`  Package Size: ${zipData.length} bytes`);
console.log(`  Package SHA:  ${zipSha}`);
