/**
 * BADGES ENGINE (Phase 2B Standard)
 * ─────────────────────────────────────────────────────────────────────────────
 * Downstream reactive evaluator for learner achievements and badges.
 *
 * Rules:
 * 1. Strictly downstream consumer of Gamification Event Bus.
 * 2. 0 write access or reverse dependency into Learning Core.
 * 3. 0 XP generation (Badges are purely prestige achievements).
 * 4. Deterministic and idempotent: unlocking the same badge multiple times
 *    produces exactly 1 persistent entry in earnedBadges.
 */

import { BADGE_DEFINITIONS, getBadgeById } from '../data/badgeConfig.js';
import { gamificationEventBus, GAMIFICATION_EVENTS, emitLearningEvent } from './gamificationEventBus.js';

let badgeStoreRef = null;

/**
 * Register the user store instance or getter with Badge Engine
 * @param {Object} store - Zustand store instance or getter object
 */
export function registerBadgeStore(store) {
  badgeStoreRef = store;
}

function getActiveStore() {
  if (badgeStoreRef) return badgeStoreRef;
  if (typeof window !== 'undefined' && window.__engquestUserStore) {
    return window.__engquestUserStore;
  }
  return null;
}

export function getStreakData() {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('engquest_streak') : null;
    return raw ? JSON.parse(raw) : { days: 0, lastDate: null };
  } catch {
    return { days: 0, lastDate: null };
  }
}

/**
 * Pure evaluation function: determines which badges a learner qualifies for
 * given their current progress, streak, and shield state.
 *
 * @param {Object} params
 * @param {Array<string>} [params.currentBadges] - Currently earned badge IDs
 * @param {Object} [params.weekCompletion] - Map of weekId -> boolean (100% completion)
 * @param {Object} [params.progressCache] - Map of completed quest tasks
 * @param {Object} [params.highestShieldScores] - Cambridge highest shield scores
 * @param {Object} [params.streakData] - Current streak info { days, lastDate }
 * @returns {Array<string>} Array of all eligible badge IDs
 */
export function evaluateEligibleBadges({
  currentBadges = [],
  weekCompletion = {},
  progressCache = {},
  highestShieldScores = {},
  streakData = { days: 0 }
} = {}) {
  const eligible = new Set(currentBadges);

  // 1. First Quest: at least 1 completed quest across any week in progressCache
  const totalCompletedQuests = Object.values(progressCache).reduce((total, weekProgress) => {
    if (!weekProgress || typeof weekProgress !== 'object') return total;
    return total + Object.values(weekProgress).filter(Boolean).length;
  }, 0);
  if (totalCompletedQuests >= 1) {
    eligible.add('first_quest');
  }

  // 2. Week Completion Milestones
  const completedWeekCount = Object.entries(weekCompletion).filter(([_, isDone]) => Boolean(isDone)).length;
  if (completedWeekCount >= 1) eligible.add('first_week');
  if (completedWeekCount >= 5) eligible.add('five_weeks');
  if (completedWeekCount >= 10) eligible.add('ten_weeks');
  if (completedWeekCount >= 20) eligible.add('dedication');

  // 3. Perfect Week Milestone (at least 1 week with 15/15 quests completed)
  if (completedWeekCount >= 1) {
    eligible.add('perfect_week');
  }
  if (completedWeekCount >= 5) {
    eligible.add('champion');
  }

  // 4. Collections (Weeks 1-4, 5-8, 9-12)
  const isCol1Done = [1, 2, 3, 4].every(w => Boolean(weekCompletion[w] || weekCompletion[`week_${w}`] || weekCompletion[`week_${String(w).padStart(2, '0')}`]));
  if (isCol1Done) eligible.add('collection_1');

  const isCol2Done = [5, 6, 7, 8].every(w => Boolean(weekCompletion[w] || weekCompletion[`week_${w}`] || weekCompletion[`week_${String(w).padStart(2, '0')}`]));
  if (isCol2Done) eligible.add('collection_2');

  const isCol3Done = [9, 10, 11, 12].every(w => Boolean(weekCompletion[w] || weekCompletion[`week_${w}`] || weekCompletion[`week_${String(w).padStart(2, '0')}`]));
  if (isCol3Done) eligible.add('collection_3');

  // 5. Streak Habits
  const currentStreak = streakData?.days || 0;
  if (currentStreak >= 3) eligible.add('streak_3');
  if (currentStreak >= 7) eligible.add('streak_7');

  // 6. Cambridge Shield Mastery (at least one 5-shield score)
  const has5ShieldScore = Object.values(highestShieldScores).some(userScores => {
    if (!userScores || typeof userScores !== 'object') return false;
    return Object.values(userScores).some(scoreEntry => scoreEntry?.shields === 5 || scoreEntry === 5);
  });
  if (has5ShieldScore) eligible.add('shield_master');

  return Array.from(eligible);
}

/**
 * Checks learner state for newly unlocked badges, commits them idempotently to useUserStore,
 * and emits BADGE_UNLOCKED events.
 *
 * @param {Object} [overrideState] - Optional state for testing
 * @returns {Array<string>} Array of newly unlocked badge IDs
 */
export function checkAndUnlockBadges(overrideState = null) {
  const activeStore = getActiveStore();
  const storeState = overrideState || (activeStore && typeof activeStore.getState === 'function' ? activeStore.getState() : (activeStore || {}));
  const currentBadges = Array.isArray(storeState.earnedBadges) ? storeState.earnedBadges : [];
  const streak = getStreakData();

  const allEligible = evaluateEligibleBadges({
    currentBadges,
    weekCompletion: storeState.weekCompletion || {},
    progressCache: storeState.progressCache || {},
    highestShieldScores: storeState.highestShieldScores || {},
    streakData: streak
  });

  const newlyUnlocked = allEligible.filter(badgeId => !currentBadges.includes(badgeId));

  if (newlyUnlocked.length > 0) {
    const updatedBadges = [...currentBadges, ...newlyUnlocked];
    
    // Commit new badges to persistent user store
    if (!overrideState && activeStore && typeof activeStore.setState === 'function') {
      activeStore.setState({ earnedBadges: updatedBadges });
    }

    // Emit reactive event for UI celebrations/toasts
    newlyUnlocked.forEach(badgeId => {
      const badgeDef = getBadgeById(badgeId);
      emitLearningEvent(GAMIFICATION_EVENTS.BADGE_UNLOCKED, {
        badgeId,
        badge: badgeDef,
        timestamp: new Date().toISOString()
      });
    });
  }

  return newlyUnlocked;
}

let badgeListenersInitialized = false;

/**
 * Wire Badge Engine reactive listeners to Gamification Event Bus.
 */
export function initBadgeEngineListeners() {
  if (badgeListenersInitialized) return;
  badgeListenersInitialized = true;

  // React to learning task completion
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.LEARNING_TASK_COMPLETED, () => {
    checkAndUnlockBadges();
  });

  // React to daily quests completion
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.DAILY_QUESTS_COMPLETED, () => {
    checkAndUnlockBadges();
  });

  // React to Cambridge shield award
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.CAMBRIDGE_SHIELD_AWARDED, () => {
    checkAndUnlockBadges();
  });

  // React to full week completion
  gamificationEventBus.subscribe(GAMIFICATION_EVENTS.WEEK_COMPLETED, () => {
    checkAndUnlockBadges();
  });
}

// Auto-initialize listeners on module import
initBadgeEngineListeners();
