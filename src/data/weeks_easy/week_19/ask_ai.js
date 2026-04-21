export default {
  topic_talk_prompt: "Tell me about an old photo you remember. Who was in it? What were they doing?",
  prompts: [
    {
      id: 1,
      nova_says: "Look! In this old photo, I was wearing a funny hat.",
      nova_says_vi: "Nhìn này! Trong bức ảnh cũ này, cô đang đội một cái mũ buồn cười.",
      task_en: "Ask Nova WHAT she was wearing in the photo.",
      task_vi: "Hỏi cô Nova cô đang mặc gì trong ảnh.",
      question_word_bank: ["What","Where","Who"],
      question_frame: "___ were you wearing in the photo?",
      answer: ["What were you wearing in the photo?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "This photo was taken at a birthday party.",
      nova_says_vi: "Bức ảnh này được chụp tại một bữa tiệc sinh nhật.",
      task_en: "Ask Nova WHERE the photo was taken.",
      task_vi: "Hỏi cô Nova bức ảnh được chụp ở đâu.",
      question_word_bank: ["Where","When","Who"],
      question_frame: "___ was the photo taken?",
      answer: ["Where was the photo taken?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I was very young in this photo — maybe five years old.",
      nova_says_vi: "Cô còn rất nhỏ trong ảnh này — có lẽ năm tuổi.",
      task_en: "Ask Nova HOW OLD she was in the photo.",
      task_vi: "Hỏi cô Nova cô bao nhiêu tuổi trong ảnh.",
      question_word_bank: ["How","When","What"],
      question_frame: "___ old were you in the photo?",
      answer: ["How old were you in the photo?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "My grandpa took this photo a long time ago.",
      nova_says_vi: "Ông của cô chụp ảnh này từ rất lâu rồi.",
      task_en: "Ask Nova WHO took the photo.",
      task_vi: "Hỏi cô Nova ai đã chụp ảnh đó.",
      question_word_bank: ["Who","What","When"],
      question_frame: "___ took the photo?",
      answer: ["Who took the photo?"],
      hint_word: "Who",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "Everyone in the photo was laughing and happy.",
      nova_says_vi: "Mọi người trong ảnh đều đang cười và vui vẻ.",
      task_en: "Ask Nova HOW everyone felt in the photo.",
      task_vi: "Hỏi cô Nova mọi người cảm thấy thế nào trong ảnh.",
      question_word_bank: ["How","What","Why"],
      question_frame: "___ was everyone feeling in the photo?",
      answer: ["How was everyone feeling in the photo?","How did everyone feel in the photo?"],
      hint_word: "How",
      audio_url: null
    }
  ]
};
