export default {
  grammar_explanation: {
    title_en: "There was / There were",
    title_vi: "There was / There were",
    rules: [
      {
        id: 1,
        rule_en: "There was + one thing: There was a market.",
        rule_vi: "There was + một thứ: There was a market.",
        example_en: "There was a tree.",
        example_vi: "Có một cây."
      },
      {
        id: 2,
        rule_en: "There were + many things: There were trees.",
        rule_vi: "There were + nhiều thứ: There were trees.",
        example_en: "There were buildings.",
        example_vi: "Có những tòa nhà."
      },
      {
        id: 3,
        rule_en: "Now: There is a road. Before: There was a road.",
        rule_vi: "Bây giờ: There is a road. Trước đây: There was a road.",
        example_en: "There is a new bridge. There was an old bridge.",
        example_vi: "Có một cầu mới. Có một cầu cũ."
      }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "___ a market near my house.", answer: "There was", hint: "one market → There was" },
    { id: 2, type: "fill", question: "___ big trees on the road.", answer: "There were", hint: "many trees → There were" },
    { id: 3, type: "fill", question: "___ a bridge over the river.", answer: "There was", hint: "one bridge → There was" },
    { id: 4, type: "fill", question: "___ many buildings in the town.", answer: "There were", hint: "many buildings → There were" },
    { id: 5, type: "fill", question: "___ an old temple in the village.", answer: "There was", hint: "one temple → There was" },
    { id: 6, type: "mc", question: "___ a road to the market.", options: ["There was", "There were", "There is"], answer: "There was", hint: "road = one thing" },
    { id: 7, type: "mc", question: "___ flowers near the bridge.", options: ["There was", "There were", "There are"], answer: "There were", hint: "flowers = many things" },
    { id: 8, type: "fill", question: "___ a small village here before.", answer: "There was", hint: "one village" },
    { id: 9, type: "unscramble", question: "Order:", words: ["was", "There", "a", "market"], answer: "There was a market.", hint: "There was..." },
    { id: 10, type: "unscramble", question: "Order:", words: ["were", "There", "trees", "big"], answer: "There were big trees.", hint: "There were..." },
    { id: 11, type: "fill", question: "___ a river near the village.", answer: "There was", hint: "one river → There was" },
    { id: 12, type: "fill", question: "___ many children in the market.", answer: "There were", hint: "many children → There were" },
    { id: 13, type: "mc", question: "___ an old building by the road.", options: ["There was", "There were", "There are"], answer: "There was", hint: "one building = There was" },
    { id: 14, type: "mc", question: "___ small houses in the village.", options: ["There was", "There were", "There is"], answer: "There were", hint: "many houses = There were" },
    { id: 15, type: "fill", question: "___ a temple at the end of the road.", answer: "There was", hint: "one temple → There was" },
    { id: 16, type: "fill", question: "___ old trees along the river.", answer: "There were", hint: "many trees → There were" },
    { id: 17, type: "unscramble", question: "Order:", words: ["was", "There", "bridge", "a"], answer: "There was a bridge.", hint: "There was..." },
    { id: 18, type: "unscramble", question: "Order:", words: ["were", "There", "buildings", "old"], answer: "There were old buildings.", hint: "There were..." },
    { id: 19, type: "mc", question: "___ a wooden bridge over the river.", options: ["There was", "There were", "There is"], answer: "There was", hint: "one bridge = There was" },
    { id: 20, type: "fill", question: "___ many stalls in the old market.", answer: "There were", hint: "many stalls → There were" }
  ]
};
