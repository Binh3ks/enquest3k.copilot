// WEEK 05: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I live in a white house.",
      nova_says_vi: "Cô sống trong nhà màu trắng.",
      context_en: "Nova describes her house.",
      task_en: "Ask Nova WHAT COLOR her house is.",
      task_vi: "Hỏi cô Nova nhà của cô màu gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ is your house?"
    },
    {
      nova_says: "My bedroom is upstairs.",
      nova_says_vi: "Phòng ngủ của cô ở tầng trên.",
      context_en: "Nova talks about her bedroom.",
      task_en: "Ask Nova WHERE her bedroom is.",
      task_vi: "Hỏi cô Nova phòng ngủ của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your bedroom?"
    },
    {
      nova_says: "My favorite room is the kitchen.",
      nova_says_vi: "Phòng yêu thích của cô là nhà bếp.",
      context_en: "Nova describes her favorite room.",
      task_en: "Ask Nova WHAT her favorite room is.",
      task_vi: "Hỏi cô Nova phòng yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your favorite room?"
    },
    {
      nova_says: "I have a small garden.",
      nova_says_vi: "Cô có một khu vườn nhỏ.",
      context_en: "Nova has a garden.",
      task_en: "Ask Nova if she has a garden.",
      task_vi: "Hỏi cô Nova cô có vườn không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ you have a garden?"
    },
    {
      nova_says: "I watch TV in the living room.",
      nova_says_vi: "Cô xem TV ở phòng khách.",
      context_en: "Nova watches TV in the living room.",
      task_en: "Ask Nova WHERE she watches TV.",
      task_vi: "Hỏi cô Nova cô xem TV ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you watch TV?"
    }
  ]
};