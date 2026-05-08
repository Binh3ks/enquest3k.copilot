export default {
  title: "Writing: My Journey Story",
  min_words: 50,
  instruction_en: "Use: Last ___, I went to... / I went by... / I went with... / We saw/ate/ran... / My favourite memory was...",
  instruction_vi: "Dùng: Last ___, I went to... / I went by... / I went with... / We saw/ate/ran... / My favourite memory was...",
  prompt_en: "Write about a journey or trip you went on! Where did you go? How did you get there — by car, bus or plane? Who went with you? What did you see and do? What was the best memory?",
  prompt_vi: "Viết về một chuyến đi bạn đã thực hiện! Bạn đi đâu? Đi bằng gì — xe hơi, xe bus hay máy bay? Ai đi cùng? Bạn thấy và làm gì? Kỷ niệm đẹp nhất là gì?",
  topic_talk_prompt: "Tell me about a trip or journey you have been on. Where did you go? How did you get there? What did you see or do?",
  keywords: ["went", "ran", "came", "flew", "journey", "airport", "ticket", "luggage", "destination", "adventure", "passenger", "departure", "arrival"],
  sentence_frames: [
    {"template":"Last ___, I went on a journey to ___ by ___."},
    {"template":"The journey took ___ hours and I felt ___."},
    {"template":"When I arrived at the ___, I saw ___ and ___."},
    {"template":"The most ___ thing I saw was ___."},
    {"template":"I ___ed ___ with my ___."},
    {"template":"We also ___ed ___ which was very ___."},
    {"template":"The best moment was when ___."},
    {"template":"This trip was special because ___ and ___."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      words: [
        {word: "went", vi: "đã đi", distractor: false},
        {word: "go", vi: "đi", distractor: true},
        {word: "flew", vi: "đã bay", distractor: false},
        {word: "came", vi: "đã đến", distractor: false},
        {word: "visited", vi: "đã thăm", distractor: false},
        {word: "explored", vi: "đã khám phá", distractor: false},
        {word: "fly", vi: "bay", distractor: true},
        {word: "journey", vi: "hành trình", distractor: false},
        {word: "airport", vi: "sân bay", distractor: false},
        {word: "run", vi: "chạy", distractor: true},
        {word: "station", vi: "nhà ga", distractor: false},
        {word: "destination", vi: "điểm đến", distractor: false},
        {word: "adventure", vi: "phiêu lưu", distractor: false},
        {word: "beach", vi: "bãi biển", distractor: false},
        {word: "mountain", vi: "núi", distractor: false},
        {word: "city", vi: "thành phố", distractor: false},
        {word: "temple", vi: "đền", distractor: false},
        {word: "plane", vi: "máy bay", distractor: false},
        {word: "train", vi: "tàu", distractor: false},
        {word: "car", vi: "xe", distractor: false},
        {word: "exciting", vi: "thú vị", distractor: false},
        {word: "amazing", vi: "tuyệt vời", distractor: false},
        {word: "beautiful", vi: "đẹp", distractor: false},
        {word: "tired", vi: "mệt", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "surprised", vi: "ngạc nhiên", distractor: false},
        {word: "family", vi: "gia đình", distractor: false},
        {word: "friends", vi: "bạn bè", distractor: false}
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
