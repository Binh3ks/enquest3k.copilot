/**
 * GAMIFICATION CONFIGURATION & SINGLE SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 * Version: 1.0.0 (Phase 1C Standard)
 * Governs: Economy Constants, XP Transaction Identity, Streak Rules, Badge Triggers.
 *
 * Invariant: Game Layer is an observational subscriber to authoritative learning events.
 * It NEVER alters learning scores, answer keys, or Cambridge assessment mechanics.
 */

export const GAMIFICATION_SCHEMA_VERSION = "1.0.0";

// ─── REWARD CONSTANTS ─────────────────────────────────────────────────────────

export const DAILY_BONUS_XP = 25;       // Awarded once per day when all 3 daily quests complete
export const PERFECT_WEEK_XP = 50;      // Awarded once per week when all 15 quests complete
export const SHIELD_UNIT_XP = 15;       // Awarded per Cambridge Shield score unit gained (0..5)
export const DEFAULT_TASK_XP = 50;      // Fallback base XP for standard learning tasks

/**
 * Task Base XP lookup table matching canonical questSchedule.js.
 * For quests marked as milestones (Base XP = 0), XP is 0.
 */
export const TASK_BASE_XP_MAP = {
  gear1_webtoon: 0,      // Milestone (Day 1 Scene 1)
  gear2_karaoke: 0,      // Milestone (Day 1 Scene 2)
  gear3_retell: 50,      // Practice (Day 1 Story Retell)
  gear4_clil: 0,         // Milestone (Day 2 CLIL Article)
  science_lab: 50,       // Practice (Day 2 Action Lab)
  science_report: 50,    // Practice (Day 2 Discovery Report)
  word_blitz: 45,        // Practice (Day 3 Speed Match)
  sentence_smash: 50,    // Practice (Day 3 Grammar Duel)
  math_quest: 40,        // Practice (Day 3 Singapore Bar Model)
  story_writer: 50,      // Practice (Day 4 Story Writer P7)
  broadcast_studio: 0,   // Milestone (Day 4 Video Challenge)
  info_exchange: 20,     // Practice (Day 4 Speaking Info Exchange)
  boss_listening: 0,     // Assessment Shield Quest (Day 5 L1/L4)
  boss_reading: 0,       // Assessment Shield Quest (Day 5 L2/L5/R1)
  weekly_review: 0,      // Assessment Shield Quest (Day 5 L3/S1/Review)
};

// ─── STREAK CONSTANTS ─────────────────────────────────────────────────────────

export const STREAK_MAX_GAP_DAYS = 1; // 1 day gap allowed with active streak freeze

// ─── IDENTITY GENERATORS (CENTRALIZED CANONICAL IDENTIFIERS) ───────────────────

/**
 * Identifies a single execution attempt of a learning task.
 * Non-idempotent: each retry generates a distinct attemptId.
 */
export function generateAttemptId({ userId, weekNumber, taskId, timestamp = Date.now() }) {
  const uid = userId || 'anonymous';
  const wk = weekNumber || 0;
  const tid = taskId || 'unknown';
  return `att_${uid}_w${wk}_${tid}_${timestamp}`;
}

/**
 * Identifies the authoritative completion state of a task for a given week.
 * Idempotent: same task completed multiple times maps to the same completionId.
 */
export function generateCompletionId({ userId, weekNumber, taskId }) {
  const uid = userId || 'anonymous';
  const wk = weekNumber || 0;
  const tid = taskId || 'unknown';
  return `comp_${uid}_w${wk}_${tid}`;
}

/**
 * Identifies the economic reward transaction for a task, daily bonus, or perfect week.
 * Strictly Idempotent: must be checked in claimedTransactions[userId][txKey] before awarding.
 */
export function generateXPTransactionId({ userId, weekNumber, taskId, type = 'task', dayNumber = null }) {
  const uid = userId || 'anonymous';
  const wk = weekNumber || 0;

  if (type === 'daily_bonus' && dayNumber !== null) {
    return `tx_daily_${uid}_w${wk}_d${dayNumber}`;
  }
  if (type === 'perfect_week') {
    return `tx_perfect_${uid}_w${wk}`;
  }
  const tid = taskId || 'unknown';
  return `tx_task_${uid}_w${wk}_${tid}`;
}

/**
 * Identifies the score state for a specific Cambridge Shield part in a given week.
 */
export function generateShieldScoreId({ userId, weekNumber, shieldPart }) {
  const uid = userId || 'anonymous';
  const wk = weekNumber || 0;
  const sp = shieldPart || 'unknown';
  return `shield_${uid}_w${wk}_${sp}`;
}

// ─── LOCAL DATE HELPER (TIMEZONE SAFE) ─────────────────────────────────────────

/**
 * Returns current or given date formatted as 'YYYY-MM-DD' in learner's local timezone.
 * Avoids UTC rollover bugs.
 */
export function getLocalDateString(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Calculates theoretical maximum weekly standard XP for a given quest schedule.
 */
export function calculateWeeklyStandardXPCap(taskXpMap = TASK_BASE_XP_MAP, dailyBonus = DAILY_BONUS_XP) {
  const baseTotal = Object.values(taskXpMap).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
  const dailyBonusTotal = 5 * dailyBonus;
  return baseTotal + dailyBonusTotal; // 355 + 125 = 480
}
