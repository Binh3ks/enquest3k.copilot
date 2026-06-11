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
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week20/story_writing_pic.jpg',
      image_prompt: "My father is telling me a fascinating story about his old village. Long ago, the town was very different from how it looks today. There were no modern cars, and there were no tall glass buildings anywhere. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1
      ,
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
  }
]
    }
  }
}