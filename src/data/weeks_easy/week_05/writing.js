export default {
  title: "My Bedroom",
  min_words: 30,
  model_sentence: "I have a bedroom. My bedroom is nice. I have a bed in my bedroom. I sleep on my bed. I also have a chair and a table. I sit on the chair. I put my toys on the table. I like my bedroom. It is my favorite room. I play in my bedroom every day.",
  instruction_en: "Use: My house has... / There is a... / There are... / In my bedroom there is...",
  instruction_vi: "Dùng: My house has... / There is a... / There are... / In my bedroom there is...",
  prompt_en: "Describe your house! How many rooms does it have? What rooms are there? What is in the living room? What is in your bedroom? Do you have a garden?",
  prompt_vi: "Mô tả ngôi nhà của bạn! Có bao nhiêu phòng? Có những phòng nào? Phòng khách có gì? Phòng ngủ có gì? Nhà có sân vườn không?",
  keywords: ["bedroom", "bed", "chair", "table", "sleep", "play", "like"],
  sentence_frames: [{"template":"My house has ___ rooms."},{"template":"There is a ___ and a ___ in my house."},{"template":"In my bedroom, there is a ___ and a ___."},{"template":"My favourite room is the ___ because ___."}],
};
