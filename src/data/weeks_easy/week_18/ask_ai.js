export default {
  prompts: [
    { 
      id: 1, 
      context_vi: "Bạn đang đóng vai Thám tử Conan. Bạn thấy một bạn nhỏ đang khóc. Hãy hỏi xem Vấn đề của bạn ấy là gì.", 
      context_en: "You are Detective Conan. You see a crying child. Ask what the problem is.", 
      answer: ["What is the problem?", "What is wrong?"], 
      hint: "What is..." 
    },
    { 
      id: 2, 
      context_vi: "Bạn muốn giúp đỡ. Hãy hỏi xem bạn có thể tìm Giải pháp không.", 
      context_en: "You want to help. Ask if you can find a solution.", 
      answer: ["Can I find a solution?", "Can I help you?"], 
      hint: "Can I..." 
    },
    { 
      id: 3, 
      context_vi: "Bạn nhỏ bị lạc mất chó. Hãy hỏi xem chú chó tên là gì.", 
      context_en: "The child lost their dog. Ask what the dog's name is.", 
      answer: ["What is the dog's name?", "What is his name?"], 
      hint: "What is..." 
    },
    { 
      id: 4, 
      context_vi: "Bạn muốn biết chú chó trông như thế nào (to hay nhỏ).", 
      context_en: "You want to know if the dog is big or small.", 
      answer: ["Is the dog big or small?", "What does he look like?"], 
      hint: "Is the dog..." 
    },
    { 
      id: 5, 
      context_vi: "Cuối cùng, bạn đã tìm thấy chú chó! Hãy hỏi bạn nhỏ xem bạn ấy có vui không.", 
      context_en: "Finally, you found the dog! Ask the child if they are happy.", 
      answer: ["Are you happy?", "Are you happy now?"], 
      hint: "Are you..." 
    }
  ]
};
