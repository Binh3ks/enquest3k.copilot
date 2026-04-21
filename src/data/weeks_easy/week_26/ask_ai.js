export default {
  topic_talk_prompt: "Tell me about a funny or interesting story you know or read.",
  prompts: [
    {
      id: 1,
      nova_says: "In the story, a fox tried to trick a crow.",
      nova_says_vi: "Trong câu chuyện, một con cáo đã cố lừa một con quạ.",
      task_en: "Ask Nova WHO tried to trick the crow.",
      task_vi: "Hỏi cô Nova ai đã cố lừa con quạ.",
      question_word_bank: ["Who","What","Why"],
      question_frame: "___ tried to trick the crow?",
      answer: ["Who tried to trick the crow?"],
      hint_word: "Who",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The fox wanted to get the cheese the crow was holding.",
      nova_says_vi: "Con cáo muốn lấy miếng pho mát mà con quạ đang giữ.",
      task_en: "Ask Nova WHAT the fox wanted to get.",
      task_vi: "Hỏi cô Nova con cáo muốn lấy gì.",
      question_word_bank: ["What","Who","Why"],
      question_frame: "___ did the fox want to get?",
      answer: ["What did the fox want to get?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "The fox said the crow had a beautiful voice.",
      nova_says_vi: "Con cáo nói con quạ có giọng hát hay.",
      task_en: "Ask Nova WHAT the fox said to the crow.",
      task_vi: "Hỏi cô Nova con cáo đã nói gì với con quạ.",
      question_word_bank: ["What","Who","Why"],
      question_frame: "___ did the fox say to the crow?",
      answer: ["What did the fox say to the crow?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "When the crow opened its mouth to sing, the cheese fell.",
      nova_says_vi: "Khi con quạ mở miệng để hát, miếng pho mát rơi xuống.",
      task_en: "Ask Nova WHAT happened when the crow opened its mouth.",
      task_vi: "Hỏi cô Nova điều gì đã xảy ra khi con quạ mở miệng.",
      question_word_bank: ["What","Why","When"],
      question_frame: "___ happened when the crow opened its mouth?",
      answer: ["What happened when the crow opened its mouth?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "The fox tricked the crow because the crow was too proud.",
      nova_says_vi: "Con cáo lừa được con quạ vì con quạ quá tự kiêu.",
      task_en: "Ask Nova WHY the fox was able to trick the crow.",
      task_vi: "Hỏi cô Nova tại sao con cáo có thể lừa được con quạ.",
      question_word_bank: ["Why","How","When"],
      question_frame: "___ was the fox able to trick the crow?",
      answer: ["Why was the fox able to trick the crow?"],
      hint_word: "Why",
      audio_url: null
    }
  ]
};
