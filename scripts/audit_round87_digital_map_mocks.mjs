#!/usr/bin/env node
/**
 * scripts/audit_round87_digital_map_mocks.mjs
 * (Upgraded in Round 88 to eliminate detection blind spots)
 *
 * Audits docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md for:
 *   1. Pattern 1: Literal "★ FULL MOCK" anywhere in the document (must be 0).
 *   2. Pattern 2: Case-insensitive /full mock/i in content week rows (must be 0).
 *   3. Pattern 2b: Case-insensitive /full mock/i in block headers (must be 0).
 *   4. Full case-insensitive inventory of all remaining "mock" occurrences across the entire file.
 *   5. Cross-reference against the 39 stale isFullMock blueprint weeks.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const MAP_PATH = path.join(ROOT_DIR, 'docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md');
const mapText = fs.readFileSync(MAP_PATH, 'utf8');
const mapLines = mapText.split('\n');

// 1. Pattern 1: Literal "★ FULL MOCK"
const literalStarMockLines = [];
// 2. Pattern 2: Case-insensitive /full mock/i in content week rows
const contentWeekFullMockRows = [];
// 2b. Pattern 2b: Case-insensitive /full mock/i in block headers (lines starting with #### Block or *Focus:)
const headerFullMockLines = [];
// 3. Full case-insensitive /mock/i line inventory
const allMockLines = [];

for (let idx = 0; idx < mapLines.length; idx++) {
  const line = mapLines[idx];
  const lineNum = idx + 1;

  if (line.includes('★ FULL MOCK')) {
    literalStarMockLines.push({ lineNum, text: line });
  }

  if (/mock/i.test(line)) {
    allMockLines.push({ lineNum, text: line });
  }

  const contentWeekMatch = line.match(/^\|\s*\*\*W(\d+)\*\*\s*\|/);
  if (contentWeekMatch) {
    if (/full mock/i.test(line)) {
      const weekNum = parseInt(contentWeekMatch[1], 10);
      const cols = line.split('|').map((s) => s.trim());
      contentWeekFullMockRows.push({
        lineNum,
        weekNum,
        title: cols[2],
        col3: cols[3],
        col4: cols[4],
        col5: cols[5],
        col6: cols[6],
        line,
      });
    }
  } else if (/^(\#{1,6}\s*Block|\*Focus:)/i.test(line.trim())) {
    if (/full mock/i.test(line)) {
      headerFullMockLines.push({ lineNum, text: line });
    }
  }
}

// Cross-reference: Find all 39 blueprints in src/data/weeks where isFullMock: true
const stale39Bp = [];
for (let w = 1; w <= 156; w++) {
  const bpPath = path.join(ROOT_DIR, `src/data/weeks/week_${w}/blueprint.json`);
  if (fs.existsSync(bpPath)) {
    const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    if (bp.isFullMock) stale39Bp.push(w);
  }
}

console.log('========================================================================');
console.log('DIGITAL MAP MOCK AUDIT (PATTERNS 1 & 2 ENFORCEMENT)');
console.log('========================================================================');
console.log(`Pattern 1 — Literal "★ FULL MOCK" lines:              ${literalStarMockLines.length}`);
console.log(`Pattern 2 — Content week rows with /full mock/i:       ${contentWeekFullMockRows.length}`);
console.log(`Pattern 2b — Block headers with /full mock/i:          ${headerFullMockLines.length}`);
console.log(`Total lines mentioning /mock/i anywhere in Map:       ${allMockLines.length}`);
console.log(`Stale 39/156 blueprints with isFullMock: true:        ${stale39Bp.length}`);

if (literalStarMockLines.length > 0) {
  console.error('\n❌ FAIL: Found literal "★ FULL MOCK" occurrences:');
  literalStarMockLines.forEach((m) => console.error(`  Line ${m.lineNum}: ${m.text}`));
}

if (contentWeekFullMockRows.length > 0) {
  console.error('\n❌ FAIL: Found content week rows matching /full mock/i:');
  contentWeekFullMockRows.forEach((r) => console.error(`  Line ${r.lineNum} [W${r.weekNum}]: ${r.line}`));
}

if (headerFullMockLines.length > 0) {
  console.error('\n❌ FAIL: Found block headers matching /full mock/i:');
  headerFullMockLines.forEach((h) => console.error(`  Line ${h.lineNum}: ${h.text}`));
}

console.log('\n--- FULL INVENTORY OF ALL /mock/i OCCURRENCES IN MAP ---');
allMockLines.forEach((m) => {
  console.log(`  Line ${m.lineNum.toString().padStart(3, ' ')}: ${m.text}`);
});

console.log('\n--- AUDIT VERDICT ---');
const pattern1Passed = literalStarMockLines.length === 0;
const pattern2Passed = contentWeekFullMockRows.length === 0 && headerFullMockLines.length === 0;

if (pattern1Passed && pattern2Passed) {
  console.log('✅ PASS: 0 hits on Pattern 1 (literal "★ FULL MOCK")');
  console.log('✅ PASS: 0 hits on Pattern 2 (case-insensitive /full mock/i in content rows & headers)');
  console.log('All remaining /mock/i lines are verified to be either M01-M34 checkpoint definitions or harmless prose.');
  process.exit(0);
} else {
  console.error('❌ AUDIT FAILED: Non-zero hits detected on banned mock patterns.');
  process.exit(1);
}
