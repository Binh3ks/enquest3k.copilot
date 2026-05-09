export default {
  title: "My Yesterday",
  min_words: 30,
  model_sentence: "Yesterday was a wonderful and busy day for me. In the morning, I walked to school with my best friend and talked about our homework. In class, I listened to my teacher carefully and opened my notebook to write important ideas. After school, I helped my mom in the kitchen. She cooked rice and soup, and I washed my hands before we ate dinner together. In the evening, I cleaned my room, watched TV for a short time, and looked at the bright stars outside. Before bed, I finished my homework and started a new story in my diary. I felt proud, calm, and very happy at the end of the day.",
  instruction_en: "Write about your day yesterday: morning, school, after school, evening!",
  instruction_vi: "Viết về ngày hôm qua: buổi sáng, ở trường, sau trường, buổi tối!",
  prompt_en: "Write about what you did yesterday! Where did you go? What did you eat? Who did you help? What was the best part?",
  prompt_vi: "Viết về những gì bạn đã làm hôm qua! Bạn đi đâu? Bạn ăn gì? Bạn giúp ai? Điều tốt nhất là gì?",
  keywords: ["walked", "talked", "listened", "helped", "cooked", "cleaned", "watched", "finished", "started", "felt"],
  topic_talk_prompt: "Tell me about what you did yesterday. What happened from morning to night?",
  sentence_frames: [
    {"template": "Yesterday was a ___ and ___ day for me.", "answers": ["wonderful", "busy"]},
    {"template": "In the morning, I ___ to school with my best friend and ___ about our homework.", "answers": ["walked", "talked"]},
    {"template": "In class, I ___ to my teacher carefully and ___ my notebook to write important ideas.", "answers": ["listened", "opened"]},
    {"template": "After school, I ___ my mom in the ___.", "answers": ["helped", "kitchen"]},
    {"template": "She ___ rice and soup, and I ___ my hands before we ___ dinner together.", "answers": ["cooked", "washed", "ate"]},
    {"template": "In the evening, I ___ my room, ___ TV for a short time, and ___ at the bright stars outside.", "answers": ["cleaned", "watched", "looked"]},
    {"template": "Before bed, I ___ my ___ and ___ a new story in my diary.", "answers": ["finished", "homework", "started"]},
    {"template": "I felt ___, ___, and very ___ at the end of the day.", "answers": ["proud", "calm", "happy"]}
  ],

  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "wonderful", vi: "tuyệt vời", distractor: false},
        {word: "busy", vi: "bận rộn", distractor: false},
        {word: "walked", vi: "đi bộ", distractor: false},
        {word: "talked", vi: "nói chuyện", distractor: false},
        {word: "listened", vi: "nghe", distractor: false},
        {word: "opened", vi: "mở ra", distractor: false},
        {word: "helped", vi: "giúp đỡ", distractor: false},
        {word: "kitchen", vi: "nhà bếp", distractor: false},
        {word: "cooked", vi: "nấu ăn", distractor: false},
        {word: "washed", vi: "rửa", distractor: false},
        {word: "ate", vi: "ăn", distractor: false},
        {word: "cleaned", vi: "dọn dẹp", distractor: false},
        {word: "watched", vi: "xem", distractor: false},
        {word: "looked", vi: "nhìn", distractor: false},
        {word: "finished", vi: "hoàn thành", distractor: false},
        {word: "homework", vi: "bài tập về nhà", distractor: false},
        {word: "started", vi: "bắt đầu", distractor: false},
        {word: "proud", vi: "tự hào", distractor: false},
        {word: "calm", vi: "bình tĩnh", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "walk", vi: "đi bộ (sai — cần -ed)", distractor: true},
        {word: "cook", vi: "nấu (sai — cần -ed)", distractor: true},
        {word: "sad", vi: "buồn (sai nghĩa)", distractor: true},
        {word: "bathroom", vi: "phòng tắm (không phải bếp)", distractor: true}
      ]
    }
  }
};
