/**
 * Embedded Leitner SRS (Spaced Repetition System) Engine v2
 * 5-Box Leitner system with daily warm-up support.
 *
 * Box 1: Review after 1 day   (New/Incorrect words)
 * Box 2: Review after 2 days  (1st correct)
 * Box 3: Review after 4 days  (2nd correct)
 * Box 4: Review after 7 days  (3rd correct)
 * Box 5: Review after 14 days (Mastered — 4th correct)
 *
 * Wrong answer at any box → reset to Box 1.
 */

const SRS_STORAGE_KEY = 'engquest3k_srs_vocab_v2';
const SRS_V1_KEY = 'engquest3k_srs_vocab_v1';
const SRS_DAILY_KEY = 'engquest3k_srs_daily_reviewed';

// Leitner 5-box intervals in milliseconds
const BOX_INTERVALS_MS = {
  1: 1 * 24 * 3600 * 1000,   // 1 day
  2: 2 * 24 * 3600 * 1000,   // 2 days
  3: 4 * 24 * 3600 * 1000,   // 4 days
  4: 7 * 24 * 3600 * 1000,   // 7 days
  5: 14 * 24 * 3600 * 1000,  // 14 days (mastered)
};

const MAX_BOX = 5;

import { PAST_WEEKS_SRS_VOCAB } from '../data/syllabus/past_weeks_srs_vocab';

// Default fallback SRS words for cold-start (derived from official syllabus)
const DEFAULT_PAST_SRS_WORDS = PAST_WEEKS_SRS_VOCAB.slice(0, 10);

class SRSService {
  constructor() {
    this.srsMap = this.loadSRSData();
    this.ensureSyllabusWords();
  }

  /**
   * Ensure syllabus words from W01-W32 are present in the SRS map.
   */
  ensureSyllabusWords() {
    let changed = false;
    PAST_WEEKS_SRS_VOCAB.forEach((item) => {
      const key = item.word.toLowerCase();
      if (!this.srsMap[key]) {
        this.srsMap[key] = {
          ...item,
          lastReviewed: Date.now() - (item.box * 86400000),
          nextReview: Date.now() - 1000 // Ready for review
        };
        changed = true;
      }
    });
    if (changed) {
      this.saveSRSData();
    }
  }

  /**
   * Load SRS data, migrating from v1 (3-box) to v2 (5-box) if needed.
   */
  loadSRSData() {
    let data = null;
    try {
      const raw = localStorage.getItem(SRS_STORAGE_KEY);
      if (raw) data = JSON.parse(raw);
    } catch (_) {}

    // Attempt v1 migration if v2 not found
    if (!data) {
      try {
        const v1Raw = localStorage.getItem(SRS_V1_KEY);
        if (v1Raw) {
          const v1Data = JSON.parse(v1Raw);
          const migrated = {};
          for (const [key, entry] of Object.entries(v1Data)) {
            const oldBox = entry.box || 1;
            const newBox = oldBox === 1 ? 1 : oldBox === 2 ? 3 : 5;
            migrated[key] = { ...entry, box: newBox };
          }
          localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(migrated));
          data = migrated;
        }
      } catch (_) {}
    }

    if (!data || Object.keys(data).length === 0) {
      data = {};
      PAST_WEEKS_SRS_VOCAB.forEach((item) => {
        data[item.word.toLowerCase()] = {
          ...item,
          lastReviewed: Date.now() - (item.box * 86400000),
          nextReview: Date.now() - 1000
        };
      });
    }

    return data;
  }

  saveSRSData() {
    try {
      localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(this.srsMap));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('engquest_progress_updated'));
      }
    } catch (_) {}
  }

  /**
   * Add a new word to Box 1 (or skip if already exists).
   * Called when student encounters new vocab in quests.
   */
  addNewWord(word, definition, weekLearned = 33) {
    if (!word) return;
    const cleanWord = word.toLowerCase().trim();
    if (this.srsMap[cleanWord]) return; // Already tracked

    const now = Date.now();
    this.srsMap[cleanWord] = {
      word: cleanWord,
      box: 1,
      week: weekLearned,
      definition: definition || '',
      lastReviewed: now,
      nextReview: now + BOX_INTERVALS_MS[1]
    };
    this.saveSRSData();
  }

  /**
   * Returns due SRS review words, prioritized by box (Box 1 first).
   * Prioritizes words learned in past weeks (W01–W32) for daily warm-up.
   * @param {number} count - max words to return
   * @param {number} currentWeek - current week number (defaults to 33)
   * @returns {Array} due word entries
   */
  getDueWords(count = 10, currentWeek = 33) {
    const now = Date.now();
    const entries = Object.values(this.srsMap);
    
    // Filter due words
    let due = entries.filter((item) => item.nextReview <= now);

    // Prefer past week words (week < currentWeek) for SRS review
    due.sort((a, b) => {
      // Prioritize Box 1 (urgent)
      if (a.box !== b.box) return a.box - b.box;
      // Then prioritize past weeks over current week
      const aIsPast = (a.week || 0) < currentWeek;
      const bIsPast = (b.week || 0) < currentWeek;
      if (aIsPast !== bIsPast) return aIsPast ? -1 : 1;
      // Then oldest nextReview
      return a.nextReview - b.nextReview;
    });

    if (due.length >= count) {
      return due.slice(0, count);
    }

    // If fewer due words than requested, top up with past syllabus words
    const seenWords = new Set(due.map(d => d.word.toLowerCase()));
    const pastCandidates = entries.filter(e => (e.week || 0) < currentWeek && !seenWords.has(e.word.toLowerCase()));
    
    // Sort candidates by lowest box, then oldest lastReviewed
    pastCandidates.sort((a, b) => {
      if (a.box !== b.box) return a.box - b.box;
      return (a.lastReviewed || 0) - (b.lastReviewed || 0);
    });

    const combined = [...due, ...pastCandidates.slice(0, count - due.length)];
    return combined.slice(0, count);
  }

  /**
   * Records a review attempt on a word.
   * Correct → promote to next box (max 5).
   * Incorrect → reset to Box 1.
   */
  recordReview(word, isCorrect) {
    if (!word) return;
    const cleanWord = word.toLowerCase().trim();
    const now = Date.now();

    const existing = this.srsMap[cleanWord] || {
      word: cleanWord,
      box: 1,
      week: 33,
      definition: 'vocab item',
      lastReviewed: now,
      nextReview: now
    };

    let newBox;
    if (isCorrect) {
      newBox = Math.min(MAX_BOX, existing.box + 1);
    } else {
      newBox = 1;
    }

    this.srsMap[cleanWord] = {
      ...existing,
      box: newBox,
      lastReviewed: now,
      nextReview: now + BOX_INTERVALS_MS[newBox]
    };

    this.saveSRSData();
  }

  /**
   * Get aggregate stats for the SRS dashboard / parent report.
   */
  getStats() {
    const entries = Object.values(this.srsMap);
    const now = Date.now();
    const stats = {
      totalWords: entries.length,
      masteredWords: entries.filter(e => e.box >= 5).length,
      dueNow: entries.filter(e => e.nextReview <= now).length,
      box1: entries.filter(e => e.box === 1).length,
      box2: entries.filter(e => e.box === 2).length,
      box3: entries.filter(e => e.box === 3).length,
      box4: entries.filter(e => e.box === 4).length,
      box5: entries.filter(e => e.box === 5).length,
    };
    return stats;
  }

  /**
   * Check if daily SRS warm-up has been completed today.
   */
  isDailyReviewDone() {
    try {
      const lastDate = localStorage.getItem(SRS_DAILY_KEY);
      const todayStr = new Date().toISOString().slice(0, 10);
      return lastDate === todayStr;
    } catch (_) {
      return false;
    }
  }

  /**
   * Mark daily SRS warm-up as completed for today.
   */
  markDailyReviewDone() {
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      localStorage.setItem(SRS_DAILY_KEY, todayStr);
    } catch (_) {}
  }

  /**
   * Generates a 70% Current Week + 30% Past SRS Review Words pool for Speed Match.
   */
  getDynamicWordPool(currentWeekVocab = [], targetSize = 10) {
    if (!Array.isArray(currentWeekVocab) || currentWeekVocab.length === 0) {
      return currentWeekVocab;
    }

    const normalizedCurrent = currentWeekVocab.map((item, idx) => ({
      id: item.id || `vocab_${idx}`,
      en: item.en || item.word || item.phrase || '',
      vi: item.vi || item.definition_vi || item.definition_en || item.definition || ''
    })).filter(item => item.en && item.vi);

    if (normalizedCurrent.length >= targetSize) {
      return normalizedCurrent.slice(0, targetSize);
    }

    const needed = targetSize - normalizedCurrent.length;
    const srsDue = this.getDueWords(needed);
    const srsFormatted = srsDue.map((srsItem, idx) => ({
      id: `srs_due_${idx}`,
      en: srsItem.word,
      vi: srsItem.definition || 'từ ôn tập cũ',
      isSrsReview: true
    }));

    return [...normalizedCurrent, ...srsFormatted].slice(0, targetSize);
  }

  /**
   * Gets 2 SRS words to inject into Writing Scaffolding pills.
   */
  getWritingContextualWords() {
    const due = this.getDueWords(2);
    return due.map((item) => item.word);
  }

  /**
   * Gets an SRS contextual prompt for Speaking quests.
   */
  getSpeakingContextualPrompt() {
    const due = this.getDueWords(1)[0] || DEFAULT_PAST_SRS_WORDS[0];
    return {
      srs_word: due.word,
      nova_question: `What a great story! Remember last week's word '${due.word}'? How can we stay safe and avoid danger at school?`
    };
  }
}

export const srsService = new SRSService();
export default srsService;
