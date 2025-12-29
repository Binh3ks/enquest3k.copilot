const weekData = {
  weekId: 11,
  weekTitle_en: "Community Roles",
  weekTitle_vi: "Vai trò trong Cộng đồng",
  grammar_focus: "Modals (Can / Must / Should)",
  global_vocab: [],
  stations: {
    // 1. READ & EXPLORE
    read_explore: {
      title: "When I Grow Up | Kids Songs | Super Simple Songs",
      image_url: "/images/week11/read_cover_w11.jpg",
      content_en: "A good **community** needs many helpers. The **police** **must** keep the streets safe, **and** the **firefighter** **can** put out fires. A **doctor** **can** help people who are sick **because** they have special **skills**. We **should** all be **responsible** citizens **to support** our town. Every person has an important **role**.",
      content_vi: "Một cộng đồng tốt cần nhiều người giúp đỡ. Cảnh sát phải giữ an toàn đường phố, và lính cứu hỏa có thể dập tắt đám cháy. Bác sĩ có thể giúp những người bị ốm vì họ có những kỹ năng đặc biệt. Tất cả chúng ta nên là công dân có trách nhiệm để hỗ trợ thị trấn của mình. Mỗi người đều có một vai trò quan trọng.",
      audio_url: "/audio/week11/read_explore_main.mp3",
      comprehension_questions: [
        { id: 1, question_en: "What must the police do?", answer: ["They must keep the streets safe.", "Keep the streets safe."], hint_en: "The police must...", hint_vi: "Cảnh sát phải..." },
        { id: 2, question_en: "Why can a doctor help sick people?", answer: ["Because they have special skills."], hint_en: "Because they have...", hint_vi: "Vì họ có..." },
        { id: 3, question_en: "What should we be?", answer: ["Responsible citizens.", "We should be responsible citizens."], hint_en: "We should be...", hint_vi: "Chúng ta nên là..." }
      ]
    },
    // 2. NEW WORDS
    new_words: {
      vocab: [
        { id: 1, word: "community", image_url: "/images/week11/community.jpg", definition_en: "A group of people living in one area.", definition_vi: "Cộng đồng", pronunciation: "/kəˈmjuːnɪti/", example: "We help our community.", collocation: "local community", audio_word: "/audio/week11/vocab_community.mp3", audio_def: "/audio/week11/vocab_def_community.mp3", audio_coll: "/audio/week11/vocab_coll_community.mp3" },
        { id: 2, word: "police", image_url: "/images/week11/police.jpg", definition_en: "People who enforce laws and order.", definition_vi: "Cảnh sát", pronunciation: "/pəˈliːs/", example: "Call the police.", collocation: "police officer", audio_word: "/audio/week11/vocab_police.mp3", audio_def: "/audio/week11/vocab_def_police.mp3", audio_coll: "/audio/week11/vocab_coll_police.mp3" },
        { id: 3, word: "firefighter", image_url: "/images/week11/firefighter.jpg", definition_en: "A person who puts out fires.", definition_vi: "Lính cứu hỏa", pronunciation: "/ˈfʌɪəfʌɪtə/", example: "The firefighter is brave.", collocation: "brave firefighter", audio_word: "/audio/week11/vocab_firefighter.mp3", audio_def: "/audio/week11/vocab_def_firefighter.mp3", audio_coll: "/audio/week11/vocab_coll_firefighter.mp3" },
        { id: 4, word: "doctor", image_url: "/images/week11/doctor.jpg", definition_en: "A person licensed to practice medicine.", definition_vi: "Bác sĩ", pronunciation: "/ˈdɒktə/", example: "The doctor helps me.", collocation: "good doctor", audio_word: "/audio/week11/vocab_doctor.mp3", audio_def: "/audio/week11/vocab_def_doctor.mp3", audio_coll: "/audio/week11/vocab_coll_doctor.mp3" },
        { id: 5, word: "role", image_url: "/images/week11/role.jpg", definition_en: "The function assumed by a person.", definition_vi: "Vai trò", pronunciation: "/rəʊl/", example: "What is your role?", collocation: "important role", audio_word: "/audio/week11/vocab_role.mp3", audio_def: "/audio/week11/vocab_def_role.mp3", audio_coll: "/audio/week11/vocab_coll_role.mp3" },
        { id: 6, word: "responsible", image_url: "/images/week11/responsible.jpg", definition_en: "Having an obligation.", definition_vi: "Có trách nhiệm", pronunciation: "/rɪˈspɒnsɪb(ə)l/", example: "Be responsible for your actions.", collocation: "be responsible", audio_word: "/audio/week11/vocab_responsible.mp3", audio_def: "/audio/week11/vocab_def_responsible.mp3", audio_coll: "/audio/week11/vocab_coll_responsible.mp3" },
        { id: 7, word: "safe", image_url: "/images/week11/safe.jpg", definition_en: "Protected from danger.", definition_vi: "An toàn", pronunciation: "/seɪf/", example: "Stay safe at home.", collocation: "stay safe", audio_word: "/audio/week11/vocab_safe.mp3", audio_def: "/audio/week11/vocab_def_safe.mp3", audio_coll: "/audio/week11/vocab_coll_safe.mp3" },
        { id: 8, word: "sick", image_url: "/images/week11/sick.jpg", definition_en: "Feeling unwell.", definition_vi: "Bị ốm", pronunciation: "/sɪk/", example: "I am feeling sick.", collocation: "feel sick", audio_word: "/audio/week11/vocab_sick.mp3", audio_def: "/audio/week11/vocab_def_sick.mp3", audio_coll: "/audio/week11/vocab_coll_sick.mp3" },
        { id: 9, word: "support", image_url: "/images/week11/support.jpg", definition_en: "To give encouragement.", definition_vi: "Ủng hộ/Hỗ trợ", pronunciation: "/səˈpɔːt/", example: "I support my friends.", collocation: "full support", audio_word: "/audio/week11/vocab_support.mp3", audio_def: "/audio/week11/vocab_def_support.mp3", audio_coll: "/audio/week11/vocab_coll_support.mp3" },
        { id: 10, word: "skill", image_url: "/images/week11/skill.jpg", definition_en: "The ability to do something well.", definition_vi: "Kỹ năng", pronunciation: "/skɪl/", example: "Learning is a useful skill.", collocation: "useful skill", audio_word: "/audio/week11/vocab_skill.mp3", audio_def: "/audio/week11/vocab_def_skill.mp3", audio_coll: "/audio/week11/vocab_coll_skill.mp3" }
      ]
    },
    word_match: { pairs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    // 3. GRAMMAR (20 Câu, Modals)
    grammar: {
      grammar_explanation: {
        title_en: "Modals (Can / Must / Should)",
        title_vi: "Động từ Khuyết thiếu (Khả năng / Bắt buộc / Nên)",
        rules: [
          { type: "rule", icon: "💪", rule_en: "**Can** (Ability)", rule_vi: "**Có thể** (Khả năng)", example: "A firefighter **can** put out fires." },
          { type: "rule", icon: "🚨", rule_en: "**Must** (Strong Obligation)", rule_vi: "**Phải** (Bắt buộc mạnh)", example: "The police **must** stop criminals." },
          { type: "rule", icon: "🤝", rule_en: "**Should** (Advice/Recommendation)", rule_vi: "**Nên** (Lời khuyên)", example: "You **should** be responsible." }
        ]
      },
      exercises: [
        { id: 1, type: "fill", question: "A doctor _____ (can/must) help sick people.", answer: "can", hint: "Ability -> can" },
        { id: 2, type: "mc", question: "We _____ be quiet in the library.", options: ["can", "must"], answer: "must", hint: "Strong Obligation -> must" },
        { id: 3, type: "unscramble", question: "Sort:", words: ["be", "should", "You", "responsible"], answer: "You should be responsible.", hint: "You should..." },
        { id: 4, type: "fill", question: "She _____ (can/must) run fast.", answer: "can", hint: "Ability -> can" },
        { id: 5, type: "mc", question: "We _____ support our community.", options: ["should", "can"], answer: "should", hint: "Recommendation -> should" },
        { id: 6, type: "fill", question: "I _____ (can't/mustn't) touch the fire.", answer: "mustn't", hint: "Strong negative obligation -> mustn't" },
        { id: 7, type: "unscramble", question: "Sort:", words: ["is", "Our", "important", "community"], answer: "Our community is important.", hint: "Our community..." },
        { id: 8, type: "fill", question: "Every citizen _____ (should/can) follow the law.", answer: "should", hint: "Recommendation -> should" },
        { id: 9, type: "mc", question: "The firefighter _____ drive a big truck.", options: ["can", "must"], answer: "can", hint: "Ability -> can" },
        { id: 10, type: "fill", question: "You _____ (must/should) stop at a red light.", answer: "must", hint: "Strong Obligation -> must" },
        { id: 11, type: "unscramble", question: "Sort:", words: ["help", "doctor", "A", "can", "us"], answer: "A doctor can help us.", hint: "A doctor..." },
        { id: 12, type: "mc", question: "She _____ sing, but she _____ dance.", options: ["can't / can", "must / should"], answer: "can't / can", hint: "Ability/Inability" },
        { id: 13, type: "fill", question: "We _____ (must/should) eat healthy food.", answer: "should", hint: "Advice -> should" },
        { id: 14, type: "fill", question: "The police _____ (can/must) keep order.", answer: "must", hint: "Strong Obligation -> must" },
        { id: 15, type: "unscramble", question: "Sort:", words: ["support", "We", "friends", "our", "should"], answer: "We should support our friends.", hint: "We should..." },
        { id: 16, type: "fill", question: "Make sentence: 'I / can / swim / fast'", answer: ["I can swim fast.", "i can swim fast."], customCheck: true, hint: "Use 'can'" },
        { id: 17, type: "mc", question: "He _____ be a good helper.", options: ["can", "must"], answer: "can", hint: "Ability -> can" },
        { id: 18, type: "fill", question: "You _____ (should/must) clean your room.", answer: "should", hint: "Recommendation -> should" },
        { id: 19, type: "unscramble", question: "Sort:", words: ["must", "They", "the", "obey", "rules"], answer: "They must obey the rules.", hint: "They must..." },
        { id: 20, type: "fill", question: "Make sentence: 'We / must / be / safe'", answer: ["We must be safe.", "we must be safe."], customCheck: true, hint: "Use 'must'" }
      ]
    },
    // 4. ASK AI (CONTEXT)
    ask_ai: {
      prompts: [
        { id: 1, context_vi: "Bạn thấy một người bị thương. Hỏi xem bạn nên gọi ai giúp đỡ.", context_en: "You see an injured person. Ask who you should call for help.", answer: ["Who should I call for help?", "Should I call a doctor?"], hint: "Who should I call..." },
        { id: 2, context_vi: "Bạn muốn biết lính cứu hỏa có thể làm gì.", context_en: "You want to know what a firefighter can do.", answer: ["What can a firefighter do?", "Can they put out fires?"], hint: "What can a..." },
        { id: 3, context_vi: "Bạn muốn biết mình có trách nhiệm gì với cộng đồng.", context_en: "Ask what your responsibilities are in the community.", answer: ["What is my role in the community?", "What should I do?"], hint: "What is my role..." },
        { id: 4, context_vi: "Bạn muốn biết tại sao cảnh sát phải giữ trật tự.", context_en: "Ask why the police must keep order.", answer: ["Why must the police keep order?", "Why is the police job important?"], hint: "Why must..." },
        { id: 5, context_vi: "Bạn muốn biết nếu bạn bị ốm, bạn nên làm gì.", context_en: "Ask what you should do if you feel sick.", answer: ["What should I do if I am sick?", "Should I go to the doctor?"], hint: "What should I do..." }
      ]
    },
    // 5. LOGIC LAB (WORD PROBLEMS & OPTIONS)
    logic_lab: {
      puzzles: [
        { id: 1, type: "math", title_en: "Helper Count", question_en: "In a town, there are 5 police officers and 4 firefighters. What is the total number of helpers?", answer: ["9 helpers", "9"], target_number: 9, unit: "helpers", audio_url: "/audio/week11/logic_1.mp3" },
        { id: 2, type: "logic", title_en: "Who Helps?", question_en: "If there is a fire, who MUST you call?", options: ["Firefighter", "Doctor"], answer: "Firefighter", audio_url: "/audio/week11/logic_2.mp3" },
        { id: 3, type: "math", title_en: "Skill Practice", question_en: "You practice a skill for 10 minutes every day. How many minutes do you practice in 5 days?", answer: ["50 minutes", "50"], target_number: 50, unit: "minutes", audio_url: "/audio/week11/logic_3.mp3" },
        { id: 4, type: "pattern", title_en: "Duty Pattern", question_en: "Police, Doctor, Police, Doctor... What comes next?", options: ["Police", "Doctor"], answer: "Police", audio_url: "/audio/week11/logic_4.mp3" },
        { id: 5, type: "logic", title_en: "Citizen Role", question_en: "Should a responsible citizen throw trash on the street?", options: ["No", "Yes"], answer: "No", hint_en: "Responsible means doing good things", audio_url: "/audio/week11/logic_5.mp3" }
      ]
    },
    // 6. DICTATION
    dictation: {
      sentences: [
        { id: 1, text: "The police must keep the streets safe.", meaning: "Cảnh sát phải giữ an toàn đường phố.", audio_url: "/audio/week11/dictation_1.mp3" },
        { id: 2, text: "A doctor can help people who are sick.", meaning: "Bác sĩ có thể giúp những người bị ốm.", audio_url: "/audio/week11/dictation_2.mp3" },
        { id: 3, text: "The firefighter can put out fires quickly.", meaning: "Lính cứu hỏa có thể dập tắt đám cháy nhanh chóng.", audio_url: "/audio/week11/dictation_3.mp3" },
        { id: 4, text: "We should all be responsible citizens.", meaning: "Tất cả chúng ta nên là công dân có trách nhiệm.", audio_url: "/audio/week11/dictation_4.mp3" },
        { id: 5, text: "Every person has an important role to support the community.", meaning: "Mỗi người đều có vai trò quan trọng để hỗ trợ cộng đồng.", audio_url: "/audio/week11/dictation_5.mp3" }
      ]
    },
    // 7. SHADOWING (KHỚP VỚI READ & EXPLORE)
    shadowing: {
      title: "Science: How Does Water Get to Your House? (SciShow Kids)'t examples sentences (Periwinkle)'t examples (BBC Learning English)",
      script: [
        { id: 1, text: "A good community needs many helpers.", vi: "Một cộng đồng tốt cần nhiều người giúp đỡ.", audio_url: "/audio/week11/shadowing_1.mp3" },
        { id: 2, text: "The police must keep the streets safe, and the firefighter can put out fires.", vi: "Cảnh sát phải giữ an toàn đường phố, và lính cứu hỏa có thể dập tắt đám cháy.", audio_url: "/audio/week11/shadowing_2.mp3" },
        { id: 3, text: "A doctor can help people who are sick because they have special skills.", vi: "Bác sĩ có thể giúp người ốm vì họ có kỹ năng đặc biệt.", audio_url: "/audio/week11/shadowing_3.mp3" },
        { id: 4, text: "We should all be responsible citizens to support our town.", vi: "Tất cả chúng ta nên là công dân có trách nhiệm để hỗ trợ thị trấn.", audio_url: "/audio/week11/shadowing_4.mp3" },
        { id: 5, text: "Every person has an important role.", vi: "Mỗi người đều có một vai trò quan trọng.", audio_url: "/audio/week11/shadowing_5.mp3" }
      ]
    },
    // 8. EXPLORE (CLIL - SỰ PHÂN CÔNG LAO ĐỘNG)
    explore: {
      title_en: "Division of Labor",
      title_vi: "Phân công Lao động",
      image_url: "/images/week11/explore_cover_w11.jpg",
      content_en: "No one **can** do everything alone. A society works well **because** people specialize in **different** **roles**. The farmer **must** grow food, **and** the teacher **should** teach children. This specialization is called the **division of labor**. It is a **skill** to work together to keep the community strong.",
      content_vi: "Không ai có thể làm mọi thứ một mình. Một xã hội hoạt động tốt vì mọi người chuyên môn hóa vào các vai trò khác nhau. Nông dân phải trồng lương thực, và giáo viên nên dạy trẻ em. Sự chuyên môn hóa này được gọi là phân công lao động. Đó là một kỹ năng để làm việc cùng nhau giữ cho cộng đồng vững mạnh.",
      audio_url: "/audio/week11/explore_main.mp3",
      check_questions: [
        { id: 1, question_en: "What must the farmer do?", answer: ["Grow food."], hint_en: "Grow..." },
        { id: 2, question_en: "What should the teacher do?", answer: ["Teach children."], hint_en: "Teach..." },
        { id: 3, question_en: "What is the division of labor?", answer: ["When people specialize in different roles."], hint_en: "When people..." }
      ],
      question: { text_en: "What role do you want to have in the future? Why?", text_vi: "Bạn muốn có vai trò gì trong tương lai? Tại sao?", min_words: 15, model_answer: "I want to be a scientist so I can make new discoveries." }
    },
    word_power: {
      words: [
        { id: 1, word: "obey", definition_en: "To follow the rules.", definition_vi: "Tuân thủ", example: "We must obey the law.", cefr_level: "B1", collocation: "obey rules", image_url: "/images/week11/obey.jpg", audio_word: "/audio/week11/power_word_obey.mp3", audio_def: "/audio/week11/power_def_obey.mp3", audio_coll: "/audio/week11/power_coll_obey.mp3" },
        { id: 2, word: "citizen", definition_en: "A legal member of a country.", definition_vi: "Công dân", example: "Be a good citizen.", cefr_level: "A2", collocation: "responsible citizen", image_url: "/images/week11/citizen.jpg", audio_word: "/audio/week11/power_word_citizen.mp3", audio_def: "/audio/week11/power_def_citizen.mp3", audio_coll: "/audio/week11/power_coll_citizen.mp3" },
        { id: 3, word: "labor", definition_en: "Work, especially hard physical work.", definition_vi: "Lao động", example: "Manual labor is hard work.", cefr_level: "B1", collocation: "division of labor", image_url: "/images/week11/labor.jpg", audio_word: "/audio/week11/power_word_labor.mp3", audio_def: "/audio/week11/power_def_labor.mp3", audio_coll: "/audio/week11/power_coll_labor.mp3" }
      ]
    },
    // 10. DAILY WATCH
    daily_watch: {
      videos: [
        { id: 1, title: "Topic: Jobs and Occupations - Vocabulary for Kids - Compilation (Smile and Learn - English)", query: "Community helpers vocabulary't examples sentences't examples", videoId: "ugsRzHMIF2o" },
        { id: 2, title: "Grammar: An Introduction to Past Modals: must have, should have, would have, and cou (Learn English with Bob the Canadian)", query: "Modal verbs can and can't", videoId: "hBogiz8JWWo" },
        { id: 3, title: "Math: Community Count  | Count to 100 | Fun Counting Song for Kids | Jack Hartman (Jack Hartmann Kids Music Channel)", query: "Counting community helpers", videoId: "-RYeneL4RNo" },
        { id: 4, title: "Science: Fire station (place) - firefighter vocab - Kids vocabulary - Learn English  (English Singsing)", query: "Fire station tour for kids", videoId: "OEVgB870ues" },
        { id: 5, title: "Bonus: Learn Jobs Vocabulary | Talking Flashcards (Maple Leaf Learning)", query: "Community helpers vocabulary song", videoId: "tQ03ENVgRfg" }
      ],
      bonus_games: [{ id: 1, title: "Science: How a city works infrastructure (Smile and Learn - English)", url: "https://www.gamestolearnenglish.com/jobs/", description: "Match jobs to tools." }]
    },
    writing: {
      title: "Video Challenge: My Future Role",
      prompt_en: "What job do you want? Say what you can do and what you must do in that job.",
      prompt_vi: "Bạn muốn làm nghề gì? Nói xem bạn có thể làm gì và phải làm gì trong nghề đó.",
      min_words: 25,
      keywords: ["can", "must", "should", "role"]
    }
  }
};
export default weekData;
