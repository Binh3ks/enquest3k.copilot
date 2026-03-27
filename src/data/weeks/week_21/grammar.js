export default {
  grammar_explanation: {
    title_en: "Past Simple: verb + -ed",
    title_vi: "Thì Quá Khứ Đơn: động từ + -ed",
    rules: [
      {
        id: 1,
        rule_en: "Add -ed to most verbs: walk → walked, play → played",
        rule_vi: "Thêm -ed vào hầu hết động từ: walk → walked, play → played",
        example_en: "I walked to school. She played soccer.",
        example_vi: "Tôi đã đi bộ đến trường. Cô ấy đã chơi đá bóng."
      },
      {
        id: 2,
        rule_en: "All subjects use the same form: I/You/He/She/We/They walked",
        rule_vi: "Tất cả chủ ngữ dùng cùng dạng: I/You/He/She/We/They walked",
        example_en: "He helped his mom. They listened to music.",
        example_vi: "Anh ấy đã giúp mẹ. Họ đã nghe nhạc."
      },
      {
        id: 3,
        rule_en: "Use time words: yesterday, last night, in the morning",
        rule_vi: "Dùng từ chỉ thời gian: yesterday, last night, in the morning",
        example_en: "Yesterday, I cooked dinner. Last night, I watched TV.",
        example_vi: "Hôm qua, tôi đã nấu bữa tối. Tối qua, tôi đã xem TV."
      }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "Yesterday, I ___ (walk) to school.", answer: "walked", hint: "walk → walked" },
    { id: 2, type: "fill", question: "She ___ (cook) dinner last night.", answer: "cooked", hint: "cook → cooked" },
    { id: 3, type: "fill", question: "We ___ (play) soccer after school.", answer: "played", hint: "play → played" },
    { id: 4, type: "fill", question: "He ___ (watch) TV in the evening.", answer: "watched", hint: "watch → watched" },
    { id: 5, type: "fill", question: "I ___ (clean) my room yesterday.", answer: "cleaned", hint: "clean → cleaned" },
    { id: 6, type: "fill", question: "They ___ (help) their teacher.", answer: "helped", hint: "help → helped" },
    { id: 7, type: "fill", question: "She ___ (talk) to her friend.", answer: "talked", hint: "talk → talked" },
    { id: 8, type: "fill", question: "I ___ (listen) to music all day.", answer: "listened", hint: "listen → listened" },
    { id: 9, type: "fill", question: "He ___ (open) the big door.", answer: "opened", hint: "open → opened" },
    { id: 10, type: "fill", question: "We ___ (wash) our hands before dinner.", answer: "washed", hint: "wash → washed" },
    { id: 11, type: "mc", question: "I ___ my homework at 5 pm.", options: ["finish", "finished", "finishing"], answer: "finished", hint: "past tense" },
    { id: 12, type: "mc", question: "The game ___ at three o'clock.", options: ["start", "started", "starting"], answer: "started", hint: "past tense" },
    { id: 13, type: "fill", question: "She ___ (look) at the stars last night.", answer: "looked", hint: "look → looked" },
    { id: 14, type: "fill", question: "He ___ (finish) the race first!", answer: "finished", hint: "finish → finished" },
    { id: 15, type: "mc", question: "Yesterday, they ___ together.", options: ["cook", "cooked", "cooks"], answer: "cooked", hint: "yesterday = past" },
    { id: 16, type: "unscramble", question: "Order:", words: ["walked", "I", "school", "to"], answer: "I walked to school.", hint: "I walked..." },
    { id: 17, type: "unscramble", question: "Order:", words: ["dinner", "cooked", "Mom", "yesterday"], answer: "Mom cooked dinner yesterday.", hint: "Mom cooked..." },
    { id: 18, type: "fill", question: "The birds ___ (start) to sing at dawn.", answer: "started", hint: "start → started" },
    { id: 19, type: "fill", question: "We ___ (clean) the whole house.", answer: "cleaned", hint: "clean → cleaned" },
    { id: 20, type: "unscramble", question: "Order:", words: ["I", "music", "listened", "to", "last night"], answer: "I listened to music last night.", hint: "I listened..." }
  ]
};
