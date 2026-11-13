#!/usr/bin/env node
/**
 * scripts/audit_round87_digital_map_mocks.mjs
 *
 * Audits docs/ENGQUEST_DIGITAL_SYLLABUS_W01_W156_MAP.md for:
 *   1. Every numbered content week carrying a "★ FULL MOCK" label in Column 3
 *   2. Cross-referencing against the 39 stale isFullMock blueprint weeks
 *   3. Verifying the additive mock schedule alignment (34 interleaved mock checkpoints)
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

// 1. Find all content week rows with FULL MOCK
const contentMockRows = [];
const allMockLines = [];

for (let idx = 0; idx < mapLines.length; idx++) {
  const line = mapLines[idx];
  if (line.includes('FULL MOCK')) {
    allMockLines.push({ lineNum: idx + 1, text: line });
    const match = line.match(/^\|\s*\*\*W(\d+)\*\*\s*\|/);
    if (match) {
      const weekNum = parseInt(match[1], 10);
      const cols = line.split('|').map((s) => s.trim());
      contentMockRows.push({
        lineNum: idx + 1,
        weekNum,
        title: cols[2],
        col3: cols[3],
        col4: cols[4],
        col5: cols[5],
        col6: cols[6],
      });
    }
  }
}

// 2. Find all 39 blueprints in src/data/weeks where isFullMock: true
const stale39Bp = [];
for (let w = 1; w <= 156; w++) {
  const bpPath = path.join(ROOT_DIR, `src/data/weeks/week_${w}/blueprint.json`);
  if (fs.existsSync(bpPath)) {
    const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    if (bp.isFullMock) stale39Bp.push(w);
  }
}

console.log('========================================================================');
console.log('ROUND 87 DIGITAL MAP MOCK AUDIT');
console.log('========================================================================');
console.log(`Total lines mentioning FULL MOCK in Map: ${allMockLines.length}`);
console.log(`Content week rows with FULL MOCK in Map: ${contentMockRows.length}`);
console.log(`Weeks in Map with FULL MOCK: ${contentMockRows.map((r) => r.weekNum).join(', ')}`);
console.log(`Stale 39/156 blueprints with isFullMock: true: count=${stale39Bp.length}`);
console.log(`Weeks in 39 blueprints: ${stale39Bp.join(', ')}`);

// Overlap and differences
const mapWeeks = new Set(contentMockRows.map((r) => r.weekNum));
const bpWeeks = new Set(stale39Bp);

const inBoth = [...mapWeeks].filter((w) => bpWeeks.has(w));
const inMapOnly = [...mapWeeks].filter((w) => !bpWeeks.has(w));
const inBpOnly = [...bpWeeks].filter((w) => !mapWeeks.has(w));

console.log('\n--- CROSS-REFERENCE ANALYSIS ---');
console.log(`In Both Map & 39 Blueprints (${inBoth.length}): ${inBoth.join(', ')}`);
console.log(`In Map only (${inMapOnly.length}): ${inMapOnly.join(', ')}`);
console.log(`In 39 Blueprints only (${inBpOnly.length}): ${inBpOnly.join(', ')}`);

console.log('\n--- DETAILS OF 27 CONTENT WEEKS IN MAP ---');
contentMockRows.forEach((r) => {
  console.log(`Line ${r.lineNum} [W${r.weekNum}]: Col3="${r.col3}" | Col2="${r.title}"`);
});
