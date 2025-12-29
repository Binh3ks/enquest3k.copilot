const weekData = {
  weekId: 2,
  weekTitle_en: "Family Observation",
  weekTitle_vi: "Quan sát Gia đình",
  grammar_focus: "Present Continuous & Questions",
  global_vocab: [
    { word: "family", definition_en: "People who love and help each other.", definition_vi: "Gia đình" },
    { word: "member", definition_en: "A person in a group.", definition_vi: "Thành viên" },
    { word: "role", definition_en: "A job or duty.", definition_vi: "Vai trò" },
    { word: "care", definition_en: "To look after someone.", definition_vi: "Chăm sóc" },
    { word: "support", definition_en: "To help someone.", definition_vi: "Hỗ trợ" },
    { word: "team", definition_en: "A group working together.", definition_vi: "Đội/Nhóm" },
    { word: "busy", definition_en: "Working hard.", definition_vi: "Bận rộn" },
    { word: "kind", definition_en: "Nice and helpful.", definition_vi: "Tốt bụng" },
    { word: "together", definition_en: "With each other.", definition_vi: "Cùng nhau" },
    { word: "share", definition_en: "To give a part of something.", definition_vi: "Chia sẻ" },
    { word: "cook", definition_en: "To make food.", definition_vi: "Nấu ăn" },
    { word: "clean", definition_en: "To remove dirt.", definition_vi: "Dọn dẹp" },
    { word: "play", definition_en: "To have fun.", definition_vi: "Vui chơi" },
    { word: "read", definition_en: "To look at words.", definition_vi: "Đọc" },
    { word: "bond", definition_en: "A strong connection.", definition_vi: "Sự gắn kết" }
  ],
  stations: {
    read_explore: {
      title: "My Family Team",
      image_url: "/images/week2/read_cover_w02.jpg",
      content_en: "This is my **family**. We are a **team**. My **father** is **cooking**. He is a **kind** man. My **mother** is **reading**. She loves **knowledge**. My **brother** is **cleaning**. He is **helpful**. I **play** with my **sister**. We **share** our toys. Each **member** has a **role**.",
      content_vi: "Đây là gia đình tôi. Chúng tôi là một đội. Bố tôi đang nấu ăn. Ông ấy là một người tốt bụng. Mẹ tôi đang đọc sách. Bà ấy yêu tri thức. Anh tôi đang dọn dẹp. Anh ấy rất hay giúp đỡ. Tôi chơi với em gái. Chúng tôi chia sẻ đồ chơi. Mỗi thành viên đều có một vai trò.",
      audio_url: null,
      comprehension_questions: [
        { 
          id: 1, 
          question_en: "What is the father doing?", 
          answer: ["He is cooking.", "The father is cooking."], 
          hint_en: "Look for 'My father is...'", 
          hint_vi: "Tìm đoạn 'My father is...'" 
        },
        { 
          id: 2, 
          question_en: "What does the mother love?", 
          answer: ["She loves knowledge.", "The mother loves knowledge."], 
          hint_en: "She loves...", 
          hint_vi: "Bà ấy yêu..." 
        },
        { 
          id: 3, 
          question_en: "Are they a team?", 
          answer: ["Yes, they are a team.", "Yes, they are."], 
          hint_en: "We are a...", 
          hint_vi: "Chúng tôi là một..." 
        }
      ]
    },
    new_words: {
      vocab: [
        { id: 1, word: "family", pronunciation: "/ˈfamɪli/", definition_vi: "Gia đình", definition_en: "A group of parents and children.", example: "I love my family.", collocation: "happy family", image_url: "/images/week2/family.jpg" },
        { id: 2, word: "father", pronunciation: "/ˈfɑːðə/", definition_vi: "Bố/Cha", definition_en: "A male parent.", example: "My father is tall.", collocation: "my father", image_url: "/images/week2/father.jpg" },
        { id: 3, word: "mother", pronunciation: "/ˈmʌðə/", definition_vi: "Mẹ", definition_en: "A female parent.", example: "My mother is kind.", collocation: "kind mother", image_url: "/images/week2/mother.jpg" },
        { id: 4, word: "brother", pronunciation: "/ˈbrʌðə/", definition_vi: "Anh/Em trai", definition_en: "A boy with same parents.", example: "He is my brother.", collocation: "big brother", image_url: "/images/week2/brother.jpg" },
        { id: 5, word: "sister", pronunciation: "/ˈsɪstə/", definition_vi: "Chị/Em gái", definition_en: "A girl with same parents.", example: "She is my sister.", collocation: "little sister", image_url: "/images/week2/sister.jpg" },
        { id: 6, word: "helping", pronunciation: "/hɛlpɪŋ/", definition_vi: "Đang giúp đỡ", definition_en: "Doing something good for others.", example: "He is helping mom.", collocation: "helping others", image_url: "/images/week2/helping.jpg" },
        { id: 7, word: "cooking", pronunciation: "/kʊkɪŋ/", definition_vi: "Đang nấu ăn", definition_en: "Making food.", example: "Dad is cooking dinner.", collocation: "cooking dinner", image_url: "/images/week2/cooking.jpg" },
        { id: 8, word: "playing", pronunciation: "/pleɪɪŋ/", definition_vi: "Đang chơi", definition_en: "Having fun.", example: "The baby is playing.", collocation: "playing together", image_url: "/images/week2/playing.jpg" },
        { id: 9, word: "reading", pronunciation: "/riːdɪŋ/", definition_vi: "Đang đọc", definition_en: "Looking at a book.", example: "She is reading a book.", collocation: "reading books", image_url: "/images/week2/reading.jpg" },
        { id: 10, word: "cleaning", pronunciation: "/kliːnɪŋ/", definition_vi: "Đang dọn dẹp", definition_en: "Removing dirt.", example: "We are cleaning the room.", collocation: "cleaning up", image_url: "/images/week2/cleaning.jpg" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    grammar: {
      grammar_explanation: {
        title_en: "Present Continuous (He/She is V-ing)",
        title_vi: "Thì hiện tại tiếp diễn (Ai đó đang làm gì)",
        rules: [
          { type: "rule", icon: "👉", rule_en: "He/She + **is** + Verb-**ing**", rule_vi: "Anh ấy/Cô ấy + **đang** + làm gì", example: "He **is** cook**ing**." },
          { type: "rule", icon: "❓", rule_en: "Question: **Is** + he/she + Verb-**ing**?", rule_vi: "Câu hỏi: Anh ấy/Cô ấy + **có đang**...?", example: "**Is** he cook**ing**?" },
          { type: "rule", icon: "✨", rule_en: "What is he doing?", rule_vi: "Anh ấy đang làm gì?", example: "He is reading." }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "This _____ (be) my father.", answer: "is", hint: "One person -> is" },
        { id: 2, type: "mc", question: "He _____ cooking.", options: ["is", "are", "am"], answer: "is", hint: "He -> is" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["is", "mother", "My", "reading"], answer: "My mother is reading.", hint: "My mother is..." },
        { id: 4, type: "fill", question: "She is _____ (cook).", answer: "cooking", hint: "Add -ing" },
        { id: 5, type: "mc", question: "We _____ playing.", options: ["is", "are"], answer: "are", hint: "We -> are" },
        { id: 6, type: "unscramble", question: "Sort:", words: ["is", "doing", "What", "he", "?"], answer: "What is he doing?", hint: "What is..." },
        { id: 7, type: "fill", question: "The baby is _____ (sleep).", answer: "sleeping", hint: "Add -ing" },
        { id: 8, type: "mc", question: "_____ she helping?", options: ["Is", "Are"], answer: "Is", hint: "Is she...?" },
        { id: 9, type: "fill", question: "Make sentence: 'He / run'", answer: ["He is running.", "he is running."], customCheck: true, hint: "He is..." },
        { id: 10, type: "fill", question: "I _____ (be) playing.", answer: "am", hint: "I -> am" },
        { id: 11, type: "fill", question: "My sister _____ (be) kind.", answer: "is", hint: "One person -> is" },
        { id: 12, type: "unscramble", question: "Sort:", words: ["are", "We", "family", "a"], answer: "We are a family.", hint: "We are..." },
        { id: 13, type: "fill", question: "He is _____ (help).", answer: "helping", hint: "Add -ing" },
        { id: 14, type: "mc", question: "Who _____ she?", options: ["is", "are"], answer: "is", hint: "She -> is" },
        { id: 15, type: "fill", question: "This is my _____ (mthero).", answer: "mother", hint: "Spelling: m-o-t-h-e-r" },
        { id: 16, type: "unscramble", question: "Sort:", words: ["is", "He", "tall"], answer: "He is tall.", hint: "He is..." },
        { id: 17, type: "fill", question: "Make question: 'she / reading / ?'", answer: ["Is she reading?", "is she reading?"], customCheck: true, hint: "Is she..." },
        { id: 18, type: "mc", question: "_____ you working?", options: ["Is", "Are"], answer: "Are", hint: "Are you...?" },
        { id: 19, type: "fill", question: "It _____ (be) a cat.", answer: "is", hint: "It -> is" },
        { id: 20, type: "fill", question: "My father is _____ (work).", answer: "working", hint: "Add -ing" }
      ]
    },
    ask_ai: {
      // STRICT QUESTION FORMING: Dạy học sinh đặt câu hỏi (Critical Inquiry)
      prompts: [
        { id: 1, context_vi: "Bạn thấy mẹ đang làm việc. Bạn muốn biết mẹ đang làm nghề gì. (Hỏi: What...)", context_en: "You see Mom working. You want to know her job. Ask her.", answer: ["What is your job?", "What do you do?"], hint: "What is..." },
        { id: 2, context_vi: "Bạn thấy bố đang nấu ăn trong bếp. Hãy hỏi bố đang nấu món gì.", context_en: "Dad is in the kitchen. Ask him what he is cooking.", answer: ["What are you cooking?", "What is that?"], hint: "What are..." },
        { id: 3, context_vi: "Bạn muốn biết em gái có đang chơi không. (Hỏi: Is...)", context_en: "You want to know if your sister is playing.", answer: ["Is she playing?", "Is my sister playing?"], hint: "Is she..." },
        { id: 4, context_vi: "Bạn thấy một người lạ trong ảnh gia đình. Hãy hỏi 'Đây là ai?'", context_en: "You see a stranger in a family photo. Ask who it is.", answer: ["Who is this?", "Who is that?", "Who is he?"], hint: "Who is..." },
        { id: 5, context_vi: "Bạn muốn rủ anh trai cùng chơi. Hãy hỏi 'Anh có muốn chơi không?'", context_en: "Invite your brother to play.", answer: ["Do you want to play?", "Can we play?"], hint: "Do you..." }
      ]
    },
    explore: {
      title_en: "Family Roles", title_vi: "Vai trò trong Gia đình",
      image_url: "/images/week2/explore_cover_w02.jpg",
      content_en: "In a **family**, everyone has a **role**. Parents **care** for children. They **work** to buy food. Children can **help** too. We can **clean** our room. We can **share** toys. A family is a **team**. We **support** each other.",
      content_vi: "Trong gia đình, mọi người đều có vai trò. Cha mẹ chăm sóc con cái. Họ làm việc để mua thức ăn. Trẻ em cũng có thể giúp đỡ. Chúng ta có thể dọn dẹp phòng. Chúng ta có thể chia sẻ đồ chơi. Gia đình là một đội. Chúng ta hỗ trợ lẫn nhau.",
      check_questions: [
        { id: 1, question_en: "What do parents do?", question_vi: "Cha mẹ làm gì?", answer: ["Parents care for children.", "They care for children."], hint_en: "Parents care...", hint_vi: "Cha mẹ chăm sóc..." },
        { id: 2, question_en: "What is a family?", question_vi: "Gia đình là gì?", answer: ["A family is a team.", "It is a team."], hint_en: "A family is a...", hint_vi: "Gia đình là một..." },
        { id: 3, question_en: "What can children do?", question_vi: "Trẻ em có thể làm gì?", answer: ["Children can help.", "We can clean our room."], hint_en: "Children can...", hint_vi: "Trẻ em có thể..." }
      ],
      question: { 
        text_en: "How do you help your family?", 
        text_vi: "Bạn giúp đỡ gia đình như thế nào?", 
        min_words: 5, 
        hint_en: "I help my family by...", 
        hint_vi: "Tôi giúp gia đình bằng cách...",
        model_answer: "I help my mother clean the room."
      }
    },
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Counting Members", title_vi: "Đếm thành viên", question_en: "My family has 2 sisters and 1 brother. How many children?", question_vi: "Nhà tôi có 2 chị và 1 anh. Có bao nhiêu người con?", answer: ["3 children", "three children"], target_number: 3, unit: "children", hint_en: "2 + 1", hint_vi: "2 + 1" },
        { id: 2, type: "logic", title_en: "Who is older?", title_vi: "Ai lớn hơn?", question_en: "Father is older than Brother. Brother is older than Baby. Who is the youngest?", question_vi: "Bố lớn hơn Anh. Anh lớn hơn Em bé. Ai trẻ nhất?", answer: ["Baby", "The baby"], target_number: 0, unit: "", hint_en: "The smallest one", hint_vi: "Người nhỏ nhất" },
        { id: 3, type: "logic", title_en: "Word Logic", title_vi: "Tư duy từ vựng", question_en: "Mother is to Father as Sister is to...?", question_vi: "Mẹ đối với Bố như Chị đối với...?", answer: ["Brother", "The brother"], target_number: 0, unit: "", hint_en: "Boy sibling", hint_vi: "Anh/Em trai" },
        { id: 4, type: "pattern", title_en: "Observation", title_vi: "Quan sát", question_en: "Mom, Dad, Mom, Dad. What comes next?", question_vi: "Mẹ, Bố, Mẹ, Bố. Tiếp theo là gì?", options: ["Mom", "Dad"], answer: "Mom", target_number: 0, unit: "", hint_en: "Pattern A, B", hint_vi: "Quy luật A, B" },
        { id: 5, type: "math", title_en: "Apples", title_vi: "Táo", question_en: "Mom buys 4 apples. I eat 1. How many are left?", question_vi: "Mẹ mua 4 táo. Tôi ăn 1. Còn lại bao nhiêu?", answer: ["3 apples", "three apples"], target_number: 3, unit: "apples", hint_en: "4 - 1", hint_vi: "4 - 1" }
      ]
    },
    dictation: {
      sentences: [
        { id: 1, text: "This is my family.", meaning: "Đây là gia đình tôi." },
        { id: 2, text: "My father is cooking.", meaning: "Bố tôi đang nấu ăn." },
        { id: 3, text: "We are a team.", meaning: "Chúng tôi là một đội." },
        { id: 4, text: "I help my mother.", meaning: "Tôi giúp mẹ tôi." },
        { id: 5, text: "She is reading a book.", meaning: "Bà ấy đang đọc sách." }
      ]
    },
    shadowing: {
      title: "My Wonderful Family",
      script: [
        { id: 1, text: "Hello, this is my family.", vi: "Xin chào, đây là gia đình tôi." },
        { id: 2, text: "We love and help each other.", vi: "Chúng tôi yêu thương và giúp đỡ nhau." },
        { id: 3, text: "My father works hard.", vi: "Bố tôi làm việc chăm chỉ." },
        { id: 4, text: "My mother is very kind.", vi: "Mẹ tôi rất tốt bụng." },
        { id: 5, text: "I am happy to be here.", vi: "Tôi rất vui khi ở đây." }
      ]
    },
    writing: {
      title: "Video Challenge: Introduce Your Family",
      prompt_en: "Show a photo of your family (or draw one). Say who they are. (Ex: This is my father. He is working.)",
      prompt_vi: "Khoe ảnh gia đình bạn (hoặc tranh vẽ). Giới thiệu họ.",
      min_words: 15, keywords: ["this is", "father", "mother", "is"]
    },
    word_power: {
      words: [
        { id: 1, word: "role", pronunciation: "/rəʊl/", definition_en: "A job or duty in a group.", definition_vi: "Vai trò", example: "My role is to study.", model_sentence: "I have a role.", collocation: "important role", cefr_level: "A2", image_url: "/images/week2/role.jpg" },
        { id: 2, word: "support", pronunciation: "/səˈpɔːt/", definition_en: "To help and encourage.", definition_vi: "Hỗ trợ/Ủng hộ", example: "Family members support each other.", model_sentence: "We support you.", collocation: "support family", cefr_level: "B1", image_url: "/images/week2/support.jpg" },
        { id: 3, word: "bond", pronunciation: "/bɒnd/", definition_en: "A strong connection between people.", definition_vi: "Sự gắn kết", example: "We have a strong bond.", model_sentence: "A special bond.", collocation: "family bond", cefr_level: "B1", image_url: "/images/week2/bond.jpg" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Topic: Family Song For Children | 7 Family Member Names |  Learn English Kids (Dream English Kids)", videoId: "FXqPs1IvtNs", duration: "3:00", sim_duration: 180 },
        { id: 2, title: "Grammar: What are they doing? Present continuous tense. (Rock Rabbit English)", videoId: "ruVVuQTDJDg", duration: "4:00", sim_duration: 240 },
        { id: 3, title: "Math: Family (family members & tree) - Kids vocabulary - Learn English educationa (English Singsing)", videoId: "FHaObkHEkHQ", duration: "3:30", sim_duration: 210 },
        { id: 4, title: "Science: Life Cycle Of A Frog! - The Dr. Binocs Show | Best Learning Videos For Kids (Peekaboo Kidz)", videoId: "F3ElGMVU6SY", duration: "3:00", sim_duration: 180 },
        { id: 5, title: "Bonus: Family | Talking Flashcards (Maple Leaf Learning)", videoId: "upGVvQSr6II", duration: "2:00", sim_duration: 120 }
      ],
      bonus_games: [
        { id: 1, title: "Family Tree Game", url: "https://www.gamestolearnenglish.com/family-vocabulary/", description: "Build the family tree." },
        { id: 2, title: "Memory Match", url: "https://www.gamestolearnenglish.com/concentration/", description: "Match family words." },
        { id: 3, title: "Spelling Bee", url: "https://www.gamestolearnenglish.com/spelling-bee/", description: "Spell family words." }
      ]
    }
  }
};
export default weekData;
