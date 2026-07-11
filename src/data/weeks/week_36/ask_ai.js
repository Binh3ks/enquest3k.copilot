// WEEK 36: Adventure Stories (Irregular Verbs)
// Ask AI Station — Advanced Mode

export default {
  prompts: [
    {
      nova_says: "Marco Polo was a famous explorer from Venice, Italy. He went to China on the Silk Road and came back after 24 years.",
      nova_says_vi: "Marco Polo la mot nha tham hiem noi tieng tu Venice, Y. Ong di den Trung Quoc tren Con duong To lua va tro ve sau 24 nam.",
      context_en: "Marco Polo is the main character of our story. Student asks about his journey.",
      question_word_bank: ["When did", "How long did", "Where did", "Why did"],
      question_frame: "___ Marco Polo go?",
      correctWord: "When did"
    },
    {
      nova_says: "Marco Polo went on an adventure on the Silk Road. He saw amazing things and met many interesting people from different countries.",
      nova_says_vi: "Marco Polo di phieu luu tren Con duong To lua. Ong nhin thay nhung thu tuyet voi va gap rat nhieu nguoi thu vi.",
      context_en: "Marco Polo met many people. Student asks about who he met.",
      question_word_bank: ["Who did", "What did", "How did", "Where did"],
      question_frame: "___ Marco Polo meet?",
      correctWord: "Who did"
    },
    {
      nova_says: "The Silk Road connected Asia and Europe. Traders carried silk, spices, and other goods along this route for many centuries.",
      nova_says_vi: "Con duong To lua ket noi Chau A va Chau Au. Thuong nhan mang lua, gia vi va hang hoa khac theo tuyen duong nay trong nhieu the ky.",
      context_en: "The Silk Road was very important. Student asks about this famous trade route.",
      question_word_bank: ["What did", "When was", "How was", "Where is"],
      question_frame: "___ the Silk Road?",
      correctWord: "What did"
    },
    {
      nova_says: "Explorers went on dangerous journeys to find new places. They met new people and wrote about everything they saw.",
      nova_says_vi: "Cac nha tham hiem di nhung hanh trinh nguy hiem de tim noi moi. Ho gap nguoi moi va viet ve moi thu ho nhin thay.",
      context_en: "Explorers are brave people. Student asks about the adventures of explorers.",
      question_word_bank: ["What did", "Why did", "How did", "Who did"],
      question_frame: "___ explorers find?",
      correctWord: "What did"
    },
    {
      nova_says: "When explorers came back home, they told people about the amazing places they had seen. Their stories inspired other people to start their own adventures.",
      nova_says_vi: "Khi cac nha tham hiem tro ve nha, ho ke cho moi nguoi ve nhung noi tuyet voi ho da thay. Cau chuyen cua ho truyen cam hung cho nguoi khac bat dau cuoc phieu luu rieng cua ho.",
      context_en: "Explorers shared their experiences. Student asks what explorers did after their journeys.",
      question_word_bank: ["What did", "When did", "Why did", "How did"],
      question_frame: "___ explorers do when they came back?",
      correctWord: "What did"
    }
  ]
};