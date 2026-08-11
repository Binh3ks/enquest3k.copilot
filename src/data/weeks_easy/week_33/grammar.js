// Cambridge A2 Flyers grammar.js — Week 33
export default {
  title: "Past Continuous with WHILE & Clauses of Reason",
  focus: "While + WAS/WERE + V-ing, Subject + V-ed",
  grammar_explanation: {
    title_en: "Past Continuous with WHILE & Clauses of Reason",
    title_vi: "Past Continuous with WHILE & Clauses of Reason",
    rules: [
      { icon: "⚡", rule_en: "Use **Past Continuous** (was/were + V-ing) for background actions.", rule_vi: "Dùng **Thì quá khứ tiếp diễn** (was/were + V-ing) cho hành động nền.", example_en: "Jake was walking when the boy fell." },
      { icon: "🎯", rule_en: "Use **Past Simple** (V-ed/V2) for sudden completed actions.", rule_vi: "Dùng **Thì quá khứ đơn** (V-ed/V2) cho hành động xen vào.", example_en: "He slipped on the wet floor." },
      { icon: "💡", rule_en: "Connect sentences with **WHILE** (continuous) or **WHEN** (interruption).", rule_vi: "Nối câu bằng **WHILE** (hành động đang diễn ra) hoặc **WHEN** (xen vào).", example_en: "While they were walking, it started to rain." }
    ]
  },
  exercises: [
  {
    "id": 1,
    "prompt": "While Jake _____ (walk) down the corridor, a boy slipped.",
    "question": "While Jake _____ (walk) down the corridor, a boy slipped.",
    "options": [
      "was walking",
      "walked",
      "walks",
      "is walking"
    ],
    "answer": "was walking",
    "hint_en": "Use Past Continuous for long action.",
    "hint_vi": "Dùng Thì quá khứ tiếp diễn cho hành động kéo dài.",
    "type": "mc"
  },
  {
    "id": 2,
    "prompt": "The boy slipped because the wooden floor _____ (be) wet.",
    "question": "The boy slipped because the wooden floor _____ (be) wet.",
    "options": [
      "was",
      "were",
      "is",
      "being"
    ],
    "answer": "was",
    "hint_en": "Singular subject takes 'was'.",
    "hint_vi": "Chủ ngữ số ít dùng 'was'.",
    "type": "mc"
  },
  {
    "id": 3,
    "prompt": "While the students _____ (study) science, the nurse arrived.",
    "question": "While the students _____ (study) science, the nurse arrived.",
    "options": [
      "were studying",
      "studied",
      "are studying",
      "studies"
    ],
    "answer": "were studying",
    "hint_en": "Plural subject takes 'were studying'.",
    "hint_vi": "Chủ ngữ số nhiều dùng 'were studying'.",
    "type": "mc"
  },
  {
    "id": 4,
    "prompt": "Jake _____ (rush) over immediately to help his friend.",
    "question": "Jake _____ (rush) over immediately to help his friend.",
    "options": [
      "rushed",
      "was rushing",
      "rushes",
      "is rushing"
    ],
    "answer": "rushed",
    "hint_en": "Short completed action in past.",
    "hint_vi": "Hành động ngắn đã hoàn thành.",
    "type": "mc"
  },
  {
    "id": 5,
    "prompt": "They walked carefully so that they _____ (not fall).",
    "question": "They walked carefully so that they _____ (not fall).",
    "options": [
      "would not fall",
      "does not fall",
      "falling not",
      "not fell"
    ],
    "answer": "would not fall",
    "hint_en": "Purpose in the past uses 'would not'.",
    "hint_vi": "Mục đích trong quá khứ dùng 'would not'.",
    "type": "mc"
  },
  {
    "id": 6,
    "prompt": "While the nurse _____ (clean) his knee, Jake held his hand.",
    "question": "While the nurse _____ (clean) his knee, Jake held his hand.",
    "options": [
      "was cleaning",
      "cleaned",
      "cleans",
      "is cleaning"
    ],
    "answer": "was cleaning",
    "hint_en": "Past action in progress.",
    "hint_vi": "Hành động quá khứ đang diễn ra.",
    "type": "mc"
  },
  {
    "id": 7,
    "prompt": "The headmaster _____ (thank) Jake for his quick reaction.",
    "question": "The headmaster _____ (thank) Jake for his quick reaction.",
    "options": [
      "thanked",
      "was thanking",
      "thanks",
      "thanking"
    ],
    "answer": "thanked",
    "hint_en": "Past Simple tense.",
    "hint_vi": "Thì quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 8,
    "prompt": "While everyone _____ (listen), the headmaster explained the rules.",
    "question": "While everyone _____ (listen), the headmaster explained the rules.",
    "options": [
      "was listening",
      "listened",
      "listens",
      "were listening"
    ],
    "answer": "was listening",
    "hint_en": "'Everyone' takes singular verb 'was'.",
    "hint_vi": "'Everyone' đi với động từ số ít 'was'.",
    "type": "mc"
  },
  {
    "id": 9,
    "prompt": "The students _____ (promise) to walk slowly on wet floors.",
    "question": "The students _____ (promise) to walk slowly on wet floors.",
    "options": [
      "promised",
      "was promising",
      "promises",
      "promising"
    ],
    "answer": "promised",
    "hint_en": "Past Simple action.",
    "hint_vi": "Hành động quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 10,
    "prompt": "He fell on the floor while he _____ (run) fast.",
    "question": "He fell on the floor while he _____ (run) fast.",
    "options": [
      "was running",
      "ran",
      "runs",
      "is running"
    ],
    "answer": "was running",
    "hint_en": "Action in progress while running.",
    "hint_vi": "Hành động đang diễn ra khi đang chạy.",
    "type": "mc"
  },
  {
    "id": 11,
    "prompt": "The boy _____ (cry) until the nurse arrived.",
    "question": "The boy _____ (cry) until the nurse arrived.",
    "options": [
      "cried",
      "was crying",
      "cries",
      "is crying"
    ],
    "answer": "cried",
    "hint_en": "Completed past event.",
    "hint_vi": "Sự việc đã kết thúc.",
    "type": "mc"
  },
  {
    "id": 12,
    "prompt": "Jake _____ (stay) calm when the accident happened.",
    "question": "Jake _____ (stay) calm when the accident happened.",
    "options": [
      "stayed",
      "was staying",
      "stays",
      "is staying"
    ],
    "answer": "stayed",
    "hint_en": "Past state.",
    "hint_vi": "Trạng thái trong quá khứ.",
    "type": "mc"
  },
  {
    "id": 13,
    "prompt": "While the janitor _____ (mop) the hall, he put up a sign.",
    "question": "While the janitor _____ (mop) the hall, he put up a sign.",
    "options": [
      "was mopping",
      "mopped",
      "mops",
      "is mopping"
    ],
    "answer": "was mopping",
    "hint_en": "Past Continuous progress.",
    "hint_vi": "Quá khứ tiếp diễn.",
    "type": "mc"
  },
  {
    "id": 14,
    "prompt": "They put up signs so that students _____ (be) safe.",
    "question": "They put up signs so that students _____ (be) safe.",
    "options": [
      "would be",
      "are",
      "were being",
      "will be"
    ],
    "answer": "would be",
    "hint_en": "Clause of purpose in past.",
    "hint_vi": "Mệnh đề chỉ mục đích.",
    "type": "mc"
  },
  {
    "id": 15,
    "prompt": "The nurse _____ (apply) a clean bandage gently.",
    "question": "The nurse _____ (apply) a clean bandage gently.",
    "options": [
      "applied",
      "was applying",
      "applies",
      "applying"
    ],
    "answer": "applied",
    "hint_en": "Past Simple verb.",
    "hint_vi": "Động từ quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 16,
    "prompt": "While Jake _____ (hold) his books, he saw his classmate fall.",
    "question": "While Jake _____ (hold) his books, he saw his classmate fall.",
    "options": [
      "was holding",
      "held",
      "holds",
      "is holding"
    ],
    "answer": "was holding",
    "hint_en": "Action in progress.",
    "hint_vi": "Hành động đang diễn ra.",
    "type": "mc"
  },
  {
    "id": 17,
    "prompt": "The headmaster _____ (remind) everyone to follow safety rules.",
    "question": "The headmaster _____ (remind) everyone to follow safety rules.",
    "options": [
      "reminded",
      "was reminding",
      "reminds",
      "remind"
    ],
    "answer": "reminded",
    "hint_en": "Past Simple.",
    "hint_vi": "Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 18,
    "prompt": "While they _____ (talk), the ambulance bell rang outside.",
    "question": "While they _____ (talk), the ambulance bell rang outside.",
    "options": [
      "were talking",
      "talked",
      "are talking",
      "talks"
    ],
    "answer": "were talking",
    "hint_en": "Plural past continuous.",
    "hint_vi": "Quá khứ tiếp diễn số nhiều.",
    "type": "mc"
  },
  {
    "id": 19,
    "prompt": "Jake _____ (feel) proud because he helped a friend.",
    "question": "Jake _____ (feel) proud because he helped a friend.",
    "options": [
      "felt",
      "was feeling",
      "feels",
      "is feeling"
    ],
    "answer": "felt",
    "hint_en": "Past tense of feel.",
    "hint_vi": "Quá khứ của feel.",
    "type": "mc"
  },
  {
    "id": 20,
    "prompt": "They _____ (learn) an important lesson about school safety.",
    "question": "They _____ (learn) an important lesson about school safety.",
    "options": [
      "learned",
      "were learning",
      "learns",
      "is learning"
    ],
    "answer": "learned",
    "hint_en": "Past Simple result.",
    "hint_vi": "Kết quả quá khứ đơn.",
    "type": "mc"
  }
]
};
