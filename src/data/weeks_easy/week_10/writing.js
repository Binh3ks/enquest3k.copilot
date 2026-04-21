export default {
  title: "City and Farm",
  min_words: 30,
  model_sentence: "I like the farm. The city is noisy, but the farm is quiet. The city is dirty, but the farm is clean. I see a cow on the farm. I see a chicken. The farm has many animals. The field is green. I see trees. The farm is peaceful. I love the farm!",
  instruction_en: "Use: A city has... but a farm has... / I prefer... because...",
  instruction_vi: "Dùng: A city has... but a farm has... / I prefer... because...",
  prompt_en: "Compare city life and farm life! What is good about living in a city? What is good about living on a farm? Which do you prefer and why? Write 4–5 sentences using 'but'.",
  prompt_vi: "So sánh cuộc sống thành phố và nông thôn! Sống ở thành phố tốt điều gì? Sống ở nông thôn tốt điều gì? Bạn thích nơi nào hơn và tại sao? Dùng 'but'.",
  keywords: ["city", "farm", "quiet", "clean", "but", "cow", "chicken", "animals", "field", "tree"],
  topic_talk_prompt: "Tell me about animals on a farm. What do they do?",
  sentence_frames: [{"template":"A city has ___, but a farm has ___."},{"template":"In a city, you can ___, but on a farm, you can ___."},{"template":"A city is ___, but a farm is ___."},{"template":"I prefer ___ because ___."}],
};
