export default {
  title: "Max's Diary - Yesterday",
  min_words: 30,
  instruction_en: "Write about what you did yesterday using past tense!",
  instruction_vi: "Viết về những gì bạn đã làm hôm qua bằng thì quá khứ!",
  model_sentence: "Yesterday I woke up early and brushed my teeth. I packed my bag and walked to school with my friend. At school, I listened carefully to my teacher. At break time, I played soccer. I shouted with excitement when we scored a goal! After school, I helped my mother prepare dinner. Then I cleaned my room. In the evening, I looked at the stars and counted ten of them. Then I started to fall asleep. What a busy day!",
  prompt_en: "What did you do in the morning? After school? In the evening?",
  prompt_vi: "Buổi sáng bạn đã làm gì? Sau trường? Tối thì sao?",
  topic_talk_prompt: "What did you do yesterday — morning, afternoon, and evening?",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Yesterday I **woke up early** and **brushed my teeth**.",
      "answers": [
        "woke up early",
        "brushed my teeth"
      ]
    },
    {
      "template": "I **packed my bag** and **walked to school** with my friend.",
      "answers": [
        "packed my bag",
        "walked to school"
      ]
    },
    {
      "template": "At school, I listened carefully to my teacher.",
      "answers": [
        "listened carefully"
      ]
    },
    {
      "template": "**At break time**, I **played soccer**. I **shouted with excitement** when we scored a goal!",
      "answers": [
        "At break time",
        "played soccer",
        "shouted with excitement"
      ]
    },
    {
      "template": "After school, I **helped my mother prepare dinner**. Then I **cleaned my room**.",
      "answers": [
        "helped my mother prepare dinner",
        "cleaned my room"
      ]
    },
    {
      "template": "In the evening, I **looked at the stars** and **counted ten** of them. Then I **started to fall asleep**.",
      "answers": [
        "looked at the stars",
        "counted ten",
        "started to fall asleep"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "woke up early",
    "brushed my teeth",
    "packed my bag",
    "walked to school",
    "listened carefully",
    "At break time",
    "played soccer",
    "shouted with excitement",
    "helped my mother prepare dinner",
    "cleaned my room",
    "looked at the stars",
    "counted ten",
    "started to fall asleep"
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week21/story_writing_pic.jpg',
      image_prompt: "This is a page from my personal diary, and it is all about my day yesterday. It was a very busy but incredibly happy day for me. In the morning, I walked slowly to school with my best friend, and we talked happily about our English homework. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1
      ,
      sentence_frames: [
  {
    "template": "Yesterday I **woke up early** and **brushed my teeth**.",
    "answers": [
      "woke up early",
      "brushed my teeth"
    ]
  },
  {
    "template": "I **packed my bag** and **walked to school** with my friend.",
    "answers": [
      "packed my bag",
      "walked to school"
    ]
  },
  {
    "template": "At school, I listened carefully to my teacher.",
    "answers": [
      "listened carefully"
    ]
  }
]
    }
  }
}