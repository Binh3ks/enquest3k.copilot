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
  pbl_mission: {
    title_en: "Offline Corridor Safety Ambassador Project",
    title_vi: "Dự Án Đại Sứ An Toàn Hành Lang Học Đường",
    task_en: "1. Draw a creative safety warning sign for your school corridor or home staircase.\n2. Write 3 safety rules under your drawing using past continuous and modal verbs (e.g., 'Do not run while walking near water').\n3. Record a 1-minute video explaining your sign to your classmates.",
    task_vi: "1. Vẽ một biển báo an toàn sáng tạo cho hành lang trường hoặc cầu thang nhà con.\n2. Viết 3 quy tắc an toàn bên dưới biển báo dùng thì quá khứ tiếp diễn và động từ khuyết thiếu.\n3. Quay video 1 phút thuyết trình giải thích biển báo cho bạn bè."
  },
  writing
};

export default writingHubData;
