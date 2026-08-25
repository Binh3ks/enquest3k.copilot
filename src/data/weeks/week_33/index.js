// Index wrapper for Week 33
import read_explore from './read.js';
import explore from './explore.js';
import new_words from './vocab.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import grammar from './grammar.js';
import daily_watch from './daily_watch.js';
import logic_lab from './logic_lab.js';
import mindmap_speaking from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import writing from './writing.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';

import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';
import { skillPracticeHubData as skillPracticeHub } from './skill_practice_hub.js';

export const weekData = {
  weekId: 33,
  title: "Corridor Safety & School Care",
  weekTitle_en: "Corridor Safety & School Care",
  title_vi: "An Toàn Hành Lang & Chăm Sóc Trường Học",

  // Top-level for InfoExchangeZone direct hydration
  cue_card_info_exchange: speakingHub.info_exchange_cards,
  cue_card_prompts: CUE_CARD_PROMPTS,

  readingHub,
  listeningHub,
  writingHub,
  speakingHub,
  skillPracticeHub,
  reading_hub: readingHub,
  listening_hub: listeningHub,
  writing_hub: writingHub,
  speaking_hub: speakingHub,
  skill_practice_hub: skillPracticeHub,
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
    shadowing,
    skill_practice_hub: skillPracticeHub
  }
};

export default weekData;
