export default {
  title: "Writing: My Weekend in Four Panels",
  min_words: 35,
  model_sentence: "Last weekend, I visited the park with my dog. First, we walked to the park together. It was sunny and warm. Then, my dog played in the grass and I had a snack. After that, we took a nap. Finally, we went home tired but happy.",
  instruction_en: "Write about your weekend using First, Then, After that, Finally!",
  instruction_vi: "Vi\u1ebft v\u1ec1 cu\u1ed1i tu\u1ea7n d\u00f9ng First, Then, After that, Finally!",
  prompt_en: "What did you do? Use the four sequence words!",
  prompt_vi: "B\u1ea1n \u0111\u00e3 l\u00e0m g\u00ec? D\u00f9ng b\u1ed1n t\u1eeb n\u1ed1i tr\u00ecnh t\u1ef1!",
  keywords: ["park", "dog", "walked", "sunny", "warm", "grass", "snack", "nap", "tired", "happy"],
  topic_talk_prompt: "Tell me about your weekend in four parts!",
  sentence_frames: [
    {
        "template": "Last weekend, I ___ the park with my ___.",
        "answers": [
            "visited",
            "dog"
        ]
    },
    {
        "template": "First, we ___ to the park together. It was ___ and ___.",
        "answers": [
            "walked",
            "sunny",
            "warm"
        ]
    },
    {
        "template": "Then, my dog ___ in the grass and I had a ___.",
        "answers": [
            "played",
            "snack"
        ]
    },
    {
        "template": "After that, we ___ a nap.",
        "answers": [
            "took"
        ]
    },
    {
        "template": "Finally, we went home ___ but ___.",
        "answers": [
            "tired",
            "happy"
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
        "word": "visited",
        "vi": "thăm",
        "distractor": false
    },
    {
        "word": "dog",
        "vi": "con chó",
        "distractor": false
    },
    {
        "word": "walked",
        "vi": "đi bộ",
        "distractor": false
    },
    {
        "word": "sunny",
        "vi": "nắng",
        "distractor": false
    },
    {
        "word": "warm",
        "vi": "ấm áp",
        "distractor": false
    },
    {
        "word": "played",
        "vi": "chơi",
        "distractor": false
    },
    {
        "word": "snack",
        "vi": "bữa ăn nhẹ",
        "distractor": false
    },
    {
        "word": "took",
        "vi": "thực hiện/ngủ",
        "distractor": false
    },
    {
        "word": "tired",
        "vi": "mệt mỏi",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "ran away",
        "vi": "bỏ chạy",
        "distractor": true
    },
    {
        "word": "cold",
        "vi": "lạnh",
        "distractor": true
    },
    {
        "word": "skipped",
        "vi": "bỏ qua",
        "distractor": true
    }
]
    }
  }
};
