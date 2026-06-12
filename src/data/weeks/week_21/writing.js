export default {
  title: "Max's Diary - Yesterday",
  min_words: 55,
  min_sentences: 8,
  instruction_en: "Write about your yesterday in full detail using past tense — morning to night!",
  instruction_vi: "Viết về hôm qua chi tiết bằng thì quá khứ — từ sáng đến tối!",
  model_sentence: "Yesterday was a busy and beautiful day. I woke up early, brushed my teeth, and packed my bag. I walked to school with my friend Lily, and we talked all the way about our science homework. At school, I listened carefully to the teacher. At break time, I played soccer with my classmates. We shouted with excitement when our team scored a goal. After school, I helped my mother prepare dinner. Then I cleaned my room and organised my books. I washed my hands before dinner and watched my favourite TV program for thirty minutes. In the evening, I looked at the stars through my bedroom window and counted ten of them. I was very tired, so I started to fall asleep at nine o'clock. What a busy and beautiful day!",
  prompt_en: "What did you do morning, afternoon, and evening? How did you feel at the end?",
  prompt_vi: "Bạn đã làm gì sáng, chiều, tối? Cuối ngày bạn cảm thấy thế nào?",
  topic_talk_prompt: "Tell me everything you did yesterday from morning to night!",
  sentence_frames: [
    { "template": "Yesterday morning, I ___", "answers": ["woke up"] },
    { "template": "At school, I ___", "answers": ["listened carefully"] },
    { "template": "In the afternoon, ___", "answers": ["I played soccer"] },
    { "template": "After dinner, ___", "answers": ["I cleaned up"] },
    { "template": "In the evening, ___", "answers": ["I read a book"] },
    { "template": "Before bed, ___", "answers": ["I felt tired"] }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "woke up early",
    "brushed my teeth",
    "packed my bag",
    "walked to school",
    "talked all the way",
    "At break time",
    "played soccer",
    "shouted with excitement",
    "helped my mother prepare dinner",
    "cleaned my room",
    "organised my books",
    "washed my hands",
    "before dinner",
    "looked at the stars",
    "counted ten",
    "started to fall asleep"
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week21/story_writing_pic.jpg',
      image_prompt: "This is a page from my personal diary, and it is all about my day yesterday. It was a very busy but incredibly happy day for me. In the morning, I walked slowly to school with my best friend, and we talked happily about our English homework. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "best friend",
        "walked slowly",
        "talked happily",
        "listened carefully",
        "kind teacher",
        "worked hard",
        "helped my mother",
        "bright kitchen",
        "cooked dinner",
        "washed vegetables",
        "cleaned the table",
        "fun board game",
        "younger brother",
        "watched a movie",
        "slept very well"
      ],
      writing_prompts: {
        en: "Look at the picture. This is a diary page about yesterday. Describe your day from morning to night using past tense verbs like walked, listened, helped, and cooked.",
        vi: "Nhìn bức tranh. Đây là trang nhật ký về hôm qua. Hãy mô tả ngày hôm qua từ sáng đến tối dùng các động từ quá khứ như walked, listened, helped, cooked."
      },
      rubric_tier: 1,
      min_sentences: 8,
      sentence_frames: [
        { "template": "Yesterday morning, I ___", "answers": ["woke up"] },
        { "template": "At school, I ___", "answers": ["listened carefully"] },
        { "template": "In the afternoon, ___", "answers": ["I played soccer"] },
        { "template": "After dinner, ___", "answers": ["I cleaned up"] },
        { "template": "In the evening, ___", "answers": ["I read a book"] },
        { "template": "Before bed, ___", "answers": ["I felt tired"] }
      ]
    }
  }
}