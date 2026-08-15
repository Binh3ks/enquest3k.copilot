/**
 * Embedded Leitner SRS (Spaced Repetition System) Engine
 * Manages vocabulary review boxes and contextual recall across Hubs 1-4.
 */

const SRS_STORAGE_KEY = 'engquest3k_srs_vocab_v1';

// Default Fallback SRS Review Words from Past Weeks (W30-W32)
const DEFAULT_PAST_SRS_WORDS = [
  { word: 'rescue', box: 1, week: 32, definition: 'cứu hộ / giải cứu', nextReview: 0 },
  { word: 'danger', box: 2, week: 31, definition: 'mối nguy hiểm', nextReview: 0 },
  { word: 'hospital', box: 1, week: 32, definition: 'bệnh viện', nextReview: 0 },
  { word: 'caution', box: 2, week: 30, definition: 'sự cẩn trọng', nextReview: 0 },
  { word: 'emergency', box: 1, week: 31, definition: 'tình huống khẩn cấp', nextReview: 0 }
];

class SRSService {
  constructor() {
    this.srsMap = this.loadSRSData();
  }

  loadSRSData() {
    try {
      const raw = localStorage.getItem(SRS_STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}

    // Initialize with default past SRS words if empty
    const initialMap = {};
    DEFAULT_PAST_SRS_WORDS.forEach((item) => {
      initialMap[item.word.toLowerCase()] = {
        ...item,
        lastReviewed: Date.now(),
        nextReview: Date.now() - 1000 // Ready for review
      };
    });
    return initialMap;
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
   * Returns due SRS review words from past weeks
   */
  getDueWords(count = 3) {
    const now = Date.now();
    const entries = Object.values(this.srsMap);
    const due = entries.filter((item) => item.nextReview <= now);

    if (due.length >= count) {
      return due.slice(0, count);
    }
    return DEFAULT_PAST_SRS_WORDS.slice(0, count);
  }

  /**
   * Records a review attempt on a word
   * Promotes to next box if correct, resets to Box 1 if incorrect
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

    let newBox = existing.box;
    if (isCorrect) {
      newBox = Math.min(3, existing.box + 1);
    } else {
      newBox = 1;
    }

    // Leitner intervals: Box 1 = 1 day (86400s), Box 2 = 3 days, Box 3 = 7 days
    const intervalsMs = {
      1: 1 * 24 * 3600 * 1000,
      2: 3 * 24 * 3600 * 1000,
      3: 7 * 24 * 3600 * 1000
    };

    this.srsMap[cleanWord] = {
      ...existing,
      box: newBox,
      lastReviewed: now,
      nextReview: now + intervalsMs[newBox]
    };

    this.saveSRSData();
    console.log(`[GAMIFICATION_SRS_DEBUG] SRS Service updated word: ${cleanWord} -> New Box Level: ${newBox}`);
  }

  /**
   * Generates a 70% Current Week + 30% Past SRS Review Words pool for Flash Arena (Hub 2)
   */
  getDynamicWordPool(currentWeekVocab = [], targetSize = 10) {
    if (!Array.isArray(currentWeekVocab) || currentWeekVocab.length === 0) {
      return currentWeekVocab;
    }

    const srsDue = this.getDueWords(3);
    const srsFormatted = srsDue.map((srsItem, idx) => ({
      id: `srs_due_${idx}`,
      word: srsItem.word,
      definition_en: `SRS Review: ${srsItem.word}`,
      definition_vi: srsItem.definition || 'từ ôn tập cũ',
      isSrsReview: true
    }));

    const currentCount = Math.max(1, targetSize - srsFormatted.length);
    const slicedCurrent = currentWeekVocab.slice(0, currentCount);

    return [...slicedCurrent, ...srsFormatted];
  }

  /**
   * Gets 2 SRS words to inject into Hub 3 Writing Scaffolding pills
   */
  getWritingContextualWords() {
    const due = this.getDueWords(2);
    return due.map((item) => item.word);
  }

  /**
   * Gets an SRS contextual prompt for Hub 4 Nova AI Talk Show
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
