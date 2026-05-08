export default {
  title: "What I Like",
  min_words: 30,
  model_sentence: "I like to play. I like to draw. I like to read. When I play, I smile. When I draw, I am happy. When I read, I feel good. I love these things. They are fun!",
  instruction_en: "Use: I like + V-ing... / My favourite... is... / I don't like...",
  instruction_vi: "Dùng: I like + V-ing... / My favourite... is... / I don't like...",
  prompt_en: "Write about your favourite things! What do you like doing? What is your favourite food? What is your favourite subject at school? What don't you like? Write 4–5 sentences.",
  prompt_vi: "Viết về những thứ yêu thích! Bạn thích làm gì? Món ăn yêu thích? Môn học yêu thích? Bạn không thích điều gì? Viết 4–5 câu.",
  keywords: ["like", "play", "draw", "read", "happy", "fun"],
  sentence_frames: [{"template":"I like ___ and ___."},{"template":"My favourite food is ___."},{"template":"I like ___ at school."},{"template":"I don't like ___. I like ___ instead."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] playing", vi: "chơi", distractor: false},
        {word: "[1] reading", vi: "đọc sách", distractor: false},
        {word: "[1] drawing", vi: "vẽ", distractor: false},
        {word: "play", vi: "chơi (sai dạng)", distractor: true},
        {word: "[2] singing", vi: "hát", distractor: false},
        {word: "[2] dancing", vi: "nhảy", distractor: false},
        {word: "[2] swimming", vi: "bơi", distractor: false},
        {word: "[3] pizza", vi: "pizza", distractor: false},
        {word: "[3] rice", vi: "cơm", distractor: false},
        {word: "[3] noodles", vi: "mì", distractor: false},
        {word: "[4] English", vi: "tiếng Anh", distractor: false},
        {word: "[4] Math", vi: "Toán", distractor: false},
        {word: "[4] Art", vi: "Mỹ thuật", distractor: false},
        {word: "[5] vegetables", vi: "rau", distractor: false},
        {word: "[5] homework", vi: "bài tập", distractor: false},
        {word: "vegetable", vi: "rau (sai dạng)", distractor: true},
        {word: "[6] fruit", vi: "trái cây", distractor: false},
        {word: "[6] playing outside", vi: "chơi ngoài trời", distractor: false}
      ]
    }
  }
};
