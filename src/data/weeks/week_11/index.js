import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import sentence_builder from './sentence_builder.js';
import explore from './explore.js';
import word_power from './word_power.js';
import mindmap from './mindmap.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import twenty_questions from './twenty_questions.js';
import word_chain from './word_chain.js';

const weekData = {
  weekId: 11,
  isEasy: false,
  weekTitle_en: "Weekend Fun Spots (Places)",
  weekTitle_vi: "Các Địa Điểm Vui Chơi Cuối Tuần",
  grammar_focus: "Preposition 'at' (I play at the park)",
  global_vocab: vocab.vocab,
  
  voiceConfig: {
    narration: 'en-US-Neural2-D',
    vocabulary: 'en-US-Neural2-F',
    dictation: 'en-US-Neural2-F',
    questions: 'en-US-Neural2-D',
    mindmap: 'en-US-Neural2-D'
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
    sentence_builder: sentence_builder,
    explore: explore,
    mindmap_speaking: mindmap,
    twenty_questions: twenty_questions,
    word_chain: word_chain,
    daily_watch: daily_watch
  }
};

export default weekData;
