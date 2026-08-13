// Mock localStorage for Node CLI execution
if (typeof global.localStorage === 'undefined') {
  const store = {};
  global.localStorage = {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = String(value); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
}

import week33Data from '../src/data/weeks/week_33/index.js';
import {
  executeGenericVerticalSlice,
  OpenClozeAdapter,
  ChoiceQuestionAdapter,
  MatchingAdapter
} from '../src/services/slices/GenericVerticalSliceOrchestrator.js';
import { ERROR_TAXONOMY } from '../src/contracts/DiagnosticTaxonomy.js';

console.log('\n--- RUNNING MILESTONE 3 TESTS (CHOICEGRID A-H & SLICE 3: MATCHING PAIRS) ---');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message, details = []) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ [PASS] ${message}`);
  } else {
    console.error(`❌ [FAIL] ${message}`);
    if (details.length > 0) {
      details.forEach(d => console.error(`   └─ Error: ${d}`));
    }
    process.exitCode = 1;
  }
}

async function runMilestone3Tests() {
  // 1. ChoiceGrid A-H Option Verification Test
  const hOptions = Array.from({ length: 8 }, (_, i) => ({
    label: String.fromCharCode(65 + i),
    text: `Option ${String.fromCharCode(65 + i)} text`,
    isCorrect: i === 3 // Option D correct
  }));

  const hTaskConfig = ChoiceQuestionAdapter.configureTask({ questions: [{ id: 'q_h8', question: 'Select Option D', options: hOptions, answerIndex: 3 }] });
  assert(hTaskConfig.questions[0].options.length === 8, 'ChoiceGrid A-H: Configurable optionCount supports 8 options (A through H)');

  const hScore = ChoiceQuestionAdapter.scoreAttempt(hTaskConfig, { q_h8: { label: 'D' } });
  assert(hScore.scorePct === 100 && hScore.isPassed, 'ChoiceGrid A-H: Option D selected out of 8 choices scored 100% correct');

  // 2. Matching Interaction Slice (Slice 3) Test Data
  const sampleMatchingData = {
    title: 'W33 Vocab & Definition Matching',
    pairs: [
      { id: 'p1', leftText: 'corridor', rightText: 'long passage in a building' },
      { id: 'p2', leftText: 'slipped', rightText: 'slid accidentally and lost balance' },
      { id: 'p3', leftText: 'bandage', rightText: 'strip of cloth used to bind a wound' },
      { id: 'p4', leftText: 'nurse', rightText: 'person trained to care for sick people' },
      { id: 'p5', leftText: 'emergency', rightText: 'serious unexpected situation' }
    ]
  };

  const matchingTaskConfig = MatchingAdapter.configureTask(sampleMatchingData);
  assert(matchingTaskConfig.pairCount === 5, 'Matching Adapter: pairCount dynamically extracted (5 pairs)');
  assert(matchingTaskConfig.passThresholdPct === 80, 'Matching Adapter: passThresholdPct is configurable (80%)');

  // Scoring Test (100% vs 60%)
  const perfectMatches = { p1: 'p1', p2: 'p2', p3: 'p3', p4: 'p4', p5: 'p5' };
  const scorePerfect = MatchingAdapter.scoreAttempt(matchingTaskConfig, perfectMatches);
  assert(scorePerfect.scorePct === 100 && scorePerfect.isPassed, 'Matching Scoring: 100% score for exact matched pairs');

  const partialMatches = { p1: 'p1', p2: 'p3', p3: 'p3', p4: 'p4', p5: 'p2' }; // p2 and p5 incorrect
  const scorePartial = MatchingAdapter.scoreAttempt(matchingTaskConfig, partialMatches);
  assert(scorePartial.scorePct === 60 && !scorePartial.isPassed, 'Matching Scoring: 60% score calculated for 3/5 correct matches');

  // 3. E2E Generic Orchestrator Test for Slice 3
  const slice3Result = await executeGenericVerticalSlice({
    adapter: MatchingAdapter,
    rawData: sampleMatchingData,
    weekData: week33Data,
    userAnswers: partialMatches,
    learnerId: 'learner_milestone_3',
    contentIdOverride: 'w33_vocab_matching'
  });

  assert(slice3Result.stage3_scoreResult.scorePct === 60, 'Slice 3 E2E: Stage 3 returns 60% score');
  assert(slice3Result.stage4_errorClassification.code === ERROR_TAXONOMY.TYPE_A_VOCAB.code, 'Slice 3 E2E: Stage 4 classifies vocab matching error as TYPE_A_VOCAB');
  assert(slice3Result.stage6_remediationTarget.activity === 'Vocabulary & Definition Matching', 'Slice 3 E2E: Stage 6 routes remediation to Vocabulary & Definition Matching');
  assert(slice3Result.stage7_recheckDrill.items.length === 2, 'Slice 3 E2E: Stage 7 creates recheck drill with 2 failed items');

  // 4. Multi-Pattern Verification (All 3 Slices execute through single Generic Orchestrator)
  assert(OpenClozeAdapter.taskType === 'open_cloze', 'Multi-Pattern: Pattern 1 (Open Cloze) registered');
  assert(ChoiceQuestionAdapter.taskType === 'choice_questions', 'Multi-Pattern: Pattern 2 (Choice Questions) registered');
  assert(MatchingAdapter.taskType === 'matching_pairs', 'Multi-Pattern: Pattern 3 (Matching Pairs) registered');

  console.log(`\nMILESTONE 3 TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
}

runMilestone3Tests();
