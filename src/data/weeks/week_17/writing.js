export default {
  title: "My Weather Day",
  min_words: 40,
  model_sentence: "It is raining today, so I am wearing my coat and warm boots. I am also carrying my umbrella because the rain is very heavy. The sky is grey and cloudy, and the streets are wet. I put on my hat before I left the house this morning. My thick coat is keeping me very warm and my boots are keeping my feet dry. I do not like getting wet, so I always dress for the weather. When it is sunny, I wear a light shirt and a cap instead. When it is cold and snowy, I wear a scarf and gloves too. I always check the weather in the morning so I know what to wear. Today the weather is rainy and cold, but I am comfortable because I am dressed for it!",
  instruction_en: "Use: It is ___, so I am wearing... / Because it is..., I am ___ing...",
  instruction_vi: "Dùng: It is ___, so I am wearing... / Because it is..., I am ___ing...",
  prompt_en: "Write about the weather today and what you are wearing! What is the weather like? Is it hot, cold, rainy or sunny? What are you wearing and why? What are you doing because of the weather?",
  prompt_vi: "Viết về thời tiết hôm nay và trang phục! Thời tiết như thế nào? Nóng, lạnh, mưa hay nắng? Bạn đang mặc gì và tại sao? Thời tiết ảnh hưởng đến hoạt động của bạn ra sao?",
  keywords: ["It is", "raining", "snowing", "sunny", "cold", "warm", "so", "wearing", "coat", "boots", "hat", "umbrella"],
  topic_talk_prompt: "Tell me about the weather today and what people are wearing. Why are those clothes good for the weather?",
  sentence_frames: [{"template":"Today the weather is ___ and ___."},{"template":"It is ___, so I am wearing ___."},{"template":"Because it is ___, I am ___ing ___."},{"template":"I am also wearing ___ because ___."},{"template":"The sky is ___ and I can see ___."},{"template":"I love/don't like this weather because ___."}],
};
