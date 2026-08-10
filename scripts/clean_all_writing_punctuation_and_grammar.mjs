// Master Cleaning Script for Writing Station Datasets (W01–W48+)
// Fixes space before punctuation ("word ."), artificial ending adverbs, and formats model_sentence.

import fs from 'fs';
import path from 'path';

// Artificial adverbs to remove if appended awkwardly at sentence end
const BAD_ENDINGS_REGEX = /\s+(?:slowly|carefully|happily|safely|suddenly|next|finally|together|every day)\s*([.,!?])/gi;

function cleanSentenceTemplate(template) {
  if (!template) return '';
  let t = template;

  // Remove artificial ending adverbs like " ... slowly ." or " ... carefully ."
  t = t.replace(BAD_ENDINGS_REGEX, '$1');

  // Fix space before punctuation: "word ." -> "word.", "word ," -> "word,"
  t = t.replace(/\s+([.,!?;:])/g, '$1');

  // Remove double spaces
  t = t.replace(/\s{2,}/g, ' ').trim();

  // Ensure sentence ends with a period or question mark/exclamation if not ending in punctuation or gap
  if (!/[.,!?]$/.test(t) && !t.endsWith('___')) {
    t += '.';
  }

  return t;
}

function cleanAnswer(ans) {
  if (!ans) return '';
  let a = String(ans).trim();
  // Remove trailing punctuation from answer strings so punctuation isn't duplicated
  a = a.replace(/[.,!?;:]$/g, '').trim();
  return a;
}

function buildCleanModelSentence(frames) {
  if (!Array.isArray(frames) || frames.length === 0) return '';

  const fullSentences = frames.map((f) => {
    let t = f.template || '';
    const answers = (f.answers || []).map(cleanAnswer);
    const parts = t.split('___');
    let res = parts[0];
    for (let i = 0; i < parts.length - 1; i++) {
      res += (answers[i] || '') + parts[i + 1];
    }
    // Clean spaces before punctuation
    res = res.replace(/\s+([.,!?;:])/g, '$1');
    res = res.replace(/\s{2,}/g, ' ').trim();
    if (!/[.!?]$/.test(res)) {
      res += '.';
    }
    return res;
  });

  return fullSentences.join(' ');
}

async function cleanAllWritingFiles() {
  const root = process.cwd();
  console.log('🚀 CLEANING ALL WRITING DATASETS (W01–W48+)...\n');

  let totalAdvCleaned = 0;
  let totalEasyCleaned = 0;

  for (let i = 1; i <= 48; i++) {
    const pad = String(i).padStart(2, '0');
    const pAdv = path.join(root, 'src/data/weeks', `week_${pad}`, 'writing.js');
    const pEasy = path.join(root, 'src/data/weeks_easy', `week_${pad}`, 'writing.js');

    // 1. ADVANCED MODE CLEANING
    if (fs.existsSync(pAdv)) {
      const advMod = (await import(pAdv)).default;

      if (Array.isArray(advMod.sentence_frames)) {
        advMod.sentence_frames = advMod.sentence_frames.map(f => ({
          template: cleanSentenceTemplate(f.template),
          answers: (f.answers || []).map(cleanAnswer)
        }));
      }

      advMod.model_sentence = buildCleanModelSentence(advMod.sentence_frames);

      // ASSET GUARD W16-W32
      if (i >= 16 && i <= 32 && advMod.story_prompts?.picture_mode) {
        advMod.story_prompts.picture_mode.image_url = `/images/week${pad}/story_writing_pic.jpg`;
      }

      fs.writeFileSync(pAdv, `export default ${JSON.stringify(advMod, null, 2)};\n`, 'utf8');
      totalAdvCleaned++;
    }

    // 2. EASY MODE CLEANING
    if (fs.existsSync(pEasy)) {
      const easyMod = (await import(pEasy)).default;

      if (Array.isArray(easyMod.sentence_frames)) {
        easyMod.sentence_frames = easyMod.sentence_frames.map(f => ({
          template: cleanSentenceTemplate(f.template),
          answers: (f.answers || []).map(cleanAnswer)
        }));
      }

      easyMod.model_sentence = buildCleanModelSentence(easyMod.sentence_frames);

      fs.writeFileSync(pEasy, `export default ${JSON.stringify(easyMod, null, 2)};\n`, 'utf8');
      totalEasyCleaned++;
    }
  }

  console.log(`✅ SUCCESS: Cleaned ${totalAdvCleaned} Advanced files and ${totalEasyCleaned} Easy files.`);
}

cleanAllWritingFiles().catch(console.error);
