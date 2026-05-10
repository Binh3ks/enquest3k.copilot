export default {
  title: "Write About Your Daily Routine",
  min_words: 45,
  model_sentence: "I have a very organised daily routine that helps me stay healthy and ready for school every day. I wake up at six thirty and immediately wash my face and brush my teeth so that I feel fresh and awake. Then I have a nutritious breakfast with my family, which usually includes eggs, toast, and a glass of fresh orange juice. After breakfast, I pack my school bag, put on my uniform, and leave the house by seven fifteen. At school I study hard and I always pay attention in class because I want to do well in my lessons. In the evening, I finish my homework first before I watch television or play with my toys. I go to bed at nine o'clock so that I get enough sleep and feel ready for the next day.",
  instruction_en: "Write about your full daily routine from morning to night using sequence words!",
  instruction_vi: "Vi\u1ebft v\u1ec1 th\u00f3i quen c\u1ea3 ng\u00e0y t\u1eeb s\u00e1ng \u0111\u1ebfn t\u1ed1i d\u00f9ng t\u1eeb n\u1ed1i tr\u00ecnh t\u1ef1!",
  prompt_en: "What is your routine from waking up to going to bed? Use First, Then, After, Finally!",
  prompt_vi: "Th\u00f3i quen c\u1ee7a b\u1ea1n t\u1eeb khi th\u1ee9c d\u1eady \u0111\u1ebfn khi ng\u1ee7? D\u00f9ng First, Then, After, Finally!",
  keywords: ["organised", "nutritious", "uniform", "attention", "homework", "television", "routine"],
  topic_talk_prompt: "Walk me through your whole day from morning to night!",
  sentence_frames: [
    {
        "template": "I wake up at ___ and immediately ___ and ___ so that I feel fresh and awake.",
        "answers": [
            "six thirty",
            "wash my face",
            "brush my teeth"
        ]
    },
    {
        "template": "Then I have ___ with my family, which usually includes ___, ___, and ___.",
        "answers": [
            "a nutritious breakfast",
            "eggs",
            "toast",
            "a glass of fresh orange juice"
        ]
    },
    {
        "template": "After breakfast, I ___, put on my ___, and leave the house by ___.",
        "answers": [
            "pack my school bag",
            "uniform",
            "seven fifteen"
        ]
    },
    {
        "template": "In the evening, I finish ___ first before I ___ or play with my toys.",
        "answers": [
            "my homework",
            "watch television"
        ]
    },
    {
        "template": "I go to bed at ___ so that I get enough ___ and feel ready for the next day.",
        "answers": [
            "nine o'clock",
            "sleep"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
    {
        "word": "six thirty",
        "vi": "sáu giờ rưỡi",
        "distractor": false
    },
    {
        "word": "wash my face",
        "vi": "rửa mặt",
        "distractor": false
    },
    {
        "word": "brush my teeth",
        "vi": "đánh răng",
        "distractor": false
    },
    {
        "word": "a nutritious breakfast",
        "vi": "bữa sáng bổ dưỡng",
        "distractor": false
    },
    {
        "word": "eggs",
        "vi": "trứng",
        "distractor": false
    },
    {
        "word": "toast",
        "vi": "bánh mì nướng",
        "distractor": false
    },
    {
        "word": "a glass of fresh orange juice",
        "vi": "một ly nước cam tươi",
        "distractor": false
    },
    {
        "word": "pack my school bag",
        "vi": "đóng gói cặp sách",
        "distractor": false
    },
    {
        "word": "uniform",
        "vi": "đồng phục",
        "distractor": false
    },
    {
        "word": "seven fifteen",
        "vi": "bảy giờ mười lăm",
        "distractor": false
    },
    {
        "word": "my homework",
        "vi": "bài tập về nhà",
        "distractor": false
    },
    {
        "word": "watch television",
        "vi": "xem ti vi",
        "distractor": false
    },
    {
        "word": "nine o'clock",
        "vi": "chín giờ",
        "distractor": false
    },
    {
        "word": "sleep",
        "vi": "giấc ngủ",
        "distractor": false
    },
    {
        "word": "midnight",
        "vi": "nửa đêm",
        "distractor": true
    },
    {
        "word": "junk food",
        "vi": "thức ăn không lành mạnh",
        "distractor": true
    },
    {
        "word": "stay up all night",
        "vi": "thức suốt đêm",
        "distractor": true
    }
]
    }
  }
};
