export default {
  title: "My Yesterday",
  min_words: 28,
  model_sentence: "Yesterday I walked to school. I listened to my teacher. After school I helped my mum. In the evening I watched TV. Then I finished my homework.",
  instruction_en: "Write about what you did yesterday using past tense!",
  instruction_vi: "Vi\u1ebft v\u1ec1 nh\u1eefng g\u00ec b\u1ea1n \u0111\u00e3 l\u00e0m h\u00f4m qua b\u1eb1ng th\u00ec qu\u00e1 kh\u1ee9!",
  prompt_en: "What did you do in the morning? After school? In the evening?",
  prompt_vi: "Bu\u1ed5i s\u00e1ng b\u1ea1n \u0111\u00e3 l\u00e0m g\u00ec? Sau tr\u01b0\u1eddng? T\u1ed1i th\u00ec sao?",
  keywords: ["walked", "listened", "helped", "watched", "finished"],
  topic_talk_prompt: "What did you do yesterday \u2014 morning, afternoon, and evening?",
  sentence_frames: [
    {
        "template": "Yesterday I ___ to school.",
        "answers": [
            "walked"
        ]
    },
    {
        "template": "I ___ to my teacher.",
        "answers": [
            "listened"
        ]
    },
    {
        "template": "After school I ___ my mum.",
        "answers": [
            "helped"
        ]
    },
    {
        "template": "In the evening I ___ TV.",
        "answers": [
            "watched"
        ]
    },
    {
        "template": "Then I ___ my homework.",
        "answers": [
            "finished"
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
        "word": "walked",
        "vi": "đã đi bộ",
        "distractor": false
    },
    {
        "word": "listened",
        "vi": "đã lắng nghe",
        "distractor": false
    },
    {
        "word": "helped",
        "vi": "đã giúp",
        "distractor": false
    },
    {
        "word": "watched",
        "vi": "đã xem",
        "distractor": false
    },
    {
        "word": "finished",
        "vi": "đã hoàn thành",
        "distractor": false
    },
    {
        "word": "runs",
        "vi": "chạy — sai thì",
        "distractor": true
    },
    {
        "word": "ignores",
        "vi": "bỏ qua — sai",
        "distractor": true
    },
    {
        "word": "starts",
        "vi": "bắt đầu — sai thì",
        "distractor": true
    }
]
    }
  }
};
