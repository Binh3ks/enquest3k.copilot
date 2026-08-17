/**
 * Week 33 Gold Standard Data — Writing Hub
 * Theme: "Corridor Safety & School Care"
 */

import writing from './writing.js';

export const writingHubData = {
  week: 33,
  theme: "Corridor Safety & School Care",
  picture_story: writing?.picture_story || writing?.picturePanels,
  word_bank_pills: writing?.word_bank_pills || writing?.wordBankPills,
  model_sentence: writing?.model_sentence,
  sentence_frames: writing?.sentence_frames,
  min_words: writing?.min_words || 20,
  writing
};

export default writingHubData;
