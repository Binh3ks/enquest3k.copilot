export default {
  title: "Writing: My Step-by-Step Guide",
  min_words: 30,
  model_sentence: "Here is how I make a jam sandwich step by step. First, I take two slices of bread. Next, I spread jam on one slice with a knife. Then I put the slices together. Finally, I eat it!",
  instruction_en: "Write your step-by-step guide!",
  instruction_vi: "Vi\u1ebft h\u01b0\u1edbng d\u1eabn t\u1eebng b\u01b0\u1edbc c\u1ee7a b\u1ea1n!",
  prompt_en: "What are you making? What are the steps? What words do you use for order?",
  prompt_vi: "B\u1ea1n \u0111ang l\u00e0m g\u00ec? C\u00e1c b\u01b0\u1edbc l\u00e0 g\u00ec?",
  keywords: ["sandwich", "bread", "jam", "spread", "knife", "together", "eat"],
  topic_talk_prompt: "Explain how to make something step by step!",
  sentence_frames: [
    {
        "template": "Here is how I make a ___.",
        "answers": [
            "jam sandwich"
        ]
    },
    {
        "template": "First, I take two slices of ___.",
        "answers": [
            "bread"
        ]
    },
    {
        "template": "Next, I ___ jam on one slice.",
        "answers": [
            "spread"
        ]
    },
    {
        "template": "Then I put the slices ___.",
        "answers": [
            "together"
        ]
    },
    {
        "template": "Finally, I ___ it!",
        "answers": [
            "eat"
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
        "word": "jam sandwich",
        "vi": "bánh mì kẹp mứt",
        "distractor": false
    },
    {
        "word": "bread",
        "vi": "bánh mì",
        "distractor": false
    },
    {
        "word": "spread",
        "vi": "phết",
        "distractor": false
    },
    {
        "word": "together",
        "vi": "lại với nhau",
        "distractor": false
    },
    {
        "word": "eat",
        "vi": "ăn",
        "distractor": false
    },
    {
        "word": "pizza",
        "vi": "bánh pizza",
        "distractor": true
    },
    {
        "word": "pour",
        "vi": "đổ",
        "distractor": true
    },
    {
        "word": "apart",
        "vi": "tách ra",
        "distractor": true
    }
]
    }
  }
};
