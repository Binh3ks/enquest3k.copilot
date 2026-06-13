export default {
  title: "A Rainy Day at School",
  min_words: 30,
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
  ]
,
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week17/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 17 story writing.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
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
  ]
    }
  }
}
