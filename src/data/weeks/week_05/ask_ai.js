// WEEK 05: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "I live in a big white house.",
      nova_says_vi: "Cô sống trong một ngôi nhà lớn màu trắng.",
      context_en: "I live in a big white house.",
      task_en: "Ask Nova WHAT her house is like.",
      task_vi: "Hỏi cô Nova nhà của cô như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your house like?"
    },
    {
      nova_says: "My bedroom is upstairs.",
      nova_says_vi: "Phòng ngủ của cô ở trên tầng.",
      context_en: "My bedroom is upstairs.",
      task_en: "Ask Nova WHERE her bedroom is.",
      task_vi: "Hỏi cô Nova phòng ngủ của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your bedroom?"
    },
    {
      nova_says: "My favorite room is the kitchen.",
      nova_says_vi: "Căn phòng yêu thích của cô là bếp.",
      context_en: "My favorite room is the kitchen.",
      task_en: "Ask Nova WHAT her favorite room is.",
      task_vi: "Hỏi cô Nova căn phòng yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your favorite room?"
    },
    {
      nova_says: "I have a garden behind my house.",
      nova_says_vi: "Cô có một khu vườn sau nhà.",
      context_en: "I have a garden behind my house.",
      task_en: "Ask Nova WHERE her garden is.",
      task_vi: "Hỏi cô Nova vườn của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your garden?"
    },
    {
      nova_says: "I watch TV in the living room.",
      nova_says_vi: "Cô xem TV trong phòng khách.",
      context_en: "I watch TV in the living room.",
      task_en: "Ask Nova WHERE she watches TV.",
      task_vi: "Hỏi cô Nova cô xem TV ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you watch TV?"
    }
  ]
};
