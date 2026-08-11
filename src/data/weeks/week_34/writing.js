export default {
  "title": "The Ant and the Grasshopper — Fable & Work Ethic",
  "min_sentences": 10,
  "theme": "fable_and_moral",
  "min_words": 65,
  "model_sentence": "All summer long, on a bright sunny summer day, the tiny ant worked hard while gathering food grain by grain. Meanwhile, the lazy grasshopper sat near the ice-cold water stream and sang cheerfully under the warm sun. Suddenly, dark clouds covered the sky and the warm days disappeared quickly. When winter came, heavy snow fell all over the forest and winter arrived. The helpless grasshopper had no food left and was shivering in cold. He felt deeply worried and slowly walked to the ant's cozy house. The kind ant invited him inside and shared her warm food with him. The grasshopper was touched by her kindness and felt extremely relieved. Eventually, he learned a valuable lesson to work hard before winter. From that day on, he always worked hard to prepare for the future.",
  "topic_talk_prompt": "Tell me about a time when you worked hard with your friends to finish a project!",
  "sentence_frames": [
    {
      "template": "All summer long, on a _____ summer day, the tiny ant worked hard while gathering food grain by grain.",
      "answers": [
        "bright sunny"
      ]
    },
    {
      "template": "Meanwhile, the lazy grasshopper sat near the _____ water stream and sang cheerfully.",
      "answers": [
        "ice-cold"
      ]
    },
    {
      "template": "_____, dark clouds covered the sky and the warm days disappeared quickly.",
      "answers": [
        "Suddenly"
      ]
    },
    {
      "template": "When winter came, heavy snow fell all over the forest and winter _____.",
      "answers": [
        "arrived"
      ]
    },
    {
      "template": "The helpless grasshopper had no food left and was _____ in cold.",
      "answers": [
        "shivering"
      ]
    },
    {
      "template": "He felt _____ worried and slowly walked to the ant's cozy house.",
      "answers": [
        "deeply"
      ]
    },
    {
      "template": "The kind ant invited him inside and _____ her warm food with him.",
      "answers": [
        "shared"
      ]
    },
    {
      "template": "The grasshopper was touched by her kindness and felt _____ relieved.",
      "answers": [
        "extremely"
      ]
    },
    {
      "template": "_____, he learned a valuable lesson to work hard before winter.",
      "answers": [
        "Eventually"
      ]
    },
    {
      "template": "From that day on, he always worked _____ to prepare for the future.",
      "answers": [
        "hard"
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
          "word": "bright sunny",
          "vi": "nắng hè rực rỡ",
          "distractor": false
        },
        {
          "word": "ice-cold",
          "vi": "lạnh như băng",
          "distractor": false
        },
        {
          "word": "Suddenly",
          "vi": "Đột nhiên",
          "distractor": false
        },
        {
          "word": "arrived",
          "vi": "đã đến",
          "distractor": false
        },
        {
          "word": "shivering",
          "vi": "run rẩy",
          "distractor": false
        },
        {
          "word": "deeply",
          "vi": "sâu sắc",
          "distractor": false
        },
        {
          "word": "shared",
          "vi": "chia sẻ",
          "distractor": false
        },
        {
          "word": "extremely",
          "vi": "cực kỳ",
          "distractor": false
        },
        {
          "word": "Eventually",
          "vi": "Rốt cuộc",
          "distractor": false
        },
        {
          "word": "hard",
          "vi": "chăm chỉ",
          "distractor": false
        },
        {
          "word": "slowly",
          "vi": "chậm rãi",
          "distractor": true
        },
        {
          "word": "delicious",
          "vi": "ngon miệng",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week34/story_writing_pic.jpg",
      "image_prompt": "In our fun English storytelling class today, my group presented the fable of the Ant and the Grasshopper. The ant gathered food grain by grain during bright sunny summer while the grasshopper sang cheerfully. When winter came, the grasshopper was shivering in cold. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "gathered food",
          "grain by grain",
          "sang cheerfully",
          "shivering in cold",
          "shared warm food"
        ],
        "cumulative_chunks": [
          "bright sunny summer",
          "ice-cold water",
          "felt deeply worried",
          "felt extremely relieved",
          "valuable lesson"
        ],
        "connectors": [
          "All summer long",
          "Meanwhile",
          "Suddenly",
          "When winter came",
          "Eventually"
        ],
        "grammar_boosters": [
          "while gathering food",
          "while the ant was working",
          "so that he could survive"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how the ant gathered food during summer while the grasshopper sang cheerfully, and what happened when winter arrived.",
        "vi": "Nhìn bức tranh. Mô tả cách chú kiến tích trữ thức ăn trong mùa hè trong khi chú châu chấu ca hát, và chuyện gì xảy ra khi mùa đông đến."
      },
      "rubric_tier": 2
    }
  }
};
