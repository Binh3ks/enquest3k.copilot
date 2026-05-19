// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Ask AI Station — Easy Mode
// W29+ Schema: prompts[] with nova_says, task_en/vi, question_starters[], answer[]

export default {
  title_en: "Ask Nova: The Accident",
  title_vi: "Hỏi Nova: Tai Nạn",
  audio_url: null,
  prompts: [
    {
      id: 1,
      context_en: "Nova fell down in the playground and hurt her knee.",
      nova_says: "Yesterday, I fell down in the playground and hurt my knee!",
      nova_says_vi: "Hôm qua, tôi ngã trong sân chơi và đau đầu gối!",
      task_en: "Ask Nova a question about what she hurt when she fell.",
      task_vi: "Hỏi Nova một câu hỏi về chỗ cô ấy bị đau khi ngã.",
      question_starters: [
        "What did you hurt?",
        "Where did it hurt?"
      ],
      answer: [
        "I hurt my knee when I fell down.",
        "My knee hurt a lot after I fell in the playground."
      ]
    },
    {
      id: 2,
      context_en: "Nova broke her mum's favourite cup this morning.",
      nova_says: "I broke my mum's favourite cup this morning. It was an accident!",
      nova_says_vi: "Tôi làm vỡ chiếc cốc yêu thích của mẹ vào sáng nay. Đó là một tai nạn!",
      task_en: "Ask Nova a question about what she broke.",
      task_vi: "Hỏi Nova một câu hỏi về cái gì cô ấy đã làm vỡ.",
      question_starters: [
        "What did you break?",
        "Did you break the cup?"
      ],
      answer: [
        "I broke my mum's favourite cup.",
        "I accidentally broke a cup this morning — it was an accident!"
      ]
    },
    {
      id: 3,
      context_en: "The nurse put a cold pack on Nova's knee and she felt better.",
      nova_says: "The nurse put a cold pack on my knee and I felt better!",
      nova_says_vi: "Y tá đặt túi chườm lạnh lên đầu gối tôi và tôi cảm thấy tốt hơn!",
      task_en: "Ask Nova a question about what the nurse did to help.",
      task_vi: "Hỏi Nova một câu hỏi về việc y tá đã làm gì để giúp.",
      question_starters: [
        "What did the nurse do?",
        "Did the nurse help you?"
      ],
      answer: [
        "The nurse put a cold pack on my knee to help it feel better.",
        "Yes, the nurse put a cold pack on my knee and I felt better after that."
      ]
    },
    {
      id: 4,
      context_en: "Nova forgot her homework at home and her teacher was sad.",
      nova_says: "I forgot my homework at home and my teacher was sad!",
      nova_says_vi: "Tôi quên bài tập ở nhà và cô giáo buồn!",
      task_en: "Ask Nova a question about what she forgot.",
      task_vi: "Hỏi Nova một câu hỏi về việc cô ấy đã quên gì.",
      question_starters: [
        "What did you forget?",
        "Did you forget your homework?"
      ],
      answer: [
        "I forgot my homework at home.",
        "I forgot to bring my homework to school."
      ]
    },
    {
      id: 5,
      context_en: "Nova learned an important lesson about walking carefully.",
      nova_says: "I learned an important lesson: always walk carefully in the corridor!",
      nova_says_vi: "Tôi đã học được một bài học quan trọng: luôn đi cẩn thận trong hành lang!",
      task_en: "Ask Nova a question about what lesson she learned.",
      task_vi: "Hỏi Nova một câu hỏi về bài học cô ấy đã học được.",
      question_starters: [
        "What lesson did you learn?",
        "Did you learn to be careful?"
      ],
      answer: [
        "I learned to always walk carefully in the corridor.",
        "I learned that running is dangerous and walking carefully is important."
      ]
    }
  ]
};
