const weekData = {
  weekId: 13,
  weekTitle_en: "Review: Organizing Ideas",
  weekTitle_vi: "Ôn tập: Sắp xếp Ý tưởng",
  grammar_focus: "Categorization (Groups & Members)",
  global_vocab: [],
  stations: {
    // 1. READ & EXPLORE
    read_explore: {
      title: "How to Organize Ideas",
      image_url: "/images/week13/read_cover_w13.jpg",
      content_en: "A good **scholar** must keep ideas **organized**, **so** we use a **mind map**. The **main topic** is in the center, **and** the **details** are around it. For example, 'My World' is a big topic, **but** we can divide it into small groups like Family, Home, and Community. We **sort** words into these groups **because** it helps us remember better. This is a useful **skill** for learning.",
      content_vi: "Một học giả giỏi phải giữ các ý tưởng ngăn nắp, vì vậy chúng ta sử dụng sơ đồ tư duy. Chủ đề chính nằm ở giữa, và các chi tiết nằm xung quanh nó. Ví dụ, 'Thế giới của tôi' là một chủ đề lớn, nhưng chúng ta có thể chia nó thành các nhóm nhỏ như Gia đình, Nhà, và Cộng đồng. Chúng ta sắp xếp các từ vào các nhóm này bởi vì nó giúp chúng ta ghi nhớ tốt hơn. Đây là một kỹ năng hữu ích cho việc học.",
      audio_url: "/audio/week13/read_explore_main.mp3",
      comprehension_questions: [
        { id: 1, question_en: "What is in the center of a mind map?", answer: ["The main topic."], hint_en: "The... is in the center.", hint_vi: "Cái... nằm ở giữa." },
        { id: 2, question_en: "Why do we sort words?", answer: ["Because it helps us remember.", "To remember better."], hint_en: "Because it helps...", hint_vi: "Bởi vì nó giúp..." },
        { id: 3, question_en: "What are Family, Home, and Community?", answer: ["Small groups.", "Details."], hint_en: "We divide it into...", hint_vi: "Chúng ta chia nó thành..." }
      ]
    },
    // 2. NEW WORDS
    new_words: {
      vocab: [
        { id: 1, word: "organize", image_url: "/images/week13/organize.jpg", definition_en: "To put things in order.", definition_vi: "Sắp xếp/Tổ chức", pronunciation: "/ˈɔːɡənʌɪz/", example: "I organize my toys.", collocation: "organize ideas", audio_word: "/audio/week13/vocab_organize.mp3", audio_def: "/audio/week13/vocab_def_organize.mp3", audio_coll: "/audio/week13/vocab_coll_organize.mp3" },
        { id: 2, word: "category", image_url: "/images/week13/category.jpg", definition_en: "A group of things that are similar.", definition_vi: "Hạng mục/Nhóm", pronunciation: "/ˈkatɪɡ(ə)ri/", example: "Food is a category.", collocation: "main category", audio_word: "/audio/week13/vocab_category.mp3", audio_def: "/audio/week13/vocab_def_category.mp3", audio_coll: "/audio/week13/vocab_coll_category.mp3" },
        { id: 3, word: "detail", image_url: "/images/week13/detail.jpg", definition_en: "A small fact or piece of information.", definition_vi: "Chi tiết", pronunciation: "/ˈdiːteɪl/", example: "Add more details.", collocation: "small detail", audio_word: "/audio/week13/vocab_detail.mp3", audio_def: "/audio/week13/vocab_def_detail.mp3", audio_coll: "/audio/week13/vocab_coll_detail.mp3" },
        { id: 4, word: "sort", image_url: "/images/week13/sort.jpg", definition_en: "To arrange things into groups.", definition_vi: "Phân loại", pronunciation: "/sɔːt/", example: "Sort the blocks by color.", collocation: "sort out", audio_word: "/audio/week13/vocab_sort.mp3", audio_def: "/audio/week13/vocab_def_sort.mp3", audio_coll: "/audio/week13/vocab_coll_sort.mp3" },
        { id: 5, word: "main", image_url: "/images/week13/main.jpg", definition_en: "Most important or biggest.", definition_vi: "Chính/Chủ yếu", pronunciation: "/meɪn/", example: "This is the main idea.", collocation: "main idea", audio_word: "/audio/week13/vocab_main.mp3", audio_def: "/audio/week13/vocab_def_main.mp3", audio_coll: "/audio/week13/vocab_coll_main.mp3" },
        { id: 6, word: "connect", image_url: "/images/week13/connect.jpg", definition_en: "To join two things together.", definition_vi: "Kết nối", pronunciation: "/kəˈnɛkt/", example: "Lines connect the boxes.", collocation: "connect ideas", audio_word: "/audio/week13/vocab_connect.mp3", audio_def: "/audio/week13/vocab_def_connect.mp3", audio_coll: "/audio/week13/vocab_coll_connect.mp3" },
        { id: 7, word: "map", image_url: "/images/week13/map.jpg", definition_en: "A drawing that shows where things are.", definition_vi: "Bản đồ/Sơ đồ", pronunciation: "/map/", example: "Draw a mind map.", collocation: "mind map", audio_word: "/audio/week13/vocab_map.mp3", audio_def: "/audio/week13/vocab_def_map.mp3", audio_coll: "/audio/week13/vocab_coll_map.mp3" },
        { id: 8, word: "group", image_url: "/images/week13/group.jpg", definition_en: "A number of things together.", definition_vi: "Nhóm", pronunciation: "/ɡruːp/", example: "A group of students.", collocation: "small group", audio_word: "/audio/week13/vocab_group.mp3", audio_def: "/audio/week13/vocab_def_group.mp3", audio_coll: "/audio/week13/vocab_coll_group.mp3" },
        { id: 9, word: "select", image_url: "/images/week13/select.jpg", definition_en: "To choose carefully.", definition_vi: "Lựa chọn", pronunciation: "/sɪˈlɛkt/", example: "Select the best word.", collocation: "select carefully", audio_word: "/audio/week13/vocab_select.mp3", audio_def: "/audio/week13/vocab_def_select.mp3", audio_coll: "/audio/week13/vocab_coll_select.mp3" },
        { id: 10, word: "plan", image_url: "/images/week13/plan.jpg", definition_en: "An idea about how to do something.", definition_vi: "Kế hoạch/Dàn ý", pronunciation: "/plan/", example: "Make a plan first.", collocation: "make a plan", audio_word: "/audio/week13/vocab_plan.mp3", audio_def: "/audio/week13/vocab_def_plan.mp3", audio_coll: "/audio/week13/vocab_coll_plan.mp3" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // 3. GRAMMAR
    grammar: {
      grammar_explanation: {
        title_en: "Grouping Words",
        title_vi: "Phân nhóm Từ vựng",
        rules: [
          { type: "rule", icon: " 👤 ", rule_en: "Group: **People** (Mother, Teacher, Doctor)", rule_vi: "Nhóm: Người", example: "Who is this?" },
          { type: "rule", icon: " 🏠 ", rule_en: "Group: **Places** (Bedroom, School, Park)", rule_vi: "Nhóm: Nơi chốn", example: "Where is it?" },
          { type: "rule", icon: " ✏️ ", rule_en: "Group: **Things** (Pencil, Lamp, Poster)", rule_vi: "Nhóm: Đồ vật", example: "What is this?" }
        ]
      },
      exercises: [
        { id: 1, type: "mc", question: "Which word is a person?", options: ["Doctor", "Desk"], answer: "Doctor", hint: "Who works?" },
        { id: 2, type: "mc", question: "Which word is a place?", options: ["School", "Pencil"], answer: "School", hint: "Where do you go?" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["ideas", "I", "organize", "my"], answer: "I organize my ideas.", hint: "I..." },
        { id: 4, type: "fill", question: "A kitchen is a _____ (place/person).", answer: "place", hint: "Location -> place" },
        { id: 5, type: "fill", question: "My mother is a _____ (person/thing).", answer: "person", hint: "Human -> person" },
        { id: 6, type: "mc", question: "Select the Community Helper:", options: ["Firefighter", "Sofa"], answer: "Firefighter", hint: "Job" },
        { id: 7, type: "fill", question: "I keep my room _____ (tidy/tall).", answer: "tidy", hint: "Clean -> tidy" },
        { id: 8, type: "unscramble", question: "Sort:", words: ["is", "category", "A", "group", "a"], answer: "A category is a group.", hint: "Definition" },
        { id: 9, type: "fill", question: "Make sentence: 'I / have / a / plan'", answer: ["I have a plan.", "i have a plan."], customCheck: true, hint: "I have..." },
        { id: 10, type: "mc", question: "Which is living?", options: ["Tree", "Rock"], answer: "Tree", hint: "Grows -> Living" },
        { id: 11, type: "mc", question: "Which is non-living?", options: ["Lamp", "Cat"], answer: "Lamp", hint: "Object" },
        { id: 12, type: "fill", question: "First, I make a _____ (map/run).", answer: "map", hint: "Plan -> map" },
        { id: 13, type: "unscramble", question: "Sort:", words: ["main", "is", "topic", "This", "the"], answer: "This is the main topic.", hint: "This is..." },
        { id: 14, type: "fill", question: "We connect ideas _____ (and/so) we understand.", answer: "so", hint: "Result -> so" },
        { id: 15, type: "mc", question: "Urban means:", options: ["City", "Countryside"], answer: "City", hint: "Busy place" },
        { id: 16, type: "mc", question: "Rural means:", options: ["Countryside", "City"], answer: "Countryside", hint: "Quiet place" },
        { id: 17, type: "fill", question: "Make sentence: 'Sort / the / words'", answer: ["Sort the words.", "sort the words."], customCheck: true, hint: "Imperative" },
        { id: 18, type: "fill", question: "A ruler is a _____ (tool/toy).", answer: "tool", hint: "For measuring" },
        { id: 19, type: "unscramble", question: "Sort:", words: ["details", "Add", "more", "please"], answer: "Add more details please.", hint: "Add..." },
        { id: 20, type: "mc", question: "Opposite of noisy:", options: ["Quiet", "Busy"], answer: "Quiet", hint: "Silence" }
      ]
    },
    // 4. ASK AI (CONTEXT -> QUESTIONING SKILL)
    // Nguyên tắc: Review các cấu trúc hỏi đã học (Is it...? What is...? Where...?)
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn có một tấm hình con mèo. Bạn muốn biết nó có thuộc nhóm 'Gia đình' không.", context_en: "You have a picture of a cat. You want to know if it belongs to the 'Family' group.", answer: ["Is a cat in the Family group?", "Does a cat belong to Family?"], hint: "Is a cat..." },
        { id: 2, context_vi: "Bạn muốn biết ý chính của bài là gì. Hãy hỏi giáo viên.", context_en: "You want to know the main idea of the lesson.", answer: ["What is the main idea?", "Teacher, what is the main idea?"], hint: "What is..." },
        { id: 3, context_vi: "Bạn không biết nên viết tiêu đề ở đâu trên trang giấy.", context_en: "You don't know where to write the title on the paper.", answer: ["Where do I write the title?", "Where should I write the title?"], hint: "Where..." },
        { id: 4, context_vi: "Bạn đã làm xong dàn ý. Hãy hỏi giáo viên xem nó có tốt không.", context_en: "You finished your outline. Ask the teacher if it is good.", answer: ["Is my outline good?", "Do you like my outline?"], hint: "Is my..." },
        { id: 5, context_vi: "Bạn không hiểu từ 'category'. Hãy hỏi nghĩa của nó.", context_en: "You don't understand the word 'category'. Ask for the meaning.", answer: ["What does category mean?", "What is a category?"], hint: "What is..." }
      ]
    },
    // 5. LOGIC LAB
    logic_lab: {
      puzzles: [
        { id: 1, type: "logic", title_en: "Odd One Out", question_en: "Which one does NOT belong: (Apple, Banana, Cat, Orange)?", options: ["Cat", "Apple"], answer: "Cat", hint_en: "Cat is an animal.", audio_url: "/audio/week13/logic_1.mp3" },
        { id: 2, type: "logic", title_en: "Category Match", question_en: "School, Library, and Park are: (Places or People)?", options: ["Places", "People"], answer: "Places", audio_url: "/audio/week13/logic_2.mp3" },
        { id: 3, type: "math", title_en: "Grouping", question_en: "You have 10 words. You put 5 words in Group A. How many are left for Group B?", answer: ["5 words", "5"], target_number: 5, unit: "words", audio_url: "/audio/week13/logic_3.mp3" },
        { id: 4, type: "sequence", title_en: "Order", question_en: "1. Main Idea, 2. Details, 3. Conclusion. What comes first?", options: ["Main Idea", "Conclusion"], answer: "Main Idea", audio_url: "/audio/week13/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "True or False", question_en: "A mind map helps us organize ideas. (True/False)", options: ["True", "False"], answer: "True", audio_url: "/audio/week13/logic_5.mp3" }
      ]
    },
    // 6. DICTATION
    dictation: {
      sentences: [
        { id: 1, text: "I organize my ideas with a mind map.", meaning: "Tôi sắp xếp ý tưởng bằng sơ đồ tư duy.", audio_url: "/audio/week13/dictation_1.mp3" },
        { id: 2, text: "The main topic is in the center.", meaning: "Chủ đề chính nằm ở giữa.", audio_url: "/audio/week13/dictation_2.mp3" },
        { id: 3, text: "We sort words into categories.", meaning: "Chúng ta phân loại từ vào các nhóm.", audio_url: "/audio/week13/dictation_3.mp3" },
        { id: 4, text: "Details help us understand the story.", meaning: "Các chi tiết giúp chúng ta hiểu câu chuyện.", audio_url: "/audio/week13/dictation_4.mp3" },
        { id: 5, text: "Planning is a useful skill.", meaning: "Lập kế hoạch là một kỹ năng hữu ích.", audio_url: "/audio/week13/dictation_5.mp3" }
      ]
    },
    // 7. SHADOWING
    shadowing: {
      title: "Organizing Ideas",
      script: [
        { id: 1, text: "A good scholar must keep ideas organized, so we use a mind map.", vi: "Một học giả giỏi phải giữ các ý tưởng ngăn nắp, vì vậy chúng ta sử dụng sơ đồ tư duy.", audio_url: "/audio/week13/shadowing_1.mp3" },
        { id: 2, text: "The main topic is in the center, and the details are around it.", vi: "Chủ đề chính nằm ở giữa, và các chi tiết nằm xung quanh nó.", audio_url: "/audio/week13/shadowing_2.mp3" },
        { id: 3, text: "For example, My World is a big topic.", vi: "Ví dụ, Thế giới của tôi là một chủ đề lớn.", audio_url: "/audio/week13/shadowing_3.mp3" },
        { id: 4, text: "But we can divide it into small groups like Family, Home, and Community.", vi: "Nhưng chúng ta có thể chia nó thành các nhóm nhỏ như Gia đình, Nhà, và Cộng đồng.", audio_url: "/audio/week13/shadowing_4.mp3" },
        { id: 5, text: "We sort words into these groups because it helps us remember better.", vi: "Chúng ta sắp xếp các từ vào các nhóm này bởi vì nó giúp chúng ta ghi nhớ tốt hơn.", audio_url: "/audio/week13/shadowing_5.mp3" }
      ]
    },
    // 8. EXPLORE
    explore: {
      title_en: "What is Brainstorming?",
      title_vi: "Động não là gì?",
      image_url: "/images/week13/explore_cover_w13.jpg",
      content_en: "Brainstorming is when you think of many **ideas** quickly. Don't worry if the ideas are good or bad, just **write** them down. You can use a **list** or a **chart**. After brainstorming, you can **select** the best ideas and **organize** them. This helps you start a **project** easily.",
      content_vi: "Động não là khi bạn nghĩ ra nhiều ý tưởng một cách nhanh chóng. Đừng lo lắng ý tưởng tốt hay xấu, cứ viết chúng ra. Bạn có thể dùng danh sách hoặc biểu đồ. Sau khi động não, bạn có thể chọn các ý tưởng hay nhất và sắp xếp chúng. Điều này giúp bạn bắt đầu dự án dễ dàng.",
      audio_url: "/audio/week13/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "What should you do when brainstorming?", answer: ["Think of many ideas.", "Write ideas down."], hint_en: "Think of...", hint_vi: "Nghĩ về..." },
        { id: 2, question_en: "Should you worry if ideas are bad?", answer: ["No."], hint_en: "Don't...", hint_vi: "Đừng..." },
        { id: 3, question_en: "What do you do after brainstorming?", answer: ["Select best ideas.", "Organize them."], hint_en: "Select...", hint_vi: "Chọn..." }
      ],
      question: { text_en: "Why is organizing ideas helpful?", text_vi: "Tại sao sắp xếp ý tưởng lại hữu ích?", min_words: 10, model_answer: "Organizing is helpful because it makes the project easier to understand." }
    },
    word_power: {
      words: [
        { id: 1, word: "brainstorm", definition_en: "To produce an idea or way of solving a problem.", definition_vi: "Động não", example: "Let's brainstorm ideas.", cefr_level: "B1", collocation: "brainstorm ideas", image_url: "/images/week13/brainstorm.jpg", audio_word: "/audio/week13/power_word_brainstorm.mp3", audio_def: "/audio/week13/power_def_brainstorm.mp3", audio_coll: "/audio/week13/power_coll_brainstorm.mp3" },
        { id: 2, word: "structure", definition_en: "The way that parts of something are arranged.", definition_vi: "Cấu trúc", example: "The structure is strong.", cefr_level: "B1", collocation: "solid structure", image_url: "/images/week13/structure.jpg", audio_word: "/audio/week13/power_word_structure.mp3", audio_def: "/audio/week13/power_def_structure.mp3", audio_coll: "/audio/week13/power_coll_structure.mp3" },
        { id: 3, word: "outline", definition_en: "A description of the main facts.", definition_vi: "Dàn ý", example: "Write an outline first.", cefr_level: "B1", collocation: "brief outline", image_url: "/images/week13/outline.jpg", audio_word: "/audio/week13/power_word_outline.mp3", audio_def: "/audio/week13/power_def_outline.mp3", audio_coll: "/audio/week13/power_coll_outline.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Topic: Schooled by Kids: Presentation Skills, Part 1 (Green Ivy Schools)", query: "https://youtu.be/8IbheB2-ixM", videoId: "8IbheB2-ixM" },
        { id: 2, title: "Grammar: English Speech | All About Me (A*List! English Learning Videos for Kids)", query: "https://youtu.be/J7b0jxVB1TE", videoId: "J7b0jxVB1TE" },
        { id: 3, title: "Math: Unit 8: I Can Hop! (STEAM LAND Education)", query: "https://youtu.be/B4QK06xsoIM?list=PLRk1o4PvNSYpdV3_nCshaVh467FO2wpzq", videoId: "B4QK06xsoIM" },
        { id: 4, title: "Science: Unit 5: What Do You See? (STEAM LAND Education)", query: "https://youtu.be/iNmpE3B1Ghg?list=PLRk1o4PvNSYpdV3_nCshaVh467FO2wpzq", videoId: "iNmpE3B1Ghg" },
        { id: 5, title: "Bonus: Food and drinks - I LIKE/I DON'T LIKE - English vocabulary for kids (EngKids)", query: "https://youtu.be/unv3EbqRS6w", videoId: "unv3EbqRS6w" }
      ],
      bonus_games: [{ id: 1, title: "Category Game", url: "https://www.gamestolearnenglish.com/fast-vocab/", description: "Sort words fast!" }]
    },
    // WRITING: Yêu cầu 5 câu trở lên
    writing: {
      title: "Video Challenge: Make a Plan",
      prompt_en: "Look at your 12-week journey. Choose 3 favorite topics (Example: Family, Room, Community) and say one sentence about each. This is your outline. Please speak 5 sentences or more.",
      prompt_vi: "Nhìn lại hành trình 12 tuần. Chọn 3 chủ đề yêu thích (VD: Gia đình, Phòng, Cộng đồng) và nói một câu về mỗi chủ đề. Hãy nói từ 5 câu trở lên.",
      min_words: 30,
      keywords: ["First", "Topic", "Favorite", "Because", "Also", "Finally"]
    }
  }
};
export default weekData;
