export default {
  title: "The Mirror Game",
  min_words: 20,
  model_sentence: "My friend is tall. She has long hair. Her hair is black. She has big eyes.",
  instruction_en: "Describe your friend's appearance!",
  instruction_vi: "M\u00f4 t\u1ea3 ngo\u1ea1i h\u00ecnh c\u1ee7a b\u1ea1n b\u00e8!",
  prompt_en: "Is your friend tall or short? What does their hair look like? What color are their eyes?",
  prompt_vi: "B\u1ea1n c\u1ee7a b\u1ea1n cao hay th\u1ea5p? T\u00f3c h\u1ecd th\u1ebf n\u00e0o? M\u1eaft m\u00e0u g\u00ec?",
  keywords: ["tall", "hair", "long", "black", "eyes", "big"],
  topic_talk_prompt: "Describe what your friend looks like!",
  sentence_frames: [
    {
        "template": "My friend is ___.",
        "answers": [
            "tall"
        ]
    },
    {
        "template": "She has ___ hair.",
        "answers": [
            "long"
        ]
    },
    {
        "template": "Her hair is ___.",
        "answers": [
            "black"
        ]
    },
    {
        "template": "She has ___ eyes.",
        "answers": [
            "big"
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
        "word": "tall",
        "vi": "cao",
        "distractor": false
    },
    {
        "word": "long",
        "vi": "dài",
        "distractor": false
    },
    {
        "word": "black",
        "vi": "đen",
        "distractor": false
    },
    {
        "word": "big",
        "vi": "to",
        "distractor": false
    },
    {
        "word": "short",
        "vi": "thấp",
        "distractor": true
    },
    {
        "word": "blonde",
        "vi": "vàng",
        "distractor": true
    },
    {
        "word": "tiny",
        "vi": "rất nhỏ",
        "distractor": true
    }
]
    }
  }
};
