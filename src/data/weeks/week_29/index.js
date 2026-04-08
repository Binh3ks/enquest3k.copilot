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
  grammar_focus: "Past Simple Irregular Verbs 1: go→went, run→ran, come→came, fly→flew",
  global_vocab: vocab.vocab,
  voiceConfig: {
    narration: "nova",
    vocabulary: "nova",
    dictation: "echo",
    shadowing: "nova",
    questions: "nova",
    mindmap: "nova",
    logic_science: "nova"
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
