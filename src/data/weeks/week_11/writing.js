export default {
  title: "My Favourite Weekend Place",
  min_words: 35,
  model_sentence: "My favourite place on the weekend is the park. There is a big lake and there are many trees. I go with my family. We walk around the lake and have a picnic.",
  instruction_en: "Write about your favourite weekend place in detail!",
  instruction_vi: "Vi\u1ebft chi ti\u1ebft v\u1ec1 n\u01a1i y\u00eau th\u00edch cu\u1ed1i tu\u1ea7n!",
  prompt_en: "What do you do there? Who do you go with? What makes it special?",
  prompt_vi: "B\u1ea1n l\u00e0m g\u00ec \u1edf \u0111\u00f3? \u0110i c\u00f9ng ai? \u0110i\u1ec1u g\u00ec l\u00e0m n\u00f3 \u0111\u1eb7c bi\u1ec7t?",
  keywords: ["park", "lake", "trees", "family", "walk", "picnic"],
  topic_talk_prompt: "Describe your favourite weekend place!",
  sentence_frames: [
    {
        "template": "My favourite place on the weekend is ___.",
        "answers": [
            "the park"
        ]
    },
    {
        "template": "There is ___ and there are many ___.",
        "answers": [
            "a big lake",
            "trees"
        ]
    },
    {
        "template": "I go with ___ and we ___ and ___.",
        "answers": [
            "my family",
            "walk around the lake",
            "have a picnic"
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
        "word": "the park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "a big lake",
        "vi": "một hồ lớn",
        "distractor": false
    },
    {
        "word": "trees",
        "vi": "cây",
        "distractor": false
    },
    {
        "word": "my family",
        "vi": "gia đình tôi",
        "distractor": false
    },
    {
        "word": "walk around the lake",
        "vi": "đi bộ quanh hồ",
        "distractor": false
    },
    {
        "word": "have a picnic",
        "vi": "dã ngoại",
        "distractor": false
    },
    {
        "word": "the supermarket",
        "vi": "siêu thị",
        "distractor": true
    },
    {
        "word": "stay home and sleep",
        "vi": "ở nhà ngủ",
        "distractor": true
    }
]
    }
  }
};
