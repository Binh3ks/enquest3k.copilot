// Index wrapper for Week 64 (Staging Round 93)
import vocabList from './vocab.js';
import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';
import { skillPracticeHubData as skillPracticeHub } from './skill_practice_hub.js';

const normalizedVocab = Array.isArray(vocabList) ? vocabList : (vocabList?.vocab || []);
const new_words = { vocab: normalizedVocab, vocab_list: normalizedVocab };

export const weekData = {
  weekId: 64,
  theme: readingHub.theme || "Data Stories: Reading Pictographs",
  title: readingHub.theme || "Data Stories: Reading Pictographs",
  weekTitle_en: readingHub.theme || "Data Stories: Reading Pictographs",
  title_vi: "C\u00e2u chuy\u1ec7n D\u1eef li\u1ec7u: \u0110\u1ecdc Bi\u1ec3u \u0111\u1ed3 Tranh",
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
