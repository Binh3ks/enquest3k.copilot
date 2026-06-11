export default {
  title: "A Rainy Day at School",
  min_words: 45,
  instruction_en: "Write about a rainy day using the present continuous tense!",
  instruction_vi: "Viết về một ngày mưa dùng thì hiện tại tiếp diễn!",
  prompt_en: "What is the weather like? What are you doing and why?",
  prompt_vi: "Thời tiết thế nào? Bạn đang làm gì và tại sao?",
  topic_talk_prompt: "Talk about a rainy day — what are you wearing and doing?",
  sentence_frames: [
    {
      "template": "**It is raining** very hard today. Big drops of water are **falling from the sky**.",
      "answers": [
        "raining very hard",
        "falling from the sky"
      ]
    },
    {
      "template": "I **look outside the window**. The streets are wet and the wind is **blowing very strong**.",
      "answers": [
        "look outside the window",
        "blowing very strong"
      ]
    },
    {
      "template": "I am **wearing my blue coat** today. It **keeps me dry and warm** in the cold rain.",
      "answers": [
        "wearing my blue coat",
        "keeps me dry and warm"
      ]
    },
    {
      "template": "My friend Linh is **wearing her red hat**. She looks so funny in the rain!",
      "answers": [
        "wearing her red hat"
      ]
    },
    {
      "template": "Nam is carrying a big umbrella. He opens it **every time** we go outside.",
      "answers": [
        "every time"
      ]
    },
    {
      "template": "It **is very cold** today because the wind is strong and the rain is heavy.",
      "answers": [
        "is very cold"
      ]
    },
    {
      "template": "After school, the rain stops. I **take off my coat** because it is warm outside now.",
      "answers": [
        "take off my coat"
      ]
    },
    {
      "template": "We love **learning about weather**. The science teacher explains how evaporation works!",
      "answers": [
        "learning about weather"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "raining very hard",
    "falling from the sky",
    "wearing my blue coat",
    "keeps me dry and warm",
    "wearing her red hat",
    "blowing very strong",
    "is very cold",
    "every time",
    "take off my coat",
    "learning about weather"
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
    "template": "**It is raining** very hard today. Big drops of water are **falling from the sky**.",
    "answers": [
      "raining very hard",
      "falling from the sky"
    ]
  },
  {
    "template": "I **look outside the window**. The streets are wet and the wind is **blowing very strong**.",
    "answers": [
      "look outside the window",
      "blowing very strong"
    ]
  },
  {
    "template": "I am **wearing my blue coat** today. It **keeps me dry and warm** in the cold rain.",
    "answers": [
      "wearing my blue coat",
      "keeps me dry and warm"
    ]
  }
]
    }
  }
}