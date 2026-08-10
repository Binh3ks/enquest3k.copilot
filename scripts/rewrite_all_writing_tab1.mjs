// Master Clean Rewrite Script for Tab 1 Model Challenge Data (W01–W48+)
// Usage: node scripts/rewrite_all_writing_tab1.mjs

import fs from 'fs';
import path from 'path';

function cleanSentence(text) {
  if (!text) return '';
  let t = text.replace(/\s+([.,!?;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();
  if (!/[.!?]$/.test(t) && !t.endsWith('___')) {
    t += '.';
  }
  return t;
}

function buildModelSentence(frames) {
  if (!Array.isArray(frames) || frames.length === 0) return '';
  const full = frames.map(f => {
    let t = f.template || '';
    const ans = f.answers || [];
    const parts = t.split('___');
    let res = parts[0];
    for (let i = 0; i < parts.length - 1; i++) {
      res += (ans[i] || '') + parts[i + 1];
    }
    res = res.replace(/\s+([.,!?;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();
    if (!/[.!?]$/.test(res)) {
      res += '.';
    }
    return res;
  });
  return full.join(' ');
}

function convertToEasyFrame(frame) {
  let t = frame.template || '';
  let a = frame.answers || [];
  t = cleanSentence(t);

  const parts = t.split('___');
  if (parts.length - 1 === 1) {
    return { template: t, answers: [String(a[0] || 'word').trim()] };
  }
  if (parts.length - 1 === 0) {
    return { template: t.replace(/[.,!?]$/, '') + ' ___.', answers: [String(a[0] || 'word').trim()] };
  }

  // > 1 gap: keep first gap, fill rest with answer text
  let res = parts[0] + '___';
  for (let i = 1; i < parts.length - 1; i++) {
    res += parts[i] + (a[i] || '');
  }
  res += parts[parts.length - 1];
  res = cleanSentence(res);

  return { template: res, answers: [String(a[0] || 'word').trim()] };
}

function convertToAdvFrame(frame) {
  let t = frame.template || '';
  let a = (frame.answers || []).map(x => String(x).trim());
  t = cleanSentence(t);

  const parts = t.split('___');
  const count = parts.length - 1;

  if (count === 2) {
    // Check distance between gaps
    const wordsBetween = parts[1].trim().split(/\s+/).filter(Boolean).length;
    if (wordsBetween >= 2) {
      return { template: t, answers: [a[0] || 'word1', a[1] || 'word2'] };
    }
  }

  // Reconstruct full sentence and pick 2 distinct words at least 2 words apart
  let fullSentence = parts[0];
  for (let i = 0; i < count; i++) {
    fullSentence += (a[i] || '') + parts[i + 1];
  }
  fullSentence = fullSentence.replace(/\s+([.,!?;:])/g, '$1').replace(/\s{2,}/g, ' ').trim();

  const words = fullSentence.split(' ');
  if (words.length < 5) {
    words.push('at', 'our', 'school');
  }

  const gap1Idx = Math.min(1, Math.floor(words.length / 4));
  let gap2Idx = Math.min(words.length - 1, gap1Idx + 3);
  if (gap2Idx <= gap1Idx + 1) gap2Idx = words.length - 1;

  const ans1 = words[gap1Idx].replace(/[.,!?;:]/g, '');
  const ans2 = words[gap2Idx].replace(/[.,!?;:]/g, '');

  const newWords = [...words];
  newWords[gap1Idx] = '___';
  newWords[gap2Idx] = '___';

  let newTemplate = cleanSentence(newWords.join(' '));

  return {
    template: newTemplate,
    answers: [ans1 || 'word1', ans2 || 'word2']
  };
}

async function rewriteAllWritingTab1() {
  const root = process.cwd();
  console.log('🚀 EXECUTING CLEAN REWRITE OF TAB 1 FOR ALL WEEKS (W01–W48+)...\n');

  let easyCount = 0;
  let advCount = 0;

  for (let i = 1; i <= 48; i++) {
    const pad = String(i).padStart(2, '0');
    const targetSentences = i <= 15 ? 6 : (i <= 28 ? 8 : (i <= 42 ? 10 : 12));

    const pAdv = path.join(root, 'src/data/weeks', `week_${pad}`, 'writing.js');
    const pEasy = path.join(root, 'src/data/weeks_easy', `week_${pad}`, 'writing.js');

    // 1. ADVANCED MODE REWRITE
    if (fs.existsSync(pAdv)) {
      const advMod = (await import(pAdv)).default;
      let frames = Array.isArray(advMod.sentence_frames) ? advMod.sentence_frames : [];

      while (frames.length < targetSentences && frames.length > 0) {
        frames.push(JSON.parse(JSON.stringify(frames[frames.length % frames.length])));
      }
      if (frames.length > targetSentences) {
        frames = frames.slice(0, targetSentences);
      }

      advMod.sentence_frames = frames.map(f => convertToAdvFrame(f));
      advMod.min_sentences = targetSentences;
      advMod.model_sentence = buildModelSentence(advMod.sentence_frames);

      if (advMod.hints?.vocabulary_bank) {
        advMod.hints.vocabulary_bank.scaffolding_stage = 'medium';
      }

      // ASSETS GUARD W16-W32
      if (i >= 16 && i <= 32 && advMod.story_prompts?.picture_mode) {
        advMod.story_prompts.picture_mode.image_url = `/images/week${pad}/story_writing_pic.jpg`;
      }

      fs.writeFileSync(pAdv, `export default ${JSON.stringify(advMod, null, 2)};\n`, 'utf8');
      advCount++;
    }

    // 2. EASY MODE REWRITE
    if (fs.existsSync(pEasy)) {
      const easyMod = (await import(pEasy)).default;
      let frames = Array.isArray(easyMod.sentence_frames) ? easyMod.sentence_frames : [];

      while (frames.length < targetSentences && frames.length > 0) {
        frames.push(JSON.parse(JSON.stringify(frames[frames.length % frames.length])));
      }
      if (frames.length > targetSentences) {
        frames = frames.slice(0, targetSentences);
      }

      easyMod.sentence_frames = frames.map(f => convertToEasyFrame(f));
      easyMod.min_sentences = targetSentences;
      easyMod.model_sentence = buildModelSentence(easyMod.sentence_frames);

      if (easyMod.hints?.vocabulary_bank) {
        easyMod.hints.vocabulary_bank.scaffolding_stage = 'high';
      }

      fs.writeFileSync(pEasy, `export default ${JSON.stringify(easyMod, null, 2)};\n`, 'utf8');
      easyCount++;
    }
  }

  console.log(`✅ CLEAN REWRITE COMPLETE: Updated ${advCount} Advanced files and ${easyCount} Easy files.`);
}

rewriteAllWritingTab1().catch(console.error);
