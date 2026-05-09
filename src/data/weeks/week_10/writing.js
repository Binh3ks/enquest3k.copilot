export default {
  title: "City vs Farm",
  min_words: 35,
  model_sentence: "I like both the city and the farm. The city is big, but the farm is peaceful. The city has many cars, but the farm has animals and green fields.",
  instruction_en: "Use contrast phrases to compare city and farm life!",
  instruction_vi: "D\u00f9ng c\u1ee5m t\u1eeb \u0111\u1ed1i l\u1eadp \u0111\u1ec3 so s\u00e1nh th\u00e0nh ph\u1ed1 v\u00e0 n\u00f4ng tr\u1ea1i!",
  prompt_en: "How are the city and farm different? Which do you prefer and why?",
  prompt_vi: "Th\u00e0nh ph\u1ed1 v\u00e0 n\u00f4ng tr\u1ea1i kh\u00e1c nhau th\u1ebf n\u00e0o?",
  keywords: ["city", "farm", "big", "peaceful", "cars", "animals", "fields"],
  topic_talk_prompt: "Compare life in the city and on the farm!",
  sentence_frames: [
    {
        "template": "The city is ___, but the farm is ___.",
        "answers": [
            "big",
            "peaceful"
        ]
    },
    {
        "template": "The city has ___, but the farm has ___ and ___.",
        "answers": [
            "many cars",
            "animals",
            "green fields"
        ]
    },
    {
        "template": "I prefer ___ because ___.",
        "answers": [
            "the farm",
            "it is calm and close to nature"
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
        "word": "big",
        "vi": "to lớn",
        "distractor": false
    },
    {
        "word": "peaceful",
        "vi": "bình yên",
        "distractor": false
    },
    {
        "word": "many cars",
        "vi": "nhiều xe hơi",
        "distractor": false
    },
    {
        "word": "animals",
        "vi": "động vật",
        "distractor": false
    },
    {
        "word": "green fields",
        "vi": "cánh đồng xanh",
        "distractor": false
    },
    {
        "word": "the farm",
        "vi": "nông trại",
        "distractor": false
    },
    {
        "word": "it is calm and close to nature",
        "vi": "yên tĩnh và gần thiên nhiên",
        "distractor": false
    },
    {
        "word": "very crowded",
        "vi": "rất đông đúc",
        "distractor": true
    },
    {
        "word": "always boring",
        "vi": "luôn nhàm chán",
        "distractor": true
    }
]
    }
  }
};
