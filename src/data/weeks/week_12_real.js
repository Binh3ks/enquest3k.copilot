const week12RealData = {
  // === METADATA ===
  week_id: 12,
  phase: 1,
  block: "A",
  unit: 2,
  week_number: 12,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 12: The Talent Show",
  week_title_en: "The Talent Show (Abilities)",
  week_title_vi: "Cuộc thi Tài năng",
  
  topic: "Showcasing skills - Talking about abilities",
  topic_vi: "Trình diễn kỹ năng - Nói về khả năng",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Talk about abilities using 'I can' and 'I can't'",
  learning_outcome_vi: "Nói về khả năng sử dụng 'I can' và 'I can't'",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Modal verb 'can' for abilities",
  grammar_pattern: "I can / I can't + [verb]",
  grammar_examples: [
    "I can sing.",
    "I can't dance.",
    "I can run fast.",
    "I can ride a bike."
  ],
  
  // === TARGET VOCABULARY (10 ABILITIES) ===
  target_vocab: [
    {
      word: "sing",
      pronunciation: "/sɪŋ/",
      definition_vi: "hát",
      definition_en: "to make music with your voice",
      example: "I can sing a song.",
      syllabus_context: "Performance abilities"
    },
    {
      word: "dance",
      pronunciation: "/dæns/",
      definition_vi: "nhảy, khiêu vũ",
      definition_en: "to move your body to music",
      example: "I can dance well.",
      syllabus_context: "Performance abilities"
    },
    {
      word: "run",
      pronunciation: "/rʌn/",
      definition_vi: "chạy",
      definition_en: "to move fast on your feet",
      example: "I can run very fast.",
      syllabus_context: "Physical abilities"
    },
    {
      word: "jump",
      pronunciation: "/dʒʌmp/",
      definition_vi: "nhảy (lên cao)",
      definition_en: "to push yourself up into the air",
      example: "I can jump high.",
      syllabus_context: "Physical abilities"
    },
    {
      word: "climb",
      pronunciation: "/klaɪm/",
      definition_vi: "trèo, leo",
      definition_en: "to go up using your hands and feet",
      example: "I can climb a tree.",
      syllabus_context: "Physical abilities"
    },
    {
      word: "ride a bike",
      pronunciation: "/raɪd ə baɪk/",
      definition_vi: "đạp xe",
      definition_en: "to travel on a bicycle",
      example: "I can ride a bike.",
      syllabus_context: "Sport abilities"
    },
    {
      word: "draw",
      pronunciation: "/drɔː/",
      definition_vi: "vẽ",
      definition_en: "to make a picture with a pencil or pen",
      example: "I can draw a cat.",
      syllabus_context: "Creative abilities"
    },
    {
      word: "swim",
      pronunciation: "/swɪm/",
      definition_vi: "bơi",
      definition_en: "to move through water",
      example: "I can swim in the pool.",
      syllabus_context: "Sport abilities"
    },
    {
      word: "cook",
      pronunciation: "/kʊk/",
      definition_vi: "nấu ăn",
      definition_en: "to make food using heat",
      example: "I can cook noodles.",
      syllabus_context: "Life abilities"
    },
    {
      word: "play",
      pronunciation: "/pleɪ/",
      definition_vi: "chơi",
      definition_en: "to have fun with games or sports",
      example: "I can play soccer.",
      syllabus_context: "Sport abilities"
    }
  ],
  
  global_vocab: ["sing", "dance", "run", "jump", "climb", "ride a bike", "draw", "swim", "cook", "play"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, excited about talent shows",
    tone: "Warm, encouraging, celebrates all talents",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Ms. Nova! Welcome to the Talent Show! Everyone has a special talent! What do I call you? Say: My name is your name.",
      mission_2: "Hi! Let's discover what you can do! I can sing! Can you sing? Say: Yes, I can or No, I can't.",
      mission_3: "Look! It's your turn on stage! Time to show your talent! What can you do? Say: I can..."
    },
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use 'I can / I can't' - Week 12 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "I sing.",
      nova_recast: "Yes! I CAN sing! What else can you do?"
    },
    vocabulary_scaffolding: [
      "Mission 1: sing, dance, run, jump - basic performance talents",
      "Mission 2: climb, ride a bike, draw, swim - physical and creative talents",
      "Mission 3: combine all talents in 'I can' and 'I can't' patterns"
    ],
    questioning_skill: [
      "What can you do?",
      "Can you sing?",
      "Can you dance or jump?",
      "I can... what?",
      "What is your special talent?"
    ],
    must_use_vocab: ["can", "sing", "dance", "run", "jump", "climb", "draw", "ride a bike"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Past tense (Week 12 scope is 'can' modal only)"
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
      "What can you...?",
      "Can you...?",
      "What is...?",
      "Do you like...?",
      "Who can...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "I sing.",
        tutor_response: "Great! I CAN sing. Can you dance too?"
      },
      {
        student: "I can dancing.",
        tutor_response: "Nice! I can DANCE. What else can you do?"
      },
      {
        student: "Yes I can.",
        tutor_response: "Wonderful! Yes, I can! Can you jump high?"
      }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "My Special Talent",
      title_vi: "Tài Năng Đặc Biệt của Tôi",
      theme: "Discovering Talents",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Ms. Nova",
        personality: "Encouraging talent show host, celebrates every ability",
        backstory: "Ms. Nova loves hosting talent shows! She helps students discover what they can do!",
        speaking_style: "Enthusiastic, asks about one talent at a time, encourages trying new things",
        facts: {
          loves_talents: true,
          can_sing: true,
          can_dance: true,
          favorite_talent: "dancing",
          hosts_shows: true,
          encouraging: true
        }
      },
      
      // 🎬 OPENING NARRATIVE
      opening_narrative: "Hi! I'm Ms. Nova! 🌟 Welcome to the Talent Show! Everyone has a special talent! What is your name? Say: My name is [your name]",
      
      nova_greeting: "Hi! Welcome to the Talent Show!", // DEPRECATED
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 12 Mission 1 - Discovering Talents. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova is a talent show host who helps students discover their abilities. OPENING: Ask student's name, then say "Everyone can do something special! Can you sing? Say: Yes, I can sing or No, I can't sing." STRICT GAME RULES: 1. ONLY ask about abilities using CAN. 2. Student MUST say "I can [verb]" or "I can't [verb]". 3. If student gives yes/no only, prompt full sentence: "Say: Yes, I can sing!" 4. Ask about ONE talent per question. VOCABULARY TARGET: sing, dance, run, jump, draw, ride a bike, swim. ALLOWED QUESTIONS: "Can you sing?", "What can you do?", "Can you dance or jump?", "What is your favorite talent?" GRAMMAR ENFORCEMENT: Every answer must practice "I can / I can't" - recast all errors naturally. GAME MECHANIC: Ask about ONE ability per turn → student says 'I can [verb]' or 'I can't [verb]' → confirm/recast → ask about next ability. FORBIDDEN: Do NOT ask about feelings, preferences beyond talents, or unrelated topics. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. AVOID: Multiple abilities per turn, complex sentences. Discover at least 5 different talents. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["sing", "dance", "run", "jump", "draw", "ride a bike", "swim"],
      
      grammar_pattern: "I can / I can't + [verb]",
      
      // 📖 STORY ARC
      story_arc: [
        {
          phase: "introduction",
          turns: "1-4",
          goal: "Introduce talent show and discover first talents",
          required_vocab: [],
          phase_questions: [
            {
              template: "(After name) {student_answer}! Welcome to our show! Can you sing? Say: Yes, I can sing or No, I can't sing",
              hints: ["Yes", "I", "can", "sing", "No", "can't"]
            },
            {
              template: "(After first talent) {student_answer}! Can you dance? Say: Yes, I can dance or No, I can't dance",
              hints: ["Yes", "I", "can", "dance", "No", "can't"]
            },
            {
              template: "(After second talent) {student_answer}! What about running? Can you run fast? Say: Yes, I can run fast or No, I can't run fast",
              hints: ["Yes", "I", "can", "run", "fast", "No", "can't"]
            },
            {
              template: "(After running) {student_answer}! Great! You know many things you can do! Let's discover more!",
              hints: ["Yes", "Okay", "Great"]
            }
          ]
        },
        {
          phase: "talent_discovery",
          turns: "5-12",
          goal: "Explore more abilities and practice patterns",
          required_vocab: ["sing", "dance", "run", "jump"],
          phase_questions: [
            {
              template: "Can you jump high? Say: Yes, I can jump high or No, I can't jump high",
              hints: ["Yes", "I", "can", "jump", "high", "No", "can't"]
            },
            {
              template: "Can you draw pictures? Say: Yes, I can draw or No, I can't draw",
              hints: ["Yes", "I", "can", "draw", "No", "can't"]
            },
            {
              template: "Can you ride a bike? Say: Yes, I can ride a bike or No, I can't ride a bike",
              hints: ["Yes", "I", "can", "ride", "a", "bike", "No", "can't"]
            },
            {
              template: "Can you swim? Say: Yes, I can swim or No, I can't swim",
              hints: ["Yes", "I", "can", "swim", "No", "can't"]
            },
            {
              template: "What is one thing you CAN do? Say: I can ___",
              hints: ["I", "can", "sing", "dance", "run", "jump", "draw"]
            },
            {
              template: "What is one thing you CAN'T do? Say: I can't ___",
              hints: ["I", "can't", "sing", "dance", "swim", "ride", "a", "bike"]
            },
            {
              template: "Tell me TWO things you can do! Say: I can ___ and I can ___",
              hints: ["I", "can", "sing", "dance", "run", "jump", "and"]
            },
            {
              template: "What is your favorite talent? Say: My favorite talent is ___",
              hints: ["My", "favorite", "talent", "is", "singing", "dancing", "drawing"]
            }
          ]
        },
        {
          phase: "conclusion",
          turns: "13-14",
          goal: "Celebrate talents and end show",
          required_vocab: [],
          phase_questions: [
            {
              template: "You have many talents! You can do many things! Great job!",
              hints: ["Thank", "you", "Yes", "Great"]
            },
            {
              template: "Keep practicing! Goodbye! Say: Goodbye!",
              hints: ["Goodbye", "Bye", "See", "you"]
            }
          ]
        }
      ],
      
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 2,
      title: "Can You Do This?",
      title_vi: "Bạn Có Thể Làm Điều Này Không?",
      theme: "Challenge Game",
      
      nova_greeting: "Let's play Can You Do This! I challenge you!", // DEPRECATED
      default_hints: ["I", "can", "jump"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 12 Mission 2 - Challenge Game. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ABILITIES using CAN questions. GRAMMAR: "I can / I can't [verb]" pattern. Give FULL scaffolding: "Say: I can jump" or "Say: I can't climb". VOCABULARY: sing, dance, run, jump, climb, draw, ride a bike, swim, cook, play. STRICT FOCUS: ABILITY CHALLENGES ONLY - Every question must be about CAN/CAN'T. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?", "Do you want...?", "What color...?". ONLY allowed questions: "Can you jump?", "Can you do this?", "What can you do?". GAME MECHANIC: Challenge ONE ability per turn → student says 'I can [verb]' or 'I can't [verb]' → confirm/recast → challenge next ability. NEVER ask about preferences, feelings, or descriptions - ONLY ABILITIES WITH CAN/CAN'T. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["jump", "climb", "run", "sing", "dance", "draw", "ride a bike", "swim"],
      
      grammar_pattern: "I can / I can't + [verb]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Ms. Nova",
        personality: "Playful challenge host, loves testing abilities",
        backstory: "I love playing challenge games! I show you a move and you tell me if you can do it!",
        speaking_style: "Energetic, demonstrates moves, encourages trying",
        facts: {
          loves_challenges: true,
          can_jump: true,
          can_climb: true,
          favorite_challenge: "jumping",
          playful: true,
          encouraging: true
        },
        role: "Challenge host demonstrating abilities"
      },

      opening_narrative: "Hi! I'm Ms. Nova! 🏃 Let's play Can You Do This! I do a move and you say if you can do it! Watch me! (Jump) Can you jump? Say: Yes, I can jump or No, I can't jump",

      story_arc: [
        {
          phase: "challenge_start",
          turns: "1-4",
          phase_name: "Start Challenges!",
          focus: "First ability challenges with scaffolding",
          phase_questions: [
            "(Jump) 🏃 Look! I can jump! Can you jump? Say: Yes, I can jump or No, I can't jump",
            "(Run) Watch! I can run fast! Can you run fast? Say: Yes, I can run fast or No, I can't run fast",
            "(Sing) Listen! I can sing! Can you sing? Say: Yes, I can sing or No, I can't sing",
            "(Dance) See! I can dance! Can you dance? Say: Yes, I can dance or No, I can't dance"
          ],
          example_answers: [
            "Yes, I can jump",
            "No, I can't run fast",
            "Yes, I can sing",
            "No, I can't dance"
          ]
        },
        {
          phase: "challenge_continue",
          turns: "5-12",
          phase_name: "More Challenges",
          focus: "Explore more abilities",
          phase_questions: [
            "(Climb) I can climb! Can you climb a tree? Say: Yes, I can climb or No, I can't climb",
            "(Draw) I can draw! Can you draw? Say: Yes, I can draw or No, I can't draw",
            "(Ride bike) I can ride a bike! Can you ride a bike? Say: Yes, I can ride a bike or No, I can't ride a bike",
            "(Swim) I can swim! Can you swim? Say: Yes, I can swim or No, I can't swim",
            "What is the easiest thing you can do? Say: I can ___",
            "What is the hardest thing? Say: I can't ___",
            "Tell me THREE things you can do! Say: I can ___, I can ___, and I can ___",
            "Which challenge do you like most? Say: I like ___ the most"
          ]
        },
        {
          phase: "challenge_end",
          turns: "13-14",
          phase_name: "End Challenge",
          focus: "Wrap up challenge game",
          phase_questions: [
            "You passed many challenges! You can do many things! Wonderful!",
            "You are a champion! Goodbye! Say: Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Big Performance",
      title_vi: "Buổi Biểu Diễn Lớn",
      theme: "Talent Show Performance",
      
      nova_greeting: "It's show time! Time to perform!", // DEPRECATED
      default_hints: ["I", "can", "sing"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 12 Mission 3 - The Big Performance. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about PERFORMANCE ABILITIES. GRAMMAR: "I can [verb]" pattern. Give FULL scaffolding: "Say: I can sing on stage" or "Say: I can dance for everyone". VOCABULARY: sing, dance, perform, show, stage, audience, talent. STRICT FOCUS: PERFORMANCE PLANNING - Every question about what student will perform. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?" unrelated to performance. ONLY allowed questions: "What can you perform?", "What will you show?", "Can you sing on stage?". GAME MECHANIC: Plan performance → choose talent → practice statement → perform with "I can [verb]" → celebrate. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["sing", "dance", "perform", "show", "stage", "talent"],
      
      grammar_pattern: "I can + [verb] + [on stage / for everyone]",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Ms. Nova",
        personality: "Supportive talent show director",
        backstory: "I help students prepare for the big show! Tonight is your performance!",
        speaking_style: "Excited, helps plan performance, builds confidence",
        facts: {
          loves_shows: true,
          supports_students: true,
          favorite_performance: "singing",
          has_stage: true,
          encouraging: true,
          patient: true
        },
        role: "Talent show director helping student prepare"
      },

      opening_narrative: "Hi! I'm Ms. Nova! 🎤 The talent show is TONIGHT! It's your turn to perform! What will you show everyone? What can you do? Say: I can...",

      story_arc: [
        {
          phase: "performance_prep",
          turns: "1-4",
          phase_name: "Prepare Performance",
          focus: "Choose talent for the show",
          phase_questions: [
            "🎤 Tonight is the talent show! What can you do? Say: I can ___",
            "Great choice! Can you do it on stage? Say: Yes, I can ___ on stage",
            "Perfect! What else can you show? Say: I can also ___",
            "Wonderful! You have many talents! Let's practice!"
          ]
        },
        {
          phase: "practice_time",
          turns: "5-12",
          phase_name: "Practice Performance",
          focus: "Practice performance statements",
          phase_questions: [
            "Let's practice! Say: I can ___ for everyone!",
            "Good! Can you do TWO things? Say: I can ___ and I can ___",
            "Can you sing OR dance on stage? Say: I can ___ on stage",
            "What will you show first? Say: First, I can ___",
            "What will you show next? Say: Next, I can ___",
            "What is your BEST talent? Say: My best talent is ___",
            "Are you ready? Say: Yes, I am ready or I can do this",
            "What will the audience see? Say: The audience will see me ___"
          ]
        },
        {
          phase: "performance_time",
          turns: "13-14",
          phase_name: "Performance Time",
          focus: "Perform and celebrate",
          phase_questions: [
            "🌟 YOU DID IT! You showed everyone your talent! You can do amazing things!",
            "The audience loves you! Great performance! Goodbye! Say: Thank you! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "15+ minutes"
    }
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "The Talent Show",
    week_number: 12,
    theme: "Abilities and Modal 'can'",
    
    knowledge_base: [
      "Abilities we can talk about: sing, dance, run, jump, climb, ride a bike, draw, swim, cook, play",
      "Performance talents: singing, dancing, acting, playing music",
      "Physical talents: running, jumping, climbing, swimming",
      "Creative talents: drawing, painting, cooking, writing",
      "Grammar: I can + [verb] (I can sing)",
      "Grammar: I can't + [verb] (I can't dance)",
      "Questions: Can you...? (Can you sing?)",
      "Answers: Yes, I can. / No, I can't.",
      "Everyone has different talents - some can sing, some can draw, some can run fast",
      "It's okay to say I can't - we all have things we can and can't do",
      "Talent shows let people show what they can do",
      "Practice helps us get better at our talents"
    ],
    
    example_opening_questions: [
      "What can you do?",
      "Can you sing?",
      "Can you dance or jump?",
      "What is your special talent?",
      "Can you ride a bike?",
      "What can't you do?",
      "Do you like talent shows?"
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
      id: 'week12_talent_show',
      label_en: "Talent Show Host 🎤",
      label_vi: "MC Chương Trình Tài Năng 🎤",
      icon: "🎤",
      ai_role: "Talent show host introducing performers",
      user_role: "Student performing their talent",
      intro: "Hi! Welcome to the Talent Show! I am the host! What is your name? What can you do?",
      context: "Week 12 theme - The Talent Show. AI acts as enthusiastic talent show host introducing student performer to audience. Host asks 'What can you do?' and student responds with 'I can [talent]' patterns. Host should be encouraging, celebrate all talents, and use simple words suitable for A0+ level. Focus on abilities: sing, dance, run, jump, climb, draw, ride a bike."
    }
  },


  conversation_cards: [
    {
      id: "what_i_can_do",
      title: "What I Can Do",
      emoji: "⭐",
      theme: "My Abilities — I can",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Can you sing? Say: Yes, I can sing or No, I can't sing",
          options: ["Yes, I can sing", "No, I can't sing"]
        },
        {
          ai: "Can you dance? Say: Yes, I can dance or No, I can't dance",
          options: ["Yes, I can dance", "No, I can't dance"]
        },
        {
          ai: "What can you do? Say: I can ___",
          fill_blank: "I can ___",
          accept_words: ["sing", "dance", "run", "jump", "draw", "swim", "ride a bike", "cook", "play"]
        },
        {
          ai: "Can you jump high? Say: Yes, I can jump high or No, I can't jump high",
          options: ["Yes, I can jump high", "No, I can't jump high"]
        },
        {
          ai: "Tell me TWO things you can do! Say: I can ___ and I can ___",
          accept: ["I", "can", "sing", "dance", "run", "jump", "draw", "swim", "and"]
        }
      ],
      completion_message: "You know your talents! ⭐ You used: I can sing/dance/run/jump!"
    },
    {
      id: "talent_challenge",
      title: "Talent Challenge!",
      emoji: "🏆",
      theme: "Testing Abilities",
      difficulty: "medium",
      exchanges: [
        {
          ai: "I can run fast! Can you run fast? Say: Yes, I can run fast or No, I can't run fast",
          options: ["Yes, I can run fast", "No, I can't run fast"]
        },
        {
          ai: "I can climb trees! Can you climb? Say: Yes, I can climb or No, I can't climb",
          options: ["Yes, I can climb", "No, I can't climb"]
        },
        {
          ai: "What is something you CAN'T do? Say: I can't ___",
          fill_blank: "I can't ___",
          accept_words: ["sing", "dance", "swim", "climb", "ride a bike", "cook", "draw"]
        },
        {
          ai: "Can you ride a bike? Say: Yes, I can ride a bike or No, I can't ride a bike",
          options: ["Yes, I can ride a bike", "No, I can't ride a bike"]
        },
        {
          ai: "Tell me ONE thing you can do well! Say: I can ___ well",
          accept: ["I", "can", "sing", "dance", "run", "draw", "swim", "jump", "well"]
        }
      ],
      completion_message: "Great challenge! 🏆 You used: I can / I can't!"
    },
    {
      id: "my_performance",
      title: "My Performance",
      emoji: "🎭",
      theme: "Planning Talent Show",
      difficulty: "medium",
      exchanges: [
        {
          ai: "What can you perform in the talent show? Say: I can perform ___ or I can show ___",
          fill_blank: "I can ___",
          accept_words: ["sing", "dance", "draw", "perform", "show", "play"]
        },
        {
          ai: "Can you sing on stage? Say: Yes, I can sing on stage or No, I can't sing on stage",
          options: ["Yes, I can sing on stage", "No, I can't sing on stage"]
        },
        {
          ai: "What is your best talent? Say: My best talent is ___",
          fill_blank: "My best talent is ___",
          accept_words: ["singing", "dancing", "drawing", "running", "jumping", "swimming"]
        },
        {
          ai: "Can you show TWO talents? Say: I can ___ and I can ___",
          accept: ["I", "can", "sing", "dance", "draw", "jump", "run", "and"]
        },
        {
          ai: "Are you ready to perform? Say: Yes, I am ready or Yes, I can do it",
          options: ["Yes, I am ready", "Yes, I can do it"]
        }
      ],
      completion_message: "Perfect performance! 🎭 You used: I can perform/show/sing/dance!"
    }
  ]
};

export default week12RealData;
