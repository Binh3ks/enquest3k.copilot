#!/usr/bin/env node
/**
 * GUARD GOLDEN FREEZE — WEEK 33
 * Generated automatically by Auto-Freeze Generator
 * docs/WEEK_PRODUCTION_SOP.md (v2.2.0) — Giai đoạn 5: Đóng Băng Chất Lượng & Tạo Manifest Hash
 *
 * Verifies 100% Cryptographic SHA-256 integrity of:
 * - Core Data Hubs & Read Stories
 * - Cambridge Wordlists
 * - Spec & Governance Manifests
 * - Active Referenced Audio Assets (MP3)
 * - Active Referenced Image & Bar Model SVG Assets
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const rootDir = process.env.PROJECT_ROOT ? path.resolve(process.env.PROJECT_ROOT) : process.cwd();
const manifestArg = process.argv.find(a => a.startsWith('--manifest='));
const manifestPath = manifestArg
  ? path.resolve(manifestArg.split('=')[1])
  : path.resolve(rootDir, 'docs/W33_GOLDEN_FREEZE_MANIFEST.json');

if (!fs.existsSync(manifestPath)) {
  console.error(`❌ CRITICAL: Golden Freeze Manifest not found at: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const protectedHashes = manifest.protectedFileHashes || {};
const totalExpected = Object.keys(protectedHashes).length;

console.log('========================================================================');
console.log('🛡️  ENGQUEST3K — W33 GOLDEN FREEZE CRYPTOGRAPHIC INTEGRITY GUARD');
console.log(`🔖 Manifest Version: ${manifest.manifestVersion} | Standard Version: ${manifest.goldenStandardVersion}`);
console.log(`📅 Freeze Date: ${manifest.freezeDate}`);
console.log(`🔒 Total Protected Files to Verify: ${totalExpected}`);
console.log('========================================================================\n');

// 1. Data Hub Structural Contract Check
console.log('--- 1. Data Hub Structural Integrity Check ---');
const weekDataDir = path.resolve(rootDir, 'src/data/weeks/week_33');
const requiredHubFiles = ['reading_hub.js', 'listening_hub.js', 'writing_hub.js', 'speaking_hub.js', 'vocab.js'];
let structurePass = true;

for (const hubFile of requiredHubFiles) {
  const hubPath = path.join(weekDataDir, hubFile);
  if (!fs.existsSync(hubPath)) {
    console.error(`  ❌ [STRUCTURAL DEFECT] Missing required hub file: ${hubFile}`);
    structurePass = false;
  } else {
    const content = fs.readFileSync(hubPath, 'utf8');
    if (content.length < 100) {
      console.error(`  ❌ [STRUCTURAL DEFECT] Hub file ${hubFile} is unexpectedly small / truncated`);
      structurePass = false;
    }
  }
}

if (!structurePass) {
  console.error('\n🚨 DATA HUB STRUCTURAL CHECK FAILED!');
  process.exit(1);
}
console.log('  ✅ 100% of required data hub structural contracts verified.\n');

// 2. Cryptographic SHA-256 Hash Verification
console.log('--- 2. Cryptographic SHA-256 Hash Verification ---');
let allMatch = true;
const discrepancies = [];
const stats = { data: 0, wordlist: 0, spec: 0, audio: 0, image: 0 };

for (const [relPath, expectedHash] of Object.entries(protectedHashes)) {
  const absPath = path.resolve(rootDir, relPath);

  let cat = '[FILE]';
  if (relPath.includes('src/data/weeks/')) { cat = '[DATA HUB]'; stats.data++; }
  else if (relPath.includes('official_wordlists/')) { cat = '[WORDLIST]'; stats.wordlist++; }
  else if (relPath.includes('docs/')) { cat = '[SPEC/GOV]'; stats.spec++; }
  else if (relPath.includes('public/audio/')) { cat = '[AUDIO]'; stats.audio++; }
  else if (relPath.includes('public/images/')) { cat = '[IMAGE]'; stats.image++; }

  if (!fs.existsSync(absPath)) {
    allMatch = false;
    discrepancies.push({ file: relPath, category: cat, error: 'FILE MISSING / DELETED' });
    console.error(`  ❌ ${cat} [MISSING] ${relPath}`);
    continue;
  }

  const content = fs.readFileSync(absPath);
  const actualHash = crypto.createHash('sha256').update(content).digest('hex');

  if (actualHash !== expectedHash) {
    allMatch = false;
    discrepancies.push({ file: relPath, category: cat, expected: expectedHash, actual: actualHash });
    console.error(`  ❌ ${cat} [CORRUPTED / MODIFIED] ${relPath}`);
    console.error(`     Expected SHA-256: ${expectedHash}`);
    console.error(`     Actual SHA-256:   ${actualHash}`);
  } else {
    console.log(`  ✅ ${cat} [LOCKED] ${relPath} (SHA-256: ${actualHash.slice(0, 16)}...)`);
  }
}

console.log('\n========================================================================');
console.log('📊 W33 INTEGRITY SUMMARY:');
console.log(`- Data Hubs:           ${stats.data} locked`);
console.log(`- Cambridge Wordlists: ${stats.wordlist} locked`);
console.log(`- Spec & Governance:   ${stats.spec} locked`);
console.log(`- Audio MP3 Assets:    ${stats.audio} locked`);
console.log(`- Image & SVG Assets:  ${stats.image} locked`);
console.log(`- Total Files:         ${totalExpected - discrepancies.length}/${totalExpected} locked`);
console.log('========================================================================');

if (allMatch) {
  console.log('🎉 W33 GOLDEN MASTER INTEGRITY VERIFIED: 100% OF PROTECTED FILES LOCKED!');
  console.log('========================================================================\n');
  process.exit(0);
} else {
  console.error(`🚨 GOLDEN FREEZE VIOLATION: ${discrepancies.length} protected file(s) altered!`);
  discrepancies.forEach(d => {
    if (d.expected) {
      console.error(`  - ${d.category} ${d.file}: Expected ${d.expected.slice(0, 16)}... Got ${d.actual.slice(0, 16)}...`);
    } else {
      console.error(`  - ${d.category} ${d.file}: ${d.error}`);
    }
  });
  console.error('Do NOT modify frozen W33 content without following the formal Change Control Procedure.');
  console.log('========================================================================\n');
  process.exit(1);
}
