export default {
  title: "My Family",
  min_words: 30,
  model_sentence: "This is my family. This is my mother. She is kind. This is my father. He is strong. We are a team. I love my family.",
  instruction_en: "Use: This is my... / He/She is... / He/She has... / We have...",
  instruction_vi: "Dùng: This is my... / He/She is... / He/She has... / We have...",
  prompt_en: "Write about your family! Who is in your family? What do they look like? What do they do? Do you have a pet? Write 4–5 sentences.",
  prompt_vi: "Viết về gia đình bạn! Gia đình có những ai? Họ trông như thế nào? Họ làm gì? Nhà bạn có thú cưng không? Viết 4–5 câu.",
  keywords: ["This is my", "mother", "father", "family", "love", "team"],
  sentence_frames: [{"template":"This is my family. We are ___."},{"template":"This is my ___. His/Her name is ___."},{"template":"He/She is ___ and He/She has ___ hair."},{"template":"We like to ___ together."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] happy", vi: "hạnh phúc", distractor: false},
        {word: "[1] a team", vi: "một đội", distractor: false},
        {word: "[2] mother", vi: "mẹ", distractor: false},
        {word: "[2] father", vi: "bố", distractor: false},
        {word: "[2] sister", vi: "chị/em gái", distractor: false},
        {word: "[2] brother", vi: "anh/em trai", distractor: false},
        {word: "[3] Anna", vi: "Anna (tên)", distractor: false},
        {word: "[3] John", vi: "John (tên)", distractor: false},
        {word: "[4] kind", vi: "tốt bụng", distractor: false},
        {word: "[4] tall", vi: "cao", distractor: false},
        {word: "[4] strong", vi: "khỏe mạnh", distractor: false},
        {word: "tall", vi: "cao (sai dạng)", distractor: true},
        {word: "[5] long", vi: "dài", distractor: false},
        {word: "[5] short", vi: "ngắn", distractor: false},
        {word: "[5] black", vi: "đen", distractor: false},
        {word: "[6] play", vi: "chơi", distractor: false},
        {word: "[6] cook", vi: "nấu ăn", distractor: false},
        {word: "[6] eat", vi: "ăn", distractor: false},
        {word: "plays", vi: "chơi (sai dạng)", distractor: true}
      ]
    }
  }
};
