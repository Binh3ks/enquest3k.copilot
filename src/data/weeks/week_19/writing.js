export default {
  title: "When I Was Small",
  min_words: 48,
  model_sentence: "When I look at old photos from when I was a baby, I can see how much I have changed over the years. I was a very small and chubby baby with a round face, big dark eyes, and very little hair on my head. My mother says I was an extremely noisy baby because I cried all the time, especially at night, and the only thing that could make me stop was music. I could not walk or talk yet, but I could already smile and recognize the faces of the people I loved. According to my dad, I was always reaching for things I could not have, and I tried to climb out of my cot when I was only nine months old! Looking at those photos makes me laugh and feel grateful for how far I have come.",
  instruction_en: "Write about what you were like as a baby using was, were, and could!",
  instruction_vi: "Vi\u1ebft v\u1ec1 l\u00fac c\u00f2n nh\u1ecf d\u00f9ng was, were v\u00e0 could!",
  prompt_en: "What did you look like? What were you like? What could or couldn't you do?",
  prompt_vi: "B\u1ea1n tr\u00f4ng th\u1ebf n\u00e0o? B\u1ea1n nh\u01b0 th\u1ebf n\u00e0o? B\u1ea1n c\u00f3 th\u1ec3 ho\u1eb7c kh\u00f4ng th\u1ec3 l\u00e0m g\u00ec?",
  keywords: ["chubby", "extremely", "recognize", "reaching", "cot", "grateful", "changed"],
  topic_talk_prompt: "Describe yourself as a baby \u2014 what did you look like and what were you like?",
  sentence_frames: [
    {
        "template": "I was a very ___ and ___ baby with a ___ face and ___.",
        "answers": [
            "small",
            "chubby",
            "round",
            "big dark eyes"
        ]
    },
    {
        "template": "My mother says I was ___ because I cried all the time, and the only thing that could stop me was ___.",
        "answers": [
            "an extremely noisy baby",
            "music"
        ]
    },
    {
        "template": "I could not ___ or ___ yet, but I could already ___ and ___ the faces of people I loved.",
        "answers": [
            "walk",
            "talk",
            "smile",
            "recognize"
        ]
    },
    {
        "template": "According to my dad, I was always ___ and tried to ___ when I was only nine months old.",
        "answers": [
            "reaching for things",
            "climb out of my cot"
        ]
    },
    {
        "template": "Looking at those photos makes me ___ and feel ___ for how far I have come.",
        "answers": [
            "laugh",
            "grateful"
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
        "word": "small",
        "vi": "nhỏ",
        "distractor": false
    },
    {
        "word": "chubby",
        "vi": "mũm mĩm",
        "distractor": false
    },
    {
        "word": "round",
        "vi": "tròn",
        "distractor": false
    },
    {
        "word": "big dark eyes",
        "vi": "đôi mắt to đen",
        "distractor": false
    },
    {
        "word": "an extremely noisy baby",
        "vi": "một em bé rất ồn ào",
        "distractor": false
    },
    {
        "word": "music",
        "vi": "âm nhạc",
        "distractor": false
    },
    {
        "word": "walk",
        "vi": "đi bộ",
        "distractor": false
    },
    {
        "word": "talk",
        "vi": "nói chuyện",
        "distractor": false
    },
    {
        "word": "smile",
        "vi": "mỉm cười",
        "distractor": false
    },
    {
        "word": "recognize",
        "vi": "nhận ra",
        "distractor": false
    },
    {
        "word": "reaching for things",
        "vi": "vươn tay lấy đồ vật",
        "distractor": false
    },
    {
        "word": "climb out of my cot",
        "vi": "trèo ra khỏi nôi",
        "distractor": false
    },
    {
        "word": "laugh",
        "vi": "cười",
        "distractor": false
    },
    {
        "word": "grateful",
        "vi": "biết ơn",
        "distractor": false
    },
    {
        "word": "very tall",
        "vi": "rất cao — sai với baby",
        "distractor": true
    },
    {
        "word": "completely silent",
        "vi": "hoàn toàn im lặng",
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
