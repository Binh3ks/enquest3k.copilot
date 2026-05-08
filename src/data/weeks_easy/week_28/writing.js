export default {
  title: "Writing: The Tortoise and the Hare",
  min_words: 30,
  model_sentence: "One day, the hare ran very fast and got far ahead of the tortoise. Then he stopped and took a long nap under a big tree. He thought he had plenty of time. The tortoise walked slowly but never stopped. After a long time, the tortoise walked past the sleeping hare. Finally, the tortoise crossed the finish line and won the race. The lesson is: slow and steady wins the race!",
  instruction_en: "Use: Once upon a time... / The hare ran/slept... / The tortoise walked/won... / The lesson is...",
  instruction_vi: "Dùng: Once upon a time... / The hare ran/slept... / The tortoise walked/won... / The lesson is...",
  prompt_en: "Retell the story of The Tortoise and the Hare in your own words! Who were the characters? What did the Hare do? What did the Tortoise do? Who won and why? What is the lesson?",
  prompt_vi: "Kể lại câu chuyện Rùa và Thỏ bằng lời của bạn! Có những nhân vật nào? Thỏ đã làm gì? Rùa đã làm gì? Ai thắng và tại sao? Bài học là gì?",
  keywords: ["tortoise", "hare", "race", "ran", "slept", "won", "lost", "slow", "steady", "fast", "nap", "finish", "lesson", "first", "then", "after that", "finally", "won", "cheer"],
  topic_talk_prompt: "Tell me about a time you worked hard to finish something. What happened?",
  sentence_frames: [
    {"template":"Once upon a time, a ___ and a ___ had a race."},
    {"template":"The hare ran very ___, but the tortoise walked ___."},
    {"template":"The hare ___ed and the tortoise ___ed past him."},
    {"template":"The ___ won because ___. The lesson is: ___."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click for word bank",
      label_vi: "💡 Cần trợ giúp? Bấm để xem từ",
      show_by_default: false,
      words: [
        {word: "tortoise", vi: "con rùa", distractor: false},
        {word: "hare", vi: "con thỏ", distractor: false},
        {word: "run", vi: "chạy", distractor: true},
        {word: "race", vi: "cuộc đua", distractor: false},
        {word: "ran", vi: "đã chạy", distractor: false},
        {word: "slept", vi: "đã ngủ", distractor: false},
        {word: "sleep", vi: "ngủ", distractor: true},
        {word: "won", vi: "đã thắng", distractor: false},
        {word: "fast", vi: "nhanh", distractor: false},
        {word: "slow", vi: "chậm", distractor: false},
        {word: "slowly", vi: "chậm rãi", distractor: false},
        {word: "win", vi: "thắng", distractor: true},
        {word: "steady", vi: "đều đặn", distractor: false},
        {word: "finish", vi: "đích", distractor: false},
        {word: "lesson", vi: "bài học", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example paragraph",
      label_vi: "📖 Xem bài mẫu",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "One day, the hare ran very fast and got far ahead of the tortoise. Then he stopped and took a long nap under a big tree. He thought he had plenty of time. The tortoise walked slowly but never stopped. After a long time, the tortoise walked past the sleeping hare. Finally, the tortoise crossed the finish line and won the race. The lesson is: slow and steady wins the race!"
    }
  }
};
