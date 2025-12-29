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
import mindmap from './mindmap.js';

const weekData = {
  weekId: 19,
  weekTitle_en: "Looking Back",
  weekTitle_vi: "Nhìn Lại Quá Khứ",
  grammar_focus: "Past Simple: was/were",
  global_vocab: vocab.vocab,
  // ⚠️ MANDATORY: voiceConfig for unique voices per week
  voiceConfig: {
    narration: 'en-US-Neural2-D',    // Male, authoritative for stories
    vocabulary: 'en-US-Neural2-F',   // Female, clear for vocab definitions
    dictation: 'en-US-Neural2-E',    // Neutral for dictation exercises
    questions: 'en-US-Neural2-D',    // Male for logic/ask_ai questions
    mindmap: 'en-US-Neural2-F'       // Female for mindmap branches
  },
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
