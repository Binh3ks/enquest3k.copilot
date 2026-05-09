export default {
  title: "When I Was Small",
  min_words: 40,
  model_sentence: "I was a baby in this old photo. I was very small and cute. My mom says I was noisy. I cried a lot! But I was quiet when she held me.",
  instruction_en: "Write about your baby years using past tense phrases!",
  instruction_vi: "Vi\u1ebft v\u1ec1 tu\u1ed5i th\u01a1 b\u1eb1ng c\u1ee5m t\u1eeb th\u00ec qu\u00e1 kh\u1ee9!",
  prompt_en: "What were you like? What did your mom say? What made you quiet?",
  prompt_vi: "B\u1ea1n nh\u01b0 th\u1ebf n\u00e0o? M\u1eb9 b\u1ea1n n\u00f3i g\u00ec? \u0110i\u1ec1u g\u00ec l\u00e0m b\u1ea1n y\u00ean l\u1eb7ng?",
  keywords: ["baby", "small", "cute", "noisy", "cried", "quiet", "held"],
  topic_talk_prompt: "Describe what you were like as a baby!",
  sentence_frames: [
    {
        "template": "I was ___ and I was very ___ and ___.",
        "answers": [
            "a baby",
            "small",
            "cute"
        ]
    },
    {
        "template": "My mom says I was ___ and I ___ a lot.",
        "answers": [
            "noisy",
            "cried"
        ]
    },
    {
        "template": "But I was ___ when she ___ me.",
        "answers": [
            "quiet",
            "held"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
    {
        "word": "a baby",
        "vi": "một em bé",
        "distractor": false
    },
    {
        "word": "small",
        "vi": "nhỏ",
        "distractor": false
    },
    {
        "word": "cute",
        "vi": "dễ thương",
        "distractor": false
    },
    {
        "word": "noisy",
        "vi": "ồn ào",
        "distractor": false
    },
    {
        "word": "cried",
        "vi": "khóc",
        "distractor": false
    },
    {
        "word": "quiet",
        "vi": "yên lặng",
        "distractor": false
    },
    {
        "word": "held",
        "vi": "ôm",
        "distractor": false
    },
    {
        "word": "very old",
        "vi": "rất già",
        "distractor": true
    },
    {
        "word": "laughed",
        "vi": "cười",
        "distractor": true
    },
    {
        "word": "ignored",
        "vi": "phớt lờ",
        "distractor": true
    }
]
    }
  }
};
