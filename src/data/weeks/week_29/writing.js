export default {
  title: "Writing: My Journey Story",
  min_words: 50,
  model_sentence: "Last weekend, my family went on an exciting journey to the mountains. We packed our bags the night before and woke up very early. On the road, we saw green valleys and tall waterfalls. When we arrived, we set up camp and cooked dinner under the stars. It was the best trip of my life.",
  instruction_en: "Write your journey story with rich details!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n h\u00e0nh tr\u00ecnh c\u1ee7a b\u1ea1n v\u1edbi nhi\u1ec1u chi ti\u1ebft!",
  prompt_en: "Where did you go? What did you prepare? What did you see and do?",
  prompt_vi: "B\u1ea1n \u0111i \u0111\u00e2u? B\u1ea1n chu\u1ea9n b\u1ecb g\u00ec? B\u1ea1n th\u1ea5y v\u00e0 l\u00e0m g\u00ec?",
  keywords: ["journey", "mountains", "packed", "woke", "valleys", "waterfalls", "camp", "cooked", "stars"],
  topic_talk_prompt: "Tell me about an exciting journey you went on!",
  sentence_frames: [
    {
        "template": "Last weekend, my family went on ___ to ___.",
        "answers": [
            "an exciting journey",
            "the mountains"
        ]
    },
    {
        "template": "We ___ our bags ___ and woke up very ___.",
        "answers": [
            "packed",
            "the night before",
            "early"
        ]
    },
    {
        "template": "On the road, we saw ___ and ___.",
        "answers": [
            "green valleys",
            "tall waterfalls"
        ]
    },
    {
        "template": "When we arrived, we ___ and ___ under the stars.",
        "answers": [
            "set up camp",
            "cooked dinner"
        ]
    },
    {
        "template": "It was ___.",
        "answers": [
            "the best trip of my life"
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
        "word": "an exciting journey",
        "vi": "một cuộc hành trình thú vị",
        "distractor": false
    },
    {
        "word": "the mountains",
        "vi": "vùng núi",
        "distractor": false
    },
    {
        "word": "packed",
        "vi": "đóng gói",
        "distractor": false
    },
    {
        "word": "the night before",
        "vi": "tối hôm trước",
        "distractor": false
    },
    {
        "word": "early",
        "vi": "sớm",
        "distractor": false
    },
    {
        "word": "green valleys",
        "vi": "thung lũng xanh",
        "distractor": false
    },
    {
        "word": "tall waterfalls",
        "vi": "thác nước cao",
        "distractor": false
    },
    {
        "word": "set up camp",
        "vi": "dựng trại",
        "distractor": false
    },
    {
        "word": "cooked dinner",
        "vi": "nấu bữa tối",
        "distractor": false
    },
    {
        "word": "the best trip of my life",
        "vi": "chuyến đi tuyệt nhất trong đời",
        "distractor": false
    },
    {
        "word": "a boring stay at home",
        "vi": "một kỳ ở nhà nhàm chán",
        "distractor": true
    },
    {
        "word": "flat and empty land",
        "vi": "vùng đất bằng phẳng và trống",
        "distractor": true
    }
]
    }
  }
};
