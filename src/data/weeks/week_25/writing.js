export default {
  title: "My Step-by-Step Guide",
  min_words: 45,
  model_sentence: "Here is my step-by-step guide to making a jam sandwich, which is my all-time favourite snack. First of all, I grabbed two slices of soft bread from the bag. After that, I picked up the sharp knife and used it to spread strawberry jam on one top slice. After that, I pressed the two top slices together carefully. At the very end, I cut the sandwich in half and put it on a clean dinner plate. Now I understand why the right sequence matters. If I tried to eat first and spread the jam later, it would be a disaster! Every morning task follows its own right sequence.",
  instruction_en: "Write a step-by-step guide using First of all, After that, and At the very end!",
  instruction_vi: "Viết hướng dẫn từng bước dùng First of all, After that, At the very end!",
  prompt_en: "What are you guiding someone to do? What are all the steps in the right sequence?",
  prompt_vi: "Bạn đang hướng dẫn ai làm gì? Tất cả các bước theo trình tự đúng là gì?",
  keywords: ["grabbed", "spread strawberry jam", "pressed together", "cut the sandwich", "right sequence", "follows its own"],
  topic_talk_prompt: "Give me a really detailed step-by-step guide for your favourite thing to make!",
  sentence_frames: [
    {
      "template": "First of all, I ___ two slices of ___ from the bag.",
      "answers": ["grabbed", "soft bread"]
    },
    {
      "template": "After that, I picked up the ___ and used it to ___ on one top slice.",
      "answers": ["sharp knife", "spread strawberry jam"]
    },
    {
      "template": "After that, I ___ the two top slices ___ carefully.",
      "answers": ["pressed", "together"]
    },
    {
      "template": "At the very end, I ___ the sandwich in half and ___ it on a clean dinner ___.",
      "answers": ["cut", "put", "plate"]
    },
    {
      "template": "Now I understand why the ___ matters.",
      "answers": ["right sequence"]
    },
    {
      "template": "If I tried to ___ first and ___ the jam later, it would be a ___!",
      "answers": ["eat", "spread", "disaster"]
    },
    {
      "template": "Every morning task ___ its own ___.",
      "answers": ["follows", "right sequence"]
    },
    {
      "template": "The ___ and the ___ worked together to make the perfect sandwich.",
      "answers": ["knife", "bread"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "grabbed two slices", "vi": "lấy hai lát", "distractor": false },
        { "word": "soft bread", "vi": "bánh mì mềm", "distractor": false },
        { "word": "sharp knife", "vi": "dao sắc", "distractor": false },
        { "word": "spread strawberry jam", "vi": "phết mứt dâu tây", "distractor": false },
        { "word": "pressed together", "vi": "ép lại với nhau", "distractor": false },
        { "word": "cut the sandwich", "vi": "cắt bánh mì", "distractor": false },
        { "word": "put it on", "vi": "đặt lên", "distractor": false },
        { "word": "dinner plate", "vi": "đĩa ăn", "distractor": false },
        { "word": "right sequence", "vi": "trình tự đúng", "distractor": false },
        { "word": "disaster", "vi": "thảm họa", "distractor": false },
        { "word": "follows its own", "vi": "có trình tự riêng", "distractor": false },
        { "word": "a dirty sock", "vi": "tất bẩn", "distractor": true },
        { "word": "beautiful", "vi": "đẹp", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week25/story_writing_pic.jpg',
      image_prompt: "Today, I want to teach you how to make a perfect, delicious sandwich for a fun weekend picnic with your friends. You just need to follow these simple steps in the right order. First, you take two pieces of fresh, soft bread and put them neatly on a clean plate. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["grabbed two slices","soft bread","sharp knife","spread strawberry jam","pressed together","cut the sandwich","put it on","dinner plate","right sequence","disaster","follows its own"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 2
    }
  }
}