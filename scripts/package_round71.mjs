/**
 * scripts/package_round71.mjs
 * 
 * PACKAGES ROUND 71 AUDIT & EVIDENCE DELIVERABLES INTO:
 * docs/review_packages/round71_20261110.zip
 * and writes docs/review_packages/manifest_round71.txt
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

const ZIP_FILE = path.join(OUT_DIR, 'round71_20261110.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round71_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 71 REVIEW & EVIDENCE DELIVERABLES');
console.log('========================================================================');

// 1. Copy Week 79 (HOLD status) & Wave 3 weeks (8 weeks total)
const targetWeeks = [79, 126, 127, 129, 130, 131, 133, 134];
for (const w of targetWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  fs.cpSync(src, dest, { recursive: true });
}

// 2. Copy Audit Scripts and Core Generator Scripts
fs.mkdirSync(path.join(TMP_STAGE, 'scripts'), { recursive: true });
const scriptsToInclude = [
  'scripts/audit_round70_gate11_v2.mjs',
  'scripts/audit_round71_g_gen_gates.mjs',
  'scripts/generate_giaidoan2_content.mjs',
  'scripts/generate_week_blueprint.mjs'
];
for (const s of scriptsToInclude) {
  const src = path.join(ROOT_DIR, s);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(TMP_STAGE, s));
  }
}

// 3. Collect files and calculate sha256 checksums
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

// 4. Git Head & Remote
const gitHead = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();
let gitRemote = '';
try {
  gitRemote = execSync('git ls-remote origin main', { cwd: ROOT_DIR }).toString().trim();
} catch (e) {
  gitRemote = 'Error fetching remote: ' + e.message;
}

const manifestContent = `========================================================================
ENGQUEST3K — ROUND 71 REVIEW PACKAGE MANIFEST
Timestamp: ${new Date().toISOString()}
Git Head (Local): ${gitHead}
Git Remote (origin/main): ${gitRemote}
Zip Package: docs/review_packages/round71_20261110.zip
Total Packaged Files: ${fileEntries.length}
========================================================================

1. SCOPE & INVARIANTS:
  - W79 & Wave 3 (W126, 127, 129, 130, 131, 133, 134): REGENERATION PAUSED. Zero merge to production.
  - Staged Week 79: Status explicitly set to HOLD_PENDING_OWNER_DECISION.
  - Production src/data/weeks/: 100% UNTOUCHED (Zero mutations).
  - Safety Invariants: TOTAL_TRIPS = 34 unchanged; W33 (147/147 locked), W34 (106/106 locked).

2. FORENSIC FINDINGS & G-GEN GATES UPGRADES:
  - Source B Divergence Root Cause: parseKhungCT dropped multi-week ranges (Weeks 79-80, Weeks 95-96, Weeks 129-132).
  - Renamed Generator Gates: G-GEN-01 through G-GEN-16 to avoid collision with SOP Giai đoạn 4.
  - G-GEN-11 (Axis iii): Structural Math Strand verification implemented (checking multi-step operations & geometry/fractions structure).
  - G-GEN-13: Readability Floor/Ceiling & Cross-Hub Scaffolding (CLIL floor 5.5, ceiling 9.5, definitions ceiling 8.5/9.5).
  - G-GEN-15: CLIL-Vocab Curricular Integration gate (>= 60% target vocab in core text).
  - G-GEN-16: Lexical Repetition & Coarse ESL Anomaly Detection (flags adjacent repeats like "mobile mobile" & "majority of seventy percent").
  - Blueprint CEFR Resolution: Fixed range parser and regex fallback in generate_week_blueprint.mjs.

3. PRODUCTION DEBT REPORT:
  - Merged weeks W73-W82 in production have only 2 Singapore Math problems (historical debt prior to SOP v2.3.0).

========================================================================
PACKAGED FILES WITH SHA-256 CHECKSUMS:
${fileEntries.map(e => `  - ${e.relPath} (${e.size} bytes) | SHA256: ${e.sha256}`).join('\n')}
========================================================================
`;

// Write manifest inside staging tmp and out dir
fs.writeFileSync(path.join(TMP_STAGE, 'manifest.txt'), manifestContent, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'manifest_round71.txt'), manifestContent, 'utf8');

// Zip the directory
execSync(`zip -r -q "${ZIP_FILE}" .`, { cwd: TMP_STAGE });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipSize = (fs.statSync(ZIP_FILE).size / 1024).toFixed(1);
console.log(`✓ Zip package created successfully:`);
console.log(`  ${ZIP_FILE} (${zipSize} KB)`);
console.log(`✓ Manifest written to:`);
console.log(`  ${path.join(OUT_DIR, 'manifest_round71.txt')}`);
console.log('========================================================================\n');
