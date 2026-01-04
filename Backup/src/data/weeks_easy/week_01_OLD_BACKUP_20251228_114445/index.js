import read from './read.js';
import vocab from './vocab.js';
import wordpower from './wordpower.js';
import grammar from './grammar.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import explore from './explore.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import logic from './logic.js';
import ask_ai from './ask_ai.js';
import word_match from './word_match.js';
import quiz from './quiz.js';
import writing from './writing.js';

export default {
  weekId: 1,
  weekTitle_en: "My School",
  weekTitle_vi: "Trường Học Của Tôi",
  stations: {
    read_explore: read,
    new_words: vocab,
    word_power: wordpower,
    grammar: grammar,
    dictation: dictation,
    shadowing: shadowing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch,
    logic_lab: logic,
    ask_ai: ask_ai,
    word_match: word_match,
    quiz: quiz,
    writing: writing
  }
};
