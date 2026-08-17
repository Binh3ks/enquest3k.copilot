// Index wrapper for Week 34
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

import { readingHubData as readingHub } from '../../weeks/week_34/reading_hub.js';
import { listeningHubData as listeningHub } from '../../weeks/week_34/listening_hub.js';
import { writingHubData as writingHub } from '../../weeks/week_34/writing_hub.js';
import { speakingHubData as speakingHub } from '../../weeks/week_34/speaking_hub.js';

export const weekData = {
  weekId: 34,
  title: "The Ant and the Grasshopper — Fables & Moral",
  title_vi: "Con Kiến và Con Châu Chấu — Truyện Ngụ Ngôn",

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
