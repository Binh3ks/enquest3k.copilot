export default {
  title: "My Emotional Day",
  min_words: 28,
  model_sentence: "Yesterday I felt scared. I could not find my bag. Then I felt relieved. My mum helped me. I was proud at the end.",
  instruction_en: "Write about an emotional day using feeling words!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u1ed9t ng\u00e0y \u0111\u1ea7y c\u1ea3m x\u00fac b\u1eb1ng c\u00e1c t\u1eeb c\u1ea3m x\u00fac!",
  prompt_en: "How did you feel? What happened? How did you feel at the end?",
  prompt_vi: "B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o? Chuy\u1ec7n g\u00ec x\u1ea3y ra? Cu\u1ed1i c\u00f9ng b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["scared", "bag", "relieved", "helped", "proud"],
  topic_talk_prompt: "Tell me about a time you felt many different emotions in one day!",
  sentence_frames: [
    {
        "template": "Yesterday I felt ___.",
        "answers": [
            "scared"
        ]
    },
    {
        "template": "I could not find my ___.",
        "answers": [
            "bag"
        ]
    },
    {
        "template": "Then I felt ___.",
        "answers": [
            "relieved"
        ]
    },
    {
        "template": "My mum ___ me.",
        "answers": [
            "helped"
        ]
    },
    {
        "template": "I was ___ at the end.",
        "answers": [
            "proud"
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
        "word": "scared",
        "vi": "sợ hãi",
        "distractor": false
    },
    {
        "word": "bag",
        "vi": "cặp sách",
        "distractor": false
    },
    {
        "word": "relieved",
        "vi": "nhẹ nhõm",
        "distractor": false
    },
    {
        "word": "helped",
        "vi": "đã giúp",
        "distractor": false
    },
    {
        "word": "proud",
        "vi": "tự hào",
        "distractor": false
    },
    {
        "word": "bored",
        "vi": "chán",
        "distractor": true
    },
    {
        "word": "homework",
        "vi": "bài tập — không khớp",
        "distractor": true
    },
    {
        "word": "angry",
        "vi": "tức giận",
        "distractor": true
    }
]
    }
  }
};
