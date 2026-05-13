export default {
  title: "Inside My Backpack",
  min_words: 20,
  model_sentence: "There is a pencil in my bag. There are three books in my bag. I also have a lunch box. My bag is blue.",
  instruction_en: "Write about what is in your school bag!",
  instruction_vi: "Vi\u1ebft v\u1ec1 nh\u1eefng g\u00ec c\u00f3 trong c\u1eb7p c\u1ee7a b\u1ea1n!",
  prompt_en: "What do you have in your bag? What color is your bag?",
  prompt_vi: "B\u1ea1n c\u00f3 g\u00ec trong c\u1eb7p? C\u1eb7p m\u00e0u g\u00ec?",
  keywords: ["pencil", "books", "lunch box", "blue", "bag"],
  topic_talk_prompt: "What is inside your school bag?",
  sentence_frames: [
    {
        "template": "There is a ___ in my bag.",
        "answers": [
            "pencil"
        ]
    },
    {
        "template": "There are ___ books in my bag.",
        "answers": [
            "three"
        ]
    },
    {
        "template": "I also have a ___.",
        "answers": [
            "lunch box"
        ]
    },
    {
        "template": "My bag is ___.",
        "answers": [
            "blue"
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
        "word": "pencil",
        "vi": "bút chì",
        "distractor": false
    },
    {
        "word": "three",
        "vi": "ba",
        "distractor": false
    },
    {
        "word": "lunch box",
        "vi": "hộp cơm",
        "distractor": false
    },
    {
        "word": "blue",
        "vi": "xanh dương",
        "distractor": false
    },
    {
        "word": "eraser",
        "vi": "cục tẩy",
        "distractor": true
    },
    {
        "word": "red",
        "vi": "đỏ",
        "distractor": true
    },
    {
        "word": "toy",
        "vi": "đồ chơi",
        "distractor": true
    }
]
    }
  }
};
