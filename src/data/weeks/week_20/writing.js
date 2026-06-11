export default {
  title: "The Old Town Mystery",
  min_words: 45,
  model_sentence: "Detective Luna loves mysteries. She found an old map of her town. On the old map, there was a local market near a long river with tall trees along the road. There was a wooden bridge over the river. Now the market is gone. There is a new bridge and new buildings. But the old temple still stands. Luna smiled and said, 'The past is still here if you look carefully!'",
  instruction_en: "Write about how a place has changed over time using was, were, there was, and however!",
  instruction_vi: "Viết về sự thay đổi của một nơi theo thời gian dùng was, were, there was và however!",
  prompt_en: "What was the place like before? What has changed? How do you feel about it?",
  prompt_vi: "Nơi đó trước đây thế nào? Điều gì đã thay đổi? Bạn cảm thấy thế nào?",
  topic_talk_prompt: "Describe a place that has changed — past vs present!",
  sentence_frames: [
    {
      "template": "Detective Luna found an **old map** of her town. The map was from one hundred years ago!",
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
      "template": "**There were** tall **tall trees** **along the road**. Their branches made everything cool and shady.",
      "answers": [
        "There were",
        "tall trees",
        "along the road"
      ]
    },
    {
      "template": "At the end of the main road, there was a beautiful **old temple**.",
      "answers": [
        "old temple"
      ]
    },
    {
      "template": "There was a wooden **wooden bridge** **over the river** that children loved to run across.",
      "answers": [
        "wooden bridge",
        "over the river"
      ]
    },
    {
      "template": "However, now there are new tall buildings where the old market was. The market is gone.",
      "answers": [
        "new tall buildings"
      ]
    },
    {
      "template": "There is a big new bridge, and there are still some trees, but not many.",
      "answers": [
        "big new bridge"
      ]
    },
    {
      "template": "Only the temple **still stands**. Luna **stood in front of the temple** and smiled. The past is still here!",
      "answers": [
        "still stands",
        "stood in front of the temple"
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
    "wooden bridge",
    "over the river",
    "new tall buildings",
    "big new bridge",
    "still stands",
    "stood in front of the temple"
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
    "template": "Detective Luna found an **old map** of her town. The map was from one hundred years ago!",
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
    "template": "**There were** tall **tall trees** **along the road**. Their branches made everything cool and shady.",
    "answers": [
      "There were",
      "tall trees",
      "along the road"
    ]
  }
]
    }
  }
}