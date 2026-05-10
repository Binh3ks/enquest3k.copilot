export default {
  title: "The Mirror Game",
  min_words: 40,
  model_sentence: "My best friend is Tom and he is tall with short curly hair. His hair is dark brown and his eyes are bright green. He wears round glasses because he cannot see well without them. He always wears a red cap and a blue jacket to school. He is slim but very strong because he trains every day. Everyone recognises him because he looks so unique and cool.",
  instruction_en: "Describe your best friend from head to toe!",
  instruction_vi: "M\u00f4 t\u1ea3 ng\u01b0\u1eddi b\u1ea1n th\u00e2n t\u1eeb \u0111\u1ea7u \u0111\u1ebfn ch\u00e2n!",
  prompt_en: "What does your friend look like? What do they wear? What makes them look unique?",
  prompt_vi: "B\u1ea1n c\u1ee7a b\u1ea1n tr\u00f4ng th\u1ebf n\u00e0o? H\u1ecd m\u1eb7c g\u00ec? \u0110i\u1ec1u g\u00ec l\u00e0m h\u1ecd n\u1ed5i b\u1eadt?",
  keywords: ["curly", "dark brown", "bright green", "glasses", "slim", "unique", "recognises"],
  topic_talk_prompt: "Describe your best friend's appearance in full detail!",
  sentence_frames: [
    {
        "template": "My best friend is ___ and he is ___ with ___.",
        "answers": [
            "Tom",
            "tall",
            "short curly hair"
        ]
    },
    {
        "template": "His hair is ___ and his eyes are ___.",
        "answers": [
            "dark brown",
            "bright green"
        ]
    },
    {
        "template": "He wears ___ because he cannot see well without them.",
        "answers": [
            "round glasses"
        ]
    },
    {
        "template": "He is ___ but very ___ because he trains every day.",
        "answers": [
            "slim",
            "strong"
        ]
    },
    {
        "template": "Everyone recognises him because he looks so ___ and ___.",
        "answers": [
            "unique",
            "cool"
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
        "word": "Tom",
        "vi": "",
        "distractor": false
    },
    {
        "word": "tall",
        "vi": "cao",
        "distractor": false
    },
    {
        "word": "short curly hair",
        "vi": "tóc ngắn xoăn",
        "distractor": false
    },
    {
        "word": "dark brown",
        "vi": "nâu đậm",
        "distractor": false
    },
    {
        "word": "bright green",
        "vi": "xanh lá sáng",
        "distractor": false
    },
    {
        "word": "round glasses",
        "vi": "kính tròn",
        "distractor": false
    },
    {
        "word": "slim",
        "vi": "gầy gò/thon",
        "distractor": false
    },
    {
        "word": "strong",
        "vi": "mạnh mẽ",
        "distractor": false
    },
    {
        "word": "unique",
        "vi": "độc đáo",
        "distractor": false
    },
    {
        "word": "cool",
        "vi": "ngầu",
        "distractor": false
    },
    {
        "word": "very short",
        "vi": "rất thấp",
        "distractor": true
    },
    {
        "word": "blonde and straight",
        "vi": "vàng và thẳng",
        "distractor": true
    },
    {
        "word": "strange and weird",
        "vi": "kỳ lạ",
        "distractor": true
    }
]
    }
  }
};
