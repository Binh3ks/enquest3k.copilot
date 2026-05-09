export default {
  title: "Treasure Hunt at Home",
  min_words: 30,
  model_sentence: "I love playing treasure hunt at home. My friend hides a treasure box in my room. First, I look under my bed. Then I look behind the door. Finally, I find the box and feel excited!",
  instruction_en: "Write a sequence of events during your treasure hunt!",
  instruction_vi: "Vi\u1ebft chu\u1ed7i s\u1ef1 ki\u1ec7n trong cu\u1ed9c s\u0103n kho b\u00e1u!",
  prompt_en: "Where did you search? What happened in the end?",
  prompt_vi: "B\u1ea1n t\u00ecm \u1edf \u0111\u00e2u? Cu\u1ed1i c\u00f9ng \u0111i\u1ec1u g\u00ec x\u1ea3y ra?",
  keywords: ["treasure", "room", "under", "behind", "find", "excited"],
  topic_talk_prompt: "Describe a treasure hunt you played!",
  sentence_frames: [
    {
        "template": "My friend hides ___ in ___.",
        "answers": [
            "a treasure box",
            "my room"
        ]
    },
    {
        "template": "First, I look ___. Then I look ___.",
        "answers": [
            "under my bed",
            "behind the door"
        ]
    },
    {
        "template": "Finally, I find the box and feel ___!",
        "answers": [
            "excited"
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
        "word": "a treasure box",
        "vi": "một hộp kho báu",
        "distractor": false
    },
    {
        "word": "my room",
        "vi": "phòng của tôi",
        "distractor": false
    },
    {
        "word": "under my bed",
        "vi": "dưới gầm giường",
        "distractor": false
    },
    {
        "word": "behind the door",
        "vi": "sau cánh cửa",
        "distractor": false
    },
    {
        "word": "excited",
        "vi": "hào hứng",
        "distractor": false
    },
    {
        "word": "on the ceiling",
        "vi": "trên trần nhà",
        "distractor": true
    },
    {
        "word": "inside the fridge",
        "vi": "trong tủ lạnh",
        "distractor": true
    },
    {
        "word": "bored",
        "vi": "chán",
        "distractor": true
    }
]
    }
  }
};
