export default {
  title: "My House Description",
  min_words: 40,
  model_sentence: "I live in a nice house. My house has a bedroom, a kitchen, a bathroom, and a living room. In my bedroom, there is a lamp and a mirror. The living room has a big sofa and many shelves. I like to sit on the sofa. In the kitchen, there is a fridge and a cabinet. The fridge keeps my food cold. My bedroom is upstairs. The kitchen is downstairs. I love my house!",
  instruction_en: "Use: My house has... / There is a... / There are... / In my bedroom there is...",
  instruction_vi: "Dùng: My house has... / There is a... / There are... / In my bedroom there is...",
  prompt_en: "Describe your house! How many rooms does it have? What rooms are there? What is in the living room? What is in your bedroom? Do you have a garden?",
  prompt_vi: "Mô tả ngôi nhà của bạn! Có bao nhiêu phòng? Có những phòng nào? Phòng khách có gì? Phòng ngủ có gì? Nhà có sân vườn không?",
  keywords: ["house", "room", "bedroom", "kitchen", "sofa", "lamp", "mirror", "fridge", "furniture"],
  sentence_frames: [{"template":"My house has ___ rooms."},{"template":"There is a ___ and a ___ in my house."},{"template":"In my bedroom, there is a ___ and a ___."},{"template":"My favourite room is the ___ because ___."}],
};
