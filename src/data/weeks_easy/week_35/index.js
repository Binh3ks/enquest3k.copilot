// Index wrapper for Week 35
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

import { readingHubData as readingHub } from '../../weeks/week_35/reading_hub.js';
import { listeningHubData as listeningHub } from '../../weeks/week_35/listening_hub.js';
import { writingHubData as writingHub } from '../../weeks/week_35/writing_hub.js';
import { speakingHubData as speakingHub } from '../../weeks/week_35/speaking_hub.js';

export const weekData = {
  weekId: 35,
  title: "Save Our Park — Environmental Action",
  title_vi: "Bảo Vệ Công Viên — Hành Động Môi Trường",

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
