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

const weekData = {
  weekId: 18,
  isEasy: true,
  weekTitle_en: "The Lost Dog",
  weekTitle_vi: "Chú Chó Đi Lạc",
  grammar_focus: "Narrative (Beginning, Middle, End)",
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
    daily_watch: daily_watch
  }
};
export default weekData;
