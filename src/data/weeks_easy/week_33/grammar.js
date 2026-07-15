// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Grammar Station — Easy Mode

export default {
  title: "Grammar: Past Simple — Group 5 Irregular Verbs (Easy)",
  audio_url: "/audio/week33_easy/grammar_main.mp3",
  grammar_explanation: {
    title_en: "Irregular Verbs: Accident Verbs",
    title_vi: "Động Từ Bất Quy Tắc: Động Từ Tai Nạn",
    rules: [
      {
        id: 1, icon: "1",
        rule_en: "hit→hit, fall→fell, break→broke",
        rule_vi: "hit→hit, fall→fell, break→broke",
        example_en: "I hit the table. I fell down. I broke the cup.",
        example_vi: "Tôi đập vào bàn. Tôi ngã xuống. Tôi làm vỡ cốc."
      },
      {
        id: 2, icon: "2",
        rule_en: "hurt→hurt, bite→bit, begin→began",
        rule_vi: "hurt→hurt, bite→bit, begin→began",
        example_en: "My knee hurt. The dog bit me. The class began at 8.",
        example_vi: "Đầu gối tôi đau. Con chó cắn tôi. Lớp bắt đầu lúc 8."
      },
      {
        id: 3, icon: "3",
        rule_en: "lose→lost, forget→forgot",
        rule_vi: "lose→lost, forget→forgot",
        example_en: "I lost my book. I forgot my homework.",
        example_vi: "Tôi làm mất sách. Tôi quên bài tập."
      },
      {
        id: 4, icon: "4",
        rule_en: "NEGATIVE: didn't + base verb",
        rule_vi: "PHỦ ĐỊNH: didn't + động từ nguyên mẫu",
        example_en: "I didn't fall. She didn't forget.",
        example_vi: "Tôi không ngã. Cô ấy không quên."
      }
    ]
  },
  exercises: [
    {
      id: 1,
      type: "fill_blank",
      sentence: "Jake ___ his knee on the table yesterday.",
      answer: "hit",
      hint: "hit-hit",
      audio_url: null
    },
    {
      id: 2,
      type: "fill_blank",
      sentence: "He ___ down and broke the glass cup.",
      answer: "fell",
      hint: "fall-fell",
      audio_url: null
    },
    {
      id: 3,
      type: "fill_blank",
      sentence: "Jake ___ the glass cup when he fell.",
      answer: "broke",
      hint: "break-broke",
      audio_url: null
    },
    {
      id: 4,
      type: "fill_blank",
      sentence: "His knee ___ a lot after the fall.",
      answer: "hurt",
      hint: "hurt-hurt",
      audio_url: null
    },
    {
      id: 5,
      type: "fill_blank",
      sentence: "The dog ___ Jake's hand last week.",
      answer: "bit",
      hint: "bite-bit",
      audio_url: null
    },
    {
      id: 6,
      type: "fill_blank",
      sentence: "The class ___ at 8 o'clock this morning.",
      answer: "began",
      hint: "begin-began",
      audio_url: null
    },
    {
      id: 7,
      type: "fill_blank",
      sentence: "Jake ___ his homework at home.",
      answer: "lost",
      hint: "lose-lost",
      audio_url: null
    },
    {
      id: 8,
      type: "fill_blank",
      sentence: "He ___ to bring his book to school.",
      answer: "forgot",
      hint: "forget-forgot",
      audio_url: null
    },
    {
      id: 9,
      type: "fill_blank",
      sentence: "Jake was running because he ___ to walk carefully.",
      answer: "forgot",
      hint: "forget-forgot",
      audio_url: null
    },
    {
      id: 10,
      type: "fill_blank",
      sentence: "The mosquito ___ Tom's arm during the picnic yesterday.",
      answer: "bit",
      hint: "bite-bit",
      audio_url: null
    },
    {
      id: 11,
      type: "fill_blank",
      sentence: "Jake ___ down hard and ___ his knee on the table.",
      answer: ["fell", "hit"],
      hint: "fall-fell, hit-hit",
      audio_url: null
    },
    {
      id: 12,
      type: "sentence_match",
      sentence: "Match the base form to the past form:",
      pairs: [
        { left: "hit", right: "hit" },
        { left: "fall", right: "fell" },
        { left: "break", right: "broke" },
        { left: "hurt", right: "hurt" }
      ]
    },
    {
      id: 13,
      type: "unscramble",
      sentence: "Unscramble the words:",
      words: ["fell", "down", "He", "and", "broke", "cup", "the", "glass"],
      answer: "He fell down and broke the glass cup"
    },
    {
      id: 14,
      type: "fill_blank",
      sentence: "Jake ___ his knee on the table and it ___ a lot.",
      answer: ["hit", "hurt"],
      hint: "hit-hit, hurt-hurt",
      audio_url: null
    },
    {
      id: 15,
      type: "sentence_correct",
      sentence: "Correct the sentence: Jake goed to school yesterday.",
      answer: "Jake went to school yesterday",
      hint: "go → went (Group 4)"
    },
    {
      id: 16,
      type: "fill_blank",
      sentence: "Jake ___ his hand when the door closed quickly.",
      answer: "caught",
      hint: "catch-caught",
      audio_url: null
    },
    {
      id: 17,
      type: "mc",
      sentence: "Which is the CORRECT sentence?",
      options: ["Jake hitted the table.", "Jake hit the table.", "Jake hitting the table.", "Jake hits the table."],
      answer: "Jake hit the table.",
      hint: "hit-hit (no change)"
    },
    {
      id: 18,
      type: "fill_blank",
      sentence: "I ___ my homework at home yesterday.",
      answer: "lost",
      hint: "lose-lost",
      audio_url: null
    },
    {
      id: 19,
      type: "unscramble",
      sentence: "Unscramble the words:",
      words: ["forgot", "He", "to", "do", "his", "homework"],
      answer: "He forgot to do his homework"
    },
    {
      id: 20,
      type: "fill_blank",
      sentence: "The movie ___ at 7 PM and ___ at 9 PM last night.",
      answer: ["began", "ended"],
      hint: "begin-began, end-ended",
      audio_url: null
    }
  ]
};
