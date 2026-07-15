// comprehensive_audit.mjs
// Audits all 30 weeks × 2 modes for structural and content issues across every station.
import { readFileSync, readdirSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const ROOT = process.cwd();
const ISSUES = [];
const WARN  = [];

function issue(week, mode, station, msg) {
  ISSUES.push(`[W${String(week).padStart(2,'0')} ${mode}] [${station}] ❌ ${msg}`);
}
function warn(week, mode, station, msg) {
  WARN.push(`[W${String(week).padStart(2,'0')} ${mode}] [${station}] ⚠️  ${msg}`);
}

async function loadModule(fpath) {
  try {
    const mod = await import(pathToFileURL(fpath).href + `?t=${Date.now()}`);
    return mod.default;
  } catch (e) {
    return null;
  }
}

// ─── TEXT HELPERS ─────────────────────────────────────────────────────────────
function stripMd(txt) {
  if (!txt) return '';
  return txt.replace(/\*\*/g, '').replace(/\*/g, '').toLowerCase();
}
// YES/NO answer — always considered acceptable (can't be in content)
function isYesNo(ans) {
  return /^(yes|no|yes[,.]?.*|no[,.]?.*)$/i.test(String(ans).trim());
}
// Word-overlap check (60%+ key words, same as academic mode)
function wordOverlap(input, target) {
  const normalize = s => s.toLowerCase()
    .replace(/[\u2018\u2019\u201C\u201D]/g, '') // curly quotes
    .replace(/[.,!?;:"'()\-]/g, '')             // ASCII punctuation
    .replace(/\s+/g, ' ').trim();
  const tWords = normalize(target).split(' ').filter(w => w.length > 2);
  const iWords = new Set(normalize(input).split(' ').filter(w => w.length > 2));
  if (tWords.length === 0) return true;
  const common = tWords.filter(w => iWords.has(w));
  return common.length / tWords.length >= 0.6;
}
function anyAnswerInText(answers, text) {
  // Skip yes/no answers
  if (answers.every(a => isYesNo(a))) return true;
  const t = stripMd(text);
  return answers.some(a => {
    const aStr = stripMd(String(a));
    // Exact substring
    if (t.includes(aStr)) return true;
    // 60%+ word overlap (strip markdown from content for comparison)
    return wordOverlap(t, aStr);
  });
}

// ─── STATION CHECKERS ─────────────────────────────────────────────────────────

function checkGrammar(data, week, mode) {
  const s = 'grammar';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }

  // Must have grammar_explanation
  if (!data.grammar_explanation) {
    issue(week, mode, s, 'Missing grammar_explanation block');
  } else {
    const ge = data.grammar_explanation;
    if (!ge.title_en) issue(week, mode, s, 'grammar_explanation missing title_en');
    if (!ge.title_vi) issue(week, mode, s, 'grammar_explanation missing title_vi');
    if (!ge.rules || ge.rules.length === 0) {
      issue(week, mode, s, 'grammar_explanation.rules is empty');
    } else {
      ge.rules.forEach((r, i) => {
        if (!r.rule_en) issue(week, mode, s, `rule[${i}] missing rule_en`);
        if (!r.rule_vi) warn(week, mode, s, `rule[${i}] missing rule_vi`);
        if (!r.icon)    warn(week, mode, s, `rule[${i}] missing icon`);
        if (!r.example_en && !r.example) warn(week, mode, s, `rule[${i}] missing example_en`);
      });
    }
  }

  // Must have exercises
  if (!data.exercises || data.exercises.length === 0) {
    issue(week, mode, s, 'exercises array is empty or missing');
  } else {
    if (data.exercises.length < 5) warn(week, mode, s, `Only ${data.exercises.length} exercises (expected ≥5)`);
    data.exercises.forEach((ex, i) => {
      if (!ex.question && ex.type !== 'unscramble') issue(week, mode, s, `exercise[${i}] missing question`);
      const effectiveAnswer = ex.answer || ex.correct || '';
      if (!effectiveAnswer) issue(week, mode, s, `exercise[${i}] missing answer`);
      if (ex.type === 'mc' && (!ex.options || ex.options.length < 2)) {
        issue(week, mode, s, `exercise[${i}] mc type missing options`);
      }
      // Only flag unscramble missing words if question string doesn't have bracket format
      if (ex.type === 'unscramble' && (!ex.words || ex.words.length < 2)) {
        const hasBracketWords = /\[.*\/.*\]/.test(ex.question || '');
        if (!hasBracketWords) issue(week, mode, s, `exercise[${i}] unscramble missing words`);
      }
    });
  }
}

function checkRead(data, week, mode) {
  const s = 'read';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  if (!data.content_en || data.content_en.length < 50) issue(week, mode, s, 'content_en is missing or too short');
  if (!data.comprehension_questions || data.comprehension_questions.length === 0) {
    issue(week, mode, s, 'comprehension_questions is empty');
  } else {
    if (data.comprehension_questions.length < 2) warn(week, mode, s, 'Only 1 comprehension question');
    data.comprehension_questions.forEach((q, i) => {
      if (!q.question_en) issue(week, mode, s, `q[${i}] missing question_en`);
      if (!q.answer || (Array.isArray(q.answer) && q.answer.length === 0)) {
        issue(week, mode, s, `q[${i}] missing answer`);
      } else {
        const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
        if (!anyAnswerInText(ans, data.content_en)) {
          issue(week, mode, s, `q[${i}] answer [${ans[0]}] NOT FOUND in content_en`);
        }
      }
    });
  }
}

function checkExplore(data, week, mode) {
  const s = 'explore';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  if (!data.content_en || data.content_en.length < 50) issue(week, mode, s, 'content_en is missing or too short');
  if (!data.check_questions || data.check_questions.length === 0) {
    issue(week, mode, s, 'check_questions is empty');
  } else {
    data.check_questions.forEach((q, i) => {
      if (!q.question_en) issue(week, mode, s, `q[${i}] missing question_en`);
      if (!q.answer || (Array.isArray(q.answer) && q.answer.length === 0)) {
        // Also accept answer_en and correct_answer (MCQ style)
        if (!q.answer_en && !q.correct_answer) issue(week, mode, s, `q[${i}] missing answer`);
      } else {
        const ans = Array.isArray(q.answer) ? q.answer : [q.answer];
        if (!anyAnswerInText(ans, data.content_en)) {
          issue(week, mode, s, `q[${i}] answer [${ans[0]}] NOT FOUND in content_en`);
        }
      }
    });
  }
  if (!data.question) warn(week, mode, s, 'missing open question block');
}

function checkVocab(data, week, mode) {
  const s = 'vocab';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const arr = data.vocab || data;
  if (!Array.isArray(arr) || arr.length === 0) { issue(week, mode, s, 'vocab array empty'); return; }
  if (arr.length < 5) warn(week, mode, s, `Only ${arr.length} vocab words`);
  arr.forEach((v, i) => {
    if (!v.word)          issue(week, mode, s, `vocab[${i}] missing word`);
    if (!v.definition_en) warn(week, mode, s, `vocab[${i}] missing definition_en`);
    if (!v.definition_vi) warn(week, mode, s, `vocab[${i}] missing definition_vi`);
  });
}

function checkShadowing(data, week, mode) {
  const s = 'shadowing';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  // Script can be in 'script' or 'sentences' key (engine handles both)
  const script = data.script || data.sentences || [];
  if (!script || script.length === 0) {
    issue(week, mode, s, 'script array is empty');
  } else {
    if (data.script && data.script.length < 5) warn(week, mode, s, `Only ${data.script.length} shadowing lines`);
    script.forEach((line, i) => {
      if (!line.text && !line.text_en) issue(week, mode, s, `script[${i}] missing text`);
      if (!line.vi)   warn(week, mode, s, `script[${i}] missing vi translation`);
    });
  }
}

function checkDictation(data, week, mode) {
  const s = 'dictation';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  if (!data.sentences || data.sentences.length === 0) {
    issue(week, mode, s, 'sentences array is empty');
  } else {
    if (data.sentences.length < 5) warn(week, mode, s, `Only ${data.sentences.length} dictation sentences`);
    data.sentences.forEach((sen, i) => {
      if (!sen.text && !sen.text_en) issue(week, mode, s, `sentences[${i}] missing text`);
    });
  }
}

function checkAskAI(data, week, mode) {
  const s = 'ask_ai';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  // topic_talk_prompt is optional but good to have
  if (!data.topic_talk_prompt) warn(week, mode, s, 'missing topic_talk_prompt');
  if (!data.prompts || data.prompts.length === 0) {
    issue(week, mode, s, 'prompts array is empty');
  } else {
    if (data.prompts.length < 3) warn(week, mode, s, `Only ${data.prompts.length} prompts`);
    data.prompts.forEach((p, i) => {
      if (!p.nova_says) issue(week, mode, s, `prompt[${i}] missing nova_says`);
      if (!p.task_en)   issue(week, mode, s, `prompt[${i}] missing task_en`);
      if (!p.answer || (Array.isArray(p.answer) && p.answer.length === 0)) {
        issue(week, mode, s, `prompt[${i}] missing answer`);
      }
    });
  }
}

function checkWordMatch(data, week, mode) {
  // WordMatch engine uses vocab from index.js, not pairs — skip pairs check
  if (!data) { warn(week, mode, 'word_match', 'File missing or failed to load'); }
  // Just verify file loads
}

function checkWordPower(data, week, mode) {
  const s = 'word_power';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  if (!data.words || data.words.length === 0) {
    issue(week, mode, s, 'words array is empty');
  } else {
    data.words.forEach((w, i) => {
      if (!w.word)        issue(week, mode, s, `words[${i}] missing word`);
      if (!w.example)     warn(week, mode, s, `words[${i}] missing example`);
    });
  }
}

function checkWriting(data, week, mode) {
  const s = 'writing';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  if (!data.prompt_en) issue(week, mode, s, 'missing prompt_en');
  if (!data.min_words) warn(week, mode, s, 'missing min_words');
}

function checkLogic(data, week, mode) {
  const s = 'logic';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  // logic.js has puzzles[], logic_science.js has questions[]
  const arr = data.puzzles || data.questions || [];
  if (arr.length === 0) {
    issue(week, mode, s, 'puzzles/questions array is empty');
  } else {
    arr.forEach((p, i) => {
      if (!p.question_en && !p.question) issue(week, mode, s, `item[${i}] missing question`);
      if (!p.answer && !p.sample_answer) warn(week, mode, s, `item[${i}] missing answer/sample_answer`);
    });
  }
}

function checkSingaporeMath(data, week, mode) {
  const s = 'singapore_math';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const arr = data.problems || [];
  if (arr.length === 0) {
    issue(week, mode, s, 'problems array is empty');
  } else {
    arr.forEach((p, i) => {
      if (!p.question_en && !p.question) issue(week, mode, s, `problem[${i}] missing question`);
      if (!p.answer && p.answer !== 0)   warn(week, mode, s, `problem[${i}] missing answer`);
    });
  }
}

function checkMindmap(data, week, mode) {
  const s = 'mindmap';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  // Can be a named export or default
  const content = data.mindMapContent || data.content || data;
  if (!content.centerStems && !content.center) {
    warn(week, mode, s, 'no centerStems or center found');
  }
}

function checkEasyQuiz(data, week, mode) {
  const s = 'quiz (easy)';
  if (!data) { issue(week, mode, s, 'File missing or failed to load'); return; }
  const arr = data.quiz || [];
  if (arr.length === 0) { issue(week, mode, s, 'quiz array is empty'); return; }
  arr.forEach((q, i) => {
    if (!q.question_en) issue(week, mode, s, `q[${i}] missing question_en`);
    if (!q.options_en || q.options_en.length < 2) issue(week, mode, s, `q[${i}] options_en has <2 items`);
    if (typeof q.correct_index !== 'number') {
      issue(week, mode, s, `q[${i}] missing correct_index`);
    } else if (q.options_en && q.correct_index >= q.options_en.length) {
      issue(week, mode, s, `q[${i}] correct_index=${q.correct_index} out of range (options_en.length=${q.options_en.length})`);
    }
    if (!q.explanation_en) warn(week, mode, s, `q[${i}] missing explanation_en`);
  });
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
async function auditWeek(weekNum, isEasy) {
  const mode = isEasy ? 'easy' : 'adv';
  const dir  = isEasy
    ? path.join(ROOT, `src/data/weeks_easy/week_${String(weekNum).padStart(2,'0')}`)
    : path.join(ROOT, `src/data/weeks/week_${String(weekNum).padStart(2,'0')}`);

  if (!existsSync(dir)) {
    issue(weekNum, mode, 'index', `Directory missing: ${dir}`);
    return;
  }

  const load = f => loadModule(path.join(dir, f));

  // Load all files
  const [grammar, read, explore, vocab, shadowing, dictation, askAi,
         wordMatch, wordPower, writing, logic, logicSci, math, mindmap] = await Promise.all([
    load('grammar.js'),
    load('read.js'),
    load('explore.js'),
    load('vocab.js'),
    load('shadowing.js'),
    load('dictation.js'),
    load('ask_ai.js'),
    load('word_match.js'),
    load('word_power.js') || load('wordpower.js'),
    load('writing.js'),
    load('logic.js'),
    load('logic_science.js'),
    load('singapore_math.js'),
    load('mindmap.js'),
  ]);

  checkGrammar(grammar, weekNum, mode);
  checkRead(read, weekNum, mode);
  checkExplore(explore, weekNum, mode);
  checkVocab(vocab, weekNum, mode);
  checkShadowing(shadowing, weekNum, mode);
  checkDictation(dictation, weekNum, mode);
  checkAskAI(askAi, weekNum, mode);
  checkWordMatch(wordMatch, weekNum, mode);
  if (wordPower) checkWordPower(wordPower, weekNum, mode);
  if (writing)   checkWriting(writing, weekNum, mode);
  if (logic)     checkLogic(logic, weekNum, mode);
  if (logicSci)  checkLogic(logicSci, weekNum, mode);
  if (math)      checkSingaporeMath(math, weekNum, mode);
  if (mindmap)   checkMindmap(mindmap, weekNum, mode);

  // Easy mode has quiz.js
  if (isEasy) {
    const quiz = await load('quiz.js');
    if (quiz) checkEasyQuiz(quiz, weekNum, mode);
  }
}

async function main() {
  console.log('🔍 Starting comprehensive audit — 30 weeks × 2 modes...\n');

  for (let w = 1; w <= 30; w++) {
    process.stdout.write(`  Auditing W${String(w).padStart(2,'0')}...`);
    await auditWeek(w, false); // advanced
    await auditWeek(w, true);  // easy
    process.stdout.write(' ✓\n');
  }

  console.log('\n' + '═'.repeat(70));
  console.log(`ISSUES (must fix): ${ISSUES.length}`);
  console.log('═'.repeat(70));
  if (ISSUES.length === 0) {
    console.log('  🎉 No critical issues found!');
  } else {
    ISSUES.forEach(i => console.log(i));
  }

  console.log('\n' + '─'.repeat(70));
  console.log(`WARNINGS (nice to have): ${WARN.length}`);
  console.log('─'.repeat(70));
  if (WARN.length === 0) {
    console.log('  ✅ No warnings!');
  } else {
    WARN.forEach(w => console.log(w));
  }

  console.log('\nDone.');
}

main();
