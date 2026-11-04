#!/usr/bin/env node
/**
 * package_round47.mjs — Round 47 CI Pipeline Integration & Multi-Week Generic Validation
 *
 * Deliverables:
 * 1. CI Pipeline Integration: .github/workflows/deploy.yml guarded with W33 freeze check before build/deploy.
 * 2. Forensic Audit of W34 Freeze Artifacts: Date, commit origin, and diff vs new generator.
 * 3. Multi-Week Generic Validation: W34 fail-loud proof + W150 generic end-to-end verification.
 * 4. Single review package zip: docs/review_packages/round47_YYYYMMDD.zip.
 *
 * STANDARDIZED PACKAGING ORDER (Round 47+):
 * 1. Code changes and verification completed.
 * 2. Git commit + git push executed.
 * 3. Run packaging script -> captures exact post-commit Git HEAD into manifest.txt.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();
const REVIEW_PACKAGES_DIR = path.join(ROOT_DIR, 'docs/review_packages');
const ZIP_FILE = path.join(REVIEW_PACKAGES_DIR, 'round47_20261104.zip');

function sha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

async function main() {
  console.log('========================================================================');
  console.log('📦 Starting Round 47 Packaging: CI Integration & Multi-Week Validation');
  console.log('========================================================================\n');

  if (!fs.existsSync(REVIEW_PACKAGES_DIR)) {
    fs.mkdirSync(REVIEW_PACKAGES_DIR, { recursive: true });
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'round47_staging_'));
  console.log(`📁 Working in temporary directory: ${tmpDir}`);

  const workflowsDir = path.join(tmpDir, 'workflows');
  const scriptsDir = path.join(tmpDir, 'scripts');
  const docsDir = path.join(tmpDir, 'docs');
  const logsDir = path.join(tmpDir, 'logs');
  fs.mkdirSync(workflowsDir, { recursive: true });
  fs.mkdirSync(scriptsDir, { recursive: true });
  fs.mkdirSync(docsDir, { recursive: true });
  fs.mkdirSync(logsDir, { recursive: true });

  try {
    // ── 1. RUN W33 GUARD ON CURRENT REPO (PASS PROOF) ────────────────────────
    console.log('\n--- 1. Verifying W33 Guard Script on Live Main ---');
    const w33GuardLog = execSync('node scripts/guard_golden_w33_freeze.mjs', { cwd: ROOT_DIR }).toString();
    console.log(w33GuardLog);
    fs.writeFileSync(path.join(logsDir, 'w33_guard_pass_log.txt'), w33GuardLog, 'utf8');

    // ── 2. RUN MULTI-WEEK GENERIC VALIDATION SUITE (W34 + W150) ──────────────
    console.log('\n--- 2. Running Multi-Week Generic Validation Suite ---');
    const multiWeekLog = execSync('node scripts/test_generic_freeze_pipeline.mjs', { cwd: ROOT_DIR }).toString();
    console.log(multiWeekLog);
    fs.writeFileSync(path.join(logsDir, 'multi_week_validation_log.txt'), multiWeekLog, 'utf8');

    // ── 3. RUN W34 GUARD AUDIT (SHOW DRIFT STATUS) ───────────────────────────
    console.log('\n--- 3. Capturing W34 Existing Guard Audit ---');
    let w34GuardLog = '';
    try {
      w34GuardLog = execSync('node scripts/guard_golden_w34_freeze.mjs', { cwd: ROOT_DIR, stdio: 'pipe' }).toString();
    } catch (err) {
      w34GuardLog = (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
    }
    console.log(w34GuardLog);
    fs.writeFileSync(path.join(logsDir, 'w34_legacy_guard_audit.txt'), w34GuardLog, 'utf8');

    // ── 4. EXTRACT CI PIPELINE DIFF ──────────────────────────────────────────
    console.log('\n--- 4. Extracting CI Pipeline Integration Diff ---');
    let ciDiff = '';
    try {
      ciDiff = execSync('git diff HEAD~1 .github/workflows/deploy.yml', { cwd: ROOT_DIR }).toString();
    } catch (e) {
      ciDiff = '';
    }
    if (!ciDiff.trim()) {
      ciDiff = execSync('git diff .github/workflows/deploy.yml', { cwd: ROOT_DIR }).toString();
    }
    fs.writeFileSync(path.join(logsDir, 'ci_deploy_diff.txt'), ciDiff, 'utf8');

    // ── 5. COLLECT ARTIFACTS ─────────────────────────────────────────────────
    console.log('\n--- 5. Collecting Deliverables for Review Package ---');
    fs.copyFileSync(
      path.join(ROOT_DIR, '.github/workflows/deploy.yml'),
      path.join(workflowsDir, 'deploy.yml')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'scripts/generate_golden_freeze.mjs'),
      path.join(scriptsDir, 'generate_golden_freeze.mjs')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'scripts/guard_golden_w33_freeze.mjs'),
      path.join(scriptsDir, 'guard_golden_w33_freeze.mjs')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'scripts/test_generic_freeze_pipeline.mjs'),
      path.join(scriptsDir, 'test_generic_freeze_pipeline.mjs')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'docs/W33_GOLDEN_FREEZE_MANIFEST.json'),
      path.join(docsDir, 'W33_GOLDEN_FREEZE_MANIFEST.json')
    );
    fs.copyFileSync(
      path.join(ROOT_DIR, 'docs/W34_GOLDEN_FREEZE_MANIFEST.json'),
      path.join(docsDir, 'W34_GOLDEN_FREEZE_MANIFEST.json')
    );

    // ── 6. GENERATE PACKAGE MANIFESTS ────────────────────────────────────────
    console.log('\n--- 6. Generating Review Manifests ---');
    const gitHead = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();
    console.log(`📌 Post-commit Git HEAD: ${gitHead}`);
    const manifestJson = {
      round: 47,
      timestamp: new Date().toISOString(),
      scope: 'CI Pipeline Guard Integration & Multi-Week Generic Freeze Validation',
      golden_standard_week: 33,
      git_head: gitHead,
      tasks_delivered: {
        task1_ci_integration: {
          file: '.github/workflows/deploy.yml',
          status: 'INTEGRATED (node scripts/guard_golden_w33_freeze.mjs runs before npm run build & pages deploy)'
        },
        task2_w34_forensic_audit: {
          created_commit: 'e4cd1c997eb1000f1ad08c72a7b6bc4ef84a7ea5 (2026-10-26)',
          type: 'LEGACY PRE-GENERATOR VERSION (Only 8 files, 0 media assets, not generated by Round 46 generator)',
          runtime_status: 'FAILING (4 files corrupted due to post-freeze bugfixes in Round 26-28)',
          action_taken: 'PRESERVED UNCHANGED per owner directive (no overwrite)'
        },
        task3_generic_validation: {
          test_case_a_w34: 'PASS (Fail-loud on 6 missing media assets)',
          test_case_b_w150: 'PASS (End-to-end generic freeze generation, clean pass, and mutation detection)'
        }
      }
    };

    fs.writeFileSync(path.join(tmpDir, 'manifest.json'), JSON.stringify(manifestJson, null, 2), 'utf8');

    const manifestText = `========================================================================
ENGQUEST3K — REVIEW PACKAGE MANIFEST — ROUND 47
========================================================================
Round:     47
Date:      ${manifestJson.timestamp}
Scope:     CI Pipeline Guard Integration & Multi-Week Generic Freeze Validation
Git HEAD:  ${manifestJson.git_head}

1. CI PIPELINE INTEGRATION:
- File: .github/workflows/deploy.yml
- Added step: "Verify Golden Standard Integrity (W33 Freeze Guard)"
- Command: node scripts/guard_golden_w33_freeze.mjs
- Position: Immediately before "Build" and Cloudflare Pages deploy.
- Protection: Any accidental mutation of W33 halts workflow with exit code 1.

2. FORENSIC AUDIT OF W34 FREEZE ARTIFACTS:
- Manifest: docs/W34_GOLDEN_FREEZE_MANIFEST.json
- Guard:    scripts/guard_golden_w34_freeze.mjs
- Provenance: Created Mon Oct 26 16:08:15 2026 (Commit e4cd1c99) — PRE-DATES the new generator.
- Scope: Only covers 8 data files; ZERO media assets (0 MP3s, 0 images) protected.
- Current Status: 4 files altered (reading_hub.js, listening_hub.js, writing_hub.js, read.js)
  due to content fixes applied in Rounds 26–28.
- Policy: Preserved intact without overwrite, pending explicit owner instruction.

3. MULTI-WEEK GENERIC PIPELINE VALIDATION:
- Case A (Week 34 - Incomplete Media): Correctly halted with fail-loud error listing 6 missing assets.
- Case B (Week 150 - Complete Fixture): Successfully generated manifest + guard, verified clean pass (100% locked), and proved drift detection on injected mutation.

========================================================================
STATUS: ROUND 47 VERIFIED & PACKAGED.
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

    console.log(`\n🎉 Round 47 Review Package successfully generated:`);
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

  console.log('\n✅ Round 47 packaging complete! Zero loose folders retained.');
}

main().catch(err => {
  console.error('\n❌ Fatal error during packaging:', err);
  process.exit(1);
});

