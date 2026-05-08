export default {
  title: "Writing: Retell The Tortoise and the Hare",
  min_words: 50,
  model_sentence: "Once upon a time, the Hare boasted about his speed every day. One morning, the Tortoise challenged him to a race. At first, the Hare ran very fast and got far ahead. Then, feeling too confident, he stopped to take a nap under a shady tree. He slept for a long time. Meanwhile, the Tortoise walked slowly but steadily — he never stopped. When the Hare finally woke up and ran again, it was too late. The Tortoise had already crossed the finish line and won the race! The moral of this fable is clear: slow and steady wins the race. It is better to persevere than to be overconfident.",
  instruction_en: "Use: Once upon a time... / The hare ran/slept... / The tortoise walked/won... / The lesson is...",
  instruction_vi: "Dùng: Once upon a time... / The hare ran/slept... / The tortoise walked/won... / The lesson is...",
  prompt_en: "Retell the story of The Tortoise and the Hare in your own words! Who were the characters? What did the Hare do? What did the Tortoise do? Who won and why? What is the lesson?",
  prompt_vi: "Kể lại câu chuyện Rùa và Thỏ bằng lời của bạn! Có những nhân vật nào? Thỏ đã làm gì? Rùa đã làm gì? Ai thắng và tại sao? Bài học là gì?",
  keywords: ["tortoise", "hare", "race", "boast", "boasted", "ran", "fast", "slept", "nap", "steady", "determined", "won", "moral", "persevere", "cheer", "cheered", "finish", "first", "then", "after that", "finally", "confident", "overtake"],
  topic_talk_prompt: "Tell me about a time when you worked slowly and steadily to finish something difficult. What happened in the end?",
  sentence_frames: [
    {"template":"Once upon a time, a ___ and a ___ decided to have a ___."},
    {"template":"The hare was very ___ and ___ed, 'I am the ___!'"},
    {"template":"The race ___ed and the hare ran very ___."},
    {"template":"After a while, the hare felt ___ and decided to ___."},
    {"template":"Meanwhile, the tortoise walked ___ and ___ without stopping."},
    {"template":"While the hare was ___ing, the tortoise ___ed past him."},
    {"template":"When the hare woke up, he saw the tortoise near the ___."},
    {"template":"The ___ won because ___. The moral is: ___ and ___ wins."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      words: [
        {word: "tortoise", vi: "con rùa", distractor: false},
        {word: "hare", vi: "con thỏ", distractor: false},
        {word: "run", vi: "chạy", distractor: true},
        {word: "race", vi: "cuộc đua", distractor: false},
        {word: "boasted", vi: "khoe khoang", distractor: false},
        {word: "ran", vi: "đã chạy", distractor: false},
        {word: "sleep", vi: "ngủ", distractor: true},
        {word: "slept", vi: "đã ngủ", distractor: false},
        {word: "won", vi: "đã thắng", distractor: false},
        {word: "win", vi: "thắng", distractor: true},
        {word: "steady", vi: "đều đặn", distractor: false},
        {word: "determined", vi: "quyết tâm", distractor: false},
        {word: "moral", vi: "bài học", distractor: false},
        {word: "finish", vi: "đích", distractor: false},
        {word: "fast", vi: "nhanh", distractor: false},
        {word: "slow", vi: "chậm", distractor: false},
        {word: "slowly", vi: "chậm rãi", distractor: false},
        {word: "steadily", vi: "đều đặn", distractor: false},
        {word: "confident", vi: "tự tin", distractor: false},
        {word: "tired", vi: "mệt", distractor: false},
        {word: "nap", vi: "giấc ngủ trưa", distractor: false},
        {word: "started", vi: "bắt đầu", distractor: false},
        {word: "passed", vi: "vượt qua", distractor: false},
        {word: "late", vi: "muộn", distractor: false},
        {word: "fastest", vi: "nhanh nhất", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example? (Try writing first!)",
      label_vi: "📖 Xem mẫu? (Thử viết trước nhé!)",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Once upon a time, the Hare boasted about his speed every day. One morning, the Tortoise challenged him to a race. At first, the Hare ran very fast and got far ahead. Then, feeling too confident, he stopped to take a nap under a shady tree. He slept for a long time. Meanwhile, the Tortoise walked slowly but steadily — he never stopped. When the Hare finally woke up and ran again, it was too late. The Tortoise had already crossed the finish line and won the race! The moral of this fable is clear: slow and steady wins the race. It is better to persevere than to be overconfident."
    }
  }
};
