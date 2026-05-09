export default {
  title: "My Bedroom",
  min_words: 20,
  model_sentence: "I have a bedroom. My bedroom is nice. I have a bed in my bedroom. I sleep on my bed. I also have a chair and a table. I like my room.",
  instruction_en: "Write about your bedroom!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ph\u00f2ng ng\u1ee7 c\u1ee7a b\u1ea1n!",
  prompt_en: "What does your room look like? What do you have in it?",
  prompt_vi: "Ph\u00f2ng c\u1ee7a b\u1ea1n tr\u00f4ng th\u1ebf n\u00e0o? B\u1ea1n c\u00f3 g\u00ec trong ph\u00f2ng?",
  keywords: ["bedroom", "nice", "bed", "chair", "table", "like"],
  topic_talk_prompt: "Tell me about your bedroom!",
  sentence_frames: [
    {
        "template": "My bedroom is ___.",
        "answers": [
            "nice"
        ]
    },
    {
        "template": "I have a ___ to sleep on.",
        "answers": [
            "bed"
        ]
    },
    {
        "template": "I also have a ___ and a ___.",
        "answers": [
            "chair",
            "table"
        ]
    },
    {
        "template": "I ___ my room.",
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
        "word": "nice",
        "vi": "đẹp/dễ chịu",
        "distractor": false
    },
    {
        "word": "bed",
        "vi": "giường",
        "distractor": false
    },
    {
        "word": "chair",
        "vi": "ghế",
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
        "word": "messy",
        "vi": "bừa bộn",
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
