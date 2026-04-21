export default {
  title: "My Friend",
  min_words: 30,
  model_sentence: "This is my friend. Her name is Lily. She is tall. She has long hair. Her hair is black. She has big eyes. She has a nice smile. I like my friend.",
  instruction_en: "Use: My best friend is... / He/She is (tall/short)... / He/She has (black/long) hair... / I like them because...",
  instruction_vi: "Dùng: My best friend is... / He/She is... / He/She has... hair... / I like them because...",
  prompt_en: "Write about your best friend! What is their name? What do they look like — tall or short, what colour is their hair? Do they wear glasses? Why do you like them?",
  prompt_vi: "Viết về bạn thân của bạn! Tên bạn ấy là gì? Trông như thế nào — cao hay thấp, tóc màu gì? Bạn ấy đeo kính không? Tại sao bạn thích bạn ấy?",
  keywords: ["tall", "short", "hair", "eyes", "smile"],
  sentence_frames: [{"template":"My best friend is ___."},{"template":"He/She is ___ and He/She has ___ hair."},{"template":"He/She ___ glasses."},{"template":"I like my friend because ___."}],
};
