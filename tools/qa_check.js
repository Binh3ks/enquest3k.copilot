#!/usr/bin/env node
/**
 * tools/qa_check.js — EngQuest3k Automated QA Script (Sprint S1.1)
 *
 * Usage:
 *   node tools/qa_check.js <weekNumber> [mode]
 *   mode = "advanced" | "easy" | "both"  (default: "both")
 *
 * Exits with code 0 if all checks pass, 1 if any fail.
 */

import { readFileSync, existsSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const WEEK_NUM = parseInt(process.argv[2], 10);
const MODE_ARG = (process.argv[3] || 'both').toLowerCase();

if (isNaN(WEEK_NUM) || WEEK_NUM < 1) {
  console.error('Usage: node tools/qa_check.js <weekNumber> [advanced|easy|both]');
  process.exit(1);
}

const MODES = MODE_ARG === 'both'
  ? ['advanced', 'easy']
  : MODE_ARG === 'advanced' || MODE_ARG === 'easy'
    ? [MODE_ARG]
    : null;

if (!MODES) {
  console.error('mode must be: advanced | easy | both');
  process.exit(1);
}

const weekStr = String(WEEK_NUM).padStart(2, '0');
const IS_W16_PLUS = WEEK_NUM >= 16;

let totalFails = 0;
const report = [];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function dataDir(mode) {
  return mode === 'advanced'
    ? path.join(ROOT, 'src', 'data', 'weeks', `week_${weekStr}`)
    : path.join(ROOT, 'src', 'data', 'weeks_easy', `week_${weekStr}`);
}

async function loadModule(filePath) {
  if (!existsSync(filePath)) return null;
  try {
    const mod = await import(pathToFileURL(filePath));
    return mod.default;
  } catch (e) {
    return { __error: e.message };
  }
}

function loadRaw(filePath) {
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, 'utf8');
}

function pass(tag, msg) {
  report.push(`  ✅ [${tag}] ${msg}`);
}

function fail(tag, msg) {
  report.push(`  ❌ [${tag}] ${msg}`);
  totalFails++;
}

function warn(tag, msg) {
  report.push(`  ⚠️  [${tag}] ${msg}`);
}

// ─────────────────────────────────────────────────────────────
// CHECK FUNCTIONS
// ─────────────────────────────────────────────────────────────

/** C1 — read.js: must use "comprehension_questions", NOT "check_questions" */
async function checkRead(dir, mode) {
  const file = path.join(dir, 'read.js');
  const raw = loadRaw(file);
  if (raw === null) { fail('C1', `[${mode}] read.js missing`); return; }

  if (!raw.includes('comprehension_questions')) {
    fail('C1', `[${mode}] read.js missing "comprehension_questions" field`);
  } else {
    pass('C1', `[${mode}] read.js has "comprehension_questions"`);
  }
  if (raw.includes('check_questions')) {
    fail('C1b', `[${mode}] read.js wrongly contains "check_questions"`);
  }
}

/** C2 — explore.js: must use "check_questions" + "question_en:" per item */
async function checkExplore(dir, mode) {
  const file = path.join(dir, 'explore.js');
  const raw = loadRaw(file);
  if (raw === null) { fail('C2', `[${mode}] explore.js missing`); return; }

  if (!raw.includes('check_questions')) {
    fail('C2a', `[${mode}] explore.js missing "check_questions" field`);
  } else {
    pass('C2a', `[${mode}] explore.js has "check_questions"`);
  }

  if (raw.includes('comprehension_questions')) {
    fail('C2b', `[${mode}] explore.js wrongly contains "comprehension_questions"`);
  }

  // Each item in check_questions must use "question_en:" not "question:"
  // (allow "question:" only as key in the open-ended object outside the array)
  // Strategy: look for patterns inside the check_questions array context
  const cqMatch = raw.match(/check_questions\s*:\s*\[([\s\S]*?)\]\s*,?\s*(question\s*:|$)/);
  // Simpler: just search raw for 'question:' that isn't 'question_en:' or '// question' etc
  const questionColonCount = (raw.match(/\bquestion\s*:/g) || []).length;
  const questionEnCount = (raw.match(/\bquestion_en\s*:/g) || []).length;
  // The open-ended prompt block uses "question:" at the outer object level — that's 1 occurrence expected
  if (questionColonCount > 1) {
    // More than 1 bare "question:" — likely some check_questions items using wrong key
    fail('C2c', `[${mode}] explore.js has ${questionColonCount} bare "question:" keys — check_questions items must use "question_en:"`);
  } else if (questionEnCount === 0 && IS_W16_PLUS) {
    fail('C2c', `[${mode}] explore.js has no "question_en:" in check_questions items`);
  } else {
    pass('C2c', `[${mode}] explore.js check_questions items use "question_en:"`);
  }
}

/** C3 — writing.js: min_words >= threshold for mode */
async function checkWriting(dir, mode) {
  const file = path.join(dir, 'writing.js');
  const data = await loadModule(file);
  if (data === null) { fail('C3', `[${mode}] writing.js missing`); return; }
  if (data.__error) { fail('C3', `[${mode}] writing.js syntax error: ${data.__error}`); return; }

  const threshold = mode === 'advanced' ? 40 : 30;
  if (typeof data.min_words !== 'number') {
    fail('C3a', `[${mode}] writing.js missing or non-numeric min_words`);
  } else if (data.min_words < threshold) {
    fail('C3a', `[${mode}] writing.js min_words=${data.min_words} < ${threshold}`);
  } else {
    pass('C3a', `[${mode}] writing.js min_words=${data.min_words} (≥${threshold})`);
  }

  // Phase 1 (W1-54): model_sentence required
  if (WEEK_NUM <= 54) {
    if (!data.model_sentence) {
      fail('C3b', `[${mode}] writing.js missing model_sentence (required for Phase 1)`);
    } else {
      pass('C3b', `[${mode}] writing.js has model_sentence`);
    }
  }
}

/** C4 — logic_science.js (W16+): questions.length >= 5 */
async function checkLogicScience(dir, mode) {
  if (!IS_W16_PLUS) return;
  const file = path.join(dir, 'logic_science.js');
  const data = await loadModule(file);
  if (data === null) { fail('C4', `[${mode}] logic_science.js missing`); return; }
  if (data.__error) { fail('C4', `[${mode}] logic_science.js syntax error: ${data.__error}`); return; }

  const qs = data.questions;
  if (!Array.isArray(qs)) {
    fail('C4', `[${mode}] logic_science.js "questions" is not an array`);
  } else if (qs.length < 5) {
    fail('C4', `[${mode}] logic_science.js has ${qs.length} questions (need ≥5)`);
  } else {
    pass('C4', `[${mode}] logic_science.js has ${qs.length} questions`);
  }
}

/** C5 — singapore_math.js (W16+): problems.length >= 5 */
async function checkSingaporeMath(dir, mode) {
  if (!IS_W16_PLUS) return;
  const file = path.join(dir, 'singapore_math.js');
  const data = await loadModule(file);
  if (data === null) { fail('C5', `[${mode}] singapore_math.js missing`); return; }
  if (data.__error) { fail('C5', `[${mode}] singapore_math.js syntax error: ${data.__error}`); return; }

  const ps = data.problems;
  if (!Array.isArray(ps)) {
    fail('C5', `[${mode}] singapore_math.js "problems" is not an array`);
  } else if (ps.length < 5) {
    fail('C5', `[${mode}] singapore_math.js has ${ps.length} problems (need ≥5)`);
  } else {
    pass('C5', `[${mode}] singapore_math.js has ${ps.length} problems`);
  }
}

/** C6 — grammar.js: questions.length === 20 */
async function checkGrammar(dir, mode) {
  const file = path.join(dir, 'grammar.js');
  const data = await loadModule(file);
  if (data === null) { fail('C6', `[${mode}] grammar.js missing`); return; }
  if (data.__error) { fail('C6', `[${mode}] grammar.js syntax error: ${data.__error}`); return; }

  // Support: export default [{...}], { questions: [...] }, or { exercises: [...] }
  const qs = Array.isArray(data) ? data : (data.questions || data.exercises);
  if (!Array.isArray(qs)) {
    fail('C6', `[${mode}] grammar.js: no "questions" or "exercises" array found`);
  } else if (qs.length !== 20) {
    fail('C6', `[${mode}] grammar.js has ${qs.length} questions/exercises (must be exactly 20)`);
  } else {
    pass('C6', `[${mode}] grammar.js has exactly 20 questions`);
  }
}

/** C7 — vocab.js (W16+): length === 13 */
async function checkVocab(dir, mode) {
  const file = path.join(dir, 'vocab.js');
  const data = await loadModule(file);
  if (data === null) { fail('C7', `[${mode}] vocab.js missing`); return; }
  if (data.__error) { fail('C7', `[${mode}] vocab.js syntax error: ${data.__error}`); return; }

  if (!IS_W16_PLUS) return; // only enforce 13 for W16+
  // Support both: export default [{...}] and export default { vocab: [{...}] }
  const list = Array.isArray(data) ? data : (Array.isArray(data.vocab) ? data.vocab : null);
  if (!list) {
    fail('C7', `[${mode}] vocab.js: cannot find vocab array (expected export default [] or { vocab: [] })`);
  } else if (list.length !== 13) {
    fail('C7', `[${mode}] vocab.js has ${list.length} words (must be exactly 13 for W16+)`);
  } else {
    pass('C7', `[${mode}] vocab.js has exactly 13 words`);
  }
}

/** C8 — word_power.js (W16+): each word field must have ≥2 words (space check) */
async function checkWordPower(dir, mode) {
  if (!IS_W16_PLUS) return;
  const file = path.join(dir, 'word_power.js');
  const data = await loadModule(file);
  if (data === null) { fail('C8', `[${mode}] word_power.js missing`); return; }
  if (data.__error) { fail('C8', `[${mode}] word_power.js syntax error: ${data.__error}`); return; }

  // Support both: export default [{...}] and export default { words: [{...}] }
  const list = Array.isArray(data) ? data : (Array.isArray(data.words) ? data.words : null);
  if (!list) {
    fail('C8', `[${mode}] word_power.js: cannot find words array (expected export default [] or { words: [] })`);
    return;
  }

  const singles = list.filter(item => {
    const w = (item.word || '').trim();
    return !w.includes(' '); // single word — no space
  });

  if (singles.length > 0) {
    fail('C8', `[${mode}] word_power.js has ${singles.length} single-word entries (need collocations): ${singles.map(s => `"${s.word}"`).join(', ')}`);
  } else {
    pass('C8', `[${mode}] word_power.js all entries are collocations (2+ words)`);
  }
}

/** C9 — ask_ai.js: no prompt_en/hint_en at root object level; no visible answers in context */
async function checkAskAI(dir, mode) {
  const file = path.join(dir, 'ask_ai.js');
  const data = await loadModule(file);
  const raw = loadRaw(file);
  if (data === null || raw === null) { fail('C9', `[${mode}] ask_ai.js missing`); return; }
  if (data.__error) { fail('C9', `[${mode}] ask_ai.js syntax error: ${data.__error}`); return; }

  // Check forbidden top-level keys
  if (typeof data === 'object' && !Array.isArray(data)) {
    const topKeys = Object.keys(data);
    const hasBadKey = topKeys.some(k => k === 'prompt_en' || k === 'hint_en' || k === 'prompt_vi' || k === 'hint_vi');
    if (hasBadKey) {
      fail('C9a', `[${mode}] ask_ai.js has forbidden top-level keys (prompt_en/hint_en) — must use prompts array`);
    } else {
      pass('C9a', `[${mode}] ask_ai.js no forbidden top-level keys`);
    }
  }

  // Check that prompts array exists
  if (!Array.isArray(data.prompts) || data.prompts.length < 5) {
    fail('C9b', `[${mode}] ask_ai.js prompts array missing or < 5 items`);
  } else {
    pass('C9b', `[${mode}] ask_ai.js has ${data.prompts.length} prompts`);
  }

  // Flag if context_en might contain an answer word
  if (Array.isArray(data.prompts)) {
    const flagged = [];
    data.prompts.forEach(p => {
      if (!p.answer || !p.context_en) return;
      const answers = Array.isArray(p.answer) ? p.answer : [p.answer];
      answers.forEach(ans => {
        // Extract key question words (Wh-words) from answer
        const ansLower = ans.toLowerCase();
        const whWords = ['what', 'where', 'when', 'why', 'how', 'who', 'which'];
        const matchedWh = whWords.filter(w => ansLower.startsWith(w));
        if (matchedWh.length === 0) return;
        // Check if the context explicitly contains the full answer sentence
        const ctxLower = p.context_en.toLowerCase();
        if (matchedWh.some(w => ctxLower.includes(ans.toLowerCase().slice(0, 20)))) {
          flagged.push(`prompt id=${p.id}`);
        }
      });
    });
    if (flagged.length > 0) {
      warn('C9c', `[${mode}] ask_ai.js possible answer leakage in context: ${flagged.join(', ')}`);
    } else {
      pass('C9c', `[${mode}] ask_ai.js no obvious answer leakage detected`);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

async function runChecks() {
  console.log(`\n🔍 QA CHECK — Week ${WEEK_NUM} | Mode: ${MODES.join(', ')}`);
  console.log('━'.repeat(60));

  for (const mode of MODES) {
    const dir = dataDir(mode);
    console.log(`\n📁 ${mode.toUpperCase()} → ${dir.replace(ROOT, '.')}`);

    if (!existsSync(dir)) {
      fail('DIR', `[${mode}] Week directory not found: ${dir}`);
      continue;
    }

    await checkRead(dir, mode);
    await checkExplore(dir, mode);
    await checkWriting(dir, mode);
    await checkLogicScience(dir, mode);
    await checkSingaporeMath(dir, mode);
    await checkGrammar(dir, mode);
    await checkVocab(dir, mode);
    await checkWordPower(dir, mode);
    await checkAskAI(dir, mode);
  }

  console.log('\n' + '━'.repeat(60));
  console.log('RESULTS:');
  report.forEach(line => console.log(line));

  console.log('\n' + '━'.repeat(60));
  if (totalFails === 0) {
    console.log(`\n✅ ALL CHECKS PASSED — Week ${WEEK_NUM} [${MODES.join('+')}]\n`);
    process.exit(0);
  } else {
    console.log(`\n❌ ${totalFails} CHECK(S) FAILED — Week ${WEEK_NUM} [${MODES.join('+')}]\n`);
    process.exit(1);
  }
}

runChecks();
