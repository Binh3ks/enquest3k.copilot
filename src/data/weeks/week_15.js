const weekData = {
  weekId: 15,
  weekTitle_en: "Life in the Past",
  weekTitle_vi: "Cuộc Sống Thời Xưa",
  grammar_focus: "Past Simple (Regular Verbs)",
  global_vocab: [
    { word: "electricity", definition_en: "Power for lights.", definition_vi: "Điện" },
    { word: "candle", definition_en: "Wax stick for light.", definition_vi: "Nến" },
    { word: "invent", definition_en: "To make first.", definition_vi: "Phát minh" },
    { word: "history", definition_en: "Past events.", definition_vi: "Lịch sử" },
    { word: "change", definition_en: "To become different.", definition_vi: "Thay đổi" },
    { word: "dark", definition_en: "No light.", definition_vi: "Tối tăm" },
    { word: "lamp", definition_en: "A light device.", definition_vi: "Đèn" },
    { word: "modern", definition_en: "New and current.", definition_vi: "Hiện đại" },
    { word: "difficult", definition_en: "Hard to do.", definition_vi: "Khó khăn" },
    { word: "compare", definition_en: "Look at differences.", definition_vi: "So sánh" }
  ],
  stations: {
    read_explore: {
      title: "When The World Was Dark",
      image_url: "/images/week15/read_cover_w15.jpg",
      content_en: "Long ago, there was no **electricity**. When the sun went down, the world became very **dark**. People used **candles** and oil lamps to see. It was hard to work or read at night. Then, a man named Thomas Edison **changed** everything. He worked hard and **invented** the lightbulb. Suddenly, with a switch, night turned into day. Life became easier and brighter. Can you imagine life without lights?",
      content_vi: "Ngày xưa, không có điện. Khi mặt trời lặn, thế giới trở nên rất tối tăm. Mọi người dùng nến và đèn dầu để nhìn. Rất khó để làm việc hay đọc sách vào ban đêm. Rồi một người tên Thomas Edison đã thay đổi tất cả. Ông làm việc chăm chỉ và phát minh ra bóng đèn. Đột nhiên, chỉ với một công tắc, đêm biến thành ngày. Cuộc sống trở nên dễ dàng và tươi sáng hơn. Bạn có tưởng tượng được cuộc sống không có đèn không?",
      audio_url: null,
      comprehension_questions: [
        { id: 1, question_en: "What did people use before electricity?", answer: ["Candles and oil lamps."], hint_en: "They used c...", hint_vi: "Họ dùng..." },
        { id: 2, question_en: "Who invented the lightbulb?", answer: ["Thomas Edison."], hint_en: "Thomas E...", hint_vi: "Thomas..." },
        { id: 3, question_en: "Did life become harder or easier?", answer: ["Easier."], hint_en: "E...", hint_vi: "Dễ hơn..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "electricity", pronunciation: "/ɪˌlɛkˈtrɪsɪti/", definition_vi: "Điện", definition_en: "Energy for lights.", example: "We need electricity.", collocation: "save electricity", image_url: "/images/week15/electricity_w15.jpg" },
        { id: 2, word: "candle", pronunciation: "/ˈkand(ə)l/", definition_vi: "Nến", definition_en: "Wax with a wick.", example: "Light a candle.", collocation: "blow out candle", image_url: "/images/week15/candle_w15.jpg" },
        { id: 3, word: "invent", pronunciation: "/ɪnˈvɛnt/", definition_vi: "Phát minh", definition_en: "Create something new.", example: "He invented the phone.", collocation: "invent a machine", image_url: "/images/week15/invent_w15.jpg" },
        { id: 4, word: "oil", pronunciation: "/ɔɪl/", definition_vi: "Dầu", definition_en: "Liquid fuel.", example: "The lamp needs oil.", collocation: "oil lamp", image_url: "/images/week15/oil_w15.jpg" },
        { id: 5, word: "dark", pronunciation: "/dɑːk/", definition_vi: "Tối", definition_en: "No light.", example: "The room is dark.", collocation: "get dark", image_url: "/images/week15/dark_w15.jpg" },
        { id: 6, word: "bright", pronunciation: "/brʌɪt/", definition_vi: "Sáng", definition_en: "Lots of light.", example: "The sun is bright.", collocation: "bright light", image_url: "/images/week15/bright_w15.jpg" },
        { id: 7, word: "switch", pronunciation: "/swɪtʃ/", definition_vi: "Công tắc", definition_en: "Button to turn on.", example: "Flip the switch.", collocation: "light switch", image_url: "/images/week15/switch_w15.jpg" },
        { id: 8, word: "past", pronunciation: "/pɑːst/", definition_vi: "Quá khứ", definition_en: "Time before now.", example: "In the past, no cars.", collocation: "in the past", image_url: "/images/week15/past_w15.jpg" },
        { id: 9, word: "modern", pronunciation: "/ˈmɒd(ə)n/", definition_vi: "Hiện đại", definition_en: "New times.", example: "Modern life is fast.", collocation: "modern technology", image_url: "/images/week15/modern_w15.jpg" },
        { id: 10, word: "difficult", pronunciation: "/ˈdɪfɪk(ə)lt/", definition_vi: "Khó khăn", definition_en: "Not easy.", example: "It was difficult work.", collocation: "difficult task", image_url: "/images/week15/difficult_w15.jpg" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Past Simple (Regular)", title_vi: "Quá khứ đơn (Có quy tắc)",
        rules: [
          { type: "rule", icon: "🕒", rule_en: "Add -ed to verbs.", rule_vi: "Thêm -ed vào động từ.", example: "Work -> Worked" },
          { type: "rule", icon: "📅", rule_en: "Use for finished actions.", rule_vi: "Dùng cho hành động đã xong.", example: "He lived long ago." }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "He _____ (work) hard.", answer: "worked", hint: "Add -ed" },
        { id: 2, type: "fill", question: "They _____ (use) candles.", answer: "used", hint: "Add -d" },
        { id: 3, type: "mc", question: "Edison _____ the bulb.", options: ["invented", "invents"], answer: "invented", hint: "Past tense" },
        { id: 4, type: "unscramble", question: "Order:", words: ["lived", "They", "ago", "long"], answer: "They lived long ago.", hint: "They..." },
        { id: 5, type: "fill", question: "It _____ (change) the world.", answer: "changed", hint: "Add -d" },
        { id: 6, type: "mc", question: "We _____ games.", options: ["played", "play"], answer: "played", hint: "Past" },
        { id: 7, type: "fill", question: "She _____ (cook) dinner.", answer: "cooked", hint: "Add -ed" },
        { id: 8, type: "fill", question: "He _____ (help) me.", answer: "helped", hint: "Add -ed" },
        { id: 9, type: "mc", question: "I _____ the door.", options: ["opened", "open"], answer: "opened", hint: "Past" },
        { id: 10, type: "fill", question: "We _____ (walk) home.", answer: "walked", hint: "Add -ed" },
        { id: 11, type: "unscramble", question: "Order:", words: ["talked", "He", "loudly"], answer: "He talked loudly.", hint: "He..." },
        { id: 12, type: "fill", question: "They _____ (clean) the house.", answer: "cleaned", hint: "Add -ed" },
        { id: 13, type: "mc", question: "She _____ TV.", options: ["watched", "watches"], answer: "watched", hint: "Past" },
        { id: 14, type: "fill", question: "I _____ (wash) my hands.", answer: "washed", hint: "Add -ed" },
        { id: 15, type: "fill", question: "It _____ (rain) yesterday.", answer: "rained", hint: "Add -ed" },
        { id: 16, type: "mc", question: "We _____ to music.", options: ["listened", "listen"], answer: "listened", hint: "Past" },
        { id: 17, type: "fill", question: "He _____ (paint) a picture.", answer: "painted", hint: "Add -ed" },
        { id: 18, type: "fill", question: "She _____ (call) me.", answer: "called", hint: "Add -ed" },
        { id: 19, type: "unscramble", question: "Order:", words: ["jumped", "The", "cat"], answer: "The cat jumped.", hint: "The..." },
        { id: 20, type: "fill", question: "They _____ (start) school.", answer: "started", hint: "Add -ed" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn muốn biết Thomas Edison là ai.", context_en: "You want to know who Thomas Edison is.", answer: ["Who is Thomas Edison?"], hint: "Who is..." },
        { id: 2, context_vi: "Bạn thắc mắc người xưa làm gì khi trời tối.", context_en: "You wonder what people did in the dark.", answer: ["What did they do in the dark?"], hint: "What did..." },
        { id: 3, context_vi: "Bạn muốn hỏi cách làm một cây nến.", context_en: "You want to ask how to make a candle.", answer: ["How do I make a candle?"], hint: "How do I..." },
        { id: 4, context_vi: "Bạn muốn biết tại sao đèn dầu lại nguy hiểm.", context_en: "You wonder why oil lamps are dangerous.", answer: ["Why are oil lamps dangerous?"], hint: "Why are..." },
        { id: 5, context_vi: "Bạn muốn hỏi khi nào điện được phát minh.", context_en: "You want to ask when electricity was invented.", answer: ["When was electricity invented?"], hint: "When was..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Candle Life", title_vi: "Tuổi thọ Nến", question_en: "One candle lasts 2 hours. I need light for 6 hours. How many candles do I need?", question_vi: "Một cây nến cháy được 2 giờ. Tôi cần ánh sáng trong 6 giờ. Cần mấy cây nến?", answer: ["3 candles"], target_number: 3, unit: "candles", hint_en: "6 / 2", hint_vi: "6 chia 2" },
        { id: 2, type: "math", title_en: "Lightbulbs", title_vi: "Bóng đèn", question_en: "I bought 10 bulbs. 3 were broken. How many work?", question_vi: "Tôi mua 10 bóng đèn. 3 bóng bị hỏng. Còn mấy bóng dùng được?", answer: ["7 bulbs"], target_number: 7, unit: "bulbs", hint_en: "10 - 3", hint_vi: "10 - 3" },
        { id: 3, type: "logic", title_en: "Time Travel", title_vi: "Du hành thời gian", question_en: "If today is 2025, how many years ago was 1925?", question_vi: "Nếu nay là 2025, năm 1925 cách đây bao nhiêu năm?", answer: ["100 years"], target_number: 100, unit: "years", hint_en: "2025 - 1925", hint_vi: "Trừ đi" },
        { id: 4, type: "pattern", title_en: "Light Pattern", title_vi: "Quy luật Đèn", question_en: "On, Off, On, Off... What is next?", question_vi: "Bật, Tắt, Bật, Tắt... Tiếp theo là gì?", answer: ["On"], target_number: 0, unit: "", hint_en: "On", hint_vi: "Bật" },
        { id: 5, type: "math", title_en: "Oil Cost", title_vi: "Giá Dầu", question_en: "1 liter of oil costs . I buy 5 liters. Cost?", question_vi: "1 lít dầu giá 2 đô. Tôi mua 5 lít. Hết bao nhiêu?", answer: ["10 dollars"], target_number: 10, unit: "dollars", hint_en: "2 x 5", hint_vi: "2 nhân 5" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "Long ago, there was no electricity.", meaning: "Ngày xưa không có điện." },
        { id: 2, text: "The world became very dark at night.", meaning: "Thế giới trở nên rất tối vào ban đêm." },
        { id: 3, text: "People used candles to see.", meaning: "Mọi người dùng nến để nhìn." },
        { id: 4, text: "Thomas Edison invented the lightbulb.", meaning: "Thomas Edison đã phát minh ra bóng đèn." },
        { id: 5, text: "Life became easier and brighter.", meaning: "Cuộc sống trở nên dễ dàng và tươi sáng hơn." }
      ]
    },
    shadowing: {
      title: "Darkness to Light",
      script: [
        { id: 1, text: "Long ago, there was no electricity.", vi: "Ngày xưa, không có điện." },
        { id: 2, text: "When the sun went down, the world became dark.", vi: "Khi mặt trời lặn, thế giới tối tăm." },
        { id: 3, text: "People used candles and oil lamps.", vi: "Mọi người dùng nến và đèn dầu." },
        { id: 4, text: "Then, Thomas Edison invented the lightbulb.", vi: "Rồi Edison phát minh bóng đèn." },
        { id: 5, text: "Suddenly, night turned into day.", vi: "Đột nhiên, đêm hóa thành ngày." }
      ]
    },
    // FIX: ĐỔI KEY 'video' THÀNH 'writing'
    writing: {
      title: "Life Without Electricity",
      min_words: 40,
      model_sentence: "One day, the power went out. It was dark. We lit candles. We told stories. It was fun but hard to see. I missed my TV. I was happy when the lights came back.",
      instruction_en: "Write about a time with no electricity (Beginning, Middle, End).",
      instruction_vi: "Viết về một lần mất điện (Đầu, Giữa, Cuối).",
      prompt_en: "What happened? What did you do? How did it end?",
      prompt_vi: "Chuyện gì xảy ra? Bạn làm gì? Nó kết thúc thế nào?",
      keywords: ["dark", "candles", "fun", "hard"]
    },
    explore: {
      title_en: "Communication Over Time", title_vi: "Giao tiếp theo Thời gian",
      image_url: "/images/week15/explore_cover_w15.jpg",
      content_en: "In the past, sending a message was slow. People wrote **letters** on paper. A horse carried the mail. It took weeks. Then, we had the **telephone**. We could talk instantly. Now, we use **smartphones** and **email**. We can send photos and videos in seconds. The world feels smaller because we are connected.",
      content_vi: "Trong quá khứ, gửi tin nhắn rất chậm. Mọi người viết thư trên giấy. Ngựa chở thư. Mất hàng tuần. Sau đó, chúng ta có điện thoại. Ta có thể nói chuyện ngay lập tức. Bây giờ, ta dùng điện thoại thông minh và email. Ta có thể gửi ảnh và video trong vài giây. Thế giới cảm giác nhỏ hơn vì ta được kết nối.",
      check_questions: [
        { id: 1, question_en: "How did people send messages in the past?", answer: ["Letters."], hint_en: "They wrote...", hint_vi: "Họ viết..." },
        { id: 2, question_en: "What carried the mail?", answer: ["A horse."], hint_en: "A h...", hint_vi: "Một con..." },
        { id: 3, question_en: "What do we use now?", answer: ["Smartphones and email."], hint_en: "Smartphones...", hint_vi: "Điện thoại..." }
      ],
      question: { text_en: "Do you like letters or emails? Why?", text_vi: "Bạn thích thư tay hay email? Tại sao?", min_words: 15, hint_en: "I like...", hint_vi: "Tôi thích...", model_answer: "I like emails because they are fast." }
    },
    word_power: {
      words: [
        { id: 1, word: "technology", pronunciation: "/tɛkˈnɒlədʒi/", cefr_level: "B1", definition_en: "Machines and tools.", definition_vi: "Công nghệ", example: "Computers are technology.", model_sentence: "Technology helps us.", collocation: "modern technology", image_url: "/images/week15/technology_w15.jpg" },
        { id: 2, word: "compare", pronunciation: "/kəmˈpɛː/", cefr_level: "A2", definition_en: "Find differences.", definition_vi: "So sánh", example: "Compare two pictures.", model_sentence: "We compare them.", collocation: "compare with", image_url: "/images/week15/compare_w15.jpg" },
        { id: 3, word: "improve", pronunciation: "/ɪmˈpruːv/", cefr_level: "B1", definition_en: "Make better.", definition_vi: "Cải thiện", example: "I improve my English.", model_sentence: "Practice to improve.", collocation: "improve skills", image_url: "/images/week15/improve_w15.jpg" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Life Before Electricity", videoId: "7cG9XXBHYtY", duration: "4:00", sim_duration: 240 },
        { id: 2, title: "Thomas Edison Story", videoId: "AuZnlOOZMU4", duration: "4:00", sim_duration: 240 },
        { id: 3, title: "Past Simple Song", videoId: "qOUBcwlnTyc", duration: "3:00", sim_duration: 180 },
        { id: 4, title: "Inventions for Kids", videoId: "aStUmAZ-llc", duration: "5:00", sim_duration: 300 },
        { id: 5, title: "Then and Now", videoId: "ool2Whw--7Y", duration: "3:00", sim_duration: 180 }
      ],
      bonus_games: []
    }
  }
};
export default weekData;
