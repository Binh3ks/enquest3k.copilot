export default {
  title: "My Neighborhood",
  min_words: 30,
  model_sentence: "I live near a river. There was an old market near my house. There were big trees on the road. There was a wooden bridge over the river. Now there are new buildings. But the old temple is still there. I love my neighborhood!",
  instruction_en: "Use: There was a... / There were... / It was... / Now there is/are...",
  instruction_vi: "Dùng: There was a... / There were... / It was... / Now there is/are...",
  prompt_en: "Describe an old place — a market, a school, or a village! Was there a market? Were there trees? Were there many people? What was it like? What is it like now?",
  prompt_vi: "Mô tả một nơi cũ — chợ, trường học hay làng quê! Có chợ không? Có cây không? Có nhiều người không? Ngày xưa như thế nào? Bây giờ ra sao?",
  keywords: ["there was", "there were", "old", "new", "building", "tree", "river", "road", "bridge", "market", "temple", "village"],
  topic_talk_prompt: "Tell me about how a place looked in the past. What was it like?",
  sentence_frames: [{"template":"Long ago, there was a ___ in ___."},{"template":"There were ___ and ___."},{"template":"It was ___ and ___."},{"template":"People used to ___ there every ___."},{"template":"But now, ___ has changed."},{"template":"Now there is/are ___ instead."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "=== PLACES (grouped) ===", vi: "", distractor: false},
        {word: "market", vi: "chợ", distractor: false},
        {word: "temple", vi: "chùa/đền", distractor: false},
        {word: "school", vi: "trường học", distractor: false},
        {word: "village", vi: "làng", distractor: false},
        {word: "my neighborhood", vi: "khu phố tôi", distractor: false},
        {word: "=== OTHER WORDS (shuffled) ===", vi: "", distractor: false},
        {word: "big trees", vi: "cây to", distractor: false},
        {word: "many people", vi: "nhiều người", distractor: false},
        {word: "old buildings", vi: "tòa nhà cũ", distractor: false},
        {word: "small shops", vi: "cửa hàng nhỏ", distractor: false},
        {word: "a wooden bridge", vi: "cầu gỗ", distractor: false},
        {word: "old", vi: "cũ", distractor: false},
        {word: "quiet", vi: "yên tĩnh", distractor: false},
        {word: "beautiful", vi: "đẹp", distractor: false},
        {word: "peaceful", vi: "yên bình", distractor: false},
        {word: "shop", vi: "mua sắm", distractor: false},
        {word: "walk", vi: "đi bộ", distractor: false},
        {word: "play", vi: "chơi", distractor: false},
        {word: "day", vi: "ngày", distractor: false},
        {word: "weekend", vi: "cuối tuần", distractor: false},
        {word: "everything", vi: "mọi thứ", distractor: false},
        {word: "new buildings", vi: "tòa nhà mới", distractor: false},
        {word: "shops", vi: "cửa hàng (sai dạng)", distractor: true},
        {word: "walked", vi: "đi bộ (sai dạng)", distractor: true}
      ]
    }
  }
};
