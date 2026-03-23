// isEasy: true
const weekData = {
  weekId: 17,
  weekTitle_en: "My Best Friend",
  weekTitle_vi: "Người Bạn Thân Nhất",
  grammar_focus: "Sequencing (First, Next, Last)",
  global_vocab: [
    { word: "friend", definition_en: "Buddy.", definition_vi: "Bạn" },
    { word: "meet", definition_en: "See first time.", definition_vi: "Gặp" },
    { word: "share", definition_en: "Give part.", definition_vi: "Chia sẻ" },
    { word: "kind", definition_en: "Nice.", definition_vi: "Tốt bụng" },
    { word: "help", definition_en: "Aid.", definition_vi: "Giúp" },
    { word: "laugh", definition_en: "Haha.", definition_vi: "Cười" },
    { word: "school", definition_en: "Place to learn.", definition_vi: "Trường" },
    { word: "together", definition_en: "With.", definition_vi: "Cùng nhau" },
    { word: "fun", definition_en: "Good time.", definition_vi: "Vui" },
    { word: "best", definition_en: "Number 1.", definition_vi: "Nhất" }
  ],
  stations: {
    read_explore: {
      title: "Meeting Ben",
      image_url: "/images/week17/read_cover_easy_w17.jpg",
      content_en: "This is my best **friend**, Ben. **First**, I met him at **school**. He was shy. **Next**, we sat **together** at lunch. I **shared** my cookie. Ben **laughed**. **Last**, we played tag. Ben is very **kind**. He always **helps** me. We have **fun** every day.",
      content_vi: "Đây là bạn thân nhất của tôi, Ben. Đầu tiên, tôi gặp cậu ấy ở trường. Cậu ấy nhút nhát. Tiếp theo, chúng tôi ngồi cùng nhau lúc ăn trưa. Tôi chia sẻ bánh quy. Ben cười. Cuối cùng, chúng tôi chơi đuổi bắt. Ben rất tốt bụng. Cậu ấy luôn giúp tôi. Chúng tôi vui vẻ mỗi ngày.",
      audio_url: null,
      comprehension_questions: [
        { id: 1, question_en: "Who is the best friend?", answer: ["Ben."], hint_en: "His name is...", hint_vi: "Tên cậu là..." },
        { id: 2, question_en: "Where did they meet?", answer: ["At school."], hint_en: "At s...", hint_vi: "Ở trường..." },
        { id: 3, question_en: "What did they play?", answer: ["Tag."], hint_en: "T...", hint_vi: "Đuổi bắt..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "friend", pronunciation: "/frɛnd/", definition_vi: "Bạn", definition_en: "Pal.", example: "My friend.", collocation: "best friend", image_url: "/images/week17/friend.jpg" },
        { id: 2, word: "meet", pronunciation: "/miːt/", definition_vi: "Gặp", definition_en: "See.", example: "Nice to meet you.", collocation: "meet you", image_url: "/images/week17/meet.jpg" },
        { id: 3, word: "share", pronunciation: "/ʃɛː/", definition_vi: "Chia sẻ", definition_en: "Give.", example: "Share toys.", collocation: "share with", image_url: "/images/week17/share.jpg" },
        { id: 4, word: "shy", pronunciation: "/ʃʌɪ/", definition_vi: "Nhút nhát", definition_en: "Quiet.", example: "He is shy.", collocation: "feel shy", image_url: "/images/week17/shy.jpg" },
        { id: 5, word: "kind", pronunciation: "/kʌɪnd/", definition_vi: "Tốt", definition_en: "Nice.", example: "Be kind.", collocation: "kind person", image_url: "/images/week17/kind.jpg" },
        { id: 6, word: "help", pronunciation: "/hɛlp/", definition_vi: "Giúp", definition_en: "Aid.", example: "Help me.", collocation: "help friend", image_url: "/images/week17/help.jpg" },
        { id: 7, word: "laugh", pronunciation: "/lɑːf/", definition_vi: "Cười", definition_en: "Haha.", example: "We laugh.", collocation: "laugh loud", image_url: "/images/week17/laugh.jpg" },
        { id: 8, word: "lunch", pronunciation: "/lʌntʃ/", definition_vi: "Bữa trưa", definition_en: "Midday food.", example: "Eat lunch.", collocation: "have lunch", image_url: "/images/week17/lunch.jpg" },
        { id: 9, word: "play", pronunciation: "/pleɪ/", definition_vi: "Chơi", definition_en: "Fun.", example: "Play games.", collocation: "play tag", image_url: "/images/week17/play.jpg" },
        { id: 10, word: "best", pronunciation: "/bɛst/", definition_vi: "Nhất", definition_en: "Top.", example: "Best day.", collocation: "the best", image_url: "/images/week17/best.jpg" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Story Steps", title_vi: "Bước kể chuyện",
        rules: [
          { type: "1", icon: "1️⃣", rule_en: "First", rule_vi: "Đầu tiên" },
          { type: "2", icon: "👉", rule_en: "Next", rule_vi: "Tiếp theo" },
          { type: "3", icon: "🏁", rule_en: "Last", rule_vi: "Cuối cùng" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "_____, we met.", answer: "First", hint: "1" },
        { id: 2, type: "fill", question: "_____, we ate.", answer: "Next", hint: "2" },
        { id: 3, type: "fill", question: "_____, we played.", answer: "Last", hint: "3" },
        { id: 4, type: "mc", question: "Start with _____.", options: ["First", "Last"], answer: "First", hint: "Start" },
        { id: 5, type: "unscramble", question: "Sort:", words: ["First,", "hello"], answer: "First, hello.", hint: "1" },
        { id: 6, type: "fill", question: "_____, sit.", answer: "Next", hint: "2" },
        { id: 7, type: "fill", question: "_____, sleep.", answer: "Last", hint: "3" },
        { id: 8, type: "mc", question: "End with _____.", options: ["Last", "First"], answer: "Last", hint: "End" },
        { id: 9, type: "fill", question: "_____, run.", answer: "Next", hint: "2" },
        { id: 10, type: "unscramble", question: "Sort:", words: ["Last,", "bye"], answer: "Last, bye.", hint: "3" },
        { id: 11, type: "mc", question: "After First is _____.", options: ["Next", "Last"], answer: "Next", hint: "2" },
        { id: 12, type: "fill", question: "_____, wash.", answer: "First", hint: "1" },
        { id: 13, type: "fill", question: "_____, dry.", answer: "Next", hint: "2" },
        { id: 14, type: "fill", question: "_____, go.", answer: "Last", hint: "3" },
        { id: 15, type: "mc", question: "_____ comes first.", options: ["First", "Last"], answer: "First", hint: "1" },
        { id: 16, type: "unscramble", question: "Sort:", words: ["Next,", "play"], answer: "Next, play.", hint: "2" },
        { id: 17, type: "fill", question: "_____, open.", answer: "First", hint: "1" },
        { id: 18, type: "fill", question: "_____, look.", answer: "Next", hint: "2" },
        { id: 19, type: "fill", question: "_____, close.", answer: "Last", hint: "3" },
        { id: 20, type: "mc", question: "_____ is the end.", options: ["Last", "First"], answer: "Last", hint: "End" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn muốn làm quen bạn mới. Hãy hỏi tên bạn ấy.", context_en: "You want to meet a new friend. Ask his name.", answer: ["What is your name?"], hint: "What is..." },
        { id: 2, context_vi: "Bạn thấy bạn mình buồn. Hãy hỏi bạn có ổn không.", context_en: "Your friend is sad. Ask if they are okay.", answer: ["Are you okay?"], hint: "Are you..." },
        { id: 3, context_vi: "Bạn muốn chia sẻ bánh. Hãy hỏi bạn có muốn không.", context_en: "You want to share cookie. Ask if they want one.", answer: ["Do you want a cookie?"], hint: "Do you..." },
        { id: 4, context_vi: "Bạn rủ bạn chơi đuổi bắt.", context_en: "Ask friend to play tag.", answer: ["Do you want to play tag?"], hint: "Do you..." },
        { id: 5, context_vi: "Bạn muốn biết bạn mình thích màu gì.", context_en: "Ask friend's favorite color.", answer: ["What is your favorite color?"], hint: "What is..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Cookies", title_vi: "Bánh quy", question_en: "I have 2 cookies. I share 1. How many left?", question_vi: "Tôi có 2 bánh. Tôi chia 1. Còn mấy?", answer: ["1 cookie"], target_number: 1, unit: "cookie", hint_en: "2 - 1", hint_vi: "2 - 1" },
        { id: 2, type: "logic", title_en: "Friends", title_vi: "Bạn bè", question_en: "Ben is my friend. I am Ben's friend. Are we enemies?", question_vi: "Ben là bạn tôi. Tôi là bạn Ben. Chúng tôi có phải kẻ thù không?", answer: ["No"], target_number: 0, unit: "", hint_en: "Friends not enemies", hint_vi: "Bạn không thù" },
        { id: 3, type: "math", title_en: "Game", title_vi: "Trò chơi", question_en: "2 boys play tag. 2 girls join. Total kids?", question_vi: "2 nam chơi đuổi bắt. 2 nữ tham gia. Tổng?", answer: ["4 kids"], target_number: 4, unit: "kids", hint_en: "2 + 2", hint_vi: "2 + 2" },
        { id: 4, type: "pattern", title_en: "Emotion", title_vi: "Cảm xúc", question_en: "Happy, Sad, Happy, Sad... Next?", question_vi: "Vui, Buồn, Vui, Buồn... Tiếp?", answer: ["Happy"], target_number: 0, unit: "", hint_en: "Smile", hint_vi: "Cười" },
        { id: 5, type: "math", title_en: "Lunch", title_vi: "Bữa trưa", question_en: "Lunch is at 12. Recess is at 1. How many hours between?", question_vi: "Ăn trưa lúc 12. Ra chơi lúc 1. Cách mấy tiếng?", answer: ["1 hour"], target_number: 1, unit: "hour", hint_en: "12 to 1", hint_vi: "12 đến 1" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "Ben is my best friend.", meaning: "Ben là bạn thân nhất của tôi." },
        { id: 2, text: "I met him at school.", meaning: "Tôi gặp cậu ấy ở trường." },
        { id: 3, text: "We sat together.", meaning: "Chúng tôi ngồi cùng nhau." },
        { id: 4, text: "I shared my cookie.", meaning: "Tôi chia sẻ bánh quy." },
        { id: 5, text: "We have fun every day.", meaning: "Chúng tôi vui vẻ mỗi ngày." }
      ]
    },
    shadowing: {
      title: "Ben",
      script: [
        { id: 1, text: "This is Ben.", vi: "Đây là Ben." },
        { id: 2, text: "I met him at school.", vi: "Tôi gặp cậu ở trường." },
        { id: 3, text: "He was shy.", vi: "Cậu nhút nhát." },
        { id: 4, text: "We played tag.", vi: "Chúng tôi chơi đuổi bắt." },
        { id: 5, text: "He is kind.", vi: "Cậu ấy tốt bụng." }
      ]
    },
    // FIX: KEY 'writing'
    writing: {
      title: "My Friend",
      min_words: 25,
      model_sentence: "My friend is Anna. First, we meet at the park. Next, we run and play. Last, we go home. She is nice. I like her.",
      instruction_en: "Write about a friend (First, Next, Last).",
      instruction_vi: "Viết về một người bạn (Đầu, Tiếp, Cuối).",
      prompt_en: "Who is your friend? What do you do?",
      prompt_vi: "Bạn bạn là ai? Các bạn làm gì?",
      keywords: ["friend", "play", "nice", "fun"]
    },
    explore: {
      title_en: "Making Friends", title_vi: "Kết Bạn",
      image_url: "/images/week17/explore_easy_w17.jpg",
      content_en: "It is good to have **friends**. How do we make friends? **First**, we say hello. **Next**, we ask their name. **Then**, we play together. We **share** toys. We are **kind**. Friends help us when we are sad. Do you have a new friend?",
      content_vi: "Có bạn bè thật tốt. Làm sao để kết bạn? Đầu tiên, ta chào. Tiếp theo, ta hỏi tên. Sau đó, ta chơi cùng nhau. Ta chia sẻ đồ chơi. Ta tốt bụng. Bạn bè giúp ta khi buồn. Bạn có bạn mới không?",
      check_questions: [
        { id: 1, question_en: "What do we say first?", answer: ["Hello."], hint_en: "H...", hint_vi: "Xin chào..." },
        { id: 2, question_en: "What do we share?", answer: ["Toys."], hint_en: "T...", hint_vi: "Đồ chơi..." },
        { id: 3, question_en: "Do friends help?", answer: ["Yes."], hint_en: "Yes...", hint_vi: "Có..." }
      ],
      question: { text_en: "What is your friend's name?", text_vi: "Tên bạn của bạn là gì?", min_words: 5, hint_en: "My friend's name is...", hint_vi: "Tên bạn tôi là...", model_answer: "My friend's name is Tom." }
    },
    word_power: {
      words: [
        { id: 1, word: "good", pronunciation: "/ɡʊd/", cefr_level: "A1", definition_en: "Nice.", definition_vi: "Tốt", example: "Good boy.", model_sentence: "Be good.", collocation: "very good", image_url: "/images/week17/good.jpg" },
        { id: 2, word: "like", pronunciation: "/lʌɪk/", cefr_level: "A1", definition_en: "Enjoy.", definition_vi: "Thích", example: "I like dogs.", model_sentence: "I like you.", collocation: "really like", image_url: "/images/week17/like.jpg" },
        { id: 3, word: "give", pronunciation: "/ɡɪv/", cefr_level: "A1", definition_en: "Hand over.", definition_vi: "Cho", example: "Give a gift.", model_sentence: "Give me that.", collocation: "give to", image_url: "/images/week17/give.jpg" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Making Friends", videoId: "7cG9XXBHYtY", duration: "3:00", sim_duration: 180 },
        { id: 2, title: "Best Friends Song", videoId: "qOUBcwlnTyc", duration: "2:30", sim_duration: 150 },
        { id: 3, title: "First Next Then Last", videoId: "ool2Whw--7Y", duration: "3:00", sim_duration: 180 },
        { id: 4, title: "Sharing is Caring", videoId: "WDg85KdxFHU", duration: "3:30", sim_duration: 210 },
        { id: 5, title: "Playground Fun", videoId: "tGWiowdjnHk", duration: "2:30", sim_duration: 150 }
      ],
      bonus_games: []
    }
  }
};
export default weekData;
