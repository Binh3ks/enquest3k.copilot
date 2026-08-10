export default {
  "title": "Hello, World!",
  "min_words": 30,
  "model_sentence": "My name is Tim. I live in a house. My house has many rooms. I sleep in my bedroom and have a soft bed. I eat in the kitchen and sit at the table. I wash my hands in the bathroom.",
  "instruction_en": "Write about yourself and your classroom!",
  "instruction_vi": "Viết về bản thân và lớp học của bạn!",
  "prompt_en": "What is your name? How old are you? What do you have? Who is next to you?",
  "prompt_vi": "Tên bạn là gì? Bạn bao nhiêu tuổi? Bạn có gì? Ai ngồi cạnh bạn?",
  "keywords": [
    "name",
    "eight years old",
    "student",
    "at school",
    "sit next to",
    "friend Lily",
    "blue pen",
    "story book",
    "in my bag",
    "colorful picture",
    "on the wall",
    "kind teacher",
    "happy day"
  ],
  "topic_talk_prompt": "Tell me about yourself!",
  "sentence_frames": [
    {
      "template": "My name is ___.",
      "answers": [
        "Tim"
      ]
    },
    {
      "template": "I ___ in a house.",
      "answers": [
        "live"
      ]
    },
    {
      "template": "My house has ___ rooms.",
      "answers": [
        "many"
      ]
    },
    {
      "template": "I sleep in my ___ and have a soft bed.",
      "answers": [
        "bedroom"
      ]
    },
    {
      "template": "I eat in the ___ and sit at the table.",
      "answers": [
        "kitchen"
      ]
    },
    {
      "template": "I ___ my hands in the bathroom.",
      "answers": [
        "wash"
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
          "word": "Alex",
          "vi": "",
          "distractor": false
        },
        {
          "word": "eight",
          "vi": "tám",
          "distractor": false
        },
        {
          "word": "student",
          "vi": "học sinh",
          "distractor": false
        },
        {
          "word": "next to",
          "vi": "cạnh",
          "distractor": false
        },
        {
          "word": "Lily",
          "vi": "",
          "distractor": false
        },
        {
          "word": "blue",
          "vi": "xanh dương",
          "distractor": false
        },
        {
          "word": "story",
          "vi": "truyện",
          "distractor": false
        },
        {
          "word": "in",
          "vi": "trong",
          "distractor": false
        },
        {
          "word": "on",
          "vi": "trên",
          "distractor": false
        },
        {
          "word": "sad",
          "vi": "buồn",
          "distractor": true
        },
        {
          "word": "teacher",
          "vi": "giáo viên",
          "distractor": true
        },
        {
          "word": "ten",
          "vi": "mười — sai tuổi",
          "distractor": true
        }
      ]
    }
  },
  "min_sentences": 6
};
