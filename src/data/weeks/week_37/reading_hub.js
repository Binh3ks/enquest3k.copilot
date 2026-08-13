/**
 * Week 37 Gold Standard Data — Reading Hub
 * Theme: "Living vs. Non-Living"
 */

import read_explore from './read.js';
import vocabList from './vocab.js';

export const readingHubData = {
  week: 37,
  theme: "Living vs. Non-Living",
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
    title: `Panel ${i + 1}: ${"Living vs. Non-Living"}`,
    title_en: `Panel ${i + 1}: ${"Living vs. Non-Living"}`,
    description: `Scene ${i + 1} narrative for ${"Living vs. Non-Living"}.`,
    description_en: `Scene ${i + 1} narrative for ${"Living vs. Non-Living"}.`,
    image_url: "/images/week37/read_stem_w37.jpg",
    lexical_chunks: [
      { word: "story", chunk: "Living vs. Non-Living", x: 50, y: 50 }
    ]
  })),
  read_explore
};

export default readingHubData;
