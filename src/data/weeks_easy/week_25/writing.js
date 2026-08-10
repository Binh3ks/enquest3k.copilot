export default {
  "title": "My Step-by-Step Guide",
  "min_words": 30,
  "model_sentence": "Here is how I make a jam sandwich. First of all I take two slices of bread. After that I spread strawberry jam on one slice. Then I press the two slices together. At the very end I cut it in half. Now I understand why the right sequence matters!",
  "instruction_en": "Write a step-by-step guide using First of all, After that, Then, At the very end!",
  "instruction_vi": "Viết hướng dẫn từng bước dùng First of all, After that, Then, At the very end!",
  "prompt_en": "What is your guide about? What are the steps from first to finally?",
  "prompt_vi": "Hướng dẫn của bạn về điều gì? Các bước từ đầu đến cuối là gì?",
  "keywords": [
    "sandwich",
    "slices",
    "bread",
    "jam",
    "spread",
    "cut",
    "right sequence"
  ],
  "topic_talk_prompt": "Give me a step-by-step guide for something you know how to do!",
  "sentence_frames": [
    {
      "template": "First of all I take two ___ of bread.",
      "answers": [
        "slices"
      ]
    },
    {
      "template": "After that I ___ strawberry jam on one slice.",
      "answers": [
        "spread"
      ]
    },
    {
      "template": "Then I press the two ___ together.",
      "answers": [
        "slices"
      ]
    },
    {
      "template": "At the very end I ___ it in half.",
      "answers": [
        "cut"
      ]
    },
    {
      "template": "Now I understand why the ___ and matters!",
      "answers": [
        "right sequence"
      ]
    },
    {
      "template": "If I ate first and spread jam later, it would be a ___!",
      "answers": [
        "disaster"
      ]
    },
    {
      "template": "First of all I take two ___ of bread.",
      "answers": [
        "slices"
      ]
    },
    {
      "template": "First of all I take two ___ of bread.",
      "answers": [
        "slices"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "Need help? Click next to each blank",
      "label_vi": "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      "show_by_default": true,
      "scaffolding_stage": "high",
      "words": [
        {
          "word": "slices of bread",
          "vi": "lát bánh mì",
          "distractor": false
        },
        {
          "word": "spread",
          "vi": "phết",
          "distractor": false
        },
        {
          "word": "strawberry jam",
          "vi": "mứt dâu tây",
          "distractor": false
        },
        {
          "word": "slices together",
          "vi": "lát bánh lại",
          "distractor": false
        },
        {
          "word": "cut it in half",
          "vi": "cắt làm đôi",
          "distractor": false
        },
        {
          "word": "right sequence",
          "vi": "trình tự đúng",
          "distractor": false
        },
        {
          "word": "disaster",
          "vi": "thảm họa",
          "distractor": false
        },
        {
          "word": "bags",
          "vi": "túi",
          "distractor": true
        },
        {
          "word": "pour",
          "vi": "đổ",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week25/story_writing_pic.jpg",
      "image_prompt": "A simple picture for week 25 story writing.",
      "word_bank": [
        "fresh bread",
        "green vegetables",
        "fried egg",
        "slice of cheese",
        "press gently",
        "wash hands",
        "clean table",
        "kitchen sink"
      ],
      "writing_prompts": {
        "en": "Look at the picture. What can you see? Write simply.",
        "vi": "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      "rubric_tier": 1,
      "min_sentences": 6,
      "sentence_frames": [
        {
          "template": "First, I got ___",
          "answers": [
            "two slices of bread"
          ]
        },
        {
          "template": "I spread ___",
          "answers": [
            "jam on the bread"
          ]
        },
        {
          "template": "I added ___",
          "answers": [
            "vegetables"
          ]
        },
        {
          "template": "I put it on a ___",
          "answers": [
            "clean plate"
          ]
        },
        {
          "template": "I cut it in ___",
          "answers": [
            "half"
          ]
        },
        {
          "template": "It was ___",
          "answers": [
            "delicious"
          ]
        },
        {
          "template": "First, I got ___",
          "answers": [
            "two slices of bread"
          ]
        },
        {
          "template": "First, I got ___",
          "answers": [
            "two slices of bread"
          ]
        }
      ]
    }
  },
  "min_sentences": 8
};
