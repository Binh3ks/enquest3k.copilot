export default {
  topic_talk_prompt: "Tell me about a time you felt a strong emotion. What happened? How did you feel?",
  prompts: [
    {
      id: 1,
      nova_says: "I felt very excited on the day of the school trip.",
      nova_says_vi: "Cô cảm thấy rất phấn khích vào ngày đi dã ngoại.",
      task_en: "Ask Nova HOW she felt on the day of the school trip.",
      task_vi: "Hỏi cô Nova cô cảm thấy thế nào vào ngày đi dã ngoại.",
      question_word_bank: ["How","Why","What","When"],
      question_frame: "___ did you feel on the day of the school trip?",
      answer: ["How did you feel on the day of the school trip?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I was nervous before my piano recital.",
      nova_says_vi: "Cô đã hồi hộp trước buổi biểu diễn đàn.",
      task_en: "Ask Nova WHY she was nervous before the recital.",
      task_vi: "Hỏi cô Nova tại sao cô hồi hộp trước buổi biểu diễn.",
      question_word_bank: ["Why","How","When","What"],
      question_frame: "___ were you nervous before the recital?",
      answer: ["Why were you nervous before the recital?"],
      hint_word: "Why",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I was surprised when my friends threw me a party.",
      nova_says_vi: "Cô đã bị bất ngờ khi bạn bè tổ chức tiệc cho cô.",
      task_en: "Ask Nova WHAT surprised her.",
      task_vi: "Hỏi cô Nova điều gì đã làm cô ngạc nhiên.",
      question_word_bank: ["What","Who","Why","How"],
      question_frame: "___ surprised you?",
      answer: ["What surprised you?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I felt proud when I got full marks on my test.",
      nova_says_vi: "Cô cảm thấy tự hào khi được điểm tuyệt đối trong bài kiểm tra.",
      task_en: "Ask Nova WHEN she felt proud.",
      task_vi: "Hỏi cô Nova cô cảm thấy tự hào khi nào.",
      question_word_bank: ["When","Why","How","What"],
      question_frame: "___ did you feel proud?",
      answer: ["When did you feel proud?"],
      hint_word: "When",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I felt sad when my best friend moved to another city.",
      nova_says_vi: "Cô cảm thấy buồn khi người bạn thân chuyển đến thành phố khác.",
      task_en: "Ask Nova WHY she felt sad.",
      task_vi: "Hỏi cô Nova tại sao cô cảm thấy buồn.",
      question_word_bank: ["Why","When","How","What"],
      question_frame: "___ did you feel sad?",
      answer: ["Why did you feel sad?"],
      hint_word: "Why",
      audio_url: null
    }
  ]
};
