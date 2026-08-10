export default {
  "title": "My Art Class Story",
  "min_words": 55,
  "min_sentences": 8,
  "model_sentence": "Yesterday, Mia arrived at art class and picked up her brush. She dipped her brush into red pigment and painted a picture of red flowers. Mia colored carefully the flowers in her picture using blue and yellow. Then she folded carefully a sheet of paper into a butterfly shape. Both wings were the same — perfect symmetry! She used the scissors to cut shapes carefully from green paper. Mia glued the leaves around her picture to create a beautiful border. She pressed carefully each piece to check the texture of the paper. Finally, Mia held up proudly the picture she had worked so hard to create. The teacher clapped loudly and said the picture had wonderful texture, bright pigment, and beautiful symmetry.",
  "instruction_en": "Write a step-by-step art class story using first, next, then, and finally!",
  "instruction_vi": "Viết câu chuyện mỹ thuật theo từng bước dùng first, next, then, finally!",
  "prompt_en": "What did you paint? What steps did you follow? How did you feel at the end?",
  "prompt_vi": "Bạn vẽ gì? Bạn đã làm theo những bước nào? Cuối cùng bạn cảm thấy thế nào?",
  "keywords": [
    "picked up",
    "painted a picture",
    "colored carefully",
    "folded carefully",
    "cut shapes",
    "glued",
    "pressed carefully",
    "held up proudly"
  ],
  "topic_talk_prompt": "Describe your art class step by step — what did you make and how did it turn out?",
  "sentence_frames": [
    {
      "template": "Yesterday I arrived at art class and ___ my ___.",
      "answers": [
        "picked up",
        "brush"
      ]
    },
    {
      "template": "I ___ my brush into ___ pigment and painted a picture of red flowers.",
      "answers": [
        "dipped",
        "bright red"
      ]
    },
    {
      "template": "Then I ___ a sheet of paper into a butterfly shape and ___ both wings carefully.",
      "answers": [
        "folded",
        "studied"
      ]
    },
    {
      "template": "I ___ the scissors to ___ well from green paper.",
      "answers": [
        "used",
        "cut shapes"
      ]
    },
    {
      "template": "I ___ the leaves around my picture to create a beautiful ___.",
      "answers": [
        "glued",
        "border"
      ]
    },
    {
      "template": "I ___ ___ each piece to check the texture of the paper.",
      "answers": [
        "pressed carefully"
      ]
    },
    {
      "template": "Finally, I ___ ___ the picture I had worked so hard to create.",
      "answers": [
        "held up proudly"
      ]
    },
    {
      "template": "The teacher ___ ___ and said my picture had wonderful symmetry and beautiful well.",
      "answers": [
        "clapped loudly",
        "texture"
      ]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "Need help? Click next to each blank",
      "label_vi": "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        {
          "word": "picked up",
          "vi": "nhặt lên",
          "distractor": false
        },
        {
          "word": "brush",
          "vi": "cọ vẽ",
          "distractor": false
        },
        {
          "word": "dipped",
          "vi": "nhúng",
          "distractor": false
        },
        {
          "word": "bright red pigment",
          "vi": "màu đỏ sáng",
          "distractor": false
        },
        {
          "word": "painted a picture",
          "vi": "vẽ một bức tranh",
          "distractor": false
        },
        {
          "word": "red flowers",
          "vi": "hoa đỏ",
          "distractor": false
        },
        {
          "word": "folded",
          "vi": "gấp",
          "distractor": false
        },
        {
          "word": "studied both wings",
          "vi": "quan sát hai cánh",
          "distractor": false
        },
        {
          "word": "used the scissors",
          "vi": "dùng kéo",
          "distractor": false
        },
        {
          "word": "cut shapes",
          "vi": "cắt hình",
          "distractor": false
        },
        {
          "word": "glued",
          "vi": "dán",
          "distractor": false
        },
        {
          "word": "border",
          "vi": "viền tranh",
          "distractor": false
        },
        {
          "word": "pressed carefully",
          "vi": "ấn cẩn thận",
          "distractor": false
        },
        {
          "word": "held up proudly",
          "vi": "giơ lên tự hào",
          "distractor": false
        },
        {
          "word": "clapped loudly",
          "vi": "vỗ tay lớn",
          "distractor": false
        },
        {
          "word": "texture",
          "vi": "kết cấu bề mặt",
          "distractor": false
        },
        {
          "word": "symmetry",
          "vi": "đối xứng",
          "distractor": false
        },
        {
          "word": "a dirty plate",
          "vi": "đĩa bẩn",
          "distractor": true
        },
        {
          "word": "threw away",
          "vi": "ném đi",
          "distractor": true
        }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week23/story_writing_pic.jpg",
      "image_prompt": "Last week, my class had a wonderful art project, and we worked together in small groups to create a beautiful model of a mystery house. We started the big project early in the morning, and everyone was very excited. First, my friend Peter designed the shape of the house on a large piece of white paper. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      "word_bank": [
        "art project",
        "small groups",
        "mystery house",
        "designed the shape",
        "white paper",
        "thick brown cardboard",
        "folded carefully",
        "glued the walls",
        "painted the roof",
        "wooden windows",
        "mixed colors",
        "small stones",
        "nice path",
        "fantastic job",
        "own hands"
      ],
      "writing_prompts": {
        "en": "Look at the picture. Your class did an art project together in small groups. Describe the steps — what did you design, build, and create? How did it turn out?",
        "vi": "Nhìn bức tranh. Lớp bạn đã làm dự án mỹ thuật theo nhóm nhỏ. Hãy mô tả từng bước — bạn đã thiết kế, xây dựng, và tạo ra gì? Kết quả thế nào?"
      },
      "rubric_tier": 1,
      "min_sentences": 8,
      "sentence_frames": [
        {
          "template": "Yesterday I arrived at art class and ___ ___",
          "answers": [
            "picked up my brush",
            "then"
          ]
        },
        {
          "template": "I dipped my brush into ___ ___",
          "answers": [
            "red pigment",
            "also"
          ]
        },
        {
          "template": "I painted a picture of ___ ___",
          "answers": [
            "red flowers",
            "so"
          ]
        },
        {
          "template": "I folded a sheet of paper into ___ ___",
          "answers": [
            "a butterfly shape",
            "next"
          ]
        },
        {
          "template": "I used the scissors to ___ ___",
          "answers": [
            "cut shapes",
            "finally"
          ]
        },
        {
          "template": "I glued the leaves ___ ___",
          "answers": [
            "around my picture",
            "slowly"
          ]
        },
        {
          "template": "I pressed each piece ___ ___",
          "answers": [
            "carefully",
            "happily"
          ]
        },
        {
          "template": "The teacher clapped ___ ___",
          "answers": [
            "loudly and said it was wonderful",
            "carefully"
          ]
        }
      ]
    }
  }
};
