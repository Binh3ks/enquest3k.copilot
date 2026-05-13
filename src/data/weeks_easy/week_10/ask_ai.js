export default {
  topic_talk_prompt: "Tell me about an animal you like. What does it look like? Where does it live?",
  prompts: [
    {
      id: 1,
      nova_says: "My favorite animal is a horse.",
      nova_says_vi: "Con vật yêu thích của cô là con ngựa.",
      task_en: "Ask Nova WHAT her favorite animal is.",
      task_vi: "Hỏi cô Nova con vật yêu thích của cô là gì.",
      question_frame: "What ___ your favorite animal?",
      answer: ["What is your favorite animal?","What's your favorite animal?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "Horses live on farms.",
      nova_says_vi: "Ngựa sống ở trang trại.",
      task_en: "Ask Nova WHERE horses live.",
      task_vi: "Hỏi cô Nova ngựa sống ở đâu.",
      question_frame: "___ do horses live?",
      answer: ["Where do horses live?"],
      hint: "Where",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "Horses eat grass and carrots.",
      nova_says_vi: "Ngựa ăn cỏ và cà rốt.",
      task_en: "Ask Nova WHAT horses eat.",
      task_vi: "Hỏi cô Nova ngựa ăn gì.",
      question_frame: "What ___ horses eat?",
      answer: ["What do horses eat?"],
      hint: "do",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "Some horses are very fast runners.",
      nova_says_vi: "Một số con ngựa chạy rất nhanh.",
      task_en: "Ask Nova HOW FAST horses can run.",
      task_vi: "Hỏi cô Nova ngựa có thể chạy nhanh thế nào.",
      question_frame: "How ___ can horses run?",
      answer: ["How fast can horses run?"],
      hint: "fast",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "Farmers use horses to help with work.",
      nova_says_vi: "Nông dân dùng ngựa để giúp công việc.",
      task_en: "Ask Nova WHY farmers use horses.",
      task_vi: "Hỏi cô Nova tại sao nông dân dùng ngựa.",
      question_frame: "___ do farmers use horses?",
      answer: ["Why do farmers use horses?"],
      hint: "Why",
      audio_url: null
    }
  ]
};
