// Index wrapper for Week 81
import vocabList from './vocab.js';
import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';
import { skillPracticeHubData as skillPracticeHub } from './skill_practice_hub.js';

const normalizedVocab = Array.isArray(vocabList) ? vocabList : (vocabList?.vocab || []);
const new_words = { vocab: normalizedVocab, vocab_list: normalizedVocab };

export const weekData = {
  weekId: 81,
  theme: readingHub.theme || "ELA: The Master Architect (Structure) / Math: Graphing Data",
  title: readingHub.theme || "ELA: The Master Architect (Structure) / Math: Graphing Data",
  weekTitle_en: readingHub.theme || "ELA: The Master Architect (Structure) / Math: Graphing Data",
  title_vi: "ELA: Kiến Trúc Sư Tài Ba - Cấu trúc / Toán: Biểu diễn Dữ liệu",
  cefr_level: readingHub.cefr_level || "B1 Preliminary",

  // Top-level for InfoExchangeZone direct hydration
  cue_card_info_exchange: speakingHub.info_exchange_cards || null,
  cue_card_prompts: Array.isArray(speakingHub.cue_card_prompts) ? speakingHub.cue_card_prompts : [],
  vocab: normalizedVocab,

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
    new_words,
    reading_hub: readingHub,
    listening_hub: listeningHub,
    writing_hub: writingHub,
    speaking_hub: speakingHub,
    skill_practice_hub: skillPracticeHub
  }
};

export default weekData;
