export default {
  title: "My Friend",
  min_words: 30,
  model_sentence: "This is my friend. Her name is Lily. She is tall. She has long hair. Her hair is black. She has big eyes. She has a nice smile. I like my friend.",
  instruction_en: "Use: My best friend is... / He/She is (tall/short)... / He/She has (black/long) hair... / I like them because...",
  instruction_vi: "Dùng: My best friend is... / He/She is... / He/She has... hair... / I like them because...",
  prompt_en: "Write about your best friend! What is their name? What do they look like — tall or short, what colour is their hair? Do they wear glasses? Why do you like them?",
  prompt_vi: "Viết về bạn thân của bạn! Tên bạn ấy là gì? Trông như thế nào — cao hay thấp, tóc màu gì? Bạn ấy đeo kính không? Tại sao bạn thích bạn ấy?",
  keywords: ["tall", "short", "hair", "eyes", "smile"],
  sentence_frames: [{"template":"My best friend is ___."},{"template":"He/She is ___ and He/She has ___ hair."},{"template":"He/She ___ glasses."},{"template":"I like my friend because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] Lily", vi: "Lily (tên)", distractor: false},
        {word: "[1] Tom", vi: "Tom (tên)", distractor: false},
        {word: "[1] Sarah", vi: "Sarah (tên)", distractor: false},
        {word: "[2] tall", vi: "cao", distractor: false},
        {word: "[2] short", vi: "thấp", distractor: false},
        {word: "[2] funny", vi: "vui tính", distractor: false},
        {word: "[3] long", vi: "dài", distractor: false},
        {word: "[3] short", vi: "ngắn", distractor: false},
        {word: "[3] black", vi: "đen", distractor: false},
        {word: "[3] brown", vi: "nâu", distractor: false},
        {word: "shorts", vi: "quần đùi (sai từ)", distractor: true},
        {word: "[4] wears", vi: "đeo", distractor: false},
        {word: "[4] doesn't wear", vi: "không đeo", distractor: false},
        {word: "wear", vi: "đeo (sai dạng)", distractor: true},
        {word: "[5] he/she is kind", vi: "bạn ấy tốt bụng", distractor: false},
        {word: "[5] he/she is funny", vi: "bạn ấy vui tính", distractor: false},
        {word: "[5] we play together", vi: "chúng mình chơi cùng nhau", distractor: false}
      ]
    }
  }
};
