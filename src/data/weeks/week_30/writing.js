export default {
  title: "Writing: My Picnic Story",
  min_words: 50,
  model_sentence: "Last Sunday, my family had a cheerful outdoor picnic in the park. Mum bought fresh bread, fruits, and cold lemonade at the market. We spread the blanket on the soft green grass and ate delicious sandwiches together. Then we drank lemonade — it was so refreshing under the warm sun. My sister gave me the last slice of watermelon and I gave her my cookie. It was the best outdoor meal we ever ate together as a family.",
  instruction_en: "Use: Last ___, we had a picnic at... / We ate... and drank... / We also ___ed... / It was special because...",
  instruction_vi: "Dùng: Last ___, we had a picnic at... / We ate... and drank... / We also ___ed... / It was special because...",
  prompt_en: "Write about a special picnic or meal you had! Where was it? Who was there? What did you eat and drink? What fun things did you do together? Why was it special or memorable?",
  prompt_vi: "Viết về một buổi dã ngoại hoặc bữa ăn đặc biệt! Ở đâu? Ai tham dự? Bạn ăn và uống gì? Cùng nhau làm gì vui? Tại sao nó đặc biệt hoặc đáng nhớ?",
  topic_talk_prompt: "Tell me about a picnic or outdoor meal you have had. What did you eat and drink? Who were you with?",
  keywords: ["ate", "drank", "bought", "gave", "picnic", "basket", "sandwich", "lemonade", "watermelon", "blanket", "thirsty", "hungry", "cheerful", "delicious", "outdoor", "refreshing", "market", "shared"],
  sentence_frames: [{"template":"Last ___, my family had a picnic at ___."},{"template":"We ate ___ and drank ___."},{"template":"My favourite was ___ because ___."},{"template":"We also ___ed ___ together."},{"template":"It was special because ___."}],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      words: [
        {word: "ate", vi: "đã ăn", distractor: false},
        {word: "drank", vi: "đã uống", distractor: false},
        {word: "eat", vi: "ăn", distractor: true},
        {word: "bought", vi: "đã mua", distractor: false},
        {word: "gave", vi: "đã cho", distractor: false},
        {word: "drink", vi: "uống", distractor: true},
        {word: "picnic", vi: "dã ngoại", distractor: false},
        {word: "basket", vi: "giỏ", distractor: false},
        {word: "give", vi: "cho", distractor: true},
        {word: "sandwich", vi: "bánh mì sandwich", distractor: false},
        {word: "lemonade", vi: "nước chanh", distractor: false},
        {word: "watermelon", vi: "dưa hấu", distractor: false},
        {word: "blanket", vi: "chăn", distractor: false},
        {word: "delicious", vi: "ngon", distractor: false},
        {word: "cheerful", vi: "vui vẻ", distractor: false},
        {word: "outdoor", vi: "ngoài trời", distractor: false},
        {word: "refreshing", vi: "sảng khoái", distractor: false}
      ]
    },
    model_paragraph: {
    },
    model_paragraph: {
      label_en: "📖 See example? (Try writing first!)",
      label_vi: "📖 Xem mẫu? (Thử viết trước nhé!)",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last Sunday, my family had a cheerful outdoor picnic in the park. Mum bought fresh bread, fruits, and cold lemonade at the market. We spread the blanket on the soft green grass and ate delicious sandwiches together. Then we drank lemonade — it was so refreshing under the warm sun. My sister gave me the last slice of watermelon and I gave her my cookie. It was the best outdoor meal we ever ate together as a family."
    }
  }
};
