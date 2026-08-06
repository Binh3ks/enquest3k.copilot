const week10RealData = {
  // === METADATA ===
  week_id: 10,
  phase: 1,
  block: "A",
  unit: 2,
  week_number: 10,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 10: The Farm Adventure",
  week_title_en: "The Farm Adventure (Contrast)",
  week_title_vi: "Cuộc phiêu lưu Nông trại (Đối lập)",
  
  topic: "Contrast between City and Farm",
  topic_vi: "Đối lập giữa Thành phố và Nông trại",

  chunk_focus: [
    "in the countryside",
    "In the city",
    "there are",
    "many animals",
    "run very fast",
    "run quickly",
    "walk in",
    "big green field",
    "There are",
    "many trees",
    "very tall",
    "very busy",
    "countryside is peaceful",
    "Next time",
    "best place"
  ],
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Make contrasting statements using 'but'",
  learning_outcome_vi: "Đưa ra câu so sánh đối lập sử dụng 'but'",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Contrast with 'but'",
  grammar_pattern: "The the park is [adjective], but the the park is [adjective]",
  grammar_examples: [
    "The city is noisy, but the farm is quiet.",
    "The city is busy, but the farm is peaceful.",
    "The farm is clean, but the city is dirty.",
    "The farm has animals, but the city has cars."
  ],
  
  // === TARGET VOCABULARY (10 FARM & COUNTRYSIDE WORDS) ===
  target_vocab: [
    {
      word: "countryside",
      pronunciation: "/ˈkʌntrisaɪd/",
      definition_vi: "nông thôn",
      definition_en: "rural areas outside of cities",
      example: "The countryside is quiet and peaceful.",
      syllabus_context: "Places"
    },
    {
      word: "farm",
      pronunciation: "/fɑːrm/",
      definition_vi: "trang trại",
      definition_en: "a place where people grow food and raise animals",
      example: "The farm has many animals.",
      syllabus_context: "Places"
    },
    {
      word: "quiet",
      pronunciation: "/ˈkwaɪət/",
      definition_vi: "yên tĩnh",
      definition_en: "making little or no noise",
      example: "The farm is quiet, but the city is noisy.",
      syllabus_context: "Adjectives - opposite of noisy"
    },
    {
      word: "clean",
      pronunciation: "/kliːn/",
      definition_vi: "sạch sẽ",
      definition_en: "free from dirt",
      example: "The farm is clean.",
      syllabus_context: "Adjectives"
    },
    {
      word: "peaceful",
      pronunciation: "/ˈpiːsfəl/",
      definition_vi: "thanh bình",
      definition_en: "calm and quiet",
      example: "The farm is peaceful.",
      syllabus_context: "Adjectives"
    },
    {
      word: "animals",
      pronunciation: "/ˈænɪməlz/",
      definition_vi: "động vật",
      definition_en: "living creatures like cows and chickens",
      example: "I see animals on the farm.",
      syllabus_context: "Living things"
    },
    {
      word: "cow",
      pronunciation: "/kaʊ/",
      definition_vi: "bò",
      definition_en: "a large farm animal that gives milk",
      example: "I see a cow on the farm.",
      syllabus_context: "Farm animals"
    },
    {
      word: "chicken",
      pronunciation: "/ˈtʃɪkɪn/",
      definition_vi: "gà",
      definition_en: "a farm bird that lays eggs",
      example: "I see a chicken on the farm.",
      syllabus_context: "Farm animals"
    },
    {
      word: "field",
      pronunciation: "/fiːld/",
      definition_vi: "cánh đồng",
      definition_en: "an open area of land for growing crops",
      example: "I see a green field on the farm.",
      syllabus_context: "Farm features"
    },
    {
      word: "tree",
      pronunciation: "/triː/",
      definition_vi: "cây",
      definition_en: "a tall plant with a trunk and branches",
      example: "I see a tree on the farm.",
      syllabus_context: "Nature"
    }
  ],
  
  global_vocab: ["countryside", "farm", "quiet", "clean", "peaceful", "animals", "cow", "chicken", "field", "tree"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly tour guide and farm expert, warm and enthusiastic",
    tone: "Warm, excited about showing the difference between city and farm",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Nova! I love showing people the city AND the farm! They are very different! What do I call you? Say: My name is your name.",
      mission_2: "Hi! Welcome to my farm! I have many animal friends here. It is quiet and peaceful. Let me show you around!",
      mission_3: "Hi! Now you know both the city and the farm! Which one do you like? Let's talk about your favorite place!"
    },
    conversation_style: [
      "Natural and flowing - like a tour guide showing places",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "FOCUS on contrast patterns: The the park is [adj], but the the park is [adj]"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct contrast form naturally",
    recast_example: {
      student: "City noisy farm quiet.",
      nova_recast: "Yes! The city IS noisy, BUT the farm IS quiet! They are different!"
    },
    vocabulary_scaffolding: [
      "Mission 1: city (review Week 9), farm, quiet vs noisy, clean vs dirty",
      "Mission 2: animals, cow, chicken, field, tree, peaceful",
      "Mission 3: countryside, all vocab - full contrast sentences"
    ],
    questioning_skill: [
      "Is the city noisy or quiet?",
      "Is the farm noisy or quiet?",
      "What do you see on the farm?",
      "Do you like the city or the farm?",
      "Why do you like the farm?"
    ],
    must_use_vocab: ["countryside", "farm", "quiet", "clean", "peaceful", "animals", "cow", "chicken"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Complex tenses - Week 10 scope is present simple with contrast"
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
        student: "Pen in backpack.",
        tutor_response: "Great! There is a pen IN my backpack. What else is in your backpack?"
      },
      {
        student: "There is book.",
        tutor_response: "Nice! There is A book. Say: There is a book in my backpack!"
      },
      {
        student: "I have ruler.",
        tutor_response: "Wonderful! There is a ruler in my backpack. What is next to the ruler?"
      }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "City vs Farm Tour",
      title_vi: "So sánh Thành phố và Nông trại",
      theme: "Comparing City and Farm",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Nova",
        personality: "Enthusiastic tour guide, loves showing differences",
        backstory: "Nova takes students on tours to compare city life with farm life!",
        speaking_style: "Friendly, points out contrasts, uses 'but' to show differences",
        facts: {
          loves_tours: true,
          knows_city: true,
          knows_farm: true,
          favorite_place: "farm",
          teaches_contrast: true,
          loves_nature: true
        }
      },
      
      // 🎬 OPENING NARRATIVE
      opening_narrative: "Hi! I'm Nova! Let's compare the city and the farm! They are very different! What is your name? Say: My name is Alex",
      
      nova_greeting: "Hi! Let's visit the city and the farm!", // DEPRECATED
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 10 Mission 1 - City vs Farm Tour. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova is a tour guide showing the differences between city and farm. OPENING: Ask student's name, then say "We start in the city! Is the city noisy or quiet? Say: The city is noisy." STRICT GAME RULES: 1. FIRST review city (Week 9 vocab: noisy, busy). 2. THEN introduce farm (quiet, peaceful, clean). 3. THEN practice contrast: "The city is [adj], but the farm is [adj]." 4. Student MUST use complete contrast sentences with 'but'. VOCABULARY TARGET: city (review), farm, quiet, noisy, busy, peaceful, clean. ALLOWED QUESTIONS: "Is the city noisy?", "Is the farm noisy?", "Now compare! Say: The city is noisy, but the farm is quiet!" GRAMMAR ENFORCEMENT: Every answer must practice contrast with 'but' - recast all errors naturally. GAME MECHANIC: Describe city → student responds → describe farm → student responds → ask for contrast sentence. FORBIDDEN: Do NOT ask about complex preferences yet. NEVER say 'Tell me more!' as filler. FOCUS on simple contrast patterns. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["city", "farm", "quiet", "noisy", "busy", "peaceful", "clean"],
      
      grammar_pattern: "The the park is [adjective], but the the park is [adjective]",
      
      // 📖 STORY ARC
      story_arc: [
        {
          phase: "city_review",
          turns: "1-4",
          goal: "Review city characteristics from Week 9",
          required_vocab: [],
          phase_questions: [
            {
              template: "(After name) {student_answer}! Great name! We start in the city! Listen to the sounds! Beep beep! Vroom vroom! Is the city noisy or quiet? Say: The city is noisy",
              hints: ["The", "city", "is", "noisy", "quiet"]
            },
            {
              template: "(After city noisy) {student_answer}! Yes! The city is noisy! Look at all the people and cars! Is the city busy or empty? Say: The city is busy",
              hints: ["The", "city", "is", "busy", "empty"]
            },
            {
              template: "(After city busy) {student_answer}! The city is busy! Many people and cars! Now let's go to the farm! Ready? Say: Yes, ready!",
              hints: ["Yes", "ready", "Okay"]
            }
          ]
        },
        {
          phase: "farm_introduction",
          turns: "5-8",
          goal: "Introduce farm and its characteristics",
          required_vocab: ["farm", "quiet", "peaceful"],
          phase_questions: [
            {
              template: "Welcome to the farm! Listen... So quiet! No cars! Is the farm noisy or quiet? Say: The farm is quiet",
              hints: ["The", "farm", "is", "quiet", "noisy"]
            },
            {
              template: "(After farm quiet) {student_answer}! Yes! The farm is quiet! Look at the clean air! Is the farm clean or dirty? Say: The farm is clean",
              hints: ["The", "farm", "is", "clean", "dirty"]
            },
            {
              template: "(After clean) {student_answer}! The farm is clean! So calm and nice! Is the farm peaceful or busy? Say: The farm is peaceful",
              hints: ["The", "farm", "is", "peaceful", "busy"]
            }
          ]
        },
        {
          phase: "contrast_practice",
          turns: "9-12",
          goal: "Practice full contrast sentences with 'but'",
          required_vocab: ["city", "farm", "noisy", "quiet", "but"],
          phase_questions: [
            {
              template: "Now compare them! The city is noisy. The farm is quiet. Use 'but'! Say: The city is noisy, but the farm is quiet",
              hints: ["The", "city", "is", "noisy", "but", "the", "farm", "is", "quiet"]
            },
            {
              template: "Great job! Try another one! The city is busy. The farm is peaceful. Say: The city is busy, but the farm is peaceful",
              hints: ["The", "city", "is", "busy", "but", "the", "farm", "is", "peaceful"]
            },
            {
              template: "Perfect! One more! The city is dirty. The farm is clean. Say: The city is dirty, but the farm is clean",
              hints: ["The", "city", "is", "dirty", "but", "the", "farm", "is", "clean"]
            },
            {
              template: "Wonderful! You know the difference! The city and farm are very different! Goodbye for now!",
              hints: ["Goodbye", "Bye", "Thank", "you"]
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
      title: "Farm Animal Friends",
      title_vi: "Những Người Bạn Động Vật Trang Trại",
      theme: "Meeting Animals on the Farm",
      
      nova_greeting: "Welcome to my farm! Let's meet my animal friends!", // DEPRECATED
      default_hints: ["I", "see", "a", "cow"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 10 Mission 2 - Farm Animal Friends. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. FOCUS on farm animals and environment. GRAMMAR: Descriptive sentences with adjectives: "The farm is [adj]" and "I see lion". VOCABULARY: farm, animals, cow, chicken, field, tree, quiet, clean, peaceful. STRICT FOCUS: FARM ENVIRONMENT AND ANIMALS - Every question about what student sees or how farm is. FORBIDDEN: Do NOT ask complex questions. Keep it simple: "What do you see?", "Is the farm quiet?", "Do you like the cow?" GAME MECHANIC: Show animal/place → student identifies or describes → confirm/recast → next item. NEVER say 'Tell me more!' as filler. Focus on simple descriptions of farm. SCAFFOLD: Give hint "Say: I see a cow!" or "Say: The farm is big and green!" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["farm", "animals", "cow", "chicken", "field", "tree", "quiet", "peaceful", "clean"],
      
      grammar_pattern: "I see lion. The farm is [adjective].",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Farmer Nova",
        personality: "friendly farmer, loves animals, patient and kind",
        backstory: "I am Farmer Nova! I live on this farm with many animals! Let me show you around!",
        speaking_style: "warm, introduces animals one by one, describes farm environment",
        facts: {
          loves_animals: true,
          has_farm: true,
          favorite_animal: "cow",
          farm_is_clean: true,
          farm_is_quiet: true,
          farm_is_peaceful: true
        },
        role: "Farmer showing student around the farm"
      },

      opening_narrative: "Hi! I'm Farmer Nova! Welcome to my farm! It is quiet and peaceful here! Let me show you my animal friends! What do you see? Say: I see...",

      story_arc: [
        {
          phase: "farm_arrival",
          turns: "1-4",
          phase_name: "Arrive at Farm",
          focus: "Introduce farm environment",
          phase_questions: [
            {
              template: "Welcome to my farm! Look around! Is the farm quiet or noisy? Say: The farm is quiet",
              hints: ["The", "farm", "is", "quiet", "noisy"]
            },
            {
              template: "Yes! The farm is quiet! And look at the clean air! Is the farm clean or dirty? Say: The farm is clean",
              hints: ["The", "farm", "is", "clean", "dirty"]
            },
            {
              template: "Great! The farm is clean! It is so calm here! Is the farm peaceful or busy? Say: The farm is peaceful",
              hints: ["The", "farm", "is", "peaceful", "busy"]
            },
            {
              template: "Perfect! The farm is quiet, clean, and peaceful! Now let's meet my animals!",
              hints: ["Yes", "Okay", "Great"]
            }
          ],
          example_answers: [
            "The farm is quiet",
            "The farm is clean",
            "The farm is peaceful",
            "Yes"
          ]
        },
        {
          phase: "meet_animals",
          turns: "5-10",
          phase_name: "Meet the Animals",
          focus: "Identify farm animals",
          phase_questions: [
            {
              template: "Look! A big animal! It gives milk! What do you see? Say: I see a cow",
              hints: ["I", "see", "a", "cow"]
            },
            {
              template: "Yes! I see a cow! The cow is big! What sound does a cow make? Say: Moo moo",
              hints: ["Moo", "moo", "cow"]
            },
            {
              template: "Moo moo! Great! Look over there! A bird! It lays eggs! What do you see? Say: I see a chicken",
              hints: ["I", "see", "a", "chicken"]
            },
            {
              template: "Yes! I see a chicken! What sound does a chicken make? Say: Cluck cluck",
              hints: ["Cluck", "cluck", "chicken"]
            },
            {
              template: "Cluck cluck! Perfect! Look around! How many animals do you see? Say: I see animals",
              hints: ["I", "see", "animals", "many"]
            },
            {
              template: "Yes! There are many animals on the farm! Do you like the animals? Say: Yes, I like the animals",
              hints: ["Yes", "I", "like", "the", "animals"]
            }
          ],
          example_answers: [
            "I see a cow",
            "Moo moo",
            "I see a chicken",
            "Cluck cluck",
            "I see animals",
            "Yes, I like the animals"
          ]
        },
        {
          phase: "farm_features",
          turns: "11-12",
          phase_name: "Farm Features",
          focus: "Describe farm environment",
          phase_questions: [
            {
              template: "Look at the green grass! And the big trees! What do you see? Say: I see a field or I see a tree",
              hints: ["I", "see", "a", "field", "tree"]
            },
            {
              template: "Great job! The farm has animals, fields, and trees! It is a nice place! Goodbye! Thank you for visiting!",
              hints: ["Goodbye", "Thank", "you", "Bye"]
            }
          ],
          example_answers: [
            "I see a field",
            "Goodbye"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "My Favorite Place",
      title_vi: "Nơi Tôi Yêu Thích",
      theme: "Choose and Describe Preference",
      
      nova_greeting: "Let's talk about your favorite place!", // DEPRECATED
      default_hints: ["I", "like", "the", "farm"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 10 Mission 3 - My Favorite Place. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. FOCUS on preference and reasoning with contrast. GRAMMAR: "I like the park" and contrast with 'but': "The farm is quiet, but the city is noisy." VOCABULARY: All Week 10 vocab - city, farm, countryside, quiet, noisy, peaceful, busy, clean, animals, trees. STRICT FOCUS: PREFERENCE AND REASONING - Ask which place student likes, then ask WHY using contrast sentences. ALLOWED QUESTIONS: "Do you like the city or the farm?", "Why do you like it?", "What do you see there?" GAME MECHANIC: Recap both places → ask preference → ask for reason with contrast → ask what they see there. Student must give full sentences with reasoning. NEVER say 'Tell me more!' as filler. Focus on complete contrast explanations. SCAFFOLD: Give hint "Say: I like the park!" or "Say: The farm is quiet but the city is loud!" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["city", "farm", "countryside", "quiet", "noisy", "peaceful", "busy", "clean", "animals"],
      
      grammar_pattern: "I like the the park. The the park is [adjective], but the the park is [adjective].",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Nova",
        personality: "curious teacher, wants to hear student's opinion, encouraging",
        backstory: "I showed you the city and the farm! Now I want to know - which one do you like?",
        speaking_style: "warm, asks for opinions, helps student explain with contrast sentences",
        facts: {
          showed_city: true,
          showed_farm: true,
          loves_both_places: true,
          wants_student_opinion: true,
          teaches_contrast: true,
          patient: true
        },
        role: "Teacher asking for student's preference and reasoning"
      },

      opening_narrative: "Hi again! You visited the city and the farm! They are very different! Which one do you like? Say: I like the...",

      story_arc: [
        {
          phase: "recap",
          turns: "1-3",
          phase_name: "Recap Both Places",
          focus: "Review city and farm",
          phase_questions: [
            {
              template: "You saw the city and the farm! Remember the city? Is it noisy or quiet? Say: The city is noisy",
              hints: ["The", "city", "is", "noisy", "quiet"]
            },
            {
              template: "Yes! The city is noisy! And the farm? Is it noisy or quiet? Say: The farm is quiet",
              hints: ["The", "farm", "is", "quiet", "noisy"]
            },
            {
              template: "Perfect! They are different! The city is noisy, but the farm is quiet!",
              hints: ["Yes", "different", "contrast"]
            }
          ],
          example_answers: [
            "The city is noisy",
            "The farm is quiet",
            "Yes"
          ]
        },
        {
          phase: "preference",
          turns: "4-8",
          phase_name: "Student's Choice",
          focus: "Ask and explain preference",
          phase_questions: [
            {
              template: "Now you choose! Do you like the city or the farm? Say: I like the city or I like the farm",
              hints: ["I", "like", "the", "city", "farm"]
            },
            {
              template: "You like the (city/farm)! Why do you like it? Say: The (city/farm) is (adjective)",
              hints: ["The", "farm", "is", "quiet", "peaceful", "clean"]
            },
            {
              template: "Good! The (chosen place) is (adjective)! What is different about the other place? Say: The (city/farm) is (adjective), but the (city/farm) is (adjective)",
              hints: ["but", "the", "city", "is", "noisy", "farm", "quiet"]
            },
            {
              template: "Great contrast! What do you see in the (chosen place)? Say: I see (things)",
              hints: ["I", "see", "animals", "trees", "cars", "buildings"]
            },
            {
              template: "Perfect! You see (things) in the (chosen place)! Do you see that in the other place? Say: Yes or No",
              hints: ["Yes", "No"]
            }
          ],
          example_answers: [
            "I like the farm",
            "The farm is quiet",
            "The farm is quiet, but the city is noisy",
            "I see animals",
            "No"
          ]
        },
        {
          phase: "full_contrast",
          turns: "9-12",
          phase_name: "Complete Comparison",
          focus: "Practice full contrast sentences",
          phase_questions: [
            {
              template: "Let's compare everything! The city has cars. The farm has animals. Say: The city has cars, but the farm has animals",
              hints: ["The", "city", "has", "cars", "but", "the", "farm", "has", "animals"]
            },
            {
              template: "Excellent! The city is busy. The farm is peaceful. Say: The city is busy, but the farm is peaceful",
              hints: ["The", "city", "is", "busy", "but", "the", "farm", "is", "peaceful"]
            },
            {
              template: "Perfect! You know the difference! Which is better for you? Say: The (city/farm) is better",
              hints: ["The", "farm", "is", "better", "city"]
            },
            {
              template: "Great choice! You understand the difference between city and farm! Goodbye! See you next time!",
              hints: ["Goodbye", "Bye", "Thank", "you"]
            }
          ],
          example_answers: [
            "The city has cars, but the farm has animals",
            "The city is busy, but the farm is peaceful",
            "The farm is better",
            "Goodbye"
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
    week_title: "The Farm Adventure",
    week_number: 10,
    theme: "Contrast between City and Farm",
    
    knowledge_base: [
      "Farm vocabulary: countryside, farm, quiet, clean, peaceful, animals, cow, chicken, field, tree",
      "City vocabulary (review): city, noisy, busy, dirty (opposite of clean)",
      "Grammar: The the park is [adjective], but the the park is [adjective] (Contrast with 'but')",
      "The city is noisy, but the farm is quiet",
      "The city is busy, but the farm is peaceful",
      "The farm is clean, but the city is dirty",
      "Farm animals: cows say 'moo', chickens say 'cluck'",
      "The farm has animals, fields, and trees",
      "The countryside is the area outside of cities, where farms are located",
      "Using 'but' to show contrast between two different things",
      "The farm is peaceful - it means calm and quiet",
      "Clean means free from dirt, the opposite of dirty"
    ],
    
    example_opening_questions: [
      "Do you like the city or the farm?",
      "Is the farm quiet or noisy?",
      "What animals do you see on the farm?",
      "What is the difference between city and farm?",
      "Is the farm peaceful?",
      "What sound does a cow make?",
      "Do you see trees on the farm?"
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
      id: 'week10_farm_tour',
      label_en: "Farm Tour Guide 🚜",
      label_vi: "Hướng dẫn viên Nông trại 🚜",
      icon: "🚜",
      ai_role: "Farm tour guide showing the difference between city and farm",
      user_role: "Visitor comparing city and farm",
      intro: "Welcome! I will show you the farm today! It is very different from the city! Let's explore!",
      context: "Week 10 theme - Farm vs City Contrast. AI acts as a friendly tour guide showing the farm and helping student compare it with the city using 'but' for contrast (noisy/quiet, busy/peaceful, dirty/clean). Introduce farm animals (cow, chicken) and features (field, tree). Use simple A0+ level language with clear contrast patterns."
    }
  },


  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_food',
      emoji: '🥕',
      title: 'My Favourite Food',
      bridge: 'On the farm, the animals gave us milk, eggs, vegetables — so much delicious food! 🐄',
      seed_question: "What food do you like? Is it rice or noodles?",
      frames: [
        { template: 'I like ___ but not noodles', follow_up_q: 'What do you like and what do you not like? Rice or noodles?', hints: ['rice', 'apples', 'cake'] },
        { template: 'I love ___ but I prefer fruit', follow_up_q: 'What do you love but prefer something else?', hints: ['cake', 'rice', 'juice'] },
        { template: 'I like ___ but my favourite is pho', follow_up_q: 'What is your absolute favourite food?', hints: ['pho', 'cake', 'apples'] },
        { template: 'I like eating ___ but not junk food', follow_up_q: 'What do you enjoy eating but not another food?', hints: ['rice', 'fruit', 'noodles'] },
        { template: 'I like sweet ___ but not sour food', follow_up_q: 'Do you like sweet or sour food?', hints: ['cake', 'mango', 'juice'] },
        { template: 'I like ___ for breakfast', follow_up_q: 'What do you eat for breakfast vs dinner?', hints: ['bread', 'eggs', 'fruit'] },
        { template: 'I like ___ but today I want something different', follow_up_q: 'What do you normally like but what do you want today?', hints: ['rice', 'noodles', 'cake'] },
        { template: 'My favourite food is ___', follow_up_q: 'What is your favourite food and what else do you like?', hints: ['pho', 'pizza', 'mango'] },
      ],
      scaffold_frames: ['I love ___', "I don't like ___", 'Every day I eat ___'],
      vocab_focus: ['fruit', 'vegetable', 'meat', 'rice', 'egg'],
      turns: 8,
    },
    {
      id: 'spark_compare_two',
      emoji: '⚖️',
      title: 'Compare Two Things',
      bridge: 'The farm was big and slow, but the city was small and fast — they were total opposites! 🔄',
      seed_question: 'What do you like more? Is it cats or dogs?',
      frames: [
        { template: 'I like ___ but dogs are my favourite', follow_up_q: 'Which do you like more? Cats or dogs?', hints: ['cats', 'football', 'drawing'] },
        { template: 'I like ___ but swimming is my favourite', follow_up_q: 'What is your absolute favourite?', hints: ['English', 'drawing', 'cats'] },
        { template: 'I like summer but I like ___ more', follow_up_q: 'Do you like summer or another season more?', hints: ['winter', 'autumn', 'spring'] },
        { template: 'I like ___ but swimming is more fun', follow_up_q: 'What activity is more fun for you?', hints: ['drawing', 'reading', 'running'] },
        { template: 'I like ___', follow_up_q: 'What two things do you like?', hints: ['cats and dogs', 'reading and drawing', 'swimming and running'] },
        { template: 'I like ___ but my friend likes football', follow_up_q: 'What do you like vs what does your friend like?', hints: ['cats', 'swimming', 'cake'] },
        { template: 'I like ___ but I love swimming the most', follow_up_q: 'What do you love the most?', hints: ['dogs', 'cake', 'running'] },
        { template: 'I like ___ but dancing is even better', follow_up_q: 'What is even better than what you like?', hints: ['football', 'mango', 'drawing'] },
      ],
      scaffold_frames: ['___ is ___ but ___ is ___', 'I prefer ___ because ___', '___ is better than ___'],
      vocab_focus: ['bigger', 'smaller', 'faster', 'better', 'nicer'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "city_vs_farm",
      title: "City vs Farm",
      emoji: "🏙️🚜",
      theme: "Contrast — City vs Farm",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Let's compare the city and the farm! Is the city noisy or quiet? Say: The city is noisy!",
          accept: ["The city is noisy", "city", "noisy", "is noisy"]
        },
        {
          ai: "Good! Is the farm noisy or quiet? Say: The farm is quiet!",
          accept: ["The farm is quiet", "farm", "quiet", "is quiet"]
        },
        {
          ai: "Now use 'but' to contrast! Say: The city is noisy, but the farm is quiet! or The city is busy, but the farm is peaceful!",
          fill_blank: "The city is noisy, but the farm is ___",
          accept_words: ["quiet", "the farm is quiet", "but", "farm"]
        },
        {
          ai: "Perfect! Try another one! Say: The city is busy, but the farm is peaceful! or The city is busy, but the farm is quiet! or The city is busy, but the farm is calm!",
          fill_blank: "The city is busy, but the farm is ___",
          accept_words: ["peaceful", "quiet", "calm", "but", "farm"]
        },
        {
          ai: "Great job! One more! Say: The farm is clean, but the city is dirty! or The farm is clean, but the city is noisy! or The farm is clean, but the city is busy!",
          fill_blank: "The farm is clean, but the city is ___",
          accept_words: ["dirty", "noisy", "busy", "but", "city"]
        }
      ],
      completion_message: "You can contrast with 'but'! 🏙️🚜 The city is ___, but the farm is ___!"
    },
    {
      id: "farm_animals",
      title: "Farm Animals!",
      emoji: "🐮🐔",
      theme: "Meeting Farm Animals",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Welcome to the farm! Look! A big animal that gives milk! What do you see? Say: I see a cow!",
          accept: ["I see a cow", "cow", "a cow", "see"]
        },
        {
          ai: "Yes! What sound does a cow make? Say: Moo moo!",
          accept: ["Moo", "moo moo", "moo moo moo"]
        },
        {
          ai: "Great! Now look! A bird that lays eggs! What do you see? Say: I see a chicken! or I see a a chicken! or I see a bird!",
          fill_blank: "I see a ___",
          accept_words: ["chicken", "a chicken", "see", "bird"]
        },
        {
          ai: "Perfect! What sound does a chicken make? Say: Cluck cluck!",
          accept: ["Cluck", "cluck cluck", "cluck cluck cluck"]
        },
        {
          ai: "Wonderful! How many types of animals did you see? Choose: I see two animals or I see one animal",
          options: ["I see two animals", "I see one animal"]
        },
        {
          ai: "Great! Do you like farm animals? Say: Yes, I like animals!",
          accept: ["Yes", "I like", "animals", "like animals"]
        }
      ],
      completion_message: "Farm animals are fun! 🐮🐔 You met cows and chickens!"
    },
    {
      id: "my_favorite_place",
      title: "My Favorite Place",
      emoji: "❤️",
      theme: "Choosing Between City and Farm",
      difficulty: "medium",
      exchanges: [
        {
          ai: "You know the city and the farm! Which do you like? Say: I like the city or I like the farm",
          options: ["I like the city", "I like the farm"]
        },
        {
          ai: "Good choice! Why do you like it? Say: The city is noisy! or The farm is quiet! or The farm is peaceful! or The city is busy!",
          options: ["The city is noisy!", "The farm is quiet!", "The farm is peaceful!", "The city is busy!"]
        },
        {
          ai: "Nice! Now make a contrast sentence! Say: The city is noisy, but the farm is quiet! or The farm is peaceful, but the city is busy!",
          accept: ["but", "city", "farm", "quiet", "noisy", "peaceful", "busy", "clean", "dirty"]
        },
        {
          ai: "Perfect contrast! What do you see in your favorite place? Say: I see animals! or I see trees! or I see fields!",
          fill_blank: "I see ___",
          accept_words: ["animals", "trees", "fields", "cars", "buildings", "people", "cow", "chicken"]
        },
        {
          ai: "Excellent! Is your favorite place quiet or noisy? Say: It is quiet or It is noisy",
          options: ["It is quiet", "It is noisy"]
        },
        {
          ai: "Great job! You can describe and compare places! Which is better for you - city or farm?",
          accept: ["city", "farm", "the city", "the farm", "better"]
        }
      ],
      completion_message: "You can choose and explain! ❤️ You used contrast with 'but' perfectly!"
    }
  ]
};

export default week10RealData;
