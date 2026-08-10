export default {
  "title": "My Family Squad",
  "min_words": 45,
  "model_sentence": "This is my mother. She is the leader of our family then . My mother helps us with everything every day also . This is my father. He is strong and kind so . He works very hard for our family together . This is my big brother. His name is Tom safely . He helps me with homework slowly .",
  "instruction_en": "Describe each family member in detail!",
  "instruction_vi": "Mô tả từng thành viên gia đình chi tiết!",
  "prompt_en": "What does each person do? What are they like? What do you do together as a family?",
  "prompt_vi": "Mỗi người làm gì? Họ thế nào? Cả nhà làm gì cùng nhau?",
  "keywords": [
    "like a team",
    "leader",
    "helps us every day",
    "strong and kind",
    "works hard",
    "big brother",
    "little sister",
    "funny and sweet",
    "love each other",
    "full of love",
    "work together"
  ],
  "topic_talk_prompt": "Tell me about each person in your family!",
  "sentence_frames": [
    {
      "template": "This is ___ mother. She ___ the leader of our family then .",
      "answers": [
        "my",
        "is"
      ]
    },
    {
      "template": "My mother ___ us with ___ every day also .",
      "answers": [
        "helps",
        "everything"
      ]
    },
    {
      "template": "This is ___ father. He ___ strong and kind so .",
      "answers": [
        "my",
        "is"
      ]
    },
    {
      "template": "He works ___ hard for ___ family together .",
      "answers": [
        "very",
        "our"
      ]
    },
    {
      "template": "This is ___ big brother. ___ name is Tom safely .",
      "answers": [
        "my",
        "His"
      ]
    },
    {
      "template": "He ___ me with ___ slowly .",
      "answers": [
        "helps",
        "homework"
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
          "word": "mother",
          "vi": "mẹ",
          "distractor": false
        },
        {
          "word": "leader",
          "vi": "người lãnh đạo",
          "distractor": false
        },
        {
          "word": "every day",
          "vi": "mỗi ngày",
          "distractor": false
        },
        {
          "word": "father",
          "vi": "bố",
          "distractor": false
        },
        {
          "word": "strong",
          "vi": "mạnh mẽ",
          "distractor": false
        },
        {
          "word": "very hard",
          "vi": "rất chăm chỉ",
          "distractor": false
        },
        {
          "word": "big brother",
          "vi": "anh trai",
          "distractor": false
        },
        {
          "word": "Tom",
          "vi": "",
          "distractor": false
        },
        {
          "word": "helps",
          "vi": "giúp đỡ",
          "distractor": false
        },
        {
          "word": "homework",
          "vi": "bài tập về nhà",
          "distractor": false
        },
        {
          "word": "little sister",
          "vi": "em gái",
          "distractor": false
        },
        {
          "word": "funny",
          "vi": "vui tính",
          "distractor": false
        },
        {
          "word": "sweet",
          "vi": "dễ thương",
          "distractor": false
        },
        {
          "word": "love",
          "vi": "yêu thương",
          "distractor": false
        },
        {
          "word": "work",
          "vi": "làm việc",
          "distractor": false
        },
        {
          "word": "very mean",
          "vi": "rất xấu tính",
          "distractor": true
        },
        {
          "word": "never talks",
          "vi": "không bao giờ nói chuyện",
          "distractor": true
        },
        {
          "word": "ignores everyone",
          "vi": "phớt lờ mọi người",
          "distractor": true
        }
      ]
    }
  },
  "min_sentences": 6
};
