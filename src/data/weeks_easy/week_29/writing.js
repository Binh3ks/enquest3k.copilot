export default {
  title: "My Journey Story",
  min_words: 32,
  model_sentence: "Last weekend my family went on a journey. We woke up early. On the road we saw green valleys. We set up camp when we arrived. It was the best trip.",
  instruction_en: "Write your journey story with rich details!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n h\u00e0nh tr\u00ecnh c\u1ee7a b\u1ea1n v\u1edbi chi ti\u1ebft phong ph\u00fa!",
  prompt_en: "Where did you go? What did you see? What happened when you arrived?",
  prompt_vi: "B\u1ea1n \u0111i \u0111\u00e2u? B\u1ea1n th\u1ea5y g\u00ec? \u0110i\u1ec1u g\u00ec x\u1ea3y ra khi b\u1ea1n \u0111\u1ebfn n\u01a1i?",
  keywords: ["journey", "woke", "early", "valleys", "camp", "arrived", "best", "trip"],
  topic_talk_prompt: "Tell me about an exciting journey you went on!",
  sentence_frames: [
    {
        "template": "Last weekend my family went on a ___.",
        "answers": [
            "journey"
        ]
    },
    {
        "template": "We ___ up early.",
        "answers": [
            "woke"
        ]
    },
    {
        "template": "On the road we saw green ___.",
        "answers": [
            "valleys"
        ]
    },
    {
        "template": "We set up ___ when we arrived.",
        "answers": [
            "camp"
        ]
    },
    {
        "template": "It was the best ___.",
        "answers": [
            "trip"
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
        "word": "journey",
        "vi": "hành trình",
        "distractor": false
    },
    {
        "word": "woke",
        "vi": "thức dậy",
        "distractor": false
    },
    {
        "word": "valleys",
        "vi": "thung lũng",
        "distractor": false
    },
    {
        "word": "camp",
        "vi": "trại",
        "distractor": false
    },
    {
        "word": "trip",
        "vi": "chuyến đi",
        "distractor": false
    },
    {
        "word": "argument",
        "vi": "cuộc tranh cãi",
        "distractor": true
    },
    {
        "word": "slept in",
        "vi": "ngủ muộn",
        "distractor": true
    },
    {
        "word": "buildings",
        "vi": "những tòa nhà",
        "distractor": true
    }
]
    }
  }
};
