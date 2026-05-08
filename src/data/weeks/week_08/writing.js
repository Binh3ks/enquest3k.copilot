export default {
  title: "My Busy Classroom",
  min_words: 40,
  model_sentence: "My classroom is very busy on Monday morning! There are 28 students in my class. There are desks for everyone. There are also many chairs in neat rows. On the shelves, there are many books and papers. The teacher has markers for the board. There are pencils and crayons in the supply box. I love our busy classroom because there are so many things to learn with!",
  instruction_en: "Use: In my classroom, there are... / There are ___ students. / On the wall, there are...",
  instruction_vi: "Dùng: In my classroom, there are... / There are ___ students. / On the wall, there are...",
  prompt_en: "Describe your classroom! How many students are there? How many desks and chairs? What is on the walls? What is on the teacher's table? Write a full description.",
  prompt_vi: "Mô tả lớp học! Có bao nhiêu học sinh? Bao nhiêu bàn và ghế? Tường có gì? Bàn giáo viên có gì? Viết mô tả đầy đủ.",
  keywords: ["desk", "pencil", "student", "bag", "marker", "chair", "board", "paper", "shelf", "crayon", "there are", "many"],
  topic_talk_prompt: "Tell me about your classroom. What do you see around you? How many students and things are there?",
  sentence_frames: [
    {"template":"In my classroom, there are ___ students and we all ___."},
    {"template":"There are ___ desks and ___ chairs arranged ___."},
    {"template":"On the wall, there are ___ and ___ that show ___."},
    {"template":"On the teacher's table, there is a ___ and a ___ for ___."},
    {"template":"On the shelves, there are ___ that we use ___."},
    {"template":"I love my classroom because ___ and it makes me ___!"}
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
        {word: "[1] twenty-five", vi: "25 học sinh", distractor: false},
        {word: "[1] thirty", vi: "30 học sinh", distractor: false},
        {word: "[2] study together", vi: "học cùng nhau", distractor: false},
        {word: "[2] help each other", vi: "giúp nhau", distractor: false},
        {word: "[3] twenty-five", vi: "25", distractor: false},
        {word: "[3] thirty", vi: "30", distractor: false},
        {word: "[4] twenty-five", vi: "25", distractor: false},
        {word: "[4] thirty", vi: "30", distractor: false},
        {word: "[5] in neat rows", vi: "thành hàng ngăn nắp", distractor: false},
        {word: "[5] around the room", vi: "quanh phòng", distractor: false},
        {word: "[6] posters", vi: "poster", distractor: false},
        {word: "[6] maps", vi: "bản đồ", distractor: false},
        {word: "[7] pictures", vi: "tranh ảnh", distractor: false},
        {word: "[7] drawings", vi: "bức vẽ", distractor: false},
        {word: "[8] important information", vi: "thông tin quan trọng", distractor: false},
        {word: "[8] our learning topics", vi: "chủ đề học", distractor: false},
        {word: "[9] whiteboard marker", vi: "bút dạ quang", distractor: false},
        {word: "[9] computer", vi: "máy tính", distractor: false},
        {word: "[10] ruler", vi: "thước", distractor: false},
        {word: "[10] grade book", vi: "sổ điểm", distractor: false},
        {word: "[11] teaching us", vi: "dạy chúng tôi", distractor: false},
        {word: "[11] lessons", vi: "bài học", distractor: false},
        {word: "[12] many books", vi: "nhiều sách", distractor: false},
        {word: "[12] supplies and materials", vi: "dụng cụ và tài liệu", distractor: false},
        {word: "[13] for our lessons", vi: "cho bài học", distractor: false},
        {word: "[13] to learn new things", vi: "để học điều mới", distractor: false},
        {word: "[14] there are so many things to learn", vi: "có nhiều thứ để học", distractor: false},
        {word: "[14] it is a great place to study", vi: "đó là nơi tuyệt vời để học", distractor: false},
        {word: "[15] excited to learn", vi: "phấn khích học", distractor: false},
        {word: "[15] happy to be there", vi: "vui khi ở đó", distractor: false},
        {word: "empty", vi: "trống (sai)", distractor: true},
        {word: "boring", vi: "nhàm chán (sai)", distractor: true}
      ]
    }
  }
};
