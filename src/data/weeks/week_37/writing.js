export default {
  "title": "Speed Science & Olympic Peace — Sports Day Challenge",
  "min_sentences": 10,
  "theme": "sports_day",
  "min_words": 65,
  "model_sentence": "On Saturday morning, our class gathered at the crowded sports stadium for the relay race. At first, the blue team was leading, but our runners maintained high momentum. While Leo was sprinting at full speed, Max passed the baton cleanly without dropping it. Meanwhile, thousands of spectators were cheering loudly in the stands. Max sprinted fast along the red track with smooth acceleration. Out of breath, he pushed forward with strong determination. He crossed the finish line first and broke the school record! Scientific teamwork brought victory to our hard-working team. Everyone felt proud and happy as they received their golden trophy. We celebrated our great triumph together with huge smiles.",
  "topic_talk_prompt": "Tell me about a sports day race or Olympic story — how did you apply speed science or teamwork to win?",
  "sentence_frames": [
    {
      "template": "On Saturday morning, our class gathered at the _____ sports stadium for the relay race.",
      "answers": [
        "crowded"
      ]
    },
    {
      "template": "At first, the blue team was leading, but our runners maintained high _____.",
      "answers": [
        "momentum"
      ]
    },
    {
      "template": "While Leo was sprinting at full speed, Max _____ the baton cleanly without dropping it.",
      "answers": [
        "passed"
      ]
    },
    {
      "template": "_____, thousands of spectators were cheering loudly in the stands.",
      "answers": [
        "Meanwhile"
      ]
    },
    {
      "template": "Max _____ fast along the red track with smooth acceleration.",
      "answers": [
        "sprinted"
      ]
    },
    {
      "template": "Out of _____, he pushed forward with strong determination.",
      "answers": [
        "breath"
      ]
    },
    {
      "template": "He crossed the _____ line first and broke the school record!",
      "answers": [
        "finish"
      ]
    },
    {
      "template": "_____ brought victory to our hard-working team.",
      "answers": [
        "Scientific teamwork"
      ]
    },
    {
      "template": "Everyone felt _____ and happy as they received their golden trophy.",
      "answers": [
        "proud"
      ]
    },
    {
      "template": "We celebrated our great triumph together with _____ smiles.",
      "answers": [
        "huge"
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
          "word": "crowded",
          "vi": "đông đúc",
          "distractor": false
        },
        {
          "word": "momentum",
          "vi": "động năng",
          "distractor": false
        },
        {
          "word": "passed",
          "vi": "chuyền",
          "distractor": false
        },
        {
          "word": "Meanwhile",
          "vi": "Trong lúc đó",
          "distractor": false
        },
        {
          "word": "sprinted",
          "vi": "bứt tốc",
          "distractor": false
        },
        {
          "word": "breath",
          "vi": "hơi thở",
          "distractor": false
        },
        {
          "word": "finish",
          "vi": "đích",
          "distractor": false
        },
        {
          "word": "Scientific teamwork",
          "vi": "Tinh thần đồng đội khoa học",
          "distractor": false
        },
        {
          "word": "proud",
          "vi": "tự hào",
          "distractor": false
        },
        {
          "word": "huge",
          "vi": "rạng rỡ",
          "distractor": false
        },
        {
          "word": "slowly",
          "vi": "chậm chạp",
          "distractor": true
        },
        {
          "word": "lost",
          "vi": "thua",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week37/story_writing_pic.jpg",
      "image_prompt": "Runners in a sports day relay race at a crowded sports stadium. Max passes the baton cleanly while sprinting fast. Spectators cheering loudly. Watercolor children book illustration style.",
      "word_bank": {
        "action_verbs": [
          "relay race",
          "passed the baton",
          "sprinted fast",
          "crossed the finish line",
          "maintained high momentum"
        ],
        "cumulative_chunks": [
          "crowded sports stadium",
          "cheering loudly",
          "out of breath",
          "felt proud and happy",
          "broke the school record"
        ],
        "connectors": [
          "On Saturday morning",
          "At first",
          "Meanwhile",
          "Scientific teamwork brought victory",
          "Eventually"
        ],
        "grammar_boosters": [
          "while Leo was sprinting",
          "passed the baton cleanly",
          "with smooth acceleration"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe how runners used teamwork, passed the baton cleanly, and sprinted fast to win the sports day relay race.",
        "vi": "Nhìn bức tranh. Mô tả cách các vận động viên phối hợp đồng đội, chuyền gậy tiếp sức và bứt tốc để chiến thắng cuộc thi chạy tiếp sức."
      },
      "rubric_tier": 2
    }
  }
};
