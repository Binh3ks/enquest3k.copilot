export default {
  title: "A Rainy Day at School",
  min_words: 30,
  instruction_en: "Write about a rainy day!",
  instruction_vi: "Viết về một ngày mưa!",
  prompt_en: "What is the weather like? What are you wearing?",
  prompt_vi: "Thời tiết thế nào? Bạn đang mặc gì?",
  topic_talk_prompt: "Talk about a rainy day!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "It is ___ today.",
      "answers": [
        "raining"
      ]
    },
    {
      "template": "I am wearing my ___ to stay warm.",
      "answers": [
        "blue coat"
      ]
    },
    {
      "template": "The streets are ___.",
      "answers": [
        "wet"
      ]
    },
    {
      "template": "Nam is carrying his ___ because it is raining.",
      "answers": [
        "umbrella"
      ]
    },
    {
      "template": "It is very ___ today.",
      "answers": [
        "cold"
      ]
    },
    {
      "template": "After school, I **take off my coat** because the weather is ___.",
      "answers": [
        "warm outside now"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "raining",
    "blue coat",
    "wet",
    "umbrella",
    "cold",
    "warm outside now"
  ],
    hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "raining heavily", "vi": "raining heavily", "distractor": false },
        { "word": "wearing a thick raincoat", "vi": "wearing a thick raincoat", "distractor": false },
        { "word": "big rubber boots", "vi": "big rubber boots", "distractor": false },
        { "word": "snowing hard", "vi": "snowing hard", "distractor": false },
        { "word": "wearing a warm hat", "vi": "wearing a warm hat", "distractor": false },
        { "word": "thick red coat", "vi": "thick red coat", "distractor": false },
        { "word": "making a snowman", "vi": "making a snowman", "distractor": false },
        { "word": "sunny and hot day", "vi": "sunny and hot day", "distractor": false },
        { "word": "wearing cool sunglasses", "vi": "wearing cool sunglasses", "distractor": false },
        { "word": "eating strawberry ice cream", "vi": "eating strawberry ice cream", "distractor": false },
        { "word": "very cloudy and windy", "vi": "very cloudy and windy", "distractor": false },
        { "word": "flying a big kite", "vi": "flying a big kite", "distractor": false },
        { "word": "wearing a light jacket", "vi": "wearing a light jacket", "distractor": false },
        { "word": "staying at home", "vi": "staying at home", "distractor": false },
        { "word": "drinking hot tea", "vi": "drinking hot tea", "distractor": false },
        { "word": "playing indoor games", "vi": "playing indoor games", "distractor": true },
        { "word": "watching from window", "vi": "watching from window", "distractor": true },
        { "word": "running for shelter", "vi": "running for shelter", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week17/story_writing_pic.jpg",
      image_prompt: "Friends in different weather around the world.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
