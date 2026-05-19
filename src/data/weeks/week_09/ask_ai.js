export default {
    prompts: [
    {
      id: 1,
      nova_says: "My city has a beautiful park.",
      nova_says_vi: "Thành phố của cô có một công viên đẹp.",
      task_en: "Ask Nova WHAT her city has.",
      task_vi: "Hỏi cô Nova thành phố của cô có gì.",

      context_en: "Nova goes to the park on weekends.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
            question_frame: "What ___ your city have?",
      answer: ["What does your city have?"],
      hint: "does",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The market is near my house.",
      nova_says_vi: "Chợ ở gần nhà của cô.",
      task_en: "Ask Nova WHERE the market is.",
      task_vi: "Hỏi cô Nova chợ ở đâu.",
      question_frame: "___ is the market?",
      answer: ["Where is the market?"],
      hint: "Where",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My favorite place in the city is the library.",
      nova_says_vi: "Nơi yêu thích của cô trong thành phố là thư viện.",
      task_en: "Ask Nova WHAT her favorite place in the city is.",
      task_vi: "Hỏi cô Nova nơi yêu thích của cô trong thành phố là gì.",
      question_frame: "What ___ your favorite place in the city?",
      answer: ["What is your favorite place in the city?","What's your favorite place in the city?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "There are many restaurants near the park.",
      nova_says_vi: "Có nhiều nhà hàng gần công viên.",
      task_en: "Ask Nova HOW MANY restaurants are near the park.",
      task_vi: "Hỏi cô Nova có bao nhiêu nhà hàng gần công viên.",
      question_frame: "How ___ restaurants are near the park?",
      answer: ["How many restaurants are near the park?"],
      hint: "many",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I go to the park every weekend.",
      nova_says_vi: "Cô đi công viên mỗi cuối tuần.",
      task_en: "Ask Nova HOW OFTEN she goes to the park.",
      task_vi: "Hỏi cô Nova cô đi công viên bao lâu một lần.",
      question_frame: "How ___ do you go to the park?",
      answer: ["How often do you go to the park?"],
      hint: "often",
      audio_url: null
    }
  ]
};
