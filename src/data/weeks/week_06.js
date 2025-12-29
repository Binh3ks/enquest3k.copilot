const weekData = {
  weekId: 6,
  weekTitle_en: "Describing My Room",
  weekTitle_vi: "Miêu tả Phòng của tôi",
  grammar_focus: "Prepositions (In/On/Under/Next to) & Connectors",
  global_vocab: [],
  stations: {
    read_explore: {
      title: "My Private Space",
      image_url: "/images/week6/read_cover_w06.jpg",
      content_en: "My bedroom is small, **but** it is very **tidy**. The **bed** is **next to** the large window **because** I like the sunlight. I keep all my **toys** **in** a big red **box**. My favorite **books** are **on** the wooden **shelf** above the desk. A bright **lamp** stands **on** the desk, **and** it helps me study at night. I love my room **because** it is my own special space.",
      content_vi: "Phòng ngủ của tôi nhỏ, nhưng nó rất gọn gàng. Cái giường ở cạnh cửa sổ lớn vì tôi thích ánh nắng. Tôi giữ tất cả đồ chơi trong một cái hộp đỏ lớn. Những cuốn sách yêu thích của tôi ở trên kệ gỗ phía trên bàn học. Một cái đèn sáng đứng trên bàn, và nó giúp tôi học vào ban đêm. Tôi yêu phòng của mình vì nó là không gian đặc biệt của riêng tôi.",
      // FIX: Đổi tên file audio cho đúng chuẩn
      audio_url: "/audio/week6/read_explore_main.mp3",
      comprehension_questions: [
        {
          id: 1,
          question_en: "Why is the bed next to the window?",
          answer: ["Because he likes the sunlight.", "He likes sunlight."],
          hint_en: "Look for 'because'...",
          hint_vi: "Tìm từ 'because'..."
        },
        {
          id: 2,
          question_en: "Where are the toys kept?",
          answer: ["In a big red box.", "They are in the box."],
          hint_en: "In a big...",
          hint_vi: "Trong một..."
        },
        {
          id: 3,
          question_en: "Is the room messy?",
          answer: ["No, it is tidy.", "It is small but tidy."],
          hint_en: "It is small but...",
          hint_vi: "Nó nhỏ nhưng..."
        }
      ]
    },
    new_words: {
      vocab: [
        {
          id: 1, word: "bedroom", image_url: "/images/week6/bedroom.jpg",
          definition_en: "A room used for sleeping.", definition_vi: "Phòng ngủ",
          pronunciation: "/ˈbɛdruːm/", example: "I clean my bedroom every day.", collocation: "tidy bedroom",
          audio_word: "/audio/week6/vocab_bedroom.mp3", audio_def: "/audio/week6/vocab_def_bedroom.mp3", audio_coll: "/audio/week6/vocab_coll_bedroom.mp3"
        },
        {
          id: 2, word: "shelf", image_url: "/images/week6/shelf.jpg",
          definition_en: "A flat board to hold things.", definition_vi: "Cái kệ",
          pronunciation: "/ʃɛlf/", example: "Put the book on the shelf.", collocation: "wooden shelf",
          audio_word: "/audio/week6/vocab_shelf.mp3", audio_def: "/audio/week6/vocab_def_shelf.mp3", audio_coll: "/audio/week6/vocab_coll_shelf.mp3"
        },
        {
          id: 3, word: "tidy", image_url: "/images/week6/tidy.jpg",
          definition_en: "Neat and well organized.", definition_vi: "Gọn gàng",
          pronunciation: "/ˈtʌɪdi/", example: "My desk is always tidy.", collocation: "keep tidy",
          audio_word: "/audio/week6/vocab_tidy.mp3", audio_def: "/audio/week6/vocab_def_tidy.mp3", audio_coll: "/audio/week6/vocab_coll_tidy.mp3"
        },
        {
          id: 4, word: "messy", image_url: "/images/week6/messy.jpg",
          definition_en: "Not clean or organized.", definition_vi: "Bừa bộn",
          pronunciation: "/ˈmɛsi/", example: "Do not leave the room messy.", collocation: "messy room",
          audio_word: "/audio/week6/vocab_messy.mp3", audio_def: "/audio/week6/vocab_def_messy.mp3", audio_coll: "/audio/week6/vocab_coll_messy.mp3"
        },
        {
          id: 5, word: "lamp", image_url: "/images/week6/lamp.jpg",
          definition_en: "A device that gives light.", definition_vi: "Cái đèn",
          pronunciation: "/læmp/", example: "Turn on the lamp please.", collocation: "bright lamp",
          audio_word: "/audio/week6/vocab_lamp.mp3", audio_def: "/audio/week6/vocab_def_lamp.mp3", audio_coll: "/audio/week6/vocab_coll_lamp.mp3"
        },
        {
          id: 6, word: "pillow", image_url: "/images/week6/pillow.jpg",
          definition_en: "A soft cushion for the head.", definition_vi: "Cái gối",
          pronunciation: "/ˈpɪləʊ/", example: "The pillow is very soft.", collocation: "soft pillow",
          audio_word: "/audio/week6/vocab_pillow.mp3", audio_def: "/audio/week6/vocab_def_pillow.mp3", audio_coll: "/audio/week6/vocab_coll_pillow.mp3"
        },
        {
          id: 7, word: "blanket", image_url: "/images/week6/blanket.jpg",
          definition_en: "A warm cover for the bed.", definition_vi: "Cái chăn",
          pronunciation: "/ˈblaŋkɪt/", example: "I sleep under a warm blanket.", collocation: "warm blanket",
          audio_word: "/audio/week6/vocab_blanket.mp3", audio_def: "/audio/week6/vocab_def_blanket.mp3", audio_coll: "/audio/week6/vocab_coll_blanket.mp3"
        },
        {
          id: 8, word: "mirror", image_url: "/images/week6/mirror.jpg",
          definition_en: "Glass that shows your reflection.", definition_vi: "Cái gương",
          pronunciation: "/ˈmɪrə/", example: "Look in the mirror.", collocation: "large mirror",
          audio_word: "/audio/week6/vocab_mirror.mp3", audio_def: "/audio/week6/vocab_def_mirror.mp3", audio_coll: "/audio/week6/vocab_coll_mirror.mp3"
        },
        {
          id: 9, word: "wardrobe", image_url: "/images/week6/wardrobe.jpg",
          definition_en: "A tall cupboard for clothes.", definition_vi: "Tủ quần áo",
          pronunciation: "/ˈwɔːdrəʊb/", example: "Hang your coat in the wardrobe.", collocation: "open wardrobe",
          audio_word: "/audio/week6/vocab_wardrobe.mp3", audio_def: "/audio/week6/vocab_def_wardrobe.mp3", audio_coll: "/audio/week6/vocab_coll_wardrobe.mp3"
        },
        {
          id: 10, word: "drawer", image_url: "/images/week6/drawer.jpg",
          definition_en: "A sliding box in a table.", definition_vi: "Ngăn kéo",
          pronunciation: "/drɔː/", example: "The pen is in the drawer.", collocation: "top drawer",
          audio_word: "/audio/week6/vocab_drawer.mp3", audio_def: "/audio/week6/vocab_def_drawer.mp3", audio_coll: "/audio/week6/vocab_coll_drawer.mp3"
        }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Prepositions & Linking Words",
        title_vi: "Giới từ & Từ nối",
        rules: [
          { type: "rule", icon: "📍", rule_en: "**in**, **on**, **under**, **next to**", rule_vi: "trong, trên, dưới, bên cạnh", example: "The cat is **under** the bed." },
          { type: "rule", icon: "🔗", rule_en: "**and** (add info), **but** (contrast)", rule_vi: "và (thêm ý), nhưng (đối lập)", example: "It is small **but** nice." },
          { type: "rule", icon: "💡", rule_en: "**because** (give reason)", rule_vi: "bởi vì (nêu lý do)", example: "I smile **because** I am happy." }
        ]
      },
      exercises: [
        { id: 1, type: "mc", question: "My room is small, _____ it is clean.", options: ["and", "but"], answer: "but", hint: "Contrast (Đối lập) -> but" },
        { id: 2, type: "fill", question: "The toys are _____ (in/on) the box.", answer: "in", hint: "Inside -> in" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["lamp", "is", "The", "desk", "on", "the"], answer: "The lamp is on the desk.", hint: "The lamp is..." },
        { id: 4, type: "fill", question: "I like this book _____ (so/because) it is funny.", answer: "because", hint: "Reason (Lý do) -> because" },
        { id: 5, type: "mc", question: "The shoes are _____ the bed.", options: ["under", "in"], answer: "under", hint: "Below -> under" },
        { id: 6, type: "fill", question: "She is tall _____ (and/but) pretty.", answer: "and", hint: "Addition (Thêm) -> and" },
        { id: 7, type: "unscramble", question: "Sort:", words: ["next to", "is", "chair", "The", "window", "the"], answer: "The chair is next to the window.", hint: "The chair is..." },
        { id: 8, type: "fill", question: "Make sentence: 'Cat / under / table'", answer: ["The cat is under the table.", "the cat is under the table."], customCheck: true, hint: "Use 'is' and 'the'" },
        { id: 9, type: "mc", question: "I study hard _____ I want to learn.", options: ["so", "because"], answer: "because", hint: "Reason -> because" },
        { id: 10, type: "fill", question: "The pillow is _____ (on/in) the bed.", answer: "on", hint: "Surface -> on" },
        { id: 11, type: "unscramble", question: "Sort:", words: ["tidy", "is", "room", "My", "nice", "and"], answer: "My room is tidy and nice.", hint: "My room..." },
        { id: 12, type: "fill", question: "I am tired, _____ (but/so) I go to sleep.", answer: "so", hint: "Result (Kết quả) -> so" },
        { id: 13, type: "mc", question: "The picture is _____ the wall.", options: ["in", "on"], answer: "on", hint: "Surface -> on" },
        { id: 14, type: "fill", question: "My clothes are _____ (in/on) the wardrobe.", answer: "in", hint: "Inside -> in" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["messy", "is", "He", "room", "his", "but", "is", "nice"], answer: "He is nice but his room is messy.", hint: "He is..." },
        { id: 16, type: "fill", question: "Make sentence: 'Lamp / next to / bed'", answer: ["The lamp is next to the bed.", "the lamp is next to the bed."], customCheck: true, hint: "Use 'is'" },
        { id: 17, type: "mc", question: "It is raining, _____ I stay inside.", options: ["but", "so"], answer: "so", hint: "Result -> so" },
        { id: 18, type: "fill", question: "The ball is _____ (under/on) the chair.", answer: "under", hint: "Below -> under" },
        { id: 19, type: "unscramble", question: "Sort:", words: ["book", "The", "shelf", "is", "the", "on"], answer: "The book is on the shelf.", hint: "The book is..." },
        { id: 20, "type": "fill", "question": "Make sentence: 'I / happy / because / I / learn'", "answer": ["I am happy because I learn.", "i am happy because i learn."], "customCheck": true, "hint": "I am..." }
      ]
    },
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn không tìm thấy cuốn sách Toán. Hãy hỏi mẹ xem nó có ở trên bàn không.", context_en: "You can't find your Math book. Ask mom if it is on the desk.", answer: ["Is my Math book on the desk?", "Mom, is the book on the desk?"], hint: "Is... on..." },
        { id: 2, context_vi: "Bạn muốn biết tại sao phòng của bạn lại bừa bộn.", context_en: "You want to know why your room is messy.", answer: ["Why is my room messy?", "Why is the room messy?"], hint: "Why..." },
        { id: 3, context_vi: "Bạn hỏi bố xem đôi giày của bạn ở đâu.", context_en: "Ask dad where your shoes are.", answer: ["Where are my shoes?", "Dad, where are the shoes?"], hint: "Where are..." },
        { id: 4, context_vi: "Bạn muốn biết cái gì ở trong cái hộp màu xanh.", context_en: "You want to know what is inside the blue box.", answer: ["What is in the blue box?", "What is inside the box?"], hint: "What is in..." },
        { id: 5, context_vi: "Bạn nhờ anh trai dọn dẹp phòng vì nó bẩn.", context_en: "Ask your brother to clean the room because it is dirty.", answer: ["Can you clean the room?", "Please clean the room."], hint: "Can you..." }
      ]
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "logic", title_en: "Spatial Logic", question_en: "The red book is ON the desk. The blue book is UNDER the red book. Where is the blue book?", answer: ["On the desk", "It is on the desk"], hint_en: "Red on desk, blue under red -> blue also on desk", audio_url: "/audio/week6/logic_1.mp3" },
        { id: 2, type: "math", title_en: "Bookshelf Math", question_en: "There are 5 books on the top shelf and 4 books on the bottom shelf. How many books are there in total?", answer: ["9 books", "There are 9 books"], target_number: 9, unit: "books", hint_en: "5 + 4", audio_url: "/audio/week6/logic_2.mp3" },
        { id: 3, type: "logic", title_en: "Mystery Object", question_en: "I have four legs but I cannot walk. You sleep on me. What am I?", answer: ["A bed", "The bed"], hint_en: "Furniture for sleeping", audio_url: "/audio/week6/logic_3.mp3" },
        // FIX: Thêm options cho câu hỏi Pattern (Quy luật)
        { 
          id: 4, 
          type: "pattern", 
          title_en: "Tidy Sequence", 
          question_en: "Clean, Messy, Clean, Messy, Clean... What comes next?", 
          options: ["Clean", "Messy"],
          answer: "Messy", 
          hint_en: "Pattern A, B, A, B", 
          audio_url: "/audio/week6/logic_4.mp3" 
        },
        { id: 5, type: "logic", title_en: "Where is the Cat?", question_en: "The cat is NOT on the bed. The cat is NOT under the desk. It is next to the lamp. Where is the cat?", answer: ["Next to the lamp", "It is next to the lamp"], hint_en: "Read the last sentence", audio_url: "/audio/week6/logic_5.mp3" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "My bedroom is small but it is very tidy.", meaning: "Phòng ngủ tôi nhỏ nhưng rất gọn gàng.", audio_url: "/audio/week6/dictation_1.mp3" },
        { id: 2, text: "The bright lamp is on the wooden desk.", meaning: "Cái đèn sáng ở trên bàn gỗ.", audio_url: "/audio/week6/dictation_2.mp3" },
        { id: 3, text: "I keep my toys in a big red box.", meaning: "Tôi giữ đồ chơi trong hộp đỏ lớn.", audio_url: "/audio/week6/dictation_3.mp3" },
        { id: 4, text: "My shoes are under the bed because I am lazy.", meaning: "Giày tôi ở dưới giường vì tôi lười.", audio_url: "/audio/week6/dictation_4.mp3" },
        { id: 5, text: "The books are on the shelf next to the window.", meaning: "Sách ở trên kệ cạnh cửa sổ.", audio_url: "/audio/week6/dictation_5.mp3" }
      ]
    },
    shadowing: {
      title: "My Private Space",
      script: [
        { id: 1, text: "My bedroom is small, but it is very tidy.", vi: "Phòng ngủ tôi nhỏ, nhưng rất gọn gàng.", audio_url: "/audio/week6/shadowing_1.mp3" },
        { id: 2, text: "The bed is next to the large window because I like fresh air.", vi: "Giường cạnh cửa sổ lớn vì tôi thích không khí trong lành.", audio_url: "/audio/week6/shadowing_2.mp3" },
        { id: 3, text: "I keep all my toys in a big red box.", vi: "Tôi giữ tất cả đồ chơi trong hộp đỏ lớn.", audio_url: "/audio/week6/shadowing_3.mp3" },
        { id: 4, text: "A bright lamp stands on the desk, and it helps me study.", vi: "Một cái đèn sáng đứng trên bàn, và nó giúp tôi học.", audio_url: "/audio/week6/shadowing_4.mp3" },
        { id: 5, text: "I love my room because it is my own special space.", vi: "Tôi yêu phòng mình vì nó là không gian đặc biệt của riêng tôi.", audio_url: "/audio/week6/shadowing_5.mp3" }
      ]
    },
    word_power: {
      words: [
        { id: 1, word: "organize", definition_en: "To arrange things in order.", definition_vi: "Sắp xếp/Tổ chức", example: "I organize my books by color.", cefr_level: "B1", collocation: "well organized", image_url: "/images/week6/organize.jpg",
          audio_word: "/audio/week6/power_word_organize.mp3", audio_def: "/audio/week6/power_def_organize.mp3", audio_coll: "/audio/week6/power_coll_organize.mp3" },
        { id: 2, word: "comfortable", definition_en: "Giving physical ease.", definition_vi: "Thoải mái", example: "This bed is very comfortable.", cefr_level: "A2", collocation: "comfortable chair", image_url: "/images/week6/comfortable.jpg",
          audio_word: "/audio/week6/power_word_comfortable.mp3", audio_def: "/audio/week6/power_def_comfortable.mp3", audio_coll: "/audio/week6/power_coll_comfortable.mp3" },
        { id: 3, word: "locate", definition_en: "To find the exact place of something.", definition_vi: "Xác định vị trí", example: "I cannot locate my keys.", cefr_level: "B1", collocation: "locate the object", image_url: "/images/week6/locate.jpg",
          audio_word: "/audio/week6/power_word_locate.mp3", audio_def: "/audio/week6/power_def_locate.mp3", audio_coll: "/audio/week6/power_coll_locate.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, query: "Furniture vocabulary", videoId: "m27Cck_LGHc", duration: "2:00", sim_duration: 120 },
        { id: 2, query: "Prepositions of place grammar", videoId: "_UwT0tC5JTk", duration: "3:00", sim_duration: 180 },
        { id: 3, query: "Left and Right song", videoId: "gRbwFq9665k", duration: "1:30", sim_duration: 90 },
        { id: 4, query: "Light and Dark science", videoId: "kkwgPwBKyl4", duration: "4:00", sim_duration: 240 },
        { id: 5, query: "Furniture  song", videoId: "aEM9d_8_i0k", duration: "2:30", sim_duration: 150 }
      ],
      bonus_games: [
        { id: 1, title: "Bonus: [NEW] House (v2) - Kids vocabulary - Parts of the House - English education (English Singsing)", url: "https://www.gamestolearnenglish.com/furniture/", description: "Design your dream room." }
      ]
    },
    writing: {
      title: "Video Challenge: My Room Tour",
      prompt_en: "Give a tour of your room. Use 'in', 'on', 'under' and 'next to' to say where things are. (Ex: My bed is next to the wall.)",
      prompt_vi: "Dẫn mọi người tham quan phòng bạn. Dùng giới từ để chỉ vị trí đồ vật.",
      min_words: 25,
      keywords: ["in", "on", "next to", "because", "and"]
    },
    explore: {
      title_en: "Your Own Space",
      title_vi: "Không gian riêng của bạn",
      image_url: "/images/week6/explore_cover.jpg",
      content_en: "A **bedroom** is more than a place to sleep. It is your private space. You can read **books** **on** your bed **or** play with toys **on** the floor. It is important to keep it clean **because** a messy room makes it hard to find things. When your room is tidy, you feel happy **and** relaxed.",
      content_vi: "Phòng ngủ không chỉ là nơi để ngủ. Nó là không gian riêng của bạn. Bạn có thể đọc sách trên giường hoặc chơi đồ chơi trên sàn. Quan trọng là phải giữ nó sạch sẽ vì một căn phòng bừa bộn làm bạn khó tìm đồ. Khi phòng gọn gàng, bạn cảm thấy vui vẻ và thư giãn.",
      audio_url: "/audio/week6/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "Why is it important to keep the room clean?", answer: ["Because a messy room makes it hard to find things."], hint_en: "Because..." },
        { id: 2, question_en: "Where can you play with toys?", answer: ["On the floor.", "You can play on the floor."], hint_en: "On the..." },
        { id: 3, question_en: "How do you feel when the room is tidy?", answer: ["Happy and relaxed.", "You feel happy."], hint_en: "Happy and..." }
      ],
      question: { text_en: "Do you like your bedroom? Why or why not?", text_vi: "Bạn có thích phòng ngủ của mình không? Tại sao?", min_words: 15, model_answer: "I like my bedroom because it has all my favorite toys." }
    }
  }
};
export default weekData;
