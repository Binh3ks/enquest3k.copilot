export default {
  title: "Writing: How a Seed Grows",
  min_words: 35,
  model_sentence: "Here is how a seed grows into a plant. First, a seed is planted in the soil. It needs water and sunlight to grow. Next, a small shoot appears. Then leaves grow. Finally, a flower blooms!",
  instruction_en: "Write about how a seed grows step by step!",
  instruction_vi: "Vi\u1ebft v\u1ec1 c\u00e1ch h\u1ea1t gi\u1ed1ng n\u1ea3y m\u1ea7m t\u1eebng b\u01b0\u1edbc!",
  prompt_en: "What does a seed need to grow? What happens at each stage?",
  prompt_vi: "H\u1ea1t gi\u1ed1ng c\u1ea7n g\u00ec \u0111\u1ec3 l\u1edbn l\u00ean? Chuy\u1ec7n g\u00ec x\u1ea3y ra \u1edf m\u1ed7i giai \u0111o\u1ea1n?",
  keywords: ["seed", "plant", "soil", "water", "sunlight", "shoot", "leaves", "flower", "blooms"],
  topic_talk_prompt: "Explain how a seed grows into a plant!",
  sentence_frames: [
    {
        "template": "First, a seed is ___ in the ___.",
        "answers": [
            "planted",
            "soil"
        ]
    },
    {
        "template": "It needs ___ and ___ to grow.",
        "answers": [
            "water",
            "sunlight"
        ]
    },
    {
        "template": "Next, a small ___ appears.",
        "answers": [
            "shoot"
        ]
    },
    {
        "template": "Then ___ grow.",
        "answers": [
            "leaves"
        ]
    },
    {
        "template": "Finally, a ___ ___!",
        "answers": [
            "flower",
            "blooms"
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
        "word": "planted",
        "vi": "trồng",
        "distractor": false
    },
    {
        "word": "soil",
        "vi": "đất",
        "distractor": false
    },
    {
        "word": "water",
        "vi": "nước",
        "distractor": false
    },
    {
        "word": "sunlight",
        "vi": "ánh sáng mặt trời",
        "distractor": false
    },
    {
        "word": "shoot",
        "vi": "chồi non",
        "distractor": false
    },
    {
        "word": "leaves",
        "vi": "lá cây",
        "distractor": false
    },
    {
        "word": "flower",
        "vi": "bông hoa",
        "distractor": false
    },
    {
        "word": "blooms",
        "vi": "nở",
        "distractor": false
    },
    {
        "word": "frozen",
        "vi": "đóng băng",
        "distractor": true
    },
    {
        "word": "darkness",
        "vi": "bóng tối",
        "distractor": true
    },
    {
        "word": "fades",
        "vi": "tàn úa",
        "distractor": true
    }
]
    }
  }
};
