export default {
  grammar_explanation: {
    title_en: "There was / There were (Past Existence)",
    title_vi: "There was / There were (Sự tồn tại trong quá khứ)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'There was' + singular: There was a market.", example_en: "There was a market near our house. There was a big tree in the park.", example_vi: "Có một khu chợ gần nhà chúng tôi. Có một cây to trong công viên.", rule_vi: "Dùng 'There was' + danh từ số ít: There was a market." },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'There were' + plural: There were many trees.", example_en: "There were many trees here before. There were lots of children in the park.", example_vi: "Trước đây có nhiều cây ở đây. Có nhiều trẻ em trong công viên.", rule_vi: "Dùng 'There were' + danh từ số nhiều: There were many trees." },
      { type: "rule", icon: "3️⃣", rule_en: "Use for things that existed in the past: There was a bridge here.", example_en: "There was a bridge here 50 years ago. There were old buildings on this street.", example_vi: "Có một cây cầu ở đây 50 năm trước. Có những tòa nhà cũ trên con phố này.", rule_vi: "Dùng cho những thứ đã tồn tại trong quá khứ: There was a bridge here." },
      { type: "rule", icon: "4️⃣", rule_en: "Negative: There was no market. / There were no trees.", example_en: "There was no electricity before. There were no phones in the past.", example_vi: "Trước đây không có điện. Trong quá khứ không có điện thoại.", rule_vi: "Phủ định: There was no market. / There were no trees." }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "___ a big market in the old town.", answer: "There was", hint: "singular noun → There was" },
    { id: 2, type: "fill", question: "___ many trees along the river.", answer: "There were", hint: "plural noun → There were" },
    { id: 3, type: "fill", question: "___ a wooden bridge over the river.", answer: "There was", hint: "singular noun → There was" },
    { id: 4, type: "fill", question: "___ tall buildings near the market.", answer: "There were", hint: "plural noun → There were" },
    { id: 5, type: "fill", question: "___ a beautiful temple in the center.", answer: "There was", hint: "singular noun → There was" },
    { id: 6, type: "fill", question: "___ only one road into the village.", answer: "There was", hint: "singular noun → There was" },
    { id: 7, type: "fill", question: "___ many families in the village.", answer: "There were", hint: "plural noun → There were" },
    { id: 8, type: "fill", question: "___ a clean river through the town.", answer: "There was", hint: "singular noun → There was" },
    { id: 9, type: "fill", question: "___ no new buildings in the old town.", answer: "There were", hint: "plural noun → There were" },
    { id: 10, type: "fill", question: "___ a park next to the old market.", answer: "There was", hint: "singular noun → There was" },
    { id: 11, type: "mc", question: "___ a big temple at the end of the road.", options: ["There was", "There were", "There is"], answer: "There was", hint: "temple = singular" },
    { id: 12, type: "mc", question: "___ many old buildings in the past.", options: ["There was", "There were", "There are"], answer: "There were", hint: "buildings = plural" },
    { id: 13, type: "fill", question: "One hundred years ago, ___ a village here.", answer: "there was", hint: "village = singular" },
    { id: 14, type: "fill", question: "In the old town, ___ flowers near the temple.", answer: "there were", hint: "flowers = plural" },
    { id: 15, type: "mc", question: "___ a long road from the market to the bridge.", options: ["There is", "There was", "There were"], answer: "There was", hint: "road = singular" },
    { id: 16, type: "unscramble", question: "Order:", words: ["was", "There", "a", "market", "old"], answer: "There was an old market.", hint: "There was..." },
    { id: 17, type: "unscramble", question: "Order:", words: ["were", "There", "trees", "many", "tall"], answer: "There were many tall trees.", hint: "There were..." },
    { id: 18, type: "fill", question: "___ no bridge, so people used boats.", answer: "There was", hint: "singular negative" },
    { id: 19, type: "fill", question: "___ children playing near the old temple.", answer: "There were", hint: "plural noun → There were" },
    { id: 20, type: "unscramble", question: "Order:", words: ["were", "There", "buildings", "small", "around", "the", "market"], answer: "There were small buildings around the market.", hint: "There were..." }
  ]
};
