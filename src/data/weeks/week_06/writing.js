export default {
  title: "Finding the Treasure",
  min_words: 40,
  model_sentence: "My friends and I decided to play a treasure hunt at home on Saturday afternoon. First, my friend Lily hid a small treasure box somewhere in the house and gave us a clue. I searched under the bed and behind the bookshelf but I could not find it. Then I looked inside the kitchen cupboard and I finally spotted it on the top shelf. I jumped with excitement and shouted because I was so happy to find it first. We all laughed and decided to play again because it was so much fun.",
  instruction_en: "Write about your treasure hunt using sequence words and prepositions!",
  instruction_vi: "Vi\u1ebft v\u1ec1 cu\u1ed9c t\u00ecm kho b\u00e1u d\u00f9ng t\u1eeb n\u1ed1i v\u00e0 gi\u1edbi t\u1eeb ch\u1ec9 n\u01a1i ch\u1ed1n!",
  prompt_en: "Where did you search? What happened step by step? How did you feel when you found it?",
  prompt_vi: "B\u1ea1n t\u00ecm \u1edf \u0111\u00e2u? Chuy\u1ec7n g\u00ec x\u1ea3y ra t\u1eebng b\u01b0\u1edbc? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o khi t\u00ecm th\u1ea5y?",
  keywords: ["treasure", "hid", "clue", "searched", "cupboard", "spotted", "excitement", "shouted"],
  topic_talk_prompt: "Tell me the full story of your treasure hunt!",
  sentence_frames: [
    {
        "template": "First, ___ hid ___ and gave us a ___.",
        "answers": [
            "my friend Lily",
            "a small treasure box",
            "clue"
        ]
    },
    {
        "template": "I searched ___ and ___ but I could not find it.",
        "answers": [
            "under the bed",
            "behind the bookshelf"
        ]
    },
    {
        "template": "Then I looked ___ and finally spotted it ___.",
        "answers": [
            "inside the kitchen cupboard",
            "on the top shelf"
        ]
    },
    {
        "template": "I jumped with ___ and shouted because I was so ___ to find it first.",
        "answers": [
            "excitement",
            "happy"
        ]
    },
    {
        "template": "We all laughed and decided to ___ because it was so much ___.",
        "answers": [
            "play again",
            "fun"
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
        "word": "my friend Lily",
        "vi": "bạn tôi tên Lily",
        "distractor": false
    },
    {
        "word": "a small treasure box",
        "vi": "một hộp kho báu nhỏ",
        "distractor": false
    },
    {
        "word": "clue",
        "vi": "gợi ý/manh mối",
        "distractor": false
    },
    {
        "word": "under the bed",
        "vi": "dưới gầm giường",
        "distractor": false
    },
    {
        "word": "behind the bookshelf",
        "vi": "sau kệ sách",
        "distractor": false
    },
    {
        "word": "inside the kitchen cupboard",
        "vi": "trong tủ bếp",
        "distractor": false
    },
    {
        "word": "on the top shelf",
        "vi": "trên ngăn cao nhất",
        "distractor": false
    },
    {
        "word": "excitement",
        "vi": "sự hào hứng",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "play again",
        "vi": "chơi lại",
        "distractor": false
    },
    {
        "word": "fun",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "on the ceiling",
        "vi": "trên trần nhà",
        "distractor": true
    },
    {
        "word": "boredom",
        "vi": "sự chán nản",
        "distractor": true
    },
    {
        "word": "stop forever",
        "vi": "dừng mãi mãi",
        "distractor": true
    }
]
    }
  }
};
