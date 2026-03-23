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

const weekData = {
  weekId: 18,
  isEasy: true,
  weekTitle_en: "The Lost Dog",
  weekTitle_vi: "Chú Chó Đi Lạc",
  grammar_focus: "Narrative (Beginning, Middle, End)",
  global_vocab: vocab.vocab,

  // 🎙️ Voice mix: 2F (stella, asteria) + 2M (helios, zeus) — no luna/orion
  voiceConfig: {
    narration:    'en-US-Neural2-H',  // → aura-stella-en   (F1: bright, clear)
    vocabulary:   'en-US-Neural2-F',  // → aura-asteria-en  (F2: natural, expressive)
    dictation:    'en-US-Neural2-F',  // → aura-asteria-en  (F2)
    shadowing:    'en-US-Neural2-F',  // → aura-asteria-en  (F2)
    questions:    'en-US-Neural2-B',  // → aura-helios-en   (M1: clean, clear)
    mindmap:      'en-US-Neural2-J',  // → aura-zeus-en     (M2: energetic)
    logic_science:'en-US-Neural2-B',  // → aura-helios-en   (M1)
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
    daily_watch: daily_watch
  }
};
export default weekData;
