export default {
  title: "My Day at the Park",
  min_words: 30,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "walking with my mom", "vi": "di bo voi me", "distractor": false },
      { "word": "holding my hand", "vi": "nam tay toi", "distractor": false },
      { "word": "jogging ahead of us", "vi": "chay truoc chung toi", "distractor": false },
      { "word": "running very fast", "vi": "chay rat nhanh", "distractor": false },
      { "word": "sitting on a bench", "vi": "ngoi tren ghe", "distractor": false },
      { "word": "reading a book", "vi": "doc sach", "distractor": false },
      { "word": "having a picnic", "vi": "da ngoai", "distractor": false },
      { "word": "eating yummy sandwiches", "vi": "an sandwich ngon", "distractor": false },
      { "word": "relaxing under the trees", "vi": "thu gian duoi cay", "distractor": false },
      { "word": "soft", "vi": "mem", "distractor": false },
      { "word": "flowers everywhere", "vi": "hoa khap noi", "distractor": false },
      { "word": "my favorite place", "vi": "noi yeu thich cua toi", "distractor": false },
      { "word": "busy and fun", "vi": "dong duc va vui", "distractor": false },
      { "word": "walking her small dog", "vi": "dac cho con", "distractor": false },
      { "word": "sleeping", "vi": "ngu", "distractor": true },
      { "word": "boring", "vi": "nham chan", "distractor": true },
      { "word": "crying", "vi": "khoc", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Today I am going to the park with my family. The park is ___!",
      "answers": ["busy and fun"]
    },
    {
      "template": "I am ___ ___. She is ___ ___.",
      "answers": ["walking with my mom", "holding my hand"]
    },
    {
      "template": "My dad is ___. I see a boy. He is ___!",
      "answers": ["jogging ahead of us", "running very fast"]
    },
    {
      "template": "An old man is ___ ___. He is ___ ___.",
      "answers": ["sitting on a bench", "reading a book"]
    },
    {
      "template": "My family is ___ now. We are ___ ___.",
      "answers": ["having a picnic", "eating yummy sandwiches"]
    },
    {
      "template": "I am ___ ___. The grass is ___. I see ___ ___ ___! The park is ___!",
      "answers": ["relaxing under the trees", "soft", "flowers everywhere", "my favorite place"]
    }
  ]
};
