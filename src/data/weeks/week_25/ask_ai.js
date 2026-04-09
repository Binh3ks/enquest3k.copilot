export default {
  topic_talk_prompt: "Tell me about how you do something step by step. What is the process? What happens first?",
  prompts: [
    {
      id: 1,
      context_en: "You see your friend making a sandwich but they put the jam on BEFORE getting the bread out. You want to know what they should do FIRST. Ask them.",
      context_vi: "Bạn thấy bạn mình đang làm sandwich nhưng họ bôi mứt TRƯỚC KHI lấy bánh mì ra. Bạn muốn biết họ nên làm gì ĐẦU TIÊN. Hỏi họ.",
      audio_url: "/audio/week25/ask_ai_q1.mp3",
      answer: ["What should you do first?", "What do you do first?", "What comes first?", "Which step is first?"],
      hint: "What should you do first?"
    },
    {
      id: 2,
      context_en: "Your friend is brushing their teeth but forgot to put toothpaste on the brush. You want to know what step comes NEXT after putting on the toothpaste. Ask them.",
      context_vi: "Bạn của bạn đang đánh răng nhưng quên chưa bôi kem đánh răng. Bạn muốn biết bước TIẾP THEO sau khi bôi kem là gì. Hỏi họ.",
      audio_url: "/audio/week25/ask_ai_q2.mp3",
      answer: ["What comes next?", "What do you do next?", "What is the next step?", "What step comes next?"],
      hint: "What comes next?"
    },
    {
      id: 3,
      context_en: "Your little sister finished brushing her teeth but she forgot one thing before she finishes. You want to know what she should do THEN. Ask her.",
      context_vi: "Em gái của bạn đã đánh răng xong nhưng còn quên một việc trước khi xong. Bạn muốn biết SAU ĐÓ em nên làm gì. Hỏi em ấy.",
      audio_url: "/audio/week25/ask_ai_q3.mp3",
      answer: ["What should you do then?", "What do you do then?", "Then what do you do?", "What comes then?"],
      hint: "What should you do then?"
    },
    {
      id: 4,
      context_en: "Your classmate cooked rice for the first time and did all the steps correctly. You want to know what they did FINALLY at the end. Ask them.",
      context_vi: "Bạn cùng lớp nấu cơm lần đầu tiên và đã làm đúng tất cả các bước. Bạn muốn biết CUỐI CÙNG họ đã làm gì. Hỏi họ.",
      audio_url: "/audio/week25/ask_ai_q4.mp3",
      answer: ["What did you do finally?", "What did you do last?", "What was the last step?", "What was the final step?"],
      hint: "What did you do finally?"
    },
    {
      id: 5,
      context_en: "Your teacher is showing a science experiment with four steps. You missed step three. You want to know what happens AFTER step two. Ask the teacher.",
      context_vi: "Giáo viên đang trình bày thí nghiệm khoa học có bốn bước. Bạn bỏ lỡ bước ba. Bạn muốn biết điều gì xảy ra SAU bước hai. Hỏi giáo viên.",
      audio_url: "/audio/week25/ask_ai_q5.mp3",
      answer: ["What happens next?", "What do we do next?", "What comes after step two?", "What is the next step?"],
      hint: "What happens next?"
    }
  ]
};
