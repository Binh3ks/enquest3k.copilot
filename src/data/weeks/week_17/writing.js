export default {
  title: "A Rainy Day at School",
  min_words: 45,
  instruction_en: "Write about a rainy day using the present continuous tense!",
  instruction_vi: "Viết về một ngày mưa dùng thì hiện tại tiếp diễn!",
  prompt_en: "What is the weather like? What are you doing and why?",
  prompt_vi: "Thời tiết thế nào? Bạn đang làm gì và tại sao?",
  topic_talk_prompt: "Talk about a rainy day — what are you wearing and doing?",
  sentence_frames: [
    {
      "template": "**It is raining** very hard today. Big drops of water are **falling from the sky**.",
      "answers": [
        "raining very hard",
        "falling from the sky"
      ]
    },
    {
      "template": "I **look outside the window**. The streets are wet and the wind is **blowing very strong**.",
      "answers": [
        "look outside the window",
        "blowing very strong"
      ]
    },
    {
      "template": "I am **wearing my blue coat** today. It **keeps me dry and warm** in the cold rain.",
      "answers": [
        "wearing my blue coat",
        "keeps me dry and warm"
      ]
    },
    {
      "template": "My friend Linh is **wearing her red hat**. She looks so funny in the rain!",
      "answers": [
        "wearing her red hat"
      ]
    },
    {
      "template": "Nam is carrying a big umbrella. He opens it **every time** we go outside.",
      "answers": [
        "every time"
      ]
    },
    {
      "template": "It **is very cold** today because the wind is strong and the rain is heavy.",
      "answers": [
        "is very cold"
      ]
    },
    {
      "template": "After school, the rain stops. I **take off my coat** because it is warm outside now.",
      "answers": [
        "take off my coat"
      ]
    },
    {
      "template": "We love **learning about weather**. The science teacher explains how evaporation works!",
      "answers": [
        "learning about weather"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "raining very hard",
    "falling from the sky",
    "wearing my blue coat",
    "keeps me dry and warm",
    "wearing her red hat",
    "blowing very strong",
    "is very cold",
    "every time",
    "take off my coat",
    "learning about weather"
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
      image_prompt: "Four friends in different weather around the world.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What are they doing? Use 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      min_sentences: 8,
      sentence_frames: [
        { "template": "First, ___" },
        { "template": "Then, ___" },
        { "template": "After that, ___" },
        { "template": "Finally, ___" }
      ]
    }
  }
}
