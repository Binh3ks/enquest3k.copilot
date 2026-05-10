export default {
  title: "My Step-by-Step Guide",
  min_words: 28,
  model_sentence: "Here is how I make a sandwich. First I take two slices of bread. Next I spread butter on them. Then I add some ham. Finally I enjoy my sandwich!",
  instruction_en: "Write a step-by-step guide using First, Next, Then, Finally!",
  instruction_vi: "Vi\u1ebft m\u1ed9t h\u01b0\u1edbng d\u1eabn t\u1eebng b\u01b0\u1edbc d\u00f9ng First, Next, Then, Finally!",
  prompt_en: "What is your guide about? What are the steps from first to finally?",
  prompt_vi: "H\u01b0\u1edbng d\u1eabn c\u1ee7a b\u1ea1n v\u1ec1 \u0111i\u1ec1u g\u00ec? C\u00e1c b\u01b0\u1edbc t\u1eeb \u0111\u1ea7u \u0111\u1ebfn cu\u1ed1i l\u00e0 g\u00ec?",
  keywords: ["sandwich", "slices", "bread", "butter", "ham", "enjoy"],
  topic_talk_prompt: "Give me a step-by-step guide for something you know how to do!",
  sentence_frames: [
    {
        "template": "First I take two ___ of bread.",
        "answers": [
            "slices"
        ]
    },
    {
        "template": "Next I ___ butter on them.",
        "answers": [
            "spread"
        ]
    },
    {
        "template": "Then I add some ___.",
        "answers": [
            "ham"
        ]
    },
    {
        "template": "Finally I ___ my sandwich!",
        "answers": [
            "enjoy"
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
        "word": "slices",
        "vi": "lát",
        "distractor": false
    },
    {
        "word": "spread",
        "vi": "phết",
        "distractor": false
    },
    {
        "word": "ham",
        "vi": "giăm bông",
        "distractor": false
    },
    {
        "word": "enjoy",
        "vi": "thưởng thức",
        "distractor": false
    },
    {
        "word": "bags",
        "vi": "túi — không phải sandwich",
        "distractor": true
    },
    {
        "word": "pour",
        "vi": "đổ — không phải bơ",
        "distractor": true
    },
    {
        "word": "hide",
        "vi": "giấu — sai",
        "distractor": true
    }
]
    }
  }
};
