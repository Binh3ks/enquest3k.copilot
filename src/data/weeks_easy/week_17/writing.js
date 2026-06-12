export default {
  title: "Weather and Clothes Around the World",
  min_words: 35,
  min_sentences: 6,
  instruction_en: "Write about the weather and what people wear!",
  instruction_vi: "Viết về thời tiết và mọi người mặc gì!",
  prompt_en: "What is the weather like? What are people wearing?",
  prompt_vi: "Thời tiết thế nào? Mọi người đang mặc gì?",
  topic_talk_prompt: "Talk about the weather and clothes!",
  show_by_default: true,
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "raining heavily",
    "wearing a raincoat",
    "big rubber boots",
    "snowing hard",
    "wearing a warm hat",
    "sunny and hot day",
    "eating ice cream",
    "cloudy and windy",
    "flying a big kite",
    "wearing a jacket"
  ],
  sentence_frames: [
    {
      "template": "It is ___ heavily in London today.",
      "answers": ["raining"]
    },
    {
      "template": "The boy is wearing a ___ and ___ ___ ___.",
      "answers": ["raincoat", "big rubber boots"]
    },
    {
      "template": "In Moscow, it is ___ hard. The girl is wearing a ___ ___.",
      "answers": ["snowing", "warm hat"]
    },
    {
      "template": "In Cairo, it is a ___ and ___ ___. The children are ___ ___.",
      "answers": ["sunny", "hot day", "eating ice cream"]
    },
    {
      "template": "It is ___ and ___. We are ___ a big ___.",
      "answers": ["cloudy", "windy", "flying", "kite"]
    },
    {
      "template": "I am ___ a jacket because the weather is ___ ___.",
      "answers": ["wearing", "cold outside"]
    }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week17/story_writing_pic.jpg',
      image_prompt: "In this very interesting picture, there are four good friends living in four different cities, and the weather in each place is completely different today! First, let's look at London. It is raining heavily and the sky is very dark, so the boy is wearing a thick yellow raincoat and big rubber boots. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "raining heavily",
        "wearing a raincoat",
        "big rubber boots",
        "snowing hard",
        "wearing a warm hat",
        "sunny and hot day",
        "eating ice cream",
        "cloudy and windy",
        "flying a big kite",
        "wearing a jacket"
      ],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1,
      sentence_frames: [
        {
          "template": "It is raining heavily, so the boy is wearing ___ ___ ___ and ___ ___ ___.",
          "answers": ["a raincoat", "big rubber boots"]
        },
        {
          "template": "It is snowing hard, so the girl is ___ ___ ___.",
          "answers": ["wearing a warm hat"]
        },
        {
          "template": "It is a sunny and hot day, so the children are ___ ___.",
          "answers": ["eating ice cream"]
        }
      ]
    }
  }
}
