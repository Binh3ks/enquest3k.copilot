// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Writing Station — Advanced Mode

export default {
  title: "Jake's Accident Story",
  min_sentences: 8,
  theme: "accidents_and_consequences",
  min_words: 65,
  model_sentence: "Last week, Jake walked too fast in the school corridor and fell down near the staircase. He hurt his knee badly. His teacher came and said, 'Walk carefully, Jake!' The nurse cleaned the wound and put a bandage on it. Jake learned an important lesson: always walk carefully in the corridor. We must walk carefully to stay safe!",
  topic_talk_prompt: "Tell me about a time when you got hurt or saw someone get hurt at school!",
  sentence_frames: [
    { "template": "Leo was ___", "answers": ["running fast"] },
    { "template": "Suddenly, ___", "answers": ["he fell down"] },
    { "template": "His teacher ___", "answers": ["came to help"] },
    { "template": "After that, ___", "answers": ["she put a bandage"] },
    { "template": "The teacher ___", "answers": ["told him to be careful"] },
    { "template": "Now, Leo ___", "answers": ["walks slowly"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "walked", "vi": "đi bộ", "distractor": false },
        { "word": "ran", "vi": "chạy", "distractor": false },
        { "word": "fell", "vi": "ngã", "distractor": false },
        { "word": "hurt", "vi": "bị thương", "distractor": false },
        { "word": "began to bleed", "vi": "bắt đầu chảy máu", "distractor": false },
        { "word": "crying", "vi": "khóc", "distractor": false },
        { "word": "ran", "vi": "chạy đến", "distractor": false },
        { "word": "came", "vi": "đến", "distractor": false },
        { "word": "cleaned", "vi": "lau sạch", "distractor": false },
        { "word": "put", "vi": "đặt", "distractor": false },
        { "word": "learned", "vi": "học được", "distractor": false },
        { "word": "walk carefully", "vi": "đi cẩn thận", "distractor": false },
        { "word": "walks", "vi": "đi bộ", "distractor": false },
        { "word": "runs", "vi": "chạy", "distractor": false },
        { "word": "lesson", "vi": "bài học", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": true },
        { "word": "faster", "vi": "nhanh hơn", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week33/story_writing_pic.jpg',
      image_prompt: "This interesting picture shows a terrible and painful accident that happened at my school yesterday afternoon. My good friend Leo was running very fast down the main corridor because he was late for his important math class. He did not look carefully where he was going, and he completely ignored the strict school rules. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["running very fast down the corridor","slipped on the wet floor","fell down hard","hit his left knee","arm and leg hurt a lot","started crying loudly","kind teacher ran over","cold ice pack from nurse's office","gently put it on his knee","explained his careless mistake","I understand now","walk slowly and safely","learned a very important lesson","recovered and felt much better","ignoring the strict school rules"],
      writing_prompts: {
        en: "Look at the picture. Your friend Leo had a terrible accident at school. Describe what happened from the moment he ran to the corridor until the teacher helped him. Use accident verbs like fell, hit, hurt, and caught.",
        vi: "Nhìn bức tranh. Bạn Leo gặp tai nạn kinh khủng ở trường. Mô tả chuyện gì xảy ra từ lúc Leo chạy đến hành lang cho đến khi giáo viên giúp. Dùng các động từ tai nạn như fell, hit, hurt, và caught."
      },
      rubric_tier: 2,
      sentence_frames: [
        { "template": "Leo was ___", "answers": ["running fast"] },
        { "template": "Suddenly, ___", "answers": ["he fell down"] },
        { "template": "His teacher ___", "answers": ["came to help"] },
        { "template": "After that, ___", "answers": ["she put a bandage"] },
        { "template": "The teacher ___", "answers": ["told him to be careful"] },
        { "template": "Now, Leo ___", "answers": ["walks slowly"] }
      ]
    }
  }
}