const week9RealData = {
  // === METADATA ===
  week_id: 9,
  phase: 1,
  block: "A",
  unit: 2,
  week_number: 9,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 9: City Sounds & Sights",
  week_title_en: "City Sounds & Sights (Adjectives)",
  week_title_vi: "Âm thanh & Hình ảnh Thành phố (Tính từ)",
  
  topic: "Sensory description of a city",
  topic_vi: "Miêu tả cảm giác về thành phố",

  chunk_focus: [
    "Around the world",
    "lots of",
    "tall buildings",
    "very high",
    "Modern cities",
    "busy streets",
    "carry passengers",
    "during rush hour",
    "many people",
    "go to work",
    "busy city",
    "Car horns",
    "tallest buildings"
  ],
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Use adjectives before nouns to describe city features",
  learning_outcome_vi: "Sử dụng tính từ trước danh từ để miêu tả đặc điểm thành phố",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Adjectives before nouns",
  grammar_pattern: "It is a [adjective] [noun]",
  grammar_examples: [
    "It is a noisy city.",
    "It is a busy street.",
    "It is a tall building.",
    "It is a modern car."
  ],
  
  // === TARGET VOCABULARY (10 CITY WORDS) ===
  target_vocab: [
    {
      word: "city",
      pronunciation: "/ˈsɪti/",
      definition_vi: "thành phố",
      definition_en: "a large town with many buildings and people",
      example: "I live in a big city.",
      syllabus_context: "Places"
    },
    {
      word: "street",
      pronunciation: "/striːt/",
      definition_vi: "đường phố",
      definition_en: "a road in a city with buildings on both sides",
      example: "The street is very busy.",
      syllabus_context: "Places"
    },
    {
      word: "noisy",
      pronunciation: "/ˈnɔɪzi/",
      definition_vi: "ồn ào",
      definition_en: "making a lot of sound",
      example: "The city is noisy.",
      syllabus_context: "Adjectives - Sound"
    },
    {
      word: "busy",
      pronunciation: "/ˈbɪzi/",
      definition_vi: "bận rộn, đông đúc",
      definition_en: "full of people or activity",
      example: "The street is busy.",
      syllabus_context: "Adjectives - Activity"
    },
    {
      word: "tall",
      pronunciation: "/tɔːl/",
      definition_vi: "cao",
      definition_en: "having great height",
      example: "It is a tall building.",
      syllabus_context: "Adjectives - Size"
    },
    {
      word: "modern",
      pronunciation: "/ˈmɒdərn/",
      definition_vi: "hiện đại",
      definition_en: "new and up-to-date",
      example: "It is a modern city.",
      syllabus_context: "Adjectives - Style"
    },
    {
      word: "car",
      pronunciation: "/kɑːr/",
      definition_vi: "xe ô tô",
      definition_en: "a vehicle with four wheels for transport",
      example: "I see a blue car.",
      syllabus_context: "Vehicles"
    },
    {
      word: "bus",
      pronunciation: "/bʌs/",
      definition_vi: "xe buýt",
      definition_en: "a large vehicle that carries many passengers",
      example: "The bus is red.",
      syllabus_context: "Vehicles"
    },
    {
      word: "building",
      pronunciation: "/ˈbɪldɪŋ/",
      definition_vi: "tòa nhà",
      definition_en: "a structure with walls and a roof",
      example: "It is a tall building.",
      syllabus_context: "Structures"
    },
    {
      word: "traffic",
      pronunciation: "/ˈtræfɪk/",
      definition_vi: "giao thông",
      definition_en: "vehicles moving on roads",
      example: "The traffic is busy.",
      syllabus_context: "City features"
    }
  ],
  
  global_vocab: ["city", "street", "noisy", "busy", "tall", "modern", "car", "bus", "building", "traffic"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and human-like",
    tone: "Warm, curious, loves exploring cities and describing what we see",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Nova! I love walking in the city! Let's explore together. What do I call you? Say: My name is your name.",
      mission_2: "Hi! I am Reporter Nova! I am watching the traffic today. It is very busy! What is your name? Say: My name is...",
      mission_3: "Hello! I am Architect Nova! I design cities! Let's build your dream city together. What should I call you? Say: My name is..."
    },
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use 'It is a [adjective] [noun]' - Week 9 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "Noisy city.",
      nova_recast: "Yes! It IS a noisy city! What else do you see in the city?"
    },
    vocabulary_scaffolding: [
      "Mission 1: city, street, noisy, busy, tall, building - exploring city sights and sounds",
      "Mission 2: car, bus, traffic, street, busy, noisy - observing vehicles and traffic",
      "Mission 3: city, building, street, tall, modern, busy - designing dream city features"
    ],
    questioning_skill: [
      "What do you see in the city?",
      "Is the city noisy or quiet?",
      "Is the building tall or short?",
      "It is a... what?",
      "What kind of street do you want?"
    ],
    must_use_vocab: ["city", "street", "noisy", "busy", "tall", "modern", "car", "bus", "building", "traffic"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Past tense or future tense (Week 9 scope is present simple only)"
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
      "What do you see...?",
      "Is it...?",
      "Do you...?",
      "What kind of...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "Noisy city.",
        tutor_response: "Great! It IS a noisy city! What else do you see?"
      },
      {
        student: "It is tall building.",
        tutor_response: "Nice! It is A tall building. Say: It is a tall building!"
      },
      {
        student: "Busy street.",
        tutor_response: "Wonderful! It is a busy street! What do you hear on the street?"
      }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "The City Explorer",
      title_vi: "Người Khám Phá Thành Phố",
      theme: "City Sights and Sounds",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Nova",
        personality: "Curious city tour guide, loves exploring",
        backstory: "Nova is a tour guide who shows visitors around the city!",
        speaking_style: "Enthusiastic, describes what she sees and hears, uses adjectives",
        facts: {
          loves_cities: true,
          has_tour_bus: true,
          favorite_place: "tall building",
          city_name: "Sunshine City",
          knows_streets: true,
          hears_sounds: true
        }
      },
      
      // 🎬 OPENING NARRATIVE
      opening_narrative: "Hi! I'm Nova! I am a city tour guide! Let's walk through the city together! What is your name? Say: My name is Alex",
      
      nova_greeting: "Hi! Let's explore the city!", // DEPRECATED
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 9 Mission 1 - The City Explorer. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova is a city tour guide showing student around a busy city. OPENING: Ask student's name, then say "Look! We are in the city! What do you see? Say: I see a tall building." STRICT GAME RULES: 1. ONLY ask about city features student can see or hear. 2. Student MUST use adjectives before nouns: "It is a [adjective] [noun]" or "I see a [adjective] [noun]". 3. If student gives incomplete answers, prompt full sentence: "Say: It is a noisy city!" 4. Ask about ONE feature per question. VOCABULARY TARGET: city, street, noisy, busy, tall, modern, car, bus, building, traffic. ALLOWED QUESTIONS: "What do you see?", "Is the city noisy or quiet?", "Is the building tall or short?", "What do you hear?". GRAMMAR ENFORCEMENT: Every answer must practice adjective + noun pattern - recast all errors naturally. GAME MECHANIC: Point to city feature → student describes with adjective + noun → confirm/recast → point to next feature. FORBIDDEN: Do NOT ask about feelings or preferences. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. AVOID: Multiple features per turn, complex sentences. Cover at least 5 different city features. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["city", "street", "noisy", "busy", "tall", "building", "car", "bus"],
      
      grammar_pattern: "It is a [adjective] [noun]",
      
      // 📖 STORY ARC
      story_arc: [
        {
          phase: "introduction",
          turns: "1-4",
          goal: "Start city tour, describe first sights",
          required_vocab: [],
          phase_questions: [
            {
              template: "(After name) {student_answer}! Nice to meet you! Look! We are in the city! What do you see? Say: I see a tall building or I see a busy street",
              hints: ["I", "see", "a", "tall", "building", "busy", "street"]
            },
            {
              template: "(After first sight) Good! Is the building tall or short? Say: It is a tall building or It is a short building",
              hints: ["It", "is", "a", "tall", "building", "short"]
            },
            {
              template: "Great! Listen! What do you hear? Is the city noisy or quiet? Say: It is a noisy city or It is a quiet city",
              hints: ["It", "is", "a", "noisy", "city", "quiet"]
            },
            {
              template: "Perfect! Look at the street! Is it busy or empty? Say: It is a busy street or It is an empty street",
              hints: ["It", "is", "a", "busy", "street", "empty"]
            }
          ]
        },
        {
          phase: "describe_sights",
          turns: "5-8",
          goal: "Describe more city features with adjectives",
          required_vocab: ["tall", "busy", "noisy"],
          phase_questions: [
            {
              template: "Look! What is on the street? Do you see a car or a bus? Say: I see a car or I see a bus",
              hints: ["I", "see", "a", "car", "bus"]
            },
            {
              template: "Good! Is the car modern or old? Say: It is a modern car or It is an old car",
              hints: ["It", "is", "a", "modern", "car", "old"]
            },
            {
              template: "Look at more buildings! Are they tall or short? Say: They are tall buildings or They are short buildings",
              hints: ["They", "are", "tall", "buildings", "short"]
            },
            {
              template: "What else do you see on the street? Say: I see a bus or I see traffic",
              hints: ["I", "see", "a", "bus", "traffic"]
            }
          ]
        },
        {
          phase: "compare_places",
          turns: "9-11",
          goal: "Compare noisy and quiet places",
          required_vocab: ["noisy", "busy"],
          phase_questions: [
            {
              template: "This street is noisy! Where is quiet? Say: The park is quiet or The library is quiet",
              hints: ["The", "park", "is", "quiet", "library"]
            },
            {
              template: "Do you like noisy places or quiet places? Say: I like noisy places or I like quiet places",
              hints: ["I", "like", "noisy", "places", "quiet"]
            },
            {
              template: "The traffic is very busy! What do you think? Say: It is busy traffic or It is quiet traffic",
              hints: ["It", "is", "busy", "traffic", "quiet"]
            }
          ]
        },
        {
          phase: "conclusion",
          turns: "12",
          goal: "End city tour",
          required_vocab: [],
          phase_questions: [
            {
              template: "Great job exploring the city! You learned: noisy, busy, tall! Goodbye!",
              hints: ["Thank", "you", "Goodbye", "Bye"]
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
      title: "Traffic Report",
      title_vi: "Báo Cáo Giao Thông",
      theme: "Observing Traffic and Vehicles",
      
      nova_greeting: "I'm Reporter Nova! Let's watch the traffic!", // DEPRECATED
      default_hints: ["It", "is", "a", "busy", "street"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 9 Mission 2 - Traffic Report. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about TRAFFIC and VEHICLES. GRAMMAR: "It is a [adjective] [noun]" pattern. Give FULL scaffolding: "Say: It is a busy street" or "Say: I see a blue car". VOCABULARY: city, street, noisy, busy, car, bus, traffic, modern. STRICT FOCUS: DESCRIBING TRAFFIC - Every question must be about what student sees in traffic using adjectives. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?". ONLY allowed questions: "What do you see?", "Is the traffic busy?", "What color is the car?", "How many cars?". GAME MECHANIC: Point to traffic scene → student describes with adjective + noun → confirm/recast → point to next vehicle. NEVER ask about preferences or feelings - ONLY DESCRIBE WHAT YOU SEE. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["car", "bus", "street", "busy", "noisy", "traffic", "modern"],
      
      grammar_pattern: "It is a [adjective] [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Reporter Nova",
        personality: "energetic news reporter, observes traffic",
        backstory: "I report on traffic for the morning news! Let me show you how busy the city is!",
        speaking_style: "excited, describes vehicles and traffic conditions, counts things",
        facts: {
          loves_reporting: true,
          has_microphone: true,
          favorite_vehicle: "red bus",
          street_name: "Main Street",
          reports_traffic: true,
          observes_carefully: true
        },
        role: "Traffic reporter describing vehicles and street conditions"
      },

      opening_narrative: "Good morning! I'm Reporter Nova! I'm reporting on traffic today! Look at the street! What is your name? Say: My name is...",

      story_arc: [
        {
          phase: "morning_traffic",
          turns: "1-4",
          phase_name: "Start Traffic Report",
          focus: "First observations of morning traffic",
          phase_questions: [
            {
              template: "(After name) {student_answer}! Welcome to the traffic report! Look at the street! Is it busy or quiet? Say: It is a busy street or It is a quiet street",
              hints: ["It", "is", "a", "busy", "street", "quiet"]
            },
            {
              template: "Good! What do you see on the street? Say: I see a car or I see a bus",
              hints: ["I", "see", "a", "car", "bus"]
            },
            {
              template: "Great! What color is the car? Say: It is a blue car or It is a red car",
              hints: ["It", "is", "a", "blue", "car", "red", "white"]
            },
            {
              template: "Perfect! Listen! Is the street noisy or quiet? Say: It is a noisy street or It is a quiet street",
              hints: ["It", "is", "a", "noisy", "street", "quiet"]
            }
          ],
          example_answers: [
            "It is a busy street",
            "I see a car",
            "It is a blue car",
            "It is a noisy street"
          ]
        },
        {
          phase: "counting_vehicles",
          turns: "5-8",
          phase_name: "Count Cars and Buses",
          focus: "Observe and count different vehicles",
          phase_questions: [
            {
              template: "Now look! How many cars do you see? Say: I see one car or I see two cars or I see many cars",
              hints: ["I", "see", "one", "car", "two", "cars", "many"]
            },
            {
              template: "Good! Do you see a bus? Say: Yes, I see a bus or No, I don't see a bus",
              hints: ["Yes", "I", "see", "a", "bus", "No", "don't"]
            },
            {
              template: "Look at the bus! Is it big or small? Say: It is a big bus or It is a small bus",
              hints: ["It", "is", "a", "big", "bus", "small"]
            },
            {
              template: "What else is on the street? Say: I see a car or I see a bus or I see traffic",
              hints: ["I", "see", "a", "car", "bus", "traffic"]
            }
          ],
          example_answers: [
            "I see two cars",
            "Yes, I see a bus",
            "It is a big bus",
            "I see traffic"
          ]
        },
        {
          phase: "rush_hour",
          turns: "9-11",
          phase_name: "Describe Rush Hour",
          focus: "Describe busy traffic conditions",
          phase_questions: [
            {
              template: "It's rush hour now! Is the traffic busy or quiet? Say: The traffic is busy or The traffic is quiet",
              hints: ["The", "traffic", "is", "busy", "quiet"]
            },
            {
              template: "Are the cars modern or old? Say: They are modern cars or They are old cars",
              hints: ["They", "are", "modern", "cars", "old"]
            },
            {
              template: "Is the street noisy? Say: Yes, it is a noisy street or No, it is a quiet street",
              hints: ["Yes", "it", "is", "a", "noisy", "street", "No", "quiet"]
            }
          ],
          example_answers: [
            "The traffic is busy",
            "They are modern cars",
            "Yes, it is a noisy street"
          ]
        },
        {
          phase: "conclusion",
          turns: "12",
          phase_name: "End Traffic Report",
          focus: "Wrap up the report",
          phase_questions: [
            {
              template: "Thank you for watching! The traffic is very busy today! You learned: busy, noisy, car, bus! Goodbye!",
              hints: ["Thank", "you", "Goodbye", "Bye"]
            }
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "My Dream City",
      title_vi: "Thành Phố Mơ Ước",
      theme: "Designing an Ideal City",
      
      nova_greeting: "I'm Architect Nova! Let's design a city!", // DEPRECATED
      default_hints: ["I", "want", "tall", "buildings"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 9 Mission 3 - My Dream City. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about CITY FEATURES. GRAMMAR: "I want [adjective] [noun]" or "It is a [adjective] [noun]" pattern. Give FULL scaffolding: "Say: I want tall buildings" or "Say: I want clean streets". VOCABULARY: city, street, tall, modern, building, busy, noisy, clean, quiet. STRICT FOCUS: DESIGNING CITY - Every question must be about what features student wants in their dream city using adjectives. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?". ONLY allowed questions: "What kind of buildings?", "What kind of streets?", "Do you want...?", "Is your city...?". GAME MECHANIC: Ask about city feature → student chooses with adjective + noun → confirm/recast → ask about next feature. NEVER ask about feelings - ONLY DESIGN CHOICES. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["city", "building", "street", "tall", "modern", "busy", "noisy"],
      
      grammar_pattern: "I want [adjective] [noun]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Architect Nova",
        personality: "creative city designer, loves planning",
        backstory: "I design beautiful cities! Let me help you create your perfect city!",
        speaking_style: "inspiring, asks for design choices, uses adjectives to describe options",
        facts: {
          loves_designing: true,
          has_blueprints: true,
          favorite_style: "modern",
          designs_cities: true,
          helps_students: true,
          creative: true
        },
        role: "Architect helping student design their dream city"
      },

      opening_narrative: "Hello! I'm Architect Nova! I design cities! Let's build YOUR dream city together! What is your name? Say: My name is...",

      story_arc: [
        {
          phase: "planning",
          turns: "1-4",
          phase_name: "Start City Planning",
          focus: "Choose basic city type and features",
          phase_questions: [
            {
              template: "(After name) {student_answer}! Great! Let's design your city! Do you want a big city or a small city? Say: I want a big city or I want a small city",
              hints: ["I", "want", "a", "big", "city", "small"]
            },
            {
              template: "Good choice! Do you want a noisy city or a quiet city? Say: I want a noisy city or I want a quiet city",
              hints: ["I", "want", "a", "noisy", "city", "quiet"]
            },
            {
              template: "Perfect! Do you want a busy city or a calm city? Say: I want a busy city or I want a calm city",
              hints: ["I", "want", "a", "busy", "city", "calm"]
            },
            {
              template: "Great start! Now let's add buildings!",
              hints: ["Yes", "Okay", "Great"]
            }
          ],
          example_answers: [
            "I want a big city",
            "I want a quiet city",
            "I want a busy city",
            "Great"
          ]
        },
        {
          phase: "buildings",
          turns: "5-8",
          phase_name: "Design Buildings",
          focus: "Choose building types and styles",
          phase_questions: [
            {
              template: "What kind of buildings do you want? Say: I want tall buildings or I want short buildings",
              hints: ["I", "want", "tall", "buildings", "short"]
            },
            {
              template: "Good! Do you want modern buildings or old buildings? Say: I want modern buildings or I want old buildings",
              hints: ["I", "want", "modern", "buildings", "old"]
            },
            {
              template: "Perfect! How many buildings? Say: I want many buildings or I want a few buildings",
              hints: ["I", "want", "many", "buildings", "a", "few"]
            },
            {
              template: "Your buildings look great! Now let's design the streets!",
              hints: ["Yes", "Okay", "Great"]
            }
          ],
          example_answers: [
            "I want tall buildings",
            "I want modern buildings",
            "I want many buildings",
            "Okay"
          ]
        },
        {
          phase: "streets",
          turns: "9-11",
          phase_name: "Design Streets",
          focus: "Choose street features",
          phase_questions: [
            {
              template: "What kind of streets do you want? Say: I want wide streets or I want narrow streets",
              hints: ["I", "want", "wide", "streets", "narrow"]
            },
            {
              template: "Do you want clean streets or dirty streets? Say: I want clean streets!",
              hints: ["I", "want", "clean", "streets"]
            },
            {
              template: "Do you want busy streets or quiet streets? Say: I want busy streets or I want quiet streets",
              hints: ["I", "want", "busy", "streets", "quiet"]
            }
          ],
          example_answers: [
            "I want wide streets",
            "I want clean streets",
            "I want quiet streets"
          ]
        },
        {
          phase: "conclusion",
          turns: "12",
          phase_name: "City Complete!",
          focus: "Celebrate the finished design",
          phase_questions: [
            {
              template: "Your dream city is ready! It has tall modern buildings and clean streets! Great job! Goodbye!",
              hints: ["Thank", "you", "Goodbye", "Bye"]
            }
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
    week_title: "City Sounds & Sights",
    week_number: 9,
    theme: "City Life and Adjectives",
    
    knowledge_base: [
      "City vocabulary: city, street, building, car, bus, traffic",
      "Adjectives for sound: noisy, quiet",
      "Adjectives for activity: busy, calm, empty",
      "Adjectives for size: tall, short, big, small",
      "Adjectives for style: modern, old, new",
      "Grammar: It is a [adjective] [noun] - adjective comes before noun",
      "Cities have tall buildings and busy streets",
      "Traffic includes cars, buses, and other vehicles",
      "Some streets are noisy, some streets are quiet",
      "Modern cities have tall buildings and lots of traffic",
      "We use adjectives to describe what we see and hear in the city"
    ],
    
    example_opening_questions: [
      "What do you see in a city?",
      "Is your city noisy or quiet?",
      "Do you like tall buildings?",
      "What color are the buses?",
      "Is the traffic busy?",
      "Do you see cars on the street?",
      "What kind of city do you like?"
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
      id: 'week9_city_tour',
      label_en: "City Tour Guide 🏙️",
      label_vi: "Hướng Dẫn Viên Thành Phố 🏙️",
      icon: "🏙️",
      ai_role: "City tour guide showing sights",
      user_role: "Tourist exploring the city",
      intro: "Welcome to the city! I'm your tour guide! Let me show you around! What do you see?",
      context: "Week 9 theme - City Sounds & Sights. AI acts as enthusiastic city tour guide pointing out features (tall buildings, busy streets, noisy traffic, modern cars). Guide asks student to describe what they see using adjectives before nouns: 'It is a [adjective] [noun]'. Guide should be encouraging and use simple words suitable for A0+ level."
    }
  },


  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_city',
      emoji: '🌆',
      title: 'My City',
      bridge: 'In the story, we walked through a noisy, colourful, exciting city! 🏙️',
      seed_question: 'What is your city like? Is it big or beautiful?',
      frames: [
        { template: 'It is a ___ city', follow_up_q: 'Is it a big city or a busy city?', hints: ['big', 'beautiful', 'busy'] },
        { template: 'It is a ___ school', follow_up_q: 'Is it a big school or a small school?', hints: ['big', 'small', 'nice'] },
        { template: 'It is a ___ building', follow_up_q: 'Is it a tall building or a beautiful building?', hints: ['tall', 'beautiful', 'new'] },
        { template: 'It is a ___ park', follow_up_q: 'Is it a lovely park or a big park?', hints: ['lovely', 'big', 'green'] },
        { template: 'It is a ___ street', follow_up_q: 'Is it a busy street or a quiet street?', hints: ['busy', 'quiet', 'long'] },
        { template: 'It is a ___ market', follow_up_q: 'Is it a noisy market or a colourful market?', hints: ['noisy', 'colourful', 'big'] },
        { template: 'It is a ___ house', follow_up_q: 'Is it a big house or a small house?', hints: ['big', 'small', 'lovely'] },
        { template: 'It is a ___ place', follow_up_q: 'Is it a big and beautiful place or small and quiet?', hints: ['big and beautiful', 'small and quiet', 'busy and fun'] }
      ],
      scaffold_frames: ['My city is ___', 'I can see ___', 'My favourite place in my city is ___'],
      vocab_focus: ['big', 'small', 'noisy', 'quiet', 'beautiful'],
      turns: 8,
    },
    {
      id: 'spark_city_or_country',
      emoji: '🌾',
      title: 'City or Countryside?',
      bridge: 'The city was loud and busy, but the countryside was quiet and green — so different! 🌿',
      seed_question: 'Where do you live? Is it a busy city or a quiet place?',
      frames: [
        { template: 'It is a ___ place', follow_up_q: 'Is it a quiet place or a busy place?', hints: ['quiet', 'busy', 'lovely'] },
        { template: 'It is a ___ village', follow_up_q: 'Is it a small village or a quiet village?', hints: ['small', 'quiet', 'green'] },
        { template: 'It is a ___ life', follow_up_q: 'Is it a happy life or a peaceful life?', hints: ['happy', 'peaceful', 'busy'] },
        { template: 'It is a ___ school', follow_up_q: 'Is it a big school or a small school?', hints: ['big', 'small', 'friendly'] },
        { template: 'It is a ___ road', follow_up_q: 'Is it a long road or a short road?', hints: ['long', 'short', 'quiet'] },
        { template: 'It is a ___ river', follow_up_q: 'Is it a big river or a long river?', hints: ['big', 'long', 'beautiful'] },
        { template: 'It is a ___ neighbourhood', follow_up_q: 'Is your neighbourhood quiet and green or busy and exciting?', hints: ['quiet and green', 'busy and exciting', 'small and happy'] },
        { template: 'My home is a ___ place', follow_up_q: 'Is your home a happy place or a peaceful place?', hints: ['happy', 'peaceful', 'wonderful'] }
      ],
      scaffold_frames: ['I live in a ___ place', 'Near my house there is ___', "I like/don't like it because ___"],
      vocab_focus: ['city', 'town', 'village', 'busy', 'peaceful'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "city_walk",
      title: "City Walk",
      emoji: "🏙️",
      theme: "City Features — Adjectives",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Let's walk in the city! What do you see? Say: I see a tall building!",
          accept: ["I", "see", "a", "tall", "building"]
        },
        {
          ai: "Is the city noisy or quiet? Say: It is a noisy city! or It is a quiet city! or It is a busy city!",
          fill_blank: "It is a ___",
          accept_words: ["noisy", "city", "quiet", "it is"]
        },
        {
          ai: "What is on the street? Say: I see a car or I see a bus",
          options: ["I see a car", "I see a bus"]
        },
        {
          ai: "Is the street busy or empty? Say: It is a busy street! or It is an empty street! or It is a quiet street!",
          fill_blank: "It is a ___ street",
          accept_words: ["busy", "empty", "quiet", "noisy", "it is"]
        },
        {
          ai: "Describe the building! Say: It is a tall building! or It is a big building! or It is a modern building!",
          fill_blank: "It is a ___ building",
          accept_words: ["tall", "big", "modern", "old", "short", "it is"]
        }
      ],
      completion_message: "Great city walk! 🏙️ You used: tall, noisy, busy!"
    },
    {
      id: "traffic_watch",
      title: "Traffic Watch!",
      emoji: "🚗",
      theme: "Vehicles and Traffic",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Look at the street! Is the traffic busy? Say: Yes, it is busy traffic or No, it is quiet traffic",
          accept: ["Yes", "No", "it is", "busy", "traffic", "quiet"]
        },
        {
          ai: "What do you see? Choose: I see a car or I see a bus or I see many cars",
          options: ["I see a car", "I see a bus", "I see many cars"]
        },
        {
          ai: "What color is the car? Say: It is a red car! or It is a blue car! or It is a white car!",
          fill_blank: "It is a ___ car",
          accept_words: ["red", "blue", "white", "black", "green", "yellow", "it is"]
        },
        {
          ai: "Is the bus big or small? Choose: It is a big bus or It is a small bus",
          options: ["It is a big bus", "It is a small bus"]
        },
        {
          ai: "Is the street noisy? Say: Yes, it is a noisy street or No, it is a quiet street",
          options: ["Yes, it is a noisy street", "No, it is a quiet street"]
        },
        {
          ai: "Describe the traffic! Say: The traffic is busy! or The traffic is quiet! or The traffic is noisy!",
          fill_blank: "The traffic is ___",
          accept_words: ["busy", "quiet", "noisy", "heavy", "light", "traffic"]
        }
      ],
      completion_message: "Traffic report complete! 🚗 You used: busy, noisy, modern!"
    },
    {
      id: "dream_city",
      title: "Design Your City!",
      emoji: "🏗️",
      theme: "Creating Dream City",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Let's design a city! What kind of buildings do you want? Say: I want tall buildings or I want short buildings",
          options: ["I want tall buildings", "I want short buildings"]
        },
        {
          ai: "Do you want modern buildings or old buildings? Say: I want modern buildings! or I want old buildings! or I want tall buildings!",
          fill_blank: "I want ___ buildings",
          accept_words: ["modern", "old", "tall", "short", "new", "I want"]
        },
        {
          ai: "What kind of streets? Say: I want busy streets or I want quiet streets",
          options: ["I want busy streets", "I want quiet streets"]
        },
        {
          ai: "Do you want a noisy city or a quiet city? Say: I want a noisy city! or I want a quiet city! or I want a busy city!",
          fill_blank: "I want a ___ city",
          accept_words: ["noisy", "quiet", "busy", "peaceful", "modern", "I want"]
        },
        {
          ai: "What else? Say: I want clean streets or I want wide streets",
          options: ["I want clean streets", "I want wide streets"]
        },
        {
          ai: "Your city is ready! Describe it! Say: It is a busy city with tall buildings! or It is a quiet city with small buildings!",
          accept: ["it is", "city", "buildings", "tall", "modern", "busy", "quiet", "with"]
        }
      ],
      completion_message: "Your dream city is complete! 🏗️ You used: tall, modern, busy, quiet!"
    }
  ]
};

export default week9RealData;
