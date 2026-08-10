export default {
  "title": "Hello, World!",
  "min_words": 35,
  "min_sentences": 6,
  "model_sentence": "My name is Alex and I am eight years old. I am a new student at Greenwood Elementary School. Every morning, I wake up early and get ready for school. My teacher, Ms Johnson, is very kind and patient. She teaches us English, Math, and Science. I want to become a young scientist when I grow up.",
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
      "template": "My name ___ Alex and ___ am eight years old.",
      "answers": [
        "is",
        "I"
      ]
    },
    {
      "template": "I am ___ new student ___ Greenwood Elementary School.",
      "answers": [
        "a",
        "at"
      ]
    },
    {
      "template": "Every morning, ___ wake up ___ and get ready for school.",
      "answers": [
        "I",
        "early"
      ]
    },
    {
      "template": "My teacher, ___ Johnson, is ___ kind and patient.",
      "answers": [
        "Ms",
        "very"
      ]
    },
    {
      "template": "She teaches ___ English, Math, ___ Science.",
      "answers": [
        "us",
        "and"
      ]
    },
    {
      "template": "I want ___ become a ___ scientist when I grow up.",
      "answers": [
        "to",
        "young"
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
