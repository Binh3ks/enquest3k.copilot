export default {
  title: "Writing: Tom's Very Busy Saturday",
  audio_url: null,
  min_words: 65,
  min_sentences: 8,
  model_sentence: "Last Saturday, I woke up early and had a very busy day. First, I made my bed and kept my room tidy. Then I wrote a letter to my grandmother and did all my homework. In the afternoon, I helped Dad cut the grass and we built a birdhouse together. At the café, I chose my own lunch and paid for it myself. By evening, I put everything away and fell asleep very quickly — it was my best Saturday ever!",
  instruction_en: "Write about a busy Saturday using at least 5 task verbs (woke, made, did, wrote, cut, built, put, kept, chose, or paid)!",
  instruction_vi: "Viết về một ngày thứ Bảy bận rộn, sử dụng ít nhất 5 động từ công việc (woke, made, did, wrote, cut, built, put, kept, chose, hoặc paid)!",
  prompt_en: "What did you do on a busy Saturday? Use: woke, made, did, wrote, cut, built, put, kept, chose, paid",
  prompt_vi: "Bạn đã làm gì vào một ngày thứ Bảy bận rộn? Dùng: woke, made, did, wrote, cut, built, put, kept, chose, paid",
  keywords: ["woke", "made", "did", "wrote", "cut", "built", "put", "kept", "chose", "paid", "tidy", "birdhouse", "letter", "café", "early", "asleep"],
  topic_talk_prompt: "Tell me about your busiest Saturday — what did you make, do, write, or build? Did you wake up early? Did you choose something special?",
  sentence_frames: [
    {
      "template": "Last Saturday, I woke up ___ and made ___.",
      "answers": ["early","my bed"]
    },
    {
      "template": "First, I did ___ and wrote ___ to ___.",
      "answers": ["homework","a letter","my grandmother"]
    },
    {
      "template": "Then I cut ___ and put ___ away.",
      "answers": ["the grass","my tools"]
    },
    {
      "template": "I kept my room ___ by ___.",
      "answers": ["tidy","cleaning"]
    },
    {
      "template": "My mum/dad and I built ___ together.",
      "answers": ["a birdhouse"]
    },
    {
      "template": "I chose ___ because ___.",
      "answers": ["a muffin","I was hungry"]
    },
    {
      "template": "At the café, I paid for ___ with my ___.",
      "answers": ["it","my own money"]
    },
    {
      "template": "By evening, I put ___ away and fell asleep ___.",
      "answers": ["my things","early"]
    },
    {
      "template": "I felt ___ because I ___.",
      "answers": ["proud","had a productive day"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {"word": "woke", "vi": "thức dậy", "distractor": false},
        {"word": "made", "vi": "làm", "distractor": false},
        {"word": "did", "vi": "đã làm", "distractor": false},
        {"word": "wrote", "vi": "đã viết", "distractor": false},
        {"word": "cut", "vi": "cắt", "distractor": false},
        {"word": "built", "vi": "đã xây", "distractor": false},
        {"word": "put", "vi": "đã để", "distractor": false},
        {"word": "kept", "vi": "đã giữ", "distractor": false},
        {"word": "chose", "vi": "đã chọn", "distractor": false},
        {"word": "paid", "vi": "đã trả", "distractor": false},
        {"word": "bed", "vi": "giường", "distractor": true},
        {"word": "letter", "vi": "thư", "distractor": true},
        {"word": "birdhouse", "vi": "chuồng chim", "distractor": true},
        {"word": "cafe", "vi": "quán cà phê", "distractor": true},
        {"word": "morning", "vi": "buổi sáng", "distractor": true},
        {"word": "homework", "vi": "bài tập về nhà", "distractor": true}
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week32/story_writing_pic.jpg',
      image_prompt: "My grandmother is a very active, healthy, and independent woman, and she had an incredibly busy Saturday last weekend. Early in the morning, she woke up at five o'clock, opened all her windows, and completely tidied her big, messy bedroom until it was perfectly clean. Then, she put on her old leather boots, went out to the large garden, and cut the long green grass near the wooden fence. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["incredibly busy Saturday","woke up at five o'clock","completely tidied her bedroom","old leather boots","cut the long green grass","built a beautiful birdhouse","hung the birdhouse on a tree branch","drank a warm cup of tea","wrote a long letter","chose soft cotton fabric","make a brand new dress","very tired but satisfied","very active and independent","admire her amazing energy"],
      writing_prompts: {
        en: "Look at the picture. Your grandmother had a very busy Saturday. Describe everything she did from early morning to evening using task verbs like woke, built, wrote, chose, and cut.",
        vi: "Nhìn bức tranh. Bà của bạn đã có một ngày thứ Bảy rất bận rộn. Mô tả mọi thứ bà ấy đã làm từ sáng sớm đến tối dùng các động từ woke, built, wrote, chose, và cut."
      },
      rubric_tier: 2,
      sentence_frames: [
        {"template": "Last Saturday, I woke up ___", "answers": ["at five o'clock"]},
        {"template": "First, I completely ___", "answers": ["tidied my bedroom"]},
        {"template": "Then I wrote a long ___", "answers": ["letter"]},
        {"template": "I helped Dad cut the ___", "answers": ["long green grass"]},
        {"template": "We built a beautiful ___", "answers": ["birdhouse"]},
        {"template": "At the café, I chose ___", "answers": ["a muffin"]},
        {"template": "I paid with my own ___", "answers": ["money"]},
        {"template": "By evening I felt very ___", "answers": ["tired but satisfied"]}
      ]
    }
  }
}