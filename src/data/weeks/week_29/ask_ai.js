// WEEK 29: THE MAGIC CARPET — Irregular Verbs 1: go, run, come, fly
// Ask AI Station — Advanced Mode
// W29+ Schema: prompts[] with nova_says, task_en/vi, question_starters[], answer[]

export default {
  title_en: "Ask Nova: The Magic Carpet",
  title_vi: "Hỏi Nova: Tấm Thảm Bay Kỳ Diệu",
  audio_url: null,
  prompts: [
    {
      id: 1,
      context_en: "Nova returns from a magic carpet trip to a countryside farm.",
      nova_says: "I just came back from an amazing magic carpet trip! My carpet flew me all the way to a farm in the countryside.",
      nova_says_vi: "Cô vừa trở về từ một chuyến đi thảm bay kỳ diệu! Tấm thảm đã bay cô đến một trang trại ở nông thôn.",
      task_en: "Ask Nova a question about where the magic carpet flew her.",
      task_vi: "Hỏi Nova một câu hỏi về nơi tấm thảm bay cô đến.",
      question_starters: [
        "Where did the carpet fly…?",
        "How long did you fly…?",
        "Did the carpet fly you to…?"
      ],
      answer: [
        "The carpet flew me all the way to a farm in the countryside!",
        "It flew me to a beautiful farm in the countryside — it was amazing!"
      ]
    },
    {
      id: 2,
      context_en: "Nova met a friendly farmer who gave her some fresh vegetables from his garden.",
      nova_says: "A friendly farmer ran out of his barn and waved at me! He gave me some fresh vegetables from his garden.",
      nova_says_vi: "Một người nông dân thân thiện chạy ra khỏi chuồng và vẫy tay với cô! Ông cho cô một ít rau tươi từ vườn.",
      task_en: "Ask Nova a question about what the farmer gave her.",
      task_vi: "Hỏi Nova một câu hỏi về việc người nông dân cho cô thứ gì.",
      question_starters: [
        "What did the farmer give…?",
        "Did the farmer give you…?",
        "How did the farmer feel when…?"
      ],
      answer: [
        "The farmer gave me some fresh vegetables from his garden — they were so colourful and tasty!",
        "He gave me fresh vegetables from his garden and waved at me from the barn!"
      ]
    },
    {
      id: 3,
      context_en: "Nova flew to the coast and saw beautiful dolphins swimming and jumping in the sea.",
      nova_says: "Then the carpet flew me to the coast! I saw beautiful dolphins swimming and jumping in the sparkling sea.",
      nova_says_vi: "Rồi tấm thảm bay cô đến bờ biển! Cô thấy những con cá heo đẹp bơi và nhảy trong làn sóng lấp lánh.",
      task_en: "Ask Nova a question about the dolphins she saw.",
      task_vi: "Hỏi Nova một câu hỏi về những con cá heo cô đã thấy.",
      question_starters: [
        "How many dolphins did…?",
        "What did the dolphins do when…?",
        "Did you see any dolphins…?"
      ],
      answer: [
        "I saw many beautiful dolphins swimming and jumping in the sparkling sea — it was magical!",
        "The dolphins jumped out of the water and swam alongside the magic carpet — it was amazing!"
      ]
    },
    {
      id: 4,
      context_en: "Nova met a pilot who flew past in a small red plane and waved at her.",
      nova_says: "A pilot came flying past in a small red plane! He waved and smiled at me — I waved back from the carpet.",
      nova_says_vi: "Một phi công bay qua trong một chiếc máy bay đỏ nhỏ! Anh ấy vẫy tay và mỉm cười — cô vẫy lại từ tấm thảm.",
      task_en: "Ask Nova a question about the pilot she met.",
      task_vi: "Hỏi Nova một câu hỏi về người phi công cô đã gặp.",
      question_starters: [
        "What did the pilot look like…?",
        "Did the pilot say anything to…?",
        "Was the pilot flying fast or slow…?"
      ],
      answer: [
        "The pilot flew past in a small red plane and waved and smiled at me!",
        "He waved and smiled at me from his red plane — I waved back from the magic carpet!"
      ]
    },
    {
      id: 5,
      context_en: "Nova's magic carpet adventure ended just before dinner.",
      nova_says: "It was the best adventure ever! The carpet came home just before dinner and I felt so happy and grateful.",
      nova_says_vi: "Đó là cuộc phiêu lưu tuyệt vời nhất từ trước đến nay! Tấm thảm về nhà ngay trước bữa tối và cô cảm thấy vui và biết ơn.",
      task_en: "Ask Nova a question about the best part of her adventure.",
      task_vi: "Hỏi Nova một câu hỏi về phần thú vị nhất của cuộc phiêu lưu.",
      question_starters: [
        "What was the most exciting part of…?",
        "Would you go on another magic carpet…?",
        "When did the carpet come back…?"
      ],
      answer: [
        "The best part was seeing the dolphins swim alongside the carpet — it was truly magical!",
        "The carpet came home just before dinner — I felt so happy and grateful for the adventure!"
      ]
    }
  ]
};
