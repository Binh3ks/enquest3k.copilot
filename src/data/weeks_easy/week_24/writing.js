export default {
  title: "Writing: My Emotional Day",
  min_words: 30,
  model_sentence: "Yesterday was a very emotional day for me. In the morning I was scared because I could not find my bag, but my mum was calm and helped me find it.",
  instruction_en: "Write about a day with big feelings!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u1ed9t ng\u00e0y v\u1edbi nhi\u1ec1u c\u1ea3m x\u00fac l\u1edbn!",
  prompt_en: "How did you feel? What happened? Who helped you?",
  prompt_vi: "B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o? Chuy\u1ec7n g\u00ec x\u1ea3y ra? Ai gi\u00fap b\u1ea1n?",
  keywords: ["emotional", "scared", "bag", "calm", "helped", "find"],
  topic_talk_prompt: "Tell me about an emotional day you had!",
  sentence_frames: [
    {
        "template": "Yesterday was a very ___ day for me.",
        "answers": [
            "emotional"
        ]
    },
    {
        "template": "I was ___ because I could not find my ___.",
        "answers": [
            "scared",
            "bag"
        ]
    },
    {
        "template": "My mum was ___ and ___ me.",
        "answers": [
            "calm",
            "helped"
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
        "word": "emotional",
        "vi": "đầy cảm xúc",
        "distractor": false
    },
    {
        "word": "scared",
        "vi": "sợ",
        "distractor": false
    },
    {
        "word": "bag",
        "vi": "cặp sách",
        "distractor": false
    },
    {
        "word": "calm",
        "vi": "bình tĩnh",
        "distractor": false
    },
    {
        "word": "helped",
        "vi": "giúp đỡ",
        "distractor": false
    },
    {
        "word": "boring",
        "vi": "nhàm chán",
        "distractor": true
    },
    {
        "word": "angry",
        "vi": "tức giận",
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
