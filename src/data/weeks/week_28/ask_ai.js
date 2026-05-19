// WEEK 28: THE TRANSPORT RACE — Past Simple: Regular & Irregular Verbs
// Ask AI Station — Advanced Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "Yesterday, I read the story of the Tortoise and the Hare. The hare was so confident that he fell asleep during the race!",
      nova_says_vi: "Hôm qua, tôi đọc câu chuyện Rùa và Thỏ. Con thỏ tự tin đến mức ngủ thiếp đi trong cuộc đua!",
      context_en: "The Tortoise and the Hare had a race. The hare was overconfident and slept. Student asks follow-up questions.",
      question_word_bank: ["What", "Why", "Who", "When"],
      question_frame: "___ happened in the race? or ___ did the hare fall asleep? or Tell me more!"
    },
    {
      nova_says: "The hare ran very fast at first. He got ahead of everyone! But then he got tired and stopped to rest.",
      nova_says_vi: "Con thỏ chạy rất nhanh lúc đầu. Nó vượt lên trước mọi người! Nhưng rồi nó mệt và dừng lại nghỉ.",
      context_en: "The hare ran fast but got tired. Student asks about the hare's actions.",
      question_word_bank: ["How", "Why", "What", "Did"],
      question_frame: "___ fast did the hare run? or ___ did he stop? or Tell me more!"
    },
    {
      nova_says: "The tortoise kept on walking slowly. He never gave up! He won the race at the end.",
      nova_says_vi: "Con rùa tiếp tục đi chậm. Nó không bao giờ bỏ cuộc! Nó thắng cuộc đua vào cuối.",
      context_en: "The tortoise won because he never gave up. Student asks about the tortoise's strategy.",
      question_word_bank: ["Why", "How", "What", "Did"],
      question_frame: "___ did the tortoise win? or ___ he ever stop? or Tell me more!"
    },
    {
      nova_says: "The moral of the story is: slow and steady wins the race! Being determined is more important than being fast.",
      nova_says_vi: "Bài học của câu chuyện là: chậm mà chắc sẽ thắng cuộc đua! Kiên định quan trọng hơn là nhanh.",
      context_en: "The moral of the fable. Student asks about the lesson.",
      question_word_bank: ["What", "Why", "How", "Do"],
      question_frame: "___ is the moral? or ___ you agree? or Tell me more!"
    },
    {
      nova_says: "In the race, the hare rode a bicycle and the tortoise rode in a boat. What transport do you use every day?",
      nova_says_vi: "Trong cuộc đua, con thỏ đi xe đạp và con rùa ngồi thuyền. Bạn dùng phương tiện gì mỗi ngày?",
      context_en: "Transport used in the race. Student talks about transport they use.",
      question_word_bank: ["What", "How", "Do", "Why"],
      question_frame: "___ transport do you use? or ___ you like it? or Tell me more!"
    },
    {
      nova_says: "I think the tortoise was the cleverest! He was patient and never stopped. What do you think?",
      nova_says_vi: "Tôi nghĩ con rùa là thông minh nhất! Nó kiên nhẫn và không bao giờ dừng. Bạn nghĩ sao?",
      context_en: "Opinion about the tortoise. Student shares their opinion.",
      question_word_bank: ["Who", "What", "Why", "Do"],
      question_frame: "___ do you think was cleverer? or Why? or Tell me more!"
    }
  ]
};
