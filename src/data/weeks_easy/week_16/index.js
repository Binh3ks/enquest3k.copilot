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
  weekId: 16,
  weekTitle_en: "Sports Commentary",
  weekTitle_vi: "Bình luận thể thao",
  grammar_focus: "Present Continuous (am/is/are + verb-ing)",
  isEasy: true,
  
  global_vocab: vocab.vocab,

  voiceConfig: {
    narration: 'en-US-Neural2-H',  // → aura-stella-en (Female, bright, clear)
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',  // → aura-asteria-en (natural, expressive - matches advanced)
    shadowing: 'en-US-Neural2-F',  // → aura-asteria-en (natural, expressive - matches advanced)
    questions: 'en-US-Neural2-B',  // → aura-helios-en (Male, clean, clear - less deep than zeus)
    mindmap: 'en-US-Neural2-B',    // → aura-helios-en (Male, clean, clear)
    logic_science: 'en-US-Neural2-B'  // → aura-helios-en (Male, clean, clear)
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
