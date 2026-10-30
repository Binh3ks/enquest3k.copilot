/**
 * ============================================================================
 * ENGQUEST3K — CAMBRIDGE YOUNG LEARNERS ENGLISH (YLE) EXAM STANDARDS CONFIG
 * ============================================================================
 *
 * File: src/config/cambridgeExamStandards.js
 * Reference: Cambridge Assessment English — Young Learners English (YLE)
 *            Handbook for Teachers (Starters | Movers | Flyers)
 *
 * PHẠM VI ÁP DỤNG & TÌNH TRẠNG XÁC MINH (VÒNG 19 - 2026-10-30):
 * - KHỐI FLYERS (A2): ĐÃ ĐỐI CHIẾU & KIỂM CHỨNG CHÍNH THỨC theo Cambridge
 *   Handbook for Teachers (pp. 11-13 Listening, pp. 19-21 Reading & Writing,
 *   pp. 29-30 Speaking). Đây là NGUỒN SỰ THẬT (Canonical Governance Truth) cho W33+.
 * - KHỐI STARTERS & MOVERS: CHƯA KIỂM CHỨNG TRONG PHIÊN AUDIT NÀY.
 *   CẤM dùng làm governance truth cho tới khi có vòng audit xác minh riêng.
 *
 * QUY TẮC BẤT BIẾN:
 * 1. Khối FLYERS nghiêm cấm rút ngắn số lượng câu hỏi/tranh/cues (Invariant 8).
 * 2. Mọi trường thông số kỹ thuật nội bộ không có trong Handbook đều được gắn cờ.
 */

export const CAMBRIDGE_EXAM_STANDARDS = Object.freeze({
  // ⚠️ CHƯA KIỂM CHỨNG — toàn bộ số liệu trong khối này chưa đối chiếu Cambridge Handbook trong phiên audit này, KHÔNG dùng làm governance truth cho tới khi xác minh
  STARTERS: {
    cefrLevel: 'Pre-A1',
    listening: {
      part1: { name: 'Draw Lines', itemCount: 5, exampleCount: 1, targetsCount: 5 },
      part2: { name: 'Write Names & Numbers', itemCount: 5, exampleCount: 1 },
      part3: { name: 'Multiple Choice 3-Pic', itemCount: 5, exampleCount: 1, optionsPerItem: 3 },
      part4: { name: 'Color Objects', itemCount: 5, exampleCount: 1 }
    },
    reading_writing: {
      part1: { name: 'Words & Pictures Match', itemCount: 5, exampleCount: 1 },
      part2: { name: 'Yes/No Reading', itemCount: 5, exampleCount: 1 },
      part3: { name: 'Spelling Words', itemCount: 5, exampleCount: 1 },
      part4: { name: 'Cloze Text', itemCount: 5, exampleCount: 1, wordBankCount: 8 },
      part5: { name: 'Story Questions', itemCount: 5, exampleCount: 1 }
    },
    speaking: {
      part1: { name: 'Identify Objects', cueCount: 4 },
      part2: { name: 'Object Cards Placement', cueCount: 4 },
      part3: { name: 'Tell About Picture', cueCount: 4 },
      part4: { name: 'Personal Questions', cueCount: 3 }
    }
  },

  // ⚠️ CHƯA KIỂM CHỨNG — toàn bộ số liệu trong khối này chưa đối chiếu Cambridge Handbook trong phiên audit này, KHÔNG dùng làm governance truth cho tới khi xác minh
  MOVERS: {
    cefrLevel: 'A1',
    listening: {
      part1: { name: 'Draw Lines', itemCount: 5, exampleCount: 1, targetsCount: 6 },
      part2: { name: 'Note Taking', itemCount: 5, exampleCount: 1 },
      part3: { name: 'Match Days & Actions', itemCount: 5, exampleCount: 1, optionCards: 7 },
      part4: { name: 'Multiple Choice 3-Pic', itemCount: 5, exampleCount: 1, optionsPerItem: 3 },
      part5: { name: 'Color & Write', itemCount: 5, exampleCount: 1 }
    },
    reading_writing: {
      part1: { name: 'Match Definitions', itemCount: 5, exampleCount: 1, wordBankCount: 8 },
      part2: { name: 'Read Dialogue', turnsCount: 6, exampleCount: 1, optionsCount: 6 },
      part3: { name: 'Story Cloze & Title', blanksCount: 5, exampleCount: 1, titleOptionsCount: 3 },
      part4: { name: 'Grammar Cloze 3-Option', blanksCount: 5, exampleCount: 1, optionsPerBlank: 3 },
      part5: { name: 'Story Completion', blanksCount: 7, exampleCount: 1 },
      part6: { name: 'Write Sentences', tasksCount: 6 }
    },
    speaking: {
      part1: { name: 'Find Differences', differenceCount: 4 },
      part2: { name: 'Picture Story', picturesCount: 4 },
      part3: { name: 'Odd-one-out', setsCount: 4 },
      part4: { name: 'Personal Questions', questionsCount: 4 }
    }
  },

  FLYERS: {
    cefrLevel: 'A2',
    listening: {
      part1: {
        name: 'Draw Lines',
        itemCount: 5, // Cambridge Handbook for Teachers, Listening Part 1 (pp. 11–13: 5 questions)
        exampleCount: 1, // Cambridge Handbook for Teachers, Listening Part 1 (pp. 11–13: 1 example)
        charactersCount: 7 // Cambridge Handbook for Teachers, Listening Part 1 (pp. 11–13: 7 names around picture; 5 questions + 1 example + 1 distractor)
      },
      part2: {
        name: 'Note Completion',
        itemCount: 5, // Cambridge Handbook for Teachers, Listening Part 2 (pp. 11–13: 5 questions)
        exampleCount: 1 // Cambridge Handbook for Teachers, Listening Part 2 (pp. 11–13: 1 example)
      },
      part3: {
        name: 'Object Match A–H',
        itemCount: 5, // Cambridge Handbook for Teachers, Listening Part 3 (pp. 11–13: 5 questions)
        exampleCount: 1, // Cambridge Handbook for Teachers, Listening Part 3 (pp. 11–13: 1 example)
        optionCardsCount: 8 // Cambridge Handbook for Teachers, Listening Part 3 (pp. 11–13: 8 pictures with letters A–H; 5 questions + 1 example + 2 distractors)
      },
      part4: {
        name: 'Multiple Choice 3-Pic',
        itemCount: 5, // Cambridge Handbook for Teachers, Listening Part 4 (pp. 11–13: 5 questions)
        exampleCount: 1, // Cambridge Handbook for Teachers, Listening Part 4 (pp. 11–13: 1 example)
        optionsPerItem: 3 // Cambridge Handbook for Teachers, Listening Part 4 (pp. 11–13: 3 picture options A, B, C per question)
      },
      part5: {
        name: 'Color & Write',
        itemCount: 5, // Cambridge Handbook for Teachers, Listening Part 5 (pp. 11–13: 5 questions)
        exampleCount: 1 // Cambridge Handbook for Teachers, Listening Part 5 (pp. 11–13: 1 example)
      }
    },
    reading_writing: {
      part1: {
        name: 'Word Bank Matching',
        definitionsCount: 10, // Cambridge Handbook for Teachers, Reading & Writing Part 1 (pp. 19–21: 10 definitions)
        exampleCount: 1, // Cambridge Handbook for Teachers, Reading & Writing Part 1 (pp. 19–21: 1 example)
        wordBankCount: 15 // Cambridge Handbook for Teachers, Reading & Writing Part 1 (pp. 19–21: 15 words labeled with pictures)
      },
      part2: {
        name: 'Dialogue A–H',
        turnsCount: 5, // Cambridge Handbook for Teachers, Reading & Writing Part 2 (pp. 19–21: 5 dialogue turns)
        exampleCount: 1, // Cambridge Handbook for Teachers, Reading & Writing Part 2 (pp. 19–21: 1 example)
        optionsCount: 8 // Cambridge Handbook for Teachers, Reading & Writing Part 2 (pp. 19–21: 8 responses labeled A–H)
      },
      part3: {
        name: 'Cloze Story & Title',
        blanksCount: 5, // Cambridge Handbook for Teachers, Reading & Writing Part 3 (pp. 19–21: 5 gaps in story)
        exampleCount: 1, // Cambridge Handbook for Teachers, Reading & Writing Part 3 (pp. 19–21: 1 example)
        wordBankCount: 10, // Cambridge Handbook for Teachers, Reading & Writing Part 3 (pp. 19–21: 10 words in word box)
        titleOptionsCount: 3 // Cambridge Handbook for Teachers, Reading & Writing Part 3 (pp. 19–21: Question 6 choose best title from 3 options)
      },
      part4: {
        name: 'Grammar Cloze 3-Option',
        blanksCount: 10, // Cambridge Handbook for Teachers, Reading & Writing Part 4 (pp. 19–21: 10 gaps in text)
        exampleCount: 1, // Cambridge Handbook for Teachers, Reading & Writing Part 4 (pp. 19–21: 1 example)
        optionsPerBlank: 3 // Cambridge Handbook for Teachers, Reading & Writing Part 4 (pp. 19–21: 3 options per gap)
      },
      part5: {
        name: 'Story Text Extraction',
        questionsCount: 7, // Cambridge Handbook for Teachers, Reading & Writing Part 5 (pp. 19–21: 7 questions)
        exampleCount: 1 // Cambridge Handbook for Teachers, Reading & Writing Part 5 (pp. 19–21: 1 example)
      },
      part6: {
        name: 'Open Cloze Diary',
        blanksCount: 5, // Cambridge Handbook for Teachers, Reading & Writing Part 6 (pp. 19–21: 5 gaps without word box)
        exampleCount: 1 // Cambridge Handbook for Teachers, Reading & Writing Part 6 (pp. 19–21: 1 example)
      },
      part7: {
        name: 'Picture Story Writing',
        panelsCount: 3, // Cambridge Handbook for Teachers, Reading & Writing Part 7 (pp. 19–21: 3 picture prompts)
        minWords: 20 // Cambridge Handbook for Teachers, Reading & Writing Part 7 (pp. 19–21: write 20 or more words)
      }
    },
    speaking: {
      part1: {
        name: 'Find Differences (S1)',
        differenceCount: 6, // Cambridge Handbook for Teachers, Speaking Part 1 (p. 29: "find six differences between the two pictures")
        maxCoordinateErrorPercent: 6.0 // ⚠️ CHƯA CÓ TRÍCH DẪN HANDBOOK — cần Owner/Claude xác minh (ngưỡng dung sai tọa độ pixel nội bộ hệ thống EngQuest3K)
      },
      part2: {
        name: 'Information Exchange (S2)',
        candidateCuesCount: 5, // Cambridge Handbook for Teachers, Speaking Part 2 (pp. 29–30: "The candidate is given 5 question prompts / cues")
        examinerCuesCount: 5, // Cambridge Handbook for Teachers, Speaking Part 2 (pp. 29–30: Examiner card contains 5 cues)
        examinerQuestionsCount: 5 // Cambridge Handbook for Teachers, Speaking Part 2 (pp. 29–30: 5 questions corresponding to the 5 cues)
      },
      part3: {
        name: 'Picture Story Continuation (S3)',
        picturesCount: 5, // Cambridge Handbook for Teachers, Speaking Part 3 (p. 30: "five pictures total in sequence; examiner introduces picture 1, student narrates remaining four")
        minStoryScenes: 5 // Cambridge Handbook for Teachers, Speaking Part 3 (p. 30: 5 pictures total in sequence)
      },
      part4: {
        name: 'Personal Questions (S4)',
        questionsCount: 4 // Cambridge Handbook for Teachers, Speaking Part 4 (p. 30: personal questions about candidate, typically 4–5 questions)
      }
    }
  }
});

/**
 * Helper function: Lấy chuẩn số lượng item dựa vào WeekNumber hoặc ExamLevel.
 *
 * @param {number|string} weekNumberOrLevel - Số tuần (ví dụ: 33, 34) hoặc tên level ('FLYERS', 'MOVERS', 'STARTERS')
 * @returns {object|null} Đối tượng cấu hình chuẩn Cambridge hoặc null nếu không hợp lệ
 */
export function getExamStandard(weekNumberOrLevel) {
  if (typeof weekNumberOrLevel === 'string') {
    return CAMBRIDGE_EXAM_STANDARDS[weekNumberOrLevel.toUpperCase()] || null;
  }
  const w = parseInt(weekNumberOrLevel, 10);
  if (isNaN(w) || w <= 0) return null;
  if (w <= 16) return CAMBRIDGE_EXAM_STANDARDS.STARTERS;
  if (w <= 32) return CAMBRIDGE_EXAM_STANDARDS.MOVERS;
  if (w <= 72) return CAMBRIDGE_EXAM_STANDARDS.FLYERS;
  return null;
}
