export default {
  "title": "Max's Diary - Yesterday",
  "min_words": 55,
  "min_sentences": 8,
  "instruction_en": "Write about your yesterday in full detail using past tense — morning to night!",
  "instruction_vi": "Viết về hôm qua chi tiết bằng thì quá khứ — từ sáng đến tối!",
  "model_sentence": "Yesterday, I woke up at 630 a.m then. First, I made my bed and cleaned my room because I wanted everything tidy also. Then I wrote a letter to my grandmother because I missed her very much so. After that, I helped Dad cut the grass in the garden. We built a beautiful birdhouse together using old wood and nails. At the cafe I chose a chocolate muffin because I was so hungry. I paid for the muffin with my own money because I am growing up!. By evening, I put all my toys away and fell asleep early carefully at school.",
  "prompt_en": "What did you do morning, afternoon, and evening? How did you feel at the end?",
  "prompt_vi": "Bạn đã làm gì sáng, chiều, tối? Cuối ngày bạn cảm thấy thế nào?",
  "topic_talk_prompt": "Tell me everything you did yesterday from morning to night!",
  "sentence_frames": [
    {
      "template": "Yesterday, I ___ up at ___ a.m then.",
      "answers": [
        "woke",
        "630"
      ]
    },
    {
      "template": "First, I ___ my bed ___ cleaned my room because I wanted everything tidy also.",
      "answers": [
        "made",
        "and"
      ]
    },
    {
      "template": "Then I ___ a letter ___ my grandmother because I missed her very much so.",
      "answers": [
        "wrote",
        "to"
      ]
    },
    {
      "template": "After that, ___ helped Dad ___ the grass in the garden.",
      "answers": [
        "I",
        "cut"
      ]
    },
    {
      "template": "We built ___ beautiful birdhouse ___ using old wood and nails.",
      "answers": [
        "a",
        "together"
      ]
    },
    {
      "template": "At the ___ I chose ___ chocolate muffin because I was so hungry.",
      "answers": [
        "cafe",
        "a"
      ]
    },
    {
      "template": "I paid ___ the muffin ___ my own money because I am growing up!.",
      "answers": [
        "for",
        "with"
      ]
    },
    {
      "template": "By evening, ___ put all ___ toys away and fell asleep early carefully at school.",
      "answers": [
        "I",
        "my"
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
          "word": "walked slowly",
          "vi": "đi chậm",
          "distractor": false
        },
        {
          "word": "talked happily",
          "vi": "nói chuyện vui vẻ",
          "distractor": false
        },
        {
          "word": "listened carefully",
          "vi": "nghe kỹ",
          "distractor": false
        },
        {
          "word": "worked hard",
          "vi": "làm việc chăm chỉ",
          "distractor": false
        },
        {
          "word": "helped my mother",
          "vi": "giúp mẹ",
          "distractor": false
        },
        {
          "word": "cooked dinner",
          "vi": "nấu bữa tối",
          "distractor": false
        },
        {
          "word": "washed vegetables",
          "vi": "rửa rau",
          "distractor": false
        },
        {
          "word": "cleaned the table",
          "vi": "lau bàn",
          "distractor": false
        },
        {
          "word": "played board game",
          "vi": "chơi trò chơi bàn",
          "distractor": false
        },
        {
          "word": "watched a movie",
          "vi": "xem phim",
          "distractor": false
        },
        {
          "word": "slept very well",
          "vi": "ngủ rất ngon",
          "distractor": false
        },
        {
          "word": "woke up early",
          "vi": "thức dậy sớm",
          "distractor": false
        },
        {
          "word": "brushed my teeth",
          "vi": "đánh răng",
          "distractor": false
        },
        {
          "word": "packed my bag",
          "vi": "dọn ba lô",
          "distractor": false
        },
        {
          "word": "walked to school",
          "vi": "đi bộ đến trường",
          "distractor": false
        },
        {
          "word": "ate breakfast quickly",
          "vi": "ăn sáng nhanh",
          "distractor": true
        },
        {
          "word": "did my homework",
          "vi": "làm bài tập về nhà",
          "distractor": true
        },
        {
          "word": "studied in the evening",
          "vi": "học buổi tối",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week21/story_writing_pic.jpg",
      "image_prompt": "This is a page from my personal diary, and it is all about my day yesterday. It was a very busy but incredibly happy day for me. In the morning, I walked slowly to school with my best friend, and we talked happily about our English homework. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "best friend",
        "walked slowly",
        "talked happily",
        "listened carefully",
        "kind teacher",
        "worked hard",
        "helped my mother",
        "bright kitchen",
        "cooked dinner",
        "washed vegetables",
        "cleaned the table",
        "fun board game",
        "younger brother",
        "watched a movie",
        "slept very well"
      ],
      "writing_prompts": {
        "en": "Look at the picture. This is a diary page about yesterday. Describe your day from morning to night using past tense verbs like walked, listened, helped, and cooked.",
        "vi": "Nhìn bức tranh. Đây là trang nhật ký về hôm qua. Hãy mô tả ngày hôm qua từ sáng đến tối dùng các động từ quá khứ như walked, listened, helped, cooked."
      },
      "rubric_tier": 1,
      "min_sentences": 8,
      "sentence_frames": [
        {
          "template": "Yesterday morning, I ___ ___",
          "answers": [
            "woke up early",
            "then"
          ]
        },
        {
          "template": "First, I ___ ___",
          "answers": [
            "made my bed",
            "also"
          ]
        },
        {
          "template": "Then I ___ ___",
          "answers": [
            "wrote a letter",
            "so"
          ]
        },
        {
          "template": "After that, I ___ ___",
          "answers": [
            "helped my mother",
            "next"
          ]
        },
        {
          "template": "We ___ ___",
          "answers": [
            "built a birdhouse",
            "finally"
          ]
        },
        {
          "template": "At the café, I ___ ___",
          "answers": [
            "chose a muffin",
            "slowly"
          ]
        },
        {
          "template": "I paid for ___ ___",
          "answers": [
            "the muffin",
            "happily"
          ]
        },
        {
          "template": "By evening, I ___ ___",
          "answers": [
            "fell asleep early",
            "carefully"
          ]
        }
      ]
    }
  }
};
