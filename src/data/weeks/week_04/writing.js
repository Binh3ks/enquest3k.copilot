export default {
  title: "My Favorite Things",
  min_words: 30,
  model_sentence: "I like many things. I like playing with my toys. I like reading story books. I like drawing animals. When I play, I feel happy and excited.",
  instruction_en: "Write about your favorite activities using phrases!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ho\u1ea1t \u0111\u1ed9ng y\u00eau th\u00edch b\u1eb1ng c\u1ee5m t\u1eeb!",
  prompt_en: "What do you like to do? How do you feel when you do them?",
  prompt_vi: "B\u1ea1n th\u00edch l\u00e0m g\u00ec? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o khi l\u00e0m ch\u00fang?",
  keywords: ["toys", "books", "animals", "happy", "excited", "playing", "reading", "drawing"],
  topic_talk_prompt: "Tell me about your favorite things!",
  sentence_frames: [
    {
        "template": "I like ___ and ___.",
        "answers": [
            "playing with my toys",
            "reading story books"
        ]
    },
    {
        "template": "I also like ___.",
        "answers": [
            "drawing animals"
        ]
    },
    {
        "template": "When I play, I feel ___ and ___.",
        "answers": [
            "happy",
            "excited"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
    {
        "word": "playing with my toys",
        "vi": "chơi với đồ chơi",
        "distractor": false
    },
    {
        "word": "reading story books",
        "vi": "đọc truyện",
        "distractor": false
    },
    {
        "word": "drawing animals",
        "vi": "vẽ động vật",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "excited",
        "vi": "hào hứng",
        "distractor": false
    },
    {
        "word": "doing nothing",
        "vi": "không làm gì",
        "distractor": true
    },
    {
        "word": "bored and tired",
        "vi": "chán và mệt",
        "distractor": true
    }
]
    }
  }
};
