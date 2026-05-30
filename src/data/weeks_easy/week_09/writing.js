export default {
  title: "My City",
  min_words: 30,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "a busy street", "vi": "duong pho dong cua", "distractor": false },
      { "word": "many people and cars", "vi": "nhieu nguoi va xe", "distractor": false },
      { "word": "a noisy place", "vi": "noi on ao", "distractor": false },
      { "word": "a tall building", "vi": "toa nha cao", "distractor": false },
      { "word": "very high", "vi": "rat cao", "distractor": false },
      { "word": "the yellow bus", "vi": "xe buyt mau vang", "distractor": false },
      { "word": "stops near me", "vi": "dung gan toi", "distractor": false },
      { "word": "get on the bus", "vi": "len xe buyt", "distractor": false },
      { "word": "lots of traffic", "vi": "nhieu giao thong", "distractor": false },
      { "word": "move slowly", "vi": "di chuyen cham", "distractor": false },
      { "word": "a quiet street", "vi": "con pho yen tinh", "distractor": false },
      { "word": "less busy than the main street", "vi": "it dong cu hon con pho chinh", "distractor": false },
      { "word": "tall buildings", "vi": "nhung toa nha cao", "distractor": false },
      { "word": "busy streets", "vi": "duong pho dong cua", "distractor": false },
      { "word": "the modern city", "vi": "thanh pho hien dai", "distractor": false },
      { "word": "exploring", "vi": "kham pha", "distractor": false },
      { "word": "quiet and empty", "vi": "yen tinh va trong vac", "distractor": true },
      { "word": "nothing exciting", "vi": "khong co gi thu vi", "distractor": true },
      { "word": "hate the city", "vi": "ghet thanh pho", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "I walk on ___ every day. There are ___ everywhere.",
      "answers": ["a busy street", "many people and cars"]
    },
    {
      "template": "It is ___. I hear car horns and people talking.",
      "answers": ["a noisy place"]
    },
    {
      "template": "I see ___. It is ___!",
      "answers": ["a tall building", "very high"]
    },
    {
      "template": "A ___ ___ near me. People ___ to go to work.",
      "answers": ["yellow bus", "stops near me", "get on the bus"]
    },
    {
      "template": "There is ___ on the road. Vehicles ___.",
      "answers": ["lots of traffic", "move slowly"]
    },
    {
      "template": "I also see ___. It is ___. I like the city!",
      "answers": ["a quiet street", "less busy than the main street"]
    }
  ]
};
