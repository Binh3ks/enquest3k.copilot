export default {
  title: "My City",
  min_words: 45,
  model_sentence: "I live in Ho Chi Minh City, which is one of the largest and most exciting cities in Vietnam. The streets are always busy and noisy because millions of people live and work here every day. I can see tall modern skyscrapers next to old French colonial buildings, and I think that mix makes the city look very interesting. There are huge shopping centers, busy markets, and beautiful parks spread all across the city. However, the traffic can be very heavy during rush hour so many people ride motorbikes to move faster. I love my city because there is always something new to discover and explore. Living here makes me feel proud and excited about the future.",
  instruction_en: "Write a detailed description of your city with comparisons and reasons!",
  instruction_vi: "Vi\u1ebft m\u00f4 t\u1ea3 chi ti\u1ebft v\u1ec1 th\u00e0nh ph\u1ed1 c\u1ee7a b\u1ea1n v\u1edbi so s\u00e1nh v\u00e0 l\u00fd do!",
  prompt_en: "What makes your city special? What are the good and bad things? How does living there make you feel?",
  prompt_vi: "\u0110i\u1ec1u g\u00ec l\u00e0m th\u00e0nh ph\u1ed1 c\u1ee7a b\u1ea1n \u0111\u1eb7c bi\u1ec7t? \u0110i\u1ec1u t\u1ed1t v\u00e0 x\u1ea5u l\u00e0 g\u00ec? S\u1ed1ng \u1edf \u0111\u00f3 khi\u1ebfn b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["skyscrapers", "colonial", "shopping centers", "traffic", "rush hour", "discover", "explore"],
  topic_talk_prompt: "Describe your city \u2014 what is great about it and what is not so great?",
  sentence_frames: [
    {
        "template": "The streets are always ___ and ___ because millions of people ___ and ___ here.",
        "answers": [
            "busy",
            "noisy",
            "live",
            "work"
        ]
    },
    {
        "template": "I can see ___ next to ___, and I think that mix makes the city look ___.",
        "answers": [
            "tall modern skyscrapers",
            "old French colonial buildings",
            "very interesting"
        ]
    },
    {
        "template": "There are ___, ___, and ___ spread all across the city.",
        "answers": [
            "huge shopping centers",
            "busy markets",
            "beautiful parks"
        ]
    },
    {
        "template": "However, the traffic can be ___ during rush hour so many people ___ to move faster.",
        "answers": [
            "very heavy",
            "ride motorbikes"
        ]
    },
    {
        "template": "I love my city because there is always ___ to discover and explore.",
        "answers": [
            "something new"
        ]
    },
    {
        "template": "Living here makes me feel ___ and ___ about the future.",
        "answers": [
            "proud",
            "excited"
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
        "word": "busy",
        "vi": "bận rộn",
        "distractor": false
    },
    {
        "word": "noisy",
        "vi": "ồn ào",
        "distractor": false
    },
    {
        "word": "live",
        "vi": "sinh sống",
        "distractor": false
    },
    {
        "word": "work",
        "vi": "làm việc",
        "distractor": false
    },
    {
        "word": "tall modern skyscrapers",
        "vi": "những tòa nhà chọc trời hiện đại",
        "distractor": false
    },
    {
        "word": "old French colonial buildings",
        "vi": "những tòa nhà thực dân Pháp cũ",
        "distractor": false
    },
    {
        "word": "very interesting",
        "vi": "rất thú vị",
        "distractor": false
    },
    {
        "word": "huge shopping centers",
        "vi": "các trung tâm thương mại lớn",
        "distractor": false
    },
    {
        "word": "busy markets",
        "vi": "các chợ nhộn nhịp",
        "distractor": false
    },
    {
        "word": "beautiful parks",
        "vi": "những công viên đẹp",
        "distractor": false
    },
    {
        "word": "very heavy",
        "vi": "rất nặng nề/đông đúc",
        "distractor": false
    },
    {
        "word": "ride motorbikes",
        "vi": "đi xe máy",
        "distractor": false
    },
    {
        "word": "something new",
        "vi": "điều gì đó mới mẻ",
        "distractor": false
    },
    {
        "word": "proud",
        "vi": "tự hào",
        "distractor": false
    },
    {
        "word": "excited",
        "vi": "hào hứng",
        "distractor": false
    },
    {
        "word": "quiet and empty",
        "vi": "yên tĩnh và trống vắng",
        "distractor": true
    },
    {
        "word": "nothing to do",
        "vi": "không có gì để làm",
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
