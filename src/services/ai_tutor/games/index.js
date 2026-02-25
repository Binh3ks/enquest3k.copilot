/**
 * Game Module Index - New GameHub
 */

export { validateShowTell, buildFrameRegexes } from './showTellLadder.js';
export { validateMakeSentence } from './makeSentence.js';
export { validateAskMeQuestion } from './askMe.js';

export const PRODUCTION_GAMES = [
  {
    id: 'show_tell',
    name_en: 'Show & Tell Ladder',
    name_vi: 'Bac thang noi',
    emoji: '🪜',
    phase: 'Week 1-156',
    complexity: 4,
    productionType: 'Word -> Phrase -> Sentence',
    intro: 'Say the word, add a detail, then make a sentence.',
    description: 'Production ladder with short, guided steps'
  },
  {
    id: 'make_sentence',
    name_en: 'Make a Sentence',
    name_vi: 'Xay cau',
    emoji: '🧩',
    phase: 'Week 1-156',
    complexity: 5,
    productionType: 'Sentence building',
    intro: 'Build a correct sentence using the weekly pattern.',
    description: 'Grammar-focused sentence construction'
  },
  {
    id: 'ask_me',
    name_en: 'Ask Me',
    name_vi: 'Hoi dap',
    emoji: '🎤',
    phase: 'Week 1-156',
    complexity: 5,
    productionType: 'Question formation',
    intro: 'Ask a question based on a short context.',
    description: 'Question practice with simple contexts'
  }
];
