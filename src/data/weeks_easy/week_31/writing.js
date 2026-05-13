export default {
  title: "My Day at the Market",
  min_words: 32,
  model_sentence: "Last Saturday I went to the market. I saw glass jars with golden honey. I touched a wooden shelf and it felt rough. I smelt warm spices. I felt the soft cotton scarves. It was a great day!",
  instruction_en: "Write about a visit to the market! Use: saw, felt, smelt, heard. Try to use at least TWO materials: wood, metal, glass, stone, cotton, or plastic!",
  instruction_vi: "Vi\u1ebft m\u1ed9t chuy\u1ebfn \u0111i d\u00f9ng saw, heard, smelled v\u00e0 felt!",
  prompt_en: "What did you see, hear, smell, and feel on your walk?",
  prompt_vi: "B\u1ea1n th\u1ea5y, nghe, ng\u1eedi v\u00e0 c\u1ea3m nh\u1eadn g\u00ec trong chuy\u1ebfn \u0111i b\u1ed9?",
  keywords: ["glass", "wood", "stone", "cotton", "metal", "plastic", "saw", "heard", "felt", "smelt"],
  topic_talk_prompt: "Describe a visit to a market using your five senses — mention the materials!",
  sentence_frames: [
    { "template": "I went to the ___ market with my ___.", "answers": ["old town", "family"] },
    { "template": "I saw rows of ___ stalls. There were ___ and ___.", "answers": ["colorful", "cotton scarves", "glass jars"] },
    { "template": "I heard vendors ___ and children ___.", "answers": ["calling out prices", "laughing"] },
    { "template": "I felt the ___ cloth / shelf. It felt so ___!", "answers": ["cotton", "soft"] },
    { "template": "I smelt sweet ___ near the ___ stall.", "answers": ["cinnamon", "spice"] },
    { "template": "My favorite thing at the market was the ___. It was made of ___.", "answers": ["stone bowl", "stone"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "colorful", "vi": "đầy màu sắc", "distractor": false },
        { "word": "cotton scarves", "vi": "khăn cotton", "distractor": false },
        { "word": "cinnamon", "vi": "quế", "distractor": false },
        { "word": "stone bowl", "vi": "bát đá", "distractor": false },
        { "word": "vendors", "vi": "người bán hàng — không phải chim", "distractor": true },
        { "word": "forest", "vi": "rừng — không phải chợ", "distractor": true }
      ]
    }
  }
};
