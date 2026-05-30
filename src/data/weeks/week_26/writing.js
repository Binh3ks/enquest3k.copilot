export default {
  title: "My Weekend Comic Strip",
  min_words: 45,
  model_sentence: "It was Sunday afternoon when Leo sat down with his pencils, paper, and a big smile. He had decided to create a comic strip about his great adventure-filled fun weekend. First of all, Leo wrote the title across the top of the paper: 'My Fun Weekend Adventure — by Leo.' In Panel One, Leo sketched the scene where he and his dog Max walked to the park on Saturday morning. In Panel Two, Leo drew Max chasing after a red ball across the green grass. In Panel Three, Leo drew the moment a street musician arrived and everyone stopped to watch. In Panel Four, Leo drew himself and Max walking home — both looking tired but happy. Mia looked over Leo's shoulder and smiled. 'This is wonderful,' she said. 'A good comic strip can express a big story in just a few small first panels.'",
  instruction_en: "Write a weekend comic strip story with four clear panels — like Leo's adventure!",
  instruction_vi: "Viết câu chuyện truyện tranh cuối tuần với bốn khung rõ ràng như cuộc phiêu lưu của Leo!",
  prompt_en: "Use First of all, In Panel One, In Panel Two, In Panel Three, In Panel Four. Add lots of detail to each panel!",
  prompt_vi: "Dùng First of all, In Panel One, In Panel Two, In Panel Three, In Panel Four. Thêm nhiều chi tiết cho mỗi khung!",
  keywords: ["create a comic strip", "wrote the title", "sketched the scene", "chasing after", "stopped to watch", "watched a street performance", "returned home"],
  topic_talk_prompt: "Tell me your weekend story with four panels — like a comic strip!",
  sentence_frames: [
    {
      "template": "It was Sunday afternoon and Leo ___ down with his pencils and paper to ___.",
      "answers": ["sat", "create a comic strip"]
    },
    {
      "template": "First of all, Leo ___ the title across the top of the paper.",
      "answers": ["wrote"]
    },
    {
      "template": "In Panel One, Leo ___ the scene where he and Max ___ on Saturday morning.",
      "answers": ["sketched", "walked to the park"]
    },
    {
      "template": "In Panel Two, Max was ___ a red ball across the green ___.",
      "answers": ["chasing after", "grass"]
    },
    {
      "template": "In Panel Three, a ___ arrived and everyone ___.",
      "answers": ["street musician", "stopped to watch"]
    },
    {
      "template": "In Panel Four, Leo drew himself and Max ___ — both looking ___ but ___.",
      "answers": ["walking home", "tired", "happy"]
    },
    {
      "template": "The last caption read: 'It ___ a perfect day!'",
      "answers": ["was"]
    },
    {
      "template": "A good comic strip can express a big story in just a few small ___.",
      "answers": ["first panels"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "sat down", "vi": "ngồi xuống", "distractor": false },
        { "word": "create a comic strip", "vi": "tạo dải truyện tranh", "distractor": false },
        { "word": "wrote the title", "vi": "viết tiêu đề", "distractor": false },
        { "word": "sketched the scene", "vi": "phác thảo cảnh", "distractor": false },
        { "word": "walked to the park", "vi": "đi bộ đến công viên", "distractor": false },
        { "word": "chasing after", "vi": "đuổi theo", "distractor": false },
        { "word": "green grass", "vi": "bãi cỏ xanh", "distractor": false },
        { "word": "street musician", "vi": "nhạc sĩ đường phố", "distractor": false },
        { "word": "stopped to watch", "vi": "dừng lại xem", "distractor": false },
        { "word": "walking home", "vi": "đi bộ về nhà", "distractor": false },
        { "word": "tired but happy", "vi": "mệt nhưng vui", "distractor": false },
        { "word": "was a perfect day", "vi": "là một ngày hoàn hảo", "distractor": false },
        { "word": "first panels", "vi": "những khung đầu tiên", "distractor": false },
        { "word": "stayed home", "vi": "ở nhà", "distractor": true },
        { "word": "a swimming pool", "vi": "hồ bơi", "distractor": true }
      ]
    }
  }
};
