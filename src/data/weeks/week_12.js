const weekData = {
  weekId: 12,
  weekTitle_en: "Personal Abilities",
  weekTitle_vi: "Kỹ năng Cá nhân",
  grammar_focus: "Modals (Can / Cannot)",
  global_vocab: [],
  stations: {
    // 1. READ & EXPLORE (Chuẩn: Câu ghép, 6-8 câu)
    read_explore: {
      title: "What I Can Do",
      image_url: "/images/week12/read_cover_w12.jpg",
      content_en: "I know my **abilities** because I practice every day. I **can** run **fast**, **but** I **cannot** fly like a bird. My teacher **can** speak English very well **because** she is smart. We **can** all learn new **skills** if we try hard, **so** we **should** be confident. I am good at **drawing**, **and** I **can** also solve math problems.",
      content_vi: "Tôi biết khả năng của mình vì tôi luyện tập mỗi ngày. Tôi có thể chạy nhanh, nhưng tôi không thể bay như chim. Giáo viên của tôi có thể nói tiếng Anh rất tốt vì cô ấy thông minh. Tất cả chúng ta đều có thể học được kỹ năng mới nếu cố gắng, nên chúng ta nên tự tin. Tôi giỏi vẽ, và tôi cũng có thể giải các bài toán.",
      audio_url: "/audio/week12/read_explore_main.mp3",
      comprehension_questions: [
        { id: 1, question_en: "Why can the teacher speak English well?", answer: ["Because she is smart.", "Because she studies."], hint_en: "Because she...", hint_vi: "Vì cô ấy..." },
        { id: 2, question_en: "What is the writer good at?", answer: ["Drawing and solving math problems."], hint_en: "Good at...", hint_vi: "Giỏi..." },
        { id: 3, question_en: "Can the writer fly?", answer: ["No, he cannot fly like a bird."], hint_en: "Cannot...", hint_vi: "Không thể..." }
      ]
    },
    // 2. NEW WORDS (Chuẩn: Collocation, Definition)
    new_words: {
      vocab: [
        { id: 1, word: "ability", image_url: "/images/week12/ability.jpg", definition_en: "The skill or power to do something.", definition_vi: "Khả năng", pronunciation: "/əˈbɪlɪti/", example: "He has a great ability to learn.", collocation: "natural ability", audio_word: "/audio/week12/vocab_ability.mp3", audio_def: "/audio/week12/vocab_def_ability.mp3", audio_coll: "/audio/week12/vocab_coll_ability.mp3" },
        { id: 2, word: "confident", image_url: "/images/week12/confident.jpg", definition_en: "Feeling sure of oneself.", definition_vi: "Tự tin", pronunciation: "/ˈkɒnfɪd(ə)nt/", example: "She is confident about the test.", collocation: "feel confident", audio_word: "/audio/week12/vocab_confident.mp3", audio_def: "/audio/week12/vocab_def_confident.mp3", audio_coll: "/audio/week12/vocab_coll_confident.mp3" },
        { id: 3, word: "solve", image_url: "/images/week12/solve.jpg", definition_en: "To find an answer to a problem.", definition_vi: "Giải quyết", pronunciation: "/sɒlv/", example: "I can solve the puzzle.", collocation: "solve problem", audio_word: "/audio/week12/vocab_solve.mp3", audio_def: "/audio/week12/vocab_def_solve.mp3", audio_coll: "/audio/week12/vocab_coll_solve.mp3" },
        { id: 4, word: "fluent", image_url: "/images/week12/fluent.jpg", definition_en: "Able to speak a language easily and well.", definition_vi: "Lưu loát", pronunciation: "/ˈfluːənt/", example: "He is fluent in English.", collocation: "fluent speaker", audio_word: "/audio/week12/vocab_fluent.mp3", audio_def: "/audio/week12/vocab_def_fluent.mp3", audio_coll: "/audio/week12/vocab_coll_fluent.mp3" },
        { id: 5, word: "talent", image_url: "/images/week12/talent.jpg", definition_en: "Natural aptitude or skill.", definition_vi: "Tài năng", pronunciation: "/ˈtal(ə)nt/", example: "She has a talent for singing.", collocation: "natural talent", audio_word: "/audio/week12/vocab_talent.mp3", audio_def: "/audio/week12/vocab_def_talent.mp3", audio_coll: "/audio/week12/vocab_coll_talent.mp3" },
        { id: 6, word: "practice", image_url: "/images/week12/practice.jpg", definition_en: "To do something repeatedly to improve.", definition_vi: "Luyện tập", pronunciation: "/ˈpraktɪs/", example: "Practice makes perfect.", collocation: "daily practice", audio_word: "/audio/week12/vocab_practice.mp3", audio_def: "/audio/week12/vocab_def_practice.mp3", audio_coll: "/audio/week12/vocab_coll_practice.mp3" },
        { id: 7, word: "improve", image_url: "/images/week12/improve.jpg", definition_en: "To get better.", definition_vi: "Cải thiện", pronunciation: "/ɪmˈpruːv/", example: "I improve my drawing.", collocation: "improve skills", audio_word: "/audio/week12/vocab_improve.mp3", audio_def: "/audio/week12/vocab_def_improve.mp3", audio_coll: "/audio/week12/vocab_coll_improve.mp3" },
        { id: 8, word: "difficult", image_url: "/images/week12/difficult.jpg", definition_en: "Hard to do.", definition_vi: "Khó khăn", pronunciation: "/ˈdɪfɪk(ə)lt/", example: "Math is difficult.", collocation: "difficult task", audio_word: "/audio/week12/vocab_difficult.mp3", audio_def: "/audio/week12/vocab_def_difficult.mp3", audio_coll: "/audio/week12/vocab_coll_difficult.mp3" },
        { id: 9, word: "easy", image_url: "/images/week12/easy.jpg", definition_en: "Not difficult.", definition_vi: "Dễ dàng", pronunciation: "/ˈiːzi/", example: "It is an easy test.", collocation: "easy task", audio_word: "/audio/week12/vocab_easy.mp3", audio_def: "/audio/week12/vocab_def_easy.mp3", audio_coll: "/audio/week12/vocab_coll_easy.mp3" },
        { id: 10, word: "try", image_url: "/images/week12/try.jpg", definition_en: "To attempt to do something.", definition_vi: "Cố gắng/Thử", pronunciation: "/trʌɪ/", example: "I will try my best.", collocation: "try hard", audio_word: "/audio/week12/vocab_try.mp3", audio_def: "/audio/week12/vocab_def_try.mp3", audio_coll: "/audio/week12/vocab_coll_try.mp3" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // 3. GRAMMAR (Chuẩn: 20 câu, Strict Check)
    grammar: {
      grammar_explanation: {
        title_en: "Modals (Can / Cannot)",
        title_vi: "Động từ Khuyết thiếu (Có thể / Không thể)",
        rules: [
          { type: "rule", icon: " ✅ ", rule_en: "Subject + **can** + Base Verb", rule_vi: "Chủ ngữ + **có thể** + Động từ gốc", example: "I **can** run." },
          { type: "rule", icon: " ❌ ", rule_en: "Subject + **cannot** / **can't** + Base Verb", rule_vi: "Chủ ngữ + **không thể** + Động từ gốc", example: "I **can't** fly." },
          { type: "rule", icon: " ❓ ", rule_en: "**Can** + Subject + Base Verb?", rule_vi: "**Có thể** + Chủ ngữ + Động từ gốc?", example: "**Can** you swim?" }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "I _____ (can/cannot) speak English.", answer: "can", hint: "Ability -> can" },
        { id: 2, type: "mc", question: "She _____ play the piano.", options: ["can't", "can"], answer: "can't", hint: "Negative -> can't" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["solve", "I", "can", "problems"], answer: "I can solve problems.", hint: "I can..." },
        { id: 4, type: "fill", question: "A bird _____ (can/can't) fly.", answer: "can", hint: "Ability -> can" },
        { id: 5, type: "mc", question: "They _____ run fast, so they practice.", options: ["cannot", "can"], answer: "cannot", hint: "So they practice -> cannot run fast" },
        { id: 6, type: "fill", question: "My mom _____ (can/can't) cook well.", answer: "can", hint: "Ability -> can" },
        { id: 7, type: "unscramble", question: "Sort:", words: ["swim", "Can", "you", "?"], answer: "Can you swim?", hint: "Can you..." },
        { id: 8, type: "fill", question: "We _____ (can/cannot) see in the dark.", answer: "cannot", hint: "Inability -> cannot" },
        { id: 9, type: "mc", question: "The cat _____ talk.", options: ["can't", "can"], answer: "can't", hint: "Inability -> can't" },
        { id: 10, type: "fill", question: "Make sentence: 'We / can / try / hard'", answer: ["We can try hard.", "we can try hard."], customCheck: true, hint: "We can..." },
        { id: 11, type: "unscramble", question: "Sort:", words: ["cannot", "The", "dog", "read"], answer: "The dog cannot read.", hint: "The dog..." },
        { id: 12, type: "mc", question: "_____ she help me?", options: ["Can", "Cannot"], answer: "Can", hint: "Question -> Can" },
        { id: 13, type: "fill", question: "I _____ (can/cannot) climb this tall tree.", answer: "cannot", hint: "Inability -> cannot" },
        { id: 14, type: "fill", question: "They _____ (can't/can) write well because they practice.", answer: "can", hint: "Practice -> ability" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["speak", "Can", "fluent", "you", "English", "?"], answer: "Can you speak fluent English?", hint: "Can you..." },
        { id: 16, type: "mc", question: "He _____ solve difficult math problems.", options: ["can", "cannot"], answer: "can", hint: "Ability -> can" },
        { id: 17, type: "fill", question: "Make sentence: 'I / can't / ride / bike'", answer: ["I can't ride a bike.", "i can't ride a bike."], customCheck: true, hint: "I can't..." },
        { id: 18, type: "fill", question: "The puzzle is easy, so I _____ (can/can't) solve it.", answer: "can", hint: "Easy -> can" },
        { id: 19, type: "unscramble", question: "Sort:", words: ["is", "ability", "Learning", "a"], answer: "Learning is an ability.", hint: "Learning is..." },
        { id: 20, type: "fill", question: "Make sentence: 'Can / they / draw / well / ?'", answer: ["Can they draw well?", "can they draw well?"], customCheck: true, hint: "Can they..." }
      ]
    },
    // 4. ASK AI (Chuẩn: Context Prompt)
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn thấy một người đang vẽ đẹp. Hỏi xem họ có tài năng vẽ không.", context_en: "You see someone drawing well. Ask if they have a talent for drawing.", answer: ["Do you have a talent for drawing?", "Can you draw well?"], hint: "Do you have..." },
        { id: 2, context_vi: "Bạn muốn biết liệu mình có thể giải bài toán khó này không.", context_en: "You want to know if you can solve this difficult problem.", answer: ["Can I solve this problem?", "Can I do this difficult task?"], hint: "Can I..." },
        { id: 3, context_vi: "Bạn hỏi cô giáo xem làm thế nào để nói tiếng Anh lưu loát hơn.", context_en: "Ask your teacher how you can become more fluent in English.", answer: ["How can I be more fluent?", "What should I do to speak well?"], hint: "How can I..." },
        { id: 4, context_vi: "Bạn muốn biết bạn mình có thể bơi bao xa.", context_en: "Ask your friend how far they can swim.", answer: ["How far can you swim?", "Can you swim far?"], hint: "How far..." },
        { id: 5, context_vi: "Hỏi bố xem bạn có thể học kỹ năng mới nhanh không.", context_en: "Ask dad if you can learn new skills quickly.", answer: ["Can I learn new skills quickly?", "Dad, can I learn fast?"], hint: "Can I learn..." }
      ]
    },
    // 5. LOGIC LAB (Chuẩn: Word Problems, Options)
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Skill Practice Time", question_en: "You practice a skill for 20 minutes. You want to improve, so you practice 10 minutes more. How long do you practice now?", answer: ["30 minutes", "30"], target_number: 30, unit: "minutes", audio_url: "/audio/week12/logic_1.mp3" },
        { id: 2, type: "logic", title_en: "Ability Check", question_en: "Which action requires practice: (Walk or Speak English)?", options: ["Speak English", "Walk"], answer: "Speak English", audio_url: "/audio/week12/logic_2.mp3" },
        { id: 3, type: "math", title_en: "Problem Solving", question_en: "I can solve 5 problems per hour. How many problems can I solve in 4 hours?", answer: ["20 problems", "20"], target_number: 20, unit: "problems", audio_url: "/audio/week12/logic_3.mp3" },
        { id: 4, type: "pattern", title_en: "Learning Pattern", question_en: "Easy, Difficult, Easy, Difficult... What is next?", options: ["Easy", "Difficult"], answer: "Easy", audio_url: "/audio/week12/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "Confidence", question_en: "If you know you can do it, are you confident?", options: ["Yes", "No"], answer: "Yes", hint_en: "Confident means sure of yourself", audio_url: "/audio/week12/logic_5.mp3" }
      ]
    },
    // 6. DICTATION
    dictation: {
      sentences: [
        { id: 1, text: "I can run fast but I cannot fly.", meaning: "Tôi có thể chạy nhanh nhưng không thể bay.", audio_url: "/audio/week12/dictation_1.mp3" },
        { id: 2, text: "My teacher can speak English very well.", meaning: "Giáo viên tôi có thể nói tiếng Anh rất tốt.", audio_url: "/audio/week12/dictation_2.mp3" },
        { id: 3, text: "We can all learn new skills if we try hard.", meaning: "Tất cả chúng ta đều có thể học kỹ năng mới nếu cố gắng.", audio_url: "/audio/week12/dictation_3.mp3" },
        { id: 4, text: "I am good at drawing, and I can also solve math problems.", meaning: "Tôi giỏi vẽ và cũng có thể giải toán.", audio_url: "/audio/week12/dictation_4.mp3" },
        { id: 5, text: "We should be confident to improve our abilities.", meaning: "Chúng ta nên tự tin để cải thiện khả năng của mình.", audio_url: "/audio/week12/dictation_5.mp3" }
      ]
    },
    // 7. SHADOWING (Khớp với Read & Explore)
    shadowing: {
      title: "Bonus: Action Verbs Vocabulary (Easy English)'Can\' and \'May\' | English Grammar \u0026 Composition Grade 3 | Periwinkle (Periwinkle)",
      script: [
        { id: 1, text: "I know my abilities because I practice every day.", vi: "Tôi biết khả năng của mình vì tôi luyện tập mỗi ngày.", audio_url: "/audio/week12/shadowing_1.mp3" },
        { id: 2, text: "I can run fast, but I cannot fly like a bird.", vi: "Tôi có thể chạy nhanh, nhưng không thể bay như chim.", audio_url: "/audio/week12/shadowing_2.mp3" },
        { id: 3, text: "My teacher can speak English very well because she is smart.", vi: "Giáo viên của tôi có thể nói tiếng Anh rất tốt vì cô ấy thông minh.", audio_url: "/audio/week12/shadowing_3.mp3" },
        { id: 4, text: "We can all learn new skills if we try hard.", vi: "Tất cả chúng ta đều có thể học được kỹ năng mới nếu cố gắng.", audio_url: "/audio/week12/shadowing_4.mp3" },
        { id: 5, text: "I am good at drawing, and I can also solve math problems.", vi: "Tôi giỏi vẽ, và tôi cũng có thể giải các bài toán.", audio_url: "/audio/week12/shadowing_5.mp3" }
      ]
    },
    // 8. EXPLORE (CLIL - Growth Mindset)
    explore: {
      title_en: "Growth Mindset",
      title_vi: "Tư duy Phát triển",
      image_url: "/images/week12/explore_cover_w12.jpg",
      content_en: "A **fixed mindset** says: 'I **can't** do it.' A **growth mindset** says: 'I **can** do it, **if** I **practice**.' Learning new skills is **difficult** at first, **but** it becomes **easy** later. We should always **try** to **improve** our **abilities**.",
      content_vi: "Tư duy cố định nói: 'Tôi không thể làm được.' Tư duy phát triển nói: 'Tôi có thể làm được, nếu tôi luyện tập.' Học kỹ năng mới lúc đầu rất khó, nhưng sau đó sẽ trở nên dễ dàng. Chúng ta nên luôn cố gắng cải thiện khả năng của mình.",
      audio_url: "/audio/week12/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "What does a fixed mindset say?", answer: ["I can't do it."], hint_en: "I can't..." },
        { id: 2, question_en: "What does a growth mindset require?", answer: ["Practice."], hint_en: "Practice." },
        { id: 3, question_en: "What happens when you practice?", answer: ["The skill becomes easy.", "It becomes easy."], hint_en: "It becomes easy." }
      ],
      question: { text_en: "Do you have a growth mindset? Give an example.", text_vi: "Bạn có tư duy phát triển không? Cho một ví dụ.", min_words: 15, model_answer: "Yes, I have a growth mindset because I keep trying even when math is difficult." }
    },
    word_power: {
      words: [
        { id: 1, word: "mindset", definition_en: "A person's way of thinking.", definition_vi: "Tư duy", example: "Have a positive mindset.", cefr_level: "B1", collocation: "growth mindset", image_url: "/images/week12/mindset.jpg", audio_word: "/audio/week12/power_word_mindset.mp3", audio_def: "/audio/week12/power_def_mindset.mp3", audio_coll: "/audio/week12/power_coll_mindset.mp3" },
        { id: 2, word: "potential", definition_en: "Qualities that can be developed.", definition_vi: "Tiềm năng", example: "You have great potential.", cefr_level: "B1", collocation: "full potential", image_url: "/images/week12/potential.jpg", audio_word: "/audio/week12/power_word_potential.mp3", audio_def: "/audio/week12/power_def_potential.mp3", audio_coll: "/audio/week12/power_coll_potential.mp3" },
        { id: 3, word: "limitation", definition_en: "A limiting rule or condition.", definition_vi: "Giới hạn", example: "I have a physical limitation.", cefr_level: "B2", collocation: "know your limitations", image_url: "/images/week12/limitation.jpg", audio_word: "/audio/week12/power_word_limitation.mp3", audio_def: "/audio/week12/power_def_limitation.mp3", audio_coll: "/audio/week12/power_coll_limitation.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Action Verbs (v1)- Kids vocabulary -Action Words - Learn English for k...", videoId: "4c6FyuetSVo", duration: "4:23", sim_duration: 263 },
        { id: 2, title: "The Growth Mindset Song | Today is a New Day! | Scratch Garden...", videoId: "W3c0w_IbGfE", duration: "3:06", sim_duration: 186 },
        { id: 3, title: "Numberblocks Special - ABOUT TIME ⏰ | 123 - Learn to count for Kids...", videoId: "QEMeFHkpYDw", duration: "10:05", sim_duration: 605 },
        { id: 4, title: "Fun Action-Verbs Song for Kids: What Can You Do?...", videoId: "7MKmbyfhkkE", duration: "2:34", sim_duration: 154 },
        { id: 5, title: "The Social &amp; Emotional Learning Song | Scratch Garden...", videoId: "4yaGLes18Ls", duration: "3:02", sim_duration: 182 }
      ],
      bonus_games: [{ id: 1, title: "Math: Telling time and schedules (Numberblocks)", url: "https://www.gamestolearnenglish.com/can-cant-game/", description: "Match the ability." }]
    },
    writing: {
      title: "Video Challenge: My Abilities",
      prompt_en: "Say 3 things you can do and 1 thing you can't do. Explain why practice is important.",
      prompt_vi: "Nói 3 điều bạn có thể làm và 1 điều không thể làm. Giải thích tại sao luyện tập quan trọng.",
      min_words: 30,
      keywords: ["can", "cannot", "practice", "important"]
    }
  }
};
export default weekData;
