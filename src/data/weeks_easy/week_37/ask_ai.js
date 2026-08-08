export default {
  title: "Ask AI — Sports Day & Olympic History",
  prompts: [
    {
      id: 1,
      nova_says: "Leo and Maya used a physics formula in their relay race. Ask me what formula they used!",
      nova_says_vi: "Leo và Maya đã dùng một công thức vật lý trong cuộc đua tiếp sức. Hãy hỏi Nova xem công thức đó là gì!",
      context_en: "Ask Nova about the speed physics formula.",
      question_word_bank: ["What is", "Where is", "Why is", "How is"],
      question_frame: "___ the formula for velocity in the relay race?",
      correctWord: "What is",
      answer: "What is the formula for velocity in the relay race?"
    },
    {
      id: 2,
      nova_says: "Ancient Greek leaders declared something special before the Olympic games. Ask me what they declared!",
      nova_says_vi: "Các nhà lãnh đạo Hy Lạp cổ đại đã tuyên bố một điều đặc biệt trước giải đấu Olympic. Hãy hỏi Nova xem họ đã tuyên bố gì!",
      context_en: "Ask Nova what ancient leaders declared.",
      question_word_bank: ["What did", "Where did", "When did", "Why did"],
      question_frame: "___ ancient leaders declare before the Olympic games?",
      correctWord: "What did",
      answer: "What did ancient leaders declare before the Olympic games?"
    },
    {
      id: 3,
      nova_says: "Marathon runners from all over the world travel to Kenya to train. Ask me why they train in Iten!",
      nova_says_vi: "Các vận động viên marathon khắp thế giới đến Kenya tập luyện. Hãy hỏi Nova tại sao họ tập ở Iten!",
      context_en: "Ask Nova why marathon runners train in Kenya.",
      question_word_bank: ["Why do", "What do", "Where do", "When do"],
      question_frame: "___ marathon runners train at high altitude in Kenya?",
      correctWord: "Why do",
      answer: "Why do marathon runners train at high altitude in Kenya?"
    },
    {
      id: 4,
      nova_says: "Leo started sprinting early before reaching Maya in the exchange zone. Ask me how this helped their team!",
      nova_says_vi: "Leo đã bứt tốc sớm trước khi đến chỗ Maya ở vùng giao gậy. Hãy hỏi Nova xem điều này giúp đội như thế nào!",
      context_en: "Ask Nova how sprinting early saves time.",
      question_word_bank: ["How does", "What does", "Where does", "Who does"],
      question_frame: "___ sprinting early before the exchange zone save time?",
      correctWord: "How does",
      answer: "How does sprinting early before the exchange zone save time?"
    },
    {
      id: 5,
      nova_says: "Over two hundred nations parade together during the Olympic Opening Ceremony. Ask me when this happens!",
      nova_says_vi: "Hơn hai trăm quốc gia diễu hành cùng nhau trong Lễ khai mạc Olympic. Hãy hỏi Nova khi nào điều này diễn ra!",
      context_en: "Ask Nova when the ceremony takes place.",
      question_word_bank: ["When do", "What do", "Where do", "Why do"],
      question_frame: "___ athletes parade in traditional uniforms across the stadium?",
      correctWord: "When do",
      answer: "When do athletes parade in traditional uniforms across the stadium?"
    }
  ]
};
