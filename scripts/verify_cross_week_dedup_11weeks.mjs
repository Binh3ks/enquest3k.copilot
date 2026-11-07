/**
 * scripts/verify_cross_week_dedup_11weeks.mjs
 * 
 * Verifies cross-week differentiation across all 11 weeks:
 * - 4 Merged Pilot Weeks: W35, W38, W78, W125 (from src/data/weeks)
 * - 7 Scaling Wave 1 Weeks: W39, W40, W41, W43, W44, W45, W46 (from docs/agent_artifacts/staging)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_SKELETONS } from './generate_giaidoan2_content.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const ALL_11_WEEKS = [35, 38, 39, 40, 41, 43, 44, 45, 46, 78, 125];
const MERGED_PILOT = [35, 38, 78, 125];
const WAVE1_WEEKS = [39, 40, 41, 43, 44, 45, 46];

console.log('========================================================================');
console.log('🔬 ENGQUEST3K — CROSS-WEEK DIFFERENTIATION & DEDUP VERIFICATION');
console.log(`📋 Total Cohort: 11 Weeks (4 Merged Pilots + 7 Scaling Wave 1 Weeks)`);
console.log('========================================================================\n');

// 1. SKELETON HASH UNIQUENESS (Gate 10)
console.log('--- PART 1: Structural Skeleton Uniqueness (Gate 10) ---');
const skeletonHashes = {};
let collisionCount = 0;

for (const w of ALL_11_WEEKS) {
  const sk = ALL_SKELETONS[w];
  if (!sk) {
    console.error(`❌ Missing skeleton for Week ${w}`);
    collisionCount++;
    continue;
  }
  if (skeletonHashes[sk.hash]) {
    console.error(`❌ Collision between Week ${w} and Week ${skeletonHashes[sk.hash]}: SHA256 ${sk.hash}`);
    collisionCount++;
  } else {
    skeletonHashes[sk.hash] = w;
  }
  console.log(`  Week ${String(w).padStart(3)}: SHA-256 = ${sk.hash.slice(0, 16)}... (Length: ${sk.normalizedLength})`);
}

if (collisionCount === 0) {
  console.log(`  ✅ PASS: 11/11 unique structural skeletons. 0 collisions across all 11 weeks!\n`);
} else {
  console.error(`  ❌ FAIL: ${collisionCount} skeleton collisions detected!\n`);
  process.exit(1);
}

// 2. STORY NARRATIVE SENTENCE DEDUP
console.log('--- PART 2: Story & Dialogue Sentence Overlap Detector ---');
const corpusSentences = {};

for (const w of ALL_11_WEEKS) {
  const isMerged = MERGED_PILOT.includes(w);
  const dir = isMerged
    ? path.join(ROOT_DIR, `src/data/weeks/week_${w}`)
    : path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);

  const rhPath = path.join(dir, 'reading_hub.js');
  const sentences = new Set();

  if (fs.existsSync(rhPath)) {
    const txt = fs.readFileSync(rhPath, 'utf8');
    const matches = txt.matchAll(/"(?:text|description_en|model_sentence)"\s*:\s*"([^"]{20,})"/g);
    for (const m of matches) {
      sentences.add(m[1].trim());
    }
  }

  corpusSentences[w] = sentences;
  console.log(`  Week ${String(w).padStart(3)} (${isMerged ? 'Merged Prod' : 'Staged Wave1'}): Extracted ${sentences.size} narrative sentences`);
}

let sentenceCollisions = 0;
for (let i = 0; i < ALL_11_WEEKS.length; i++) {
  const w1 = ALL_11_WEEKS[i];
  for (let j = i + 1; j < ALL_11_WEEKS.length; j++) {
    const w2 = ALL_11_WEEKS[j];
    const set1 = corpusSentences[w1];
    const set2 = corpusSentences[w2];
    const shared = [...set1].filter(s => set2.has(s));
    if (shared.length > 0) {
      console.error(`  ❌ Shared narrative sentence between W${w1} and W${w2}: "${shared[0]}"`);
      sentenceCollisions += shared.length;
    }
  }
}

if (sentenceCollisions === 0) {
  console.log(`  ✅ PASS: 0 shared narrative sentences across all 55 pairwise week comparisons!\n`);
} else {
  console.error(`  ❌ FAIL: ${sentenceCollisions} shared sentences detected!\n`);
  process.exit(1);
}

console.log('========================================================================');
console.log('🎉 ALL 11 WEEKS FULLY DIFFERENTIATED AND DEDUP-VERIFIED CLEAN!');
console.log('========================================================================');
