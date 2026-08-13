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
  configureOpenClozeTask,
  scoreOpenClozeAttempt,
  executeOpenClozeVerticalSlice
} from '../src/services/slices/OpenClozeVerticalSlice.js';
import { validateWeekContentSchema, DEFAULT_TASK_CONFIG } from '../src/contracts/ContentSchemas.js';
import { classifyDiagnosticTag, ERROR_TAXONOMY } from '../src/contracts/DiagnosticTaxonomy.js';
import { validateAttemptPayload, normalizeAttemptLogEntry } from '../src/contracts/ProgressContracts.js';

console.log('\n--- RUNNING GOLDEN VERTICAL SLICE TESTS (MILESTONE 1: HUB 1 OPEN CLOZE) ---');

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

async function runVerticalSliceTests() {
  // 1. Content Contract Test
  const schemaRes = validateWeekContentSchema(week33Data);
  assert(schemaRes.valid, 'Content Contract: week33Data validates against content schema contract', schemaRes.errors);

  // 2. Task Configuration Test (Configurable gap structure)
  const rawStory = week33Data.readingHub.interactive_story;
  const taskConfig = configureOpenClozeTask(rawStory);
  assert(taskConfig.gapCount === 5, 'Task Configuration: gapCount is dynamically extracted (5 gaps in W33)');
  assert(taskConfig.wordBank.length >= 5, 'Task Configuration: wordBank pills are extracted correctly');

  // Custom gap count test (Configurable gap structure validation)
  const customStory = { ...rawStory, gaps: [...rawStory.gaps, { id: 6, target: 'extra gap' }] };
  const customConfig = configureOpenClozeTask(customStory);
  assert(customConfig.gapCount === 6, 'Task Configuration: engine dynamically adapts to configurable N-gap structure (6 gaps)');

  // 3. Scoring Engine Test
  const perfectAnswers = {
    1: 'accidentally knocked over',
    2: 'rushed downstairs',
    3: 'slipped on a wet puddle',
    4: 'to make things worse',
    5: 'apologized to his mother'
  };
  const scorePerfect = scoreOpenClozeAttempt(taskConfig, perfectAnswers);
  assert(scorePerfect.scorePct === 100 && scorePerfect.isPassed, 'Scoring Engine: 100% score for all correct gap answers');

  const partialAnswers = {
    1: 'accidentally knocked over',
    2: 'wrong answer',
    3: 'slipped on a wet puddle',
    4: 'to make things worse',
    5: 'wrong answer'
  };
  const scorePartial = scoreOpenClozeAttempt(taskConfig, partialAnswers);
  assert(scorePartial.scorePct === 60 && !scorePartial.isPassed, 'Scoring Engine: Partial score (60%) calculated accurately for 3/5 correct');

  // 4. Progress Payload Validation & Normalization
  const samplePayload = { contentId: 'w33_interactive_story', score: scorePartial.scorePct, result: 'incorrect' };
  const valPayload = validateAttemptPayload(samplePayload);
  assert(valPayload.valid, 'Progress Payload: validateAttemptPayload approves valid attempt payload');

  const normalized = normalizeAttemptLogEntry({ score: 60, diagnosticTag: 'cloze_context_mismatch' });
  assert(normalized.result === 'minor_error' && normalized.diagnostic_tag === 'cloze_context_mismatch', 'Progress Payload: normalizeAttemptLogEntry normalizes score and diagnostic tag');

  // 5. Diagnostic Classification Test
  const category = classifyDiagnosticTag('cloze_context_mismatch');
  assert(category.code === ERROR_TAXONOMY.TYPE_D_RECEPTIVE.code, 'Diagnostic Classification: cloze_context_mismatch maps to TYPE_D_RECEPTIVE');

  // 6. End-to-End Vertical Slice Pipeline Execution & Remediation Routing
  const sliceResult = await executeOpenClozeVerticalSlice({
    weekData: week33Data,
    userAnswers: partialAnswers,
    learnerId: 'test_learner_w33',
    timeSpentSeconds: 45
  });

  assert(sliceResult.stage3_scoreResult.scorePct === 60, 'E2E Slice: Stage 3 returns 60% score percentage');
  assert(sliceResult.stage4_errorClassification.code === ERROR_TAXONOMY.TYPE_D_RECEPTIVE.code, 'E2E Slice: Stage 4 classifies diagnostic error as TYPE_D_RECEPTIVE');
  assert(sliceResult.stage6_remediationTarget !== null, 'E2E Slice: Stage 6 generates remediation target when score < 80%');
  assert(sliceResult.stage7_recheckDrill !== null && sliceResult.stage7_recheckDrill.items.length === 2, 'E2E Slice: Stage 7 generates 2-item recheck drill for failed gaps');

  console.log(`\nVERTICAL SLICE TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
}

runVerticalSliceTests();
