// Cambridge A2 Flyers grammar.js — Week 34
export default {
  title: "Past Simple vs Past Continuous in Storytelling",
  focus: "While + Past Continuous, Past Simple happened",
  grammar_explanation: {
    title_en: "Past Simple vs Past Continuous in Storytelling",
    title_vi: "Past Simple vs Past Continuous in Storytelling",
    rules: [
      { icon: "⚡", rule_en: "Use **Past Continuous** (was/were + V-ing) for background actions.", rule_vi: "Dùng **Thì quá khứ tiếp diễn** (was/were + V-ing) cho hành động nền.", example_en: "Jake was walking when the boy fell." },
      { icon: "🎯", rule_en: "Use **Past Simple** (V-ed/V2) for sudden completed actions.", rule_vi: "Dùng **Thì quá khứ đơn** (V-ed/V2) cho hành động xen vào.", example_en: "He slipped on the wet floor." },
      { icon: "💡", rule_en: "Connect sentences with **WHILE** (continuous) or **WHEN** (interruption).", rule_vi: "Nối câu bằng **WHILE** (hành động đang diễn ra) hoặc **WHEN** (xen vào).", example_en: "While they were walking, it started to rain." }
    ]
  },
  exercises: [
  {
    "id": 1,
    "prompt": "While the ant _____ (work) hard, the grasshopper sang.",
    "question": "While the ant _____ (work) hard, the grasshopper sang.",
    "options": [
      "worked",
      "was working",
      "is working",
      "works"
    ],
    "answer": "was working",
    "hint_en": "Background continuous action.",
    "hint_vi": "Hành động nền đang diễn ra.",
    "type": "mc"
  },
  {
    "id": 2,
    "prompt": "The grasshopper _____ (sing) cheerfully under the green tree.",
    "question": "The grasshopper _____ (sing) cheerfully under the green tree.",
    "options": [
      "was singing",
      "is singing",
      "sings",
      "sang"
    ],
    "answer": "was singing",
    "hint_en": "Continuous past action.",
    "hint_vi": "Hành động quá khứ tiếp diễn.",
    "type": "mc"
  },
  {
    "id": 3,
    "prompt": "When winter arrived, snow _____ (cover) the ground.",
    "question": "When winter arrived, snow _____ (cover) the ground.",
    "options": [
      "was covering",
      "is covering",
      "covers",
      "covered"
    ],
    "answer": "covered",
    "hint_en": "Past Simple event.",
    "hint_vi": "Sự việc quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 4,
    "prompt": "The grasshopper had no food because he _____ (not save) any grains.",
    "question": "The grasshopper had no food because he _____ (not save) any grains.",
    "options": [
      "had not saved",
      "was not saving",
      "does not save",
      "not save"
    ],
    "answer": "had not saved",
    "hint_en": "Past Perfect for prior action.",
    "hint_vi": "Quá khứ hoàn thành cho hành động xảy ra trước.",
    "type": "mc"
  },
  {
    "id": 5,
    "prompt": "He _____ (knock) on the ant's door shivering in the cold.",
    "question": "He _____ (knock) on the ant's door shivering in the cold.",
    "options": [
      "was knocking",
      "knocked",
      "is knocking",
      "knocks"
    ],
    "answer": "knocked",
    "hint_en": "Single past action.",
    "hint_vi": "Hành động đơn trong quá khứ.",
    "type": "mc"
  },
  {
    "id": 6,
    "prompt": "While the ant _____ (cook) warm soup, he opened the door.",
    "question": "While the ant _____ (cook) warm soup, he opened the door.",
    "options": [
      "was cooking",
      "is cooking",
      "cooks",
      "cooked"
    ],
    "answer": "was cooking",
    "hint_en": "Past Continuous progress.",
    "hint_vi": "Quá khứ tiếp diễn.",
    "type": "mc"
  },
  {
    "id": 7,
    "prompt": "The ant _____ (invite) the grasshopper inside warmly.",
    "question": "The ant _____ (invite) the grasshopper inside warmly.",
    "options": [
      "was inviting",
      "is inviting",
      "invites",
      "invited"
    ],
    "answer": "invited",
    "hint_en": "Past Simple.",
    "hint_vi": "Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 8,
    "prompt": "The grasshopper _____ (eat) the soup gratefully.",
    "question": "The grasshopper _____ (eat) the soup gratefully.",
    "options": [
      "ate",
      "was eating",
      "eats",
      "is eating"
    ],
    "answer": "ate",
    "hint_en": "Past form of eat.",
    "hint_vi": "Quá khứ của eat.",
    "type": "mc"
  },
  {
    "id": 9,
    "prompt": "He promised that he _____ (work) hard next summer.",
    "question": "He promised that he _____ (work) hard next summer.",
    "options": [
      "will work",
      "would work",
      "is working",
      "worked"
    ],
    "answer": "would work",
    "hint_en": "Future in the past uses 'would'.",
    "hint_vi": "Tương lai trong quá khứ dùng 'would'.",
    "type": "mc"
  },
  {
    "id": 10,
    "prompt": "Aesop _____ (write) many ancient fables long ago.",
    "question": "Aesop _____ (write) many ancient fables long ago.",
    "options": [
      "wrote",
      "is writing",
      "writes",
      "was writing"
    ],
    "answer": "wrote",
    "hint_en": "Past tense of write.",
    "hint_vi": "Quá khứ của write.",
    "type": "mc"
  },
  {
    "id": 11,
    "prompt": "While animals _____ (prepare) for winter, the sun shone brightly.",
    "question": "While animals _____ (prepare) for winter, the sun shone brightly.",
    "options": [
      "prepared",
      "is preparing",
      "prepares",
      "were preparing"
    ],
    "answer": "were preparing",
    "hint_en": "Plural past continuous.",
    "hint_vi": "Quá khứ tiếp diễn số nhiều.",
    "type": "mc"
  },
  {
    "id": 12,
    "prompt": "The grasshopper _____ (learn) a valuable lesson about diligence.",
    "question": "The grasshopper _____ (learn) a valuable lesson about diligence.",
    "options": [
      "learned",
      "was learning",
      "learns",
      "is learning"
    ],
    "answer": "learned",
    "hint_en": "Past Simple.",
    "hint_vi": "Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 13,
    "prompt": "While snow _____ (fall) outside, they sat near the fireplace.",
    "question": "While snow _____ (fall) outside, they sat near the fireplace.",
    "options": [
      "fell",
      "was falling",
      "is falling",
      "falls"
    ],
    "answer": "was falling",
    "hint_en": "Uncountable 'snow' takes 'was falling'.",
    "hint_vi": "Danh từ không đếm được đi với 'was falling'.",
    "type": "mc"
  },
  {
    "id": 14,
    "prompt": "The kind ant _____ (share) his food generously.",
    "question": "The kind ant _____ (share) his food generously.",
    "options": [
      "shared",
      "is sharing",
      "shares",
      "was sharing"
    ],
    "answer": "shared",
    "hint_en": "Past action.",
    "hint_vi": "Hành động quá khứ.",
    "type": "mc"
  },
  {
    "id": 15,
    "prompt": "They _____ (become) good friends after that winter.",
    "question": "They _____ (become) good friends after that winter.",
    "options": [
      "was becoming",
      "is becoming",
      "becomes",
      "became"
    ],
    "answer": "became",
    "hint_en": "Past tense of become.",
    "hint_vi": "Quá khứ của become.",
    "type": "mc"
  },
  {
    "id": 16,
    "prompt": "The grasshopper _____ (thank) the ant for saving his life.",
    "question": "The grasshopper _____ (thank) the ant for saving his life.",
    "options": [
      "thanked",
      "was thanking",
      "thanks",
      "is thanking"
    ],
    "answer": "thanked",
    "hint_en": "Past Simple.",
    "hint_vi": "Quá khứ đơn.",
    "type": "mc"
  },
  {
    "id": 17,
    "prompt": "Fables _____ (teach) us moral lessons about life.",
    "question": "Fables _____ (teach) us moral lessons about life.",
    "options": [
      "was teaching",
      "teach",
      "is teaching",
      "taught"
    ],
    "answer": "teach",
    "hint_en": "General truth in Present Simple.",
    "hint_vi": "Sự thật hiển nhiên ở Hiện tại đơn.",
    "type": "mc"
  },
  {
    "id": 18,
    "prompt": "While the wind _____ (blow), the ant kept his home warm.",
    "question": "While the wind _____ (blow), the ant kept his home warm.",
    "options": [
      "was blowing",
      "is blowing",
      "blows",
      "blew"
    ],
    "answer": "was blowing",
    "hint_en": "Past Continuous.",
    "hint_vi": "Quá khứ tiếp diễn.",
    "type": "mc"
  },
  {
    "id": 19,
    "prompt": "He _____ (collect) grains every day during summer.",
    "question": "He _____ (collect) grains every day during summer.",
    "options": [
      "was collecting",
      "is collecting",
      "collects",
      "collected"
    ],
    "answer": "collected",
    "hint_en": "Habitual past action.",
    "hint_vi": "Thói quen trong quá khứ.",
    "type": "mc"
  },
  {
    "id": 20,
    "prompt": "Hard work always _____ (lead) to success and happiness.",
    "question": "Hard work always _____ (lead) to success and happiness.",
    "options": [
      "leads",
      "led",
      "was leading",
      "leading"
    ],
    "answer": "leads",
    "hint_en": "General law in Present Simple.",
    "hint_vi": "Quy luật chung ở Hiện tại đơn.",
    "type": "mc"
  }
]
};
