export default {
  grammar_explanation: {
    title_en: "Past Simple: eat→ate, drink→drank, buy→bought, give→gave",
    title_vi: "Quá Khứ Đơn: eat→ate, drink→drank, buy→bought, give→gave",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "PAST SIMPLE — use for things that happened in the past",
        rule_vi: "QUÁ KHỨ ĐƠN — dùng cho những gì đã xảy ra",
        example_en: "They ate. Luna drank. Mum bought. Luna gave.",
        example_vi: "Họ đã ăn. Luna đã uống. Mẹ đã mua. Luna đã tặng."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "eat → ate (NOT eated!)",
        rule_vi: "eat → ate (KHÔNG phải eated!)",
        example_en: "They ate sandwiches at the picnic.",
        example_vi: "Họ đã ăn bánh sandwich tại buổi dã ngoại."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "drink → drank (NOT drinked!)",
        rule_vi: "drink → drank (KHÔNG phải drinked!)",
        example_en: "Luna drank cold apple juice.",
        example_vi: "Luna đã uống nước táo lạnh."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "buy → bought | give → gave (NOT buyed or gived!)",
        rule_vi: "buy → bought | give → gave (KHÔNG phải buyed hoặc gived!)",
        example_en: "Mum bought fruits. Luna gave some cookies to her friends.",
        example_vi: "Mẹ đã mua trái cây. Luna đã tặng bánh quy cho bạn bè."
      }
    ]
  },

  title: "Grammar: Past Simple — eat, drink, buy, give",
  image_url: "/images/week30/grammar_cover_w30.jpg",
  audio_url: "/audio/week30_easy/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "PAST SIMPLE — use it for things that happened in the past",
      examples: [
        "Luna ate a sandwich at the picnic.",
        "Tom drank cold juice.",
        "Mum bought fruit at the market.",
        "Dad gave us each a cookie."
      ],
      audio_url: "/audio/week30_easy/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "eat → ate (NOT eated!)",
      examples: [
        "I ate a delicious sandwich.",
        "We ate fruit at the picnic.",
        "She ate all her food."
      ],
      audio_url: "/audio/week30_easy/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "drink → drank (NOT drinked!)",
      examples: [
        "Tom drank some juice.",
        "I drank all my water.",
        "We drank cold lemonade."
      ],
      audio_url: "/audio/week30_easy/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "buy → bought | give → gave (NOT buyed or gived!)",
      examples: [
        "Mum bought food at the market.",
        "Dad gave us some cookies.",
        "She gave her friend a piece of cake."
      ],
      audio_url: "/audio/week30_easy/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Base Form", "Past Simple", "Example"],
    rows: [
      ["eat", "ate ⚠️", "I ate a sandwich."],
      ["drink", "drank ⚠️", "Tom drank juice."],
      ["buy", "bought ⚠️", "Mum bought fruit."],
      ["give", "gave ⚠️", "Dad gave us cookies."]
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "Luna ___ a delicious sandwich at the picnic.", audio_url: "/audio/week30_easy/grammar_ex1.mp3", options: ["ate", "eated", "eat", "eating"], answer: "ate", explanation_en: "eat → ate. We say 'ate', not 'eated'!" },
    { id: 2, type: "mc", question: "We ___ lots of fruit at the park.", audio_url: "/audio/week30_easy/grammar_ex2.mp3", options: ["ate", "eated", "eat", "eaten"], answer: "ate", explanation_en: "eat → ate. Use 'ate' for past!" },
    { id: 3, type: "mc", question: "I ___ all the watermelon slices!", audio_url: "/audio/week30_easy/grammar_ex3.mp3", options: ["ate", "eated", "eat", "eats"], answer: "ate", explanation_en: "eat → ate. Always use 'ate' in the past!" },
    { id: 4, type: "mc", question: "She ___ her whole lunch without stopping.", audio_url: "/audio/week30_easy/grammar_ex4.mp3", options: ["ate", "eated", "eat", "eaten"], answer: "ate", explanation_en: "eat → ate. Remember: NOT 'eated'!" },
    { id: 5, type: "mc", question: "Tom ___ cold juice because he was thirsty.", audio_url: "/audio/week30_easy/grammar_ex5.mp3", options: ["drank", "drinked", "drink", "drinks"], answer: "drank", explanation_en: "drink → drank. We say 'drank', not 'drinked'!" },
    { id: 6, type: "mc", question: "I ___ all my water at the picnic.", audio_url: "/audio/week30_easy/grammar_ex6.mp3", options: ["drank", "drinked", "drink", "drinking"], answer: "drank", explanation_en: "drink → drank. Use 'drank' for past!" },
    { id: 7, type: "mc", question: "We ___ cold lemonade on a hot day.", audio_url: "/audio/week30_easy/grammar_ex7.mp3", options: ["drank", "drinked", "drink", "drunk"], answer: "drank", explanation_en: "drink → drank. 'Drank' is always correct!" },
    { id: 8, type: "mc", question: "She ___ some juice before running.", audio_url: "/audio/week30_easy/grammar_ex8.mp3", options: ["drank", "drinked", "drink", "drinks"], answer: "drank", explanation_en: "drink → drank. NOT 'drinked'!" },
    { id: 9, type: "mc", question: "Mum ___ bread, fruits, and juice at the market.", audio_url: "/audio/week30_easy/grammar_ex9.mp3", options: ["bought", "buyed", "buy", "buys"], answer: "bought", explanation_en: "buy → bought. We say 'bought', not 'buyed'!" },
    { id: 10, type: "mc", question: "Dad ___ a new picnic basket last weekend.", audio_url: "/audio/week30_easy/grammar_ex10.mp3", options: ["bought", "buyed", "buy", "buying"], answer: "bought", explanation_en: "buy → bought. Use 'bought' for past!" },
    { id: 11, type: "mc", question: "Dad ___ us each a cookie after the picnic.", audio_url: "/audio/week30_easy/grammar_ex11.mp3", options: ["gave", "gived", "give", "gives"], answer: "gave", explanation_en: "give → gave. We say 'gave', not 'gived'!" },
    { id: 12, type: "mc", question: "Luna ___ her biscuits to the children nearby.", audio_url: "/audio/week30_easy/grammar_ex12.mp3", options: ["gave", "gived", "give", "given"], answer: "gave", explanation_en: "give → gave. Use 'gave' for past!" },
    { id: 13, type: "mc", question: "Tom ___ his friend a piece of watermelon.", audio_url: "/audio/week30_easy/grammar_ex13.mp3", options: ["gave", "gived", "give", "gives"], answer: "gave", explanation_en: "give → gave. 'Gave' is always correct!" },
    { id: 14, type: "mc", question: "Pick the CORRECT sentence.", audio_url: "/audio/week30_easy/grammar_ex14.mp3", options: ["Luna ate a sandwich.", "Luna eated a sandwich.", "Luna eat a sandwich.", "Luna eats a sandwich yesterday."], answer: "Luna ate a sandwich.", explanation_en: "eat → ate. 'Ate' is correct!" },
    { id: 15, type: "mc", question: "Pick the CORRECT sentence.", audio_url: "/audio/week30_easy/grammar_ex15.mp3", options: ["Tom drank cold juice.", "Tom drinked cold juice.", "Tom drink cold juice.", "Tom was drink cold juice."], answer: "Tom drank cold juice.", explanation_en: "drink → drank. 'Drank' is correct!" },
    { id: 16, type: "mc", question: "Pick the CORRECT sentence.", audio_url: "/audio/week30_easy/grammar_ex16.mp3", options: ["Mum bought fruit.", "Mum buyed fruit.", "Mum buy fruit.", "Mum buys fruit yesterday."], answer: "Mum bought fruit.", explanation_en: "buy → bought. 'Bought' is correct!" },
    { id: 17, type: "mc", question: "What is the past of 'eat'?", audio_url: "/audio/week30_easy/grammar_ex17.mp3", options: ["ate", "eated", "eat", "eaten"], answer: "ate", explanation_en: "eat → ate. Remember: NOT 'eated'!" },
    { id: 18, type: "mc", question: "What is the past of 'drink'?", audio_url: "/audio/week30_easy/grammar_ex18.mp3", options: ["drank", "drinked", "drink", "drunk"], answer: "drank", explanation_en: "drink → drank. Remember: NOT 'drinked'!" },
    { id: 19, type: "mc", question: "What is the past of 'buy'?", audio_url: "/audio/week30_easy/grammar_ex19.mp3", options: ["bought", "buyed", "buy", "buying"], answer: "bought", explanation_en: "buy → bought. Remember: NOT 'buyed'!" },
    { id: 20, type: "mc", question: "Finish the story: 'Mum ___ food. Luna ___ a sandwich. Tom ___ lemonade.'", audio_url: "/audio/week30_easy/grammar_ex20.mp3", options: ["bought / ate / drank", "buyed / eated / drinked", "buy / eat / drink", "bought / ate / drinked"], answer: "bought / ate / drank", explanation_en: "buy→bought, eat→ate, drink→drank. All three are irregular!" }
  ]
};