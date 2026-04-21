export default {
  title: "My Time Detective Questions",
  min_words: 30,
  model_sentence: "I was a time detective. I asked my brother, Did you play yesterday? He said, Yes, I did. I asked, Did you watch TV last night? He said, No, I didn't. Then I asked, Did you help mom? He said, Yes, I did. I wrote all answers in my notebook.",
  instruction_en: "Use: Did you ___? Yes, I did. I ___ed... / No, I didn't. I ___ed... instead.",
  instruction_vi: "Dùng: Did you ___? Yes, I did. I ___ed... / No, I didn't. I ___ed... instead.",
  prompt_en: "Write a short interview about yesterday! Write 4 'Did you...' questions and 4 full answers. Ask about food, places, activities, and feelings.",
  prompt_vi: "Viết một cuộc phỏng vấn ngắn về hôm qua! Viết 4 câu hỏi 'Did you...' và 4 câu trả lời đầy đủ. Hỏi về thức ăn, địa điểm, hoạt động và cảm xúc.",
  keywords: ["walked", "talked", "played", "cooked", "cleaned", "helped", "watched", "listened", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about something interesting that happened in the past.",
  sentence_frames: [{"template":"Did you ___ yesterday? Yes, I did. I ___ed ___."},{"template":"Did you ___ last night? No, I didn't. I ___ed ___ instead."},{"template":"Did you ___ with ___? Yes, I did! It was ___."},{"template":"Did you eat ___ for breakfast? Yes/No, I ___."},{"template":"Did you go to ___? No, I stayed at ___ and ___."},{"template":"Did you feel ___ yesterday? I felt ___ because ___."},{"template":"It was a ___ day because ___!"}],
};
