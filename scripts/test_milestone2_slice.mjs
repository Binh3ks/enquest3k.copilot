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
  ChoiceQuestionAdapter
} from '../src/services/slices/GenericVerticalSliceOrchestrator.js';
import { ERROR_TAXONOMY } from '../src/contracts/DiagnosticTaxonomy.js';

console.log('\n--- RUNNING MILESTONE 2 TESTS (GENERIC ORCHESTRATOR & SLICE 2: R&W PART 3 CHOICE QUESTIONS) ---');

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

async function runMilestone2Tests() {
  const readingPart3Data = week33Data.readingHub.reading_part3_story;

  // 1. Task Configuration & Parameter Extensibility Test
  const taskConfig = ChoiceQuestionAdapter.configureTask(readingPart3Data);
  assert(taskConfig.questionCount === 5, 'Choice Question Adapter: questionCount dynamically extracted (5 questions)');
  assert(taskConfig.passThresholdPct === 70, 'Choice Question Adapter: passThresholdPct is configurable (70%)');
  assert(taskConfig.recheckItemLimit === 3, 'Choice Question Adapter: recheckItemLimit is task-configurable (3 items)');

  // 2. Scoring Test (100% vs 60% vs 0%)
  const perfectAnswers = {
    r3_q01: { label: 'B' },
    r3_q02: { label: 'C' },
    r3_q03: { label: 'A' },
    r3_q04: { label: 'C' },
    r3_q05: { label: 'B' }
  };
  const scorePerfect = ChoiceQuestionAdapter.scoreAttempt(taskConfig, perfectAnswers);
  assert(scorePerfect.scorePct === 100 && scorePerfect.isPassed, 'Scoring Engine: 100% score for correct choices');

  const partialAnswers = {
    r3_q01: { label: 'B' },
    r3_q02: { label: 'A' }, // wrong
    r3_q03: { label: 'A' },
    r3_q04: { label: 'A' }, // wrong
    r3_q05: { label: 'B' }
  };
  const scorePartial = ChoiceQuestionAdapter.scoreAttempt(taskConfig, partialAnswers);
  assert(scorePartial.scorePct === 60 && !scorePartial.isPassed, 'Scoring Engine: 60% calculated for 3/5 correct choices');

  // 3. Generic Orchestrator Test (Slice 2 Execution)
  const slice2Result = await executeGenericVerticalSlice({
    adapter: ChoiceQuestionAdapter,
    rawData: readingPart3Data,
    weekData: week33Data,
    userAnswers: partialAnswers,
    learnerId: 'learner_milestone_2',
    contentIdOverride: 'w33_r3_comprehension'
  });

  assert(slice2Result.stage3_scoreResult.scorePct === 60, 'Slice 2 E2E: Stage 3 returns 60% score');
  assert(slice2Result.stage4_errorClassification.code === ERROR_TAXONOMY.TYPE_D_RECEPTIVE.code, 'Slice 2 E2E: Stage 4 classifies error as TYPE_D_RECEPTIVE');
  assert(slice2Result.stage6_remediationTarget.activity === 'Comprehension Questions (Part 3)', 'Slice 2 E2E: Stage 6 routes remediation to Comprehension Questions');
  assert(slice2Result.stage7_recheckDrill.items.length === 2, 'Slice 2 E2E: Stage 7 creates recheck drill with 2 failed items');

  // 4. Verification that Slice 1 (Open Cloze) ALSO executes seamlessly via Generic Orchestrator
  const slice1Result = await executeGenericVerticalSlice({
    adapter: OpenClozeAdapter,
    rawData: week33Data.readingHub.interactive_story,
    weekData: week33Data,
    userAnswers: { 1: 'accidentally knocked over', 2: 'wrong', 3: 'slipped on a wet puddle', 4: 'to make things worse', 5: 'wrong' },
    learnerId: 'learner_milestone_2',
    contentIdOverride: 'w33_interactive_story'
  });

  assert(slice1Result.stage3_scoreResult.scorePct === 60, 'Slice 1 E2E via Generic Orchestrator: Stage 3 returns 60% score');
  assert(slice1Result.stage4_errorClassification.code === ERROR_TAXONOMY.TYPE_D_RECEPTIVE.code, 'Slice 1 E2E via Generic Orchestrator: Stage 4 classifies error as TYPE_D_RECEPTIVE');

  console.log(`\nMILESTONE 2 TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
}

runMilestone2Tests();
