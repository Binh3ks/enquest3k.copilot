export default {
    prompts: [
    {
      id: 1,
      nova_says: "My name is Nova and I'm from England.",
      nova_says_vi: "Tên cô là Nova và cô đến từ Anh.",
      task_en: "Ask Nova WHERE she is from.",
      task_vi: "Hỏi cô Nova cô đến từ đâu.",

      context_en: "Nova has one cat and two dogs.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
            question_frame: "___ are you from?",
      answer: ["Where are you from?"],
      hint: "Where",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I am a teacher and I love my job.",
      nova_says_vi: "Cô là giáo viên và cô yêu công việc của mình.",
      task_en: "Ask Nova WHAT her job is.",
      task_vi: "Hỏi cô Nova nghề nghiệp của cô là gì.",
      question_frame: "What ___ your job?",
      answer: ["What is your job?","What's your job?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I like reading books in my free time.",
      nova_says_vi: "Cô thích đọc sách lúc rảnh.",
      task_en: "Ask Nova WHAT she likes to do in her free time.",
      task_vi: "Hỏi cô Nova cô thích làm gì lúc rảnh.",
      question_frame: "What ___ you like to do in your free time?",
      answer: ["What do you like to do in your free time?"],
      hint: "do",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I have lived in this city for five years.",
      nova_says_vi: "Cô đã sống ở thành phố này được năm năm.",
      task_en: "Ask Nova HOW LONG she has lived in this city.",
      task_vi: "Hỏi cô Nova cô đã sống ở thành phố này bao lâu.",
      question_frame: "How ___ have you lived here?",
      answer: ["How long have you lived here?","How long have you lived in this city?"],
      hint: "long",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I have one cat and two dogs at home.",
      nova_says_vi: "Cô có một con mèo và hai con chó ở nhà.",
      task_en: "Ask Nova HOW MANY pets she has.",
      task_vi: "Hỏi cô Nova cô có bao nhiêu thú cưng.",
      question_frame: "How ___ pets do you have?",
      answer: ["How many pets do you have?"],
      hint: "many",
      audio_url: null
    }
  ]
};
