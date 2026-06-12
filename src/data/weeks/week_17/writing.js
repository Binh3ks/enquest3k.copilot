export default {
  title: "Weather and Clothes Around the World",
  min_words: 50,
  min_sentences: 8,
  instruction_en: "Write about weather and what people are wearing in different cities!",
  instruction_vi: "Viết về thời tiết và trang phục ở các thành phố khác nhau!",
  prompt_en: "What is the weather in each city? What is each person wearing? Why?",
  prompt_vi: "Thời tiết ở mỗi thành phố thế nào? Mỗi người đang mặc gì? Tại sao?",
  topic_talk_prompt: "Talk about the weather in your city today — what are you wearing and why?",
  vocabulary_bank: [
    "raining heavily",
    "wearing a thick yellow raincoat",
    "big rubber boots",
    "walking safely in the wet streets",
    "snowing hard",
    "wearing a warm winter hat",
    "thick red coat",
    "making a big funny snowman",
    "sunny and hot day",
    "wearing cool sunglasses",
    "eating a sweet strawberry ice cream",
    "very cloudy and windy",
    "wearing a light green jacket",
    "flying a big kite"
  ],
  sentence_frames: [
    {
      "template": "In London, it is ___ ___ ___ ___. The boy is wearing a ___ ___ ___ ___ ___ and big rubber boots.",
      "answers": ["raining heavily", "thick yellow raincoat"]
    },
    {
      "template": "He has a large blue ___ ___ so he can ___ ___ ___ ___ in the wet streets.",
      "answers": ["umbrella", "walk safely"]
    },
    {
      "template": "In New York, it is ___ ___. The little girl is wearing a warm ___ ___ ___, a thick red ___ ___, and a long ___ ___ ___.",
      "answers": ["freezing", "winter hat", "coat", "wool scarf"]
    },
    {
      "template": "She is having fun because she is ___ ___ ___ ___ ___ in her front yard.",
      "answers": ["making a big snowman"]
    },
    {
      "template": "Down in Sydney, it is a very ___ ___ ___ ___ ___ day. The boy is wearing a light white T-shirt and cool ___ ___ ___.",
      "answers": ["sunny and hot", "sunglasses"]
    },
    {
      "template": "He is walking on the beach and ___ ___ ___ ___ ___ ___ ice cream.",
      "answers": ["eating a sweet strawberry"]
    },
    {
      "template": "In my city, it is very ___ ___ ___ ___ today. I am wearing a light green ___ ___ to keep warm.",
      "answers": ["cloudy and windy", "jacket"]
    },
    {
      "template": "The strong wind is ___ ___ ___ ___ ___ everywhere, so I am flying a big ___ ___ in the park.",
      "answers": ["blowing the tree leaves", "kite"]
    }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week17/story_writing_pic.jpg',
      image_prompt: "In this very interesting picture, there are four good friends living in four different cities, and the weather in each place is completely different today! First, let's look at London. It is raining heavily and the sky is very dark, so the boy is wearing a thick yellow raincoat and big rubber boots. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "raining heavily",
        "wearing a thick yellow raincoat",
        "big rubber boots",
        "walking safely in the wet streets",
        "snowing hard",
        "wearing a warm winter hat",
        "thick red coat",
        "making a big funny snowman",
        "sunny and hot day",
        "wearing cool sunglasses",
        "eating a sweet strawberry ice cream",
        "very cloudy and windy",
        "wearing a light green jacket",
        "flying a big kite"
      ],
      writing_prompts: {
        en: "Look at the picture. Four friends live in four different cities. What is the weather in each place? What is each person wearing and doing? Use present continuous and 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bốn người bạn sống ở bốn thành phố khác nhau. Thời tiết ở mỗi nơi thế nào? Mỗi người đang mặc gì và làm gì? Dùng hiện tại tiếp diễn và 3+ cụm từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      sentence_frames: [
        { "template": "In London, ___", "answers": ["it is raining heavily"] },
        { "template": "In New York, ___", "answers": ["it is snowing hard"] },
        { "template": "In Sydney, ___", "answers": ["it is sunny and hot"] },
        { "template": "In my city, ___", "answers": ["it is cloudy and windy"] },
        { "template": "Because the weather is ___, ___", "answers": ["cold", "I am wearing a jacket"] },
        { "template": "Meanwhile, ___", "answers": ["people are doing different things"] }
      ]
    }
  }
}