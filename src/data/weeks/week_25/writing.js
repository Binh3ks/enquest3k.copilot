export default {
  "title": "My Step-by-Step Guide",
  "min_words": 60,
  "min_sentences": 8,
  "model_sentence": "First, you take two pieces of fresh, soft bread and put them neatly on a clean plate. Next, you must wash the green vegetables very carefully so they are completely clean. Then, you can add some delicious cold meat, a fried egg, or some healthy tuna. After that, you put a thick slice of yellow cheese on top of the meat so it tastes even better. Finally, you place the second piece of bread on top of everything and press it down gently with your hands. Always remember to wash your hands with soap and water to keep them clean. I really love making my own sandwiches because it is very easy, it saves time, and they always taste absolutely great. After you finish eating, you should clean the table and put your dirty plate in the kitchen sink.",
  "instruction_en": "Write a step-by-step guide using First of all, After that, and At the very end!",
  "instruction_vi": "Viết hướng dẫn từng bước dùng First of all, After that, At the very end!",
  "prompt_en": "What are you guiding someone to do? What are all the steps in the right sequence?",
  "prompt_vi": "Bạn đang hướng dẫn ai làm gì? Tất cả các bước theo trình tự đúng là gì?",
  "keywords": [
    "simple steps",
    "fresh soft bread",
    "green vegetables",
    "cold meat",
    "fried egg",
    "thick slice of yellow cheese",
    "place on top",
    "press it down gently",
    "wash your hands",
    "clean the table"
  ],
  "topic_talk_prompt": "Give me a really detailed step-by-step guide for your favourite thing to make!",
  "sentence_frames": [
    {
      "template": "First, you ___ two pieces ___ fresh, soft bread and put them neatly on a clean plate.",
      "answers": [
        "take",
        "of"
      ]
    },
    {
      "template": "Next, you ___ wash the ___ vegetables very carefully so they are completely clean.",
      "answers": [
        "must",
        "green"
      ]
    },
    {
      "template": "Then, you ___ add some ___ cold meat, a fried egg, or some healthy tuna.",
      "answers": [
        "can",
        "delicious"
      ]
    },
    {
      "template": "After that, ___ put a ___ slice of yellow cheese on top of the meat so it tastes even better.",
      "answers": [
        "you",
        "thick"
      ]
    },
    {
      "template": "Finally, you ___ the second ___ of bread on top of everything and press it down gently with your hands.",
      "answers": [
        "place",
        "piece"
      ]
    },
    {
      "template": "Always remember ___ wash your ___ with soap and water to keep them clean.",
      "answers": [
        "to",
        "hands"
      ]
    },
    {
      "template": "I really ___ making my ___ sandwiches because it is very easy, it saves time, and they always taste absolutely great.",
      "answers": [
        "love",
        "own"
      ]
    },
    {
      "template": "After you ___ eating, you ___ clean the table and put your dirty plate in the kitchen sink.",
      "answers": [
        "finish",
        "should"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "Need help? Click next to each blank",
      "label_vi": "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        {
          "word": "fresh, soft bread",
          "vi": "bánh mì tươi mềm",
          "distractor": false
        },
        {
          "word": "clean plate",
          "vi": "đĩa sạch",
          "distractor": false
        },
        {
          "word": "green vegetables",
          "vi": "rau xanh",
          "distractor": false
        },
        {
          "word": "cold meat",
          "vi": "thịt nguội",
          "distractor": false
        },
        {
          "word": "healthy tuna",
          "vi": "cá ngừ bổ dưỡng",
          "distractor": false
        },
        {
          "word": "thick slice of cheese",
          "vi": "lát phô mai dày",
          "distractor": false
        },
        {
          "word": "press it down gently",
          "vi": "nhẹ nhàng ép xuống",
          "distractor": false
        },
        {
          "word": "wash your hands",
          "vi": "rửa tay",
          "distractor": false
        },
        {
          "word": "saves time",
          "vi": "tiết kiệm thời gian",
          "distractor": false
        },
        {
          "word": "taste absolutely great",
          "vi": "vô cùng ngon",
          "distractor": false
        },
        {
          "word": "clean the table",
          "vi": "lau bàn",
          "distractor": false
        },
        {
          "word": "kitchen sink",
          "vi": "bồn rửa bát",
          "distractor": false
        },
        {
          "word": "wash the dishes",
          "vi": "rửa bát",
          "distractor": false
        },
        {
          "word": "a dirty sock",
          "vi": "tất bẩn",
          "distractor": true
        },
        {
          "word": "beautiful",
          "vi": "đẹp",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week25/story_writing_pic.jpg",
      "image_prompt": "Today, I want to teach you how to make a perfect, delicious sandwich for a fun weekend picnic with your friends. You just need to follow these simple steps in the right order. First, you take two pieces of fresh, soft bread and put them neatly on a clean plate. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "simple steps",
        "fresh soft bread",
        "clean plate",
        "green vegetables",
        "cold meat",
        "fried egg",
        "thick slice of cheese",
        "place on top",
        "press it down gently",
        "wash your hands",
        "clean the table",
        "kitchen sink"
      ],
      "writing_prompts": {
        "en": "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        "vi": "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      "rubric_tier": 1,
      "sentence_frames": [
        {
          "template": "First of all, I grabbed ___ ___",
          "answers": [
            "two slices of bread",
            "then"
          ]
        },
        {
          "template": "I put the bread on a ___ ___",
          "answers": [
            "clean plate",
            "also"
          ]
        },
        {
          "template": "Then I spread ___ ___",
          "answers": [
            "jam on the bread",
            "so"
          ]
        },
        {
          "template": "I added some ___ ___",
          "answers": [
            "green vegetables",
            "next"
          ]
        },
        {
          "template": "I placed a thick slice of ___ ___",
          "answers": [
            "cheese",
            "finally"
          ]
        },
        {
          "template": "I pressed it down ___ ___",
          "answers": [
            "gently",
            "slowly"
          ]
        },
        {
          "template": "Then I cut the sandwich ___ ___",
          "answers": [
            "in half",
            "happily"
          ]
        },
        {
          "template": "I washed my hands and ___ ___",
          "answers": [
            "enjoyed my sandwich",
            "carefully"
          ]
        }
      ]
    }
  }
};
