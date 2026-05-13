export default {
  topic_talk_prompt: "Tell me about an artwork or drawing you made. What did it show?",
  prompts: [
    {
      id: 1,
      nova_says: "I drew a picture of a sunset over the ocean last week.",
      nova_says_vi: "Tuần trước cô đã vẽ một bức tranh về hoàng hôn trên biển.",
      task_en: "Ask Nova WHAT she drew last week.",
      task_vi: "Hỏi cô Nova tuần trước cô đã vẽ gì.",
      question_word_bank: ["What","When","Where","How"],
      question_frame: "___ did you draw last week?",
      answer: ["What did you draw last week?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I used watercolor paints to make the picture.",
      nova_says_vi: "Cô đã dùng màu nước để vẽ bức tranh.",
      task_en: "Ask Nova WHAT kind of paint she used.",
      task_vi: "Hỏi cô Nova cô đã dùng loại sơn gì.",
      question_word_bank: ["What","Which","How","Why"],
      question_frame: "___ kind of paint did you use?",
      answer: ["What kind of paint did you use?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "The sky in my picture was orange and pink.",
      nova_says_vi: "Bầu trời trong tranh của cô có màu cam và hồng.",
      task_en: "Ask Nova WHAT colors the sky was in her picture.",
      task_vi: "Hỏi cô Nova bầu trời trong tranh của cô có những màu gì.",
      question_word_bank: ["What","How","Why","Where"],
      question_frame: "___ colors was the sky in your picture?",
      answer: ["What colors was the sky in your picture?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I spent two hours making the painting.",
      nova_says_vi: "Cô đã dành hai tiếng để vẽ bức tranh.",
      task_en: "Ask Nova HOW LONG she spent making the painting.",
      task_vi: "Hỏi cô Nova cô đã dành bao lâu để vẽ bức tranh.",
      question_word_bank: ["How","When","What","Why"],
      question_frame: "___ long did you spend making the painting?",
      answer: ["How long did you spend making the painting?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I gave the painting to my mum as a gift.",
      nova_says_vi: "Cô đã tặng bức tranh cho mẹ như một món quà.",
      task_en: "Ask Nova WHO she gave the painting to.",
      task_vi: "Hỏi cô Nova cô đã tặng bức tranh cho ai.",
      question_word_bank: ["Who","What","Why","When"],
      question_frame: "___ did you give the painting to?",
      answer: ["Who did you give the painting to?"],
      hint_word: "Who",
      audio_url: null
    }
  ]
};
