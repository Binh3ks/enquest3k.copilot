export default {
  "title": "Save Our Park — Environmental Action",
  "min_sentences": 10,
  "theme": "environment",
  "min_words": 65,
  "model_sentence": "On a warm Saturday morning, Maya and Tom visited their favorite city park. They were sad to see plastic bottles and rubbish scattered on the green grass. Without hesitation, they decided to clean up the entire park together. First, they put on gloves and collected all the plastic waste into recycling bins. Next, they planted colorful flowers and young green trees near the pond. Thanks to their hard work, the park became clean and beautiful again. All the visitors smiled and applauded their wonderful effort. Maya and Tom felt extremely proud of protecting nature.",
  "topic_talk_prompt": "Tell me about what we can do to protect the environment and combat climate change!",
  "sentence_frames": [
    {
      "template": "On a warm Saturday morning, Maya and Tom visited their favorite _____ park.",
      "answers": [
        "city"
      ]
    },
    {
      "template": "They were sad to see plastic bottles and _____ scattered on the grass.",
      "answers": [
        "rubbish"
      ]
    },
    {
      "template": "Without _____, they decided to clean up the entire park.",
      "answers": [
        "hesitation"
      ]
    },
    {
      "template": "First, they put on _____ and collected plastic waste.",
      "answers": [
        "gloves"
      ]
    },
    {
      "template": "They threw the waste into _____ bins.",
      "answers": [
        "recycling"
      ]
    },
    {
      "template": "Next, they planted colorful flowers and young _____ trees.",
      "answers": [
        "green"
      ]
    },
    {
      "template": "Thanks to their hard work, the park became _____ again.",
      "answers": [
        "clean"
      ]
    },
    {
      "template": "All the visitors smiled and _____ their wonderful effort.",
      "answers": [
        "applauded"
      ]
    },
    {
      "template": "Maya and Tom felt _____ proud of their team.",
      "answers": [
        "extremely"
      ]
    },
    {
      "template": "They learned how important it is to protect _____.",
      "answers": [
        "nature"
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
          "word": "city",
          "vi": "thành phố",
          "distractor": false
        },
        {
          "word": "rubbish",
          "vi": "rác thải",
          "distractor": false
        },
        {
          "word": "hesitation",
          "vi": "do dự",
          "distractor": false
        },
        {
          "word": "gloves",
          "vi": "găng tay",
          "distractor": false
        },
        {
          "word": "recycling",
          "vi": "tái chế",
          "distractor": false
        },
        {
          "word": "green",
          "vi": "xanh lá",
          "distractor": false
        },
        {
          "word": "clean",
          "vi": "sạch sẽ",
          "distractor": false
        },
        {
          "word": "applauded",
          "vi": "vỗ tay hoan hô",
          "distractor": false
        },
        {
          "word": "extremely",
          "vi": "cực kỳ",
          "distractor": false
        },
        {
          "word": "nature",
          "vi": "thiên nhiên",
          "distractor": false
        },
        {
          "word": "destroy",
          "vi": "phá hỏng",
          "distractor": true
        },
        {
          "word": "carelessly",
          "vi": "bẩu ẩu",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week35/story_writing_pic.jpg",
      "image_prompt": "Maya and Tom cleaning their favorite city park on a warm Saturday morning, putting plastic bottles into recycling bins and planting green trees. Visitors applaud. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "plastic waste",
          "recycling bins",
          "planted green trees",
          "protect nature"
        ],
        "cumulative_chunks": [
          "favorite city park",
          "without hesitation",
          "felt extremely proud"
        ],
        "connectors": [
          "On a warm Saturday",
          "First",
          "Next",
          "Thanks to their hard work"
        ],
        "grammar_boosters": [
          "decided to clean up",
          "while they were planting"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how Maya and Tom collected plastic bottles, put them into recycling bins, and planted green trees to clean up their favorite city park.",
        "vi": "Nhìn bức tranh. Mô tả cách Maya và Tom nhặt chai nhựa, bỏ vào thùng tái chế và trồng cây xanh để dọn dẹp công viên thành phố yêu thích của họ."
      },
      "rubric_tier": 2
    }
  }
};
