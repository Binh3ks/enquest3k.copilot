/**
 * src/utils/srsEngine.js — Simplified SM-2 Spaced Repetition Engine (Sprint S1.2)
 *
 * Algorithm: Simplified SM-2
 * Word status lifecycle:
 *   new → learning → reviewing (×3 intervals) → mastered
 *   Any wrong answer → back to "learning" with 1-day interval
 *
 * All data lives in the wordMemoryBank (localStorage). This file
 * contains only pure computation — no side effects, no storage calls.
 */

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────

export const STATUS = {
  NEW: 'new',
  LEARNING: 'learning',
  REVIEWING: 'reviewing',
  MASTERED: 'mastered',
};

/**
 * Days until next review for each state transition.
 * reviewing_N: interval after Nth consecutive correct answer in "reviewing" state
 */
const INTERVALS = {
  learning_correct: 1,    // correct from "new"|"learning" → review in 1 day
  reviewing_1: 3,         // 1st correct in reviewing → 3 days
  reviewing_2: 7,         // 2nd correct in reviewing → 7 days
  reviewing_3: 14,        // 3rd correct → mastered (no scheduled review)
  mastered_wrong: 1,      // wrong after mastered → back to learning, 1 day
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

/**
 * Add N calendar days to a Date and return ISO date string (YYYY-MM-DD).
 * @param {Date} baseDate
 * @param {number} days
 * @returns {string}
 */
export function addDays(baseDate, days) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

/**
 * Today as YYYY-MM-DD string.
 * @returns {string}
 */
export function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Return true if a word's next_review_date is today or in the past.
 * @param {Object} wordEntry — entry from wordMemoryBank
 * @returns {boolean}
 */
export function isDueForReview(wordEntry) {
  if (wordEntry.status === STATUS.NEW) return true;
  if (wordEntry.status === STATUS.MASTERED) return false;
  if (!wordEntry.next_review_date) return true;
  return wordEntry.next_review_date <= today();
}

// ─────────────────────────────────────────────────────────────
// Core SM-2 transition
// ─────────────────────────────────────────────────────────────

/**
 * Compute the updated word entry after a review response.
 *
 * @param {Object} wordEntry — current state from wordMemoryBank
 * @param {boolean} isCorrect — whether user answered correctly
 * @returns {Object} — new word entry (does NOT mutate input)
 *
 * wordEntry shape:
 * {
 *   word_id:          string,
 *   status:           'new' | 'learning' | 'reviewing' | 'mastered',
 *   correct_count:    number,  // consecutive correct in "reviewing" state
 *   last_seen:        string,  // YYYY-MM-DD
 *   next_review_date: string | null,
 * }
 */
export function updateWordStatus(wordEntry, isCorrect) {
  const now = today();
  const base = { ...wordEntry, last_seen: now };

  if (!isCorrect) {
    // Any wrong answer → back to learning, review tomorrow
    return {
      ...base,
      status: STATUS.LEARNING,
      correct_count: 0,
      next_review_date: addDays(new Date(), INTERVALS.mastered_wrong),
    };
  }

  // --- Correct answer ---
  switch (base.status) {
    case STATUS.NEW:
    case STATUS.LEARNING: {
      return {
        ...base,
        status: STATUS.REVIEWING,
        correct_count: 1,
        next_review_date: addDays(new Date(), INTERVALS.learning_correct),
      };
    }

    case STATUS.REVIEWING: {
      const newCount = (base.correct_count || 0) + 1;
      if (newCount >= 3) {
        return {
          ...base,
          status: STATUS.MASTERED,
          correct_count: 3,
          next_review_date: null,
        };
      }
      const intervalKey = `reviewing_${newCount}`;
      const interval = INTERVALS[intervalKey] ?? 7;
      return {
        ...base,
        status: STATUS.REVIEWING,
        correct_count: newCount,
        next_review_date: addDays(new Date(), interval),
      };
    }

    case STATUS.MASTERED: {
      // Already mastered + correct again → stay mastered, no change
      return { ...base, status: STATUS.MASTERED, next_review_date: null };
    }

    default:
      return base;
  }
}

// ─────────────────────────────────────────────────────────────
// Session helpers
// ─────────────────────────────────────────────────────────────

/**
 * Filter a list of word entries to those due for review today.
 * Returns up to `limit` entries, prioritising "learning" over "reviewing".
 *
 * @param {Object[]} entries — array of word entries from wordMemoryBank
 * @param {number} [limit=10] — max words to return
 * @returns {Object[]}
 */
export function getDueWords(entries, limit = 10) {
  const due = entries.filter(isDueForReview);
  // Priority: learning first, then reviewing (oldest next_review_date first)
  due.sort((a, b) => {
    const priority = { [STATUS.LEARNING]: 0, [STATUS.NEW]: 1, [STATUS.REVIEWING]: 2 };
    const pa = priority[a.status] ?? 3;
    const pb = priority[b.status] ?? 3;
    if (pa !== pb) return pa - pb;
    return (a.next_review_date || '') < (b.next_review_date || '') ? -1 : 1;
  });
  return due.slice(0, limit);
}

/**
 * Compute summary stats for a list of word entries.
 *
 * @param {Object[]} entries
 * @returns {{ new: number, learning: number, reviewing: number, mastered: number, dueToday: number }}
 */
export function getVocabStats(entries) {
  const counts = { new: 0, learning: 0, reviewing: 0, mastered: 0, dueToday: 0 };
  entries.forEach(e => {
    counts[e.status] = (counts[e.status] || 0) + 1;
    if (isDueForReview(e)) counts.dueToday++;
  });
  return counts;
}
