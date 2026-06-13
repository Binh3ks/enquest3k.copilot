export default {
  title: "My Day",
  min_words: 30,
  hints: {
vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "wake up", "vi": "thuc day", "distractor": false },
      { "word": "brush my teeth", "vi": "danh rang", "distractor": false },
      { "word": "eat breakfast", "vi": "an sang", "distractor": false },
      { "word": "bread", "vi": "banh mi", "distractor": false },
      { "word": "go to school", "vi": "di hoc", "distractor": false },
      { "word": "with Ben", "vi": "voi Ben", "distractor": false },
      { "word": "play with", "vi": "choi voi", "distractor": false },
      { "word": "my friends", "vi": "ban be", "distractor": false },
      { "word": "have lunch", "vi": "an trua", "distractor": false },
      { "word": "come home", "vi": "ve nha", "distractor": false },
      { "word": "do homework", "vi": "lam bai tap", "distractor": false },
      { "word": "have dinner", "vi": "an toi", "distractor": false },
      { "word": "watch TV", "vi": "xem ti vi", "distractor": false },
      { "word": "cartoons", "vi": "hoat hinh", "distractor": false },
      { "word": "go to bed", "vi": "di ngu", "distractor": false },
      { "word": "Good night", "vi": "Chuc ngu ngon", "distractor": false },
      { "word": "midnight", "vi": "nua dem", "distractor": true },
      { "word": "comb", "vi": "chai", "distractor": true },
      { "word": "hate school", "vi": "ghet truong", "distractor": true }
    ]
  }
  },
  sentence_frames: [
    {
      "template": "My name is Tom. This is my day. I ___.",
      "answers": ["wake up"]
    },
    {
      "template": "I ___ every morning. It is important to keep my teeth clean!",
      "answers": ["brush my teeth"]
    },
    {
      "template": "I ___. I like eating ___ for breakfast.",
      "answers": ["eat breakfast", "bread"]
    },
    {
      "template": "I ___ ___. I see my teacher and ___ ___ ___.",
      "answers": ["go to school", "with Ben", "play with", "my friends"]
    },
    {
      "template": "I ___ at school. Lunch is good! Then I ___.",
      "answers": ["have lunch", "come home"]
    },
    {
      "template": "At home, I ___. I write my name. Then I ___ ___ ___ ___. Good night!",
      "answers": ["do homework", "have dinner", "watch TV", "cartoons", "go to bed"]
    }
  ]
};
