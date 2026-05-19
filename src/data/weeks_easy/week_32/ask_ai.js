// WEEK 32: A BUSY SATURDAY — Routine & Past Tense Verbs
// Ask AI Station — Easy Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "On Saturday morning, I woke up early and made my bed!",
      nova_says_vi: "Vào sáng thứ Bảy, tôi dậy sớm và dọn giường!",
      context_en: "Nova woke up early on Saturday. Student asks about when she woke up.",
      question_word_bank: ["What time", "When did", "What did", "What was"],
      question_frame: "___ did you wake up on Saturday?"
    },
    {
      nova_says: "I helped Dad cut the grass in our garden. It was very long!",
      nova_says_vi: "Tôi giúp bố cắt cỏ trong vườn. Cỏ dài lắm!",
      context_en: "Nova helped Dad cut the grass. Student asks about who she helped.",
      question_word_bank: ["Who did", "Who does", "How did", "What did"],
      question_frame: "___ you help in the garden?"
    },
    {
      nova_says: "Dad and I built a little birdhouse together. We used wood and a hammer!",
      nova_says_vi: "Bố và tôi cùng nhau đóng một chiếc chuồng chim nhỏ. Chúng tôi dùng gỗ và búa!",
      context_en: "Nova and Dad built a birdhouse. Student asks about what they built.",
      question_word_bank: ["What did", "What does", "Where did", "When did"],
      question_frame: "___ you build with Dad?"
    },
    {
      nova_says: "After the chores, I swept the kitchen floor with the big broom!",
      nova_says_vi: "Sau khi làm việc nhà, tôi quét sàn bếp bằng cái chổi to!",
      context_en: "Nova swept the kitchen floor. Student asks about what she swept.",
      question_word_bank: ["What did", "What does", "How did", "Where did"],
      question_frame: "___ you sweep on Saturday?"
    },
    {
      nova_says: "At the end of the day, I felt very happy and proud of all my work!",
      nova_says_vi: "Cuối ngày, tôi cảm thấy rất vui và tự hào về tất cả công việc của mình!",
      context_en: "The day ended happily. Student asks about how Nova felt.",
      question_word_bank: ["How did", "How does", "What did", "What does"],
      question_frame: "___ you feel at the end of the day?"
    }
  ]
};
