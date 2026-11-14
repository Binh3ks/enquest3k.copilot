import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');

const TARGET_WEEKS = [40, 44, 47, 48, 49, 50, 51, 53, 54];

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? syl.length : 1;
}

function calcFKDetailed(text) {
  if (!text) return { words: 0, sentences: 0, syllables: 0, fk: 0 };
  const clean = text.replace(/[\n\r]+/g, ' ').trim();
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 2);
  const words = clean.split(/\s+/).map(w => w.replace(/[^a-zA-Z]/g, '').toLowerCase()).filter(w => w.length > 0);
  if (words.length === 0 || sentences.length === 0) return { words: 0, sentences: 0, syllables: 0, fk: 0 };
  let syllables = 0;
  for (const w of words) {
    syllables += countSyllables(w);
  }
  const score = 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59;
  return {
    words: words.length,
    sentences: sentences.length,
    syllables,
    fk: Math.round(score * 10) / 10
  };
}

console.log('| Week | Section | Words | Sentences | Syllables | FK Grade | CEFR Band |');
console.log('|---|---|---|---|---|---|---|');

for (const w of TARGET_WEEKS) {
  const dir = path.join(STAGING_DIR, `week_${w}`);
  const vModule = await import(path.join(dir, `vocab.js?v=${Date.now()}`));
  const vh = vModule.default || vModule.vocabData;
  const vocabList = vh?.vocab || vh?.words || (Array.isArray(vh) ? vh : []);

  const rModule = await import(path.join(dir, `reading_hub.js?v=${Date.now()}`));
  const rh = rModule.default || rModule.readingHubData;

  // 1. Story
  const storyTexts = [];
  for (const scene of (rh.story_scenes || [])) {
    if (scene.narration_en) storyTexts.push(scene.narration_en);
    for (const d of (scene.dialogue || [])) {
      if (d.text) storyTexts.push(d.text);
    }
  }
  const storyStats = calcFKDetailed(storyTexts.join(' '));

  // 2. CLIL
  const clilText = rh.clil_article?.content_en || '';
  const clilStats = calcFKDetailed(clilText);

  // 3. Vocab Definitions
  const defsText = vocabList.map(v => v.definition_en || '').join('. ');
  const defStats = calcFKDetailed(defsText);

  // 4. Vocab Examples
  const exText = vocabList.map(v => v.example_en || '').join(' ');
  const exStats = calcFKDetailed(exText);

  const band = (fk) => (fk <= 4.0 ? 'A1/Pre-A2' : fk <= 8.5 ? 'A2 Flyers' : fk <= 9.5 ? 'A2/B1' : 'B1+');

  console.log(`| W${w} | Story Scenes | ${storyStats.words} | ${storyStats.sentences} | ${storyStats.syllables} | **${storyStats.fk}** | ${band(storyStats.fk)} |`);
  console.log(`| W${w} | CLIL Article | ${clilStats.words} | ${clilStats.sentences} | ${clilStats.syllables} | **${clilStats.fk}** | ${band(clilStats.fk)} |`);
  console.log(`| W${w} | Vocab Definitions (avg) | ${defStats.words} | ${defStats.sentences} | ${defStats.syllables} | **${defStats.fk}** | ${band(defStats.fk)} |`);
  console.log(`| W${w} | Vocab Examples (avg) | ${exStats.words} | ${exStats.sentences} | ${exStats.syllables} | **${exStats.fk}** | ${band(exStats.fk)} |`);
}
