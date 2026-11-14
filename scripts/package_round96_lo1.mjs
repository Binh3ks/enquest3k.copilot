/**
 * scripts/package_round96_lo1.mjs
 *
 * PACKAGES ROUND 96 LÔ 1 STAGED DELIVERABLES INTO:
 *   docs/review_packages/round96_lo1_w40_42_44_w47_54_20261114.zip
 * and writes:
 *   docs/review_packages/manifest_round96.txt
 *
 * Note: Only writes to docs/review_packages/ (NO root duplicate).
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round96_lo1_w40_42_44_w47_54_20261114.zip');
if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

const TMP_STAGE = path.join(ROOT_DIR, 'docs/agent_artifacts/round96_lo1_package_tmp');
if (fs.existsSync(TMP_STAGE)) fs.rmSync(TMP_STAGE, { recursive: true, force: true });
fs.mkdirSync(TMP_STAGE, { recursive: true });

function gitCmd(args) {
  return execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
}

const currentCommit = gitCmd(['rev-parse', 'HEAD']);
console.log(`Deliverables commit: ${currentCommit}`);

const LO1_WEEKS = [40, 42, 44, 47, 48, 49, 50, 51, 52, 53, 54];
const WEEK_MODULES = [
  'blueprint.json',
  'index.js',
  'vocab.js',
  'reading_hub.js',
  'listening_hub.js',
  'writing_hub.js',
  'speaking_hub.js',
  'skill_practice_hub.js',
  'provenance.json',
  'source_grounding.json',
  'dossier.json'
];

const packagedFiles = [];
const missingFiles = [];

for (const w of LO1_WEEKS) {
  const srcDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging', `week_${w}`);
  const dstDir = path.join(TMP_STAGE, `week_${w}`);
  fs.mkdirSync(dstDir, { recursive: true });

  for (const mod of WEEK_MODULES) {
    const src = path.join(srcDir, mod);
    const dst = path.join(dstDir, mod);
    if (!fs.existsSync(src)) {
      missingFiles.push(`week_${w}/${mod}`);
      continue;
    }
    fs.copyFileSync(src, dst);
    const rel = `week_${w}/${mod}`;
    const bytes = fs.statSync(src).size;
    const sha = crypto.createHash('sha256').update(fs.readFileSync(src)).digest('hex');
    packagedFiles.push({ path: rel, bytes, sha });
  }
}

if (missingFiles.length > 0) {
  console.error('Packaging aborted. Missing required files:', missingFiles);
  process.exit(1);
}

// Create zip using system zip command
execFileSync('zip', ['-r', '-q', ZIP_FILE, '.'], { cwd: TMP_STAGE });
fs.rmSync(TMP_STAGE, { recursive: true, force: true });

const zipBytes = fs.statSync(ZIP_FILE).size;
const zipSha = crypto.createHash('sha256').update(fs.readFileSync(ZIP_FILE)).digest('hex');

console.log(`✅ Review package zip created:`);
console.log(`   Path:   docs/review_packages/round96_lo1_w40_42_44_w47_54_20261114.zip`);
console.log(`   Bytes:  ${zipBytes}`);
console.log(`   SHA256: ${zipSha}`);
console.log(`   Weeks:  ${LO1_WEEKS.length} (W40, W42, W44, W47–W54)`);
console.log(`   Files:  ${packagedFiles.length} (${LO1_WEEKS.length} weeks x ${WEEK_MODULES.length} files)`);

// Generate manifest
const manifestLines = [
  '========================================================================',
  'ENGQUEST3K — ROUND 96 REVIEW PACKAGE MANIFEST (LÔ 1)',
  '========================================================================',
  `Generated at:        ${new Date().toISOString()}`,
  `Round:               ROUND 96`,
  `Scope:               Lô 1 (W40, W42, W44, W47–W54) for ESL Sign-Off`,
  `Total Weeks:         ${LO1_WEEKS.length} weeks`,
  `Total Files in Zip:  ${packagedFiles.length} files (11 weeks x 11 modules/dossiers)`,
  `Deliverables Commit: ${currentCommit}`,
  `Package File:        docs/review_packages/round96_lo1_w40_42_44_w47_54_20261114.zip`,
  `Package Size:        ${zipBytes} bytes`,
  `Package SHA256:      ${zipSha}`,
  '------------------------------------------------------------------------',
  'SUMMARY OF PACKAGED WEEKS:',
  ...LO1_WEEKS.map(w => `  - week_${w}: 11 files (9 modules + source_grounding.json + dossier.json)`),
  '------------------------------------------------------------------------',
  'DETAILED FILE MANIFEST (relative to zip root):',
  ...packagedFiles.map(f => `  ${f.sha}  ${f.bytes.toString().padStart(8, ' ')} bytes  ${f.path}`),
  '========================================================================'
];

const manifestContent = manifestLines.join('\n') + '\n';
const manifestPath = path.join(OUT_DIR, 'manifest_round96.txt');
fs.writeFileSync(manifestPath, manifestContent, 'utf8');

console.log(`✅ Manifest written to: ${manifestPath}`);
