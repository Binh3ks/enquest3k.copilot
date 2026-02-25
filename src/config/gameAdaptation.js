/**
 * Game Adaptation System - Weekly Content
 *
 * - GameHub uses week_XX/games.js
 * - AI Tutor FreeTalk uses legacy game templates
 */

import week1GamesAdvanced from '../data/weeks/week_01/games.js';
import week1GamesEasy from '../data/weeks_easy/week_01/games.js';
import week2GamesAdvanced from '../data/weeks/week_02/games.js';
import week2GamesEasy from '../data/weeks_easy/week_02/games.js';
import week3GamesAdvanced from '../data/weeks/week_03/games.js';
import week3GamesEasy from '../data/weeks_easy/week_03/games.js';
import week4GamesAdvanced from '../data/weeks/week_04/games.js';
import week4GamesEasy from '../data/weeks_easy/week_04/games.js';
import week5GamesAdvanced from '../data/weeks/week_05/games.js';
import week5GamesEasy from '../data/weeks_easy/week_05/games.js';
import week6GamesAdvanced from '../data/weeks/week_06/games.js';
import week6GamesEasy from '../data/weeks_easy/week_06/games.js';
import week7GamesAdvanced from '../data/weeks/week_07/games.js';
import week7GamesEasy from '../data/weeks_easy/week_07/games.js';
import { week1RealData } from '../data/weeks/week_01_real.js';
import { week2RealData } from '../data/weeks/week_02_real.js';
import { week3RealData } from '../data/weeks/week_03_real.js';
import week4RealData from '../data/weeks/week_04_real.js';
import week5RealData from '../data/weeks/week_05_real.js';
import week6RealData from '../data/weeks/week_06_real.js';
import week7RealData from '../data/weeks/week_07_real.js';

export const GAME_OPTIONS = [
  { id: 'word_chain', name_en: 'Word Chain' },
  { id: 'twenty_questions', name_en: '20 Questions' },
  { id: 'sentence_builder', name_en: 'Sentence Builder' }
];

export const GAME_TEMPLATES = {
  1: {
    theme: 'Identity & School',
    theme_vi: 'Danh tinh & Truong hoc',
    vocab: week1GamesAdvanced.vocabulary,
    vocab_easy: week1GamesEasy.vocabulary,
    vocab_advanced: week1GamesAdvanced.vocabulary,
    games: {
      word_chain: {
        name_en: 'Word Chain',
        name_vi: 'Noi tu',
        emoji: '🔗',
        starter_words: ['backpack', 'book', 'pen', 'desk'],
        instructions: 'Play Word Chain with classroom words. Use learned words only.',
        instructions_vi: 'Choi noi tu voi tu vung lop hoc. Dung tu da hoc.',
        example: 'Nova: "BOOK" → Student: "KEY" → Nova: "YES"'
      },
      twenty_questions: {
        name_en: '20 Questions',
        name_vi: 'Doan do vat',
        emoji: '❓',
        objects: ['backpack', 'book', 'pen', 'pencil', 'desk', 'chair'],
        instructions: 'I am thinking of something in the classroom. Ask yes/no questions to guess.',
        instructions_vi: 'Toi nghi den mot do vat trong lop hoc. Dat cau hoi co/khong de doan.',
        hints: ['Is it on the desk?', 'Do you write with it?', 'Do you sit on it?', 'Can you read it?']
      },
      sentence_builder: {
        name_en: 'Sentence Builder',
        name_vi: 'Xay cau',
        emoji: '🧩',
        patterns: [
          'This is my [noun].',
          'I have a [noun].',
          'Where is my [noun]?'
        ],
        instructions: 'Complete sentences about classroom objects.',
        instructions_vi: 'Hoan thanh cau ve do vat trong lop.',
        examples: [
          'This is my backpack.',
          'I have a book.',
          'Where is my pen?'
        ]
      }
    }
  }
};

const REAL_WEEK_DATA = {
  1: week1RealData,
  2: week2RealData,
  3: week3RealData,
  4: week4RealData,
  5: week5RealData,
  6: week6RealData,
  7: week7RealData
};

function extractVocabFromWeekData(weekData) {
  if (!weekData) return [];
  if (Array.isArray(weekData.vocabulary)) return weekData.vocabulary;
  if (Array.isArray(weekData.vocab)) return weekData.vocab;
  if (Array.isArray(weekData.target_vocab)) {
    return weekData.target_vocab
      .map((item) => item?.word)
      .filter(Boolean);
  }
  return [];
}

export function getGameData(weekNumber, learningMode = 'advanced', gameId) {
  const weekGamesMap = {
    1: { advanced: week1GamesAdvanced, easy: week1GamesEasy },
    2: { advanced: week2GamesAdvanced, easy: week2GamesEasy },
    3: { advanced: week3GamesAdvanced, easy: week3GamesEasy },
    4: { advanced: week4GamesAdvanced, easy: week4GamesEasy },
    5: { advanced: week5GamesAdvanced, easy: week5GamesEasy },
    6: { advanced: week6GamesAdvanced, easy: week6GamesEasy },
    7: { advanced: week7GamesAdvanced, easy: week7GamesEasy }
  };

  const weekGames = weekGamesMap[weekNumber]?.[learningMode];
  if (!weekGames) return null;
  if (!gameId) return weekGames;
  return weekGames[gameId] || null;
}

export function getGameContentForWeek(weekNumber, weekData) {
  const template = GAME_TEMPLATES[weekNumber] || GAME_TEMPLATES[1];
  const vocabFromWeekData = extractVocabFromWeekData(weekData);
  const theme = weekData?.week_title_en || weekData?.title || template.theme;
  const theme_vi = weekData?.week_title_vi || template.theme_vi;
  const vocab = vocabFromWeekData.length > 0 ? vocabFromWeekData : template.vocab;

  return {
    ...template,
    theme,
    theme_vi,
    vocab
  };
}

export function getCumulativeVocabulary(currentWeek, learningMode = 'advanced') {
  const vocab = [];
  for (let week = 1; week <= currentWeek; week++) {
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

export function getCumulativeNouns(currentWeek, learningMode = 'advanced') {
  const vocab = getCumulativeVocabulary(currentWeek, learningMode);
  const excluded = new Set([
    'am', 'is', 'are', 'was', 'were', 'be',
    'have', 'has', 'had', 'do', 'does', 'did',
    'look', 'discover', 'observe', 'like'
  ]);
  return vocab.filter((word) => !excluded.has(word.toLowerCase()));
}
