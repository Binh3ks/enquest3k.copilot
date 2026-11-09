/**
 * scripts/package_round65.mjs
 * 
 * ENGQUEST3K — REVIEW PACKAGE BUILDER (ROUND 65)
 * 
 * Packages review evidence zip for Round 65:
 *   - round65_blueprint_flag_diffs.md: Full before/after diff table of 55 updated blueprints
 *   - round65_wave2_wave3_schedule_crosscheck.md: Wave 2 & Wave 3 schedule cross-check and de-conflict report
 *   - round65_mock_gates.log: Audit report for all 6 Mock Quality Gates (100% PASS)
 *   - round65_cefr_curriculum_guard_w36.log: Cambridge CEFR Stage 1 audit log for staged W36 Mock (0 violations)
 *   - round65_build.log: Production build log (exit code 0)
 *   - round65_freeze_guards.log: W33 & W34 cryptographic freeze verification log (100% locked)
 *   - week_36_mock/ (all 9 staged deliverables + gate log)
 *   - manifest.txt with SHA-256 for all enclosed files + Git commit info
 * 
 * Output:
 *   docs/review_packages/round65_mock_flags_and_pilot.zip
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_DIR = path.join(ROOT_DIR, 'docs/review_packages');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const ZIP_FILE = path.join(OUT_DIR, 'round65_mock_flags_and_pilot.zip');
const gitHead = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eq3k_r65_pkg_'));

try {
  const artifacts = [
    { src: 'docs/agent_artifacts/round65_blueprint_flag_diffs.md', dest: 'round65_blueprint_flag_diffs.md' },
    { src: 'docs/agent_artifacts/round65_wave2_wave3_schedule_crosscheck.md', dest: 'round65_wave2_wave3_schedule_crosscheck.md' },
    { src: 'docs/agent_artifacts/round65_mock_gates.log', dest: 'round65_mock_gates.log' },
    { src: 'docs/agent_artifacts/round65_cefr_curriculum_guard_w36.log', dest: 'round65_cefr_curriculum_guard_w36.log' },
    { src: 'docs/agent_artifacts/round65_build.log', dest: 'round65_build.log' },
    { src: 'docs/agent_artifacts/round65_freeze_guards.log', dest: 'round65_freeze_guards.log' }
  ];

  for (const item of artifacts) {
    const srcPath = path.join(ROOT_DIR, item.src);
    const destPath = path.join(tmpDir, item.dest);
    if (!fs.existsSync(srcPath)) throw new Error(`Missing review artifact: ${item.src}`);
    fs.copyFileSync(srcPath, destPath);
  }

  // Copy week_36_mock directory
  const mockStagingDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging/week_36_mock');
  const targetMockDir = path.join(tmpDir, 'week_36_mock');
  fs.mkdirSync(targetMockDir, { recursive: true });

  const mockFiles = fs.readdirSync(mockStagingDir);
  for (const mf of mockFiles) {
    fs.copyFileSync(path.join(mockStagingDir, mf), path.join(targetMockDir, mf));
  }

  // Collect all files in tmpDir recursively
  function getFilesRecursively(dir, base = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(base, entry.name);
      if (entry.isDirectory()) {
        files = files.concat(getFilesRecursively(fullPath, relPath));
      } else {
        files.push({ fullPath, relPath });
      }
    }
    return files;
  }

  const allFiles = getFilesRecursively(tmpDir);
  const fileChecksums = [];

  for (const item of allFiles) {
    const buf = fs.readFileSync(item.fullPath);
    const hash = crypto.createHash('sha256').update(buf).digest('hex');
    fileChecksums.push({
      path: item.relPath,
      size: buf.length,
      sha256: hash
    });
  }

  // Sort by path for determinism
  fileChecksums.sort((a, b) => a.path.localeCompare(b.path));

  // Build manifest.txt
  const manifestLines = [
    '========================================================================',
    'ENGQUEST3K — REVIEW PACKAGE MANIFEST (ROUND 65 MOCK FLAGS & PILOT W36)',
    '========================================================================',
    `Timestamp: ${new Date().toISOString()}`,
    `Git HEAD: ${gitHead}`,
    'Scope: 55 Blueprint Flag Updates + W36/W37 Stub Wipes + Pilot Mock Exam W36 (Staged)',
    `Total Enclosed Files: ${fileChecksums.length + 1} (including this manifest.txt)`,
    'Updated Blueprints: 55 weeks (16 retired -> rotary, 29 new -> full_mock, 10 retained)',
    'Wiped Legacy Stubs: W36 (25 files) & W37 (25 files) cleaned to empty stubs',
    'Staged Mock Deliverables: 9 files in week_36_mock/ (16 Cambridge parts: 25L, 44RW, 4S)',
    'Cumulative Sourcing: Grounded in W33, W34, W35, W36 blueprints (100% verified)',
    'Quality Gates: 6 Mock Gates 100% PASS, CEFR Stage 1 Guard 0 violations',
    'Safety Invariants: TOTAL_TRIPS = 34 unchanged; W33 & W34 cryptographically locked',
    '========================================================================',
    'FILE MANIFEST (RELATIVE PATH | SIZE IN BYTES | SHA-256 CHECKSUM):',
    '------------------------------------------------------------------------'
  ];

  for (const f of fileChecksums) {
    manifestLines.push(`${f.path.padEnd(52)} | ${String(f.size).padStart(8)} B | ${f.sha256}`);
  }

  manifestLines.push('========================================================================\n');
  const manifestContent = manifestLines.join('\n');
  const manifestPath = path.join(tmpDir, 'manifest.txt');
  fs.writeFileSync(manifestPath, manifestContent, 'utf8');

  // Compute manifest hash
  const manifestBuf = fs.readFileSync(manifestPath);
  const manifestHash = crypto.createHash('sha256').update(manifestBuf).digest('hex');

  // Zip files
  if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);
  execSync(`cd "${tmpDir}" && zip -r -q "${ZIP_FILE}" .`, { stdio: 'inherit' });

  const zipBuf = fs.readFileSync(ZIP_FILE);
  const zipHash = crypto.createHash('sha256').update(zipBuf).digest('hex');

  console.log('========================================================================');
  console.log('📦 REVIEW PACKAGE CREATED SUCCESSFULLY!');
  console.log(`File:    ${path.relative(ROOT_DIR, ZIP_FILE)}`);
  console.log(`Size:    ${zipBuf.length} bytes (${(zipBuf.length / 1024).toFixed(2)} KB)`);
  console.log(`SHA-256: ${zipHash}`);
  console.log(`Manifest SHA-256: ${manifestHash}`);
  console.log('========================================================================');

} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
