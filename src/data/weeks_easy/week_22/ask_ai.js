// WEEK 22: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "Something amazing happened at my school last Friday.",
      nova_says_vi: "Có điều gì đó tuyệt vời đã xảy ra ở trường cô thứ Sáu tuần trước.",
      context_en: "Something happened at school.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ happened at your school last Friday?"
    },
    {
      nova_says: "A famous singer came to perform at our school.",
      nova_says_vi: "Một ca sĩ nổi tiếng đã đến biểu diễn ở trường cô.",
      context_en: "A singer performed.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ came to perform at your school?"
    },
    {
      nova_says: "The concert was in the school hall.",
      nova_says_vi: "Buổi hòa nhạc diễn ra ở hội trường trường.",
      context_en: "The concert was in the hall.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was the concert?"
    },
    {
      nova_says: "Everybody loved the concert and clapped loudly.",
      nova_says_vi: "Mọi người đều yêu thích buổi hòa nhạc và vỗ tay thật to.",
      context_en: "Students loved the concert.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did the students feel about the concert?"
    },
    {
      nova_says: "The concert started at two o",
      nova_says_vi: "Buổi hòa nhạc bắt đầu lúc hai giờ chiều.",
      context_en: "The concert started at two.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did the concert start?"
    }
  ]
};