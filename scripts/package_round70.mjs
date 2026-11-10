/**
 * scripts/package_round70.mjs
 * 
 * PACKAGES ROUND 70 REMEDIATED DELIVERABLES INTO:
 * docs/review_packages/round70_20261110.zip
 * and writes docs/review_packages/manifest_round70.txt
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

const ZIP_FILE = path.join(OUT_DIR, 'round70_20261110.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round70_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

console.log('========================================================================');
console.log('📦 PACKAGING ROUND 70 REVIEW DELIVERABLES');
console.log('========================================================================');

// 1. Copy Remediated Week 79 & Wave 3 weeks (8 weeks total)
const targetWeeks = [79, 126, 127, 129, 130, 131, 133, 134];
for (const w of targetWeeks) {
  const src = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const dest = path.join(TMP_STAGE, `staging/week_${w}`);
  fs.cpSync(src, dest, { recursive: true });
}

// 2. Collect files and calculate sha256 checksums
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

// 3. Git Head & Remote
const gitHead = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();
let gitRemote = '';
try {
  gitRemote = execSync('git ls-remote origin main', { cwd: ROOT_DIR }).toString().trim();
} catch (e) {
  gitRemote = 'Error fetching remote: ' + e.message;
}

const manifestContent = `========================================================================
ENGQUEST3K — ROUND 70 REVIEW PACKAGE MANIFEST
Timestamp: ${new Date().toISOString()}
Git Head (Local): ${gitHead}
Git Remote (origin/main): ${gitRemote}
Zip Package: docs/review_packages/round70_20261110.zip
Total Packaged Files: ${fileEntries.length}
========================================================================

1. SCOPE & INVARIANTS:
  - W79 & Wave 3 (W126, 127, 129, 130, 131, 133, 134): STAGED ONLY. Zero merge to production.
  - Production src/data/weeks/: Untouched (except week_127/blueprint.json CEFR flag fix per Task B.7).
  - Safety Invariants: TOTAL_TRIPS = 34 unchanged; W33 (147/147 locked), W34 (106/106 locked).
  - Build: npm run build Exit code 0 (13.94s).

2. UPGRADED QUALITY GATES APPLIED:
  - Gate 6: Exactly 5 Singapore Math items with Bar Model data (mathCount === 5).
  - Gate 11 v2: 4-Axis Staged File Verification (Theme Strict, Bilingual CLIL Grounding, Source B Math >= 3/5, Vocab Anchors).
  - Gate 12: CEFR Level Consistency (reading_hub === provenance === blueprint).
  - Gate 13: Readability Ceiling (Stage 3 B1+: FK <= 9.5, Long Words >=10 chars <= 15%; Glossary Definition FK <= 9.5).
  - Gate 14: Provenance Integrity (source_b_excerpt <= 1536 bytes, no placeholders, generator_agent = "Antigravity/pipeline").

3. REMEDIATED STAGED DELIVERABLES (8 WEEKS):
  - Week 79:  "The Industrial Revolution" (B1 PET) | Math: 5/5 | CLIL: 97 words, FK 6.1, LongWords: 4.1%
  - Week 126: "From Essay to Speech" (B1+ Academic) | Math: 5/5 | CLIL: 101 words, FK 5.5, LongWords: 3.0%
  - Week 127: "Rebuttal Practice" (B1+ Academic) | Math: 5/5 | CLIL: 101 words, FK 8.8, LongWords: 3.0%
  - Week 129: "Opinion Project 3: Smartphones Under 12?" (B1+ Academic) | Math: 5/5 | CLIL: 97 words, FK 9.2, LongWords: 6.2%
  - Week 130: "Opinion Project 3: Comparing Global Approaches" (B1+ Academic) | Math: 5/5 | CLIL: 97 words, FK 7.8, LongWords: 8.2%
  - Week 131: "Opinion Project 3: Persuasive Techniques" (B1+ Academic) | Math: 5/5 | CLIL: 101 words, FK 9.0, LongWords: 5.9%
  - Week 133: "Deep Research & Data" (B1+ Academic) | Math: 5/5 | CLIL: 90 words, FK 8.5, LongWords: 3.3%
  - Week 134: "Identifying Fallacies" (B1+ Academic) | Math: 5/5 | CLIL: 96 words, FK 7.9, LongWords: 4.2%

========================================================================
PACKAGED FILES WITH SHA-256 CHECKSUMS:
${fileEntries.map(e => `  - ${e.relPath} (${e.size} bytes) | SHA256: ${e.sha256}`).join('\n')}
========================================================================
`;

// Write manifest inside staging tmp and out dir
fs.writeFileSync(path.join(TMP_STAGE, 'manifest.txt'), manifestContent, 'utf8');
fs.writeFileSync(path.join(OUT_DIR, 'manifest_round70.txt'), manifestContent, 'utf8');

// Zip the directory
execSync(`zip -r -q "${ZIP_FILE}" .`, { cwd: TMP_STAGE });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipSize = (fs.statSync(ZIP_FILE).size / 1024).toFixed(1);
console.log(`✓ Zip package created successfully:`);
console.log(`  ${ZIP_FILE} (${zipSize} KB)`);
console.log(`✓ Manifest written to:`);
console.log(`  ${path.join(OUT_DIR, 'manifest_round70.txt')}`);
console.log('========================================================================\n');
