export default {
  "title": "Hello, World!",
  "min_words": 35,
  "min_sentences": 6,
  "model_sentence": "My name is Alex and I am eight years old. I am a new student at Greenwood Elementary School. Every morning, I wake up early and get ready for school. My teacher, Ms. Johnson, is very kind and patient. She teaches us English, Math, and Science. I want to become a young scientist when I grow up.",
  "instruction_en": "Write about yourself and your school in full sentences!",
  "instruction_vi": "Viết về bản thân và trường học bằng câu đầy đủ!",
  "prompt_en": "What is your name and age? What is your school like? What do you carry in your bag? What do you want to become?",
  "prompt_vi": "Tên và tuổi bạn là gì? Trường của bạn thế nào? Bạn mang gì trong cặp? Bạn muốn trở thành gì?",
  "keywords": [
    "eight",
    "School",
    "school",
    "kind",
    "Science",
    "scientist"
  ],
  "topic_talk_prompt": "Tell me about yourself and your school!",
  "sentence_frames": [
    {
      "template": "My name is Alex and I am ___ years old ___ .",
      "answers": [
        "eight",
        "then"
      ]
    },
    {
      "template": "I am a new student at Greenwood Elementary ___ ___",
      "answers": [
        "School",
        "also"
      ]
    },
    {
      "template": "Every morning, I wake up early and get ready for ___ ___",
      "answers": [
        "school",
        "so"
      ]
    },
    {
      "template": "My teacher, Ms. Johnson, is very ___ and patient ___ .",
      "answers": [
        "kind",
        "next"
      ]
    },
    {
      "template": "She teaches us English, Math, and ___ ___",
      "answers": [
        "Science",
        "finally"
      ]
    },
    {
      "template": "I want to become a young ___ when I grow up ___ .",
      "answers": [
        "scientist",
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
          "word": "eight",
          "vi": "tám",
          "distractor": false
        },
        {
          "word": "School",
          "vi": "trường học",
          "distractor": false
        },
        {
          "word": "school",
          "vi": "trường học",
          "distractor": false
        },
        {
          "word": "kind",
          "vi": "tốt bụng",
          "distractor": false
        },
        {
          "word": "Science",
          "vi": "Khoa học",
          "distractor": false
        },
        {
          "word": "scientist",
          "vi": "nhà khoa học",
          "distractor": false
        },
        {
          "word": "twenty",
          "vi": "hai mươi",
          "distractor": true
        },
        {
          "word": "sleeping",
          "vi": "đang ngủ",
          "distractor": true
        },
        {
          "word": "strict",
          "vi": "nghiêm khắc",
          "distractor": true
        }
      ]
    }
  }
};
