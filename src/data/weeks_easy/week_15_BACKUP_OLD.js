// isEasy: true
const weekData = {
  weekId: 15,
  weekTitle_en: "Grandma's Old Box",
  weekTitle_vi: "Chiếc Hộp Cũ Của Bà",
  grammar_focus: "Past Simple (Regular)",
  global_vocab: [
    { word: "box", definition_en: "Container.", definition_vi: "Cái hộp" },
    { word: "open", definition_en: "Not closed.", definition_vi: "Mở" },
    { word: "picture", definition_en: "A photo or drawing.", definition_vi: "Bức tranh/ảnh" },
    { word: "look", definition_en: "See with eyes.", definition_vi: "Nhìn" },
    { word: "smile", definition_en: "Happy face.", definition_vi: "Cười" },
    { word: "ask", definition_en: "Question.", definition_vi: "Hỏi" },
    { word: "walk", definition_en: "Move on feet.", definition_vi: "Đi bộ" },
    { word: "cook", definition_en: "Make food.", definition_vi: "Nấu ăn" },
    { word: "play", definition_en: "Have fun.", definition_vi: "Chơi" },
    { word: "love", definition_en: "Like very much.", definition_vi: "Yêu" }
  ],
  stations: {
    read_explore: {
      title: "Grandma's Treasures",
      image_url: "/images/week15/read_cover_easy_w15.jpg",
      content_en: "Yesterday, I visited Grandma. She **opened** an old **box**. Inside, I **looked** at many things. I saw a black and white **picture**. Grandma **smiled**. \"I **played** with this doll,\" she said. \"I **walked** to school.\" She **cooked** on a fire. She **loved** her simple life. I liked her stories.",
      content_vi: "Hôm qua, tôi thăm bà. Bà mở một chiếc hộp cũ. Bên trong, tôi nhìn thấy nhiều thứ. Tôi thấy một bức ảnh đen trắng. Bà mỉm cười. \"Bà đã chơi với con búp bê này,\" bà nói. \"Bà đã đi bộ đến trường.\" Bà nấu ăn trên lửa. Bà yêu cuộc sống đơn giản của mình. Tôi thích những câu chuyện của bà.",
      audio_url: null,
      comprehension_questions: [
        { id: 1, question_en: "What did Grandma open?", answer: ["An old box."], hint_en: "An old...", hint_vi: "Một chiếc..." },
        { id: 2, question_en: "What did she play with?", answer: ["A doll."], hint_en: "A d...", hint_vi: "Một con..." },
        { id: 3, question_en: "Did she walk to school?", answer: ["Yes, she did."], hint_en: "Yes...", hint_vi: "Có..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "visit", pronunciation: "/ˈvɪzɪt/", definition_vi: "Thăm", definition_en: "Go to see someone.", example: "I visit my friend.", collocation: "visit grandma", image_url: "/images/week15/visit.jpg" },
        { id: 2, word: "open", pronunciation: "/ˈəʊp(ə)n/", definition_vi: "Mở", definition_en: "Unclose.", example: "Open the door.", collocation: "open wide", image_url: "/images/week15/open.jpg" },
        { id: 3, word: "box", pronunciation: "/bɒks/", definition_vi: "Hộp", definition_en: "Container.", example: "A toy box.", collocation: "big box", image_url: "/images/week15/box.jpg" },
        { id: 4, word: "picture", pronunciation: "/ˈpɪktʃə/", definition_vi: "Bức ảnh", definition_en: "Photo.", example: "Take a picture.", collocation: "nice picture", image_url: "/images/week15/picture.jpg" },
        { id: 5, word: "smile", pronunciation: "/smʌɪl/", definition_vi: "Cười", definition_en: "Happy face.", example: "She smiles at me.", collocation: "big smile", image_url: "/images/week15/smile.jpg" },
        { id: 6, word: "walk", pronunciation: "/wɔːk/", definition_vi: "Đi bộ", definition_en: "Move on legs.", example: "Walk to the park.", collocation: "walk fast", image_url: "/images/week15/walk.jpg" },
        { id: 7, word: "cook", pronunciation: "/kʊk/", definition_vi: "Nấu ăn", definition_en: "Make food.", example: "Cook dinner.", collocation: "cook food", image_url: "/images/week15/cook.jpg" },
        { id: 8, word: "play", pronunciation: "/pleɪ/", definition_vi: "Chơi", definition_en: "Have fun.", example: "Play ball.", collocation: "play game", image_url: "/images/week15/play.jpg" },
        { id: 9, word: "wash", pronunciation: "/wɒʃ/", definition_vi: "Rửa", definition_en: "Clean with water.", example: "Wash hands.", collocation: "wash face", image_url: "/images/week15/wash.jpg" },
        { id: 10, word: "clean", pronunciation: "/kliːn/", definition_vi: "Dọn dẹp", definition_en: "Make tidy.", example: "Clean the room.", collocation: "clean up", image_url: "/images/week15/clean.jpg" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Yesterday", title_vi: "Hôm qua",
        rules: [
          { type: "ed", icon: "👈", rule_en: "Add -ed for past.", rule_vi: "Thêm -ed cho quá khứ.", example: "Play -> Played" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "I _____ (play) yesterday.", answer: "played", hint: "Add -ed" },
        { id: 2, type: "fill", question: "Mom _____ (cook) soup.", answer: "cooked", hint: "Add -ed" },
        { id: 3, type: "mc", question: "We _____ to school.", options: ["walked", "walk"], answer: "walked", hint: "Past" },
        { id: 4, type: "fill", question: "Dad _____ (wash) the car.", answer: "washed", hint: "Add -ed" },
        { id: 5, type: "unscramble", question: "Sort:", words: ["jumped", "I", "high"], answer: "I jumped high.", hint: "I..." },
        { id: 6, type: "fill", question: "She _____ (clean) the desk.", answer: "cleaned", hint: "Add -ed" },
        { id: 7, type: "mc", question: "He _____ TV.", options: ["watched", "watch"], answer: "watched", hint: "Past" },
        { id: 8, type: "fill", question: "It _____ (rain).", answer: "rained", hint: "Add -ed" },
        { id: 9, type: "fill", question: "We _____ (talk).", answer: "talked", hint: "Add -ed" },
        { id: 10, type: "fill", question: "Grandma _____ (smile).", answer: "smiled", hint: "Add -d" },
        { id: 11, type: "mc", question: "I _____ the door.", options: ["opened", "open"], answer: "opened", hint: "Past" },
        { id: 12, type: "fill", question: "He _____ (kick) the ball.", answer: "kicked", hint: "Add -ed" },
        { id: 13, type: "unscramble", question: "Sort:", words: ["played", "We", "ball"], answer: "We played ball.", hint: "We..." },
        { id: 14, type: "fill", question: "She _____ (paint).", answer: "painted", hint: "Add -ed" },
        { id: 15, type: "fill", question: "I _____ (help) mom.", answer: "helped", hint: "Add -ed" },
        { id: 16, type: "mc", question: "They _____ music.", options: ["liked", "like"], answer: "liked", hint: "Past" },
        { id: 17, type: "fill", question: "We _____ (start).", answer: "started", hint: "Add -ed" },
        { id: 18, type: "fill", question: "He _____ (look).", answer: "looked", hint: "Add -ed" },
        { id: 19, type: "fill", question: "I _____ (brush) teeth.", answer: "brushed", hint: "Add -ed" },
        { id: 20, type: "fill", question: "She _____ (call).", answer: "called", hint: "Add -ed" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn muốn biết bà bạn chơi trò gì hồi bé.", context_en: "You want to know what games grandma played.", answer: ["What games did you play?"], hint: "What games..." },
        { id: 2, context_vi: "Bạn hỏi bố xem ngày xưa bố có xem TV không.", context_en: "Ask dad if he watched TV in the past.", answer: ["Did you watch TV?"], hint: "Did you..." },
        { id: 3, context_vi: "Bạn hỏi mẹ hôm qua mẹ nấu món gì.", context_en: "Ask mom what she cooked yesterday.", answer: ["What did you cook?"], hint: "What did..." },
        { id: 4, context_vi: "Bạn muốn xem ảnh hồi bé của bố.", context_en: "You want to see dad's baby photo.", answer: ["Can I see your photo?"], hint: "Can I..." },
        { id: 5, context_vi: "Bạn hỏi ông xem ông đi học bằng gì.", context_en: "Ask grandpa how he went to school.", answer: ["How did you go to school?"], hint: "How did..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Photos", title_vi: "Ảnh", question_en: "Grandma has 5 photos. She gives me 2. How many left?", question_vi: "Bà có 5 bức ảnh. Bà cho tôi 2. Còn lại mấy?", answer: ["3 photos"], target_number: 3, unit: "photos", hint_en: "5 - 2", hint_vi: "5 - 2" },
        { id: 2, type: "logic", title_en: "Old Things", title_vi: "Đồ cũ", question_en: "Which is old: iPad or Candle?", question_vi: "Cái nào cũ: iPad hay Nến?", answer: ["Candle"], target_number: 0, unit: "", hint_en: "No battery", hint_vi: "Không pin" },
        { id: 3, type: "math", title_en: "Cooking", title_vi: "Nấu ăn", question_en: "Mom cooks 3 eggs. Dad cooks 3 eggs. Total?", question_vi: "Mẹ nấu 3 trứng. Bố nấu 3 trứng. Tổng?", answer: ["6 eggs"], target_number: 6, unit: "eggs", hint_en: "3 + 3", hint_vi: "3 + 3" },
        { id: 4, type: "pattern", title_en: "Day Night", title_vi: "Ngày Đêm", question_en: "Day, Night, Day, Night... What is next?", question_vi: "Ngày, Đêm, Ngày, Đêm... Tiếp theo là gì?", answer: ["Day"], target_number: 0, unit: "", hint_en: "Sun up", hint_vi: "Mặt trời mọc" },
        { id: 5, type: "math", title_en: "Toys", title_vi: "Đồ chơi", question_en: "I have 1 doll. You have 1 car. How many toys?", question_vi: "Tôi có 1 búp bê. Bạn có 1 xe. Mấy đồ chơi?", answer: ["2 toys"], target_number: 2, unit: "toys", hint_en: "1 + 1", hint_vi: "1 + 1" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "I visited Grandma yesterday.", meaning: "Tôi đã thăm bà hôm qua." },
        { id: 2, text: "She opened an old box.", meaning: "Bà mở một chiếc hộp cũ." },
        { id: 3, text: "I saw a black and white picture.", meaning: "Tôi thấy một bức ảnh đen trắng." },
        { id: 4, text: "She walked to school long ago.", meaning: "Bà đi bộ đến trường ngày xưa." },
        { id: 5, text: "I liked her stories very much.", meaning: "Tôi rất thích những câu chuyện của bà." }
      ]
    },
    shadowing: {
      title: "Grandma",
      script: [
        { id: 1, text: "Yesterday, I visited Grandma.", vi: "Hôm qua tôi thăm bà." },
        { id: 2, text: "She opened an old box.", vi: "Bà mở chiếc hộp cũ." },
        { id: 3, text: "I saw a picture.", vi: "Tôi thấy bức ảnh." },
        { id: 4, text: "She played with a doll.", vi: "Bà chơi búp bê." },
        { id: 5, text: "I liked her stories.", vi: "Tôi thích chuyện của bà." }
      ]
    },
    // FIX: KEY 'writing'
    writing: {
      title: "Yesterday",
      min_words: 30,
      model_sentence: "Yesterday was fun. I visited my friend. We played soccer. Then we walked home. We washed our hands. We cooked dinner. It was a good day.",
      instruction_en: "Write about yesterday (Start, Middle, End).",
      instruction_vi: "Viết về ngày hôm qua (Đầu, Giữa, Cuối).",
      prompt_en: "What did you do? Did you play?",
      prompt_vi: "Bạn làm gì? Bạn có chơi không?",
      keywords: ["played", "walked", "cooked", "fun"]
    },
    explore: {
      title_en: "School Long Ago", title_vi: "Trường Học Ngày Xưa",
      image_url: "/images/week15/explore_easy_w15.jpg",
      content_en: "School was different long ago. Students **walked** far. They did not have **buses**. They wrote on **chalkboards**, not tablets. They shared **books**. Teachers rang a **bell**. They played outside in the **sun**. It was hard work but they learned a lot. Do you like your school now?",
      content_vi: "Trường học ngày xưa rất khác. Học sinh đi bộ rất xa. Họ không có xe buýt. Họ viết trên bảng phấn, không phải máy tính bảng. Họ dùng chung sách. Giáo viên rung chuông. Họ chơi ngoài trời nắng. Rất vất vả nhưng họ học được nhiều. Bạn có thích trường của mình bây giờ không?",
      check_questions: [
        { id: 1, question_en: "How did they go to school?", answer: ["Walked."], hint_en: "They w...", hint_vi: "Họ đi..." },
        { id: 2, question_en: "What did they write on?", answer: ["Chalkboards."], hint_en: "C...", hint_vi: "Bảng..." },
        { id: 3, question_en: "Did they have buses?", answer: ["No."], hint_en: "No...", hint_vi: "Không..." }
      ],
      question: { text_en: "How do you go to school?", text_vi: "Bạn đi học bằng gì?", min_words: 5, hint_en: "I go by...", hint_vi: "Tôi đi bằng...", model_answer: "I go by bus." }
    },
    word_power: {
      words: [
        { id: 1, word: "old", pronunciation: "/əʊld/", cefr_level: "A1", definition_en: "Not new.", definition_vi: "Cũ/Già", example: "Old car.", model_sentence: "It is old.", collocation: "very old", image_url: "/images/week15/old.jpg" },
        { id: 2, word: "happy", pronunciation: "/ˈhapi/", cefr_level: "A1", definition_en: "Good feeling.", definition_vi: "Vui", example: "I am happy.", model_sentence: "Be happy.", collocation: "so happy", image_url: "/images/week15/happy.jpg" },
        { id: 3, word: "help", pronunciation: "/hɛlp/", cefr_level: "A1", definition_en: "Aid someone.", definition_vi: "Giúp", example: "Help me.", model_sentence: "I help mom.", collocation: "help you", image_url: "/images/week15/help.jpg" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Grandma's Stories", videoId: "7cG9XXBHYtY", duration: "3:00", sim_duration: 180 },
        { id: 2, title: "Past Simple Song", videoId: "qOUBcwlnTyc", duration: "3:00", sim_duration: 180 },
        { id: 3, title: "Long Ago and Now", videoId: "ool2Whw--7Y", duration: "3:00", sim_duration: 180 },
        { id: 4, title: "School Then and Now", videoId: "WDg85KdxFHU", duration: "3:00", sim_duration: 180 },
        { id: 5, title: "Daily Life Past", videoId: "tGWiowdjnHk", duration: "3:00", sim_duration: 180 }
      ],
      bonus_games: []
    }
  }
};
export default weekData;
