// WEEK 29: THE MAGIC CARPET — Irregular Verbs 1: go, run, come, fly
// Ask AI Station — Easy Mode
// W29+ Schema: prompts[] with nova_says, task_en/vi, question_starters[], answer[]

export default {
  prompts: [
    {
      id: 1,
      context_en: "Nova returned from a magic carpet trip to a countryside farm.",
      nova_says: "I just came back from a magic carpet trip! My carpet flew me to a big farm in the countryside.",
      nova_says_vi: "Cô vừa trở về từ chuyến đi thảm bay kỳ diệu! Tấm thảm đã bay cô đến một trang trại lớn ở nông thôn.",
      task_en: "Ask Nova a question about where the carpet flew her.",
      task_vi: "Hỏi Nova một câu hỏi về nơi tấm thảm bay cô đến.",
      question_starters: [
        "Where did the carpet…?",
        "Did the carpet fly you to…?"
      ],
      answer: [
        "The carpet flew me to a big farm in the countryside!",
        "It flew me to a beautiful farm in the countryside."
      ]
    },
    {
      id: 2,
      context_en: "Nova met a friendly farmer who gave her some fresh vegetables.",
      nova_says: "A friendly farmer ran out of his barn and waved at me! He gave me some fresh vegetables.",
      nova_says_vi: "Một người nông dân thân thiện chạy ra khỏi cái chuồng và vẫy tay với cô! Ông ấy cho cô một ít rau tươi.",
      task_en: "Ask Nova a question about what the farmer gave her.",
      task_vi: "Hỏi Nova một câu hỏi về người nông dân cho cô thứ gì.",
      question_starters: [
        "What did the farmer…?",
        "Did the farmer give you…?"
      ],
      answer: [
        "The farmer gave me some fresh vegetables from his farm!",
        "He gave me fresh vegetables — they were so colourful and tasty!"
      ]
    },
    {
      id: 3,
      context_en: "Nova flew to the coast and saw beautiful dolphins swimming.",
      nova_says: "Then the carpet flew me to the coast. I saw beautiful dolphins swimming and jumping in the sea!",
      nova_says_vi: "Rồi tấm thảm bay cô đến bờ biển. Cô thấy những con cá heo đẹp bơi và nhảy trên biển!",
      task_en: "Ask Nova a question about the dolphins she saw.",
      task_vi: "Hỏi Nova một câu hỏi về những con cá heo cô đã thấy.",
      question_starters: [
        "How many dolphins did…?",
        "Did the dolphins jump…?"
      ],
      answer: [
        "I saw many dolphins swimming and jumping in the sea!",
        "The dolphins jumped high and swam very fast — it was amazing!"
      ]
    },
    {
      id: 4,
      context_en: "Nova met a pilot who flew his plane next to her magic carpet.",
      nova_says: "A pilot came and flew his plane next to my carpet! He waved and smiled at me.",
      nova_says_vi: "Một phi công đến và lái máy bay của anh ấy cạnh thảm bay của cô! Anh ấy vẫy tay và mỉm cười với cô.",
      task_en: "Ask Nova a question about the pilot.",
      task_vi: "Hỏi Nova một câu hỏi về người phi công.",
      question_starters: [
        "Did the pilot wave…?",
        "Was the pilot flying fast…?"
      ],
      answer: [
        "Yes, the pilot waved and smiled at me from his plane!",
        "He flew his plane next to my carpet and waved — it was so exciting!"
      ]
    },
    {
      id: 5,
      context_en: "Nova's magic carpet adventure ended just before dinner.",
      nova_says: "It was the best adventure! The carpet came home just before dinner and I felt so happy.",
      nova_says_vi: "Đó là cuộc phiêu lưu tuyệt nhất! Tấm thảm đã về nhà ngay trước bữa tối và cô cảm thấy rất vui.",
      task_en: "Ask Nova a question about when the carpet came home.",
      task_vi: "Hỏi Nova một câu hỏi về việc tấm thảm về nhà lúc nào.",
      question_starters: [
        "When did the carpet…?",
        "What was the best part of…?"
      ],
      answer: [
        "The carpet came home just before dinner — just in time!",
        "The best part was seeing the dolphins! The carpet came home at dinner time."
      ]
    }
  ]
};
