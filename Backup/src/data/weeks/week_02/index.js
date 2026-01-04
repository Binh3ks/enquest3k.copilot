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
  weekId: 2,
  isEasy: false,
  weekTitle_en: "My Family Squad",
  weekTitle_vi: "Biệt Đội Gia Đình",
  grammar_focus: "This is my... (Possession)",
  global_vocab: vocab.vocab,
  // ⚠️ MANDATORY: voiceConfig for unique voices per week
  // Week 2: Introducing UK Female voice (scaffolding progression)
  voiceConfig: {
    narration: 'en-GB-Neural2-A',    // UK Male, different from Week 1
    vocabulary: 'en-GB-Neural2-C',   // UK Female, clear pronunciation
    dictation: 'en-US-Neural2-F',    // US Female (familiar from Week 1)
    questions: 'en-GB-Neural2-A',    // UK Male for questions
    mindmap: 'en-GB-Neural2-C'       // UK Female for mindmap
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
