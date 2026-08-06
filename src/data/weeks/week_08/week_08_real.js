const week8RealData = {
  // === METADATA ===
  week_id: 8,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 8,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 8: The Busy Classroom",
  week_title_en: "The Busy Classroom (Plural)",
  week_title_vi: "Lớp học Bận rộn (Số nhiều)",
  
  topic: "Classroom items — Counting and stating what exists (plural)",
  topic_vi: "Đồ dùng lớp học — Đếm và nêu sự tồn tại (số nhiều)",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Count and state what exists using 'There are...' for plural items",
  learning_outcome_vi: "Đếm và nêu sự tồn tại bằng 'There are...' cho vật số nhiều",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "There are... (Plural)",
  grammar_pattern: "There are [number] [plural nouns] in the the park",
  grammar_examples: [
    "There are 20 desks in the classroom.",
    "There are 3 markers on the board.",
    "There are many pencils in the bag.",
    "There are students in the classroom."
  ],
  
  // === TARGET VOCABULARY (10 CLASSROOM ITEMS) ===
  target_vocab: [
    {
      word: "desk",
      pronunciation: "/desk/",
      definition_vi: "bàn học",
      definition_en: "a table for studying or working at school",
      example: "There are 20 desks in our classroom.",
      syllabus_context: "Classroom furniture"
    },
    {
      word: "pencil",
      pronunciation: "/ˈpen.səl/",
      definition_vi: "bút chì",
      definition_en: "a thin stick used for writing or drawing",
      example: "There are pencils in my pencil case.",
      syllabus_context: "Writing tools"
    },
    {
      word: "student",
      pronunciation: "/ˈstuː.dənt/",
      definition_vi: "học sinh",
      definition_en: "a person who learns at school",
      example: "There are 30 students in my class.",
      syllabus_context: "People"
    },
    {
      word: "bag",
      pronunciation: "/bæɡ/",
      definition_vi: "túi, ba lô",
      definition_en: "a container carried on your back or in your hand",
      example: "There are bags on the floor.",
      syllabus_context: "Storage items"
    },
    {
      word: "marker",
      pronunciation: "/ˈmɑːr.kər/",
      definition_vi: "bút lông",
      definition_en: "a thick pen used on boards or paper",
      example: "There are 5 markers on the board.",
      syllabus_context: "Writing tools"
    },
    {
      word: "chair",
      pronunciation: "/tʃer/",
      definition_vi: "ghế",
      definition_en: "a piece of furniture you sit on",
      example: "There are many chairs in the classroom.",
      syllabus_context: "Classroom furniture"
    },
    {
      word: "board",
      pronunciation: "/bɔːrd/",
      definition_vi: "bảng",
      definition_en: "a flat surface on the wall for writing",
      example: "There are words on the board.",
      syllabus_context: "Classroom equipment"
    },
    {
      word: "paper",
      pronunciation: "/ˈpeɪ.pər/",
      definition_vi: "tờ giấy",
      definition_en: "thin flat sheets used for writing or drawing",
      example: "There are papers on my desk.",
      syllabus_context: "Writing materials"
    },
    {
      word: "shelf",
      pronunciation: "/ʃelf/",
      definition_vi: "kệ sách",
      definition_en: "a flat board fixed to a wall to put things on",
      example: "There are books on the shelf.",
      syllabus_context: "Storage furniture"
    },
    {
      word: "crayon",
      pronunciation: "/ˈkreɪ.ɑːn/",
      definition_vi: "bút sáp màu",
      definition_en: "a colored stick used for drawing",
      example: "There are crayons in the art box.",
      syllabus_context: "Art tools"
    }
  ],
  
  global_vocab: ["desk", "pencil", "student", "bag", "marker", "chair", "board", "paper", "shelf", "crayon"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and counting-obsessed",
    tone: "Energetic, loves numbers and counting, excited about classrooms",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Nova! Today we count EVERYTHING in our classroom! I love counting! Let's start! How many desks do you see? Say: There are... desks.",
      mission_2: "Wow! Look at our supply shelf! It is SO full! Let's count everything together! Ready? Say: There are many things here!",
      mission_3: "I have a game! I will give you clues about our classroom. You guess how many! Ready? There are MORE THAN 10 of this thing. It is something you sit on. Say: There are... chairs!"
    },
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use 'There are [plural noun]' - Week 8 grammar scope",
      "Always encourage correct use of plural -s endings"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct plural form naturally",
    recast_example: {
      student: "There is many desk.",
      nova_recast: "Great idea! There ARE many DESKS! Say: There are desks. What else can you count?"
    },
    vocabulary_scaffolding: [
      "Mission 1: desk, chair, student, bag - large visible classroom items",
      "Mission 2: pencil, marker, crayon, paper, shelf - supply items",
      "Mission 3: combine all vocab with numbers in 'There are [n] [plural nouns]' guessing game"
    ],
    questioning_skill: [
      "How many desks are there?",
      "Are there many students?",
      "How many bags do you see?",
      "There are... how many chairs?",
      "What else can you count?"
    ],
    must_use_vocab: ["desk", "pencil", "student", "bag", "marker", "chair", "board", "paper"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Singular 'There is' when plural is needed"
    ]
  },

  // === AI RESPONSE FORMAT CONTRACT (V28 standard) ===
  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Nice!", "Great!", "Wonderful!", "Good job!", "Perfect!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student's key word back in the recast",
      "Fix grammar naturally without explanation",
      "Keep it conversational and encouraging",
      "Fix singular → plural errors naturally (desk → desks)"
    ],
    question_patterns_allowed: [
      "How many...?",
      "Are there...?",
      "What else...?",
      "Can you count...?",
      "What do you see...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "There is desk.",
        tutor_response: "Great! There ARE desks! Say: There are desks in the classroom. How many desks?"
      },
      {
        student: "There are many student.",
        tutor_response: "Nice! There are many STUDENTS! Say: There are 30 students. What else?"
      },
      {
        student: "There are 5 marker.",
        tutor_response: "Wonderful! There are 5 MARKERS! Perfect plural! Can you count the chairs?"
      }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "Classroom Count",
      title_vi: "Đếm Đồ Trong Lớp",
      theme: "Counting Classroom Items",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Nova",
        personality: "Energetic teacher who loves counting and organizing",
        backstory: "Nova checks the classroom every Monday morning and counts everything!",
        speaking_style: "Enthusiastic, counts things one by one, celebrates when students count correctly",
        facts: {
          loves_counting: true,
          has_classroom: true,
          favorite_number: 30,
          classroom_is_big: true,
          always_organized: true,
          checks_supplies: true
        }
      },
      
      // 🎬 OPENING NARRATIVE
      opening_narrative: "Hi! I'm Nova! Every Monday I count everything in our classroom! Let's count together! What is your name? Say: My name is Alex",
      
      nova_greeting: "Hi! Let's count everything in our classroom!", // DEPRECATED
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 8 Mission 1 - Classroom Count. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova counts classroom items every Monday morning. OPENING: Ask student's name, then say "Let's count our classroom! There are 20 desks here. How many chairs? Say: There are... chairs." STRICT GAME RULES: 1. ONLY use "There are [plural]" pattern. 2. Student MUST say "There are [number/many] [plural noun]." 3. If student gives singular, recast naturally: "There ARE DESKS! Say: There are desks." 4. Ask about ONE item per question. VOCABULARY TARGET: desk, chair, student, bag, marker, board, paper, pencil, shelf, crayon. ALLOWED QUESTIONS: "How many desks?", "Are there many chairs?", "How many students?", "What do you see?". GRAMMAR ENFORCEMENT: Every answer must practice "There are [plural]" - recast all errors. GAME MECHANIC: Ask about ONE classroom item per turn → student says "There are [number] [plural]" → confirm/recast → ask about next item. FORBIDDEN: Do NOT use singular "There is" for countable items. NEVER say "Tell me more!" as filler. AVOID: Multiple items per turn. Cover at least 5 different items. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["desk", "chair", "student", "bag", "board", "marker"],
      
      grammar_pattern: "There are [number/many] [plural nouns] in the classroom",
      
      // 📖 STORY ARC
      story_arc: [
        {
          phase: "introduction",
          turns: "1-4",
          goal: "Start counting, first classroom items with scaffolding",
          required_vocab: [],
          phase_questions: [
            {
              template: "(After name) {student_answer}! Great name! Let's start counting! Look around! How many desks do you see? Say: There are 20 desks or There are many desks",
              hints: ["There", "are", "desks", "20", "many"]
            },
            {
              template: "(After desks) {student_answer}! Good counting! Now chairs! How many chairs can you count? Say: There are 20 chairs or There are many chairs",
              hints: ["There", "are", "chairs", "20", "many"]
            },
            {
              template: "(After chairs) {student_answer}! Great! Look at the students! How many students are in the class? Say: There are 30 students or There are many students",
              hints: ["There", "are", "students", "30", "many"]
            },
            {
              template: "(After students) {student_answer}! Perfect counting! Look at the bags on the floor! How many bags? Say: There are many bags or There are 30 bags",
              hints: ["There", "are", "bags", "many", "30"]
            }
          ]
        },
        {
          phase: "item_count",
          turns: "5-12",
          goal: "Count more items with full sentence practice",
          required_vocab: ["desk", "chair", "student", "bag", "marker"],
          phase_questions: [
            {
              template: "Look at the board! How many markers do you see? Say: There are 5 markers or There are markers",
              hints: ["There", "are", "markers", "5", "many"]
            },
            {
              template: "Look at the shelf! How many books are there? Say: There are books on the shelf or There are many books",
              hints: ["There", "are", "books", "many", "on", "shelf"]
            },
            {
              template: "How many papers do you see on the desks? Say: There are papers or There are many papers",
              hints: ["There", "are", "papers", "many"]
            },
            {
              template: "Look inside the art box! Can you see crayons? Say: There are crayons or There are many crayons",
              hints: ["There", "are", "crayons", "many"]
            },
            {
              template: "Now look at the pencils! How many pencils? Say: There are pencils or There are many pencils",
              hints: ["There", "are", "pencils", "many", "30"]
            },
            {
              template: "Look at the shelves on the wall! What is on the shelves? Say: There are books or There are papers",
              hints: ["There", "are", "books", "papers", "on", "shelves"]
            },
            {
              template: "Count the windows! How many windows? Say: There are 2 windows or There are windows",
              hints: ["There", "are", "windows", "2", "many"]
            },
            {
              template: "Great counting! What is your favorite item in the classroom? Say: There are... in our classroom",
              hints: ["There", "are", "desks", "chairs", "books", "in", "our", "classroom"]
            }
          ]
        },
        {
          phase: "comparison",
          turns: "13-16",
          goal: "Compare quantities using There are more / fewer",
          required_vocab: [],
          phase_questions: [
            {
              template: "Are there more desks or chairs? Say: There are more desks or There are more chairs",
              hints: ["There", "are", "more", "desks", "chairs"]
            },
            {
              template: "Are there many or few crayons? Say: There are many crayons or There are a few crayons",
              hints: ["There", "are", "many", "few", "crayons"]
            },
            {
              template: "What are there more of: pencils or markers? Say: There are more pencils or There are more markers",
              hints: ["There", "are", "more", "pencils", "markers"]
            },
            {
              template: "Are there books on the shelf? Say: Yes, there are books or No, there are no books",
              hints: ["Yes", "there", "are", "books", "No", "no", "books"]
            }
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          goal: "Wrap up the classroom count",
          required_vocab: [],
          phase_questions: [
            {
              template: "Wow! Our classroom has SO many things! Great counting job!",
              hints: ["Thank", "you", "Yes", "Great"]
            },
            {
              template: "See you next Monday morning! Goodbye! Say: Goodbye!",
              hints: ["Goodbye", "Yes", "Bye", "See", "you"]
            }
          ]
        }
      ],
      
      minimum_turns: 8,
      maximum_turns: 12,
      expected_duration: "15+ minutes"
    },
    {
      mission_id: 2,
      title: "The Supply Shelf",
      title_vi: "Kệ Đồ Dùng",
      theme: "Counting Supplies",
      
      nova_greeting: "Let's find and count all the supplies!", // DEPRECATED
      default_hints: ["There", "are", "pencils"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 8 Mission 2 - The Supply Shelf. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ITEMS using HOW MANY questions. GRAMMAR: "There are [number/many] [plural]" pattern. Give FULL scaffolding: "Say: There are pencils" or "Say: There are 5 markers". VOCABULARY: desk, pencil, student, bag, marker, chair, board, paper, shelf, crayon. STRICT FOCUS: ITEM COUNTING ONLY - Every question must be about HOW MANY of something. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?". ONLY allowed questions: "How many [plural]?", "Are there many [plural]?", "What do you see?". GAME MECHANIC: Point to ONE shelf item per turn → student says "There are [number] [plural]" → confirm/recast → point to next item. NEVER ask about preferences - ONLY COUNT ITEMS WITH "There are...". Do NOT ask another question on the last turn.`,
      
      target_vocab: ["pencil", "marker", "crayon", "paper", "shelf"],
      
      grammar_pattern: "There are [number] [plural nouns]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Nova",
        personality: "Organized teacher who loves a tidy supply shelf",
        backstory: "Nova organizes the supply shelf every week! She needs help counting everything!",
        speaking_style: "Systematic, counts compartment by compartment, very excited about orderly supplies",
        facts: {
          loves_organizing: true,
          has_supply_shelf: true,
          favorite_supply: "markers",
          shelf_is_colorful: true,
          classes_of_students: 3,
          loves_art: true
        },
        role: "Teacher organizing the supply shelf and counting items"
      },

      opening_narrative: "Hi! I'm Nova! Look at our supply shelf! There are SO MANY things! Help me count! How many pencils are there? Say: There are...",

      story_arc: [
        {
          phase: "start",
          turns: "1-4",
          phase_name: "Open the Shelf!",
          focus: "Find and count first supply items",
          phase_questions: [
            "(Point at pencil box) How many pencils? There are so many! Say: There are many pencils or There are 30 pencils",
            "(Open marker box) Look at the colors! How many markers? Say: There are 8 markers or There are markers",
            "(Open crayon box) So colorful! How many crayons? Say: There are many crayons or There are 12 crayons",
            "(Pick up papers) Look at all this paper! How many papers? Say: There are many papers or There are papers"
          ],
          example_answers: [
            "There are many pencils",
            "There are 8 markers",
            "There are many crayons",
            "There are many papers"
          ]
        },
        {
          phase: "more_supplies",
          turns: "5-12",
          phase_name: "More Things to Count!",
          focus: "Count more supply items",
          phase_questions: [
            "(Look at erasers) Can you see the erasers? How many? Say: There are erasers or There are 10 erasers",
            "(Find the rulers) Look here! Long thin things! How many? Say: There are rulers or There are 5 rulers",
            "(See pencil cases) Students leave their pencil cases! How many? Say: There are pencil cases or There are many pencil cases",
            "(Check bags on hooks) Look at the bags on the hooks! How many bags? Say: There are bags or There are many bags",
            "(Count shelves) How many shelves are on the wall? Say: There are 3 shelves or There are shelves",
            "(Look at books) There are so many books! Can you count them? Say: There are many books or There are books",
            "(Count art supplies) Look at all the art box! What is in it? Say: There are crayons and markers",
            "(Final count) OK last count! How many supplies are on the shelf? Say: There are many supplies or There are lots of supplies"
          ],
          example_answers: [
            "There are erasers",
            "There are rulers",
            "There are many pencil cases",
            "There are many bags",
            "There are 3 shelves",
            "There are many books",
            "There are crayons and markers",
            "There are many supplies"
          ]
        },
        {
          phase: "organize",
          turns: "13-16",
          phase_name: "Organize the Shelf",
          focus: "Put things away in the right place",
          phase_questions: [
            "Let's put pencils on the shelf! Are there enough pencils for everyone? Say: Yes, there are enough or No, there are not enough",
            "Are there more markers or crayons? Say: There are more markers or There are more crayons",
            "Are there papers for the whole class? Say: Yes, there are papers for everyone or No, there are not enough",
            "Is the shelf full now? Say: Yes, there are many things on the shelf or No, there are not many things"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Shelf is Ready!",
          focus: "Celebrate organized supply shelf",
          phase_questions: [
            "Wonderful! The supply shelf is organized! There are supplies for everyone!",
            "Great job counting! You know how to say There are! Goodbye! See you tomorrow!"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Counting Game",
      title_vi: "Trò Chơi Đếm Số",
      theme: "Number Guessing Game",
      
      nova_greeting: "Let's play a counting guessing game!", // DEPRECATED
      default_hints: ["There", "are", "chairs"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 8 Mission 3 - The Counting Game. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about QUANTITIES. GRAMMAR: "There are [number] [plural]" pattern. Give FULL scaffolding. VOCABULARY: desk, pencil, student, bag, marker, chair, board, paper, shelf, crayon. GAME MECHANIC: Nova gives 2 clues about an item count → student guesses "There are [number] [plural]" → confirm/recast → next item. NEVER ask about preferences - ONLY GUESS QUANTITIES WITH "There are...". SCAFFOLD: Give hint "Say: There are three pencils!" or "Say: There are five books!" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["desk", "pencil", "student", "bag", "marker", "chair", "board", "paper", "shelf", "crayon"],
      
      grammar_pattern: "There are [number] [plural nouns] in the classroom",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Nova",
        personality: "Playful teacher, loves number clue games",
        backstory: "Nova thinks counting is more fun when it's a guessing game! She gives clues and students guess!",
        speaking_style: "Mysterious, gives two number clues, waits excitedly for the correct answer",
        facts: {
          loves_games: true,
          classroom_size: "medium",
          favorite_game: "number guessing",
          tricky_clues: true,
          patient_teacher: true
        },
        role: "Teacher giving clues for students to guess quantities"
      },

      opening_narrative: "Look! I have a game for you! I give you clues. You tell me: There are HOW MANY? Ready? Clue 1: MORE THAN 10. Clue 2: You SIT on these. Say: There are... chairs!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Guess the Count!",
          focus: "First counting clues with full scaffolding",
          phase_questions: [
            "Clue 1: More than 10. Clue 2: You sit on these. Say: There are many chairs or There are 20 chairs",
            "Clue 1: About 30. Clue 2: They learn here. Say: There are 30 students or There are many students",
            "Clue 1: About 20. Clue 2: You write on these. Say: There are 20 desks or There are many desks",
            "Clue 1: Only a few (3-5). Clue 2: You write with these on the board. Say: There are 3 markers or There are 5 markers"
          ],
          example_answers: [
            "There are many chairs",
            "There are 30 students",
            "There are 20 desks",
            "There are 5 markers"
          ]
        },
        {
          phase: "harder_clues",
          turns: "5-12",
          phase_name: "Harder Clues!",
          focus: "Count with more challenging clues",
          phase_questions: [
            "Clue 1: Each student has one. Clue 2: You put things inside. Say: There are many bags or There are 30 bags",
            "Clue 1: A big flat thing. Clue 2: There is only 1 or 2. Clue 3: The teacher writes on it. Say: There is a board or There are 2 boards",
            "Clue 1: Very thin and flat. Clue 2: You write on these. Clue 3: There are MANY! Say: There are many papers or There are papers",
            "Clue 1: Small and colored. Clue 2: You draw with these. Clue 3: There are about 12. Say: There are 12 crayons or There are crayons",
            "Clue 1: Long and thin. Clue 2: You write with these. Clue 3: Not pens - these have erasers on them! Say: There are pencils or There are many pencils",
            "Clue 1: Fixed to the wall. Clue 2: Books sit on these. Clue 3: There are 3 or 4. Say: There are 3 shelves or There are 4 shelves",
            "Clue 1: You use it to erase. Clue 2: Small and pink or white. Clue 3: Many in the pencil case. Say: There are erasers or There are many erasers",
            "Clue 1: This is the last one! Clue 2: What can you count in OUR classroom? Say: There are... in our classroom"
          ],
          example_answers: [
            "There are many bags",
            "There are 2 boards",
            "There are many papers",
            "There are 12 crayons",
            "There are many pencils",
            "There are 3 shelves",
            "There are many erasers",
            "There are many things in our classroom"
          ]
        },
        {
          phase: "verification",
          turns: "13-16",
          phase_name: "Check Your Answers",
          focus: "Review counting answers",
          phase_questions: [
            "Let's check! Are there more students or desks? Say: There are more students or There are more desks",
            "Are there many supplies in the classroom? Say: Yes, there are many supplies or No, there are not many",
            "In our classroom, are there bags? Say: Yes, there are bags or No, there are no bags",
            "What are there the most of in our classroom? Say: There are many students or There are many pencils"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Counting Champion!",
          focus: "Celebrate counting skills",
          phase_questions: [
            "You are a counting champion! You can say There are for everything!",
            "Great game! See you tomorrow! Goodbye! Say: Goodbye Nova!"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    }
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "The Busy Classroom",
    week_number: 8,
    theme: "Classroom Items (Plural)",
    
    knowledge_base: [
      "Classroom items: desks, chairs, students, bags, markers, boards",
      "Art supplies: pencils, crayons, papers, markers",
      "Storage: shelves, bags, pencil cases",
      "Grammar: There are... (There are 20 desks in our classroom)",
      "Plural nouns: desk→desks, pencil→pencils, chair→chairs, student→students",
      "We COUNT things with: one, two, three, many, a few, a lot of",
      "Students sit at desks and chairs in the classroom",
      "Markers and crayons are for writing and drawing",
      "Papers are for writing, drawing, and art projects",
      "Shelves hold books and supplies in the classroom"
    ],
    
    example_opening_questions: [
      "How many desks are in your classroom?",
      "How many students are in your class?",
      "Are there many pencils on your desk?",
      "How many chairs can you count?",
      "Are there books on the shelves?",
      "How many markers does your teacher have?",
      "What are on the shelves in your classroom?"
    ],
    
    // ✅ FREE TALK 2.0: Starter prompts (Fixed buttons for all weeks)
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask_anything" }
    ],
    
    // Legacy bonus roleplay
    bonus_roleplay: {
      id: 'week8_classroom_count',
      label_en: "Classroom Counter",
      label_vi: "Đếm Đồ Lớp Học",
      icon: "🏫",
      ai_role: "Teacher checking classroom inventory",
      user_role: "Student helping count classroom items",
      intro: "Let's count everything in our classroom together! How many desks are there? Say: There are...",
      context: "Week 8 theme - The Busy Classroom (Plural). AI acts as a friendly teacher counting classroom items with the student. Use 'There are...' pattern throughout. Teacher asks 'How many...?' and student responds with 'There are [number] [plural noun]'. Items: desks, chairs, students, bags, markers, boards, pencils, crayons, papers, shelves. Suitable for A0+ level, 6-12 year old Vietnamese children."
    }
  },


  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_classroom',
      emoji: '🏫',
      title: 'My Busy Classroom',
      bridge: 'In the story, the classroom was full of things — books, pencils, chairs everywhere! 📚',
      seed_question: 'How many desks are there in your classroom? Are there ten or twenty?',
      frames: [
        { template: 'There are ___ desks', follow_up_q: 'How many desks are there? Are there ten or twenty?', hints: ['ten', 'twenty', 'many'] },
        { template: 'There are ___ students', follow_up_q: 'How many students are in your class?', hints: ['thirty', 'twenty', 'many'] },
        { template: 'There are ___ books on the shelf', follow_up_q: 'Are there many books or a few books?', hints: ['many', 'ten', 'a few'] },
        { template: 'There are ___ windows', follow_up_q: 'How many windows are in your classroom?', hints: ['two', 'four', 'many'] },
        { template: 'There are ___ chairs', follow_up_q: 'How many chairs are there?', hints: ['thirty', 'many', 'lots of'] },
        { template: 'There are ___ pictures on the wall', follow_up_q: 'How many pictures are on the wall?', hints: ['two', 'many', 'five'] },
        { template: 'There are ___ in my classroom', follow_up_q: 'What two things are in your classroom?', hints: ['desks and chairs', 'books and pencils', 'windows and a big board'] },
        { template: 'There are many ___s in my school', follow_up_q: 'What are there many of in your school?', hints: ['classroom', 'student', 'tree'] }
      ],
      scaffold_frames: ['There are ___ ___s', 'I can see ___ books', 'My classroom has ___'],
      vocab_focus: ['book', 'pencil', 'chair', 'desk', 'bag'],
      turns: 8,
    },
    {
      id: 'spark_count_my_things',
      emoji: '🔢',
      title: 'Count My Things',
      bridge: 'We counted everything in the story classroom — 20 books, 15 pencils, 10 bags! 🎒',
      seed_question: 'How many pencils do you have? Is it two or three?',
      frames: [
        { template: 'There are ___ pencils', follow_up_q: 'How many pencils do you have?', hints: ['two', 'three', 'five'] },
        { template: 'There are ___ books', follow_up_q: 'How many books do you have?', hints: ['five', 'ten', 'many'] },
        { template: 'There are ___ chairs in the room', follow_up_q: 'How many chairs are in the room?', hints: ['four', 'six', 'many'] },
        { template: 'There are ___ apples', follow_up_q: 'How many apples are there?', hints: ['three', 'five', 'many'] },
        { template: 'There are ___ doors in my house', follow_up_q: 'How many doors are in your house?', hints: ['two', 'three', 'four'] },
        { template: 'There are ___ people in my family', follow_up_q: 'How many people are in your family?', hints: ['three', 'four', 'five'] },
        { template: 'There are ___ trees in my garden', follow_up_q: 'How many trees are in your garden?', hints: ['two', 'three', 'many'] },
        { template: 'There are ___ windows in my room', follow_up_q: 'How many windows are in your room?', hints: ['one', 'two', 'three'] }
      ],
      scaffold_frames: ['I have ___ ___s', 'There are ___ ___s in my bag', 'My favourite thing is ___'],
      vocab_focus: ['one', 'two', 'three', 'many', 'some'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "classroom_count",
      title: "Count the Classroom!",
      emoji: "🏫",
      theme: "Classroom Items — There Are",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Look around our classroom! Are there desks? Say: Yes, there are desks!",
          accept: ["Yes", "there are", "desks"]
        },
        {
          ai: "How many students are there? Say: There are many students! or There are 30 students! or There are twenty students!",
          fill_blank: "There are ___ students",
          accept_words: ["many", "30", "twenty", "lots", "there are"]
        },
        {
          ai: "Are there chairs? Say: Yes, there are chairs! or No, there are no chairs!",
          options: ["Yes, there are chairs!", "No, there are no chairs!"]
        },
        {
          ai: "Look at the bags! How many bags? Say: There are many bags! or There are 30 bags! or There are lots of bags!",
          fill_blank: "There are ___ bags",
          accept_words: ["many", "bags", "30", "lots", "there are"]
        },
        {
          ai: "Count something in YOUR classroom! Say: There are desks! or There are chairs! or There are students!",
          fill_blank: "There are ___",
          accept_words: ["desks", "chairs", "students", "bags", "pencils", "markers", "there are", "books"]
        }
      ],
      completion_message: "Counting champion! You used: There are desks/chairs/students/bags!"
    },
    {
      id: "supply_count",
      title: "Count the Supplies!",
      emoji: "✏️",
      theme: "Counting School Supplies",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Look at the pencil box! How many pencils? Say: There are many pencils in the box!",
          accept: ["Yes", "there are", "pencils"]
        },
        {
          ai: "Open the art box! What do you see? Choose: There are crayons or There are markers or There are both",
          options: ["There are crayons", "There are markers", "There are crayons and markers"]
        },
        {
          ai: "Are there papers on the shelves? Say: Yes, there are papers on the shelves!",
          accept: ["there are", "papers", "yes"]
        },
        {
          ai: "How many markers does the teacher use? Choose: There are 3 markers or There are 5 markers or There are many markers",
          options: ["There are 3 markers", "There are 5 markers", "There are many markers"]
        },
        {
          ai: "Count any supply in your classroom! Say: There are pencils in my classroom! or There are crayons in my classroom! or There are papers in my classroom!",
          fill_blank: "There are ___ in my classroom",
          accept_words: ["pencils", "markers", "crayons", "papers", "erasers", "rulers", "books", "there are"]
        },
        {
          ai: "Are there enough supplies for everyone? Say: Yes, there are supplies for everyone or No, there are not enough",
          options: ["Yes, there are supplies for everyone", "No, there are not enough"]
        }
      ],
      completion_message: "Supply expert! You counted: pencils, markers, crayons, papers!"
    },
    {
      id: "busy_classroom",
      title: "Our Busy Classroom!",
      emoji: "📚",
      theme: "All About the Classroom",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Monday morning! Students arrive! Are there many students today? Say: Yes, there are many students!",
          accept: ["Yes", "there are", "students"]
        },
        {
          ai: "Students put their bags down. Are there bags on the floor? Say: Yes, there are bags on the floor!",
          accept: ["there are", "bags"]
        },
        {
          ai: "The teacher writes on the board. Are there markers? Say: There are many markers! or There are some markers!",
          fill_blank: "There are ___ markers",
          accept_words: ["markers", "3", "5", "many", "some", "there are"]
        },
        {
          ai: "Time for art! Are there crayons and paper? Say: Yes, there are crayons and paper or Yes, there are art supplies",
          options: ["Yes, there are crayons and paper", "Yes, there are art supplies", "Yes, there are many supplies"]
        },
        {
          ai: "Look at the shelves! What do you see? Say: There are books on the shelves",
          accept: ["there are", "books", "shelves"]
        },
        {
          ai: "End of day count! Tell me: what are there MANY of in the classroom? Say: There are many students! or There are many desks! or There are many chairs!",
          fill_blank: "There are many ___",
          accept_words: ["students", "desks", "chairs", "bags", "books", "pencils", "crayons", "papers", "there are"]
        }
      ],
      completion_message: "Busy classroom expert! You know: There are students, desks, bags, supplies!"
    }
  ]
};

export default week8RealData;
