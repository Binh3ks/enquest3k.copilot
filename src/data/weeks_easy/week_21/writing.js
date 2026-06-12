export default {
  title: "Yesterday's Diary",
  min_words: 40,
  min_sentences: 6,
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
      word_bank: ["walked slowly to school","listened carefully","opened my new textbook","worked hard","helped my mother","cooked a delicious dinner","washed the vegetables","cleaned the table","played a board game","watched a comedy movie","talked about his day","slept very well"],
      writing_prompts: {
        en: "Look at the picture. This is my diary page from yesterday! What can you see me doing? Write about my busy day using words from the word bank.",
        vi: "Nhìn bức tranh. Đây là trang nhật ký của mình từ hôm qua! Bạn thấy mình làm gì? Viết về ngày bận rộn của mình dùng các từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        { "template": "Yesterday, I walked ___ to school with my ___.", "answers": ["slowly", "friend"] },
        { "template": "I helped my mother ___ in the kitchen.", "answers": ["cook dinner"] },
        { "template": "After school, I played ___ with my sister.", "answers": ["a board game"] },
        { "template": "In the evening, I watched a ___ movie.", "answers": ["comedy"] },
        { "template": "Before bed, I talked about my ___ with Dad.", "answers": ["day"] }
      ]
    }
  }
}