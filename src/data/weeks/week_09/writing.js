export default {
  title: "My City",
  min_words: 45,
  hints: {
vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: false,
    scaffolding_stage: "medium",
    words: [
      { "word": "a busy street", "vi": "duong pho dong cua", "distractor": false },
      { "word": "many people and cars", "vi": "nhieu nguoi va xe", "distractor": false },
      { "word": "a noisy place", "vi": "noi on ao", "distractor": false },
      { "word": "a very tall building", "vi": "toa nha rat cao", "distractor": false },
      { "word": "very high", "vi": "rat cao", "distractor": false },
      { "word": "next to the bus stop", "vi": "gan ben xe buyt", "distractor": false },
      { "word": "stops near me", "vi": "dung gan toi", "distractor": false },
      { "word": "get on the bus", "vi": "len xe buyt", "distractor": false },
      { "word": "lots of traffic", "vi": "nhieu giao thong", "distractor": false },
      { "word": "move slowly", "vi": "di chuyen cham", "distractor": false },
      { "word": "a quiet street", "vi": "con pho yen tinh", "distractor": false },
      { "word": "less busy", "vi": "it dong cu hon", "distractor": false },
      { "word": "than the main street", "vi": "hon con pho chinh", "distractor": false },
      { "word": "tall buildings", "vi": "nhung toa nha cao", "distractor": false },
      { "word": "busy streets", "vi": "duong pho dong cua", "distractor": false },
      { "word": "exciting", "vi": "thu vi", "distractor": false },
      { "word": "exploring the modern city", "vi": "kham pha thanh pho hien dai", "distractor": false },
      { "word": "Next time", "vi": "Lan sau", "distractor": false },
      { "word": "ride a bus", "vi": "di xe buyt", "distractor": false },
      { "word": "see more buildings", "vi": "xem them nhieu toa nha", "distractor": false },
      { "word": "a quiet empty street", "vi": "con pho yen tinh trong vac", "distractor": true },
      { "word": "nothing exciting", "vi": "khong co gi thu vi", "distractor": true },
      { "word": "hate the city", "vi": "ghet thanh pho", "distractor": true }
    ]
  }
  },
  sentence_frames: [
    {
      "template": "I walk on a busy ___ every day.",
      "answers": ["street"]
    },
    {
      "template": "There are many people and cars ___.",
      "answers": ["everywhere"]
    },
    {
      "template": "It is a very ___ place.",
      "answers": ["noisy"]
    },
    {
      "template": "I see a very tall ___ near the bus stop.",
      "answers": ["building"]
    },
    {
      "template": "A yellow bus ___ near me and people get on.",
      "answers": ["stops"]
    },
    {
      "template": "There is lots of ___ on the main road.",
      "answers": ["traffic"]
    },
    {
      "template": "Vehicles move ___ because everyone is in a hurry.",
      "answers": ["slowly"]
    },
    {
      "template": "I also see a quiet ___ that is less busy.",
      "answers": ["street"]
    },
    {
      "template": "It is nice to walk there and enjoy the ___.",
      "answers": ["peace"]
    },
    {
      "template": "I love my city because there is always something ___ to see.",
      "answers": ["interesting"]
    }
  ]
};
