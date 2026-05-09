export default {
  title: "Writing: Retell The Tortoise and the Hare",
  min_words: 50,
  model_sentence: "Once upon a time, the Hare boasted about his speed every day. One morning, the Tortoise challenged him to a race. At first, the Hare ran very fast and was far ahead. Then he stopped to rest under a shady tree and fell asleep. The Tortoise kept walking steadily and crossed the finish line first. Slow and steady wins the race!",
  instruction_en: "Retell the fable using past tense and narrative phrases!",
  instruction_vi: "K\u1ec3 l\u1ea1i ng\u1ee5 ng\u00f4n b\u1eb1ng th\u00ec qu\u00e1 kh\u1ee9 v\u00e0 c\u1ee5m t\u1eeb k\u1ec3 chuy\u1ec7n!",
  prompt_en: "What happened at the beginning, middle and end?",
  prompt_vi: "\u0110i\u1ec1u g\u00ec x\u1ea3y ra \u1edf \u0111\u1ea7u, gi\u1eefa v\u00e0 cu\u1ed1i c\u00e2u chuy\u1ec7n?",
  keywords: ["boasted", "speed", "Tortoise", "challenged", "race", "ahead", "rest", "shady", "steadily", "finish line"],
  topic_talk_prompt: "Retell the full story of the Tortoise and the Hare!",
  sentence_frames: [
    {
        "template": "Once upon a time, the Hare ___ about his ___ every day.",
        "answers": [
            "boasted",
            "speed"
        ]
    },
    {
        "template": "The Tortoise ___ him to ___.",
        "answers": [
            "challenged",
            "a race"
        ]
    },
    {
        "template": "At first, the Hare was ___ but then he stopped to rest under ___.",
        "answers": [
            "far ahead",
            "a shady tree"
        ]
    },
    {
        "template": "The Tortoise ___ and crossed ___ first.",
        "answers": [
            "kept walking steadily",
            "the finish line"
        ]
    },
    {
        "template": "The lesson is: ___ wins the race!",
        "answers": [
            "slow and steady"
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
        "word": "boasted",
        "vi": "khoe khoang",
        "distractor": false
    },
    {
        "word": "speed",
        "vi": "tốc độ",
        "distractor": false
    },
    {
        "word": "challenged",
        "vi": "thách thức",
        "distractor": false
    },
    {
        "word": "a race",
        "vi": "một cuộc đua",
        "distractor": false
    },
    {
        "word": "far ahead",
        "vi": "dẫn trước xa",
        "distractor": false
    },
    {
        "word": "a shady tree",
        "vi": "một cây có bóng mát",
        "distractor": false
    },
    {
        "word": "kept walking steadily",
        "vi": "tiếp tục đi bộ đều đặn",
        "distractor": false
    },
    {
        "word": "the finish line",
        "vi": "đích đến",
        "distractor": false
    },
    {
        "word": "slow and steady",
        "vi": "chậm mà chắc",
        "distractor": false
    },
    {
        "word": "complained",
        "vi": "phàn nàn",
        "distractor": true
    },
    {
        "word": "gave up",
        "vi": "bỏ cuộc",
        "distractor": true
    },
    {
        "word": "fast and careless",
        "vi": "nhanh và bất cẩn",
        "distractor": true
    }
]
    }
  }
};
