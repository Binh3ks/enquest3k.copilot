const weekData = {
  weekId: 5,
  weekTitle_en: "My Study Space",
  weekTitle_vi: "Góc học tập của tôi",
  grammar_focus: "Prepositions & Compound Sentences",
  global_vocab: [],
  stations: {
    read_explore: {
      title: "A Scholar's Station",
      image_url: "/images/week5/read_cover_w05.jpg",
      content_en: "My study **station** is organized **because** I want to **focus**. The **desk** is wide, **but** it is always **tidy**. I place my **monitor** **on** the desk, and the **keyboard** is **in front of** it. My favorite **books** are **on** the **shelf** **next to** the window. I keep my pens **in** a holder **so** I do not lose them. A bright **lamp** stands **beside** my **laptop**. I sit **on** a comfortable **chair** to start my learning **journey**.",
      content_vi: "Trạm học tập của tôi được sắp xếp ngăn nắp vì tôi muốn tập trung. Cái bàn rộng, nhưng nó luôn gọn gàng. Tôi đặt màn hình trên bàn, và bàn phím ở phía trước nó. Những cuốn sách yêu thích của tôi ở trên kệ cạnh cửa sổ. Tôi giữ bút trong ống đựng nên tôi không làm mất chúng. Một chiếc đèn sáng đứng cạnh máy tính xách tay. Tôi ngồi trên chiếc ghế thoải mái để bắt đầu hành trình học tập của mình.",
      audio_url: "/audio/week5/read_explore_main.mp3",
      comprehension_questions: [
        { id: 1, question_en: "Why is the study station organized?", answer: ["Because he wants to focus.", "He wants to focus."], hint_en: "Look for 'because'...", hint_vi: "Tìm từ 'because'..." },
        { id: 2, question_en: "Where are the books located?", answer: ["On the shelf next to the window.", "They are on the shelf."], hint_en: "The books are...", hint_vi: "Sách thì..." },
        { id: 3, question_en: "What is beside the laptop?", answer: ["A bright lamp.", "The lamp is beside the laptop."], hint_en: "A bright...", hint_vi: "Một cái..." }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "station", image_url: "/images/week5/station.jpg", definition_en: "A place equipped for a specific task.", definition_vi: "Trạm/Khu vực", pronunciation: "/ˈsteɪʃ(ə)n/", example: "This is my work station.", collocation: "work station", audio_word: "/audio/week5/vocab_station.mp3", audio_def: "/audio/week5/vocab_def_station.mp3", audio_coll: "/audio/week5/vocab_coll_station.mp3" },
        { id: 2, word: "organize", image_url: "/images/week5/organize.jpg", definition_en: "To arrange things in order.", definition_vi: "Sắp xếp", pronunciation: "/ˈɔːɡ(ə)nʌɪz/", example: "I organize my books.", collocation: "well organized", audio_word: "/audio/week5/vocab_organize.mp3", audio_def: "/audio/week5/vocab_def_organize.mp3", audio_coll: "/audio/week5/vocab_coll_organize.mp3" },
        { id: 3, word: "monitor", image_url: "/images/week5/monitor.jpg", definition_en: "A screen for a computer.", definition_vi: "Màn hình", pronunciation: "/ˈmɒnɪtə/", example: "The monitor is bright.", collocation: "computer monitor", audio_word: "/audio/week5/vocab_monitor.mp3", audio_def: "/audio/week5/vocab_def_monitor.mp3", audio_coll: "/audio/week5/vocab_coll_monitor.mp3" },
        { id: 4, word: "shelf", image_url: "/images/week5/shelf.jpg", definition_en: "A flat board to hold objects.", definition_vi: "Kệ", pronunciation: "/ʃɛlf/", example: "Put the file on the shelf.", collocation: "wooden shelf", audio_word: "/audio/week5/vocab_shelf.mp3", audio_def: "/audio/week5/vocab_def_shelf.mp3", audio_coll: "/audio/week5/vocab_coll_shelf.mp3" },
        { id: 5, word: "holder", image_url: "/images/week5/holder.jpg", definition_en: "A container for keeping things.", definition_vi: "Ống đựng", pronunciation: "/ˈhəʊldə/", example: "The pen holder is full.", collocation: "pen holder", audio_word: "/audio/week5/vocab_holder.mp3", audio_def: "/audio/week5/vocab_def_holder.mp3", audio_coll: "/audio/week5/vocab_coll_holder.mp3" },
        { id: 6, word: "beside", image_url: "/images/week5/beside.jpg", definition_en: "Next to something.", definition_vi: "Bên cạnh", pronunciation: "/bɪˈsʌɪd/", example: "Sit beside me.", collocation: "stand beside", audio_word: "/audio/week5/vocab_beside.mp3", audio_def: "/audio/week5/vocab_def_beside.mp3", audio_coll: "/audio/week5/vocab_coll_beside.mp3" },
        { id: 7, word: "tidy", image_url: "/images/week5/tidy.jpg", definition_en: "Neat and in good order.", definition_vi: "Gọn gàng", pronunciation: "/ˈtʌɪdi/", example: "Keep your area tidy.", collocation: "keep tidy", audio_word: "/audio/week5/vocab_tidy.mp3", audio_def: "/audio/week5/vocab_def_tidy.mp3", audio_coll: "/audio/week5/vocab_coll_tidy.mp3" },
        { id: 8, word: "focus", image_url: "/images/week5/focus.jpg", definition_en: "To pay attention to one thing.", definition_vi: "Tập trung", pronunciation: "/ˈfəʊkəs/", example: "I focus on my homework.", collocation: "stay focused", audio_word: "/audio/week5/vocab_focus.mp3", audio_def: "/audio/week5/vocab_def_focus.mp3", audio_coll: "/audio/week5/vocab_coll_focus.mp3" },
        { id: 9, word: "comfortable", image_url: "/images/week5/comfortable.jpg", definition_en: "Giving physical ease.", definition_vi: "Thoải mái", pronunciation: "/ˈkʌmf(ə)təb(ə)l/", example: "This chair is comfortable.", collocation: "comfortable chair", audio_word: "/audio/week5/vocab_comfortable.mp3", audio_def: "/audio/week5/vocab_def_comfortable.mp3", audio_coll: "/audio/week5/vocab_coll_comfortable.mp3" },
        { id: 10, word: "bright", image_url: "/images/week5/bright.jpg", definition_en: "Giving out much light.", definition_vi: "Sáng", pronunciation: "/brʌɪt/", example: "The lamp is bright.", collocation: "bright light", audio_word: "/audio/week5/vocab_bright.mp3", audio_def: "/audio/week5/vocab_def_bright.mp3", audio_coll: "/audio/week5/vocab_coll_bright.mp3" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Compound Sentences & Prepositions",
        title_vi: "Câu ghép & Giới từ",
        rules: [
          { type: "rule", icon: "🔗", rule_en: "**and** / **but** / **because**", rule_vi: "và / nhưng / bởi vì", example: "I study **because** I want to learn." },
          { type: "rule", icon: "📍", rule_en: "**next to** / **in front of**", rule_vi: "bên cạnh / phía trước", example: "The pen is **next to** the book." },
          { type: "rule", icon: "➡️", rule_en: "**so** (Reason -> Result)", rule_vi: "vì vậy (kết quả)", example: "It is dark, **so** I turn on the lamp." }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "The desk is big, _____ (but/so) it is tidy.", answer: "but", hint: "Contrast -> but" },
        { id: 2, type: "mc", question: "I study hard _____ I want to be smart.", options: ["so", "because"], answer: "because", hint: "Reason -> because" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["is", "lamp", "The", "next to", "laptop", "the"], answer: "The lamp is next to the laptop.", hint: "The lamp is..." },
        { id: 4, type: "fill", question: "The chair is _____ (in front of / in) the desk.", answer: "in front of", hint: "Position -> in front of" },
        { id: 5, type: "mc", question: "It is quiet, _____ I can focus.", options: ["but", "so"], answer: "so", hint: "Result -> so" },
        { id: 6, type: "unscramble", question: "Sort:", words: ["pens", "in", "Keep", "the", "holder", "your"], answer: "Keep your pens in the holder.", hint: "Keep your..." },
        { id: 7, type: "fill", question: "I like reading _____ (and/but) writing.", answer: "and", hint: "Addition -> and" },
        { id: 8, type: "mc", question: "The book is _____ the shelf.", options: ["on", "in"], answer: "on", hint: "Surface -> on" },
        { id: 9, type: "unscramble", question: "Sort:", words: ["comfortable", "is", "chair", "The", "old", "but"], answer: "The chair is old but comfortable.", hint: "The chair is..." },
        { id: 10, type: "fill", question: "He stands _____ (beside/in) the window.", answer: "beside", hint: "Next to -> beside" },
        { id: 11, type: "mc", question: "I use a lamp _____ it is dark.", options: ["so", "because"], answer: "because", hint: "Reason -> because" },
        { id: 12, type: "unscramble", question: "Sort:", words: ["computer", "is", "My", "on", "desk", "the"], answer: "My computer is on the desk.", hint: "My computer..." },
        { id: 13, type: "fill", question: "The room is small, _____ (but/and) it is nice.", answer: "but", hint: "Contrast -> but" },
        { id: 14, type: "mc", question: "Put the paper _____ the bin.", options: ["in", "on"], answer: "in", hint: "Inside -> in" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["tidy", "is", "room", "My", "clean", "and"], answer: "My room is tidy and clean.", hint: "My room..." },
        { id: 16, type: "fill", question: "The keyboard is _____ (under/in front of) the monitor.", answer: "in front of", hint: "Position -> in front of" },
        { id: 17, type: "mc", question: "I am a scholar, _____ I love books.", options: ["so", "because"], answer: "so", hint: "Result -> so" },
        { id: 18, type: "fill", question: "Make sentence: 'Lamp / on / desk'", answer: ["The lamp is on the desk.", "the lamp is on the desk."], customCheck: true, hint: "Use 'is' and 'the'" },
        { id: 19, type: "unscramble", question: "Sort:", words: ["box", "The", "under", "is", "chair", "the"], answer: "The box is under the chair.", hint: "The box is..." },
        { id: 20, type: "fill", question: "Make sentence: 'I / like / reading'", answer: ["I like reading.", "i like reading."], customCheck: true, hint: "S + V + O" }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn không tìm thấy cuốn từ điển. Hãy hỏi mẹ về vị trí của nó.", context_en: "You cannot find the dictionary. Ask your mother about its location.", answer: ["Where is the dictionary?", "Mom, where is my dictionary?"], hint: "Where..." },
        { id: 2, context_vi: "Bạn muốn biết tại sao chúng ta cần giữ bàn học gọn gàng.", context_en: "You want to know the reason for keeping the desk tidy.", answer: ["Why should I keep my desk tidy?", "Why is a tidy desk important?"], hint: "Why..." },
        { id: 3, context_vi: "Bạn muốn mượn cái bút của bạn cùng bàn. Hãy hỏi một cách lịch sự.", context_en: "You want to borrow a pen from your classmate. Ask politely.", answer: ["Can I borrow your pen?", "May I use your pen?"], hint: "Can I..." },
        { id: 4, context_vi: "Bạn thấy cái đèn đang tắt. Hãy nhờ bố bật nó lên vì trời tối.", context_en: "The lamp is off and it is dark. Ask dad to turn it on.", answer: ["Can you turn on the lamp?", "Please turn on the light."], hint: "Can you..." },
        { id: 5, context_vi: "Bạn muốn biết cái hộp màu xanh ở đâu (trên hay dưới bàn).", context_en: "You want to know the position of the blue box.", answer: ["Where is the blue box?", "Is the blue box on the table?"], hint: "Where..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "logic", title_en: "Position Logic", question_en: "The red book is ON the shelf. The blue book is UNDER the red book. Where is the blue book?", answer: ["On the shelf", "Under the red book"], audio_url: "/audio/week5/logic_1.mp3" },
        { id: 2, type: "math", title_en: "Shelf Space", question_en: "A shelf can hold 10 books. I have 4 math books and 3 english books. How many more books can fit?", answer: ["3 books"], target_number: 3, unit: "books", audio_url: "/audio/week5/logic_2.mp3" },
        { id: 3, type: "logic", title_en: "Classification", question_en: "Which object does NOT belong on a study desk? (Computer, Lamp, Pillow, Pen)", answer: ["Pillow"], audio_url: "/audio/week5/logic_3.mp3" },
        // FIX: Thêm options cho câu hỏi Pattern
        { id: 4, type: "pattern", title_en: "Arrangement", question_en: "Pen, Book, Pen, Book, Pen... What is next?", options: ["Book", "Pen"], answer: "Book", audio_url: "/audio/week5/logic_4.mp3" },
        { id: 5, type: "math", title_en: "Pencil Length", question_en: "My pencil is 10cm. I sharpen it and it loses 2cm. How long is it now?", answer: ["8cm"], target_number: 8, unit: "cm", audio_url: "/audio/week5/logic_5.mp3" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "My desk is tidy because I organize my pens.", meaning: "Bàn tôi gọn gàng vì tôi sắp xếp bút.", audio_url: "/audio/week5/dictation_1.mp3" },
        { id: 2, text: "The bright lamp is next to the computer.", meaning: "Cái đèn sáng ở bên cạnh máy tính.", audio_url: "/audio/week5/dictation_2.mp3" },
        { id: 3, text: "I sit on a comfortable chair to study.", meaning: "Tôi ngồi trên ghế thoải mái để học.", audio_url: "/audio/week5/dictation_3.mp3" },
        { id: 4, text: "Books are on the shelf but toys are in the box.", meaning: "Sách trên kệ nhưng đồ chơi trong hộp.", audio_url: "/audio/week5/dictation_4.mp3" },
        { id: 5, text: "Good lighting helps my eyes stay healthy.", meaning: "Ánh sáng tốt giúp mắt tôi khỏe mạnh.", audio_url: "/audio/week5/dictation_5.mp3" }
      ]
    },
    shadowing: {
      title: "A Scholar's Station",
      script: [
        { id: 1, text: "My study station is organized because I want to focus.", vi: "Trạm học tập của tôi ngăn nắp vì tôi muốn tập trung.", audio_url: "/audio/week5/shadowing_1.mp3" },
        { id: 2, text: "The desk is wide, but it is always tidy.", vi: "Cái bàn rộng, nhưng nó luôn gọn gàng.", audio_url: "/audio/week5/shadowing_2.mp3" },
        { id: 3, text: "My favorite books are on the shelf next to the window.", vi: "Những cuốn sách yêu thích ở trên kệ cạnh cửa sổ.", audio_url: "/audio/week5/shadowing_3.mp3" },
        { id: 4, text: "I keep my pens in a holder so I do not lose them.", vi: "Tôi giữ bút trong ống đựng nên không làm mất chúng.", audio_url: "/audio/week5/shadowing_4.mp3" },
        { id: 5, text: "I sit on a comfortable chair to start my learning journey.", vi: "Tôi ngồi trên ghế thoải mái để bắt đầu hành trình học tập.", audio_url: "/audio/week5/shadowing_5.mp3" }
      ]
    },
    word_power: {
      words: [
        { id: 1, word: "organized", image_url: "/images/week5/organized.jpg", definition_en: "Arranged in a systematic way.", definition_vi: "Có tổ chức", example: "He is a very organized student.", collocation: "highly organized", cefr_level: "B1", audio_word: "/audio/week5/power_word_organized.mp3", audio_def: "/audio/week5/power_def_organized.mp3", audio_coll: "/audio/week5/power_coll_organized.mp3" },
        { id: 2, word: "necessary", image_url: "/images/week5/necessary.jpg", definition_en: "Needed to be done or achieved.", definition_vi: "Cần thiết", example: "Silence is necessary for reading.", collocation: "absolutely necessary", cefr_level: "B1", audio_word: "/audio/week5/power_word_necessary.mp3", audio_def: "/audio/week5/power_def_necessary.mp3", audio_coll: "/audio/week5/power_coll_necessary.mp3" },
        { id: 3, word: "position", image_url: "/images/week5/position.jpg", definition_en: "Where someone or something is.", definition_vi: "Vị trí", example: "Change the position of the lamp.", collocation: "correct position", cefr_level: "A2", audio_word: "/audio/week5/power_word_position.mp3", audio_def: "/audio/week5/power_def_position.mp3", audio_coll: "/audio/week5/power_coll_position.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, query: "Rooms in a house vocabulary", videoId: "m27Cck_LGHc" },
        { id: 2, query: "https://youtu.be/fhe7vQjQBxM", videoId: "fhe7vQjQBxM" },
        { id: 3, query: "Shapes in my house", videoId: "uGw2aFLry0s" },
        { id: 4, query: "Hard and Soft materials", videoId: "1UUROogwl24" },
        { id: 5, query: "Rooms in a house  song", videoId: "IjnlkdZvYTE" }
      ],
      bonus_games: [
        { id: 1, title: "Grammar: Theme 12. In, On, Under - It is under the table. | ESL Song & Story -  (English Singsing)", url: "https://www.gamestolearnenglish.com/fast-english/", description: "Match items." },
        { id: 2, title: "Preposition Game", url: "https://www.gamestolearnenglish.com/prepositions-game/", description: "Where is the cat?" }
      ]
    },
    explore: {
      title_en: "Lighting for Learning",
      title_vi: "Ánh sáng cho việc học",
      image_url: "/images/week5/explore_cover_w05.jpg",
      content_en: "Good **lighting** is necessary for a scholar. A bright room helps your **eyes** stay healthy. You should place your **desk** near a window to get **natural light**. If it is dark, use a **lamp**. Do not read in the dark **because** it hurts your eyes. Proper light helps you **focus** longer.",
      content_vi: "Ánh sáng tốt là cần thiết cho một học giả. Một căn phòng sáng giúp mắt bạn khỏe mạnh. Bạn nên đặt bàn gần cửa sổ để lấy ánh sáng tự nhiên. Nếu trời tối, hãy dùng đèn. Đừng đọc trong bóng tối vì nó làm hại mắt bạn. Ánh sáng thích hợp giúp bạn tập trung lâu hơn.",
      audio_url: "/audio/week5/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "Why shouldn't you read in the dark?", answer: ["Because it hurts your eyes."], hint_en: "Because..." },
        { id: 2, question_en: "Where should you place your desk?", answer: ["Near a window."], hint_en: "Near a..." },
        { id: 3, question_en: "What helps you focus longer?", answer: ["Proper light.", "Good lighting."], hint_en: "Proper..." }
      ],
      question: { text_en: "Do you have a lamp on your desk? Why?", text_vi: "Bạn có đèn trên bàn không? Tại sao?", min_words: 10, model_answer: "Yes, I have a lamp because I study at night." }
    },
    writing: {
      title: "Video Challenge: My Study Station",
      prompt_en: "Describe your study station. Use prepositions (on, under, next to) and explain why you like it.",
      prompt_vi: "Mô tả góc học tập của bạn. Dùng giới từ và giải thích tại sao bạn thích nó.",
      min_words: 20,
      keywords: ["because", "next to", "on", "tidy"]
    }
  }
};
export default weekData;
