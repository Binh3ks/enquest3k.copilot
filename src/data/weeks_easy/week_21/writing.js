export default {
  title: "My Yesterday",
  min_words: 30,
  model_sentence: "Yesterday was great and happy for me. I walked to school in the morning and talked to my friends in class. I listened to my teacher and played a game at break time. After school, I helped my mom at home. She cooked dinner, and I washed my hands before eating. In the evening, I watched TV, cleaned my desk, and finished my homework. Before sleeping, I looked at the stars and started a new story. It was a wonderful day!",
  instruction_en: "Use: Yesterday, I... / I went to... / I ate... / I played with... / The best part was...",
  instruction_vi: "Dùng: Yesterday, I... / I went to... / I ate... / I played with... / The best part was...",
  prompt_en: "Write about what you did yesterday! Where did you go? What did you eat? Who did you help or play with? What was the best part of your day?",
  prompt_vi: "Viết về những gì bạn đã làm hôm qua! Bạn đi đâu? Bạn ăn gì? Bạn giúp ai hoặc chơi với ai? Điều tốt nhất trong ngày là gì?",
  keywords: ["walked", "talked", "played", "cooked", "cleaned", "helped", "watched", "listened", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about what you did yesterday. What happened?",
  sentence_frames: [{"template":"Yesterday, I woke up at ___ and ___."},{"template":"In the morning, I ___ed ___."},{"template":"I went to ___ and ___ed with ___."},{"template":"The best part of my day was ___."}],
};
