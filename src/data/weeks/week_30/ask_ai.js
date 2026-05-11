export default {
  topic_talk_prompt: "Tell me about a meal you shared with someone. What did you eat? How did you feel? Do you know who prepared it — a chef or a cook?",
  prompts: [
    {
      id: 1,
      nova_says: "Last Sunday we had a lovely picnic in the park.",
      nova_says_vi: "Chủ nhật tuần trước chúng tôi có một buổi dã ngoại vui ở công viên.",
      task_en: "Ask Nova 2 questions about the picnic.",
      task_vi: "Hỏi cô Nova 2 câu về buổi dã ngoại.",
      question_starters: ["Who did you...?","What did you bring...?"],
      answer: ["Who did you go with?","What did you bring to the picnic?","Where was the picnic?"],
      audio_url: null
    },
    {
      id: 2,
      nova_says: "We brought sandwiches, fruit, and lemonade.",
      nova_says_vi: "Chúng tôi mang bánh mì kẹp, trái cây và nước chanh.",
      task_en: "Ask Nova about the food at the picnic.",
      task_vi: "Hỏi cô Nova về thức ăn trong buổi dã ngoại.",
      question_starters: ["What was your favourite...?","Did you make...?"],
      answer: ["What was your favourite food at the picnic?","Did you make the sandwiches yourself?","What did the lemonade taste like?"],
      audio_url: null
    },
    {
      id: 3,
      nova_says: "After eating, we played games and flew a kite.",
      nova_says_vi: "Sau khi ăn, chúng tôi chơi trò chơi và thả diều.",
      task_en: "Ask Nova about the activities after eating.",
      task_vi: "Hỏi cô Nova về các hoạt động sau khi ăn.",
      question_starters: ["What games did you...?","How high did the kite...?"],
      answer: ["What games did you play?","How high did the kite fly?","Was it hard to fly the kite?"],
      audio_url: null
    },
    {
      id: 4,
      nova_says: "The weather was perfect — warm with a gentle breeze.",
      nova_says_vi: "Thời tiết hoàn hảo — ấm áp với gió nhẹ.",
      task_en: "Ask Nova about the weather during the picnic.",
      task_vi: "Hỏi cô Nova về thời tiết trong buổi dã ngoại.",
      question_starters: ["How warm was...?","Did it rain...?"],
      answer: ["How warm was it?","Did it rain at all?","What was the weather like?"],
      audio_url: null
    },
    {
      id: 5,
      nova_says: "At the end of the day, we were all tired but very happy.",
      nova_says_vi: "Cuối ngày, chúng tôi đều mệt mỏi nhưng rất vui.",
      task_en: "Ask Nova how the day ended.",
      task_vi: "Hỏi cô Nova cuối ngày như thế nào.",
      question_starters: ["How did everyone feel...?","What time did you...?"],
      answer: ["How did everyone feel at the end?","What time did you go home?","Would you go on a picnic again?"],
      audio_url: null
    },
    {
      id: 6,
      nova_says: "The chef at the park cooked fresh food for everyone. She was a scientist of flavours!",
      nova_says_vi: "Đầu bếp tại công viên nấu ăn tươi ngon cho mọi người. Cô ấy là một nhà khoa học về hương vị!",
      task_en: "Ask Nova WHAT the chef cooked.",
      task_vi: "Hỏi cô Nova đầu bếp nấu gì.",
      question_starters: ["What did the chef cook...?","Why was she like a scientist...?"],
      answer: ["What did the chef cook?","Why was the chef like a scientist?","Was the food delicious?"],
      audio_url: null
    }
  ]
};
