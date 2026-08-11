// Cambridge A2 Flyers grammar.js — Week 35
export default {
  title: "Modal Verbs of Obligation & Purpose Clauses",
  focus: "Must / Should / Can + V-bare, So that + Subject + could",
  grammar_explanation: {
    title_en: "Modal Verbs of Obligation & Purpose Clauses",
    title_vi: "Modal Verbs of Obligation & Purpose Clauses",
    rules: [
      { icon: "⚡", rule_en: "Use **Past Continuous** (was/were + V-ing) for background actions.", rule_vi: "Dùng **Thì quá khứ tiếp diễn** (was/were + V-ing) cho hành động nền.", example_en: "Jake was walking when the boy fell." },
      { icon: "🎯", rule_en: "Use **Past Simple** (V-ed/V2) for sudden completed actions.", rule_vi: "Dùng **Thì quá khứ đơn** (V-ed/V2) cho hành động xen vào.", example_en: "He slipped on the wet floor." },
      { icon: "💡", rule_en: "Connect sentences with **WHILE** (continuous) or **WHEN** (interruption).", rule_vi: "Nối câu bằng **WHILE** (hành động đang diễn ra) hoặc **WHEN** (xen vào).", example_en: "While they were walking, it started to rain." }
    ]
  },
  exercises: [
  {
    "id": 1,
    "prompt": "While Maya and Tom _____ (walk) in the park, they saw rubbish.",
    "question": "While Maya and Tom _____ (walk) in the park, they saw rubbish.",
    "options": [
      "walked",
      "were walking",
      "is walking",
      "walks"
    ],
    "answer": "were walking",
    "hint_en": "Plural subject in Past Continuous.",
    "hint_vi": "Chủ ngữ số nhiều ở Quá khứ tiếp diễn.",
    "type": "mc"
  },
  {
    "id": 2,
    "prompt": "They _____ (decide) to clean the park without hesitation.",
    "question": "They _____ (decide) to clean the park without hesitation.",
    "options": [
      "decided",
      "is deciding",
      "decides",
      "were deciding"
    ],
    "answer": "decided",
    "hint_en": "Past Simple decision.",
    "hint_vi": "Quyết định ở Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 3,
    "prompt": "We _____ (must) protect our city parks and nature.",
    "question": "We _____ (must) protect our city parks and nature.",
    "options": [
      "should to",
      "having to",
      "ought",
      "must"
    ],
    "answer": "must",
    "hint_en": "Modal verb of obligation.",
    "hint_vi": "Động từ khuyết thiếu thể hiện nghĩa vụ.",
    "type": "mc"
  },
  {
    "id": 4,
    "prompt": "While they _____ (pick) up plastic bottles, visitors cheered.",
    "question": "While they _____ (pick) up plastic bottles, visitors cheered.",
    "options": [
      "were picking",
      "picked",
      "picks",
      "is picking"
    ],
    "answer": "were picking",
    "hint_en": "Action in progress.",
    "hint_vi": "Hành động đang diễn ra.",
    "type": "mc"
  },
  {
    "id": 5,
    "prompt": "They put plastic waste into recycling bins so that it _____ (be) reused.",
    "question": "They put plastic waste into recycling bins so that it _____ (be) reused.",
    "options": [
      "is",
      "could be",
      "will be",
      "being"
    ],
    "answer": "could be",
    "hint_en": "Modal passive purpose.",
    "hint_vi": "Mục đích bị động.",
    "type": "mc"
  },
  {
    "id": 6,
    "prompt": "Tom _____ (plant) young trees near the small pond.",
    "question": "Tom _____ (plant) young trees near the small pond.",
    "options": [
      "planted",
      "is planting",
      "plants",
      "was planting"
    ],
    "answer": "planted",
    "hint_en": "Completed action.",
    "hint_vi": "Hành động đã hoàn thành.",
    "type": "mc"
  },
  {
    "id": 7,
    "prompt": "The park became clean because everyone _____ (help).",
    "question": "The park became clean because everyone _____ (help).",
    "options": [
      "was helping",
      "helping",
      "helps",
      "helped"
    ],
    "answer": "helped",
    "hint_en": "Past Simple reason.",
    "hint_vi": "Lý do quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 8,
    "prompt": "Children _____ (should) never drop litter on the grass.",
    "question": "Children _____ (should) never drop litter on the grass.",
    "options": [
      "should",
      "must to",
      "can't to",
      "ought"
    ],
    "answer": "should",
    "hint_en": "Modal for advice.",
    "hint_vi": "Động từ khuyết thiếu cho lời khuyên.",
    "type": "mc"
  },
  {
    "id": 9,
    "prompt": "While the sun _____ (shine), they finished planting flowers.",
    "question": "While the sun _____ (shine), they finished planting flowers.",
    "options": [
      "shone",
      "was shining",
      "is shining",
      "shines"
    ],
    "answer": "was shining",
    "hint_en": "Past Continuous.",
    "hint_vi": "Quá khứ tiếp diễn.",
    "type": "mc"
  },
  {
    "id": 10,
    "prompt": "They _____ (feel) proud of their environmental work.",
    "question": "They _____ (feel) proud of their environmental work.",
    "options": [
      "felt",
      "feeling",
      "feels",
      "was feeling"
    ],
    "answer": "felt",
    "hint_en": "Past Simple of feel.",
    "hint_vi": "Quá khứ của feel.",
    "type": "mc"
  },
  {
    "id": 11,
    "prompt": "Singapore _____ (build) futuristic supertrees to absorb carbon.",
    "question": "Singapore _____ (build) futuristic supertrees to absorb carbon.",
    "options": [
      "was building",
      "is building",
      "builds",
      "built"
    ],
    "answer": "built",
    "hint_en": "Past Simple history.",
    "hint_vi": "Lịch sử quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 12,
    "prompt": "Parks are green lungs that _____ (clean) urban air.",
    "question": "Parks are green lungs that _____ (clean) urban air.",
    "options": [
      "clean",
      "cleaned",
      "was cleaning",
      "cleaning"
    ],
    "answer": "clean",
    "hint_en": "General truth.",
    "hint_vi": "Sự thật hiển nhiên.",
    "type": "mc"
  },
  {
    "id": 13,
    "prompt": "While birds _____ (sing) in the trees, Tom watered the plants.",
    "question": "While birds _____ (sing) in the trees, Tom watered the plants.",
    "options": [
      "sang",
      "were singing",
      "is singing",
      "sings"
    ],
    "answer": "were singing",
    "hint_en": "Plural past continuous.",
    "hint_vi": "Quá khứ tiếp diễn số nhiều.",
    "type": "mc"
  },
  {
    "id": 14,
    "prompt": "Maya _____ (wear) protective gloves while picking up glass.",
    "question": "Maya _____ (wear) protective gloves while picking up glass.",
    "options": [
      "wore",
      "is wearing",
      "wears",
      "was wearing"
    ],
    "answer": "wore",
    "hint_en": "Past Simple.",
    "hint_vi": "Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 15,
    "prompt": "If we care for nature, our cities _____ (become) beautiful.",
    "question": "If we care for nature, our cities _____ (become) beautiful.",
    "options": [
      "became",
      "would become",
      "becoming",
      "will become"
    ],
    "answer": "will become",
    "hint_en": "First Conditional.",
    "hint_vi": "Câu điều kiện loại 1.",
    "type": "mc"
  },
  {
    "id": 16,
    "prompt": "They _____ (collect) five big bags of plastic rubbish.",
    "question": "They _____ (collect) five big bags of plastic rubbish.",
    "options": [
      "collected",
      "were collecting",
      "collects",
      "is collecting"
    ],
    "answer": "collected",
    "hint_en": "Past Simple.",
    "hint_vi": "Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 17,
    "prompt": "While visitors _____ (resting) on benches, children cleaned the path.",
    "question": "While visitors _____ (resting) on benches, children cleaned the path.",
    "options": [
      "rested",
      "were resting",
      "is resting",
      "rests"
    ],
    "answer": "were resting",
    "hint_en": "Past Continuous.",
    "hint_vi": "Quá khứ tiếp diễn.",
    "type": "mc"
  },
  {
    "id": 18,
    "prompt": "The mayor _____ (award) them certificates of environmental care.",
    "question": "The mayor _____ (award) them certificates of environmental care.",
    "options": [
      "awarded",
      "is awarding",
      "awards",
      "was awarding"
    ],
    "answer": "awarded",
    "hint_en": "Past Simple.",
    "hint_vi": "Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 19,
    "prompt": "Recycling plastic _____ (save) energy and wild animals.",
    "question": "Recycling plastic _____ (save) energy and wild animals.",
    "options": [
      "saved",
      "saving",
      "was saving",
      "saves"
    ],
    "answer": "saves",
    "hint_en": "General scientific fact.",
    "hint_vi": "Sự thật khoa học chung.",
    "type": "mc"
  },
  {
    "id": 20,
    "prompt": "Everyone _____ (clap) hands warmly when the park was clean.",
    "question": "Everyone _____ (clap) hands warmly when the park was clean.",
    "options": [
      "clapped",
      "was clapping",
      "claps",
      "is clapping"
    ],
    "answer": "clapped",
    "hint_en": "Past Simple action.",
    "hint_vi": "Hành động quá khứ đơn.",
    "type": "mc"
  }
]
};
