export default {
  title: "My Yesterday",
  min_words: 40,
  model_sentence: "Yesterday was a wonderful and busy day for me. In the morning, I walked to school with my best friend and talked about our homework. In class, I listened to my teacher carefully and opened my notebook to write important ideas. After school, I helped my mom in the kitchen. She cooked rice and soup, and I washed my hands before we ate dinner together. In the evening, I cleaned my room, watched TV for a short time, and looked at the bright stars outside. Before bed, I finished my homework and started a new story in my diary. I felt proud, calm, and very happy at the end of the day.",
  instruction_en: "Write about your day yesterday using full phrases!",
  instruction_vi: "Viết về ngày hôm qua bằng cụm từ hoàn chỉnh!",
  prompt_en: "Write about what you did yesterday! Use the phrases in the word bank to fill each blank.",
  prompt_vi: "Viết về những gì bạn đã làm hôm qua! Dùng cụm từ trong bảng từ để điền vào mỗi ô.",
  keywords: ["walked", "talked", "listened", "helped", "cooked", "cleaned", "watched", "finished", "started", "felt"],
  topic_talk_prompt: "Tell me about what you did yesterday. What happened from morning to night?",
  sentence_frames: [
    {"template": "Yesterday was ___.", "answers": ["a wonderful and busy day for me"]},
    {"template": "In the morning, I ___ and ___.", "answers": ["walked to school with my best friend", "talked about our homework"]},
    {"template": "In class, I ___ and ___ to write important ideas.", "answers": ["listened to my teacher carefully", "opened my notebook"]},
    {"template": "After school, ___.", "answers": ["I helped my mom in the kitchen"]},
    {"template": "___, and I washed my hands before we ate dinner together.", "answers": ["She cooked rice and soup"]},
    {"template": "In the evening, I ___, ___, and ___.", "answers": ["cleaned my room", "watched TV for a short time", "looked at the bright stars outside"]},
    {"template": "Before bed, I ___ and ___.", "answers": ["finished my homework", "started a new story in my diary"]},
    {"template": "I felt ___ at the end of the day.", "answers": ["proud, calm, and very happy"]}
  ],

  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "a wonderful and busy day for me", vi: "một ngày tuyệt vời và bận rộn", distractor: false},
        {word: "walked to school with my best friend", vi: "đi bộ đến trường với bạn thân", distractor: false},
        {word: "talked about our homework", vi: "nói chuyện về bài tập", distractor: false},
        {word: "listened to my teacher carefully", vi: "lắng nghe thầy/cô cẩn thận", distractor: false},
        {word: "opened my notebook", vi: "mở vở ra", distractor: false},
        {word: "I helped my mom in the kitchen", vi: "tôi giúp mẹ trong bếp", distractor: false},
        {word: "She cooked rice and soup", vi: "cô ấy nấu cơm và canh", distractor: false},
        {word: "cleaned my room", vi: "dọn phòng", distractor: false},
        {word: "watched TV for a short time", vi: "xem TV một lúc", distractor: false},
        {word: "looked at the bright stars outside", vi: "nhìn những ngôi sao sáng bên ngoài", distractor: false},
        {word: "finished my homework", vi: "hoàn thành bài tập", distractor: false},
        {word: "started a new story in my diary", vi: "bắt đầu câu chuyện mới trong nhật ký", distractor: false},
        {word: "proud, calm, and very happy", vi: "tự hào, bình tĩnh và rất vui", distractor: false},
        {word: "a boring and terrible day", vi: "một ngày tẻ nhạt và tệ (sai nghĩa)", distractor: true},
        {word: "walked to the wrong place", vi: "đi nhầm chỗ (sai nghĩa)", distractor: true},
        {word: "very angry and upset", vi: "rất tức giận và buồn bực (sai nghĩa)", distractor: true}
      ]
    }
  }
};
