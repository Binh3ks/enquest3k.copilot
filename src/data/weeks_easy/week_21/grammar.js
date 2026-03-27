export default {
  grammar_explanation: {
    title_en: "Past Simple: I walked",
    title_vi: "Thì Quá Khứ Đơn: I walked",
    rules: [
      {
        id: 1,
        rule_en: "Add -ed to make past: walk → walked",
        rule_vi: "Thêm -ed để tạo quá khứ: walk → walked",
        example_en: "I walked to school.",
        example_vi: "Tôi đã đi bộ đến trường."
      },
      {
        id: 2,
        rule_en: "I/You/He/She/We/They + verb-ed",
        rule_vi: "I/You/He/She/We/They + động từ-ed",
        example_en: "She cooked dinner.",
        example_vi: "Cô ấy đã nấu bữa tối."
      },
      {
        id: 3,
        rule_en: "Time words: yesterday, last night, in the morning",
        rule_vi: "Từ chỉ thời gian: yesterday, last night, in the morning",
        example_en: "Yesterday, I played in the park.",
        example_vi: "Hôm qua, tôi đã chơi trong công viên."
      }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "Yesterday, I ___ (walk) to school.", answer: "walked", hint: "walk → walked" },
    { id: 2, type: "fill", question: "She ___ (cook) dinner last night.", answer: "cooked", hint: "cook → cooked" },
    { id: 3, type: "fill", question: "We ___ (play) in the park.", answer: "played", hint: "play → played" },
    { id: 4, type: "fill", question: "He ___ (watch) TV yesterday.", answer: "watched", hint: "watch → watched" },
    { id: 5, type: "fill", question: "I ___ (clean) my room.", answer: "cleaned", hint: "clean → cleaned" },
    { id: 6, type: "fill", question: "They ___ (help) their mom.", answer: "helped", hint: "help → helped" },
    { id: 7, type: "fill", question: "She ___ (talk) to her friend.", answer: "talked", hint: "talk → talked" },
    { id: 8, type: "fill", question: "I ___ (listen) to music.", answer: "listened", hint: "listen → listened" },
    { id: 9, type: "fill", question: "He ___ (open) the door.", answer: "opened", hint: "open → opened" },
    { id: 10, type: "fill", question: "We ___ (wash) our hands.", answer: "washed", hint: "wash → washed" },
    { id: 11, type: "mc", question: "I ___ my homework last night.", options: ["finish", "finished", "finishing"], answer: "finished", hint: "past tense" },
    { id: 12, type: "mc", question: "The game ___ at 3 o'clock.", options: ["start", "started", "starting"], answer: "started", hint: "past tense" },
    { id: 13, type: "fill", question: "He ___ (look) at the stars.", answer: "looked", hint: "look → looked" },
    { id: 14, type: "fill", question: "She ___ (finish) early.", answer: "finished", hint: "finish → finished" },
    { id: 15, type: "mc", question: "Yesterday, we ___ soccer.", options: ["play", "played", "plays"], answer: "played", hint: "yesterday = past" },
    { id: 16, type: "unscramble", question: "Order:", words: ["walked", "I", "school", "to"], answer: "I walked to school.", hint: "I walked..." },
    { id: 17, type: "unscramble", question: "Order:", words: ["dinner", "cooked", "Mom"], answer: "Mom cooked dinner.", hint: "Mom cooked..." },
    { id: 18, type: "fill", question: "The birds ___ (start) to sing.", answer: "started", hint: "start → started" },
    { id: 19, type: "fill", question: "We ___ (clean) the table.", answer: "cleaned", hint: "clean → cleaned" },
    { id: 20, type: "unscramble", question: "Order:", words: ["I", "music", "listened", "to"], answer: "I listened to music.", hint: "I listened..." }
  ]
};
