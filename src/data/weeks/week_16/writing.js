export default {
  title: "School Sports Day",
  min_words: 50,
  min_sentences: 8,
  instruction_en: "Write about a school sports day using the present continuous tense!",
  instruction_vi: "Viết về ngày hội thao trường học dùng thì hiện tại tiếp diễn!",
  prompt_en: "Who is running, jumping, or kicking? What is the crowd doing?",
  prompt_vi: "Ai đang chạy, nhảy, hoặc sút bóng? Đám đông đang làm gì?",
  topic_talk_prompt: "Describe your favorite sports day moment — what was happening?",
  vocabulary_bank: [
    "cheering loudly",
    "waving colorful flags",
    "supporting their teams",
    "running in different races",
    "overtaking other runners",
    "jumping very high",
    "landing safely in the sandpit",
    "kicking the ball powerfully",
    "leaping to catch the ball",
    "trying their absolute best",
    "cheering enthusiastically",
    "standing at the edge",
    "jumping up and down",
    "creating a wonderful atmosphere"
  ],
  sentence_frames: [
    { "template": "Right now, ___", "answers": ["the whole school is celebrating"] },
    { "template": "At the track, ___", "answers": ["students are running fast"] },
    { "template": "On the field, ___", "answers": ["the game is very exciting"] },
    { "template": "Meanwhile, ___", "answers": ["the crowd is cheering loudly"] },
    { "template": "At the bleachers, ___", "answers": ["parents are waving flags"] },
    { "template": "After the race, ___", "answers": ["everyone is celebrating"] }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week16/story_writing_pic.jpg',
      image_prompt: "This is a fantastic picture of an incredibly exciting football match at my school. The weather is perfect for sports, and the students are playing with great energy on the big green field. The game is moving very fast, and everyone is trying their absolute best to win. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "cheering loudly",
        "waving colorful flags",
        "supporting their teams",
        "running in different races",
        "overtaking other runners",
        "jumping very high",
        "landing safely in the sandpit",
        "kicking the ball powerfully",
        "leaping to catch the ball",
        "trying their absolute best",
        "cheering enthusiastically",
        "standing at the edge",
        "jumping up and down",
        "creating a wonderful atmosphere"
      ],
      writing_prompts: {
        en: "Look at the picture. Who is running, jumping, or kicking the ball? What is the crowd doing? Describe the exciting sports day scene using present continuous tense and 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Ai đang chạy, nhảy, hoặc sút bóng? Đám đông đang làm gì? Mô tả cảnh ngày hội thao sôi động dùng thì hiện tại tiếp diễn và 3+ cụm từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      sentence_frames: [
        { "template": "Right now, ___", "answers": ["the students are playing"] },
        { "template": "At the track, ___", "answers": ["runners are racing fast"] },
        { "template": "On the field, ___", "answers": ["the game is exciting"] },
        { "template": "Meanwhile, ___", "answers": ["the crowd is cheering"] },
        { "template": "At the bleachers, ___", "answers": ["parents are watching"] },
        { "template": "After the race, ___", "answers": ["everyone is celebrating"] }
      ]
    }
  }
}