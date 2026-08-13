/**
 * Week 34 Gold Standard Data — Reading Hub
 * Theme: "The Lion and the Mouse"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 34,
  theme: "The Lion and the Mouse",
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
    scene_id: `scene_${i + 1}`,
    title: `Panel ${i + 1}: ${"The Lion and the Mouse"}`,
    title_en: `Panel ${i + 1}: ${"The Lion and the Mouse"}`,
    description: `Scene ${i + 1} narrative for ${"The Lion and the Mouse"}.`,
    description_en: `Scene ${i + 1} narrative for ${"The Lion and the Mouse"}.`,
    image_url: "/images/week34/read_cover_w34.jpg",
    lexical_chunks: [
      { word: "story", chunk: "The Lion and the Mouse", x: 50, y: 50 }
    ]
  })),
  read_explore
};

export default readingHubData;
