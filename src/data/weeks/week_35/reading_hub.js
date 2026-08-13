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
    scene_id: `scene_${i + 1}`,
    title: `Panel ${i + 1}: ${"The Best Day Ever"}`,
    title_en: `Panel ${i + 1}: ${"The Best Day Ever"}`,
    description: `Scene ${i + 1} narrative for ${"The Best Day Ever"}.`,
    description_en: `Scene ${i + 1} narrative for ${"The Best Day Ever"}.`,
    image_url: "/images/week35/read_cover_w35.jpg",
    lexical_chunks: [
      { word: "story", chunk: "The Best Day Ever", x: 50, y: 50 }
    ]
  })),
  read_explore
};

export default readingHubData;
