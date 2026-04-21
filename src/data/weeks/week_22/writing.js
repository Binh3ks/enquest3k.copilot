export default {
  title: "The Time Detective Interview",
  min_words: 40,
  model_sentence: "I interviewed my friend like a time detective. I asked, Did you walk to school yesterday? Did you talk to your teacher? My friend said, Yes, I did. Then I asked, Did you finish your homework last night? and Did you help your parents at home? My friend answered clearly and gave details. I wrote every answer in my notebook because each answer was an important clue about yesterday.",
  instruction_en: "Write a short detective interview using Did questions and short answers.",
  instruction_vi: "Viet mot bai phong van tham tu ngan dung cau hoi Did va cau tra loi ngan.",
  prompt_en: "Write at least 4 Did questions and 4 answers about yesterday.",
  prompt_vi: "Viet it nhat 4 cau hoi Did va 4 cau tra loi ve hom qua.",
  keywords: ["walked", "talked", "listened", "helped", "cooked", "cleaned", "played", "watched", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about something interesting that happened in the past. What clues helped you understand what occurred?",
  sentence_frames: [{"template":"Did you ___ yesterday?"},{"template":"Yes, I did. I ___ed ___."},{"template":"Did you ___ last night?"},{"template":"No, I didn't. I ___ed ___ instead."}],
};
