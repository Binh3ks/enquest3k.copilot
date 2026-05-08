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
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] book", vi: "sách", distractor: false},
        {word: "[1] bag", vi: "túi", distractor: false},
        {word: "[1] toy", vi: "đồ chơi", distractor: false},
        {word: "[2] table", vi: "bàn", distractor: false},
        {word: "[2] desk", vi: "bàn học", distractor: false},
        {word: "[2] shelf", vi: "giá", distractor: false},
        {word: "shelves", vi: "giá (sai dạng)", distractor: true},
        {word: "[3] pencil", vi: "bút chì", distractor: false},
        {word: "[3] pen", vi: "bút", distractor: false},
        {word: "[3] eraser", vi: "tẩy", distractor: false},
        {word: "[4] box", vi: "hộp", distractor: false},
        {word: "[4] drawer", vi: "ngăn kéo", distractor: false},
        {word: "[5] shoes", vi: "giày", distractor: false},
        {word: "[5] ball", vi: "bóng", distractor: false},
        {word: "[6] bed", vi: "giường", distractor: false},
        {word: "[6] chair", vi: "ghế", distractor: false},
        {word: "[7] lamp", vi: "đèn", distractor: false},
        {word: "[7] window", vi: "cửa sổ", distractor: false},
        {word: "windows", vi: "cửa sổ (sai dạng)", distractor: true},
        {word: "[8] clock", vi: "đồng hồ", distractor: false},
        {word: "[8] door", vi: "cửa", distractor: false},
        {word: "[9] backpack", vi: "ba lô", distractor: false},
        {word: "[9] lunchbox", vi: "hộp cơm", distractor: false},
        {word: "[10] table", vi: "bàn", distractor: false},
        {word: "[10] shelf", vi: "giá", distractor: false},
        {word: "[11] I can find it easily", vi: "tôi tìm dễ", distractor: false},
        {word: "[11] it is safe there", vi: "ở đó an toàn", distractor: false}
      ]
    }
  }
};
