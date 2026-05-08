export default {
  title: "Treasure Hunt at Home",
  min_words: 40,
  model_sentence: "I love playing treasure hunt at home. My friend hides a treasure box in my room. First, I look under my bed. Then I look on my desk. I find a clue next to the door. It says 'Look in the closet.' I open the closet and look under my clothes. The treasure is in a box next to my shoes! Inside the box there is a toy car and some candy. I am so happy to find it!",
  instruction_en: "Use: My ___ is on/in/under/next to the ___.",
  instruction_vi: "Dùng: My ___ is on/in/under/next to the ___.",
  prompt_en: "Describe where things are in your room! Where is your bag? Where are your books? Where is your favourite toy? Use prepositions: in, on, under, next to.",
  prompt_vi: "Mô tả vị trí đồ vật trong phòng bạn! Túi bạn ở đâu? Sách ở đâu? Đồ chơi yêu thích ở đâu? Dùng: in, on, under, next to.",
  keywords: ["treasure", "hunt", "hide", "find", "in", "on", "under", "next to", "box", "room"],
  sentence_frames: [
    {"template":"I love playing treasure hunt and today I am looking for ___."},
    {"template":"My ___ is on the ___ next to ___."},
    {"template":"My ___ is in the ___ under my ___."},
    {"template":"My ___ is under the ___ beside ___."},
    {"template":"I found my ___ next to the ___ and it was ___!"},
    {"template":"I always put my ___ on the ___ because ___ and it is ___!"}
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] a treasure box", vi: "hộp kho báu", distractor: false},
        {word: "[1] my favourite toy", vi: "đồ chơi yêu thích", distractor: false},
        {word: "[2] bag", vi: "cặp", distractor: false},
        {word: "[2] book", vi: "sách", distractor: false},
        {word: "[3] desk", vi: "bàn", distractor: false},
        {word: "[3] shelf", vi: "kệ", distractor: false},
        {word: "[4] my lamp", vi: "đèn của tôi", distractor: false},
        {word: "[4] the door", vi: "cửa", distractor: false},
        {word: "[5] pencil case", vi: "hộp bút", distractor: false},
        {word: "[5] toy box", vi: "hộp đồ chơi", distractor: false},
        {word: "[6] closet", vi: "tủ quần áo", distractor: false},
        {word: "[6] drawer", vi: "ngăn kéo", distractor: false},
        {word: "[7] bed", vi: "giường", distractor: false},
        {word: "[7] clothes", vi: "quần áo", distractor: false},
        {word: "[8] shoes", vi: "giày", distractor: false},
        {word: "[8] bed", vi: "giường", distractor: false},
        {word: "[9] my chair", vi: "ghế của tôi", distractor: false},
        {word: "[9] the wall", vi: "tường", distractor: false},
        {word: "[10] favorite teddy bear", vi: "gấu bông yêu thích", distractor: false},
        {word: "[10] toy car", vi: "xe ô tô đồ chơi", distractor: false},
        {word: "[11] window", vi: "cửa sổ", distractor: false},
        {word: "[11] door", vi: "cửa ra vào", distractor: false},
        {word: "[12] so exciting", vi: "rất thú vị", distractor: false},
        {word: "[12] very fun", vi: "rất vui", distractor: false},
        {word: "[13] backpack", vi: "ba lô", distractor: false},
        {word: "[13] notebook", vi: "vở ghi", distractor: false},
        {word: "[14] table", vi: "bàn", distractor: false},
        {word: "[14] chair", vi: "ghế", distractor: false},
        {word: "[15] I can find it easily", vi: "tôi dễ tìm", distractor: false},
        {word: "[15] it is always there", vi: "nó luôn ở đó", distractor: false},
        {word: "[16] easy to remember", vi: "dễ nhớ", distractor: false},
        {word: "[16] very convenient", vi: "rất tiện", distractor: false},
        {word: "lost", vi: "bị mất (sai)", distractor: true}
      ]
    }
  }
};
