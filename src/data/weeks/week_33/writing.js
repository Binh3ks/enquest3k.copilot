export default {
  "title": "Jake's Accident Story",
  "min_sentences": 10,
  "theme": "accidents_and_consequences",
  "min_words": 65,
  "model_sentence": "Last week, Jake walked too fast in the school corridor and fell down near the staircase. He hurt his knee badly. His teacher came and said, 'Walk carefully, Jake!' The nurse cleaned the wound and put a bandage on it. Jake learned an important lesson: always walk carefully in the corridor. We must walk carefully to stay safe!",
  "topic_talk_prompt": "Tell me about a time when you got hurt or saw someone get hurt at school!",
  "sentence_frames": [
    {
      "template": "Jake ___ too fast in the corridor and ___ down near the staircase.",
      "answers": [
        "walked",
        "fell"
      ]
    },
    {
      "template": "He ___ his knee and it ___ very badly.",
      "answers": [
        "hurt",
        "started to bleed"
      ]
    },
    {
      "template": "His teacher heard Jake ___ and ___ to help him right away.",
      "answers": [
        "crying",
        "ran"
      ]
    },
    {
      "template": "The nurse ___ the wound and ___ a bandage on Jake's knee.",
      "answers": [
        "cleaned",
        "put"
      ]
    },
    {
      "template": "Jake ___ to walk carefully after that because he ___ how painful it was.",
      "answers": [
        "learned",
        "understood"
      ]
    },
    {
      "template": "The teacher told Jake: 'Always ___ ___ in the corridor!'",
      "answers": [
        "walk",
        "carefully"
      ]
    },
    {
      "template": "Jake told everyone: '___ ___ in the corridor or you might fall and hurt yourself!'",
      "answers": [
        "Walk",
        "slowly"
      ]
    },
    {
      "template": "Now Jake always ___ carefully and never ___ in the corridor because he learned his lesson.",
      "answers": [
        "walks",
        "runs"
      ]
    },
    {
      "template": "Jake ___ too fast in the corridor and ___ down near the staircase.",
      "answers": [
        "walked",
        "fell"
      ]
    },
    {
      "template": "Jake ___ too fast in the corridor and ___ down near the staircase.",
      "answers": [
        "walked",
        "fell"
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
          "word": "walked",
          "vi": "đi bộ",
          "distractor": false
        },
        {
          "word": "ran",
          "vi": "chạy",
          "distractor": false
        },
        {
          "word": "fell",
          "vi": "ngã",
          "distractor": false
        },
        {
          "word": "hurt",
          "vi": "bị thương",
          "distractor": false
        },
        {
          "word": "began to bleed",
          "vi": "bắt đầu chảy máu",
          "distractor": false
        },
        {
          "word": "crying",
          "vi": "khóc",
          "distractor": false
        },
        {
          "word": "ran",
          "vi": "chạy đến",
          "distractor": false
        },
        {
          "word": "came",
          "vi": "đến",
          "distractor": false
        },
        {
          "word": "cleaned",
          "vi": "lau sạch",
          "distractor": false
        },
        {
          "word": "put",
          "vi": "đặt",
          "distractor": false
        },
        {
          "word": "learned",
          "vi": "học được",
          "distractor": false
        },
        {
          "word": "walk carefully",
          "vi": "đi cẩn thận",
          "distractor": false
        },
        {
          "word": "walks",
          "vi": "đi bộ",
          "distractor": false
        },
        {
          "word": "runs",
          "vi": "chạy",
          "distractor": false
        },
        {
          "word": "lesson",
          "vi": "bài học",
          "distractor": false
        },
        {
          "word": "slowly",
          "vi": "chậm rãi",
          "distractor": true
        },
        {
          "word": "faster",
          "vi": "nhanh hơn",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week33/story_writing_pic.jpg",
      "image_prompt": "This interesting picture shows a terrible and painful accident that happened at my school yesterday afternoon. My good friend Leo was running very fast down the main corridor because he was late for his important math class. He did not look carefully where he was going, and he completely ignored the strict school rules. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "running very fast down the corridor",
        "slipped on the wet floor",
        "fell down hard",
        "hit his left knee",
        "arm and leg hurt a lot",
        "started crying loudly",
        "kind teacher ran over",
        "cold ice pack from nurse's office",
        "gently put it on his knee",
        "explained his careless mistake",
        "I understand now",
        "walk slowly and safely",
        "learned a very important lesson",
        "recovered and felt much better",
        "ignoring the strict school rules"
      ],
      "writing_prompts": {
        "en": "Look at the picture. Your friend Leo had a terrible accident at school. Describe what happened from the moment he ran to the corridor until the teacher helped him. Use accident verbs like fell, hit, hurt, and caught.",
        "vi": "Nhìn bức tranh. Bạn Leo gặp tai nạn kinh khủng ở trường. Mô tả chuyện gì xảy ra từ lúc Leo chạy đến hành lang cho đến khi giáo viên giúp. Dùng các động từ tai nạn như fell, hit, hurt, và caught."
      },
      "rubric_tier": 2,
      "sentence_frames": [
        {
          "template": "Last week, Jake was running ___ ___",
          "answers": [
            "very fast down the corridor",
            "then"
          ]
        },
        {
          "template": "He slipped on the ___ ___",
          "answers": [
            "wet floor",
            "also"
          ]
        },
        {
          "template": "He fell down and ___ ___",
          "answers": [
            "hit his left knee",
            "so"
          ]
        },
        {
          "template": "His arm and leg ___ ___",
          "answers": [
            "hurt a lot",
            "next"
          ]
        },
        {
          "template": "He started ___ ___",
          "answers": [
            "crying loudly",
            "finally"
          ]
        },
        {
          "template": "His kind teacher ___ ___",
          "answers": [
            "ran over to help",
            "slowly"
          ]
        },
        {
          "template": "She put a cold ___ ___",
          "answers": [
            "ice pack on his knee",
            "happily"
          ]
        },
        {
          "template": "Jake learned to ___ ___",
          "answers": [
            "walk slowly and safely",
            "carefully"
          ]
        },
        {
          "template": "Last week, Jake was running ___ ___",
          "answers": [
            "very fast down the corridor",
            "then"
          ]
        },
        {
          "template": "Last week, Jake was running ___ ___",
          "answers": [
            "very fast down the corridor",
            "then"
          ]
        }
      ]
    }
  }
};
