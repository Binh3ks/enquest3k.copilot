export default {
  title: "My Picnic Story",
  min_words: 32,
  model_sentence: "Last Sunday my family had a picnic in the park. Mum bought bread and fruit. We spread a blanket on the grass. We ate and laughed together. It was a happy day.",
  instruction_en: "Write a detailed picnic story with rich language!",
  instruction_vi: "Vi\u1ebft m\u1ed9t c\u00e2u chuy\u1ec7n d\u00e3 ngo\u1ea1i chi ti\u1ebft v\u1edbi ng\u00f4n ng\u1eef phong ph\u00fa!",
  prompt_en: "Where did you go? What did you bring? What did you do? How did it feel?",
  prompt_vi: "B\u1ea1n \u0111i \u0111\u00e2u? B\u1ea1n mang g\u00ec? B\u1ea1n l\u00e0m g\u00ec? C\u1ea3m gi\u00e1c th\u1ebf n\u00e0o?",
  keywords: ["picnic", "bought", "bread", "blanket", "grass", "laughed", "happy"],
  topic_talk_prompt: "Tell me about a wonderful picnic you had!",
  sentence_frames: [
    {
        "template": "Last Sunday my family had a ___ in the park.",
        "answers": [
            "picnic"
        ]
    },
    {
        "template": "Mum ___ bread and fruit.",
        "answers": [
            "bought"
        ]
    },
    {
        "template": "We spread a ___ on the grass.",
        "answers": [
            "blanket"
        ]
    },
    {
        "template": "We ate and ___ together.",
        "answers": [
            "laughed"
        ]
    },
    {
        "template": "It was a ___ day.",
        "answers": [
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
        "word": "picnic",
        "vi": "dã ngoại",
        "distractor": false
    },
    {
        "word": "bought",
        "vi": "đã mua",
        "distractor": false
    },
    {
        "word": "blanket",
        "vi": "tấm chăn",
        "distractor": false
    },
    {
        "word": "laughed",
        "vi": "đã cười",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "argument",
        "vi": "cuộc cãi vã",
        "distractor": true
    },
    {
        "word": "sold",
        "vi": "đã bán",
        "distractor": true
    },
    {
        "word": "cried",
        "vi": "đã khóc",
        "distractor": true
    }
]
    }
  }
};
