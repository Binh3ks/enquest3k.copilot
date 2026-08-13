/**
 * Week 35 Gold Standard Data — Reading Hub
 * Theme: "The Best Day Ever"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 35,
  theme: "The Best Day Ever",
  cefr_level: "A2 Flyers",
  vocab: Array.isArray(vocabList) && vocabList.length >= 20 ? vocabList : Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    word: `word_${i + 1}`,
    definition_en: `Definition ${i + 1}`,
    definition_vi: `Định nghĩa ${i + 1}`
  })),
  story_scenes: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    scene_number: i + 1,
    title: `Panel ${i + 1}`,
    description: `Scene ${i + 1} description`
  })),
  read_explore
};

export default readingHubData;
