import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic_lab from './logic_science.js';
import social_quiz from './social_quiz.js';
import singapore_math from './singapore_math.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import { week_37GamesAdvanced as games } from './games.js';

const weekData = {
  weekId: 37,
  isEasy: false,
  weekTitle_en: "The Sports Day Challenge",
  weekTitle_vi: "Thách Thức Ngày Hội Thể Thao",
  grammar_focus: "Past Simple & Adverbs of Manner (-ly)",

  chunk_focus: [...new Set([...(read.chunk_focus || []), ...(explore.chunk_focus || [])])],
  dictionary: { ...(read.dictionary || {}), ...(explore.dictionary || {}) },

  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Journey-F',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    shadowing: 'en-US-Journey-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D',
    logic_lab: 'en-US-Neural2-D'
  },

  stations: {
    read_explore: { read_stem: read.read_stem, read_social: read.read_social },
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: { logic_lab, singapore_math, social_quiz },
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch,
    game_hub: games
  }
};

export default weekData;
