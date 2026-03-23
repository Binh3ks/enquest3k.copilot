export default {
  grammar_explanation: {
    title_en: "Cause and Effect: It is raining, so I am wearing a coat.",
    title_vi: "Nguyên nhân và kết quả: Trời đang mưa, vì vậy tôi đang mặc áo khoác.",
    rules: [
      {
        id: 1,
        rule_en: "It is [weather] + so + I am wearing [clothes]",
        rule_vi: "Trời đang [thời tiết] + vì vậy + tôi đang mặc [quần áo]",
        example_en: "It is raining, so I am wearing a coat.",
        example_vi: "Trời đang mưa, vì vậy tôi đang mặc áo khoác."
      },
      {
        id: 2,
        rule_en: "'So' connects the weather (cause) to the clothes (effect).",
        rule_vi: "'So' nối thời tiết (nguyên nhân) với quần áo (kết quả).",
        example_en: "It is cold, so I am wearing a hat.",
        example_vi: "Trời lạnh, vì vậy tôi đang đội mũ."
      },
      {
        id: 3,
        rule_en: "Use 'It is + weather adjective' for weather.",
        rule_vi: "Dùng 'It is + tính từ thời tiết' để nói về thời tiết.",
        example_en: "It is sunny. / It is cold. / It is raining.",
        example_vi: "Trời nắng. / Trời lạnh. / Trời đang mưa."
      }
    ]
  },
  exercises: [
    {
      id: 1,
      type: "fill",
      question: "It is ___, so I am wearing a coat. (rain)",
      answer: "raining",
      hint: "It is raining..."
    },
    {
      id: 2,
      type: "fill",
      question: "It is ___, so I am wearing boots. (snow)",
      answer: "snowing",
      hint: "It is snowing..."
    },
    {
      id: 3,
      type: "fill",
      question: "It is sunny, so I am ___ light clothes. (wear)",
      answer: "wearing",
      hint: "I am wearing..."
    },
    {
      id: 4,
      type: "fill",
      question: "It is cold, so I am wearing a ___.",
      answer: "coat",
      hint: "thick jacket"
    },
    {
      id: 5,
      type: "fill",
      question: "It is raining, so I am carrying an ___.",
      answer: "umbrella",
      hint: "keeps you dry"
    },
    {
      id: 6,
      type: "fill",
      question: "It is cold, so I am wearing a ___.",
      answer: "hat",
      hint: "head covering"
    },
    {
      id: 7,
      type: "fill",
      question: "It is warm, so I am ___ light clothes.",
      answer: "wearing",
      hint: "I am + verb-ing"
    },
    {
      id: 8,
      type: "fill",
      question: "It is snowing, so I am wearing ___.",
      answer: "boots",
      hint: "foot wear"
    },
    {
      id: 9,
      type: "mc",
      question: "It is raining, ___ I am wearing a coat.",
      options: ["but", "so", "and"],
      answer: "so",
      hint: "cause and effect word"
    },
    {
      id: 10,
      type: "mc",
      question: "It ___ cold, so I am wearing a coat.",
      options: ["are", "am", "is"],
      answer: "is",
      hint: "It is..."
    },
    {
      id: 11,
      type: "mc",
      question: "It is sunny. What do you wear?",
      options: ["a heavy coat", "light clothes", "boots and a hat"],
      answer: "light clothes",
      hint: "sunny = warm"
    },
    {
      id: 12,
      type: "mc",
      question: "I am ___ my coat because it is cold.",
      options: ["wear", "wears", "wearing"],
      answer: "wearing",
      hint: "I am + verb-ing"
    },
    {
      id: 13,
      type: "fill",
      question: "It is ___ today, so the weather is nice. (sun)",
      answer: "sunny",
      hint: "adjective form"
    },
    {
      id: 14,
      type: "fill",
      question: "The weather is ___. I put on my coat. (cold)",
      answer: "cold",
      hint: "low temperature"
    },
    {
      id: 15,
      type: "mc",
      question: "It is snowing. What do you wear on your feet?",
      options: ["sandals", "boots", "socks"],
      answer: "boots",
      hint: "keeps feet dry in snow"
    },
    {
      id: 16,
      type: "unscramble",
      question: "Order:",
      words: ["is", "It", "raining"],
      answer: "It is raining.",
      hint: "It is"
    },
    {
      id: 17,
      type: "unscramble",
      question: "Order:",
      words: ["am", "I", "wearing", "a", "coat"],
      answer: "I am wearing a coat.",
      hint: "I am"
    },
    {
      id: 18,
      type: "unscramble",
      question: "Order:",
      words: ["raining", "is", "so", "It", "wearing", "am", "I", "boots"],
      answer: "It is raining so I am wearing boots.",
      hint: "It is... so I am..."
    },
    {
      id: 19,
      type: "fill",
      question: "It is ___ and warm today. (sun)",
      answer: "sunny",
      hint: "sun → sunny"
    },
    {
      id: 20,
      type: "unscramble",
      question: "Order:",
      words: ["cold", "is", "hat", "wearing", "It", "am", "so", "I", "a"],
      answer: "It is cold so I am wearing a hat.",
      hint: "It is cold so..."
    }
  ]
};
