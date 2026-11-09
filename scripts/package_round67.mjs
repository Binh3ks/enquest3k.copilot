/**
 * scripts/package_round67.mjs
 * 
 * ENGQUEST3K — REVIEW PACKAGE BUILDER (ROUND 67)
 * 
 * Packages review evidence zip for Round 67:
 *   - round67_w36_merge_diff.patch: Diff of production W36 merge
 *   - round67_pet_mock_gates.log: 7 Mock Quality Gates report for W76 PET Pilot (100% PASS)
 *   - round67_cefr_curriculum_guard_w76.log: Cambridge CEFR Stage 2 B1 audit log for staged W76 Mock
 *   - round67_wave2_gates.log: 10 Mechanical Gates reports for all 7 Wave 2 rotary weeks (W73, W74, W75, W77, W79, W81, W82)
 *   - round67_build.log: Production build log (exit code 0)
 *   - round67_freeze_guards.log: W33 & W34 cryptographic freeze verification log (100% locked)
 *   - week_76_mock/ (all 10 staged deliverables including hubs, specs, and gate log)
 *   - wave2_staged/ (all 7 staged weeks: week_73/, week_74/, week_75/, week_77/, week_79/, week_81/, week_82/)
 *   - manifest.txt with SHA-256 for all enclosed files + Git commit info
 * 
 * Output:
 *   docs/review_packages/round67_w36_merge_pet_pilot_wave2.zip
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

const ZIP_FILE = path.join(OUT_DIR, 'round67_w36_merge_pet_pilot_wave2.zip');
const gitHead = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eq3k_r67_pkg_'));

try {
  const artifacts = [
    { src: 'docs/agent_artifacts/round67_w36_merge_diff.patch', dest: 'round67_w36_merge_diff.patch' },
    { src: 'docs/agent_artifacts/round67_pet_mock_gates.log', dest: 'round67_pet_mock_gates.log' },
    { src: 'docs/agent_artifacts/round67_cefr_curriculum_guard_w76.log', dest: 'round67_cefr_curriculum_guard_w76.log' },
    { src: 'docs/agent_artifacts/round67_wave2_gates.log', dest: 'round67_wave2_gates.log' },
    { src: 'docs/agent_artifacts/round67_build.log', dest: 'round67_build.log' },
    { src: 'docs/agent_artifacts/round67_freeze_guards.log', dest: 'round67_freeze_guards.log' }
  ];

  for (const item of artifacts) {
    const srcPath = path.join(ROOT_DIR, item.src);
    const destPath = path.join(tmpDir, item.dest);
    if (!fs.existsSync(srcPath)) throw new Error(`Missing review artifact: ${item.src}`);
    fs.copyFileSync(srcPath, destPath);
  }

  // Copy week_76_mock directory
  const mockStagingDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging/week_76_mock');
  const targetMockDir = path.join(tmpDir, 'week_76_mock');
  fs.mkdirSync(targetMockDir, { recursive: true });

  const mockFiles = fs.readdirSync(mockStagingDir);
  for (const mf of mockFiles) {
    fs.copyFileSync(path.join(mockStagingDir, mf), path.join(targetMockDir, mf));
  }

  // Copy Wave 2 staged weeks (W73, W74, W75, W77, W79, W81, W82)
  const wave2Weeks = [73, 74, 75, 77, 79, 81, 82];
  const targetWave2Base = path.join(tmpDir, 'wave2_staged');
  fs.mkdirSync(targetWave2Base, { recursive: true });

  for (const w of wave2Weeks) {
    const srcWDir = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
    const destWDir = path.join(targetWave2Base, `week_${w}`);
    fs.mkdirSync(destWDir, { recursive: true });
    if (fs.existsSync(srcWDir)) {
      const files = fs.readdirSync(srcWDir);
      for (const f of files) {
        fs.copyFileSync(path.join(srcWDir, f), path.join(destWDir, f));
      }
    }
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
    'ENGQUEST3K — REVIEW PACKAGE MANIFEST (ROUND 67)',
    '========================================================================',
    `Timestamp: ${new Date().toISOString()}`,
    `Git Head:  ${gitHead}`,
    `Zip File:  round67_w36_merge_pet_pilot_wave2.zip`,
    `Contents:  W36 Merge Diff + W76 PET Pilot + Wave 2 Rotary Staged (7 Weeks) + Audit Logs`,
    '========================================================================',
    '',
    'FILE MANIFEST (SHA-256 CHECKSUMS):'
  ];

  for (const item of fileChecksums) {
    manifestLines.push(`  ${item.sha256}  ${item.size.toString().padStart(8, ' ')} bytes  ${item.path}`);
  }

  manifestLines.push('');
  manifestLines.push('========================================================================');
  manifestLines.push(`Total Enclosed Files: ${fileChecksums.length}`);
  manifestLines.push('========================================================================');

  const manifestPath = path.join(tmpDir, 'manifest.txt');
  fs.writeFileSync(manifestPath, manifestLines.join('\n'), 'utf8');

  // Add manifest to zip
  const manifestBuf = fs.readFileSync(manifestPath);
  const manifestHash = crypto.createHash('sha256').update(manifestBuf).digest('hex');
  console.log(`Manifest created: ${manifestPath} (SHA-256: ${manifestHash})`);

  // Create zip
  if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);
  execSync(`cd "${tmpDir}" && zip -r "${ZIP_FILE}" .`, { stdio: 'inherit' });

  const zipBuf = fs.readFileSync(ZIP_FILE);
  const zipHash = crypto.createHash('sha256').update(zipBuf).digest('hex');

  console.log('\n========================================================================');
  console.log('🎉 REVIEW PACKAGE SUCCESSFULLY BUILT');
  console.log(`📦 Zip Location: ${ZIP_FILE}`);
  console.log(`📏 Zip Size:     ${(zipBuf.length / 1024).toFixed(2)} KB (${zipBuf.length} bytes)`);
  console.log(`🔒 Zip SHA-256:  ${zipHash}`);
  console.log(`📄 Total Files:  ${fileChecksums.length + 1} (including manifest.txt)`);
  console.log('========================================================================\n');

} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
