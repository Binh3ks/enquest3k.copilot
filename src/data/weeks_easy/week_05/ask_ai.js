export default {
    prompts: [
    {
      id: 1,
      nova_says: "I live in a white house.",
      nova_says_vi: "Cô sống trong nhà màu trắng.",
      task_en: "Ask Nova WHAT COLOR her house is.",
      task_vi: "Hỏi cô Nova nhà của cô màu gì.",

      context_en: "Nova watches TV in the living room.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
            question_frame: "What ___ is your house?",
      answer: ["What color is your house?"],
      hint: "color",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "My bedroom is upstairs.",
      nova_says_vi: "Phòng ngủ của cô ở tầng trên.",
      task_en: "Ask Nova WHERE her bedroom is.",
      task_vi: "Hỏi cô Nova phòng ngủ của cô ở đâu.",
      question_frame: "___ is your bedroom?",
      answer: ["Where is your bedroom?"],
      hint: "Where",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My favorite room is the kitchen.",
      nova_says_vi: "Phòng yêu thích của cô là nhà bếp.",
      task_en: "Ask Nova WHAT her favorite room is.",
      task_vi: "Hỏi cô Nova phòng yêu thích của cô là gì.",
      question_frame: "What ___ your favorite room?",
      answer: ["What is your favorite room?","What's your favorite room?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I have a small garden.",
      nova_says_vi: "Cô có một khu vườn nhỏ.",
      task_en: "Ask Nova if she has a garden.",
      task_vi: "Hỏi cô Nova cô có vườn không.",
      question_frame: "___ you have a garden?",
      answer: ["Do you have a garden?"],
      hint: "Do",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I watch TV in the living room.",
      nova_says_vi: "Cô xem TV ở phòng khách.",
      task_en: "Ask Nova WHERE she watches TV.",
      task_vi: "Hỏi cô Nova cô xem TV ở đâu.",
      question_frame: "___ do you watch TV?",
      answer: ["Where do you watch TV?"],
      hint: "Where",
      audio_url: null
    }
  ]
};
