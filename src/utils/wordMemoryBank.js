/**
 * src/utils/wordMemoryBank.js — CRUD layer for SRS word bank (Sprint S1.2)
 *
 * Storage backend: localStorage (key = "engquest_word_bank")
 * Schema: { [word_id]: WordEntry }
 *
 * WordEntry {
 *   word_id:          string    — unique key: "w{week}_{word}" e.g. "w16_kick"
 *   user_id:          string    — currently browser-local; prepared for cloud sync
 *   word:             string    — display word or collocation phrase
 *   type:             'word' | 'collocation'  — determines review format
 *   week_number:      number    — originating week
 *   status:           'new' | 'learning' | 'reviewing' | 'mastered'
 *   correct_count:    number    — consecutive correct answers in 'reviewing' state
 *   last_seen:        string    — YYYY-MM-DD, date of last review attempt
 *   next_review_date: string | null — YYYY-MM-DD, null if mastered
 *   added_date:       string    — YYYY-MM-DD, when word was first added
 *   --- collocation-only fields ---
 *   cloze:            string    — fill-blank prompt e.g. "kick the ___ hard"
 *   answer:           string    — expected answer for the blank
 *   full_context:     string    — original unmodified collocation string
 * }
 *
 * All writes go through saveBank() so the in-memory cache stays consistent.
 */

import { STATUS, updateWordStatus, getDueWords, getVocabStats } from './srsEngine.js';

const LEGACY_STORAGE_KEY = 'engquest_word_bank';
let _activeUserId = null;
const _caches = new Map(); // Map<storageKey, bankObject>

/**
 * Set the currently active learner ID for Word Treasury.
 * @param {string|null} userId
 */
export function setActiveLearner(userId) {
  _activeUserId = userId;
}

/**
 * Resolve the current active learner ID from memory or persisted user storage.
 * @returns {string}
 */
export function resolveActiveUserId() {
  if (_activeUserId) return _activeUserId;
  try {
    if (typeof localStorage !== 'undefined') {
      const rawUser = localStorage.getItem('engquest-user-storage');
      if (rawUser) {
        const parsed = JSON.parse(rawUser)?.state?.currentUser;
        const uid = parsed?.id || parsed?.username;
        if (uid) return uid;
      }
    }
  } catch (_) {}
  return 'anonymous';
}

/**
 * Resolve storage key for a specific learner.
 * @param {string} [userId]
 * @returns {string} e.g. "engquest_word_bank_user123"
 */
export function resolveStorageKey(userId = null) {
  const uid = userId || resolveActiveUserId();
  return `engquest_word_bank_${uid}`;
}

// ─────────────────────────────────────────────────────────────
// Internal cache + persistence
// ─────────────────────────────────────────────────────────────

function loadBank(userId = null) {
  const key = resolveStorageKey(userId);
  if (_caches.has(key)) return _caches.get(key);

  let bank = {};
  try {
    if (typeof localStorage !== 'undefined') {
      let raw = localStorage.getItem(key);
      
      // Legacy Migration: If learner key is empty but legacy un-namespaced key exists
      if (!raw && key !== `engquest_word_bank_anonymous`) {
        const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyRaw) {
          raw = legacyRaw;
          localStorage.setItem(key, legacyRaw);
        }
      }

      bank = raw ? JSON.parse(raw) : {};
    }
  } catch (_) {
    bank = {};
  }

  _caches.set(key, bank);
  return bank;
}

function saveBank(bank, userId = null) {
  const key = resolveStorageKey(userId);
  _caches.set(key, bank);
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(bank));
    }
  } catch (_) {
    // Storage quota exceeded — fail silently, keep in-memory cache
  }
}

// ─────────────────────────────────────────────────────────────
// Word ID generation
// ─────────────────────────────────────────────────────────────

/**
 * Generate a stable word_id from week number and word string.
 * e.g. makeWordId(16, "kick the ball") → "w16_kick_the_ball"
 */
export function makeWordId(weekNumber, word) {
  const slug = word.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  return `w${weekNumber}_${slug}`;
}

// ─────────────────────────────────────────────────────────────
// CRUD operations
// ─────────────────────────────────────────────────────────────

/**
 * Add all vocab words from a week to the bank (status = "new").
 * Skips words that already exist — does not reset progress.
 *
 * @param {number} weekNumber
 * @param {Array<{word: string}>} vocabList — from vocab.js or word_power.js
 * @returns {number} count of newly added words
 */
export function addWeekWords(weekNumber, vocabList) {
  const bank = { ...loadBank() };
  const todayStr = new Date().toISOString().slice(0, 10);
  let added = 0;

  vocabList.forEach(item => {
    const wordText = item.word || '';
    if (!wordText) return;
    const id = makeWordId(weekNumber, wordText);
    const meaning = item.definition_vi || item.meaning_vi || item.definition_en || '';
    if (bank[id]) {
      // Backfill meaning for existing entries that were added before this field existed
      if (!bank[id].meaning && meaning) {
        bank[id] = { ...bank[id], meaning };
      }
      return;
    }

    bank[id] = {
      word_id: id,
      user_id: 'local',
      word: wordText,
      type: 'word',
      meaning,
      week_number: weekNumber,
      status: STATUS.NEW,
      correct_count: 0,
      last_seen: null,
      next_review_date: null,
      added_date: todayStr,
    };
    added++;
  });

  saveBank(bank);
  return added;
}

/**
 * Add Word Power collocations from a week to the SRS bank.
 * Each collocation becomes a fill-blank card (type: 'collocation').
 * Skips entries that already exist.
 *
 * Cloze strategy:
 *   1. If collocationText contains the base phrase → blank the phrase
 *      "kick the ball hard" + "kick the ball" → "___  hard", answer: "kick the ball"
 *   2. Otherwise → show definition_vi as prompt, answer: base phrase
 *
 * @param {number} weekNumber
 * @param {Array} wordPowerList — items from word_power.js words array
 * @returns {number} count of newly added collocation entries
 */
export function addWeekCollocations(weekNumber, wordPowerList) {
  const bank = { ...loadBank() };
  const todayStr = new Date().toISOString().slice(0, 10);
  let added = 0;

  wordPowerList.forEach(item => {
    const phrase = (item.word || '').trim();
    if (!phrase) return;

    const id = makeWordId(weekNumber, phrase + '_coll');
    if (bank[id]) return; // already seeded — don't overwrite progress

    const collocationText = (
      item.collocation_en || item.collocation ||
      item.model_sentence_en || item.model_sentence ||
      ''
    ).trim();
    if (!collocationText) return;

    // Build cloze: replace phrase inside collocationText with ___
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'i');
    let cloze, answer;
    if (regex.test(collocationText)) {
      cloze = collocationText.replace(regex, '___');
      answer = phrase;
    } else {
      // fallback: definition as prompt → produce the phrase
      cloze = item.definition_vi || item.definition_en || phrase;
      answer = phrase;
    }

    bank[id] = {
      word_id: id,
      user_id: 'local',
      word: phrase,
      type: 'collocation',
      cloze,
      answer,
      full_context: collocationText,
      meaning: item.definition_vi || item.definition_en || '',
      audio_url: item.audio_word || null,
      week_number: weekNumber,
      status: STATUS.NEW,
      correct_count: 0,
      last_seen: null,
      next_review_date: null,
      added_date: todayStr,
    };
    added++;
  });

  saveBank(bank);
  return added;
}

/**
 * Get a single word entry by id. Returns null if not found.
 * @param {string} wordId
 * @returns {Object|null}
 */
export function getWord(wordId) {
  const bank = loadBank();
  return bank[wordId] ?? null;
}

/**
 * Update a word entry after a review response.
 * @param {string} wordId
 * @param {boolean} isCorrect
 * @returns {Object|null} updated entry, or null if word not found
 */
export function recordReview(wordId, isCorrect) {
  const bank = { ...loadBank() };
  const entry = bank[wordId];
  if (!entry) return null;

  const updated = updateWordStatus(entry, isCorrect);
  bank[wordId] = updated;
  saveBank(bank);
  return updated;
}

/**
 * Get all word entries as an array.
 * @returns {Object[]}
 */
export function getAllWords() {
  return Object.values(loadBank());
}

/**
 * Get all word entries for a specific week.
 * @param {number} weekNumber
 * @returns {Object[]}
 */
export function getWordsByWeek(weekNumber) {
  return getAllWords().filter(e => e.week_number === weekNumber);
}

/**
 * Get words due for review today (max limit).
 * @param {number} [limit=10]
 * @returns {Object[]}
 */
export function getDueToday(limit = 10) {
  return getDueWords(getAllWords(), limit);
}

/**
 * Get vocab health stats across all words.
 * @returns {{ new, learning, reviewing, mastered, dueToday }}
 */
export function getBankStats() {
  return getVocabStats(getAllWords());
}

/**
 * Reset a specific word back to "new" (for debugging / admin use).
 * @param {string} wordId
 */
export function resetWord(wordId) {
  const bank = { ...loadBank() };
  if (!bank[wordId]) return;
  bank[wordId] = {
    ...bank[wordId],
    status: STATUS.NEW,
    correct_count: 0,
    last_seen: null,
    next_review_date: null,
  };
  saveBank(bank);
}

/**
 * Clear entire word bank for active or specified learner. USE ONLY for dev/testing.
 * @param {string} [userId]
 */
export function clearBank(userId = null) {
  const key = resolveStorageKey(userId);
  _caches.set(key, {});
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify({}));
    }
  } catch { /* ignore */ }
}

/**
 * Remove a specific word from the bank by wordId.
 * Used to clean up deprecated or removed vocabulary words.
 * @param {string} wordId — e.g. "w1_name"
 */
export function removeWord(wordId) {
  const bank = { ...loadBank() };
  if (!bank[wordId]) return;
  delete bank[wordId];
  saveBank(bank);
}

/**
 * Sync bank with current vocab list for a week:
 * adds new words, removes words no longer in the list.
 * @param {number} weekNumber
 * @param {Array<{word: string}>} vocabList — current vocab for that week
 */
export function syncWeekWords(weekNumber, vocabList) {
  addWeekWords(weekNumber, vocabList);
  const bank = { ...loadBank() };
  const currentIds = new Set(vocabList.map(item => makeWordId(weekNumber, item.word || '')));
  let changed = false;
  Object.keys(bank).forEach(id => {
    // Only remove word-type entries; collocations are managed by Word Power independently
    if (bank[id].week_number === weekNumber && bank[id].type !== 'collocation' && !currentIds.has(id)) {
      delete bank[id];
      changed = true;
    }
  });
  if (changed) saveBank(bank);
}
