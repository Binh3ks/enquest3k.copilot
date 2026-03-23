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
  weekTitle_en: "My Baby Album",
  weekTitle_vi: "Album Ảnh Hồi Bé",
  grammar_focus: "Was / Were",
  global_vocab: vocab.vocab,
  // 🎙️ Voice mix: 2F (asteria, stella) + 2M (zeus, helios) — swapped vs week 18
  voiceConfig: {
    narration:    'en-US-Neural2-F',  // → aura-asteria-en  (F2: natural, expressive)
    vocabulary:   'en-US-Neural2-H',  // → aura-stella-en   (F1: bright, clear)
    dictation:    'en-US-Neural2-H',  // → aura-stella-en   (F1)
    shadowing:    'en-US-Neural2-H',  // → aura-stella-en   (F1)
    questions:    'en-US-Neural2-J',  // → aura-zeus-en     (M2: energetic)
    mindmap:      'en-US-Neural2-B',  // → aura-helios-en   (M1: clean, clear)
    logic_science:'en-US-Neural2-J',  // → aura-zeus-en     (M2)
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
