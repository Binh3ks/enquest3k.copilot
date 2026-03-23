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
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';

const weekData = {
  weekId: 15,
  isEasy: false,
  weekTitle_en: "The Busy Park",
  weekTitle_vi: "Công viên Bận rộn",
  grammar_focus: "Present Continuous (S + am/is/are + V-ing)",
  global_vocab: vocab.vocab,
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',   // aura-orion-en (CLEAR: deep, authoritative male - excellent clarity)
    vocabulary: 'en-US-Neural2-F',  // aura-asteria-en (female, natural & expressive)
    dictation: 'en-US-Neural2-F',   // aura-asteria-en (natural, expressive)
    shadowing: 'en-US-Neural2-F',   // aura-asteria-en (natural, expressive)
    questions: 'en-US-Neural2-J',   // aura-zeus-en (male, energetic for questions - Ask AI/Logic Lab)
    mindmap: 'en-US-Neural2-F'      // aura-asteria-en (female, natural)
  },
  
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch
  }
};

export default weekData;
