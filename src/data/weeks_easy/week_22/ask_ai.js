export default {
  topic_talk_prompt: "Tell me about something that happened in the past that was exciting or memorable.",
  prompts: [
    {
      id: 1,
      nova_says: "Something amazing happened at my school last Friday.",
      nova_says_vi: "Có điều gì đó tuyệt vời đã xảy ra ở trường cô thứ Sáu tuần trước.",
      task_en: "Ask Nova WHAT happened at her school last Friday.",
      task_vi: "Hỏi cô Nova chuyện gì đã xảy ra ở trường cô thứ Sáu tuần trước.",
      question_word_bank: ["What","When","Where"],
      question_frame: "___ happened at your school last Friday?",
      answer: ["What happened at your school last Friday?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "A famous singer came to perform at our school.",
      nova_says_vi: "Một ca sĩ nổi tiếng đã đến biểu diễn ở trường cô.",
      task_en: "Ask Nova WHO came to perform at the school.",
      task_vi: "Hỏi cô Nova ai đã đến biểu diễn ở trường.",
      question_word_bank: ["Who","What","Why"],
      question_frame: "___ came to perform at your school?",
      answer: ["Who came to perform at your school?"],
      hint_word: "Who",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "The concert was in the school hall.",
      nova_says_vi: "Buổi hòa nhạc diễn ra ở hội trường trường.",
      task_en: "Ask Nova WHERE the concert was.",
      task_vi: "Hỏi cô Nova buổi hòa nhạc ở đâu.",
      question_word_bank: ["Where","When","What"],
      question_frame: "___ was the concert?",
      answer: ["Where was the concert?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "Everybody loved the concert and clapped loudly.",
      nova_says_vi: "Mọi người đều yêu thích buổi hòa nhạc và vỗ tay thật to.",
      task_en: "Ask Nova HOW the students felt about the concert.",
      task_vi: "Hỏi cô Nova học sinh cảm thấy thế nào về buổi hòa nhạc.",
      question_word_bank: ["How","Why","What"],
      question_frame: "___ did the students feel about the concert?",
      answer: ["How did the students feel about the concert?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "The concert started at two o'clock in the afternoon.",
      nova_says_vi: "Buổi hòa nhạc bắt đầu lúc hai giờ chiều.",
      task_en: "Ask Nova WHEN the concert started.",
      task_vi: "Hỏi cô Nova buổi hòa nhạc bắt đầu khi nào.",
      question_word_bank: ["When","Where","What"],
      question_frame: "___ did the concert start?",
      answer: ["When did the concert start?"],
      hint_word: "When",
      audio_url: null
    }
  ]
};
