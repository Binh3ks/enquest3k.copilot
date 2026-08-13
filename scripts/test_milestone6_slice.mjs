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

import {
  evaluateMotivationEvent,
  resolveRewardPolicy,
  getLearnerMotivationState,
  saveLearnerMotivationState,
  LEARNING_EVENTS,
  MASTERY_BADGES,
  REWARD_POLICIES
} from '../src/services/gamification/MotivationService.js';

console.log('\n--- RUNNING MILESTONE 6 TESTS (CROSS-HUB GAMIFICATION VALIDATION) ---');

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

async function runMilestone6Tests() {
  // 1. Reward Policy Resolution & Activity Context Tests
  const policyHub1 = resolveRewardPolicy('w33_interactive_story', 'reading_cloze');
  assert(policyHub1.masteryThreshold === 80, 'Reward Policy Hub 1: Open Cloze mastery threshold is 80%');

  const policyHub2 = resolveRewardPolicy('w33_flash_arena', 'flash_arena');
  assert(policyHub2.masteryThreshold === 90, 'Reward Policy Hub 2: Flash Arena speed match threshold is 90%');

  const policyHub4 = resolveRewardPolicy('w33_podcast_shadowing', 'podcast_shadowing');
  assert(policyHub4.masteryThreshold === 75, 'Reward Policy Hub 4: Podcast Shadowing fluency threshold is 75%');

  const policyMock = resolveRewardPolicy('w33_mock_01', 'mock_test');
  assert(policyMock.badge === null, 'Reward Policy Mock Test: Mock tests strictly excluded from badges');

  // 2. Hub 1 (Reading Cloze) Event Execution
  const hub1Result = evaluateMotivationEvent({
    learnerId: 'learner_m6',
    contentId: 'w33_cloze_story',
    activityType: 'reading_cloze',
    scorePct: 100,
    persist: true
  });
  assert(hub1Result.badgeUnlocked.id === MASTERY_BADGES.W33_CLOZE_MASTER.id, 'Hub 1 Validation: W33 Cloze Master badge unlocked');

  // 3. Hub 2 (Flash Arena) Event Execution
  const hub2Result = evaluateMotivationEvent({
    learnerId: 'learner_m6',
    contentId: 'w33_flash_arena',
    activityType: 'flash_arena',
    scorePct: 100,
    persist: true
  });
  assert(hub2Result.badgeUnlocked.id === MASTERY_BADGES.W33_SPEED_MATCH_MASTER.id, 'Hub 2 Validation: W33 Speed Matcher badge unlocked');

  // 4. Hub 4 (Podcast Shadowing) Event Execution
  const hub4Result = evaluateMotivationEvent({
    learnerId: 'learner_m6',
    contentId: 'w33_podcast_shadowing',
    activityType: 'podcast_shadowing',
    scorePct: 80,
    persist: true
  });
  assert(hub4Result.badgeUnlocked.id === MASTERY_BADGES.W33_FLUENCY_MASTER.id, 'Hub 4 Validation: W33 Shadowing Vocalist badge unlocked at 80% fluency');

  // 5. Anti-Exploit Farming Guard Test (Duplicate / Non-improving retries)
  const exploitResult = evaluateMotivationEvent({
    learnerId: 'learner_m6',
    contentId: 'w33_cloze_story', // Already scored 100% in step 2
    activityType: 'reading_cloze',
    scorePct: 100,
    previousScorePct: 100
  });
  assert(exploitResult.antiExploitTriggered === true, 'Anti-Exploit Guard: Triggered on duplicate retry of completed 100% task');
  assert(exploitResult.xpEarned === 0, 'Anti-Exploit Guard: 0 additional XP awarded on duplicate retry');

  // 6. Mock Test Exclusion Test
  const mockResult = evaluateMotivationEvent({
    learnerId: 'learner_m6',
    contentId: 'w33_mock_01',
    activityType: 'mock_test',
    scorePct: 95
  });
  assert(mockResult.badgeUnlocked === null, 'Mock Exclusion: Zero badges unlocked on Mock Test');
  assert(mockResult.feedbackMessage.includes('Mock Test Section Completed'), 'Mock Exclusion: Minimal completion message displayed without noisy rewards');

  // 7. Persistence Journal Test
  const savedState = getLearnerMotivationState('learner_m6');
  assert(savedState.totalXP > 0, 'Persistence Journal: Total XP persisted correctly across sessions');
  assert(savedState.unlockedBadges.length === 3, 'Persistence Journal: 3 unlocked badges persisted in state');

  console.log(`\nMILESTONE 6 TEST SUMMARY: ${passedTests}/${totalTests} tests passed.\n`);
}

runMilestone6Tests();
