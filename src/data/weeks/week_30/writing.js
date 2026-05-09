export default {
  title: "Writing: My Picnic Story",
  min_words: 50,
  model_sentence: "Last Sunday, my family had a cheerful outdoor picnic in the park. Mum bought fresh bread, fruits, and cold lemonade at the market. We spread a large blanket on the soft green grass. We spent the afternoon eating, laughing, and playing games together. It was one of the happiest days of the year.",
  instruction_en: "Write a detailed picnic story with rich language!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n d\u00e3 ngo\u1ea1i chi ti\u1ebft v\u1edbi ng\u00f4n ng\u1eef phong ph\u00fa!",
  prompt_en: "What did you bring? Where did you sit? What did you do? How did you feel?",
  prompt_vi: "B\u1ea1n mang g\u00ec? B\u1ea1n ng\u1ed3i \u0111\u00e2u? B\u1ea1n l\u00e0m g\u00ec? C\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["picnic", "park", "bread", "fruits", "lemonade", "blanket", "grass", "laughing", "games", "happiest"],
  topic_talk_prompt: "Describe a wonderful family picnic in detail!",
  sentence_frames: [
    {
        "template": "Last Sunday, my family had ___ in ___.",
        "answers": [
            "a cheerful outdoor picnic",
            "the park"
        ]
    },
    {
        "template": "Mum bought ___, ___, and ___ at the market.",
        "answers": [
            "fresh bread",
            "fruits",
            "cold lemonade"
        ]
    },
    {
        "template": "We spread ___ on ___.",
        "answers": [
            "a large blanket",
            "the soft green grass"
        ]
    },
    {
        "template": "We spent the afternoon ___, ___, and ___ together.",
        "answers": [
            "eating",
            "laughing",
            "playing games"
        ]
    },
    {
        "template": "It was ___.",
        "answers": [
            "one of the happiest days of the year"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
    {
        "word": "a cheerful outdoor picnic",
        "vi": "một buổi dã ngoại vui vẻ ngoài trời",
        "distractor": false
    },
    {
        "word": "the park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "fresh bread",
        "vi": "bánh mì tươi",
        "distractor": false
    },
    {
        "word": "fruits",
        "vi": "trái cây",
        "distractor": false
    },
    {
        "word": "cold lemonade",
        "vi": "nước chanh lạnh",
        "distractor": false
    },
    {
        "word": "a large blanket",
        "vi": "một tấm khăn to",
        "distractor": false
    },
    {
        "word": "the soft green grass",
        "vi": "bãi cỏ xanh mềm",
        "distractor": false
    },
    {
        "word": "eating",
        "vi": "ăn",
        "distractor": false
    },
    {
        "word": "laughing",
        "vi": "cười",
        "distractor": false
    },
    {
        "word": "playing games",
        "vi": "chơi trò chơi",
        "distractor": false
    },
    {
        "word": "one of the happiest days of the year",
        "vi": "một trong những ngày vui nhất năm",
        "distractor": false
    },
    {
        "word": "a terrible rainy disaster",
        "vi": "một thảm họa mưa tệ hại",
        "distractor": true
    },
    {
        "word": "arguing and fighting",
        "vi": "cãi nhau và đánh nhau",
        "distractor": true
    }
]
    }
  }
};
