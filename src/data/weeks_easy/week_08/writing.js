export default {
  title: "My Classroom",
  min_words: 30,
  model_sentence: "My classroom is nice! There are desks and chairs for everyone. There are pencils and markers in my bag. There are books on the shelves. I love my classroom!",
  instruction_en: "Use: In my classroom, there are... / There are ___ students. / On the wall, there are...",
  instruction_vi: "Dùng: In my classroom, there are... / There are ___ students. / On the wall, there are...",
  prompt_en: "Describe your classroom! How many students are there? How many desks and chairs? What is on the walls? What is on the teacher's table? Write a full description.",
  prompt_vi: "Mô tả lớp học! Có bao nhiêu học sinh? Bao nhiêu bàn và ghế? Tường có gì? Bàn giáo viên có gì? Viết mô tả đầy đủ.",
  keywords: ["desk", "pencil", "student", "bag", "marker", "chair", "board", "paper", "shelf", "crayon", "there are"],
  topic_talk_prompt: "Tell me about your classroom. What do you see there?",
  sentence_frames: [{"template":"In my classroom, there are ___ students."},{"template":"There are ___ desks and ___ chairs."},{"template":"On the wall, there are ___ and ___."},{"template":"On the teacher's table, there is a ___ and a ___."},{"template":"I love my classroom because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] twenty", vi: "20", distractor: false},
        {word: "[1] thirty", vi: "30", distractor: false},
        {word: "[1] twenty-five", vi: "25", distractor: false},
        {word: "[2] ten", vi: "10", distractor: false},
        {word: "[2] fifteen", vi: "15", distractor: false},
        {word: "[2] twenty", vi: "20", distractor: false},
        {word: "twenties", vi: "20 (sai dạng)", distractor: true},
        {word: "[3] ten", vi: "10", distractor: false},
        {word: "[3] fifteen", vi: "15", distractor: false},
        {word: "[3] twenty", vi: "20", distractor: false},
        {word: "[4] pictures", vi: "tranh", distractor: false},
        {word: "[4] posters", vi: "áp phích", distractor: false},
        {word: "[4] maps", vi: "bản đồ", distractor: false},
        {word: "picture", vi: "tranh (sai dạng)", distractor: true},
        {word: "[5] books", vi: "sách", distractor: false},
        {word: "[5] charts", vi: "biểu đồ", distractor: false},
        {word: "[5] papers", vi: "giấy", distractor: false},
        {word: "[6] computer", vi: "máy tính", distractor: false},
        {word: "[6] bell", vi: "chuông", distractor: false},
        {word: "[6] pen", vi: "bút", distractor: false},
        {word: "[7] book", vi: "sách", distractor: false},
        {word: "[7] marker", vi: "bút dạ", distractor: false},
        {word: "[7] ruler", vi: "thước", distractor: false},
        {word: "[8] it is bright and clean", vi: "nó sáng và sạch", distractor: false},
        {word: "[8] I learn many things", vi: "tôi học nhiều thứ", distractor: false},
        {word: "[8] my friends are here", vi: "bạn tôi ở đây", distractor: false}
      ]
    }
  }
};
