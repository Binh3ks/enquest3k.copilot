export default {
  "title": "Adventure Stories — The Secret Cave & Ancient Map",
  "min_sentences": 10,
  "theme": "adventure",
  "min_words": 65,
  "model_sentence": "Early in the morning, the brave explorers walked into the forest holding bright flashlights. They followed an ancient map to search for a mysterious cave. While they were exploring the dark cave, their hearts beat fast with curiosity. Dark grey shadows danced on the rocky walls, but they walked forward bravely. Suddenly, a strange sparkle caught Leo's eyes near a deep stone wall. To their utter surprise, they discovered a hidden treasure chest filled with gold coins. Leo exclaimed: 'Look! We found the ancient secret!'. Everyone felt extremely excited and cheered out loud with joy. Bursting into laughter, they carefully carried the heavy chest to the surface. In the end, they donated the historic treasure to the local museum.",
  "topic_talk_prompt": "Tell me about an exciting adventure story or mysterious discovery!",
  "sentence_frames": [
    {
      "template": "Early in the morning, the brave explorers walked into the forest holding _____ flashlights.",
      "answers": [
        "bright"
      ]
    },
    {
      "template": "They followed an _____ map to search for a mysterious cave.",
      "answers": [
        "ancient"
      ]
    },
    {
      "template": "While they were exploring the dark cave, their _____ beat fast with curiosity.",
      "answers": [
        "hearts"
      ]
    },
    {
      "template": "Dark grey _____ danced on the rocky walls, but they walked forward bravely.",
      "answers": [
        "shadows"
      ]
    },
    {
      "template": "_____, a strange sparkle caught Leo's eyes near a deep stone wall.",
      "answers": [
        "Suddenly"
      ]
    },
    {
      "template": "To their utter surprise, they discovered a hidden _____ chest filled with gold coins.",
      "answers": [
        "treasure"
      ]
    },
    {
      "template": "Leo exclaimed: 'Look! We found the ancient _____!'.",
      "answers": [
        "secret"
      ]
    },
    {
      "template": "Everyone felt _____ excited and cheered out loud with joy.",
      "answers": [
        "extremely"
      ]
    },
    {
      "template": "Bursting into _____, they carefully carried the heavy chest to the surface.",
      "answers": [
        "laughter"
      ]
    },
    {
      "template": "_____, they donated the historic treasure to the local museum.",
      "answers": [
        "In the end"
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
          "word": "bright",
          "vi": "sáng rực",
          "distractor": false
        },
        {
          "word": "ancient",
          "vi": "cổ xưa",
          "distractor": false
        },
        {
          "word": "hearts",
          "vi": "trái tim",
          "distractor": false
        },
        {
          "word": "shadows",
          "vi": "bóng tối",
          "distractor": false
        },
        {
          "word": "Suddenly",
          "vi": "Đột nhiên",
          "distractor": false
        },
        {
          "word": "treasure",
          "vi": "kho báu",
          "distractor": false
        },
        {
          "word": "secret",
          "vi": "bí mật",
          "distractor": false
        },
        {
          "word": "extremely",
          "vi": "cực kỳ",
          "distractor": false
        },
        {
          "word": "laughter",
          "vi": "tiếng cười",
          "distractor": false
        },
        {
          "word": "In the end",
          "vi": "Cuối cùng",
          "distractor": false
        },
        {
          "word": "scary",
          "vi": "đáng sợ",
          "distractor": true
        },
        {
          "word": "quietly",
          "vi": "lặng lẽ",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week36/story_writing_pic.jpg",
      "image_prompt": "Brave explorers inside a mysterious cave holding bright flashlights, discovering an ancient treasure chest. Dark grey shadows on stone walls, heart beat fast. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "holding bright flashlights",
          "mysterious cave",
          "ancient map",
          "hidden treasure chest",
          "carried the heavy chest"
        ],
        "cumulative_chunks": [
          "dark grey shadows",
          "heart beat fast",
          "felt extremely excited",
          "burst into laughter",
          "historic treasure"
        ],
        "connectors": [
          "Early in the morning",
          "Suddenly",
          "To their utter surprise",
          "In the end",
          "Meanwhile"
        ],
        "grammar_boosters": [
          "while they were exploring",
          "noticed a shiny box",
          "exclaimed with joy"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how explorers used an ancient map and flashlights to discover a hidden treasure chest in a mysterious cave.",
        "vi": "Nhìn bức tranh. Mô tả cách các nhà thám hiểm dùng bản đồ cổ và đèn pin để tìm thấy rương kho báu trong hang động kỳ bí."
      },
      "rubric_tier": 2
    }
  }
};
