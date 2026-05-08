export default {
  title: "My School",
  min_words: 30,
  model_sentence: "I am Alex. I am a student. My teacher is kind. My class is big. I am happy.",
  instruction_en: "Use: My name is... / I am... / I like... / My teacher is...",
  instruction_vi: "Dùng: My name is... / I am... / I like... / My teacher is...",
  prompt_en: "Introduce yourself! What is your name? How old are you? What do you like to do? Who is your teacher? Describe yourself in 4–5 sentences.",
  prompt_vi: "Giới thiệu bản thân! Tên bạn là gì? Bạn bao nhiêu tuổi? Bạn thích làm gì? Thầy/Cô bạn là ai? Viết 4–5 câu về bản thân.",
  keywords: ["I am", "is", "teacher", "school"],
  sentence_frames: [{"template":"My name is ___."},{"template":"I am ___ years old."},{"template":"I like ___."},{"template":"My teacher is ___. He/She is ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] Alex", vi: "Alex (tên)", distractor: false},
        {word: "[1] Emma", vi: "Emma (tên)", distractor: false},
        {word: "[1] Max", vi: "Max (tên)", distractor: false},
        {word: "[2] seven", vi: "7 tuổi", distractor: false},
        {word: "[2] eight", vi: "8 tuổi", distractor: false},
        {word: "[2] nine", vi: "9 tuổi", distractor: false},
        {word: "[3] reading", vi: "đọc sách", distractor: false},
        {word: "[3] playing", vi: "chơi", distractor: false},
        {word: "[3] drawing", vi: "vẽ", distractor: false},
        {word: "read", vi: "đọc (sai dạng)", distractor: true},
        {word: "[4] Ms. Johnson", vi: "Cô Johnson", distractor: false},
        {word: "[4] Mr. Brown", vi: "Thầy Brown", distractor: false},
        {word: "[5] kind", vi: "tốt bụng", distractor: false},
        {word: "[5] nice", vi: "dễ thương", distractor: false},
        {word: "[5] friendly", vi: "thân thiện", distractor: false},
        {word: "friend", vi: "bạn (sai loại từ)", distractor: true}
      ]
    }
  }
};
