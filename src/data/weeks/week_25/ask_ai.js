export default {
  topic_talk_prompt: "Tell me about how to make or do something you know. What are the steps?",
  prompts: [
    {
      id: 1,
      nova_says: "First, I mixed the flour and eggs together.",
      nova_says_vi: "Đầu tiên, cô đã trộn bột mì và trứng lại với nhau.",
      task_en: "Ask Nova WHAT she mixed together first.",
      task_vi: "Hỏi cô Nova đầu tiên cô đã trộn những gì lại với nhau.",
      question_word_bank: ["What","How","Why","When"],
      question_frame: "___ did you mix together first?",
      answer: ["What did you mix together first?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "Then I added sugar and butter to the mix.",
      nova_says_vi: "Sau đó cô đã thêm đường và bơ vào hỗn hợp.",
      task_en: "Ask Nova WHAT she added to the mix.",
      task_vi: "Hỏi cô Nova cô đã thêm gì vào hỗn hợp.",
      question_word_bank: ["What","How","Why","When"],
      question_frame: "___ did you add to the mix?",
      answer: ["What did you add to the mix?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I put the cake in the oven at 180 degrees.",
      nova_says_vi: "Cô đã cho bánh vào lò nướng ở 180 độ.",
      task_en: "Ask Nova HOW HOT she set the oven.",
      task_vi: "Hỏi cô Nova cô đã đặt lò nướng ở nhiệt độ bao nhiêu.",
      question_word_bank: ["How","What","When","Why"],
      question_frame: "___ hot did you set the oven?",
      answer: ["How hot did you set the oven?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "The cake baked for thirty minutes.",
      nova_says_vi: "Bánh nướng trong ba mươi phút.",
      task_en: "Ask Nova HOW LONG the cake baked.",
      task_vi: "Hỏi cô Nova bánh nướng bao lâu.",
      question_word_bank: ["How","When","What","Why"],
      question_frame: "___ long did the cake bake?",
      answer: ["How long did the cake bake?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "Finally, I decorated the cake with cream and strawberries.",
      nova_says_vi: "Cuối cùng, cô đã trang trí bánh bằng kem và dâu tây.",
      task_en: "Ask Nova HOW she decorated the cake.",
      task_vi: "Hỏi cô Nova cô đã trang trí bánh như thế nào.",
      question_word_bank: ["How","What","Why","When"],
      question_frame: "___ did you decorate the cake?",
      answer: ["How did you decorate the cake?"],
      hint_word: "How",
      audio_url: null
    }
  ]
};
