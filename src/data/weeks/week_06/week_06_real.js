const week6RealData = {
  // === METADATA ===
  week_id: 6,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 6,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 6: Treasure Hunt at Home",
  week_title_en: "Treasure Hunt at Home (Location)",
  week_title_vi: "Truy tìm Kho báu (Vị trí)",
  
  topic: "Prepositions - Hiding and finding objects",
  topic_vi: "Giới từ - Ẩn và tìm đồ vật",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe location using prepositions In, On, Under, Next to.",
  learning_outcome_vi: "Miêu tả vị trí sử dụng giới từ In, On, Under, Next to.",
  
  // === GRAMMAR FOCUS (IMPLICIT) ===
  grammar_focus: "Prepositions of Place",
  grammar_pattern: "[Object] is [in/on/under/next to] the the park",
  grammar_examples: [
    "The box is on the desk.",
    "The cat is under the table.",
    "The book is in the box.",
    "The chair is next to the door."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++ EASY MODE = SYLLABUS BASE) ===
  target_vocab: [
    {
      word: "box",
      pronunciation: "/bɒks/",
      definition_vi: "hộp",
      definition_en: "a container for storing things",
      example: "The toy is in the box.",
      syllabus_context: "Objects"
    },
    {
      word: "desk",
      pronunciation: "/desk/",
      definition_vi: "bàn học",
      definition_en: "a table for working or studying",
      example: "The book is on the desk.",
      syllabus_context: "Furniture"
    },
    {
      word: "floor",
      pronunciation: "/flɔːr/",
      definition_vi: "sàn nhà",
      definition_en: "the surface you walk on inside a room",
      example: "The ball is on the floor.",
      syllabus_context: "House Parts"
    },
    {
      word: "wall",
      pronunciation: "/wɔːl/",
      definition_vi: "tường",
      definition_en: "the side of a room or building",
      example: "The picture is on the wall.",
      syllabus_context: "House Parts"
    },
    {
      word: "window",
      pronunciation: "/ˈwɪn.doʊ/",
      definition_vi: "cửa sổ",
      definition_en: "an opening in a wall with glass",
      example: "Look out the window.",
      syllabus_context: "House Parts"
    },
    {
      word: "door",
      pronunciation: "/dɔːr/",
      definition_vi: "cửa",
      definition_en: "an opening for entering or leaving a room",
      example: "Close the door.",
      syllabus_context: "House Parts"
    },
    {
      word: "hide",
      pronunciation: "/haɪd/",
      definition_vi: "ẩn, giấu",
      definition_en: "to put something where no one can see it",
      example: "Let's hide the treasure.",
      syllabus_context: "Action"
    },
    {
      word: "seek",
      pronunciation: "/siːk/",
      definition_vi: "tìm kiếm",
      definition_en: "to look for something",
      example: "Now seek the treasure!",
      syllabus_context: "Action"
    },
    {
      word: "treasure",
      pronunciation: "/ˈtreʒ.ər/",
      definition_vi: "kho báu",
      definition_en: "something very special and valuable",
      example: "We found the treasure!",
      syllabus_context: "Theme"
    },
    {
      word: "hunt",
      pronunciation: "/hʌnt/",
      definition_vi: "săn tìm",
      definition_en: "to search carefully for something",
      example: "Let's go on a treasure hunt.",
      syllabus_context: "Action"
    }
  ],
  
  global_vocab: ["box", "desk", "floor", "wall", "window", "door", "hide", "seek", "treasure", "hunt"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and human-like",
    tone: "Adventurous, encouraging, like a treasure-hunting friend",
    opening_lines_by_mission: {
      mission_1: "Ahoy! I am Captain Nova, a treasure hunter! I have a treasure map for your house. Treasures are hiding everywhere! What do I call you?",
      mission_2: "Ahoy! It is very dark! I have my flashlight. Shine! I see a treasure! Where is it? Is it on the desk? Under the chair? You tell me!",
      mission_3: "Look! I have a mystery treasure box. There are clues about where treasures are hiding. Can you follow the clues and find them all?"
    },
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use present simple with location prepositions in/on/under/next to - Week 6 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "Book is on.",
      nova_recast: "Yes! The book is ON the desk. Where is the pen?"
    },
    vocabulary_scaffolding: [
      "Mission 1: in, on, under, next to - location prepositions with common house objects",
      "Mission 2: box, desk, floor, wall, window, door - full location sentences in dark room",
      "Mission 3: combine hide, seek, treasure with complete 'X is [preposition] the Y' sentences"
    ],
    questioning_skill: [
      "Where is the treasure?",
      "Is the box on the desk or under the desk?",
      "What is next to the window?",
      "Where is the book?",
      "Is it in, on, or under the the park?"
    ],
    must_use_vocab: ["box", "desk", "floor", "wall", "window", "door", "in", "on", "under", "next to"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Past tense or future tense (Week 6 scope is present simple only)"
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
      "Keep it conversational and encouraging"
    ],
    question_patterns_allowed: [
      "What is...?",
      "Where is...?",
      "Is...?",
      "Do you...?",
      "Can you...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "Cat under table.",
        tutor_response: "Great! The cat IS under the table. What is on the floor?"
      },
      {
        student: "Book is on.",
        tutor_response: "Nice! The book is ON the desk. Where is the pen?"
      },
      {
        student: "Treasure in box.",
        tutor_response: "Perfect! The treasure IS in the box. Where is the key?"
      }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "The Treasure Map",
      title_vi: "Bản đồ Kho báu",
      theme: "Location & Prepositions",
      
      // 🎭 STORY CHARACTER (like roleplay ai_role)
      story_character: {
        name: "Captain Nova",
        personality: "Adventurous, playful, loves treasure hunts",
        backstory: "Captain Nova is a treasure hunter who travels the world looking for hidden treasures. Today, she needs YOUR help to find treasures in your house!",
        speaking_style: "Excited, uses treasure hunt language, gives location clues",
        facts: {
          ship_name: "Golden Star",
          favorite_treasure: "golden coin",
          has_map: true,
          map_color: "brown",
          treasure_found: 100,
          favorite_place: "under the desk",
          pet_parrot: true,
          parrot_name: "Coco"
        }
      },
      
      // 🎬 OPENING NARRATIVE (replaces nova_greeting)
      opening_narrative: "Ahoy! I'm Captain Nova! I'm a treasure hunter! I have a treasure map for YOUR house! There are treasures hiding everywhere! Will you help me find them? Say: Yes, Captain or Yes, let's find the treasure",
      
      nova_greeting: "Hi! Let's find treasures together!", // DEPRECATED - use opening_narrative
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 6 Mission 1 - Treasure Map. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: You are Captain Nova, an adventurous treasure hunter with a map of the student's house! Use "Ahoy!", pirate energy, and treasure emojis. STORY FLOW: (1) INTRO: Ask student name → welcome them as "treasure hunter" → show map → ask "Are you ready?" (2) BOX INTRO: Say "First treasure is in a BOX! Do you have a box? Say: Yes, I have a box / No, I don't have a box" → after answer, say "Where is the box? Say: The box is ON the desk / UNDER the desk" (3) TREASURE HUNT TURNS: Point to locations around the house one by one → student must answer with a full preposition sentence. Examples: "Look ON the desk! What is there? Say: There is a book ON the desk!" or "Look UNDER the desk! Say: The treasure is UNDER the desk!" (4) HIDING GAME: Student hides a treasure → describes where: "I hide it UNDER the desk" or "It is ON the shelf" (5) CLOSE: Celebrate, say goodbye as treasure hunters. LANGUAGE RULES: Max 8 words per sentence. Always give scaffolding: "Say: The treasure is ON the ___!" GRAMMAR FOCUS: Location prepositions IN / ON / UNDER / NEXT TO. Every turn MUST practice one preposition. Model correct form in response. VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. RECAST ERRORS: student says "treasure on desk" → "Yes! The treasure IS on the desk! Ahoy!" FORBIDDEN: "Tell me more!" "What do you want to talk about?" "How are you?" Colors, preferences, feelings. CRITICAL: NEVER ask generic questions. Always tie each question to a LOCATION in the house. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["box", "desk", "floor", "wall", "window", "door"],
      
      grammar_pattern: "[Object] is [in/on/under/next to] the the park",
      
      // 📖 STORY ARC (phases with turn ranges)
      story_arc: [
        {
          phase: "introduction",
          turns: "1-5",
          goal: "Learn student's name, start treasure hunt",
          required_vocab: [],
          phase_questions: [
            {
              template: "What do I call you, treasure hunter?",
              hints: ["My", "name", "is", "I", "am"]
            },
            {
              template: "(After name) {student_answer}! Great name, treasure hunter! Look at my map! 🗺️ It shows treasures in YOUR house! Are you ready? Say: Yes, Captain or Yes, I am ready",
              hints: ["Yes", "Captain", "I", "am", "ready"]
            },
            {
              template: "(After ready) {student_answer}! Perfect! First treasure: It's in a BOX! Do you have a box at home? Say: Yes, I have a box or No, I don't have a box",
              hints: ["Yes", "I", "have", "a", "box", "No", "don't"]
            },
            {
              template: "(After box question) {student_answer}! Great! Where can we find boxes? Say: In my room or Under the desk",
              hints: ["In", "my", "room", "Under", "the", "desk"]
            },
            {
              template: "(After location) {student_answer}! Perfect! Now let's look for treasure NUMBER ONE! 🏆 Are you ready to search? Say: Yes, I am ready!",
              hints: ["Yes", "I", "am", "ready", "Let's", "go"]
            }
          ]
        },
        {
          phase: "treasure_hunting",
          turns: "6-12",
          goal: "Find treasures using prepositions (in, on, under, next to)",
          required_vocab: ["box", "desk", "floor", "door", "window"],
          phase_questions: [
            {
              template: "🔍 Treasure #1: Look ON your desk! Is there something special? Say: Yes, there is a book on the desk or There is a pen on the desk",
              hints: ["Yes", "there", "is", "a", "book", "pen", "on", "the", "desk"]
            },
            {
              template: "🔍 Treasure #2: Look UNDER your desk! What do you see? Say: I see a box under the desk or There is a toy under the desk",
              hints: ["I", "see", "There", "is", "a", "box", "toy", "under", "the", "desk"]
            },
            {
              template: "🔍 Treasure #3: Look at the FLOOR! Is there treasure on the floor? Say: Yes, there is a ball on the floor or There is a book on the floor",
              hints: ["Yes", "there", "is", "a", "ball", "book", "on", "the", "floor"]
            },
            {
              template: "🔍 Treasure #4: Look NEXT TO the door! Is there something? Say: There is a chair next to the door or There is a box next to the door",
              hints: ["There", "is", "a", "chair", "box", "next", "to", "the", "door"]
            },
            {
              template: "🔍 Treasure #5: Look IN a box! Open it! What's inside? Say: There is a toy IN the box or There is a book IN the box",
              hints: ["There", "is", "a", "toy", "book", "IN", "the", "box"]
            },
            {
              template: "Amazing! You found FIVE treasures! Let's find more!",
              hints: ["Yes", "Great", "Okay"]
            },
            {
              template: "Where is your favorite treasure? Say: My favorite is on the desk or My favorite is under the desk",
              hints: ["My", "favorite", "is", "on", "under", "the", "desk", "in", "box"]
            }
          ]
        },
        {
          phase: "hiding_game",
          turns: "13-17",
          goal: "Student describes where THEY hide treasures",
          required_vocab: ["hide", "seek"],
          phase_questions: [
            {
              template: "Now YOU hide a treasure! Where will you hide it? Say: I hide it ON the desk or I hide it UNDER the desk",
              hints: ["I", "hide", "it", "ON", "UNDER", "IN", "the", "desk", "box"]
            },
            {
              template: "Good hiding spot! Is it UNDER something or ON something? Say: It is UNDER the desk or It is ON the desk",
              hints: ["It", "is", "UNDER", "ON", "the", "desk", "table"]
            },
            {
              template: "I will try to find it! Give me a clue! Say: It is next to the door or It is under the desk",
              hints: ["It", "is", "next", "to", "under", "the", "door", "desk"]
            },
            {
              template: "Is it near the window or near the door? Say: It is near the window or It is near the door",
              hints: ["It", "is", "near", "the", "window", "door", "desk"]
            },
            {
              template: "Found it! You are a great treasure hider! 🎉",
              hints: ["Thank", "you", "Great", "Yes"]
            }
          ]
        },
        {
          phase: "conclusion",
          turns: "18-20",
          goal: "Celebrate treasure hunt, say goodbye",
          required_vocab: [],
          phase_questions: [
            {
              template: "We found SO MANY treasures! Which was your favorite? Say: My favorite was on the desk or My favorite was under the desk",
              hints: ["My", "favorite", "was", "on", "under", "the", "desk", "in", "box"]
            },
            {
              template: "You are an AMAZING treasure hunter! Thank you for helping Captain Nova! 🏴‍☠️",
              hints: ["Thank", "you", "Captain", "Nova"]
            },
            {
              template: "Goodbye, treasure hunter! See you on our next adventure! Say: Goodbye, Captain!",
              hints: ["Goodbye", "Captain", "See", "you", "Bye"]
            }
          ]
        }
      ],
      
      // 🎯 TURN LIMIT (like roleplay)
      minimum_turns: 8,
      maximum_turns: 12,
      
      
      
      expected_duration: "15+ minutes"
    },  // ← End of Mission 1
    {
      mission_id: 2,
      title: "Flashlight Treasure Hunt",
      title_vi: "Săn Kho Báu Bằng Đèn Pin",
      theme: "Location & Prepositions - Pointing Game",
      
      nova_greeting: "It's so dark! I have a flashlight! Let's find treasures!",
      default_hints: ["The", "treasure", "is", "on", "the", "desk"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 6 Mission 2 - Flashlight Treasure Hunt. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Captain Nova shines a magic flashlight in a very dark room. The light reveals treasure locations one by one. In-character sound effects (Click! Shine! Look!) keep energy high. GAME MECHANIC: Shine flashlight on an object or location → student says where the treasure is using a complete preposition sentence. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: Prepositions (in/on/under/next to). Give FULL scaffolding: "Say: The treasure is ON the desk!" or "Say: It is UNDER the box!" VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY. RECAST ERRORS: student says "under chair" → "Yes! IT IS under the chair! Full sentence!" FORBIDDEN: No preferences, feelings. SAMPLE TURN: Shine → "Look! I see something! Where is the coin? Say: The coin is on the desk or The coin is under the box!" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["box", "desk", "floor", "wall", "window", "door", "hide", "seek", "treasure", "hunt"],
      
      grammar_pattern: "The treasure is [preposition] the the park",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Captain Nova",
        personality: "adventurous, excited, loves treasure hunting in the dark",
        backstory: "It's night time! The house is dark! Good thing I have my treasure-hunting flashlight! Let's find hidden treasures!",
        speaking_style: "excited, uses pirate sounds (Ahoy! Shiver me timbers!), gives full scaffolding for prepositions",
        facts: [
          "I have a special treasure-hunting flashlight! 🔦",
          "I love finding treasures in dark places!",
          "I will shine my light on different treasures!",
          "I help you say IN, ON, UNDER, NEXT TO correctly!",
          "I found 50 treasures this week!"
        ],
        role: "Treasure hunter with flashlight discovering treasures in darkness"
      },

      opening_narrative: "Ahoy! It's so dark! 🌑 I have my flashlight! 🔦 (Shine on desk) Look! A treasure! Where is it? Say: The treasure is ON the desk!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Darkness and First Treasures",
          focus: "Establish preposition pattern with ON and IN",
          phase_questions: [
            "(Shine 🔦 on desk) Look! A treasure! Where is it? Say: The treasure is ON the desk",
            "(Shine 🔦 in box) Another one! Where? Say: The treasure is IN the box",
            "(Shine 🔦 on floor) Down here! Where? Say: The treasure is ON the floor",
            "(Shine 🔦 on wall) Up high! Where is it? Say: The treasure is ON the wall"
          ],
          example_answers: [
            "The treasure is on the desk",
            "The treasure is in the box",
            "The treasure is on the floor",
            "The treasure is on the wall"
          ]
        },
        {
          phase: "more_prepositions",
          turns: "5-10",
          phase_name: "UNDER and NEXT TO Challenge",
          focus: "Practice UNDER and NEXT TO prepositions",
          phase_questions: [
            "(Shine 🔦 under desk) Hidden! Where? Say: The treasure is UNDER the desk",
            "(Shine 🔦 next to door) Beside the door! Where? Say: The treasure is NEXT TO the door",
            "(Shine 🔦 under box) In the shadows! Where? Say: It is UNDER the box",
            "(Shine 🔦 next to window) By the window! Where? Say: It is NEXT TO the window",
            "(Shine 🔦 on desk) Again! Where? Say: The treasure is ON the desk",
            "(Shine 🔦 in box) Inside! Where? Say: The treasure is IN the box"
          ],
          example_answers: [
            "The treasure is under the desk",
            "The treasure is next to the door",
            "It is under the box",
            "It is next to the window",
            "The treasure is on the desk",
            "The treasure is in the box"
          ]
        },
        {
          phase: "speed_round",
          turns: "11-14",
          phase_name: "Quick Discovery",
          focus: "Fast-paced practice all prepositions",
          phase_questions: [
            "(Shine quickly on floor) Quick! Where? The treasure is...",
            "(Shine under something) Fast! Where? It is...",
            "(Shine next to door) Where? Next to...",
            "Amazing! Which location was hardest to find?"
          ]
        },
        {
          phase: "conclusion",
          turns: "15-16",
          phase_name: "Lights On",
          focus: "Celebrate treasure hunting success",
          phase_questions: [
            "The lights are back! ✨ Where was your favorite treasure? It was...",
            "Perfect! You found ALL the treasures! Great job! Ahoy! 🏴‍☠️"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Mystery Treasure Box",
      title_vi: "Chiếc Hộp Kho Báu Bí Ẩn",
      theme: "Guessing Game - Prepositions",
      
      nova_greeting: "Look! I found a mystery box! Where are the treasures? Let's guess!",
      default_hints: ["The", "treasure", "is", "in", "the", "box"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 6 Mission 3 - The Mystery Treasure Box. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Captain Nova has a mystery treasure box with many secret compartments. Each compartment hides a treasure somewhere in the room. Nova gives location clues and students say where treasures are. GAME MECHANIC: Nova describes a hiding spot → student answers using a complete location sentence. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: Prepositions (in/on/under/next to) - student must use ALL four by end of mission. Give FULL scaffolding: "Say: The treasure is ON the table!" VOCABULARY: box, desk, floor, wall, window, door, hide, seek, treasure, hunt. STRICT FOCUS: LOCATION ONLY. RECAST ERRORS: "The treasure IS next to the box." - model the full sentence form. SAMPLE TURN: "Clue: the gold coin is next to something tall... Where is it? Say: The treasure is next to the door or The treasure is next to the wall!" FORBIDDEN: Do NOT ask about preferences, colors, or feelings. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. ONLY ask location questions using in/on/under/next to. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["box", "desk", "floor", "wall", "window", "door", "hide", "seek", "treasure", "hunt"],
      
      grammar_pattern: "The treasure is [preposition] the the park",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Captain Nova",
        personality: "mysterious, playful, loves treasure riddles and location puzzles",
        backstory: "I found a magic treasure box! I can't tell you where the treasures are, but I'll give you clues! Can you guess the locations?",
        speaking_style: "mysterious, uses location riddles, gives clear position clues, celebrates correct guesses with full scaffolding",
        facts: [
          "I found a mystery treasure box!",
          "I give clues about where treasures are hidden!",
          "I describe positions: up high, down low, hidden, beside!",
          "I love when you guess locations correctly!",
          "I help you say IN, ON, UNDER, NEXT TO perfectly!"
        ],
        role: "Mystery box host giving riddles for student to guess"
      },

      opening_narrative: "Look! 📦 A mystery treasure box! I have clues about WHERE treasures are! (Touch box) Hmm... I see something up high on something flat... Where is it? Say: The treasure is ON the desk!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-3",
          phase_name: "Mystery Box Opens - First Location Clues",
          focus: "Introduce guessing game with ON and IN",
          phase_questions: [
            "(Clue: Up high on flat surface) Where is the treasure? Say: The treasure is ON the desk",
            "(Clue: Inside something square with lid) Where? Say: The treasure is IN the box",
            "(Clue: Down at the bottom where we walk) Where? Say: The treasure is ON the floor"
          ],
          example_answers: [
            "The treasure is on the desk",
            "The treasure is in the box",
            "The treasure is on the floor"
          ]
        },
        {
          phase: "harder_locations",
          turns: "4-8",
          phase_name: "UNDER and NEXT TO Clues",
          focus: "Guess locations with UNDER and NEXT TO",
          phase_questions: [
            "(Clue: Hidden below the desk, in shadows) Where? Say: The treasure is UNDER the desk",
            "(Clue: Beside the door, next to it) Where? Say: The treasure is NEXT TO the door",
            "(Clue: Hidden below something square) Where? Say: It is UNDER the box",
            "(Clue: Up high on flat vertical surface) Where? Say: It is ON the wall",
            "(Clue: Beside the window, close to it) Where? Say: It is NEXT TO the window"
          ],
          example_answers: [
            "The treasure is under the desk",
            "The treasure is next to the door",
            "It is under the box",
            "It is on the wall",
            "It is next to the window"
          ]
        },
        {
          phase: "speed_clues",
          turns: "9-14",
          phase_name: "Quick Location Riddles",
          focus: "Fast-paced location guessing with all prepositions",
          phase_questions: [
            "(Clue: Flat surface for working) ON the...? Say: ON the desk",
            "(Clue: Square container with lid) IN the...? Say: IN the box",
            "(Clue: Bottom surface, we walk on it) ON the...? Say: ON the floor",
            "(Clue: Hidden below desk) UNDER the...? Say: UNDER the desk",
            "(Clue: Beside the entrance) NEXT TO the...? Say: NEXT TO the door",
            "Which location was hardest to guess?"
          ],
          example_answers: [
            "On the desk",
            "In the box",
            "On the floor",
            "Under the desk",
            "Next to the door",
            "Under the desk was hard"
          ]
        },
        {
          phase: "conclusion",
          turns: "15-18",
          phase_name: "Mystery Box Complete!",
          focus: "Celebrate all location discoveries",
          phase_questions: [
            "You guessed ALL the treasure locations! 🎉 Which location was your favorite?",
            "Amazing job! You know IN, ON, UNDER, NEXT TO perfectly! Ready to say goodbye?",
            "Perfect! You're a true treasure hunter! Ahoy and goodbye! 🏴‍☠️"
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
    week_title: "Treasure Hunt at Home (Location)",
    week_number: 6,
    theme: "Location & Prepositions",
    
    knowledge_base: [
      "Prepositions of place: IN, ON, UNDER, NEXT TO",
      "Objects we can hide: box, treasure, toy, ball, book",
      "Places in a house: desk, floor, wall, window, door",
      "Grammar: [Object] is [IN/ON/UNDER/NEXT TO] the the park",
      "IN means inside something (IN the box)",
      "ON means on top of a surface (ON the desk, ON the floor, ON the wall)",
      "UNDER means below something (UNDER the desk, UNDER the box)",
      "NEXT TO means beside something (NEXT TO the door, NEXT TO the window)",
      "Treasure hunting is fun! We hide and seek treasures",
      "We can describe WHERE things are using prepositions"
    ],
    
    example_opening_questions: [
      "Where do you usually hide things at home?",
      "What's your favorite treasure or toy?",
      "Where do you like to play hide and seek?",
      "Do you have a special hiding spot?",
      "Can you tell me about your desk or table?"
    ],
    
    // ✅ FREE TALK 2.0: Starter prompts (Fixed buttons for all weeks)
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask_anything" }
    ],
    
    // Legacy bonus roleplay (kept for backward compatibility)
    bonus_roleplay: {
      id: 'week6_treasure_hunt',
      label_en: "Treasure Hunt Master 🏴‍☠️",
      label_vi: "Thợ Săn Kho Báu Chuyên Nghiệp 🏴‍☠️",
      icon: "🏴‍☠️",
      ai_role: "Treasure hunt organizer teaching location descriptions",
      user_role: "New treasure hunter learning to describe locations",
      intro: "Ahoy! Welcome to Treasure Hunt Training! I'll teach you how to describe WHERE treasures are hidden!",
      context: "Week 6 theme - Location & Prepositions. AI acts as experienced treasure hunter teaching beginner how to describe locations using IN, ON, UNDER, NEXT TO. Asks questions like 'Where should we hide this treasure?' or 'Where do you see treasures?' Uses pattern '[Object] is [preposition] the the park'. Should be enthusiastic, encouraging, and use simple words for A0+ level."
    }
  },


  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_treasure_hunt',
      emoji: '🗺️',
      title: 'Treasure Hunt!',
      bridge: 'Captain Nova hid treasures all over the house — on the desk, under the bed, next to the window! 🏴‍☠️',
      seed_question: 'Where is the treasure? Is it on the table or under the chair?',
      frames: [
        { template: 'My ___ is on the table', follow_up_q: 'What is on the table or on the shelf?', hints: ['book', 'bag', 'toy'] },
        { template: 'My ___ is in the box', follow_up_q: 'What is in the bag or in the box?', hints: ['pencil', 'toy', 'book'] },
        { template: 'My ___ is under the bed', follow_up_q: 'What is under the bed or under the table?', hints: ['shoe', 'bag', 'ball'] },
        { template: 'My ___ is next to the door', follow_up_q: 'What is next to the door or next to the window?', hints: ['chair', 'desk', 'bag'] },
        { template: 'My ___ is behind the door', follow_up_q: 'What is behind the door or behind the sofa?', hints: ['ball', 'bag', 'toy'] },
        { template: 'My bag is ___', follow_up_q: 'Where is your bag? Is it on the chair or under the desk?', hints: ['on the chair', 'under the desk', 'next to the door'] },
        { template: 'My pencil is ___', follow_up_q: 'Where is your pencil? In the box or on the desk?', hints: ['in the box', 'on the desk', 'next to my book'] },
        { template: 'The treasure is ___', follow_up_q: 'Where is the treasure? Is it under the chair or behind the door?', hints: ['under the chair', 'behind the door', 'on the shelf'] }
      ],
      scaffold_frames: ['The treasure is ___ the ___', 'Look ___ the ___', 'It is ___ the ___'],
      vocab_focus: ['on', 'under', 'in', 'next to', 'behind'],
      turns: 8
    },
    {
      id: 'spark_my_room_map',
      emoji: '🗿',
      title: 'My Room Map',
      bridge: 'We drew a treasure map of the whole house — every room, every hiding spot! 🗺️',
      seed_question: 'Where is your bed? Is it next to the window or near the door?',
      frames: [
        { template: 'My bed is ___', follow_up_q: 'Where is your bed? Is it next to the window or near the door?', hints: ['next to the window', 'near the door', 'in the middle of the room'] },
        { template: 'My desk is ___', follow_up_q: 'Where is your desk? Is it next to the window or by the wall?', hints: ['next to the window', 'by the wall', 'in the corner'] },
        { template: 'My bookshelf is ___', follow_up_q: 'Where is your bookshelf? Behind the door or next to the desk?', hints: ['behind the door', 'next to the desk', 'on the wall'] },
        { template: 'My toy is ___', follow_up_q: 'Where is your favourite toy? Under or on your bed?', hints: ['under my bed', 'on my bed', 'next to my bed'] },
        { template: 'My window is ___', follow_up_q: 'Where is the window? Next to the door or above the desk?', hints: ['next to the door', 'above the desk', 'behind the bed'] },
        { template: 'The door is ___', follow_up_q: 'Where is the door? Next to your bed or near the desk?', hints: ['next to my bed', 'near my desk', 'behind my chair'] },
        { template: 'My lamp is ___', follow_up_q: 'Where is your lamp? On the desk or next to the bed?', hints: ['on the desk', 'next to the bed', 'on the shelf'] },
        { template: 'In my room, my ___ is next to the door', follow_up_q: 'Tell me where something is in your room!', hints: ['bag', 'book', 'toy'] }
      ],
      scaffold_frames: ['My ___ is on the ___', 'My ___ is next to ___', 'Under my ___ there is ___'],
      vocab_focus: ['desk', 'bed', 'shelf', 'window', 'door'],
      turns: 8
    }
  ],

  conversation_cards: [
    {
      id: "where_is_my_cat",
      title: "Where Is My Cat?",
      emoji: "🐱",
      theme: "Prepositions: on, in, under",
      difficulty: "easy",
      exchanges: [
        {
          ai: "I can't find my cat! Is the cat ON the table? Choose: Yes, the cat is on the table or No, the cat is not on the table",
          options: ["Yes, the cat is on the table", "No, the cat is not on the table"]
        },
        {
          ai: "I think the cat is under the bed! Say: The cat is under the bed! or The cat is next to the bed! or The cat is the bed the bed!",
          fill_blank: "The cat is ___ the bed",
          accept_words: ["under", "on", "next to", "the bed", "cat is"]
        },
        {
          ai: "Check the box! Where is the cat? Say: The cat is in the box! or The cat is on the table! or The cat is under the bag!",
          options: ["The cat is in the box!", "The cat is on the table!", "The cat is under the bag!"]
        },
        {
          ai: "Found it! The cat is NEXT TO the door! Can you say that? Say: The cat is next to the door!",
          accept: ["next to", "the door", "cat is", "the cat"]
        },
        {
          ai: "Now you hide a cat! Where is the cat? Choose: The cat is on the chair or The cat is under the table or The cat is in the bag",
          options: ["The cat is on the chair", "The cat is under the table", "The cat is in the bag"]
        }
      ],
      completion_message: "Found the cat! 🐱 You used: ON, UNDER, IN, and NEXT TO perfectly!"
    },
    {
      id: "treasure_hunt",
      title: "Treasure Hunt!",
      emoji: "🗺️",
      theme: "Hiding & Finding Objects",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Let's play treasure hunt! I hide a coin. The coin is ON the desk. Where is the coin? Say: The coin is on the desk!",
          accept: ["on the desk", "coin is on", "the desk", "on"]
        },
        {
          ai: "Now I hide the key. The key is UNDER the chair. Where is the key? Say: The key is under the chair!",
          accept: ["under the chair", "key is under", "the chair", "under"]
        },
        {
          ai: "I hide the map IN the box. Where is the map? Say: The map is in the box!",
          accept: ["in the box", "map is in", "the box", "in"]
        },
        {
          ai: "The treasure is NEXT TO the window! Where is the treasure? Say: The treasure is next to the window!",
          accept: ["next to", "the window", "treasure is", "next to the window"]
        },
        {
          ai: "Your turn! Where do YOU hide the treasure? Say: The treasure is on the table! or The treasure is in the box! or The treasure is under the bed! or The treasure is next to the bag!",
          options: ["The treasure is on the table!", "The treasure is in the box!", "The treasure is under the bed!", "The treasure is next to the bag!"]
        },
        {
          ai: "I found the treasure! Where was it? Say: The treasure was on the table! or The treasure was in the box! or The treasure was under the bed! or The treasure was next to the bag!",
          options: ["The treasure was on the table!", "The treasure was in the box!", "The treasure was under the bed!", "The treasure was next to the bag!"]
        }
      ],
      completion_message: "You found the treasure! 🗺️🏆 You used: on, in, under, and next to like a pro!"
    },
    {
      id: "my_room_map",
      title: "My Room Map",
      emoji: "🗃️",
      theme: "Describing Locations at Home",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Tell me about your room! Where is your bed? Say: My bed is next to the window! or My bed is next to the wall! or My bed is next to the door!",
          fill_blank: "My bed is next to the ___",
          accept_words: ["window", "wall", "door", "desk", "table"]
        },
        {
          ai: "Where is your bag? Say: My bag is on the chair! or My bag is under the desk! or My bag is next to the table!",
          options: ["My bag is on the chair!", "My bag is under the desk!", "My bag is next to the table!", "My bag is on the floor!"]
        },
        {
          ai: "Where are your books? Say: My books are on the desk! or My books are in the bag! or My books are on the shelf! or My books are under the table!",
          options: ["My books are on the desk!", "My books are in the bag!", "My books are on the shelf!", "My books are under the table!"]
        },
        {
          ai: "Where is the door in your room? Say: The door is next to the window! or The door is next to the wall!",
          accept: ["next to", "door is", "the door", "on the", "wall", "window"]
        },
        {
          ai: "Where does your cat or toy go when you sleep? Choose: It is on the bed or It is under the bed or It is next to me",
          options: ["It is on the bed", "It is under the bed", "It is next to me"]
        }
      ],
      completion_message: "Amazing room map! 🗃️ You described your room using on, in, under, and next to!"
    }
  ]
};

export default week6RealData;
