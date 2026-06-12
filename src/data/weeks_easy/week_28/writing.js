export default {
  title: "The Tortoise and the Hare",
  min_words: 50,
  min_sentences: 6,
  model_sentence: "Once the Hare and the Tortoise had a race. The Hare was very fast. He was sure he would win. Then he stopped under a big tree. He fell asleep. The Tortoise walked slowly but steadily. The Tortoise won the race.",
  instruction_en: "Retell the story of the tortoise and the hare in your own words!",
  instruction_vi: "Kể lại câu chuyện Rùa và Thỏ bằng lời của bạn!",
  prompt_en: "Who were the characters? What happened? Who won and why?",
  prompt_vi: "Nhân vật là ai? Chuyện gì xảy ra? Ai thắng và tại sao?",
  keywords: ["hare", "tortoise", "race", "fast", "asleep", "slowly", "won", "steady"],
  topic_talk_prompt: "Retell the story of the tortoise and the hare!",
  sentence_frames: [
    {
      "template": "Once the ___ and the Tortoise had a ___.",
      "answers": ["Hare", "race"]
    },
    {
      "template": "The Hare ran very ___.",
      "answers": ["fast"]
    },
    {
      "template": "Then he stopped under a big ___ and ___ asleep.",
      "answers": ["tree", "fell"]
    },
    {
      "template": "The Tortoise walked ___ but ___ and never gave up.",
      "answers": ["slowly", "steadily"]
    },
    {
      "template": "The Tortoise ___ the race.",
      "answers": ["won"]
    },
    {
      "template": "Slow and ___ wins the race.",
      "answers": ["steady"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "low",
      words: [
        { "word": "Hare", "vi": "Thỏ", "distractor": false },
        { "word": "race", "vi": "cuộc đua", "distractor": false },
        { "word": "fast", "vi": "nhanh", "distractor": false },
        { "word": "tree", "vi": "cây", "distractor": false },
        { "word": "fell asleep", "vi": "ngủ thiếp đi", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": false },
        { "word": "steadily", "vi": "đều đặn", "distractor": false },
        { "word": "won", "vi": "thắng", "distractor": false },
        { "word": "steady", "vi": "chắc", "distractor": false },
        { "word": "Elephant", "vi": "Voi", "distractor": true },
        { "word": "quietly", "vi": "im lặng", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week28/story_writing_pic.jpg',
      image_prompt: "Today, my teacher told us the famous story about a tortoise and a hare, but she gave it a very fun and modern twist! The hare was a very proud and confident animal, and he always boasted to his friends. He loudly said, \"I am faster than a fast car, a big bus, and even a long train!\" The tortoise, on the other hand, was quiet, patient, and very steady. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["proud and confident","boasted to his friends","faster than a fast car","quiet and patient","very fast motorbike","took a long nap","shady tree","old bicycle","bumpy road","finish line first","great winner","valuable lesson"],
      writing_prompts: {
        en: "Look at the picture. The tortoise and the hare had a race! Who was fast? Who was slow? What happened in the story? Use 3+ words from the word bank to tell the story.",
        vi: "Nhìn bức tranh. Con rùa và con thỏ đã đua nhau! Con nào nhanh? Con nào chậm? Chuyện gì đã xảy ra? Dùng 3+ từ trong ngân hàng từ để kể câu chuyện."
      },
      sentence_frames: [
        { "template": "The hare was ___", "answers": ["very fast"] },
        { "template": "The tortoise was ___", "answers": ["very slow"] },
        { "template": "One day, ___", "answers": ["they raced"] },
        { "template": "Meanwhile, ___", "answers": ["the hare slept"] },
        { "template": "In the end, ___", "answers": ["the tortoise won"] }
      ],
      min_sentences: 6,
      rubric_tier: 1
    }
  }
}