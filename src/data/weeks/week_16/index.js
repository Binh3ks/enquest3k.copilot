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
  weekId: 16,
  isEasy: false,
  weekTitle_en: "Sports Commentary",
  weekTitle_vi: "Bình luận Thể thao",
  grammar_focus: "Present Continuous (is/are + verb-ing)",
  global_vocab: vocab.vocab,
  
  voiceConfig: {
    narration: 'en-US-Neural2-H',  // → aura-stella-en (Female, bright, clear)
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',  // → aura-asteria-en (natural, expressive)
    shadowing: 'en-US-Neural2-F',  // → aura-asteria-en (natural, expressive)
    questions: 'en-US-Neural2-J',  // → aura-zeus-en (Male, energetic, clear)
    mindmap: 'en-US-Neural2-J',    // → aura-zeus-en (Male, energetic, clear)
    logic_science: 'en-US-Neural2-J'  // → aura-zeus-en (Male, energetic, clear)
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
