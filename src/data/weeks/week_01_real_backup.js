/**
 * ✅ WEEK 1 REAL SYLLABUS DATA - COMPLETE WITH GAME MISSIONS
 * 
 * Source: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
 * Phase 1 - Block A: Week 1
 * 
 * Updated with Mission 2 & 3 GAME structures from Week 2
 * - Mission 1: Story Mission (kept current version)
 * - Mission 2: GAME structure adapted to "Backpack" theme
 * - Mission 3: GAME structure adapted to "Teacher/School" theme
 * - freetalk_knowledge: Week 1 topics
 * - roleplay_scenarios: Week 1 themes
 */

const week1RealData = {
  // === METADATA ===
  week_id: 1,
  phase: 1,
  block: "A",
  unit: 1,
  
  // === OFFICIAL SYLLABUS DATA ===
  week_title_en: "Hello, World! (Identity)",
  week_title_vi: "Chào Thế giới! (Danh tính)",
  
  topic: "Introduction & Superheroes (Creating a 'Hero Identity')",
  topic_vi: "Giới thiệu & Siêu anh hùng (Tạo 'Danh tính Anh hùng')",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Say and write sentences introducing name/age naturally.",
  learning_outcome_vi: "Nói và viết câu giới thiệu tên/tuổi một cách tự nhiên.",
  
  // === GRAMMAR FOCUS (IMPLICIT) ===
  grammar_focus: "Pattern 'I am...' (Identity)",
  grammar_pattern: "I am [name/adjective]",
  grammar_examples: [
    "I am Alex.",
    "I am a student.",
    "I am 7 years old.",
    "I am a hero!"
  ],
  
  // === TARGET VOCABULARY (OFFICIAL FROM SYLLABUS) ===
  target_vocab: [
    {
      word: "name",
      pronunciation: "/neɪm/",
      definition_vi: "Tên",
      definition_en: "What someone is called.",
      example: "My name is Alex.",
      syllabus_context: "Identity - Introducing self"
    },
    {
      word: "age",
      pronunciation: "/eɪdʒ/",
      definition_vi: "Tuổi",
      definition_en: "How old someone is.",
      example: "I am 7 years old.",
      syllabus_context: "Identity - Introducing age"
    },
    {
      word: "student",
      pronunciation: "/ˈstuːdənt/",
      definition_vi: "Học sinh",
      definition_en: "A person who is learning at a school.",
      example: "I am a student.",
      syllabus_context: "Identity - Role"
    },
    {
      word: "hero",
      pronunciation: "/ˈhɪroʊ/",
      definition_vi: "Anh hùng",
      definition_en: "A brave person who helps others.",
      example: "I want to be a hero!",
      syllabus_context: "Creative Lens - Superhero theme"
    },
    {
      word: "power",
      pronunciation: "/ˈpaʊər/",
      definition_vi: "Sức mạnh, quyền năng",
      definition_en: "A special ability that makes you strong.",
      example: "My power is reading fast!",
      syllabus_context: "Creative Lens - Superhero abilities"
    },
    {
      word: "boy",
      pronunciation: "/bɔɪ/",
      definition_vi: "Con trai",
      definition_en: "A male child.",
      example: "He is a boy.",
      syllabus_context: "Identity - Gender"
    },
    {
      word: "girl",
      pronunciation: "/ɡɜrl/",
      definition_vi: "Con gái",
      definition_en: "A female child.",
      example: "She is a girl.",
      syllabus_context: "Identity - Gender"
    }
  ],
  
  // === NUMBERS 1-10 (ADDITIONAL VOCAB FROM SYLLABUS) ===
  numbers_vocab: [
    { number: 1, word: "one" },
    { number: 2, word: "two" },
    { number: 3, word: "three" },
    { number: 4, word: "four" },
    { number: 5, word: "five" },
    { number: 6, word: "six" },
    { number: 7, word: "seven" },
    { number: 8, word: "eight" },
    { number: 9, word: "nine" },
    { number: 10, word: "ten" }
  ],
  
  // === 3 STORY MISSIONS (SCHOOL-BASED, WEEK 1 VOCAB) ===
  story_missions: [
    {
      mission_id: 1,
      title: "First Day at School",
      title_en: "First Day at School",
      title_vi: "Ngày Đầu Tiên Đi Học",
      theme: "Self-introduction",
      
      nova_greeting: "Hello! I am Ms. Nova, your English teacher!",
      default_hints: ["My", "name", "is", "I", "am"],
      
      mission_context: `This is Week 1 Mission 1 - First Day at School (Self-Introduction).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- DON'T modify or shorten the questions
- COPY question text word-for-word from phase_questions
- Each student answer = Move to NEXT question in phase_questions array

🚨🚨🚨 SCAFFOLDING RULE - ABSOLUTE REQUIREMENT: 🚨🚨🚨
EVERY SINGLE QUESTION **MUST** INCLUDE THE FULL "Say: Option A or Option B" SCAFFOLDING!
- ✅ CORRECT: "What is your name? Say: My name is Alex or My name is Emma"
- ❌ WRONG: "What is your name?" (MISSING "Say: ...")

GRAMMAR: "I am [name/age]" pattern
VOCABULARY: name, age, student, school, happy, excited`,
      
      target_vocab: ["name", "age", "student", "school", "happy", "excited"],
      grammar_pattern: "I am [name/age/student]",

      story_character: {
        name: "Ms. Nova",
        personality: "warm, welcoming, patient English teacher",
        backstory: "I love meeting new students on their first day! Every student is special!",
        speaking_style: "asks about student identity step by step, celebrates each answer, uses 'I am' pattern",
        facts: {
          loves_students: true,
          first_day_is_special: true,
          every_student_unique: true,
          enjoys_introductions: true,
          favorite_topic: "meeting new students",
          believes_everyone_can_learn: true
        },
        role: "English teacher guide"
      },

      opening_narrative: "Hello! I am Ms. Nova, your English teacher! 📚 First, what is your name? Say: My name is Alex or My name is Emma",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "Basic Introduction",
          focus: "Name and age introduction",
          goal: "Learn student's name and age",
          phase_questions: [
            "(After student says name) Nice to meet you, {student_answer}! 👋 How old are you? Say: I am 7 years old or I am 8 years old",
            "(After age) Great! You are {student_answer}! 🎂 Are you a student? Say: Yes, I am a student or Yes, I am",
            "(After student confirms) Wonderful! You are a student! 📖 What grade are you in? Say: I am in grade 1 or I am in grade 2",
            "(After grade) Excellent! You are in grade {student_answer}! ✏️ How do you feel today? Say: I am happy or I am excited",
            "(After feeling) Good! You are {student_answer}! 😊 Are you excited about school? Say: Yes, I am excited or Yes, I am nervous"
          ]
        },
        {
          phase: "school_life",
          turns: "6-11",
          phase_name: "School Life",
          focus: "School experience and relationships",
          goal: "Explore student's school life and friendships",
          phase_questions: [
            "(After excitement answer) I see! You are {student_answer}! 🏫 Do you like school? Say: Yes, I like school or No, I don't like school",
            "(After school opinion) Good! {student_answer}! 👍 Is your school big or small? Say: My school is big or My school is small",
            "(After school size) Nice! Your school is {student_answer}! 🏢 Do you have friends at school? Say: Yes, I have friends or No, I don't have friends",
            "(After friends) Great! {student_answer}! 👫 What do you do at school? Say: I learn English or I play with friends",
            "(After school activities) Wonderful! You {student_answer}! 📚 What do you like about school? Say: I like my teacher or I like playing",
            "(After what they like) Perfect! You like {student_answer}! 💙 Is your teacher nice? Say: Yes, my teacher is nice or Yes, my teacher is kind"
          ]
        },
        {
          phase: "personal_goals",
          turns: "12-17",
          phase_name: "Personal Goals and Feelings",
          focus: "Student's goals and aspirations",
          goal: "Help student express their school goals",
          phase_questions: [
            "(After teacher description) Wonderful! Your teacher is {student_answer}! 👨‍🏫 Do you want to learn English? Say: Yes, I want to learn or Yes, I do",
            "(After wanting to learn) Excellent! You want to {student_answer}! 🌟 What do you want to be? Say: I want to be a hero or I want to be a student",
            "(After aspiration) Amazing! You want to be {student_answer}! 🦸 Are you brave? Say: Yes, I am brave or Yes, I am strong",
            "(After brave answer) Great! You are {student_answer}! 💪 Do you help your friends? Say: Yes, I help my friends or Yes, I do",
            "(After helping) Perfect! You {student_answer}! 🤝 Are you ready to learn? Say: Yes, I am ready or Yes, I am excited",
            "(After ready) Wonderful! You are {student_answer}! ✨ Do you like Ms. Nova? Say: Yes, I like Ms. Nova or Yes, I do"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Celebration and Goodbye",
          focus: "Wrap up with celebration",
          goal: "Celebrate student's first day and say goodbye",
          phase_questions: [
            "(After liking Ms. Nova) Thank you! I like you too! ❤️ Tell me one more thing - are you happy today? Say: Yes, I am happy or Yes, I am very happy",
            "(After happiness) Wonderful! You are {student_answer}! 🎉 Can you say 'Nice to meet you'? Say: Nice to meet you Ms. Nova or Nice to meet you",
            "(After greeting) Perfect! Nice to meet you too! 🌟 You did a great job today! You are a wonderful student! Welcome to English class! Goodbye! 👋"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,

      objectives: [],
      
      success_criteria: [
        "Uses 'I am' correctly for name",
        "States age with 'years old'",
        "Uses 'student' naturally",
        "Engages naturally in conversation"
      ]
    },
    {
      mission_id: 2,
      title: "What's in Your Backpack?",
      title_en: "What's in Your Backpack?",
      title_vi: "Có Gì Trong Ba Lô?",
      theme: "School supplies and belongings",
      
      nova_greeting: "Hi there! I see you have a backpack with you!",
      default_hints: ["I", "have", "backpack", "book", "notebook"],
      
      mission_context: `This is Week 1 Mission 2 - What's in Your Backpack (School Supplies).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
🚨🚨🚨 SCAFFOLDING RULE - ABSOLUTE REQUIREMENT: 🚨🚨🚨
EVERY SINGLE QUESTION **MUST** INCLUDE THE FULL "Say: Option A or Option B" SCAFFOLDING!

GRAMMAR: "I have a [item]" pattern
VOCABULARY: backpack, book, notebook, pen, pencil, heavy, light`,
      
      target_vocab: ["backpack", "book", "notebook", "pen", "pencil"],
      grammar_pattern: "I have a [item]",

      story_character: {
        name: "Ms. Nova",
        personality: "curious, organized, helpful",
        backstory: "I love school supplies! A good backpack helps students learn!",
        speaking_style: "asks about items one by one, celebrates organization",
        facts: {
          loves_school_supplies: true,
          organized_student_successful: true,
          backpack_important: true,
          books_are_friends: true
        },
        role: "School supplies guide"
      },

      opening_narrative: "Hi there! I see you have a backpack with you! 🎒 What do you have in your backpack? Say: I have a book or I have a notebook",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "Backpack Introduction",
          focus: "Basic backpack and contents",
          goal: "Learn what student has in backpack",
          phase_questions: [
            "(After student says what they have) Good! You have {student_answer}! 📚 Do you have a backpack? Say: Yes, I have a backpack or No, I don't have a backpack",
            "(After backpack answer) Great! {student_answer}! 🎒 What color is your backpack? Say: My backpack is red or My backpack is blue",
            "(After color) Nice! Your backpack is {student_answer}! 🌈 Do you have books in your backpack? Say: Yes, I have books or No, I don't have books",
            "(After books) Wonderful! {student_answer}! 📖 Do you have a notebook? Say: Yes, I have a notebook or No, I don't have a notebook",
            "(After notebook) Good! {student_answer}! 📓 Do you have pens or pencils? Say: I have pens or I have pencils"
          ]
        },
        {
          phase: "backpack_details",
          turns: "6-11",
          phase_name: "Backpack Characteristics",
          focus: "Describe backpack features",
          goal: "Explore backpack characteristics and opinions",
          phase_questions: [
            "(After pens/pencils) Excellent! You have {student_answer}! ✏️ What else do you have in your backpack? Say: I have an eraser or I have a ruler",
            "(After other items) Great! You have {student_answer}! 📏 Is your backpack big or small? Say: My backpack is big or My backpack is small",
            "(After size) Good! Your backpack is {student_answer}! 💼 Is your backpack heavy or light? Say: My backpack is heavy or My backpack is light",
            "(After weight) I see! Your backpack is {student_answer}! ⚖️ Is your backpack new or old? Say: My backpack is new or My backpack is old",
            "(After age) Nice! Your backpack is {student_answer}! ✨ Do you like your backpack? Say: Yes, I like my backpack or No, I don't like it",
            "(After opinion) {student_answer}! 💙 Do you bring your backpack to school every day? Say: Yes, I bring it every day or Yes, I do"
          ]
        },
        {
          phase: "school_supplies_love",
          turns: "12-17",
          phase_name: "School Supplies Appreciation",
          focus: "Express feelings about school supplies",
          goal: "Help student express appreciation for their things",
          phase_questions: [
            "(After daily backpack answer) Wonderful! {student_answer}! 🏫 What is your favorite thing in your backpack? Say: My favorite is my book or My favorite is my pencil",
            "(After favorite thing) Great! Your favorite is {student_answer}! ⭐ Do your books help you learn? Say: Yes, my books help me or Yes, they do",
            "(After books help) Perfect! {student_answer}! 📖 Do you take care of your backpack? Say: Yes, I take care of it or Yes, I do",
            "(After taking care) Wonderful! {student_answer}! 👍 Is your backpack organized? Say: Yes, it is organized or No, it is messy",
            "(After organized answer) I see! {student_answer}! 📋 Do you pack your backpack yourself? Say: Yes, I pack it myself or No, my mother helps me",
            "(After packing answer) Good! {student_answer}! 🎒 Are you ready for school with your backpack? Say: Yes, I am ready or Yes, I am"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Celebration and Goodbye",
          focus: "Wrap up with celebration",
          goal: "Celebrate student's organization and say goodbye",
          phase_questions: [
            "(After ready answer) Excellent! You are {student_answer}! ✨ Tell me one more thing - what do you need in your backpack for school? Say: I need books or I need pencils",
            "(After needs) Perfect! You need {student_answer}! 📚 Can you say 'My backpack helps me learn'? Say: My backpack helps me learn or My backpack is important",
            "(After final statement) Wonderful! {student_answer}! 🌟 You have a great backpack! You are a well-organized student! Take good care of your things! Goodbye! 👋"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,

      objectives: [],
      
      success_criteria: [
        "Uses 'I have' pattern correctly",
        "Names at least 2 school supplies",
        "Describes items with colors or adjectives",
        "Shows engagement with school supplies"
      ]
    },
    {
      mission_id: 3,
      title: "Meeting Your Teacher",
      title_en: "Meeting Your Teacher",
      title_vi: "Gặp Gỡ Giáo Viên",
      theme: "School environment and relationships",
      
      nova_greeting: "Hello again! I want to learn about your school!",
      default_hints: ["My", "teacher", "is", "kind", "nice"],
      
      mission_context: `This is Week 1 Mission 3 - Meeting Your Teacher (School Environment).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
🚨🚨🚨 SCAFFOLDING RULE - ABSOLUTE REQUIREMENT: 🚨🚨🚨
EVERY SINGLE QUESTION **MUST** INCLUDE THE FULL "Say: Option A or Option B" SCAFFOLDING!

GRAMMAR: "My teacher is [adjective]" pattern
VOCABULARY: teacher, school, classroom, nice, big, small`,
      
      target_vocab: ["teacher", "school", "classroom", "nice", "big", "kind"],
      grammar_pattern: "My teacher is [adjective] / My school is [adjective]",

      story_character: {
        name: "Ms. Nova",
        personality: "interested, supportive, encouraging",
        backstory: "I love hearing about teachers and schools! Good teachers change lives!",
        speaking_style: "asks about school environment, celebrates positive descriptions",
        facts: {
          loves_teachers: true,
          schools_are_important: true,
          learning_environment_matters: true,
          good_teachers_inspire: true
        },
        role: "School environment guide"
      },

      opening_narrative: "Hello again! I want to learn about your school! 🏫 Tell me about your teacher. What is your teacher like? Say: My teacher is kind or My teacher is nice",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "Teacher Introduction",
          focus: "Describe teacher characteristics",
          goal: "Learn about student's teacher",
          phase_questions: [
            "(After student describes teacher) Wonderful! Your teacher is {student_answer}! 👨‍🏫 Is your teacher funny? Say: Yes, my teacher is funny or No, my teacher is serious",
            "(After funny answer) I see! Your teacher is {student_answer}! 😊 Do you like your teacher? Say: Yes, I like my teacher or No, I don't like my teacher",
            "(After like answer) Good! {student_answer}! 💙 Is your teacher a man or a woman? Say: My teacher is a man or My teacher is a woman",
            "(After gender) Nice! Your teacher is {student_answer}! 👤 What is your teacher's name? Say: My teacher is Mr. John or My teacher is Ms. Mary",
            "(After teacher name) Excellent! Your teacher is {student_answer}! ✨ Does your teacher help you? Say: Yes, my teacher helps me or Yes, my teacher does"
          ]
        },
        {
          phase: "school_details",
          turns: "6-11",
          phase_name: "School Environment",
          focus: "Describe school and classroom",
          goal: "Explore student's school environment",
          phase_questions: [
            "(After teacher helps) Perfect! Your teacher {student_answer}! 🤝 Now tell me about your school. Is your school big or small? Say: My school is big or My school is small",
            "(After school size) Good! Your school is {student_answer}! 🏫 Do you like your school? Say: Yes, I like my school or No, I don't like my school",
            "(After school opinion) Great! {student_answer}! 👍 Is your classroom big or small? Say: My classroom is big or My classroom is small",
            "(After classroom size) Nice! Your classroom is {student_answer}! 🚪 Is your classroom nice? Say: Yes, it is nice or Yes, it is beautiful",
            "(After classroom nice) Wonderful! Your classroom is {student_answer}! ✨ Do you have many classmates? Say: Yes, I have many classmates or No, I have few classmates",
            "(After classmates) Good! {student_answer}! 👫 Are your classmates friendly? Say: Yes, they are friendly or Yes, they are nice"
          ]
        },
        {
          phase: "school_experience",
          turns: "12-17",
          phase_name: "School Experience and Feelings",
          focus: "Express feelings about school",
          goal: "Help student express their school experience",
          phase_questions: [
            "(After friendly classmates) Excellent! They are {student_answer}! 🌟 Do you play with your classmates? Say: Yes, I play with them or Yes, I do",
            "(After play answer) Great! You {student_answer}! 🎮 Do you learn a lot at school? Say: Yes, I learn a lot or Yes, I do",
            "(After learning) Perfect! You {student_answer}! 📚 Is school fun? Say: Yes, school is fun or No, school is boring",
            "(After school fun) I see! School is {student_answer}! 😊 Do you want to go to school every day? Say: Yes, I want to go or Yes, I do",
            "(After want to go) Wonderful! You {student_answer}! 🏫 What do you like most about school? Say: I like my teacher or I like my friends",
            "(After what they like) Excellent! You like {student_answer}! ❤️ Are you a good student? Say: Yes, I am a good student or Yes, I am"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Celebration and Goodbye",
          focus: "Wrap up with gratitude",
          goal: "Celebrate student's school experience and say goodbye",
          phase_questions: [
            "(After good student) Perfect! You are {student_answer}! 🌟 Tell me one more thing - are you happy at school? Say: Yes, I am happy or Yes, I am very happy",
            "(After happiness) Wonderful! You are {student_answer}! 🎉 Can you say thank you to your teacher? Say: Thank you teacher or Thank you for helping me",
            "(After thank you) Beautiful! 💙 You have a great teacher and a wonderful school! You are lucky! Keep learning and having fun! Great job! Goodbye! 👋"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,

      objectives: [],
      
      success_criteria: [
        "Uses 'My teacher is...' pattern correctly with adjectives",
        "Describes at least 2 features of school or classroom",
        "Uses all target vocabulary naturally",
        "Expresses positive feelings about school"
      ]
    }
  ],
  
  // === TEACHING METHODOLOGY (FROM SYLLABUS PRINCIPLES) ===
  teaching_principles: {
    zero_l1: true, // No Vietnamese in teaching
    visual_anchor: "Use superhero images/videos to introduce concept",
    tpr_gestures: "Use gestures for 'I am' (point to self), 'hero' (flex muscles), 'student' (pretend to write)",
    implicit_grammar: true, // Don't explain rules, make students use pattern naturally
    creative_lens: "Superhero theme to make learning fun"
  },
  
  // === MS. NOVA AI TUTOR INSTRUCTIONS ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and human-like",
    tone: "Warm, encouraging, natural - like a patient friend",
    
    // Opening lines for each mission (PRESENT SIMPLE ONLY - Week 1 grammar)
    opening_lines_by_mission: {
      mission_1: "Hello! I am Ms. Nova, your English teacher. What is your name?",
      mission_2: "Hi there! I see you have a backpack with you. What do you have in your backpack today?",
      mission_3: "Hello again! I want to learn about your school. Tell me about your teacher. What is your teacher like?"
    },
    
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use present simple tense - Week 1 grammar scope"
    ],
    
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally",
    recast_example: {
      student: "I Alex.",
      nova_recast: "Oh, you ARE Alex! That's a wonderful name! I am Ms. Nova. How old are you, Alex?"
    },
    
    vocabulary_scaffolding: [
      "Mission 1: Focus on 'name' and 'age'",
      "Mission 2: Introduce 'backpack', 'book', 'notebook'",
      "Mission 3: Use 'teacher', 'school', 'classroom' naturally"
    ],
    
    questioning_skill: [
      "What is your name?",
      "How old are you?",
      "Are you a student?",
      "What do you have in your backpack?",
      "Who is your teacher?",
      "What is your classroom like?"
    ],
    
    must_use_vocab: ["name", "age", "student", "backpack", "book", "notebook", "teacher", "school", "classroom"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Past or future tense (Week 1 scope)"
    ]
  },
  
  // === ASSESSMENT CRITERIA ===
  formative_assessment: {
    can_introduce_name: false,
    can_state_age: false,
    can_use_i_am: false,
    can_describe_hero_identity: false
  },
  
  // === ALIAS FOR TAB COMPATIBILITY ===
  global_vocab: [
    {
      word: "name",
      pronunciation: "/neɪm/",
      definition_vi: "Tên",
      definition_en: "What someone is called.",
      example: "My name is Alex.",
      syllabus_context: "Mission 1 - Identity"
    },
    {
      word: "age",
      pronunciation: "/eɪdʒ/",
      definition_vi: "Tuổi", 
      definition_en: "How old someone is.",
      example: "I am 7 years old.",
      syllabus_context: "Mission 1 - Identity"
    },
    {
      word: "student",
      pronunciation: "/ˈstuːdənt/",
      definition_vi: "Học sinh",
      definition_en: "A person who is learning at a school.",
      example: "I am a student.",
      syllabus_context: "Mission 1 - Identity"
    },
    {
      word: "hero",
      pronunciation: "/ˈhɪroʊ/",
      definition_vi: "Anh hùng",
      definition_en: "A brave person who helps others.",
      example: "I want to be a hero!",
      syllabus_context: "Mission 1 - Creative theme"
    },
    {
      word: "backpack",
      pronunciation: "/ˈbækpæk/",
      definition_vi: "Ba lô",
      definition_en: "A bag you carry on your back for school things.",
      example: "I have a blue backpack.",
      syllabus_context: "Mission 2 - School supplies"
    },
    {
      word: "book",
      pronunciation: "/bʊk/",
      definition_vi: "Sách",
      definition_en: "Something you read to learn.",
      example: "I have a math book.",
      syllabus_context: "Mission 2 - School supplies"
    },
    {
      word: "notebook",
      pronunciation: "/ˈnoʊtbʊk/",
      definition_vi: "Vở ghi chép",
      definition_en: "A book with empty pages for writing.",
      example: "I write in my notebook.",
      syllabus_context: "Mission 2 - School supplies"
    },
    {
      word: "teacher",
      pronunciation: "/ˈtiːtʃər/",
      definition_vi: "Giáo viên",
      definition_en: "A person who helps students learn.",
      example: "My teacher is kind.",
      syllabus_context: "Mission 3 - School environment"
    },
    {
      word: "school",
      pronunciation: "/skuːl/",
      definition_vi: "Trường học",
      definition_en: "A place where children go to learn.",
      example: "I go to school every day.",
      syllabus_context: "Mission 3 - School environment"
    },
    {
      word: "classroom",
      pronunciation: "/ˈklæsruːm/",
      definition_vi: "Lớp học",
      definition_en: "A room where students learn with their teacher.",
      example: "Our classroom is big.",
      syllabus_context: "Mission 3 - School environment"
    }
  ],

  // === WORD POWER (3 PHRASAL VERBS/COLLOCATIONS) ===
  word_power: {
    words: [
      {
        id: 1,
        word: "do homework",
        pronunciation: "/duː ˈhoʊmwɜːrk/",
        cefr_level: "A1",
        definition_en: "To complete school assignments at home.",
        definition_vi: "Hoàn thành bài tập ở nhà.",
        collocation: "do your homework"
      },
      {
        id: 2,
        word: "go to school",
        pronunciation: "/ɡoʊ tə skuːl/",
        cefr_level: "A1",
        definition_en: "To travel to school to attend classes.",
        definition_vi: "Đi đến trường để học.",
        collocation: "go to school early"
      },
      {
        id: 3,
        word: "pay attention",
        pronunciation: "/peɪ əˈtenʃən/",
        cefr_level: "A2",
        definition_en: "To focus and listen carefully to something.",
        definition_vi: "Tập trung và lắng nghe cẩn thận.",
        collocation: "pay close attention"
      }
    ]
  },

  // === CONNECTION TO EXISTING WEEK 1 DATA ===
  extended_vocab_reference: [
    "teacher",
    "school",
    "classroom",
    "backpack",
    "book",
    "notebook",
    "library",
    "scientist"
  ],

  // === FREETALK KNOWLEDGE (Week 1 - Identity & School Theme) ===
  freetalk_knowledge: {
    week_title: "Hello, World! (Identity)",
    week_number: 1,
    theme: "Introduction & School",
    
    // Week 1 establishes baseline FreeTalk knowledge
    knowledge_base: [
      "We introduce ourselves: 'I am [name]', 'I am [age] years old'",
      "We are students who go to school",
      "We have backpacks with books and notebooks",
      "We have teachers at school who help us learn",
      "We study in classrooms",
      "School is where we learn and make friends",
      "We use 'I am' to talk about ourselves",
      "We can ask 'What is your name?' and 'How old are you?'"
    ],
    
    example_opening_questions: [
      "What is your name?",
      "How old are you?",
      "Are you a student?",
      "Do you go to school?",
      "Do you have a backpack?",
      "What is in your backpack?",
      "Who is your teacher?",
      "Do you like school?"
    ],
    
    freetalk_context: `Week 1 is about IDENTITY and SCHOOL. The student has learned:
- Self-introduction: name, age, being a student
- School items: backpack, book, notebook
- School people and places: teacher, school, classroom

Ms. Nova can ask about these topics in Free Talk:
- What is your name?
- How old are you?
- Are you a student?
- Do you like school?
- What do you have in your backpack?
- Who is your teacher?
- What is your classroom like?

Keep questions SIMPLE and about IDENTITY & SCHOOL. This is Week 1, so focus on basic self-introduction and school vocabulary.

IMPORTANT: Student can ask ANY question (free talk), but Ms. Nova should guide conversation toward identity and school topics when appropriate.`
  },
  
  notes: `
📚 SYLLABUS ALIGNMENT NOTES:
- This is the OFFICIAL Week 1 content from the 3-year curriculum
- Grammar Focus: Implicit teaching of "I am" pattern through superhero context
- Vocabulary: 7 core words + numbers 1-10
- Key principle: "Trojan Horse" - Grammar hidden in fun superhero story
- "Slow-Cook Principle": Focus on ONE tense (present "to be") for full week
- Zero L1: Ms. Nova uses NO Vietnamese, only English with gestures/visuals
- Assessment: Formative only, observe if student can introduce themselves naturally

🎯 TEACHING FLOW:
1. Visual Anchor: Show superhero images/video
2. TPR Introduction: Ms. Nova models "I am Ms. Nova" with gestures
3. Student Practice: Student introduces self using "I am [name]"
4. Expansion: Add age "I am [age] years old"
5. Creative Application: "I am a [adjective] hero!"

⚠️ CRITICAL: Ms. Nova must NOT teach grammar rules explicitly.
Students learn by DOING, not by studying rules.
`
};

export default week1RealData;
