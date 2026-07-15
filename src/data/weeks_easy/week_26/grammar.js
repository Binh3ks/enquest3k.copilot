export default {
  grammar_explanation: {
    title_en: "Past Simple: was, were, and -ed verbs",
    title_vi: "Quá Khứ Đơn: was, were và động từ -ed",
    rules: [
      {
        id: 1, icon: "1️⃣",
        rule_en: "WAS — use with I, He, She, It in the past",
        rule_vi: "WAS — dùng với I, He, She, It trong quá khứ",
        example_en: "Leo was happy. It was a great day.",
        example_vi: "Leo đã vui. Đó là một ngày tuyệt vời."
      },
      {
        id: 2, icon: "2️⃣",
        rule_en: "WERE — use with We, You, They in the past",
        rule_vi: "WERE — dùng với We, You, They trong quá khứ",
        example_en: "They were tired. We were happy.",
        example_vi: "Họ đã mệt. Chúng tôi đã vui."
      },
      {
        id: 3, icon: "3️⃣",
        rule_en: "REGULAR VERBS + -ED — add -ed to tell about the past",
        rule_vi: "ĐỘNG TỪ CÓ QUY TẮC + -ED — thêm -ed để nói về quá khứ",
        example_en: "Leo drew the panels. He colored them in.",
        example_vi: "Leo đã vẽ các ô truyện. Anh ấy đã tô màu chúng."
      },
      {
        id: 4, icon: "4️⃣",
        rule_en: "SEQUENCE WORDS: First, Then, After that, Finally",
        rule_vi: "TỪ TRÌNH TỰ: First, Then, After that, Finally",
        example_en: "First, Leo wrote the title. Then, he drew the panels.",
        example_vi: "Đầu tiên, Leo viết tiêu đề. Sau đó, anh ấy vẽ các ô."
      }
    ]
  },

  title: "Grammar: Past Simple — was, were, and -ed verbs",
  image_url: "/images/week26/grammar_cover_w26.jpg",
  audio_url: "/audio/week26_easy/grammar_main.mp3",
  rules: [
    {
      id: 1,
      rule_en: "WAS — use with I, He, She, It in the past",
      examples: ["It was sunny.", "Leo was happy.", "Max was excited.", "The park was beautiful."],
      audio_url: "/audio/week26_easy/grammar_rule1.mp3"
    },
    {
      id: 2,
      rule_en: "WERE — use with We, You, They in the past",
      examples: ["They were tired.", "We were happy.", "Leo and Max were at the park.", "The children were excited."],
      audio_url: "/audio/week26_easy/grammar_rule2.mp3"
    },
    {
      id: 3,
      rule_en: "REGULAR VERBS + -ED — add -ed to tell about the past",
      examples: ["Leo visited the park.", "Max played with his ball.", "They watched a show.", "Leo returned home."],
      audio_url: "/audio/week26_easy/grammar_rule3.mp3"
    },
    {
      id: 4,
      rule_en: "SEQUENCE WORDS — use words to tell the order",
      examples: ["First, Leo wrote the title.", "Then, he drew the panels.", "After that, he added captions.", "Finally, he colored it in."],
      audio_url: "/audio/week26_easy/grammar_rule4.mp3"
    }
  ],
  structure_table: {
    headers: ["Subject", "Verb", "Example"],
    rows: [
      ["I / He / She / It", "was", "It was sunny. Leo was happy."],
      ["We / You / They", "were", "They were tired. We were happy."],
      ["Action verb", "verb + -ed", "Leo visited. Max played. They watched."]
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "It ___ sunny at the park.", audio_url: "/audio/week26_easy/grammar_ex1.mp3", options: ["was", "were", "is", "are"], answer: "was", explanation_en: "Use WAS with It." },
    { id: 2, type: "mc", question: "Leo and Max ___ at the park.", audio_url: "/audio/week26_easy/grammar_ex2.mp3", options: ["were", "was", "is", "be"], answer: "were", explanation_en: "Use WERE with Leo and Max (they)." },
    { id: 3, type: "mc", question: "Max ___ with his ball for one hour.", audio_url: "/audio/week26_easy/grammar_ex3.mp3", options: ["played", "plays", "play", "playing"], answer: "played", explanation_en: "Add -ed to PLAY for past simple: played." },
    { id: 4, type: "mc", question: "They ___ a street performance.", audio_url: "/audio/week26_easy/grammar_ex4.mp3", options: ["watched", "watch", "watches", "watching"], answer: "watched", explanation_en: "Add -ed to WATCH for past simple: watched." },
    { id: 5, type: "mc", question: "Leo ___ home after the park.", audio_url: "/audio/week26_easy/grammar_ex5.mp3", options: ["returned", "return", "returns", "returning"], answer: "returned", explanation_en: "Add -ed to RETURN for past simple: returned." },
    { id: 6, type: "fill", question: "___ sunny at the park. (It was / It were)", audio_url: "/audio/week26_easy/grammar_ex6.mp3", answer: "It was", hint_en: "Use WAS with It." },
    { id: 7, type: "fill", question: "Leo ___ the park on Saturday. (visited / visit)", audio_url: "/audio/week26_easy/grammar_ex7.mp3", answer: "visited", hint_en: "Add -ed for past: visit → visited." },
    { id: 8, type: "fill", question: "They ___ tired but happy. (were / was)", audio_url: "/audio/week26_easy/grammar_ex8.mp3", answer: "were", hint_en: "Use WERE with They." },
    { id: 9, type: "fill", question: "Leo ___ four panels for his comic. (sketched / sketch)", audio_url: "/audio/week26_easy/grammar_ex9.mp3", answer: "sketched", hint_en: "Add -ed for past: sketch → sketched." },
    { id: 10, type: "fill", question: "The show ___ brilliant! (was / were)", audio_url: "/audio/week26_easy/grammar_ex10.mp3", answer: "was", hint_en: "Use WAS with The show (it)." },
    { id: 11, type: "unscramble", question: "Unscramble: [ was / sunny / It ]", audio_url: "/audio/week26_easy/grammar_ex11.mp3", answer: "It was sunny.", hint_en: "Start with It..." },
    { id: 12, type: "unscramble", question: "Unscramble: [ ball / played / Max / his / with ]", audio_url: "/audio/week26_easy/grammar_ex12.mp3", answer: "Max played with his ball.", hint_en: "Start with Max..." },
    { id: 13, type: "unscramble", question: "Unscramble: [ park / visited / Leo / the ]", audio_url: "/audio/week26_easy/grammar_ex13.mp3", answer: "Leo visited the park.", hint_en: "Start with Leo..." },
    { id: 14, type: "unscramble", question: "Unscramble: [ were / happy / They / but / tired ]", audio_url: "/audio/week26_easy/grammar_ex14.mp3", answer: "They were tired but happy.", hint_en: "Start with They..." },
    { id: 15, type: "mc", question: "Which sentence uses WAS correctly?", audio_url: "/audio/week26_easy/grammar_ex15.mp3", options: ["It was sunny.", "They was tired.", "We was happy.", "Leo and Max was there."], answer: "It was sunny.", explanation_en: "WAS is used with It — a singular subject." },
    { id: 16, type: "mc", question: "Which sentence uses WERE correctly?", audio_url: "/audio/week26_easy/grammar_ex16.mp3", options: ["They were tired.", "It were sunny.", "Leo were happy.", "The park were nice."], answer: "They were tired.", explanation_en: "WERE is used with They." },
    { id: 17, type: "fill", question: "Leo and Max ___ very happy. (was / were)", audio_url: "/audio/week26_easy/grammar_ex17.mp3", answer: "were", hint_en: "Leo and Max = they → WERE." },
    { id: 18, type: "fill", question: "They ___ music at the park. (watched / watch)", audio_url: "/audio/week26_easy/grammar_ex18.mp3", answer: "watched", hint_en: "Past simple: watch → watched." },
    { id: 19, type: "mc", question: "How do you say VISIT in the past?", audio_url: "/audio/week26_easy/grammar_ex19.mp3", options: ["visited", "visit", "visits", "visiting"], answer: "visited", explanation_en: "Add -ed: visit → visited." },
    { id: 20, type: "fill", question: "___, Leo returned home. (Finally / First)", audio_url: "/audio/week26_easy/grammar_ex20.mp3", answer: "Finally", hint_en: "Finally marks the last action." }
  ]
};
