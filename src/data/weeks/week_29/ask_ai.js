export default {
  topic_talk_prompt: "Tell me about a trip or journey you have taken. Where did you go? What did you see? Who helped you — a pilot, a driver, or a nurse?",
  prompts: [
    {
      id: 1,
      nova_says: "I just came back from a trip to the mountains!",
      nova_says_vi: "Cô vừa trở về từ chuyến đi lên núi!",
      task_en: "Ask Nova 2 questions about her trip to the mountains.",
      task_vi: "Hỏi cô Nova 2 câu về chuyến đi lên núi của cô.",
      question_starters: ["Where exactly did you...?","How long did you...?"],
      answer: ["Where exactly did you go?","How long did you stay?","Who did you go with?"],
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The mountain views were absolutely breathtaking.",
      nova_says_vi: "Cảnh núi non thật sự ngoạn mục.",
      task_en: "Ask Nova about the mountain views.",
      task_vi: "Hỏi cô Nova về cảnh núi non.",
      question_starters: ["What did you see...?","How did you feel...?"],
      answer: ["What did you see from the top?","How did you feel when you saw the view?","What was the most beautiful part?"],
      audio_url: null
    },
    {
      id: 3,
      nova_says: "We hiked up a very steep trail for two hours.",
      nova_says_vi: "Chúng tôi leo lên một con đường dốc đứng trong hai tiếng.",
      task_en: "Ask Nova about the hike.",
      task_vi: "Hỏi cô Nova về chuyến leo núi.",
      question_starters: ["How difficult was...?","What did you bring...?"],
      answer: ["How difficult was the trail?","What did you bring with you?","How did you feel after hiking?"],
      audio_url: null
    },
    {
      id: 4,
      nova_says: "We camped under the stars for one night.",
      nova_says_vi: "Chúng tôi cắm trại dưới những ngôi sao một đêm.",
      task_en: "Ask Nova about camping under the stars.",
      task_vi: "Hỏi cô Nova về việc cắm trại dưới sao.",
      question_starters: ["What was it like...?","Were you scared...?"],
      answer: ["What was it like to sleep outside?","Were you scared sleeping under the stars?","What did you do at night?"],
      audio_url: null
    },
    {
      id: 5,
      nova_says: "The best part of the trip was watching the sunrise.",
      nova_says_vi: "Điều tuyệt nhất của chuyến đi là ngắm bình minh.",
      task_en: "Ask Nova about the sunrise.",
      task_vi: "Hỏi cô Nova về cảnh bình minh.",
      question_starters: ["What time did...?","How did the sunrise...?"],
      answer: ["What time did the sun rise?","How did the sunrise look?","Why was the sunrise special?"],
      audio_url: null
    },
    {
      id: 6,
      nova_says: "A pilot flew us to the island. He was very friendly and explained how to fly a plane.",
      nova_says_vi: "Một phi công đã bay đưa chúng tôi đến hòn đảo. Ông ấy rất thân thiện và giải thích cách lái máy bay.",
      task_en: "Ask Nova WHO flew the plane.",
      task_vi: "Hỏi cô Nova ai đã lái máy bay.",
      question_starters: ["Who flew...?","What did the pilot...?"],
      answer: ["Who flew the plane?","What did the pilot say?","Was the pilot friendly?"],
      audio_url: null
    }
  ]
};
