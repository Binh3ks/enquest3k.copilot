/**
 * Week 36 Gold Standard Data — Reading Hub
 * Theme: "My Adventure Book"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 36,
  theme: "My Adventure Book",
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
    title: `Panel ${i + 1}: ${"My Adventure Book"}`,
    title_en: `Panel ${i + 1}: ${"My Adventure Book"}`,
    description: `Scene ${i + 1} narrative for ${"My Adventure Book"}.`,
    description_en: `Scene ${i + 1} narrative for ${"My Adventure Book"}.`,
    image_url: "/images/week36/read_stem_w36.jpg",
    lexical_chunks: [
      { word: "story", chunk: "My Adventure Book", x: 50, y: 50 }
    ]
  })),
  read_explore
};

export default readingHubData;
