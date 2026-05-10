export default {
  title: "My Presentation Day",
  min_words: 45,
  model_sentence: "Today is my presentation day and I am both nervous and excited at the same time. I have prepared a poster about my world, which includes information about my family, my home, and the things I love most. My family is the most important part of my world because they support me and make me feel safe every day. I live in a comfortable flat near a park, and I love that I can hear birds singing from my window every morning. My favourite hobbies are drawing and reading because they help me relax and use my imagination. I am going to show my poster to the class and explain every section clearly so that my classmates can understand my world. I hope my presentation makes everyone smile.",
  instruction_en: "Write about your world as if presenting it to your class!",
  instruction_vi: "Vi\u1ebft v\u1ec1 th\u1ebf gi\u1edbi c\u1ee7a b\u1ea1n nh\u01b0 th\u1ec3 \u0111ang thuy\u1ebft tr\u00ecnh tr\u01b0\u1edbc l\u1edbp!",
  prompt_en: "What is your world like? How will you present it? What do you want people to understand?",
  prompt_vi: "Th\u1ebf gi\u1edbi c\u1ee7a b\u1ea1n th\u1ebf n\u00e0o? B\u1ea1n s\u1ebd thuy\u1ebft tr\u00ecnh th\u1ebf n\u00e0o? B\u1ea1n mu\u1ed1n m\u1ecdi ng\u01b0\u1eddi hi\u1ec3u \u0111i\u1ec1u g\u00ec?",
  keywords: ["presentation", "nervous", "poster", "support", "comfortable", "imagination", "classmates", "section"],
  topic_talk_prompt: "Describe your world as a presentation to your class!",
  sentence_frames: [
    {
        "template": "Today is ___ and I am both ___ and ___ at the same time.",
        "answers": [
            "my presentation day",
            "nervous",
            "excited"
        ]
    },
    {
        "template": "I have prepared ___ about my world, which includes ___, ___, and ___.",
        "answers": [
            "a poster",
            "my family",
            "my home",
            "the things I love most"
        ]
    },
    {
        "template": "My family is the most important part because they ___ and make me feel ___ every day.",
        "answers": [
            "support me",
            "safe"
        ]
    },
    {
        "template": "I live in ___ near a park, and I love that I can hear ___ every morning.",
        "answers": [
            "a comfortable flat",
            "birds singing from my window"
        ]
    },
    {
        "template": "I am going to ___ and explain every section ___ so that my classmates can understand.",
        "answers": [
            "show my poster to the class",
            "clearly"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
    {
        "word": "my presentation day",
        "vi": "ngày thuyết trình của tôi",
        "distractor": false
    },
    {
        "word": "nervous",
        "vi": "hồi hộp",
        "distractor": false
    },
    {
        "word": "excited",
        "vi": "hào hứng",
        "distractor": false
    },
    {
        "word": "a poster",
        "vi": "một áp phích",
        "distractor": false
    },
    {
        "word": "my family",
        "vi": "gia đình tôi",
        "distractor": false
    },
    {
        "word": "my home",
        "vi": "ngôi nhà của tôi",
        "distractor": false
    },
    {
        "word": "the things I love most",
        "vi": "những điều tôi yêu thích nhất",
        "distractor": false
    },
    {
        "word": "support me",
        "vi": "ủng hộ tôi",
        "distractor": false
    },
    {
        "word": "safe",
        "vi": "an toàn",
        "distractor": false
    },
    {
        "word": "a comfortable flat",
        "vi": "một căn hộ thoải mái",
        "distractor": false
    },
    {
        "word": "birds singing from my window",
        "vi": "tiếng chim hót từ cửa sổ",
        "distractor": false
    },
    {
        "word": "show my poster to the class",
        "vi": "trình bày áp phích trước lớp",
        "distractor": false
    },
    {
        "word": "clearly",
        "vi": "rõ ràng",
        "distractor": false
    },
    {
        "word": "a terrible disaster",
        "vi": "một thảm họa tệ hại",
        "distractor": true
    },
    {
        "word": "bored and uninterested",
        "vi": "chán và không hứng thú",
        "distractor": true
    },
    {
        "word": "nervous and confused",
        "vi": "lo lắng và bối rối",
        "distractor": true
    }
]
    }
  }
};
