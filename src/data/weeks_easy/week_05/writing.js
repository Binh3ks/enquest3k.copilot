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
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] three", vi: "ba", distractor: false},
        {word: "[1] four", vi: "bốn", distractor: false},
        {word: "[1] five", vi: "năm", distractor: false},
        {word: "[2] living room", vi: "phòng khách", distractor: false},
        {word: "[2] kitchen", vi: "nhà bếp", distractor: false},
        {word: "[2] bathroom", vi: "phòng tắm", distractor: false},
        {word: "[3] bedroom", vi: "phòng ngủ", distractor: false},
        {word: "[3] dining room", vi: "phòng ăn", distractor: false},
        {word: "bed", vi: "giường (sai từ)", distractor: true},
        {word: "[4] bed", vi: "giường", distractor: false},
        {word: "[4] table", vi: "bàn", distractor: false},
        {word: "[4] chair", vi: "ghế", distractor: false},
        {word: "[5] lamp", vi: "đèn", distractor: false},
        {word: "[5] bookshelf", vi: "giá sách", distractor: false},
        {word: "[5] toy box", vi: "hộp đồ chơi", distractor: false},
        {word: "toys", vi: "đồ chơi (sai dạng)", distractor: true},
        {word: "[6] bedroom", vi: "phòng ngủ", distractor: false},
        {word: "[6] living room", vi: "phòng khách", distractor: false},
        {word: "[7] I can play there", vi: "tôi có thể chơi ở đó", distractor: false},
        {word: "[7] it is cozy", vi: "nó ấm cúng", distractor: false}
      ]
    }
  }
};
