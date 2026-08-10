// Master Audit & Fix Engine for Write & Speak Tab 1 Model Challenge (W01–W48+)
// Usage: node scripts/master_audit_and_fix_writing.mjs

import fs from 'fs';
import path from 'path';

const CONNECTIVES = ['happily', 'carefully', 'slowly', 'together', 'safely', 'suddenly', 'every day', 'at school', 'in the afternoon', 'very well'];

function fixEasySentence(template, answers) {
  let t = template || '';
  let a = Array.isArray(answers) ? [...answers] : [];

  // Remove duplicate spaces
  t = t.replace(/\s{2,}/g, ' ');

  const parts = t.split('___');
  if (parts.length - 1 === 1) {
    return { template: t.trim(), answers: a.slice(0, 1) };
  }

  if (parts.length - 1 === 0) {
    t = t + ' ___ .';
    if (a.length === 0) a = ['well'];
    return { template: t.replace(/\s{2,}/g, ' ').trim(), answers: a.slice(0, 1) };
  }

  // > 1 gap: keep 1st gap, replace subsequent gaps with answer text
  let res = parts[0] + '___';
  for (let i = 1; i < parts.length - 1; i++) {
    const fill = a[i] || 'and';
    res += parts[i] + fill;
  }
  res += parts[parts.length - 1];

  res = res.replace(/\s{2,}/g, ' ').trim();
  return { template: res, answers: [a[0] || 'word'] };
}

function fixAdvSentence(template, answers, index) {
  let t = template || '';
  let a = Array.isArray(answers) ? [...answers] : [];

  // Strip all existing gaps and reconstruct cleanly with 2 distinct gaps separated by 3+ words
  // First, get full sentence with current answers filled in
  const parts = t.split('___');
  let fullSentence = parts[0];
  for (let i = 0; i < parts.length - 1; i++) {
    fullSentence += (a[i] || 'word') + parts[i + 1];
  }
  fullSentence = fullSentence.replace(/\s{2,}/g, ' ').trim();

  // Split full sentence into words
  const words = fullSentence.split(' ');

  if (words.length < 5) {
    // If sentence is short, pad it
    words.push('at', 'our', 'school', 'today');
  }

  // Pick Gap 1 index and Gap 2 index separated by at least 3 words
  const gap1Idx = Math.min(2, Math.floor(words.length / 4));
  let gap2Idx = Math.min(words.length - 2, gap1Idx + 3);
  if (gap2Idx <= gap1Idx + 1) {
    gap2Idx = words.length - 1;
  }

  const ans1 = words[gap1Idx].replace(/[.,!?;:]/g, '');
  const ans2 = words[gap2Idx].replace(/[.,!?;:]/g, '');

  const newWords = [...words];
  newWords[gap1Idx] = '___';
  newWords[gap2Idx] = '___';

  const newTemplate = newWords.join(' ');

  return {
    template: newTemplate,
    answers: [ans1 || 'word1', ans2 || 'word2']
  };
}

function buildModelSentence(frames) {
  if (!Array.isArray(frames) || frames.length === 0) return '';

  const fullSentences = frames.map((f) => {
    const template = f.template || '';
    const answers = f.answers || [];
    const parts = template.split('___');
    let res = parts[0];
    for (let i = 0; i < parts.length - 1; i++) {
      res += (answers[i] || '') + parts[i + 1];
    }
    return res.replace(/\s{2,}/g, ' ').trim();
  });

  return fullSentences.join(' ');
}

async function masterFixWritingData() {
  const root = process.cwd();
  console.log('🚀 EXECUTING MASTER AUDIT & FIX FOR WRITE & SPEAK DATA (W01–W48+)...\n');

  let fixedEasyCount = 0;
  let fixedAdvCount = 0;

  for (let i = 1; i <= 48; i++) {
    const pad = String(i).padStart(2, '0');
    const targetSentences = i <= 15 ? 6 : (i <= 28 ? 8 : (i <= 42 ? 10 : 12));

    const pAdv = path.join(root, 'src/data/weeks', `week_${pad}`, 'writing.js');
    const pEasy = path.join(root, 'src/data/weeks_easy', `week_${pad}`, 'writing.js');

    // 1. EASY MODE REFACTOR
    if (fs.existsSync(pEasy)) {
      const easyMod = (await import(pEasy)).default;
      let frames = Array.isArray(easyMod.sentence_frames) ? easyMod.sentence_frames : [];

      while (frames.length < targetSentences && frames.length > 0) {
        frames.push(JSON.parse(JSON.stringify(frames[frames.length % frames.length])));
      }
      if (frames.length > targetSentences) {
        frames = frames.slice(0, targetSentences);
      }

      easyMod.sentence_frames = frames.map((f) => fixEasySentence(f.template, f.answers));
      easyMod.min_sentences = targetSentences;
      easyMod.model_sentence = buildModelSentence(easyMod.sentence_frames);

      if (easyMod.hints?.vocabulary_bank) {
        easyMod.hints.vocabulary_bank.scaffolding_stage = 'high';
      }

      fs.writeFileSync(pEasy, `export default ${JSON.stringify(easyMod, null, 2)};\n`, 'utf8');
      fixedEasyCount++;
    }

    // 2. ADVANCED MODE REFACTOR
    if (fs.existsSync(pAdv)) {
      const advMod = (await import(pAdv)).default;
      let frames = Array.isArray(advMod.sentence_frames) ? advMod.sentence_frames : [];

      while (frames.length < targetSentences && frames.length > 0) {
        frames.push(JSON.parse(JSON.stringify(frames[frames.length % frames.length])));
      }
      if (frames.length > targetSentences) {
        frames = frames.slice(0, targetSentences);
      }

      advMod.sentence_frames = frames.map((f, idx) => fixAdvSentence(f.template, f.answers, idx));
      advMod.min_sentences = targetSentences;
      advMod.model_sentence = buildModelSentence(advMod.sentence_frames);

      if (advMod.hints?.vocabulary_bank) {
        advMod.hints.vocabulary_bank.scaffolding_stage = 'medium';
      }

      // ASSETS GUARD W16-W32
      if (i >= 16 && i <= 32) {
        if (advMod.story_prompts?.picture_mode) {
          advMod.story_prompts.picture_mode.image_url = `/images/week${pad}/story_writing_pic.jpg`;
        }
      }

      fs.writeFileSync(pAdv, `export default ${JSON.stringify(advMod, null, 2)};\n`, 'utf8');
      fixedAdvCount++;
    }
  }

  console.log(`✅ MASTER FIX COMPLETE: Updated ${fixedEasyCount} Easy mode files & ${fixedAdvCount} Advanced mode files.`);
}

masterFixWritingData().catch(console.error);
