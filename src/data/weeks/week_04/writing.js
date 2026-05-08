export default {
  title: "My Favorite Things",
  min_words: 40,
  model_sentence: "I like many things. I like playing with my toys. I like reading story books. I like drawing animals. When I play, I feel happy. When I read, I feel calm. When I draw, I feel creative. I also like singing songs. My favorite thing is dancing. I dance every day. These things make me feel good!",
  instruction_en: "Use: I like + V-ing... / My favourite... is... / I don't like...",
  instruction_vi: "Dùng: I like + V-ing... / My favourite... is... / I don't like...",
  prompt_en: "Write about your favourite things! What do you like doing? What is your favourite food? What is your favourite subject at school? What don't you like? Write 4–5 sentences.",
  prompt_vi: "Viết về những thứ yêu thích! Bạn thích làm gì? Món ăn yêu thích? Môn học yêu thích? Bạn không thích điều gì? Viết 4–5 câu.",
  keywords: ["like", "playing", "reading", "drawing", "happy", "feel", "favorite"],
  sentence_frames: [
    {"template":"I like many things and my favourites are ___ and ___."},
    {"template":"I like ___ at school because ___ and it makes me feel ___."},
    {"template":"My favourite food is ___ and I usually eat it ___."},
    {"template":"When I ___, I feel very ___ and ___."},
    {"template":"I don't like ___ but I love ___ instead because ___."},
    {"template":"These things make me ___ every single day!"}
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] playing with toys", vi: "chơi đồ chơi", distractor: false},
        {word: "[1] reading books", vi: "đọc sách", distractor: false},
        {word: "[2] drawing pictures", vi: "vẽ tranh", distractor: false},
        {word: "[2] singing songs", vi: "hát", distractor: false},
        {word: "[3] math", vi: "toán", distractor: false},
        {word: "[3] English", vi: "tiếng Anh", distractor: false},
        {word: "[3] art", vi: "mỹ thuật", distractor: false},
        {word: "[4] it is fun", vi: "nó vui", distractor: false},
        {word: "[4] I can learn new things", vi: "tôi học điều mới", distractor: false},
        {word: "[5] happy", vi: "vui", distractor: false},
        {word: "[5] excited", vi: "phấn khích", distractor: false},
        {word: "[6] pizza", vi: "pizza", distractor: false},
        {word: "[6] noodles", vi: "mì", distractor: false},
        {word: "[6] fried rice", vi: "cơm chiên", distractor: false},
        {word: "[7] for lunch", vi: "buổi trưa", distractor: false},
        {word: "[7] on weekends", vi: "cuối tuần", distractor: false},
        {word: "[8] play games", vi: "chơi game", distractor: false},
        {word: "[8] read stories", vi: "đọc truyện", distractor: false},
        {word: "[9] happy", vi: "vui", distractor: false},
        {word: "[9] calm", vi: "bình tĩnh", distractor: false},
        {word: "[10] relaxed", vi: "thư giãn", distractor: false},
        {word: "[10] creative", vi: "sáng tạo", distractor: false},
        {word: "[11] doing homework", vi: "làm bài tập", distractor: false},
        {word: "[11] waking up early", vi: "dậy sớm", distractor: false},
        {word: "[12] playing outside", vi: "chơi ngoài trời", distractor: false},
        {word: "[12] reading comics", vi: "đọc truyện tranh", distractor: false},
        {word: "[13] it is more fun", vi: "nó vui hơn", distractor: false},
        {word: "[13] I enjoy it more", vi: "tôi thích nó hơn", distractor: false},
        {word: "[14] happy", vi: "hạnh phúc", distractor: false},
        {word: "[14] joyful", vi: "vui vẻ", distractor: false},
        {word: "boring", vi: "nhàm chán (sai)", distractor: true},
        {word: "sad", vi: "buồn (sai)", distractor: true}
      ]
    }
  }
};
