export default {
  topic_talk_prompt: "Tell me about the weather where you live. What seasons do you have?",
  prompts: [
    {
      id: 1,
      nova_says: "It's very hot and sunny today.",
      nova_says_vi: "Hôm nay trời rất nóng và nắng.",
      task_en: "Ask Nova HOW the weather is today.",
      task_vi: "Hỏi cô Nova hôm nay thời tiết như thế nào.",
      question_word_bank: ["How","What","Why"],
      question_frame: "___ is the weather today?",
      answer: ["How is the weather today?","What is the weather like today?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I'm wearing a sun hat because it's so bright.",
      nova_says_vi: "Cô đang đội mũ vì trời quá sáng.",
      task_en: "Ask Nova WHY she is wearing a sun hat.",
      task_vi: "Hỏi cô Nova tại sao cô đang đội mũ.",
      question_word_bank: ["Why","What","How"],
      question_frame: "___ are you wearing a sun hat?",
      answer: ["Why are you wearing a sun hat?"],
      hint_word: "Why",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My favorite season is winter.",
      nova_says_vi: "Mùa yêu thích của cô là mùa đông.",
      task_en: "Ask Nova WHAT her favorite season is.",
      task_vi: "Hỏi cô Nova mùa yêu thích của cô là gì.",
      question_word_bank: ["What","When","How"],
      question_frame: "___ is your favorite season?",
      answer: ["What is your favorite season?","What's your favorite season?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "It snows a lot in my hometown in winter.",
      nova_says_vi: "Ở quê hương cô tuyết rơi nhiều vào mùa đông.",
      task_en: "Ask Nova HOW MUCH it snows in her hometown.",
      task_vi: "Hỏi cô Nova tuyết rơi nhiều như thế nào ở quê hương cô.",
      question_word_bank: ["How","What","Where"],
      question_frame: "___ much does it snow there?",
      answer: ["How much does it snow there?","How much does it snow in your hometown?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I like to drink hot chocolate when it's cold.",
      nova_says_vi: "Cô thích uống ca cao nóng khi trời lạnh.",
      task_en: "Ask Nova WHAT she likes to drink when it's cold.",
      task_vi: "Hỏi cô Nova cô thích uống gì khi trời lạnh.",
      question_word_bank: ["What","When","Why"],
      question_frame: "___ do you like to drink when it's cold?",
      answer: ["What do you like to drink when it's cold?"],
      hint_word: "What",
      audio_url: null
    }
  ]
};
