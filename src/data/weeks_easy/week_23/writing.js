export default {
  title: "My Art Class Story",
  min_words: 28,
  model_sentence: "Yesterday I had art class. First I picked up my brush. Then I dipped it in red paint. I painted a flower. It looked beautiful.",
  instruction_en: "Write a sequence story about your art class!",
  instruction_vi: "Vi\u1ebft m\u1ed9t c\u00e2u chuy\u1ec7n theo tr\u00ecnh t\u1ef1 v\u1ec1 gi\u1edd h\u1ecdc m\u1ef9 thu\u1eadt!",
  prompt_en: "What did you do first? Then? What did you make?",
  prompt_vi: "\u0110\u1ea7u ti\u00ean b\u1ea1n l\u00e0m g\u00ec? Ti\u1ebfp theo? B\u1ea1n l\u00e0m ra g\u00ec?",
  keywords: ["art", "picked", "brush", "dipped", "paint", "flower", "beautiful"],
  topic_talk_prompt: "Tell me what you did in art class step by step!",
  sentence_frames: [
    {
        "template": "Yesterday I had ___ class.",
        "answers": [
            "art"
        ]
    },
    {
        "template": "First I picked up my ___.",
        "answers": [
            "brush"
        ]
    },
    {
        "template": "Then I dipped it in red ___.",
        "answers": [
            "paint"
        ]
    },
    {
        "template": "I painted a ___.",
        "answers": [
            "flower"
        ]
    },
    {
        "template": "It looked ___.",
        "answers": [
            "beautiful"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
    {
        "word": "art",
        "vi": "mỹ thuật",
        "distractor": false
    },
    {
        "word": "brush",
        "vi": "cọ vẽ",
        "distractor": false
    },
    {
        "word": "paint",
        "vi": "sơn/màu vẽ",
        "distractor": false
    },
    {
        "word": "flower",
        "vi": "bông hoa",
        "distractor": false
    },
    {
        "word": "beautiful",
        "vi": "đẹp",
        "distractor": false
    },
    {
        "word": "maths",
        "vi": "toán — sai môn học",
        "distractor": true
    },
    {
        "word": "spoon",
        "vi": "thìa — không phải cọ",
        "distractor": true
    },
    {
        "word": "terrible",
        "vi": "tệ",
        "distractor": true
    }
]
    }
  }
};
