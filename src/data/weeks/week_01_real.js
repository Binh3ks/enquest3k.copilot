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
      
      // Short description for UI
      scenario: `Your first day at school! Tell your teacher your name and age.`,
      
      // Context for AI (not shown to student)
      mission_context: `The student is on their first day at school. Ms. Nova is their new English teacher. This is a warm, friendly introduction where the student practices saying "I am [name]" and "I am [age] years old". Keep conversation natural and encouraging.`,
      
      // Vocabulary focus for this mission
      target_vocab: ["name", "age", "student"],
      
      // Grammar pattern to practice
      target_pattern: "I am [name/age/student]",
      
      // Topic boundaries (guide AI conversation)
      conversation_topics: [
        "Student's name",
        "Student's age",
        "Being a student",
        "Feelings about first day"
      ],
      
      // Example questions AI can ask (not hardcoded, just examples)
      example_questions: [
        "What is your name?",
        "How old are you?",
        "Are you a student?",
        "How are you today?"
      ],
      
      minimum_turns: 10,
      
      success_criteria: [
        "Uses 'I am' correctly for name",
        "States age with 'years old'",
        "Uses 'student' naturally"
      ]
    },
    {
      mission_id: 2,
      title: "What's in Your Backpack?",
      title_vi: "Có Gì Trong Ba Lô?",
      theme: "School supplies and belongings",
      
      scenario: `Show Ms. Nova what school supplies you have! Talk about your backpack, books, and notebook.`,
      
      mission_context: `The student shows and describes their school supplies. Ms. Nova is curious about what students bring to school. This mission focuses on 'I have...' pattern with school items. Encourage describing colors, sizes, and what they do with these items. Keep it natural and fun - like show-and-tell time!`,
      
      target_vocab: ["backpack", "book", "notebook"],
      
      target_pattern: "I have a [color/size] [item]",
      
      conversation_topics: [
        "Items in the backpack",
        "Colors of school supplies",
        "What books are about",
        "Writing in notebooks",
        "Organizing school things",
        "Favorite school supplies"
      ],
      
      example_questions: [
        "What do you have in your backpack?",
        "Do you have a book with you?",
        "What color is your notebook?",
        "What do you write in your notebook?",
        "How many books do you have?",
        "Do you like your backpack?"
      ],
      
      minimum_turns: 12,
      
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
      title_vi: "Gặp Gỡ Giáo Viên",
      theme: "School environment and relationships",
      
      scenario: `Talk with Ms. Nova about your teacher, school, and classroom! Share what you like about your learning environment and the people who help you learn.`,
      
      mission_context: `This is a warm conversation about the student's school relationships and environment. Ms. Nova wants to understand how the student feels about their teacher, what their classroom is like, and their overall school experience. Focus on building emotional connection to school through describing people, places, and feelings. Encourage the student to share what makes their school special and how they interact with their teacher. This mission should feel like sharing with a friend about school life. Use 'My teacher is...' and 'My school/classroom has...' patterns naturally. Ask about specific details like teacher's personality, classroom decorations, favorite spots in school, and daily school routines.`,
      
      target_vocab: ["teacher", "school", "classroom"],
      
      target_pattern: "My teacher is [adjective] / My school has... / In my classroom, there is...",
      
      conversation_topics: [
        "Teacher's personality and characteristics (kind, funny, smart, helpful)",
        "What the teacher does to help students learn",
        "Classroom setup and decorations (desks, board, posters, books)",
        "Favorite places in the school (library, playground, cafeteria)",
        "School building description (big, small, colorful, modern)",
        "Daily routines with teacher (morning greeting, lessons, activities)",
        "How the teacher makes learning fun",
        "Other people at school (principal, other teachers, friends)",
        "School rules and how students follow them",
        "Special events or activities at school",
        "What makes this school different or special",
        "Feelings about going to school each day"
      ],
      
      example_questions: [
        "Tell me about your teacher. What is your teacher like?",
        "Is your teacher kind? Is your teacher funny?",
        "What does your teacher do to help you learn?",
        "What does your classroom look like?",
        "What do you see when you walk into your classroom?",
        "Are there pictures on the walls in your classroom?",
        "Do you like your school? What do you like about it?",
        "Is your school big or small?",
        "What is your favorite place at school?",
        "What do you do with your teacher every day?",
        "Does your teacher read stories to you?",
        "What makes your teacher special?",
        "How do you feel when you see your teacher?",
        "What color are the walls in your classroom?",
        "Do you have friends in your classroom?"
      ],
      
      minimum_turns: 15,
      
      success_criteria: [
        "Uses 'My teacher is...' pattern correctly with adjectives",
        "Describes at least 2 physical features of classroom or school",
        "Uses all target vocabulary (teacher, school, classroom) naturally",
        "Expresses positive feelings about school experience",
        "Shows understanding of teacher's role in learning",
        "Demonstrates emotional connection to school environment",
        "Uses descriptive words (big, small, nice, fun, etc.)"
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
      mission_1: "Hello! I am Ms. Nova, your English teacher. I want to know about you. What is your name?",
      mission_2: "Hi there! I see you have a backpack with you. What do you have in your backpack today?",
      mission_3: "Hello again! I want to learn about your school life. Tell me about your teacher. What is your teacher like?"
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
