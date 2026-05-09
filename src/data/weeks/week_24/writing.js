export default {
  title: "Writing: My Emotional Day",
  min_words: 40,
  model_sentence: "Yesterday was a very emotional day for me. In the morning I was scared because I could not find my bag, but my mum was calm and helped me. At school, I felt relieved and proud.",
  instruction_en: "Write about an emotional day using feeling words and because!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ng\u00e0y \u0111\u1ea7y c\u1ea3m x\u00fac d\u00f9ng t\u1eeb c\u1ea3m x\u00fac v\u00e0 because!",
  prompt_en: "What feelings did you have? What caused them? How did the day end?",
  prompt_vi: "B\u1ea1n c\u00f3 c\u1ea3m x\u00fac g\u00ec? Nguy\u00ean nh\u00e2n l\u00e0 g\u00ec? Ng\u00e0y k\u1ebft th\u00fac th\u1ebf n\u00e0o?",
  keywords: ["emotional", "scared", "bag", "calm", "helped", "relieved", "proud"],
  topic_talk_prompt: "Describe a day full of emotions with details!",
  sentence_frames: [
    {
        "template": "Yesterday was ___ for me.",
        "answers": [
            "a very emotional day"
        ]
    },
    {
        "template": "In the morning I was ___ because I could not find ___.",
        "answers": [
            "scared",
            "my bag"
        ]
    },
    {
        "template": "My mum was ___ and ___ me find it.",
        "answers": [
            "calm",
            "helped"
        ]
    },
    {
        "template": "At school, I felt ___ and ___.",
        "answers": [
            "relieved",
            "proud"
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
        "word": "a very emotional day",
        "vi": "một ngày đầy cảm xúc",
        "distractor": false
    },
    {
        "word": "scared",
        "vi": "sợ hãi",
        "distractor": false
    },
    {
        "word": "my bag",
        "vi": "cặp sách của tôi",
        "distractor": false
    },
    {
        "word": "calm",
        "vi": "bình tĩnh",
        "distractor": false
    },
    {
        "word": "helped",
        "vi": "giúp đỡ",
        "distractor": false
    },
    {
        "word": "relieved",
        "vi": "nhẹ nhõm",
        "distractor": false
    },
    {
        "word": "proud",
        "vi": "tự hào",
        "distractor": false
    },
    {
        "word": "a perfectly boring day",
        "vi": "ngày hoàn toàn nhàm chán",
        "distractor": true
    },
    {
        "word": "angry",
        "vi": "tức giận",
        "distractor": true
    },
    {
        "word": "ashamed",
        "vi": "xấu hổ",
        "distractor": true
    }
]
    }
  }
};
