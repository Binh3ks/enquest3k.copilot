#!/usr/bin/env node
/**
 * scripts/package_round48.mjs
 * 
 * Round 48 Review Package Generator:
 * 1. Part A: W34 Golden Freeze complete with 106 protected assets.
 * 2. Part B: Blueprint Ingestion Script (Nhóm 1 Automation #1) + test suite + sample W38 blueprint.
 * 
 * STANDARD PACKAGING SEQUENCE (Round 47+):
 * Executed AFTER git commit and git push to record accurate post-commit Git HEAD in manifest.txt.
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

const REVIEW_PACKAGES_DIR = path.join(ROOT_DIR, 'docs/review_packages');
const ZIP_FILE = path.join(REVIEW_PACKAGES_DIR, 'round48_20261104.zip');

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function main() {
  console.log('========================================================================');
  console.log('📦 Starting Round 48 Packaging: W34 Golden Freeze & Blueprint Ingestion');
  console.log('========================================================================\n');

  if (!fs.existsSync(REVIEW_PACKAGES_DIR)) {
    fs.mkdirSync(REVIEW_PACKAGES_DIR, { recursive: true });
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'round48_staging_'));
  console.log(`📁 Working in temporary directory: ${tmpDir}`);

  const scriptsDir = path.join(tmpDir, 'scripts');
  const docsDir = path.join(tmpDir, 'docs');
  const logsDir = path.join(tmpDir, 'logs');
  const sampleWeekDir = path.join(tmpDir, 'src/data/weeks/week_38');

  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.mkdirSync(docsDir, { recursive: true });
  fs.mkdirSync(logsDir, { recursive: true });
  fs.mkdirSync(sampleWeekDir, { recursive: true });

  try {
    // ── 1. RUN W34 FREEZE GUARD (PASS PROOF) ─────────────────────────────────
    console.log('\n--- 1. Verifying W34 Golden Freeze Guard ---');
    const w34GuardLog = execSync('node scripts/guard_golden_w34_freeze.mjs', { cwd: ROOT_DIR }).toString();
    console.log(w34GuardLog);
    fs.writeFileSync(path.join(logsDir, 'w34_guard_pass_log.txt'), w34GuardLog, 'utf8');

    // ── 2. RUN W33 FREEZE GUARD (PRESERVED INTEGRITY PROOF) ──────────────────
    console.log('\n--- 2. Verifying W33 Golden Freeze Guard (Integrity Check) ---');
    const w33GuardLog = execSync('node scripts/guard_golden_w33_freeze.mjs', { cwd: ROOT_DIR }).toString();
    console.log(w33GuardLog);
    fs.writeFileSync(path.join(logsDir, 'w33_guard_pass_log.txt'), w33GuardLog, 'utf8');

    // ── 3. RUN BLUEPRINT INGESTION TEST SUITE ────────────────────────────────
    console.log('\n--- 3. Running Blueprint Ingestion Test Suite ---');
    const blueprintTestLog = execSync('node scripts/test_blueprint_ingestion.mjs', { cwd: ROOT_DIR }).toString();
    console.log(blueprintTestLog);
    fs.writeFileSync(path.join(logsDir, 'blueprint_test_suite_log.txt'), blueprintTestLog, 'utf8');

    // ── 4. RUN W38 SAMPLE BLUEPRINT GENERATION LOG ───────────────────────────
    console.log('\n--- 4. Generating W38 Sample Blueprint Log ---');
    const w38GenLog = execSync('node scripts/generate_week_blueprint.mjs 38 --dry-run', { cwd: ROOT_DIR }).toString();
    fs.writeFileSync(path.join(logsDir, 'w38_sample_blueprint_log.txt'), w38GenLog, 'utf8');

    // ── 5. COLLECT ARTIFACTS ─────────────────────────────────────────────────
    console.log('\n--- 5. Collecting Deliverables for Review Package ---');
    fs.copyFileSync(
      path.join(ROOT_DIR, 'docs/W34_GOLDEN_FREEZE_MANIFEST.json'),
      path.join(docsDir, 'W34_GOLDEN_FREEZE_MANIFEST.json')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'scripts/guard_golden_w34_freeze.mjs'),
      path.join(scriptsDir, 'guard_golden_w34_freeze.mjs')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'scripts/generate_week_blueprint.mjs'),
      path.join(scriptsDir, 'generate_week_blueprint.mjs')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'scripts/test_blueprint_ingestion.mjs'),
      path.join(scriptsDir, 'test_blueprint_ingestion.mjs')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'src/data/weeks/week_38/blueprint.json'),
      path.join(sampleWeekDir, 'blueprint.json')
    );

    // ── 6. GENERATE PACKAGE MANIFESTS (POST-COMMIT GIT HEAD) ─────────────────
    console.log('\n--- 6. Generating Review Manifests ---');
    const gitHead = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();
    console.log(`📌 Post-commit Git HEAD: ${gitHead}`);

    const manifestJson = {
      round: 48,
      timestamp: new Date().toISOString(),
      scope: 'W34 Golden Freeze Ratification & Blueprint Ingestion Script (Nhóm 1 Automation #1)',
      git_head: gitHead,
      tasks_delivered: {
        part_a_w34_golden_freeze: {
          assets_added: [
            'public/audio/week34/listening_p4_full.mp3',
            'public/audio/week34/shadowing_9.mp3',
            'public/audio/week34/shadowing_10.mp3',
            'public/images/week34/writing_panel_1.png',
            'public/images/week34/writing_panel_2.png',
            'public/images/week34/writing_panel_3.png'
          ],
          manifest: 'docs/W34_GOLDEN_FREEZE_MANIFEST.json',
          guard: 'scripts/guard_golden_w34_freeze.mjs',
          status: '106/106 protected assets LOCKED (100% PASS)'
        },
        part_b_blueprint_ingestion: {
          generator_script: 'scripts/generate_week_blueprint.mjs',
          test_suite: 'scripts/test_blueprint_ingestion.mjs',
          sample_generated_week: 'src/data/weeks/week_38/blueprint.json',
          status: '10/10 automated tests PASS (100% SUCCESS)'
        }
      }
    };

    fs.writeFileSync(path.join(tmpDir, 'manifest.json'), JSON.stringify(manifestJson, null, 2), 'utf8');

    const manifestText = `========================================================================
ENGQUEST3K — REVIEW PACKAGE MANIFEST — ROUND 48
========================================================================
Round:     48
Date:      ${manifestJson.timestamp}
Scope:     W34 Golden Freeze Ratification & Blueprint Ingestion Script (Nhóm 1 Automation #1)
Git HEAD:  ${manifestJson.git_head}

1. PART A — W34 GOLDEN FREEZE RATIFICATION:
- Resolved 6 missing assets identified in Round 47:
  * public/audio/week34/listening_p4_full.mp3 (ffmpeg concat)
  * public/audio/week34/shadowing_9.mp3 (Google Cloud TTS, en-US-Journey-F)
  * public/audio/week34/shadowing_10.mp3 (Google Cloud TTS, en-US-Journey-F)
  * public/images/week34/writing_panel_1.png (webtoon_scene_1.png)
  * public/images/week34/writing_panel_2.png (webtoon_scene_4.png)
  * public/images/week34/writing_panel_3.png (webtoon_scene_5.png)
- Regenerated immutable manifest: docs/W34_GOLDEN_FREEZE_MANIFEST.json
- Regenerated automated guard: scripts/guard_golden_w34_freeze.mjs
- Status: 106/106 files cryptographically LOCKED (100% PASS).
- Preserved W33 intact: 147/147 files locked (100% PASS).

2. PART B — BLUEPRINT INGESTION GENERATOR (SOP GIAI ĐOẠN 1):
- Script: scripts/generate_week_blueprint.mjs
- Automated ingestion from:
  * docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md (Digital Map)
  * docs/1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt (Khung CT 3-Year Master)
  * production_kit/templates/ (Golden Architecture Templates)
- Features:
  * Frozen integrity guard: refuses to modify W33/W34 without --force.
  * Fail-loud validation: halts if week not found in syllabus.
  * Zero hallucination: explicitly tags missing fields with requires_human_input.
  * Golden template selection across Pre-A1, A1 Movers, A2 Flyers, B1 PET, and Mock tests.
- Verification: scripts/test_blueprint_ingestion.mjs passes 10/10 tests.
- Sample week generated: src/data/weeks/week_38/blueprint.json.

========================================================================
STATUS: ROUND 48 DELIVERABLES VERIFIED & PACKAGED.
========================================================================
`;
    fs.writeFileSync(path.join(tmpDir, 'manifest.txt'), manifestText, 'utf8');

    // ── 7. ZIP REVIEW PACKAGE ────────────────────────────────────────────────
    console.log('\n--- 7. Creating Single ZIP Archive ---');
    if (fs.existsSync(ZIP_FILE)) {
      fs.unlinkSync(ZIP_FILE);
    }
    execSync(`cd "${tmpDir}" && zip -r "${ZIP_FILE}" .`, { cwd: tmpDir });

    const zipStat = fs.statSync(ZIP_FILE);
    const zipHash = sha256(ZIP_FILE);

    console.log(`\n🎉 Round 48 Review Package successfully generated:`);
    console.log(`   Path:   ${ZIP_FILE}`);
    console.log(`   Size:   ${zipStat.size.toLocaleString()} bytes`);
    console.log(`   SHA256: ${zipHash}`);

  } finally {
    // ── 8. CLEAN UP STAGING DIRECTORY ────────────────────────────────────────
    console.log('\n--- 8. Cleaning Up Temporary Staging Directory ---');
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      console.log(`✅ Temporary staging directory deleted: ${tmpDir}`);
    } catch (e) {
      console.warn(`⚠️ Could not clean up tmpDir: ${e.message}`);
    }
  }

  console.log('\n✅ Round 48 packaging complete! Zero loose folders retained.');
}

main().catch(err => {
  console.error('\n❌ Fatal error during packaging:', err);
  process.exit(1);
});
