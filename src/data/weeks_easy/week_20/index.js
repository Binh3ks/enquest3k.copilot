import read from './read.js';
import explore from './explore.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import ask_ai from './ask_ai.js';
import daily_watch from './daily_watch.js';
import logic_science from './logic_science.js';
import singapore_math from './singapore_math.js';
import games from './games.js';

const weekData = {
  weekId: 20,
  weekTitle_en: "The Old Town Mystery",
  weekTitle_vi: "Bí Ẩn Thị Trấn Cũ",
  chunk_focus: [...new Set([...(read.chunk_focus || []), ...(explore?.chunk_focus || [])])],
  dictionary: { ...(read.dictionary || {}), ...(explore?.dictionary || {}) },
  grammar_focus: "There was / There were (Past Existence)",
  isEasy: true,

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
    mindmap_speaking: mindmap,
    ask_ai: ask_ai,
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    logic_lab: { logic_science, singapore_math },
    word_power: word_power,
    daily_watch: daily_watch,
    explore: explore,
    game_hub: games
  }
};

export default weekData;
