export default {
  "title": "Weather and Clothes Around the World",
  "min_words": 50,
  "min_sentences": 8,
  "instruction_en": "Write about weather and what people are wearing in different cities!",
  "instruction_vi": "Viết về thời tiết và trang phục ở các thành phố khác nhau!",
  "prompt_en": "What is the weather in each city? What is each person wearing? Why?",
  "prompt_vi": "Thời tiết ở mỗi thành phố thế nào? Mỗi người đang mặc gì? Tại sao?",
  "topic_talk_prompt": "Talk about the weather in your city today — what are you wearing and why?",
  "vocabulary_bank": [
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
  "sentence_frames": [
    {
      "template": "In London, ___ is raining ___.",
      "answers": [
        "it",
        "heavily"
      ]
    },
    {
      "template": "The boy ___ wearing a ___ yellow raincoat and big rubber boots also.",
      "answers": [
        "is",
        "thick"
      ]
    },
    {
      "template": "He has ___ large blue ___ so he can walk safely in the wet streets so.",
      "answers": [
        "a",
        "umbrella"
      ]
    },
    {
      "template": "In New ___ it is ___ hard. The sky is full of snowflakes.",
      "answers": [
        "York",
        "snowing"
      ]
    },
    {
      "template": "The little ___ is wearing ___ warm winter hat, a thick red coat, and a long wool scarf.",
      "answers": [
        "girl",
        "a"
      ]
    },
    {
      "template": "She is ___ fun because ___ is making a big snowman in her front yard.",
      "answers": [
        "having",
        "she"
      ]
    },
    {
      "template": "Down in ___ it is ___ very sunny and hot day.",
      "answers": [
        "Sydney",
        "a"
      ]
    },
    {
      "template": "The boy ___ wearing a ___ white T-shirt and cool sunglasses at school.",
      "answers": [
        "is",
        "light"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        {
          "word": "raining heavily",
          "vi": "mưa to",
          "distractor": false
        },
        {
          "word": "wearing a thick raincoat",
          "vi": "mặc áo mưa dày",
          "distractor": false
        },
        {
          "word": "big rubber boots",
          "vi": "ủng cao su to",
          "distractor": false
        },
        {
          "word": "snowing hard",
          "vi": "tuyết rơi dày",
          "distractor": false
        },
        {
          "word": "wearing a warm hat",
          "vi": "mặc mũ ấm",
          "distractor": false
        },
        {
          "word": "thick red coat",
          "vi": "áo khoác đỏ dày",
          "distractor": false
        },
        {
          "word": "making a snowman",
          "vi": "làm người tuyết",
          "distractor": false
        },
        {
          "word": "sunny and hot day",
          "vi": "ngày nắng nóng",
          "distractor": false
        },
        {
          "word": "wearing cool sunglasses",
          "vi": "đeo kính mát",
          "distractor": false
        },
        {
          "word": "eating strawberry ice cream",
          "vi": "ăn kem dâu",
          "distractor": false
        },
        {
          "word": "very cloudy and windy",
          "vi": "nhiều mây và gió",
          "distractor": false
        },
        {
          "word": "flying a big kite",
          "vi": "thả diều lớn",
          "distractor": false
        },
        {
          "word": "wearing a light jacket",
          "vi": "mặc áo khoác mỏng",
          "distractor": false
        },
        {
          "word": "staying at home",
          "vi": "ở nhà",
          "distractor": false
        },
        {
          "word": "drinking hot tea",
          "vi": "uống trà nóng",
          "distractor": false
        },
        {
          "word": "playing indoor games",
          "vi": "chơi trò chơi trong nhà",
          "distractor": true
        },
        {
          "word": "watching from window",
          "vi": "nhìn từ cửa sổ",
          "distractor": true
        },
        {
          "word": "running for shelter",
          "vi": "chạy trú mưa",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week17/story_writing_pic.jpg",
      "image_prompt": "In this very interesting picture, there are four good friends living in four different cities, and the weather in each place is completely different today! First, let's look at London. It is raining heavily and the sky is very dark, so the boy is wearing a thick yellow raincoat and big rubber boots. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
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
      "writing_prompts": {
        "en": "Look at the picture. Four friends live in four different cities. What is the weather in each place? What is each person wearing and doing? Use present continuous and 3+ words from the word bank.",
        "vi": "Nhìn bức tranh. Bốn người bạn sống ở bốn thành phố khác nhau. Thời tiết ở mỗi nơi thế nào? Mỗi người đang mặc gì và làm gì? Dùng hiện tại tiếp diễn và 3+ cụm từ trong ngân hàng từ."
      },
      "rubric_tier": 1,
      "sentence_frames": [
        {
          "template": "In London, ___ ___",
          "answers": [
            "it is raining heavily",
            "then"
          ]
        },
        {
          "template": "The boy is wearing ___ ___",
          "answers": [
            "a thick raincoat",
            "also"
          ]
        },
        {
          "template": "In New York, ___ ___",
          "answers": [
            "it is snowing hard",
            "so"
          ]
        },
        {
          "template": "The girl is making ___ ___",
          "answers": [
            "a big snowman",
            "next"
          ]
        },
        {
          "template": "In Sydney, ___ ___",
          "answers": [
            "it is sunny and hot",
            "finally"
          ]
        },
        {
          "template": "He is eating ___ ___",
          "answers": [
            "strawberry ice cream",
            "slowly"
          ]
        },
        {
          "template": "In my city, ___ ___",
          "answers": [
            "the weather is cloudy",
            "happily"
          ]
        },
        {
          "template": "I am flying ___ ___",
          "answers": [
            "a big kite",
            "carefully"
          ]
        }
      ]
    }
  },
  "model_sentence": "In London, it is raining heavily. The boy is wearing a thick yellow raincoat and big rubber boots also. He has a large blue umbrella so he can walk safely in the wet streets so. In New York it is snowing hard. The sky is full of snowflakes. The little girl is wearing a warm winter hat, a thick red coat, and a long wool scarf. She is having fun because she is making a big snowman in her front yard. Down in Sydney it is a very sunny and hot day. The boy is wearing a light white T-shirt and cool sunglasses at school."
};
