export default {
  "title": "Writing: My Family Picnic Story",
  "audio_url": null,
  "min_words": 65,
  "min_sentences": 10,
  "model_sentence": "Last Sunday, my family went on a picnic at the park. We found a perfect grassy spot under a big tree. Mum brought delicious sandwiches and fresh fruit. We drank cold lemonade and played games. Suddenly, dark grey clouds appeared in the sky. It started to rain, so we quickly ran to the shelter. Although it rained, we still had a wonderful time. We packed our things and returned home safely. My parents were happy with our fun weekend trip. We cannot wait for our next family picnic!",
  "instruction_en": "Write about a family picnic from start to finish in full, clear sentences!",
  "instruction_vi": "Viết về buổi dã ngoại gia đình từ đầu đến cuối bằng các câu rõ ràng, đầy đủ!",
  "prompt_en": "Where did you go? What food did you bring? What happened when it rained?",
  "prompt_vi": "Bạn đã đi đâu? Bạn mang thức ăn gì? Chuyện gì xảy ra khi trời mưa?",
  "keywords": [
    "picnic",
    "grassy spot",
    "sandwiches",
    "lemonade",
    "clouds",
    "shelter",
    "wonderful time"
  ],
  "topic_talk_prompt": "Tell me about a memorable family picnic you had!",
  "sentence_frames": [
    {
      "template": "Last Sunday, my family went on a ___ at the park.",
      "answers": [
        "picnic"
      ]
    },
    {
      "template": "We found a perfect grassy spot under a big ___.",
      "answers": [
        "tree"
      ]
    },
    {
      "template": "Mum brought delicious ___ and fresh fruit.",
      "answers": [
        "sandwiches"
      ]
    },
    {
      "template": "We drank cold lemonade and played ___.",
      "answers": [
        "games"
      ]
    },
    {
      "template": "Suddenly, dark grey ___ appeared in the sky.",
      "answers": [
        "clouds"
      ]
    },
    {
      "template": "It started to rain, so we quickly ran to the ___.",
      "answers": [
        "shelter"
      ]
    },
    {
      "template": "Although it rained, we still had a ___ time.",
      "answers": [
        "wonderful"
      ]
    },
    {
      "template": "We packed our things and returned home ___.",
      "answers": [
        "safely"
      ]
    },
    {
      "template": "My parents were happy with our fun weekend ___.",
      "answers": [
        "trip"
      ]
    },
    {
      "template": "We cannot wait for our next family ___!",
      "answers": [
        "picnic"
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
          "word": "picnic",
          "vi": "buổi dã ngoại",
          "distractor": false
        },
        {
          "word": "tree",
          "vi": "cây lớn",
          "distractor": false
        },
        {
          "word": "sandwiches",
          "vi": "bánh mì kẹp",
          "distractor": false
        },
        {
          "word": "games",
          "vi": "trò chơi",
          "distractor": false
        },
        {
          "word": "clouds",
          "vi": "mây đen",
          "distractor": false
        },
        {
          "word": "shelter",
          "vi": "nơi trú ẩn",
          "distractor": false
        },
        {
          "word": "wonderful",
          "vi": "tuyệt vời",
          "distractor": false
        },
        {
          "word": "safely",
          "vi": "an toàn",
          "distractor": false
        },
        {
          "word": "trip",
          "vi": "chuyến đi",
          "distractor": false
        },
        {
          "word": "movie",
          "vi": "phim",
          "distractor": true
        },
        {
          "word": "sleeping",
          "vi": "ngủ",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week30/story_writing_pic.jpg",
      "image_prompt": "A beautiful watercolor illustration of a happy family having a picnic under a large green tree in the park, with sandwiches and cold lemonade laid out on a checkered blanket.",
      "word_bank": [
        "picnic at the park",
        "grassy spot",
        "delicious sandwiches",
        "fresh fruit",
        "cold lemonade",
        "played games together",
        "dark grey clouds",
        "ran to the shelter",
        "wonderful time",
        "returned home safely"
      ],
      "writing_prompts": {
        "en": "Look at the picture and describe the family picnic. What food did they bring? What happened when it rained?",
        "vi": "Nhìn bức tranh và mô tả buổi dã ngoại gia đình. Họ mang thức ăn gì? Chuyện gì xảy ra khi trời mưa?"
      },
      "rubric_tier": 1,
      "min_sentences": 10,
      "sentence_frames": [
        {
          "template": "Last Sunday, my family went on a ___ at the park.",
          "answers": [
            "picnic"
          ]
        },
        {
          "template": "We found a perfect grassy spot under a big ___.",
          "answers": [
            "tree"
          ]
        },
        {
          "template": "Mum brought delicious ___ and fresh fruit.",
          "answers": [
            "sandwiches"
          ]
        },
        {
          "template": "We drank cold lemonade and played ___ together.",
          "answers": [
            "games"
          ]
        },
        {
          "template": "Suddenly, dark grey ___ appeared in the sky.",
          "answers": [
            "clouds"
          ]
        },
        {
          "template": "It started to rain, so we quickly ran to the ___.",
          "answers": [
            "shelter"
          ]
        },
        {
          "template": "Although it rained, we still had a ___ time.",
          "answers": [
            "wonderful"
          ]
        },
        {
          "template": "We packed our things and returned home ___.",
          "answers": [
            "safely"
          ]
        },
        {
          "template": "My parents were happy with our fun weekend ___.",
          "answers": [
            "trip"
          ]
        },
        {
          "template": "We cannot wait for our next family ___!",
          "answers": [
            "picnic"
          ]
        }
      ]
    }
  }
};
