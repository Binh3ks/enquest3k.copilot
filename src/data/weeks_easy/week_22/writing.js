export default {
  title: "My Time Detective Questions",
  min_words: 30,
  model_sentence: "I was a time detective. I asked my brother, Did you play yesterday? He said, Yes, I did. I asked, Did you watch TV last night? He said, No, I didn't.",
  instruction_en: "Write your time detective questions and answers!",
  instruction_vi: "Vi\u1ebft c\u00e2u h\u1ecfi v\u00e0 tr\u1ea3 l\u1eddi th\u00e1m t\u1eed th\u1eddi gian!",
  prompt_en: "What questions did you ask? What were the answers?",
  prompt_vi: "B\u1ea1n h\u1ecfi nh\u1eefng c\u00e2u h\u1ecfi g\u00ec? C\u00e2u tr\u1ea3 l\u1eddi l\u00e0 g\u00ec?",
  keywords: ["detective", "asked", "play", "yesterday", "watch", "night", "did", "didn't"],
  topic_talk_prompt: "Ask me time detective questions about yesterday!",
  sentence_frames: [
    {
        "template": "I was a time ___.",
        "answers": [
            "detective"
        ]
    },
    {
        "template": "I asked, Did you ___ yesterday?",
        "answers": [
            "play"
        ]
    },
    {
        "template": "He said, Yes, I ___.",
        "answers": [
            "did"
        ]
    },
    {
        "template": "I asked, Did you ___ TV last night?",
        "answers": [
            "watch"
        ]
    },
    {
        "template": "He said, No, I ___.",
        "answers": [
            "didn't"
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
        "word": "detective",
        "vi": "thám tử",
        "distractor": false
    },
    {
        "word": "play",
        "vi": "chơi",
        "distractor": false
    },
    {
        "word": "did",
        "vi": "đã làm",
        "distractor": false
    },
    {
        "word": "watch",
        "vi": "xem",
        "distractor": false
    },
    {
        "word": "didn't",
        "vi": "không làm",
        "distractor": false
    },
    {
        "word": "scientist",
        "vi": "nhà khoa học",
        "distractor": true
    },
    {
        "word": "tomorrow",
        "vi": "ngày mai",
        "distractor": true
    },
    {
        "word": "will",
        "vi": "sẽ (tương lai sai)",
        "distractor": true
    }
]
    }
  }
};
