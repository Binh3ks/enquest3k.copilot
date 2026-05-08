export default {
  title: "Writing: My Picnic Story",
  min_words: 30,
  model_sentence: "Last Sunday, Mum bought sandwiches, fruit, and juice at the market. We went to the park and spread a blanket on the soft green grass. I ate a delicious sandwich and felt very happy. Tom drank all his cold juice because he was so thirsty. Dad gave us some sweet cookies to share. We shared everything and laughed together. It was a perfect, cheerful picnic day!",
  instruction_en: "Use: Last ___, we had a picnic at... / We ate... and drank... / We also ___ed... / It was special because...",
  instruction_vi: "Dùng: Last ___, we had a picnic at... / We ate... and drank... / We also ___ed... / It was special because...",
  prompt_en: "Write about a special picnic or meal you had! Where was it? Who was there? What did you eat and drink? What fun things did you do together? Why was it special or memorable?",
  prompt_vi: "Viết về một buổi dã ngoại hoặc bữa ăn đặc biệt! Ở đâu? Ai tham dự? Bạn ăn và uống gì? Cùng nhau làm gì vui? Tại sao nó đặc biệt hoặc đáng nhớ?",
  topic_talk_prompt: "Tell me about a meal or picnic you had. What did you eat? What did you drink?",
  keywords: ["ate", "drank", "bought", "gave", "picnic", "sandwich", "juice", "basket", "delicious", "cheerful", "share", "hungry", "thirsty"],
  sentence_frames: [
    {"template":"Last ___, my family had a picnic at the ___."},
    {"template":"We ate ___ and drank ___."},
    {"template":"My favourite food was ___."},
    {"template":"We also ___ed ___ together."},
    {"template":"I felt ___ after eating."},
    {"template":"It was a ___ picnic."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Word Bank",
      label_vi: "💡 Ngân hàng từ",
      show_by_default: true,
      words: [
        {word: "ate", vi: "đã ăn", distractor: false},
        {word: "eat", vi: "ăn", distractor: true},
        {word: "drank", vi: "đã uống", distractor: false},
        {word: "played", vi: "đã chơi", distractor: false},
        {word: "drink", vi: "uống", distractor: true},
        {word: "sang", vi: "đã hát", distractor: false},
        {word: "park", vi: "công viên", distractor: false},
        {word: "beach", vi: "bãi biển", distractor: false},
        {word: "give", vi: "cho", distractor: true},
        {word: "garden", vi: "vườn", distractor: false},
        {word: "sandwich", vi: "bánh mì", distractor: false},
        {word: "juice", vi: "nước ép", distractor: false},
        {word: "fruit", vi: "trái cây", distractor: false},
        {word: "cake", vi: "bánh ngọt", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "full", vi: "no", distractor: false},
        {word: "fun", vi: "vui", distractor: false},
        {word: "wonderful", vi: "tuyệt vời", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example paragraph",
      label_vi: "📖 Xem bài mẫu",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last Sunday, Mum bought sandwiches, fruit, and juice at the market. We went to the park and spread a blanket on the soft green grass. I ate a delicious sandwich and felt very happy. Tom drank all his cold juice because he was so thirsty. Dad gave us some sweet cookies to share. We shared everything and laughed together. It was a perfect, cheerful picnic day!"
    }
  }
};
