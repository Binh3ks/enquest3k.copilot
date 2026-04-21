export default {
  title: "Write About Your Daily Routine",
  min_words: 40,
  model_sentence: "I wake up at 7 o'clock every morning. First, I brush my teeth and wash my face. Then I eat breakfast with my family. I eat rice and eggs. I go to school at 8 o'clock. At school, I have lunch at 12 o'clock. After school, I play with my friends. Then I do my homework. I have dinner with my family at 7 o'clock. After dinner, I watch TV. I go to bed at 9 o'clock. I love my day!",
  instruction_en: "Use: I wake up at... / I (eat/go/study) at... / After school, I... / I go to bed at...",
  instruction_vi: "Dùng: I wake up at... / I (eat/go/study) at... / After school, I... / I go to bed at...",
  prompt_en: "Describe your daily routine! What time do you wake up? What do you do in the morning? What do you do after school? What time do you go to bed?",
  prompt_vi: "Mô tả thói quen hàng ngày! Bạn thức dậy lúc mấy giờ? Buổi sáng làm gì? Sau giờ học làm gì? Đi ngủ lúc mấy giờ?",
  keywords: ["wake up", "brush teeth", "eat breakfast", "go to school", "have lunch", "play", "do homework", "have dinner", "watch TV", "go to bed"],
  topic_talk_prompt: "Tell me about your daily routine. What do you usually do from morning to night?",
  sentence_frames: [{"template":"I wake up at ___ every day."},{"template":"In the morning, I ___ and ___."},{"template":"After school, I ___."},{"template":"I go to bed at ___."}],
};
