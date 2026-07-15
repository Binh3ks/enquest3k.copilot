export default {
  grammar_explanation: {
    title_en: "Past Simple: Regular and Irregular Verbs",
    title_vi: "Quá Khứ Đơn: Động từ có quy tắc và bất quy tắc",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "PAST SIMPLE — use it for things that happened in the past",
        rule_vi: "QUÁ KHỨ ĐƠN — dùng cho những gì đã xảy ra trong quá khứ",
        example_en: "The hare ran fast. The tortoise walked slowly.",
        example_vi: "Con thỏ đã chạy nhanh. Con rùa đã đi chậm rãi."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "REGULAR — add -ED: cheer→cheered, laugh→laughed",
        rule_vi: "CÓ QUY TẮC — thêm -ED: cheer→cheered, laugh→laughed",
        example_en: "The animals cheered. The hare laughed.",
        example_vi: "Các con vật đã cổ vũ. Con thỏ đã cười."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "IRREGULAR — spelling changes: run→ran, sleep→slept, win→won",
        rule_vi: "BẤT QUY TẮC — thay đổi chính tả: run→ran, sleep→slept, win→won",
        example_en: "The hare slept. The tortoise won the race.",
        example_vi: "Con thỏ đã ngủ. Con rùa đã thắng cuộc đua."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "NEGATIVE — DID NOT (didn't) + base verb",
        rule_vi: "PHỦ ĐỊNH — DID NOT (didn't) + động từ gốc",
        example_en: "He didn't stop. She didn't give up.",
        example_vi: "Anh ấy đã không dừng. Cô ấy đã không bỏ cuộc."
      }
    ]
  },

  title: "Grammar: Past Simple — Regular and Irregular Verbs",
  image_url: "/images/week28/grammar_cover_w28.jpg",
  audio_url: "/audio/week28_easy/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "PAST SIMPLE — use it for things that happened in the past",
      examples: ["The tortoise walked slowly.", "The hare ran fast.", "They raced through the forest.", "The tortoise won."],
      audio_url: "/audio/week28_easy/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "REGULAR VERBS — add -ED to make past simple",
      examples: ["walk → walked", "stop → stopped", "cheer → cheered", "start → started"],
      audio_url: "/audio/week28_easy/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "IRREGULAR VERBS — change their spelling in past simple",
      examples: ["run → ran", "sleep → slept", "win → won", "lose → lost"],
      audio_url: "/audio/week28_easy/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "NEGATIVE — use DID NOT + base verb",
      examples: ["The hare did not stop.", "The tortoise did not give up.", "They did not walk together.", "He did not win."],
      audio_url: "/audio/week28_easy/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Base Form", "Past Simple", "Example"],
    rows: [
      ["walk", "walked", "The tortoise walked slowly."],
      ["stop", "stopped", "The hare stopped to sleep."],
      ["cheer", "cheered", "The animals cheered loudly."],
      ["run", "ran", "The hare ran very fast."],
      ["sleep", "slept", "The hare slept under a tree."],
      ["win", "won", "The tortoise won the race."],
      ["lose", "lost", "The hare lost the race."]
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "The hare ___ very fast at the start of the race.", audio_url: "/audio/week28_easy/grammar_ex1.mp3", options: ["ran", "run", "runned", "running"], answer: "ran", explanation_en: "RUN is irregular: run → ran." },
    { id: 2, type: "mc", question: "The hare ___ under a big tree.", audio_url: "/audio/week28_easy/grammar_ex2.mp3", options: ["slept", "sleep", "sleeped", "sleeping"], answer: "slept", explanation_en: "SLEEP is irregular: sleep → slept." },
    { id: 3, type: "mc", question: "The tortoise ___ the race.", audio_url: "/audio/week28_easy/grammar_ex3.mp3", options: ["won", "win", "winned", "winning"], answer: "won", explanation_en: "WIN is irregular: win → won." },
    { id: 4, type: "mc", question: "The hare ___ the race because he slept.", audio_url: "/audio/week28_easy/grammar_ex4.mp3", options: ["lost", "lose", "losted", "losing"], answer: "lost", explanation_en: "LOSE is irregular: lose → lost." },
    { id: 5, type: "mc", question: "All the animals ___ for the tortoise.", audio_url: "/audio/week28_easy/grammar_ex5.mp3", options: ["cheered", "cheer", "cheers", "cheering"], answer: "cheered", explanation_en: "CHEER is regular: cheer + ed = cheered." },
    { id: 6, type: "fill", question: "The tortoise ___ slowly the whole race. (walk / walked)", audio_url: "/audio/week28_easy/grammar_ex6.mp3", answer: "walked", hint_en: "Regular verb: walk + ed = walked." },
    { id: 7, type: "fill", question: "The race ___ in the morning. (start / started)", audio_url: "/audio/week28_easy/grammar_ex7.mp3", answer: "started", hint_en: "Regular verb: start + ed = started." },
    { id: 8, type: "fill", question: "The hare did not ___ slowly. (walk / walked)", audio_url: "/audio/week28_easy/grammar_ex8.mp3", answer: "walk", hint_en: "After DID NOT, use the base verb." },
    { id: 9, type: "fill", question: "The tortoise did not ___. (stop / stopped)", audio_url: "/audio/week28_easy/grammar_ex9.mp3", answer: "stop", hint_en: "After DID NOT, use the base verb." },
    { id: 10, type: "fill", question: "The hare ___ beside the tree. (sleep / slept)", audio_url: "/audio/week28_easy/grammar_ex10.mp3", answer: "slept", hint_en: "Irregular: sleep → slept." },
    { id: 11, type: "unscramble", question: "Unscramble: [ ran / fast / hare / the / very ]", audio_url: "/audio/week28_easy/grammar_ex11.mp3", answer: "The hare ran very fast.", hint_en: "Start with The hare..." },
    { id: 12, type: "unscramble", question: "Unscramble: [ the / won / race / tortoise / the ]", audio_url: "/audio/week28_easy/grammar_ex12.mp3", answer: "The tortoise won the race.", hint_en: "Start with The tortoise..." },
    { id: 13, type: "unscramble", question: "Unscramble: [ the / slept / hare / tree / under / a ]", audio_url: "/audio/week28_easy/grammar_ex13.mp3", answer: "The hare slept under a tree.", hint_en: "Start with The hare..." },
    { id: 14, type: "unscramble", question: "Unscramble: [ not / give / did / tortoise / the / up ]", audio_url: "/audio/week28_easy/grammar_ex14.mp3", answer: "The tortoise did not give up.", hint_en: "Start with The tortoise did not..." },
    { id: 15, type: "mc", question: "Which sentence is correct?", audio_url: "/audio/week28_easy/grammar_ex15.mp3", options: ["The hare ran fast.", "The hare runned fast.", "The hare ranned fast.", "The hare runs fast."], answer: "The hare ran fast.", explanation_en: "RUN is irregular: run → ran (Past Simple)." },
    { id: 16, type: "mc", question: "How do you make WALK past simple?", audio_url: "/audio/week28_easy/grammar_ex16.mp3", options: ["walked", "walk", "walken", "woke"], answer: "walked", explanation_en: "WALK is regular: walk + ed = walked." },
    { id: 17, type: "fill", question: "The hare ___ the race because he was too confident. (lose / lost)", audio_url: "/audio/week28_easy/grammar_ex17.mp3", answer: "lost", hint_en: "Irregular: lose → lost." },
    { id: 18, type: "fill", question: "The animals ___ and jumped when the tortoise won. (cheer / cheered)", audio_url: "/audio/week28_easy/grammar_ex18.mp3", answer: "cheered", hint_en: "Regular: cheer + ed = cheered." },
    { id: 19, type: "mc", question: "The animals ___ the bus to watch the race.", audio_url: "/audio/week28_easy/grammar_ex19.mp3", options: ["took", "taked", "take", "taking"], answer: "took", explanation_en: "TAKE is irregular: take → took. They took the bus = they went by bus." },
    { id: 20, type: "fill", question: "After the race, the hare ___ a taxi home. (take / took)", audio_url: "/audio/week28_easy/grammar_ex20.mp3", answer: "took", hint_en: "Irregular: take → took." }
  ]
};