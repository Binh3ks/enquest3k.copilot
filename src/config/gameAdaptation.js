/**
 * Game Adaptation System — W33+ Only
 *
 * W01-32 removed. Archive tag: v1-w01-w32-final-20260820
 * GameHub uses week_XX/games.js (loaded via loadWeekData)
 * AI Tutor FreeTalk uses getCumulativeNouns / getCumulativeVocabulary
 */

import { week33GamesAdvanced } from '../data/weeks/week_33/games.js';
import { week34GamesAdvanced } from '../data/weeks/week_34/games.js';
import { week35GamesAdvanced } from '../data/weeks/week_35/games.js';
import { week36GamesAdvanced } from '../data/weeks/week_36/games.js';
import { week37GamesAdvanced } from '../data/weeks/week_37/games.js';

// W33-35 easy variants have games.js; W36-37 easy do not — fallback to advanced
import { week33GamesEasy } from '../data/weeks_easy/week_33/games.js';
import { week34GamesEasy } from '../data/weeks_easy/week_34/games.js';
import { week35GamesEasy } from '../data/weeks_easy/week_35/games.js';

import week33RealData from '../data/weeks/week_33/week_33_real.js';
import week34RealData from '../data/weeks/week_34/week_34_real.js';
import week35RealData from '../data/weeks/week_35/week_35_real.js';
import week36RealData from '../data/weeks/week_36/week_36_real.js';
import week37RealData from '../data/weeks/week_37/week_37_real.js';

// ─── Constants ──────────────────────────────────────────────────────────────

export const GAME_OPTIONS = [
  { id: 'word_chain',        name_en: 'Word Chain' },
  { id: 'twenty_questions',  name_en: '20 Questions' },
  { id: 'sentence_builder',  name_en: 'Sentence Builder' }
];

// W33+ uses dynamic game data from games.js per week.
// GAME_TEMPLATES kept as a minimal fallback for any legacy callers.
export const GAME_TEMPLATES = {};

// ─── Internal maps ──────────────────────────────────────────────────────────

const WEEK_GAMES_MAP = {
  33: { advanced: week33GamesAdvanced, easy: week33GamesEasy },
  34: { advanced: week34GamesAdvanced, easy: week34GamesEasy },
  35: { advanced: week35GamesAdvanced, easy: week35GamesEasy },
  36: { advanced: week36GamesAdvanced, easy: week36GamesAdvanced }, // no easy games.js
  37: { advanced: week37GamesAdvanced, easy: week37GamesAdvanced }, // no easy games.js
};

const REAL_WEEK_DATA = {
  33: week33RealData,
  34: week34RealData,
  35: week35RealData,
  36: week36RealData,
  37: week37RealData,
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractVocabFromWeekData(weekData) {
  if (!weekData) return [];
  if (Array.isArray(weekData.vocabulary))   return weekData.vocabulary;
  if (Array.isArray(weekData.vocab))         return weekData.vocab;
  if (Array.isArray(weekData.target_vocab)) {
    return weekData.target_vocab.map((item) => item?.word).filter(Boolean);
  }
  return [];
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Returns game data for a given week.
 * W33+ only. Returns null for any weekNumber < 33.
 */
export function getGameData(weekNumber, learningMode = 'advanced', gameId) {
  const weekEntry = WEEK_GAMES_MAP[weekNumber];
  if (!weekEntry) return null;
  const weekGames = weekEntry[learningMode] ?? weekEntry.advanced;
  if (!weekGames) return null;
  if (!gameId) return weekGames;
  return weekGames[gameId] || null;
}

/**
 * Returns enriched game content for a week, merging live week data with template.
 * Falls back gracefully when GAME_TEMPLATES entry is absent (W33+ default).
 */
export function getGameContentForWeek(weekNumber, weekData) {
  const template = GAME_TEMPLATES[weekNumber] || {};
  const vocabFromWeekData = extractVocabFromWeekData(weekData);
  const theme    = weekData?.week_title_en || weekData?.title    || template.theme    || '';
  const theme_vi = weekData?.week_title_vi || template.theme_vi || '';
  const vocab    = vocabFromWeekData.length > 0 ? vocabFromWeekData : (template.vocab || []);

  return { ...template, theme, theme_vi, vocab };
}

/**
 * Returns cumulative unique vocabulary from W33 up to currentWeek.
 * W33+ only — W01-32 data no longer available.
 */
export function getCumulativeVocabulary(currentWeek, learningMode = 'advanced') {
  const vocab = [];
  const startWeek = Math.max(33, 33); // W33 is the floor
  for (let week = startWeek; week <= currentWeek; week++) {
    const weekGames = getGameData(week, learningMode);
    if (weekGames?.vocabulary) {
      vocab.push(...weekGames.vocabulary);
      continue;
    }
    const realWeekData = REAL_WEEK_DATA[week];
    vocab.push(...extractVocabFromWeekData(realWeekData));
  }
  return [...new Set(vocab)];
}

/**
 * Returns cumulative vocabulary filtered to content words (removes aux verbs, etc.)
 */
export function getCumulativeNouns(currentWeek, learningMode = 'advanced') {
  const vocab    = getCumulativeVocabulary(currentWeek, learningMode);
  const excluded = new Set([
    'am', 'is', 'are', 'was', 'were', 'be',
    'have', 'has', 'had', 'do', 'does', 'did',
    'look', 'discover', 'observe', 'like'
  ]);
  return vocab.filter((word) => !excluded.has(word.toLowerCase()));
}
