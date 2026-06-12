export default {
  title: "Detective Nova's Case Interview",
  min_words: 40,
  instruction_en: "Write about a detective interview using past tense!",
  instruction_vi: "Viết về cuộc phỏng vấn thám tử bằng thì quá khứ!",
  prompt_en: "What questions did the detective ask? How did the suspect answer?",
  prompt_vi: "Thám tử đã hỏi câu nào? Nghi phạm trả lời thế nào?",
  topic_talk_prompt: "Tell me about a detective interview!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Nova was working on a case in **Hoi An**, Vietnam.",
      "answers": [
        "Hoi An"
      ]
    },
    {
      "template": "She arrived at the scene and opened her notebook.",
      "answers": [
        "opened her notebook"
      ]
    },
    {
      "template": "'Where were you **yesterday morning**?' The suspect **answered clearly**.",
      "answers": [
        "yesterday morning",
        "answered clearly"
      ]
    },
    {
      "template": "'What did you do **last night**?' She **wrote every answer** **in her notebook**.",
      "answers": [
        "last night",
        "wrote every answer",
        "in her notebook"
      ]
    },
    {
      "template": "Nova **studied each clue carefully** in the warm lantern light.",
      "answers": [
        "studied each clue carefully"
      ]
    },
    {
      "template": "Nova **had solved the case**. Detective Nova handed her final report to the team in Hoi An.",
      "answers": [
        "had solved the case"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "Hoi An",
    "opened her notebook",
    "yesterday morning",
    "answered clearly",
    "last night",
    "wrote every answer",
    "in her notebook",
    "studied each clue carefully",
    "had solved the case"
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week22/story_writing_pic.jpg',
      image_prompt: "I am playing a very fun and exciting game with my family today. I am wearing a big hat and holding a notebook because I am the Time Detective! Someone ate my delicious chocolate cake last night, and I really want to find out who did it. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1
      ,
      sentence_frames: [
  {
    "template": "Nova was working on a case in **Hoi An**, Vietnam.",
    "answers": [
      "Hoi An"
    ]
  },
  {
    "template": "She arrived at the scene and opened her notebook.",
    "answers": [
      "opened her notebook"
    ]
  },
  {
    "template": "'Where were you **yesterday morning**?' The suspect **answered clearly**.",
    "answers": [
      "yesterday morning",
      "answered clearly"
    ]
  }
]
    }
  }
}