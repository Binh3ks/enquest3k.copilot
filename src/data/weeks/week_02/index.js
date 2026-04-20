import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import logic_science from './logic_science.js';
import singapore_math from './singapore_math.js';
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
  weekTitle_vi: "Đội Gia Đình Tôi",
  grammar_focus: "This is my... (Possession) & Present Simple",
  global_vocab: vocab.vocab,
  // ⚠️ MANDATORY: voiceConfig for unique voices per week
  // Week 2 Advanced: US voices (continuing scaffolding for basic family vocabulary)
  voiceConfig: {
    narration: 'en-US-Neural2-D',    // US Male, clear for family stories
    vocabulary: 'en-US-Neural2-F',   // US Female, friendly for vocab
    dictation: 'en-US-Neural2-F',    // US Female, neutral for dictation
    questions: 'en-US-Neural2-D',    // US Male for logic/ask_ai
    mindmap: 'en-US-Neural2-D'       // US Male for mindmap branches
  },
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    ask_ai: ask_ai,
    logic_lab: { logic_science, singapore_math },
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
