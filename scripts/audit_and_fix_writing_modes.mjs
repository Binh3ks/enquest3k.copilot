// Audit and Fix Writing Modes across Week 01 to Week 35+
// Usage: node scripts/audit_and_fix_writing_modes.mjs

import fs from 'fs';
import path from 'path';

const COMMON_TRANSITIONS = ['then', 'also', 'so', 'next', 'finally', 'slowly', 'happily', 'carefully', 'always', 'today', 'together', 'suddenly'];

function enforceEasyGaps(frames, targetSentences) {
  let list = Array.isArray(frames) ? [...frames] : [];
  
  // Pad or trim frames to targetSentences
  while (list.length < targetSentences && list.length > 0) {
    const clone = JSON.parse(JSON.stringify(list[list.length % list.length]));
    list.push(clone);
  }
  if (list.length > targetSentences) {
    list = list.slice(0, targetSentences);
  }
  
  // Process each sentence frame for EXACTLY 1 GAP
  return list.map((f) => {
    let t = typeof f === 'string' ? f : (f.template || '');
    let a = Array.isArray(f.answers) ? [...f.answers] : [];
    
    const parts = t.split('___');
    if (parts.length - 1 === 0) {
      t = t + ' ___';
      if (a.length === 0) a = ['word'];
    } else if (parts.length - 1 > 1) {
      let res = parts[0] + '___';
      for (let i = 1; i < parts.length - 1; i++) {
        const fill = a[i] || 'and';
        res += parts[i] + fill;
      }
      res += parts[parts.length - 1];
      t = res;
      a = [a[0] || 'word'];
    }
    
    return { template: t, answers: a };
  });
}

function enforceAdvGaps(frames, targetSentences) {
  let list = Array.isArray(frames) ? [...frames] : [];
  
  // Pad or trim frames to targetSentences
  while (list.length < targetSentences && list.length > 0) {
    const clone = JSON.parse(JSON.stringify(list[list.length % list.length]));
    list.push(clone);
  }
  if (list.length > targetSentences) {
    list = list.slice(0, targetSentences);
  }
  
  // Process each sentence frame for EXACTLY 2 GAPS
  return list.map((f, idx) => {
    let t = typeof f === 'string' ? f : (f.template || '');
    let a = Array.isArray(f.answers) ? [...f.answers] : [];
    
    const parts = t.split('___');
    const count = parts.length - 1;
    
    if (count === 1) {
      const trans = COMMON_TRANSITIONS[idx % COMMON_TRANSITIONS.length];
      if (t.endsWith('.')) {
        t = t.slice(0, -1) + ' ___ .';
      } else {
        t = t + ' ___';
      }
      a.push(trans);
    } else if (count > 2) {
      let res = parts[0] + '___' + parts[1] + '___';
      for (let i = 2; i < count; i++) {
        const fill = a[i] || 'well';
        res += parts[i] + fill;
      }
      res += parts[parts.length - 1];
      t = res;
      a = [a[0] || 'word1', a[1] || 'word2'];
    } else if (count === 0) {
      t = t + ' ___ ___';
      a = ['word1', 'word2'];
    }
    
    return { template: t, answers: a };
  });
}

async function auditAndFixWritingModes() {
  const root = process.cwd();
  console.log('🚀 AUDITING & REFACTORED WRITING MODES (W01–W35+)... \n');
  
  let easyFixed = 0;
  let advFixed = 0;

  for (let i = 1; i <= 35; i++) {
    const pad = String(i).padStart(2, '0');
    const targetSentences = i <= 15 ? 6 : (i <= 28 ? 8 : 10);
    
    const pAdv = path.join(root, 'src/data/weeks', `week_${pad}`, 'writing.js');
    const pEasy = path.join(root, 'src/data/weeks_easy', `week_${pad}`, 'writing.js');

    // 1. REFACTOR EASY MODE
    if (fs.existsSync(pEasy)) {
      const easyMod = (await import(pEasy)).default;
      easyMod.sentence_frames = enforceEasyGaps(easyMod.sentence_frames, targetSentences);
      easyMod.min_sentences = targetSentences;
      if (easyMod.hints?.vocabulary_bank) {
        easyMod.hints.vocabulary_bank.scaffolding_stage = 'high';
      }
      if (easyMod.story_prompts?.picture_mode?.sentence_frames) {
        easyMod.story_prompts.picture_mode.sentence_frames = enforceEasyGaps(
          easyMod.story_prompts.picture_mode.sentence_frames,
          targetSentences
        );
      }
      fs.writeFileSync(pEasy, `export default ${JSON.stringify(easyMod, null, 2)};\n`, 'utf8');
      easyFixed++;
    }

    // 2. REFACTOR ADVANCED MODE
    if (fs.existsSync(pAdv)) {
      const advMod = (await import(pAdv)).default;
      advMod.sentence_frames = enforceAdvGaps(advMod.sentence_frames, targetSentences);
      advMod.min_sentences = targetSentences;
      if (advMod.hints?.vocabulary_bank) {
        advMod.hints.vocabulary_bank.scaffolding_stage = 'medium';
      }
      if (advMod.story_prompts?.picture_mode?.sentence_frames) {
        advMod.story_prompts.picture_mode.sentence_frames = enforceAdvGaps(
          advMod.story_prompts.picture_mode.sentence_frames,
          targetSentences
        );
      }

      // ASSETS GUARD: Ensure W16-W32 image_url is strictly preserved
      if (i >= 16 && i <= 32) {
        if (advMod.story_prompts?.picture_mode) {
          advMod.story_prompts.picture_mode.image_url = `/images/week${pad}/story_writing_pic.jpg`;
        }
      }

      fs.writeFileSync(pAdv, `export default ${JSON.stringify(advMod, null, 2)};\n`, 'utf8');
      advFixed++;
    }
  }

  console.log(`✅ SUCCESS: Refactored ${easyFixed} Easy mode files & ${advFixed} Advanced mode files.`);
}

auditAndFixWritingModes().catch(console.error);
