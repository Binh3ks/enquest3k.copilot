export default {
  title: "My Live Report",
  min_words: 35,
  model_sentence: "Hello! This is your live reporter broadcasting from Room 5 right now. I am standing at the front of the classroom and describing what I see around me.",
  instruction_en: "Write a live news report using present continuous!",
  instruction_vi: "Vi\u1ebft b\u1ea3n tin tr\u1ef1c ti\u1ebfp b\u1eb1ng th\u00ec hi\u1ec7n t\u1ea1i ti\u1ebfp di\u1ec5n!",
  prompt_en: "Where are you broadcasting from? What are you doing? What do you see?",
  prompt_vi: "B\u1ea1n \u0111ang ph\u00e1t s\u00f3ng t\u1eeb \u0111\u00e2u? B\u1ea1n \u0111ang l\u00e0m g\u00ec?",
  keywords: ["reporter", "broadcasting", "Room 5", "standing", "classroom", "describing"],
  topic_talk_prompt: "Give a live report of what is happening around you!",
  sentence_frames: [
    {
        "template": "This is your ___ broadcasting from ___.",
        "answers": [
            "live reporter",
            "Room 5"
        ]
    },
    {
        "template": "I am ___ at the front of ___ and ___.",
        "answers": [
            "standing",
            "the classroom",
            "describing what I see"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
    {
        "word": "live reporter",
        "vi": "phóng viên trực tiếp",
        "distractor": false
    },
    {
        "word": "Room 5",
        "vi": "Phòng 5",
        "distractor": false
    },
    {
        "word": "standing",
        "vi": "đứng",
        "distractor": false
    },
    {
        "word": "the classroom",
        "vi": "phòng học",
        "distractor": false
    },
    {
        "word": "describing what I see",
        "vi": "mô tả những gì tôi thấy",
        "distractor": false
    },
    {
        "word": "recorded message",
        "vi": "tin nhắn đã ghi",
        "distractor": true
    },
    {
        "word": "the rooftop",
        "vi": "tầng thượng",
        "distractor": true
    },
    {
        "word": "sleeping",
        "vi": "đang ngủ",
        "distractor": true
    }
]
    }
  }
};
