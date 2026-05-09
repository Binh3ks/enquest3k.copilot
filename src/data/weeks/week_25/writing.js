export default {
  title: "Writing: My Step-by-Step Guide",
  min_words: 40,
  model_sentence: "Here is how I make a jam sandwich step by step. First, I take two slices of bread from the bag. Next, I use a knife to spread jam on one slice. Then I press the two slices together. Finally, I enjoy my sandwich!",
  instruction_en: "Write a step-by-step guide using sequence words!",
  instruction_vi: "Vi\u1ebft h\u01b0\u1edbng d\u1eabn t\u1eebng b\u01b0\u1edbc d\u00f9ng t\u1eeb n\u1ed1i tr\u00ecnh t\u1ef1!",
  prompt_en: "What are the exact steps? What tools do you use?",
  prompt_vi: "C\u00e1c b\u01b0\u1edbc ch\u00ednh x\u00e1c l\u00e0 g\u00ec? B\u1ea1n d\u00f9ng d\u1ee5ng c\u1ee5 g\u00ec?",
  keywords: ["sandwich", "bread", "knife", "spread", "press", "together", "enjoy"],
  topic_talk_prompt: "Give a detailed step-by-step explanation!",
  sentence_frames: [
    {
        "template": "Here is how I make ___ step by step.",
        "answers": [
            "a jam sandwich"
        ]
    },
    {
        "template": "First, I take ___ from ___.",
        "answers": [
            "two slices of bread",
            "the bag"
        ]
    },
    {
        "template": "Next, I use ___ to ___ jam on one slice.",
        "answers": [
            "a knife",
            "spread"
        ]
    },
    {
        "template": "Then I press the two slices ___ and enjoy my ___.",
        "answers": [
            "together",
            "sandwich"
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
        "word": "a jam sandwich",
        "vi": "bánh mì kẹp mứt",
        "distractor": false
    },
    {
        "word": "two slices of bread",
        "vi": "hai lát bánh mì",
        "distractor": false
    },
    {
        "word": "the bag",
        "vi": "cái túi",
        "distractor": false
    },
    {
        "word": "a knife",
        "vi": "cái dao",
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
        "word": "sandwich",
        "vi": "bánh mì sandwich",
        "distractor": false
    },
    {
        "word": "a bowl of soup",
        "vi": "tô canh",
        "distractor": true
    },
    {
        "word": "a spoon",
        "vi": "cái muỗng",
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
