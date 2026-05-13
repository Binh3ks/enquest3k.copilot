export default {
  title: "My Favorite Sport",
  min_words: 45,
  model_sentence: "My favorite sport is football and I have been playing it since I was five years old. Every Saturday morning, my team and I train on the field behind our school for two hours, and our coach pushes us to run faster and pass the ball more accurately. Playing football is physically demanding because we have to sprint, dribble, defend, and shoot, but I love every second of it. My favorite position is striker because I love the feeling of scoring a goal and hearing my teammates cheer and celebrate. Football has also taught me about teamwork, discipline, and never giving up even when the score is not in our favour. I dream of playing for a professional team one day and making my family proud.",
  instruction_en: "Write about your favorite sport with training, skills, and dreams!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u00f4n th\u1ec3 thao y\u00eau th\u00edch v\u1edbi t\u1eadp luy\u1ec7n, k\u1ef9 n\u0103ng v\u00e0 \u01b0\u1edbc m\u01a1!",
  prompt_en: "How long have you played? What is training like? What have you learned? What is your dream?",
  prompt_vi: "B\u1ea1n \u0111\u00e3 ch\u01a1i bao l\u00e2u? T\u1eadp luy\u1ec7n nh\u01b0 th\u1ebf n\u00e0o? B\u1ea1n h\u1ecdc \u0111\u01b0\u1ee3c g\u00ec? \u01af\u1edbc m\u01a1 c\u1ee7a b\u1ea1n l\u00e0 g\u00ec?",
  keywords: ["training", "coach", "accurately", "demanding", "sprint", "dribble", "discipline", "professional"],
  topic_talk_prompt: "Tell me everything about your favorite sport \u2014 from training to your biggest dream!",
  sentence_frames: [
    {
        "template": "Every Saturday, my team and I ___ for two hours and our coach pushes us to ___ and ___ more accurately.",
        "answers": [
            "train on the field",
            "run faster",
            "pass the ball"
        ]
    },
    {
        "template": "Playing football is ___ because we have to ___, ___, defend, and shoot.",
        "answers": [
            "physically demanding",
            "sprint",
            "dribble"
        ]
    },
    {
        "template": "My favorite position is ___ because I love the feeling of ___ and hearing my teammates ___.",
        "answers": [
            "striker",
            "scoring a goal",
            "cheer"
        ]
    },
    {
        "template": "Football has taught me about ___, ___, and never ___ even when the score is not in our favour.",
        "answers": [
            "teamwork",
            "discipline",
            "giving up"
        ]
    },
    {
        "template": "I dream of ___ one day and making my ___ proud.",
        "answers": [
            "playing for a professional team",
            "family"
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
        "word": "train on the field",
        "vi": "tập luyện trên sân",
        "distractor": false
    },
    {
        "word": "run faster",
        "vi": "chạy nhanh hơn",
        "distractor": false
    },
    {
        "word": "pass the ball",
        "vi": "chuyền bóng",
        "distractor": false
    },
    {
        "word": "physically demanding",
        "vi": "đòi hỏi thể lực",
        "distractor": false
    },
    {
        "word": "sprint",
        "vi": "chạy nước rút",
        "distractor": false
    },
    {
        "word": "dribble",
        "vi": "dắt bóng",
        "distractor": false
    },
    {
        "word": "striker",
        "vi": "tiền đạo",
        "distractor": false
    },
    {
        "word": "scoring a goal",
        "vi": "ghi bàn thắng",
        "distractor": false
    },
    {
        "word": "cheer",
        "vi": "cổ vũ",
        "distractor": false
    },
    {
        "word": "teamwork",
        "vi": "tinh thần đồng đội",
        "distractor": false
    },
    {
        "word": "discipline",
        "vi": "kỷ luật",
        "distractor": false
    },
    {
        "word": "giving up",
        "vi": "bỏ cuộc",
        "distractor": false
    },
    {
        "word": "playing for a professional team",
        "vi": "chơi cho đội chuyên nghiệp",
        "distractor": false
    },
    {
        "word": "family",
        "vi": "gia đình",
        "distractor": false
    },
    {
        "word": "watching TV all day",
        "vi": "xem ti vi cả ngày",
        "distractor": true
    },
    {
        "word": "physically easy",
        "vi": "nhẹ nhàng về thể chất",
        "distractor": true
    },
    {
        "word": "quitting",
        "vi": "bỏ cuộc sớm",
        "distractor": true
    }
]
    }
  }
};
