// WEEK 29: THE MAGIC CARPET — Irregular Verbs 1: go, run, come, fly
// Ask AI Station — Advanced Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "I just came back from an amazing magic carpet trip! My carpet flew me all the way to a farm in the countryside.",
      nova_says_vi: "Cô vừa trở về từ một chuyến đi thảm bay kỳ diệu! Tấm thảm đã bay cô đến một trang trại ở nông thôn.",
      context_en: "Nova returns from a magic carpet trip. Student asks follow-up questions.",
      question_word_bank: ["Where did", "Where does", "Where was", "Where has"],
      question_frame: "___ the carpet fly you?",
      correctWord: "Where did"
    },
    {
      nova_says: "A friendly farmer ran out of his barn and waved at me! He gave me some fresh vegetables from his garden.",
      nova_says_vi: "Một người nông dân thân thiện chạy ra khỏi chuồng và vẫy tay với cô! Ông cho cô một ít rau tươi từ vườn.",
      context_en: "Nova describes meeting a farmer who gave her vegetables. Student asks questions.",
      question_word_bank: ["What did", "What does", "What was", "Who did"],
      question_frame: "___ the farmer give you?",
      correctWord: "What did"
    },
    {
      nova_says: "Then the carpet flew me to the coast! I saw beautiful dolphins swimming and jumping in the sparkling sea.",
      nova_says_vi: "Rồi tấm thảm bay cô đến bờ biển! Cô thấy những con cá heo đẹp bơi và nhảy trong làn sóng lấp lánh.",
      context_en: "Nova describes flying to the coast and seeing dolphins. Student asks about the dolphins.",
      question_word_bank: ["How many did", "How many does", "How much did", "Did"],
      question_frame: "___ dolphins did you see?",
      correctWord: "How many did"
    },
    {
      nova_says: "A pilot came flying past in a small red plane! He waved and smiled at me — I waved back from the carpet.",
      nova_says_vi: "Một phi công bay qua trong một chiếc máy bay đỏ nhỏ! Anh ấy vẫy tay và mỉm cười — cô vẫy lại từ tấm thảm.",
      context_en: "Nova meets a pilot in a red plane. Student asks about the pilot.",
      question_word_bank: ["Where did", "Where does", "What did", "How did"],
      question_frame: "___ the pilot fly past?",
      correctWord: "Where did"
    },
    {
      nova_says: "It was the best adventure ever! The carpet came home just before dinner and I felt so happy and grateful.",
      nova_says_vi: "Đó là cuộc phiêu lưu tuyệt vời nhất từ trước đến nay! Tấm thảm về nhà ngay trước bữa tối và cô cảm thấy vui và biết ơn.",
      context_en: "The adventure ends. Student asks about how Nova felt.",
      question_word_bank: ["How did", "What did", "How does", "Where did"],
      question_frame: "___ Nova feel after the adventure?",
      correctWord: "How did"
    }
  ]
};
