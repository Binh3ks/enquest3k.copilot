export default {
  title: "My Friend",
  min_words: 20,
  model_sentence: "This is my friend. Her name is Lily. She is tall. She has long hair. Her hair is black. She has big eyes. She is very nice.",
  instruction_en: "Write about your friend!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ng\u01b0\u1eddi b\u1ea1n c\u1ee7a b\u1ea1n!",
  prompt_en: "What is your friend's name? What do they look like?",
  prompt_vi: "T\u00ean b\u1ea1n c\u1ee7a b\u1ea1n l\u00e0 g\u00ec? H\u1ecd tr\u00f4ng th\u1ebf n\u00e0o?",
  keywords: ["friend", "Lily", "tall", "long", "black", "nice"],
  topic_talk_prompt: "Tell me about your best friend!",
  sentence_frames: [
    {
        "template": "My friend's name is ___.",
        "answers": [
            "Lily"
        ]
    },
    {
        "template": "She is ___.",
        "answers": [
            "tall"
        ]
    },
    {
        "template": "She has ___ hair.",
        "answers": [
            "long"
        ]
    },
    {
        "template": "Her hair is ___.",
        "answers": [
            "black"
        ]
    },
    {
        "template": "She is very ___.",
        "answers": [
            "nice"
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
        "word": "Lily",
        "vi": "",
        "distractor": false
    },
    {
        "word": "tall",
        "vi": "cao",
        "distractor": false
    },
    {
        "word": "long",
        "vi": "dài",
        "distractor": false
    },
    {
        "word": "black",
        "vi": "đen",
        "distractor": false
    },
    {
        "word": "nice",
        "vi": "dễ thương",
        "distractor": false
    },
    {
        "word": "short",
        "vi": "ngắn/thấp",
        "distractor": true
    },
    {
        "word": "mean",
        "vi": "xấu tính",
        "distractor": true
    },
    {
        "word": "blonde",
        "vi": "vàng",
        "distractor": true
    }
]
    }
  }
};
