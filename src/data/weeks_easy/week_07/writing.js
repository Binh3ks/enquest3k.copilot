export default {
  "title": "Inside My Backpack",
  "min_words": 30,
  "model_sentence": "There is a backpack on my bed. I open it. There is a yellow pencil inside the bag. There is a red crayon too. There is blank paper in the bag. There is a blue folder for my homework. I see my lunch box. There is a water bottle next to it. There is white glue in my pencil case. There are sharp scissors too. There is a big marker to draw. I put everything in my bag. Now I am ready for school!",
  "instruction_en": "Write about what is in your school bag!",
  "instruction_vi": "Viết về những gì có trong cặp sách của bạn!",
  "prompt_en": "What do you have in your bag? What color are your things? Are you ready for school?",
  "prompt_vi": "Bạn có gì trong cặp? Đồ của bạn màu gì? Bạn sẵn sàng đi học chưa?",
  "keywords": [
    "backpack on my bed",
    "open it",
    "yellow pencil",
    "red crayon",
    "blank paper",
    "blue folder",
    "for my homework",
    "lunch box",
    "water bottle",
    "next to it",
    "white glue",
    "in my pencil case",
    "sharp scissors",
    "big marker",
    "ready for school"
  ],
  "topic_talk_prompt": "What is inside your school bag?",
  "sentence_frames": [
    {
      "template": "There is a ___ on my bed. I open it.",
      "answers": [
        "backpack"
      ]
    },
    {
      "template": "There is a ___ pencil and a red crayon inside.",
      "answers": [
        "yellow"
      ]
    },
    {
      "template": "There is ___ paper in the bag.",
      "answers": [
        "blank"
      ]
    },
    {
      "template": "There is a blue folder ___ my homework.",
      "answers": [
        "for"
      ]
    },
    {
      "template": "I see my lunch ___. There is a water bottle next to it.",
      "answers": [
        "box"
      ]
    },
    {
      "template": "Now I am ___ for school!",
      "answers": [
        "ready"
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
          "word": "backpack",
          "vi": "ba lô",
          "distractor": false
        },
        {
          "word": "open",
          "vi": "mở",
          "distractor": false
        },
        {
          "word": "yellow",
          "vi": "vàng",
          "distractor": false
        },
        {
          "word": "red",
          "vi": "đỏ",
          "distractor": false
        },
        {
          "word": "paper",
          "vi": "giấy",
          "distractor": false
        },
        {
          "word": "blue",
          "vi": "xanh dương",
          "distractor": false
        },
        {
          "word": "for",
          "vi": "cho",
          "distractor": false
        },
        {
          "word": "lunch box",
          "vi": "hộp cơm",
          "distractor": false
        },
        {
          "word": "next to",
          "vi": "bên cạnh",
          "distractor": false
        },
        {
          "word": "glue",
          "vi": "keo",
          "distractor": false
        },
        {
          "word": "ready",
          "vi": "sẵn sàng",
          "distractor": false
        },
        {
          "word": "eraser",
          "vi": "cục tẩy",
          "distractor": true
        },
        {
          "word": "toy",
          "vi": "đồ chơi",
          "distractor": true
        },
        {
          "word": "not ready",
          "vi": "chưa sẵn sàng",
          "distractor": true
        }
      ]
    }
  },
  "min_sentences": 6
};
