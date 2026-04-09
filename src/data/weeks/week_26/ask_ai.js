export default {
  topic_talk_prompt: "Tell me about what you did last weekend from the beginning to the end. What happened?",
  prompts: [
    {
      id: 1,
      context_en: "Your friend is making a comic strip. They drew Panel One but left it blank — no caption underneath. You want to know what happened in that scene. Ask them.",
      context_vi: "Bạn của bạn đang làm truyện tranh. Họ đã vẽ Khung 1 nhưng bỏ trống — không có chú thích bên dưới. Bạn muốn biết cảnh đó kể về điều gì. Hỏi họ.",
      audio_url: "/audio/week26/ask_ai_q1.mp3",
      answer: ["What happened in that panel?", "What happened in that scene?", "What is the caption for this panel?", "Can you describe this panel?"],
      hint: "What happened in that panel?"
    },
    {
      id: 2,
      context_en: "Leo told you he visited the park last weekend. You want to know if the weather was good or bad. Ask him.",
      context_vi: "Leo nói với bạn là anh ấy đã đến công viên vào cuối tuần trước. Bạn muốn biết thời tiết có tốt không. Hỏi anh ấy.",
      audio_url: "/audio/week26/ask_ai_q2.mp3",
      answer: ["Was the weather good?", "Was it sunny?", "What was the weather like?", "How was the weather?"],
      hint: "Was the weather good?"
    },
    {
      id: 3,
      context_en: "Mia finished her comic strip but you didn't see Panel Four. You want to know what she did FINALLY at the end of her story. Ask her.",
      context_vi: "Mia đã hoàn thành bộ truyện tranh nhưng bạn không thấy Khung 4. Bạn muốn biết CUỐI CÙNG cô ấy đã làm gì trong câu chuyện. Hỏi cô ấy.",
      audio_url: "/audio/week26/ask_ai_q3.mp3",
      answer: ["What happened in Panel Four?", "What did you do finally?", "What was the last panel?", "How did your story end?"],
      hint: "What happened in Panel Four?"
    },
    {
      id: 4,
      context_en: "Your classmate drew a character in their comic strip but forgot to add a speech bubble. You want to know what the character said. Ask your classmate.",
      context_vi: "Bạn cùng lớp vẽ một nhân vật trong truyện tranh nhưng quên thêm bong bóng lời thoại. Bạn muốn biết nhân vật đã nói gì. Hỏi bạn đó.",
      audio_url: "/audio/week26/ask_ai_q4.mp3",
      answer: ["What did the character say?", "What is in the speech bubble?", "What does the character say?", "What words go in the speech bubble?"],
      hint: "What did the character say?"
    },
    {
      id: 5,
      context_en: "Your teacher finished explaining the comic strip project. You missed the part about how many panels to draw. You want to find out. Ask the teacher.",
      context_vi: "Giáo viên vừa giải thích xong dự án truyện tranh. Bạn bỏ lỡ phần nói về số khung cần vẽ. Bạn muốn hỏi. Hỏi giáo viên.",
      audio_url: "/audio/week26/ask_ai_q5.mp3",
      answer: ["How many panels do we need to draw?", "How many panels should I draw?", "How many panels are there?", "How many panels do I need?"],
      hint: "How many panels do we need to draw?"
    }
  ]
};
