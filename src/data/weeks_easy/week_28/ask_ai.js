export default {
  topic_talk_prompt: "Tell me about the Tortoise and the Hare race! Who won and why? What did you learn from the story?",
  prompts: [
    {
      id: 1,
      nova_says: "I just finished reading 'The Tortoise and the Hare'! The hare boasted that he was the fastest animal.",
      nova_says_vi: "Cô vừa đọc xong 'Rùa và Thỏ'! Con thỏ khoe khoang rằng nó là con vật nhanh nhất.",
      task_en: "Ask Nova WHO boasted about being fast.",
      task_vi: "Hỏi cô Nova AI đã khoe khoang về việc nhanh nhất.",
      question_word_bank: ["Who", "What", "Where"],
      question_frame: "___ boasted about being fast?",
      answer: ["Who boasted about being fast?"],
      hint_word: "Who",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The tortoise challenged the hare to a race. All the animals cheered! Some came by bus, some by boat, and others by bicycle or train.",
      nova_says_vi: "Con rùa thách con thỏ thi đua. Tất cả các con vật đều cổ vũ.",
      task_en: "Ask Nova WHAT the tortoise did.",
      task_vi: "Hỏi cô Nova con rùa đã làm gì.",
      question_word_bank: ["What", "Who", "How"],
      question_frame: "___ did the tortoise do?",
      answer: ["What did the tortoise do?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "During the race, the hare ran fast and then decided to take a nap under a tree!",
      nova_says_vi: "Trong cuộc đua, thỏ chạy nhanh rồi quyết định ngủ trưa dưới gốc cây!",
      task_en: "Ask Nova WHERE the hare took a nap.",
      task_vi: "Hỏi cô Nova con thỏ đã ngủ trưa ở đâu.",
      question_word_bank: ["Where", "Why", "When"],
      question_frame: "___ did the hare take a nap?",
      answer: ["Where did the hare take a nap?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "While the hare slept, the tortoise kept walking — slowly but steadily. He never stopped!",
      nova_says_vi: "Trong khi thỏ ngủ, rùa cứ đi — chậm mà chắc. Rùa không bao giờ dừng lại!",
      task_en: "Ask Nova HOW the tortoise walked.",
      task_vi: "Hỏi cô Nova con rùa đã đi như thế nào.",
      question_word_bank: ["How", "Why", "Where"],
      question_frame: "___ did the tortoise walk?",
      answer: ["How did the tortoise walk?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "In the end, the tortoise crossed the finish line first! The moral is: slow and steady wins the race.",
      nova_says_vi: "Cuối cùng, rùa vượt qua vạch đích đầu tiên! Bài học là: chậm mà chắc sẽ thắng.",
      task_en: "Ask Nova WHAT the moral of the story is.",
      task_vi: "Hỏi cô Nova bài học của câu chuyện là gì.",
      question_word_bank: ["What", "Who", "Why"],
      question_frame: "___ is the moral of the story?",
      answer: ["What is the moral of the story?"],
      hint_word: "What",
      audio_url: null
    }
  ]
};
