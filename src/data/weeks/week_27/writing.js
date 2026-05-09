export default {
  title: "Writing: How a Seed Grows into a Plant",
  min_words: 45,
  model_sentence: "Here is how a seed grows into a plant. First, a seed is planted in warm, moist soil. It needs water and warmth to germinate. Next, a tiny shoot pushes through the soil. Then green leaves begin to grow. Finally, a beautiful flower blooms in the sunlight.",
  instruction_en: "Write a detailed process description of plant growth!",
  instruction_vi: "Vi\u1ebft m\u00f4 t\u1ea3 qu\u00e1 tr\u00ecnh c\u00e2y l\u1edbn l\u00ean chi ti\u1ebft!",
  prompt_en: "What conditions does the seed need? What happens at each stage?",
  prompt_vi: "H\u1ea1t gi\u1ed1ng c\u1ea7n \u0111i\u1ec1u ki\u1ec7n g\u00ec? \u0110i\u1ec1u g\u00ec x\u1ea3y ra \u1edf m\u1ed7i giai \u0111o\u1ea1n?",
  keywords: ["seed", "warm", "moist soil", "germinate", "shoot", "green leaves", "flower", "blooms", "sunlight"],
  topic_talk_prompt: "Explain the process of how a seed becomes a plant!",
  sentence_frames: [
    {
        "template": "First, a seed is planted in ___ soil and needs ___ and ___ to germinate.",
        "answers": [
            "warm, moist",
            "water",
            "warmth"
        ]
    },
    {
        "template": "Next, ___ pushes through the ___.",
        "answers": [
            "a tiny shoot",
            "soil"
        ]
    },
    {
        "template": "Then ___ begin to grow on the stem.",
        "answers": [
            "green leaves"
        ]
    },
    {
        "template": "Finally, ___ in the ___.",
        "answers": [
            "a beautiful flower blooms",
            "sunlight"
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
        "word": "warm, moist",
        "vi": "ấm và ẩm",
        "distractor": false
    },
    {
        "word": "water",
        "vi": "nước",
        "distractor": false
    },
    {
        "word": "warmth",
        "vi": "hơi ấm",
        "distractor": false
    },
    {
        "word": "a tiny shoot",
        "vi": "một chồi nhỏ",
        "distractor": false
    },
    {
        "word": "soil",
        "vi": "đất",
        "distractor": false
    },
    {
        "word": "green leaves",
        "vi": "lá xanh",
        "distractor": false
    },
    {
        "word": "a beautiful flower blooms",
        "vi": "một bông hoa đẹp nở",
        "distractor": false
    },
    {
        "word": "sunlight",
        "vi": "ánh sáng mặt trời",
        "distractor": false
    },
    {
        "word": "cold and frozen",
        "vi": "lạnh và đóng băng",
        "distractor": true
    },
    {
        "word": "darkness and shadow",
        "vi": "bóng tối và bóng râm",
        "distractor": true
    }
]
    }
  }
};
