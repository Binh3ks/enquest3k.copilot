#!/usr/bin/env node
/**
 * validate_public_dist_sync.mjs — Golden Standard v1.0 Gate R1
 *
 * Usage: node scripts/validate_public_dist_sync.mjs <weekNum>
 * Exit 1 = CRITICAL (public/dist mismatch detected).
 * Exit 0 = all audio files byte-identical.
 *
 * What it does:
 * - Enumerates all audio files in public/audio/weekNN/
 * - Checks that every file exists in dist/audio/weekNN/
 * - Verifies MD5 hash equality for each pair
 * - Prints a summary table
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const weekNum = process.argv[2];
if (!weekNum) { console.error('Usage: node validate_public_dist_sync.mjs <weekNum>'); process.exit(1); }

const pubDir  = path.resolve(`public/audio/week${weekNum}`);
const distDir = path.resolve(`dist/audio/week${weekNum}`);

if (!fs.existsSync(pubDir)) {
  console.error(`ERROR: public directory not found: ${pubDir}`);
  process.exit(1);
}

function md5(filePath) {
  return crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('hex');
}

const files = fs.readdirSync(pubDir).filter(f => /\.(mp3|wav|ogg)$/.test(f));
if (files.length === 0) {
  console.warn(`WARNING: No audio files found in ${pubDir}`);
  process.exit(0);
}

let mismatches = 0;
let missing = 0;
let matched = 0;

console.log(`\nPublic/Dist Audio Integrity Check — Week ${weekNum}`);
console.log(`Public dir:  ${pubDir}`);
console.log(`Dist dir:    ${distDir}`);
console.log(`Files:       ${files.length}\n`);

for (const file of files.sort()) {
  const pubPath  = path.join(pubDir, file);
  const distPath = path.join(distDir, file);

  if (!fs.existsSync(distPath)) {
    console.error(`  ❌ MISSING in dist: ${file}`);
    missing++;
    continue;
  }

  const pubMd5  = md5(pubPath);
  const distMd5 = md5(distPath);

  if (pubMd5 === distMd5) {
    console.log(`  ✅ MATCH:   ${file}`);
    matched++;
  } else {
    console.error(`  ❌ MISMATCH: ${file}`);
    console.error(`     public: ${pubMd5}`);
    console.error(`     dist:   ${distMd5}`);
    mismatches++;
  }
}

console.log(`\n══════════════════════════════════════════════`);
console.log(`Gate R1 Results — Week ${weekNum}`);
console.log(`  ✅ Matched:  ${matched}`);
console.log(`  ❌ Missing:  ${missing}`);
console.log(`  ❌ Mismatch: ${mismatches}`);

if (mismatches > 0 || missing > 0) {
  console.error('\n❌ [R1] CRITICAL: public/dist audio is NOT synchronized');
  console.error('   Run: cp -r public/audio/week' + weekNum + '/* dist/audio/week' + weekNum + '/');
  console.error('   Then re-run this script to confirm.\n');
  process.exit(1);
}

console.log('\n✅ [R1] Gate PASS: all audio files byte-identical in public/ and dist/\n');
process.exit(0);
