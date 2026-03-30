export default {
  grammar_explanation: {
    title_en: "Past Tense: add -ed to regular verbs",
    title_vi: "Thi qua khu: them -ed vao dong tu co quy tac",
    rules: [
      {
        id: 1,
        rule_en: "Add -ed: paint → painted, color → colored, fold → folded.",
        rule_vi: "Them -ed: paint → painted, color → colored, fold → folded.",
        example_en: "I painted a picture yesterday.",
        example_vi: "Toi da ve mot buc tranh hom qua."
      },
      {
        id: 2,
        rule_en: "Verb ends in -e: add -d only. glue → glued, create → created.",
        rule_vi: "Dong tu tan cung bang -e: chi them -d. glue → glued, create → created.",
        example_en: "She glued the paper carefully.",
        example_vi: "Co ay da dan giay can than."
      },
      {
        id: 3,
        rule_en: "Note: cut stays cut in past tense (irregular).",
        rule_vi: "Luu y: cut giu nguyen o thi qua khu (bat quy tac).",
        example_en: "I cut the paper with scissors.",
        example_vi: "Toi da cat giay bang keo."
      }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "Yesterday, I ___ a picture.", options: ["painted", "paint", "painting"], answer: "painted", hint: "paint + ed" },
    { id: 2, type: "mc", question: "She ___ the flowers carefully.", options: ["colored", "color", "colors"], answer: "colored", hint: "color + ed" },
    { id: 3, type: "fill", question: "He ___ (glue) the paper pieces together.", answer: "glued", hint: "glue + d" },
    { id: 4, type: "fill", question: "We ___ (fold) the paper.", answer: "folded", hint: "fold + ed" },
    { id: 5, type: "mc", question: "I ___ the paper with scissors.", options: ["cut", "cutted", "cuts"], answer: "cut", hint: "cut is irregular" },
    { id: 6, type: "mc", question: "Mia ___ a beautiful picture.", options: ["created", "create", "creating"], answer: "created", hint: "create + d" },
    { id: 7, type: "fill", question: "She ___ (brush) the paint on the paper.", answer: "brushed", hint: "brush + ed" },
    { id: 8, type: "mc", question: "Which is correct?", options: ["She folded the paper.", "She fold the paper.", "She folds the paper yesterday."], answer: "She folded the paper.", hint: "fold + ed for past" },
    { id: 9, type: "mc", question: "Which verb stays the same in past tense?", options: ["cut", "fold", "paint"], answer: "cut", hint: "cut is irregular" },
    { id: 10, type: "fill", question: "I ___ (color) the flowers blue and yellow.", answer: "colored", hint: "color + ed" },
    { id: 11, type: "mc", question: "I ___ (paint) → what is the past form?", options: ["painted", "paint", "paints"], answer: "painted", hint: "add -ed" },
    { id: 12, type: "unscramble", question: "Order:", words: ["painted", "I", "a", "picture"], answer: "I painted a picture.", hint: "Subject + past verb + object" },
    { id: 13, type: "fill", question: "She ___ (create) a beautiful design.", answer: "created", hint: "create + d" },
    { id: 14, type: "mc", question: "Which sentence is correct?", options: ["Mia glued the leaves.", "Mia gluing the leaves.", "Mia glueed the leaves."], answer: "Mia glued the leaves.", hint: "glue + d" },
    { id: 15, type: "unscramble", question: "Order:", words: ["folded", "she", "the", "paper"], answer: "She folded the paper.", hint: "Subject + past verb + object" },
    { id: 16, type: "mc", question: "Yesterday, we ___ paper butterflies.", options: ["created", "creates", "create"], answer: "created", hint: "past tense: create + d" },
    { id: 17, type: "fill", question: "He ___ (glue) everything onto the picture.", answer: "glued", hint: "glue + d" },
    { id: 18, type: "mc", question: "Complete: She ___ the paper into a star.", options: ["folded", "fold", "folds"], answer: "folded", hint: "fold + ed, past tense" },
    { id: 19, type: "fill", question: "I ___ (paint) flowers in art class yesterday.", answer: "painted", hint: "paint + ed" },
    { id: 20, type: "mc", question: "How do we make 'paint' into past tense?", options: ["Add -ed: painted", "Add -d: paintd", "Add -ing: painting"], answer: "Add -ed: painted", hint: "regular verbs: add -ed" }
  ]
};
