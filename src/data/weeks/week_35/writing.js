// WEEK 35: ENVIRONMENTAL ISSUES
// Writing Station — Advanced Mode

export default {
  title: "Environmental Issues — Write About Protecting Our Planet",
  theme: "environmental_issues",
  min_words: 45,
  model_sentence: "Our beautiful planet Earth is in danger because of climate change. The polar ice is melting and the sea level is rising. We must protect our planet by using renewable energy, recycling more, and planting trees. If we act now, we can make a big difference and save our home!",
  topic_talk_prompt: "Tell me about something you do to help the environment at home or at school!",
  sentence_frames: [
    {
        "template": "Our beautiful planet Earth is in ___ because of ___ ___.",
        "answers": [
            "danger",
            "peril",
            "climate change",
            "global warming",
            "pollution"
        ]
    },
    {
        "template": "The ___ ice is ___ and the ___ ___ is ___ because our planet is getting warmer.",
        "answers": [
            "polar",
            "melting",
            "shrinking",
            "sea level",
            "oceans",
            "rising",
            "going up"
        ]
    },
    {
        "template": "We must ___ our planet by using ___ energy and ___ more to help the ___.",
        "answers": [
            "protect",
            "save",
            "renewable",
            "clean",
            "recycle",
            "environment",
            "Earth"
        ]
    },
    {
        "template": "Many countries are trying to ___ carbon ___ by using solar power and wind ___.",
        "answers": [
            "reduce",
            "cut",
            "emissions",
            "power",
            "energy"
        ]
    },
    {
        "template": "We should ___ more ___ because trees ___ carbon dioxide and give us ___.",
        "answers": [
            "plant",
            "grow",
            "trees",
            "flowers",
            "absorb",
            "take in",
            "oxygen",
            "clean air"
        ]
    },
    {
        "template": "Small actions like ___ ___ can make a big ___ to our planet.",
        "answers": [
            "turning off lights",
            "using less plastic",
            "walking more",
            "recycling",
            "difference",
            "change",
            "impact"
        ]
    },
    {
        "template": "Climate ___ means the Earth is getting ___ and ___ ___ are ___.",
        "answers": [
            "change",
            "warmer",
            "hotter",
            "weather patterns",
            "storms",
            "changing",
            "worse"
        ]
    },
    {
        "template": "If we ___ ___ now, our planet can be ___ for ___ ___.",
        "answers": [
            "act",
            "work",
            "together",
            "saved",
            "protected",
            "future",
            "generations",
            "children"
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
        { "word": "danger", "vi": "nguy hiểm", "distractor": false },
        { "word": "climate change", "vi": "biến đổi khí hậu", "distractor": false },
        { "word": "polar ice", "vi": "băng vùng cực", "distractor": false },
        { "word": "melting", "vi": "tan chảy", "distractor": false },
        { "word": "sea level", "vi": "mực nước biển", "distractor": false },
        { "word": "rising", "vi": "dâng cao", "distractor": false },
        { "word": "renewable", "vi": "tái tạo", "distractor": false },
        { "word": "recycle", "vi": "tái chế", "distractor": false },
        { "word": "carbon emissions", "vi": "khí thải carbon", "distractor": false },
        { "word": "solar power", "vi": "năng lượng mặt trời", "distractor": false },
        { "word": "wind power", "vi": "năng lượng gió", "distractor": false },
        { "word": "protect", "vi": "bảo vệ", "distractor": false },
        { "word": "environment", "vi": "môi trường", "distractor": false },
        { "word": "warmer", "vi": "ấm hơn", "distractor": false },
        { "word": "trees", "vi": "cây", "distractor": false },
        { "word": "oxygen", "vi": "oxy", "distractor": false },
        { "word": "act now", "vi": "hành động ngay", "distractor": false },
        { "word": "future generations", "vi": "thế hệ tương lai", "distractor": true }
      ]
    }
  }
};
