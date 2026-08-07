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
  weekId: 21,
  weekTitle_en: "Yesterday's Diary",
  weekTitle_vi: "Nhật Ký Hôm Qua",
  chunk_focus: [...new Set([...(read.chunk_focus || []), ...(explore?.chunk_focus || [])])],
  dictionary: { ...(read.dictionary || {}), ...(explore?.dictionary || {}) },
  grammar_focus: "Past Simple Regular Verbs (verb-ed)",
  isEasy: true,

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
