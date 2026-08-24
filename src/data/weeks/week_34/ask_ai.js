// Week 34 Mascot Nova AI Voice Dialogue Cards & Cambridge P2 Info Exchange
export default [
  {
    id: 1,
    title_en: "Turn 1: What was the lion doing under the tree?",
    sample_question_en: "The huge lion was sleeping under the shady tree.",
    sample_question_vi: "Chú sư tử to lớn đang ngủ dưới gốc cây râm mát.",
    answer: "Good! What happened while he was sleeping?",
    word_bank: ["lion", "was", "sleeping", "under", "tree"]
  },
  {
    id: 2,
    title_en: "Turn 2: What did the mouse accidentally do?",
    sample_question_en: "A tiny mouse ran across the lion's front paw.",
    sample_question_vi: "Một chú chuột nhỏ chạy ngang qua bàn chân trước của sư tử.",
    answer: "Oh my! Did the lion catch the little mouse?",
    word_bank: ["mouse", "ran", "across", "front", "paw"]
  },
  {
    id: 3,
    title_en: "Turn 3: What promise did the mouse make?",
    sample_question_en: "The mouse promised to help the lion one day.",
    sample_question_vi: "Chú chuột đã hứa sẽ giúp đỡ sư tử vào một ngày nào đó.",
    answer: "How brave! What happened to the lion later in the forest?",
    word_bank: ["mouse", "promised", "help", "lion", "one", "day"]
  },
  {
    id: 4,
    title_en: "Turn 4: How did the hunters trap the lion?",
    sample_question_en: "Hunters trapped the lion in a heavy rope net.",
    sample_question_vi: "Các thợ săn đã bẫy sư tử trong một tấm lưới thừng dày.",
    answer: "Oh no! How did the little mouse save the mighty lion?",
    word_bank: ["hunters", "trapped", "lion", "heavy", "rope", "net"]
  },
  {
    id: 5,
    title_en: "Turn 5: How did the mouse cut the thick ropes?",
    sample_question_en: "He chewed the ropes with his sharp teeth and freed him.",
    sample_question_vi: "Cậu ấy đã gặm dây thừng bằng hàm răng sắc nhọn và giải cứu sư tử.",
    answer: "Wonderful! Even small friends can be a great help.",
    word_bank: ["chewed", "ropes", "sharp", "teeth", "freed", "lion"]
  }
];

export const CUE_CARD_PROMPTS = [
  {
    cue_id: "cue_1",
    target_prompt_en: "Where / the lion / sleep in the afternoon?",
    target_prompt_vi: "Hỏi Nova: Sư tử ngủ ở đâu vào buổi chiều?",
    question_word: "Where",
    word_bank: ["Where", "was", "the", "lion", "sleeping", "in", "the", "afternoon", "?"],
    scrambled_words: ["afternoon", "sleeping", "Where", "lion", "the", "in", "was", "?"],
    acceptable_questions: [
      "Where was the lion sleeping in the afternoon?",
      "Where was the lion sleeping?",
      "Where was he sleeping?"
    ],
    nova_answer_audio_text: "The huge lion was sleeping peacefully under a shady tree in the forest."
  },
  {
    cue_id: "cue_2",
    target_prompt_en: "What / the mouse / do when the lion caught him?",
    target_prompt_vi: "Hỏi Nova: Chuột đã làm gì khi sư tử bắt được cậu ấy?",
    question_word: "What",
    word_bank: ["What", "did", "the", "mouse", "do", "when", "caught", "?"],
    scrambled_words: ["caught", "What", "mouse", "do", "did", "the", "when", "?"],
    acceptable_questions: [
      "What did the mouse do when the lion caught him?",
      "What did the mouse promise?",
      "What did he say to the lion?"
    ],
    nova_answer_audio_text: "The scared mouse cried and promised that he would help the lion one day."
  },
  {
    cue_id: "cue_3",
    target_prompt_en: "How / the hunters / trap the lion in the forest?",
    target_prompt_vi: "Hỏi Nova: Các thợ săn đã bẫy sư tử như thế nào?",
    question_word: "How",
    word_bank: ["How", "did", "the", "hunters", "trap", "the", "lion", "?"],
    scrambled_words: ["trap", "How", "hunters", "lion", "the", "did", "?"],
    acceptable_questions: [
      "How did the hunters trap the lion?",
      "How did hunters catch the lion?",
      "How was the lion trapped?"
    ],
    nova_answer_audio_text: "The hunters placed a strong rope net between two trees to trap the lion."
  },
  {
    cue_id: "cue_4",
    target_prompt_en: "How / the mouse / free the trapped lion?",
    target_prompt_vi: "Hỏi Nova: Chuột đã giải thoát sư tử như thế nào?",
    question_word: "How",
    word_bank: ["How", "did", "the", "mouse", "free", "the", "lion", "?"],
    scrambled_words: ["free", "How", "mouse", "lion", "did", "the", "?"],
    acceptable_questions: [
      "How did the mouse free the lion?",
      "How did he chew the ropes?",
      "How was the lion freed?"
    ],
    nova_answer_audio_text: "The mouse chewed through the thick ropes with his sharp teeth until the net broke."
  },
  {
    cue_id: "cue_5",
    target_prompt_en: "What / the moral lesson / of this fable?",
    target_prompt_vi: "Hỏi Nova: Bài học đạo đức của câu chuyện ngụ ngôn này là gì?",
    question_word: "What",
    word_bank: ["What", "is", "the", "moral", "lesson", "of", "the", "fable", "?"],
    scrambled_words: ["lesson", "What", "fable", "moral", "is", "the", "of", "?"],
    acceptable_questions: [
      "What is the moral lesson of the fable?",
      "What is the lesson of this story?",
      "What did we learn from the fable?"
    ],
    nova_answer_audio_text: "Even the smallest friend can be a great help in times of trouble."
  }
];

export const INFORMATION_EXCHANGE_P2 = {
  theme: "The Lion and the Mouse Fable Information Exchange",
  candidateA: {
    cardTitle: "Candidate A: The Mighty Lion's Day",
    fields: [
      { label: "Resting Location", value: "Under the shady tree in the green forest" },
      { label: "Time of Sleep", value: "Warm Monday afternoon" },
      { label: "Trap Equipment", value: "Heavy rope net placed by two hunters" },
      { label: "Roar Sound", value: "Loud roar heard from far across the forest" },
      { label: "New Best Friend", value: "The tiny brave mouse with sharp teeth" }
    ]
  },
  candidateB: {
    cardTitle: "Candidate B: The Brave Little Mouse",
    prompts: CUE_CARD_PROMPTS
  }
};
