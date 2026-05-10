export default {
  title: "My Family Squad",
  min_words: 40,
  model_sentence: "I have a wonderful family. My mother is a teacher and she is very kind and patient. My father is a doctor and he works very hard every day. My older sister is funny and she always makes me laugh. My little brother is only three years old but he is already very smart. We love each other and we do everything together.",
  instruction_en: "Describe each family member in detail!",
  instruction_vi: "M\u00f4 t\u1ea3 t\u1eebng th\u00e0nh vi\u00ean gia \u0111\u00ecnh chi ti\u1ebft!",
  prompt_en: "What does each person do? What are they like? What do you do together?",
  prompt_vi: "M\u1ed7i ng\u01b0\u1eddi l\u00e0m g\u00ec? H\u1ecd th\u1ebf n\u00e0o? C\u1ea3 nh\u00e0 l\u00e0m g\u00ec c\u00f9ng nhau?",
  keywords: ["wonderful", "teacher", "patient", "doctor", "funny", "laugh", "smart", "together"],
  topic_talk_prompt: "Tell me about each person in your family!",
  sentence_frames: [
    {
        "template": "My mother is ___ and she is ___ and ___.",
        "answers": [
            "a teacher",
            "very kind",
            "patient"
        ]
    },
    {
        "template": "My father is ___ and he works ___ every day.",
        "answers": [
            "a doctor",
            "very hard"
        ]
    },
    {
        "template": "My older sister is ___ and she always ___.",
        "answers": [
            "funny",
            "makes me laugh"
        ]
    },
    {
        "template": "My little brother is only ___ but he is already ___.",
        "answers": [
            "three years old",
            "very smart"
        ]
    },
    {
        "template": "We ___ each other and do ___ together.",
        "answers": [
            "love",
            "everything"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
    {
        "word": "a teacher",
        "vi": "giáo viên",
        "distractor": false
    },
    {
        "word": "very kind",
        "vi": "rất tốt bụng",
        "distractor": false
    },
    {
        "word": "patient",
        "vi": "kiên nhẫn",
        "distractor": false
    },
    {
        "word": "a doctor",
        "vi": "bác sĩ",
        "distractor": false
    },
    {
        "word": "very hard",
        "vi": "rất chăm chỉ",
        "distractor": false
    },
    {
        "word": "funny",
        "vi": "hài hước",
        "distractor": false
    },
    {
        "word": "makes me laugh",
        "vi": "khiến tôi cười",
        "distractor": false
    },
    {
        "word": "three years old",
        "vi": "ba tuổi",
        "distractor": false
    },
    {
        "word": "very smart",
        "vi": "rất thông minh",
        "distractor": false
    },
    {
        "word": "love",
        "vi": "yêu thương",
        "distractor": false
    },
    {
        "word": "everything",
        "vi": "mọi thứ",
        "distractor": false
    },
    {
        "word": "very mean",
        "vi": "rất xấu tính",
        "distractor": true
    },
    {
        "word": "never talks to me",
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
  }
};
