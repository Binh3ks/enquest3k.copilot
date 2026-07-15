export default {
  grammar_explanation: {
    title_en: "Past Simple: Irregular Verbs 1 — go, run, come, fly",
    title_vi: "Quá Khứ Đơn: Động từ bất quy tắc 1 — go, run, come, fly",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Irregular verbs do NOT use -ed in Past Simple",
        rule_vi: "Động từ bất quy tắc KHÔNG dùng -ed ở Quá Khứ Đơn",
        example_en: "go → went | run → ran | come → came | fly → flew",
        example_vi: "go → went | run → ran | come → came | fly → flew"
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "go → went (movement to a place)",
        rule_vi: "go → went (di chuyển đến một nơi)",
        example_en: "Lily went to a farm. She went to a school. She went to the ocean.",
        example_vi: "Lily đã đến một nông trại. Cô đã đến một trường học. Cô đã đến đại dương."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "run → ran | come → came | fly → flew",
        rule_vi: "run → ran | come → came | fly → flew",
        example_en: "The farmer ran out and waved. Dolphins came from the sea. The pilot flew past.",
        example_vi: "Người nông dân đã chạy ra và vẫy tay. Cá heo đã đến từ biển. Phi công đã bay qua."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "NEGATIVE: didn't + BASE VERB (not the past form!)",
        rule_vi: "PHỦ ĐỊNH: didn't + ĐỘNG TỪ GỐC (không dùng dạng quá khứ!)",
        example_en: "He didn't go. (NOT: didn't went) She didn't fly. (NOT: didn't flew)",
        example_vi: "Anh ấy đã không đi. (KHÔNG: didn't went) Cô ấy đã không bay."
      }
    ]
  },

  title: "Grammar: Past Simple — Irregular Verbs 1",
  image_url: "/images/week29/grammar_cover_w29.jpg",
  audio_url: "/audio/week29/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "IRREGULAR VERBS — These verbs do NOT follow the normal -ed rule in Past Simple",
      examples: [
        "go → went (NOT goed!) — Lily went to a farm on her magic carpet.",
        "run → ran (NOT runned!) — The farmer ran out of his barn and waved.",
        "come → came (NOT comed!) — Dolphins came jumping out of the ocean.",
        "fly → flew (NOT flyed!) — A pilot flew past in a small red plane."
      ],
      audio_url: "/audio/week29/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "USING WENT — 'go' becomes 'went' in the Past Simple. Use it for movement to a place.",
      examples: [
        "Lily went to a farm on her magic carpet.",
        "She went to a school and met a kind teacher.",
        "The carpet went over the ocean and she saw dolphins.",
        "Lily went home happy and tired after her adventure.",
        "She went to bed and whispered: 'That was the best trip ever!'"
      ],
      audio_url: "/audio/week29/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "USING RAN — 'run' becomes 'ran' in the Past Simple. Use it for fast movement.",
      examples: [
        "A friendly farmer ran out of his barn and waved at Lily.",
        "The doctor ran out of the hospital when he saw the carpet.",
        "Lily ran to the carpet when it started to land.",
        "The nurse ran beside the doctor and waved happily.",
        "A driver ran to help Lily carry the carpet inside."
      ],
      audio_url: "/audio/week29/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "USING CAME & FLEW — 'come' becomes 'came', 'fly' becomes 'flew'.",
      examples: [
        "Many dolphins came jumping out of the blue water.",
        "A pilot came close in a small red plane and shouted: 'Nice carpet!'",
        "The magic carpet flew high above the dark rooftops.",
        "It flew over green fields and came down near a farm.",
        "The carpet came home safely at the end of the adventure."
      ],
      audio_url: "/audio/week29/grammar_rule4.mp3"
    },
    {
      id: 5,
      rule_en: "NEGATIVE PAST — Use did not (didn't) + BASE VERB (not the past form!)",
      examples: [
        "Lily did not go by bus — she went by magic carpet. (NOT did not went)",
        "She did not run — the carpet flew her there automatically.",
        "The doctor did not come with her, but he waved from below.",
        "The carpet did not fly too fast so Lily stayed safe.",
        "She did not go on the trip without first saying: 'adventure!'"
      ],
      audio_url: "/audio/week29/grammar_rule5.mp3"
    }
  ],
  structure_table: {
    headers: ["Base Form", "Past Simple", "Example"],
    rows: [
      ["go", "went ⚠️", "Lily went to a farm on the carpet."],
      ["run", "ran ⚠️", "The farmer ran out of his barn."],
      ["come", "came ⚠️", "Dolphins came jumping from the ocean."],
      ["fly", "flew ⚠️", "The pilot flew past in a red plane."]
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "On a magic night, Lily ___ to a farm on her magic carpet.", audio_url: "/audio/week29/grammar_ex1.mp3", options: ["went", "goed", "go", "goes"], answer: "went", explanation_en: "'Go' is irregular — the past simple of GO is WENT, not 'goed'." },
    { id: 2, type: "mc", question: "The magic carpet ___ over green fields and came down near a school.", audio_url: "/audio/week29/grammar_ex2.mp3", options: ["went", "go", "gone", "goed"], answer: "went", explanation_en: "WENT is the correct past simple of GO. Never 'goed'." },
    { id: 3, type: "mc", question: "Lily ___ to the ocean and saw beautiful dolphins there.", audio_url: "/audio/week29/grammar_ex3.mp3", options: ["went", "go", "going", "goed"], answer: "went", explanation_en: "Past movement = WENT. Subject + went + to + place." },
    { id: 4, type: "mc", question: "After the adventure, Lily ___ to bed happy and tired.", audio_url: "/audio/week29/grammar_ex4.mp3", options: ["went", "go", "goes", "goed"], answer: "went", explanation_en: "WENT is always the past form of GO." },
    { id: 5, type: "mc", question: "A friendly farmer ___ out of his barn and waved at Lily.", audio_url: "/audio/week29/grammar_ex5.mp3", options: ["ran", "runned", "run", "runs"], answer: "ran", explanation_en: "'Run' is irregular — RAN is the past simple of RUN, not 'runned'." },
    { id: 6, type: "mc", question: "The doctor ___ out of the hospital when he saw the magic carpet.", audio_url: "/audio/week29/grammar_ex6.mp3", options: ["ran", "runned", "run", "running"], answer: "ran", explanation_en: "Past of RUN is RAN. Never write 'runned'." },
    { id: 7, type: "mc", question: "The nurse ___ beside the doctor and waved happily at Lily.", audio_url: "/audio/week29/grammar_ex7.mp3", options: ["ran", "runned", "run", "ranned"], answer: "ran", explanation_en: "RAN is the only correct past form of RUN." },
    { id: 8, type: "mc", question: "A driver ___ to help Lily carry the carpet back inside.", audio_url: "/audio/week29/grammar_ex8.mp3", options: ["ran", "runned", "run", "raned"], answer: "ran", explanation_en: "RAN — past of run is ran, not runned." },
    { id: 9, type: "mc", question: "Many dolphins ___ jumping out of the blue water!", audio_url: "/audio/week29/grammar_ex9.mp3", options: ["came", "comed", "come", "comes"], answer: "came", explanation_en: "'Come' is irregular — CAME is the past simple, not 'comed'." },
    { id: 10, type: "mc", question: "A pilot ___ close in a small red plane and shouted: 'Nice carpet!'", audio_url: "/audio/week29/grammar_ex10.mp3", options: ["came", "comed", "come", "coming"], answer: "came", explanation_en: "CAME is the correct past form of COME." },
    { id: 11, type: "mc", question: "The magic carpet ___ home safely at the end of the adventure.", audio_url: "/audio/week29/grammar_ex11.mp3", options: ["came", "comed", "come", "comes"], answer: "came", explanation_en: "CAME — always CAME (past of come)." },
    { id: 12, type: "mc", question: "The magic carpet ___ high above the dark rooftops.", audio_url: "/audio/week29/grammar_ex12.mp3", options: ["flew", "flyed", "fly", "flies"], answer: "flew", explanation_en: "'Fly' is irregular — FLEW is the past simple, not 'flyed'." },
    { id: 13, type: "mc", question: "The pilot ___ his small red plane past the magic carpet.", audio_url: "/audio/week29/grammar_ex13.mp3", options: ["flew", "flyed", "fly", "flown"], answer: "flew", explanation_en: "FLEW is the past simple of FLY. Never 'flyed'." },
    { id: 14, type: "mc", question: "The carpet ___ over a school, a farm, an ocean, and a hospital.", audio_url: "/audio/week29/grammar_ex14.mp3", options: ["flew", "flyed", "fly", "flied"], answer: "flew", explanation_en: "FLEW — not 'flyed' or 'flied'. Fly → Flew always." },
    { id: 15, type: "mc", question: "Which sentence is CORRECT?", audio_url: "/audio/week29/grammar_ex15.mp3", options: ["The carpet flew over the farm.", "The carpet flyed over the farm.", "The carpet fly over the farm.", "The carpet flied over the farm."], answer: "The carpet flew over the farm.", explanation_en: "FLEW is the correct past simple of FLY." },
    { id: 16, type: "mc", question: "Which sentence is CORRECT?", audio_url: "/audio/week29/grammar_ex16.mp3", options: ["The farmer ran out of his barn.", "The farmer runned out of his barn.", "The farmer ranned out of his barn.", "The farmer runs out yesterday."], answer: "The farmer ran out of his barn.", explanation_en: "RAN is the only correct past form of RUN." },
    { id: 17, type: "mc", question: "After 'did not', you must use the ___ form of the verb.", audio_url: "/audio/week29/grammar_ex17.mp3", options: ["base verb (go)", "past simple (went)", "-ing form (going)", "-ed form"], answer: "base verb (go)", explanation_en: "NEGATIVE PAST: did not + BASE VERB. 'We did not GO' — not 'did not went'." },
    { id: 18, type: "mc", question: "🌟 ADVERB: 'They ran ___ to catch the magic carpet before it flew away.' Which word tells us HOW they ran?", audio_url: "/audio/week29/grammar_ex18.mp3", options: ["quickly", "quick", "quicker", "quickest"], answer: "quickly", explanation_en: "ADVERBS of manner tell us HOW an action happened. Run + quickly. Notice the -ly ending! ⭐ (Full adverb lesson: Week 35)" },
    { id: 19, type: "mc", question: "🌟 ADVERB: 'The carpet flew ___ over the mountains so nobody fell off.' Which adverb fits?", audio_url: "/audio/week29/grammar_ex19.mp3", options: ["carefully", "careful", "more careful", "care"], answer: "carefully", explanation_en: "Careful → carefully. Adverbs end in -ly and describe HOW: 'flew carefully' ✅. Write in notebook: quickly / slowly / carefully / loudly / quietly ⭐" },
    { id: 20, type: "mc", question: "🌟 ADVERB: 'She swam ___ with the dolphins in the warm sea.' Which adverb fits?", audio_url: "/audio/week29/grammar_ex20.mp3", options: ["happily", "happy", "happiness", "happyly"], answer: "happily", explanation_en: "Happy → happily (y → i + ly). Adverbs describe HOW: 'swam happily' ✅. This week's 5 adverbs to remember: quickly, slowly, carefully, loudly, quietly!" }
  ]
};