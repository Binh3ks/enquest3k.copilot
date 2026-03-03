export default {
  grammar_explanation: {
    title_en: "There are... (Plural)",
    title_vi: "There are... (Số nhiều)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "ONE thing: There IS a desk", rule_vi: "MỘT thứ: There IS a desk" },
      { type: "rule", icon: "2️⃣", rule_en: "MANY things: There ARE desks", rule_vi: "NHIỀU thứ: There ARE desks" },
      { type: "rule", icon: "3️⃣", rule_en: "Add -s: chair → chairs, bag → bags, desk → desks", rule_vi: "Thêm -s: chair → chairs, bag → bags, desk → desks" },
      { type: "rule", icon: "4️⃣", rule_en: "Special: shelf → shelves", rule_vi: "Đặc biệt: shelf → shelves" }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "There ___ 20 desks.", options: ["is", "are", "am"], answer: "are", hint: "20 is plural" },
    { id: 2, type: "mc", question: "There ___ many chairs.", options: ["is", "are", "be"], answer: "are", hint: "many is plural" },
    { id: 3, type: "fill", question: "There are many ___ in the bag. (pencil)", answer: "pencils", hint: "pencil + s" },
    { id: 4, type: "mc", question: "There ___ students in my class.", options: ["is", "are", "has"], answer: "are", hint: "students is plural" },
    { id: 5, type: "fill", question: "There are ___ on the board. (marker)", answer: "markers", hint: "marker + s" },
    { id: 6, type: "mc", question: "There are crayons in the ___.", options: ["art box", "art boxes", "arts box"], answer: "art box", hint: "one box for art" },
    { id: 7, type: "fill", question: "There are ___ for everyone. (chair)", answer: "chairs", hint: "chair + s" },
    { id: 8, type: "mc", question: "There are 3 ___ on the wall.", options: ["shelf", "shelves", "shelfes"], answer: "shelves", hint: "shelf → shelves (special!)" },
    { id: 9, type: "fill", question: "There are ___ in the art box. (crayon)", answer: "crayons", hint: "crayon + s" },
    { id: 10, type: "mc", question: "There are 30 ___ in my class.", options: ["student", "students", "study"], answer: "students", hint: "student + s" },
    { id: 11, type: "unscramble", question: "Order:", words: ["are", "There", "chairs", "in", "class"], answer: "There are chairs in class.", hint: "There are..." },
    { id: 12, type: "unscramble", question: "Order:", words: ["bags", "There", "are", "on", "the", "floor"], answer: "There are bags on the floor.", hint: "There are bags..." },
    { id: 13, type: "fill", question: "There are ___ on my desk. (paper)", answer: "papers", hint: "paper + s" },
    { id: 14, type: "mc", question: "There are ___ in the art box.", options: ["crayons", "crayon", "a crayon"], answer: "crayons", hint: "plural form" },
    { id: 15, type: "unscramble", question: "Order:", words: ["are", "There", "books", "on", "the", "shelf"], answer: "There are books on the shelf.", hint: "There are books..." },
    { id: 16, type: "fill", question: "There are many ___ in my bag. (pencil)", answer: "pencils", hint: "pencil + s" },
    { id: 17, type: "mc", question: "There ___ boards in the classroom.", options: ["is", "are", "has"], answer: "are", hint: "boards is plural" },
    { id: 18, type: "fill", question: "There are ___ for art. (crayon)", answer: "crayons", hint: "crayon + s" },
    { id: 19, type: "unscramble", question: "Order:", words: ["There", "are", "students", "in", "class"], answer: "There are students in class.", hint: "There are students..." },
    { id: 20, type: "unscramble", question: "Order:", words: ["desks", "and", "chairs", "There", "are"], answer: "There are desks and chairs.", hint: "There are desks..." }
  ]
};
