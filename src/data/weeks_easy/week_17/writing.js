export default {
  title: "My Weather Day",
  min_words: 30,
  model_sentence: "It is raining today, so I am wearing my coat. I am also carrying my umbrella. My boots keep my feet dry. The sky is grey and cloudy. The weather is cold and wet. I put on my hat before I go outside. When it is sunny, I wear a T-shirt and a cap. I always dress for the weather so I stay warm and dry!",
  instruction_en: "Write about today's weather. What is it like outside? What are you wearing?",
  instruction_vi: "Viết về thời tiết hôm nay. Bên ngoài như thế nào? Bạn đang mặc gì?",
  prompt_en: "What is the weather like today? What are you wearing?",
  prompt_vi: "Thời tiết hôm nay như thế nào? Bạn đang mặc gì?",
  keywords: ["It is", "raining", "snowing", "sunny", "cold", "warm", "so", "wearing", "coat", "boots", "hat", "umbrella"],
  topic_talk_prompt: "Tell me about the weather today. What are people wearing?",
  sentence_frames: [{"template":"Today the weather is ___."},{"template":"It is ___, so I am wearing ___."},{"template":"I am also wearing ___ because ___."},{"template":"I always ___ when it is ___."}],
};
