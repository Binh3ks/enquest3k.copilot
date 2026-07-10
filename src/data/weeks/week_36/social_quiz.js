// WEEK 36: Adventure Stories — Social Quiz (ADV)
// Blueprint §3.3: 5 questions on Geography/History (Geography weighted for W36: Silk Road, Marco Polo, exploration)

export default {
  questions: [
    {
      type: "geography_mcq",
      question_en: "The Silk Road connected which two continents?",
      question_vn: "Con duong To lua ket noi hai chau luc nao?",
      options: ["Asia and Europe", "Africa and Asia", "Europe and America", "Australia and Asia"],
      correct: "Asia and Europe",
      explanation: "The Silk Road was an ancient trade route connecting Asia and Europe, allowing merchants to trade silk, spices, and other goods across continents.",
      vocab: ["Silk Road", "merchant", "trade", "continent", "explorer"]
    },
    {
      type: "history_mcq",
      question_en: "How long did Marco Polo journey from Italy to China take?",
      question_vn: "Marco Polo di tu Y den Trung Quoc mat bao lau?",
      options: ["Almost 24 years", "About 5 years", "More than 40 years", "Exactly 10 years"],
      correct: "Almost 24 years",
      explanation: "Marco Polo left Venice when he was 17 years old and returned when he was in his forties, making his journey nearly 24 years long.",
      vocab: ["explorer", "journey", "Venice", "China", "travel"]
    },
    {
      type: "geography_mcq",
      question_en: "What was the most important invention that helped early explorers?",
      question_vn: "Phat minh quan trong nhat giup cac nha tham hiem la gi?",
      options: ["The magnetic compass", "The printing press", "The steam engine", "The telescope"],
      correct: "The magnetic compass",
      explanation: "The magnetic compass was the most important invention for explorers because it helped them find their way across the open ocean without getting lost.",
      vocab: ["compass", "explorer", "magnetic", "ocean", "direction"]
    },
    {
      type: "history_mcq",
      question_en: "Why did some people not believe Marco Polo's stories at first?",
      question_vn: "Tai sao mot so nguoi khong tin cau chuyen cua Marco Polo ban dau?",
      options: [
        "His stories about distant lands were too amazing to believe",
        "He could not write them down",
        "He never actually travelled anywhere",
        "His book was destroyed"
      ],
      correct: "His stories about distant lands were too amazing to believe",
      explanation: "When Marco Polo returned to Venice and told stories about amazing palaces, gold, and exotic places in Asia, many people thought he was making up his stories. Later, his book was proven to be true.",
      vocab: ["explorer", "Venice", "story", "Asia", "book"]
    },
    {
      type: "geography_reasoning",
      question_en: "Why is the Silk Road considered one of the most important routes in history?",
      question_vn: "Tai sao Con duong To lua duoc xem la mot trong nhung tuyen duong quan trong nhat trong lich su?",
      options: [
        "It connected East and West and allowed trade of goods, ideas, and cultures for hundreds of years",
        "It was the fastest way to travel to America",
        "Only kings and queens used this road",
        "It was the longest road in the world"
      ],
      correct: "It connected East and West and allowed trade of goods, ideas, and cultures for hundreds of years",
      explanation: "The Silk Road connected Asia and Europe for over 1,400 years. Traders carried silk, spices, tea, and ideas across continents. Marco Polo, traders, and many explorers used the Silk Road to travel east.",
      vocab: ["Silk Road", "trade", "explorer", "continent", "history"]
    }
  ]
};