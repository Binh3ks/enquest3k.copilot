export default {
  grammar_explanation: {
    title_en: "Prepositions (In, On, Under, Next to)",
    title_vi: "Giới từ (Trong, Trên, Dưới, Bên cạnh)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'in' for inside: in the box, in the room", rule_vi: "Dùng 'in' cho bên trong: in the box, in the room" },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'on' for on top: on the desk, on the floor", rule_vi: "Dùng 'on' cho trên: on the desk, on the floor" },
      { type: "rule", icon: "3️⃣", rule_en: "Use 'under' for below: under the desk, under the chair", rule_vi: "Dùng 'under' cho dưới: under the desk, under the chair" },
      { type: "rule", icon: "4️⃣", rule_en: "Use 'next to' for beside: next to the door, next to the window", rule_vi: "Dùng 'next to' cho bên cạnh: next to the door, next to the window" }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "The treasure is ___ the box.", options: ["in", "on", "under"], answer: "in", hint: "inside the container" },
    { id: 2, type: "fill", question: "The book is ___ the desk.", answer: "on", hint: "on top of" },
    { id: 3, type: "mc", question: "The ball is ___ the chair.", options: ["in", "under", "next to"], answer: "under", hint: "below" },
    { id: 4, type: "fill", question: "The lamp is ___ ___ the window.", answer: "next to", hint: "beside" },
    { id: 5, type: "mc", question: "Look ___ the floor for the toy.", options: ["in", "on", "under"], answer: "on", hint: "on top of the surface" },
    { id: 6, type: "fill", question: "Hide ___ the desk.", answer: "under", hint: "below it" },
    { id: 7, type: "mc", question: "The picture is ___ the wall.", options: ["in", "on", "under"], answer: "on", hint: "attached to" },
    { id: 8, type: "fill", question: "The treasure is ___ ___ the door.", answer: "next to", hint: "beside" },
    { id: 9, type: "unscramble", question: "Order:", words: ["is", "The", "box", "on", "the", "desk"], answer: "The box is on the desk.", hint: "The box is" },
    { id: 10, type: "unscramble", question: "Order:", words: ["Look", "under", "the", "chair"], answer: "Look under the chair.", hint: "Look under" },
    { id: 11, type: "unscramble", question: "Order:", words: ["treasure", "The", "is", "in", "the", "box"], answer: "The treasure is in the box.", hint: "The treasure is" },
    { id: 12, type: "unscramble", question: "Order:", words: ["Hide", "next", "to", "the", "door"], answer: "Hide next to the door.", hint: "Hide next to" },
    { id: 13, type: "mc", question: "The cat is hiding ___ the bed.", options: ["in", "on", "under"], answer: "under", hint: "below the bed" },
    { id: 14, type: "fill", question: "The book is ___ the shelf.", answer: "on", hint: "on top of" },
    { id: 15, type: "mc", question: "Put the toy ___ the box.", options: ["in", "on", "next to"], answer: "in", hint: "inside" },
    { id: 16, type: "fill", question: "Sit ___ ___ me.", answer: "next to", hint: "beside me" },
    { id: 17, type: "mc", question: "The keys are ___ the table.", options: ["in", "on", "under"], answer: "on", hint: "on top of" },
    { id: 18, type: "fill", question: "The dog is sleeping ___ the tree.", answer: "under", hint: "below" },
    { id: 19, type: "unscramble", question: "Order:", words: ["cat", "The", "is", "next", "to", "the", "window"], answer: "The cat is next to the window.", hint: "The cat is" },
    { id: 20, type: "unscramble", question: "Order:", words: ["Put", "the", "pen", "in", "the", "bag"], answer: "Put the pen in the bag.", hint: "Put the pen" }
  ]
};
