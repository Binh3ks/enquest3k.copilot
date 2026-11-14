// Index wrapper for Week 68 (Round 94 Staging)
import vocabList from './vocab.js';
import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';
import { skillPracticeHubData as skillPracticeHub } from './skill_practice_hub.js';

const normalizedVocab = (vocabList && vocabList.vocab) ? vocabList.vocab : (Array.isArray(vocabList) ? vocabList : []);
const new_words = normalizedVocab.map((item, idx) => ({
  id: item.id || idx + 1,
  word: item.word || '',
  phonetic: item.ipa || item.phonetic || '',
  meaning: item.definition_vi || item.meaning || '',
  english_meaning: item.definition_en || item.english_meaning || '',
  example: item.example_en || item.example || '',
  example_vi: item.example_vi || '',
  image: item.image || '',
  audio_url: item.audio_url || null
}));

export const weekData = {
  weekId: 68,
  weekNumber: 68,
  theme: "ELA: Strong Reasons / Math: Bar Graphs",
  cefr_level: "A2 Flyers",

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
