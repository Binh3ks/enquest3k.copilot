export default {
  title: "My Weather Day",
  min_words: 45,
  model_sentence: "The weather today is extremely cold and rainy, so I have dressed in many layers to keep myself warm and dry. I am wearing a thick woollen jumper, a waterproof jacket, and my warmest boots because the temperature has dropped to only twelve degrees. I am also carrying a large umbrella because the rain is coming down very heavily and the wind is blowing it sideways. Despite the terrible weather, I am still going to school because I have an important test today that I have been preparing for all week. When I arrive at school, I will hang my wet jacket on the hook and change into my dry school shoes. I actually enjoy rainy days because the sound of rain on the roof makes me feel cosy and focused while I study.",
  instruction_en: "Describe a cold and rainy day in full detail \u2014 what you're wearing, doing, and feeling!",
  instruction_vi: "M\u00f4 t\u1ea3 chi ti\u1ebft m\u1ed9t ng\u00e0y l\u1ea1nh m\u01b0a \u2014 m\u1eb7c g\u00ec, l\u00e0m g\u00ec v\u00e0 c\u1ea3m x\u00fac!",
  prompt_en: "What is the weather like? What are you wearing and why? How does the weather make you feel?",
  prompt_vi: "Th\u1eddi ti\u1ebft th\u1ebf n\u00e0o? M\u1eb7c g\u00ec v\u00e0 t\u1ea1i sao? Th\u1eddi ti\u1ebft khi\u1ebfn b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["layers", "woollen", "waterproof", "temperature", "degrees", "sideways", "cosy", "focused"],
  topic_talk_prompt: "Describe a cold and rainy day in full detail!",
  sentence_frames: [
    {
        "template": "I am wearing ___, ___, and ___ because the temperature has dropped to ___.",
        "answers": [
            "a thick woollen jumper",
            "a waterproof jacket",
            "my warmest boots",
            "only twelve degrees"
        ]
    },
    {
        "template": "I am also carrying ___ because the rain is coming down ___ and the wind is ___.",
        "answers": [
            "a large umbrella",
            "very heavily",
            "blowing it sideways"
        ]
    },
    {
        "template": "Despite the terrible weather, I am still going to school because I have ___ that I have been preparing for ___.",
        "answers": [
            "an important test today",
            "all week"
        ]
    },
    {
        "template": "When I arrive, I will ___ and change into ___.",
        "answers": [
            "hang my wet jacket on the hook",
            "my dry school shoes"
        ]
    },
    {
        "template": "I actually enjoy ___ because the sound of rain makes me feel ___ and ___ while I study.",
        "answers": [
            "rainy days",
            "cosy",
            "focused"
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
        "word": "a thick woollen jumper",
        "vi": "áo len dày",
        "distractor": false
    },
    {
        "word": "a waterproof jacket",
        "vi": "áo khoác chống nước",
        "distractor": false
    },
    {
        "word": "my warmest boots",
        "vi": "đôi bốt ấm nhất",
        "distractor": false
    },
    {
        "word": "only twelve degrees",
        "vi": "chỉ mười hai độ",
        "distractor": false
    },
    {
        "word": "a large umbrella",
        "vi": "chiếc ô lớn",
        "distractor": false
    },
    {
        "word": "very heavily",
        "vi": "rất nặng/mạnh",
        "distractor": false
    },
    {
        "word": "blowing it sideways",
        "vi": "thổi nghiêng",
        "distractor": false
    },
    {
        "word": "an important test today",
        "vi": "bài kiểm tra quan trọng hôm nay",
        "distractor": false
    },
    {
        "word": "all week",
        "vi": "cả tuần",
        "distractor": false
    },
    {
        "word": "hang my wet jacket on the hook",
        "vi": "treo áo ướt lên móc",
        "distractor": false
    },
    {
        "word": "my dry school shoes",
        "vi": "giày học khô",
        "distractor": false
    },
    {
        "word": "rainy days",
        "vi": "những ngày mưa",
        "distractor": false
    },
    {
        "word": "cosy",
        "vi": "ấm cúng",
        "distractor": false
    },
    {
        "word": "focused",
        "vi": "tập trung",
        "distractor": false
    },
    {
        "word": "a light summer dress",
        "vi": "váy hè nhẹ — sai mùa",
        "distractor": true
    },
    {
        "word": "very lightly",
        "vi": "rất nhẹ — sai thời tiết",
        "distractor": true
    },
    {
        "word": "distracted",
        "vi": "phân tâm",
        "distractor": true
    }
]
    }
  }
};
