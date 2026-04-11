/**
 * fix_remaining_missing_weeks.mjs
 *
 * Assign first_taught_week to the 36 remaining words
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const DICT_PATH = resolve(ROOT, 'src/data/dictionary.json');
const dictionary = JSON.parse(readFileSync(DICT_PATH, 'utf-8'));

// Manual assignment based on theme/curriculum
const weekAssignments = {
  // Week 8 - School supplies & classroom
  'pencil case': 8,
  'school bag': 8,
  'lunch box': 8,
  'water bottle': 8,
  'uniform': 8,
  'shelf': 8,
  'clock': 5,
  // Week 10 - Home/living vocabulary
  'living room': 10,
  'bath': 10,
  'shower': 10,
  // Week 12 - Abilities/appearance
  'handsome': 12,
  'pretty': 12,
  'slim': 12,
  'look like': 12,
  // Week 13 - Learning/knowledge
  'knowledge': 13,
  'curious': 13,
  'scholar': 13,
  'attention': 7,
  // Week 14 - Daily routines
  'last night': 14,
  'last week': 14,
  // Week 17 - Achievements
  'achieve': 17,
  'success': 17,
  'improve': 18,
  // Week 20 - Science/nature
  'absorb': 20,
  'demonstrate': 20,
  // Week 22 - Body/health
  'alarm': 22,
  'hit': 15,
  'lose': 16,
  // Week 26 - Comics/art
  'comic strip': 26,
  'speech bubble': 26,
  'sketch': 26,
  'singing': 15,
  // Week 29 - Transportation
  'vehicle': 29,
  'route': 29,
  'platform': 29,
  // Grammar/misc
  'ing': 15,
};

let updated = 0;
for (const entry of dictionary) {
  if (entry.first_taught_week) continue;
  
  const word = entry.word.toLowerCase();
  if (weekAssignments[word]) {
    entry.first_taught_week = weekAssignments[word];
    console.log(`  ✅ ${word} → Week ${weekAssignments[word]}`);
    updated++;
  }
}

console.log(`\n✅ Updated ${updated} entries`);

// Check how many still missing
const stillMissing = dictionary.filter(e => !e.first_taught_week);
console.log(`Still missing: ${stillMissing.length}`);
if (stillMissing.length > 0) {
  stillMissing.forEach(e => console.log('  -', e.word));
}

writeFileSync(DICT_PATH, JSON.stringify(dictionary, null, 2), 'utf-8');
console.log(`\n💾 Saved ${dictionary.length} entries`);
