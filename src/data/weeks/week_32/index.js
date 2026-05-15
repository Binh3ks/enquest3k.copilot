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
import { week32GamesAdvanced as games } from './games.js';

const weekData = {
  weekId: 32,
  isEasy: false,
  weekTitle_en: "The Busy Day (Irregular Verbs 4)",
  weekTitle_vi: "Ngày Bận Rộn (Động Từ Bất Quy Tắc 4)",
  grammar_focus: "Past Simple Irregular Verbs 4: wake→woke, make→made, do→did, write→wrote, cut→cut, build→built, put→put, keep→kept, choose→chose, pay→paid",
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
