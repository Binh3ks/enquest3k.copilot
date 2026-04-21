export default {
  topic_talk_prompt: "Tell me about an old place you know. How has it changed?",
  prompts: [
    {
      id: 1,
      nova_says: "There was a big tree here before, but now it's gone.",
      nova_says_vi: "Trước đây có một cây lớn ở đây, nhưng bây giờ không còn nữa.",
      task_en: "Ask Nova WHERE the big tree was.",
      task_vi: "Hỏi cô Nova cây lớn đó ở đâu.",
      question_word_bank: ["Where","What","When","Why"],
      question_frame: "___ was the big tree?",
      answer: ["Where was the big tree?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "This street was very quiet when I was young.",
      nova_says_vi: "Con đường này rất yên tĩnh khi cô còn nhỏ.",
      task_en: "Ask Nova HOW this street was when she was young.",
      task_vi: "Hỏi cô Nova con đường này như thế nào khi cô còn nhỏ.",
      question_word_bank: ["How","What","When","Where"],
      question_frame: "___ was this street when you were young?",
      answer: ["How was this street when you were young?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "There used to be a small market on this corner.",
      nova_says_vi: "Trước đây có một cái chợ nhỏ ở góc đường này.",
      task_en: "Ask Nova WHAT used to be on this corner.",
      task_vi: "Hỏi cô Nova trước đây có gì ở góc đường này.",
      question_word_bank: ["What","Where","When","Who"],
      question_frame: "___ used to be on this corner?",
      answer: ["What used to be on this corner?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "The old school building was knocked down last year.",
      nova_says_vi: "Tòa nhà trường cũ bị phá dỡ năm ngoái.",
      task_en: "Ask Nova WHEN the old school building was knocked down.",
      task_vi: "Hỏi cô Nova tòa nhà trường cũ bị phá dỡ khi nào.",
      question_word_bank: ["When","Why","Where","Who"],
      question_frame: "___ was the old school building knocked down?",
      answer: ["When was the old school building knocked down?"],
      hint_word: "When",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "People moved the market because the road became too busy.",
      nova_says_vi: "Người ta chuyển chợ vì đường trở nên quá đông.",
      task_en: "Ask Nova WHY people moved the market.",
      task_vi: "Hỏi cô Nova tại sao người ta chuyển chợ đi.",
      question_word_bank: ["Why","When","What","How"],
      question_frame: "___ did people move the market?",
      answer: ["Why did people move the market?"],
      hint_word: "Why",
      audio_url: null
    }
  ]
};
