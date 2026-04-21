export default {
  title: "Finding the Treasure",
  min_words: 30,
  model_sentence: "I play treasure hunt. My friend hides a box. I look for the box. I look under the bed. The box is not there. I look on the desk. The box is not there. I look in the closet. I find the box! The box is next to my shoes. I open the box. There is candy in the box. I am happy!",
  instruction_en: "Use: My ___ is on/in/under/next to the ___.",
  instruction_vi: "Dùng: My ___ is on/in/under/next to the ___.",
  prompt_en: "Describe where things are in your room! Where is your bag? Where are your books? Where is your favourite toy? Use prepositions: in, on, under, next to.",
  prompt_vi: "Mô tả vị trí đồ vật trong phòng bạn! Túi bạn ở đâu? Sách ở đâu? Đồ chơi yêu thích ở đâu? Dùng: in, on, under, next to.",
  keywords: ["treasure", "hunt", "hide", "find", "in", "on", "under", "next to", "box", "room"],
  sentence_frames: [{"template":"My ___ is on the ___."},{"template":"My ___ is in the ___."},{"template":"My ___ is under the ___."},{"template":"My ___ is next to the ___."},{"template":"I always put my ___ on the ___ because ___."}],
};
