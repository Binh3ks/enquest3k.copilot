export default {
  "title": "The Mystery House",
  "min_words": 30,
  "model_sentence": "I look for my toy car. I look on the floor and in the box. My friend helps me. He looks under the desk. He finds it! The toy car is under the desk. Now I look for my ball. It is next to the door. We play hide and seek.",
  "instruction_en": "Write about your house and what you do in each room!",
  "instruction_vi": "Viết về ngôi nhà của bạn và bạn làm gì ở mỗi phòng!",
  "prompt_en": "What rooms does your house have? What do you do in each room?",
  "prompt_vi": "Nhà bạn có những phòng nào? Bạn làm gì ở mỗi phòng?",
  "keywords": [
    "live in a house",
    "many rooms",
    "sleep in my bedroom",
    "soft bed",
    "eat in the kitchen",
    "sit on a chair",
    "at the table",
    "wash my hands",
    "in the bathroom",
    "watch TV",
    "in the living room",
    "every evening",
    "explore every room",
    "love my house"
  ],
  "topic_talk_prompt": "Describe your house and rooms!",
  "sentence_frames": [
    {
      "template": "I ___ for my toy car.",
      "answers": [
        "look"
      ]
    },
    {
      "template": "I look ___ the floor and in the box.",
      "answers": [
        "on"
      ]
    },
    {
      "template": "My friend ___ me. He looks under the desk.",
      "answers": [
        "helps"
      ]
    },
    {
      "template": "He finds it! The toy car is under the ___.",
      "answers": [
        "desk"
      ]
    },
    {
      "template": "Now I look for my ball. It is ___ the door.",
      "answers": [
        "next to"
      ]
    },
    {
      "template": "We play hide and ___.",
      "answers": [
        "seek"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": true,
      "scaffolding_stage": "high",
      "words": [
        {
          "word": "Tim",
          "vi": "",
          "distractor": false
        },
        {
          "word": "live",
          "vi": "sống",
          "distractor": false
        },
        {
          "word": "many",
          "vi": "nhiều",
          "distractor": false
        },
        {
          "word": "bedroom",
          "vi": "phòng ngủ",
          "distractor": false
        },
        {
          "word": "bed",
          "vi": "giường",
          "distractor": false
        },
        {
          "word": "kitchen",
          "vi": "nhà bếp",
          "distractor": false
        },
        {
          "word": "at",
          "vi": "ở",
          "distractor": false
        },
        {
          "word": "wash",
          "vi": "rửa",
          "distractor": false
        },
        {
          "word": "bathroom",
          "vi": "phòng tắm",
          "distractor": false
        },
        {
          "word": "living room",
          "vi": "phòng khách",
          "distractor": false
        },
        {
          "word": "garage",
          "vi": "nhà để xe",
          "distractor": true
        },
        {
          "word": "hate",
          "vi": "ghét",
          "distractor": true
        },
        {
          "word": "pool",
          "vi": "bể bơi",
          "distractor": true
        }
      ]
    }
  },
  "min_sentences": 6
};
