export default {
  title: "How a Seed Grows",
  min_words: 32,
  model_sentence: "First a seed is planted in soil. It needs water and sunlight. Next a tiny shoot grows up. Then leaves appear. Finally a flower blooms.",
  instruction_en: "Describe how a seed grows step by step!",
  instruction_vi: "M\u00f4 t\u1ea3 c\u00e1ch m\u1ed9t h\u1ea1t gi\u1ed1ng m\u1ecdc l\u00ean theo t\u1eebng b\u01b0\u1edbc!",
  prompt_en: "What happens first? What does the seed need? What comes next?",
  prompt_vi: "\u0110i\u1ec1u g\u00ec x\u1ea3y ra \u0111\u1ea7u ti\u00ean? H\u1ea1t gi\u1ed1ng c\u1ea7n g\u00ec? Ti\u1ebfp theo l\u00e0 g\u00ec?",
  keywords: ["seed", "soil", "water", "sunlight", "shoot", "leaves", "flower", "blooms"],
  topic_talk_prompt: "Explain how a seed grows into a plant step by step!",
  sentence_frames: [
    {
        "template": "First a seed is ___ in soil.",
        "answers": [
            "planted"
        ]
    },
    {
        "template": "It needs ___ and sunlight.",
        "answers": [
            "water"
        ]
    },
    {
        "template": "Next a tiny ___ grows up.",
        "answers": [
            "shoot"
        ]
    },
    {
        "template": "Then ___ appear.",
        "answers": [
            "leaves"
        ]
    },
    {
        "template": "Finally a flower ___.",
        "answers": [
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
        "vi": "được trồng",
        "distractor": false
    },
    {
        "word": "water",
        "vi": "nước",
        "distractor": false
    },
    {
        "word": "shoot",
        "vi": "mầm cây",
        "distractor": false
    },
    {
        "word": "leaves",
        "vi": "lá",
        "distractor": false
    },
    {
        "word": "blooms",
        "vi": "nở hoa",
        "distractor": false
    },
    {
        "word": "thrown",
        "vi": "bị ném",
        "distractor": true
    },
    {
        "word": "fire",
        "vi": "lửa",
        "distractor": true
    },
    {
        "word": "falls",
        "vi": "rụng xuống",
        "distractor": true
    }
]
    }
  }
,
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week27/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 27 story writing.",
      word_bank: [
        "tiny seed",
        "dark ground",
        "strong root",
        "green stem",
        "warm sunlight",
        "green leaves",
        "bright flower",
        "my own garden"
      ],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "First, you plant a ___", "answers": ["seed"]},
        {"template": "A strong ___", "answers": ["root grows"]},
        {"template": "Then a green ___", "answers": ["stem appears"]},
        {"template": "The plant needs ___", "answers": ["warm sunlight"]},
        {"template": "Broad green ___", "answers": ["leaves grow"]},
        {"template": "A bright yellow ___", "answers": ["flower blooms"]}
      ]
    }
  }
}
