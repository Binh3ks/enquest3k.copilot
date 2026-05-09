export default {
  title: "Writing: My Weekend Comic Strip",
  min_words: 45,
  model_sentence: "Last weekend, my family went on a fun trip to the nature park. First, we packed a picnic basket with sandwiches and juice. Then, we hiked through the forest trail. After that, we saw a waterfall and took photos. Finally, we drove home feeling tired but grateful.",
  instruction_en: "Write your weekend story using the four-panel comic strip format!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n cu\u1ed1i tu\u1ea7n theo \u0111\u1ecbnh d\u1ea1ng b\u1ed1n b\u1ea3ng truy\u1ec7n tranh!",
  prompt_en: "What did you do at each stage of your weekend trip?",
  prompt_vi: "B\u1ea1n l\u00e0m g\u00ec \u1edf m\u1ed7i giai \u0111o\u1ea1n c\u1ee7a chuy\u1ebfn \u0111i cu\u1ed1i tu\u1ea7n?",
  keywords: ["trip", "nature park", "packed", "picnic", "hiked", "forest", "waterfall", "photos", "grateful"],
  topic_talk_prompt: "Tell me about your weekend trip in four panels!",
  sentence_frames: [
    {
        "template": "Last weekend, my family went on ___ to ___.",
        "answers": [
            "a fun trip",
            "the nature park"
        ]
    },
    {
        "template": "First, we ___ with ___ and ___.",
        "answers": [
            "packed a picnic basket",
            "sandwiches",
            "juice"
        ]
    },
    {
        "template": "Then, we ___ through ___.",
        "answers": [
            "hiked",
            "the forest trail"
        ]
    },
    {
        "template": "After that, we saw ___ and ___.",
        "answers": [
            "a waterfall",
            "took photos"
        ]
    },
    {
        "template": "Finally, we drove home feeling ___ but ___.",
        "answers": [
            "tired",
            "grateful"
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
        "word": "a fun trip",
        "vi": "một chuyến đi thú vị",
        "distractor": false
    },
    {
        "word": "the nature park",
        "vi": "công viên tự nhiên",
        "distractor": false
    },
    {
        "word": "packed a picnic basket",
        "vi": "đóng gói giỏ dã ngoại",
        "distractor": false
    },
    {
        "word": "sandwiches",
        "vi": "bánh sandwich",
        "distractor": false
    },
    {
        "word": "juice",
        "vi": "nước trái cây",
        "distractor": false
    },
    {
        "word": "hiked",
        "vi": "đi bộ leo núi",
        "distractor": false
    },
    {
        "word": "the forest trail",
        "vi": "đường mòn trong rừng",
        "distractor": false
    },
    {
        "word": "a waterfall",
        "vi": "thác nước",
        "distractor": false
    },
    {
        "word": "took photos",
        "vi": "chụp ảnh",
        "distractor": false
    },
    {
        "word": "tired",
        "vi": "mệt mỏi",
        "distractor": false
    },
    {
        "word": "grateful",
        "vi": "biết ơn",
        "distractor": false
    },
    {
        "word": "a boring day at home",
        "vi": "một ngày nhàm chán ở nhà",
        "distractor": true
    },
    {
        "word": "unhappy and angry",
        "vi": "không vui và tức giận",
        "distractor": true
    }
]
    }
  }
};
