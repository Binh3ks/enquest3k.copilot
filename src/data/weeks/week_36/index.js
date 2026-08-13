// Index wrapper for Week 36
import read_explore from './read.js';
import explore from './explore.js';
import new_words from './vocab.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import grammar from './grammar.js';
import daily_watch from './daily_watch.js';
import logic_lab from './logic_lab.js';
import mindmap_speaking from './mindmap.js';
import ask_ai from './ask_ai.js';
import writing from './writing.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import readingHub from './reading_hub.js';
import listeningHub from './listening_hub.js';
import writingHub from './writing_hub.js';
import speakingHub from './speaking_hub.js';

export const weekData = {
  weekId: 36,
  title: "The Secret Cave — Adventure & Exploration",
  title_vi: "Hang Động Bí Mật — Phưu Lưu & Khám Phá",
  readingHub,
  listeningHub,
  writingHub,
  speakingHub,
  stations: {
    read_explore,
    explore,
    new_words,
    word_match,
    word_power,
    grammar,
    daily_watch,
    logic_lab,
    mindmap_speaking,
    ask_ai,
    writing,
    dictation,
    shadowing
  }
};

export default weekData;
