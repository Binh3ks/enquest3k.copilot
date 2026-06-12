export default {
  title: "Max's Diary - Yesterday",
  min_words: 45,
  instruction_en: "Write about your yesterday in full detail using past tense — morning to night!",
  instruction_vi: "Viết về hôm qua chi tiết bằng thì quá khứ — từ sáng đến tối!",
  model_sentence: "Yesterday was a busy and beautiful day. I woke up early, brushed my teeth, and packed my bag. I walked to school with my friend Lily, and we talked all the way about our science homework. At school, I listened carefully to the teacher. At break time, I played soccer with my classmates. We shouted with excitement when our team scored a goal. After school, I helped my mother prepare dinner. Then I cleaned my room and organised my books. I washed my hands before dinner and watched my favourite TV program for thirty minutes. In the evening, I looked at the stars through my bedroom window and counted ten of them. I was very tired, so I started to fall asleep at nine o'clock. What a busy and beautiful day!",
  prompt_en: "What did you do morning, afternoon, and evening? How did you feel at the end?",
  prompt_vi: "Bạn đã làm gì sáng, chiều, tối? Cuối ngày bạn cảm thấy thế nào?",
  topic_talk_prompt: "Tell me everything you did yesterday from morning to night!",
  sentence_frames: [
    {
      "template": "Yesterday was a busy and beautiful day. I **woke up early**, **brushed my teeth**, and **packed my bag**.",
      "answers": [
        "woke up early",
        "brushed my teeth",
        "packed my bag"
      ]
    },
    {
      "template": "I **walked to school** with my friend Lily, and we **talked all the way** about our science homework.",
      "answers": [
        "walked to school",
        "talked all the way"
      ]
    },
    {
      "template": "At school, I listened carefully to the teacher during every lesson. **At break time**, I **played soccer** with my classmates.",
      "answers": [
        "At break time",
        "played soccer"
      ]
    },
    {
      "template": "We **shouted with excitement** when our team scored a goal!",
      "answers": [
        "shouted with excitement"
      ]
    },
    {
      "template": "After school, I **helped my mother prepare dinner**. Then I **cleaned my room** and **organised my books**.",
      "answers": [
        "helped my mother prepare dinner",
        "cleaned my room",
        "organised my books"
      ]
    },
    {
      "template": "I **washed my hands** **before dinner** and watched my favourite TV program for thirty minutes.",
      "answers": [
        "washed my hands",
        "before dinner"
      ]
    },
    {
      "template": "In the evening, I **looked at the stars** through my bedroom window and **counted ten** of them.",
      "answers": [
        "looked at the stars",
        "counted ten"
      ]
    },
    {
      "template": "I was very tired, so I **started to fall asleep** at nine o'clock. What a busy and beautiful day!",
      "answers": [
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
      type: "picture",
      image_url: "/images/week21/story_writing_pic.jpg",
      image_prompt: "A diary page about yesterday morning to night.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What are they doing? Use 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ."
      },
      rubric_tier: 2,
      min_sentences: 8,
      sentence_frames: [
        { "template": "First, ___" },
        { "template": "Then, ___" },
        { "template": "After that, ___" },
        { "template": "Finally, ___" }
      ]
    }
  }
}
