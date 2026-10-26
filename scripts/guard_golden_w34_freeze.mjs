#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const rootDir = process.cwd();
const manifestPath = path.resolve(rootDir, 'docs/W34_GOLDEN_FREEZE_MANIFEST.json');

if (!fs.existsSync(manifestPath)) {
  console.error(`❌ CRITICAL: Golden Freeze Manifest not found at: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const protectedHashes = manifest.protectedFileHashes || {};

console.log('========================================================================');
console.log('🛡️  ENGQUEST3K — W34 GOLDEN FREEZE CRYPTOGRAPHIC INTEGRITY GUARD');
console.log(`🔖 Manifest Version: ${manifest.manifestVersion} | Standard Version: ${manifest.goldenStandardVersion}`);
console.log('========================================================================\n');

let allMatch = true;
const discrepancies = [];

for (const [relPath, expectedHash] of Object.entries(protectedHashes)) {
  const absPath = path.resolve(rootDir, relPath);
  if (!fs.existsSync(absPath)) {
    allMatch = false;
    discrepancies.push({ file: relPath, error: 'FILE MISSING / DELETED' });
    console.error(`  ❌ [MISSING] ${relPath}`);
    continue;
  }

  const content = fs.readFileSync(absPath);
  const actualHash = crypto.createHash('sha256').update(content).digest('hex');

  if (actualHash !== expectedHash) {
    allMatch = false;
    discrepancies.push({ file: relPath, expected: expectedHash, actual: actualHash });
    console.error(`  ❌ [CORRUPTED / MODIFIED] ${relPath}`);
    console.error(`     Expected SHA-256: ${expectedHash}`);
    console.error(`     Actual SHA-256:   ${actualHash}`);
  } else {
    console.log(`  ✅ [LOCKED] ${relPath} (SHA-256: ${actualHash.slice(0, 16)}...)`);
  }
}

console.log('\n------------------------------------------------------------------------');
if (allMatch) {
  console.log('🎉 W34 GOLDEN MASTER INTEGRITY VERIFIED: 100% OF PROTECTED FILES LOCKED!');
  console.log('------------------------------------------------------------------------\n');
  process.exit(0);
} else {
  console.error(`🚨 GOLDEN FREEZE VIOLATION: ${discrepancies.length} protected file(s) altered!`);
  console.error('Do NOT modify frozen W34 content without following the formal Change Control Procedure.');
  console.log('------------------------------------------------------------------------\n');
  process.exit(1);
}
