export default {
  title: "My Favorite Weekend Place",
  min_words: 30,
  instruction_en: "Write about your favorite places on the weekend!",
  instruction_vi: "Viết về những nơi bạn thích vào cuối tuần!",
  model_sentence: "Today is Saturday! I am happy. I go to the park. I play at the park. It is fun! Then I go to the library. I read a book. I like books! My mom and I go to the store. We buy food. I help mom! We go to the playground. I slide down! It is fun! On Sunday I go to the zoo. I see a big lion. Then we eat lunch at home. The food is good! I love my weekend!",
  prompt_en: "Where do you go on the weekend?",
  prompt_vi: "Bạn đi đâu vào cuối tuần?",
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "Saturday", "vi": "Thu bay", "distractor": false },
      { "word": "the park", "vi": "cong vien", "distractor": false },
      { "word": "play at", "vi": "choi o", "distractor": false },
      { "word": "fun", "vi": "vui", "distractor": false },
      { "word": "go to", "vi": "di den", "distractor": false },
      { "word": "the library", "vi": "thu vien", "distractor": false },
      { "word": "read a book", "vi": "doc sach", "distractor": false },
      { "word": "with my mom", "vi": "voi me", "distractor": false },
      { "word": "the store", "vi": "cua hang", "distractor": false },
      { "word": "buy food", "vi": "mua thuc an", "distractor": false },
      { "word": "help mom", "vi": "giup me", "distractor": false },
      { "word": "the playground", "vi": "san choi", "distractor": false },
      { "word": "slide down", "vi": "truot xuong", "distractor": false },
      { "word": "On Sunday", "vi": "Vao chu nhat", "distractor": false },
      { "word": "the zoo", "vi": "so thu", "distractor": false },
      { "word": "a big lion", "vi": "con su tu lon", "distractor": false },
      { "word": "at home", "vi": "o nha", "distractor": false },
      { "word": "eat lunch", "vi": "an trua", "distractor": false },
      { "word": "good", "vi": "ngon", "distractor": false },
      { "word": "the best", "vi": "tot nhat", "distractor": false },
      { "word": "boring", "vi": "nham chan", "distractor": true },
      { "word": "hate", "vi": "ghet", "distractor": true },
      { "word": "alone", "vi": "mot minh", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Today is ___! I am happy. I ___ ___.",
      "answers": ["Saturday", "go to", "the park"]
    },
    {
      "template": "I ___ ___ ___. It is ___!",
      "answers": ["play at", "the park", "fun"]
    },
    {
      "template": "Then I ___ ___ ___. I like books!",
      "answers": ["go to", "the library", "read a book"]
    },
    {
      "template": "My mom and I ___ ___. We ___ ___ ___.",
      "answers": ["go to", "the store", "buy food", "help mom"]
    },
    {
      "template": "We ___ ___. I ___! It is ___!",
      "answers": ["go to", "the playground", "slide down", "fun"]
    },
    {
      "template": "___ I ___ ___. I see ___. Then we ___ ___. The food is ___! I love my weekend!",
      "answers": ["On Sunday", "go to", "the zoo", "a big lion", "eat lunch", "at home", "good"]
    }
  ]
};
