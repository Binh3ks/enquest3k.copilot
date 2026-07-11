// WEEK 36: Adventure Stories (Irregular Verbs)
// Ask AI Station — Easy Mode

export default {
  prompts: [
    {
      nova_says: "Marco Polo went on an adventure to China. He took 24 years to travel on the Silk Road!",
      nova_says_vi: "Marco Polo di phieu luu den Trung Quoc. Ong mat 24 nam de di tren Con duong To lua!",
      context_en: "Marco Polo went on a long adventure. Student asks about it.",
      question_word_bank: ["How long", "When did", "Where did", "What did"],
      question_frame: "___ it take Marco Polo to travel?",
      correctWord: "How long"
    },
    {
      nova_says: "Marco Polo went on an adventure. He saw many amazing things and wrote about them in a book.",
      nova_says_vi: "Marco Polo di phieu luu. Ong thay nhieu thu tuyet voi va viet ve chung trong mot cuon sach.",
      context_en: "Marco Polo wrote about his adventure. Student asks about his book.",
      question_word_bank: ["What did", "Who did", "Where did", "When did"],
      question_frame: "___ Marco Polo write about?",
      correctWord: "What did"
    },
    {
      nova_says: "Marco Polo met many interesting people on the Silk Road. He met kings, merchants, and artists.",
      nova_says_vi: "Marco Polo gap nhieu nguoi thu vi tren Con duong To lua. Ong gap vua, thuong nhan, va nghe si.",
      context_en: "Marco Polo met many people. Student asks who he met.",
      question_word_bank: ["Who did", "What did", "Where did", "How did"],
      question_frame: "___ Marco Polo meet?",
      correctWord: "Who did"
    },
    {
      nova_says: "When Marco Polo came back home, people read his book. His stories inspired many other explorers to start their own adventures.",
      nova_says_vi: "Khi Marco Polo tro ve nha, moi nguoi doc cuon sach cua ong. Cau chuyen cua ong truyen cam hung cho nhieu nha tham hiem khac.",
      context_en: "Marco Polo inspired other explorers. Student asks about his impact.",
      question_word_bank: ["What did", "How did", "Who did", "Why did"],
      question_frame: "___ Marco Polo stories do?",
      correctWord: "What did"
    }
  ]
};