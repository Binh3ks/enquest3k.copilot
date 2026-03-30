export default {
  grammar_explanation: {
    title_en: "Regular Past Tense: verb + -ed",
    title_vi: "Thi qua khu co quy tac: dong tu + -ed",
    rules: [
      {
        id: 1,
        rule_en: "Most regular verbs: add -ed. paint → painted, color → colored, fold → folded.",
        rule_vi: "Dong tu thuong: them -ed. paint → painted, color → colored, fold → folded.",
        example_en: "I painted a picture yesterday.",
        example_vi: "Toi da ve mot buc tranh hom qua."
      },
      {
        id: 2,
        rule_en: "Verbs ending in -e: add only -d. glue → glued, create → created.",
        rule_vi: "Dong tu tan cung bang -e: chi them -d. glue → glued, create → created.",
        example_en: "She glued the pieces together carefully.",
        example_vi: "Co ay da dan cac manh lai voi nhau can than."
      },
      {
        id: 3,
        rule_en: "Note: cut is irregular (cut → cut). It stays the same in past tense.",
        rule_vi: "Luu y: cut la bat quy tac (cut → cut). Giu nguyen o thi qua khu.",
        example_en: "He cut the paper with scissors in art class.",
        example_vi: "Ban ay da cat giay bang keo trong lop my thuat."
      }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "Yesterday, Mia ___ a colorful picture.", options: ["painted", "paint", "painting"], answer: "painted", hint: "Regular past: paint + ed" },
    { id: 2, type: "mc", question: "She ___ the flowers in her picture very carefully.", options: ["colored", "color", "colors"], answer: "colored", hint: "Regular past: color + ed" },
    { id: 3, type: "fill", question: "He ___ (glue) the pieces onto the card yesterday.", answer: "glued", hint: "glue + d (ends in -e)" },
    { id: 4, type: "fill", question: "We ___ (fold) the paper into a butterfly shape.", answer: "folded", hint: "fold + ed" },
    { id: 5, type: "mc", question: "I ___ the paper with scissors in art class.", options: ["cut", "cutted", "cuts"], answer: "cut", hint: "cut is irregular - stays the same" },
    { id: 6, type: "mc", question: "Mia ___ a beautiful masterpiece in art class.", options: ["created", "create", "creating"], answer: "created", hint: "create + d (ends in -e)" },
    { id: 7, type: "fill", question: "She ___ (brush) the pigment across the canvas.", answer: "brushed", hint: "brush + ed" },
    { id: 8, type: "fill", question: "The students ___ (paint) pictures of flowers.", answer: "painted", hint: "paint + ed" },
    { id: 9, type: "mc", question: "Which sentence is correct?", options: ["She folded the paper carefully.", "She fold the paper carefully.", "She folds the paper yesterday."], answer: "She folded the paper carefully.", hint: "Past tense: fold + ed" },
    { id: 10, type: "mc", question: "He ___ (glue) → what is the correct past form?", options: ["glued", "glueed", "gluied"], answer: "glued", hint: "glue ends in -e, so add -d only" },
    { id: 11, type: "unscramble", question: "Order:", words: ["painted", "she", "a", "picture", "yesterday"], answer: "She painted a picture yesterday.", hint: "Subject + verb-ed + object + time" },
    { id: 12, type: "unscramble", question: "Order:", words: ["carefully", "he", "the", "paper", "folded"], answer: "He folded the paper carefully.", hint: "Subject + verb-ed + object + adverb" },
    { id: 13, type: "mc", question: "We ___ the paper into small shapes for our project.", options: ["cut", "cutted", "cuted"], answer: "cut", hint: "cut is irregular" },
    { id: 14, type: "fill", question: "I ___ (color) the butterfly wings blue and red.", answer: "colored", hint: "color + ed" },
    { id: 15, type: "mc", question: "Which verb is irregular in past tense?", options: ["cut", "fold", "glue"], answer: "cut", hint: "cut stays cut, it does not change" },
    { id: 16, type: "fill", question: "She ___ (create) a beautiful painting with natural pigments.", answer: "created", hint: "create + d" },
    { id: 17, type: "mc", question: "Choose the correct sentence.", options: ["Mia glued the leaves to her picture.", "Mia glue the leaves to her picture.", "Mia glueed the leaves to her picture."], answer: "Mia glued the leaves to her picture.", hint: "glue + d only (ends in -e)" },
    { id: 18, type: "fill", question: "He ___ (fold) the paper three times to check the symmetry.", answer: "folded", hint: "fold + ed" },
    { id: 19, type: "unscramble", question: "Order:", words: ["cut", "with", "she", "scissors", "carefully", "the", "paper"], answer: "She cut the paper carefully with scissors.", hint: "cut does not change in past" },
    { id: 20, type: "mc", question: "We ___ everything we needed for the art project yesterday.", options: ["created", "create", "was create"], answer: "created", hint: "create + d for past" }
  ]
};
