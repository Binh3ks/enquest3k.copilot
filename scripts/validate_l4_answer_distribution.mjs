#!/usr/bin/env node
/**
 * validate_l4_answer_distribution.mjs — Golden Standard v1.0 Gates A1, A2
 *
 * Usage: node scripts/validate_l4_answer_distribution.mjs <weekNum>
 * Exit 1 = CRITICAL (all-same answer pattern detected).
 * Exit 0 = distribution valid.
 */
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const weekNum = process.argv[2];
if (!weekNum) { console.error('Usage: node validate_l4_answer_distribution.mjs <weekNum>'); process.exit(1); }

const hubPath = path.resolve(`src/data/weeks/week_${weekNum}/listening_hub.js`);
if (!fs.existsSync(hubPath)) {
  console.error(`ERROR: ${hubPath} not found`);
  process.exit(1);
}

const mod = await import(pathToFileURL(hubPath).href);
const lh = mod.listeningHub || mod.listeningHubData || mod.default;
const p4 = lh?.listening_p4;

if (!p4) {
  console.error('ERROR: listening_p4 not found in hub');
  process.exit(1);
}

const scored = (p4.questions || []).filter(q => !q.isExample);
if (scored.length === 0) {
  console.warn('WARNING: No scored L4 questions found (only example)');
  process.exit(0);
}

const dist = {};
scored.forEach(q => {
  const ans = q.answer;
  if (!ans) { console.error(`ERROR: ${q.id} has no answer field`); process.exit(1); }
  dist[ans] = (dist[ans] || 0) + 1;
});

const letters = Object.keys(dist).sort();
const maxCount = Math.max(...Object.values(dist));
const allSame = letters.length === 1;

console.log(`\nL4 Answer Distribution — Week ${weekNum}`);
console.log(`  Scored items: ${scored.length}`);
console.log(`  Distribution: ${JSON.stringify(dist)}`);
console.log(`  Distinct letters: ${letters.join(', ')}`);

if (allSame) {
  console.error(`\n❌ [A1] CRITICAL: ALL ${scored.length} answers are "${letters[0]}"`);
  console.error('   A student who ticks the same box every time scores perfectly.');
  console.error('   This is an ASSESSMENT DESIGN DEFECT. Redesign Q answers.\n');
  process.exit(1);
}

if (letters.length < 2) {
  console.error(`\n❌ [A2] CRITICAL: Only ${letters.length} distinct letter — need ≥ 2`);
  process.exit(1);
}

if (maxCount > 3) {
  console.warn(`\n⚠️  [A1] WARNING: "${letters.find(l => dist[l] === maxCount)}" appears ${maxCount} times — high clustering`);
  console.warn('   Acceptable but flagged for review.\n');
}

// Verify all 3 option letters appear as answers (optional but preferred)
const hasA = 'A' in dist, hasB = 'B' in dist, hasC = 'C' in dist;
if (!hasA || !hasB || !hasC) {
  console.warn(`\n⚠️  [A2] NOTE: Not all option letters (A/B/C) appear as answers. Missing: ${[!hasA&&'A',!hasB&&'B',!hasC&&'C'].filter(Boolean).join(', ')}`);
  console.warn('   Preferred distribution uses all three letters at least once.\n');
}

console.log('\n✅ [A1/A2] Answer distribution VALID — Gate passes\n');
process.exit(0);
