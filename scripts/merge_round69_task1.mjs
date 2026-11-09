/**
 * scripts/merge_round69_task1.mjs
 * Merges W80 PET Mock into production src/data/weeks/week_80/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const srcMockDir = path.join(ROOT_DIR, 'docs/agent_artifacts/staging/week_80_mock');
const destMockDir = path.join(ROOT_DIR, 'src/data/weeks/week_80');
if (!fs.existsSync(destMockDir)) fs.mkdirSync(destMockDir, { recursive: true });

const contentFiles = [
  'listening_hub.js',
  'reading_hub.js',
  'writing_hub.js',
  'speaking_hub.js',
  'vocab.js',
  'skill_practice_hub.js',
  'provenance.json',
  'source_grounding.json'
];

console.log('=== MERGING WEEK 80 PET MOCK INTO PRODUCTION ===');
for (const f of contentFiles) {
  const srcFile = path.join(srcMockDir, f);
  const destFile = path.join(destMockDir, f);
  if (!fs.existsSync(srcFile)) {
    throw new Error(`Missing staged file: ${srcFile}`);
  }
  fs.copyFileSync(srcFile, destFile);
}

// Merge blueprint.json for W80
const existingBlueprint = JSON.parse(fs.readFileSync(path.join(destMockDir, 'blueprint.json'), 'utf8'));
const stagedBlueprint = JSON.parse(fs.readFileSync(path.join(srcMockDir, 'blueprint.json'), 'utf8'));

const mergedBlueprint = {
  ...existingBlueprint,
  title_en: stagedBlueprint.title_en || existingBlueprint.title_en,
  title_vi: stagedBlueprint.title_vi || existingBlueprint.title_vi,
  isFullMock: true,
  week_type: 'full_mock',
  mockFormat: 'pet',
  cumulativeBlock: stagedBlueprint.cumulativeBlock || [77, 78, 79, 80],
  synthesis_summary: stagedBlueprint.synthesis_summary,
  papers: stagedBlueprint.papers
};

fs.writeFileSync(path.join(destMockDir, 'blueprint.json'), JSON.stringify(mergedBlueprint, null, 2), 'utf8');
console.log('✅ Merged Week 80 PET Mock (8 hub files + enriched blueprint.json into src/data/weeks/week_80/)');
