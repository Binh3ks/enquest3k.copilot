export default {
  title: "Write About My Park Day",
  min_words: 30,
  model_sentence: "Today I am going to the park! The park is fun! I am walking with my mom. My dad is jogging. I see a boy running with his dog. Near the fountain, kids are playing. They are laughing! My family is having a picnic. We are eating sandwiches. I am drinking juice. My sister is flying a red kite! I am relaxing on the grass. I love the park!",
  instruction_en: "Use: I can see... / ___ is/are ___ing... / The weather is... / The park is...",
  instruction_vi: "Dùng: I can see... / ___ is/are ___ing... / The weather is... / The park is...",
  prompt_en: "Describe a visit to a busy park! What are people doing? Who is running? Who is sitting? What are the children playing? What is the weather like?",
  prompt_vi: "Mô tả chuyến thăm công viên nhộn nhịp! Mọi người đang làm gì? Ai đang chạy? Ai đang ngồi? Trẻ em đang chơi gì? Thời tiết như thế nào?",
  keywords: ["running", "walking", "sitting", "eating", "flying", "playing", "jogging", "relaxing", "picnic", "fountain"],
  topic_talk_prompt: "Tell me about what people are doing at a park right now.",
  sentence_frames: [{"template":"Today I am visiting ___. It is ___."},{"template":"I can see people ___ing ___."},{"template":"___ is ___ing near the ___."},{"template":"Some children are ___ and some are ___."},{"template":"The weather is ___, so people are ___."},{"template":"I am ___ing and I feel ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== PLACES (Địa điểm) ===", vi: "", distractor: false},
        {word: "the park", vi: "công viên", distractor: false},
        {word: "the playground", vi: "sân chơi", distractor: false},
        {word: "the beach", vi: "bãi biển", distractor: false},
        {word: "=== VERBS -ING (Động từ tiếp diễn) ===", vi: "", distractor: false},
        {word: "running", vi: "đang chạy", distractor: false},
        {word: "walking", vi: "đang đi bộ", distractor: false},
        {word: "sitting", vi: "đang ngồi", distractor: false},
        {word: "eating", vi: "đang ăn", distractor: false},
        {word: "playing", vi: "đang chơi", distractor: false},
        {word: "flying a kite", vi: "đang thả diều", distractor: false},
        {word: "jogging", vi: "đang chạy bộ", distractor: false},
        {word: "relaxing", vi: "đang thư giãn", distractor: false},
        {word: "laughing", vi: "đang cười", distractor: false},
        {word: "run", vi: "chạy (sai dạng)", distractor: true},
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "fountain", vi: "đài phun nước", distractor: false},
        {word: "tree", vi: "cây", distractor: false},
        {word: "bench", vi: "ghế dài", distractor: false},
        {word: "grass", vi: "cỏ", distractor: false},
        {word: "=== ADJECTIVES (Tính từ) ===", vi: "", distractor: false},
        {word: "sunny", vi: "nắng", distractor: false},
        {word: "nice", vi: "đẹp", distractor: false},
        {word: "beautiful", vi: "đẹp", distractor: false},
        {word: "busy", vi: "đông đúc", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "relaxed", vi: "thư giãn", distractor: false},
        {word: "played", vi: "chơi (sai dạng)", distractor: true}
      ]
    }
  }
};
