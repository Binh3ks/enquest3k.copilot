import { evaluateSentenceAttempt } from '../src/services/answerMatchingEngine.js';

const sampleAnswerKey = {
  valid_structures: [
    ['While', 'I', 'was', 'exploring', 'the', 'cave', ',', 'I', 'found', 'a', 'glowing', 'crystal', '.'],
    ['I', 'found', 'a', 'glowing', 'crystal', 'while', 'I', 'was', 'exploring', 'the', 'cave', '.']
  ],
  clause_rules: {
    main_clause: ['I found a glowing crystal'],
    subordinate_clause: ['I was exploring the cave'],
    connector: ['while'],
    requires_comma_if_subordinate_first: true
  },
  acceptable_connectors: ['as', 'when']
};

let testsRun = 0;
let testsPassed = 0;

function assert(condition, message) {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

console.log('--- RUNNING UNIT TESTS FOR ANSWER MATCHING ENGINE ---');

// Test Case 1: Exact Match (Case 1)
const tc1 = evaluateSentenceAttempt(
  ['While', 'I', 'was', 'exploring', 'the', 'cave', ',', 'I', 'found', 'a', 'glowing', 'crystal', '.'],
  sampleAnswerKey
);
assert(tc1.isCorrect && tc1.score === 100 && !tc1.isMinorError, 'TC1: Exact valid_structure match (100% score)');

// Test Case 2: Exact Match (Case-insensitive & inverted clause order)
const tc2 = evaluateSentenceAttempt(
  ['i', 'found', 'a', 'glowing', 'crystal', 'WHILE', 'i', 'was', 'exploring', 'the', 'cave', '.'],
  sampleAnswerKey
);
assert(tc2.isCorrect && tc2.score === 100, 'TC2: Inverted order case-insensitive match (100% score)');

// Test Case 3: Acceptable Synonym Connector ('as' instead of 'while')
const tc3 = evaluateSentenceAttempt(
  ['I', 'found', 'a', 'glowing', 'crystal', 'as', 'I', 'was', 'exploring', 'the', 'cave', '.'],
  sampleAnswerKey
);
assert(tc3.isCorrect && tc3.score === 100 && tc3.diagnosticTag === 'acceptable_connector_synonym', 'TC3: Acceptable connector synonym match (100% score)');

// Test Case 4: Minor Error - Comma Omission
const tc4 = evaluateSentenceAttempt(
  ['While', 'I', 'was', 'exploring', 'the', 'cave', 'I', 'found', 'a', 'glowing', 'crystal', '.'],
  sampleAnswerKey
);
assert(tc4.isCorrect && tc4.isMinorError && tc4.score === 90 && tc4.minorErrors.includes('missing_comma'), 'TC4: Missing comma minor error (90% score, isMinorError: true)');

// Test Case 5: Diagnostic Tag - past_cont_missing_was
const tc5 = evaluateSentenceAttempt(
  ['While', 'I', 'exploring', 'the', 'cave', ',', 'I', 'found', 'a', 'glowing', 'crystal', '.'],
  sampleAnswerKey
);
assert(!tc5.isCorrect && tc5.diagnosticTag === 'past_cont_missing_was', 'TC5: Diagnostic tag past_cont_missing_was detected');

// Test Case 6: Diagnostic Tag - word_order_incorrect
const tc6 = evaluateSentenceAttempt(
  ['I', 'was', 'exploring', 'while', 'the', 'cave', ',', 'I', 'found', 'a', 'glowing', 'crystal', '.'],
  sampleAnswerKey
);
assert(!tc6.isCorrect && tc6.diagnosticTag === 'word_order_incorrect', 'TC6: Diagnostic tag word_order_incorrect detected');

// Test Case 7: Diagnostic Tag - missing_target_words
const tc7 = evaluateSentenceAttempt(
  ['While', 'I', 'was', 'exploring', '.'],
  sampleAnswerKey
);
assert(!tc7.isCorrect && tc7.diagnosticTag === 'missing_target_words', 'TC7: Diagnostic tag missing_target_words detected');

console.log(`\nTEST SUMMARY: ${testsPassed}/${testsRun} tests passed.`);
if (testsPassed !== testsRun) {
  process.exit(1);
}
