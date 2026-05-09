export default {
  title: "Writing: My Forest Walk",
  min_words: 35,
  model_sentence: "Last Saturday, I went to the forest with my dad. I saw a beautiful blue and yellow bird sitting on a branch. I heard it singing a sweet song. I smelled fresh leaves in the air.",
  instruction_en: "Write about a walk in the forest!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u1ed9t chuy\u1ebfn \u0111i b\u1ed9 trong r\u1eebng!",
  prompt_en: "What did you see, hear, and smell? How did you feel?",
  prompt_vi: "B\u1ea1n th\u1ea5y, nghe v\u00e0 ng\u1eedi th\u1ea5y g\u00ec? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["forest", "dad", "bird", "branch", "singing", "song", "smelled", "leaves"],
  topic_talk_prompt: "Tell me about a walk in nature!",
  sentence_frames: [
    {
        "template": "Last Saturday, I went to the ___ with my ___.",
        "answers": [
            "forest",
            "dad"
        ]
    },
    {
        "template": "I saw a beautiful ___ sitting on a ___.",
        "answers": [
            "bird",
            "branch"
        ]
    },
    {
        "template": "I heard it ___ a sweet ___.",
        "answers": [
            "singing",
            "song"
        ]
    },
    {
        "template": "I ___ fresh leaves in the air.",
        "answers": [
            "smelled"
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
        "word": "forest",
        "vi": "khu rừng",
        "distractor": false
    },
    {
        "word": "dad",
        "vi": "bố",
        "distractor": false
    },
    {
        "word": "bird",
        "vi": "con chim",
        "distractor": false
    },
    {
        "word": "branch",
        "vi": "cành cây",
        "distractor": false
    },
    {
        "word": "singing",
        "vi": "hát",
        "distractor": false
    },
    {
        "word": "song",
        "vi": "bài hát",
        "distractor": false
    },
    {
        "word": "smelled",
        "vi": "ngửi",
        "distractor": false
    },
    {
        "word": "desert",
        "vi": "sa mạc",
        "distractor": true
    },
    {
        "word": "mom",
        "vi": "mẹ",
        "distractor": true
    },
    {
        "word": "barking",
        "vi": "sủa",
        "distractor": true
    }
]
    }
  }
};
