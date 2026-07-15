const weekData = {
  weekId: 14,
  weekTitle_en: "Project: My Wonderful World",
  weekTitle_vi: "Dự án: Thế giới Diệu kỳ của tôi",
  grammar_focus: "Review (Structure of a Presentation)",
  global_vocab: [],
  stations: {
    // 1. READ & EXPLORE
    read_explore: {
      title: "My World Presentation Script",
      image_url: "/images/week14/read_cover_w14.jpg",
      content_en: "Hello, my name is Alex and this is my presentation about **My Wonderful World**. First, I live with my **supportive** family, **who** always help me with my homework. Next, this is my **study space**, **where** I keep my books **organized** on the shelf. Finally, I love my **community** because it is **safe** and the neighbors are friendly. Thank you for listening to my **story**.",
      content_vi: "Xin chào, tên tôi là Alex và đây là bài thuyết trình về Thế giới Diệu kỳ của tôi. Đầu tiên, tôi sống với gia đình luôn ủng hộ mình, những người luôn giúp tôi làm bài tập. Tiếp theo, đây là góc học tập của tôi, nơi tôi giữ sách vở được sắp xếp ngăn nắp trên kệ. Cuối cùng, tôi yêu cộng đồng của mình vì nó an toàn và hàng xóm rất thân thiện. Cảm ơn bạn đã lắng nghe câu chuyện của tôi.",
      audio_url: "/audio/week14/read_explore_main.mp3",
      comprehension_questions: [
        { id: 1, question_en: "Who helps Alex with homework?", answer: ["His supportive family.", "His family."], hint_en: "I live with my...", hint_vi: "Tôi sống với..." },
        { id: 2, question_en: "How does he keep his books?", answer: ["Organized on the shelf."], hint_en: "I keep my books...", hint_vi: "Tôi giữ sách..." },
        { id: 3, question_en: "Why does he love his community?", answer: ["Because it is safe.", "Because neighbors are friendly."], hint_en: "Because it is...", hint_vi: "Vì nó..." }
      ]
    },
    // 2. NEW WORDS
    new_words: {
      vocab: [
        { id: 1, word: "presentation", image_url: "/images/week14/presentation.jpg", definition_en: "A talk giving information about something.", definition_vi: "Bài thuyết trình", pronunciation: "/ˌprɛzənˈteɪʃən/", example: "My presentation is about animals.", collocation: "give a presentation", audio_word: "/audio/week14/vocab_presentation.mp3", audio_def: "/audio/week14/vocab_def_presentation.mp3", audio_coll: "/audio/week14/vocab_coll_presentation.mp3" },
        { id: 2, word: "introduce", image_url: "/images/week14/introduce.jpg", definition_en: "To tell people who you are.", definition_vi: "Giới thiệu", pronunciation: "/ɪntrəˈdjuːs/", example: "Let me introduce myself.", collocation: "introduce yourself", audio_word: "/audio/week14/vocab_introduce.mp3", audio_def: "/audio/week14/vocab_def_introduce.mp3", audio_coll: "/audio/week14/vocab_coll_introduce.mp3" },
        { id: 3, word: "supportive", image_url: "/images/week14/supportive.jpg", definition_en: "Giving help and encouragement.", definition_vi: "Ủng hộ/Hỗ trợ", pronunciation: "/səˈpɔːtɪv/", example: "My parents are very supportive.", collocation: "supportive family", audio_word: "/audio/week14/vocab_supportive.mp3", audio_def: "/audio/week14/vocab_def_supportive.mp3", audio_coll: "/audio/week14/vocab_coll_supportive.mp3" },
        { id: 4, word: "organized", image_url: "/images/week14/organized.jpg", definition_en: "Arranged in a tidy way.", definition_vi: "Ngăn nắp/Có tổ chức", pronunciation: "/ˈɔːɡənʌɪzd/", example: "Keep your desk organized.", collocation: "well organized", audio_word: "/audio/week14/vocab_organized.mp3", audio_def: "/audio/week14/vocab_def_organized.mp3", audio_coll: "/audio/week14/vocab_coll_organized.mp3" },
        { id: 5, word: "community", image_url: "/images/week14/community.jpg", definition_en: "The people living in one place.", definition_vi: "Cộng đồng", pronunciation: "/kəˈmjuːnɪti/", example: "We help our community.", collocation: "local community", audio_word: "/audio/week14/vocab_community.mp3", audio_def: "/audio/week14/vocab_def_community.mp3", audio_coll: "/audio/week14/vocab_coll_community.mp3" },
        { id: 6, word: "safe", image_url: "/images/week14/safe.jpg", definition_en: "Not in danger.", definition_vi: "An toàn", pronunciation: "/seɪf/", example: "This street is safe.", collocation: "safe place", audio_word: "/audio/week14/vocab_safe.mp3", audio_def: "/audio/week14/vocab_def_safe.mp3", audio_coll: "/audio/week14/vocab_coll_safe.mp3" },
        { id: 7, word: "audience", image_url: "/images/week14/audience.jpg", definition_en: "People who listen to you.", definition_vi: "Khán giả", pronunciation: "/ˈɔːdɪəns/", example: "Look at the audience.", collocation: "large audience", audio_word: "/audio/week14/vocab_audience.mp3", audio_def: "/audio/week14/vocab_def_audience.mp3", audio_coll: "/audio/week14/vocab_coll_audience.mp3" },
        { id: 8, word: "confident", image_url: "/images/week14/confident.jpg", definition_en: "Feeling sure about yourself.", definition_vi: "Tự tin", pronunciation: "/ˈkɒnfɪd(ə)nt/", example: "Speak with a confident voice.", collocation: "feel confident", audio_word: "/audio/week14/vocab_confident.mp3", audio_def: "/audio/week14/vocab_def_confident.mp3", audio_coll: "/audio/week14/vocab_coll_confident.mp3" },
        { id: 9, word: "finally", image_url: "/images/week14/finally.jpg", definition_en: "Used to introduce the last point.", definition_vi: "Cuối cùng", pronunciation: "/ˈfʌɪnəli/", example: "Finally, I want to say thanks.", collocation: "and finally", audio_word: "/audio/week14/vocab_finally.mp3", audio_def: "/audio/week14/vocab_def_finally.mp3", audio_coll: "/audio/week14/vocab_coll_finally.mp3" },
        { id: 10, word: "share", image_url: "/images/week14/share.jpg", definition_en: "To tell your ideas to others.", definition_vi: "Chia sẻ", pronunciation: "/ʃɛː/", example: "I like to share my stories.", collocation: "share ideas", audio_word: "/audio/week14/vocab_share.mp3", audio_def: "/audio/week14/vocab_def_share.mp3", audio_coll: "/audio/week14/vocab_coll_share.mp3" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // 3. GRAMMAR
    grammar: {
      grammar_explanation: {
        title_en: "Presentation Structure",
        title_vi: "Cấu trúc Bài thuyết trình",
        rules: [
          { type: "rule", icon: " 1️⃣ ", rule_en: "**First**, I want to talk about...", rule_vi: "**Đầu tiên**, tôi muốn nói về...", example: "**First**, this is my family." },
          { type: "rule", icon: " 2️⃣ ", rule_en: "**Next**, let me show you...", rule_vi: "**Tiếp theo**, để tôi chỉ bạn...", example: "**Next**, this is my room." },
          { type: "rule", icon: " 3️⃣ ", rule_en: "**Finally**, I love...", rule_vi: "**Cuối cùng**, tôi yêu...", example: "**Finally**, I love my school." }
        ]
      },
      exercises: [
        { id: 1, type: "unscramble", question: "Sort:", words: ["is", "presentation", "my", "This"], answer: "This is my presentation.", hint: "This is..." },
        { id: 2, type: "fill", question: "First, I _____ (live/lives) with my family.", answer: "live", hint: "I -> live" },
        { id: 3, type: "mc", question: "_____ name is Alex.", options: ["My", "I"], answer: "My", hint: "Possessive -> My" },
        { id: 4, type: "fill", question: "Next, I _____ (want/wants) to show my room.", answer: "want", hint: "I -> want" },
        { id: 5, type: "unscramble", question: "Sort:", words: ["supportive", "My", "is", "family"], answer: "My family is supportive.", hint: "My family..." },
        { id: 6, type: "fill", question: "I keep my books _____ (organized/messy).", answer: "organized", hint: "Good habit -> organized" },
        { id: 7, type: "mc", question: "This is my room _____ I study.", options: ["where", "who"], answer: "where", hint: "Place -> where" },
        { id: 8, type: "fill", question: "Make sentence: 'I / like / my / community'", answer: ["I like my community.", "i like my community."], customCheck: true, hint: "I like..." },
        { id: 9, type: "unscramble", question: "Sort:", words: ["love", "I", "city", "my"], answer: "I love my city.", hint: "I love..." },
        { id: 10, type: "fill", question: "Finally, thank you _____ (for/to) listening.", answer: "for", hint: "Thank you for..." },
        { id: 11, type: "mc", question: "He _____ friendly.", options: ["is", "has"], answer: "is", hint: "Description -> is" },
        { id: 12, type: "fill", question: "My room _____ (has/have) a big window.", answer: "has", hint: "Singular -> has" },
        { id: 13, type: "unscramble", question: "Sort:", words: ["parks", "are", "There", "many"], answer: "There are many parks.", hint: "There are..." },
        { id: 14, type: "fill", question: "Make sentence: 'It / is / very / safe'", answer: ["It is very safe.", "it is very safe."], customCheck: true, hint: "It is..." },
        { id: 15, type: "mc", question: "Can you _____ me?", options: ["hear", "hears"], answer: "hear", hint: "Can -> base verb" },
        { id: 16, type: "fill", question: "I am confident _____ (because/but) I practice.", answer: "because", hint: "Reason -> because" },
        { id: 17, type: "unscramble", question: "Sort:", words: ["share", "to", "want", "I"], answer: "I want to share.", hint: "I want..." },
        { id: 18, type: "fill", question: "Next, look _____ (at/on) my poster.", answer: "at", hint: "Look at..." },
        { id: 19, type: "mc", question: "She _____ funny.", options: ["is", "are"], answer: "is", hint: "She -> is" },
        { id: 20, type: "fill", question: "Make sentence: 'This / is / my / world'", answer: ["This is my world.", "this is my world."], customCheck: true, hint: "This is..." }
      ]
    },
    // 4. ASK AI (CONTEXT -> QUESTIONING SKILL)
    // Nguyên tắc: Câu hỏi phải liên quan đến tình huống của người thuyết trình.
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn muốn biết khán giả có nghe rõ không. Hãy hỏi họ.", context_en: "You want to know if the audience can hear you. Ask them.", answer: ["Can you hear me?", "Do you hear me clearly?"], hint: "Can you..." },
        { id: 2, context_vi: "Bạn muốn hỏi xem mọi người có nhìn thấy áp phích của bạn không.", context_en: "You want to know if everyone sees your poster. Ask them.", answer: ["Can you see my poster?", "Do you see my poster?"], hint: "Can you..." },
        { id: 3, context_vi: "Bạn quên từ 'cái kệ' trong tiếng Anh. Hãy hỏi giáo viên.", context_en: "You forgot the English word for 'cái kệ'. Ask the teacher.", answer: ["What is 'cái kệ' in English?", "How do I say 'cái kệ'?"], hint: "What is..." },
        { id: 4, context_vi: "Bạn đã nói xong. Bạn muốn hỏi xem ai có câu hỏi nào không.", context_en: "You finished speaking. Ask if anyone has questions.", answer: ["Do you have any questions?", "Any questions?"], hint: "Do you..." },
        { id: 5, context_vi: "Bạn đang lo lắng. Hãy hỏi bạn mình cách để tự tin hơn.", context_en: "You are nervous. Ask your friend how to be confident.", answer: ["How can I be confident?", "How do I feel confident?"], hint: "How can..." }
      ]
    },
    // 5. LOGIC LAB
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Time Management", question_en: "You have 5 minutes for the presentation. You used 2 minutes for the Intro. How many minutes are left?", answer: ["3 minutes", "3"], target_number: 3, unit: "minutes", audio_url: "/audio/week14/logic_1.mp3" },
        { id: 2, type: "sequence", title_en: "Structure Check", question_en: "Order the parts: (1. Body, 2. Intro, 3. Conclusion).", options: ["2-1-3", "1-2-3"], answer: "2-1-3", audio_url: "/audio/week14/logic_2.mp3" },
        { id: 3, type: "math", title_en: "Audience Count", question_en: "There are 4 students in the front row and 5 students in the back row. How many students in total?", answer: ["9 students", "9"], target_number: 9, unit: "students", audio_url: "/audio/week14/logic_3.mp3" },
        { id: 4, type: "logic", title_en: "Good Habit", question_en: "When presenting, where should you look: (Floor or Audience)?", options: ["Audience", "Floor"], answer: "Audience", audio_url: "/audio/week14/logic_4.mp3" },
        { id: 5, type: "pattern", title_en: "Pattern", question_en: "Speak, Listen, Speak, Listen... What is next?", options: ["Speak", "Listen"], answer: "Speak", audio_url: "/audio/week14/logic_5.mp3" }
      ]
    },
    // 6. DICTATION
    dictation: {
      sentences: [
        { id: 1, text: "Hello my name is Alex.", meaning: "Xin chào tên tôi là Alex.", audio_url: "/audio/week14/dictation_1.mp3" },
        { id: 2, text: "This is my wonderful world presentation.", meaning: "Đây là bài thuyết trình thế giới diệu kỳ của tôi.", audio_url: "/audio/week14/dictation_2.mp3" },
        { id: 3, text: "I live with my supportive family.", meaning: "Tôi sống với gia đình luôn ủng hộ tôi.", audio_url: "/audio/week14/dictation_3.mp3" },
        { id: 4, text: "I keep my books organized on the shelf.", meaning: "Tôi giữ sách vở ngăn nắp trên kệ.", audio_url: "/audio/week14/dictation_4.mp3" },
        { id: 5, text: "Thank you for listening to my story.", meaning: "Cảm ơn bạn đã lắng nghe câu chuyện của tôi.", audio_url: "/audio/week14/dictation_5.mp3" }
      ]
    },
    // 7. SHADOWING
    shadowing: {
      title: "My Wonderful World",
      script: [
        { id: 1, text: "Hello, my name is Alex and this is my presentation about My Wonderful World.", vi: "Xin chào, tên tôi là Alex và đây là bài thuyết trình về Thế giới Diệu kỳ của tôi.", audio_url: "/audio/week14/shadowing_1.mp3" },
        { id: 2, text: "First, I live with my supportive family, who always help me with my homework.", vi: "Đầu tiên, tôi sống với gia đình luôn ủng hộ mình, những người luôn giúp tôi làm bài tập.", audio_url: "/audio/week14/shadowing_2.mp3" },
        { id: 3, text: "Next, this is my study space, where I keep my books organized on the shelf.", vi: "Tiếp theo, đây là góc học tập của tôi, nơi tôi giữ sách vở được sắp xếp ngăn nắp trên kệ.", audio_url: "/audio/week14/shadowing_3.mp3" },
        { id: 4, text: "Finally, I love my community because it is safe and the neighbors are friendly.", vi: "Cuối cùng, tôi yêu cộng đồng của mình vì nó an toàn và hàng xóm rất thân thiện.", audio_url: "/audio/week14/shadowing_4.mp3" },
        { id: 5, text: "Thank you for listening to my story.", vi: "Cảm ơn bạn đã lắng nghe câu chuyện của tôi.", audio_url: "/audio/week14/shadowing_5.mp3" }
      ]
    },
    // 8. EXPLORE
    explore: {
      title_en: "How to Be a Good Speaker",
      title_vi: "Cách trở thành Người nói giỏi",
      image_url: "/images/week14/explore_cover_w14.jpg",
      content_en: "To give a good **presentation**, you need to **prepare** well. Make a plan with three parts: Introduction, Body, and Conclusion. Use **body language** like smiling and using your hands. Speak with a loud and clear **voice**. Don't forget to make **eye contact** with your friends. If you practice, you will be **confident**.",
      content_vi: "Để có một bài thuyết trình tốt, bạn cần chuẩn bị kỹ. Lập kế hoạch gồm ba phần: Mở bài, Thân bài và Kết luận. Sử dụng ngôn ngữ cơ thể như mỉm cười và dùng tay. Nói bằng giọng to và rõ ràng. Đừng quên giao tiếp bằng mắt với bạn bè. Nếu bạn luyện tập, bạn sẽ tự tin.",
      audio_url: "/audio/week14/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "How many parts should a plan have?", answer: ["Three parts."], hint_en: "Introduction, Body, and...", hint_vi: "Mở bài, Thân bài và..." },
        { id: 2, question_en: "What is an example of body language?", answer: ["Smiling.", "Using hands."], hint_en: "Smiling and...", hint_vi: "Cười và..." },
        { id: 3, question_en: "What happens if you practice?", answer: ["You will be confident."], hint_en: "You will be...", hint_vi: "Bạn sẽ..." }
      ],
      question: { text_en: "Why is eye contact important?", text_vi: "Tại sao giao tiếp bằng mắt lại quan trọng?", min_words: 10, model_answer: "Eye contact is important because it connects me with the audience." }
    },
    word_power: {
      words: [
        { id: 1, word: "introduction", definition_en: "The beginning part of a talk.", definition_vi: "Phần mở đầu", example: "Start with a good introduction.", cefr_level: "B1", collocation: "brief introduction", image_url: "/images/week14/introduction.jpg", audio_word: "/audio/week14/power_word_introduction.mp3", audio_def: "/audio/week14/power_def_introduction.mp3", audio_coll: "/audio/week14/power_coll_introduction.mp3" },
        { id: 2, word: "conclusion", definition_en: "The end or finish of an event.", definition_vi: "Phần kết luận", example: "The conclusion summarizes the main points.", cefr_level: "B1", collocation: "in conclusion", image_url: "/images/week14/conclusion.jpg", audio_word: "/audio/week14/power_word_conclusion.mp3", audio_def: "/audio/week14/power_def_conclusion.mp3", audio_coll: "/audio/week14/power_coll_conclusion.mp3" },
        { id: 3, word: "body language", definition_en: "Communicating using your body movements.", definition_vi: "Ngôn ngữ cơ thể", example: "Use positive body language.", cefr_level: "B2", collocation: "positive body language", image_url: "/images/week14/body_language.jpg", audio_word: "/audio/week14/power_word_body_language.mp3", audio_def: "/audio/week14/power_def_body_language.mp3", audio_coll: "/audio/week14/power_coll_body_language.mp3" }
      ]
    },
    daily_watch: {
      videos: [
        { id: 1, title: "Topic: Schooled by Kids: Presentation Skills, Part 2 (Green Ivy Schools)", query: "https://youtu.be/PX_DAFXQxpc", videoId: "PX_DAFXQxpc" },
        { id: 2, title: "Grammar: Unit 9:I Don't Like Pizza! (STEAM LAND Education)", query: "https://youtu.be/707a0pfOalU?list=PLRk1o4PvNSYpdV3_nCshaVh467FO2wpzq", videoId: "707a0pfOalU" },
        { id: 3, title: "Math: Vocabulary Mind Maps for Kid Learning (hocvui)", query: "https://youtu.be/Hc3DP5SmpG4", videoId: "Hc3DP5SmpG4" },
        { id: 4, title: "Science: My daily life || English #For kids #english #chat (Chat)", query: "https://youtu.be/5cA0f3a_ipU", videoId: "5cA0f3a_ipU" },
        { id: 5, title: "Bonus: Guess what room it is! (Armagan Citak)", query: "https://youtu.be/lx1e5xakqKM", videoId: "lx1e5xakqKM" }
      ],
      bonus_games: [{ id: 1, title: "Speaking Game", url: "https://www.gamestolearnenglish.com/speaking-game/", description: "Practice speaking." }]
    },
    // WRITING: Yêu cầu 5 câu trở lên
    writing: {
      title: "Video Challenge: My Wonderful World",
      prompt_en: "Record your presentation! Introduce yourself, talk about your family, your room, and your community. Remember to say 'First', 'Next', and 'Finally'. Please speak 5 sentences or more.",
      prompt_vi: "Quay video thuyết trình của bạn! Giới thiệu bản thân, nói về gia đình, phòng và cộng đồng của bạn. Nhớ dùng từ 'Đầu tiên', 'Tiếp theo', và 'Cuối cùng'. Hãy nói từ 5 câu trở lên.",
      min_words: 50,
      keywords: ["Hello", "First", "Next", "Finally", "Thank you"]
    }
  }
};
export default weekData;
