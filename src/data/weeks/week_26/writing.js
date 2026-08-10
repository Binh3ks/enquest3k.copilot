export default {
  "title": "My Weekend Comic Strip",
  "min_words": 60,
  "min_sentences": 8,
  "model_sentence": "It was Sunday afternoon when Leo sat down with his pencils, paper, and a big smile. He had decided to create a comic strip about his great adventure-filled fun weekend. First of all, Leo wrote the title across the top of the paper: 'My Fun Weekend Adventure — by Leo.' In Panel One, Leo sketched the scene where he and his dog Max walked to the park on Saturday morning. In Panel Two, Leo drew Max chasing after a red ball across the green grass. In Panel Three, Leo drew the moment a street musician arrived and everyone stopped to watch. In Panel Four, Leo drew himself and Max walking home — both looking tired but happy. Mia looked over Leo's shoulder and smiled. 'This is wonderful,' she said. 'A good comic strip can express a big story in just a few small first panels.'",
  "instruction_en": "Write a weekend comic strip story with four clear panels — like Leo's adventure!",
  "instruction_vi": "Viết câu chuyện truyện tranh cuối tuần với bốn khung rõ ràng như cuộc phiêu lưu của Leo!",
  "prompt_en": "Use First of all, In Panel One, In Panel Two, In Panel Three, In Panel Four. Add lots of detail to each panel!",
  "prompt_vi": "Dùng First of all, In Panel One, In Panel Two, In Panel Three, In Panel Four. Thêm nhiều chi tiết cho mỗi khung!",
  "keywords": [
    "excited and full of energy",
    "long difficult game",
    "team won the match",
    "helped my mother cook",
    "felt really proud",
    "history museum",
    "amazing historical things",
    "funny comedy movie",
    "laughed a lot",
    "sweet popcorn",
    "wonderful feelings"
  ],
  "topic_talk_prompt": "Tell me your weekend story with four panels — like a comic strip!",
  "sentence_frames": [
    {
      "template": "On Saturday morning, I was very ___ and full of ___.",
      "answers": [
        "excited",
        "energy"
      ]
    },
    {
      "template": "I walked to the ___ park and played a long, difficult game of ___ with my best friends.",
      "answers": [
        "local",
        "soccer"
      ]
    },
    {
      "template": "We ran very fast, so I was quite ___, but I was also very ___ because my team won the match.",
      "answers": [
        "tired",
        "happy"
      ]
    },
    {
      "template": "In the afternoon, it rained ___, so I had to stay inside the quiet ___.",
      "answers": [
        "heavily",
        "house"
      ]
    },
    {
      "template": "I helped my ___ cook a big dinner for the ___. We made fried chicken.",
      "answers": [
        "mother",
        "family"
      ]
    },
    {
      "template": "On Sunday morning, my whole family visited an old ___ museum ___.",
      "answers": [
        "history",
        "downtown"
      ]
    },
    {
      "template": "There were many ___ historical things to see, like old clothes and ancient ___.",
      "answers": [
        "amazing",
        "weapons"
      ]
    },
    {
      "template": "Finally, we watched a funny comedy ___ at the cinema and we ___ a lot.",
      "answers": [
        "movie",
        "laughed"
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
          "word": "excited and full of energy",
          "vi": "hào hứng và tràn đầy năng lượng",
          "distractor": false
        },
        {
          "word": "local park",
          "vi": "công viên gần nhà",
          "distractor": false
        },
        {
          "word": "team won the match",
          "vi": "đội thắng trận",
          "distractor": false
        },
        {
          "word": "rained heavily",
          "vi": "mưa to",
          "distractor": false
        },
        {
          "word": "helped my mother cook",
          "vi": "giúp mẹ nấu ăn",
          "distractor": false
        },
        {
          "word": "felt really proud",
          "vi": "cảm thấy rất tự hào",
          "distractor": false
        },
        {
          "word": "history museum",
          "vi": "bảo tàng lịch sử",
          "distractor": false
        },
        {
          "word": "amazing historical things",
          "vi": "những hiện vật lịch sử tuyệt vời",
          "distractor": false
        },
        {
          "word": "ancient weapons",
          "vi": "vũ khí cổ đại",
          "distractor": false
        },
        {
          "word": "funny comedy movie",
          "vi": "phim hài vui nhộn",
          "distractor": false
        },
        {
          "word": "laughed a lot",
          "vi": "cười rất nhiều",
          "distractor": false
        },
        {
          "word": "sweet popcorn",
          "vi": "bỏng ngô ngọt",
          "distractor": false
        },
        {
          "word": "wonderful feelings",
          "vi": "cảm xúc tuyệt vời",
          "distractor": false
        },
        {
          "word": "a swimming pool",
          "vi": "hồ bơi",
          "distractor": true
        },
        {
          "word": "stayed home",
          "vi": "ở nhà",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week26/story_writing_pic.jpg",
      "image_prompt": "This is my personal weekend comic book, and I drew all the colorful pictures by myself! It tells a fun and exciting story about my different activities last weekend. First, on Saturday morning, I was very excited and full of energy. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "excited and full of energy",
        "local park",
        "team won the match",
        "rained heavily",
        "helped my mother cook",
        "felt really proud",
        "history museum",
        "amazing historical things",
        "ancient weapons",
        "funny comedy movie",
        "laughed a lot",
        "sweet popcorn",
        "wonderful feelings"
      ],
      "writing_prompts": {
        "en": "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        "vi": "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      "rubric_tier": 1,
      "sentence_frames": [
        {
          "template": "It was Sunday afternoon when Leo ___ ___",
          "answers": [
            "sat down with his pencils",
            "then"
          ]
        },
        {
          "template": "He had decided to create ___ ___",
          "answers": [
            "a comic strip",
            "also"
          ]
        },
        {
          "template": "First, he drew ___ ___",
          "answers": [
            "the characters",
            "so"
          ]
        },
        {
          "template": "Then he added ___ ___",
          "answers": [
            "speech bubbles",
            "next"
          ]
        },
        {
          "template": "The first panel showed ___ ___",
          "answers": [
            "a local park",
            "finally"
          ]
        },
        {
          "template": "In the second panel, ___ ___",
          "answers": [
            "it rained heavily",
            "slowly"
          ]
        },
        {
          "template": "The last panel showed ___ ___",
          "answers": [
            "the team won the match",
            "happily"
          ]
        },
        {
          "template": "Leo felt ___ ___",
          "answers": [
            "really proud",
            "carefully"
          ]
        }
      ]
    }
  }
};
