// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Grammar Station — Easy Mode
// Focus: WHO, WHICH, THAT — Basic Relative Clauses

export default {
  title: "Grammar: WHO, WHICH, THAT — Relative Clauses",
  audio_url: "/audio/week34_easy/grammar_main.mp3",
  grammar_explanation: {
    title_en: "WHO, WHICH, THAT — Clauses About People and Things",
    title_vi: "WHO, WHICH, THAT — Mệnh Đề Về Người và Vật",
    rules: [
      {
        id: 1, icon: "1",
        rule_en: "Use WHO for people and animals",
        rule_vi: "Dùng WHO cho người và động vật",
        example_en: "The ant is an insect WHO works very hard. (con kiến là một côn trùng LÀM VIỆC rất chăm chỉ)",
        example_vi: "Con kiến là một côn trùng LÀM VIỆC rất chăm chỉ."
      },
      {
        id: 2, icon: "2",
        rule_en: "Use WHICH for things",
        rule_vi: "Dùng WHICH cho vật",
        example_en: "The story WHICH we read is about an ant. (câu chuyện MÀ chúng ta đọc kể về một con kiến)",
        example_vi: "Câu chuyện MÀ chúng ta đọc kể về một con kiến."
      },
      {
        id: 3, icon: "3",
        rule_en: "Use THAT for both people and things",
        rule_vi: "Dùng THAT cho cả người và vật",
        example_en: "The ant THAT worked hard was happy. (con kiến MÀ làm việc chăm chỉ thì hạnh phúc)",
        example_vi: "Con kiến MÀ làm việc chăm chỉ thì hạnh phúc."
      }
    ]
  },
  exercises: [
    {
      id: 1, type: "multiple_choice",
      question_en: "Choose the correct word: The ant ___ works very hard.",
      options: ["who", "which"],
      answer: "who",
      hint_en: "WHO dùng cho con kiến (động vật)",
      hint_vi: "Dùng WHO cho động vật"
    },
    {
      id: 2, type: "multiple_choice",
      question_en: "Choose the correct word: The fable ___ we read is about an ant.",
      options: ["who", "which"],
      answer: "which",
      hint_en: "WHICH dùng cho truyện ngụ ngôn (vật)",
      hint_vi: "Dùng WHICH cho câu chuyện"
    },
    {
      id: 3, type: "fill_blank",
      question_en: "Fill in the blank: The ant ___ works very hard.",
      answer: "who",
      hint_en: "WHO dùng cho con kiến",
      hint_vi: "Điền WHO"
    },
    {
      id: 4, type: "fill_blank",
      question_en: "Fill in the blank: The story ___ we read is a fable.",
      answer: "which",
      hint_en: "WHICH dùng cho câu chuyện",
      hint_vi: "Điền WHICH"
    },
    {
      id: 5, type: "fill_blank",
      question_en: "Fill in the blank: The grasshopper ___ never worked was lazy.",
      answer: "that",
      hint_en: "THAT có thể dùng cho cả hai",
      hint_vi: "Điền THAT"
    },
    {
      id: 6, type: "fill_blank",
      question_en: "Fill in the blank: The winter ___ came was very cold.",
      answer: "that",
      hint_en: "THAT dùng cho mùa đông",
      hint_vi: "Điền THAT"
    },
    {
      id: 7, type: "unscramble",
      question_en: "Put the words in the right order:",
      words: ["The", "ant", "who", "gathered", "seeds", "every", "day"],
      answer: "The ant who gathered seeds every day",
      hint_en: "Bắt đầu với 'The ant who...'",
      hint_vi: "Bắt đầu với 'The ant who...'"
    },
    {
      id: 8, type: "unscramble",
      question_en: "Put the words in the right order:",
      words: ["The", "grasshopper", "which", "never", "worked", "was", "lazy"],
      answer: "The grasshopper which never worked was lazy",
      hint_en: "Bắt đầu với 'The grasshopper which...'",
      hint_vi: "Bắt đầu với 'The grasshopper which...'"
    },
    {
      id: 9, type: "multiple_choice",
      question_en: "Choose the correct word: The ant that/who gathered seeds was ___.",
      options: ["clever", "lazy", "sad", "tired"],
      answer: "clever",
      hint_en: "Con kiến nhặt hạt thì thông minh",
      hint_vi: "Đáp án đúng: clever"
    },
    {
      id: 10, type: "true_false",
      question_en: "True or False: We use WHO for things like 'story' and 'fable'.",
      answer: "false",
      hint_en: "WHICH dùng cho 'story' và 'fable' (vật), không phải WHO",
      hint_vi: "Sai. WHICH dùng cho vật, WHO cho người/động vật"
    },
    {
      id: 11, type: "fill_blank",
      question_en: "Fill in the blank: The grasshopper ___ lived under a leaf was lazy.",
      answer: "who",
      hint_en: "WHO dùng cho châu chấu (động vật)",
      hint_vi: "Điền WHO"
    },
    {
      id: 12, type: "fill_blank",
      question_en: "Fill in the blank: The hill ___ the ant lived in was small.",
      answer: "that",
      hint_en: "THAT dùng cho gò đất",
      hint_vi: "Điền THAT"
    },
    {
      id: 13, type: "fill_blank",
      question_en: "Fill in the blank: The summer ___ was warm was long.",
      answer: "that",
      hint_en: "THAT dùng cho mùa hè",
      hint_vi: "Điền THAT"
    },
    {
      id: 14, type: "fill_blank",
      question_en: "Fill in the blank: The food ___ the ant stored was for winter.",
      answer: "that",
      hint_en: "THAT dùng cho thức ăn",
      hint_vi: "Điền THAT"
    },
    {
      id: 15, type: "multiple_choice",
      question_en: "Choose the correct word: The winter ___ was very cold came in December.",
      options: ["who", "which", "that"],
      answer: "that",
      hint_en: "THAT dùng cho mùa đông",
      hint_vi: "Điền THAT"
    },
    {
      id: 16, type: "unscramble",
      question_en: "Put the words in the right order:",
      words: ["The", "grasshopper", "that", "never", "worked", "was", "lazy"],
      answer: "The grasshopper that never worked was lazy",
      hint_en: "Bắt đầu với 'The grasshopper that...'",
      hint_vi: "Bắt đầu với 'The grasshopper that...'"
    },
    {
      id: 17, type: "fill_blank",
      question_en: "Fill in the blank: The lesson ___ we learned was very important.",
      answer: "which",
      hint_en: "WHICH dùng cho bài học",
      hint_vi: "Điền WHICH"
    },
    {
      id: 18, type: "fill_blank",
      question_en: "Fill in the blank: The leaf ___ the grasshopper lived under was green.",
      answer: "which",
      hint_en: "WHICH dùng cho chiếc lá",
      hint_vi: "Điền WHICH"
    },
    {
      id: 19, type: "true_false",
      question_en: "True or False: THAT can be used for both people and things.",
      answer: "true",
      hint_en: "Đúng! THAT dùng cho cả người và vật",
      hint_vi: "Đúng! THAT dùng cho cả người và vật"
    },
    {
      id: 20, type: "unscramble",
      question_en: "Put the words in the right order:",
      words: ["A", "fable", "is", "a", "story", "which", "teaches", "a", "lesson"],
      answer: "A fable is a story which teaches a lesson",
      hint_en: "Bắt đầu với 'A fable is...'",
      hint_vi: "Bắt đầu với 'A fable is...'"
    }
  ]
};
