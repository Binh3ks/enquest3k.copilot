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
      "template": "Detective Luna found an **old map**. The map was from a long time ago.",
      "answers": [
        "old map"
      ]
    },
    {
      "template": "On the old map, there was a big **local market** near the **long river**.",
      "answers": [
        "local market",
        "long river"
      ]
    },
    {
      "template": "There were tall **tall trees** **along the road**.",
      "answers": [
        "tall trees",
        "along the road"
      ]
    },
    {
      "template": "There was a **old temple** at the end of the road. It **still stands** today!",
      "answers": [
        "old temple",
        "still stands"
      ]
    },
    {
      "template": "There was a **wooden bridge** **over the river**.",
      "answers": [
        "wooden bridge",
        "over the river"
      ]
    },
    {
      "template": "Now there are new buildings. However, the **old temple** is still here!",
      "answers": [
        "new buildings",
        "old temple"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "old map",
    "local market",
    "long river",
    "tall trees",
    "along the road",
    "old temple",
    "still stands",
    "wooden bridge",
    "over the river",
    "new buildings"
  ],
    hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "old village", "vi": "old village", "distractor": false },
        { "word": "long ago", "vi": "long ago", "distractor": false },
        { "word": "modern cars", "vi": "modern cars", "distractor": false },
        { "word": "glass buildings", "vi": "glass buildings", "distractor": false },
        { "word": "ancient temple", "vi": "ancient temple", "distractor": false },
        { "word": "winding blue river", "vi": "winding blue river", "distractor": false },
        { "word": "leafy trees", "vi": "leafy trees", "distractor": false },
        { "word": "narrow dirt roads", "vi": "narrow dirt roads", "distractor": false },
        { "word": "busy outdoor market", "vi": "busy outdoor market", "distractor": false },
        { "word": "friendly people", "vi": "friendly people", "distractor": false },
        { "word": "fresh fruits", "vi": "fresh fruits", "distractor": false },
        { "word": "colorful vegetables", "vi": "colorful vegetables", "distractor": false },
        { "word": "wooden bridge", "vi": "wooden bridge", "distractor": false },
        { "word": "tall modern buildings", "vi": "tall modern buildings", "distractor": false },
        { "word": "peaceful and beautiful", "vi": "peaceful and beautiful", "distractor": false },
        { "word": "bought some flowers", "vi": "bought some flowers", "distractor": true },
        { "word": "ate some fruit", "vi": "ate some fruit", "distractor": true },
        { "word": "watched the river", "vi": "watched the river", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week20/story_writing_pic.jpg",
      image_prompt: "An old village with a river, temple, and market.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
