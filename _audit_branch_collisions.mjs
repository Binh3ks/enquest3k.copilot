/**
 * Audit: Find branch text duplicates across stems within the same week.
 * These cause audio URL collisions: same hash(branchText) → same R2 file
 * but Worker saves different full-sentence audio each time.
 * Fix: branch audio URL should use hash(fullSentence) not hash(branchText).
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

const PAIRS = [
  ...Array.from({length:27},(_,i)=>`week_${String(i+1).padStart(2,'0')}`).flatMap(w=>[
    { file: `src/data/weeks/${w}/mindmap.js`, folder: w.replace('_','') },
    { file: `src/data/weeks_easy/${w}/mindmap.js`, folder: w.replace('_','') + '_easy' }
  ]),
  ...Array.from({length:4},(_,i)=>`week_${28+i}`).flatMap(w=>[
    { file: `src/data/weeks/${w}/mindmap.js`, folder: w.replace('_','') },
    { file: `src/data/weeks_easy/${w}/mindmap.js`, folder: w.replace('_','') + '_easy' }
  ])
];

let totalCollisions = 0;

for (const { file, folder } of PAIRS) {
  const fullPath = path.join(ROOT, file);
  if (!fs.existsSync(fullPath)) continue;

  const content = fs.readFileSync(fullPath, 'utf-8');
  const mod = await import(`file://${fullPath}`);
  const d = mod.default;

  if (!d?.branchLabels || !d?.centerStems) continue;

  const seen = {}; // branchText → [stemText, ...]
  for (const [stem, branches] of Object.entries(d.branchLabels)) {
    for (const b of branches) {
      const bt = typeof b === 'string' ? b : b.text;
      if (!seen[bt]) seen[bt] = [];
      seen[bt].push(stem);
    }
  }

  const collisions = Object.entries(seen).filter(([, stems]) => stems.length > 1);
  if (collisions.length > 0) {
    console.log(`❌ ${folder}:`);
    for (const [bt, stems] of collisions) {
      console.log(`   "${bt}" used in:`);
      stems.forEach(s => console.log(`     → "${s}"`));
    }
    totalCollisions += collisions.length;
  }
}

console.log(`\n${totalCollisions === 0 ? '✅ No collisions found!' : `❌ ${totalCollisions} branch text collisions across all weeks`}`);
