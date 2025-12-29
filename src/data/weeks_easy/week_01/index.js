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
  weekId: 1,
  weekTitle_en: "The Young Scholar",
  weekTitle_vi: "Học Sinh Trẻ",
  grammar_focus: "Subject Pronouns & Verb to be",
  global_vocab: vocab.vocab,
  // ⚠️ MANDATORY: voiceConfig for unique voices per week
  voiceConfig: {
    narration: 'en-GB-Neural2-A',    // UK Male, clear for first week stories
    vocabulary: 'en-AU-Neural2-B',   // AU Female, friendly for vocab
    dictation: 'en-US-Neural2-F',    // US Female, neutral for dictation
    questions: 'en-GB-Neural2-C',    // UK Female for logic/ask_ai
    mindmap: 'en-AU-Neural2-A'       // AU Male for mindmap branches
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
