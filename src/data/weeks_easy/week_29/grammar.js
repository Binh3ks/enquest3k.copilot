export default {
  grammar_explanation: {
    title_en: "Past Simple: go→went, run→ran, come→came, fly→flew",
    title_vi: "Quá Khứ Đơn: go→went, run→ran, come→came, fly→flew",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "PAST SIMPLE — use for things that happened in the past",
        rule_vi: "QUÁ KHỨ ĐƠN — dùng cho những gì đã xảy ra",
        example_en: "We went. Dad ran. Mum came. We flew.",
        example_vi: "Chúng tôi đã đi. Bố đã chạy. Mẹ đã đến. Chúng tôi đã bay."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "go → went (NOT goed!)",
        rule_vi: "go → went (KHÔNG phải goed!)",
        example_en: "The carpet went to a farm. Lily went to the ocean.",
        example_vi: "T\u1ea5m th\u1ea3m \u0111\u00e3 \u0111\u1ebfn m\u1ed9t n\u00f4ng tr\u1ea1i. Lily \u0111\u00e3 \u0111\u1ebfn \u0111\u1ea1i d\u01b0\u01a1ng."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "run → ran (NOT runned!)",
        rule_vi: "run → ran (KHÔNG phải runned!)",
        example_en: "The farmer ran out of his barn and waved.",
        example_vi: "Ng\u01b0\u1eddi n\u00f4ng d\u00e2n \u0111\u00e3 ch\u1ea1y ra kh\u1ecfi c\u00e1i c\u01b0\u1eddng v\u00e0 v\u1eaby tay."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "come → came | fly → flew (NOT comed or flyed!)",
        rule_vi: "come → came | fly → flew (KHÔNG phải comed hoặc flyed!)",
        example_en: "Dolphins came and jumped! A pilot flew past in a red plane.",
        example_vi: "Mẹ đã đến với hành lý. Chúng tôi đã bay trên máy bay."
      }
    ]
  },

  title: "Grammar: Past Simple — go, run, come, fly",
  image_url: "/images/week29/grammar_cover_w29.jpg",
  audio_url: "/audio/week29_easy/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "PAST SIMPLE — use it for things that happened in the past",
      examples: [
        "The carpet went to a farm yesterday.",
        "Lily ran to the magic carpet.",
        "A dolphin came and jumped up high.",
        "The carpet flew over the ocean."
      ],
      audio_url: "/audio/week29_easy/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "go → went (NOT goed!)",
      examples: [
        "Lily went on a magic carpet trip.",
        "We went to the farm together.",
        "The carpet went to the ocean."
      ],
      audio_url: "/audio/week29_easy/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "run → ran (NOT runned!)",
      examples: [
        "The farmer ran out of his barn.",
        "Lily ran to see the dolphins.",
        "We ran back to the carpet."
      ],
      audio_url: "/audio/week29_easy/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "come → came | fly → flew (NOT comed or flyed!)",
      examples: [
        "A dolphin came and swam beside us.",
        "The carpet flew over the ocean.",
        "A pilot flew past and waved."
      ],
      audio_url: "/audio/week29_easy/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Base Form", "Past Simple", "Example"],
    rows: [
      ["go", "went ⚠️", "Lily went on the magic carpet."],
      ["run", "ran ⚠️", "The farmer ran out of his barn."],
      ["come", "came ⚠️", "A dolphin came and jumped up."],
      ["fly", "flew ⚠️", "The carpet flew over the ocean."]
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "Lily ___ on a magic carpet trip with her friends.", audio_url: "/audio/week29_easy/grammar_ex1.mp3", options: ["went", "goed", "go", "going"], answer: "went", explanation_en: "go → went. We say 'went', not 'goed'!" },
    { id: 2, type: "mc", question: "The magic carpet ___ over the ocean and fields.", audio_url: "/audio/week29_easy/grammar_ex2.mp3", options: ["went", "goed", "go", "goes"], answer: "went", explanation_en: "go → went. Use 'went' for past!" },
    { id: 3, type: "mc", question: "My family ___ on a big adventure last Saturday.", audio_url: "/audio/week29_easy/grammar_ex3.mp3", options: ["went", "goed", "go", "goes"], answer: "went", explanation_en: "go → went. Always use 'went' in the past!" },
    { id: 4, type: "mc", question: "We ___ to see Grandma last holiday.", audio_url: "/audio/week29_easy/grammar_ex4.mp3", options: ["went", "goed", "go", "gone"], answer: "went", explanation_en: "go → went. Remember: NOT 'goed'!" },
    { id: 5, type: "mc", question: "The farmer ___ out of his barn to welcome Lily.", audio_url: "/audio/week29_easy/grammar_ex5.mp3", options: ["ran", "runned", "run", "runs"], answer: "ran", explanation_en: "run → ran. We say 'ran', not 'runned'!" },
    { id: 6, type: "mc", question: "Lily ___ across the field to see the dolphins!", audio_url: "/audio/week29_easy/grammar_ex6.mp3", options: ["ran", "runned", "run", "running"], answer: "ran", explanation_en: "run → ran. Use 'ran' for past!" },
    { id: 7, type: "mc", question: "Grandma ___ to hug us when we arrived.", audio_url: "/audio/week29_easy/grammar_ex7.mp3", options: ["ran", "runned", "run", "ranned"], answer: "ran", explanation_en: "run → ran. 'Ran' is always correct!" },
    { id: 8, type: "mc", question: "The dog ___ across the field to play.", audio_url: "/audio/week29_easy/grammar_ex8.mp3", options: ["ran", "runned", "run", "runs"], answer: "ran", explanation_en: "run → ran. NOT 'runned'!" },
    { id: 9, type: "mc", question: "Mum ___ with our bags to join us.", audio_url: "/audio/week29_easy/grammar_ex9.mp3", options: ["came", "comed", "come", "comes"], answer: "came", explanation_en: "come → came. We say 'came', not 'comed'!" },
    { id: 10, type: "mc", question: "My friend ___ to my house yesterday.", audio_url: "/audio/week29_easy/grammar_ex10.mp3", options: ["came", "comed", "come", "coming"], answer: "came", explanation_en: "come → came. Use 'came' for past!" },
    { id: 11, type: "mc", question: "The magic carpet ___ over the big blue ocean!", audio_url: "/audio/week29_easy/grammar_ex11.mp3", options: ["flew", "flyed", "fly", "flies"], answer: "flew", explanation_en: "fly → flew. We say 'flew', not 'flyed'!" },
    { id: 12, type: "mc", question: "A pilot ___ past the carpet in a small red plane!", audio_url: "/audio/week29_easy/grammar_ex12.mp3", options: ["flew", "flyed", "fly", "flied"], answer: "flew", explanation_en: "fly → flew. Use 'flew' for past!" },
    { id: 13, type: "mc", question: "The birds ___ south for the winter.", audio_url: "/audio/week29_easy/grammar_ex13.mp3", options: ["flew", "flyed", "fly", "flies"], answer: "flew", explanation_en: "fly → flew. 'Flew' is always correct!" },
    { id: 14, type: "mc", question: "Pick the CORRECT sentence.", audio_url: "/audio/week29_easy/grammar_ex14.mp3", options: ["Lily went on the carpet.", "Lily goed on the carpet.", "Lily go on the carpet yesterday.", "Lily goes on the carpet."], answer: "Lily went on the carpet.", explanation_en: "go → went. 'Went' is correct!" },
    { id: 15, type: "mc", question: "Pick the CORRECT sentence.", audio_url: "/audio/week29_easy/grammar_ex15.mp3", options: ["The farmer ran out of his barn.", "The farmer runned out.", "The farmer run out.", "The farmer ranned out."], answer: "The farmer ran out of his barn.", explanation_en: "run → ran. 'Ran' is correct!" },
    { id: 16, type: "mc", question: "Pick the CORRECT sentence.", audio_url: "/audio/week29_easy/grammar_ex16.mp3", options: ["The carpet flew over the farm.", "The carpet flyed over the farm.", "The carpet fly over the farm.", "The carpet flied over the farm."], answer: "The carpet flew over the farm.", explanation_en: "fly → flew. 'Flew' is correct!" },
    { id: 17, type: "mc", question: "What is the past of 'go'?", audio_url: "/audio/week29_easy/grammar_ex17.mp3", options: ["went", "goed", "go", "gone"], answer: "went", explanation_en: "go → went. Remember: NOT 'goed'!" },
    { id: 18, type: "mc", question: "What is the past of 'run'?", audio_url: "/audio/week29_easy/grammar_ex18.mp3", options: ["ran", "runned", "run", "runs"], answer: "ran", explanation_en: "run → ran. Remember: NOT 'runned'!" },
    { id: 19, type: "mc", question: "What is the past of 'fly'?", audio_url: "/audio/week29_easy/grammar_ex19.mp3", options: ["flew", "flyed", "fly", "flown"], answer: "flew", explanation_en: "fly → flew. Remember: NOT 'flyed'!" },
    { id: 20, type: "mc", question: "Finish the story: 'The carpet ___ to the farm. The farmer ___ out. Then the carpet ___ home!'", audio_url: "/audio/week29_easy/grammar_ex20.mp3", options: ["went / ran / flew", "goed / runned / flyed", "go / run / fly", "went / ran / flyed"], answer: "went / ran / flew", explanation_en: "go→went, run→ran, fly→flew. All three are irregular!" }
  ]
};