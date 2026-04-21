export default {
  topic_talk_prompt: "Tell me about your favourite place to visit on weekends. What do you do there?",
  prompts: [
    {
      id: 1,
      nova_says: "My favourite weekend place is the beach.",
      nova_says_vi: "Nơi yêu thích của cô vào cuối tuần là bãi biển.",
      task_en: "Ask Nova WHAT her favourite weekend place is.",
      task_vi: "Hỏi cô Nova nơi yêu thích của cô vào cuối tuần là gì.",
      question_frame: "What ___ your favourite weekend place?",
      answer: ["What is your favourite weekend place?","What's your favourite weekend place?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I go to the beach every Saturday.",
      nova_says_vi: "Cô đi biển mỗi thứ Bảy.",
      task_en: "Ask Nova HOW OFTEN she goes to the beach.",
      task_vi: "Hỏi cô Nova cô đi biển bao lâu một lần.",
      question_frame: "How ___ do you go to the beach?",
      answer: ["How often do you go to the beach?"],
      hint: "often",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I usually swim and build sandcastles there.",
      nova_says_vi: "Cô thường bơi và xây lâu đài cát ở đó.",
      task_en: "Ask Nova WHAT she usually does at the beach.",
      task_vi: "Hỏi cô Nova cô thường làm gì ở biển.",
      question_frame: "What ___ you usually do at the beach?",
      answer: ["What do you usually do at the beach?"],
      hint: "do",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I go to the beach with my family.",
      nova_says_vi: "Cô đi biển với gia đình.",
      task_en: "Ask Nova WHO she goes to the beach with.",
      task_vi: "Hỏi cô Nova cô đi biển với ai.",
      question_frame: "___ do you go to the beach with?",
      answer: ["Who do you go to the beach with?"],
      hint: "Who",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "The beach near my house is very clean.",
      nova_says_vi: "Bãi biển gần nhà cô rất sạch sẽ.",
      task_en: "Ask Nova HOW the beach near her house is.",
      task_vi: "Hỏi cô Nova bãi biển gần nhà cô như thế nào.",
      question_frame: "___ is the beach near your house?",
      answer: ["How is the beach near your house?"],
      hint: "How",
      audio_url: null
    }
  ]
};
