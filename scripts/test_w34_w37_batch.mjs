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

import w34Data from '../src/data/weeks/week_34/index.js';
import w35Data from '../src/data/weeks/week_35/index.js';
import w36Data from '../src/data/weeks/week_36/index.js';
import w37Data from '../src/data/weeks/week_37/index.js';

import { validateWeekContentSchema } from '../src/contracts/ContentSchemas.js';
import { executeGenericVerticalSlice, OpenClozeAdapter } from '../src/services/slices/GenericVerticalSliceOrchestrator.js';
import { evaluateMockAssessment } from '../src/services/assessment/MockAssessmentEngine.js';
import MOCK_01_DATA from '../src/data/mocks/mock_01.js';

console.log('\n--- RUNNING W34-W37 PRODUCTION BATCH & MOCK-01 INTEGRATION TESTS ---');

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

async function runW34W37BatchTests() {
  localStorage.clear();

  // 1. Schema Validation for W34, W35, W36, W37
  const schema34 = validateWeekContentSchema(w34Data);
  assert(schema34.valid, 'W34 Schema: Week 34 matches 4-Hub content schema contract');

  const schema35 = validateWeekContentSchema(w35Data);
  assert(schema35.valid, 'W35 Schema: Week 35 matches 4-Hub content schema contract');

  const schema36 = validateWeekContentSchema(w36Data);
  assert(schema36.valid, 'W36 Schema: Week 36 matches 4-Hub content schema contract');

  const schema37 = validateWeekContentSchema(w37Data);
  assert(schema37.valid, 'W37 Schema: Week 37 matches 4-Hub content schema contract');

  // 2. Generic Orchestrator Execution across W34 Restored Syllabus Content (Lion and the Mouse)
  const sliceW34 = await executeGenericVerticalSlice({
    adapter: OpenClozeAdapter,
    rawData: {
      title: 'W34 Lion and the Mouse Open Cloze',
      gaps: [
        { id: 1, target: 'caught the mouse' },
        { id: 2, target: 'roared the mouse' },
        { id: 3, target: 'trapped the lion in a strong net' },
        { id: 4, target: 'chewed the net' },
        { id: 5, target: 'thanked the mouse' }
      ]
    },
    weekData: w34Data,
    userAnswers: { 1: 'caught the mouse', 2: 'roared the mouse', 3: 'trapped the lion in a strong net', 4: 'chewed the net', 5: 'thanked the mouse' },
    learnerId: 'learner_w34_test'
  });
  assert(sliceW34.stage3_scoreResult.scorePct === 100, 'W34 Execution: Open Cloze slice executed successfully with 100% score');

  // 3. MOCK-01 Assessment Engine Evaluation & Safe Diagnostic Labels
  const mockResult = evaluateMockAssessment({
    mockId: MOCK_01_DATA.mockId,
    learnerId: 'learner_mock_test',
    readingWritingAnswers: { rw1_1: true, rw1_2: true, rw1_3: true, rw1_4: true, rw1_5: true, rw3_1: true, rw3_2: false, rw4_g1: true, rw4_g2: true, rw4_g3: true, rw4_g4: true, rw4_g5: true },
    listeningAnswers: { l1_1: true, l1_2: true, l3_1: true, l3_2: true },
    speakingScorePct: 90
  });

  assert(mockResult.practiceScorePct > 0, 'MOCK-01 Engine: Evaluates overall Diagnostic Practice Score percentage');
  assert(mockResult.diagnosticPractice.totalShieldsEarned >= 10, 'MOCK-01 Engine: Computes Diagnostic Practice Shields');
  assert(mockResult.diagnosticPractice.label === 'EngQuest Flyers Diagnostic Practice', 'MOCK-01 Engine: Preserves EngQuest Flyers Diagnostic Practice label');
  assert(mockResult.mockMotivation.badgeUnlocked === null, 'MOCK-01 Engine: Zero game badges awarded for Mock tasks');
  assert(mockResult.mockMotivation.antiExploitTriggered === false, 'MOCK-01 Engine: Evaluated clean completion payload');

  console.log(`\nW34-W37 BATCH TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
}

runW34W37BatchTests();
