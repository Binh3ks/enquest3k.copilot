/**
 * scripts/merge_round68_task1.mjs
 * Merges W76 PET Mock and Wave 2 (7 weeks: W73, 74, 75, 77, 79, 81, 82) into production src/data/weeks/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const wave2Weeks = [73, 74, 75, 77, 79, 81, 82];
const contentFiles = [
  'listening_hub.js',
  'reading_hub.js',
  'writing_hub.js',
  'speaking_hub.js',
  'vocab.js',
  'skill_practice_hub.js',
  'provenance.json',
  'source_grounding.json',
  'blueprint.json'
];

console.log('=== MERGING WAVE 2 ROTARY WEEKS INTO PRODUCTION ===');
for (const w of wave2Weeks) {
  const srcDir = path.join(ROOT_DIR, `docs/agent_artifacts/staging/week_${w}`);
  const destDir = path.join(ROOT_DIR, `src/data/weeks/week_${w}`);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  for (const f of contentFiles) {
    const srcFile = path.join(srcDir, f);
    const destFile = path.join(destDir, f);
    if (!fs.existsSync(srcFile)) {
      throw new Error(`Missing staged file: ${srcFile}`);
    }
    fs.copyFileSync(srcFile, destFile);
  }
  console.log(`✅ Merged Week ${w} (9 files copied to src/data/weeks/week_${w})`);
}

console.log('\n=== MERGING WEEK 76 PET MOCK INTO PRODUCTION ===');
const srcMockDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging/week_76_mock');
const destMockDir = path.join(ROOT_DIR, 'src/data/weeks/week_76');
if (!fs.existsSync(destMockDir)) fs.mkdirSync(destMockDir, { recursive: true });

for (const f of contentFiles) {
  if (f === 'blueprint.json') continue; // Handle blueprint specifically
  const srcFile = path.join(srcMockDir, f);
  const destFile = path.join(destMockDir, f);
  if (!fs.existsSync(srcFile)) {
    throw new Error(`Missing staged file: ${srcFile}`);
  }
  fs.copyFileSync(srcFile, destFile);
}

// Merge blueprint.json for W76
const existingBlueprint = JSON.parse(fs.readFileSync(path.join(destMockDir, 'blueprint.json'), 'utf8'));
const stagedBlueprint = JSON.parse(fs.readFileSync(path.join(srcMockDir, 'blueprint.json'), 'utf8'));

const mergedBlueprint = {
  ...existingBlueprint,
  title_en: stagedBlueprint.title_en || existingBlueprint.title_en,
  title_vi: stagedBlueprint.title_vi || existingBlueprint.title_vi,
  isFullMock: true,
  week_type: 'full_mock',
  mockFormat: 'pet',
  cumulativeBlock: stagedBlueprint.cumulativeBlock || [73, 74, 75, 76],
  synthesis_summary: stagedBlueprint.synthesis_summary,
  papers: stagedBlueprint.papers
};

fs.writeFileSync(path.join(destMockDir, 'blueprint.json'), JSON.stringify(mergedBlueprint, null, 2), 'utf8');
console.log('✅ Merged Week 76 PET Mock (8 hub files + enriched blueprint.json)');

console.log('\n🎉 Task 1 Merge Completed Successfully!');
