// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Easy Mode Index

import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic_science from './logic_science.js';
import singapore_math from './singapore_math.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import word_match from './word_match.js';
import { week33GamesEasy as games } from './games.js';

const weekData = {
  weekId: 33,
  isEasy: true,
  weekTitle_en: "The Mistake (Irregular Verbs 5)",
  weekTitle_vi: "Sai Lầm (Động Từ Bất Quy Tắc 5)",
  grammar_focus: "Past Simple Irregular Verbs 5: hit-hit, fell-fell, broke-broke, hurt-hurt, bit-bit, began-began, lost-lost, forgot-forgot",

  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Neural2-H',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    shadowing: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-B',
    mindmap: 'en-US-Neural2-B',
    logic_science: 'en-US-Neural2-B'
  },

  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: { logic_science, singapore_math },
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    game_hub: games
  }
};

export default weekData;
