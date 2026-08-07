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
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import games from './games.js';

const weekData = {
  weekId: 21,
  isEasy: false,
  weekTitle_en: "Yesterday's Diary",
  weekTitle_vi: "Nhat Ky Hom Qua",
  chunk_focus: [...new Set([...(read.chunk_focus || []), ...(explore?.chunk_focus || [])])],
  dictionary: { ...(read.dictionary || {}), ...(explore?.dictionary || {}) },
  grammar_focus: "Past Simple Regular Verbs (-ed)",
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
    daily_watch: daily_watch,
    game_hub: games
  }
};

export default weekData;
