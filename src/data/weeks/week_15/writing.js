export default {
  title: "The Busy Park",
  min_words: 45,
  hints: {
vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: false,
    scaffolding_stage: "medium",
    words: [
      { "word": "the beautiful park", "vi": "cong vien dep", "distractor": false },
      { "word": "enjoying their day", "vi": "dang huong thu ngay", "distractor": false },
      { "word": "running after his dog", "vi": "chay theo cho cua anh ay", "distractor": false },
      { "word": "is barking happily", "vi": "dang sua vui ve", "distractor": false },
      { "word": "sitting on a wooden bench", "vi": "ngoi tren ghe go", "distractor": false },
      { "word": "is reading peacefully", "vi": "dang doc sach binh thanh", "distractor": false },
      { "word": "jogging around the path", "vi": "chay bo quanh duong di", "distractor": false },
      { "word": "playing with water", "vi": "choi voi nuoc", "distractor": false },
      { "word": "laughing loudly", "vi": "cuoi to", "distractor": false },
      { "word": "having a picnic", "vi": "dang da ngoai", "distractor": false },
      { "word": "eating sandwiches", "vi": "dang an sandwich", "distractor": false },
      { "word": "is spreading a blanket", "vi": "dang trai chan da ngoai", "distractor": false },
      { "word": "is unpacking the food basket", "vi": "dang mo gio do an", "distractor": false },
      { "word": "walking her puppy", "vi": "dang dac cho con", "distractor": false },
      { "word": "flying colorful kites", "vi": "dang th diec nhieu mau sac", "distractor": false },
      { "word": "relaxing under big trees", "vi": "dang thu gian duoi cay lon", "distractor": false },
      { "word": "a wonderful time", "vi": "khoang thoi gian tuyet voi", "distractor": false },
      { "word": "the best school trip ever", "vi": "chuyen di hoc that tuyet voi nhat", "distractor": false },
      { "word": "sleeping on the bench", "vi": "ngu tren ghe", "distractor": true },
      { "word": "crying loudly", "vi": "khoc to", "distractor": true },
      { "word": "leaving the park", "vi": "roi khoi cong vien", "distractor": true }
    ]
  }
  },
  sentence_frames: [
    {
      "template": "Today our class is visiting ___ ___. The park is very busy! Many people are ___.",
      "answers": ["the beautiful park", "enjoying their day"]
    },
    {
      "template": "A young boy is ___ near the trees. The dog ___ and looks so happy!",
      "answers": ["running after his dog", "is barking happily"]
    },
    {
      "template": "An elderly man is ___ and ___ while he enjoys the fresh air.",
      "answers": ["sitting on a wooden bench", "is reading peacefully"]
    },
    {
      "template": "Two women are ___ and some children are ___ ___ ___.",
      "answers": ["jogging around the path", "playing with water", "laughing loudly"]
    },
    {
      "template": "A family is ___. The mother ___ and the father ___.",
      "answers": ["having a picnic", "is spreading a blanket", "is unpacking the food basket"]
    },
    {
      "template": "A little girl is ___ and three teenagers are ___ in the sky.",
      "answers": ["walking her puppy", "flying colorful kites"]
    },
    {
      "template": "Some people are ___ ___ because the trees give cool shade.",
      "answers": ["relaxing under big trees"]
    },
    {
      "template": "Everyone is having ___ ___. This is really ___ ___ ___!",
      "answers": ["a wonderful time", "the best school trip ever"]
    }
  ]
};
