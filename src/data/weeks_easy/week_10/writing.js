export default {
  title: "My Farm Visit",
  min_words: 30,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "quiet and clean", "vi": "yen tinh va sach se", "distractor": false },
      { "word": "busy and noisy", "vi": "bon ron va on ao", "distractor": false },
      { "word": "in the countryside", "vi": "o nong thon", "distractor": false },
      { "word": "a big brown cow", "vi": "con bo lon mau nau", "distractor": false },
      { "word": "eats grass", "vi": "an co", "distractor": false },
      { "word": "in the field", "vi": "o trong dong", "distractor": false },
      { "word": "a small white chicken", "vi": "con ga nho mau trang", "distractor": false },
      { "word": "runs very fast", "vi": "chay rat nhanh", "distractor": false },
      { "word": "tall trees", "vi": "nhung cay cao", "distractor": false },
      { "word": "the green grass", "vi": "co xanh", "distractor": false },
      { "word": "soft", "vi": "mem", "distractor": false },
      { "word": "peaceful", "vi": "yen binh", "distractor": false },
      { "word": "many animals", "vi": "nhieu dong vat", "distractor": false },
      { "word": "the best place", "vi": "noi tot nhat", "distractor": false },
      { "word": "dirty and crowded", "vi": "ban va dong duc", "distractor": true },
      { "word": "silent and useless", "vi": "im lang va vo duong", "distractor": true },
      { "word": "hate the farm", "vi": "ghet nong trai", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Today I visit a farm ___.",
      "answers": ["in the countryside"]
    },
    {
      "template": "The farm is ___ but the city is ___.",
      "answers": ["quiet and clean", "busy and noisy"]
    },
    {
      "template": "I see ___. The cow ___ in the field.",
      "answers": ["a big brown cow", "eats grass"]
    },
    {
      "template": "I see ___. It ___!",
      "answers": ["a small white chicken", "runs very fast"]
    },
    {
      "template": "I see ___ everywhere. ___ is soft. The farm is ___.",
      "answers": ["tall trees", "The green grass", "peaceful"]
    },
    {
      "template": "I see ___ on the farm. I love the farm! It is ___!",
      "answers": ["many animals", "the best place"]
    }
  ],

  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "ate fresh fruit", "vi": "ate fresh fruit", "distractor": false },
        { "word": "walked in the park", "vi": "walked in the park", "distractor": false },
        { "word": "played with friends", "vi": "played with friends", "distractor": false },
        { "word": "saw a big bird", "vi": "saw a big bird", "distractor": false },
        { "word": "red and yellow leaves", "vi": "red and yellow leaves", "distractor": false },
        { "word": "cold wind blew", "vi": "cold wind blew", "distractor": false },
        { "word": "picked up leaves", "vi": "picked up leaves", "distractor": false },
        { "word": "made a big pile", "vi": "made a big pile", "distractor": false },
        { "word": "wore a warm hat", "vi": "wore a warm hat", "distractor": false },
        { "word": "drank hot tea", "vi": "drank hot tea", "distractor": false },
        { "word": "happy and warm", "vi": "happy and warm", "distractor": false },
        { "word": "felt very tired", "vi": "felt very tired", "distractor": false },
        { "word": "slept very early", "vi": "slept very early", "distractor": false },
        { "word": "lazy and slow", "vi": "lazy and slow", "distractor": false },
        { "word": "loud and fast", "vi": "loud and fast", "distractor": false },
        { "word": "read a book", "vi": "read a book", "distractor": true },
        { "word": "ate soup", "vi": "ate soup", "distractor": true },
        { "word": "watched the sky", "vi": "watched the sky", "distractor": true }
      ]
    }
  },
};
