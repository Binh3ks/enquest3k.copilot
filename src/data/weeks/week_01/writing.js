export default {
  title: "My First Day at School",
  min_words: 40,
  model_sentence: "I am Alex. I am a student. My teacher is Ms. Johnson. She is very kind. My classroom is big. There are many desks and books. I am happy at school. I like to learn new things.",
  instruction_en: "Use: My name is... / I am... / I like... / My teacher is...",
  instruction_vi: "Dùng: My name is... / I am... / I like... / My teacher is...",
  prompt_en: "Introduce yourself! What is your name? How old are you? What do you like to do? Who is your teacher? Describe yourself in 4–5 sentences.",
  prompt_vi: "Giới thiệu bản thân! Tên bạn là gì? Bạn bao nhiêu tuổi? Bạn thích làm gì? Thầy/Cô bạn là ai? Viết 4–5 câu về bản thân.",
  keywords: ["I am", "is", "are", "teacher", "classroom", "student", "school"],
  sentence_frames: [
    {"template":"Hello! My name is ___ and I am ___ years old."},
    {"template":"I am a ___ at ___ School and my teacher is ___."},
    {"template":"My teacher is very ___ and always ___ us learn new things."},
    {"template":"My classroom ___ and there are ___."},
    {"template":"Every day at school, I like to ___ because ___."},
    {"template":"I feel ___ at school and I love ___!"}
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] Alex", vi: "Alex (tên)", distractor: false},
        {word: "[1] Emma", vi: "Emma (tên)", distractor: false},
        {word: "[1] Max", vi: "Max (tên)", distractor: false},
        {word: "[2] seven", vi: "7 tuổi", distractor: false},
        {word: "[2] eight", vi: "8 tuổi", distractor: false},
        {word: "[2] nine", vi: "9 tuổi", distractor: false},
        {word: "[3] student", vi: "học sinh", distractor: false},
        {word: "[3] pupil", vi: "học sinh", distractor: false},
        {word: "[4] Greenwood", vi: "Greenwood (tên trường)", distractor: false},
        {word: "[4] Riverside", vi: "Riverside (tên trường)", distractor: false},
        {word: "[5] Ms. Johnson", vi: "Cô Johnson", distractor: false},
        {word: "[5] Mr. Brown", vi: "Thầy Brown", distractor: false},
        {word: "[6] kind", vi: "tử tế", distractor: false},
        {word: "[6] helpful", vi: "hay giúp đỡ", distractor: false},
        {word: "[6] patient", vi: "kiên nhẫn", distractor: false},
        {word: "[7] helps", vi: "giúp đỡ", distractor: false},
        {word: "[7] teaches", vi: "dạy", distractor: false},
        {word: "[8] is big", vi: "rộng", distractor: false},
        {word: "[8] has many windows", vi: "có nhiều cửa sổ", distractor: false},
        {word: "[9] many desks and chairs", vi: "nhiều bàn ghế", distractor: false},
        {word: "[9] books and pictures on the walls", vi: "sách và tranh trên tường", distractor: false},
        {word: "[10] read books", vi: "đọc sách", distractor: false},
        {word: "[10] learn math", vi: "học toán", distractor: false},
        {word: "[10] play with my friends", vi: "chơi với bạn", distractor: false},
        {word: "[11] it is fun", vi: "nó vui", distractor: false},
        {word: "[11] I can learn many things", vi: "tôi học được nhiều thứ", distractor: false},
        {word: "[12] happy", vi: "vui", distractor: false},
        {word: "[12] excited", vi: "phấn khích", distractor: false},
        {word: "[13] being a student", vi: "là học sinh", distractor: false},
        {word: "[13] learning new things", vi: "học điều mới", distractor: false},
        {word: "teaching", vi: "dạy (sai ngữ cảnh)", distractor: true},
        {word: "lazy", vi: "lười (sai ngữ cảnh)", distractor: true}
      ]
    }
  }
};
