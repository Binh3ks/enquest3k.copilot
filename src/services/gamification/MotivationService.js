/**
 * EngQuest3K Motivation & Gamification Layer (Milestone 6 Enhanced)
 * Provides an activity-specific, anti-exploit, persistent motivation engine.
 *
 * Pipeline: Learning Event -> Skill/Activity Context -> Reward Policy -> Motivation Event -> Persistence -> UI
 */

const STORAGE_MOTIVATION_STATE_KEY = 'engquest_learner_motivation_state_v1';

export const LEARNING_EVENTS = {
  TASK_COMPLETED: 'TASK_COMPLETED',
  SKILL_IMPROVED: 'SKILL_IMPROVED',
  SKILL_MASTERED: 'SKILL_MASTERED',
  MISSION_COMPLETED: 'MISSION_COMPLETED',
  REVIEW_MASTERED: 'REVIEW_MASTERED',
  STREAK_ACHIEVED: 'STREAK_ACHIEVED'
};

export const MASTERY_BADGES = {
  W33_CLOZE_MASTER: {
    id: 'badge_w33_cloze',
    title: 'W33 Cloze Master',
    description: 'Mastered Tom’s Clumsy Morning Open Cloze story with 100% accuracy',
    icon: '🏆',
    hub: 'Hub 1: World Discovery'
  },
  W33_SPEED_MATCH_MASTER: {
    id: 'badge_w33_speed_match',
    title: 'W33 Speed Matcher',
    description: 'Mastered Flash Arena speed vocab matching with >= 90% accuracy',
    icon: '⚡',
    hub: 'Hub 2: Arena Battles'
  },
  W33_FLUENCY_MASTER: {
    id: 'badge_w33_fluency',
    title: 'W33 Shadowing Vocalist',
    description: 'Mastered Podcast Shadowing fluency with >= 75% accuracy',
    icon: '🎙️',
    hub: 'Hub 4: Nova Talk Show'
  }
};

/**
 * Activity-Specific Reward Policies
 */
export const REWARD_POLICIES = {
  reading_cloze: {
    activityType: 'reading_cloze',
    hubName: 'Hub 1: World Discovery',
    masteryThreshold: 80,
    baseXP: 10,
    perfectBonusXP: 15,
    badge: MASTERY_BADGES.W33_CLOZE_MASTER
  },
  flash_arena: {
    activityType: 'flash_arena',
    hubName: 'Hub 2: Arena Battles',
    masteryThreshold: 90,
    baseXP: 15,
    perfectBonusXP: 20,
    badge: MASTERY_BADGES.W33_SPEED_MATCH_MASTER
  },
  podcast_shadowing: {
    activityType: 'podcast_shadowing',
    hubName: 'Hub 4: Nova Talk Show',
    masteryThreshold: 75,
    baseXP: 12,
    perfectBonusXP: 15,
    badge: MASTERY_BADGES.W33_FLUENCY_MASTER
  },
  mock_test: {
    activityType: 'mock_test',
    hubName: 'Assessment Unit',
    masteryThreshold: 100,
    baseXP: 5,
    perfectBonusXP: 0,
    badge: null // Mock tests strictly excluded from badges & noisy rewards
  }
};

/**
 * Helper: Resolve Activity Reward Policy from contentId / activityType
 */
export function resolveRewardPolicy(contentId = '', activityType = null) {
  if (activityType && REWARD_POLICIES[activityType]) {
    return REWARD_POLICIES[activityType];
  }
  const id = String(contentId).toLowerCase();

  if (id.includes('mock')) return REWARD_POLICIES.mock_test;
  if (id.includes('flash_arena') || id.includes('word_match')) return REWARD_POLICIES.flash_arena;
  if (id.includes('shadowing') || id.includes('podcast')) return REWARD_POLICIES.podcast_shadowing;
  return REWARD_POLICIES.reading_cloze;
}

/**
 * Persistent Motivation State Journal (localStorage)
 */
export function getLearnerMotivationState(learnerId = 'learner_default_01') {
  try {
    const raw = localStorage.getItem(STORAGE_MOTIVATION_STATE_KEY);
    if (raw) {
      const allState = JSON.parse(raw);
      if (allState[learnerId]) return allState[learnerId];
    }
  } catch (e) {
    console.error('Error reading motivation state', e);
  }

  return {
    learnerId,
    totalXP: 0,
    totalStars: 0,
    currentStreak: 0,
    unlockedBadges: [],
    attemptHistory: {}
  };
}

export function saveLearnerMotivationState(learnerId, state) {
  try {
    let allState = {};
    const raw = localStorage.getItem(STORAGE_MOTIVATION_STATE_KEY);
    if (raw) allState = JSON.parse(raw);
    allState[learnerId] = state;
    localStorage.setItem(STORAGE_MOTIVATION_STATE_KEY, JSON.stringify(allState));
  } catch (e) {
    console.error('Error saving motivation state', e);
  }
}

/**
 * Process a learning attempt result with Anti-Exploit Guard & Activity Reward Policies
 */
export function evaluateMotivationEvent({
  learnerId = 'learner_default_01',
  contentId = 'w33_task',
  activityType = null,
  scorePct = 0,
  previousScorePct = null,
  isRecheckDrill = false,
  currentStreak = 0,
  persist = false
}) {
  const policy = resolveRewardPolicy(contentId, activityType);
  const state = getLearnerMotivationState(learnerId);

  const highestPreviousScore = previousScorePct !== null 
    ? previousScorePct 
    : (state.attemptHistory[contentId] !== undefined ? state.attemptHistory[contentId] : null);

  const events = [];
  let xpEarned = 0;
  let starsEarned = 0;
  let badgeUnlocked = null;
  let newStreak = currentStreak || state.currentStreak || 0;
  let antiExploitTriggered = false;

  // Rule 1: No reward for meaningless clicks / 0% score
  if (scorePct <= 0) {
    return {
      events: [],
      xpEarned: 0,
      starsEarned: 0,
      newStreak: 0,
      badgeUnlocked: null,
      antiExploitTriggered: false,
      feedbackMessage: 'Keep going! Re-read the story hint and try again to earn XP.'
    };
  }

  // Rule 2: Anti-Exploit Farming Guard (Duplicate / Non-improving retries on completed tasks)
  if (highestPreviousScore !== null && highestPreviousScore >= policy.masteryThreshold && scorePct <= highestPreviousScore) {
    antiExploitTriggered = true;
    return {
      events: [LEARNING_EVENTS.TASK_COMPLETED],
      xpEarned: 0,
      starsEarned: 0,
      newStreak,
      badgeUnlocked: null,
      antiExploitTriggered: true,
      feedbackMessage: `Task already mastered (${highestPreviousScore}%)! Re-attempt recorded without extra XP farming.`
    };
  }

  // Base Event: TASK_COMPLETED (+baseXP)
  events.push(LEARNING_EVENTS.TASK_COMPLETED);
  xpEarned += policy.baseXP;

  // Calculate Stars & Perfect Bonus XP
  if (scorePct >= 100) {
    starsEarned = 3;
    xpEarned += (policy.perfectBonusXP || 15);
  } else if (scorePct >= 70) {
    starsEarned = 2;
  } else if (scorePct >= 40) {
    starsEarned = 1;
  }

  // Event: SKILL_IMPROVED (+15 Growth XP for score growth on retry)
  if (highestPreviousScore !== null && scorePct > highestPreviousScore) {
    events.push(LEARNING_EVENTS.SKILL_IMPROVED);
    xpEarned += 15;
  }

  // Event: SKILL_MASTERED & Badge Awarding (Only for non-mock activities)
  if (scorePct >= policy.masteryThreshold) {
    events.push(LEARNING_EVENTS.SKILL_MASTERED);
    xpEarned += 15;

    if (policy.badge && scorePct >= (policy.activityType === 'podcast_shadowing' ? 75 : policy.activityType === 'flash_arena' ? 90 : 100)) {
      const alreadyHasBadge = (state.unlockedBadges || []).includes(policy.badge.id);
      if (!alreadyHasBadge) {
        badgeUnlocked = policy.badge;
      }
    }
  }

  // Event: REVIEW_MASTERED
  if (isRecheckDrill && scorePct >= policy.masteryThreshold) {
    events.push(LEARNING_EVENTS.REVIEW_MASTERED);
    xpEarned += 15;
  }

  // Event: STREAK_ACHIEVED
  if (scorePct >= policy.masteryThreshold) {
    newStreak += 1;
    if (newStreak >= 3) {
      events.push(LEARNING_EVENTS.STREAK_ACHIEVED);
      xpEarned += 10;
    }
  } else if (scorePct < 50) {
    newStreak = 0;
  }

  // Mock Test Exclusions: Minimal completion feedback, ZERO badges
  if (policy.activityType === 'mock_test') {
    badgeUnlocked = null;
  }

  // Learner-Visible Narrative Feedback
  let feedbackMessage = `Great work! You earned +${xpEarned} XP and ${starsEarned} Star${starsEarned !== 1 ? 's' : ''}!`;
  if (policy.activityType === 'mock_test') {
    feedbackMessage = `Mock Test Section Completed (${scorePct}%). Diagnostic results saved to readiness estimate.`;
  } else if (events.includes(LEARNING_EVENTS.SKILL_IMPROVED)) {
    feedbackMessage = `Awesome growth! You improved your score to ${scorePct}% and earned +${xpEarned} Growth XP!`;
  } else if (badgeUnlocked) {
    feedbackMessage = `Mastery Unlocked! You earned the '${badgeUnlocked.title}' Badge in ${policy.hubName}!`;
  }

  // Update & Persist State if requested
  const updatedState = {
    ...state,
    totalXP: state.totalXP + xpEarned,
    totalStars: state.totalStars + starsEarned,
    currentStreak: newStreak,
    unlockedBadges: badgeUnlocked && !state.unlockedBadges.includes(badgeUnlocked.id)
      ? [...state.unlockedBadges, badgeUnlocked.id]
      : state.unlockedBadges,
    attemptHistory: {
      ...state.attemptHistory,
      [contentId]: Math.max(state.attemptHistory[contentId] || 0, scorePct)
    }
  };

  if (persist) {
    saveLearnerMotivationState(learnerId, updatedState);
  }

  return {
    events,
    xpEarned,
    starsEarned,
    newStreak,
    badgeUnlocked,
    antiExploitTriggered,
    feedbackMessage,
    persistentState: updatedState
  };
}

export default {
  LEARNING_EVENTS,
  MASTERY_BADGES,
  REWARD_POLICIES,
  resolveRewardPolicy,
  getLearnerMotivationState,
  saveLearnerMotivationState,
  evaluateMotivationEvent
};
