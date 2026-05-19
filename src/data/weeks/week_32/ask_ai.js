// WEEK 32: A BUSY SATURDAY — Routine & Past Tense Verbs
// Ask AI Station — Advanced Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "Last Saturday, Tom woke up very early — before the birds had begun to sing. The house was quiet and the morning air was cool.",
      nova_says_vi: "Vào thứ Bảy tuần trước, Tom dậy rất sớm — trước khi những chú chim bắt đầu hót. Ngôi nhà yên tĩnh và không khí buổi sáng thật mát mẻ.",
      context_en: "Tom woke up very early. Student asks about when he woke up.",
      question_word_bank: ["What time", "When did", "What did", "What was"],
      question_frame: "___ did Tom wake up on Saturday?"
    },
    {
      nova_says: "Tom sat at his old wooden desk and wrote a long letter to his grandmother. He put the letter in an envelope and stuck a stamp on it.",
      nova_says_vi: "Tom ngồi vào bàn gỗ cổ và viết một lá thư dài cho bà của mình. Cậu bỏ thư vào phong bì và dán tem.",
      context_en: "Tom wrote a letter. Student asks about what he wrote.",
      question_word_bank: ["What did", "What does", "What was", "Who did"],
      question_frame: "___ Tom write at his desk?"
    },
    {
      nova_says: "After breakfast, Tom helped Dad cut the long grass in the garden. The grass had grown very tall during the rainy week.",
      nova_says_vi: "Sau bữa sáng, Tom giúp bố cắt đám cỏ dài trong vườn. Cỏ đã mọc rất cao trong tuần mưa.",
      context_en: "Tom helped cut the grass. Student asks about who he helped.",
      question_word_bank: ["Who did", "Who does", "How did", "When did"],
      question_frame: "___ Tom help in the garden?"
    },
    {
      nova_says: "Then Tom and his dad built a small wooden birdhouse together. Tom chose the smoothest plank of wood for the little roof.",
      nova_says_vi: "Rồi Tom và bố cùng nhau đóng một chiếc chuồng chim nhỏ bằng gỗ. Tom phải chọn tấm ván nhẵn nhất cho mái nhỏ.",
      context_en: "Tom and his dad built a birdhouse. Student asks about what they built.",
      question_word_bank: ["What did", "What does", "Where did", "When did"],
      question_frame: "___ Tom and his dad build?"
    },
    {
      nova_says: "In the afternoon, Tom and his mum walked to the local cafe. Tom paid for his lunch with his saved pocket money.",
      nova_says_vi: "Buổi chiều, Tom và mẹ đi bộ đến quán cà phê gần nhà. Tom tự trả tiền bữa trưa bằng tiền tiết kiệm.",
      context_en: "Tom went to the cafe. Student asks about how he paid.",
      question_word_bank: ["How did", "How does", "What did", "Where did"],
      question_frame: "___ Tom pay for his lunch?"
    }
  ]
};
