export default {
  title: "My Favorite Weekend Place",
  min_words: 45,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: false,
    scaffolding_stage: "medium",
    words: [
      { "word": "a fun weekend plan", "vi": "ke hoach cuoi tuan vui ve", "distractor": false },
      { "word": "go to the park", "vi": "di den cong vien", "distractor": false },
      { "word": "play at the park", "vi": "choi o cong vien", "distractor": false },
      { "word": "with my friends", "vi": "voi ban be", "distractor": false },
      { "word": "read a story book", "vi": "doc sach truyen", "distractor": false },
      { "word": "at the library", "vi": "o thu vien", "distractor": false },
      { "word": "very interesting", "vi": "rat thu vi", "distractor": false },
      { "word": "buy food", "vi": "mua thuc an", "distractor": false },
      { "word": "at the supermarket", "vi": "o sieu thi", "distractor": false },
      { "word": "help my mom", "vi": "giup me", "distractor": false },
      { "word": "carry the bags", "vi": "mang tui", "distractor": false },
      { "word": "slide down", "vi": "truot xuong", "distractor": false },
      { "word": "at the playground", "vi": "o san choi", "distractor": false },
      { "word": "On Sunday", "vi": "Vao chu nhat", "distractor": false },
      { "word": "go to the zoo", "vi": "di so thu", "distractor": false },
      { "word": "a lion and a monkey", "vi": "su tu va khi", "distractor": false },
      { "word": "have lunch", "vi": "an trua", "distractor": false },
      { "word": "at a restaurant", "vi": "o nha hang", "distractor": false },
      { "word": "very delicious", "vi": "rat ngon", "distractor": false },
      { "word": "special and fun", "vi": "dac biet va vui", "distractor": false },
      { "word": "a boring weekend", "vi": "cuoi tuan nham chan", "distractor": true },
      { "word": "stay at home alone", "vi": "o nha mot minh", "distractor": true },
      { "word": "hate the zoo", "vi": "ghet so thu", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Today is Saturday! I have ___. First, I ___ ___ with my friends.",
      "answers": ["a fun weekend plan", "go to the park", "play at the park"]
    },
    {
      "template": "Then I ___ ___ ___ at the library. The book is ___.",
      "answers": ["read a story book", "at the library", "very interesting"]
    },
    {
      "template": "After that, my mom and I ___ ___ ___.",
      "answers": ["buy food", "at the supermarket"]
    },
    {
      "template": "I ___ and ___ when we go shopping together.",
      "answers": ["help my mom", "carry the bags"]
    },
    {
      "template": "Finally, we go to the playground. I ___ at the playground and it is so much fun!",
      "answers": ["slide down"]
    },
    {
      "template": "___ I ___ and see ___ at the zoo.",
      "answers": ["On Sunday", "go to the zoo", "a lion and a monkey"]
    },
    {
      "template": "Then we ___ ___ ___. The food is ___!",
      "answers": ["have lunch", "at a restaurant", "very delicious"]
    },
    {
      "template": "I love my weekend! Every place is ___ and ___!",
      "answers": ["special", "fun"]
    }
  ]
};
