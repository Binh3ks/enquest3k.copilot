export default {
  "title": "The Mirror Game",
  "min_words": 45,
  "model_sentence": "My best friend is Tom and he is tall with short curly hair. His hair is dark brown and his eyes are bright green. He wears round glasses because he cannot see well without them. He always wears a red cap and a blue jacket to school. He is slim but very strong because he trains every day. Everyone recognises him because he looks so unique and cool.",
  "instruction_en": "Describe your best friend from head to toe!",
  "instruction_vi": "Mô tả người bạn thân từ đầu đến chân!",
  "prompt_en": "What does your friend look like? What do they wear? What makes them unique?",
  "prompt_vi": "Bạn của bạn trông thế nào? Họ mặc gì? Điều gì làm họ độc đáo?",
  "keywords": [
    "tall",
    "short curly hair",
    "dark brown",
    "bright green",
    "round glasses",
    "red cap",
    "blue jacket",
    "slim",
    "strong",
    "trains every day",
    "unique",
    "cool"
  ],
  "topic_talk_prompt": "Describe your best friend's appearance in full detail!",
  "sentence_frames": [
    {
      "template": "My best friend is Tom and he is tall with short curly ___ ___ .",
      "answers": [
        "hair",
        "then"
      ]
    },
    {
      "template": "His hair is dark brown and his eyes are bright ___ ___ .",
      "answers": [
        "green",
        "also"
      ]
    },
    {
      "template": "He wears round glasses because he cannot ___ well without them ___ .",
      "answers": [
        "see",
        "so"
      ]
    },
    {
      "template": "He always wears a red cap and a blue ___ to school ___ .",
      "answers": [
        "jacket",
        "next"
      ]
    },
    {
      "template": "He is slim but very ___ because he trains every day ___ .",
      "answers": [
        "strong",
        "finally"
      ]
    },
    {
      "template": "He looks very unique and everyone ___ him ___ .",
      "answers": [
        "recognizes",
        "slowly"
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
          "word": "Tom",
          "vi": "",
          "distractor": false
        },
        {
          "word": "tall",
          "vi": "cao",
          "distractor": false
        },
        {
          "word": "short curly hair",
          "vi": "tóc ngắn xoăn",
          "distractor": false
        },
        {
          "word": "dark brown",
          "vi": "nâu đậm",
          "distractor": false
        },
        {
          "word": "bright green",
          "vi": "xanh lá sáng",
          "distractor": false
        },
        {
          "word": "round glasses",
          "vi": "kính tròn",
          "distractor": false
        },
        {
          "word": "see well",
          "vi": "nhìn rõ",
          "distractor": false
        },
        {
          "word": "red cap",
          "vi": "mũ đỏ",
          "distractor": false
        },
        {
          "word": "blue jacket",
          "vi": "áo khoác xanh",
          "distractor": false
        },
        {
          "word": "slim",
          "vi": "gầy gò",
          "distractor": false
        },
        {
          "word": "strong",
          "vi": "mạnh mẽ",
          "distractor": false
        },
        {
          "word": "unique",
          "vi": "độc đáo",
          "distractor": false
        },
        {
          "word": "recognises",
          "vi": "nhận ra",
          "distractor": false
        },
        {
          "word": "friendly",
          "vi": "thân thiện",
          "distractor": false
        },
        {
          "word": "good",
          "vi": "tốt",
          "distractor": false
        },
        {
          "word": "cool",
          "vi": "ngầu",
          "distractor": false
        },
        {
          "word": "very short",
          "vi": "rất thấp",
          "distractor": true
        },
        {
          "word": "strange and weird",
          "vi": "kỳ lạ",
          "distractor": true
        },
        {
          "word": "ignores me",
          "vi": "phớt lờ tôi",
          "distractor": true
        }
      ]
    }
  },
  "min_sentences": 6
};
