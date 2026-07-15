export default {
  grammar_explanation: {
    title_en: "Sequence Connectors: First, Next, Then, Finally",
    title_vi: "Từ nối trình tự: First, Next, Then, Finally",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "FIRST — the very first action in a sequence",
        rule_vi: "FIRST — hành động đầu tiên trong trình tự",
        example_en: "First, I got two slices of bread.",
        example_vi: "Đầu tiên, tôi lấy hai lát bánh mì."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "NEXT — the action right after the first",
        rule_vi: "NEXT — hành động ngay sau hành động đầu tiên",
        example_en: "Next, I spread jam on one slice.",
        example_vi: "Tiếp theo, tôi phết mứt lên một lát."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "THEN — middle steps in the sequence",
        rule_vi: "THEN — các bước ở giữa trình tự",
        example_en: "Then, I pressed the two slices together.",
        example_vi: "Sau đó, tôi ép hai lát bánh lại với nhau."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "FINALLY — the last action, showing the sequence is complete",
        rule_vi: "FINALLY — hành động cuối cùng, kết thúc trình tự",
        example_en: "Finally, I cut the sandwich and put it on a plate.",
        example_vi: "Cuối cùng, tôi cắt bánh sandwich và đặt lên đĩa."
      }
    ]
  },

  title: "Sequence Connectors: First, Next, Then, Finally",
  image_url: "/images/week25/grammar_cover_w25.jpg",
  audio_url: "/audio/week25/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "FIRST — use at the beginning of a sequence to describe the very first action",
      examples: ["First, I got two slices of bread.", "First, she squeezed some toothpaste.", "First, he filled the glass with water."],
      audio_url: "/audio/week25/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "NEXT — use for the second action (what comes right after the first)",
      examples: ["Next, I spread jam on one slice.", "Next, she brushed her teeth.", "Next, he put the bread in the toaster."],
      audio_url: "/audio/week25/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "THEN — use for the middle steps (can be used for the third, fourth, or any middle action)",
      examples: ["Then, I pressed the two slices together.", "Then, she rinsed her mouth.", "Then, he waited for the toast to pop."],
      audio_url: "/audio/week25/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "FINALLY — use for the last action to show the sequence is complete",
      examples: ["Finally, I cut the sandwich and put it on a plate.", "Finally, she tidied up the bathroom.", "Finally, he spread butter on the toast and ate it."],
      audio_url: "/audio/week25/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Connector", "Position", "Example"],
    rows: [
      ["First,", "Step 1 — beginning", "First, I took two slices of bread."],
      ["Next,", "Step 2 — after first", "Next, I spread jam on one slice."],
      ["Then,", "Step 3+ — middle steps", "Then, I pressed the slices together."],
      ["Finally,", "Last step — end", "Finally, I cut the sandwich in half."]
    ]
  },
  exercises: [
    {
      id: 1,
      type: "mc",
      question: "___, I got two slices of bread from the bag.",
      audio_url: "/audio/week25/grammar_ex1.mp3",
      options: ["First", "Finally", "Then", "Next"],
      answer: "First",
      explanation_en: "FIRST is used for the very first action in a sequence."
    },
    {
      id: 2,
      type: "mc",
      question: "___, I spread jam on one slice.",
      audio_url: "/audio/week25/grammar_ex2.mp3",
      options: ["Next", "First", "Finally", "Last"],
      answer: "Next",
      explanation_en: "NEXT comes right after the first action."
    },
    {
      id: 3,
      type: "mc",
      question: "___, I pressed the two slices together.",
      audio_url: "/audio/week25/grammar_ex3.mp3",
      options: ["Then", "First", "Finally", "Next"],
      answer: "Then",
      explanation_en: "THEN is used for middle steps in a sequence."
    },
    {
      id: 4,
      type: "mc",
      question: "___, I ate the sandwich happily.",
      audio_url: "/audio/week25/grammar_ex4.mp3",
      options: ["Finally", "First", "Next", "Then"],
      answer: "Finally",
      explanation_en: "FINALLY is used for the last action in a sequence."
    },
    {
      id: 5,
      type: "mc",
      question: "These sentences are in the wrong order. Which one comes FIRST? A) Then, I rinsed my mouth. B) Finally, I tidied up. C) First, I squeezed toothpaste. D) Next, I brushed my teeth.",
      audio_url: "/audio/week25/grammar_ex5.mp3",
      options: ["C) First, I squeezed toothpaste.", "A) Then, I rinsed my mouth.", "B) Finally, I tidied up.", "D) Next, I brushed my teeth."],
      answer: "C) First, I squeezed toothpaste.",
      explanation_en: "The sentence with FIRST describes the very first action."
    },
    {
      id: 6,
      type: "mc",
      question: "Which sentence uses NEXT correctly?",
      audio_url: "/audio/week25/grammar_ex6.mp3",
      options: [
        "First, I took the bread. Next, I spread jam on it.",
        "Finally, I took the bread. Next, I spread jam on it.",
        "Next, I took the bread. First, I spread jam on it.",
        "Next, I finished. First, I started."
      ],
      answer: "First, I took the bread. Next, I spread jam on it.",
      explanation_en: "NEXT must come AFTER FIRST — it describes the second action."
    },
    {
      id: 7,
      type: "mc",
      question: "Which connector is MISSING? 'First, I poured the juice. ___, I put the bottle in the fridge. Finally, I drank the juice.'",
      audio_url: "/audio/week25/grammar_ex7.mp3",
      options: ["Then", "First", "Finally", "Last"],
      answer: "Then",
      explanation_en: "THEN fills the middle step between First and Finally."
    },
    {
      id: 8,
      type: "mc",
      question: "Leo described brushing his teeth in the WRONG order. Which is correct?",
      audio_url: "/audio/week25/grammar_ex8.mp3",
      options: [
        "First, squeeze. Next, brush. Then, rinse. Finally, tidy.",
        "First, rinse. Next, brush. Then, squeeze. Finally, tidy.",
        "First, tidy. Next, rinse. Then, brush. Finally, squeeze.",
        "First, brush. Next, squeeze. Then, tidy. Finally, rinse."
      ],
      answer: "First, squeeze. Next, brush. Then, rinse. Finally, tidy.",
      explanation_en: "You must squeeze toothpaste first, then brush, then rinse, and finally tidy up."
    },
    {
      id: 9,
      type: "mc",
      question: "Which word CANNOT replace FINALLY in this sentence? '___, she put the sandwich on the plate.'",
      audio_url: "/audio/week25/grammar_ex9.mp3",
      options: ["First", "Lastly", "In the end", "At last"],
      answer: "First",
      explanation_en: "FIRST means the beginning, not the end. Lastly, In the end, and At last all mean the same as Finally."
    },
    {
      id: 10,
      type: "mc",
      question: "Can THEN and NEXT be used for the same step?",
      audio_url: "/audio/week25/grammar_ex10.mp3",
      options: ["Yes, they both describe a middle or following step.", "No, they mean completely different things.", "Only THEN can follow FIRST.", "Only NEXT can follow FIRST."],
      answer: "Yes, they both describe a middle or following step.",
      explanation_en: "THEN and NEXT can both be used for actions that come after the first step."
    },
    {
      id: 11,
      type: "mc",
      question: "Put the correct connector: 'I made toast. First, I put the bread in the toaster. ___, I pressed the button. Then I waited. Finally, I took it out.'",
      audio_url: "/audio/week25/grammar_ex11.mp3",
      options: ["Next", "Finally", "First", "Last"],
      answer: "Next",
      explanation_en: "NEXT is used for the second action after FIRST."
    },
    {
      id: 12,
      type: "mc",
      question: "Which sentence uses FINALLY correctly?",
      audio_url: "/audio/week25/grammar_ex12.mp3",
      options: [
        "First, I cooked the rice. Next, I added vegetables. Finally, I served the meal.",
        "Finally, I cooked the rice. First, I served the meal.",
        "Finally, I started cooking. First, I finished.",
        "First, I served the meal. Finally, I cooked it."
      ],
      answer: "First, I cooked the rice. Next, I added vegetables. Finally, I served the meal.",
      explanation_en: "FINALLY comes at the end to show the last action."
    },
    {
      id: 13,
      type: "mc",
      question: "What does THEN signal to the reader?",
      audio_url: "/audio/week25/grammar_ex13.mp3",
      options: ["Another step happened after the previous one.", "The sequence is finished.", "The first step is starting.", "The second step right after the first."],
      answer: "Another step happened after the previous one.",
      explanation_en: "THEN means 'after that' — it shows another step in the middle of a sequence."
    },
    {
      id: 14,
      type: "mc",
      question: "Arrange in order: A) Finally, I ate it. B) First, I made the sandwich. C) Next, I spread the jam. D) Then, I pressed the slices.",
      audio_url: "/audio/week25/grammar_ex14.mp3",
      options: ["B, C, D, A", "A, B, C, D", "C, B, D, A", "D, C, A, B"],
      answer: "B, C, D, A",
      explanation_en: "The correct order is First (B) → Next (C) → Then (D) → Finally (A)."
    },
    {
      id: 15,
      type: "mc",
      question: "Which sentence is NOT correct?",
      audio_url: "/audio/week25/grammar_ex15.mp3",
      options: [
        "Finally, I woke up. First, I brushed my teeth.",
        "First, I woke up. Finally, I brushed my teeth.",
        "First, I woke up. Then, I washed my face. Finally, I had breakfast.",
        "First, I got dressed. Next, I put on my shoes. Finally, I went to school."
      ],
      answer: "Finally, I woke up. First, I brushed my teeth.",
      explanation_en: "You cannot start with FINALLY — waking up is the first action, not the last."
    },
    {
      id: 16,
      type: "mc",
      question: "Which connector is best for step 4 in a 5-step sequence?",
      audio_url: "/audio/week25/grammar_ex16.mp3",
      options: ["Then", "First", "Finally", "Before"],
      answer: "Then",
      explanation_en: "THEN is used for middle steps. FINALLY is for the very last step."
    },
    {
      id: 17,
      type: "mc",
      question: "Complete the sequence: 'I washed the cup. First, I ___ water in it. Next, I ___ it with soap. Then, I ___ it clean. Finally, I ___ it dry.'",
      audio_url: "/audio/week25/grammar_ex17.mp3",
      options: ["poured / scrubbed / rinsed / dried", "rinsed / dried / poured / scrubbed", "scrubbed / poured / dried / rinsed", "dried / scrubbed / poured / rinsed"],
      answer: "poured / scrubbed / rinsed / dried",
      explanation_en: "The correct steps for washing a cup: pour water, scrub with soap, rinse, then dry."
    },
    {
      id: 18,
      type: "mc",
      question: "Which word is a synonym (similar meaning) for FINALLY?",
      audio_url: "/audio/week25/grammar_ex18.mp3",
      options: ["Lastly", "Firstly", "Quickly", "Usually"],
      answer: "Lastly",
      explanation_en: "LASTLY and FINALLY both mean 'the last in a sequence.'"
    },
    {
      id: 19,
      type: "mc",
      question: "Mia said: 'I made juice. ___, I got a glass. ___, I opened the bottle. ___, I poured the juice. ___, I put the bottle away.' Order: First / Next / Then / Finally?",
      audio_url: "/audio/week25/grammar_ex19.mp3",
      options: ["First / Next / Then / Finally", "Next / First / Then / Finally", "Then / First / Next / Finally", "Finally / Then / Next / First"],
      answer: "First / Next / Then / Finally",
      explanation_en: "The correct order always goes: First → Next → Then → Finally."
    },
    {
      id: 20,
      type: "mc",
      question: "Which answer best completes this sequence? 'First, the seed was planted. Next, it absorbed water. Then, the root grew. ___, the leaves appeared and the plant made food from sunlight.'",
      audio_url: "/audio/week25/grammar_ex20.mp3",
      options: ["Finally", "First", "Next", "Before"],
      answer: "Finally",
      explanation_en: "FINALLY is used at the end of the sequence — the last thing that happened."
    }
  ]
};
