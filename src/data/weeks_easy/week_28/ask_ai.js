export default {
  topic_talk_prompt: "Tell me about a story or book you've read. What happened? Who were the characters? How did they travel — by car, bus, train, or boat?",
  prompts: [
    {
      id: 1,
      nova_says: "I just finished reading a story about a young girl who found a magic key.",
      nova_says_vi: "Cô vừa đọc xong một câu chuyện về một cô gái nhỏ tìm thấy chiếc chìa khóa ma thuật.",
      task_en: "Ask Nova WHAT the story was about.",
      task_vi: "Hỏi cô Nova câu chuyện đó kể về điều gì.",
      question_word_bank: ["What","Who","Where"],
      question_frame: "___ was the story about?",
      answer: ["What was the story about?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The girl found the key under an old tree in the forest.",
      nova_says_vi: "Cô gái tìm thấy chìa khóa dưới một cái cây cũ trong rừng.",
      task_en: "Ask Nova WHERE the girl found the key.",
      task_vi: "Hỏi cô Nova cô gái tìm thấy chìa khóa ở đâu.",
      question_word_bank: ["Where","What","Who"],
      question_frame: "___ did the girl find the key?",
      answer: ["Where did the girl find the key?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "The magic key could open a secret door to a beautiful garden.",
      nova_says_vi: "Chiếc chìa khóa ma thuật có thể mở cánh cửa bí mật dẫn vào khu vườn đẹp.",
      task_en: "Ask Nova WHAT the magic key could do.",
      task_vi: "Hỏi cô Nova chiếc chìa khóa ma thuật có thể làm gì.",
      question_word_bank: ["What","Why","How"],
      question_frame: "___ could the magic key do?",
      answer: ["What could the magic key do?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "At the end of the story, the girl shared the garden with her whole village.",
      nova_says_vi: "Cuối câu chuyện, cô gái chia sẻ khu vườn với cả làng.",
      task_en: "Ask Nova WHAT the girl did with the garden at the end.",
      task_vi: "Hỏi cô Nova cuối truyện cô gái đã làm gì với khu vườn.",
      question_word_bank: ["What","Who","How"],
      question_frame: "___ did the girl do with the garden?",
      answer: ["What did the girl do with the garden?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "The story teaches us that sharing is more important than keeping things for yourself.",
      nova_says_vi: "Câu chuyện dạy chúng ta rằng chia sẻ quan trọng hơn là giữ mọi thứ cho bản thân.",
      task_en: "Ask Nova WHAT the story teaches us.",
      task_vi: "Hỏi cô Nova câu chuyện dạy chúng ta điều gì.",
      question_word_bank: ["What","Why","How"],
      question_frame: "___ does the story teach us?",
      answer: ["What does the story teach us?"],
      hint_word: "What",
      audio_url: null
    }
  ]
};
