// Smart Check Engine — simulation & verification
// Run with: node _simulate_smartcheck.mjs

import { analyzeAnswer } from './src/utils/smartCheck.js';

let pass = 0, fail = 0;
const results = [];

function test(label, input, targets, mode, expectCorrect, expectedStatus) {
  const res = analyzeAnswer(input, targets, mode);
  const ok = res.isCorrect === expectCorrect && (!expectedStatus || res.status === expectedStatus);
  if (ok) pass++; else fail++;
  results.push({ ok, label, input, mode, isCorrect: res.isCorrect, status: res.status, message: res.message });
}

// ═══════════════════════════════════════════════════════════════
// STRICT mode (Dictation, AskAi)
// ═══════════════════════════════════════════════════════════════
test('strict: exact match',                  'She is reading a book.',    'She is reading a book.',    'strict', true,  'perfect');
test('strict: minor typo (1 char)',           'She is reading a bok.',     'She is reading a book.',    'strict', false, 'warning');  // fuzzy → "Sai chính tả"
test('strict: no capital',                   'she is reading a book.',    'She is reading a book.',    'strict', false, null);
test('strict: no punctuation',               'She is reading a book',     'She is reading a book.',    'strict', false, null);
test('strict: completely wrong',             'The dog runs outside.',     'She is reading a book.',    'strict', false, null);
test('strict: wrong content word',           'She is sleeping outside.',  'She is reading a book.',    'strict', false, null);

// ═══════════════════════════════════════════════════════════════
// ACADEMIC mode (ReadingExplore comprehension questions)
// ═══════════════════════════════════════════════════════════════
const ansW31Q1 = ['Luna heard a soft rustling sound in the tall grass',
                  'She heard rustling in the tall grass beside the path',
                  'A soft rustling sound in the tall grass'];

test('academic: exact first answer',         'Luna heard a soft rustling sound in the tall grass.', ansW31Q1, 'academic', true,  'perfect');
test('academic: alternate correct answer',   'She heard rustling in the tall grass beside the path.', ansW31Q1, 'academic', true, 'perfect');
// Partial answer (57% overlap) → correctly NOT full credit, shown as "Gần đúng"
test('academic: partial correct (key words)', 'Luna heard rustling in the grass.', ansW31Q1, 'academic', false, 'warning');  // 57% < 65% → Gần đúng is correct
test('academic: totally wrong',              'Luna smelled flowers near the bushes.', ansW31Q1, 'academic', false, null);
test('academic: off-topic correct grammar',  'The teacher is very kind.', ansW31Q1, 'academic', false, null);

const ansW31Q2 = ['The bark felt rough and uneven', 'It felt dry and uneven like cracked rock', 'Rough and dry, like cracked rock'];
test('academic: exact bark answer',          'The bark felt rough and uneven.',   ansW31Q2, 'academic', true,  'perfect');
test('academic: partial bark correct',       'The bark felt rough.',              ansW31Q2, 'academic', true,  null);  // 4/6=67% ≥65% ✓
test('academic: wrong bark answer',          'The bark was smooth and shiny.',    ansW31Q2, 'academic', false, null);

// ═══════════════════════════════════════════════════════════════
// CRITICAL mode with REAL target (makeSentence, sentenceExpander)
// ═══════════════════════════════════════════════════════════════
const makeTarget = 'Luna walked quietly along the damp path.';
test('critical+target: exact sentence',       makeTarget,                              makeTarget,  'critical', true,  'perfect');
test('critical+target: all content words',    'Luna walked quietly along damp path!', makeTarget,  'critical', true,  'perfect');
test('critical+target: missing key word',     'Luna walked quickly along the road.',  makeTarget,  'critical', false, 'warning');  // "damp"→missing, "path"→"road"
test('critical+target: completely wrong',     'The teacher is reading books today.',  makeTarget,  'critical', false, 'warning');

// Short targets (<3 words): critical mode requires ≥3 words — makeSentence catches exact match before calling analyzeAnswer
// Test a 3-word short target instead:
const shortTarget = 'She ran fast.';
test('critical+target short: exact 3-word',   'She ran fast.',  shortTarget, 'critical', true,  'perfect');
test('critical+target short: wrong word',     'She ran well.',  shortTarget, 'critical', false, 'warning');  // "fast" missing

// ═══════════════════════════════════════════════════════════════
// CRITICAL mode OPEN-ENDED (Explore Q99, askMe — target=[] or target=input)
// ═══════════════════════════════════════════════════════════════
test('critical open: proper sentence',        'I think the forest is beautiful.',   [],  'critical', true,  'perfect');
test('critical open: too short (2 words)',    'Yes good.',                           [],  'critical', false, 'warning');
test('critical open: no capital',             'i think the forest is beautiful.',   [],  'critical', false, 'warning');
test('critical open: no punctuation',         'I think the forest is beautiful',    [],  'critical', false, 'warning');

// ═══════════════════════════════════════════════════════════════
// SPEECH mode (MindMapSpeaking)
// ═══════════════════════════════════════════════════════════════
const speechTarget = ['Luna walked quietly along the damp path.'];
test('speech: exact content words',           'Luna walked quietly along the damp path',  speechTarget, 'speech', true,  null);
test('speech: minor STT glitch (1 char)',     'Luna walked quietly along the damp bath',  speechTarget, 'speech', true,  null);  // bath≈path Lev=1 ✓
test('speech: wrong content word',            'Luna walked quickly along the dry road',   speechTarget, 'speech', false, null);  // dry≠damp, road≠path
test('speech: totally different',             'The teacher reads books every day',        speechTarget, 'speech', false, null);

// ═══════════════════════════════════════════════════════════════
// GRAMMAR mode (GrammarEngine)
// ═══════════════════════════════════════════════════════════════
test('grammar: exact',                        'She goes to school every day.', 'She goes to school every day.', 'grammar', true,  'perfect');
test('grammar: minor typo',                   'She goes to scool every day.',  'She goes to school every day.', 'grammar', false, 'warning');
test('grammar: completely wrong',             'He runs in the park.',          'She goes to school every day.', 'grammar', false, null);

// ═══════════════════════════════════════════════════════════════
// MATH / LOGIC mode (LogicLab)
// ═══════════════════════════════════════════════════════════════
test('math: exact number',    '42',        '42',         'math',  true,  null);
test('math: number in words', '7 pots',    '7 pots',     'math',  true,  null);
test('math: wrong number',    '41',        '42',         'math',  false, null);

// ═══════════════════════════════════════════════════════════════
// EDGE CASES
// ═══════════════════════════════════════════════════════════════
test('edge: empty input',     '',          'Some answer.', 'strict', false, 'empty');
test('edge: null input',      null,        'Some answer.', 'strict', false, 'empty');

// ═══════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════
console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║           Smart Check Engine — Simulation Report           ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

const colW = 48;
results.forEach(r => {
  const icon = r.ok ? '✅' : '❌';
  const label = r.label.padEnd(colW).slice(0, colW);
  console.log(`${icon} ${label} → isCorrect:${String(r.isCorrect).padEnd(6)} status:${(r.status||'').padEnd(8)} msg: ${r.message || ''}`);
});

console.log(`\n─────────────────────────────────────────────────────────────`);
console.log(`  Total: ${pass + fail}   ✅ PASS: ${pass}   ❌ FAIL: ${fail}`);
if (fail === 0) {
  console.log('  🎉 All tests passed! Smart check engine verified.\n');
} else {
  console.log('  ⚠️  Some tests failed — review above.\n');
  process.exit(1);
}
