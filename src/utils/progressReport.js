/**
 * progressReport.js — Generate weekly report data for Parent Dashboard
 * Sources: localStorage (SRS bank, adaptive state, checkpoint results, writing history)
 */

import { getBankStats, getAllWords } from './wordMemoryBank.js';
import { getAdaptiveState } from './adaptiveEngine.js';
import { getWeekCEFR } from '../data/weekData.js';
import { useUserStore } from '../stores/useUserStore.js';
import { getLocalDateString } from '../config/gamificationConfig.js';

/**
 * getWeeklyReport(weekNumber)
 * Returns a structured report for the given week.
 */
export function getWeeklyReport(weekNumber) {
  const srsStats = getSRSStats();
  const adaptiveState = getAdaptiveState();
  const checkpointHistory = getCheckpointHistory();
  const writingHistory = getWritingHistory(weekNumber);
  const cefrInfo = getWeekCEFR(weekNumber);
  const streakDays = getStreakDays();

  return {
    weekNumber,
    generatedAt: new Date().toISOString(),
    cefr: cefrInfo.cefr,
    cambridge: cefrInfo.cambridge,
    nextMilestone: cefrInfo.nextMilestone,

    // Vocab health
    vocab: {
      total: srsStats.total,
      mastered: srsStats.mastered,
      reviewing: srsStats.reviewing,
      learning: srsStats.learning,
      atRisk: srsStats.learning,  // learning = needs more practice
      masteryPercent: srsStats.total > 0
        ? Math.round((srsStats.mastered / srsStats.total) * 100)
        : 0,
      weakWords: getWeakWords(),
    },

    // Streak
    streak: {
      days: streakDays,
      speakingStreak: adaptiveState.speakingStreakDays || 0,
    },

    // Writing scores (last 4 entries)
    writing: {
      recentScores: writingHistory.map(h => ({
        weekNumber: h.weekNumber || weekNumber,
        total: h.total,
        maxTotal: h.maxTotal || 12,
        tier: h.tier,
        date: h.savedAt,
      })).slice(-4),
      averageScore: writingHistory.length > 0
        ? Math.round(writingHistory.reduce((s, h) => s + (h.total || 0), 0) / writingHistory.length)
        : null,
    },

    // Adaptive flags
    adaptive: {
      showWordWorkout: adaptiveState.showWordWorkout,
      unlockChallengeGrammar: adaptiveState.unlockChallengeGrammar,
      needsWritingSupport: adaptiveState.needsWritingSupport,
      unlockAdvancedLogic: adaptiveState.unlockAdvancedLogic,
      showSpeakingNudge: adaptiveState.showSpeakingNudge,
    },

    // Checkpoint history
    checkpoints: checkpointHistory,

    // Next checkpoint
    nextCheckpoint: [14, 26, 36, 54].find(w => w > weekNumber) || null,
  };
}

// ─── Sub-helpers ──────────────────────────────────────────────────────────

function getSRSStats() {
  try {
    return getBankStats();
  } catch {
    return { total: 0, mastered: 0, reviewing: 0, learning: 0, new: 0 };
  }
}

/**
 * Get the top 5 weakest words (status = 'learning', sorted by fewest correct answers).
 * Returns array of { word, meaning, week_number } for display in Parent Dashboard.
 */
function getWeakWords() {
  try {
    return getAllWords()
      .filter(w => w.status === 'learning')
      .sort((a, b) => (a.correct_count || 0) - (b.correct_count || 0))
      .slice(0, 5)
      .map(w => ({ word: w.word, meaning: w.meaning || '', week: w.week_number }));
  } catch {
    return [];
  }
}

function getCheckpointHistory() {
  return [14, 26, 36, 54]
    .map(w => {
      try {
        const raw = localStorage.getItem(`checkpoint_w${w}`);
        if (!raw) return null;
        const data = JSON.parse(raw);
        return {
          week: w,
          passed: data.passed,
          completedAt: data.completedAt,
          failedSessions: data.results?.filter(r => !r.passed).map(r => r.session) || [],
        };
      } catch { return null; }
    })
    .filter(Boolean);
}

function getWritingHistory(weekNumber) {
  try {
    // Writing history is stored per-week in the station progress system
    const raw = localStorage.getItem(`station_progress_${weekNumber}_writing`);
    if (!raw) return [];
    const data = JSON.parse(raw);
    return data.writingHistory || [];
  } catch { return []; }
}

function getStreakDays() {
  try {
    const raw = localStorage.getItem('engquest_streak');
    if (!raw) return 0;
    const { days, lastDate } = JSON.parse(raw);
    const today = getLocalDateString();
    const yesterday = getLocalDateString(new Date(Date.now() - 86400000));
    if (lastDate === today || lastDate === yesterday) return days || 0;
    return 0;
  } catch { return 0; }
}

/**
 * recordAuthoritativeStreak() — Called strictly upon authoritative learning task completion.
 * Never called on app mount.
 * @param {Object} params
 * @param {Date|string} params.date - Event date (defaults to now)
 * @param {boolean} params.streakFreezeActive - Whether learner has an active streak freeze
 * @param {Function} params.onFreezeConsumed - Callback if a freeze was consumed
 * @returns {number} Current streak days
 */
export function recordAuthoritativeStreak({ date = new Date(), streakFreezeActive = false, onFreezeConsumed = null } = {}) {
  try {
    const today = getLocalDateString(date);
    const yesterday = getLocalDateString(new Date(new Date(today).getTime() - 86400000));
    const twoDaysAgo = getLocalDateString(new Date(new Date(today).getTime() - 172800000));

    const raw = localStorage.getItem('engquest_streak');
    const prev = raw ? JSON.parse(raw) : { days: 0, lastDate: null };

    // Same day: streak unchanged
    if (prev.lastDate === today) {
      return prev.days || 1;
    }

    // Exactly consecutive day
    if (prev.lastDate === yesterday) {
      const newDays = (prev.days || 0) + 1;
      localStorage.setItem('engquest_streak', JSON.stringify({ days: newDays, lastDate: today }));
      return newDays;
    }

    // Missed exactly 1 day: check streak freeze
    if (prev.lastDate === twoDaysAgo && streakFreezeActive) {
      const preservedDays = prev.days || 1;
      localStorage.setItem('engquest_streak', JSON.stringify({ days: preservedDays, lastDate: today, freezeUsedOn: today }));
      if (typeof onFreezeConsumed === 'function') {
        onFreezeConsumed();
      }
      return preservedDays;
    }

    // Missed 2+ days or fresh start
    const newDays = 1;
    localStorage.setItem('engquest_streak', JSON.stringify({ days: newDays, lastDate: today }));
    return newDays;
  } catch {
    return 1;
  }
}

/**
 * Legacy alias for backwards compatibility during migration.
 * @deprecated Use recordAuthoritativeStreak triggered via EventBus.
 */
export function recordDailyStreak() {
  return recordAuthoritativeStreak();
}

/**
 * STREAK_MILESTONES — Ordered list of milestone thresholds.
 * Each milestone fires once (tracked in localStorage 'engquest_streak_milestones').
 */
export const STREAK_MILESTONES = [
  { days: 7,   badge: 'streak_7d',   label: '🔥 7-Day Streak!',   xpBonus: 75,  rareCard: false },
  { days: 30,  badge: 'streak_30d',  label: '🏆 30-Day Streak!',  xpBonus: 200, rareCard: true  },
  { days: 100, badge: 'streak_100d', label: '💎 100-Day Legend!', xpBonus: 500, rareCard: true  },
  { days: 365, badge: 'streak_365d', label: '👑 365-Day Champion!',xpBonus: 2000,rareCard: true  },
];

/**
 * checkStreakMilestone(currentDays)
 * Returns the milestone object if this streak count crosses a NEW milestone threshold,
 * or null if no milestone applies (already claimed, or not at a threshold).
 *
 * Callers must persist the reward (XP, badge) themselves via useUserStore.awardIdempotentXP.
 * This function only detects and marks the milestone as seen.
 *
 * @param {number} currentDays - Current streak day count after recording today
 * @returns {{ days, badge, label, xpBonus, rareCard } | null}
 */
export function checkStreakMilestone(currentDays) {
  try {
    const raw = localStorage.getItem('engquest_streak_milestones');
    const claimed = raw ? JSON.parse(raw) : [];

    const milestone = STREAK_MILESTONES.find(
      (m) => currentDays >= m.days && !claimed.includes(m.badge)
    );
    if (!milestone) return null;

    // Mark as claimed immediately to prevent double-firing
    localStorage.setItem(
      'engquest_streak_milestones',
      JSON.stringify([...claimed, milestone.badge])
    );
    return milestone;
  } catch {
    return null;
  }
}

/**
 * isStreakAtRisk()
 * Returns { atRisk: boolean, hoursLeft: number, streakDays: number }
 * "At risk" = learner has an active streak (>0 days), has NOT studied today,
 * and it is past 20:00 local time (less than 4 hours to midnight).
 */
export function isStreakAtRisk() {
  try {
    const raw = localStorage.getItem('engquest_streak');
    if (!raw) return { atRisk: false, hoursLeft: 0, streakDays: 0 };

    const { days, lastDate } = JSON.parse(raw);
    if (!days || days < 2) return { atRisk: false, hoursLeft: 0, streakDays: days || 0 };

    const today = getLocalDateString();
    if (lastDate === today) return { atRisk: false, hoursLeft: 0, streakDays: days }; // already studied

    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const hoursLeft = (midnight - now) / 3600000;

    // At risk if streak > 0, hasn't studied today, and < 4h to midnight
    const atRisk = hoursLeft < 4;
    return { atRisk, hoursLeft: Math.round(hoursLeft * 10) / 10, streakDays: days };
  } catch {
    return { atRisk: false, hoursLeft: 0, streakDays: 0 };
  }
}


/**
 * buildStudentContext(weekId)
 * Returns a concise student-profile string to inject into every Nova system prompt.
 * Called by aiRouter.js — keeps personalisation in one place.
 */
export function buildStudentContext(weekId) {
  try {
    const { currentUser, learningMode } = useUserStore.getState();
    const name = currentUser?.display_name || currentUser?.username || 'the student';
    const stats = getBankStats();
    const masteryPct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
    const weak = getWeakWords();
    const weakList = weak.length > 0 ? weak.map(w => w.word).join(', ') : null;
    const adaptive = getAdaptiveState();
    const streak = getStreakDays();

    // Writing average for this week
    let avgWriting = null;
    try {
      const raw = localStorage.getItem(`station_progress_${weekId}_writing`);
      if (raw) {
        const hist = JSON.parse(raw).writingHistory || [];
        if (hist.length > 0) {
          avgWriting = Math.round(hist.reduce((s, h) => s + (h.total || 0), 0) / hist.length);
        }
      }
    } catch { /* ignore */ }

    const lines = [
      '--- STUDENT PROFILE (personalise Nova\'s tone and content to this child) ---',
      `Student name: ${name}`,
      `Current week: ${weekId} | Difficulty mode: ${learningMode === 'easy' ? 'Easy (more support needed)' : 'Advanced'}`,
      `Vocabulary bank: ${stats.mastered} mastered · ${stats.reviewing} reviewing · ${stats.learning} still learning (${masteryPct}% mastery)`,
    ];
    if (weakList) lines.push(`Weak vocabulary to reinforce naturally in conversation: ${weakList}`);
    if (avgWriting !== null) lines.push(`Average writing score: ${avgWriting}/12`);
    if (adaptive.needsWritingSupport) lines.push('Writing note: student struggles with writing — offer extra scaffolding and encouragement');
    if (adaptive.showSpeakingNudge) lines.push('Speaking note: student needs more speaking practice — actively encourage speaking responses');
    if (adaptive.unlockChallengeGrammar) lines.push('Grammar note: student has mastered core grammar — you may introduce slightly more complex structures');
    if (streak >= 3) lines.push(`Motivational note: student has a ${streak}-day streak — acknowledge this`);
    lines.push('Adjust your vocabulary level, sentence length, praise frequency, and hints based on this profile.');
    lines.push('--- END STUDENT PROFILE ---');

    return lines.join('\n');
  } catch {
    return '';
  }
}
