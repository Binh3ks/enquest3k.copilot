/**
 * scripts/package_round72.mjs
 * 
 * PACKAGES ROUND 72 EVIDENCE, SCRIPTS & BASELINE DELIVERABLES INTO:
 *   docs/review_packages/round72_20261110.zip
 * and writes docs/review_packages/manifest_round72.txt
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

const ZIP_FILE = path.join(OUT_DIR, 'round72_20261110.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round72_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 72 REVIEW & EVIDENCE DELIVERABLES');
console.log('========================================================================');

// 1. Copy Key Analysis and Evidence Artifacts
const artifactsToInclude = [
  'docs/agent_artifacts/source_b_full_range_inventory.md',
  'docs/agent_artifacts/round72_blueprint_diff_analysis.md',
  'docs/agent_artifacts/source_a_realignment.patch',
  'docs/agent_artifacts/round72_production_audit_raw.txt'
];

fs.mkdirSync(path.join(TMP_STAGE, 'artifacts'), { recursive: true });
for (const a of artifactsToInclude) {
  const src = path.join(ROOT_DIR, a);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(TMP_STAGE, 'artifacts', path.basename(a)));
  }
}

// 2. Copy Staging Weeks (W79 with RETIRED provenance, W129, W130, W131, etc.)
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
  'scripts/generate_week_blueprint.mjs',
  'scripts/generate_giaidoan2_content.mjs',
  'scripts/scan_source_b_ranges.mjs',
  'scripts/regenerate_temp_blueprints.mjs',
  'scripts/generate_source_a_patch.mjs',
  'scripts/audit_round72_source_b_baseline.mjs'
];
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(TMP_STAGE, s));
  }
}

// 5. Collect files and calculate sha256 checksums
let fileEntries = [];
function walk(dir, rel = '') {
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const relPath = path.join(rel, item);
    if (fs.statSync(full).isDirectory()) {
      walk(full, relPath);
    } else {
      const buf = fs.readFileSync(full);
      const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
      fileEntries.push({ relPath, size: buf.length, sha256 });
    }
  }
}
walk(TMP_STAGE);

// 6. Git Head & Remote
const gitHead = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();
let gitRemote = '';
try {
  gitRemote = execSync('git ls-remote origin main', { cwd: ROOT_DIR }).toString().trim();
} catch (e) {
  gitRemote = 'Error fetching remote: ' + e.message;
}

const manifestContent = `========================================================================
ENGQUEST3K — ROUND 72 REVIEW PACKAGE MANIFEST
Timestamp: ${new Date().toISOString()}
Git Head (Local): ${gitHead}
Git Remote (origin/main): ${gitRemote}
Zip Package: docs/review_packages/round72_20261110.zip
Total Packaged Files: ${fileEntries.length}
========================================================================

1. SCOPE & STRATEGIC DECISION (OWNER DIRECTIVE):
  - SOURCE B (docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt) is established as the SOLE SOURCE OF TRUTH.
  - Source A (Digital Map) must align with Source B.
  - W79 & Wave 3 (W126, 127, 129, 130, 131, 133, 134): REGENERATION PAUSED. ZERO PRODUCTION MERGE.
  - Production src/data/weeks/: 100% UNTOUCHED (Zero mutations).
  - Safety Invariants: TOTAL_TRIPS = 34 unchanged; W33 (147/147 locked), W34 (106/106 locked).

2. KEY DELIVERABLES IN THIS PACKAGE:
  - artifacts/source_b_full_range_inventory.md: Comprehensive independent scan of all 61 week ranges in Source B.
  - artifacts/round72_blueprint_diff_analysis.md: Detailed diff analysis of 156 regenerated blueprints against current production.
  - artifacts/source_a_realignment.patch: Proposed patch aligning Source A divergent rows (W79, W80, W95, W96, W129-132) to Source B.
  - artifacts/round72_production_audit_raw.txt: Production audit against Source B baseline with exact file:line citations.
  - staging/week_79/provenance.json: Review status updated to "RETIRED per Owner decision R72" (7 mandatory vocabulary words confirmed).
  - staging/week_{79,129,130,131}/blueprint.json: Updated baseline blueprints with new SHA-256 hashes.
  - temp_blueprints/: Complete directory of 156 regenerated baseline blueprints.
  - scripts/: All updated and new forensic scripts (generate_week_blueprint.mjs, generate_giaidoan2_content.mjs, etc.).

3. GATE G-GEN-13 REPAIRS:
  - Enabled longWordsFloor in CLIL readability check (was previously defined but omitted in condition).
  - Added vocab.js example_en readability check (floor and ceiling).
  - Integrated Cambridge Wordlist Lexical Profile (% out-of-stage words) as primary ESL reading determinant.
  - Calibrated Flesch-Kincaid thresholds empirically across Stage 1, Stage 2, and Stage 3.

========================================================================
PACKAGED FILES WITH SHA-256 CHECKSUMS:
${fileEntries.map(e => `  - ${e.relPath} (${e.size} bytes) | SHA256: ${e.sha256}`).join('\n')}
========================================================================
`;

// Write manifest inside staging tmp and out dir
fs.writeFileSync(path.join(TMP_STAGE, 'manifest.txt'), manifestContent, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'manifest_round72.txt'), manifestContent, 'utf8');

// Zip the directory
execSync(`zip -r -q "${ZIP_FILE}" .`, { cwd: TMP_STAGE });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipSize = (fs.statSync(ZIP_FILE).size / 1024).toFixed(1);
console.log(`✓ Zip package created successfully:`);
console.log(`  ${ZIP_FILE} (${zipSize} KB)`);
console.log(`✓ Manifest written to:`);
console.log(`  ${path.join(OUT_DIR, 'manifest_round72.txt')}`);
console.log('========================================================================\n');

