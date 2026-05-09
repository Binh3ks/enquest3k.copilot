export default {
  title: "Finding the Treasure",
  min_words: 20,
  model_sentence: "I play treasure hunt. My friend hides a box. I look for the box. I look under the bed. I look on the chair. I find the box! I am happy.",
  instruction_en: "Write about your treasure hunt!",
  instruction_vi: "Vi\u1ebft v\u1ec1 cu\u1ed9c s\u0103n kho b\u00e1u c\u1ee7a b\u1ea1n!",
  prompt_en: "Where did you look? Did you find it? How did you feel?",
  prompt_vi: "B\u1ea1n t\u00ecm \u1edf \u0111\u00e2u? B\u1ea1n c\u00f3 t\u00ecm th\u1ea5y kh\u00f4ng? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["treasure", "friend", "box", "under", "find", "happy"],
  topic_talk_prompt: "Tell me about a treasure hunt you played!",
  sentence_frames: [
    {
        "template": "I play ___.",
        "answers": [
            "treasure hunt"
        ]
    },
    {
        "template": "My friend ___ a box.",
        "answers": [
            "hides"
        ]
    },
    {
        "template": "I look ___ the bed.",
        "answers": [
            "under"
        ]
    },
    {
        "template": "I ___ the box!",
        "answers": [
            "find"
        ]
    },
    {
        "template": "I am ___!",
        "answers": [
            "happy"
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
        "word": "treasure hunt",
        "vi": "trò chơi tìm kho báu",
        "distractor": false
    },
    {
        "word": "hides",
        "vi": "giấu",
        "distractor": false
    },
    {
        "word": "under",
        "vi": "dưới",
        "distractor": false
    },
    {
        "word": "find",
        "vi": "tìm thấy",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "gives",
        "vi": "đưa cho",
        "distractor": true
    },
    {
        "word": "above",
        "vi": "phía trên",
        "distractor": true
    },
    {
        "word": "sad",
        "vi": "buồn",
        "distractor": true
    }
]
    }
  }
};
