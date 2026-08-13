// Week 33 Mascot Nova AI Voice Dialogue Cards (5 Turns)
export default [
  {
    id: 1,
    title_en: "Turn 1: What were you doing when the accident happened?",
    sample_question_en: "I was walking down the corridor after science class.",
    sample_question_vi: "Tôi đang đi bộ xuống hành lang sau giờ học khoa học.",
    answer: "Good! What did you see while you were walking?",
    word_bank: ["was", "walking", "down", "corridor", "science"]
  },
  {
    id: 2,
    title_en: "Turn 2: How did the classmate get hurt?",
    sample_question_en: "He slipped on the wet floor and fell down.",
    sample_question_vi: "Cậu ấy bị trượt chân trên sàn nhà ướt và ngã xuống.",
    answer: "Oh no! Which part of his body did he hurt?",
    word_bank: ["slipped", "wet", "floor", "fell", "knee"]
  },
  {
    id: 3,
    title_en: "Turn 3: What quick action did you take?",
    sample_question_en: "I called the school nurse immediately to get help.",
    sample_question_vi: "Tôi đã gọi y tế nhà trường ngay lập tức để nhận sự giúp đỡ.",
    answer: "Well done! How did the nurse treat his cut?",
    word_bank: ["called", "school", "nurse", "immediately", "help"]
  },
  {
    id: 4,
    title_en: "Turn 4: How did the nurse treat the injury?",
    sample_question_en: "She applied a clean bandage and a cold pack.",
    sample_question_vi: "Cô ấy đã dán băng cá nhân sạch và túi chườm lạnh.",
    answer: "Wonderful! How did everyone feel after that?",
    word_bank: ["applied", "clean", "bandage", "cold", "pack"]
  },
  {
    id: 5,
    title_en: "Turn 5: What lesson did everyone learn?",
    sample_question_en: "We learned to walk carefully and follow safety rules.",
    sample_question_vi: "Chúng tôi học được cách đi lại cẩn thận và tuân thủ quy tắc an toàn.",
    answer: "Excellent! Safety rules protect everyone at school.",
    word_bank: ["learned", "walk", "carefully", "follow", "rules"]
  }
];

export const CUE_CARD_PROMPTS = [
  {
    cue_id: "cue_1",
    target_prompt_en: "Ask Nova where Jake was walking after science class.",
    target_prompt_vi: "Hỏi Nova xem Jake đang đi đâu sau giờ học khoa học.",
    question_word: "Where",
    word_bank: ["Where", "was", "Jake", "walking", "after", "science", "class", "?"],
    acceptable_questions: [
      "Where was Jake walking after science class?",
      "Where was Jake walking?",
      "Where was he walking?"
    ],
    nova_answer_audio_text: "Jake was walking carefully down the school corridor after science class."
  },
  {
    cue_id: "cue_2",
    target_prompt_en: "Ask Nova why the running boy slipped on the floor.",
    target_prompt_vi: "Hỏi Nova tại sao cậu bé đang chạy lại bị trượt chân.",
    question_word: "Why",
    word_bank: ["Why", "did", "the", "running", "boy", "slip", "on", "the", "floor", "?"],
    acceptable_questions: [
      "Why did the running boy slip?",
      "Why did the boy slip on the floor?",
      "Why did he fall down?"
    ],
    nova_answer_audio_text: "He slipped because the corridor tiles were wet and he was running fast."
  },
  {
    cue_id: "cue_3",
    target_prompt_en: "Ask Nova who Jake called immediately for help.",
    target_prompt_vi: "Hỏi Nova xem Jake đã gọi ai ngay lập tức để giúp đỡ.",
    question_word: "Who",
    word_bank: ["Who", "did", "Jake", "call", "immediately", "for", "help", "?"],
    acceptable_questions: [
      "Who did Jake call for help?",
      "Who did Jake call immediately?",
      "Who did he call?"
    ],
    nova_answer_audio_text: "Jake stopped immediately and called the school nurse right away."
  },
  {
    cue_id: "cue_4",
    target_prompt_en: "Ask Nova what the school nurse applied to his cut knee.",
    target_prompt_vi: "Hỏi Nova xem cô y tá đã dán/chườm cái gì lên vết thương.",
    question_word: "What",
    word_bank: ["What", "did", "the", "school", "nurse", "apply", "to", "his", "knee", "?"],
    acceptable_questions: [
      "What did the school nurse apply to his knee?",
      "What did the nurse apply?",
      "What did she put on his cut?"
    ],
    nova_answer_audio_text: "The nurse applied a clean bandage and a cold pack to treat his knee."
  },
  {
    cue_id: "cue_5",
    target_prompt_en: "Ask Nova why the headmaster praised Jake.",
    target_prompt_vi: "Hỏi Nova tại sao thầy hiệu trưởng lại tuyên dương Jake.",
    question_word: "Why",
    word_bank: ["Why", "did", "the", "headmaster", "praise", "Jake", "?"],
    acceptable_questions: [
      "Why did the headmaster praise Jake?",
      "Why did he praise Jake?",
      "Why was Jake praised?"
    ],
    nova_answer_audio_text: "The headmaster praised Jake for following safety rules and acting responsibly."
  }
];

export const PICTURE_STORY_CONTINUATION = {
  title: "Safety First at School",
  intro_audio_text: "Look at the four pictures. They tell a story called 'Safety First at School'. Just look at Picture 1 first. Jake was walking carefully down the corridor after science class when he noticed a slippery floor.",
  pictures: [
    {
      id: 1,
      title: "Picture 1: Walking down corridor",
      image: "/images/week33/webtoon_scene_1.png",
      is_intro: true,
      script: "Jake was walking carefully down the corridor after science class."
    },
    {
      id: 2,
      title: "Picture 2: Slipping on wet floor",
      image: "/images/week33/webtoon_scene_2.png",
      prompt_en: "Now you tell the story! What happened next in Picture 2?",
      prompt_vi: "Bây giờ bạn hãy kể tiếp! Chuyện gì đã xảy ra ở Bức tranh 2?",
      key_chunks: ["slipped on wet floor", "fell down heavily"]
    },
    {
      id: 3,
      title: "Picture 3: Calling the school nurse",
      image: "/images/week33/webtoon_scene_3.png",
      prompt_en: "What quick action did Jake take in Picture 3?",
      prompt_vi: "Jake đã làm hành động nhanh trí nào ở Bức tranh 3?",
      key_chunks: ["called school nurse", "stopped immediately"]
    },
    {
      id: 4,
      title: "Picture 4: Applying first aid & praised",
      image: "/images/week33/webtoon_scene_4.png",
      prompt_en: "How does the story end in Picture 4?",
      prompt_vi: "Câu chuyện kết thúc như thế nào ở Bức tranh 4?",
      key_chunks: ["clean bandage", "cold pack", "praised by headmaster"]
    }
  ]
};

