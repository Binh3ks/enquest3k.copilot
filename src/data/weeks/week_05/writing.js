export default {
  title: "My House Description",
  min_words: 40,
  model_sentence: "I live in a nice house. My house has a bedroom, a kitchen, a bathroom, and a living room. In my bedroom, there is a lamp and a mirror. The living room has a big sofa and many shelves. I like to sit on the sofa. In the kitchen, there is a fridge and a cabinet. The fridge keeps my food cold. My bedroom is upstairs. The kitchen is downstairs. I love my house!",
  instruction_en: "Use: My house has... / There is a... / There are... / In my bedroom there is...",
  instruction_vi: "Dùng: My house has... / There is a... / There are... / In my bedroom there is...",
  prompt_en: "Describe your house! How many rooms does it have? What rooms are there? What is in the living room? What is in your bedroom? Do you have a garden?",
  prompt_vi: "Mô tả ngôi nhà của bạn! Có bao nhiêu phòng? Có những phòng nào? Phòng khách có gì? Phòng ngủ có gì? Nhà có sân vườn không?",
  keywords: ["house", "room", "bedroom", "kitchen", "sofa", "lamp", "mirror", "fridge", "furniture"],
  sentence_frames: [
    {"template":"I live in a nice house and it has ___ rooms."},
    {"template":"There is a ___ and a ___ in my house and they are ___."},
    {"template":"In my bedroom, there is a ___ and a ___ on my ___."},
    {"template":"The living room has a ___ and many ___ where we ___."},
    {"template":"In the kitchen, there is a ___ that keeps my food ___ and ___."},
    {"template":"My favourite room is the ___ because ___ and I love ___!"}
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] four", vi: "4 phòng", distractor: false},
        {word: "[1] five", vi: "5 phòng", distractor: false},
        {word: "[2] bedroom", vi: "phòng ngủ", distractor: false},
        {word: "[2] bathroom", vi: "phòng tắm", distractor: false},
        {word: "[3] kitchen", vi: "bếp", distractor: false},
        {word: "[3] living room", vi: "phòng khách", distractor: false},
        {word: "[4] upstairs", vi: "tầng trên", distractor: false},
        {word: "[4] downstairs", vi: "tầng dưới", distractor: false},
        {word: "[5] lamp", vi: "đèn", distractor: false},
        {word: "[5] mirror", vi: "gương", distractor: false},
        {word: "[6] clock", vi: "đồng hồ", distractor: false},
        {word: "[6] pillow", vi: "gối", distractor: false},
        {word: "[7] desk", vi: "bàn", distractor: false},
        {word: "[7] shelf", vi: "kệ", distractor: false},
        {word: "[8] big sofa", vi: "ghế sofa lớn", distractor: false},
        {word: "[8] TV", vi: "tivi", distractor: false},
        {word: "[9] shelves", vi: "kệ", distractor: false},
        {word: "[9] chairs", vi: "ghế", distractor: false},
        {word: "[10] sit together", vi: "ngồi cùng nhau", distractor: false},
        {word: "[10] watch movies", vi: "xem phim", distractor: false},
        {word: "[11] fridge", vi: "tủ lạnh", distractor: false},
        {word: "[11] cabinet", vi: "tủ", distractor: false},
        {word: "[12] cold", vi: "lạnh", distractor: false},
        {word: "[12] fresh", vi: "tươi", distractor: false},
        {word: "[13] safe", vi: "an toàn", distractor: false},
        {word: "[13] good", vi: "tốt", distractor: false},
        {word: "[14] bedroom", vi: "phòng ngủ", distractor: false},
        {word: "[14] kitchen", vi: "bếp", distractor: false},
        {word: "[15] it is cozy and comfortable", vi: "nó ấm cúng và tiện nghi", distractor: false},
        {word: "[15] I can relax there", vi: "tôi có thể thư giãn ở đó", distractor: false},
        {word: "[16] being at home", vi: "ở nhà", distractor: false},
        {word: "[16] spending time in my room", vi: "dành thời gian trong phòng", distractor: false},
        {word: "messy", vi: "bừa bộn (sai)", distractor: true}
      ]
    }
  }
};
