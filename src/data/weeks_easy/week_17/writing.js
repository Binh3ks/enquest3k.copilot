export default {
  title: "My Weather Day",
  min_words: 30,
  model_sentence: "It is raining today, so I am wearing my coat. I am also carrying my umbrella. My boots keep my feet dry. The sky is grey and cloudy. The weather is cold and wet. I put on my hat before I go outside. When it is sunny, I wear a T-shirt and a cap. I always dress for the weather so I stay warm and dry!",
  instruction_en: "Use: It is ___, so I am wearing... / Because it is..., I am ___ing...",
  instruction_vi: "Dùng: It is ___, so I am wearing... / Because it is..., I am ___ing...",
  prompt_en: "Write about the weather today and what you are wearing! What is the weather like? Is it hot, cold, rainy or sunny? What are you wearing and why? What are you doing because of the weather?",
  prompt_vi: "Viết về thời tiết hôm nay và trang phục! Thời tiết như thế nào? Nóng, lạnh, mưa hay nắng? Bạn đang mặc gì và tại sao? Thời tiết ảnh hưởng đến hoạt động của bạn ra sao?",
  keywords: ["It is", "raining", "snowing", "sunny", "cold", "warm", "so", "wearing", "coat", "boots", "hat", "umbrella"],
  topic_talk_prompt: "Tell me about the weather today. What are people wearing?",
  sentence_frames: [{"template":"Today the weather is ___ and ___."},{"template":"It is ___, so I am wearing ___."},{"template":"Because it is ___, I am ___ing ___."},{"template":"I love/don't like this weather because ___."}],
};
