export default {
  grammar_explanation: {
    title_en: "Past Simple: Regular & Irregular Verbs",
    title_vi: "Quá Khứ Đơn: Động từ có quy tắc & bất quy tắc",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Past Simple talks about finished actions in the past",
        rule_vi: "Quá Khứ Đơn nói về hành động đã kết thúc trong quá khứ",
        example_en: "The hare ran very fast. The tortoise walked slowly.",
        example_vi: "Con thỏ đã chạy rất nhanh. Con rùa đã đi chậm rãi."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "REGULAR: add -ed → boast→boasted, cheer→cheered, walk→walked",
        rule_vi: "CÓ QUY TẮC: thêm -ed → boast→boasted, cheer→cheered",
        example_en: "The hare boasted. All the animals cheered.",
        example_vi: "Con thỏ đã khoe khoang. Tất cả các con vật đã cổ vũ."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "IRREGULAR: run→ran, sleep→slept, win→won (no -ed!)",
        rule_vi: "BẤT QUY TẮC: run→ran, sleep→slept, win→won (không thêm -ed!)",
        example_en: "The hare slept. The tortoise won the race.",
        example_vi: "Con thỏ đã ngủ. Con rùa đã thắng cuộc đua."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "NEGATIVE: did not (didn't) + base verb",
        rule_vi: "PHỦ ĐỊNH: did not (didn't) + động từ nguyên mẫu",
        example_en: "He didn't stop to rest. She didn't give up.",
        example_vi: "Anh ấy đã không dừng lại để nghỉ. Cô ấy đã không bỏ cuộc."
      }
    ]
  },

  title: "Grammar: Past Simple — Regular and Irregular Verbs",
  image_url: "/images/week28/grammar_cover_w28.jpg",
  audio_url: "/audio/week28/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "PAST SIMPLE — Use Past Simple to talk about finished actions in the past",
      examples: [
        "The hare ran very fast. (run → ran)",
        "The tortoise walked slowly. (walk → walked)",
        "The hare slept under a tree. (sleep → slept)",
        "The tortoise won the race. (win → won)",
        "All the animals cheered. (cheer → cheered)"
      ],
      audio_url: "/audio/week28/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "REGULAR PAST VERBS — Add -ed to most verbs to make past tense",
      examples: [
        "boast → boasted (The hare boasted about his speed.)",
        "cheer → cheered (The animals cheered loudly.)",
        "walk → walked (The tortoise walked steadily.)",
        "laugh → laughed (The hare laughed at the tortoise.)",
        "finish → finished (The tortoise finished the race first.)"
      ],
      audio_url: "/audio/week28/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "IRREGULAR PAST VERBS — These verbs change completely. Do NOT add -ed!",
      examples: [
        "run → ran (NOT runned!) — The hare ran at full speed.",
        "sleep → slept (NOT sleeped!) — The hare slept under a tree.",
        "win → won (NOT winned!) — The tortoise won the race.",
        "lose → lost (NOT losed!) — The hare lost the race.",
        "wake → woke (NOT waked!) — The hare woke up too late."
      ],
      audio_url: "/audio/week28/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "NEGATIVE PAST — Use did not (didn't) + base verb for negatives",
      examples: [
        "The tortoise did not stop. (NOT did not stopped)",
        "The hare did not finish first. (NOT did not finished)",
        "The tortoise did not give up.",
        "The hare did not expect to lose.",
        "The animals did not know who would win."
      ],
      audio_url: "/audio/week28/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Base Form", "Past Simple", "Example"],
    rows: [
      ["run", "ran ⚠️", "The hare ran very fast."],
      ["sleep", "slept ⚠️", "The hare slept under a tree."],
      ["win", "won ⚠️", "The tortoise won the race."],
      ["lose", "lost ⚠️", "The hare lost the race."],
      ["walk", "walked ✅", "The tortoise walked steadily."],
      ["cheer", "cheered ✅", "The animals cheered loudly."],
      ["boast", "boasted ✅", "The hare boasted every day."]
    ]
  },
  exercises: [
    {
      id: 1,
      type: "mc",
      question: "The hare ___ very fast at the start of the race.",
      audio_url: "/audio/week28/grammar_ex1.mp3",
      options: ["ran", "runned", "runs", "running"],
      answer: "ran",
      explanation_en: "'Run' is an irregular verb. The past tense of run is RAN — not 'runned'."
    },
    {
      id: 2,
      type: "mc",
      question: "The hare ___ under a big shady tree in the middle of the race.",
      audio_url: "/audio/week28/grammar_ex2.mp3",
      options: ["slept", "sleeped", "sleep", "sleeping"],
      answer: "slept",
      explanation_en: "'Sleep' is irregular. The past tense of sleep is SLEPT — not 'sleeped'."
    },
    {
      id: 3,
      type: "mc",
      question: "The tortoise ___ the race because he never gave up.",
      audio_url: "/audio/week28/grammar_ex3.mp3",
      options: ["won", "winned", "wins", "wined"],
      answer: "won",
      explanation_en: "'Win' is irregular. The past tense of win is WON — not 'winned'."
    },
    {
      id: 4,
      type: "mc",
      question: "The hare ___ the race because he was overconfident.",
      audio_url: "/audio/week28/grammar_ex4.mp3",
      options: ["lost", "losed", "loses", "lose"],
      answer: "lost",
      explanation_en: "'Lose' is irregular. The past tense of lose is LOST — not 'losed'."
    },
    {
      id: 5,
      type: "mc",
      question: "The tortoise ___ slowly but steadily throughout the race.",
      audio_url: "/audio/week28/grammar_ex5.mp3",
      options: ["walked", "walk", "walks", "walking"],
      answer: "walked",
      explanation_en: "'Walk' is a regular verb. Add -ed to make the past: walked."
    },
    {
      id: 6,
      type: "mc",
      question: "All the forest animals ___ loudly when the tortoise won.",
      audio_url: "/audio/week28/grammar_ex6.mp3",
      options: ["cheered", "cheer", "cheers", "cheering"],
      answer: "cheered",
      explanation_en: "'Cheer' is regular. Add -ed: cheered."
    },
    {
      id: 7,
      type: "mc",
      question: "The hare always ___ about being the fastest animal in the forest.",
      audio_url: "/audio/week28/grammar_ex7.mp3",
      options: ["boasted", "boast", "boasts", "boasting"],
      answer: "boasted",
      explanation_en: "'Boast' is regular. Add -ed: boasted."
    },
    {
      id: 8,
      type: "mc",
      question: "The hare ___ up when he heard the animals cheering.",
      audio_url: "/audio/week28/grammar_ex8.mp3",
      options: ["woke", "waked", "wakes", "wake"],
      answer: "woke",
      explanation_en: "'Wake' is irregular. The past tense of wake is WOKE — not 'waked'."
    },
    {
      id: 9,
      type: "mc",
      question: "The tortoise ___ not stop during the entire race.",
      audio_url: "/audio/week28/grammar_ex9.mp3",
      options: ["did", "does", "do", "was"],
      answer: "did",
      explanation_en: "Negative past simple: did not + base verb. 'The tortoise did not stop.'"
    },
    {
      id: 10,
      type: "mc",
      question: "The hare ___ not expect the tortoise to overtake him.",
      audio_url: "/audio/week28/grammar_ex10.mp3",
      options: ["did", "does", "do", "was"],
      answer: "did",
      explanation_en: "Negative past: did not + base verb (expect). The base form stays the same."
    },
    {
      id: 11,
      type: "mc",
      question: "The tortoise ___ determined to finish the race no matter what.",
      audio_url: "/audio/week28/grammar_ex11.mp3",
      options: ["was", "is", "were", "be"],
      answer: "was",
      explanation_en: "Be verb in past: I/he/she/it → was. The tortoise (it) was determined."
    },
    {
      id: 12,
      type: "mc",
      question: "The animals ___ very surprised when the tortoise crossed the finish line first.",
      audio_url: "/audio/week28/grammar_ex12.mp3",
      options: ["were", "was", "are", "be"],
      answer: "were",
      explanation_en: "Be verb in past: we/you/they → were. The animals (they) were very surprised."
    },
    {
      id: 13,
      type: "mc",
      question: "The tortoise ___ the sleeping hare quietly during the race.",
      audio_url: "/audio/week28/grammar_ex13.mp3",
      options: ["overtook", "overtaked", "overtakes", "overtaking"],
      answer: "overtook",
      explanation_en: "'Overtake' is irregular. Past tense: overtook."
    },
    {
      id: 14,
      type: "mc",
      question: "The hare ___ tired after he woke up and tried to run to the finish.",
      audio_url: "/audio/week28/grammar_ex14.mp3",
      options: ["felt", "feeled", "feels", "feeling"],
      answer: "felt",
      explanation_en: "'Feel' is irregular. Past tense: felt — not 'feeled'."
    },
    {
      id: 15,
      type: "mc",
      question: "The tortoise ___ the race with a big smile on his face.",
      audio_url: "/audio/week28/grammar_ex15.mp3",
      options: ["finished", "finish", "finishes", "finishing"],
      answer: "finished",
      explanation_en: "'Finish' is regular. Add -ed: finished. The tortoise finished the race."
    },
    {
      id: 16,
      type: "mc",
      question: "The fox ___ the start of the race by shouting BANG!",
      audio_url: "/audio/week28/grammar_ex16.mp3",
      options: ["started", "start", "starts", "starting"],
      answer: "started",
      explanation_en: "'Start' is regular. Add -ed: started."
    },
    {
      id: 17,
      type: "mc",
      question: "Which sentence uses the CORRECT irregular past tense?",
      audio_url: "/audio/week28/grammar_ex17.mp3",
      options: ["The hare ran and won.", "The hare runned and winned.", "The hare run and win.", "The hare was run and win."],
      answer: "The hare ran and won.",
      explanation_en: "Ran (not runned) and won (not winned) are the correct irregular past forms."
    },
    {
      id: 18,
      type: "mc",
      question: "Which sentence is in CORRECT negative past simple?",
      audio_url: "/audio/week28/grammar_ex18.mp3",
      options: ["The tortoise did not give up.", "The tortoise did not gave up.", "The tortoise does not give up.", "The tortoise not gave up."],
      answer: "The tortoise did not give up.",
      explanation_en: "Negative past: did not + BASE VERB (give). Never say 'did not gave'."
    },
    {
      id: 19,
      type: "mc",
      question: "The animals ___ the bus to the famous race — they did not want to miss it!",
      audio_url: "/audio/week28/grammar_ex19.mp3",
      options: ["took", "taked", "take", "taking"],
      answer: "took",
      explanation_en: "'Take' is irregular. Past tense: TOOK. 'Took the bus' = rode the bus. 🚌 Cambridge transport vocabulary: bus, train, taxi, car!"
    },
    {
      id: 20,
      type: "mc",
      question: "After losing the race, the embarrassed hare ___ a taxi home.",
      audio_url: "/audio/week28/grammar_ex20.mp3",
      options: ["took", "taked", "take", "was take"],
      answer: "took",
      explanation_en: "'Took a taxi' = irregular past of TAKE. You can also 'take a bus', 'take a train', or 'ride a bicycle' — all common transport expressions! 🚕"
    }
  ]
};