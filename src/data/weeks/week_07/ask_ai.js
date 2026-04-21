export default {
  topic_talk_prompt: "Tell me about things in your school bag. What do you need at school?",
  prompts: [
    {
      id: 1,
      nova_says: "I have five books in my bag.",
      nova_says_vi: "Cô có năm quyển sách trong cặp.",
      task_en: "Ask Nova HOW MANY books she has in her bag.",
      task_vi: "Hỏi cô Nova cô có bao nhiêu sách trong cặp.",
      question_frame: "How ___ books do you have?",
      answer: ["How many books do you have?","How many books do you have in your bag?"],
      hint: "many",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "My favourite colour pencil is blue.",
      nova_says_vi: "Màu bút chì yêu thích của cô là màu xanh.",
      task_en: "Ask Nova WHAT her favourite colour pencil is.",
      task_vi: "Hỏi cô Nova bút chì màu yêu thích của cô là gì.",
      question_frame: "What ___ your favourite colour pencil?",
      answer: ["What is your favourite colour pencil?","What's your favourite colour pencil?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I don't have scissors in my bag today.",
      nova_says_vi: "Hôm nay cô không có kéo trong cặp.",
      task_en: "Ask Nova if she has scissors in her bag.",
      task_vi: "Hỏi cô Nova cô có kéo trong cặp không.",
      question_frame: "___ you have scissors in your bag?",
      answer: ["Do you have scissors in your bag?"],
      hint: "Do",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I use a ruler to draw straight lines.",
      nova_says_vi: "Cô dùng thước kẻ để vẽ đường thẳng.",
      task_en: "Ask Nova WHY she uses a ruler.",
      task_vi: "Hỏi cô Nova tại sao cô dùng thước kẻ.",
      question_frame: "___ do you use a ruler?",
      answer: ["Why do you use a ruler?"],
      hint: "Why",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I put my homework in my bag every morning.",
      nova_says_vi: "Cô bỏ bài tập vào cặp mỗi sáng.",
      task_en: "Ask Nova WHEN she puts her homework in her bag.",
      task_vi: "Hỏi cô Nova cô bỏ bài tập vào cặp khi nào.",
      question_frame: "___ do you put your homework in your bag?",
      answer: ["When do you put your homework in your bag?"],
      hint: "When",
      audio_url: null
    }
  ]
};
