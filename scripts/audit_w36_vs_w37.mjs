import fs from 'fs';
import path from 'path';

async function auditWeek(wNum) {
  const pad = String(wNum).padStart(2, '0');

  // Dynamic imports
  const advRead = (await import(`../src/data/weeks/week_${pad}/read.js`)).default;
  const advExplore = (await import(`../src/data/weeks/week_${pad}/explore.js`)).default;
  const advVocab = (await import(`../src/data/weeks/week_${pad}/vocab.js`)).default;
  const advGrammar = (await import(`../src/data/weeks/week_${pad}/grammar.js`)).default;
  const advWordPower = (await import(`../src/data/weeks/week_${pad}/word_power.js`)).default;
  const advWordMatch = (await import(`../src/data/weeks/week_${pad}/word_match.js`)).default;
  const advDictation = (await import(`../src/data/weeks/week_${pad}/dictation.js`)).default;
  const advShadowing = (await import(`../src/data/weeks/week_${pad}/shadowing.js`)).default;
  const advMindmap = (await import(`../src/data/weeks/week_${pad}/mindmap.js`)).default;
  const advWriting = (await import(`../src/data/weeks/week_${pad}/writing.js`)).default;
  const advLogic = (await import(`../src/data/weeks/week_${pad}/logic_science.js`)).default;
  const advMath = (await import(`../src/data/weeks/week_${pad}/singapore_math.js`)).default;
  const advSocial = (await import(`../src/data/weeks/week_${pad}/social_quiz.js`)).default;
  const advAskAI = (await import(`../src/data/weeks/week_${pad}/ask_ai.js`)).default;
  const advDailyWatch = (await import(`../src/data/weeks/week_${pad}/daily_watch.js`)).default;

  let advReal;
  try {
    advReal = (await import(`../src/data/weeks/week_${pad}/week_${pad}_real.js`)).default;
  } catch {
    advReal = {};
  }

  const easyRead = (await import(`../src/data/weeks_easy/week_${pad}/read.js`)).default;
  const easyExplore = (await import(`../src/data/weeks_easy/week_${pad}/explore.js`)).default;
  const easyVocab = (await import(`../src/data/weeks_easy/week_${pad}/vocab.js`)).default;
  const easyGrammar = (await import(`../src/data/weeks_easy/week_${pad}/grammar.js`)).default;
  const easyWordPower = (await import(`../src/data/weeks_easy/week_${pad}/word_power.js`)).default;
  const easyWordMatch = (await import(`../src/data/weeks_easy/week_${pad}/word_match.js`)).default;
  const easyDictation = (await import(`../src/data/weeks_easy/week_${pad}/dictation.js`)).default;
  const easyShadowing = (await import(`../src/data/weeks_easy/week_${pad}/shadowing.js`)).default;
  const easyMindmap = (await import(`../src/data/weeks_easy/week_${pad}/mindmap.js`)).default;
  const easyWriting = (await import(`../src/data/weeks_easy/week_${pad}/writing.js`)).default;
  const easyLogic = (await import(`../src/data/weeks_easy/week_${pad}/logic_science.js`)).default;
  const easyMath = (await import(`../src/data/weeks_easy/week_${pad}/singapore_math.js`)).default;
  const easySocial = (await import(`../src/data/weeks_easy/week_${pad}/social_quiz.js`)).default;
  const easyAskAI = (await import(`../src/data/weeks_easy/week_${pad}/ask_ai.js`)).default;
  const easyDailyWatch = (await import(`../src/data/weeks_easy/week_${pad}/daily_watch.js`)).default;

  let easyReal;
  try {
    easyReal = (await import(`../src/data/weeks_easy/week_${pad}/week_${pad}_easy_real.js`)).default;
  } catch {
    easyReal = {};
  }

  const countWords = (str) => (str ? str.replace(/\*\*/g, '').trim().split(/\s+/).length : 0);
  const countBolds = (str) => (str ? (str.match(/\*\*.*?\*\*/g) || []).length : 0);
  const countTotalBranches = (mmData) => {
    if (!mmData || !mmData.branchLabels) return 0;
    return Object.values(mmData.branchLabels).reduce((acc, list) => acc + (list ? list.length : 0), 0);
  };

  return {
    ADV: {
      read_stem_words: countWords(advRead.read_stem?.content_en),
      read_stem_bolds: countBolds(advRead.read_stem?.content_en),
      read_social_words: countWords(advRead.read_social?.content_en),
      read_social_bolds: countBolds(advRead.read_social?.content_en),
      read_comprehension_q: advRead.read_stem?.comprehension_questions?.length || 0,
      explore_words: countWords(advExplore.content_en),
      explore_bolds: countBolds(advExplore.content_en),
      explore_check_qs: advExplore.check_questions?.length || 0,
      vocab_count: advVocab.vocab?.length || 0,
      grammar_ex_count: advGrammar.exercises?.length || 0,
      word_power_count: advWordPower.words?.length || 0,
      word_match_pairs: advWordMatch.pairs?.length || 0,
      dictation_sentences: advDictation.sentences?.length || 0,
      shadowing_script: advShadowing.script?.length || 0,
      mindmap_stems: advMindmap.centerStems?.length || 0,
      mindmap_total_branches: countTotalBranches(advMindmap),
      writing_min_words: advWriting.min_words || 0,
      writing_has_picture_story: advWriting.story_prompts?.picture_mode ? 'YES' : 'NO',
      logic_questions: advLogic.questions?.length || 0,
      math_problems: advMath.problems?.length || 0,
      social_questions: advSocial.questions?.length || 0,
      ask_ai_prompts: advAskAI.prompts?.length || 0,
      daily_watch_videos: advDailyWatch.videos?.length || 0,
      ai_tutor_vocab: advReal.target_vocab?.length || 0,
      ai_tutor_missions: advReal.missions?.length || 0
    },
    EASY: {
      read_stem_words: countWords(easyRead.read_stem?.content_en),
      read_stem_bolds: countBolds(easyRead.read_stem?.content_en),
      read_social_words: countWords(easyRead.read_social?.content_en),
      read_social_bolds: countBolds(easyRead.read_social?.content_en),
      read_comprehension_q: easyRead.read_stem?.comprehension_questions?.length || 0,
      explore_words: countWords(easyExplore.content_en),
      explore_bolds: countBolds(easyExplore.content_en),
      explore_check_qs: easyExplore.check_questions?.length || 0,
      vocab_count: easyVocab.vocab?.length || 0,
      grammar_ex_count: easyGrammar.exercises?.length || 0,
      word_power_count: easyWordPower.words?.length || 0,
      word_match_pairs: easyWordMatch.pairs?.length || 0,
      dictation_sentences: easyDictation.sentences?.length || 0,
      shadowing_script: easyShadowing.script?.length || 0,
      mindmap_stems: easyMindmap.centerStems?.length || 0,
      mindmap_total_branches: countTotalBranches(easyMindmap),
      writing_min_words: easyWriting.min_words || 0,
      writing_has_picture_story: easyWriting.story_prompts?.picture_mode ? 'YES' : 'NO',
      logic_questions: easyLogic.questions?.length || 0,
      math_problems: easyMath.problems?.length || 0,
      social_questions: easySocial.questions?.length || 0,
      ask_ai_prompts: easyAskAI.prompts?.length || 0,
      daily_watch_videos: easyDailyWatch.videos?.length || 0,
      ai_tutor_vocab: easyReal.target_vocab?.length || 0,
      ai_tutor_missions: easyReal.missions?.length || 0
    }
  };
}

async function main() {
  const w36 = await auditWeek(36);
  const w37 = await auditWeek(37);

  console.log('=== ADVANCED AUDIT REPORT: WEEK 36 vs WEEK 37 ===\n');

  console.log('--- ADVANCED MODE ---');
  console.table(Object.keys(w36.ADV).reduce((acc, key) => {
    acc[key] = {
      'Week 36 (Golden)': w36.ADV[key],
      'Week 37 (Current)': w37.ADV[key],
      'Status': w36.ADV[key] === w37.ADV[key] ? '✅ MATCH' : `⚠️ DIFF (W36: ${w36.ADV[key]} vs W37: ${w37.ADV[key]})`
    };
    return acc;
  }, {}));

  console.log('\n--- EASY MODE ---');
  console.table(Object.keys(w36.EASY).reduce((acc, key) => {
    acc[key] = {
      'Week 36 (Golden)': w36.EASY[key],
      'Week 37 (Current)': w37.EASY[key],
      'Status': w36.EASY[key] === w37.EASY[key] ? '✅ MATCH' : `⚠️ DIFF (W36: ${w36.EASY[key]} vs W37: ${w37.EASY[key]})`
    };
    return acc;
  }, {}));
}

main();
