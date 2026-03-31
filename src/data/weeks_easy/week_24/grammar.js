export default {
  grammar_explanation: {
    title_en: "Was / Were + Adjectives",
    title_vi: "Was / Were + Tinh tu",
    rules: [
      {
        id: 1,
        rule_en: "Use WAS with I / He / She / It.",
        rule_vi: "Dung WAS voi I / He / She / It.",
        example_en: "I was scared. She was excited. He was tired.",
        example_vi: "Toi was scared. Co ay was excited. Anh ay was tired."
      },
      {
        id: 2,
        rule_en: "Use WERE with You / We / They.",
        rule_vi: "Dung WERE voi You / We / They.",
        example_en: "You were hungry. We were bored. They were surprised.",
        example_vi: "Ban were hungry. Chung toi were bored. Ho were surprised."
      },
      {
        id: 3,
        rule_en: "Negative: was not (wasn't) / were not (weren't).",
        rule_vi: "Phu dinh: was not (wasn't) / were not (weren't).",
        example_en: "I wasn't angry. They weren't upset.",
        example_vi: "Toi wasn't angry. Ho weren't upset."
      }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "Yesterday, I ___ very tired.", options: ["was", "were", "is"], answer: "was", hint: "I → was" },
    { id: 2, type: "mc", question: "The children ___ excited.", options: ["was", "were", "are"], answer: "were", hint: "children → they → were" },
    { id: 3, type: "mc", question: "She ___ calm.", options: ["was", "were", "is"], answer: "was", hint: "She → was" },
    { id: 4, type: "fill", question: "I ___ hungry before lunch.", answer: "was", hint: "I → was or were?" },
    { id: 5, type: "fill", question: "We ___ surprised.", answer: "were", hint: "We → was or were?" },
    { id: 6, type: "mc", question: "___ you scared?", options: ["Was", "Were", "Is"], answer: "Were", hint: "you → Were in a question" },
    { id: 7, type: "fill", question: "She ___ not angry — she ___ calm.", answer: ["wasn't", "was"], hint: "negative: was not → wasn't" },
    { id: 8, type: "mc", question: "They ___ not bored.", options: ["wasn't", "weren't", "isn't"], answer: "weren't", hint: "They → weren't in negative" },
    { id: 9, type: "unscramble", question: "Order: [ was / I / worried ]", answer: "I was worried.", hint: "Subject + was + adjective" },
    { id: 10, type: "unscramble", question: "Order: [ were / they / surprised / very ]", answer: "They were very surprised.", hint: "Subject + were + very + adjective" },
    { id: 11, type: "mc", question: "Mia ___ relieved when she found her homework.", options: ["was", "were", "is"], answer: "was", hint: "Mia = She → was" },
    { id: 12, type: "fill", question: "Leo ___ upset about his pencil.", answer: "was", hint: "Leo = He → was or were?" },
    { id: 13, type: "mc", question: "Tom and his sister ___ cheerful.", options: ["was", "were", "is"], answer: "were", hint: "Tom and his sister = They → were" },
    { id: 14, type: "mc", question: "It ___ cold outside.", options: ["was", "were", "are"], answer: "was", hint: "It → was" },
    { id: 15, type: "fill", question: "Everyone ___ happy at the end.", answer: "was", hint: "Everyone = singular → was" },
    { id: 16, type: "mc", question: "Which is correct?", options: ["I was scared.", "I were scared.", "I is scared."], answer: "I was scared.", hint: "I → was" },
    { id: 17, type: "mc", question: "Which is correct?", options: ["They was bored.", "They were bored.", "They is bored."], answer: "They were bored.", hint: "They → were" },
    { id: 18, type: "fill", question: "___ he angry? (Was / Were)", answer: "Was", hint: "He → Was in a question?" },
    { id: 19, type: "mc", question: "We ___ not tired — we were cheerful!", options: ["wasn't", "weren't", "isn't"], answer: "weren't", hint: "We → weren't in negative" },
    { id: 20, type: "unscramble", question: "Order: [ she / not / was / bored ]", answer: "She was not bored.", hint: "Subject + was + not + adjective" }
  ]
};
