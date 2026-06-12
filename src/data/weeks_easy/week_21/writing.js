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
    hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "walked slowly", "vi": "walked slowly", "distractor": false },
        { "word": "talked happily", "vi": "talked happily", "distractor": false },
        { "word": "listened carefully", "vi": "listened carefully", "distractor": false },
        { "word": "worked hard", "vi": "worked hard", "distractor": false },
        { "word": "helped my mother", "vi": "helped my mother", "distractor": false },
        { "word": "cooked dinner", "vi": "cooked dinner", "distractor": false },
        { "word": "washed vegetables", "vi": "washed vegetables", "distractor": false },
        { "word": "cleaned the table", "vi": "cleaned the table", "distractor": false },
        { "word": "played board game", "vi": "played board game", "distractor": false },
        { "word": "watched a movie", "vi": "watched a movie", "distractor": false },
        { "word": "slept very well", "vi": "slept very well", "distractor": false },
        { "word": "woke up early", "vi": "woke up early", "distractor": false },
        { "word": "brushed my teeth", "vi": "brushed my teeth", "distractor": false },
        { "word": "packed my bag", "vi": "packed my bag", "distractor": false },
        { "word": "walked to school", "vi": "walked to school", "distractor": false },
        { "word": "ate breakfast quickly", "vi": "ate breakfast quickly", "distractor": true },
        { "word": "did my homework", "vi": "did my homework", "distractor": true },
        { "word": "studied in the evening", "vi": "studied in the evening", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week21/story_writing_pic.jpg",
      image_prompt: "A diary page about yesterday.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
