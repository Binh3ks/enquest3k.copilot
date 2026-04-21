export default {
  title: "Write About My Park Day",
  min_words: 30,
  model_sentence: "Today I am going to the park! The park is fun! I am walking with my mom. My dad is jogging. I see a boy running with his dog. Near the fountain, kids are playing. They are laughing! My family is having a picnic. We are eating sandwiches. I am drinking juice. My sister is flying a red kite! I am relaxing on the grass. I love the park!",
  instruction_en: "Write about your day at the park. What are you doing? What do you see? Use: I am..., They are..., We are...",
  instruction_vi: "Viết về ngày của bạn ở công viên. Bạn đang làm gì? Bạn thấy gì? Sử dụng: I am..., They are..., We are...",
  prompt_en: "What do you do at the park? What do you see? Who is with you? What are they doing? Do you like the park?",
  prompt_vi: "Bạn làm gì ở công viên? Bạn thấy gì? Ai cùng đi với bạn? Họ đang làm gì? Bạn có thích công viên không?",
  keywords: ["running", "walking", "sitting", "eating", "flying", "playing", "jogging", "relaxing", "picnic", "fountain"],
  topic_talk_prompt: "Tell me about what people are doing at a park right now.",
  sentence_frames: [{"template":"Today I am visiting ___."},{"template":"I can see people ___ing ___."},{"template":"___ is ___ing near the ___."},{"template":"I am ___ing and I feel ___."}],
};
