export default {
  title: "Retell The Tortoise and the Hare",
  min_words: 32,
  model_sentence: "Once the Hare and the Tortoise had a race. The Hare ran very fast. Then he stopped to rest. He fell asleep. The Tortoise walked slowly and won.",
  instruction_en: "Retell the story of the tortoise and the hare in your own words!",
  instruction_vi: "K\u1ec3 l\u1ea1i c\u00e2u chuy\u1ec7n R\u00f9a v\u00e0 Th\u1ecf b\u1eb1ng l\u1eddi c\u1ee7a b\u1ea1n!",
  prompt_en: "Who were the characters? What happened? Who won and why?",
  prompt_vi: "Nh\u00e2n v\u1eadt l\u00e0 ai? Chuy\u1ec7n g\u00ec x\u1ea3y ra? Ai th\u1eafng v\u00e0 t\u1ea1i sao?",
  keywords: ["hare", "tortoise", "race", "rested", "asleep", "slowly", "won"],
  topic_talk_prompt: "Retell the story of the tortoise and the hare!",
  sentence_frames: [
    {
        "template": "Once the ___ and the Tortoise had a race.",
        "answers": [
            "Hare"
        ]
    },
    {
        "template": "The Hare ran very ___.",
        "answers": [
            "fast"
        ]
    },
    {
        "template": "Then he stopped to ___.",
        "answers": [
            "rest"
        ]
    },
    {
        "template": "He fell ___.",
        "answers": [
            "asleep"
        ]
    },
    {
        "template": "The Tortoise walked ___ and won.",
        "answers": [
            "slowly"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
    {
        "word": "Hare",
        "vi": "Thỏ",
        "distractor": false
    },
    {
        "word": "fast",
        "vi": "nhanh",
        "distractor": false
    },
    {
        "word": "rest",
        "vi": "nghỉ ngơi",
        "distractor": false
    },
    {
        "word": "asleep",
        "vi": "ngủ say",
        "distractor": false
    },
    {
        "word": "slowly",
        "vi": "chậm rãi",
        "distractor": false
    },
    {
        "word": "Elephant",
        "vi": "Voi — sai nhân vật",
        "distractor": true
    },
    {
        "word": "quietly",
        "vi": "im lặng — không phải nhanh",
        "distractor": true
    },
    {
        "word": "exercise",
        "vi": "tập thể dục — sai",
        "distractor": true
    }
]
    }
  }
};
