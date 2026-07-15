export default {
  grammar_explanation: {
    title_en: "Sequence Words: First, Next, Then, Finally",
    title_vi: "Từ trình tự: First, Next, Then, Finally",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "FIRST = the first step (at the beginning)",
        rule_vi: "FIRST = bước đầu tiên",
        example_en: "First, I washed my hands.",
        example_vi: "Đầu tiên, tôi rửa tay."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "NEXT = the second step",
        rule_vi: "NEXT = bước thứ hai",
        example_en: "Next, I spread jam on the bread.",
        example_vi: "Tiếp theo, tôi phết mứt lên bánh mì."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "THEN = a step in the middle",
        rule_vi: "THEN = một bước ở giữa",
        example_en: "Then, I put the two slices together.",
        example_vi: "Sau đó, tôi ghép hai lát bánh lại."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "FINALLY = the last step (at the end)",
        rule_vi: "FINALLY = bước cuối cùng",
        example_en: "Finally, I ate my sandwich.",
        example_vi: "Cuối cùng, tôi ăn bánh sandwich."
      }
    ]
  },

  title: "Sequence Words: First, Next, Then, Finally",
  image_url: "/images/week25/grammar_cover_w25.jpg",
  audio_url: "/audio/week25_easy/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "FIRST = the first step (at the beginning)",
      examples: ["First, take the bread.", "First, I put on toothpaste.", "First, open the jar."],
      audio_url: "/audio/week25_easy/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "NEXT = the second step",
      examples: ["Next, spread the jam.", "Next, brush your teeth.", "Next, add the jam."],
      audio_url: "/audio/week25_easy/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "THEN = a step in the middle",
      examples: ["Then, press the bread together.", "Then, cut the sandwich.", "Then, spit out the toothpaste."],
      audio_url: "/audio/week25_easy/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "FINALLY = the last step (at the end)",
      examples: ["Finally, eat the sandwich!", "Finally, rinse your mouth.", "Finally, enjoy the food!"],
      audio_url: "/audio/week25_easy/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Word", "When to use", "Example"],
    rows: [
      ["First,", "Step 1", "First, take the bread."],
      ["Next,", "Step 2", "Next, spread the jam."],
      ["Then,", "Step 3", "Then, put it together."],
      ["Finally,", "Last step", "Finally, eat it!"]
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "___, take the bread from the bag.", audio_url: "/audio/week25_easy/grammar_ex1.mp3", options: ["First", "Finally", "Then", "Next"], answer: "First", explanation_en: "FIRST is used for the very first step." },
    { id: 2, type: "mc", question: "___, spread the jam on the bread.", audio_url: "/audio/week25_easy/grammar_ex2.mp3", options: ["Next", "First", "Finally", "Then"], answer: "Next", explanation_en: "NEXT is the second step." },
    { id: 3, type: "mc", question: "___, put the bread together.", audio_url: "/audio/week25_easy/grammar_ex3.mp3", options: ["Then", "Finally", "First", "Next"], answer: "Then", explanation_en: "THEN is a middle step." },
    { id: 4, type: "mc", question: "___, eat the sandwich!", audio_url: "/audio/week25_easy/grammar_ex4.mp3", options: ["Finally", "First", "Next", "Then"], answer: "Finally", explanation_en: "FINALLY is the last step." },
    { id: 5, type: "mc", question: "Which word goes at the START of a list of steps?", audio_url: "/audio/week25_easy/grammar_ex5.mp3", options: ["First", "Finally", "Then", "Next"], answer: "First", explanation_en: "FIRST always starts the sequence." },
    { id: 6, type: "fill", question: "___, I brush my teeth. (Next / Finally)", audio_url: "/audio/week25_easy/grammar_ex6.mp3", answer: "Next", hint_en: "Brushing is the second step after toothpaste." },
    { id: 7, type: "fill", question: "___, I put toothpaste on my brush. (First / Then)", audio_url: "/audio/week25_easy/grammar_ex7.mp3", answer: "First", hint_en: "Toothpaste is always the first step." },
    { id: 8, type: "fill", question: "___, I rinse my mouth. (Finally / Next)", audio_url: "/audio/week25_easy/grammar_ex8.mp3", answer: "Finally", hint_en: "Rinsing is always the last step." },
    { id: 9, type: "fill", question: "___, I spit out the toothpaste. (Then / First)", audio_url: "/audio/week25_easy/grammar_ex9.mp3", answer: "Then", hint_en: "Spitting is a middle step." },
    { id: 10, type: "fill", question: "___, open the jam jar. (First / Finally)", audio_url: "/audio/week25_easy/grammar_ex10.mp3", answer: "First", hint_en: "Opening the jar is the first thing to do." },
    { id: 11, type: "unscramble", question: "Unscramble: [ the / First / bread / take ]", audio_url: "/audio/week25_easy/grammar_ex11.mp3", answer: "First, take the bread.", hint_en: "Start with First,..." },
    { id: 12, type: "unscramble", question: "Unscramble: [ the / jam / Next / spread ]", audio_url: "/audio/week25_easy/grammar_ex12.mp3", answer: "Next, spread the jam.", hint_en: "Start with Next,..." },
    { id: 13, type: "unscramble", question: "Unscramble: [ it / together / Then / press ]", audio_url: "/audio/week25_easy/grammar_ex13.mp3", answer: "Then, press it together.", hint_en: "Start with Then,..." },
    { id: 14, type: "unscramble", question: "Unscramble: [ the / eat / Finally / sandwich ]", audio_url: "/audio/week25_easy/grammar_ex14.mp3", answer: "Finally, eat the sandwich.", hint_en: "Start with Finally,..." },
    { id: 15, type: "mc", question: "Which is the correct order?", audio_url: "/audio/week25_easy/grammar_ex15.mp3", options: ["First. Next. Then. Finally.", "Finally. Next. First. Then.", "Then. First. Finally. Next.", "Next. First. Then. Finally."], answer: "First. Next. Then. Finally.", explanation_en: "The correct sequence order is: First, Next, Then, Finally." },
    { id: 16, type: "mc", question: "Which sentence uses FINALLY correctly?", audio_url: "/audio/week25_easy/grammar_ex16.mp3", options: ["Finally, eat the sandwich.", "Finally is the first step.", "I finally eat it.", "Eat the sandwich finally."], answer: "Finally, eat the sandwich.", explanation_en: "FINALLY comes at the start of the sentence with a comma." },
    { id: 17, type: "fill", question: "___, I use my knife to cut the sandwich. (Then / First)", audio_url: "/audio/week25_easy/grammar_ex17.mp3", answer: "Then", hint_en: "Cutting is a middle step." },
    { id: 18, type: "fill", question: "___, I open the jam jar. (First / Finally)", audio_url: "/audio/week25_easy/grammar_ex18.mp3", answer: "First", hint_en: "Opening is the first step." },
    { id: 19, type: "mc", question: "How many sequence words did we learn?", audio_url: "/audio/week25_easy/grammar_ex19.mp3", options: ["4 — First Next Then Finally", "2 — First Finally", "3 — First Next Then", "5 — many more than four"], answer: "4 — First Next Then Finally", explanation_en: "We learned four sequence connectors: First, Next, Then, Finally." },
    { id: 20, type: "fill", question: "___, enjoy your sandwich! (Finally / Next)", audio_url: "/audio/week25_easy/grammar_ex20.mp3", answer: "Finally", hint_en: "Enjoying it is always the very last step." }
  ]
};
