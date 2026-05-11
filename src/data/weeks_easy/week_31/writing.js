export default {
  title: "My Day at the Market",
  min_words: 32,
  model_sentence: "Last Saturday I went to the market. I saw glass jars with golden honey. I touched a wooden shelf and it felt rough. I smelt warm spices. I felt the soft cotton scarves. It was a great day!",
  instruction_en: "Write about a visit to the market! Use: saw, felt, smelt, heard. Try to use at least TWO materials: wood, metal, glass, stone, cotton, or plastic!",
  instruction_vi: "Vi\u1ebft m\u1ed9t chuy\u1ebfn \u0111i d\u00f9ng saw, heard, smelled v\u00e0 felt!",
  prompt_en: "What did you see, hear, smell, and feel on your walk?",
  prompt_vi: "B\u1ea1n th\u1ea5y, nghe, ng\u1eedi v\u00e0 c\u1ea3m nh\u1eadn g\u00ec trong chuy\u1ebfn \u0111i b\u1ed9?",
  keywords: ["glass", "wood", "stone", "cotton", "metal", "plastic", "saw", "heard", "felt", "smelt"],
  topic_talk_prompt: "Describe a visit to a market using your five senses — mention the materials!",
  sentence_frames: [
    {
        "template": "I saw orange ___ on the ground.",
        "answers": [
            "leaves"
        ]
    },
    {
        "template": "I heard ___ singing.",
        "answers": [
            "birds"
        ]
    },
    {
        "template": "I smelled fresh ___.",
        "answers": [
            "flowers"
        ]
    },
    {
        "template": "I felt the cool ___.",
        "answers": [
            "breeze"
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
        "word": "leaves",
        "vi": "lá",
        "distractor": false
    },
    {
        "word": "birds",
        "vi": "chim",
        "distractor": false
    },
    {
        "word": "flowers",
        "vi": "hoa",
        "distractor": false
    },
    {
        "word": "breeze",
        "vi": "gió nhẹ",
        "distractor": false
    },
    {
        "word": "clouds",
        "vi": "mây — không phải trên mặt đất",
        "distractor": true
    },
    {
        "word": "dogs",
        "vi": "chó — không phải hát",
        "distractor": true
    },
    {
        "word": "heat",
        "vi": "nóng bức — không phải mát",
        "distractor": true
    }
]
    }
  }
};
