export default {
  title: "Finding the Treasure",
  min_words: 20,
  model_sentence: "My friend hides a box. I look under the bed. I look on the chair. I find the box!",
  instruction_en: "Write about your treasure hunt!",
  instruction_vi: "Vi\u1ebft v\u1ec1 cu\u1ed9c t\u00ecm kho b\u00e1u c\u1ee7a b\u1ea1n!",
  prompt_en: "Where did you look? Where did you find it?",
  prompt_vi: "B\u1ea1n t\u00ecm \u1edf \u0111\u00e2u? B\u1ea1n t\u00ecm th\u1ea5y \u1edf \u0111\u00e2u?",
  keywords: ["hides", "box", "under", "on", "find"],
  topic_talk_prompt: "Tell me about your treasure hunt!",
  sentence_frames: [
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
        "template": "I look ___ the chair.",
        "answers": [
            "on"
        ]
    },
    {
        "template": "I ___ the box!",
        "answers": [
            "find"
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
        "word": "on",
        "vi": "trên",
        "distractor": false
    },
    {
        "word": "find",
        "vi": "tìm thấy",
        "distractor": false
    },
    {
        "word": "gives",
        "vi": "đưa",
        "distractor": true
    },
    {
        "word": "above",
        "vi": "phía trên xa",
        "distractor": true
    },
    {
        "word": "lose",
        "vi": "đánh mất",
        "distractor": true
    }
]
    }
  }
};
