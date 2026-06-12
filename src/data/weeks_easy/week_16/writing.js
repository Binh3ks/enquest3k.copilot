export default {
  title: "School Sports Day",
  min_words: 35,
  min_sentences: 6,
  instruction_en: "Write about a school sports day!",
  instruction_vi: "Viết về ngày thể thao ở trường!",
  prompt_en: "What sports are you playing? What can you see?",
  prompt_vi: "Bạn đang chơi môn thể thao nào? Bạn thấy gì?",
  topic_talk_prompt: "Talk about a sports day at school!",
  show_by_default: true,
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "running in different races",
    "cheering loudly",
    "waving colorful flags",
    "kicking the ball powerfully",
    "jumping very high",
    "landing safely",
    "overtaking other runners",
    "the whole schoolyard",
    "full of energy",
    "trying their best"
  ],
  sentence_frames: [
    { "template": "Right now, ___", "answers": ["the students are running"] },
    { "template": "At the track, ___", "answers": ["the race is starting"] },
    { "template": "Meanwhile, ___", "answers": ["the crowd is cheering"] },
    { "template": "At the bleachers, ___", "answers": ["friends are waving flags"] },
    { "template": "After the race, ___", "answers": ["everyone is happy"] }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week16/story_writing_pic.jpg',
      image_prompt: "This is a fantastic picture of an incredibly exciting football match at my school. The weather is perfect for sports, and the students are playing with great energy on the big green field. The game is moving very fast, and everyone is trying their absolute best to win. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "running in different races",
        "cheering loudly",
        "waving colorful flags",
        "kicking the ball powerfully",
        "jumping very high",
        "landing safely",
        "overtaking other runners",
        "the whole schoolyard",
        "full of energy",
        "trying their best"
      ],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1,
      sentence_frames: [
        { "template": "Right now, ___", "answers": ["the students are playing"] },
        { "template": "At the track, ___", "answers": ["the race is exciting"] },
        { "template": "Meanwhile, ___", "answers": ["the crowd is cheering"] },
        { "template": "At the bleachers, ___", "answers": ["parents are watching"] },
        { "template": "After the race, ___", "answers": ["everyone is happy"] }
      ]
    }
  }
}
