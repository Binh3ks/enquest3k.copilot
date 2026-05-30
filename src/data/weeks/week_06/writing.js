export default {
  title: "Finding the Treasure",
  min_words: 45,
  model_sentence: "My friends and I decided to play a treasure hunt at home on Saturday afternoon. First, my friend Lily hid a small treasure box somewhere in the house and gave us a clue. I searched under the bed and behind the bookshelf but I could not find it. Then I looked inside the kitchen cupboard and I finally spotted it on the top shelf. I jumped with excitement and shouted because I was so happy to find it first. We all laughed and decided to play again because it was so much fun.",
  instruction_en: "Write about your treasure hunt using sequence words and prepositions!",
  instruction_vi: "Viết về cuộc tìm kho báu dùng từ nối và giới từ chỉ nơi chốn!",
  prompt_en: "Where did you search? What happened step by step? How did you feel when you found it?",
  prompt_vi: "Bạn tìm ở đâu? Chuyện gì xảy ra từng bước? Bạn cảm thấy thế nào khi tìm thấy?",
  keywords: ["treasure hunt", "Saturday afternoon", "hid", "treasure box", "gave us a clue", "searched under", "behind the bookshelf", "inside the kitchen cupboard", "on the top shelf", "jumped with excitement", "happy to find it first", "play again", "so much fun"],
  topic_talk_prompt: "Tell me the full story of your treasure hunt!",
  sentence_frames: [
    {
      "template": "First, ___ hid a ___ and gave us a ___.",
      "answers": ["my friend Lily", "small treasure box", "clue"]
    },
    {
      "template": "I searched ___ and ___ but I could not find it.",
      "answers": ["under the bed", "behind the bookshelf"]
    },
    {
      "template": "Then I looked ___ and finally spotted it ___.",
      "answers": ["inside the kitchen cupboard", "on the top shelf"]
    },
    {
      "template": "I jumped with ___ and shouted because I was so ___ to find it first.",
      "answers": ["excitement", "happy"]
    },
    {
      "template": "We all ___ and decided to ___ because it was so much ___.",
      "answers": ["laughed", "play again", "fun"]
    },
    {
      "template": "The treasure was a box full of ___ coins.",
      "answers": ["gold"]
    },
    {
      "template": "We decided to hide the treasure ___ next time.",
      "answers": ["next to the door"]
    },
    {
      "template": "Hunting for treasure makes us ___ together.",
      "answers": ["work as a team"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "my friend Lily", "vi": "bạn tôi tên Lily", "distractor": false },
        { "word": "small treasure box", "vi": "hộp kho báu nhỏ", "distractor": false },
        { "word": "clue", "vi": "manh mối", "distractor": false },
        { "word": "under the bed", "vi": "dưới gầm giường", "distractor": false },
        { "word": "behind the bookshelf", "vi": "sau kệ sách", "distractor": false },
        { "word": "inside the kitchen cupboard", "vi": "trong tủ bếp", "distractor": false },
        { "word": "on the top shelf", "vi": "trên ngăn cao nhất", "distractor": false },
        { "word": "excitement", "vi": "sự hào hứng", "distractor": false },
        { "word": "happy", "vi": "vui", "distractor": false },
        { "word": "laughed", "vi": "cười", "distractor": false },
        { "word": "play again", "vi": "chơi lại", "distractor": false },
        { "word": "fun", "vi": "vui", "distractor": false },
        { "word": "gold coins", "vi": "tiền vàng", "distractor": false },
        { "word": "next to the door", "vi": "bên cạnh cửa", "distractor": false },
        { "word": "work as a team", "vi": "làm việc như một đội", "distractor": false },
        { "word": "on the ceiling", "vi": "trên trần nhà", "distractor": true },
        { "word": "boredom", "vi": "sự chán nản", "distractor": true },
        { "word": "stop forever", "vi": "dừng mãi mãi", "distractor": true }
      ]
    }
  }
};
