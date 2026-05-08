export default {
  title: "My Talents",
  prompt_en: "Write about your talents for a talent show! What can you do well? What can't you do? What talent do you want to learn? How do you feel when you perform?",
  prompt_vi: "Viết về tài năng của bạn cho buổi biểu diễn! Bạn giỏi làm gì? Không làm được gì? Muốn học tài năng nào? Cảm giác khi biểu diễn?",
  instruction_en: "Use: I can... / I can't... / I want to learn to... / When I perform, I feel...",
  instruction_vi: "Dùng: I can... / I can't... / I want to learn to... / When I perform, I feel...",
  min_words: 30,
  model_sentence: "I can sing. I can dance. I can run fast. I can't swim yet but I want to learn!",
  keywords: ["I can", "I can't", "sing", "dance", "run", "jump", "swim", "draw"],
  topic_talk_prompt: "Tell me about something you are good at. What is your talent?",
  sentence_frames: [{"template":"I can ___ and ___."},{"template":"I can't ___ yet, but I want to learn."},{"template":"My favourite talent is ___ because ___."},{"template":"I practise ___ every ___."},{"template":"My friends say I am good at ___."},{"template":"When I perform, I feel ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== VERBS (Động từ) ===", vi: "", distractor: false},
        {word: "sing", vi: "hát", distractor: false},
        {word: "dance", vi: "nhảy", distractor: false},
        {word: "draw", vi: "vẽ", distractor: false},
        {word: "run", vi: "chạy", distractor: false},
        {word: "jump", vi: "nhảy cao", distractor: false},
        {word: "swim", vi: "bơi", distractor: false},
        {word: "play piano", vi: "chơi piano", distractor: false},
        {word: "play guitar", vi: "chơi guitar", distractor: false},
        {word: "practise", vi: "luyện tập", distractor: false},
        {word: "perform", vi: "biểu diễn", distractor: false},
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "singing", vi: "hát", distractor: false},
        {word: "dancing", vi: "nhảy", distractor: false},
        {word: "drawing", vi: "vẽ", distractor: false},
        {word: "day", vi: "ngày", distractor: false},
        {word: "weekend", vi: "cuối tuần", distractor: false},
        {word: "=== ADJECTIVES (Tính từ) ===", vi: "", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "proud", vi: "tự hào", distractor: false},
        {word: "nervous", vi: "hồi hộp", distractor: false},
        {word: "excited", vi: "hào hứng", distractor: false},
        {word: "proudly", vi: "tự hào (sai loại từ)", distractor: true},
        {word: "sang", vi: "hát (sai dạng)", distractor: true}
      ]
    }
  }
};
