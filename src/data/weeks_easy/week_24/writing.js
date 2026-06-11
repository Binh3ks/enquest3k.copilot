export default {
  title: "My Emotional Day",
  min_words: 30,
  model_sentence: "Yesterday I felt worried. I could not find my homework. Then I felt relieved. My mum helped me. At school I felt excited because there was a special visitor. It was a famous author. At the end I felt tired but happy.",
  instruction_en: "Write about an emotional day using feeling words!",
  instruction_vi: "Viết về một ngày đầy cảm xúc bằng các từ cảm xúc!",
  prompt_en: "How did you feel? What happened? How did you feel at the end?",
  prompt_vi: "Bạn cảm thấy thế nào? Chuyện gì xảy ra? Cuối cùng bạn cảm thấy thế nào?",
  keywords: ["worried", "relieved", "excited", "surprised", "bored", "tired", "happy"],
  topic_talk_prompt: "Tell me about a time you felt many different emotions in one day!",
  sentence_frames: [
    {
      "template": "Yesterday I felt ___.",
      "answers": ["worried"]
    },
    {
      "template": "I could not find my ___.",
      "answers": ["homework"]
    },
    {
      "template": "Then I felt ___.",
      "answers": ["relieved"]
    },
    {
      "template": "At school I felt ___ because there was a ___ visitor.",
      "answers": ["excited", "special"]
    },
    {
      "template": "It was a ___ author!",
      "answers": ["famous"]
    },
    {
      "template": "At the end I felt ___ but ___.",
      "answers": ["tired", "happy"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "worried", "vi": "lo lắng", "distractor": false },
        { "word": "homework", "vi": "bài tập về nhà", "distractor": false },
        { "word": "relieved", "vi": "nhẹ nhõm", "distractor": false },
        { "word": "excited", "vi": "hào hứng", "distractor": false },
        { "word": "special", "vi": "đặc biệt", "distractor": false },
        { "word": "famous author", "vi": "nhà văn nổi tiếng", "distractor": false },
        { "word": "tired", "vi": "mệt", "distractor": false },
        { "word": "happy", "vi": "vui", "distractor": false },
        { "word": "bored", "vi": "chán", "distractor": true },
        { "word": "angry", "vi": "tức giận", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week24/story_writing_pic.jpg',
      image_prompt: "Yesterday, I went to a big, noisy amusement park with my funny older brother, and I went through a complete rollercoaster of different feelings! Early in the morning, I was very excited because I saw a huge, fast rollercoaster near the front entrance of the park. But when we slowly climbed to the top of the steep ride, I was suddenly terrified. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["worried","homework","relieved","excited","special","famous author","tired","happy"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 2
    }
  }
}