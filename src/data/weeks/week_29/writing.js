export default {
  title: "Writing: My Journey Story",
  min_words: 50,
  instruction_en: "Use: Last ___, I went to... / I went by... / I went with... / We saw/ate/ran... / My favourite memory was...",
  instruction_vi: "Dùng: Last ___, I went to... / I went by... / I went with... / We saw/ate/ran... / My favourite memory was...",
  prompt_en: "Write about a journey or trip you went on! Where did you go? How did you get there — by car, bus or plane? Who went with you? What did you see and do? What was the best memory?",
  prompt_vi: "Viết về một chuyến đi bạn đã thực hiện! Bạn đi đâu? Đi bằng gì — xe hơi, xe bus hay máy bay? Ai đi cùng? Bạn thấy và làm gì? Kỷ niệm đẹp nhất là gì?",
  topic_talk_prompt: "Tell me about a trip or journey you have been on. Where did you go? How did you get there? What did you see or do?",
  keywords: ["went", "ran", "came", "flew", "journey", "airport", "ticket", "luggage", "destination", "adventure", "passenger", "departure", "arrival"],
  sentence_frames: [{"template":"Last ___, I went to ___ by ___."},
{"template":"The most exciting moment was ___."},
{"template":"I felt ___ because ___."},
{"template":"This trip was special because ___."}],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      words: [
        {word: "went", vi: "đã đi", distractor: false},
        {word: "ran", vi: "đã chạy", distractor: false},
        {word: "came", vi: "đã đến", distractor: false},
        {word: "flew", vi: "đã bay", distractor: false},
        {word: "journey", vi: "hành trình", distractor: false},
        {word: "airport", vi: "sân bay", distractor: false},
        {word: "ticket", vi: "vé", distractor: false},
        {word: "luggage", vi: "hành lý", distractor: false},
        {word: "departure", vi: "khởi hành", distractor: false},
        {word: "arrival", vi: "đến nơi", distractor: false},
        {word: "fly", vi: "bay (sai dạng)", distractor: true},
        {word: "go", vi: "đi (sai dạng)", distractor: true},
        {word: "run", vi: "chạy (sai dạng)", distractor: true}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example? (Try writing first!)",
      label_vi: "📖 Xem mẫu? (Thử viết trước nhé!)",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last weekend, my family went to the airport for a holiday trip. We ran to the check-in desk because our departure was in thirty minutes. Mum came through the doors with two big suitcases and smiled at us. Finally, we boarded the plane and it flew high above the white clouds towards our destination. It was the best adventure we ever went on together as a family."
    }
  }
};
        {word: "ran", vi: "đã chạy", distractor: false},
        {word: "came", vi: "đã đến", distractor: false},
        {word: "flew", vi: "đã bay", distractor: false},
        {word: "journey", vi: "hành trình", distractor: false},
        {word: "airport", vi: "sân bay", distractor: false},
        {word: "ticket", vi: "vé", distractor: false},
        {word: "luggage", vi: "hành lý", distractor: false},
        {word: "departure", vi: "khởi hành", distractor: false},
        {word: "arrival", vi: "đến nơi", distractor: false},
        {word: "fly", vi: "bay (sai dạng)", distractor: true},
        {word: "go", vi: "đi (sai dạng)", distractor: true},
        {word: "run", vi: "chạy (sai dạng)", distractor: true}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example? (Try writing first!)",
      label_vi: "📖 Xem mẫu? (Thử viết trước nhé!)",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last weekend, my family went to the airport for a holiday trip. We ran to the check-in desk because our departure was in thirty minutes. Mum came through the doors with two big suitcases and smiled at us. Finally, we boarded the plane and it flew high above the white clouds towards our destination. It was the best adventure we ever went on together as a family."
    }
  },
  sentence_frames_old: [{{"template":"We went by ___. It took ___ hours."},{"template":"When we arrived, I saw ___ and ___."},{"template":"We ___ed ___ and ___ together."},{"template":"We ate ___ and ___. It was ___."},{"template":"The most exciting thing was ___."},{"template":"My favourite memory was ___ because ___."},{"template":"I want to go back because ___."}],
};
