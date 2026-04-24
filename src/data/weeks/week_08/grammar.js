export default {
  grammar_explanation: {
    title_en: "There are... (Plural)",
    title_vi: "There are... (Số nhiều)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'There are' for PLURAL (more than 1): There are 20 desks", example_en: "There are 20 desks in my classroom. There are many students.", example_vi: "Có 20 cái bàn trong lớp học của tôi. Có nhiều học sinh.", rule_vi: "Dùng 'There are' cho số nhiều (hơn 1): There are 20 desks" },
      { type: "rule", icon: "2️⃣", rule_en: "Add -s to the noun: desk → desks, pencil → pencils, chair → chairs", example_en: "There are pencils on the desk. There are chairs in the room.", example_vi: "Có những cái bút chì trên bàn. Có những chiếc ghế trong phòng.", rule_vi: "Thêm -s vào danh từ: desk → desks, pencil → pencils, chair → chairs" },
      { type: "rule", icon: "3️⃣", rule_en: "Use 'There is' for ONE: There is a bag. Use 'There are' for MANY: There are bags", example_en: "There is a bag on the chair. There are bags on the floor.", example_vi: "Có một cái túi trên ghế. Có những cái túi trên sàn.", rule_vi: "Dùng 'There is' cho MỘT: There is a bag. Dùng 'There are' cho NHIỀU: There are bags" },
      { type: "rule", icon: "4️⃣", rule_en: "You can use numbers: There are 3 markers. Or use 'many': There are many students", example_en: "There are 3 markers on the board. There are many books in the library.", example_vi: "Có 3 cái bút lông trên bảng. Có nhiều sách trong thư viện.", rule_vi: "Bạn có thể dùng số đếm: There are 3 markers. Hoặc dùng 'many': There are many students" }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "There ___ 20 desks in the classroom.", options: ["is", "are", "am"], answer: "are", hint: "20 is plural" },
    { id: 2, type: "fill", question: "There are many ___ on the floor. (bag)", answer: "bags", hint: "add -s to bag" },
    { id: 3, type: "mc", question: "There ___ 30 students in my class.", options: ["is", "are", "be"], answer: "are", hint: "30 is plural" },
    { id: 4, type: "fill", question: "There are ___ on the wall. (shelf→plural)", answer: "shelves", hint: "shelf→shelves" },
    { id: 5, type: "mc", question: "How many chairs are there? There ___ many chairs.", options: ["is", "are", "have"], answer: "are", hint: "chairs is plural" },
    { id: 6, type: "fill", question: "There are five ___ in the tray. (marker)", answer: "markers", hint: "add -s to marker" },
    { id: 7, type: "mc", question: "There are ___ on every desk.", options: ["a paper", "papers", "paper many"], answer: "papers", hint: "plural form needed" },
    { id: 8, type: "fill", question: "There are many ___ in the art box. (crayon)", answer: "crayons", hint: "add -s to crayon" },
    { id: 9, type: "unscramble", question: "Order:", words: ["are", "There", "30", "students", "in", "our", "class"], answer: "There are 30 students in our class.", hint: "There are..." },
    { id: 10, type: "unscramble", question: "Order:", words: ["desks", "There", "are", "many", "in", "the", "classroom"], answer: "There are many desks in the classroom.", hint: "There are many..." },
    { id: 11, type: "unscramble", question: "Order:", words: ["bags", "There", "are", "on", "the", "floor"], answer: "There are bags on the floor.", hint: "There are bags..." },
    { id: 12, type: "unscramble", question: "Order:", words: ["5", "are", "There", "markers", "on", "the", "board"], answer: "There are 5 markers on the board.", hint: "There are 5..." },
    { id: 13, type: "mc", question: "There ___ pencils in the pencil case.", options: ["is", "are", "has"], answer: "are", hint: "pencils is plural" },
    { id: 14, type: "fill", question: "There are three ___ on the wall. (shelf)", answer: "shelves", hint: "shelf → shelves (irregular)" },
    { id: 15, type: "mc", question: "There are many ___ in the box.", options: ["crayons", "crayon", "a crayon"], answer: "crayons", hint: "after 'many' use plural" },
    { id: 16, type: "fill", question: "There are ___ in every row. (chair)", answer: "chairs", hint: "add -s" },
    { id: 17, type: "mc", question: "One desk → I say: There ___ one desk.", options: ["is", "are", "be"], answer: "is", hint: "singular = is" },
    { id: 18, type: "fill", question: "There are many ___ ready for art. (paper)", answer: "papers", hint: "add -s to paper" },
    { id: 19, type: "unscramble", question: "Order:", words: ["are", "There", "chairs", "for", "every", "student"], answer: "There are chairs for every student.", hint: "There are chairs..." },
    { id: 20, type: "unscramble", question: "Order:", words: ["pencils", "books", "There", "are", "and", "on", "the", "shelf"], answer: "There are pencils and books on the shelf.", hint: "There are pencils..." }
  ]
};
