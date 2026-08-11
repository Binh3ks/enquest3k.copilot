import { readingHubData } from './reading_hub.js';
import { listeningHubData } from './listening_hub.js';
import { writingHubData } from './writing_hub.js';
import { speakingHubData } from './speaking_hub.js';

export const week33Data = {
  weekId: 33,
  week: 33,
  title: "The Accident File — Irregular Verbs Group 5",
  title_vi: "Hồ Sơ Tai Nạn — Động Từ Bất Quy Tắc Nhóm 5",
  weekTitle_en: "The Accident File — Irregular Verbs Group 5",
  weekTitle_vi: "Hồ Sơ Tai Nạn — Động Từ Bất Quy Tắc Nhóm 5",
  theme: "The Accident File",
  cefr_level: "A2 Flyers",
  readingHub: readingHubData,
  listeningHub: listeningHubData,
  writingHub: writingHubData,
  speakingHub: speakingHubData,
  stations: {
    read_explore: readingHubData,
    new_words: readingHubData.vocab,
    word_match: listeningHubData.flash_arena,
    grammar: listeningHubData.grammar_drills,
    word_power: readingHubData.vocab,
    ask_ai: speakingHubData.nova_examiner_prompt,
    logic_lab: listeningHubData.singapore_math,
    dictation: writingHubData.word_bank_pills,
    shadowing: speakingHubData.shadowing_script,
    writing: writingHubData.picture_story,
    explore: readingHubData.story_scenes,
    mindmap_speaking: speakingHubData.shadowing_script,
    daily_watch: [],
    game_hub: listeningHubData.flash_arena
  }
};

export default week33Data;
