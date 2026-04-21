export default {
  title: "My Time Detective Questions",
  min_words: 30,
  model_sentence: "I was a time detective. I asked my brother, Did you play yesterday? He said, Yes, I did. I asked, Did you watch TV last night? He said, No, I didn't. Then I asked, Did you help mom? He said, Yes, I did. I wrote all answers in my notebook.",
  instruction_en: "Write 2-3 Did questions and short answers.",
  instruction_vi: "Viet 2-3 cau hoi Did va cau tra loi ngan.",
  prompt_en: "Use this pattern: Did you ...? Yes, I did / No, I didn't.",
  prompt_vi: "Dung mau: Did you ...? Yes, I did / No, I didn't.",
  keywords: ["walked", "talked", "played", "cooked", "cleaned", "helped", "watched", "listened", "washed", "finished", "started", "looked", "opened"],
  topic_talk_prompt: "Tell me about something interesting that happened in the past.",
  sentence_frames: [{"template":"Did you ___ yesterday?"},{"template":"Yes, I did. I ___ed ___."},{"template":"Did you ___ last night?"},{"template":"No, I didn't. I ___ed ___ instead."}],
};
