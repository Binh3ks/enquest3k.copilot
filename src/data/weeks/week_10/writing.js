export default {
  title: "City vs Farm",
  min_words: 45,
  model_sentence: "The city and the farm are very different places to live, and both have their own advantages and disadvantages. The city is exciting and modern because there are many shops, schools, restaurants, and entertainment centres. However, the city is also very noisy and crowded, and the air can be polluted because of heavy traffic. The farm, on the other hand, is peaceful and green with fresh air and wide open spaces. Although the farm is quiet and there is less to do, I think it is a healthier place to live. I would choose to live on the farm during the summer holidays because I love animals and nature. But I also need the city for school and learning, so the best solution might be to experience both.",
  instruction_en: "Write a full compare and contrast text about city and farm life!",
  instruction_vi: "Vi\u1ebft b\u00e0i so s\u00e1nh v\u00e0 \u0111\u1ed1i chi\u1ebfu \u0111\u1ea7y \u0111\u1ee7 v\u1ec1 th\u00e0nh ph\u1ed1 v\u00e0 n\u00f4ng tr\u1ea1i!",
  prompt_en: "What are the advantages and disadvantages of each? Which would you choose and why?",
  prompt_vi: "\u01afu v\u00e0 nh\u01b0\u1ee3c \u0111i\u1ec3m c\u1ee7a m\u1ed7i n\u01a1i l\u00e0 g\u00ec? B\u1ea1n ch\u1ecdn n\u01a1i n\u00e0o v\u00e0 t\u1ea1i sao?",
  keywords: ["advantages", "disadvantages", "polluted", "entertainment", "peaceful", "solution", "experience"],
  topic_talk_prompt: "Compare city life and farm life \u2014 which is better and why?",
  sentence_frames: [
    {
        "template": "The city is ___ and ___ because there are many shops, schools, and ___ centres.",
        "answers": [
            "exciting",
            "modern",
            "entertainment"
        ]
    },
    {
        "template": "However, the city is also ___ and ___, and the air can be ___ because of heavy traffic.",
        "answers": [
            "very noisy",
            "crowded",
            "polluted"
        ]
    },
    {
        "template": "The farm, on the other hand, is ___ and ___ with fresh air and ___.",
        "answers": [
            "peaceful",
            "green",
            "wide open spaces"
        ]
    },
    {
        "template": "Although the farm is ___ and there is less to do, I think it is a ___ place to live.",
        "answers": [
            "quiet",
            "healthier"
        ]
    },
    {
        "template": "I would choose ___ during the summer because I love ___ and ___.",
        "answers": [
            "to live on the farm",
            "animals",
            "nature"
        ]
    },
    {
        "template": "The best solution might be to ___ both.",
        "answers": [
            "experience"
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
        "word": "exciting",
        "vi": "thú vị",
        "distractor": false
    },
    {
        "word": "modern",
        "vi": "hiện đại",
        "distractor": false
    },
    {
        "word": "entertainment",
        "vi": "giải trí",
        "distractor": false
    },
    {
        "word": "very noisy",
        "vi": "rất ồn ào",
        "distractor": false
    },
    {
        "word": "crowded",
        "vi": "đông đúc",
        "distractor": false
    },
    {
        "word": "polluted",
        "vi": "ô nhiễm",
        "distractor": false
    },
    {
        "word": "peaceful",
        "vi": "bình yên",
        "distractor": false
    },
    {
        "word": "green",
        "vi": "xanh tươi",
        "distractor": false
    },
    {
        "word": "wide open spaces",
        "vi": "không gian rộng mở",
        "distractor": false
    },
    {
        "word": "quiet",
        "vi": "yên tĩnh",
        "distractor": false
    },
    {
        "word": "healthier",
        "vi": "lành mạnh hơn",
        "distractor": false
    },
    {
        "word": "to live on the farm",
        "vi": "sống ở nông trại",
        "distractor": false
    },
    {
        "word": "animals",
        "vi": "động vật",
        "distractor": false
    },
    {
        "word": "nature",
        "vi": "thiên nhiên",
        "distractor": false
    },
    {
        "word": "experience",
        "vi": "trải nghiệm",
        "distractor": false
    },
    {
        "word": "dangerous",
        "vi": "nguy hiểm",
        "distractor": true
    },
    {
        "word": "boring and useless",
        "vi": "nhàm chán và vô ích",
        "distractor": true
    },
    {
        "word": "avoid",
        "vi": "tránh xa",
        "distractor": true
    }
]
    }
  }
};
