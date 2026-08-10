export default {
  "title": "My Happy Jar",
  "min_words": 30,
  "model_sentence": "My name is Mia. I play with my toys every afternoon. I draw pictures of animals and flowers. I read books before bed. When I play, I smile. When I draw, I laugh with joy. When I read, I feel very happy. I have many happy things. I love each moment. They make me feel good every day. Every afternoon is a happy time for me!",
  "instruction_en": "Write about things you like doing and how they make you feel!",
  "instruction_vi": "Viết về những việc bạn thích làm và cảm giác của bạn!",
  "prompt_en": "What do you like doing? How do you feel when you do it?",
  "prompt_vi": "Bạn thích làm gì? Bạn cảm thấy thế nào khi làm điều đó?",
  "keywords": [
    "play with toys",
    "every afternoon",
    "draw pictures",
    "of animals and flowers",
    "read books",
    "before bed",
    "smile",
    "laugh with joy",
    "feel happy",
    "each moment",
    "every day",
    "happy time"
  ],
  "topic_talk_prompt": "What do you like doing? How does it make you feel?",
  "sentence_frames": [
    {
      "template": "My name is ___.",
      "answers": [
        "Mia"
      ]
    },
    {
      "template": "I ___ with my toys every afternoon.",
      "answers": [
        "play"
      ]
    },
    {
      "template": "I ___ pictures of animals and flowers.",
      "answers": [
        "draw"
      ]
    },
    {
      "template": "I ___ books before bed.",
      "answers": [
        "read"
      ]
    },
    {
      "template": "When I play, I ___. When I draw, I laugh.",
      "answers": [
        "smile"
      ]
    },
    {
      "template": "I feel ___ when I read.",
      "answers": [
        "happy"
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
          "word": "Mia",
          "vi": "",
          "distractor": false
        },
        {
          "word": "play",
          "vi": "chơi",
          "distractor": false
        },
        {
          "word": "every afternoon",
          "vi": "mỗi buổi chiều",
          "distractor": false
        },
        {
          "word": "draw",
          "vi": "vẽ",
          "distractor": false
        },
        {
          "word": "read",
          "vi": "đọc",
          "distractor": false
        },
        {
          "word": "before",
          "vi": "trước khi",
          "distractor": false
        },
        {
          "word": "smile",
          "vi": "mỉm cười",
          "distractor": false
        },
        {
          "word": "laugh with joy",
          "vi": "cười vui",
          "distractor": false
        },
        {
          "word": "happy",
          "vi": "vui",
          "distractor": false
        },
        {
          "word": "sleeping",
          "vi": "ngủ",
          "distractor": true
        },
        {
          "word": "sad",
          "vi": "buồn",
          "distractor": true
        },
        {
          "word": "cooking",
          "vi": "nấu ăn",
          "distractor": true
        }
      ]
    }
  },
  "min_sentences": 6
};
