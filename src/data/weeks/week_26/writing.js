export default {
  title: "Writing: My Weekend Comic Strip",
  min_words: 40,
  instruction_en: "Panel 1: Saturday morning... / Panel 2: Then... / Panel 3: Suddenly.../The funny moment was... / Panel 4: At the end...",
  instruction_vi: "Cảnh 1: Sáng thứ Bảy... / Cảnh 2: Sau đó... / Cảnh 3: Bất ngờ.../Khoảnh khắc buồn cười... / Cảnh 4: Cuối cùng...",
  prompt_en: "Write about your weekend in 4 comic strip panels! What did you do in the morning? What happened next? What was the exciting or funny moment? How did your weekend end?",
  prompt_vi: "Viết về cuối tuần của bạn theo 4 phân cảnh truyện tranh! Buổi sáng bạn làm gì? Chuyện gì xảy ra tiếp theo? Khoảnh khắc thú vị hoặc buồn cười là gì? Cuối tuần kết thúc ra sao?",
  keywords: ["panel", "caption", "comic strip", "weekend", "visited", "played", "watched", "walked", "sketched", "returned", "was", "were", "first", "next", "then", "finally", "character", "scene", "adventure", "title"],
  topic_talk_prompt: "Tell me about what you did last weekend from the beginning to the end. Tell it like a story.",
  sentence_frames: [
    {"template":"Hello! ___."},
    {"template":"___, I woke up early in the morning."},
    {"template":"The weather ___ and I felt very excited."},
    {"template":"First, ___ with my dog."},
    {"template":"We ___ on the grass together and had so much fun."},
    {"template":"Then ___ in the kitchen."},
    {"template":"We cooked ___ with rice and vegetables."},
    {"template":"Next, ___ on TV and it was hilarious."},
    {"template":"I ___ because the movie was so entertaining."},
    {"template":"Finally, I ___ and went to bed feeling happy."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      scaffolding_stage: "low", // W26+: fully shuffled phrases/clauses
      words: [
        {word: "My name is Max and I am nine years old", vi: "Tên tôi là Max và tôi 9 tuổi", distractor: false},
        {word: "My name is Luna and I am eight years old", vi: "Tên tôi là Luna và tôi 8 tuổi", distractor: false},
        {word: "Last Saturday morning", vi: "Sáng thứ Bảy tuần trước", distractor: false},
        {word: "Last Sunday morning", vi: "Sáng Chủ nhật tuần trước", distractor: false},
        {word: "was sunny and warm", vi: "nắng và ấm", distractor: false},
        {word: "was cloudy but nice", vi: "nhiều mây nhưng đẹp", distractor: false},
        {word: "I walked to the park", vi: "tôi đi bộ đến công viên", distractor: false},
        {word: "I ran to the playground", vi: "tôi chạy đến sân chơi", distractor: false},
        {word: "played soccer and ran around", vi: "chơi bóng và chạy quanh", distractor: false},
        {word: "threw a ball and chased it", vi: "ném bóng và đuổi theo", distractor: false},
        {word: "I helped my mother", vi: "tôi giúp mẹ", distractor: false},
        {word: "my father and I cooked together", vi: "bố và tôi nấu cùng nhau", distractor: false},
        {word: "a delicious chicken dish", vi: "món gà ngon", distractor: false},
        {word: "some tasty fish with sauce", vi: "cá ngon với nước sốt", distractor: false},
        {word: "I watched a funny movie", vi: "tôi xem phim hài", distractor: false},
        {word: "we saw an exciting cartoon", vi: "chúng tôi xem phim hoạt hình thú vị", distractor: false},
        {word: "laughed a lot and clapped my hands", vi: "cười nhiều và vỗ tay", distractor: false},
        {word: "was very happy and couldn't stop smiling", vi: "rất vui và không ngừng cười", distractor: false},
        {word: "returned home feeling tired", vi: "trở về nhà cảm thấy mệt", distractor: false},
        {word: "came back and rested on the sofa", vi: "trở lại và nghỉ trên ghế sofa", distractor: false},
        {word: "go to the park", vi: "đi công viên (sai dạng)", distractor: true},
        {word: "help my mother", vi: "giúp mẹ (sai dạng)", distractor: true},
        {word: "watch a movie", vi: "xem phim (sai dạng)", distractor: true}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example? (Try writing first!)",
      label_vi: "📖 Xem mẫu? (Thử viết trước nhé!)",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Here is my Weekend Comic Strip. Panel 1: First, I walked to the park with my friend on Saturday morning. It was sunny and warm. Panel 2: Next, we played on the swings and laughed a lot. We were very happy. Panel 3: Then, we watched some children do a dance performance. It was amazing! Panel 4: Finally, we returned home and I felt tired but happy. It was a wonderful weekend!"
    }
  }
};
