const week16RealData = {
  week_id: 16,
  week_number: 16,
  title: "Sports Commentary",
  weekTitle_en: "Sports Commentary",
  weekTitle_vi: "Bình luận Thể thao",
  topic: "Describing sports actions happening right now",
  topic_vi: "Mô tả các hành động thể thao đang diễn ra",
  theme: "Sports actions and Present Continuous commentary",

  grammar_focus: "Present Continuous (is/are + verb-ing)",
  grammar_pattern: "Subject + am/is/are + verb-ing + (object)",
  grammar_examples: [
    "I am running very fast.",
    "My friend is kicking the ball.",
    "The team is playing well together.",
    "They are cheering loudly.",
    "What are you doing right now?"
  ],

  // === TARGET VOCABULARY (13 SPORTS WORDS) ===
  target_vocab: [
    { word: "kick",   pronunciation: "/kɪk/",      definition_vi: "đá",         definition_en: "to hit something with your foot",              example: "I am kicking the ball into the goal!",          syllabus_context: "Sports actions" },
    { word: "throw",  pronunciation: "/θroʊ/",     definition_vi: "ném",        definition_en: "to send something through the air",            example: "She is throwing the ball to her teammate.",     syllabus_context: "Sports actions" },
    { word: "catch",  pronunciation: "/kætʃ/",     definition_vi: "bắt",        definition_en: "to stop and hold something moving",            example: "He is catching the ball with his hands.",       syllabus_context: "Sports actions" },
    { word: "run",    pronunciation: "/rʌn/",      definition_vi: "chạy",       definition_en: "to move fast on your feet",                    example: "The players are running across the field.",     syllabus_context: "Sports actions" },
    { word: "jump",   pronunciation: "/dʒʌmp/",    definition_vi: "nhảy",       definition_en: "to push yourself up into the air",             example: "She is jumping to catch the ball.",             syllabus_context: "Sports actions" },
    { word: "score",  pronunciation: "/skɔːr/",    definition_vi: "ghi bàn",    definition_en: "to get a point in a game",                     example: "Our team is scoring a goal!",                   syllabus_context: "Sports outcomes" },
    { word: "hit",    pronunciation: "/hɪt/",      definition_vi: "đập/đánh",   definition_en: "to touch something with force",                example: "He is hitting the ball over the net.",          syllabus_context: "Sports actions" },
    { word: "pass",   pronunciation: "/pæs/",      definition_vi: "chuyền",     definition_en: "to give the ball to another player",           example: "I am passing the ball to my friend.",           syllabus_context: "Teamwork actions" },
    { word: "cheer",  pronunciation: "/tʃɪr/",     definition_vi: "cổ vũ",      definition_en: "to shout happily to support someone",          example: "Everyone is cheering for our team!",            syllabus_context: "Spectator actions" },
    { word: "goal",   pronunciation: "/ɡoʊl/",     definition_vi: "bàn thắng",  definition_en: "the point you score in soccer",                example: "They are celebrating the goal!",                syllabus_context: "Sports outcomes" },
    { word: "energy", pronunciation: "/ˈɛnərdʒi/", definition_vi: "năng lượng", definition_en: "the power or strength to do things",           example: "The players have so much energy today!",        syllabus_context: "Physical state" },
    { word: "motion", pronunciation: "/ˈmoʊʃən/",  definition_vi: "chuyển động", definition_en: "the act of moving",                           example: "The ball is in motion through the air.",         syllabus_context: "Physics / actions" },
    { word: "team",   pronunciation: "/tiːm/",     definition_vi: "đội",        definition_en: "a group who work or play together",            example: "Our team is playing very well.",                 syllabus_context: "Group activities" }
  ],

  global_vocab: ["kick", "throw", "catch", "run", "jump", "score", "hit", "pass", "cheer", "goal", "energy", "motion", "team"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Energetic sports coach and commentator, enthusiastic and encouraging",
    tone: "Active, upbeat, loves describing sports in real time",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Coach Alex! Welcome to sports practice! It is very exciting here! Look! What are you doing right now? Say: I am...",
      mission_2: "Welcome back! You are now a sports commentator! The game is starting! Tell me what you see! What are the players doing? Say: They are...",
      mission_3: "Amazing! The team is full of energy today! So much is happening! What is the team doing right now? Say: The team is..."
    },
    conversation_style: [
      "Active and energetic - like watching a live game together",
      "One clear question per turn",
      "Model Present Continuous in every response",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-12 turns per mission",
      "ONLY use Present Continuous: 'S + am/is/are + V-ing' - Week 16 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct Present Continuous form naturally",
    recast_example: {
      student: "I kick ball.",
      nova_recast: "Yes! You ARE KICKING the ball! Say: I am kicking! What else are you doing?"
    },
    vocabulary_scaffolding: [
      "Mission 1: kick, run, jump, throw, catch — personal sports actions",
      "Mission 2: kick, pass, goal, score, cheer — game commentary",
      "Mission 3: team, energy, motion, run, jump — describing team actions"
    ],
    questioning_skill: [
      "What are you doing right now?",
      "What is your friend doing?",
      "What are the players doing?",
      "Is the ball in motion?",
      "Who is scoring the goal?"
    ]
  },

  // === AI RESPONSE FORMAT CONTRACT (V28 standard) ===
  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Nice!", "Great!", "Wonderful!", "Good job!", "Perfect!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student's key verb back in Present Continuous form",
      "Fix grammar naturally without explanation",
      "Keep it conversational and encouraging"
    ],
    question_patterns_allowed: [
      "What is...?",
      "What are...?",
      "Is...?",
      "Are...?",
      "Who is...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "I kick ball.", tutor_response: "Great! You ARE KICKING the ball! Say: I am kicking the ball. What is your friend doing?" },
      { student: "They run.", tutor_response: "Nice! They ARE RUNNING! Say: They are running fast. What else are they doing?" },
      { student: "Score goal.", tutor_response: "Wonderful! The team IS SCORING a goal! Say: The team is scoring! Are they cheering?" }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "At Sports Practice",
      title_en: "At Sports Practice",
      title_vi: "Ở buổi tập thể thao",
      theme: "Sports actions using Present Continuous",
      
      nova_greeting: "Hi! I am Coach Alex. Welcome to sports practice!",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 16 Mission 1 - At Sports Practice. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Coach Alex is an energetic sports coach warming up players. He asks what students are doing right now using Present Continuous. OPENING: Greet student warmly, ask what sport they are playing, then ask what they are doing at practice. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. GRAMMAR FOCUS: "I am [verb-ing]" and "They are [verb-ing]" - model the full sentence every turn. Give scaffolding every turn: "Say: I am kicking the ball" or "Say: They are running." VOCABULARY: kick, throw, catch, run, jump, score, team. STRICT FOCUS: SPORTS ACTIONS HAPPENING NOW - always use Present Continuous (is/are + verb-ing). Ask about what the student is doing or what players are doing. RECAST ERRORS: student says "I kick" → model Present Continuous: "You ARE kicking! Say: I am kicking!" SAMPLE TURN: "What are you doing right now? Say: I am running or I am jumping!" → Student: "running" → "Great! You ARE running! What is your friend doing? Say: He is kicking or She is throwing!" GAME FLOW: (1) Ask what sport → (2) Ask what student is doing → (3) Ask what teammates are doing → (4) Ask about the ball → (5) Practice describing multiple actions. One action per turn, model Present Continuous each step. FORBIDDEN: No Simple Present ("I kick"), no past tense, no future. Only Present Continuous for actions happening NOW. NEVER say 'Tell me more!' or 'I see!' as filler. Keep it active: "What are you doing?" "What is happening?" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["kick", "run", "jump", "throw", "catch"],
      target_pattern: "I am [verb-ing]. / They are [verb-ing].",
      
      conversation_topics: [
        "What sport are you playing? (soccer/basketball)",
        "What are you doing right now? (kicking/running/jumping)",
        "What are your teammates doing? (They are...)",
        "Where is the ball? (in the air/on the ground)",
        "Are you running or jumping? (action choice)",
        "Is your friend kicking or catching? (third person)",
        "Are the players scoring? (team action)",
        "How do you feel? (tired/excited/happy)",
        "What else are you practicing? (another action)",
        "Closing: Great practice today!"
      ],
      
      story_character: {
        name: "Coach Alex",
        personality: "energetic, encouraging, loves sports",
        backstory: "I am a soccer coach! I help players practice every day. I love describing what players are doing!",
        speaking_style: "active, asks about actions, uses Present Continuous constantly",
        facts: {
          loves_soccer: true,
          teaches_teamwork: true,
          watches_players_closely: true,
          favorite_phrase: "What are you doing right now?"
        },
        role: "Sports coach describing game actions"
      },
      
      opening_narrative: "⚽ Hi! I am Coach Alex. Welcome to sports practice! What sport are you playing? Say: I am playing soccer or I am playing basketball",
      
      story_arc: [
        {
          phase: "warm_up",
          turns: "1-5",
          phase_name: "Introducing Actions",
          focus: "Simple Present Continuous for self",
          goal: "Student describes own actions",
          phase_questions: [
            "Great! What are you doing right now? Say: I am running or I am jumping or I am kicking",
            "Excellent! Where are you kicking the ball? Say: I am kicking the ball toward the goal or I am kicking the ball to my friend",
            "Perfect! Now, are you running or jumping? Say: I am running or I am jumping",
            "Good! What is your friend doing? Say: My friend is kicking or My friend is throwing or My friend is catching",
            "Nice! Look at the team! What are they doing? Say: They are running or They are jumping or They are kicking"
          ]
        },
        {
          phase: "team_actions",
          turns: "6-10",
          phase_name: "Describing Others",
          focus: "Third person Present Continuous",
          goal: "Student describes what others are doing",
          phase_questions: [
            "Yes! Are they running fast or slow? Say: They are running fast or They are running slow",
            "Great! Now look at the ball! Is it in the air or on the ground? Say: The ball is in the air or The ball is on the ground",
            "I see! Is someone catching it? Say: Yes someone is catching it or No",
            "Perfect! What else are the players doing? Say: They are passing the ball or They are scoring a goal or They are cheering",
            "Wonderful! Are you tired or excited? Say: I am tired or I am excited or I am happy"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Practice Complete",
          focus: "Final check and goodbye",
          goal: "Wrap up with final Present Continuous question",
          phase_questions: [
            "Perfect! Tell me one more action you are practicing. Say: I am practicing kicking or I am practicing running or I am practicing jumping",
            "Excellent practice! You learned to describe sports actions using 'I am [verb-ing]' and 'They are [verb-ing]'. Great job today! See you next practice! 👋"
          ]
        }
      ],
      
      minimum_turns: 8,
      maximum_turns: 12
    },
    
    {
      mission_id: 2,
      id: 2,
      title: "Be a Sports Commentator",
      title_en: "Be a Sports Commentator",
      title_vi: "Trở thành bình luận viên thể thao",
      theme: "Describing game action as it happens",
      
      nova_greeting: "Hi! I am Nova! Let's play a commentator game!",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 16 Mission 2 - Be a Sports Commentator. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova is watching a soccer game and teaching the student to be a commentator. She describes what is happening and asks the student to describe actions too. OPENING: Greet student excitedly, explain they will be a commentator, then start describing the game. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. GRAMMAR FOCUS: "The player is [verb-ing]" and "The team is [verb-ing]" - model the full sentence every turn. Give scaffolding every turn: "Say: The player is kicking" or "Say: The team is running." VOCABULARY: kick, throw, pass, run, goal, score, cheer, hit. STRICT FOCUS: GAME ACTIONS IN PROGRESS - always use Present Continuous for what is happening RIGHT NOW in the game. Use third person (he/she/they/the player/the team). RECAST ERRORS: student says "The player kick" → model Present Continuous: "The player IS kicking! Say: The player is kicking!" SAMPLE TURN: "Look! What is the player doing? Say: The player is running or The player is kicking!" → Student: "running" → "Yes! The player IS running toward the goal! Now what is happening? Say: The team is cheering or The team is watching!" GAME FLOW: (1) Set up game scene → (2) Ask what player is doing → (3) Ask what team is doing → (4) Ask about the ball movement → (5) Ask about crowd reaction. One event per turn, model Present Continuous each step. FORBIDDEN: No Simple Present, no opinions ("I think"), no preferences. Only describe what is HAPPENING NOW. NEVER say 'Tell me more!' or 'I see!' as filler. Keep commentary active: "What is happening?" "What do you see?" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["kick", "pass", "goal", "score", "cheer"],
      target_pattern: "The player is [verb-ing]. / The team is [verb-ing].",
      
      conversation_topics: [
        "Welcome to the game! (introduction)",
        "What is the player doing? (kicking/running/passing)",
        "Where is the ball going? (toward the goal)",
        "What is the team doing? (running/watching)",
        "Is someone scoring? (goal action)",
        "What are the fans doing? (cheering)",
        "What is happening now? (new action)",
        "Describe another player (third person he/she)",
        "Final action before game ends",
        "Closing: Great commentary!"
      ],
      
      story_character: {
        name: "Nova",
        personality: "excited, energetic, loves sports commentary",
        backstory: "I love watching soccer games! I can describe every action as it happens! Let me teach you!",
        speaking_style: "fast-paced, enthusiastic, uses Present Continuous constantly",
        facts: {
          loves_soccer: true,
          teaches_commentary: true,
          watches_every_move: true,
          favorite_phrase: "What is happening NOW?"
        },
        role: "Sports commentary teacher"
      },
      
      opening_narrative: "📣 Hi! I am Nova! Today you are a sports commentator! Look at the field! The players are running! What is the player with the ball doing? Say: The player is kicking the ball or The player is running with the ball",
      
      story_arc: [
        {
          phase: "game_start",
          turns: "1-4",
          phase_name: "Game Kickoff",
          focus: "Describing individual player actions",
          goal: "Student describes single player's action",
          phase_questions: [
            "Great! Now look! Another player is catching the ball! What is that player doing now? Say: The player is throwing the ball or The player is running with the ball",
            "Perfect! Where is the ball going? Say: The ball is going toward the goal or The ball is going to a teammate",
            "Excellent! What is the goalkeeper doing? Say: The goalkeeper is jumping or The goalkeeper is catching or The goalkeeper is watching",
            "Good! Now look at the team! What are they doing? Say: The team is running or The team is passing or The team is cheering"
          ]
        },
        {
          phase: "action_peak",
          turns: "5-9",
          phase_name: "Exciting Moments",
          focus: "Describing team and crowd actions",
          goal: "Student describes multiple actions happening together",
          phase_questions: [
            "Yes! Is someone scoring a goal? Say: Yes someone is scoring or No not yet",
            "Wow! What are the fans doing? Say: The fans are cheering or The fans are shouting or The fans are clapping",
            "Amazing! Look! A player is passing the ball! Who is catching it? Say: A teammate is catching it or No one is catching it",
            "Great commentary! What is happening now on the field? Say: The players are running or The players are passing or The players are hitting the ball",
            "Excellent! Is the ball in the goal or out? Say: The ball is in the goal or The ball is out"
          ]
        },
        {
          phase: "closing",
          turns: "10-12",
          phase_name: "Game Ending",
          focus: "Final moments and wrap-up",
          goal: "Describe final action and say goodbye",
          phase_questions: [
            "The game is almost over! What is one more thing you see? Say: The players are shaking hands or The team is celebrating or The fans are leaving",
            "Perfect commentary! You described the game beautifully using Present Continuous! You learned to watch and describe what is happening RIGHT NOW! Great job being a commentator! 📣"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12
    },
    
    {
      mission_id: 3,
      id: 3,
      title: "Team Energy & Motion",
      title_en: "Team Energy & Motion",
      title_vi: "Năng lượng & Chuyển động của đội",
      theme: "Describe team actions and STEM concepts",
      
      nova_greeting: "Hi! I am Nova! Let's talk about ENERGY and MOTION in sports!",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 16 Mission 3 - Team Energy & Motion. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova is a science teacher connecting sports with STEM concepts (energy, motion, team). She asks how players use energy and how things move in sports. OPENING: Greet student warmly, introduce energy and motion concepts, then ask about team sports. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. GRAMMAR FOCUS: "The team is [verb-ing]" and "The ball is [in motion/moving]" - model the full sentence every turn. Give scaffolding every turn: "Say: The team is working together" or "Say: The ball is moving fast." VOCABULARY: team, energy, motion, run, jump, score. STRICT FOCUS: TEAM ACTIONS + STEM WORDS - always use Present Continuous for team activities and describe motion/energy. Ask about teamwork and how things move. RECAST ERRORS: student says "The team run" → model Present Continuous: "The team IS running! Say: The team is running!" SAMPLE TURN: "What is your team doing? Say: My team is running or My team is playing!" → Student: "playing" → "Great! Your team IS playing! Does your team have energy? Say: Yes my team has energy or Yes they are full of energy!" GAME FLOW: (1) Ask about team → (2) Ask about energy → (3) Ask about motion → (4) Ask about teamwork → (5) Connect sports with science. One concept per turn, model Present Continuous and STEM vocab each step. FORBIDDEN: No individual actions ("I am running"), no past tense, no complex science terms. Keep it simple: energy = power to move, motion = moving. NEVER say 'Tell me more!' or 'I see!' as filler. Keep it active: "What is the team doing?" "How is the ball moving?" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["team", "energy", "motion", "run", "jump"],
      target_pattern: "The team is [verb-ing]. / The ball is in motion.",
      
      conversation_topics: [
        "Do you play sports with a team?",
        "What is your team doing? (team actions)",
        "Does your team have energy? (energy concept)",
        "How does the ball move? (motion concept)",
        "Is the team working together? (teamwork)",
        "What gives you energy? (energy source)",
        "Are the players running fast or slow? (motion speed)",
        "How does your team score? (team goal)",
        "What else is moving on the field? (motion observation)",
        "Closing: Great! You understand team, energy, and motion!"
      ],
      
      story_character: {
        name: "Nova",
        personality: "curious, science-loving, connects sports with learning",
        backstory: "I love science! I see energy and motion everywhere - even in sports! Let me show you!",
        speaking_style: "asks about concepts, uses simple STEM words, makes connections",
        facts: {
          loves_science: true,
          teaches_in_fun_ways: true,
          sees_science_in_sports: true,
          favorite_words: ["energy", "motion", "team"]
        },
        role: "Science teacher making sports fun with STEM"
      },
      
      opening_narrative: "🔬 Hi! I am Nova! Sports use ENERGY and MOTION! Do you play sports with a team? Say: Yes I play with a team or No I play alone",
      
      story_arc: [
        {
          phase: "team_intro",
          turns: "1-5",
          phase_name: "Talking About Teams",
          focus: "Team actions and teamwork",
          goal: "Student describes team activities",
          phase_questions: [
            "Great! What sport does your team play? Say: My team plays soccer or My team plays basketball or My team plays volleyball",
            "Wonderful! What is your team doing when you practice? Say: My team is running or My team is practicing or My team is playing",
            "Excellent! Does your team work together? Say: Yes my team works together or Yes we work as a team",
            "Perfect! Is teamwork important? Say: Yes teamwork is important or Yes we need teamwork",
            "I agree! Teamwork IS important! Now let's talk about ENERGY! Does your team have energy when you play? Say: Yes my team has energy or Yes we are full of energy"
          ]
        },
        {
          phase: "energy_motion",
          turns: "6-10",
          phase_name: "Energy & Motion in Sports",
          focus: "STEM concepts in sports context",
          goal: "Student describes energy and motion",
          phase_questions: [
            "Great! Where do you get energy? Say: I get energy from food or I get energy from rest or I get energy from sleep",
            "Yes! Now look at the ball! Is the ball moving? Say: Yes the ball is moving or Yes the ball is in motion",
            "Perfect! The ball IS in motion! 'Motion' means moving! Is the ball moving fast or slow? Say: The ball is moving fast or The ball is moving slow",
            "Good! What else is in motion on the field? Say: The players are in motion or The team is in motion or Everything is moving",
            "Excellent! When you run, you USE energy and you CREATE motion! Amazing! Now, how does your team score? Say: My team is scoring goals or My team is getting points"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Connecting Sports & Science",
          focus: "Final connection and goodbye",
          goal: "Wrap up with key learning",
          phase_questions: [
            "Perfect! Tell me: Do you like learning about energy and motion in sports? Say: Yes I like it or Yes it is fun or Yes I learned a lot",
            "Wonderful! You learned that TEAMS work together, ENERGY helps us move, and MOTION is when things are moving! Sports are full of science! Great job! 🔬⚽"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 12
    }
  ],
  
  learning_outcomes: [
    "Use Present Continuous (is/are + verb-ing) to describe actions happening now",
    "Apply sports vocabulary in real-life scenarios",
    "Practice speaking fluently as a sports commentator",
    "Build confidence in describing ongoing actions"
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "Sports Commentary",
    week_number: 16,
    theme: "Sports Actions & Present Continuous",

    knowledge_base: [
      "Sports vocabulary: kick, throw, catch, run, jump, score, hit, pass, cheer, goal, energy, motion, team",
      "Grammar: Present Continuous — I am sing-ing, He/She is sing-ing, They are sing-ing",
      "Players use kick and pass to move the ball in soccer",
      "A goal is scored when the ball goes into the net",
      "The crowd cheers and celebrates when their team scores",
      "Energy is needed to run fast and play hard",
      "A team works together — passing, running, and cheering",
      "Motion describes movement — the ball is in motion when it flies through the air",
      "We use Present Continuous for actions happening RIGHT NOW"
    ],

    example_opening_questions: [
      "What sport are you playing?",
      "What is the player doing?",
      "Is the ball in motion?",
      "What are the players running toward?",
      "Who is scoring the goal?",
      "What are the fans doing?"
    ],

    // ✅ FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask_anything" }
    ],

    // Bonus roleplay scenario
    bonus_roleplay: {
      id: 'week16_sports_commentator',
      label_en: "Sports Commentator 📣",
      label_vi: "Bình Luận Viên Thể Thao 📣",
      icon: "📣",
      ai_role: "Co-commentator watching the match",
      user_role: "Child sports commentator describing the game",
      intro: "Welcome to today's big match! The game is starting! What are the players doing? Tell me! Use: They are running / He is kicking / She is jumping!",
      context: "Week 16 theme - Sports Commentary. AI acts as co-commentator watching a soccer game with the student. Guide asks 'What is happening now?' and student responds with Present Continuous 'He/She/They is/are [V-ing]' patterns. Guide should be enthusiastic, use sports commentary style, and keep energy high."
    }
  },

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_sport',
      emoji: '⚽',
      title: 'My Favourite Sport',
      bridge: 'The commentator cheered for every goal and every champion in the match! And what about YOU — do you love sport? 🎯',
      seed_question: 'What sport do you love? Is it football or swimming?',
      frames: [
        {
          template: 'My favourite sport is ___',
          follow_up_q: 'What sport do you love most?',
          hints: ['football', 'swimming', 'badminton', 'basketball', 'running']
        },
        {
          template: 'You need to ___',
          follow_up_q: 'What do players need to do?',
          hints: ['run fast', 'kick the ball', 'jump high', 'swim hard', 'throw far']
        },
        {
          template: 'I love it because ___',
          follow_up_q: 'Why do you love your sport?',
          hints: ['it is fun', 'I love the team', 'it is exciting', 'I feel strong', 'my friends play']
        },
        { template: 'I am ___ing the ball', follow_up_q: 'What are you doing with the ball? Kicking or throwing?', hints: ['kick', 'throw', 'catch'] },
        { template: 'My team is ___ very well', follow_up_q: 'What is your team doing? Running or playing?', hints: ['running', 'playing', 'trying'] },
        { template: 'I am feeling ___ right now', follow_up_q: 'How do you feel during the game? Excited or proud?', hints: ['excited', 'proud', 'strong'] },
        { template: 'My favourite player is ___', follow_up_q: 'What is your favourite player doing?', hints: ['running', 'scoring', 'jumping'] },
        { template: 'I am going to ___ every day', follow_up_q: 'What will you do every day to get better?', hints: ['practise', 'train hard', 'keep playing'] }
      ],
      scaffold_frames: ['My favourite sport is ___', 'You need to ___', 'I love it because ___'],
      vocab_focus: ['run', 'kick', 'throw', 'team', 'win'],
      turns: 8,
    },
    {
      id: 'spark_sports_star',
      emoji: '🥇',
      title: 'My Sports Star',
      bridge: 'The crowd cheered for the bravest, strongest player in the whole match! Who is YOUR sports hero? 🏆',
      seed_question: 'Who is your sports hero? Is it Messi or someone else?',
      frames: [
        {
          template: 'My favourite player is ___',
          follow_up_q: 'Who is your sports hero?',
          hints: ['Messi', 'Ronaldo', 'my brother', 'my coach', 'a friend']
        },
        {
          template: 'They can ___',
          follow_up_q: 'What amazing thing can they do?',
          hints: ['run very fast', 'score great goals', 'jump very high', 'swim like a fish', 'never give up']
        },
        {
          template: 'I admire them because ___',
          follow_up_q: 'Why do you admire them?',
          hints: ['they are strong', 'they never give up', 'they are kind', 'they are a champion', 'they inspire me']
        },
        { template: 'They are ___ harder than anyone', follow_up_q: 'What is your sports star doing? Training or running?', hints: ['training', 'running', 'working'] },
        { template: 'They are ___ right now on TV', follow_up_q: 'What is your hero doing on TV right now?', hints: ['playing', 'running', 'swimming'] },
        { template: 'I am ___ like my hero', follow_up_q: 'What are you doing to be like your hero?', hints: ['training', 'practising', 'improving'] },
        { template: 'My hero is always ___', follow_up_q: 'What is your hero always doing?', hints: ['working', 'helping', 'inspiring'] },
        { template: 'I am so proud because they are ___', follow_up_q: 'Why are you proud? What is your hero doing?', hints: ['winning', 'playing', 'improving'] }
      ],
      scaffold_frames: ['My favourite player is ___', 'They can ___', 'I admire them because ___'],
      vocab_focus: ['fast', 'strong', 'talented', 'famous', 'champion'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "sports_practice",
      title: "At Sports Practice",
      emoji: "⚽",
      theme: "Sports Actions & Present Continuous",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Hi! I am Coach Alex. Welcome to practice! What is your name? Say: My name is ___",
          student_template: "My name is {NAME}",
          accept: ["My name is", "I am", "I'm", "My name"]
        },
        {
          ai: "Nice! Are you ready to play? What sport are you playing today? Say: I am playing soccer or I am playing basketball",
          options: ["I am playing soccer", "I am playing basketball"]
        },
        {
          ai: "Great! Right now, I am kicking the ball. What are you doing? Say: I am running! or I am jumping! or I am kicking!",
          fill_blank: "I am ___",
          accept_words: ["running", "jumping", "kicking", "throwing", "catching"]
        },
        {
          ai: "Excellent! The team is practicing hard. Are they running or jumping? Say: They are running or They are jumping",
          options: ["They are running", "They are jumping"]
        },
        {
          ai: "I see the goal! Are you trying to score? Say: Yes or No",
          options: ["Yes", "No", "Yes, I am", "No, I'm not"]
        },
        {
          ai: "You are doing great! What do you think makes a good team player? Say: Passing the ball or Cheering for friends or Both",
          options: ["Passing the ball", "Cheering for friends", "Both"]
        }
      ],
      completion_message: "Fantastic! You practiced sports actions using Present Continuous! ⚽ You used Week 16 vocabulary!"
    },
    {
      id: "commentator_game",
      title: "Be a Commentator",
      emoji: "📣",
      theme: "Describing Sports Action Live",
      difficulty: "medium",
      exchanges: [
        {
          ai: "You are a sports commentator! The game is starting. Tell me: What are the players doing? Say: The players are running! or The players are kicking! or The players are passing!",
          fill_blank: "The players are ___",
          accept_words: ["running", "kicking", "passing", "playing"]
        },
        {
          ai: "Exciting! One player is running toward the goal. What is he doing now? Say: He is kicking the ball or He is passing the ball",
          options: ["He is kicking the ball", "He is passing the ball"]
        },
        {
          ai: "Yes! The goalkeeper is jumping. Is the crowd cheering? Say: Yes, they are cheering or No, they are quiet",
          options: ["Yes, they are cheering", "No, they are quiet"]
        },
        {
          ai: "The ball is flying through the air! What happens next? Say: The player scores or The goalkeeper catches it",
          options: ["The player scores", "The goalkeeper catches it"]
        },
        {
          ai: "Amazing commentary! What is the energy like in the stadium? Say: The energy is high or The energy is exciting or It is loud",
          options: ["The energy is high", "The energy is exciting", "It is loud"]
        }
      ],
      completion_message: "You are a great commentator! 📣 You described the game using Present Continuous!"
    },
    {
      id: "team_sports",
      title: "My Team Sport",
      emoji: "👥",
      theme: "Team Activities & Collaboration",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Do you play on a team? Tell me! Say: Yes or I play",
          accept: ["Yes", "I play", "My team"]
        },
        {
          ai: "Cool! What is your team doing right now? Are they practicing or playing a game? Say: They are practicing or They are playing a game",
          options: ["They are practicing", "They are playing a game"]
        },
        {
          ai: "What action are you doing to help your team? Say: I am passing! or I am running! or I am kicking!",
          fill_blank: "I am ___",
          accept_words: ["passing", "running", "kicking", "catching", "throwing"]
        },
        {
          ai: "Great teamwork! Is your team working together well? Say: Yes, we are working together or No, we need to practice more",
          options: ["Yes, we are working together", "No, we need to practice more"]
        },
        {
          ai: "What is your team trying to do? Say: Score a goal or Win the game or Have fun",
          options: ["Score a goal", "Win the game", "Have fun"]
        }
      ],
      completion_message: "Wonderful! You described team sports using Present Continuous! 👥 Great use of  'is/are + verb-ing'!"
    }
  ]
};

export default week16RealData;
