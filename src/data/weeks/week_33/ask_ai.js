// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Ask AI Station — Advanced Mode
// W28-42 format: question_word_bank (1 item) + question_frame

export default {
  prompts: [
    {
      nova_says: "Jake ran in the corridor because he was late, and then he hit his knee on the corner of a table.",
      nova_says_vi: "Jake chạy trong hành lang vì cậu muộn, và sau đó cậu đập đầu gối vào góc bàn.",
      context_en: "Jake ran in the corridor and hit his knee. Student asks about what happened.",
      question_word_bank: ["Why"],
      question_frame: "___ did Jake run in the corridor?"
    },
    {
      nova_says: "Jake fell down hard and broke the glass cup that another student was holding. His arm hurt when he tried to catch the falling cup.",
      nova_says_vi: "Jake ngã xuống và làm vỡ chiếc cốc thủy tinh của một học sinh khác. Cánh tay cậu đau khi cố bắt chiếc cốc đang rơi.",
      context_en: "Jake fell and broke a cup. Student asks about what he broke.",
      question_word_bank: ["What"],
      question_frame: "___ did Jake break when he fell?"
    },
    {
      nova_says: "Jake bit his tongue when he fell, and his knee and arm hurt a lot. He began to cry because everything hurt at once.",
      nova_says_vi: "Jake cắn lưỡi khi ngã, và đầu gối cùng cánh tay đau rất nhiều. Cậu bắt đầu khóc vì mọi thứ đau cùng một lúc.",
      context_en: "Jake was hurt after his fall. Student asks about what parts of his body hurt.",
      question_word_bank: ["What"],
      question_frame: "___ parts of Jake's body hurt?"
    },
    {
      nova_says: "The nurse put a cold pack on Jake's knee and his arm. She told Jake it was an important lesson — everyone must walk carefully in the corridor.",
      nova_says_vi: "Y tá đặt túi chườm lạnh lên đầu gối và cánh tay của Jake. Cô ấy bảo đó là một bài học quan trọng — mọi người phải đi cẩn thận trong hành lang.",
      context_en: "The nurse helped Jake. Student asks about what the nurse did.",
      question_word_bank: ["What"],
      question_frame: "___ did the nurse put on Jake's knee?"
    },
    {
      nova_says: "Jake recovered quickly at home after resting for a few days. He understood that walking carefully is the most important safety rule.",
      nova_says_vi: "Jake hồi phục nhanh chóng ở nhà sau vài ngày nghỉ ngơi. Cậu hiểu rằng đi cẩn thận là quy tắc an toàn quan trọng nhất.",
      context_en: "Jake recovered and learned a lesson. Student asks about what he learned.",
      question_word_bank: ["What"],
      question_frame: "___ lesson did Jake learn?"
    }
  ]
};
