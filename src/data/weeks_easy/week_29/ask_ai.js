export default {
  topic_talk_prompt: "Tell me about a trip or journey you have taken. Where did you go? What did you see? Who helped you — a pilot, a doctor, a teacher?",
  prompts: [
    {
      id: 1,
      nova_says: "I just came back from a magic carpet trip! My carpet flew me to a big farm in the countryside.",
      nova_says_vi: "Cô vừa trở về từ chuyến đi thảm bay kỳ diệu! Tấm thảm đã bay cô đến một trang trại lớn ở nông thôn.",
      task_en: "Ask Nova 2 questions about where the magic carpet went.",
      task_vi: "Hỏi cô Nova 2 câu về nơi thảm bay đã đi.",
      question_starters: ["Where exactly did the carpet...?", "How long did you fly...?"],
      answer: ["Where exactly did the carpet fly?", "How long did you fly on the carpet?", "Who did you meet at the farm?"],
      audio_url: null
    },
    {
      id: 2,
      nova_says: "A friendly farmer ran out of his barn and waved at me! He gave me some fresh vegetables.",
      nova_says_vi: "Một người nông dân thân thiện chạy ra khỏi cái chuồng và vẫy tay với cô! Ông ấy cho cô một ít rau tươi.",
      task_en: "Ask Nova about the farmer she met.",
      task_vi: "Hỏi cô Nova về người nông dân cô ấy gặp.",
      question_starters: ["What did the farmer give...?", "How did the farmer feel...?"],
      answer: ["What did the farmer give you?", "How did the farmer feel when he saw you?", "What did you say to the farmer?"],
      audio_url: null
    },
    {
      id: 3,
      nova_says: "Then the carpet flew me to the coast. I saw beautiful dolphins swimming and jumping in the sea!",
      nova_says_vi: "Rồi tấm thảm bay cô đến bờ biển. Cô thấy những con cá heo đẹp bơi và nhảy trên biển!",
      task_en: "Ask Nova about the dolphins she saw at the coast.",
      task_vi: "Hỏi cô Nova về những con cá heo cô ấy thấy ở bờ biển.",
      question_starters: ["How many dolphins did you...?", "What did the dolphins do...?"],
      answer: ["How many dolphins did you see?", "What did the dolphins do when they saw you?", "Did the dolphins come close to you?"],
      audio_url: null
    },
    {
      id: 4,
      nova_says: "A pilot came and flew his plane next to my carpet! He waved and smiled at me.",
      nova_says_vi: "Một phi công đến và lái máy bay của anh ấy cạnh thảm bay của cô! Anh ấy vẫy tay và mỉm cười với cô.",
      task_en: "Ask Nova about the pilot she met.",
      task_vi: "Hỏi cô Nova về phi công cô ấy gặp.",
      question_starters: ["What did the pilot say...?", "Was the pilot flying fast...?"],
      answer: ["What did the pilot say to you?", "Was the pilot flying fast or slow?", "Where was the pilot going?"],
      audio_url: null
    },
    {
      id: 5,
      nova_says: "It was the best adventure! The carpet came home just before dinner and I felt so happy.",
      nova_says_vi: "Đó là cuộc phiêu lưu tuyệt nhất! Tấm thảm đã về nhà ngay trước bữa tối và cô cảm thấy rất vui.",
      task_en: "Ask Nova what was the best part of the trip.",
      task_vi: "Hỏi cô Nova phần nào là hay nhất của chuyến đi.",
      question_starters: ["What was the best part...?", "Would you go again...?"],
      answer: ["What was the best part of the trip?", "Would you go again on the magic carpet?", "What will you remember most?"],
      audio_url: null
    }
  ]
};
