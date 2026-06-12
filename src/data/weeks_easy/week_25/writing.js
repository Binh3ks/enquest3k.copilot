export default {
  title: "How to Make a Perfect Sandwich",
  min_words: 45,
  min_sentences: 6,
  model_sentence: "Here is how I make a jam sandwich. First of all I take two slices of bread. After that I spread strawberry jam on one slice. Then I press the two slices together. At the very end I cut it in half. Now I understand why the right sequence matters!",
  instruction_en: "Write a step-by-step guide using First of all, After that, Then, At the very end!",
  instruction_vi: "Viết hướng dẫn từng bước dùng First of all, After that, Then, At the very end!",
  prompt_en: "What is your guide about? What are the steps from first to finally?",
  prompt_vi: "Hướng dẫn của bạn về điều gì? Các bước từ đầu đến cuối là gì?",
  keywords: ["sandwich", "slices", "bread", "jam", "spread", "cut", "right sequence"],
  topic_talk_prompt: "Give me a step-by-step guide for something you know how to do!",
  sentence_frames: [
    {
      "template": "First of all I take two ___ of ___.",
      "answers": ["slices", "bread"]
    },
    {
      "template": "After that I ___ strawberry ___ on one slice.",
      "answers": ["spread", "jam"]
    },
    {
      "template": "Then I press the two ___ together.",
      "answers": ["slices"]
    },
    {
      "template": "At the very end I ___ it in half.",
      "answers": ["cut"]
    },
    {
      "template": "Now I understand why the ___ ___ matters!",
      "answers": ["right sequence"]
    },
    {
      "template": "If I ate first and spread jam later, it would be a ___!",
      "answers": ["disaster"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "slices of bread", "vi": "lát bánh mì", "distractor": false },
        { "word": "spread", "vi": "phết", "distractor": false },
        { "word": "strawberry jam", "vi": "mứt dâu tây", "distractor": false },
        { "word": "slices together", "vi": "lát bánh lại", "distractor": false },
        { "word": "cut it in half", "vi": "cắt làm đôi", "distractor": false },
        { "word": "right sequence", "vi": "trình tự đúng", "distractor": false },
        { "word": "disaster", "vi": "thảm họa", "distractor": false },
        { "word": "bags", "vi": "túi", "distractor": true },
        { "word": "pour", "vi": "đổ", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week25/story_writing_pic.jpg',
      image_prompt: "Today, I want to teach you how to make a perfect, delicious sandwich for a fun weekend picnic with your friends. You just need to follow these simple steps in the right order. First, you take two pieces of fresh, soft bread and put them neatly on a clean plate. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["fresh soft bread","clean plate","green vegetables","cold meat","fried egg","thick slice of cheese","press it down gently","wash your hands","clean the table","kitchen sink","simple steps"],
      writing_prompts: {
        en: "Look at the picture. You are making a sandwich! Write about how to make the perfect sandwich step by step using words from the word bank.",
        vi: "Nhìn bức tranh. Bạn đang làm bánh mì sandwich! Viết về cách làm bánh mì hoàn hảo từng bước dùng các từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        { "template": "First, ___", "answers": ["get the bread"] },
        { "template": "Next, ___", "answers": ["wash hands"] },
        { "template": "Then, ___", "answers": ["add jam"] },
        { "template": "After that, ___", "answers": ["press it down"] },
        { "template": "Finally, ___", "answers": ["cut in half"] }
      ]
    }
  }
}