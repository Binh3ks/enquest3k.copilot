// WEEK 09: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My city has a beautiful park.",
      nova_says_vi: "Thành phố của cô có một công viên đẹp.",
      context_en: "Nova talks about her city.",
      task_en: "Ask Nova WHAT her city has.",
      task_vi: "Hỏi cô Nova thành phố của cô có gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your city have?"
    },
    {
      nova_says: "The market is near my house.",
      nova_says_vi: "Chợ ở gần nhà của cô.",
      context_en: "Nova describes a nearby market.",
      task_en: "Ask Nova WHERE the market is.",
      task_vi: "Hỏi cô Nova chợ ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is the market?"
    },
    {
      nova_says: "My favorite place in the city is the library.",
      nova_says_vi: "Nơi yêu thích của cô trong thành phố là thư viện.",
      context_en: "Nova shares her favorite place.",
      task_en: "Ask Nova WHAT her favorite place in the city is.",
      task_vi: "Hỏi cô Nova nơi yêu thích của cô trong thành phố là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your favorite place in the city?"
    },
    {
      nova_says: "There are many restaurants near the park.",
      nova_says_vi: "Có nhiều nhà hàng gần công viên.",
      context_en: "Nova describes city restaurants.",
      task_en: "Ask Nova HOW MANY restaurants are near the park.",
      task_vi: "Hỏi cô Nova có bao nhiêu nhà hàng gần công viên.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ restaurants are near the park?"
    },
    {
      nova_says: "I go to the park every weekend.",
      nova_says_vi: "Cô đi công viên mỗi cuối tuần.",
      context_en: "Nova goes to the park.",
      task_en: "Ask Nova HOW OFTEN she goes to the park.",
      task_vi: "Hỏi cô Nova cô đi công viên bao lâu một lần.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ do you go to the park?"
    }
  ]
};