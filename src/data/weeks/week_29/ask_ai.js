// WEEK 29: THE MAGIC CARPET — Irregular Verbs 1: go, run, come, fly
// Ask AI Station — Advanced Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "I just came back from an amazing magic carpet trip! My carpet flew me all the way to a farm in the countryside.",
      nova_says_vi: "Cô vừa trở về từ một chuyến đi thảm bay kỳ diệu! Tấm thảm đã bay cô đến một trang trại ở nông thôn.",
      context_en: "Nova returns from a magic carpet trip to a countryside farm. Student asks follow-up questions about the trip.",
      question_word_bank: ["Where", "How", "Who", "What"],
      question_frame: "___ exactly did the carpet take you? or ___ long did you fly? or Tell me more!"
    },
    {
      nova_says: "A friendly farmer ran out of his barn and waved at me! He gave me some fresh vegetables from his garden.",
      nova_says_vi: "Một người nông dân thân thiện chạy ra khỏi chuồng và vẫy tay với cô! Ông cho cô một ít rau tươi từ vườn.",
      context_en: "Nova describes meeting a friendly farmer who gave her vegetables. Student asks questions about the farmer.",
      question_word_bank: ["What", "How", "Did", "Who"],
      question_frame: "___ did the farmer give you? or ___ did the farmer feel when he saw you? or Tell me more!"
    },
    {
      nova_says: "Then the carpet flew me to the coast! I saw beautiful dolphins swimming and jumping in the sparkling sea.",
      nova_says_vi: "Rồi tấm thảm bay cô đến bờ biển! Cô thấy những con cá heo đẹp bơi và nhảy trong làn sóng lấp lánh.",
      context_en: "Nova describes flying to the coast and seeing dolphins. Student asks about the dolphins.",
      question_word_bank: ["How", "What", "Did", "When"],
      question_frame: "___ many dolphins did you see? or ___ did the dolphins do? or Tell me more!"
    },
    {
      nova_says: "A pilot came flying past in a small red plane! He waved and smiled at me — I waved back from the carpet.",
      nova_says_vi: "Một phi công bay qua trong một chiếc máy bay đỏ nhỏ! Anh ấy vẫy tay và mỉm cười — cô vẫy lại từ tấm thảm.",
      context_en: "Nova describes meeting a pilot in a red plane who waved at her. Student asks about the pilot.",
      question_word_bank: ["What", "Did", "Where", "Who"],
      question_frame: "___ did the pilot look like? or ___ did the pilot say to you? or Tell me more!"
    },
    {
      nova_says: "It was the best adventure ever! The carpet came home just before dinner and I felt so happy and grateful.",
      nova_says_vi: "Đó là cuộc phiêu lưu tuyệt vời nhất từ trước đến nay! Tấm thảm về nhà ngay trước bữa tối và cô cảm thấy vui và biết ơn.",
      context_en: "Nova describes the adventure ending with the carpet coming home. Student asks about the best part.",
      question_word_bank: ["What", "Would", "How", "When"],
      question_frame: "___ was the most exciting part? or ___ you go on a magic carpet trip again? or Tell me more!"
    }
  ]
};
