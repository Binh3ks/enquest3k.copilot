export default {
  grammar_explanation: {
    title_en: "Present Simple (Daily Routines)",
    title_vi: "Thì Hiện Tại Đơn (Thói Quen Hàng Ngày)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use the base verb with I / you / we / they: I wake up, I eat breakfast", example_en: "I wake up at 6 o'clock. I eat breakfast every morning.", example_vi: "Tôi thức dậy lúc 6 giờ. Tôi ăn sáng mỗi buổi sáng.", rule_vi: "Dùng động từ nguyên mẫu với I / you / we / they: I wake up, I eat breakfast" },
      { type: "rule", icon: "2️⃣", rule_en: "Add -s or -es with he / she / it: She wakes up, He brushes his teeth", example_en: "She wakes up at 7. He brushes his teeth after breakfast.", example_vi: "Cô ấy thức dậy lúc 7 giờ. Anh ấy đánh răng sau bữa sáng.", rule_vi: "Thêm -s hoặc -es với he / she / it: She wakes up, He brushes his teeth" },
      { type: "rule", icon: "3️⃣", rule_en: "Use 'go' + to for places: I go to school, She goes to bed", example_en: "I go to school at 7:30. She goes to bed at 9 o'clock.", example_vi: "Tôi đi học lúc 7:30. Cô ấy đi ngủ lúc 9 giờ.", rule_vi: "Dùng 'go' + to cho nơi chốn: I go to school, She goes to bed" },
      { type: "rule", icon: "4️⃣", rule_en: "Use time words: at 7 o'clock, in the morning, every day", example_en: "I read at 8 o'clock. She exercises in the morning. He walks to school every day.", example_vi: "Tôi đọc sách lúc 8 giờ. Cô ấy tập thể dục vào buổi sáng. Anh ấy đi bộ đến trường mỗi ngày.", rule_vi: "Dùng từ chỉ thời gian: at 7 o'clock, in the morning, every day" }
    ]
  },
  exercises: [
    { id: 1, type: "multiple_choice", question: "I ___ up at 7 o'clock.", options: ["wake", "wakes", "waking"], answer: "wake", explanation: "Use 'wake' with I" },
    { id: 2, type: "multiple_choice", question: "She ___ her teeth every morning.", options: ["brush", "brushes", "brushing"], answer: "brushes", explanation: "Add -es with she/he" },
    { id: 3, type: "multiple_choice", question: "I ___ breakfast at 7:30.", options: ["eat", "eats", "eating"], answer: "eat", explanation: "Use 'eat' with I" },
    { id: 4, type: "multiple_choice", question: "He ___ to school at 8 o'clock.", options: ["go", "goes", "going"], answer: "goes", explanation: "Add -es with he" },
    { id: 5, type: "multiple_choice", question: "We ___ lunch at 12 o'clock.", options: ["have", "has", "having"], answer: "have", explanation: "Use 'have' with we" },
    { id: 6, type: "fill_in_blank", question: "I ___ with my friends after school.", answer: "play", hint: "verb: to have fun" },
    { id: 7, type: "fill_in_blank", question: "My sister ___ her homework in the evening.", answer: "does", hint: "verb: to complete work" },
    { id: 8, type: "fill_in_blank", question: "I ___ dinner at 7 o'clock.", answer: "have", hint: "verb: to eat" },
    { id: 9, type: "fill_in_blank", question: "They ___ TV before bed.", answer: "watch", hint: "verb: to look at" },
    { id: 10, type: "fill_in_blank", question: "I ___ to bed at 9 o'clock.", answer: "go", hint: "verb: to move" },
    { id: 11, type: "unscramble", words: ["I", "wake", "up", "early"], answer: "I wake up early" },
    { id: 12, type: "unscramble", words: ["brush", "teeth", "I", "my"], answer: "I brush my teeth" },
    { id: 13, type: "unscramble", words: ["eat", "I", "breakfast"], answer: "I eat breakfast" },
    { id: 14, type: "unscramble", words: ["school", "go", "I", "to"], answer: "I go to school" },
    { id: 15, type: "unscramble", words: ["lunch", "have", "I", "at", "12"], answer: "I have lunch at 12" },
    { id: 16, type: "unscramble", words: ["play", "I", "friends", "with"], answer: "I play with friends" },
    { id: 17, type: "unscramble", words: ["do", "I", "homework", "my"], answer: "I do my homework" },
    { id: 18, type: "unscramble", words: ["dinner", "I", "have"], answer: "I have dinner" },
    { id: 19, type: "unscramble", words: ["watch", "I", "TV"], answer: "I watch TV" },
    { id: 20, type: "unscramble", words: ["bed", "to", "go", "I"], answer: "I go to bed" }
  ]
};
