export default {
  grammar_explanation: {
    title_en: "Was / Were (Past of 'Be')",
    title_vi: "Thì Quá khứ của 'Be'",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'was' with I/he/she/it: I was small", rule_vi: "Dùng 'was' với I/he/she/it: I was small" },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'were' with you/we/they: They were babies", rule_vi: "Dùng 'were' với you/we/they: They were babies" },
      { type: "rule", icon: "3️⃣", rule_en: "Talk about the past: I was... (not I am)", rule_vi: "Nói về quá khứ: I was... (không phải I am)" },
      { type: "rule", icon: "4️⃣", rule_en: "Contrast: I am big now. I was small before.", rule_vi: "Đối chiếu: I am big now. I was small before." }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "I ___ a baby in 2015.", answer: "was", hint: "I + was" },
    { id: 2, type: "fill", question: "You ___ very cute when you were little.", answer: "were", hint: "you + were" },
    { id: 3, type: "fill", question: "She ___ a quiet baby.", answer: "was", hint: "she + was" },
    { id: 4, type: "fill", question: "We ___ in kindergarten together.", answer: "were", hint: "we + were" },
    { id: 5, type: "fill", question: "He ___ very noisy when he was young.", answer: "was", hint: "he + was" },
    { id: 6, type: "fill", question: "They ___ small children in the past.", answer: "were", hint: "they + were" },
    { id: 7, type: "fill", question: "My hair ___ short when I was 5.", answer: "was", hint: "it + was" },
    { id: 8, type: "fill", question: "The toys ___ on the floor yesterday.", answer: "were", hint: "plural + were" },
    { id: 9, type: "mc", question: "I ___ a baby 8 years ago.", options: ["am", "was", "were"], answer: "was", hint: "I + past" },
    { id: 10, type: "mc", question: "You ___ very young in this photo.", options: ["is", "was", "were"], answer: "were", hint: "you + were" },
    { id: 11, type: "fill", question: "It ___ my first day at kindergarten.", answer: "was", hint: "it + was" },
    { id: 12, type: "fill", question: "The kids ___ happy at the party.", answer: "were", hint: "plural + were" },
    { id: 13, type: "mc", question: "She ___ not big. She ___ small.", options: ["was, was", "were, were", "am, am"], answer: "was, was", hint: "she + was" },
    { id: 14, type: "unscramble", question: "Order:", words: ["I", "was", "little", "when", "I"], answer: "When I was little", hint: "past time" },
    { id: 15, type: "unscramble", question: "Order:", words: ["They", "were", "babies", "cute"], answer: "They were cute babies", hint: "they + were" },
    { id: 16, type: "fill", question: "My mom ___ young in 1990.", answer: "was", hint: "she + was" },
    { id: 17, type: "fill", question: "You and I ___ friends in kindergarten.", answer: "were", hint: "we + were" },
    { id: 18, type: "mc", question: "The baby ___ not quiet. It ___ noisy!", options: ["was, was", "were, were", "is, is"], answer: "was, was", hint: "past + it" },
    { id: 19, type: "fill", question: "I am big now, but I ___ small before.", answer: "was", hint: "contrast: am → was" },
    { id: 20, type: "fill", question: "We ___ very little when we started school.", answer: "were", hint: "we + were" }
  ]
};
