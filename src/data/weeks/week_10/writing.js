export default {
  title: "City vs Farm",
  min_words: 45,
  hints: {
vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: false,
    scaffolding_stage: "medium",
    words: [
      { "word": "exciting and modern", "vi": "thu vi va hien dai", "distractor": false },
      { "word": "shops, schools, and entertainment", "vi": "cua hang, truong hoc, giai tri", "distractor": false },
      { "word": "very noisy and crowded", "vi": "rat on ao va dong duc", "distractor": false },
      { "word": "polluted", "vi": "o nhiem", "distractor": false },
      { "word": "heavy traffic", "vi": "giao thong mac", "distractor": false },
      { "word": "peaceful and green", "vi": "yen binh va xanh", "distractor": false },
      { "word": "fresh air", "vi": "khong khi trong lanh", "distractor": false },
      { "word": "wide open spaces", "vi": "khong gian rong mo", "distractor": false },
      { "word": "quiet and less busy", "vi": "yen tinh va it ban ron", "distractor": false },
      { "word": "a healthier place", "vi": "noi lamh manh hon", "distractor": false },
      { "word": "live on the farm", "vi": "song o nong trai", "distractor": false },
      { "word": "many animals", "vi": "nhieu dong vat", "distractor": false },
      { "word": "beautiful nature", "vi": "thien nhien dep", "distractor": false },
      { "word": "need the city", "vi": "can thanh pho", "distractor": false },
      { "word": "school and learning", "vi": "truong hoc va hoc tap", "distractor": false },
      { "word": "experience both places", "vi": "trai nghiem ca hai noi", "distractor": false },
      { "word": "the best of both worlds", "vi": "tot nhat cua ca hai", "distractor": false },
      { "word": "dangerous and unsafe", "vi": "nguy hiem va khong an toan", "distractor": true },
      { "word": "boring and useless", "vi": "nham chan va vo ich", "distractor": true },
      { "word": "avoid the farm", "vi": "tranh xa nong trai", "distractor": true }
    ]
  }
  },
  sentence_frames: [
    {
      "template": "The city is ___ because there are many ___, restaurants, and entertainment centers.",
      "answers": ["exciting and modern", "shops, schools, and entertainment"]
    },
    {
      "template": "However, the city is also ___ and ___, and the air can be ___ because of ___.",
      "answers": ["very noisy and crowded", "polluted", "heavy traffic"]
    },
    {
      "template": "The farm, on the other hand, is ___ with ___ and ___.",
      "answers": ["peaceful and green", "fresh air", "wide open spaces"]
    },
    {
      "template": "Although the farm is ___ and there is less to do, I think it is ___ to live.",
      "answers": ["quiet and less busy", "a healthier place"]
    },
    {
      "template": "I would choose to ___ during the summer holidays because I love ___ and ___.",
      "answers": ["live on the farm", "many animals", "beautiful nature"]
    },
    {
      "template": "But I also ___ for ___ and ___.",
      "answers": ["need the city", "school and learning"]
    },
    {
      "template": "The best solution might be to ___ every year.",
      "answers": ["experience both places"]
    },
    {
      "template": "That way, I can enjoy ___ and never feel bored!",
      "answers": ["the best of both worlds"]
    }
  ]
};
