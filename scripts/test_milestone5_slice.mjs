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
  OpenClozeAdapter
} from '../src/services/slices/GenericVerticalSliceOrchestrator.js';
import {
  evaluateMotivationEvent,
  LEARNING_EVENTS,
  MASTERY_BADGES
} from '../src/services/gamification/MotivationService.js';

console.log('\n--- RUNNING MILESTONE 5 TESTS (MOTIVATION & GAMIFICATION LAYER) ---');

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

async function runMilestone5Tests() {
  localStorage.clear(); // Ensure clean state for isolated milestone test run

  // 1. Meaningless Click / Zero Score Rule Test
  const zeroReward = evaluateMotivationEvent({ learnerId: 'm5_test_user_unique_1', contentId: 'w33_test_unique_1', scorePct: 0 });
  assert(zeroReward.xpEarned === 0 && zeroReward.starsEarned === 0, 'Gamification Rule: 0 XP and 0 Stars awarded for 0% score (no reward for meaningless clicks)');
  assert(zeroReward.events.length === 0, 'Gamification Rule: No learning events emitted for 0% score');

  // 2. 100% Score Attempt Rewards Test (Stars, XP, Mastery Badge)
  const perfectReward = evaluateMotivationEvent({ learnerId: 'm5_test_user_unique_2', contentId: 'w33_interactive_story_unique_2', scorePct: 100 });
  assert(perfectReward.starsEarned === 3, 'Rewards Calculation: 3 Stars awarded for 100% score');
  assert(perfectReward.xpEarned === 40, 'Rewards Calculation: +40 XP awarded (+10 Task + +15 Mastered + +15 Perfect Bonus)', [`Got XP: ${perfectReward.xpEarned}`]);
  assert(perfectReward.badgeUnlocked.id === MASTERY_BADGES.W33_CLOZE_MASTER.id, 'Mastery Badge: W33 Cloze Master badge awarded for 100% Cloze story completion');
  assert(perfectReward.events.includes(LEARNING_EVENTS.SKILL_MASTERED), 'Learning Events: SKILL_MASTERED event emitted');

  // 3. Fail-Forward Score Improvement Test (Retry Growth Bonus)
  const retryReward = evaluateMotivationEvent({
    learnerId: 'm5_test_user_unique_3',
    contentId: 'w33_interactive_story_unique_3',
    scorePct: 100,
    previousScorePct: 60
  });
  assert(retryReward.events.includes(LEARNING_EVENTS.SKILL_IMPROVED), 'Fail-Forward: SKILL_IMPROVED event emitted when score increases on retry (60% -> 100%)');
  assert(retryReward.xpEarned === 55, 'Fail-Forward: +55 XP awarded including +15 Growth XP bonus', [`Got XP: ${retryReward.xpEarned}`]);
  assert(retryReward.feedbackMessage.includes('Awesome growth!'), 'Fail-Forward: Learner-visible narrative feedback praises score growth');

  // 4. Streak Calculation Test
  const streak1 = evaluateMotivationEvent({ learnerId: 'm5_test_user_unique_4', contentId: 'w33_task_streak', scorePct: 100, currentStreak: 2 });
  assert(streak1.newStreak === 3, 'Streak Counter: Consecutive successful attempt streak increments to 3');
  assert(streak1.events.includes(LEARNING_EVENTS.STREAK_ACHIEVED), 'Streak Counter: STREAK_ACHIEVED event emitted when streak reaches 3');

  // 5. E2E Vertical Slice Execution with Stage 8 Motivation Processing
  const sliceResult = await executeGenericVerticalSlice({
    adapter: OpenClozeAdapter,
    rawData: week33Data.readingHub.interactive_story,
    weekData: week33Data,
    userAnswers: { 1: 'accidentally knocked over', 2: 'rushed downstairs', 3: 'slipped on a wet puddle', 4: 'to make things worse', 5: 'apologized to his mother' },
    learnerId: 'learner_milestone_5_unique',
    previousScorePct: 40
  });

  assert(sliceResult.stage8_motivation !== undefined, 'E2E Slice: Stage 8 motivation payload attached cleanly');
  assert(sliceResult.stage8_motivation.starsEarned === 3, 'E2E Slice: Stage 8 computes 3 Stars for perfect slice execution');
  assert(sliceResult.stage8_motivation.badgeUnlocked !== null, 'E2E Slice: Stage 8 unlocks W33 Cloze Master badge');

  console.log(`\nMILESTONE 5 TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
}

runMilestone5Tests();
