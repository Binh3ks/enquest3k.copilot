export default {
  topic_talk_prompt: "Tell me about a time you went for a walk outside. What did you see, hear, and feel?",
  prompts: [
    {
      id: 1,
      nova_says: "Last Saturday I went to the forest with my dad and heard a beautiful bird singing!",
      nova_says_vi: "Thứ Bảy tuần trước tôi đi vào rừng với bố và nghe một con chim hót đẹp!",
      task_en: "Ask Nova 2 questions about the bird she heard.",
      task_vi: "Hỏi cô Nova 2 câu về con chim cô ấy nghe.",
      question_starters: ["What colour was the bird...?", "Where was the bird...?"],
      answer: ["What colour was the bird?", "Where was the bird sitting?", "What did the song sound like?"],
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I sat down on the grass and it felt so soft and warm!",
      nova_says_vi: "Tôi ngồi xuống cỏ và cảm thấy rất mềm và ấm!",
      task_en: "Ask Nova about how the grass felt.",
      task_vi: "Hỏi cô Nova về cảm giác của cỏ như thế nào.",
      question_starters: ["Was the grass warm or cold...?", "Did you like the feeling...?"],
      answer: ["Was the grass warm or cold?", "Did you like the feeling of the soft grass?", "What else did you touch in the forest?"],
      audio_url: null
    },
    {
      id: 3,
      nova_says: "Then I found a big rock. I touched it and it felt very hard!",
      nova_says_vi: "Rồi tôi tìm thấy một tảng đá lớn. Tôi chạm vào nó và cảm thấy rất cứng!",
      task_en: "Ask Nova about the rock she found.",
      task_vi: "Hỏi cô Nova về tảng đá cô ấy tìm thấy.",
      question_starters: ["How big was the rock...?", "Where did you find it...?"],
      answer: ["How big was the rock?", "Where did you find the rock?", "Was it rough or smooth?"],
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I found a pink flower and smelt it — the smell was sweet and nice!",
      nova_says_vi: "Tôi tìm thấy một bông hoa hồng và ngửi nó — mùi ngọt ngào và dễ chịu!",
      task_en: "Ask Nova about the flower she smelt.",
      task_vi: "Hỏi cô Nova về bông hoa cô ấy ngửi.",
      question_starters: ["What colour was the flower...?", "Did you pick the flower...?"],
      answer: ["What colour was the flower?", "Did you pick the flower?", "What did the smell remind you of?"],
      audio_url: null
    },
    {
      id: 5,
      nova_says: "At the end, a frog jumped out and made a very loud sound — I felt surprised!",
      nova_says_vi: "Cuối cùng, một con ếch nhảy ra và tạo ra tiếng to — tôi cảm thấy bất ngờ!",
      task_en: "Ask Nova about the frog surprise.",
      task_vi: "Hỏi cô Nova về bất ngờ từ con ếch.",
      question_starters: ["How big was the frog...?", "Where did the frog go...?"],
      answer: ["How big was the frog?", "Where did the frog go after jumping?", "Were you scared or just surprised?"],
      audio_url: null
    }
  ]
};
