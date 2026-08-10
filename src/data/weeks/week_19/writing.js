export default {
  "title": "My Old Photo Album",
  "min_words": 50,
  "min_sentences": 8,
  "instruction_en": "Write about looking at old photos using was and were to describe the past!",
  "instruction_vi": "Viết về việc xem ảnh cũ dùng was và were để mô tả quá khứ!",
  "prompt_en": "What did you look like as a baby? What were you like? Who helped you feel safe?",
  "prompt_vi": "Bạn trông thế nào hồi bé? Bạn như thế nào? Ai giúp bạn cảm thấy an toàn?",
  "topic_talk_prompt": "Look at a photo of yourself as a baby — describe what you see!",
  "vocabulary_bank": [
    "sitting in the living room",
    "looking at an old photo album",
    "just a young tiny baby",
    "very small round and cute",
    "extremely noisy",
    "not quiet like my brother",
    "very brave and smart",
    "hold my hand and feel safe",
    "first day of kindergarten",
    "big blue school backpack",
    "very happy to wear",
    "a little shy and nervous",
    "tall strong and confident",
    "wonderful funny pictures"
  ],
  "sentence_frames": [
    {
      "template": "Today is ___ rainy afternoon, ___ I am sitting in the living room with my mother.",
      "answers": [
        "a",
        "word2"
      ]
    },
    {
      "template": "We are ___ at an ___ photo album also.",
      "answers": [
        "looking",
        "old"
      ]
    },
    {
      "template": "In this ___ picture, I ___ just a young, tiny baby.",
      "answers": [
        "first",
        "was"
      ]
    },
    {
      "template": "I was ___ small, round, ___ cute.",
      "answers": [
        "very",
        "and"
      ]
    },
    {
      "template": "My mother ___ I was ___ extremely noisy.",
      "answers": [
        "says",
        "also"
      ]
    },
    {
      "template": "I was ___ not quiet ___ my older brother.",
      "answers": [
        "definitely",
        "like"
      ]
    },
    {
      "template": "He was ___ brave and ___.",
      "answers": [
        "very",
        "smart"
      ]
    },
    {
      "template": "Whenever I ___ scared, he ___ always there to hold my hand at school.",
      "answers": [
        "was",
        "was"
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
          "word": "old photo album",
          "vi": "albums ảnh cũ",
          "distractor": false
        },
        {
          "word": "sitting in the living room",
          "vi": "ngồi trong phòng khách",
          "distractor": false
        },
        {
          "word": "looking at pictures",
          "vi": "xem ảnh",
          "distractor": false
        },
        {
          "word": "tiny baby",
          "vi": "em bé nhỏ xíu",
          "distractor": false
        },
        {
          "word": "very small and cute",
          "vi": "rất nhỏ và dễ thương",
          "distractor": false
        },
        {
          "word": "extremely noisy",
          "vi": "rất ồn ào",
          "distractor": false
        },
        {
          "word": "not quiet like my brother",
          "vi": "không yên tĩnh như em trai",
          "distractor": false
        },
        {
          "word": "very brave and smart",
          "vi": "rất dũng cảm và thông minh",
          "distractor": false
        },
        {
          "word": "hold my hand and feel safe",
          "vi": "nắm tay tôi và cảm thấy an toàn",
          "distractor": false
        },
        {
          "word": "first day of kindergarten",
          "vi": "ngày đầu tiên đi mẫu giáo",
          "distractor": false
        },
        {
          "word": "big blue school backpack",
          "vi": "ba lô xanh lớn",
          "distractor": false
        },
        {
          "word": "very happy to wear",
          "vi": "rất vui khi mặc",
          "distractor": false
        },
        {
          "word": "a little shy and nervous",
          "vi": "hơi nhút nhát và hồi hộp",
          "distractor": false
        },
        {
          "word": "tall strong and confident",
          "vi": "cao lớn và tự tin",
          "distractor": false
        },
        {
          "word": "wonderful funny pictures",
          "vi": "ảnh tuyệt vời và buồn cười",
          "distractor": false
        },
        {
          "word": "my grandmother is smiling",
          "vi": "bà tôi đang cười",
          "distractor": true
        },
        {
          "word": "a long time ago",
          "vi": "cách đây rất lâu",
          "distractor": true
        },
        {
          "word": "my dad looks young",
          "vi": "bố tôi trông trẻ",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week19/story_writing_pic.jpg",
      "image_prompt": "Today is a quiet, rainy afternoon, so I am sitting in the living room and looking at an old, heavy family photo album with my mother. In this very first picture, I was just a young, tiny baby. I was very small, round, and cute, but my mother always says that I was also extremely noisy! Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "sitting in the living room",
        "looking at an old photo album",
        "just a young tiny baby",
        "very small round and cute",
        "extremely noisy",
        "not quiet like my brother",
        "very brave and smart",
        "hold my hand and feel safe",
        "first day of kindergarten",
        "big blue school backpack",
        "very happy to wear",
        "a little shy and nervous",
        "tall strong and confident",
        "wonderful funny pictures"
      ],
      "writing_prompts": {
        "en": "Look at the picture. Who is looking at the photo album? What can you see in the old photos? Describe the baby, the brother, and the first day of school using was and were.",
        "vi": "Nhìn bức tranh. Ai đang xem album ảnh? Bạn thấy gì trong ảnh cũ? Mô tả em bé, anh trai, và ngày đầu tiên đi học dùng was và were."
      },
      "rubric_tier": 1,
      "sentence_frames": [
        {
          "template": "I am sitting in the ___ ___",
          "answers": [
            "living room",
            "then"
          ]
        },
        {
          "template": "I am looking at ___ ___",
          "answers": [
            "an old photo album",
            "also"
          ]
        },
        {
          "template": "In this picture, I am a ___ ___",
          "answers": [
            "tiny baby",
            "so"
          ]
        },
        {
          "template": "I look very ___ ___",
          "answers": [
            "small and cute",
            "next"
          ]
        },
        {
          "template": "My baby brother is ___ ___",
          "answers": [
            "extremely noisy",
            "finally"
          ]
        },
        {
          "template": "My big sister is ___ ___",
          "answers": [
            "very brave and smart",
            "slowly"
          ]
        },
        {
          "template": "On my first day of ___ ___",
          "answers": [
            "kindergarten",
            "happily"
          ]
        },
        {
          "template": "I am wearing my ___ ___",
          "answers": [
            "big blue backpack",
            "carefully"
          ]
        }
      ]
    }
  },
  "model_sentence": "Today is a rainy afternoon, word2 I am sitting in the living room with my mother. We are looking at an old photo album also. In this first picture, I was just a young, tiny baby. I was very small, round, and cute. My mother says I was also extremely noisy. I was definitely not quiet like my older brother. He was very brave and smart. Whenever I was scared, he was always there to hold my hand at school."
};
