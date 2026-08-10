export default {
  "title": "Detective Nova's Case Interview",
  "min_words": 30,
  "instruction_en": "Write about a detective interview using past tense!",
  "instruction_vi": "Viết về cuộc phỏng vấn thám tử bằng thì quá khứ!",
  "prompt_en": "What questions did the detective ask? How did the suspect answer?",
  "prompt_vi": "Thám tử đã hỏi câu nào? Nghi phạm trả lời thế nào?",
  "topic_talk_prompt": "Tell me about a detective interview!",
  "show_by_default": true,
  "sentence_frames": [
    {
      "template": "I am a Time ___.",
      "answers": [
        "Detective"
      ]
    },
    {
      "template": "Someone ate the ___ cake last night!",
      "answers": [
        "chocolate"
      ]
    },
    {
      "template": "Dad cooked dinner at 6 and washed the ___ at 7.",
      "answers": [
        "dishes"
      ]
    },
    {
      "template": "Mum worked in the garden last ___.",
      "answers": [
        "weekend"
      ]
    },
    {
      "template": "The mystery was ___!",
      "answers": [
        "solved"
      ]
    },
    {
      "template": "My brother ___ the cake!",
      "answers": [
        "ate"
      ]
    },
    {
      "template": "I am a Time ___.",
      "answers": [
        "Detective"
      ]
    },
    {
      "template": "I am a Time ___.",
      "answers": [
        "Detective"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "high",
      "words": [
        {
          "word": "Time Detective",
          "vi": "Thám tử Thời gian",
          "distractor": false
        },
        {
          "word": "big hat",
          "vi": "mũ to",
          "distractor": false
        },
        {
          "word": "chocolate cake",
          "vi": "bánh sô-cô-la",
          "distractor": false
        },
        {
          "word": "ask questions",
          "vi": "hỏi câu hỏi",
          "distractor": false
        },
        {
          "word": "last night",
          "vi": "tối qua",
          "distractor": false
        },
        {
          "word": "cooked dinner",
          "vi": "nấu bữa tối",
          "distractor": false
        },
        {
          "word": "washed dishes",
          "vi": "rửa bát",
          "distractor": false
        },
        {
          "word": "this morning",
          "vi": "sáng nay",
          "distractor": false
        },
        {
          "word": "last weekend",
          "vi": "cuối tuần trước",
          "distractor": false
        },
        {
          "word": "very hungry",
          "vi": "rất đói",
          "distractor": false
        },
        {
          "word": "watched TV",
          "vi": "xem TV",
          "distractor": true
        },
        {
          "word": "played outside",
          "vi": "chơi ngoài trời",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week22/story_writing_pic.jpg",
      "image_prompt": "A simple picture for week 22 story writing.",
      "word_bank": [
        "Time Detective",
        "big hat",
        "chocolate cake",
        "ask questions",
        "last night",
        "cooked dinner",
        "washed dishes",
        "this morning",
        "very hungry",
        "mystery solved"
      ],
      "writing_prompts": {
        "en": "Look at the picture. What can you see? Write simply.",
        "vi": "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      "rubric_tier": 1,
      "min_sentences": 6,
      "sentence_frames": [
        {
          "template": "I am a Time ___",
          "answers": [
            "Detective"
          ]
        },
        {
          "template": "Someone ate the ___",
          "answers": [
            "chocolate cake"
          ]
        },
        {
          "template": "Dad cooked ___",
          "answers": [
            "dinner"
          ]
        },
        {
          "template": "Mum worked ___",
          "answers": [
            "in the garden"
          ]
        },
        {
          "template": "The mystery was ___",
          "answers": [
            "solved"
          ]
        },
        {
          "template": "My brother ___",
          "answers": [
            "ate the cake"
          ]
        },
        {
          "template": "I am a Time ___",
          "answers": [
            "Detective"
          ]
        },
        {
          "template": "I am a Time ___",
          "answers": [
            "Detective"
          ]
        }
      ]
    }
  },
  "min_sentences": 8
};
