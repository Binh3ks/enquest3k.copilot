/**
 * ✅ WEEK 1 REAL SYLLABUS DATA
 * 
 * Source: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
 * Phase 1 - Block A: Week 1
 * 
 * This file contains the OFFICIAL syllabus content for Week 1,
 * extracted from the master curriculum document.
 * 
 * Ms. Nova MUST use this data as the source of truth for:
 * - Story Mission vocabulary
 * - Grammar patterns to teach
 * - Learning outcomes
 */

export const week1RealData = {
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
      title_vi: "Ngày Đầu Tiên Đi Học",
      theme: "Self-introduction",
      
      // Ms. Nova's direct greeting (no description)
      nova_greeting: "Hello! I am Ms. Nova, your English teacher. What is your name?",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 1 Mission 1 - First Day at School. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova is a warm new English teacher excited to meet her students. She wants to know each student's name, age, and school. OPENING: Ask student's name warmly, then move through school identity topics: age, school name, grade, friends at school. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "My name is ___" and "I am ___ years old" - model the full sentence every turn. Give scaffolding every turn: "Say: My name is ___" or "Say: I am 8 years old." VOCABULARY: name, age, school, teacher, student, grade, friend, happy, excited. STRICT FOCUS: SCHOOL IDENTITY ONLY - name, age, school, grade, friends at school. Ask one topic at a time. RECAST ERRORS: student says "Binh" → model full form: "Your name IS Binh! Great!" SAMPLE TURN: "What is your name? Say: My name is ___!" → Student: "Binh" → "Binh! Nice to meet you! How old are you? Say: I am ___ years old!" GAME FLOW: (1) Ask name → (2) Ask age → (3) Ask school name → (4) Ask grade → (5) Ask about friends. One topic per turn, model full sentence each step. FORBIDDEN: No questions about family, home activities, or preferences. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. covering name, age, school, grade, and friends. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["name", "age", "student"],
      
      // Grammar pattern to practice
      target_pattern: "I am [name/age/student]",
      
      // Topic boundaries (guide AI conversation) - STRICT LIMITS
      conversation_topics: [
        "Student's name (What is your name?)",
        "Student's age (How old are you?)",
        "Being a student (Are you a student?)",
        "First day feelings (How do you feel today?)",
        "School excitement (Are you excited about school?)",
        "Grade/Class (What grade are you in?)",
        "Friends at school (Do you have friends?)",
        "Favorite thing about school (What do you like about school?)",
        "[Optional: Student can ask Ms. Nova 1-2 questions]",
        "Simple closing (Great! Nice to meet you!)"
      ],
      
      // Example questions AI can ask (not hardcoded, just examples)
      example_questions: [
        "What is your name?",
        "How old are you?",
        "Are you a student?",
        "How are you today?",
        "Are you excited about school?",
        "What grade are you in?",
        "Do you have friends at school?"
      ],

      story_character: {
        name: "Ms. Nova",
        personality: "warm, welcoming, encouraging teacher",
        backstory: "I'm your new English teacher! I love meeting new students on their first day!",
        speaking_style: "friendly, asks simple questions, celebrates each answer",
        facts: {
          loves_students: true,
          first_day_specialist: true,
          makes_students_comfortable: true,
          asks_about_feelings: true,
          favorite_topic: "getting to know students"
        },
        role: "Welcome teacher for first day"
      },

      opening_narrative: "👋 Hello! I am Ms. Nova, your English teacher. What is your name? Say: My name is [your name] or I am [your name]",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "Basic Introduction",
          focus: "Name, age, and student identity",
          goal: "Learn student's basic information",
          phase_questions: [
            "Nice! Your name is {student_answer}! How old are you? Say: I am 7 years old or I am 8 years old",
            "Great! You are {student_answer}! Are you a student? Say: Yes, I am a student or Yes, I am",
            "Wonderful! What is your school name? Say: My school is [name] or I go to [school name]",
            "Nice school! My school is {student_answer}! How do you feel today? Say: I am happy or I am excited or I am good",
            "{student_answer}! That's wonderful! Do you like school? Say: Yes, I like school or Yes, I do"
          ]
        },
        {
          phase: "school_life",
          turns: "6-10",
          phase_name: "School Details",
          focus: "Grade, friends, and school activities",
          goal: "Explore student's school life",
          phase_questions: [
            "Great! What do you like at school? Say: I like learning or I like playing or I like friends",
            "{student_answer}! Me too! What grade are you in? Say: I am in grade 1 or I am in grade 2",
            "Perfect! Do you have friends at school? Say: Yes, I have friends or Yes, I do or No, not yet",
            "I see! What are your friends' names? Say: My friend is [name] or I have a friend named [name] or I don't have friends yet",
            "Nice! What do you play with your friends? Say: We play games or We play soccer or I play alone"
          ]
        },
        {
          phase: "first_day",
          turns: "11-15",
          phase_name: "First Day Experience",
          focus: "First day feelings and experiences",
          goal: "Discuss first day at school",
          phase_questions: [
            "{student_answer}! Fun! Is this your first day at school? Say: Yes, it is or No, it is not or Yes",
            "I see! What is your favorite thing about school? Say: I like my teacher or I like my classroom or I like learning",
            "{student_answer}! Wonderful! Are you excited about learning English? Say: Yes, I am excited or Yes, very much or Yes!",
            "That's great! I'm excited to teach you! Do you have any questions for me? Say: No, thank you or What is your name? or How old are you?",
            "Great! Nice to meet you! Welcome to our class! Say: Thank you or Nice to meet you or Goodbye"
          ]
        }
      ],
      
      minimum_turns: 10, // Flexible: Allow natural conversation flow
      maximum_turns: 12, // Soft maximum for natural closure
      
      success_criteria: [
        "Uses 'I am' correctly for name",
        "States age with 'years old'",
        "Uses 'student' naturally",
        "Engages naturally in conversation (can ask questions back)"
      ]
    },    {
      mission_id: 2,
      title: "I Spy Game",
      title_en: "I Spy Color & Size Game",
      title_vi: "Trò Chơi Tìm Đồ Vật",
      theme: "Interactive guessing game about school supplies",
      
      nova_greeting: "🔍 Let's play I Spy! I spy with my little eye... something RED! Can you find it?",
      default_hints: ["My", "pen", "is", "red"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 1 Mission 2 - I Spy Game (Color & Size Hunt). 🎮 GAME CONCEPT: Interactive "I Spy" game
Ms. Nova gives CLUES about color/size, student guesses the item! GAME FLOW:
1. Nova says: "I spy something RED!" 2. Student guesses: "My pen!" or "Pen!"
3. Nova celebrates and gives NEXT clue
4. Keep going through different colors/sizes STRICT RULES:
✅ Use "I spy something [COLOR/SIZE]!"
✅ Give clear visual clues (color, size, shape)
✅ Celebrate each correct guess enthusiastically
✅ Move to NEXT item immediately after correct guess FORBIDDEN:
❌ "Next photo" (no photos in this game!)
❌ "I see someone" (items, not people!)
❌ Asking same item twice CORRECT FORMAT:
✅ "I spy something RED! What is red?"
✅ "I spy something BIG! What is big?"
✅ "I spy something SMALL and BLUE! What is it?" HINT STRATEGY:
- Give color/size hints in suggested_hints
- Include item names: ["pen", "red", "My", "is"]
- Focus on visual descriptors VOCABULARY: backpack, book, notebook, pen, pencil, eraser, red, blue, big, small
PATTERN: "My [item] is [color/size]" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["backpack", "book", "notebook", "pen", "pencil", "eraser", "red", "blue", "big", "small"],
      grammar_pattern: "My [item] is [color/size].",

      story_character: {
        name: "Ms. Nova",
        personality: "playful, loves I Spy game, gives fun clues",
        backstory: "I love playing I Spy with school supplies! Let's find things by color and size!",
        speaking_style: "enthusiastic, uses 'I spy...' format, celebrates discoveries",
        facts: [
          "I love colorful things!",
          "I'm great at spotting details!",
          "Red is my favorite color!",
          "I spy games are the best!"
        ],
        special_rules: [
          "Always use 'I spy...' format",
          "Give color or size clues",
          "Celebrate each discovery",
          "Move to next item after correct guess"
        ]
      },
      
      opening_narrative: "🔍 Let's play I Spy! I spy with my little eye... something RED! What is red? Say: My pen is red OR My book is red",
      
      story_arc: [
        {
          phase: "intro",
          turns: "1-3",
          phase_name: "Game Start",
          focus: "Explain I Spy game",
          phase_questions: [
            "🔍 Hi! Let's play I Spy! Do you know this game? I give clues, you guess! Say: Yes! or Let's play!",
            "(After yes/let's play) Great! I spy with my little eye... something RED! What is red? Say: My pen is red or My book is red",
            "(After student says red item) Yes! {student_answer}! 🖊️ You're good at this! Now I spy something BLUE! What is blue? Say: My notebook is blue or My backpack is blue"
          ]
        },
        {
          phase: "color_hunt",
          turns: "4-7",
          phase_name: "Colors Hunt",
          focus: "Find items by color",
          phase_questions: [
            "(After blue item) Perfect! {student_answer}! 📘 Now I spy something BIG! What is big in your backpack? Say: My book is big or My backpack is big",
            "(After big item) Excellent! {student_answer}! Now I spy something SMALL! What is small? Say: My eraser is small or My pencil is small",
            "(After small item) Yes! {student_answer}! 🎯 Last one - I spy something GREEN or YELLOW! Do you have green or yellow? Say: My pencil is green or I have a yellow book or I don't have green",
            "(After color answer) {student_answer}! Wonderful! You found all the items! 🌈"
          ]
        },
        {
          phase: "closing",
          turns: "8-10",
          phase_name: "Celebration",
          focus: "Celebrate success",
          phase_questions: [
            "You're an I Spy champion! 🏆 What's your FAVORITE item in your backpack? Say: I love my [item] or My favorite is [item]",
            "(After favorite) {student_answer}! Me too! Thanks for playing I Spy with me! Say: Thank you! or Goodbye! or That was fun!",
            "(After thanks) Goodbye! See you next time! 👋"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12
    },    {
      mission_id: 3,
      title: "Show and Tell",
      title_en: "Show and Tell - Present Your Items",
      title_vi: "Thuyết Trình Đồ Dùng",
      theme: "Presentation game - student presents their school items",
      
      nova_greeting: "🎤 Time for Show and Tell! Pick one thing from your backpack and tell me about it!",
      default_hints: ["My", "book", "is", "big", "blue"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 1 Mission 3 - Show and Tell (Presentation Game). 🎮 GAME CONCEPT: Student PRESENTS their school items like Show and Tell
Different from Week 2 grammar game - this is about PRESENTING and DESCRIBING! GAME FLOW:
1. Nova asks: "Pick something from your backpack!"
2. Student chooses: "My book!"
3. Nova asks: "Tell me about your book! What color is it?"
4. Student describes: "My book is blue!"
5. Nova asks follow-up: "What size? Big or small?"
6. Continue with DIFFERENT items STRICT RULES:
✅ Student CHOOSES which item to present
✅ Ask about COLOR, SIZE, and USE
✅ Move to DIFFERENT item after 2-3 questions
✅ Encourage full sentences: "My book is big" FORBIDDEN:
❌ Grammar correction (that's Week 2!)
❌ "My vs Your" errors (no error correction!)
❌ Asking about same item too long CORRECT FORMAT:
✅ "Pick something from your backpack!"
✅ "Tell me about your [item]! What color is it?"
✅ "Wow! What else do you have? Show me another thing!" QUESTION PATTERNS:
- "What color is your [item]?" - "Is it big or small?"
- "What do you use it for?"
- "Do you like your [item]?" VOCABULARY: backpack, book, notebook, pen, pencil, eraser, ruler, big, small, red, blue, green
PATTERN: "My [item] is [color/size]. I use it for [purpose]." Do NOT ask another question on the last turn.`,
      
      target_vocab: ["backpack", "book", "notebook", "pen", "pencil", "eraser", "ruler", "big", "small", "red", "blue"],
      grammar_pattern: "My [item] is [adjective]. I use it for...",

      story_character: {
        name: "Ms. Nova",
        personality: "encouraging teacher, loves presentations, asks follow-up questions",
        backstory: "I love Show and Tell! Everyone's items are interesting! Tell me everything!",
        speaking_style: "supportive, asks clarifying questions, encourages details",
        facts: [
          "I love hearing students present!",
          "Every item has a story!",
          "Colors make things interesting!",
          "Show and Tell is my favorite!"
        ],
        special_rules: [
          "Let student CHOOSE items",
          "Ask about color, size, use",
          "Encourage full sentences",
          "Move to different items after 2-3 questions"
        ]
      },
      
      opening_narrative: "🎤 It's Show and Tell time! Pick something from your backpack and tell me about it! What do you want to show? Say: My book OR My pen",
      
      story_arc: [
        {
          phase: "intro",
          turns: "1-2",
          phase_name: "Game Start",
          focus: "Explain Show and Tell",
          phase_questions: [
            "🎤 Hi! It's Show and Tell time! Pick something from your backpack! What do you want to show me? Say: My book or My pen or My notebook",
            "(After student picks item) Great choice! Your {student_answer}! Now tell me - what COLOR is your {student_answer}? Say: My {student_answer} is [color] or It is [color]"
          ]
        },
        {
          phase: "item_1",
          turns: "3-6",
          phase_name: "First Item",
          focus: "Describe first item fully",
          phase_questions: [
            "(After color) {student_answer}! Beautiful! Is your {item} BIG or SMALL? Say: It is big or It is small or My {item} is big",
            "(After size) Perfect! {student_answer}! What do you USE your {item} for? Say: I use it for writing or I use it for reading or For writing",
            "(After use) Wonderful! {student_answer}! Your {item} is very useful! 📚 Now show me something DIFFERENT! What else do you have? Say: My [different item]"
          ]
        },
        {
          phase: "item_2",
          turns: "7-10",
          phase_name: "Second Item",
          focus: "Present second item",
          phase_questions: [
            "(After item 2) Nice! Your {student_answer}! What COLOR is it? Say: It is [color] or My {student_answer} is [color]",
            "(After color) {student_answer}! Good! Is it BIG or SMALL? Say: It is big or It is small",
            "(After size) Perfect! {student_answer}! Do you LIKE your {item}? Say: Yes, I like it or I love it! or Yes!",
            "(After like) {student_answer}! Great! ONE more item! Show me one more thing! Say: My [item]"
          ]
        },
        {
          phase: "item_3",
          turns: "11-13",
          phase_name: "Quick Round",
          focus: "One more item quickly",
          phase_questions: [
            "(After item 3) Your {student_answer}! Quickly - what COLOR? Say: It is [color]",
            "(After color) {student_answer}! Excellent! 🎉 You presented THREE items! Amazing!"
          ]
        },
        {
          phase: "closing",
          turns: "14-16",
          phase_name: "Celebration",
          focus: "Wrap up presentation",
          phase_questions: [
            "You presented so well! 👏 What's your FAVORITE item in your backpack? Say: My favorite is [item] or I love my [item]",
            "(After favorite) {student_answer}! Great choice! Thank you for your presentation! Say: Thank you! or Goodbye! or That was fun!",
            "(After thanks) Goodbye! Great job today! 🌟"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12
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

  // === AI RESPONSE FORMAT CONTRACT (V28 standard) ===
  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Nice!", "Great!", "Wonderful!", "Good job!", "Perfect!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror student's subject (if they say 'I', use 'I' in recast)",
      "Fix grammar naturally without explanation",
      "Keep it conversational and encouraging"
    ],
    question_patterns_allowed: [
      "What is...?",
      "Is...?",
      "Do you...?",
      "Are you...?",
      "Can you...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "I Alex.",
        tutor_response: "Nice! I AM Alex. That is a great name! How old are you?"
      },
      {
        student: "My bag have book.",
        tutor_response: "Great! My bag HAS a book. What else is in your bag?"
      },
      {
        student: "Teacher is nice.",
        tutor_response: "Wonderful! My teacher IS nice. What is your teacher's name?"
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
`,

  conversation_cards: [
    {
      id: "hello_nova",
      title: "Hello, Ms. Nova!",
      emoji: "👋",
      theme: "Greetings & Self-Introduction",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Hi! I am Ms. Nova! What is your name? Say: My name is ___",
          student_template: "My name is {NAME}",
          accept: ["My name is", "I am", "I'm", "name"]
        },
        {
          ai: "Nice to meet you! How old are you? Say: I am ___ years old",
          fill_blank: "I am ___ years old",
          accept_words: ["years old", "I am"]
        },
        {
          ai: "Wow! Where are you from? Say: I am from ___",
          fill_blank: "I am from ___",
          accept_words: ["Vietnam", "Hanoi", "Ho Chi Minh", "Saigon", "my city", "from"]
        },
        {
          ai: "Great! Are you a student? Say: I am a ___!",
          fill_blank: "I am a ___",
          accept_words: ["student", "learner", "I am", "am a"]
        },
        {
          ai: "Wonderful! Can you say hello in English? Say: Hello! My name is ___",
          student_template: "Hello! My name is {NAME}",
          accept: ["Hello", "Hi", "My name", "I am"]
        }
      ],
      completion_message: "Amazing! You can introduce yourself in English! 🎉 You said your name and age!"
    },
    {
      id: "hero_identity",
      title: "My Hero Identity",
      emoji: "🦸",
      theme: "Superheroes & Adjectives",
      difficulty: "medium",
      exchanges: [
        {
          ai: "You are a superhero today! What is your hero name? Say: My hero name is ___",
          student_template: "My hero name is {NAME}",
          accept: ["My hero name is", "My name is", "I am"]
        },
        {
          ai: "Cool! What is your superpower? Choose: I can fly or I can run fast or I can be invisible",
          options: ["I can fly", "I can run fast", "I can be invisible"]
        },
        {
          ai: "Awesome! Heroes are strong and brave! What are you? Say: I am ___!",
          fill_blank: "I am ___",
          accept_words: ["strong", "fast", "brave", "smart", "tall", "kind", "I am"]
        },
        {
          ai: "What color is your hero suit? Say: My suit is ___",
          fill_blank: "My suit is ___",
          accept_words: ["red", "blue", "green", "yellow", "black", "white", "purple", "orange"]
        },
        {
          ai: "Who do you save? Choose: I save animals or I save people or I save the Earth",
          options: ["I save animals", "I save people", "I save the Earth"]
        },
        {
          ai: "Introduce your hero! Say: I am ___ and I can ___",
          accept: ["I am", "I can", "and"]
        }
      ],
      completion_message: "Super! You created your hero identity! 🦸‍♂️ You used: I am, I can, and adjectives!"
    },
    {
      id: "find_a_friend",
      title: "Finding a New Friend",
      emoji: "🤝",
      theme: "Meeting Someone New",
      difficulty: "medium",
      exchanges: [
        {
          ai: "You meet a new friend at school! Say hello and your name: Hello! I am ___",
          student_template: "Hello! I am {NAME}",
          accept: ["Hello", "Hi", "I am", "My name"]
        },
        {
          ai: "Your new friend asks: How old are you? Answer with: I am ___ years old!",
          fill_blank: "I am ___ years old",
          accept_words: ["years old", "I am"]
        },
        {
          ai: "Your friend says 'I like English!' Do you like English? Choose: Yes, I like English! or English is fun!",
          options: ["Yes, I like English!", "English is fun!"]
        },
        {
          ai: "Your friend asks: What is your favourite colour? Say: My favourite colour is ___",
          fill_blank: "My favourite colour is ___",
          accept_words: ["red", "blue", "green", "yellow", "pink", "purple", "favourite", "color", "colour"]
        },
        {
          ai: "Time to say goodbye! Choose: Goodbye! or See you later! or Bye bye!",
          options: ["Goodbye!", "See you later!", "Bye bye!"]
        }
      ],
      completion_message: "Fantastic! You made a new friend in English! 👏 You used: Hello, I am, I like, and Goodbye!"
    }
  ]
};

export default week1RealData;
