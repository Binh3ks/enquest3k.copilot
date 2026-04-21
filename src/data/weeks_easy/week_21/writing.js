export default {
  title: "My Yesterday",
  min_words: 30,
  model_sentence: "Yesterday was great and happy for me. I walked to school in the morning and talked to my friends in class. I listened to my teacher and played a game at break time. After school, I helped my mom at home. She cooked dinner, and I washed my hands before eating. In the evening, I watched TV, cleaned my desk, and finished my homework. Before sleeping, I looked at the stars and started a new story. It was a wonderful day!",
  instruction_en: "Write about your yesterday. What did you do?",
  instruction_vi: "Viết về hôm qua của bạn. Bạn đã làm gì?",
  prompt_en: "What did you do yesterday? Use -ed verbs!",
  prompt_vi: "Bạn đã làm gì hôm qua? Dùng động từ thêm -ed!",
  keywords: ["walked", "talked", "played", "cooked", "cleaned", "helped", "watched", "listened", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about what you did yesterday. What happened?",
  sentence_frames: [{"template":"Yesterday I ___ed ___."},{"template":"In the morning, I ___ed ___."},{"template":"After school, I ___ed ___."},{"template":"At the end of the day, I felt ___."}],
};
