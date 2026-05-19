// WEEK 29: THE MAGIC CARPET — Irregular Verbs 1: go, run, come, fly
// Ask AI Station — Easy Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "I just came back from a magic carpet trip! My carpet flew me to a big farm in the countryside.",
      nova_says_vi: "Cô vừa trở về từ chuyến đi thảm bay kỳ diệu! Tấm thảm đã bay cô đến một trang trại lớn ở nông thôn.",
      context_en: "Nova returns from a magic carpet trip to a countryside farm. Student asks follow-up questions.",
      question_word_bank: ["Where", "How", "Who", "What"],
      question_frame: "___ exactly did the carpet fly? or ___ long did you fly on the carpet? or Tell me more!"
    },
    {
      nova_says: "A friendly farmer ran out of his barn and waved at me! He gave me some fresh vegetables.",
      nova_says_vi: "Một người nông dân thân thiện chạy ra khỏi cái chuồng và vẫy tay với cô! Ông ấy cho cô một ít rau tươi.",
      context_en: "Nova describes meeting a friendly farmer who gave her vegetables. Student asks about the farmer.",
      question_word_bank: ["What", "How", "Did", "Who"],
      question_frame: "___ did the farmer give you? or ___ did the farmer feel when he saw you? or Tell me more!"
    },
    {
      nova_says: "Then the carpet flew me to the coast. I saw beautiful dolphins swimming and jumping in the sea!",
      nova_says_vi: "Rồi tấm thảm bay cô đến bờ biển. Cô thấy những con cá heo đẹp bơi và nhảy trên biển!",
      context_en: "Nova describes flying to the coast and seeing dolphins. Student asks about the dolphins.",
      question_word_bank: ["How", "What", "Did", "When"],
      question_frame: "___ many dolphins did you see? or ___ did the dolphins do when they saw you? or Tell me more!"
    },
    {
      nova_says: "A pilot came and flew his plane next to my carpet! He waved and smiled at me.",
      nova_says_vi: "Một phi công đến và lái máy bay của anh ấy cạnh thảm bay của cô! Anh ấy vẫy tay và mỉm cười với cô.",
      context_en: "Nova describes meeting a pilot who flew beside her carpet. Student asks about the pilot.",
      question_word_bank: ["What", "Did", "Where", "Who"],
      question_frame: "___ did the pilot say to you? or ___ the pilot flying fast or slow? or Tell me more!"
    },
    {
      nova_says: "It was the best adventure! The carpet came home just before dinner and I felt so happy.",
      nova_says_vi: "Đó là cuộc phiêu lưu tuyệt nhất! Tấm thảm đã về nhà ngay trước bữa tối và cô cảm thấy rất vui.",
      context_en: "Nova describes the adventure ending with the carpet coming home. Student asks about the best part.",
      question_word_bank: ["What", "Would", "How", "When"],
      question_frame: "___ was the best part of the trip? or ___ you go again on the magic carpet? or Tell me more!"
    }
  ]
};
