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
    target_prompt_en: "Where / Jake / walk after science class?",
    target_prompt_vi: "Hỏi Nova: Jake đi đâu sau giờ học khoa học?",
    question_word: "Where",
    word_bank: ["Where", "was", "Jake", "walking", "after", "science", "class", "?"],
    scrambled_words: ["science", "walking", "Where", "class", "Jake", "after", "was", "?"],
    acceptable_questions: [
      "Where was Jake walking after science class?",
      "Where was Jake walking?",
      "Where was he walking?"
    ],
    nova_answer_audio_text: "Jake was walking carefully down the school corridor after science class."
  },
  {
    cue_id: "cue_2",
    target_prompt_en: "Why / boy / slip on wet floor?",
    target_prompt_vi: "Hỏi Nova: Tại sao cậu bé trượt chân?",
    question_word: "Why",
    word_bank: ["Why", "did", "the", "running", "boy", "slip", "on", "the", "floor", "?"],
    scrambled_words: ["slip", "Why", "floor", "running", "did", "boy", "on", "the", "the", "?"],
    acceptable_questions: [
      "Why did the running boy slip?",
      "Why did the boy slip on the floor?",
      "Why did he fall down?"
    ],
    nova_answer_audio_text: "He slipped because the corridor tiles were wet and he was running fast."
  },
  {
    cue_id: "cue_3",
    target_prompt_en: "Who / call / school nurse?",
    target_prompt_vi: "Hỏi Nova: Ai đã gọi cô y tá?",
    question_word: "Who",
    word_bank: ["Who", "did", "Jake", "call", "immediately", "for", "help", "?"],
    scrambled_words: ["help", "immediately", "Who", "call", "Jake", "for", "did", "?"],
    acceptable_questions: [
      "Who did Jake call for help?",
      "Who did Jake call immediately?",
      "Who did he call?"
    ],
    nova_answer_audio_text: "Jake stopped immediately and called the school nurse right away."
  },
  {
    cue_id: "cue_4",
    target_prompt_en: "What / nurse / apply to knee?",
    target_prompt_vi: "Hỏi Nova: Cô y tá dùng cái gì chườm/dán lên đầu gối?",
    question_word: "What",
    word_bank: ["What", "did", "the", "school", "nurse", "apply", "to", "his", "knee", "?"],
    scrambled_words: ["apply", "What", "nurse", "knee", "school", "his", "did", "to", "the", "?"],
    acceptable_questions: [
      "What did the school nurse apply to his knee?",
      "What did the nurse apply?",
      "What did she put on his cut?"
    ],
    nova_answer_audio_text: "The nurse applied a clean bandage and a cold pack to treat his knee."
  },
  {
    cue_id: "cue_5",
    target_prompt_en: "Why / headmaster / praise Jake?",
    target_prompt_vi: "Hỏi Nova: Tại sao thầy hiệu trưởng khen Jake?",
    question_word: "Why",
    word_bank: ["Why", "did", "the", "headmaster", "praise", "Jake", "?"],
    scrambled_words: ["praise", "headmaster", "Why", "Jake", "did", "the", "?"],
    acceptable_questions: [
      "Why did the headmaster praise Jake?",
      "Why did the principal praise Jake?",
      "Why was Jake praised?"
    ],
    nova_answer_audio_text: "The headmaster praised Jake for staying calm and calling the nurse quickly."
  }
];

export const INFORMATION_EXCHANGE_P2 = {
  title: "Cambridge Speaking Part 2 — Information Exchange",
  subtitle: "Candidate asks questions from cues (Table A) • Candidate answers Examiner's questions (Table B)",
  table_a: {
    title: "Tom's Accident",
    subtitle: "Candidate's Question Card (Ask Nova)",
    person: "Tom",
    fields: [
      {
        id: "field_a1",
        label: "where / get injured?",
        cue_word: "where",
        value: "?",
        is_missing: true,
        cue_prompt: "where / get injured?",
        grammar_scaffold: "Where did Tom get injured?",
        acceptable_questions: [
          "Where did Tom get injured?",
          "Where was Tom injured?",
          "Where did he get hurt?",
          "Where did he slip?"
        ],
        nova_reply: "Tom got injured in the main school corridor near the science lab."
      },
      {
        id: "field_a2",
        label: "what / hurt?",
        cue_word: "what",
        value: "?",
        is_missing: true,
        cue_prompt: "what / hurt?",
        grammar_scaffold: "What did Tom hurt?",
        acceptable_questions: [
          "What did Tom hurt?",
          "What did he hurt?",
          "Which part of his body did he hurt?",
          "What was hurt?"
        ],
        nova_reply: "Tom hurt his left knee when he fell on the wet floor."
      },
      {
        id: "field_a3",
        label: "what time / slip?",
        cue_word: "what time",
        value: "?",
        is_missing: true,
        cue_prompt: "what time / slip?",
        grammar_scaffold: "What time did Tom slip?",
        acceptable_questions: [
          "What time did Tom slip?",
          "What time did he slip?",
          "When did Tom slip?",
          "When did the accident happen?"
        ],
        nova_reply: "He slipped at 9:30 in the morning after science class."
      },
      {
        id: "field_a4",
        label: "why / fall down?",
        cue_word: "why",
        value: "?",
        is_missing: true,
        cue_prompt: "why / fall down?",
        grammar_scaffold: "Why did Tom fall down?",
        acceptable_questions: [
          "Why did Tom fall down?",
          "Why did he fall down?",
          "Why did he slip?",
          "Why was the floor slippery?"
        ],
        nova_reply: "He fell down because he was running fast and the corridor floor was wet."
      }
    ]
  },
  table_b: {
    title: "Jake's Quick Action",
    subtitle: "Candidate's Information Sheet (Answer Nova)",
    person: "Jake",
    fields: [
      {
        id: "field_b1",
        label: "Action taken",
        value: "Called the school nurse immediately",
        nova_question: "What action did Jake take when Tom fell down?",
        acceptable_answers: [
          "He called the school nurse immediately.",
          "Jake called the school nurse.",
          "He called the nurse for help."
        ]
      },
      {
        id: "field_b2",
        label: "First aid item",
        value: "Clean bandage and a cold pack",
        nova_question: "What first aid items did the nurse bring?",
        acceptable_answers: [
          "She brought a clean bandage and a cold pack.",
          "A clean bandage and cold pack.",
          "Clean bandage and cold pack."
        ]
      },
      {
        id: "field_b3",
        label: "Who helped",
        value: "The school nurse and Jake",
        nova_question: "Who helped Tom after the accident?",
        acceptable_answers: [
          "The school nurse and Jake helped him.",
          "The school nurse.",
          "Jake and the school nurse."
        ]
      },
      {
        id: "field_b4",
        label: "How everyone felt",
        value: "Relieved and safe",
        nova_question: "How did everyone feel after Tom was treated?",
        acceptable_answers: [
          "Everyone felt relieved and safe.",
          "They felt relieved and safe.",
          "Relieved and happy."
        ]
      }
    ]
  }
};


export const PICTURE_STORY_CONTINUATION = {
  title: "Safety First at School",
  intro_audio_text: "Look at the five pictures. They tell a story called 'Safety First at School'. Just look at Picture 1 first. Jake was walking carefully down the corridor after science class.",
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
      title: "Picture 4: Applying clean bandage",
      image: "/images/week33/webtoon_scene_4.png",
      prompt_en: "How did the nurse treat Tom in Picture 4?",
      prompt_vi: "Cô y tá đã chữa trị cho Tom như thế nào ở Bức tranh 4?",
      key_chunks: ["clean bandage", "cold pack"]
    },
    {
      id: 5,
      title: "Picture 5: Feeling relieved & praised",
      image: "/images/week33/webtoon_scene_5.png",
      prompt_en: "How does the story end in Picture 5?",
      prompt_vi: "Câu chuyện kết thúc như thế nào ở Bức tranh 5?",
      key_chunks: ["felt relieved", "praised by headmaster"]
    }
  ]
};


