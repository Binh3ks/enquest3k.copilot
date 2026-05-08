export default {
  title: "My World",
  min_words: 40,
  model_sentence: "My name is Emma and I want to show you my world. I have a wonderful family with my mom, my dad, and my little sister. I can draw beautiful pictures with colorful pencils. I can sing happy songs and dance to music. I help my mom cook delicious dinner every evening. I play fun games with my best friend Lily at the park. I am so proud to tell you about my world!",
  instruction_en: "Use: Today I am presenting about... / I can... / I like... / I feel... when I present.",
  instruction_vi: "Dùng: Today I am presenting about... / I can... / I like... / I feel... when I present.",
  prompt_en: "Imagine you are giving a short presentation about yourself to the class! What is your topic? What can you do well? What do you like? How do you feel when you present? What is one interesting fact about you?",
  prompt_vi: "Hãy tưởng tượng bạn đang thuyết trình ngắn về bản thân! Chủ đề là gì? Bạn giỏi điều gì? Bạn thích gì? Cảm giác khi thuyết trình? Một điều thú vị về bạn?",
  keywords: ["show", "tell", "name", "family", "can", "help", "draw", "sing", "play", "friend"],
  topic_talk_prompt: "Tell me about your favourite things. What do you like most?",
  sentence_frames: [{"template":"Today I am presenting about ___."},{"template":"My topic is important because ___."},{"template":"I can ___ and I can also ___."},{"template":"I like ___ and my favourite ___ is ___."},{"template":"One interesting fact about me is ___."},{"template":"When I present, I feel ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== TOPICS (Chủ đề) ===", vi: "", distractor: false},
        {word: "my family", vi: "gia đình tôi", distractor: false},
        {word: "my hobbies", vi: "sở thích tôi", distractor: false},
        {word: "my talents", vi: "tài năng tôi", distractor: false},
        {word: "my school", vi: "trường tôi", distractor: false},
        {word: "=== VERBS (Động từ) ===", vi: "", distractor: false},
        {word: "draw", vi: "vẽ", distractor: false},
        {word: "sing", vi: "hát", distractor: false},
        {word: "play", vi: "chơi", distractor: false},
        {word: "dance", vi: "nhảy", distractor: false},
        {word: "read", vi: "đọc", distractor: false},
        {word: "cook", vi: "nấu ăn", distractor: false},
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "sport", vi: "thể thao", distractor: false},
        {word: "food", vi: "món ăn", distractor: false},
        {word: "subject", vi: "môn học", distractor: false},
        {word: "color", vi: "màu sắc", distractor: false},
        {word: "=== ADJECTIVES (Tính từ) ===", vi: "", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "proud", vi: "tự hào", distractor: false},
        {word: "nervous", vi: "hồi hộp", distractor: false},
        {word: "confident", vi: "tự tin", distractor: false},
        {word: "hobby", vi: "sở thích (sai loại từ)", distractor: true},
        {word: "presenting", vi: "thuyết trình (sai dạng)", distractor: true}
      ]
    }
  }
};
