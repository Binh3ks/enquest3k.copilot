export default {
  title: "My First Soccer Game",
  min_words: 30,
  vocabulary_bank: {
    label_en: "Need help? Click next to each blank",
    label_vi: "Can ho tro? Bam ben canh moi o",
    show_by_default: true,
    scaffolding_stage: "medium",
    words: [
      { "word": "very excited", "vi": "rat phan khich", "distractor": false },
      { "word": "running very fast", "vi": "chay rat nhanh", "distractor": false },
      { "word": "kicking the ball", "vi": "sut bong", "distractor": false },
      { "word": "catching it", "vi": "bat no", "distractor": false },
      { "word": "passing it", "vi": "chuyen no", "distractor": false },
      { "word": "has energy", "vi": "co nang luong", "distractor": false },
      { "word": "in motion", "vi": "dang chuyen dong", "distractor": false },
      { "word": "moving fast", "vi": "di chuyen nhanh", "distractor": false },
      { "word": "playing soccer", "vi": "choi bong", "distractor": false },
      { "word": "cheering loudly", "vi": "co vu to", "distractor": false },
      { "word": "shout with excitement", "vi": "het len voi vui", "distractor": false },
      { "word": "throw the ball", "vi": "nem bong", "distractor": false },
      { "word": "use my feet", "vi": "dung chan", "distractor": false },
      { "word": "wrong", "vi": "sai roi", "distractor": false },
      { "word": "scoring a goal", "vi": "ghi ban", "distractor": false },
      { "word": "jumping up and down", "vi": "nhay len xuong", "distractor": false },
      { "word": "comes to watch", "vi": "den xem", "distractor": false },
      { "word": "takes photos", "vi": "chup anh", "distractor": false },
      { "word": "drink water", "vi": "uong nuoc", "distractor": false },
      { "word": "sleep", "vi": "ngu", "distractor": true },
      { "word": "hate soccer", "vi": "ghet bong", "distractor": true },
      { "word": "give up", "vi": "bo cuoc", "distractor": true }
    ]
  },
  sentence_frames: [
    {
      "template": "Today is our school sports day! Students are ___ on the track.",
      "answers": ["running"]
    },
    {
      "template": "The schoolyard is full of ___!",
      "answers": ["energy"]
    },
    {
      "template": "A boy is ___ the ball toward the goal.",
      "answers": ["kicking"]
    },
    {
      "template": "A girl is ___ very high in the long jump.",
      "answers": ["jumping"]
    },
    {
      "template": "The crowd is ___ on the bleachers.",
      "answers": ["cheering loudly"]
    },
    {
      "template": "Parents are waving ___ and smiling.",
      "answers": ["flags"]
    },
    {
      "template": "Everyone is having ___ at the sports day!",
      "answers": ["fun"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "running fast", "vi": "chạy nhanh", "distractor": false },
        { "word": "cheering loudly", "vi": "cổ vũ ầm ĩ", "distractor": false },
        { "word": "kicking the ball", "vi": "sút bóng", "distractor": false },
        { "word": "jumping high", "vi": "nhảy cao", "distractor": false },
        { "word": "waving flags", "vi": "vẫy cờ", "distractor": false },
        { "word": "running races", "vi": "chạy đua", "distractor": false },
        { "word": "full of energy", "vi": "tràn đầy năng lượng", "distractor": false },
        { "word": "very exciting", "vi": "rất thú vị", "distractor": false },
        { "word": "so much fun", "vi": "vui lắm", "distractor": false },
        { "word": "tired but happy", "vi": "mệt nhưng vui", "distractor": false },
        { "word": "sitting under a tree", "vi": "ngồi dưới cây", "distractor": true },
        { "word": "sleeping in class", "vi": "ngủ trong lớp", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week16/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 16 story writing.",
      word_bank: [
        "cheering loudly",
        "running fast",
        "kicking the ball",
        "jumping high",
        "waving flags",
        "wearing sporty clothes",
        "full of energy",
        "so much fun",
        "tired but happy",
        "cheering enthusiastically"
      ],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "At the track, ___", "answers": ["students are running"]},
        {"template": "On the field, ___", "answers": ["the game is exciting"]},
        {"template": "Meanwhile, ___", "answers": ["the crowd is cheering"]},
        {"template": "The jumper is ___", "answers": ["jumping very high"]},
        {"template": "After the race, ___", "answers": ["everyone celebrates"]},
        {"template": "What a ___", "answers": ["wonderful sports day"]}
      ]
    }
  }
}
