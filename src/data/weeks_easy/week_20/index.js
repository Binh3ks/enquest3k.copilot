// Assuming the easy mode also has restored files similar to the advanced one.
// I will read the easy mode index first to be sure.
import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import explore from './explore.js';
import word_power from './word_power.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import mindmap from './mindmap.js'; // 1. Import the mindmap data

const weekData = {
  weekId: 20,
  weekTitle_en: "The Old Town",
  weekTitle_vi: "Thị trấn Cũ",
  grammar_focus: "There was / There were",
  global_vocab: vocab.vocab,
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    video: writing,
    writing: writing,
    explore: explore,
    word_power: word_power,
    daily_watch: daily_watch,
    mindmap_speaking: mindmap 
  }
};
export default weekData;