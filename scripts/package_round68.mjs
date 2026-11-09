/**
 * scripts/package_round68.mjs
 * 
 * ENGQUEST3K — REVIEW PACKAGE BUILDER (ROUND 68)
 * 
 * Packages review evidence zip for Round 68:
 *   - round68_w76_wave2_merge_diff.patch: Diff of production W76 PET mock + Wave 2 merge
 *   - round68_mock_gates_w80.log: 7 Mock Quality Gates report for W80 PET Mock (100% PASS)
 *   - round68_cefr_guard_w80.log: Cambridge CEFR Stage 2 B1 audit log for staged W80 Mock
 *   - round68_build.log: Production build log (exit code 0)
 *   - round68_freeze_guards.log: W33 & W34 cryptographic freeze verification log (100% locked)
 *   - round68_wave3_proposal.md: Wave 3 B2 Rotary proposal and mock schedule cross-check
 *   - week_80_mock/ (all 10 staged deliverables including hubs, specs, and gate log)
 *   - manifest.txt with SHA-256 for all enclosed files + Git commit info
 * 
 * Output:
 *   docs/review_packages/round68_merge_and_scale.zip
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

const ZIP_FILE = path.join(OUT_DIR, 'round68_merge_and_scale.zip');
const gitHead = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eq3k_r68_pkg_'));

try {
  const artifacts = [
    { src: 'docs/agent_artifacts/round68_w76_wave2_merge_diff.patch', dest: 'round68_w76_wave2_merge_diff.patch' },
    { src: 'docs/agent_artifacts/round68_mock_gates_w80.log', dest: 'round68_mock_gates_w80.log' },
    { src: 'docs/agent_artifacts/round68_cefr_guard_w80.log', dest: 'round68_cefr_guard_w80.log' },
    { src: 'docs/agent_artifacts/round68_build.log', dest: 'round68_build.log' },
    { src: 'docs/agent_artifacts/round68_freeze_guards.log', dest: 'round68_freeze_guards.log' },
    { src: 'docs/agent_artifacts/round68_wave3_proposal.md', dest: 'round68_wave3_proposal.md' }
  ];

  for (const item of artifacts) {
    const srcPath = path.join(ROOT_DIR, item.src);
    const destPath = path.join(tmpDir, item.dest);
    if (!fs.existsSync(srcPath)) throw new Error(`Missing review artifact: ${item.src}`);
    fs.copyFileSync(srcPath, destPath);
  }

  // Copy week_80_mock directory
  const mockStagingDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging/week_80_mock');
  const targetMockDir = path.join(tmpDir, 'week_80_mock');
  fs.mkdirSync(targetMockDir, { recursive: true });

  const mockFiles = fs.readdirSync(mockStagingDir);
  for (const f of mockFiles) {
    fs.copyFileSync(path.join(mockStagingDir, f), path.join(targetMockDir, f));
  }

  // Generate manifest
  const manifestLines = [
    '========================================================================',
    'ENGQUEST3K — REVIEW PACKAGE MANIFEST (ROUND 68)',
    '========================================================================',
    `Timestamp: ${new Date().toISOString()}`,
    `Git Head:  ${gitHead}`,
    `Zip File:  round68_merge_and_scale.zip`,
    `Contents:  W76 & Wave 2 Merge Diff + W80 PET Mock Staged + Wave 3 Proposal + Audit Logs`,
    '========================================================================\n',
    'FILE MANIFEST (SHA-256 CHECKSUMS):'
  ];

  function collectFiles(dir, prefix = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const ent of entries) {
      const fullPath = path.join(dir, ent.name);
      const relPath = prefix ? `${prefix}/${ent.name}` : ent.name;
      if (ent.isDirectory()) {
        files = files.concat(collectFiles(fullPath, relPath));
      } else if (ent.isFile()) {
        files.push({ fullPath, relPath });
      }
    }
    return files;
  }

  const allFiles = collectFiles(tmpDir);
  allFiles.sort((a, b) => a.relPath.localeCompare(b.relPath));

  for (const file of allFiles) {
    const buf = fs.readFileSync(file.fullPath);
    const sha = crypto.createHash('sha256').update(buf).digest('hex');
    const size = fs.statSync(file.fullPath).size;
    manifestLines.push(`  ${sha}  ${size.toString().padStart(8, ' ')} bytes  ${file.relPath}`);
  }

  const manifestPath = path.join(tmpDir, 'manifest.txt');
  fs.writeFileSync(manifestPath, manifestLines.join('\n') + '\n', 'utf8');
  console.log(`Manifest created: ${manifestPath}`);

  // Create zip using system zip command
  if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);
  execSync(`cd "${tmpDir}" && zip -r "${ZIP_FILE}" .`, { stdio: 'inherit' });

  const zipBuf = fs.readFileSync(ZIP_FILE);
  const zipSha = crypto.createHash('sha256').update(zipBuf).digest('hex');
  const zipSize = fs.statSync(ZIP_FILE).size;

  console.log('\n========================================================================');
  console.log('🎉 REVIEW PACKAGE SUCCESSFULLY BUILT');
  console.log(`📦 Zip Location: ${ZIP_FILE}`);
  console.log(`📏 Zip Size:     ${(zipSize / 1024).toFixed(2)} KB (${zipSize} bytes)`);
  console.log(`🔒 Zip SHA-256:  ${zipSha}`);
  console.log(`📄 Total Files:  ${allFiles.length + 1} (including manifest.txt)`);
  console.log('========================================================================\n');
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}
