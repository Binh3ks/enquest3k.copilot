export default {
  grammar_explanation: {
    title_en: "Was / Were + Adjectives",
    title_vi: "Was / Were + Tính từ (Quá Khứ)",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "Use WAS with I / He / She / It",
        rule_vi: "Dùng WAS với I / He / She / It",
        example_en: "I was scared. She was excited. He was tired.",
        example_vi: "Tôi đã sợ. Cô ấy đã hào hứng. Anh ấy đã mệt."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "Use WERE with You / We / They",
        rule_vi: "Dùng WERE với You / We / They",
        example_en: "You were hungry. We were bored. They were surprised.",
        example_vi: "Bạn đã đói. Chúng tôi đã chán. Họ đã ngạc nhiên."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "Negative: was not (wasn't) / were not (weren't)",
        rule_vi: "Phủ định: was not (wasn't) / were not (weren't)",
        example_en: "I wasn't angry. She wasn't worried. They weren't upset.",
        example_vi: "Tôi không tức. Cô ấy không lo lắng. Họ không buồn."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "Question: Was / Were + subject + adjective?",
        rule_vi: "Câu hỏi: Was / Were + chủ ngữ + tính từ?",
        example_en: "Was she scared? Were they excited? Was he calm?",
        example_vi: "Cô ấy có sợ không? Họ có hào hứng không? Anh ấy có bình tĩnh không?"
      }
    ]
  },

  title: "Was / Were + Adjectives",
  image_url: "/images/week24/grammar_cover_w24.jpg",
  audio_url: "/audio/week24/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "Use WAS with I / He / She / It",
      examples: ["I was scared.", "She was excited.", "He was tired.", "It was cold."],
      audio_url: "/audio/week24/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "Use WERE with You / We / They",
      examples: ["You were hungry.", "We were bored.", "They were surprised.", "The children were cheerful."],
      audio_url: "/audio/week24/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "Negative: was not (wasn't) / were not (weren't)",
      examples: ["I wasn't angry.", "She wasn't worried.", "They weren't upset.", "We weren't tired."],
      audio_url: "/audio/week24/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "Question: Was + subject + adjective? / Were + subject + adjective?",
      examples: ["Was she scared?", "Were they excited?", "Was he calm?", "Were you relieved?"],
      audio_url: "/audio/week24/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Subject", "was / were", "Adjective"],
    rows: [
      ["I / He / She / It", "was", "scared / tired / angry / calm..."],
      ["You / We / They", "were", "excited / bored / happy / upset..."]
    ]
  },
  exercises: [
    {
      id: 1,
      type: "mc",
      question: "Yesterday, I ___ very tired after school.",
      audio_url: "/audio/week24/grammar_ex1.mp3",
      options: ["was", "were", "is", "am"],
      answer: "was",
      explanation_en: "Use WAS with I."
    },
    {
      id: 2,
      type: "mc",
      question: "The children ___ excited about the surprise visitor.",
      audio_url: "/audio/week24/grammar_ex2.mp3",
      options: ["was", "were", "are", "be"],
      answer: "were",
      explanation_en: "Use WERE with plural subjects (the children)."
    },
    {
      id: 3,
      type: "mc",
      question: "She ___ calm when everyone else was worried.",
      audio_url: "/audio/week24/grammar_ex3.mp3",
      options: ["was", "were", "is", "are"],
      answer: "was",
      explanation_en: "Use WAS with She."
    },
    {
      id: 4,
      type: "mc",
      question: "___ you scared when you heard the loud noise?",
      audio_url: "/audio/week24/grammar_ex4.mp3",
      options: ["Was", "Were", "Are", "Is"],
      answer: "Were",
      explanation_en: "Use WERE with You in a question."
    },
    {
      id: 5,
      type: "mc",
      question: "They ___ not bored during the science class.",
      audio_url: "/audio/week24/grammar_ex5.mp3",
      options: ["wasn't", "weren't", "isn't", "aren't"],
      answer: "weren't",
      explanation_en: "Use WEREN'T with They in the negative."
    },
    {
      id: 6,
      type: "fill",
      question: "I ___ very hungry before lunch. (was / were)",
      audio_url: "/audio/week24/grammar_ex6.mp3",
      answer: "was",
      hint_en: "Think: I → was or were?"
    },
    {
      id: 7,
      type: "fill",
      question: "We ___ surprised by the news. (was / were)",
      audio_url: "/audio/week24/grammar_ex7.mp3",
      answer: "were",
      hint_en: "Think: We → was or were?"
    },
    {
      id: 8,
      type: "fill",
      question: "Mia ___ relieved when she found her homework. (was / were)",
      audio_url: "/audio/week24/grammar_ex8.mp3",
      answer: "was",
      hint_en: "Think: Mia = She → was or were?"
    },
    {
      id: 9,
      type: "fill",
      question: "Leo ___ upset because no one found his pencil. (was / were)",
      audio_url: "/audio/week24/grammar_ex9.mp3",
      answer: "was",
      hint_en: "Think: Leo = He → was or were?"
    },
    {
      id: 10,
      type: "fill",
      question: "The students ___ thirsty after sitting for a long time. (was / were)",
      audio_url: "/audio/week24/grammar_ex10.mp3",
      answer: "were",
      hint_en: "Think: The students = They → was or were?"
    },
    {
      id: 11,
      type: "fill",
      question: "She ___ not angry — she ___ calm. (was / were)",
      audio_url: "/audio/week24/grammar_ex11.mp3",
      answer: ["wasn't", "was"],
      multi: true,
      hint_en: "Negative: was not → wasn't"
    },
    {
      id: 12,
      type: "fill",
      question: "They ___ not bored — they ___ excited! (was / were)",
      audio_url: "/audio/week24/grammar_ex12.mp3",
      answer: ["weren't", "were"],
      multi: true,
      hint_en: "Negative: were not → weren't"
    },
    {
      id: 13,
      type: "unscramble",
      question: "Unscramble: [ worried / was / I / the test / about ]",
      audio_url: "/audio/week24/grammar_ex13.mp3",
      answer: "I was worried about the test.",
      hint_en: "Start with the subject I..."
    },
    {
      id: 14,
      type: "unscramble",
      question: "Unscramble: [ were / they / surprised / very ]",
      audio_url: "/audio/week24/grammar_ex14.mp3",
      answer: "They were very surprised.",
      hint_en: "Start with the subject They..."
    },
    {
      id: 15,
      type: "unscramble",
      question: "Unscramble: [ she / scared / was / not ]",
      audio_url: "/audio/week24/grammar_ex15.mp3",
      answer: "She was not scared.",
      hint_en: "Start with she..."
    },
    {
      id: 16,
      type: "unscramble",
      question: "Unscramble: [ were / why / tired / you ]",
      audio_url: "/audio/week24/grammar_ex16.mp3",
      answer: "Why were you tired?",
      hint_en: "This is a question — start with Why..."
    },
    {
      id: 17,
      type: "mc",
      question: "Tom and his sister ___ angry because it was raining.",
      audio_url: "/audio/week24/grammar_ex17.mp3",
      options: ["was", "were", "is", "are"],
      answer: "were",
      explanation_en: "Tom and his sister = They → WERE"
    },
    {
      id: 18,
      type: "mc",
      question: "It ___ cold and the children were hungry.",
      audio_url: "/audio/week24/grammar_ex18.mp3",
      options: ["was", "were", "is", "are"],
      answer: "was",
      explanation_en: "It → WAS"
    },
    {
      id: 19,
      type: "fill",
      question: "___ he upset when he lost the game? (Was / Were)",
      audio_url: "/audio/week24/grammar_ex19.mp3",
      answer: "Was",
      hint_en: "He → Was or Were in a question?"
    },
    {
      id: 20,
      type: "fill",
      question: "After the party, everyone ___ cheerful and happy.",
      audio_url: "/audio/week24/grammar_ex20.mp3",
      answer: "was",
      hint_en: "Everyone = singular → was or were?"
    }
  ]
};
