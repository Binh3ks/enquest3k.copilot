// WEEK 28: THE TRANSPORT RACE — Past Simple: Regular & Irregular Verbs
// Ask AI Station — Easy Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "I just read 'The Tortoise and the Hare'! The hare fell asleep and the tortoise won.",
      nova_says_vi: "Cô vừa đọc 'Rùa và Thỏ'! Con thỏ ngủ thiếp đi và con rùa thắng.",
      context_en: "The Tortoise and the Hare story. The hare slept and the tortoise won. Student asks questions.",
      question_word_bank: ["Who did", "Who does", "Where did", "Did"],
      question_frame: "___ win the race?"
    },
    {
      nova_says: "The hare was very fast! He ran at the start of the race. Then he stopped and slept.",
      nova_says_vi: "Con thỏ rất nhanh! Nó chạy ở đầu cuộc đua. Rồi nó dừng lại và ngủ.",
      context_en: "The hare ran fast but stopped to sleep. Student asks about the hare.",
      question_word_bank: ["What did", "What does", "How did", "Where did"],
      question_frame: "___ the hare do after he ran fast?"
    },
    {
      nova_says: "The tortoise walked slowly but he never stopped. He won because he never gave up!",
      nova_says_vi: "Con rùa đi chậm nhưng không bao giờ dừng. Nó thắng vì không bao giờ bỏ cuộc!",
      context_en: "The tortoise won because he was determined. Student asks about the tortoise.",
      question_word_bank: ["Why did", "Why does", "What did", "How did"],
      question_frame: "___ the tortoise win the race?"
    },
    {
      nova_says: "The hare rode a bicycle and the tortoise rode in a boat. Do you ride a bicycle?",
      nova_says_vi: "Con thỏ đi xe đạp và con rùa ngồi thuyền. Bạn có đi xe đạp không?",
      context_en: "Transport from the story. Student talks about transport.",
      question_word_bank: ["What did", "What does", "How did", "Did"],
      question_frame: "___ the tortoise ride in the race?"
    },
    {
      nova_says: "The moral is: slow and steady wins the race! Do you agree?",
      nova_says_vi: "Bài học là: chậm mà chắc sẽ thắng cuộc đua! Bạn đồng ý không?",
      context_en: "The moral of the story. Student shares their opinion.",
      question_word_bank: ["What does", "What did", "How does", "Do"],
      question_frame: "___ the moral of the story mean?"
    }
  ]
};
