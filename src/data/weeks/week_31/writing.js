export default {
  title: "Writing: My Sensory Walk",
  min_words: 50,
  model_sentence: "Last Saturday, my family went for a walk in the park near our house. I saw beautiful orange and yellow leaves on the ground. I heard birds singing in the tall trees. I smelled fresh grass and flowers. I felt the cool breeze on my face.",
  instruction_en: "Write a sensory walk using saw, heard, smelled, felt!",
  instruction_vi: "Vi\u1ebft v\u1ec1 \u0111i b\u1ed9 c\u1ea3m gi\u00e1c d\u00f9ng saw, heard, smelled, felt!",
  prompt_en: "What did you see, hear, smell, and feel during your walk?",
  prompt_vi: "B\u1ea1n th\u1ea5y, nghe, ng\u1eedi v\u00e0 c\u1ea3m nh\u1eadn g\u00ec trong chuy\u1ebfn \u0111i b\u1ed9?",
  keywords: ["park", "leaves", "ground", "birds", "singing", "grass", "flowers", "breeze", "face"],
  topic_talk_prompt: "Describe a nature walk using all five senses!",
  sentence_frames: [
    {
        "template": "Last Saturday, my family went for ___ in ___.",
        "answers": [
            "a walk",
            "the park near our house"
        ]
    },
    {
        "template": "I saw ___ on the ground.",
        "answers": [
            "beautiful orange and yellow leaves"
        ]
    },
    {
        "template": "I heard ___ in the ___.",
        "answers": [
            "birds singing",
            "tall trees"
        ]
    },
    {
        "template": "I smelled ___ and ___.",
        "answers": [
            "fresh grass",
            "flowers"
        ]
    },
    {
        "template": "I felt ___ on my face.",
        "answers": [
            "the cool breeze"
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
        "word": "a walk",
        "vi": "một chuyến đi bộ",
        "distractor": false
    },
    {
        "word": "the park near our house",
        "vi": "công viên gần nhà",
        "distractor": false
    },
    {
        "word": "beautiful orange and yellow leaves",
        "vi": "những chiếc lá cam và vàng đẹp",
        "distractor": false
    },
    {
        "word": "birds singing",
        "vi": "tiếng chim hót",
        "distractor": false
    },
    {
        "word": "tall trees",
        "vi": "những cây cao",
        "distractor": false
    },
    {
        "word": "fresh grass",
        "vi": "cỏ tươi",
        "distractor": false
    },
    {
        "word": "flowers",
        "vi": "hoa",
        "distractor": false
    },
    {
        "word": "the cool breeze",
        "vi": "làn gió mát",
        "distractor": false
    },
    {
        "word": "loud traffic noise",
        "vi": "tiếng ồn xe cộ",
        "distractor": true
    },
    {
        "word": "smelly garbage",
        "vi": "rác hôi",
        "distractor": true
    },
    {
        "word": "burning heat",
        "vi": "nóng bức",
        "distractor": true
    }
]
    }
  }
};
