export default {
  title: "My Old Photo Album",
  min_words: 50,
  min_sentences: 8,
  instruction_en: "Write about looking at old photos using was and were to describe the past!",
  instruction_vi: "Viết về việc xem ảnh cũ dùng was và were để mô tả quá khứ!",
  prompt_en: "What did you look like as a baby? What were you like? Who helped you feel safe?",
  prompt_vi: "Bạn trông thế nào hồi bé? Bạn như thế nào? Ai giúp bạn cảm thấy an toàn?",
  topic_talk_prompt: "Look at a photo of yourself as a baby — describe what you see!",
  vocabulary_bank: [
    "sitting in the living room",
    "looking at an old photo album",
    "just a young tiny baby",
    "very small round and cute",
    "extremely noisy",
    "not quiet like my brother",
    "very brave and smart",
    "hold my hand and feel safe",
    "first day of kindergarten",
    "big blue school backpack",
    "very happy to wear",
    "a little shy and nervous",
    "tall strong and confident",
    "wonderful funny pictures"
  ],
  sentence_frames: [
    {
      "template": "Today is a rainy afternoon, so I am ___ ___ ___ ___ ___ with my mother. We are ___ ___ ___ ___ ___ ___ ___.",
      "answers": ["sitting in the living room", "looking at an old photo album"]
    },
    {
      "template": "In this first picture, I was just a young, ___ ___ ___. I was very small, round, and ___ ___ ___.",
      "answers": ["tiny baby", "cute"]
    },
    {
      "template": "My mother says I was also extremely ___ ___ ___! I was definitely not quiet like my ___ ___ ___ ___.",
      "answers": ["noisy", "older brother"]
    },
    {
      "template": "He was very ___ ___ ___ and smart. Whenever I was ___ ___ ___ ___, he was always there to ___ ___ ___ ___ ___.",
      "answers": ["brave", "scared", "hold my hand"]
    },
    {
      "template": "This next picture shows me on my very ___ ___ ___ ___ ___ ___ ___. My blue school backpack was so ___ ___ ___ that it looked funny on my ___ ___ ___ ___.",
      "answers": ["first day of kindergarten", "big", "small back"]
    },
    {
      "template": "I was very happy to wear my new uniform, but I was also a ___ ___ ___ ___ because all the other children were ___ ___ ___ ___ ___ ___.",
      "answers": ["little shy", "strangers to me"]
    },
    {
      "template": "The classroom was very ___ ___ ___ and the teacher was incredibly ___ ___ ___.",
      "answers": ["bright", "kind"]
    },
    {
      "template": "Now I am ten years old. I am a tall, ___ ___ ___, and confident student. I love these wonderful ___ ___ ___ ___ from when I was very small!",
      "answers": ["strong", "funny pictures"]
    }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week19/story_writing_pic.jpg',
      image_prompt: "Today is a quiet, rainy afternoon, so I am sitting in the living room and looking at an old, heavy family photo album with my mother. In this very first picture, I was just a young, tiny baby. I was very small, round, and cute, but my mother always says that I was also extremely noisy! Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "sitting in the living room",
        "looking at an old photo album",
        "just a young tiny baby",
        "very small round and cute",
        "extremely noisy",
        "not quiet like my brother",
        "very brave and smart",
        "hold my hand and feel safe",
        "first day of kindergarten",
        "big blue school backpack",
        "very happy to wear",
        "a little shy and nervous",
        "tall strong and confident",
        "wonderful funny pictures"
      ],
      writing_prompts: {
        en: "Look at the picture. Who is looking at the photo album? What can you see in the old photos? Describe the baby, the brother, and the first day of school using was and were.",
        vi: "Nhìn bức tranh. Ai đang xem album ảnh? Bạn thấy gì trong ảnh cũ? Mô tả em bé, anh trai, và ngày đầu tiên đi học dùng was và were."
      },
      rubric_tier: 1,
      sentence_frames: [
        {"template": "In this photo, I ___", "answers": ["was a baby"]},
        {"template": "My brother ___", "answers": ["was very noisy"]},
        {"template": "On my first day, ___", "answers": ["I was so shy"]},
        {"template": "But now, I ___", "answers": ["am much taller"]}
      ]
    }
  }
};