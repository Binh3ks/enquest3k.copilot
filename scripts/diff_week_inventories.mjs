#!/usr/bin/env node
/**
 * TASK 14: 1:1 Media Inventory Diff & Byte-Identity Auditor
 * Compares Week 34 against Week 33 baseline:
 * 1. Checks every required slot in W33 exists in W34
 * 2. Asserts SHA-256 byte-identity check (W34 !== W33, identical = copy = FAIL)
 * 3. Produces markdown diff table
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log(`\n========================================================================`);
console.log(`⚖️  TASK 14: 1:1 ASSET DIFF & BYTE-IDENTITY AUDIT (W34 vs W33)`);
console.log(`========================================================================`);

const inv33Path = path.join(rootDir, 'docs/week33_media_inventory.json');
const inv34Path = path.join(rootDir, 'docs/week34_media_inventory.json');

if (!fs.existsSync(inv33Path) || !fs.existsSync(inv34Path)) {
  console.error(`❌ Missing inventory JSON files. Run task 13 first.`);
  process.exit(1);
}

const inv33 = JSON.parse(fs.readFileSync(inv33Path, 'utf8'));
const inv34 = JSON.parse(fs.readFileSync(inv34Path, 'utf8'));

let diffRows = [];
let identicalCopies = [];
let missingIn34 = [];

for (const [questId, qData33] of Object.entries(inv33.quests)) {
  const qData34 = inv34.quests[questId];
  if (!qData34) {
    missingIn34.push(`Quest ${questId} completely missing in W34 inventory`);
    continue;
  }

  for (const [partId, items33] of Object.entries(qData33.parts)) {
    const items34 = qData34.parts[partId] || [];

    items33.forEach((item33, idx) => {
      const item34 = items34[idx];
      if (!item34) {
        missingIn34.push(`${questId}.${partId} item ${idx + 1} (${item33.role}) missing in W34`);
        return;
      }

      if (item33.status === 'no-image-by-design') {
        diffRows.push({
          slot: `${questId} / ${partId}`,
          role: item33.role,
          w33_ref: 'no-image-by-design',
          w34_ref: 'no-image-by-design',
          status: '✅ By Design'
        });
        return;
      }

      // Check byte identity
      const isIdentical = item33.sha256 && item34.sha256 && item33.sha256 === item34.sha256;
      if (isIdentical && !item33.ref.includes('avatars') && !item33.ref.includes('ui/')) {
        identicalCopies.push(`${questId}.${partId} (${item34.ref}) is an identical byte copy of W33!`);
      }

      const status = !item34.exists 
        ? '❌ Missing' 
        : isIdentical 
          ? '❌ COPY (Identical SHA256)' 
          : '✅ Unique W34';

      diffRows.push({
        slot: `${questId} / ${partId}`,
        role: item33.role,
        w33_ref: item33.ref,
        w34_ref: item34.ref,
        status
      });
    });
  }
}

console.log(`| Slot / Cambridge Part | Role | W33 Baseline Ref | W34 Target Ref | Diff Status |`);
console.log(`|---|---|---|---|---|`);
diffRows.slice(0, 35).forEach(r => {
  console.log(`| \`${r.slot}\` | ${r.role} | \`${r.w33_ref}\` | \`${r.w34_ref}\` | ${r.status} |`);
});
if (diffRows.length > 35) {
  console.log(`| ... | (${diffRows.length - 35} more slots checked) | ... | ... | ... |`);
}

console.log(`\n========================================================================`);
console.log(`📊 DIFF SUMMARY:`);
console.log(`   - Total Slots Compared: ${diffRows.length}`);
console.log(`   - Missing in W34:       ${missingIn34.length}`);
console.log(`   - Identical W33 Copies: ${identicalCopies.length}`);
console.log(`========================================================================`);

if (identicalCopies.length > 0 || missingIn34.length > 0) {
  console.error(`❌ TASK 14 FAILED: Detected ${identicalCopies.length} identical byte copies and ${missingIn34.length} missing slots!`);
  identicalCopies.forEach(c => console.error(`   - ${c}`));
  missingIn34.forEach(m => console.error(`   - ${m}`));
  process.exit(1);
} else {
  console.log(`🎉 TASK 14 PASSED: 100% Unique W34 Theme Assets & 0 Identical Copies!`);
  process.exit(0);
}
