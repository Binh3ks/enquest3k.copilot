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
import games from './games.js';

const weekData = {
  weekId: 18,
  isEasy: false,
  weekTitle_en: "Live from the School Festival",
  weekTitle_vi: "Tường Trực Từ Ngày Hội Trường",
  grammar_focus: "Present Continuous: I am reporting / She is filming / They are watching.",
  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Neural2-H',      // Narrator / Read — Male, deep, news anchor feel
    vocabulary: 'en-US-Neural2-F',     // Vocab words — Female, bright, clear
    dictation: 'en-US-Neural2-C',      // Dictation — Female, warm, distinct from vocab
    shadowing: 'en-US-Neural2-J',      // Shadowing — Male, higher tone, energetic
    questions: 'en-US-Neural2-B',      // Questions — Male, clean, authoritative
    mindmap: 'en-US-Neural2-E',        // Mindmap — Female, smooth, different from vocab
    logic_science: 'en-US-Neural2-D'   // Logic/Science — Male, measured, distinct
  },

  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    word_power: word_power,
    ask_ai: ask_ai,
    logic_lab: { logic_science, singapore_math },
    dictation: dictation,
    shadowing: shadowing,
    writing: writing,
    explore: explore,
    mindmap_speaking: mindmap,
    daily_watch: daily_watch,
    game_hub: games
  }
};

export default weekData;
