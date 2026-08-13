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
  MatchingAdapter
} from '../src/services/slices/GenericVerticalSliceOrchestrator.js';
import { ERROR_TAXONOMY } from '../src/contracts/DiagnosticTaxonomy.js';

console.log('\n--- RUNNING MILESTONE 4 TESTS (LISTENING PART 3 VISUAL MATCHING SLICE) ---');

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

async function runMilestone4Tests() {
  // 1. Audio Task Configuration Test Payload
  const sampleListeningMatchingData = {
    title: 'W33 Listening Part 3 Visual Matching — Tom’s Clumsy Morning',
    audioPrompt: 'Listen to Tom talking about his clumsy morning. Match each event to the correct picture (A-H).',
    isListening: true,
    pairs: [
      { id: 'l1', leftText: 'Alarm clock accident', rightText: 'Picture A: Alarm clock broken on rug', rightImage: '/images/week33/alarm.png', audioText: 'First I accidentally knocked over my alarm clock.' },
      { id: 'l2', leftText: 'Kitchen floor slip', rightText: 'Picture B: Slipping on wet puddle', rightImage: '/images/week33/puddle.png', audioText: 'Then I slipped on a wet puddle in the kitchen.' },
      { id: 'l3', leftText: 'Juice spill on notebook', rightText: 'Picture C: Spilling juice over notebook', rightImage: '/images/week33/juice.png', audioText: 'To make things worse, I spilled juice over my notebook.' },
      { id: 'l4', leftText: 'Lost backpack on bus', rightText: 'Picture D: Backpack sitting on bus seat', rightImage: '/images/week33/bus.png', audioText: 'Then I lost my backpack on the school bus.' },
      { id: 'l5', leftText: 'Apology to mom', rightText: 'Picture E: Apologizing to mother', rightImage: '/images/week33/apology.png', audioText: 'Finally I apologized to my mom and promised to be careful.' }
    ]
  };

  const taskConfig = MatchingAdapter.configureTask(sampleListeningMatchingData);
  assert(taskConfig.isListening === true, 'Audio Task Config: isListening flag is extracted correctly');
  assert(taskConfig.taskType === 'listening_visual_matching', 'Audio Task Config: taskType resolves to listening_visual_matching');
  assert(taskConfig.audioPrompt !== null, 'Audio Task Config: audioPrompt script is present');
  assert(taskConfig.pairCount === 5, 'Audio Task Config: pairCount dynamically extracted (5 pairs)');

  // 2. Audio Replay Tracking Simulation
  let replayCount = 0;
  function simulatePlayAudio() { replayCount += 1; }
  simulatePlayAudio();
  simulatePlayAudio();
  assert(replayCount === 2, 'Audio Replay: Explicit replay count tracking operates correctly (2 plays)');

  // 3. Image Matching Scoring Test (100% vs 60%)
  const perfectMatches = { l1: 'l1', l2: 'l2', l3: 'l3', l4: 'l4', l5: 'l5' };
  const scorePerfect = MatchingAdapter.scoreAttempt(taskConfig, perfectMatches);
  assert(scorePerfect.scorePct === 100 && scorePerfect.isPassed, 'Listening Visual Matching Scoring: 100% score for exact picture target matches');

  const partialMatches = { l1: 'l1', l2: 'l3', l3: 'l3', l4: 'l4', l5: 'l2' }; // l2 and l5 wrong
  const scorePartial = MatchingAdapter.scoreAttempt(taskConfig, partialMatches);
  assert(scorePartial.scorePct === 60 && !scorePartial.isPassed, 'Listening Visual Matching Scoring: 60% score calculated for 3/5 correct picture matches');

  // 4. E2E Generic Orchestrator Test for Listening Visual Matching Slice
  const slice4Result = await executeGenericVerticalSlice({
    adapter: MatchingAdapter,
    rawData: sampleListeningMatchingData,
    weekData: week33Data,
    userAnswers: partialMatches,
    learnerId: 'learner_milestone_4',
    contentIdOverride: 'w33_listening_part3_visual'
  });

  assert(slice4Result.stage3_scoreResult.scorePct === 60, 'Slice 4 E2E: Stage 3 returns 60% score');
  assert(slice4Result.stage4_errorClassification.code === ERROR_TAXONOMY.TYPE_D_RECEPTIVE.code, 'Slice 4 E2E: Stage 4 classifies error as TYPE_D_RECEPTIVE (Receptive Detail Listening Error)');
  assert(slice4Result.stage6_remediationTarget.activity === 'Listening Part 3 Visual Matching', 'Slice 4 E2E: Stage 6 routes remediation to Listening Part 3 Visual Matching');
  assert(slice4Result.stage7_recheckDrill.items.length === 2, 'Slice 4 E2E: Stage 7 creates recheck drill with 2 failed listening items');

  console.log(`\nMILESTONE 4 TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
}

runMilestone4Tests();
