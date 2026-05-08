export default {
  title: "My Best Friend",
  min_words: 40,
  model_sentence: "This is my best friend. His name is Tom. He is tall. He has short hair. His hair is black. He has brown eyes. He wears glasses. He has a big smile. He is kind. He is funny. I like my friend.",
  instruction_en: "Use: My best friend is... / He/She is (tall/short)... / He/She has (black/long) hair... / I like them because...",
  instruction_vi: "Dùng: My best friend is... / He/She is... / He/She has... hair... / I like them because...",
  prompt_en: "Write about your best friend! What is their name? What do they look like — tall or short, what colour is their hair? Do they wear glasses? Why do you like them?",
  prompt_vi: "Viết về bạn thân của bạn! Tên bạn ấy là gì? Trông như thế nào — cao hay thấp, tóc màu gì? Bạn ấy đeo kính không? Tại sao bạn thích bạn ấy?",
  keywords: ["tall", "short", "hair", "eyes", "glasses", "face", "smile"],
  sentence_frames: [
    {"template":"My best friend's name is ___ and he/she is ___ years old."},
    {"template":"He/She is ___ and he/she has ___ hair with ___ eyes."},
    {"template":"He/She ___ glasses and has a ___."},
    {"template":"He/She is very ___ and always makes me ___."},
    {"template":"We like to ___ together after school and it is ___."},
    {"template":"I like my friend because ___ and we are ___!"}
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] Tom", vi: "Tom (tên)", distractor: false},
        {word: "[1] Lucy", vi: "Lucy (tên)", distractor: false},
        {word: "[1] Jake", vi: "Jake (tên)", distractor: false},
        {word: "[2] nine", vi: "9 tuổi", distractor: false},
        {word: "[2] ten", vi: "10 tuổi", distractor: false},
        {word: "[3] tall", vi: "cao", distractor: false},
        {word: "[3] short", vi: "thấp", distractor: false},
        {word: "[4] long black", vi: "đen dài", distractor: false},
        {word: "[4] short brown", vi: "nâu ngắn", distractor: false},
        {word: "[4] curly red", vi: "đỏ xoăn", distractor: false},
        {word: "[5] brown", vi: "nâu", distractor: false},
        {word: "[5] blue", vi: "xanh", distractor: false},
        {word: "[5] green", vi: "xanh lá", distractor: false},
        {word: "[6] wears", vi: "đeo", distractor: false},
        {word: "[6] doesn't wear", vi: "không đeo", distractor: false},
        {word: "[7] big smile", vi: "nụ cười tươi", distractor: false},
        {word: "[7] round face", vi: "mặt tròn", distractor: false},
        {word: "[8] kind", vi: "tử tế", distractor: false},
        {word: "[8] funny", vi: "vui tính", distractor: false},
        {word: "[8] smart", vi: "thông minh", distractor: false},
        {word: "[9] laugh", vi: "cười", distractor: false},
        {word: "[9] feel happy", vi: "cảm thấy vui", distractor: false},
        {word: "[10] play soccer", vi: "chơi bóng đá", distractor: false},
        {word: "[10] ride bikes", vi: "đạp xe", distractor: false},
        {word: "[10] draw pictures", vi: "vẽ tranh", distractor: false},
        {word: "[11] so much fun", vi: "rất vui", distractor: false},
        {word: "[11] very exciting", vi: "rất thú vị", distractor: false},
        {word: "[12] he/she is always nice to me", vi: "bạn ấy luôn tốt với tôi", distractor: false},
        {word: "[12] we help each other", vi: "chúng tôi giúp nhau", distractor: false},
        {word: "[13] best friends forever", vi: "bạn thân mãi mãi", distractor: false},
        {word: "[13] like siblings", vi: "như anh em", distractor: false},
        {word: "mean", vi: "xấu tính (sai ngữ cảnh)", distractor: true},
        {word: "boring", vi: "nhàm chán (sai ngữ cảnh)", distractor: true}
      ]
    }
  }
};
