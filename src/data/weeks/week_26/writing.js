export default {
  title: "Writing: My Weekend Comic Strip",
  min_words: 40,
  instruction_en: "Panel 1: Saturday morning... / Panel 2: Then... / Panel 3: Suddenly.../The funny moment was... / Panel 4: At the end...",
  instruction_vi: "Cảnh 1: Sáng thứ Bảy... / Cảnh 2: Sau đó... / Cảnh 3: Bất ngờ.../Khoảnh khắc buồn cười... / Cảnh 4: Cuối cùng...",
  prompt_en: "Write about your weekend in 4 comic strip panels! What did you do in the morning? What happened next? What was the exciting or funny moment? How did your weekend end?",
  prompt_vi: "Viết về cuối tuần của bạn theo 4 phân cảnh truyện tranh! Buổi sáng bạn làm gì? Chuyện gì xảy ra tiếp theo? Khoảnh khắc thú vị hoặc buồn cười là gì? Cuối tuần kết thúc ra sao?",
  keywords: ["panel", "caption", "comic strip", "weekend", "visited", "played", "watched", "walked", "sketched", "returned", "was", "were", "first", "next", "then", "finally", "character", "scene", "adventure", "title"],
  topic_talk_prompt: "Tell me about what you did last weekend from the beginning to the end. Tell it like a story.",
  sentence_frames: [{"template":"Panel 1: On Saturday morning, I ___ed ___."},
{"template":"Panel 2: Then I ___ed ___ and it was ___."},
{"template":"Panel 3: Suddenly, ___ happened!"},
{"template":"Panel 4: At the end, I felt ___."},{"template":"It was a ___ Saturday because ___."}],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      words: [
        {word: "visited", vi: "đã thăm", distractor: false},
        {word: "played", vi: "đã chơi", distractor: false},
        {word: "play", vi: "chơi", distractor: true},
        {word: "watched", vi: "đã xem", distractor: false},
        {word: "walked", vi: "đã đi bộ", distractor: false},
        {word: "watch", vi: "xem", distractor: true},
        {word: "returned", vi: "đã về", distractor: false},
        {word: "was", vi: "đã là/ở", distractor: false},
        {word: "were", vi: "đã là/ở", distractor: false},
        {word: "visit", vi: "thăm", distractor: true},
        {word: "first", vi: "đầu tiên", distractor: false},
        {word: "next", vi: "tiếp theo", distractor: false},
        {word: "finally", vi: "cuối cùng", distractor: false}
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
