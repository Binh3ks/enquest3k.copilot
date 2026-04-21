export default {
  title: "My Day",
  min_words: 30,
  model_sentence: "I wake up at 7 o'clock. I brush my teeth. I eat breakfast. I go to school. I have lunch. I play with friends. I do homework. I eat dinner. I watch TV. I go to bed at 9 o'clock.",
  instruction_en: "Use: I wake up at... / I (eat/go/study) at... / After school, I... / I go to bed at...",
  instruction_vi: "Dùng: I wake up at... / I (eat/go/study) at... / After school, I... / I go to bed at...",
  prompt_en: "Describe your daily routine! What time do you wake up? What do you do in the morning? What do you do after school? What time do you go to bed?",
  prompt_vi: "Mô tả thói quen hàng ngày! Bạn thức dậy lúc mấy giờ? Buổi sáng làm gì? Sau giờ học làm gì? Đi ngủ lúc mấy giờ?",
  keywords: ["wake up", "brush teeth", "eat", "go", "school", "play", "homework", "dinner", "TV", "sleep"],
  topic_talk_prompt: "Tell me about what you usually do every day.",
  sentence_frames: [{"template":"I wake up at ___ every day."},{"template":"In the morning, I ___ and ___."},{"template":"At school, I ___ and ___."},{"template":"After school, I ___."},{"template":"In the evening, I ___ and ___."},{"template":"I go to bed at ___."}],
};
