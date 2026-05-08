export default {
  title: "My Favourite Weekend Place",
  prompt_en: "Write about your favourite place to visit on weekends! Where do you go? Who do you go with? What can you do there? Why do you love this place?",
  prompt_vi: "Viết về địa điểm yêu thích cuối tuần! Bạn đi đâu? Đi cùng ai? Ở đó có thể làm gì? Tại sao bạn thích nơi đó?",
  instruction_en: "Use: My favourite place is... / I go there with... / At the ___, I can... / I love it because...",
  instruction_vi: "Dùng: My favourite place is... / I go there with... / At the ___, I can... / I love it because...",
  min_words: 30,
  model_sentence: "My favourite place is the park. There is a big tree and there are many flowers. I go with my family. We play and walk together!",
  keywords: ["park", "playground", "library", "zoo", "there is", "there are", "go", "play"],
  topic_talk_prompt: "Tell me about your favourite place on weekends. What do you do there?",
  sentence_frames: [{"template":"My favourite place on the weekend is the ___."},{"template":"I go there with ___."},{"template":"At the ___, I can ___ and ___."},{"template":"The ___ is ___ and ___."},{"template":"I always feel ___ when I am there."},{"template":"I love it because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "park", vi: "công viên", distractor: false},
        {word: "playground", vi: "sân chơi", distractor: false},
        {word: "library", vi: "thư viện", distractor: false},
        {word: "zoo", vi: "sở thú", distractor: false},
        {word: "beach", vi: "bãi biển", distractor: false},
        {word: "mall", vi: "trung tâm thương mại", distractor: false},
        {word: "family", vi: "gia đình", distractor: false},
        {word: "friends", vi: "bạn bè", distractor: false},
        {word: "parents", vi: "bố mẹ", distractor: false},
        {word: "=== ADJECTIVES (Tính từ) ===", vi: "", distractor: false},
        {word: "big", vi: "to", distractor: false},
        {word: "beautiful", vi: "đẹp", distractor: false},
        {word: "fun", vi: "vui", distractor: false},
        {word: "clean", vi: "sạch", distractor: false},
        {word: "peaceful", vi: "yên bình", distractor: false},
        {word: "happy", vi: "vui vẻ", distractor: false},
        {word: "excited", vi: "hào hứng", distractor: false},
        {word: "relaxed", vi: "thư giãn", distractor: false},
        {word: "=== VERBS (Động từ) ===", vi: "", distractor: false},
        {word: "play", vi: "chơi", distractor: false},
        {word: "run", vi: "chạy", distractor: false},
        {word: "read", vi: "đọc", distractor: false},
        {word: "swim", vi: "bơi", distractor: false},
        {word: "walk", vi: "đi bộ", distractor: false},
        {word: "relax", vi: "thư giãn", distractor: false},
        {word: "playing", vi: "chơi (sai dạng)", distractor: true},
        {word: "beauty", vi: "đẹp (sai loại từ)", distractor: true}
      ]
    }
  }
};
