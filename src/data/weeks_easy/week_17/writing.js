export default {
  "title": "A Rainy Day at School",
  "min_words": 30,
  "instruction_en": "Write about a rainy day!",
  "instruction_vi": "Viết về một ngày mưa!",
  "prompt_en": "What is the weather like? What are you wearing?",
  "prompt_vi": "Thời tiết thế nào? Bạn đang mặc gì?",
  "topic_talk_prompt": "Talk about a rainy day!",
  "show_by_default": true,
  "sentence_frames": [
    {
      "template": "In London, it is ___ today.",
      "answers": [
        "raining"
      ]
    },
    {
      "template": "The boy is wearing a thick ___ and rubber boots.",
      "answers": [
        "raincoat"
      ]
    },
    {
      "template": "In New York, it is ___ hard.",
      "answers": [
        "snowing"
      ]
    },
    {
      "template": "The girl is making a big ___ outside.",
      "answers": [
        "snowman"
      ]
    },
    {
      "template": "In Sydney, it is sunny and ___.",
      "answers": [
        "hot"
      ]
    },
    {
      "template": "In my city, it is cloudy and ___.",
      "answers": [
        "windy"
      ]
    },
    {
      "template": "I am flying a big ___ in the park.",
      "answers": [
        "kite"
      ]
    },
    {
      "template": "In London, it is ___ today.",
      "answers": [
        "raining"
      ]
    }
  ],
  "scaffolding_stage": "medium",
  "vocabulary_bank": [
    "raining",
    "blue coat",
    "wet",
    "umbrella",
    "cold",
    "warm outside now"
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "high",
      "words": [
        {
          "word": "raining hard",
          "vi": "mưa to",
          "distractor": false
        },
        {
          "word": "wearing raincoat",
          "vi": "mặc áo mưa",
          "distractor": false
        },
        {
          "word": "big boots",
          "vi": "ủng to",
          "distractor": false
        },
        {
          "word": "snowing hard",
          "vi": "tuyết rơi dày",
          "distractor": false
        },
        {
          "word": "warm hat",
          "vi": "mũ ấm",
          "distractor": false
        },
        {
          "word": "making snowman",
          "vi": "làm người tuyết",
          "distractor": false
        },
        {
          "word": "sunny day",
          "vi": "ngày nắng",
          "distractor": false
        },
        {
          "word": "cool sunglasses",
          "vi": "kính mát",
          "distractor": false
        },
        {
          "word": "cloudy and windy",
          "vi": "nhiều mây và gió",
          "distractor": false
        },
        {
          "word": "flying a kite",
          "vi": "thả diều",
          "distractor": false
        },
        {
          "word": "hot tea",
          "vi": "trà nóng",
          "distractor": true
        },
        {
          "word": "going swimming",
          "vi": "đi bơi",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week17/story_writing_pic.jpg",
      "image_prompt": "A simple picture for week 17 story writing.",
      "word_bank": [
        "raining heavily",
        "wearing a raincoat",
        "big rubber boots",
        "snowing hard",
        "warm hat",
        "making a snowman",
        "sunny day",
        "wearing sunglasses",
        "cloudy and windy",
        "flying a kite"
      ],
      "writing_prompts": {
        "en": "Look at the picture. What can you see? Write simply.",
        "vi": "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      "rubric_tier": 1,
      "min_sentences": 6,
      "sentence_frames": [
        {
          "template": "In London, ___",
          "answers": [
            "it is raining"
          ]
        },
        {
          "template": "In New York, ___",
          "answers": [
            "it is snowing"
          ]
        },
        {
          "template": "In Sydney, ___",
          "answers": [
            "it is sunny"
          ]
        },
        {
          "template": "The boy is wearing ___",
          "answers": [
            "a warm hat"
          ]
        },
        {
          "template": "In my city, ___",
          "answers": [
            "the weather is windy"
          ]
        },
        {
          "template": "I am flying ___",
          "answers": [
            "a big kite"
          ]
        },
        {
          "template": "In London, ___",
          "answers": [
            "it is raining"
          ]
        },
        {
          "template": "In London, ___",
          "answers": [
            "it is raining"
          ]
        }
      ]
    }
  },
  "min_sentences": 8,
  "model_sentence": "In London, it is raining today. The boy is wearing a thick raincoat and rubber boots. In New York, it is snowing hard. The girl is making a big snowman outside. In Sydney, it is sunny and hot. In my city, it is cloudy and windy. I am flying a big kite in the park. In London, it is raining today."
};
