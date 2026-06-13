export default {
  title: "Writing: My Very Busy Saturday",
  audio_url: null,
  min_words: 40,
  model_sentence: "Last Saturday, I woke up early and made my bed. Then I wrote a letter to my grandmother. I helped Dad cut the grass and we built a birdhouse. At the café, I chose a muffin and paid for it myself. I put all my things away in the evening. I fell asleep early because I was so tired!",
  instruction_en: "Write about your own busy Saturday using at least 4 task verbs (woke, made, did, wrote, cut, built, put, chose, or paid)!",
  instruction_vi: "Viết về ngày thứ Bảy bận rộn của bạn, sử dụng ít nhất 4 động từ công việc (woke, made, did, wrote, cut, built, put, chose, hoặc paid)!",
  prompt_en: "What did you do on a busy Saturday? Use: woke, made, did, wrote, cut, built, put, chose, paid",
  prompt_vi: "Bạn đã làm gì vào ngày thứ Bảy bận rộn? Dùng: woke, made, did, wrote, cut, built, put, chose, paid",
  keywords: ["woke", "made", "did", "wrote", "cut", "built", "put", "chose", "paid", "tidy", "birdhouse", "letter", "café", "early", "asleep"],
  topic_talk_prompt: "Tell me about your Saturday — what did you make, do, or build? Did you wake up early? What did you choose?",
  sentence_frames: [
    { template: "Last Saturday, I woke up ___ and made ___.", answers: ["early", "my bed"] },
    { template: "First, I kept my room ___ by ___.", answers: ["tidy", "cleaning"] },
    { template: "Then I wrote ___ to my ___.", answers: ["a letter", "grandmother"] },
    { template: "I helped ___ cut the ___.", answers: ["Dad", "grass"] },
    { template: "We built ___ together.", answers: ["a birdhouse"] },
    { template: "I chose ___ at the ___.", answers: ["a muffin", "café"] },
    { template: "I paid for ___ with my ___.", answers: ["it", "own money"] },
    { template: "At night, I put ___ away and fell asleep ___.", answers: ["my things", "early"] }
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
        {"word": "muffin", "vi": "bánh muffin", "distractor": true},
        {"word": "early", "vi": "sớm", "distractor": true}
      ]
    }
  }
,
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week32/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 32 story writing.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "Early in the morning, ___", "answers": ["she woke up early"]},
        {"template": "Then, she ___", "answers": ["tidied her bedroom"]},
        {"template": "In the afternoon, ___", "answers": ["she wrote a letter"]},
        {"template": "In the evening, ___", "answers": ["she felt tired but happy"]}
      ]
    }
  }
}
