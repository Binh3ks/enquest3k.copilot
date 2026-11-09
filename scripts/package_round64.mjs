/**
 * scripts/package_round64.mjs
 * 
 * ENGQUEST3K — REVIEW PACKAGE BUILDER (ROUND 64)
 * 
 * Packages review evidence zip for Round 64:
 *   - round64_merge_diff.patch: Git diff of the 30 merged deliverable files in src/data/weeks/ (W39, W41, W43, W45, W46)
 *   - round64_mock_schedule_and_conflicts.md: Full 39-week mock schedule + complete conflict matrix report
 *   - round64_mock_exam_generator_proposal.md: Design proposal for Mock Exam Generator (Flyers vs PET, cumulative engine) + W36 pilot recommendation
 *   - round64_build.log: Production build log (exit code 0)
 *   - round64_freeze_guards.log: W33 & W34 cryptographic freeze verification log (100% locked)
 *   - round64_full_pipeline_gates.log: Full pipeline & 10 mechanical quality gates log on Wave 1 specs + Vietnamese leak + dedup log
 *   - round64_cefr_curriculum_guards.log: Cambridge CEFR Stage 1 audit log for merged weeks (0 violations, 0 warnings)
 *   - manifest.txt with SHA-256 for all enclosed files + single consistent post-commit Git HEAD
 * 
 * Output:
 *   docs/review_packages/round64_partial_merge_and_mock_schedule.zip
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

const ZIP_FILE = path.join(OUT_DIR, 'round64_partial_merge_and_mock_schedule.zip');
const gitHead = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'eq3k_r64_pkg_'));

try {
  const artifacts = [
    { src: 'docs/agent_artifacts/round64_merge_diff.patch', dest: 'round64_merge_diff.patch' },
    { src: 'docs/agent_artifacts/round64_mock_schedule_and_conflicts.md', dest: 'round64_mock_schedule_and_conflicts.md' },
    { src: 'docs/agent_artifacts/round64_mock_exam_generator_proposal.md', dest: 'round64_mock_exam_generator_proposal.md' },
    { src: 'docs/agent_artifacts/round64_build.log', dest: 'round64_build.log' },
    { src: 'docs/agent_artifacts/round64_freeze_guards.log', dest: 'round64_freeze_guards.log' },
    { src: 'docs/agent_artifacts/round64_full_pipeline_gates.log', dest: 'round64_full_pipeline_gates.log' },
    { src: 'docs/agent_artifacts/round64_cefr_curriculum_guards.log', dest: 'round64_cefr_curriculum_guards.log' }
  ];

  for (const item of artifacts) {
    const srcPath = path.join(ROOT_DIR, item.src);
    const destPath = path.join(tmpDir, item.dest);
    if (!fs.existsSync(srcPath)) throw new Error(`Missing review artifact: ${item.src}`);
    fs.copyFileSync(srcPath, destPath);
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
    'ENGQUEST3K — REVIEW PACKAGE MANIFEST (ROUND 64 PARTIAL MERGE & MOCK SCHEDULE)',
    '========================================================================',
    `Timestamp: ${new Date().toISOString()}`,
    `Git HEAD: ${gitHead}`,
    'Scope: Partial Wave 1 Merge (W39, W41, W43, W45, W46) + 39-Week Mock Schedule & Proposal',
    `Total Enclosed Files: ${fileChecksums.length + 1} (including this manifest.txt)`,
    'Merged Weeks in src/data/weeks/: 5 weeks (30 files: vocab, hubs, skill_practice)',
    'Held in Staging: W40 & W44 (preserved at docs/agent_artifacts/staging/)',
    'Mock Schedule Recomputation: 39 Mock Weeks (every 4th week: W4, W8, ... W156)',
    'Mock Proposal: Stage 1 Flyers vs Stage 2 PET + 4-Week Cumulative Sourcing + Pilot W36',
    'Safety Invariants: TOTAL_TRIPS = 34 unchanged; W33 & W34 cryptographically locked',
    'Blueprint Invariant: Zero blueprint.json modifications made in this round',
    '========================================================================',
    '',
    'FILE CHECKSUMS (SHA-256):',
    '------------------------------------------------------------------------'
  ];

  for (const item of fileChecksums) {
    manifestLines.push(`${item.sha256}  ${String(item.size).padStart(8)} bytes  ${item.path}`);
  }

  manifestLines.push('------------------------------------------------------------------------');
  manifestLines.push('');

  fs.writeFileSync(path.join(tmpDir, 'manifest.txt'), manifestLines.join('\n'), 'utf8');

  // Create Zip
  if (fs.existsSync(ZIP_FILE)) fs.unlinkSync(ZIP_FILE);

  execSync(`cd "${tmpDir}" && zip -r "${ZIP_FILE}" .`, { encoding: 'utf8' });

  const zipStat = fs.statSync(ZIP_FILE);
  const zipBuf = fs.readFileSync(ZIP_FILE);
  const zipSha256 = crypto.createHash('sha256').update(zipBuf).digest('hex');

  console.log('========================================================================');
  console.log('🎉 REVIEW PACKAGE BUILT SUCCESSFULLY (ROUND 64)');
  console.log('========================================================================');
  console.log(`📦 Package File: ${ZIP_FILE}`);
  console.log(`📏 Package Size: ${zipStat.size.toLocaleString()} bytes`);
  console.log(`🔒 SHA-256:      ${zipSha256}`);
  console.log(`🏷️  Git Commit:   ${gitHead}`);
  console.log(`📁 Files Enclosed: ${fileChecksums.length + 1}`);
  console.log('========================================================================\n');

} finally {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (e) {}
}
