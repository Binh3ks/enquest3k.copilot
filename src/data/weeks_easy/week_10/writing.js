export default {
  title: "City and Farm",
  min_words: 30,
  model_sentence: "I like the farm. The city is noisy, but the farm is quiet. The city is dirty, but the farm is clean. I see a cow on the farm. I see a chicken. The farm has many animals. The field is green. I see trees. The farm is peaceful. I love the farm!",
  instruction_en: "Use: A city has... but a farm has... / I prefer... because...",
  instruction_vi: "Dùng: A city has... but a farm has... / I prefer... because...",
  prompt_en: "Compare city life and farm life! What is good about living in a city? What is good about living on a farm? Which do you prefer and why? Write 4–5 sentences using 'but'.",
  prompt_vi: "So sánh cuộc sống thành phố và nông thôn! Sống ở thành phố tốt điều gì? Sống ở nông thôn tốt điều gì? Bạn thích nơi nào hơn và tại sao? Dùng 'but'.",
  keywords: ["city", "farm", "quiet", "clean", "but", "cow", "chicken", "animals", "field", "tree"],
  topic_talk_prompt: "Tell me about animals on a farm. What do they do?",
  sentence_frames: [{"template":"A city has ___, but a farm has ___."},{"template":"In a city, you can ___, but on a farm, you can ___."},{"template":"A city is ___, but a farm is ___."},{"template":"People in a city ___, but people on a farm ___."},{"template":"I prefer ___ because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "buildings", vi: "tòa nhà", distractor: false},
        {word: "cars", vi: "ô tô", distractor: false},
        {word: "shops", vi: "cửa hàng", distractor: false},
        {word: "animals", vi: "động vật", distractor: false},
        {word: "cows", vi: "bò", distractor: false},
        {word: "chickens", vi: "gà", distractor: false},
        {word: "fields", vi: "cánh đồng", distractor: false},
        {word: "trees", vi: "cây", distractor: false},
        {word: "city", vi: "thành phố", distractor: false},
        {word: "farm", vi: "nông trại", distractor: false},
        {word: "=== ADJECTIVES (Tính từ) ===", vi: "", distractor: false},
        {word: "noisy", vi: "ồn ào", distractor: false},
        {word: "quiet", vi: "yên tĩnh", distractor: false},
        {word: "dirty", vi: "bẩn", distractor: false},
        {word: "clean", vi: "sạch", distractor: false},
        {word: "busy", vi: "bận rộn", distractor: false},
        {word: "peaceful", vi: "yên bình", distractor: false},
        {word: "green", vi: "xanh", distractor: false},
        {word: "=== VERBS (Động từ) ===", vi: "", distractor: false},
        {word: "shop", vi: "mua sắm", distractor: false},
        {word: "work", vi: "làm việc", distractor: false},
        {word: "drive", vi: "lái xe", distractor: false},
        {word: "plant", vi: "trồng", distractor: false},
        {word: "feed animals", vi: "cho ăn", distractor: false},
        {word: "play outside", vi: "chơi ngoài trời", distractor: false},
        {word: "quietly", vi: "yên tĩnh (sai loại từ)", distractor: true},
        {word: "farming", vi: "nông trại (sai dạng)", distractor: true}
      ]
    }
  }
};
