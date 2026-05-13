export default {
  topic_talk_prompt: "Tell me about your school bag. What is inside? What colors do you see?",
  prompts: [
    {
      id: 1,
      nova_says: "I have a red bag.",
      nova_says_vi: "Cô có một cái cặp màu đỏ.",
      task_en: "Ask Nova WHAT COLOR her bag is.",
      task_vi: "Hỏi cô Nova cặp của cô màu gì.",
      question_frame: "What ___ is your bag?",
      answer: ["What color is your bag?"],
      hint: "color",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "My pen is here.",
      nova_says_vi: "Cái bút của cô ở đây.",
      task_en: "Ask Nova WHERE her pen is.",
      task_vi: "Hỏi cô Nova bút của cô ở đâu.",
      question_frame: "Where ___ your pen?",
      answer: ["Where is your pen?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "This is my book.",
      nova_says_vi: "Đây là sách của cô.",
      task_en: "Ask Nova if this is HER book.",
      task_vi: "Hỏi cô Nova đây có phải sách của cô không.",
      question_frame: "___ this your book?",
      answer: ["Is this your book?"],
      hint: "Is",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I have some crayons.",
      nova_says_vi: "Cô có vài cái bút sáp.",
      task_en: "Ask Nova if you can use her crayons.",
      task_vi: "Hỏi cô Nova bạn có thể dùng bút sáp không.",
      question_frame: "___ I use your crayons?",
      answer: ["Can I use your crayons?"],
      hint: "Can",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I like my school.",
      nova_says_vi: "Cô thích trường của mình.",
      task_en: "Ask Nova if she likes school.",
      task_vi: "Hỏi cô Nova cô có thích trường không.",
      question_frame: "___ you like school?",
      answer: ["Do you like school?"],
      hint: "Do",
      audio_url: null
    }
  ]
};
