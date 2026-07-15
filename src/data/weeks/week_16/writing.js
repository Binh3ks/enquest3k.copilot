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
    {
      "template": "Today is our school sports day! Hundreds of students are ___ on the track.",
      "answers": ["running in different races"]
    },
    {
      "template": "The whole schoolyard is full of ___ and excitement!",
      "answers": ["energy"]
    },
    {
      "template": "Minh is running quickly. He is ___ other runners with strong strides.",
      "answers": ["overtaking"]
    },
    {
      "template": "Lan is ___ for the long jump.",
      "answers": ["preparing"]
    },
    {
      "template": "She is jumping very high and ___ safely in the sandpit.",
      "answers": ["landing"]
    },
    {
      "template": "Nam is ___ the ball powerfully toward the goal.",
      "answers": ["kicking"]
    },
    {
      "template": "The goalkeeper is ___ to catch the ball!",
      "answers": ["leaping"]
    },
    {
      "template": "On the bleachers, parents are waving ___ and cheering enthusiastically.",
      "answers": ["colorful flags"]
    },
    {
      "template": "Teachers and parents are standing at the edge and ___ for the young athletes.",
      "answers": ["cheering loudly"]
    },
    {
      "template": "The crowd is ___ on the bleachers because the event is incredibly exciting!",
      "answers": ["jumping up and down"]
    },
    {
      "template": "I am standing at the edge of the field. What a wonderful sports day!",
      "answers": []
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "running in different races", "vi": "đang chạy nhiều cuộc đua", "distractor": false },
        { "word": "cheering loudly", "vi": "cổ vũ ầm ĩ", "distractor": false },
        { "word": "waving colorful flags", "vi": "vẫy cờ nhiều màu", "distractor": false },
        { "word": "kicking the ball powerfully", "vi": "sút bóng mạnh", "distractor": false },
        { "word": "jumping very high", "vi": "nhảy rất cao", "distractor": false },
        { "word": "overtaking other runners", "vi": "vượt qua người chạy khác", "distractor": false },
        { "word": "the whole schoolyard", "vi": "cả sân trường", "distractor": false },
        { "word": "full of energy", "vi": "tràn đầy năng lượng", "distractor": false },
        { "word": "loud and exciting", "vi": "ồn ào và sôi động", "distractor": false },
        { "word": "so much fun", "vi": "vui lắm", "distractor": false },
        { "word": "tired but happy", "vi": "mệt nhưng vui", "distractor": false },
        { "word": "wearing sporty clothes", "vi": "mặc đồ thể thao", "distractor": false },
        { "word": "drinking cold water", "vi": "uống nước lạnh", "distractor": false },
        { "word": "eating sweet snacks", "vi": "ăn bánh ngọt", "distractor": false },
        { "word": "sitting under a tree", "vi": "ngồi dưới cây", "distractor": true },
        { "word": "laughing with friends", "vi": "cười với bạn", "distractor": true },
        { "word": "winning the medal", "vi": "giành huy chương", "distractor": true }
      ]
    }
  },
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
        {"template": "At the track, ___", "answers": ["students are running"]},
        {"template": "On the field, ___", "answers": ["the game is exciting"]},
        {"template": "Near the long jump, ___", "answers": ["a girl is jumping high"]},
        {"template": "The goalkeeper is ___", "answers": ["catching the ball"]},
        {"template": "Meanwhile, ___", "answers": ["the crowd is cheering"]},
        {"template": "On the bleachers, ___", "answers": ["parents are waving flags"]},
        {"template": "After the race, ___", "answers": ["everyone celebrates"]},
        {"template": "What a ___", "answers": ["wonderful sports day"]}
      ]
    }
  }
}