export default {
  "title": "The Ant and the Grasshopper — Fable & Work Ethic",
  "min_sentences": 10,
  "theme": "fable_and_moral",
  "min_words": 65,
  "model_sentence": "On a bright sunny summer day, the hardworking ant was gathering grains of wheat. Meanwhile, the lazy grasshopper was singing cheerfully under a green tree. When the cold winter arrived, snow covered the ground everywhere. The grasshopper had no food and was shivering in the cold. He slowly walked to the ant's warm wooden house and knocked on the door. The kind ant opened the door and invited him inside for warm soup. The grasshopper felt deeply grateful and learned a valuable lesson. From that day on, he promised to work hard every summer.",
  "topic_talk_prompt": "Tell me about a time when you worked hard with your friends to finish a project!",
  "sentence_frames": [
    {
      "template": "On a _____ summer day, the ant was gathering grains of wheat.",
      "answers": [
        "bright sunny"
      ]
    },
    {
      "template": "_____, the lazy grasshopper was singing cheerfully under a tree.",
      "answers": [
        "Meanwhile"
      ]
    },
    {
      "template": "When the cold winter arrived, _____ covered the ground everywhere.",
      "answers": [
        "snow"
      ]
    },
    {
      "template": "The grasshopper had no food and was _____ in the cold.",
      "answers": [
        "shivering"
      ]
    },
    {
      "template": "He slowly walked to the ant's warm _____ house.",
      "answers": [
        "wooden"
      ]
    },
    {
      "template": "He _____ on the door and asked for help.",
      "answers": [
        "knocked"
      ]
    },
    {
      "template": "The kind ant opened the door and invited him inside for _____ soup.",
      "answers": [
        "warm"
      ]
    },
    {
      "template": "The grasshopper felt _____ grateful for the food.",
      "answers": [
        "deeply"
      ]
    },
    {
      "template": "He learned a _____ lesson about working hard.",
      "answers": [
        "valuable"
      ]
    },
    {
      "template": "From that day on, he _____ to prepare for winter.",
      "answers": [
        "promised"
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
          "word": "bright sunny",
          "vi": "nắng đẹp rực rỡ",
          "distractor": false
        },
        {
          "word": "Meanwhile",
          "vi": "Trong khi đó",
          "distractor": false
        },
        {
          "word": "snow",
          "vi": "tuyết",
          "distractor": false
        },
        {
          "word": "shivering",
          "vi": "run rẩy",
          "distractor": false
        },
        {
          "word": "wooden",
          "vi": "bằng gỗ",
          "distractor": false
        },
        {
          "word": "knocked",
          "vi": "gõ cửa",
          "distractor": false
        },
        {
          "word": "warm",
          "vi": "nóng ấm",
          "distractor": false
        },
        {
          "word": "deeply",
          "vi": "sâu sắc",
          "distractor": false
        },
        {
          "word": "valuable",
          "vi": "quý giá",
          "distractor": false
        },
        {
          "word": "promised",
          "vi": "đã hứa",
          "distractor": false
        },
        {
          "word": "slowly",
          "vi": "chậm rãi",
          "distractor": true
        },
        {
          "word": "delicious",
          "vi": "ngon miệng",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week34/story_writing_pic.jpg",
      "image_prompt": "In our fun English storytelling class today, my group presented the fable of the Ant and the Grasshopper. The ant gathered grains of wheat during bright sunny summer while the grasshopper sang cheerfully. When winter came, the grasshopper knocked on the wooden house. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "gathering grains",
          "shivering in cold",
          "wooden house",
          "warm soup"
        ],
        "cumulative_chunks": [
          "bright sunny summer",
          "felt deeply grateful",
          "learned a valuable lesson"
        ],
        "connectors": [
          "Meanwhile",
          "When winter arrived",
          "From that day on"
        ],
        "grammar_boosters": [
          "while the ant was working",
          "promised to work hard"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how the ant gathered grains during summer while the grasshopper sang cheerfully, and what happened when winter arrived.",
        "vi": "Nhìn bức tranh. Mô tả cách chú kiến nhặt lúa mì trong mùa hè trong khi chú châu chấu ca hát, và chuyện gì xảy ra khi mùa đông đến."
      },
      "rubric_tier": 2
    }
  }
};
