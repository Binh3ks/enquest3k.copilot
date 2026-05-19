// WEEK 29: THE MAGIC CARPET — Irregular Verbs 1: go, run, come, fly
// Ask AI Station — Easy Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "I just came back from a magic carpet trip! My carpet flew me to a big farm in the countryside.",
      nova_says_vi: "Cô vừa trở về từ chuyến đi thảm bay kỳ diệu! Tấm thảm đã bay cô đến một trang trại lớn ở nông thôn.",
      context_en: "Nova returned from a magic carpet trip. Student asks follow-up questions.",
      question_word_bank: ["Where did", "Where does", "Where was", "What did"],
      question_frame: "___ the carpet fly you?"
    },
    {
      nova_says: "A friendly farmer ran out of his barn and waved at me! He gave me some fresh vegetables.",
      nova_says_vi: "Một người nông dân thân thiện chạy ra khỏi cái chuồng và vẫy tay với cô! Ông ấy cho cô một ít rau tươi.",
      context_en: "Nova met a friendly farmer. Student asks about the farmer.",
      question_word_bank: ["What did", "What does", "What was", "Did"],
      question_frame: "___ the farmer give you?"
    },
    {
      nova_says: "Then the carpet flew me to the coast. I saw beautiful dolphins swimming and jumping in the sea!",
      nova_says_vi: "Rồi tấm thảm bay cô đến bờ biển. Cô thấy những con cá heo đẹp bơi và nhảy trên biển!",
      context_en: "Nova flew to the coast and saw dolphins. Student asks about the dolphins.",
      question_word_bank: ["How many did", "How much did", "How many were", "Did"],
      question_frame: "___ dolphins did you see?"
    },
    {
      nova_says: "A pilot came and flew his plane next to my carpet! He waved and smiled at me.",
      nova_says_vi: "Một phi công đến và lái máy bay của anh ấy cạnh thảm bay của cô! Anh ấy vẫy tay và mỉm cười với cô.",
      context_en: "Nova met a pilot. Student asks about the pilot.",
      question_word_bank: ["What did", "What does", "How did", "Where did"],
      question_frame: "___ the pilot do next to your carpet?"
    },
    {
      nova_says: "It was the best adventure! The carpet came home just before dinner and I felt so happy.",
      nova_says_vi: "Đó là cuộc phiêu lưu tuyệt nhất! Tấm thảm đã về nhà ngay trước bữa tối và cô cảm thấy rất vui.",
      context_en: "The adventure ends. Student asks about the best part.",
      question_word_bank: ["What was", "What does", "How was", "Where was"],
      question_frame: "___ the best part of the trip?"
    }
  ]
};
