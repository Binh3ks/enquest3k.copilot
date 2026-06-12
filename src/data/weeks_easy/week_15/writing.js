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
  ],

  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "lived on a farm", "vi": "lived on a farm", "distractor": false },
        { "word": "had many animals", "vi": "had many animals", "distractor": false },
        { "word": "fed the chickens", "vi": "fed the chickens", "distractor": false },
        { "word": "milked the cow", "vi": "milked the cow", "distractor": false },
        { "word": "rode the horse", "vi": "rode the horse", "distractor": false },
        { "word": "planted the rice", "vi": "planted the rice", "distractor": false },
        { "word": "picked the apples", "vi": "picked the apples", "distractor": false },
        { "word": "watched the sunset", "vi": "watched the sunset", "distractor": false },
        { "word": "rested under a tree", "vi": "rested under a tree", "distractor": false },
        { "word": "walked in the fields", "vi": "walked in the fields", "distractor": false },
        { "word": "played with kittens", "vi": "played with kittens", "distractor": false },
        { "word": "loved the farm life", "vi": "loved the farm life", "distractor": false },
        { "word": "ate fresh eggs", "vi": "ate fresh eggs", "distractor": false },
        { "word": "made fresh butter", "vi": "made fresh butter", "distractor": false },
        { "word": "told old stories", "vi": "told old stories", "distractor": false },
        { "word": "waved to neighbors", "vi": "waved to neighbors", "distractor": true },
        { "word": "wore straw hat", "vi": "wore straw hat", "distractor": true },
        { "word": "felt so peaceful", "vi": "felt so peaceful", "distractor": true }
      ]
    }
  },
};
