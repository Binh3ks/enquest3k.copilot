export default {
  "title": "My Weekend Comic Strip",
  "min_words": 60,
  "min_sentences": 8,
  "model_sentence": "On Saturday morning I was very excited and full of energy. I walked to the local park and played a long, difficult game of soccer with my best friends. We ran very fast, so I was quite tired, but I was also very happy because my team won the match. In the afternoon it rained heavily so I had to stay inside the quiet house. I helped my mother cook a big dinner for the family. We made fried chicken. On Sunday morning my whole family visited an old history museum downtown. There were many amazing historical things to see, like old clothes and ancient weapons. Finally, we watched a funny comedy movie at the cinema and we laughed a lot.",
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
      "template": "On Saturday ___ I was ___ excited and full of energy.",
      "answers": [
        "morning",
        "very"
      ]
    },
    {
      "template": "I walked ___ the local ___ and played a long, difficult game of soccer with my best friends.",
      "answers": [
        "to",
        "park"
      ]
    },
    {
      "template": "We ran ___ fast, so ___ was quite tired, but I was also very happy because my team won the match.",
      "answers": [
        "very",
        "I"
      ]
    },
    {
      "template": "In the ___ it rained ___ so I had to stay inside the quiet house.",
      "answers": [
        "afternoon",
        "heavily"
      ]
    },
    {
      "template": "I helped ___ mother cook ___ big dinner for the family. We made fried chicken.",
      "answers": [
        "my",
        "a"
      ]
    },
    {
      "template": "On Sunday ___ my whole ___ visited an old history museum downtown.",
      "answers": [
        "morning",
        "family"
      ]
    },
    {
      "template": "There were ___ amazing historical ___ to see, like old clothes and ancient weapons.",
      "answers": [
        "many",
        "things"
      ]
    },
    {
      "template": "Finally, we ___ a funny ___ movie at the cinema and we laughed a lot.",
      "answers": [
        "watched",
        "comedy"
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
