export default {
  title: "My City",
  min_words: 45,
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
  },
  sentence_frames: [
    {
      "template": "I walk on ___ every day. There are ___ everywhere. It is ___.",
      "answers": ["a busy street", "many people and cars", "a noisy place"]
    },
    {
      "template": "I see ___. It is ___! The building is also ___.",
      "answers": ["a very tall building", "very high", "next to the bus stop"]
    },
    {
      "template": "A yellow bus ___ near me. Many people ___ to go to work or school.",
      "answers": ["stops near me", "get on the bus"]
    },
    {
      "template": "There is ___ on the main road. Many vehicles ___ because everyone is in a hurry.",
      "answers": ["lots of traffic", "move slowly"]
    },
    {
      "template": "I also see ___. It is ___ the main street, and I like walking there.",
      "answers": ["a quiet street", "less busy than the main street"]
    },
    {
      "template": "The city has ___, ___, and ___, so there is always something interesting to see.",
      "answers": ["tall buildings", "busy streets", "lots of traffic"]
    },
    {
      "template": "But it is ___! I love ___ ___ and discovering new places every time.",
      "answers": ["exciting", "exploring the modern city"]
    },
    {
      "template": "___ time, I want to ___ and ___ to see even more of the city.",
      "answers": ["Next time", "ride a bus", "see more buildings"]
    }
  ]
};
