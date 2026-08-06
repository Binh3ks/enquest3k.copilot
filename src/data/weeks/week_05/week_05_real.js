const week5RealData = {
  // === METADATA ===
  week_id: 5,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 5,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 5: The Mystery House",
  week_title_en: "The Mystery House (Rooms & Furniture)",
  week_title_vi: "Ngôi nhà Bí ẩn (Phòng & Đồ đạc)",
  
  topic: "Nouns - Exploring rooms and furniture",
  topic_vi: "Danh từ - Khám phá phòng và đồ đạc",

  chunk_focus: [
    "On the hill",
    "there is",
    "big house",
    "mystery house",
    "One day",
    "open the door",
    "a nice bedroom",
    "on the table",
    "on the wall",
    "on the floor",
    "the living room",
    "There is",
    "big sofa",
    "shelves with books",
    "In the kitchen"
  ],
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Label parts of a house correctly using articles A/An.",
  learning_outcome_vi: "Gọi tên các bộ phận của ngôi nhà chính xác bằng mạo từ A/An.",
  
  // === GRAMMAR FOCUS (IMPLICIT) ===
  grammar_focus: "Articles 'A/An'",
  grammar_pattern: "A/An [noun]",
  grammar_examples: [
    "This is a bedroom.",
    "There is an apple.",
    "I see a chair.",
    "It is a kitchen."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++ EASY MODE = SYLLABUS BASE) ===
  target_vocab: [
    {
      word: "bedroom",
      pronunciation: "/ˈbed.ruːm/",
      definition_vi: "phòng ngủ",
      definition_en: "a room for sleeping",
      example: "This is a bedroom.",
      syllabus_context: "Rooms"
    },
    {
      word: "kitchen",
      pronunciation: "/ˈkɪtʃ.ən/",
      definition_vi: "nhà bếp",
      definition_en: "a room for cooking",
      example: "Mom is in the kitchen.",
      syllabus_context: "Rooms"
    },
    {
      word: "bathroom",
      pronunciation: "/ˈbæθ.ruːm/",
      definition_vi: "phòng tắm",
      definition_en: "a room for washing",
      example: "The bathroom is clean.",
      syllabus_context: "Rooms"
    },
    {
      word: "living_room",
      pronunciation: "/ˈlɪv.ɪŋ ruːm/",
      definition_vi: "phòng khách",
      definition_en: "a room where family sits together",
      example: "We watch TV in the living room.",
      syllabus_context: "Rooms"
    },
    {
      word: "bed",
      pronunciation: "/bed/",
      definition_vi: "giường",
      definition_en: "furniture for sleeping",
      example: "I sleep on a bed.",
      syllabus_context: "Furniture"
    },
    {
      word: "chair",
      pronunciation: "/tʃer/",
      definition_vi: "ghế",
      definition_en: "furniture for sitting",
      example: "Sit on the chair.",
      syllabus_context: "Furniture"
    },
    {
      word: "table",
      pronunciation: "/ˈteɪ.bəl/",
      definition_vi: "bàn",
      definition_en: "furniture with a flat top",
      example: "The book is on the table.",
      syllabus_context: "Furniture"
    },
    {
      word: "house",
      pronunciation: "/haʊs/",
      definition_vi: "ngôi nhà",
      definition_en: "a building where people live",
      example: "This is my house.",
      syllabus_context: "Building"
    },
    {
      word: "mystery",
      pronunciation: "/ˈmɪs.tər.i/",
      definition_vi: "bí ẩn",
      definition_en: "something strange and interesting",
      example: "It is a mystery house.",
      syllabus_context: "Theme"
    },
    {
      word: "explore",
      pronunciation: "/ɪkˈsplɔːr/",
      definition_vi: "khám phá",
      definition_en: "to look around and discover",
      example: "Let's explore the house.",
      syllabus_context: "Action"
    }
  ],
  
  global_vocab: ["bedroom", "kitchen", "bathroom", "living_room", "bed", "chair", "table", "house", "mystery", "explore"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and human-like",
    tone: "Warm, encouraging, natural - like a patient friend",
    opening_lines_by_mission: {
      mission_1: "Hi! I'm Nova! I travel the world looking at cool houses. Today I'm visiting YOUR house! What do I call you?",
      mission_2: "Hi again! I have my magic flashlight! Let's explore a dark room together. Ready? Shine the light!",
      mission_3: "Ooh, I have a Mystery Box! I can feel something inside but I can NOT look! Can you guess what it is?"
    },
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use present simple and 'There is/are' - Week 5 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "Bedroom is big.",
      nova_recast: "Yes! The bedroom IS big! Is there a bed in the bedroom?"
    },
    vocabulary_scaffolding: [
      "Mission 1: bedroom, kitchen, bathroom, living_room - focus on room names",
      "Mission 2: articles a/an with common objects - spot-test vowel sounds",
      "Mission 3: combine articles + furniture + room vocab in guessing game"
    ],
    questioning_skill: [
      "What rooms are in your house?",
      "What is in the kitchen?",
      "Where do you sleep?",
      "What is this? (flashlight game)",
      "Is there a bed or a sofa? (mystery box guessing)"
    ],
    must_use_vocab: ["bedroom", "kitchen", "bathroom", "living_room", "bed", "chair", "table", "house"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Past tense or future tense (Week 5 scope is present simple only)"
    ]
  },

  // === AI RESPONSE FORMAT CONTRACT (V28 standard) ===
  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Nice!", "Great!", "Wonderful!", "Good job!", "Perfect!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror student's subject (if they say 'it', use 'it' in recast)",
      "Fix grammar naturally without explanation",
      "Keep it conversational and encouraging"
    ],
    question_patterns_allowed: [
      "What is...?",
      "Where is...?",
      "Is...?",
      "Do you...?",
      "Can you...?",
      "What color...?",
      "How...? (only for 'How big', 'How many rooms')"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "Kitchen is big.",
        tutor_response: "Great! The kitchen IS big. What is in the kitchen?"
      },
      {
        student: "There is a umbrella.",
        tutor_response: "Oops! There is AN umbrella. Say again!"
      },
      {
        student: "I have bedroom.",
        tutor_response: "Nice! I have A bedroom. What color is your bedroom?"
      }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "Exploring My House",
      title_vi: "Khám phá Ngôi nhà",
      theme: "Rooms",
      
      // 🎭 STORY CHARACTER (like roleplay ai_role)
      story_character: {
        name: "Nova",
        personality: "Curious, enthusiastic, loves visiting houses",
        backstory: "Nova travels the world visiting different houses. She's excited to see YOUR house today!",
        speaking_style: "Friendly, asks follow-up questions, shares details about her own house",
        facts: {
          house_size: "small",
          house_color: "blue",
          favorite_room: "bedroom",
          bedroom_color: "blue",
          has_pet: true,
          pet_type: "cat",
          pet_name: "Whiskers",
          favorite_furniture: "bed"
        }
      },
      
      // 🎬 OPENING NARRATIVE (replaces nova_greeting)
      opening_narrative: "Hi! I'm Nova! I travel around the world looking at cool houses. Today I'm visiting YOUR house! I'm so excited! What do I call you? Say: My name is Alex or I am Alex",
      
      nova_greeting: "Hi! Let's explore your house together!", // DEPRECATED - use opening_narrative
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 5 Mission 1 - Room Exploration. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: You are Nova, a cheerful traveler who visits houses around the world. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. Ask OPEN-ENDED questions (What...? Tell me about...?) - NOT Yes/No questions. GRAMMAR FOCUS: Articles A/An (This is a kitchen. There is a bed. It is an apple). Recast errors naturally: if student says 'bedroom is big' respond 'Yes! The bedroom IS big! What else is in your bedroom?' VOCABULARY TARGET: bedroom, kitchen, bathroom, living_room, bed, chair, table, house. CONVERSATION FLOW: Start with student name and house size/color, then explore each room and its furniture. ENCOURAGE: Every 3-4 turns, invite student to ask YOU about your own house. SAMPLE TURN: 'What is your favorite room? Say: My favorite room is the bedroom.' GAME FLOW: (1) Get name + house size/color → (2) Bedroom: ask 2-3 furniture items → (3) Kitchen: ask 2-3 items → (4) Living room: ask 2-3 items → (5) Every 3-4 turns invite student to ask about Nova's house. One room/item per turn. FORBIDDEN: Do NOT ask about colors at this stage. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask multiple rooms at once. AVOID: Complex grammar, past tense, multiple questions at once. FOCUS: Rooms and basic furniture only. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["bedroom", "kitchen", "bathroom", "living_room", "bed", "chair"],
      
      grammar_pattern: "This is a/an [noun]",
      
      // 📖 STORY ARC (phases with turn ranges)
      story_arc: [
        {
          phase: "introduction",
          turns: "1-5",
          goal: "Learn student's name, basic house info",
          required_vocab: [],
          phase_questions: [
            {
              template: "What do I call you?",
              hints: ["My", "name", "is", "I", "am"]
            },
            {
              template: "(After name) {student_answer}! Great name! Is your house big or small? Say: My house is big or My house is small",
              hints: ["My", "house", "is", "big", "small"]
            },
            {
              template: "(After house size) {student_answer}! Good! What color is your house? Say: My house is blue or My house is white",
              hints: ["My", "house", "is", "blue", "white", "red"]
            },
            {
              template: "(After color) {student_answer}! Nice! Do you live in a house or an apartment? Say: I live in a house or I live in an apartment",
              hints: ["I", "live", "in", "a", "house", "apartment"]
            },
            {
              template: "(After house/apartment) {student_answer}! Perfect! How many rooms do you have? Say: My house has two rooms or My house has three rooms",
              hints: ["My", "house", "has", "two", "three", "rooms"]
            }
          ]
        },
        {
          phase: "room_exploration",
          turns: "6-12",
          goal: "Explore DIFFERENT rooms (bedroom, living room, kitchen)",
          required_vocab: ["bedroom", "kitchen", "bathroom", "living_room"],
          phase_questions: [
            {
              template: "What is your favorite room? Say: My favorite room is the bedroom or My favorite room is the living room",
              hints: ["My", "favorite", "room", "is", "the", "bedroom", "living", "room", "kitchen"]
            },
            {
              template: "What is in the living room? Say: There is a sofa in the living room or There is a TV in the living room",
              hints: ["There", "is", "a", "sofa", "TV", "table", "in", "the", "living", "room"]
            },
            {
              template: "What is in the kitchen? Say: There is a fridge in the kitchen or There is a table in the kitchen",
              hints: ["There", "is", "a", "fridge", "table", "chairs", "in", "the", "kitchen"]
            },
            {
              template: "Do you have a bathroom? Is it big or small? Say: Yes, I have a bathroom. It is big or It is small",
              hints: ["Yes", "I", "have", "a", "bathroom", "It", "is", "big", "small"]
            },
            {
              template: "Where do you eat? Say: I eat in the kitchen or I eat in the living room",
              hints: ["I", "eat", "in", "the", "kitchen", "living", "room"]
            }
          ]
        },
        {
          phase: "family_and_activities",
          turns: "13-17",
          goal: "Ask about people and activities",
          required_vocab: [],
          phase_questions: [
            {
              template: "Who lives in your house? Say: My mother lives in my house or My father lives in my house",
              hints: ["My", "mother", "father", "brother", "sister", "lives", "in", "my", "house"]
            },
            {
              template: "Where do you play? Say: I play in my bedroom or I play in the living room",
              hints: ["I", "play", "in", "my", "bedroom", "living", "room"]
            },
            {
              template: "What do you do in your bedroom? Say: I sleep in my bedroom or I play in my bedroom",
              hints: ["I", "sleep", "play", "read", "in", "my", "bedroom"]
            },
            {
              template: "Do you have a pet? Say: Yes, I have a dog or Yes, I have a cat",
              hints: ["Yes", "I", "have", "a", "dog", "cat", "fish", "No", "don't", "pet"]
            },
            {
              template: "Where does your pet sleep? Say: My pet sleeps in my room or My pet sleeps in another room",
              hints: ["My", "pet", "sleeps", "in", "my", "room", "another"]
            }
          ]
        },
        {
          phase: "conclusion",
          turns: "18-20",
          goal: "Wrap up, say goodbye",
          required_vocab: [],
          phase_questions: [
            {
              template: "Your house is wonderful! What is your favorite thing in your house? Say: My favorite thing is the bed or My favorite thing is the sofa",
              hints: ["My", "favorite", "thing", "is", "the", "bed", "sofa", "table"]
            },
            {
              template: "Thank you for showing me your house! I had fun! Did you have fun? Say: Yes, I had fun or It was great",
              hints: ["Yes", "I", "had", "fun", "Thank", "you", "great"]
            },
            {
              template: "Goodbye! I hope to visit again! Say: Goodbye!",
              hints: ["Goodbye", "See", "you", "Bye"]
            }
          ]
        }
      ],
      
      // 🎯 TURN LIMIT (like roleplay)
      minimum_turns: 8,
      maximum_turns: 12,
      
      
      
      expected_duration: "15+ minutes"
    },
    {
      mission_id: 2,
      title: "The Dark Room",
      title_vi: "Căn Phòng Tối",
      theme: "Grammar a/an Game",
      
      nova_greeting: "Oh no! The house is so dark! I have a flashlight. Let's look!",
      default_hints: ["There", "is", "a", "table"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 5 Mission 2 - The Dark Room (Flashlight Game). CHARACTER: Nova shines a flashlight in a dark mystery room, revealing objects one by one. OPENING: Say 'I have my magic flashlight! It is very dark. I shine on something... What is this?' GAME MECHANIC: Nova shines flashlight on ONE object → student says "There is a/an [object]" → confirm/recast a/an error → next object. One item per turn. STRICT GAME RULES: 1. Nova ONLY shines flashlight on objects and asks 'What is this?' or 'What do you see?' 2. Student MUST answer using 'There is a/an [object]' 3. Nova corrects a/an errors immediately: 'Oops! AN umbrella - because U is a vowel! Say again!' 4. Confirm correct answers with excitement, then shine on NEXT object. VOCABULARY: apple, egg, umbrella, octopus, spider, cat, book, lamp (chosen to test vowel vs consonant). GRAMMAR ENFORCEMENT: Every student answer must practice 'There is a/an...' - correct every single error with a recast. FORBIDDEN: Do NOT ask personal questions (age, name, feelings). Do NOT change topic. STAY IN CHARACTER as flashlight explorer. EXCITEMENT: Use short sounds (Wow! Eww! Oh!) to keep energy high. AVOID: emojis (TTS reads them). MINIMUM: 8 object rounds. SCAFFOLD: Give hint "Say: It is a table!" or "Say: I see a chair!" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["book", "notebook", "chair", "table", "bed", "bedroom", "kitchen", "bathroom", "living_room", "house"],
      
      grammar_pattern: "There is a/an [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Nova",
        personality: "adventurous, playful, loves surprises and discoveries",
        backstory: "The house has a blackout! It's so dark! Good thing I have a flashlight. Let's explore together!",
        speaking_style: "excited, uses sound effects (Wow! Eww! Oh!), corrects a/an errors gently but immediately",
        facts: [
          "I have a flashlight to explore dark rooms!",
          "I love finding surprise objects in the dark!",
          "I will shine my light on different things!",
          "I help you say 'a' or 'an' correctly!",
          "I love adventure and surprises!"
        ],
        role: "Explorer with flashlight discovering objects in darkness"
      },

      opening_narrative: "Oh no! So dark! 🌑 I have a flashlight! 🔦 (Shine on table) Wow! What is this? Say: It is a table!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Darkness and Flashlight",
          focus: "Establish grammar pattern with simple objects",
          phase_questions: [
            "(Shine 🔦 on book 📖) What is this? There is a...",
            "(Shine 🔦 on chair 🪑) What do you see? There is a...",
            "(Shine 🔦 on bed 🛏️) For sleeping! There is a...",
            "(Shine 🔦 on kitchen 🍳) A room! There is a..."
          ],
          example_answers: [
            "There is a book",
            "There is a chair", 
            "There is a table",
            "There is a bed"
          ]
        },
        {
          phase: "vowel_trap",
          turns: "5-12",
          phase_name: "More Objects Challenge",
          focus: "Practice with more furniture and objects",
          phase_questions: [
            "(Shine 🔦 on notebook 📓) For writing! There is a...",
            "(Shine 🔦 on bedroom 🚪) A room for sleeping! There is a...",
            "(Shine 🔦 on bathroom 🚿) A room for washing! There is a...",
            "(Shine 🔦 on living room 🛋️) A room for family! There is a...",
            "(Shine 🔦 on chair 🪑) You sit here! There is a...",
            "(Shine 🔦 on table 🪑) You eat here! There is a...",
            "(Shine 🔦 on book 📖) You read this! There is a...",
            "(Shine 🔦 on house 🏠) Where you live! There is a..."
          ],
          example_answers: [
            "There is a notebook",
            "There is a bed",
            "There is a chair", 
            "There is a table",
            "There is a book",
            "There is a bedroom",
            "There is a kitchen",
            "There is a bathroom"
          ]
        },
        {
          phase: "speed_round",
          turns: "13-16",
          phase_name: "Quick Discovery",
          focus: "Fast-paced practice",
          phase_questions: [
            "(Shine quickly) What is this? Quick! There is...",
            "(Shine on floor) What do you see? There is...",
            "(Shine in corner) Surprise! What is it? There is...",
            "Great job! What was the hardest word?"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Lights On",
          focus: "Celebrate learning a/an",
          phase_questions: [
            "The lights are back! ✨ Tell me one thing we found. There is...",
            "Perfect! You learned A and AN! Bye bye! 👋"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Mystery Box",
      title_vi: "Chiếc Hộp Bí Ẩn",
      theme: "Guessing Game",
      
      nova_greeting: "Look! I found an old mystery box! Let's see what's inside!",
      default_hints: ["There", "is", "a", "book"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 5 Mission 3 - The Mystery Box (Riddle Game). CHARACTER: Nova has a big mystery box. She reaches in and describes what she feels WITHOUT looking. Student guesses using 'There is a/an...' OPENING: Say 'I have a Mystery Box! I can feel something inside... it is flat and square... what do you think it is? Say: There is a...' STUDENT PROFILE: 6-12 years old, A0+ level. LANGUAGE: SIMPLE, PLAYFUL words, max 8 words per sentence. GRAMMAR FOCUS: 'There is a/an [object]' - practice articles with every single guess. CLUE SYSTEM: Touch clues (flat, soft, hard, round, heavy, light), function clues (for sleeping, for sitting, for reading). VOCABULARY: book, notebook, chair, table, bed, bedroom, kitchen, bathroom, house, living_room. CORRECT a/an ERRORS: 'Oops! A book - B is not a vowel! Say: There is A book. Try again!' CELEBRATE correct guesses: 'YES! There IS a book! You are amazing!' GAME MECHANIC: Nova feels object → gives 1-2 clues (touch + function) → student guesses 'There is a/an ___' → confirm or recast → next object. One object per round. FORBIDDEN: Do NOT give away the answer. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask about colors, sizes, or non-object topics. AVOID: Making clues too hard. Give extra hints if student is stuck after 2 tries. MINIMUM: 6 object riddles. FOCUS: Turn grammar practice into exciting guessing game. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["book", "notebook", "chair", "table", "bed", "bedroom", "kitchen", "bathroom", "house", "living_room"],
      
      grammar_pattern: "There is a/an [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Nova",
        personality: "mysterious, playful, loves riddles and surprises",
        backstory: "I found an old magic box in the Mystery House! I can't see inside, but I can feel and hear things. Let's guess together!",
        speaking_style: "mysterious, uses riddle language, gives clear clues, celebrates correct guesses",
        facts: [
          "I found a mystery box in an old house!",
          "I reach inside but can't see the objects!",
          "I describe what I feel or hear!",
          "I love when you guess correctly!",
          "I help you say 'a' or 'an' correctly!"
        ],
        role: "Mystery box host giving riddles for student to guess"
      },

      opening_narrative: "Look! 📦 A mystery box! (Touch touch) I feel something flat with pages... Say: It is a book!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-3",
          phase_name: "Mystery Box Opens",
          focus: "Introduce guessing game with school objects",
          phase_questions: [
            "(Feel 👋 flat with pages 📖) What is it? There is a...",
            "(Feel 👋 small for writing 📓) What is this? There is a...",
            "(Feel 👋 has four legs 🪑) You sit here! There is a..."
          ],
          example_answers: [
            "There is a book",
            "There is a notebook",
            "There is a chair"
          ]
        },
        {
          phase: "sound_clues",
          turns: "4-8",
          phase_name: "More Objects",
          focus: "Guess more objects from the house",
          phase_questions: [
            "(Feel 👋 flat and big 🪑) You eat here! There is a...",
            "(Feel 👋 soft and big 🛏️) You sleep here! There is a...",
            "(Feel 👋 a room with door 🚪) For sleeping! There is a...",
            "(Feel 👋 a room 🍳) For cooking! There is a...",
            "(Feel 👋 a room 🚿) For washing! There is a..."
          ],
          example_answers: [
            "There is a table",
            "There is a bed",
            "There is a bedroom",
            "There is a kitchen",
            "There is a bathroom"
          ]
        },
        {
          phase: "feeling_clues",
          turns: "9-14",
          phase_name: "Final Objects",
          focus: "Complete the mystery box game",
          phase_questions: [
            "(Feel 👋 big building 🏠) Where you live! There is a...",
            "(Feel 👋 a room 🛋️) For family time! There is a...",
            "(Feel 👋 in bedroom 🛏️) You sleep here! There is a...",
            "(Feel 👋 flat surface 🪑) You eat here! There is a...",
            "(Feel 👋 has four legs 🪑) You sit here! There is a...",
            "(Feel 👋 has pages 📖) You read this! There is a..."
          ],
          example_answers: [
            "There is a house",
            "There is a book",
            "There is a chair",
            "There is a bed",
            "There is a table",
            "There is a notebook"
          ]
        },
        {
          phase: "conclusion",
          turns: "15-18",
          phase_name: "Mystery Box Complete!",
          focus: "Celebrate all the discoveries",
          phase_questions: [
            "We found everything in the mystery box! 🎉 What was your favorite?",
            "Great job! You learned so many words! Ready to say goodbye?",
            "Perfect! See you next time! 👋"
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
    week_title: "The Mystery House",
    week_number: 5,
    theme: "Rooms and Furniture",
    
    knowledge_base: [
      "Rooms in a house: bedroom, kitchen, bathroom, living room",
      "Furniture: bed, chair, table, desk, lamp, mirror",
      "Grammar: Articles A/An (This is a bedroom, There is an apple)",
      "We sleep in the bedroom on a bed",
      "We cook and eat in the kitchen at a table",
      "We wash in the bathroom",
      "We relax in the living room with family",
      "Different houses have different numbers of rooms",
      "Furniture helps us live comfortably",
      "We can explore and describe our house in English"
    ],
    
    example_opening_questions: [
      "What rooms are in your house?",
      "What is your favorite room?",
      "Where do you sleep?",
      "What furniture is in your bedroom?",
      "Do you have a big house?",
      "What color is your house?",
      "Who lives in your house?"
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
      id: 'week5_house_tour',
      label_en: "House Tour Guide 🏠",
      label_vi: "Hướng dẫn viên Tham quan Nhà 🏠",
      icon: "🏠",
      ai_role: "Friendly house tour guide showing a mystery house",
      user_role: "Visitor exploring the house",
      intro: "Welcome! I'm your guide today. This is a very special mystery house. Let me show you around!",
      context: "Week 5 theme - Rooms & Furniture. AI acts as enthusiastic tour guide pointing out rooms (bedroom, kitchen, bathroom, living room) and furniture (bed, chair, table). Guide asks visitor what they see, what they like, and teaches names using 'This is a...', 'There is a...' patterns. Guide should be friendly, encouraging, and use simple words suitable for A0+ level."
    }
  },


  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_house',
      emoji: '🏠',
      title: 'My House Tour',
      bridge: 'In the story, we explored a mysterious house full of interesting rooms! 🔦',
      seed_question: 'What is in your house? Is there a big kitchen or a nice garden?',
      frames: [
        { template: 'There is a ___', follow_up_q: 'What is in your house? Is there a kitchen or a garden?', hints: ['kitchen', 'garden', 'big living room'] },
        { template: 'There is a ___ in my house', follow_up_q: 'What special thing is in your house?', hints: ['big sofa', 'TV', 'nice kitchen'] },
        { template: 'There is an ___ in my house', follow_up_q: 'Is there an armchair or an oven?', hints: ['armchair', 'oven', 'air conditioner'] },
        { template: 'There is a ___ in my room', follow_up_q: 'What is in your room? A bed or a desk?', hints: ['bed', 'desk', 'bookshelf'] },
        { template: 'There is a big ___', follow_up_q: 'What is big in your house? The kitchen or the garden?', hints: ['kitchen', 'garden', 'living room'] },
        { template: 'There is a ___', follow_up_q: 'What two things are in your house?', hints: ['sofa and a TV', 'bed and a desk', 'kitchen and a garden'] },
        { template: 'There is a ___ next to my bed', follow_up_q: 'What is next to your bed?', hints: ['lamp', 'small table', 'bookshelf'] },
        { template: 'There is a nice ___', follow_up_q: 'What is nice in your house?', hints: ['garden', 'kitchen', 'living room'] }
      ],
      scaffold_frames: ['In my ___ there is ___', 'My ___ has ___', 'I like my ___ because ___'],
      vocab_focus: ['bedroom', 'kitchen', 'living room', 'bathroom', 'sofa'],
      turns: 8
    },
    {
      id: 'spark_favourite_room',
      emoji: '⭐',
      title: 'My Favourite Room',
      bridge: 'The explorer found the most amazing room in the mystery house — full of magic! ✨',
      seed_question: 'What is your favourite room? Is it the bedroom or the living room?',
      frames: [
        { template: 'My favourite room is ___', follow_up_q: 'What is your favourite room? The kitchen or the bedroom?', hints: ['the kitchen', 'the bedroom', 'the living room'] },
        { template: 'There is a ___ in my favourite room', follow_up_q: 'What is in your favourite room?', hints: ['big sofa', 'TV', 'nice bed'] },
        { template: 'There is an ___ in my room', follow_up_q: 'Is there an armchair or an air conditioner?', hints: ['armchair', 'air conditioner', 'old clock'] },
        { template: 'There is a ___ on the wall', follow_up_q: 'What is on the wall in your favourite room?', hints: ['picture', 'clock', 'mirror'] },
        { template: 'There is a ___ by the window', follow_up_q: 'What is near the window?', hints: ['plant', 'chair', 'lamp'] },
        { template: 'There is a ___ in my room', follow_up_q: 'What is in your room and what is it like?', hints: ['big cosy bed', 'large sunny window', 'tidy wooden desk'] },
        { template: 'I love my room because there is a ___', follow_up_q: 'Why do you love your room? What is in it?', hints: ['big TV', 'cozy bed', 'nice window'] },
        { template: 'There is a ___ in every room', follow_up_q: 'What is in every room? A door or a window?', hints: ['door', 'window', 'light'] }
      ],
      scaffold_frames: ['My favourite room is ___', 'I love it because ___', 'In my ___ I can ___'],
      vocab_focus: ['bedroom', 'living room', 'kitchen', 'table', 'chair'],
      turns: 8
    }
  ],

  conversation_cards: [
    {
      id: "my_home_tour",
      title: "My Home Tour",
      emoji: "🏠",
      theme: "Rooms in the House",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Welcome to my house! What rooms does your house have? Choose: I have a bedroom or I have a kitchen or I have a living room",
          options: ["I have a bedroom", "I have a kitchen", "I have a living room"]
        },
        {
          ai: "Where do you sleep? Say: I sleep in the bedroom! or I sleep in my room! or I sleep in my bed!",
          fill_blank: "I sleep in the ___",
          accept_words: ["bedroom", "bed", "room"]
        },
        {
          ai: "Where does your family eat? Say: We eat in the kitchen! or We eat in the dining room! or We eat at the table!",
          fill_blank: "We eat in the ___",
          accept_words: ["kitchen", "dining", "room"]
        },
        {
          ai: "Where do you watch TV? Choose: I watch TV in the living room or I watch TV in my bedroom",
          options: ["I watch TV in the living room", "I watch TV in my bedroom"]
        },
        {
          ai: "What is your favourite room? Say: My favourite room is the bedroom! or My favourite room is the kitchen! or My favourite room is the living room!",
          fill_blank: "My favourite room is the ___",
          accept_words: ["bedroom", "kitchen", "living room", "bathroom", "favourite", "favorite"]
        }
      ],
      completion_message: "Great house tour! 🏠 You used: bedroom, kitchen, living room, and bathroom!"
    },
    {
      id: "whats_in_my_room",
      title: "What's in My Room?",
      emoji: "🛏️",
      theme: "Furniture & Objects",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Let's look at your bedroom! Is there a bed? Say: Yes, there is a bed!",
          accept: ["Yes", "there is", "bed", "a bed"]
        },
        {
          ai: "Is there a table in your room? Choose: Yes, there is a table or No, there is no table",
          options: ["Yes, there is a table", "No, there is no table"]
        },
        {
          ai: "Is there a chair? Say: Yes, there is a chair! or No, there is no chair!",
          options: ["Yes, there is a chair!", "No, there is no chair!"]
        },
        {
          ai: "Is there a window in your room? Choose: Yes, there is a window or No, there is no window",
          options: ["Yes, there is a window", "No, there is no window"]
        },
        {
          ai: "Tell me one thing in your room! Say: There is a bed in my room! or There is a table in my room! or There is a chair in my room!",
          fill_blank: "There is a ___ in my room",
          accept_words: ["bed", "table", "chair", "lamp", "window", "door", "desk", "sofa", "there is"]
        },
        {
          ai: "Is your room big or small? Say: My room is big! or My room is small! or My room is large!",
          fill_blank: "My room is ___",
          accept_words: ["big", "small", "large", "tiny", "room"]
        }
      ],
      completion_message: "Excellent! You described your room! 🛏️ You used: there is, bed, table, chair, and window!"
    },
    {
      id: "dream_bedroom",
      title: "My Dream Bedroom",
      emoji: "⭐",
      theme: "Designing a Room",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Imagine your dream bedroom! What colour are the walls? Say: The walls are red! or The walls are blue! or The walls are pink!",
          fill_blank: "The walls are ___",
          accept_words: ["red", "blue", "pink", "yellow", "green", "purple", "white", "orange", "walls"]
        },
        {
          ai: "What furniture is in your dream room? Choose: I want a big bed or I want a sofa or I want a big desk",
          options: ["I want a big bed", "I want a sofa", "I want a big desk"]
        },
        {
          ai: "Do you want a TV in your bedroom? Say: Yes, I want a TV! or No, I don't want a TV.",
          options: ["Yes, I want a TV!", "No, I don't want a TV."]
        },
        {
          ai: "What else do you want? Choose: I want a bookshelf or I want a big window or I want a game area",
          options: ["I want a bookshelf", "I want a big window", "I want a game area"]
        },
        {
          ai: "Is your dream room big or small? Say: My dream room is very big! or My dream room is very large! or My dream room is very small!",
          fill_blank: "My dream room is very ___!",
          accept_words: ["big", "large", "small", "beautiful", "nice", "room"]
        }
      ],
      completion_message: "What a dream room! ⭐ You used: I want, the walls are, and furniture words!"
    }
  ]
};

export default week5RealData;
