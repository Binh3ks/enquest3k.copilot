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
import { week29GamesAdvanced as games } from './games.js';

const weekData = {
  weekId: 29,
  isEasy: false,
  weekTitle_en: "Off We Go! (Irregular Verbs 1)",
  weekTitle_vi: "Xuất Phát Thôi! (Động Từ Bất Quy Tắc 1)",
  chunk_focus: [...new Set([...(read.chunk_focus || []), ...(explore?.chunk_focus || [])])],
  dictionary: { ...(read.dictionary || {}), ...(explore?.dictionary || {}) },
  grammar_focus: "Past Simple Irregular Verbs 1: go→went, run→ran, come→came, fly→flew",
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
    word_match,
    grammar,
    word_power,
    ask_ai,
    logic_lab: { logic_science, singapore_math },
    dictation,
    shadowing,
    writing,
    explore,
    mindmap_speaking: mindmap,
    daily_watch,
    game_hub: games
  }
};

export default weekData;
