export default {
  topic_talk_prompt: "Tell me about something interesting in your neighbourhood. What is happening?",
  prompts: [
    {
      id: 1,
      context_en: "You are at home. You can see your mum doing something in the kitchen. You want to know WHAT she is doing. Ask her.",
      context_vi: "Bạn đang ở nhà. Bạn thấy mẹ đang làm gì đó trong bếp. Bạn muốn biết mẹ ĐANG LÀM GÌ. Hỏi mẹ.",
      audio_url: "/audio/week18_easy/ask_ai_1.mp3",
      answer: ["What are you doing?", "Mum, what are you doing?", "What is Mum doing?"],
      hint: "What are you..."
    },
    {
      id: 2,
      context_en: "You are a live reporter at home. Your cat is sleeping on the sofa. You want to describe WHAT the cat is doing. Say it to the camera!",
      context_vi: "Bạn là phóng viên trực tiếp ở nhà. Con mèo đang ngủ trên ghế sofa. Bạn muốn mô tả CON MÈO ĐANG LÀM GÌ. Nói cho máy quay biết!",
      audio_url: "/audio/week18_easy/ask_ai_2.mp3",
      answer: ["My cat is sleeping.", "The cat is sleeping on the sofa.", "My cat is sleeping right now."],
      hint: "My cat is..."
    },
    {
      id: 3,
      context_en: "Your brother is reading a book in his room. You are a reporter. You want to describe WHAT your brother is doing right now. Report it!",
      context_vi: "Anh trai bạn đang đọc sách trong phòng. Bạn là phóng viên. Bạn muốn mô tả ANH TRAI ĐANG LÀM GÌ ngay lúc này. Hãy đưa tin!",
      audio_url: "/audio/week18_easy/ask_ai_3.mp3",
      answer: ["My brother is reading.", "He is reading a book.", "My brother is reading a book in his room."],
      hint: "He is..."
    },
    {
      id: 4,
      context_en: "You want to interview your cat as a reporter. The cat is playing with a toy. You want to know WHY it is playing. Ask the cat!",
      context_vi: "Bạn muốn phỏng vấn mèo như một phóng viên. Con mèo đang chơi với đồ chơi. Bạn muốn biết TẠI SAO nó chơi. Hỏi con mèo!",
      audio_url: "/audio/week18_easy/ask_ai_4.mp3",
      answer: ["Why are you playing?", "What are you playing with?", "Why are you playing with the toy?"],
      hint: "Why are you..."
    },
    {
      id: 5,
      context_en: "You are giving a live report. Three things are happening at your home right now. You want to describe ALL THREE. Say them like a reporter!",
      context_vi: "Bạn đang đưa tin trực tiếp. Ba thứ đang xảy ra ở nhà bạn ngay lúc này. Bạn muốn mô tả TẤT CẢ BA. Nói như một phóng viên!",
      audio_url: "/audio/week18_easy/ask_ai_5.mp3",
      answer: ["My mum is cooking. My cat is sleeping. My brother is reading.", "The cat is sleeping. Mum is cooking. Brother is reading."],
      hint: "[Person] is [verb]-ing..."
    }
  ]
};

