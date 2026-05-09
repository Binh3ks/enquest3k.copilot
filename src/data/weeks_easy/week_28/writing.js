export default {
  title: "Writing: The Tortoise and the Hare",
  min_words: 35,
  model_sentence: "One day, the hare ran very fast and got far ahead of the tortoise. Then he stopped and took a long nap under a big tree. The tortoise kept walking slowly. In the end, the tortoise won the race!",
  instruction_en: "Retell The Tortoise and the Hare!",
  instruction_vi: "K\u1ec3 l\u1ea1i c\u00e2u chuy\u1ec7n R\u00f9a v\u00e0 Th\u1ecf!",
  prompt_en: "What did the hare do? What did the tortoise do? Who won?",
  prompt_vi: "Con th\u1ecf \u0111\u00e3 l\u00e0m g\u00ec? Con r\u00f9a \u0111\u00e3 l\u00e0m g\u00ec? Ai th\u1eafng?",
  keywords: ["hare", "fast", "tortoise", "nap", "tree", "walking", "slowly", "won", "race"],
  topic_talk_prompt: "Retell the story of the Tortoise and the Hare!",
  sentence_frames: [
    {
        "template": "The hare ran very ___ and got far ahead.",
        "answers": [
            "fast"
        ]
    },
    {
        "template": "He stopped and took a long ___ under a big ___.",
        "answers": [
            "nap",
            "tree"
        ]
    },
    {
        "template": "The tortoise kept walking ___.",
        "answers": [
            "slowly"
        ]
    },
    {
        "template": "In the end, the tortoise ___ the race!",
        "answers": [
            "won"
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
        "word": "fast",
        "vi": "nhanh",
        "distractor": false
    },
    {
        "word": "nap",
        "vi": "giấc ngủ ngắn",
        "distractor": false
    },
    {
        "word": "tree",
        "vi": "cây",
        "distractor": false
    },
    {
        "word": "slowly",
        "vi": "chậm rãi",
        "distractor": false
    },
    {
        "word": "won",
        "vi": "thắng",
        "distractor": false
    },
    {
        "word": "slowly",
        "vi": "chậm (dùng cho thỏ - sai)",
        "distractor": true
    },
    {
        "word": "lost",
        "vi": "thua",
        "distractor": true
    },
    {
        "word": "school",
        "vi": "trường học",
        "distractor": true
    }
]
    }
  }
};
