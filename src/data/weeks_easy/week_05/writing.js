export default {
  title: "The Mystery House",
  min_words: 20,
  model_sentence: "My house has a bedroom and a kitchen. I have a bed in my bedroom. There is a big table in the kitchen. I like my house.",
  instruction_en: "Write about your house!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ng\u00f4i nh\u00e0 c\u1ee7a b\u1ea1n!",
  prompt_en: "What rooms does your house have? What is in each room?",
  prompt_vi: "Nh\u00e0 b\u1ea1n c\u00f3 nh\u1eefng ph\u00f2ng n\u00e0o? M\u1ed7i ph\u00f2ng c\u00f3 g\u00ec?",
  keywords: ["bedroom", "kitchen", "bed", "table", "house"],
  topic_talk_prompt: "Describe your house and rooms!",
  sentence_frames: [
    {
        "template": "My house has a ___ and a ___.",
        "answers": [
            "bedroom",
            "kitchen"
        ]
    },
    {
        "template": "I have a ___ in my bedroom.",
        "answers": [
            "bed"
        ]
    },
    {
        "template": "There is a big ___ in the kitchen.",
        "answers": [
            "table"
        ]
    },
    {
        "template": "I ___ my house.",
        "answers": [
            "like"
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
        "word": "bedroom",
        "vi": "phòng ngủ",
        "distractor": false
    },
    {
        "word": "kitchen",
        "vi": "nhà bếp",
        "distractor": false
    },
    {
        "word": "bed",
        "vi": "giường",
        "distractor": false
    },
    {
        "word": "table",
        "vi": "bàn",
        "distractor": false
    },
    {
        "word": "like",
        "vi": "thích",
        "distractor": false
    },
    {
        "word": "garage",
        "vi": "nhà để xe",
        "distractor": true
    },
    {
        "word": "sofa",
        "vi": "ghế sofa",
        "distractor": true
    },
    {
        "word": "hate",
        "vi": "ghét",
        "distractor": true
    }
]
    }
  }
};
