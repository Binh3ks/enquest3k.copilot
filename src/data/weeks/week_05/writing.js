export default {
  title: "My House Description",
  min_words: 40,
  model_sentence: "I live in a nice house. My house has a bedroom, a kitchen, a bathroom, and a living room. In my bedroom, there is a lamp and a mirror. The living room has a big sofa and many shelves. I like to sit on the sofa. In the kitchen, there is a fridge and a cabinet. The fridge keeps my food cold. My bedroom is upstairs. The kitchen is downstairs. I love my house!",
  instruction_en: "Write about your house. Tell us about the rooms and furniture in your home.",
  instruction_vi: "Viết về ngôi nhà của bạn. Kể cho chúng tôi nghe về các phòng và đồ đạc trong nhà bạn.",
  prompt_en: "What rooms are in your house? What furniture do you have? Which room is your favorite?",
  prompt_vi: "Ngôi nhà của bạn có những phòng nào? Bạn có đồ đạc gì? Phòng nào là phòng yêu thích của bạn?",
  keywords: ["house", "room", "bedroom", "kitchen", "sofa", "lamp", "mirror", "fridge", "furniture"],
  sentence_frames: [{"template":"My house has a ___ and a ___."},{"template":"In my ___, there is a ___."},{"template":"My favourite room is the ___."},{"template":"I like my house because ___."}],
};
