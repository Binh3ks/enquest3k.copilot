// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Ask AI Station — Advanced Mode
// W32 Schema: prompts[] with nova_says, task_en/vi, question_starters[], answer[]

export default {
  title_en: "Ask Nova: The Accident",
  title_vi: "Hỏi Nova: Tai Nạn",
  audio_url: null,
  prompts: [
    {
      id: 1,
      context_en: "Jake ran in the corridor because he was late, and then he hit his knee.",
      nova_says: "Jake ran in the corridor because he was late, and then he hit his knee.",
      nova_says_vi: "Jake chạy trong hành lang vì cậu muộn, và sau đó cậu đập vào đầu gối.",
      task_en: "Ask Nova a question about why Jake ran or what happened after he hit his knee.",
      task_vi: "Hỏi Nova một câu hỏi về lý do Jake chạy hoặc chuyện gì xảy ra sau khi cậu đập vào đầu gối.",
      question_starters: [
        "Why did Jake run in the…?",
        "Did Jake fall after he…?",
        "What did Jake hit when he…?"
      ],
      answer: [
        "Jake ran in the corridor because he was late for class.",
        "Yes, Jake fell down hard after he hit his knee on the table.",
        "Jake hit his knee on the corner of a table when he fell."
      ]
    },
    {
      id: 2,
      context_en: "Jake fell down and broke a glass cup that another student was holding.",
      nova_says: "Jake fell down and broke a glass cup that another student was holding.",
      nova_says_vi: "Jake ngã xuống và làm vỡ chiếc cốc thủy tinh của một học sinh khác.",
      task_en: "Ask Nova a question about what Jake broke or who was holding the cup.",
      task_vi: "Hỏi Nova một câu hỏi về cái gì Jake làm vỡ hoặc ai đang cầm chiếc cốc.",
      question_starters: [
        "What did Jake break when he…?",
        "Who was holding the glass…?",
        "Did Jake break anything else…?"
      ],
      answer: [
        "Jake broke a glass cup that another student was holding.",
        "A classmate was holding the glass cup when Jake fell and broke it.",
        "Jake also hurt his arm when he tried to catch the falling cup."
      ]
    },
    {
      id: 3,
      context_en: "Jake bit his tongue when he fell, and his knee and arm hurt a lot.",
      nova_says: "Jake bit his tongue when he fell, and his knee and arm hurt a lot.",
      nova_says_vi: "Jake cắn lưỡi khi ngã, và đầu gối cùng cánh tay đau rất nhiều.",
      task_en: "Ask Nova a question about Jake's injuries — what parts of his body hurt.",
      task_vi: "Hỏi Nova một câu hỏi về các vết thương của Jake — phần nào trên cơ thể cậu bị đau.",
      question_starters: [
        "What parts of Jake's body…?",
        "Did Jake bite his tongue when he…?",
        "How many injuries did Jake…?"
      ],
      answer: [
        "Jake's knee hurt and his arm hurt after the fall.",
        "Yes, Jake bit his tongue when he hit the floor.",
        "Jake had three injuries: his knee hurt, his arm hurt, and he bit his tongue."
      ]
    },
    {
      id: 4,
      context_en: "The nurse put a cold pack on Jake's knee and told him an important lesson.",
      nova_says: "The nurse put a cold pack on Jake's knee and told him an important lesson.",
      nova_says_vi: "Y tá đặt túi chườm lạnh lên đầu gối của Jake và dạy cậu một bài học quan trọng.",
      task_en: "Ask Nova a question about what the nurse did or what lesson Jake learned.",
      task_vi: "Hỏi Nova một câu hỏi về việc y tá đã làm gì hoặc bài học nào Jake đã học.",
      question_starters: [
        "What did the nurse put on Jake's…?",
        "What important lesson did the nurse…?",
        "How long did the cold pack…?"
      ],
      answer: [
        "The nurse put a cold pack on Jake's knee to reduce the swelling.",
        "The nurse taught Jake that everyone must walk carefully in the corridor.",
        "The nurse told Jake that running in the corridor is dangerous."
      ]
    },
    {
      id: 5,
      context_en: "Jake recovered quickly at home and promised to always walk carefully.",
      nova_says: "Jake recovered quickly at home and promised to always walk carefully.",
      nova_says_vi: "Jake hồi phục nhanh chóng ở nhà và hứa sẽ luôn đi cẩn thận.",
      task_en: "Ask Nova a question about how Jake recovered or what he promised to do.",
      task_vi: "Hỏi Nova một câu hỏi về cách Jake hồi phục hoặc cậu ấy đã hứa làm gì.",
      question_starters: [
        "How did Jake recover from…?",
        "What did Jake promise to…?",
        "Did Jake understand why he should…?"
      ],
      answer: [
        "Jake recovered quickly at home after resting for a few days.",
        "Jake promised to always walk carefully in the corridor, even when he was late.",
        "Yes, Jake understood that walking carefully is the most important safety rule."
      ]
    }
  ]
};
