export default {
  title: "My Home News Report",
  min_words: 30,
  instruction_en: "Use: I am standing at... / I can see... / ___ is ___ing... / Right now, people are...",
  instruction_vi: "Dùng: I am standing at... / I can see... / ___ is ___ing... / Right now, people are...",
  prompt_en: "Imagine you are a news reporter! What can you see right now? What are people doing around you? What is happening? Report the scene in 4–5 sentences.",
  prompt_vi: "Hãy tưởng tượng bạn là phóng viên tin tức! Bạn đang nhìn thấy gì? Mọi người xung quanh đang làm gì? Chuyện gì đang xảy ra? Tường thuật 4–5 câu.",
  model_sentence: "Hello! This is live news from my home. I am sitting at my desk and learning English. My mum is cooking in the kitchen right now. My brother is reading a book in his room. My cat is sleeping on the big sofa. The fan is spinning quietly above us. It is a very busy and exciting scene at my house today!",
  keywords: ["I am", "is", "are", "happening", "reporter", "describe", "live", "-ing"],
  topic_talk_prompt: "Tell me about something interesting happening near you right now.",
  sentence_frames: [{"template":"Hello! I am reporting live from ___."},{"template":"Right now, I can see ___."},{"template":"___ is ___ing and ___ is ___ing."},{"template":"Over there, ___ people are ___ing ___."},{"template":"This is happening because ___."},{"template":"This is ___ reporting. Back to you!"}],
};
