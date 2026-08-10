export default {
  "title": "How a Seed Grows",
  "min_words": 32,
  "model_sentence": "First a seed is planted in soil. It needs water and sunlight. Next a tiny stem grows up. Then leaves appear. A bright yellow flower blooms. Finally the flower is truly magical. First a seed is planted in soil. First a seed is planted in soil.",
  "instruction_en": "Describe how a seed grows step by step!",
  "instruction_vi": "Mô tả cách một hạt giống mọc lên theo từng bước!",
  "prompt_en": "What happens first? What does the seed need? What comes next?",
  "prompt_vi": "Điều gì xảy ra đầu tiên? Hạt giống cần gì? Tiếp theo là gì?",
  "keywords": [
    "seed",
    "soil",
    "water",
    "sunlight",
    "shoot",
    "leaves",
    "flower",
    "blooms"
  ],
  "topic_talk_prompt": "Explain how a seed grows into a plant step by step!",
  "sentence_frames": [
    {
      "template": "First a seed is ___ in soil.",
      "answers": [
        "planted"
      ]
    },
    {
      "template": "It needs ___ and sunlight.",
      "answers": [
        "water"
      ]
    },
    {
      "template": "Next a tiny ___ grows up.",
      "answers": [
        "stem"
      ]
    },
    {
      "template": "Then ___ appear.",
      "answers": [
        "leaves"
      ]
    },
    {
      "template": "A bright yellow ___ blooms.",
      "answers": [
        "flower"
      ]
    },
    {
      "template": "Finally the flower is truly ___.",
      "answers": [
        "magical"
      ]
    },
    {
      "template": "First a seed is ___ in soil.",
      "answers": [
        "planted"
      ]
    },
    {
      "template": "First a seed is ___ in soil.",
      "answers": [
        "planted"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "high",
      "words": [
        {
          "word": "planted",
          "vi": "được trồng",
          "distractor": false
        },
        {
          "word": "water",
          "vi": "nước",
          "distractor": false
        },
        {
          "word": "shoot",
          "vi": "mầm cây",
          "distractor": false
        },
        {
          "word": "leaves",
          "vi": "lá",
          "distractor": false
        },
        {
          "word": "blooms",
          "vi": "nở hoa",
          "distractor": false
        },
        {
          "word": "thrown",
          "vi": "bị ném",
          "distractor": true
        },
        {
          "word": "fire",
          "vi": "lửa",
          "distractor": true
        },
        {
          "word": "falls",
          "vi": "rụng xuống",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week27/story_writing_pic.jpg",
      "image_prompt": "A simple picture for week 27 story writing.",
      "word_bank": [
        "tiny seed",
        "dark ground",
        "strong root",
        "green stem",
        "warm sunlight",
        "green leaves",
        "bright flower",
        "my own garden"
      ],
      "writing_prompts": {
        "en": "Look at the picture. What can you see? Write simply.",
        "vi": "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      "rubric_tier": 1,
      "min_sentences": 6,
      "sentence_frames": [
        {
          "template": "First, you plant a ___",
          "answers": [
            "seed"
          ]
        },
        {
          "template": "A strong ___",
          "answers": [
            "root grows"
          ]
        },
        {
          "template": "Then a green ___",
          "answers": [
            "stem appears"
          ]
        },
        {
          "template": "The plant needs ___",
          "answers": [
            "warm sunlight"
          ]
        },
        {
          "template": "Broad green ___",
          "answers": [
            "leaves grow"
          ]
        },
        {
          "template": "A bright yellow ___",
          "answers": [
            "flower blooms"
          ]
        },
        {
          "template": "First, you plant a ___",
          "answers": [
            "seed"
          ]
        },
        {
          "template": "First, you plant a ___",
          "answers": [
            "seed"
          ]
        }
      ]
    }
  },
  "min_sentences": 8
};
