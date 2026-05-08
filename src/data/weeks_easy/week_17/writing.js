export default {
  title: "My Weather Day",
  min_words: 30,
  model_sentence: "It is raining today, so I am wearing my coat. I am also carrying my umbrella. My boots keep my feet dry. The sky is grey and cloudy. The weather is cold and wet. I put on my hat before I go outside. When it is sunny, I wear a T-shirt and a cap. I always dress for the weather so I stay warm and dry!",
  instruction_en: "Use: It is ___, so I am wearing... / Because it is..., I am ___ing...",
  instruction_vi: "Dùng: It is ___, so I am wearing... / Because it is..., I am ___ing...",
  prompt_en: "Write about the weather today and what you are wearing! What is the weather like? Is it hot, cold, rainy or sunny? What are you wearing and why? What are you doing because of the weather?",
  prompt_vi: "Viết về thời tiết hôm nay và trang phục! Thời tiết như thế nào? Nóng, lạnh, mưa hay nắng? Bạn đang mặc gì và tại sao? Thời tiết ảnh hưởng đến hoạt động của bạn ra sao?",
  keywords: ["It is", "raining", "snowing", "sunny", "cold", "warm", "so", "wearing", "coat", "boots", "hat", "umbrella"],
  topic_talk_prompt: "Tell me about the weather today. What are people wearing?",
  sentence_frames: [{"template":"Today the weather is ___ and ___."},{"template":"It is ___, so I am wearing ___."},{"template":"Because it is ___, I am ___ing ___."},{"template":"I am also wearing ___ because ___."},{"template":"The sky is ___ and I can see ___."},{"template":"I love/don't like this weather because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== WEATHER (Thời tiết) ===", vi: "", distractor: false},
        {word: "sunny", vi: "nắng", distractor: false},
        {word: "rainy", vi: "mưa", distractor: false},
        {word: "cold", vi: "lạnh", distractor: false},
        {word: "hot", vi: "nóng", distractor: false},
        {word: "warm", vi: "ấm", distractor: false},
        {word: "windy", vi: "có gió", distractor: false},
        {word: "cloudy", vi: "nhiều mây", distractor: false},
        {word: "=== CLOTHES (Quần áo) ===", vi: "", distractor: false},
        {word: "a coat", vi: "áo khoác", distractor: false},
        {word: "a jacket", vi: "áo khoác ngắn", distractor: false},
        {word: "boots", vi: "ủng", distractor: false},
        {word: "an umbrella", vi: "ô", distractor: false},
        {word: "a hat", vi: "mũ", distractor: false},
        {word: "a scarf", vi: "khăn quàng", distractor: false},
        {word: "a T-shirt", vi: "áo thun", distractor: false},
        {word: "shorts", vi: "quần đùi", distractor: false},
        {word: "=== VERBS -ING (Động từ) ===", vi: "", distractor: false},
        {word: "wearing", vi: "đang mặc", distractor: false},
        {word: "carrying", vi: "đang mang", distractor: false},
        {word: "staying", vi: "đang ở", distractor: false},
        {word: "playing", vi: "đang chơi", distractor: false},
        {word: "=== ADJECTIVES (Tính từ SKY) ===", vi: "", distractor: false},
        {word: "blue", vi: "xanh", distractor: false},
        {word: "grey", vi: "xám", distractor: false},
        {word: "clear", vi: "trong", distractor: false},
        {word: "wear", vi: "mặc (sai dạng)", distractor: true},
        {word: "rained", vi: "mưa (sai dạng)", distractor: true}
      ]
    }
  }
};
