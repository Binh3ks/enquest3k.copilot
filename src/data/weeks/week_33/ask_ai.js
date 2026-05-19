// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Ask AI Station — Advanced Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "Jake ran in the corridor because he was late, and then he hit his knee on the corner of a table.",
      nova_says_vi: "Jake chạy trong hành lang vì cậu muộn, và sau đó cậu đập đầu gối vào góc bàn.",
      context_en: "Jake ran in the corridor and hit his knee. Student asks about why he ran.",
      question_word_bank: ["Why did", "Why does", "What did", "When did"],
      question_frame: "___ Jake run in the corridor?",
      correctWord: "Why did"
    },
    {
      nova_says: "Jake fell down hard and broke the glass cup that another student was holding. His arm hurt when he tried to catch the falling cup.",
      nova_says_vi: "Jake ngã xuống và làm vỡ chiếc cốc thủy tinh của một học sinh khác. Cánh tay cậu đau khi cố bắt chiếc cốc đang rơi.",
      context_en: "Jake fell and broke a cup. Student asks about what he broke.",
      question_word_bank: ["What did", "What does", "What was", "How did"],
      question_frame: "___ Jake break when he fell?",
      correctWord: "What did"
    },
    {
      nova_says: "Jake bit his tongue when he fell, and his knee and arm hurt a lot. He began to cry because everything hurt at once.",
      nova_says_vi: "Jake cắn lưỡi khi ngã, và đầu gối cùng cánh tay đau rất nhiều. Cậu bắt đầu khóc vì mọi thứ đau cùng một lúc.",
      context_en: "Jake was hurt after his fall. Student asks about what was Jake's most serious injury.",
      question_word_bank: ["What was", "Where was", "When was", "How was"],
      question_frame: "___ Jake's most serious injury?",
      correctWord: "What was"
    },
    {
      nova_says: "The nurse put a cold pack on Jake's knee and his arm. She told Jake it was an important lesson — everyone must walk carefully in the corridor.",
      nova_says_vi: "Y tá đặt túi chườm lạnh lên đầu gối và cánh tay của Jake. Cô ấy bảo đó là một bài học quan trọng — mọi người phải đi cẩn thận trong hành lang.",
      context_en: "The nurse helped Jake. Student asks about what the nurse did.",
      question_word_bank: ["What did", "What does", "What was", "How did"],
      question_frame: "___ the nurse put on Jake's knee?",
      correctWord: "What did"
    },
    {
      nova_says: "Jake recovered quickly at home after resting for a few days. He understood that walking carefully is the most important safety rule.",
      nova_says_vi: "Jake hồi phục nhanh chóng ở nhà sau vài ngày nghỉ ngơi. Cậu hiểu rằng đi cẩn thận là quy tắc an toàn quan trọng nhất.",
      context_en: "Jake recovered and learned a lesson. Student asks about what he learned.",
      question_word_bank: ["What was", "How was", "Where was", "When was"],
      question_frame: "___ the most important lesson Jake learned?",
      correctWord: "What was"
    }
  ]
};
