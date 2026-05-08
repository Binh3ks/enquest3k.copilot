export default {
  title: "My Day",
  min_words: 30,
  model_sentence: "I wake up at 7 o'clock. I brush my teeth. I eat breakfast. I go to school. I have lunch. I play with friends. I do homework. I eat dinner. I watch TV. I go to bed at 9 o'clock.",
  instruction_en: "Use: I wake up at... / I (eat/go/study) at... / After school, I... / I go to bed at...",
  instruction_vi: "Dùng: I wake up at... / I (eat/go/study) at... / After school, I... / I go to bed at...",
  prompt_en: "Describe your daily routine! What time do you wake up? What do you do in the morning? What do you do after school? What time do you go to bed?",
  prompt_vi: "Mô tả thói quen hàng ngày! Bạn thức dậy lúc mấy giờ? Buổi sáng làm gì? Sau giờ học làm gì? Đi ngủ lúc mấy giờ?",
  keywords: ["wake up", "brush teeth", "eat", "go", "school", "play", "homework", "dinner", "TV", "sleep"],
  topic_talk_prompt: "Tell me about what you usually do every day.",
  sentence_frames: [{"template":"I wake up at ___ every day."},{"template":"In the morning, I ___ and ___."},{"template":"At school, I ___ and ___."},{"template":"After school, I ___."},{"template":"In the evening, I ___ and ___."},{"template":"I go to bed at ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== TIME (Thời gian) ===", vi: "", distractor: false},
        {word: "6 o'clock", vi: "6 giờ", distractor: false},
        {word: "7 o'clock", vi: "7 giờ", distractor: false},
        {word: "8 o'clock", vi: "8 giờ", distractor: false},
        {word: "9 o'clock", vi: "9 giờ", distractor: false},
        {word: "=== VERBS (Động từ) ===", vi: "", distractor: false},
        {word: "wake up", vi: "thức dậy", distractor: false},
        {word: "brush my teeth", vi: "đánh răng", distractor: false},
        {word: "eat breakfast", vi: "ăn sáng", distractor: false},
        {word: "go to school", vi: "đi học", distractor: false},
        {word: "study", vi: "học", distractor: false},
        {word: "play", vi: "chơi", distractor: false},
        {word: "do homework", vi: "làm bài tập", distractor: false},
        {word: "eat dinner", vi: "ăn tối", distractor: false},
        {word: "watch TV", vi: "xem TV", distractor: false},
        {word: "read books", vi: "đọc sách", distractor: false},
        {word: "take a shower", vi: "tắm", distractor: false},
        {word: "go to bed", vi: "đi ngủ", distractor: false},
        {word: "waking up", vi: "thức dậy (sai dạng)", distractor: true},
        {word: "studys", vi: "học (sai dạng)", distractor: true}
      ]
    }
  }
};
