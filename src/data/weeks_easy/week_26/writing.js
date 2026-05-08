export default {
  title: "Writing: My Weekend in Four Panels",
  min_words: 30,
  model_sentence: "Last weekend, I visited the park with my dog. First, we walked to the park together. It was sunny and warm. Then, my dog played with a ball. He was very happy and excited. We also watched some children playing. Finally, we returned home tired but happy. It was a great weekend adventure.",
  instruction_en: "Panel 1: Saturday morning... / Panel 2: Then... / Panel 3: Suddenly.../The funny moment was... / Panel 4: At the end...",
  instruction_vi: "Cảnh 1: Sáng thứ Bảy... / Cảnh 2: Sau đó... / Cảnh 3: Bất ngờ.../Khoảnh khắc buồn cười... / Cảnh 4: Cuối cùng...",
  prompt_en: "Write about your weekend in 4 comic strip panels! What did you do in the morning? What happened next? What was the exciting or funny moment? How did your weekend end?",
  prompt_vi: "Viết về cuối tuần của bạn theo 4 phân cảnh truyện tranh! Buổi sáng bạn làm gì? Chuyện gì xảy ra tiếp theo? Khoảnh khắc thú vị hoặc buồn cười là gì? Cuối tuần kết thúc ra sao?",
  keywords: ["was", "were", "visited", "played", "watched", "returned", "weekend", "happy", "tired", "panel", "comic strip", "caption"],
  topic_talk_prompt: "Tell me about what you did last weekend. Tell the story.",
  sentence_frames: [
    {"template":"Panel 1: First, I ___."},
    {"template":"Panel 2: Then, I ___."},
    {"template":"Panel 3: Next, I ___."},
    {"template":"Panel 4: Finally, I ___."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click for word bank",
      label_vi: "💡 Cần trợ giúp? Bấm để xem từ",
      show_by_default: false,
      words: [
        {word: "visited", vi: "đã thăm", distractor: false},
        {word: "played", vi: "đã chơi", distractor: false},
        {word: "visit", vi: "thăm", distractor: true},
        {word: "watched", vi: "đã xem", distractor: false},
        {word: "walked", vi: "đã đi bộ", distractor: false},
        {word: "play", vi: "chơi", distractor: true},
        {word: "park", vi: "công viên", distractor: false},
        {word: "zoo", vi: "vườn thú", distractor: false},
        {word: "watch", vi: "xem", distractor: true},
        {word: "beach", vi: "bãi biển", distractor: false},
        {word: "museum", vi: "bảo tàng", distractor: false},
        {word: "fun", vi: "vui", distractor: false},
        {word: "boring", vi: "chán", distractor: false},
        {word: "exciting", vi: "thú vị", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "tired", vi: "mệt", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example paragraph",
      label_vi: "📖 Xem bài mẫu",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last weekend, I visited the park with my dog. First, we walked to the park together. It was sunny and warm. Then, my dog played with a ball. He was very happy and excited. We also watched some children playing. Finally, we returned home tired but happy. It was a great weekend adventure."
    }
  }
};
