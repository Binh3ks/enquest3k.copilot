// Index wrapper for Week 74
import vocabList from './vocab.js';
import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';
import { skillPracticeHubData as skillPracticeHub } from './skill_practice_hub.js';

const normalizedVocab = Array.isArray(vocabList) ? vocabList : (vocabList?.vocab || []);
const new_words = { vocab: normalizedVocab, vocab_list: normalizedVocab };

export const weekData = {
  weekId: 74,
  theme: readingHub.theme || "Science/ELA: Food Chains / Math: Complex Charts",
  title: readingHub.theme || "Science/ELA: Food Chains / Math: Complex Charts",
  weekTitle_en: readingHub.theme || "Science/ELA: Food Chains / Math: Complex Charts",
  title_vi: "Khoa học/ELA: Chuỗi thức ăn / Toán: Biểu đồ phức tạp",
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
