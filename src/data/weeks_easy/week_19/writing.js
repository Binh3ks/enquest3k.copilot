export default {
  title: "My Old Photo Album",
  min_words: 35,
  min_sentences: 6,
  instruction_en: "Write about an old photo of yourself!",
  instruction_vi: "Viết về một bức ảnh cũ của bạn!",
  prompt_en: "What did you look like as a baby? What were you like?",
  prompt_vi: "Bạn trông thế nào khi còn là em bé? Bạn như thế nào?",
  topic_talk_prompt: "Describe yourself as a baby!",
  show_by_default: true,
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "old photo album",
    "young tiny baby",
    "very small and cute",
    "extremely noisy",
    "very brave and smart",
    "first day of kindergarten",
    "big blue backpack",
    "a little shy",
    "tall and confident",
    "wonderful pictures"
  ],
  sentence_frames: [
    {
      "template": "I am looking at my ___ ___. There are many pictures inside.",
      "answers": ["old photo album"]
    },
    {
      "template": "I was a ___ ___. I was ___ and ___.",
      "answers": ["young tiny baby", "very small", "cute"]
    },
    {
      "template": "My baby brother was ___ ___. He cried a lot!",
      "answers": ["extremely noisy"]
    },
    {
      "template": "In this picture, I am ___ and ___. I like this photo!",
      "answers": ["very brave", "smart"]
    },
    {
      "template": "This is my ___ ___. I have a ___ ___. I am a little ___.",
      "answers": ["first day of kindergarten", "big blue backpack", "shy"]
    },
    {
      "template": "These are ___ ___ pictures. I ___ them!",
      "answers": ["wonderful", "love"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {"word":"old photo album","vi":"album ảnh cũ","distractor":false},
        {"word":"baby pictures","vi":"ảnh em bé","distractor":false},
        {"word":"tiny baby","vi":"em bé nhỏ xíu","distractor":false},
        {"word":"cute and round","vi":"dễ thương và tròn trịa","distractor":false},
        {"word":"noisy baby","vi":"em bé ồn ào","distractor":false},
        {"word":"sitting in the living room","vi":"ngồi trong phòng khách","distractor":false},
        {"word":"looking at old photos","vi":"nhìn ảnh cũ","distractor":false},
        {"word":"big blue backpack","vi":"ba-lô xanh lớn","distractor":false},
        {"word":"first day of school","vi":"ngày đầu tiên đi học","distractor":false},
        {"word":"confident smile","vi":"nụ cười tự tin","distractor":false},
        {"word":"angry baby","vi":"em bé giận dữ","distractor":true},
        {"word":"boring photos","vi":"ảnh nhàm chán","distractor":true}
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week19/story_writing_pic.jpg',
      image_prompt: "Today is a quiet, rainy afternoon, so I am sitting in the living room and looking at an old, heavy family photo album with my mother. In this very first picture, I was just a young, tiny baby. I was very small, round, and cute, but my mother always says that I was also extremely noisy! Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "old photo album",
        "young tiny baby",
        "very small and cute",
        "extremely noisy",
        "very brave and smart",
        "first day of kindergarten",
        "big blue backpack",
        "a little shy",
        "tall and confident",
        "wonderful pictures"
      ],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What are they doing? What stories do the photos tell? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ đang làm gì? Những bức ảnh kể câu chuyện gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1,
      sentence_frames: [
        { "template": "In this photo, I ___", "answers": ["was young"] },
        { "template": "My brother ___", "answers": ["was kind"] },
        { "template": "On my first day of school, ___", "answers": ["I was nervous"] },
        { "template": "The classroom was ___", "answers": ["big"] },
        { "template": "But now, I ___", "answers": ["am taller"] }
      ]
    }
  }
}
