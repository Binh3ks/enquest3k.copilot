export default {
  "title": "My Emotional Day",
  "min_words": 60,
  "min_sentences": 8,
  "model_sentence": "Yesterday was a very emotional day for me because I felt so many different things from morning to night. In the morning I felt very worried because I could not find my homework anywhere. My brother looked so angry because someone took his pencil, but our mum stayed very calm and helped us both look everywhere. I felt so relieved when I found the homework inside my school bag. At school the class felt very excited because there was a special visitor — it was a famous author! Everyone looked so surprised. During the long talk, some students felt very bored because the author spoke very slowly. After the snack, the children felt hungry and thirsty. By lunchtime, the whole class felt very cheerful again. At the end of the day I felt so tired but happy. What an emotional day!",
  "instruction_en": "Write about an emotional day from morning to night using because and feeling words!",
  "instruction_vi": "Viết về một ngày đầy cảm xúc từ sáng đến tối dùng because và từ cảm xúc!",
  "prompt_en": "What happened? How did you feel and why? How did the day end?",
  "prompt_vi": "Chuyện gì xảy ra? Bạn cảm thấy thế nào và tại sao? Ngày kết thúc thế nào?",
  "keywords": [
    "excited because",
    "amusement park",
    "terrified",
    "proud of myself",
    "brave enough",
    "hungry and thirsty",
    "bored and tired",
    "surprised and happy",
    "wonderful feelings",
    "exhausting day"
  ],
  "topic_talk_prompt": "Describe an emotional day — what feelings did you have and why?",
  "sentence_frames": [
    {
      "template": "I was very ___ because I saw a huge rollercoaster near the front ___ of the park.",
      "answers": [
        "excited",
        "entrance"
      ]
    },
    {
      "template": "But when we slowly ___ to the top of the steep ride, I was suddenly ___.",
      "answers": [
        "climbed",
        "terrified"
      ]
    },
    {
      "template": "I was really ___ because we were so high up in the ___.",
      "answers": [
        "scared",
        "sky"
      ]
    },
    {
      "template": "I felt incredibly ___ of myself because I was ___ enough to try it.",
      "answers": [
        "proud",
        "brave"
      ]
    },
    {
      "template": "By noon, we were walking under the hot ___ for hours, so I was very ___ and thirsty.",
      "answers": [
        "sun",
        "hungry"
      ]
    },
    {
      "template": "We waited in a very ___ line for a popular carnival ___.",
      "answers": [
        "long",
        "game"
      ]
    },
    {
      "template": "When my brother finally ___ the game and won a beautiful ___ for me, I was absolutely surprised.",
      "answers": [
        "played",
        "stuffed bear"
      ]
    },
    {
      "template": "It was a very long and ___ day, but my heart was full of ___ feelings.",
      "answers": [
        "exhausting",
        "wonderful"
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
          "word": "excited because",
          "vi": "hào hứng vì",
          "distractor": false
        },
        {
          "word": "amusement park",
          "vi": "công viên giải trí",
          "distractor": false
        },
        {
          "word": "slowly climbed",
          "vi": "leo chậm rãi",
          "distractor": false
        },
        {
          "word": "terrified",
          "vi": "kinh hoàng",
          "distractor": false
        },
        {
          "word": "proud of myself",
          "vi": "tự hào về bản thân",
          "distractor": false
        },
        {
          "word": "brave enough to try",
          "vi": "đủ can đảm để thử",
          "distractor": false
        },
        {
          "word": "hungry and thirsty",
          "vi": "đói và khát",
          "distractor": false
        },
        {
          "word": "cold lemonade",
          "vi": "nước chanh lạnh",
          "distractor": false
        },
        {
          "word": "long line",
          "vi": "hàng dài",
          "distractor": false
        },
        {
          "word": "bored and tired",
          "vi": "chán và mệt",
          "distractor": false
        },
        {
          "word": "stuffed bear",
          "vi": "gấu bông",
          "distractor": false
        },
        {
          "word": "surprised and happy",
          "vi": "ngạc nhiên và vui",
          "distractor": false
        },
        {
          "word": "exhausting day",
          "vi": "ngày kiệt sức",
          "distractor": false
        },
        {
          "word": "confused and angry",
          "vi": "bối rối và tức giận",
          "distractor": true
        },
        {
          "word": "quickly",
          "vi": "nhanh chóng",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week24/story_writing_pic.jpg",
      "image_prompt": "Yesterday, I went to a big, noisy amusement park with my funny older brother, and I went through a complete rollercoaster of different feelings! Early in the morning, I was very excited because I saw a huge, fast rollercoaster near the front entrance of the park. But when we slowly climbed to the top of the steep ride, I was suddenly terrified. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "excited because",
        "amusement park",
        "rollercoaster of feelings",
        "slowly climbed",
        "terrified",
        "proud of myself",
        "brave enough to try",
        "hungry and thirsty",
        "cold lemonade",
        "long line",
        "bored and tired",
        "stuffed bear",
        "surprised and happy",
        "exhausting day",
        "wonderful feelings"
      ],
      "writing_prompts": {
        "en": "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        "vi": "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      "rubric_tier": 1,
      "sentence_frames": [
        {
          "template": "In the morning I felt ___ ___",
          "answers": [
            "very worried",
            "then"
          ]
        },
        {
          "template": "My brother looked so ___ ___",
          "answers": [
            "angry",
            "also"
          ]
        },
        {
          "template": "But our mum stayed ___ ___",
          "answers": [
            "very calm",
            "so"
          ]
        },
        {
          "template": "I felt so ___ ___",
          "answers": [
            "relieved",
            "next"
          ]
        },
        {
          "template": "The class felt very ___ ___",
          "answers": [
            "excited",
            "finally"
          ]
        },
        {
          "template": "Some students felt ___ ___",
          "answers": [
            "very bored",
            "slowly"
          ]
        },
        {
          "template": "By lunchtime, everyone felt ___ ___",
          "answers": [
            "cheerful again",
            "happily"
          ]
        },
        {
          "template": "At the end of the day I felt ___ ___",
          "answers": [
            "tired but happy",
            "carefully"
          ]
        }
      ]
    }
  }
};
