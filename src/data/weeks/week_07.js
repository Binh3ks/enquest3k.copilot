const weekData = {
  weekId: 7,
  weekTitle_en: "Tools for Learning",
  weekTitle_vi: "Công cụ học tập",
  grammar_focus: "Purpose (To + Verb / For + V-ing)",
  global_vocab: [],
  stations: {
    read_explore: {
      title: "My School Kit",
      image_url: "/images/week7/read_cover_w07.jpg",
      content_en: "I have many **tools** for learning in my backpack. A **dictionary** is important **because** I use it **to find** new words. I use a **calculator** **to solve** difficult math problems. A **globe** is used **for exploring** the world map. I also have some **glue** and **scissors** **to make** art projects. Every tool has a special **purpose**.",
      content_vi: "Tôi có nhiều công cụ học tập trong ba lô. Từ điển rất quan trọng vì tôi dùng nó để tìm từ mới. Tôi dùng máy tính cầm tay để giải các bài toán khó. Quả địa cầu được dùng để khám phá bản đồ thế giới. Tôi cũng có hồ dán và kéo để làm các dự án mỹ thuật. Mỗi công cụ đều có một mục đích đặc biệt.",
      audio_url: "/audio/week7/read_explore_main.mp3",
      comprehension_questions: [
        {
          id: 1,
          question_en: "Why is the dictionary important?",
          answer: ["Because he uses it to find new words.", "To find new words."],
          hint_en: "I use it to...",
          hint_vi: "Tôi dùng nó để..."
        },
        {
          id: 2,
          question_en: "What is the calculator used for?",
          answer: ["To solve math problems.", "It is used for math."],
          hint_en: "To solve...",
          hint_vi: "Để giải..."
        },
        {
          id: 3,
          question_en: "What tools are for art projects?",
          answer: ["Glue and scissors.", "He has glue and scissors."],
          hint_en: "Glue and...",
          hint_vi: "Hồ dán và..."
        }
      ]
    },
    new_words: {
      vocab: [
        {
          id: 1, word: "dictionary", image_url: "/images/week7/dictionary.jpg",
          definition_en: "A book that lists words and their meanings.", definition_vi: "Từ điển",
          pronunciation: "/ˈdɪkʃ(ə)n(ə)ri/", example: "I look up the word in the dictionary.", collocation: "online dictionary",
          audio_word: "/audio/week7/vocab_dictionary.mp3", audio_def: "/audio/week7/vocab_def_dictionary.mp3", audio_coll: "/audio/week7/vocab_coll_dictionary.mp3"
        },
        {
          id: 2, word: "calculator", image_url: "/images/week7/calculator.jpg",
          definition_en: "A small machine for math.", definition_vi: "Máy tính cầm tay",
          pronunciation: "/ˈkalkjʊleɪtə/", example: "Use a calculator for big numbers.", collocation: "use a calculator",
          audio_word: "/audio/week7/vocab_calculator.mp3", audio_def: "/audio/week7/vocab_def_calculator.mp3", audio_coll: "/audio/week7/vocab_coll_calculator.mp3"
        },
        {
          id: 3, word: "globe", image_url: "/images/week7/globe.jpg",
          definition_en: "A round model of the Earth.", definition_vi: "Quả địa cầu",
          pronunciation: "/ɡləʊb/", example: "Find Vietnam on the globe.", collocation: "spin the globe",
          audio_word: "/audio/week7/vocab_globe.mp3", audio_def: "/audio/week7/vocab_def_globe.mp3", audio_coll: "/audio/week7/vocab_coll_globe.mp3"
        },
        {
          id: 4, word: "scissors", image_url: "/images/week7/scissors.jpg",
          definition_en: "A tool for cutting paper.", definition_vi: "Cái kéo",
          pronunciation: "/ˈsɪzəz/", example: "Be careful with the scissors.", collocation: "sharp scissors",
          audio_word: "/audio/week7/vocab_scissors.mp3", audio_def: "/audio/week7/vocab_def_scissors.mp3", audio_coll: "/audio/week7/vocab_coll_scissors.mp3"
        },
        {
          id: 5, word: "glue", image_url: "/images/week7/glue.jpg",
          definition_en: "A sticky substance to join things.", definition_vi: "Hồ dán/Keo",
          pronunciation: "/ɡluː/", example: "Use glue to stick the picture.", collocation: "glue stick",
          audio_word: "/audio/week7/vocab_glue.mp3", audio_def: "/audio/week7/vocab_def_glue.mp3", audio_coll: "/audio/week7/vocab_coll_glue.mp3"
        },
        {
          id: 6, word: "backpack", image_url: "/images/week7/backpack.jpg",
          definition_en: "A bag carried on the back.", definition_vi: "Ba lô",
          pronunciation: "/ˈbakpak/", example: "My backpack is heavy.", collocation: "school backpack",
          audio_word: "/audio/week7/vocab_backpack.mp3", audio_def: "/audio/week7/vocab_def_backpack.mp3", audio_coll: "/audio/week7/vocab_coll_backpack.mp3"
        },
        {
          id: 7, word: "ruler", image_url: "/images/week7/ruler.jpg",
          definition_en: "A tool to measure length.", definition_vi: "Thước kẻ",
          pronunciation: "/ˈruːlə/", example: "Draw a straight line with a ruler.", collocation: "long ruler",
          audio_word: "/audio/week7/vocab_ruler.mp3", audio_def: "/audio/week7/vocab_def_ruler.mp3", audio_coll: "/audio/week7/vocab_coll_ruler.mp3"
        },
        {
          id: 8, word: "eraser", image_url: "/images/week7/eraser.jpg",
          definition_en: "A rubber used to remove pencil marks.", definition_vi: "Cục tẩy",
          pronunciation: "/ɪˈreɪzə/", example: "I made a mistake, so I need an eraser.", collocation: "use an eraser",
          audio_word: "/audio/week7/vocab_eraser.mp3", audio_def: "/audio/week7/vocab_def_eraser.mp3", audio_coll: "/audio/week7/vocab_coll_eraser.mp3"
        },
        {
          id: 9, word: "notebook", image_url: "/images/week7/notebook.jpg",
          definition_en: "A book of plain paper for writing.", definition_vi: "Vở ghi chép",
          pronunciation: "/ˈnəʊtbʊk/", example: "Write your name in the notebook.", collocation: "open notebook",
          audio_word: "/audio/week7/vocab_notebook.mp3", audio_def: "/audio/week7/vocab_def_notebook.mp3", audio_coll: "/audio/week7/vocab_coll_notebook.mp3"
        },
        {
          id: 10, word: "paintbrush", image_url: "/images/week7/paintbrush.jpg",
          definition_en: "A brush for applying paint.", definition_vi: "Cọ vẽ",
          pronunciation: "/ˈpeɪntbrʌʃ/", example: "Wash the paintbrush after use.", collocation: "wet paintbrush",
          audio_word: "/audio/week7/vocab_paintbrush.mp3", audio_def: "/audio/week7/vocab_def_paintbrush.mp3", audio_coll: "/audio/week7/vocab_coll_paintbrush.mp3"
        }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Purpose (To / For)",
        title_vi: "Chỉ mục đích (Để làm gì)",
        rules: [
          { type: "rule", icon: "🎯", rule_en: "Use **to + Verb**", rule_vi: "Dùng **to + Động từ**", example: "I use a pen **to write**." },
          { type: "rule", icon: "🛠️", rule_en: "Use **for + V-ing**", rule_vi: "Dùng **for + V-ing**", example: "It is used **for cutting**." },
          { type: "rule", icon: "💡", rule_en: "Question: **What is it for?**", rule_vi: "Hỏi: **Nó dùng để làm gì?**", example: "What is a ruler for?" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "I use a pen _____ (write) a letter.", answer: "to write", hint: "Use + to + Verb" },
        { id: 2, type: "mc", question: "Scissors are used for _____.", options: ["cut", "cutting"], answer: "cutting", hint: "For + V-ing" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["to", "calculator", "I", "count", "use", "a"], answer: "I use a calculator to count.", hint: "I use..." },
        { id: 4, type: "fill", question: "A globe is for _____ (learn) about Earth.", answer: "learning", hint: "For + V-ing" },
        { id: 5, type: "mc", question: "We need glue _____ the paper.", options: ["to stick", "sticking"], answer: "to stick", hint: "Need + to + Verb" },
        { id: 6, type: "fill", question: "I use a ruler _____ (draw) lines.", answer: "to draw", hint: "To + Verb" },
        { id: 7, type: "unscramble", question: "Sort:", words: ["used", "is", "for", "It", "painting"], answer: "It is used for painting.", hint: "It is..." },
        { id: 8, type: "fill", question: "She uses a camera _____ (take) photos.", answer: "to take", hint: "To + Verb" },
        { id: 9, type: "mc", question: "A backpack is for _____ books.", options: ["carry", "carrying"], answer: "carrying", hint: "For + V-ing" },
        { id: 10, type: "fill", question: "Make sentence: 'I / use / glue / to / paste'", answer: ["I use glue to paste.", "i use glue to paste."], customCheck: true, hint: "Use 'to'" },
        { id: 11, type: "unscramble", question: "Sort:", words: ["for", "What", "is", "it", "?"], answer: "What is it for?", hint: "What..." },
        { id: 12, type: "fill", question: "He wears glasses _____ (see) better.", answer: "to see", hint: "To + Verb" },
        { id: 13, type: "mc", question: "This tool is used _____ fixing things.", options: ["to", "for"], answer: "for", hint: "Used for..." },
        { id: 14, type: "fill", question: "I go to school _____ (learn).", answer: "to learn", hint: "To + Verb" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["find", "dictionary", "words", "Use", "a", "to"], answer: "Use a dictionary to find words.", hint: "Use a..." },
        { id: 16, type: "fill", question: "An eraser is for _____ (remove) mistakes.", answer: "removing", hint: "For + V-ing" },
        { id: 17, type: "mc", question: "We use a map _____ find places.", options: ["to", "for"], answer: "to", hint: "Use ... to" },
        { id: 18, type: "fill", question: "Make sentence: 'Pen / is / for / writing'", answer: ["A pen is for writing.", "the pen is for writing."], customCheck: true, hint: "Use 'is for'" },
        { id: 19, type: "fill", question: "She bought flour _____ (make) a cake.", answer: "to make", hint: "To + Verb" },
        { id: 20, type: "unscramble", question: "Sort:", words: ["sleeping", "is", "Bed", "for"], answer: "Bed is for sleeping.", hint: "Bed is..." }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn gặp một từ khó trong sách. Hãy hỏi cô giáo xem bạn nên dùng công cụ gì.", context_en: "You see a hard word in the book. Ask the teacher what tool to use.", answer: ["What tool should I use?", "Should I use a dictionary?"], hint: "What tool..." },
        { id: 2, context_vi: "Bạn muốn biết cái kéo dùng để làm gì.", context_en: "You want to know the purpose of scissors.", answer: ["What are scissors for?", "What do we use scissors for?"], hint: "What are..." },
        { id: 3, context_vi: "Bạn có một bài toán khó. Hỏi bạn của bạn xem có được dùng máy tính không.", context_en: "You have a hard math problem. Ask your friend if you can use a calculator.", answer: ["Can I use a calculator?", "Is it okay to use a calculator?"], hint: "Can I..." },
        { id: 4, context_vi: "Bạn thấy một quả địa cầu. Hãy hỏi bố xem nó dùng để làm gì.", context_en: "You see a globe. Ask dad what it is used for.", answer: ["What is the globe used for?", "Dad, what is this for?"], hint: "What is..." },
        { id: 5, context_vi: "Bạn muốn mượn cục tẩy của bạn cùng bàn.", context_en: "You want to borrow an eraser from your classmate.", answer: ["Can I borrow your eraser?", "May I use your eraser?"], hint: "Can I..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "logic", title_en: "Riddle", question_en: "I have a handle and two sharp blades. I cut paper. What am I?", answer: ["Scissors", "A pair of scissors"], hint_en: "School tool", audio_url: "/audio/week7/logic_1.mp3" },
        { id: 2, type: "math", title_en: "Tool Count", question_en: "I have 3 pencils and I buy 4 more pens. How many writing tools do I have in total?", answer: ["7 tools", "7"], target_number: 7, unit: "tools", hint_en: "3 + 4", audio_url: "/audio/week7/logic_2.mp3" },
        { id: 3, type: "logic", title_en: "Classification", question_en: "Which one is NOT for writing? (Pen, Pencil, Globe)", answer: ["Globe", "The globe"], hint_en: "Map model", audio_url: "/audio/week7/logic_3.mp3" },
        { id: 4, type: "pattern", title_en: "Tool Pattern", question_en: "Pen, Ruler, Pen, Ruler, Pen... What is next?", options: ["Ruler", "Pen"], answer: "Ruler", hint_en: "A, B, A, B pattern", audio_url: "/audio/week7/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "Purpose Logic", question_en: "You want to find the meaning of a word. Do you use a Calculator or a Dictionary?", options: ["Dictionary", "Calculator"], answer: "Dictionary", hint_en: "Word meanings", audio_url: "/audio/week7/logic_5.mp3" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "I use a dictionary to find new words.", meaning: "Tôi dùng từ điển để tìm từ mới.", audio_url: "/audio/week7/dictation_1.mp3" },
        { id: 2, text: "A calculator is used for solving math.", meaning: "Máy tính dùng để giải toán.", audio_url: "/audio/week7/dictation_2.mp3" },
        { id: 3, text: "We use a globe to explore the world.", meaning: "Chúng ta dùng quả địa cầu để khám phá thế giới.", audio_url: "/audio/week7/dictation_3.mp3" },
        { id: 4, text: "My backpack is heavy because it has books.", meaning: "Ba lô tôi nặng vì nó chứa sách.", audio_url: "/audio/week7/dictation_4.mp3" },
        { id: 5, text: "I need glue and scissors for art.", meaning: "Tôi cần hồ và kéo cho môn vẽ.", audio_url: "/audio/week7/dictation_5.mp3" }
      ]
    },
    shadowing: {
      title: "Bonus: School Supplies | Talking Flashcards...",
      script: [
        { id: 1, text: "I have many tools for learning in my backpack.", vi: "Tôi có nhiều công cụ học tập trong ba lô.", audio_url: "/audio/week7/shadowing_1.mp3" },
        { id: 2, text: "A dictionary is important because I use it to find new words.", vi: "Từ điển quan trọng vì tôi dùng nó để tìm từ mới.", audio_url: "/audio/week7/shadowing_2.mp3" },
        { id: 3, text: "I use a calculator to solve difficult math problems.", vi: "Tôi dùng máy tính để giải các bài toán khó.", audio_url: "/audio/week7/shadowing_3.mp3" },
        { id: 4, text: "A globe is used for exploring the world map.", vi: "Quả địa cầu được dùng để khám phá bản đồ thế giới.", audio_url: "/audio/week7/shadowing_4.mp3" },
        { id: 5, text: "Every tool has a special purpose.", vi: "Mỗi công cụ đều có mục đích đặc biệt.", audio_url: "/audio/week7/shadowing_5.mp3" }
      ]
    },
    word_power: {
      words: [
        { id: 1, word: "purpose", definition_en: "The reason for which something is done.", definition_vi: "Mục đích", example: "What is the purpose of this tool?", cefr_level: "B1", collocation: "main purpose", image_url: "/images/week7/purpose.jpg",
          audio_word: "/audio/week7/power_word_purpose.mp3", audio_def: "/audio/week7/power_def_purpose.mp3", audio_coll: "/audio/week7/power_coll_purpose.mp3" },
        { id: 2, word: "calculate", definition_en: "To find an answer using math.", definition_vi: "Tính toán", example: "Calculate the total cost.", cefr_level: "B1", collocation: "calculate carefully", image_url: "/images/week7/calculate.jpg",
          audio_word: "/audio/week7/power_word_calculate.mp3", audio_def: "/audio/week7/power_def_calculate.mp3", audio_coll: "/audio/week7/power_coll_calculate.mp3" },
        { id: 3, word: "method", definition_en: "A way of doing something.", definition_vi: "Phương pháp", example: "Use a new method to learn.", cefr_level: "B1", collocation: "teaching method", image_url: "/images/week7/method.jpg",
          audio_word: "/audio/week7/power_word_method.mp3", audio_def: "/audio/week7/power_def_method.mp3", audio_coll: "/audio/week7/power_coll_method.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, query: "Classroom objects vocabulary", videoId: "g7kK989HiRQ", duration: "3:00", sim_duration: 180 },
        { id: 2, query: "A vs An articles", videoId: "84LU4Phzvco", duration: "3:00", sim_duration: 180 },
        { id: 3, query: "Counting school supplies", videoId: "AS5nhKzaOqo", duration: "3:00", sim_duration: 180 },
        { id: 4, query: "Simple machines for kids", videoId: "fvOmaf2GfCY", duration: "3:00", sim_duration: 180 },
        { id: 5, query: "Classroom objects  song", videoId: "dbklZrO5H78", duration: "3:00", sim_duration: 180 }
      ],
      bonus_games: [
        { id: 1, title: "Bonus: Do You Have A Crayon? | School Supplies Song | Super Simple Songs (Super Simple Songs - Kids Songs)", url: "https://www.gamestolearnenglish.com/fast-english/", description: "Match the tools." },
        { id: 2, title: "Spelling Bee", url: "https://www.gamestolearnenglish.com/spelling-bee/", description: "Spell the words." }
      ]
    },
    writing: {
      title: "Video Challenge: My Favorite Tool",
      prompt_en: "Show your favorite learning tool (pen, book, etc.). Say what you use it for.",
      prompt_vi: "Khoe công cụ học tập yêu thích. Nói xem bạn dùng nó để làm gì.",
      min_words: 20,
      keywords: ["use", "to", "because", "for"]
    },
    explore: {
      title_en: "Tools Through Time",
      title_vi: "Công cụ qua thời gian",
      image_url: "/images/week7/explore_cover_w07.jpg",
      content_en: "Long ago, students used **quills** and ink **to write**. They did not have **calculators**; they used an **abacus** **for counting**. Today, we have **tablets** and computers. These modern tools make learning faster **and** easier. However, the **purpose** remains the same: to gain knowledge.",
      content_vi: "Ngày xưa, học sinh dùng bút lông ngỗng và mực để viết. Họ không có máy tính bỏ túi; họ dùng bàn tính để đếm. Ngày nay, chúng ta có máy tính bảng và máy vi tính. Những công cụ hiện đại này giúp việc học nhanh và dễ dàng hơn. Tuy nhiên, mục đích vẫn như cũ: để thu nhận kiến thức.",
      audio_url: "/audio/week7/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "What did students use long ago to write?", answer: ["Quills and ink.", "They used quills."], hint_en: "They used...", hint_vi: "Họ dùng..." },
        { id: 2, question_en: "What was the abacus used for?", answer: ["For counting.", "It was for counting."], hint_en: "For...", hint_vi: "Để..." },
        { id: 3, question_en: "What is the purpose of tools?", answer: ["To gain knowledge.", "To learn."], hint_en: "To gain...", hint_vi: "Để thu nhận..." }
      ],
      question: { text_en: "Do you like old tools or modern tools? Why?", text_vi: "Bạn thích công cụ xưa hay nay? Tại sao?", min_words: 15, model_answer: "I like modern tools because they are fast." }
    }
  }
};
export default weekData;
