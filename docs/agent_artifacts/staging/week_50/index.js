// Index wrapper for Week 50 (Staging Round 91)
import vocabList from './vocab.js';
import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';
import { skillPracticeHubData as skillPracticeHub } from './skill_practice_hub.js';

const normalizedVocab = Array.isArray(vocabList) ? vocabList : (vocabList?.vocab || []);
const new_words = { vocab: normalizedVocab, vocab_list: normalizedVocab };

export const weekData = {
  weekId: 50,
  theme: readingHub.theme || "Review Station 1 (Grammar Mix)",
  title: readingHub.theme || "Review Station 1 (Grammar Mix)",
  weekTitle_en: readingHub.theme || "Review Station 1 (Grammar Mix)",
  title_vi: "Tr\u1ea1m \u00d4n t\u1eadp 1 - Ng\u1eef ph\u00e1p T\u1ed5ng h\u1ee3p",
  cefr_level: readingHub.cefr_level || "A2 Flyers",

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
