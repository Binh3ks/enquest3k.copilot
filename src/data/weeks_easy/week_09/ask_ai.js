// WEEK 09: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My city has a beautiful park.",
      nova_says_vi: "Thành phố của cô có một công viên đẹp.",
      context_en: "My city has a beautiful park.",
      task_en: "Ask Nova WHAT her city has.",
      task_vi: "Hỏi cô Nova thành phố của cô có gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does your city have?",
      correctWord: "WHAT"
    },
    {
      nova_says: "The market is near my house.",
      nova_says_vi: "Chợ ở gần nhà tôi.",
      context_en: "The market is near my house.",
      task_en: "Ask Nova WHERE the market is.",
      task_vi: "Hỏi cô Nova chợ ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is the market?",
      correctWord: "WHERE"
    },
    {
      nova_says: "My favorite place in the city is the library.",
      nova_says_vi: "Nơi yêu thích của cô ở thành phố là thư viện.",
      context_en: "My favorite place in the city is the library.",
      task_en: "Ask Nova WHAT her favorite place is.",
      task_vi: "Hỏi cô Nova nơi yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your favorite place in the city?",
      correctWord: "WHAT"
    },
    {
      nova_says: "There are many restaurants near the park.",
      nova_says_vi: "Có nhiều nhà hàng gần công viên.",
      context_en: "There are many restaurants near the park.",
      task_en: "Ask Nova HOW MANY restaurants are near the park.",
      task_vi: "Hỏi cô Nova có bao nhiêu nhà hàng gần công viên.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ restaurants are near the park?",
      correctWord: "HOW"
    },
    {
      nova_says: "I go to the park every weekend.",
      nova_says_vi: "Tôi đi công viên vào mỗi cuối tuần.",
      context_en: "I go to the park every weekend.",
      task_en: "Ask Nova WHEN she goes to the park.",
      task_vi: "Hỏi cô Nova cô đi công viên khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you go to the park?",
      correctWord: "WHEN"
    }
  ]
};
