export default {
  title: "The Talent Show",
  min_words: 45,
  model_sentence: "I have several talents that I am proud of and I would love to perform them in a talent show one day. I can sing clearly and loudly because I have practised every morning for two years. I can also draw very detailed pictures of animals and nature, and my art teacher says I have a gift. However, I cannot dance well yet because my legs get confused when I try to follow the beat. I also cannot speak French yet, but I am planning to start lessons next term because I think it is a beautiful language. My dream is to stand on a big stage one day and perform for a large audience who will cheer and clap for me.",
  instruction_en: "Write about your talents and things you want to learn using can, cannot, and because!",
  instruction_vi: "Vi\u1ebft v\u1ec1 t\u00e0i n\u0103ng v\u00e0 \u0111i\u1ec1u mu\u1ed1n h\u1ecdc b\u1eb1ng can, cannot v\u00e0 because!",
  prompt_en: "What can you do well? What can't you do yet? What is your dream?",
  prompt_vi: "B\u1ea1n l\u00e0m t\u1ed1t g\u00ec? Ch\u01b0a l\u00e0m \u0111\u01b0\u1ee3c g\u00ec? Gi\u1ea5c m\u01a1 c\u1ee7a b\u1ea1n l\u00e0 g\u00ec?",
  keywords: ["talents", "perform", "practised", "detailed", "confused", "beat", "audience", "cheer"],
  topic_talk_prompt: "What are your talents and what do you dream of performing?",
  sentence_frames: [
    {
        "template": "I can ___ because I have ___ every morning for two years.",
        "answers": [
            "sing clearly and loudly",
            "practised"
        ]
    },
    {
        "template": "I can also ___ and my art teacher says I have a ___.",
        "answers": [
            "draw very detailed pictures of animals",
            "gift"
        ]
    },
    {
        "template": "However, I cannot ___ yet because my legs get confused when I try to follow ___.",
        "answers": [
            "dance well",
            "the beat"
        ]
    },
    {
        "template": "I cannot speak ___ yet, but I am planning to ___ next term because it is ___.",
        "answers": [
            "French",
            "start lessons",
            "a beautiful language"
        ]
    },
    {
        "template": "My dream is to stand on ___ and perform for ___ who will ___ and ___ for me.",
        "answers": [
            "a big stage",
            "a large audience",
            "cheer",
            "clap"
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
        "word": "sing clearly and loudly",
        "vi": "hát rõ và to",
        "distractor": false
    },
    {
        "word": "practised",
        "vi": "đã luyện tập",
        "distractor": false
    },
    {
        "word": "draw very detailed pictures of animals",
        "vi": "vẽ tranh động vật rất chi tiết",
        "distractor": false
    },
    {
        "word": "gift",
        "vi": "tài năng/thiên phú",
        "distractor": false
    },
    {
        "word": "dance well",
        "vi": "nhảy tốt",
        "distractor": false
    },
    {
        "word": "the beat",
        "vi": "nhịp điệu",
        "distractor": false
    },
    {
        "word": "French",
        "vi": "tiếng Pháp",
        "distractor": false
    },
    {
        "word": "start lessons",
        "vi": "bắt đầu học",
        "distractor": false
    },
    {
        "word": "a beautiful language",
        "vi": "một ngôn ngữ đẹp",
        "distractor": false
    },
    {
        "word": "a big stage",
        "vi": "một sân khấu lớn",
        "distractor": false
    },
    {
        "word": "a large audience",
        "vi": "khán giả đông đảo",
        "distractor": false
    },
    {
        "word": "cheer",
        "vi": "cổ vũ",
        "distractor": false
    },
    {
        "word": "clap",
        "vi": "vỗ tay",
        "distractor": false
    },
    {
        "word": "shout and boo",
        "vi": "la ó",
        "distractor": true
    },
    {
        "word": "an empty room",
        "vi": "phòng trống",
        "distractor": true
    },
    {
        "word": "a terrible singer",
        "vi": "người hát tệ",
        "distractor": true
    }
]
    }
  }
};
