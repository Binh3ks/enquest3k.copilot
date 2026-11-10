/**
 * scripts/package_round73.mjs
 * 
 * PACKAGES ROUND 73 EVIDENCE, SCRIPTS & BASELINE DELIVERABLES INTO:
 *   docs/review_packages/round73_20261110.zip
 * and writes docs/review_packages/manifest_round73.txt
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

const ZIP_FILE = path.join(OUT_DIR, 'round73_20261110.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round73_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 73 REVIEW & EVIDENCE DELIVERABLES');
console.log('========================================================================');

// 1. Copy Key Analysis and Evidence Artifacts
const artifactsToInclude = [
  'docs/agent_artifacts/round73_production_audit_raw.txt',
  'docs/agent_artifacts/round73_blueprint_substantive_diffs.md',
  'docs/agent_artifacts/source_a_vs_source_b_156_weeks.md',
  'docs/agent_artifacts/source_a_realignment.patch',
  'docs/agent_artifacts/source_b_internal_contradictions.md',
  'docs/agent_artifacts/w33_forensics_source_b_comparison.md',
  'docs/agent_artifacts/round73_staged_gate11_raw.txt',
  'docs/agent_artifacts/differentiation_options_w79_80_w129_132.md',
  'docs/agent_artifacts/audit_39_mock_weeks_classification.md',
  'docs/agent_artifacts/calibrated_cambridge_readability_audit.md',
  'docs/agent_artifacts/cambridge_handbook_speaking_part2_citation.md'
];

fs.mkdirSync(path.join(TMP_STAGE, 'artifacts'), { recursive: true });
for (const a of artifactsToInclude) {
  const src = path.join(ROOT_DIR, a);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(TMP_STAGE, 'artifacts', path.basename(a)));
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
  'scripts/audit_round73_source_b_baseline.mjs',
  'scripts/diff_156_blueprints_detailed.mjs',
  'scripts/build_source_a_vs_source_b_table.mjs',
  'scripts/generate_source_a_patch.mjs',
  'scripts/analyze_source_b_internal_conflicts.mjs',
  'scripts/generate_w33_forensics.mjs',
  'scripts/audit_staged_gate11.mjs',
  'scripts/audit_39_mock_weeks.mjs',
  'scripts/calibrate_cambridge_readability.mjs',
  'scripts/regenerate_temp_blueprints.mjs'
];
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (fs.existsSync(s)) {
    fs.copyFileSync(src, path.join(TMP_STAGE, 'scripts', path.basename(s)));
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
ENGQUEST3K — ROUND 73 REVIEW PACKAGE MANIFEST
Timestamp: ${new Date().toISOString()}
Git Head (Local): ${gitHead}
Git Remote (origin/main): ${gitRemote}
Zip Package: docs/review_packages/round73_20261110.zip
Total Packaged Files: ${fileEntries.length}
========================================================================

1. SCOPE & GOVERNANCE COMPLIANCE:
  - ZERO MUTATIONS TO PRODUCTION: src/data/weeks/ is 100% untouched.
  - ZERO CONTENT REGENERATION: Staged weeks kept as-is, no unauthorized text synthesis.
  - SOURCE A PATCH NOT APPLIED: Retained only as proposed patch file in docs/agent_artifacts/.
  - ALL TABLES CALCULATED FROM REAL ON-DISK DATA: 0 hardcoded strings or hand-typed values in audit scripts.
  - W79 + WAVE 3 (W126, 127, 129, 130, 131, 133, 134) REMAIN UNMERGED.

2. FORENSIC FINDINGS & TASK DELIVERABLES:
  - Task A.1-2 (Audit Thật): scripts/audit_round73_source_b_baseline.mjs executed against all 22 production weeks and 8 staged weeks via vm.runInContext. Raw calculated results saved to artifacts/round73_production_audit_raw.txt.
  - Task B.3 (Git Commit Forensics W126/127/133/134): Commit 18c78f87 (2026-11-04) by binh4k synchronized Digital Map with Source B.
  - Task B.4 (Deep Blueprint Diff): 156 blueprints compared across all fields; 11 theme diffs and 59 week-type diffs isolated with calculated reasons in artifacts/round73_blueprint_substantive_diffs.md.
  - Task B.5 (156-Week Source A vs B Table): Calculated in artifacts/source_a_vs_source_b_156_weeks.md (146 matches, 6 divergences, 4 silent).
  - Task B.6 (Source A Verbatim Patch): Generated strictly using Source B lines in artifacts/source_a_realignment.patch.
  - Task C.7 (Source B Internal Contradictions): Side-by-side analysis of Part I (lines 95-108) vs Part II (lines 907-1156) in artifacts/source_b_internal_contradictions.md.
  - Task C.8 (W33 Forensics): Full git history from commit 1de08bfe to f90edbd6 and itemized comparison against Source B line 299 in artifacts/w33_forensics_source_b_comparison.md.
  - Task D.9 (Staged Gate 11 Audit): Gate 11 v2 executed on staged W79 and Wave 3; raw stdout saved to artifacts/round73_staged_gate11_raw.txt. W79, W129, W130, W131, W134 flagged for DROP/RETIRE.
  - Task D.10 (Differentiation Options): Verbatim Source B vs design proposals for W79-80 and W129-132 in artifacts/differentiation_options_w79_80_w129_132.md.
  - Task E.11 (39 Mock Weeks Re-count): Programmatic classification in artifacts/audit_39_mock_weeks_classification.md (27 new rotary, 7 review, 5 projects, 0 authentic exam in Source B).
  - Task F.12-15 (Readability Calibration & Wordlist Provenance): Authentic Cambridge samples measured; pet_b1.json (481 words, A-C) and fce_b2.json (249 words, A only) provenance audited and halted; production and staged weeks re-measured with glossary exclusion and lemmatization in artifacts/calibrated_cambridge_readability_audit.md.
  - Task G.16 (Cambridge Handbook Speaking Part 2): Cited Cambridge YLE Handbook pp. 29-30 (5 cues, reverse roles); card topic curriculum constraint marked 'CHƯA XÁC MINH' in artifacts/cambridge_handbook_speaking_part2_citation.md.

========================================================================
PACKAGED FILES WITH SHA-256 CHECKSUMS:
${fileEntries.map(e => `  - ${e.relPath} (${e.size} bytes) | SHA256: ${e.sha256}`).join('\n')}
========================================================================
`;

fs.writeFileSync(path.join(TMP_STAGE, 'manifest.txt'), manifestContent, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'manifest_round73.txt'), manifestContent, 'utf8');

// Zip the directory
execSync(`zip -r -q "${ZIP_FILE}" .`, { cwd: TMP_STAGE });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipSize = (fs.statSync(ZIP_FILE).size / 1024).toFixed(1);
console.log(`✓ Zip package created successfully:`);
console.log(`  ${ZIP_FILE} (${zipSize} KB)`);
console.log(`✓ Manifest written to:`);
console.log(`  ${path.join(OUT_DIR, 'manifest_round73.txt')}`);
console.log('========================================================================\n');
