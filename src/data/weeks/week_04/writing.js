export default {
  title: "My Happy Jar",
  min_words: 40,
  model_sentence: "I am a friendly and curious person who loves exploring new things. I like playing football with my friends because it makes me feel free and energetic. I also love drawing animals because I can use my imagination and create my own world. When I read story books, I feel calm and excited at the same time. My favorite thing to do on weekends is playing board games with my family because we laugh and talk together. I think hobbies make us happier and smarter every day.",
  instruction_en: "Write about your personality and hobbies using because and when!",
  instruction_vi: "Vi\u1ebft v\u1ec1 t\u00ednh c\u00e1ch v\u00e0 s\u1edf th\u00edch b\u1eb1ng because v\u00e0 when!",
  prompt_en: "What are you like? What do you love doing and why? How do hobbies make you feel?",
  prompt_vi: "B\u1ea1n l\u00e0 ng\u01b0\u1eddi th\u1ebf n\u00e0o? B\u1ea1n th\u00edch l\u00e0m g\u00ec v\u00e0 t\u1ea1i sao? S\u1edf th\u00edch khi\u1ebfn b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["curious", "exploring", "energetic", "imagination", "calm", "hobbies", "smarter"],
  topic_talk_prompt: "Tell me about your personality and what you love doing!",
  sentence_frames: [
    {
        "template": "I like ___ because it makes me feel ___ and ___.",
        "answers": [
            "playing football with my friends",
            "free",
            "energetic"
        ]
    },
    {
        "template": "I also love ___ because I can use my ___ and create my own world.",
        "answers": [
            "drawing animals",
            "imagination"
        ]
    },
    {
        "template": "When I ___, I feel ___ and ___ at the same time.",
        "answers": [
            "read story books",
            "calm",
            "excited"
        ]
    },
    {
        "template": "My favorite thing on weekends is ___ because we ___ and ___ together.",
        "answers": [
            "playing board games with my family",
            "laugh",
            "talk"
        ]
    },
    {
        "template": "I think hobbies make us ___ and ___ every day.",
        "answers": [
            "happier",
            "smarter"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
    {
        "word": "playing football with my friends",
        "vi": "đá bóng với bạn bè",
        "distractor": false
    },
    {
        "word": "free",
        "vi": "tự do",
        "distractor": false
    },
    {
        "word": "energetic",
        "vi": "tràn đầy năng lượng",
        "distractor": false
    },
    {
        "word": "drawing animals",
        "vi": "vẽ động vật",
        "distractor": false
    },
    {
        "word": "imagination",
        "vi": "trí tưởng tượng",
        "distractor": false
    },
    {
        "word": "read story books",
        "vi": "đọc truyện",
        "distractor": false
    },
    {
        "word": "calm",
        "vi": "bình yên",
        "distractor": false
    },
    {
        "word": "excited",
        "vi": "hào hứng",
        "distractor": false
    },
    {
        "word": "playing board games with my family",
        "vi": "chơi trò chơi cờ cùng gia đình",
        "distractor": false
    },
    {
        "word": "laugh",
        "vi": "cười",
        "distractor": false
    },
    {
        "word": "talk",
        "vi": "nói chuyện",
        "distractor": false
    },
    {
        "word": "happier",
        "vi": "vui hơn",
        "distractor": false
    },
    {
        "word": "smarter",
        "vi": "thông minh hơn",
        "distractor": false
    },
    {
        "word": "staying home alone",
        "vi": "ở nhà một mình",
        "distractor": true
    },
    {
        "word": "bored and lazy",
        "vi": "chán và lười",
        "distractor": true
    },
    {
        "word": "dumber",
        "vi": "ngu hơn",
        "distractor": true
    }
]
    }
  }
};
