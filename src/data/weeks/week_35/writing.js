// WEEK 35: DOING THINGS CAREFULLY
// Writing Station — Advanced Mode

export default {
  title: "Max's Big Change — Doing Things Carefully",
  theme: "personal_growth",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "My friend Max used to do things very quickly, noisily, and carelessly. He accidentally broke his expensive toys and dropped his mother's favorite glass cup. But he learned a big lesson and finally decided to change. Now he does his math homework carefully and slowly, speaks kindly and quietly to his little sister, shares his colorful toys happily, and packs his heavy backpack neatly. His parents are very proud of his new, polite behavior!",
  topic_talk_prompt: "Tell me about a habit you changed — what did you use to do, and how did you improve?",
  sentence_frames: [
    { "template": "In the past, Max ___", "answers": ["did things carelessly"] },
    { "template": "One day, ___", "answers": ["he broke a glass cup"] },
    { "template": "Now, he ___", "answers": ["does homework carefully"] },
    { "template": "At school, ___", "answers": ["he speaks kindly"] },
    { "template": "Finally, ___", "answers": ["he changed his habits"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "carefully", "vi": "cẩn thận", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": false },
        { "word": "accidentally", "vi": "tình cờ", "distractor": false },
        { "word": "kindly", "vi": "tử tế", "distractor": false },
        { "word": "quietly", "vi": "im lặng", "distractor": false },
        { "word": "finally", "vi": "cuối cùng", "distractor": false },
        { "word": "happily", "vi": "vui vẻ", "distractor": false },
        { "word": "loudly", "vi": "to", "distractor": false },
        { "word": "neatly", "vi": "gọn gàng", "distractor": false },
        { "word": "decided to change", "vi": "quyết định thay đổi", "distractor": false },
        { "word": "broke into pieces", "vi": "vỡ thành nhiều mảnh", "distractor": false },
        { "word": "heavy backpack", "vi": "cặp sách nặng", "distractor": false },
        { "word": "proud of", "vi": "tự hào về", "distractor": false },
        { "word": "bad habits", "vi": "thói quen xấu", "distractor": false },
        { "word": "clearly understands", "vi": "hiểu rõ ràng", "distractor": false },
        { "word": "beautiful", "vi": "đẹp", "distractor": true },
        { "word": "amazing", "vi": "tuyệt vời", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week35/story_writing_pic.jpg',
      image_prompt: "I have a very good friend named Max, and I want to tell you a story about his important personal experience. In the past, Max always did things very quickly, noisily, and carelessly. Because he was always in a big hurry, he often walked loudly down the school halls, closed the heavy doors forcefully, and accidentally broke his expensive toys. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["did things carelessly","walked loudly","broke his toys","dropped the glass cup","decided to change","does homework carefully","speaks kindly and quietly","shares toys happily","packs his backpack neatly","proud of his behavior","clearly understands","makes everyone happier","accidentally dropped","big lesson"],
      sentence_frames: [
        { "template": "In the past, Max ___", "answers": ["did things carelessly"] },
        { "template": "One day, ___", "answers": ["he broke a glass cup"] },
        { "template": "Now, he ___", "answers": ["does homework carefully"] },
        { "template": "At school, ___", "answers": ["he speaks kindly"] },
        { "template": "Finally, ___", "answers": ["he changed his habits"] }
      ],
      writing_prompts: {
        en: "Look at the picture and tell Max's story. What was Max like before? How did he change? Use 3+ phrases from the word bank to retell the story.",
        vi: "Nhìn bức tranh và kể câu chuyện của Max. Max trước đây như thế nào? Anh ấy đã thay đổi ra sao? Dùng 3+ cụm từ trong ngân hàng từ để kể lại câu chuyện."
      },
      rubric_tier: 1
    }
  }
}