export default {
  title: "The Time Detective Interview",
  min_words: 40,
  model_sentence: "I interviewed my friend like a time detective. I asked, Did you walk to school yesterday? Did you talk to your teacher? My friend said, Yes, I did. Then I asked, Did you finish your homework last night? and Did you help your parents at home? My friend answered clearly and gave details. I wrote every answer in my notebook because each answer was an important clue about yesterday.",
  instruction_en: "Use: Did you ___? Yes, I did. I ___ed... / No, I didn't. I ___ed... instead.",
  instruction_vi: "Dùng: Did you ___? Yes, I did. I ___ed... / No, I didn't. I ___ed... instead.",
  prompt_en: "Write a short interview about yesterday! Write 4 'Did you...' questions and 4 full answers. Ask about food, places, activities, and feelings.",
  prompt_vi: "Viết một cuộc phỏng vấn ngắn về hôm qua! Viết 4 câu hỏi 'Did you...' và 4 câu trả lời đầy đủ. Hỏi về thức ăn, địa điểm, hoạt động và cảm xúc.",
  keywords: ["walked", "talked", "listened", "helped", "cooked", "cleaned", "played", "watched", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about something interesting that happened in the past. What clues helped you understand what occurred?",
  sentence_frames: [{"template":"Did you ___ yesterday? Yes, I did. I ___ed ___."},{"template":"Did you ___ last night? No, I didn't. I ___ed ___ instead."},{"template":"Did you ___ with ___? Yes, I did! It was ___."},{"template":"Did you eat ___ for breakfast? Yes/No, I ___."},{"template":"Did you go to ___? No, I stayed at ___ and ___."},{"template":"Did you feel ___ yesterday? I felt ___ because ___."},{"template":"It was a ___ day because ___!"}],
};
