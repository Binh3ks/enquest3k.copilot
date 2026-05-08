export default {
  title: "My Yesterday",
  min_words: 30,
  model_sentence: "Yesterday was great and happy for me. I walked to school in the morning and talked to my friends in class. I listened to my teacher and played a game at break time. After school, I helped my mom at home. She cooked dinner, and I washed my hands before eating. In the evening, I watched TV, cleaned my desk, and finished my homework. Before sleeping, I looked at the stars and started a new story. It was a wonderful day!",
  instruction_en: "Use: Yesterday, I... / I went to... / I ate... / I played with... / The best part was...",
  instruction_vi: "Dùng: Yesterday, I... / I went to... / I ate... / I played with... / The best part was...",
  prompt_en: "Write about what you did yesterday! Where did you go? What did you eat? Who did you help or play with? What was the best part of your day?",
  prompt_vi: "Viết về những gì bạn đã làm hôm qua! Bạn đi đâu? Bạn ăn gì? Bạn giúp ai hoặc chơi với ai? Điều tốt nhất trong ngày là gì?",
  keywords: ["walked", "talked", "played", "cooked", "cleaned", "helped", "watched", "listened", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about what you did yesterday. What happened?",
  sentence_frames: [{"template":"Yesterday, I woke up at ___ and ___."},{"template":"In the morning, I ___ed ___."},{"template":"I went to ___ and ___ed with ___."},{"template":"I also ___ed ___ and ___."},{"template":"In the evening, I ___ed ___."},{"template":"I felt ___ because ___."},{"template":"The best part of my day was ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "=== PAST VERBS (grouped) ===", vi: "", distractor: false},
        {word: "walk", vi: "đi bộ", distractor: false},
        {word: "talk", vi: "nói chuyện", distractor: false},
        {word: "play", vi: "chơi", distractor: false},
        {word: "help", vi: "giúp", distractor: false},
        {word: "watch", vi: "xem", distractor: false},
        {word: "listen", vi: "nghe", distractor: false},
        {word: "clean", vi: "dọn dẹp", distractor: false},
        {word: "cook", vi: "nấu", distractor: false},
        {word: "finish", vi: "hoàn thành", distractor: false},
        {word: "=== OTHER WORDS (shuffled) ===", vi: "", distractor: false},
        {word: "6 o'clock", vi: "6 giờ", distractor: false},
        {word: "7 o'clock", vi: "7 giờ", distractor: false},
        {word: "school", vi: "trường", distractor: false},
        {word: "the park", vi: "công viên", distractor: false},
        {word: "my homework", vi: "bài tập", distractor: false},
        {word: "dinner", vi: "bữa tối", distractor: false},
        {word: "TV", vi: "TV", distractor: false},
        {word: "my friends", vi: "bạn tôi", distractor: false},
        {word: "my mom", vi: "mẹ tôi", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "tired", vi: "mệt", distractor: false},
        {word: "excited", vi: "hào hứng", distractor: false},
        {word: "playing with my friends", vi: "chơi với bạn", distractor: false},
        {word: "walk", vi: "đi bộ (sai dạng)", distractor: true},
        {word: "helps", vi: "giúp (sai dạng)", distractor: true}
      ]
    }
  }
};
