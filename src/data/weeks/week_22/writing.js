export default {
  title: "Detective Nova's Case Interview",
  min_words: 55,
  min_sentences: 8,
  instruction_en: "Write about a detective interview using past tense and time expressions!",
  instruction_vi: "Viết về cuộc phỏng vấn thám tử dùng thì quá khứ và các cụm từ chỉ thời gian!",
  prompt_en: "What questions did Nova ask? How did the suspect answer? What was the final report?",
  prompt_vi: "Nova đã hỏi câu nào? Nghi phạm trả lời thế nào? Báo cáo cuối cùng là gì?",
  topic_talk_prompt: "Tell me about a detective interview — what questions were asked and how were they answered?",
  sentence_frames: [
    {
      "template": "My name is Mia and I am a Time ___.",
      "answers": ["Detective"]
    },
    {
      "template": "I wear a big hat and carry a notebook to ask ___.",
      "answers": ["questions"]
    },
    {
      "template": "Yesterday, Mum cooked a delicious chocolate cake for my ___!",
      "answers": ["birthday"]
    },
    {
      "template": "But someone ate the cake last ___.",
      "answers": ["night"]
    },
    {
      "template": "I asked everyone in the ___.",
      "answers": ["house"]
    },
    {
      "template": "Dad said he cooked dinner at 6 o'clock and washed the ___ at 7.",
      "answers": ["dishes"]
    },
    {
      "template": "Mum worked in the garden one ___ last weekend.",
      "answers": ["morning"]
    },
    {
      "template": "The mystery was ___! My brother ate the cake!",
      "answers": ["solved"]
    },
    {
      "template": "I wrote down all my clues in my ___.",
      "answers": ["notebook"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "Time Detective", "vi": "Thám tử Thời gian", "distractor": false },
        { "word": "big hat", "vi": "mũ to", "distractor": false },
        { "word": "holding a notebook", "vi": "cầm sổ tay", "distractor": false },
        { "word": "chocolate cake", "vi": "bánh sô-cô-la", "distractor": false },
        { "word": "ask questions", "vi": "hỏi câu hỏi", "distractor": false },
        { "word": "last night", "vi": "tối qua", "distractor": false },
        { "word": "cooked dinner", "vi": "nấu bữa tối", "distractor": false },
        { "word": "washed the dishes", "vi": "rửa bát", "distractor": false },
        { "word": "this morning", "vi": "sáng nay", "distractor": false },
        { "word": "last weekend", "vi": "cuối tuần trước", "distractor": false },
        { "word": "worked in the garden", "vi": "làm vườn", "distractor": false },
        { "word": "an hour ago", "vi": "1 giờ trước", "distractor": false },
        { "word": "very hungry", "vi": "rất đói", "distractor": false },
        { "word": "mystery solved", "vi": "bí ẩn đã giải", "distractor": false },
        { "word": "wrote down clues", "vi": "ghi lại manh mối", "distractor": false },
        { "word": "asked about last night", "vi": "hỏi về tối qua", "distractor": true },
        { "word": "found some evidence", "vi": "tìm bằng chứng", "distractor": true },
        { "word": "checked all the rooms", "vi": "kiểm tra phòng", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week22/story_writing_pic.jpg',
      image_prompt: "I am playing a very fun and exciting game with my family today. I am wearing a big hat and holding a notebook because I am the Time Detective! Someone ate my delicious chocolate cake last night, and I really want to find out who did it. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "Time Detective",
        "big hat",
        "holding a notebook",
        "chocolate cake",
        "ask questions",
        "last night",
        "cooked dinner",
        "washed the dishes",
        "this morning",
        "last weekend",
        "worked in the garden",
        "chocolate on his face",
        "an hour ago",
        "very hungry",
        "mystery solved"
      ],
      writing_prompts: {
        en: "Look at the picture. You are the Time Detective! Someone ate your cake last night. Write about your detective game using 'Did you...?' questions and time expressions like last night, this morning, and last weekend.",
        vi: "Nhìn bức tranh. Bạn là Time Detective! Ai đó ăn bánh của bạn tối qua. Viết về trò thám tử dùng câu hỏi 'Did you...?' và các cụm từ chỉ thời gian như last night, this morning, last weekend."
      },
      rubric_tier: 1,
      min_sentences: 8,
      sentence_frames: [
        {"template": "My name is Mia and I am a ___", "answers": ["Time Detective"]},
        {"template": "I wear a big ___", "answers": ["hat"]},
        {"template": "Yesterday, Mum cooked ___", "answers": ["a chocolate cake"]},
        {"template": "But someone ___", "answers": ["ate the cake"]},
        {"template": "I asked ___", "answers": ["everyone in the house"]},
        {"template": "Dad said he ___", "answers": ["cooked dinner"]},
        {"template": "Mum worked ___", "answers": ["in the garden"]},
        {"template": "The mystery was ___", "answers": ["solved"]}
      ]
    }
  }
}