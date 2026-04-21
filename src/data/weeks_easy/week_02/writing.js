export default {
  title: "My Family",
  min_words: 30,
  model_sentence: "This is my family. This is my mother. She is kind. This is my father. He is strong. We are a team. I love my family.",
  instruction_en: "Use: This is my... / He/She is... / He/She has... / We have...",
  instruction_vi: "Dùng: This is my... / He/She is... / He/She has... / We have...",
  prompt_en: "Write about your family! Who is in your family? What do they look like? What do they do? Do you have a pet? Write 4–5 sentences.",
  prompt_vi: "Viết về gia đình bạn! Gia đình có những ai? Họ trông như thế nào? Họ làm gì? Nhà bạn có thú cưng không? Viết 4–5 câu.",
  keywords: ["This is my", "mother", "father", "family", "love", "team"],
  sentence_frames: [{"template":"This is my family. We are ___."},{"template":"This is my ___. His/Her name is ___."},{"template":"He/She is ___ and He/She has ___ hair."},{"template":"We like to ___ together."}],
};
