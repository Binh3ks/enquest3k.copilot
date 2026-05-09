export default {
  title: "My Art Class",
  min_words: 30,
  model_sentence: "Yesterday in art class I painted a picture of flowers and leaves. First I picked up my brush and dipped it into red pigment. Then I painted petals carefully.",
  instruction_en: "Write about what you made in art class!",
  instruction_vi: "Vi\u1ebft v\u1ec1 nh\u1eefng g\u00ec b\u1ea1n l\u00e0m trong gi\u1edd m\u1ef9 thu\u1eadt!",
  prompt_en: "What did you paint? How did you do it? What colours did you use?",
  prompt_vi: "B\u1ea1n v\u1ebd g\u00ec? L\u00e0m th\u1ebf n\u00e0o? B\u1ea1n d\u00f9ng m\u00e0u g\u00ec?",
  keywords: ["art", "painted", "flowers", "leaves", "brush", "red", "petals"],
  topic_talk_prompt: "Tell me about your art class yesterday!",
  sentence_frames: [
    {
        "template": "Yesterday in art class I ___ a picture.",
        "answers": [
            "painted"
        ]
    },
    {
        "template": "I painted ___ and ___.",
        "answers": [
            "flowers",
            "leaves"
        ]
    },
    {
        "template": "I picked up my ___.",
        "answers": [
            "brush"
        ]
    },
    {
        "template": "I dipped it into ___ pigment.",
        "answers": [
            "red"
        ]
    },
    {
        "template": "I painted ___ carefully.",
        "answers": [
            "petals"
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
        "word": "painted",
        "vi": "vẽ",
        "distractor": false
    },
    {
        "word": "flowers",
        "vi": "hoa",
        "distractor": false
    },
    {
        "word": "leaves",
        "vi": "lá",
        "distractor": false
    },
    {
        "word": "brush",
        "vi": "bút vẽ",
        "distractor": false
    },
    {
        "word": "red",
        "vi": "đỏ",
        "distractor": false
    },
    {
        "word": "petals",
        "vi": "cánh hoa",
        "distractor": false
    },
    {
        "word": "sang",
        "vi": "hát",
        "distractor": true
    },
    {
        "word": "blue",
        "vi": "xanh",
        "distractor": true
    },
    {
        "word": "stems",
        "vi": "thân cây",
        "distractor": true
    }
]
    }
  }
};
