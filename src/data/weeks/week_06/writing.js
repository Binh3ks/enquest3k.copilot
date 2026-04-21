export default {
  title: "Treasure Hunt at Home",
  min_words: 40,
  model_sentence: "I love playing treasure hunt at home. My friend hides a treasure box in my room. First, I look under my bed. Then I look on my desk. I find a clue next to the door. It says 'Look in the closet.' I open the closet and look under my clothes. The treasure is in a box next to my shoes! Inside the box there is a toy car and some candy. I am so happy to find it!",
  instruction_en: "Use: My ___ is on/in/under/next to the ___.",
  instruction_vi: "Dùng: My ___ is on/in/under/next to the ___.",
  prompt_en: "Describe where things are in your room! Where is your bag? Where are your books? Where is your favourite toy? Use prepositions: in, on, under, next to.",
  prompt_vi: "Mô tả vị trí đồ vật trong phòng bạn! Túi bạn ở đâu? Sách ở đâu? Đồ chơi yêu thích ở đâu? Dùng: in, on, under, next to.",
  keywords: ["treasure", "hunt", "hide", "find", "in", "on", "under", "next to", "box", "room"],
  sentence_frames: [{"template":"My ___ is on the ___."},{"template":"My ___ is in the ___."},{"template":"My ___ is under the ___."},{"template":"My ___ is next to the ___."},{"template":"I always put my ___ on the ___ because ___."}],
};
