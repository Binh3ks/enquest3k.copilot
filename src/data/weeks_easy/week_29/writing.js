export default {
  title: "Writing: My Trip Story",
  min_words: 30,
  model_sentence: "Last weekend, my family went to the airport. We ran to the gate because we were almost late. The plane flew up fast. I saw clouds outside the window. We came to Da Nang. It was a great adventure!",
  instruction_en: "Use: Last ___, I went to... / I went by... / I went with... / We saw/ate/ran... / My favourite memory was...",
  instruction_vi: "Dùng: Last ___, I went to... / I went by... / I went with... / We saw/ate/ran... / My favourite memory was...",
  prompt_en: "Write about a journey or trip you went on! Where did you go? How did you get there — by car, bus or plane? Who went with you? What did you see and do? What was the best memory?",
  prompt_vi: "Viết về một chuyến đi bạn đã thực hiện! Bạn đi đâu? Đi bằng gì — xe hơi, xe bus hay máy bay? Ai đi cùng? Bạn thấy và làm gì? Kỷ niệm đẹp nhất là gì?",
  topic_talk_prompt: "Tell me about a trip or journey you have been on. Where did you go?",
  keywords: ["went", "ran", "came", "flew", "airport", "plane", "ticket", "journey", "adventure", "destination"],
  sentence_frames: [
    {"template":"Last ___, my family went to ___."},
    {"template":"We went by ___."},
    {"template":"When we arrived, I saw ___ and ___."},
    {"template":"We ___ed ___ together."},
    {"template":"It was very ___."},
    {"template":"My favourite memory was ___."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Word Bank",
      label_vi: "💡 Ngân hàng từ",
      show_by_default: true,
      words: [
        {word: "went", vi: "đã đi", distractor: false},
        {word: "go", vi: "đi", distractor: true},
        {word: "flew", vi: "đã bay", distractor: false},
        {word: "came", vi: "đã đến", distractor: false},
        {word: "visited", vi: "đã thăm", distractor: false},
        {word: "fly", vi: "bay", distractor: true},
        {word: "beach", vi: "bãi biển", distractor: false},
        {word: "mountain", vi: "núi", distractor: false},
        {word: "city", vi: "thành phố", distractor: false},
        {word: "run", vi: "chạy", distractor: true},
        {word: "plane", vi: "máy bay", distractor: false},
        {word: "car", vi: "xe ô tô", distractor: false},
        {word: "train", vi: "tàu hỏa", distractor: false},
        {word: "fun", vi: "vui", distractor: false},
        {word: "exciting", vi: "thú vị", distractor: false},
        {word: "tired", vi: "mệt", distractor: false},
        {word: "beautiful", vi: "đẹp", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example paragraph",
      label_vi: "📖 Xem bài mẫu",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last weekend, my family went to the airport. We ran to the gate because we were almost late. The plane flew up fast. I saw clouds outside the window. We came to Da Nang. It was a great adventure!"
    }
  }
};
