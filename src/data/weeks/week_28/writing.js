export default {
  title: "Retell The Tortoise and the Hare",
  min_words: 50,
  model_sentence: "One bright morning in the forest, the boastful Hare was bragging loudly to all the animals about how fast he could run, and he declared that nobody could ever beat him in a race. The calm and steady Tortoise decided to challenge him, and all the forest animals gathered at the starting line to watch. When the race began, the Hare burst forward at top speed and disappeared around the corner in a cloud of dust. Feeling very confident that he had already won, the Hare decided to stop under a shady oak tree and take a short nap. However, while the Hare slept soundly, the Tortoise kept moving forward slowly and steadily, never stopping and never looking back. By the time the Hare woke up and sprinted to the finish line in a panic, the Tortoise had already crossed it and was being cheered by all the animals. The moral of the story is that slow and steady wins the race.",
  instruction_en: "Retell the fable in full using past tense and story phrases like one morning, however, by the time!",
  instruction_vi: "K\u1ec3 l\u1ea1i truy\u1ec7n ng\u1ee5 ng\u00f4n \u0111\u1ea7y \u0111\u1ee7 b\u1eb1ng th\u00ec qu\u00e1 kh\u1ee9 v\u00e0 c\u1ee5m t\u1eeb k\u1ec3 chuy\u1ec7n!",
  prompt_en: "What did the Hare do? What did the Tortoise do? What is the moral?",
  prompt_vi: "Th\u1ecf \u0111\u00e3 l\u00e0m g\u00ec? R\u00f9a \u0111\u00e3 l\u00e0m g\u00ec? B\u00e0i h\u1ecdc l\u00e0 g\u00ec?",
  keywords: ["boastful", "bragging", "declared", "steadily", "burst", "confidence", "sprinted", "moral"],
  topic_talk_prompt: "Retell the tortoise and the hare story with all the details!",
  sentence_frames: [
    {
        "template": "The boastful Hare was ___ loudly to all the animals and declared that nobody could ___ him.",
        "answers": [
            "bragging",
            "beat"
        ]
    },
    {
        "template": "The calm Tortoise decided to ___ him, and all the animals gathered at ___ to watch.",
        "answers": [
            "challenge",
            "the starting line"
        ]
    },
    {
        "template": "The Hare ___ at top speed and then stopped under a ___ to take ___.",
        "answers": [
            "burst forward",
            "shady oak tree",
            "a short nap"
        ]
    },
    {
        "template": "While the Hare ___, the Tortoise kept moving ___ and ___, never stopping.",
        "answers": [
            "slept soundly",
            "forward",
            "steadily"
        ]
    },
    {
        "template": "By the time the Hare ___ to the finish line, the Tortoise had already ___ and was being ___ by all the animals.",
        "answers": [
            "sprinted",
            "crossed it",
            "cheered"
        ]
    },
    {
        "template": "The moral is that ___ and ___ wins the race.",
        "answers": [
            "slow",
            "steady"
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
        "word": "bragging",
        "vi": "khoe khoang",
        "distractor": false
    },
    {
        "word": "beat",
        "vi": "đánh bại",
        "distractor": false
    },
    {
        "word": "challenge",
        "vi": "thách thức",
        "distractor": false
    },
    {
        "word": "the starting line",
        "vi": "vạch xuất phát",
        "distractor": false
    },
    {
        "word": "burst forward",
        "vi": "lao về phía trước",
        "distractor": false
    },
    {
        "word": "shady oak tree",
        "vi": "cây sồi có bóng mát",
        "distractor": false
    },
    {
        "word": "a short nap",
        "vi": "một giấc ngủ ngắn",
        "distractor": false
    },
    {
        "word": "slept soundly",
        "vi": "ngủ say",
        "distractor": false
    },
    {
        "word": "forward",
        "vi": "về phía trước",
        "distractor": false
    },
    {
        "word": "steadily",
        "vi": "đều đặn",
        "distractor": false
    },
    {
        "word": "sprinted",
        "vi": "chạy nước rút",
        "distractor": false
    },
    {
        "word": "crossed it",
        "vi": "đã về đích",
        "distractor": false
    },
    {
        "word": "cheered",
        "vi": "cổ vũ",
        "distractor": false
    },
    {
        "word": "slow",
        "vi": "chậm",
        "distractor": false
    },
    {
        "word": "steady",
        "vi": "kiên định",
        "distractor": false
    },
    {
        "word": "complimenting",
        "vi": "khen ngợi — sai nghĩa",
        "distractor": true
    },
    {
        "word": "a swimming pool",
        "vi": "bể bơi",
        "distractor": true
    },
    {
        "word": "booed",
        "vi": "la ó",
        "distractor": true
    }
]
    }
  }
};
