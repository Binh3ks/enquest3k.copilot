export default {
  title: "The Old Town Mystery",
  min_words: 30,
  model_sentence: "Last year there was a small local market near the river. There were tall trees along the road. There was a wooden bridge. Now there is a new bridge and new buildings. The old temple still stands. The past is still here if you look carefully!",
  instruction_en: "Write about how your neighbourhood has changed!",
  instruction_vi: "Viết về khu phố của bạn đã thay đổi như thế nào!",
  prompt_en: "What was there before? What is there now? How is it different?",
  prompt_vi: "Trước đây có gì? Bây giờ có gì? Nó khác nhau thế nào?",
  topic_talk_prompt: "Describe your neighbourhood — now and before!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Detective Luna found an old ___ of her town.",
      "answers": ["map"]
    },
    {
      "template": "On the map, there was a big market near the ___.",
      "answers": ["river"]
    },
    {
      "template": "There were tall ___ along the road.",
      "answers": ["trees"]
    },
    {
      "template": "There was an old ___ at the end of the road.",
      "answers": ["temple"]
    },
    {
      "template": "There was a ___ bridge over the river.",
      "answers": ["wooden"]
    },
    {
      "template": "Now there are new ___. However, the old temple still stands.",
      "answers": ["buildings"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "old village", "vi": "làng cổ", "distractor": false },
        { "word": "long ago", "vi": "cách đây lâu", "distractor": false },
        { "word": "modern cars", "vi": "xe hơi hiện đại", "distractor": false },
        { "word": "ancient temple", "vi": "ngôi đền cổ", "distractor": false },
        { "word": "blue river", "vi": "sông xanh", "distractor": false },
        { "word": "leafy trees", "vi": "cây lá xanh", "distractor": false },
        { "word": "busy market", "vi": "chợ nhộn nhịp", "distractor": false },
        { "word": "fresh fruits", "vi": "trái cây tươi", "distractor": false },
        { "word": "wooden bridge", "vi": "cầu gỗ", "distractor": false },
        { "word": "beautiful temple", "vi": "ngôi đền đẹp", "distractor": false },
        { "word": "watched TV", "vi": "xem TV", "distractor": true },
        { "word": "played games", "vi": "chơi trò chơi", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week20/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 20 story writing.",
      word_bank: [
        "old village",
        "long ago",
        "modern cars",
        "ancient temple",
        "winding river",
        "leafy trees",
        "busy market",
        "fresh fruits",
        "wooden bridge",
        "tall buildings"
      ],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "Long ago, there ___", "answers": ["was a village"]},
        {"template": "Near the river, ___", "answers": ["there was a market"]},
        {"template": "There was a ___", "answers": ["wooden bridge"]},
        {"template": "But now, ___", "answers": ["there are new buildings"]},
        {"template": "The old temple ___", "answers": ["still stands"]},
        {"template": "I wish ___", "answers": ["I could visit"]}
      ]
    }
  }
}
