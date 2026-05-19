// WEEK 28: THE TRANSPORT RACE — Past Simple: Regular & Irregular Verbs
// Ask AI Station — Advanced Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "Yesterday, I read the story of the Tortoise and the Hare. The hare was so confident that he fell asleep during the race!",
      nova_says_vi: "Hôm qua, tôi đọc câu chuyện Rùa và Thỏ. Con thỏ tự tin đến mức ngủ thiếp đi trong cuộc đua!",
      context_en: "The Tortoise and the Hare had a race. The hare was overconfident and slept. Student asks follow-up questions.",
      question_word_bank: ["Why did", "Why does", "What did", "What does"],
      question_frame: "___ the hare fall asleep?"
    },
    {
      nova_says: "The hare ran very fast at first. He got ahead of everyone! But then he got tired and stopped to rest.",
      nova_says_vi: "Con thỏ chạy rất nhanh lúc đầu. Nó vượt lên trước mọi người! Nhưng rồi nó mệt và dừng lại nghỉ.",
      context_en: "The hare ran fast but got tired. Student asks about the hare's tiredness.",
      question_word_bank: ["Why did", "Why does", "Where did", "Did"],
      question_frame: "___ the hare stop to rest?"
    },
    {
      nova_says: "The tortoise kept on walking slowly. He never gave up! He won the race at the end.",
      nova_says_vi: "Con rùa tiếp tục đi chậm. Nó không bao giờ bỏ cuộc! Nó thắng cuộc đua vào cuối.",
      context_en: "The tortoise won because he never gave up. Student asks about the tortoise's strategy.",
      question_word_bank: ["How did", "What did", "When did", "Did"],
      question_frame: "___ the tortoise win the race?"
    },
    {
      nova_says: "The hare rode a bicycle and the tortoise rode in a boat. What transport do you use every day?",
      nova_says_vi: "Trong cuộc đua, con thỏ đi xe đạp và con rùa ngồi thuyền. Bạn dùng phương tiện gì mỗi ngày?",
      context_en: "Transport used in the race. Student talks about transport they use.",
      question_word_bank: ["What did", "What does", "How did", "Why did"],
      question_frame: "___ the hare ride during the race?"
    },
    {
      nova_says: "The moral of the story is: slow and steady wins the race! Being determined is more important than being fast.",
      nova_says_vi: "Bài học của câu chuyện là: chậm mà chắc sẽ thắng cuộc đua! Kiên định quan trọng hơn là nhanh.",
      context_en: "The moral of the fable. Student asks about the lesson.",
      question_word_bank: ["How did", "What did", "When did", "Why was"],
      question_frame: "___ the hare learn the moral?"
    },
    {
      nova_says: "I think the tortoise was the cleverest! He was patient and never stopped. What do you think?",
      nova_says_vi: "Tôi nghĩ con rùa là thông minh nhất! Nó kiên nhẫn và không bao giờ dừng. Bạn nghĩ sao?",
      context_en: "Opinion about the tortoise. Student shares their opinion.",
      question_word_bank: ["Why did", "Why does", "How does", "What does"],
      question_frame: "___ the tortoise never give up?"
    }
  ]
};
