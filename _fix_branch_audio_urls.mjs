/**
 * Fix: Change branch audio URL from hash(branchText) → hash(fullSentence).
 * This prevents audio cache collisions when the same branch word appears in
 * multiple stems within the same week (e.g. "drawing" in "I am ___ a picture."
 * AND "I am ___ right now." — both would have identical audio URLs but the
 * Worker saves different full-sentence TTS each time, causing wrong audio).
 *
 * Usage: node _fix_branch_audio_urls.mjs
 */
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

// All mindmap files (W1-31, both modes)
const FILES = [
  ...Array.from({length: 31}, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return [
      { file: `src/data/weeks/week_${n}/mindmap.js`,      folder: `week${i+1}` },
      { file: `src/data/weeks_easy/week_${n}/mindmap.js`, folder: `week${i+1}_easy` }
    ];
  }).flat()
];

let totalFixed = 0;
let totalFiles = 0;

for (const { file, folder } of FILES) {
  const fullPath = path.join(ROOT, file);
  if (!fs.existsSync(fullPath)) continue;

  const mod = await import(`file://${fullPath}?ts=${Date.now()}`);
  const d = mod.default;
  if (!d?.branchLabels || !d?.centerStems) continue;

  // Rebuild with corrected branch audio URLs
  const stems = d.centerStems.map(s => typeof s === 'string' ? s : s.text);
  const stemAudios = d.centerStems.map(s =>
    typeof s === 'string' ? null : s.audio
  );

  // Rewrite: keep stem audio as-is (stem audio URL is still hash(stemText) which is fine
  // since each stem text is unique within a week). Only fix branch audio URLs.
  let fixCount = 0;
  const branchEntriesParts = [];

  for (const [stemText, branches] of Object.entries(d.branchLabels)) {
    const branchLines = branches.map(b => {
      const branchText = typeof b === 'string' ? b : b.text;
      const fullSentence = stemText.replace('___', branchText);
      const correctUrl = `/audio/${folder}/mindmap_branch_${hashText(fullSentence)}.mp3`;

      const existingUrl = typeof b === 'string' ? null : b.audio;
      if (existingUrl && existingUrl !== correctUrl) fixCount++;

      return `      { text: ${JSON.stringify(branchText)}, audio: ${JSON.stringify(correctUrl)} }`;
    });
    branchEntriesParts.push(`    ${JSON.stringify(stemText)}: [\n${branchLines.join(',\n')}\n    ]`);
  }

  // Rebuild center stems (preserve existing audio URL for stems — they're unique)
  const stemLines = d.centerStems.map((s, i) => {
    const stemText = typeof s === 'string' ? s : s.text;
    const stemAudio = typeof s === 'string' ? null : s.audio;
    // Keep existing stem audio URL (or compute if missing)
    const url = stemAudio || `/audio/${folder}/mindmap_stem_${hashText(stemText)}.mp3`;
    return `    { text: ${JSON.stringify(stemText)}, audio: ${JSON.stringify(url)} }`;
  });

  const newContent =
    `const mindMapContent = {\n  centerStems: [\n${stemLines.join(',\n')}\n  ],\n  branchLabels: {\n${branchEntriesParts.join(',\n')}\n  }\n};\n\nexport default mindMapContent;\n`;

  fs.writeFileSync(fullPath, newContent, 'utf-8');
  totalFixed += fixCount;
  totalFiles++;

  if (fixCount > 0) {
    console.log(`✅ ${folder}: fixed ${fixCount} branch URLs`);
  }
}

console.log(`\n✅ Done — ${totalFixed} branch audio URLs updated across ${totalFiles} files`);
console.log('Branch audio URLs now use hash(fullSentence) → no more audio cache collisions.');
