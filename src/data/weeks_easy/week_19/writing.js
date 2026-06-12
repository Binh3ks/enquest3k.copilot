export default {
  title: "My Old Photo Album",
  min_words: 35,
  instruction_en: "Write about an old photo of yourself!",
  instruction_vi: "Viết về một bức ảnh cũ của bạn!",
  prompt_en: "What did you look like as a baby? What were you like?",
  prompt_vi: "Bạn trông thế nào khi còn là em bé? Bạn như thế nào?",
  topic_talk_prompt: "Describe yourself as a baby!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "I was a ___ in this photo.",
      "answers": [
        "baby"
      ]
    },
    {
      "template": "I **was little**! I was cute.",
      "answers": [
        "was little"
      ]
    },
    {
      "template": "My face **was round and** my eyes **were very big**.",
      "answers": [
        "was round and",
        "were very big"
      ]
    },
    {
      "template": "I was noisy. I cried many times.",
      "answers": [
        "was noisy"
      ]
    },
    {
      "template": "I **was quiet and sleeping** in this picture.",
      "answers": [
        "was quiet and sleeping"
      ]
    },
    {
      "template": "These photos are **special memories**. I **keep these memories in my heart**.",
      "answers": [
        "special memories",
        "keep these memories in my heart"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "baby",
    "was little",
    "was round and",
    "were very big",
    "was noisy",
    "was quiet and sleeping",
    "special memories",
    "keep these memories in my heart"
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week19/story_writing_pic.jpg',
      image_prompt: "Today is a quiet, rainy afternoon, so I am sitting in the living room and looking at an old, heavy family photo album with my mother. In this very first picture, I was just a young, tiny baby. I was very small, round, and cute, but my mother always says that I was also extremely noisy! Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1
      ,
      sentence_frames: [
  {
    "template": "I was a ___ in this photo.",
    "answers": [
      "baby"
    ]
  },
  {
    "template": "I **was little**! I was cute.",
    "answers": [
      "was little"
    ]
  },
  {
    "template": "My face **was round and** my eyes **were very big**.",
    "answers": [
      "was round and",
      "were very big"
    ]
  }
]
    }
  }
}