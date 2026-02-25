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
      
      // Context for AI (not shown to student)
      mission_context: `The student is on their first day at school. Ms. Nova is their new English teacher. This is a warm, friendly introduction where the student practices saying "I am [name]" and "I am [age] years old". Keep conversation natural and encouraging. ONLY ask about name, age, and being a student. DO NOT ask about backpack, books, or other school supplies - those are for Mission 2.

⚡ FLEXIBLE CONVERSATION:
- If student asks YOU questions → Answer naturally like a human friend, then bridge back to mission
- Allow 12-15 turns if conversation is interactive (student asking questions is GOOD!)
- If student goes off-topic → Acknowledge warmly, then naturally redirect: "That's interesting! At SCHOOL, what do you like to do?"
- Be human-like: answer questions fully, don't rush through topics`,
      
      // Vocabulary focus for this mission (ONLY basic identity)
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
      
      minimum_turns: 15, // Flexible: Allow natural conversation flow
      maximum_turns: 20, // Soft maximum for natural closure
      
      success_criteria: [
        "Uses 'I am' correctly for name",
        "States age with 'years old'",
        "Uses 'student' naturally",
        "Engages naturally in conversation (can ask questions back)"
      ]
    },
    {
      mission_id: 2,
      title: "What's in Your Backpack?",
      title_vi: "Có Gì Trong Ba Lô?",
      theme: "School supplies and belongings",
      
      // Ms. Nova's direct greeting (no description)
      nova_greeting: "Hi there! I see you have a backpack with you. What do you have in your backpack today?",
      
      mission_context: `The student shows their school supplies. Ms. Nova is curious about what students bring to school. This mission focuses on 'I have...' pattern with simple school items. Use VERY SIMPLE language suitable for A0-A1 ESL beginners. Keep questions short and clear.

⚡ FLEXIBLE CONVERSATION:
- If student asks YOU questions → Answer naturally ("I don't need a backpack, I'm a digital teacher!"), then continue
- Allow natural back-and-forth (12-15 turns if interactive)
- If off-topic → Redirect gently: "That's cool! What do you have IN YOUR BACKPACK?"
- Be conversational, not robotic

🎯 CRITICAL - MISSION TOPIC: 
- This mission is ONLY about BACKPACK and SCHOOL SUPPLIES
- DO NOT ask about "school" in general (that's Mission 1 & 3)
- DO NOT ask "Are you excited about school?" (wrong mission!)
- ONLY ask about: backpack, books, notebook, what's inside, colors, heavy/light, new/old
- Stay focused: "Your BACKPACK", "What's IN your backpack?", "Do you like your BACKPACK?"`,
      
      target_vocab: ["backpack", "book", "notebook"],
      
      target_pattern: "I have a [item]",
      
      conversation_topics: [
        "Do you have a backpack?",
        "What color is your backpack?",
        "Do you have books in your backpack?",
        "Do you have a notebook?",
        "What do you put in your backpack?",
        "Do you like your backpack?",
        "Is your backpack heavy or light?",
        "Is your backpack new or old?",
        "[Optional: Student can ask Ms. Nova 1-2 questions about school supplies]",
        "Simple closing (Your backpack is great! Goodbye!)"
      ],
      
      example_questions: [
        "Do you have a backpack?",
        "What color is your backpack?",
        "Do you have books in your backpack?",
        "Do you have a notebook?",
        "Do you like your backpack?",
        "Is your backpack heavy?",
        "Is your backpack new?"
      ],
      
      minimum_turns: 15, // Flexible: Allow natural conversation flow
      maximum_turns: 20, // Soft maximum for natural closure
      
      success_criteria: [
        "Uses 'I have' pattern correctly",
        "Names at least 2 school supplies",
        "Describes items with colors or adjectives",
        "Shows engagement with school supplies",
        "Can ask and answer questions naturally"
      ]
    },
    {
      mission_id: 3,
      title: "Meeting Your Teacher",
      title_vi: "Gặp Gỡ Giáo Viên",
      theme: "School environment and relationships",
      
      // Ms. Nova's direct greeting (no description)
      nova_greeting: "Hello again! I want to learn about your school. Tell me about your teacher. What is your teacher like?",
      
      mission_context: `This is a simple conversation about the student's teacher and school. Ms. Nova wants to know basic information about their learning environment. Use VERY SIMPLE language suitable for A0-A1 ESL beginners. Focus on basic descriptions with 'My teacher is...' pattern. Keep all questions short and clear.

⚡ FLEXIBLE CONVERSATION:
- If student asks about YOUR teacher/school → Answer naturally ("I teach online, so my classroom is digital!"), then ask them back
- Allow 12-15 turns if student is curious and asks questions
- If off-topic (e.g., talks about home) → Bridge naturally: "That sounds nice! At YOUR SCHOOL, what is your favorite place?"
- Make it feel like a real conversation between humans`,
      
      target_vocab: ["teacher", "school", "classroom"],
      
      target_pattern: "My teacher is [adjective] / My school is [adjective]",
      
      conversation_topics: [
        "Is your teacher nice?",
        "Is your teacher funny?",
        "Do you like your teacher?",
        "What is your teacher's name?",
        "Is your school big?",
        "Do you like your school?",
        "Is your classroom nice?",
        "Do you have many classmates?",
        "[Optional: Student can ask Ms. Nova 1-2 questions about teachers/school]",
        "Simple closing (Your teacher sounds wonderful!)"
      ],
      
      example_questions: [
        "Is your teacher nice?",
        "Is your teacher funny?",
        "Do you like your teacher?",
        "Is your teacher a man or woman?",
        "Is your school big or small?",
        "Do you like your school?",
        "Is your classroom big?",
        "Do you have friends at school?"
      ],
      
      minimum_turns: 15, // Flexible: Allow natural conversation flow
      maximum_turns: 20, // Soft maximum for natural closure
      
      success_criteria: [
        "Uses 'My teacher is...' pattern correctly with adjectives",
        "Describes at least 2 physical features of classroom or school",
        "Uses all target vocabulary (teacher, school, classroom) naturally",
        "Expresses positive feelings about school experience",
        "Shows understanding of teacher's role in learning",
        "Demonstrates emotional connection to school environment",
        "Uses descriptive words (big, small, nice, fun, etc.)",
        "Can ask and answer questions naturally"
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
