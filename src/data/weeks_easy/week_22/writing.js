export default {
  title: "Detective Nova's Case Interview",
  min_words: 30,
  instruction_en: "Write about a detective interview using past tense!",
  instruction_vi: "Viết về cuộc phỏng vấn thám tử bằng thì quá khứ!",
  prompt_en: "What questions did the detective ask? How did the suspect answer?",
  prompt_vi: "Thám tử đã hỏi câu nào? Nghi phạm trả lời thế nào?",
  topic_talk_prompt: "Tell me about a detective interview!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Nova was working on a case in **Hoi An**, Vietnam.",
      "answers": [
        "Hoi An"
      ]
    },
    {
      "template": "She arrived at the scene and opened her notebook.",
      "answers": [
        "opened her notebook"
      ]
    },
    {
      "template": "'Where were you **yesterday morning**?' The suspect **answered clearly**.",
      "answers": [
        "yesterday morning",
        "answered clearly"
      ]
    },
    {
      "template": "'What did you do **last night**?' She **wrote every answer** **in her notebook**.",
      "answers": [
        "last night",
        "wrote every answer",
        "in her notebook"
      ]
    },
    {
      "template": "Nova **studied each clue carefully** in the warm lantern light.",
      "answers": [
        "studied each clue carefully"
      ]
    },
    {
      "template": "Nova **had solved the case**. Detective Nova handed her final report to the team in Hoi An.",
      "answers": [
        "had solved the case"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "Hoi An",
    "opened her notebook",
    "yesterday morning",
    "answered clearly",
    "last night",
    "wrote every answer",
    "in her notebook",
    "studied each clue carefully",
    "had solved the case"
  ],
    hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "Time Detective", "vi": "Time Detective", "distractor": false },
        { "word": "big hat", "vi": "big hat", "distractor": false },
        { "word": "holding a notebook", "vi": "holding a notebook", "distractor": false },
        { "word": "chocolate cake", "vi": "chocolate cake", "distractor": false },
        { "word": "ask questions", "vi": "ask questions", "distractor": false },
        { "word": "last night", "vi": "last night", "distractor": false },
        { "word": "cooked dinner", "vi": "cooked dinner", "distractor": false },
        { "word": "washed the dishes", "vi": "washed the dishes", "distractor": false },
        { "word": "this morning", "vi": "this morning", "distractor": false },
        { "word": "last weekend", "vi": "last weekend", "distractor": false },
        { "word": "worked in the garden", "vi": "worked in the garden", "distractor": false },
        { "word": "an hour ago", "vi": "an hour ago", "distractor": false },
        { "word": "very hungry", "vi": "very hungry", "distractor": false },
        { "word": "mystery solved", "vi": "mystery solved", "distractor": false },
        { "word": "wrote down clues", "vi": "wrote down clues", "distractor": false },
        { "word": "asked about last night", "vi": "asked about last night", "distractor": true },
        { "word": "found some evidence", "vi": "found some evidence", "distractor": true },
        { "word": "checked all the rooms", "vi": "checked all the rooms", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week22/story_writing_pic.jpg",
      image_prompt: "A student detective investigating a mystery.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
