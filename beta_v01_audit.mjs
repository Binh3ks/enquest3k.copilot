// beta_v01_audit.mjs
// Full student-experience audit: 30 weeks × 2 modes × all stations
// Simulates what a student encounters in every station, every week.
// Run: node beta_v01_audit.mjs

import { existsSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const ROOT = process.cwd();

// ─── RESULT COLLECTORS ────────────────────────────────────────────────────────
const ISSUES   = [];  // must-fix
const WARNINGS = [];  // nice-to-have
const INFO     = [];  // stats/observations

const stats = { weeks: 0, stations: 0, exercises: 0, answers_checked: 0 };

function tag(week, mode, station) {
  return `[W${String(week).padStart(2,'0')} ${mode}] [${station}]`;
}
function issue(week, mode, station, msg) {
  ISSUES.push(`${tag(week,mode,station)} ❌ ${msg}`);
}
function warn(week, mode, station, msg) {
  WARNINGS.push(`${tag(week,mode,station)} ⚠️  ${msg}`);
}

async function loadMod(fpath) {
  try {
    const url = pathToFileURL(fpath).href + `?t=${Date.now()}`;
    const mod = await import(url);
    return mod.default ?? mod;
  } catch (e) {
    return null;
  }
}

// ─── TEXT HELPERS ─────────────────────────────────────────────────────────────
function stripMd(txt) {
  return (txt || '').replace(/\*\*/g,'').replace(/\*/g,'').toLowerCase();
}
function countBold(txt) {
  return (txt || '').match(/\*\*[^*]+\*\*/g)?.length || 0;
}
function isYesNo(s) {
  return /^(yes|no)[.,!]?(\s|$)/i.test(String(s).trim());
}
function normalize(s) {
  return s.toLowerCase()
    .replace(/[\u2018\u2019\u201C\u201D]/g,'')
    .replace(/[.,!?;:"'()\-]/g,'')
    .replace(/\s+/g,' ').trim();
}
function wordOverlap(content, target) {
  const tWords = normalize(target).split(' ').filter(w => w.length > 2);
  const cWords = new Set(normalize(content).split(' ').filter(w => w.length > 2));
  if (!tWords.length) return true;
  const common = tWords.filter(w => cWords.has(w));
  return common.length / tWords.length >= 0.6;
}
function answerFoundInContent(answers, content) {
  if (!answers?.length) return false;
  if (answers.every(a => isYesNo(a))) return true;
  const ct = stripMd(content);
  return answers.some(a => {
    const as = stripMd(String(a));
    return ct.includes(as) || wordOverlap(ct, as);
  });
}
function hasCurlyQuotes(str) {
  return /[\u2018\u2019\u201C\u201D]/.test(str);
}
function hasSlashAnswer(str) {
  // "A / B" pattern (not inside URL)
  return /[a-zA-Z] \/ [a-zA-Z]/.test(str);
}

// ─── STATION CHECKERS ─────────────────────────────────────────────────────────

// VOCAB ────────────────────────────────────────────────────────────────────────
function checkVocab(data, week, mode) {
  const s = 'vocab'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const arr = Array.isArray(data) ? data : (data.vocab || []);
  if (!arr.length) { issue(week, mode, s, 'vocab array is empty'); return; }
  if (arr.length < 8)  issue(week, mode, s, `Only ${arr.length} words (expected 10)`);
  else if (arr.length < 10) warn(week, mode, s, `Only ${arr.length} words (expected 10)`);
  arr.forEach((v, i) => {
    if (!v.word)          issue(week, mode, s, `vocab[${i}] missing word`);
    if (!v.definition_en) warn(week, mode, s, `vocab[${i}] "${v.word}" missing definition_en`);
    if (!v.definition_vi) warn(week, mode, s, `vocab[${i}] "${v.word}" missing definition_vi`);
    if (!v.example)       warn(week, mode, s, `vocab[${i}] "${v.word}" missing example`);
    if (!v.collocation)   warn(week, mode, s, `vocab[${i}] "${v.word}" missing collocation`);
    if (!v.image_url)     warn(week, mode, s, `vocab[${i}] "${v.word}" missing image_url`);
    if (!v.audio_word)    warn(week, mode, s, `vocab[${i}] "${v.word}" missing audio_word`);
  });
  stats.exercises += arr.length;
}

// GRAMMAR ──────────────────────────────────────────────────────────────────────
function checkGrammar(data, week, mode) {
  const s = 'grammar'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }

  // grammar_explanation block
  const ge = data.grammar_explanation;
  if (!ge) {
    issue(week, mode, s, 'Missing grammar_explanation block');
  } else {
    if (!ge.title_en) issue(week, mode, s, 'grammar_explanation missing title_en');
    if (!ge.title_vi) warn(week, mode, s, 'grammar_explanation missing title_vi');
    if (!ge.rules?.length) issue(week, mode, s, 'grammar_explanation.rules is empty');
    else ge.rules.forEach((r, i) => {
      if (!r.rule_en)   issue(week, mode, s, `rule[${i}] missing rule_en`);
      if (!r.example_en && !r.example) warn(week, mode, s, `rule[${i}] missing example_en`);
    });
  }

  const ex = data.exercises || [];
  if (!ex.length) { issue(week, mode, s, 'exercises array is empty'); return; }
  if (ex.length < 10)  warn(week, mode, s, `Only ${ex.length} exercises (expected ~20)`);
  if (ex.length > 30)  warn(week, mode, s, `${ex.length} exercises seems excessive`);

  const usesCorrectField = ex.filter(e => e.correct !== undefined && e.answer === undefined);
  if (usesCorrectField.length > 0)
    issue(week, mode, s, `BUG-27: ${usesCorrectField.length} exercises use 'correct:' instead of 'answer:' → GrammarEngine won't validate`);

  ex.forEach((e, i) => {
    stats.exercises++;
    stats.answers_checked++;
    const effectiveAnswer = e.answer ?? e.correct ?? '';
    // BUG-30: empty answer
    if (effectiveAnswer === '' || effectiveAnswer === null || effectiveAnswer === undefined)
      issue(week, mode, s, `BUG-30: exercise[${i}] (id:${e.id}) has empty/missing answer`);
    // question required for non-unscramble
    if (!e.question && e.type !== 'unscramble')
      issue(week, mode, s, `exercise[${i}] (id:${e.id}) missing question`);
    // MC options
    if (e.type === 'mc' && (!e.options || e.options.length < 2))
      issue(week, mode, s, `exercise[${i}] mc type has < 2 options`);
    // Unscramble checks
    if (e.type === 'unscramble') {
      // BUG-29: missing question
      if (!e.question) issue(week, mode, s, `BUG-29: exercise[${i}] unscramble missing question`);
      // BUG-28: missing words array (unless bracket format in question)
      const hasBracket = /\[.*\/.*\]/.test(e.question || '');
      if (!e.words?.length && !hasBracket)
        issue(week, mode, s, `BUG-28: exercise[${i}] unscramble missing words[] array`);
      // Bracket-format warning
      if (hasBracket && !e.words?.length)
        warn(week, mode, s, `exercise[${i}] uses legacy bracket format — consider words[] array`);
    }
    // BUG-34: curly quotes in answer
    if (hasCurlyQuotes(String(effectiveAnswer)))
      issue(week, mode, s, `BUG-34: exercise[${i}] answer has curly quotes → use ASCII apostrophe`);
    // Check MC: answer must be one of the options
    if (e.type === 'mc' && e.options && effectiveAnswer) {
      if (!e.options.includes(effectiveAnswer))
        issue(week, mode, s, `exercise[${i}] mc answer "${effectiveAnswer}" not found in options: [${e.options.join('/')}]`);
    }
  });
}

// READ ─────────────────────────────────────────────────────────────────────────
function checkRead(data, week, mode) {
  const s = 'read'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }

  if (!data.content_en || data.content_en.length < 80)
    issue(week, mode, s, `content_en too short (${data.content_en?.length || 0} chars)`);

  const boldCount = countBold(data.content_en || '');
  if (boldCount < 5)    issue(week, mode, s, `Only ${boldCount} bold words in content_en (expected ≥8)`);
  else if (boldCount < 8) warn(week, mode, s, `Only ${boldCount} bold words (expected ≥8)`);

  const qs = data.comprehension_questions || [];
  if (!qs.length) { issue(week, mode, s, 'comprehension_questions is empty'); return; }
  if (qs.length < 2)  warn(week, mode, s, `Only ${qs.length} comprehension question(s)`);

  qs.forEach((q, i) => {
    stats.answers_checked++;
    if (!q.question_en) issue(week, mode, s, `q[${i}] missing question_en`);
    const ans = Array.isArray(q.answer) ? q.answer : (q.answer ? [q.answer] : []);
    if (!ans.length) {
      issue(week, mode, s, `q[${i}] missing answer`);
    } else {
      // BUG-32: slash-string answer
      ans.forEach(a => {
        if (hasSlashAnswer(String(a)))
          issue(week, mode, s, `BUG-32: q[${i}] answer "${a}" uses slash-string — convert to array`);
        if (hasCurlyQuotes(String(a)))
          issue(week, mode, s, `BUG-34: q[${i}] answer has curly quotes`);
      });
      if (!answerFoundInContent(ans, data.content_en))
        issue(week, mode, s, `q[${i}] answer ["${ans[0]}"] not found in content_en`);
    }
  });
}

// EXPLORE ──────────────────────────────────────────────────────────────────────
function checkExplore(data, week, mode) {
  const s = 'explore'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }

  if (!data.content_en || data.content_en.length < 80)
    issue(week, mode, s, `content_en too short (${data.content_en?.length || 0} chars)`);

  const boldCount = countBold(data.content_en || '');
  if (boldCount < 5)    issue(week, mode, s, `Only ${boldCount} bold words in content_en (expected ≥8)`);
  else if (boldCount < 8) warn(week, mode, s, `Only ${boldCount} bold words (expected ≥8)`);

  if (!data.question)   warn(week, mode, s, 'missing open-ended question block');

  const qs = data.check_questions || [];
  if (!qs.length) { issue(week, mode, s, 'check_questions is empty'); return; }

  qs.forEach((q, i) => {
    stats.answers_checked++;
    if (!q.question_en) issue(week, mode, s, `q[${i}] missing question_en`);
    const ans = Array.isArray(q.answer) ? q.answer : (q.answer ? [q.answer] : []);
    // BUG-31: missing answer array (also accept answer_en / correct_answer)
    if (!ans.length && !q.answer_en && !q.correct_answer) {
      issue(week, mode, s, `BUG-31: q[${i}] missing answer array (and no answer_en/correct_answer)`);
    } else if (ans.length) {
      ans.forEach(a => {
        if (hasSlashAnswer(String(a)))
          issue(week, mode, s, `BUG-32: q[${i}] answer uses slash-string — convert to array`);
        if (hasCurlyQuotes(String(a)))
          issue(week, mode, s, `BUG-34: q[${i}] answer has curly quotes`);
      });
      if (!answerFoundInContent(ans, data.content_en))
        issue(week, mode, s, `q[${i}] answer ["${ans[0]}"] not found in content_en`);
    }
  });
}

// DICTATION ────────────────────────────────────────────────────────────────────
function checkDictation(data, week, mode) {
  const s = 'dictation'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const sents = data.sentences || [];
  if (!sents.length) { issue(week, mode, s, 'sentences array is empty'); return; }
  if (sents.length < 6)  warn(week, mode, s, `Only ${sents.length} sentences (expected 8-12)`);
  sents.forEach((s2, i) => {
    if (!s2.text && !s2.text_en) issue(week, mode, s, `sentences[${i}] missing text`);
    if (!s2.meaning && !s2.text_vi && !s2.vi) warn(week, mode, s, `sentences[${i}] missing Vietnamese translation`);
  });
  stats.exercises += sents.length;
}

// SHADOWING ────────────────────────────────────────────────────────────────────
function checkShadowing(data, week, mode) {
  const s = 'shadowing'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const sents = data.script || data.sentences || [];
  if (!sents.length) { issue(week, mode, s, 'script/sentences array is empty'); return; }
  if (sents.length < 6) warn(week, mode, s, `Only ${sents.length} lines (expected 8-12)`);
  sents.forEach((s2, i) => {
    if (!s2.text && !s2.text_en) issue(week, mode, s, `script[${i}] missing text`);
  });
  stats.exercises += sents.length;
}

// ASK AI ───────────────────────────────────────────────────────────────────────
function checkAskAI(data, week, mode) {
  const s = 'ask_ai'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }

  // topic_talk_prompt should NOT appear in W16+ (removed)
  if (week >= 16 && data.topic_talk_prompt)
    warn(week, mode, s, 'has topic_talk_prompt — this field was REMOVED from Ask AI in W16+');

  // Invalid fields
  ['prompt_en','prompt_vi','hint_en'].forEach(f => {
    if (data[f]) issue(week, mode, s, `invalid field "${f}" present — remove it`);
  });

  const prompts = data.prompts || [];
  if (!prompts.length) { issue(week, mode, s, 'prompts array is empty'); return; }
  if (prompts.length < 4) warn(week, mode, s, `Only ${prompts.length} prompts (expected 5-8)`);
  if (prompts.length > 10) warn(week, mode, s, `${prompts.length} prompts seems excessive`);

  prompts.forEach((p, i) => {
    stats.answers_checked++;
    if (!p.nova_says)   issue(week, mode, s, `prompt[${i}] missing nova_says`);
    if (!p.task_en)     issue(week, mode, s, `prompt[${i}] missing task_en`);
    const ans = Array.isArray(p.answer) ? p.answer : (p.answer ? [p.answer] : []);
    if (!ans.length)    issue(week, mode, s, `prompt[${i}] missing answer`);
    if (!p.question_frame && !p.hint) warn(week, mode, s, `prompt[${i}] missing question_frame`);
  });
}

// WORD POWER ───────────────────────────────────────────────────────────────────
function checkWordPower(data, week, mode) {
  const s = 'word_power'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const words = data.words || [];
  if (!words.length) { issue(week, mode, s, 'words array is empty'); return; }
  if (words.length < 2) warn(week, mode, s, `Only ${words.length} word-power entries`);
  if (words.length > 10) warn(week, mode, s, `${words.length} entries — W16+ max is 7`);
  words.forEach((w, i) => {
    if (!w.word)          issue(week, mode, s, `words[${i}] missing word`);
    if (w.word && !w.word.includes(' '))
      issue(week, mode, s, `words[${i}] "${w.word}" is single word — W16+ requires multi-word collocation`);
    if (!w.definition_en) warn(week, mode, s, `words[${i}] "${w.word}" missing definition_en`);
    if (!w.example)       warn(week, mode, s, `words[${i}] "${w.word}" missing example`);
    if (!w.image_url)     warn(week, mode, s, `words[${i}] "${w.word}" missing image_url`);
  });
  stats.exercises += words.length;
}

// WRITING ──────────────────────────────────────────────────────────────────────
function checkWriting(data, week, mode) {
  const s = 'writing'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  if (!data.prompt_en)      issue(week, mode, s, 'missing prompt_en');
  if (!data.prompt_vi)      warn(week, mode, s, 'missing prompt_vi');
  if (!data.min_words)      warn(week, mode, s, 'missing min_words');
  if (!data.model_sentence) warn(week, mode, s, 'missing model_sentence');
  const frames = data.sentence_frames || [];
  if (!frames.length)       issue(week, mode, s, 'sentence_frames array is empty — students have no scaffolding');
  else if (frames.length < 3) warn(week, mode, s, `Only ${frames.length} sentence_frames (expected ≥4)`);
  else {
    // Check frames have template
    frames.forEach((f, i) => {
      if (!f.template && !f.text && !f.frame)
        issue(week, mode, s, `sentence_frames[${i}] missing template/text/frame field`);
    });
  }
}

// LOGIC / LOGIC SCIENCE ────────────────────────────────────────────────────────
function checkLogic(data, week, mode, filename) {
  const s = filename || 'logic'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const arr = data.questions || data.puzzles || [];
  if (!arr.length) { issue(week, mode, s, 'questions/puzzles array is empty'); return; }
  if (arr.length < 2) warn(week, mode, s, `Only ${arr.length} questions`);
  arr.forEach((q, i) => {
    stats.exercises++;
    stats.answers_checked++;
    const qText = q.question_en || q.question || '';
    if (!qText) issue(week, mode, s, `item[${i}] missing question_en`);
    // MCQ format (logic_science / singapore_math questions)
    if (q.options_en || q.options) {
      const opts = q.options_en || q.options || [];
      if (opts.length < 2) issue(week, mode, s, `item[${i}] MCQ has < 2 options`);
      if (q.correct_answer !== undefined) {
        const ca = String(q.correct_answer).toUpperCase();
        if (!/^[A-D]$/.test(ca))
          issue(week, mode, s, `item[${i}] correct_answer "${q.correct_answer}" must be A/B/C/D`);
        const idx = ca.charCodeAt(0) - 65; // A=0, B=1...
        if (opts.length && idx >= opts.length)
          issue(week, mode, s, `item[${i}] correct_answer "${ca}" out of range (only ${opts.length} options)`);
      } else if (!q.answer && q.sample_answer === undefined) {
        warn(week, mode, s, `item[${i}] no correct_answer/answer field`);
      }
    } else {
      // Open-ended or fill-in logic puzzle
      if (!q.answer && !q.sample_answer && !q.explanation_en)
        warn(week, mode, s, `item[${i}] no answer or explanation`);
    }
  });
}

// SINGAPORE MATH ───────────────────────────────────────────────────────────────
function checkSingaporeMath(data, week, mode) {
  const s = 'singapore_math'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const arr = data.problems || data.questions || [];
  if (!arr.length) { issue(week, mode, s, 'problems/questions array is empty'); return; }
  if (arr.length < 3) warn(week, mode, s, `Only ${arr.length} problems (expected ≥3)`);
  arr.forEach((p, i) => {
    stats.exercises++;
    stats.answers_checked++;
    if (!p.question_en && !p.question) issue(week, mode, s, `problem[${i}] missing question`);
    const ans = p.answer ?? p.correct_answer;
    if (ans === undefined || ans === null || ans === '')
      issue(week, mode, s, `problem[${i}] missing answer`);
    // Barmodel check
    if (!p.barmodel_url && !p.image_url)
      warn(week, mode, s, `problem[${i}] missing barmodel_url/image_url`);
  });
}

// MINDMAP ──────────────────────────────────────────────────────────────────────
function checkMindmap(data, week, mode) {
  const s = 'mindmap'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const content = data.mindMapContent || data.content || data;
  const stems = content.centerStems || content.stems || [];
  if (!stems.length) issue(week, mode, s, 'centerStems / stems array is empty');
  const branches = content.branchLabels || content.branches || {};
  if (!Object.keys(branches).length) issue(week, mode, s, 'branchLabels / branches is empty');
  else {
    stems.forEach((stem, i) => {
      const b = branches[stem];
      if (!b || !b.length) warn(week, mode, s, `stem[${i}] "${String(stem).substring(0,30)}..." has no branches`);
    });
  }
}

// DAILY WATCH ──────────────────────────────────────────────────────────────────
function checkDailyWatch(data, week, mode) {
  const s = 'daily_watch'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const videos = data.videos || [];
  if (!videos.length) { issue(week, mode, s, 'videos array is empty'); return; }
  if (videos.length < 5) warn(week, mode, s, `Only ${videos.length} videos (expected 5)`);
  const seen = new Set();
  videos.forEach((v, i) => {
    if (!v.videoId && !v.youtube_id) {
      issue(week, mode, s, `video[${i}] missing videoId`);
    } else {
      const vid = v.videoId || v.youtube_id;
      if (!vid || vid.length < 5) issue(week, mode, s, `video[${i}] videoId "${vid}" looks invalid`);
      if (seen.has(vid))           issue(week, mode, s, `video[${i}] duplicate videoId "${vid}"`);
      seen.add(vid);
    }
    if (!v.title) warn(week, mode, s, `video[${i}] missing title`);
  });
}

// GAMES ────────────────────────────────────────────────────────────────────────
function checkGames(data, week, mode) {
  const s = 'games'; stats.stations++;
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  // Games can be default export or named exports
  const d = data.default || data;
  const vocab = d.vocabulary || d.vocab;
  if (!vocab || !vocab.length)
    warn(week, mode, s, 'vocabulary list is empty — game engine needs word list');
}

// AI TUTOR ─────────────────────────────────────────────────────────────────────
function checkAITutor(data, week) {
  const s = 'ai_tutor';
  if (!data) { issue(week, 'adv', s, 'week_NN_real.js missing or failed to load'); return; }
  // Two formats: named export (week1RealData) or default
  const d = data.default || Object.values(data).find(v => typeof v === 'object' && v.week_id) || data;

  // Check missions array
  const missions = d.missions || d.storyMissions || d.story_missions || [];
  if (!missions.length)
    issue(week, 'adv', s, 'No missions array — AI Tutor has no story missions');
  else {
    if (missions.length < 3) warn(week, 'adv', s, `Only ${missions.length} missions (expected 3)`);
    missions.forEach((m, i) => {
      if (!m.title && !m.mission_title) warn(week, 'adv', s, `mission[${i}] missing title`);
      const objectives = m.objectives || m.learning_objectives || [];
      if (!objectives.length) warn(week, 'adv', s, `mission[${i}] has no objectives`);
    });
  }

  // Check week_id matches
  if (d.week_id !== undefined && d.week_id !== week)
    issue(week, 'adv', s, `week_id mismatch: file says ${d.week_id}, expected ${week}`);

  // Check freetalk knowledge
  if (!d.freetalk_knowledge && !d.knowledge_base && !d.nova_instructions && !d.vocabulary)
    warn(week, 'adv', s, 'missing freetalk_knowledge / nova_instructions');
}

// WORD MATCH ───────────────────────────────────────────────────────────────────
function checkWordMatch(data, week, mode) {
  const s = 'word_match'; stats.stations++;
  if (!data) { warn(week, mode, s, 'File missing or failed to load'); }
  // WordMatch engine uses vocab from index.js — just verify file loads OK
}

// ─── WEEK RUNNER ─────────────────────────────────────────────────────────────
async function auditWeek(week, isEasy) {
  const mode = isEasy ? 'easy' : 'adv';
  const pad  = String(week).padStart(2,'0');
  const dir  = isEasy
    ? path.join(ROOT, `src/data/weeks_easy/week_${pad}`)
    : path.join(ROOT, `src/data/weeks/week_${pad}`);

  if (!existsSync(dir)) {
    issue(week, mode, 'index', `Directory missing: ${dir}`);
    return;
  }

  stats.weeks++;
  const load = f => loadMod(path.join(dir, f));

  // Core stations (all weeks)
  const [vocab, grammar, read, explore, dictation, shadowing,
         askAi, wordMatch, wordPower, writing, mindmap, dailyWatch, games] = await Promise.all([
    load('vocab.js'),
    load('grammar.js'),
    load('read.js'),
    load('explore.js'),
    load('dictation.js'),
    load('shadowing.js'),
    load('ask_ai.js'),
    load('word_match.js'),
    load('word_power.js'),
    load('writing.js'),
    load('mindmap.js'),
    load('daily_watch.js'),
    load('games.js'),
  ]);

  checkVocab(vocab, week, mode);
  checkGrammar(grammar, week, mode);
  checkRead(read, week, mode);
  checkExplore(explore, week, mode);
  checkDictation(dictation, week, mode);
  checkShadowing(shadowing, week, mode);
  checkAskAI(askAi, week, mode);
  checkWordMatch(wordMatch, week, mode);
  if (wordPower) checkWordPower(wordPower, week, mode);
  else warn(week, mode, 'word_power', 'word_power.js not found');
  if (writing)   checkWriting(writing, week, mode);
  else issue(week, mode, 'writing', 'writing.js missing');
  if (mindmap)   checkMindmap(mindmap, week, mode);
  else issue(week, mode, 'mindmap', 'mindmap.js missing');
  if (dailyWatch) checkDailyWatch(dailyWatch, week, mode);
  else issue(week, mode, 'daily_watch', 'daily_watch.js missing');

  // Logic: W1-15 uses logic.js, W16+ uses logic_science.js
  if (week < 16) {
    const logic = await load('logic.js');
    if (logic) checkLogic(logic, week, mode, 'logic');
    else issue(week, mode, 'logic', 'logic.js missing');
  } else {
    const logicSci = await load('logic_science.js');
    if (logicSci) checkLogic(logicSci, week, mode, 'logic_science');
    else issue(week, mode, 'logic_science', 'logic_science.js missing');
    const math = await load('singapore_math.js');
    if (math) checkSingaporeMath(math, week, mode);
    else issue(week, mode, 'singapore_math', 'singapore_math.js missing');
    if (games) checkGames(games, week, mode);
    else issue(week, mode, 'games', 'games.js missing');
  }

  // AI Tutor — only check once per week (not per mode)
  if (!isEasy) {
    const tutorPath1 = path.join(ROOT, `src/data/weeks/week_${pad}/week_${pad}_real.js`);
    const tutorPath2 = path.join(ROOT, `src/data/weeks/week_${pad}_real.js`);
    let tutorData = null;
    if (existsSync(tutorPath1))      tutorData = await loadMod(tutorPath1);
    else if (existsSync(tutorPath2)) tutorData = await loadMod(tutorPath2);
    else issue(week, 'adv', 'ai_tutor', `week_${pad}_real.js not found (checked both locations)`);
    if (tutorData) checkAITutor(tutorData, week);
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const start = Date.now();
  console.log('🔍 EngQuest3K — Beta V0.1 Full Audit');
  console.log(`   30 weeks × 2 modes × all stations\n`);

  for (let w = 1; w <= 30; w++) {
    process.stdout.write(`  W${String(w).padStart(2,'0')}...`);
    await auditWeek(w, false); // advanced
    await auditWeek(w, true);  // easy
    process.stdout.write(' ✓\n');
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log('\n' + '═'.repeat(72));
  console.log(`🚨 CRITICAL ISSUES (must fix before Beta V0.1): ${ISSUES.length}`);
  console.log('═'.repeat(72));
  if (!ISSUES.length) {
    console.log('  🎉 Zero critical issues!');
  } else {
    // Group by week for readability
    const byWeek = {};
    ISSUES.forEach(i => {
      const m = i.match(/\[W(\d+)/);
      const wk = m ? m[1] : '??';
      if (!byWeek[wk]) byWeek[wk] = [];
      byWeek[wk].push(i);
    });
    Object.keys(byWeek).sort().forEach(wk => {
      console.log(`\n── Week ${wk} ──`);
      byWeek[wk].forEach(i => console.log('  ' + i));
    });
  }

  console.log('\n' + '─'.repeat(72));
  console.log(`⚠️  WARNINGS (recommended improvements): ${WARNINGS.length}`);
  console.log('─'.repeat(72));
  if (WARNINGS.length > 0) {
    // Only show first 60 warnings to avoid flooding
    const shown = WARNINGS.slice(0, 60);
    shown.forEach(w => console.log('  ' + w));
    if (WARNINGS.length > 60) console.log(`  ... and ${WARNINGS.length - 60} more warnings (run with --all-warnings to see all)`);
  } else {
    console.log('  ✅ No warnings!');
  }

  console.log('\n' + '─'.repeat(72));
  console.log('📊 AUDIT STATS');
  console.log('─'.repeat(72));
  console.log(`  Weeks audited: ${stats.weeks} (should be 60 = 30×2)`);
  console.log(`  Stations checked: ${stats.stations}`);
  console.log(`  Exercises scanned: ${stats.exercises}`);
  console.log(`  Answers verified: ${stats.answers_checked}`);
  console.log(`  Time: ${elapsed}s`);
  console.log('\nDone.');

  // Exit with error code if issues found
  if (ISSUES.length > 0) process.exit(1);
}

main();
