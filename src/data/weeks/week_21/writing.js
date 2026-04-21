export default {
  title: "My Yesterday",
  min_words: 40,
  model_sentence: "Yesterday was a wonderful and busy day for me. In the morning, I walked to school with my best friend and talked about our homework. In class, I listened to my teacher carefully and opened my notebook to write important ideas. After school, I helped my mom in the kitchen. She cooked rice and soup, and I washed my hands before we ate dinner together. In the evening, I cleaned my room, watched TV for a short time, and looked at the bright stars outside. Before bed, I finished my homework and started a new story in my diary. I felt proud, calm, and very happy at the end of the day.",
  instruction_en: "Use: Yesterday, I... / I went to... / I ate... / I played with... / The best part was...",
  instruction_vi: "Dùng: Yesterday, I... / I went to... / I ate... / I played with... / The best part was...",
  prompt_en: "Write about what you did yesterday! Where did you go? What did you eat? Who did you help or play with? What was the best part of your day?",
  prompt_vi: "Viết về những gì bạn đã làm hôm qua! Bạn đi đâu? Bạn ăn gì? Bạn giúp ai hoặc chơi với ai? Điều tốt nhất trong ngày là gì?",
  keywords: ["walked", "talked", "listened", "helped", "cooked", "cleaned", "played", "watched", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about what you did yesterday. What happened from morning to night?",
  sentence_frames: [{"template":"Yesterday, I woke up at ___ and ___."},{"template":"In the morning, I ___ed ___."},{"template":"I went to ___ and ___ed with ___."},{"template":"The best part of my day was ___."}],
};
