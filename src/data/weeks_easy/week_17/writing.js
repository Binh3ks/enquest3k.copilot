export default {
  title: "A Rainy Day at School",
  min_words: 35,
  instruction_en: "Write about a rainy day!",
  instruction_vi: "Viết về một ngày mưa!",
  prompt_en: "What is the weather like? What are you wearing?",
  prompt_vi: "Thời tiết thế nào? Bạn đang mặc gì?",
  topic_talk_prompt: "Talk about a rainy day!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "It is ___ today.",
      "answers": [
        "raining"
      ]
    },
    {
      "template": "I am wearing my ___ to stay warm.",
      "answers": [
        "blue coat"
      ]
    },
    {
      "template": "The streets are ___.",
      "answers": [
        "wet"
      ]
    },
    {
      "template": "Nam is carrying his ___ because it is raining.",
      "answers": [
        "umbrella"
      ]
    },
    {
      "template": "It is very ___ today.",
      "answers": [
        "cold"
      ]
    },
    {
      "template": "After school, I **take off my coat** because the weather is ___.",
      "answers": [
        "warm outside now"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "raining",
    "blue coat",
    "wet",
    "umbrella",
    "cold",
    "warm outside now"
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week17/story_writing_pic.jpg',
      image_prompt: "In this very interesting picture, there are four good friends living in four different cities, and the weather in each place is completely different today! First, let's look at London. It is raining heavily and the sky is very dark, so the boy is wearing a thick yellow raincoat and big rubber boots. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1
      ,
      sentence_frames: [
  {
    "template": "It is ___ today.",
    "answers": [
      "raining"
    ]
  },
  {
    "template": "I am wearing my ___ to stay warm.",
    "answers": [
      "blue coat"
    ]
  },
  {
    "template": "The streets are ___.",
    "answers": [
      "wet"
    ]
  }
]
    }
  }
}