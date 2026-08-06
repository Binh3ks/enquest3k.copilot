const week15RealData = {
  // === METADATA ===
  week_id: 15,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 15,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 15: The Busy Park",
  week_title_en: "The Busy Park (Actions Now)",
  week_title_vi: "Công viên Bận rộn (Hành động ngay lúc này)",
  
  topic: "Observing people in a park - describing actions happening now",
  topic_vi: "Quan sát mọi người trong công viên - miêu tả hành động đang diễn ra",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe what is happening right now using Present Continuous",
  learning_outcome_vi: "Miêu tả những gì đang xảy ra ngay bây giờ bằng thì Hiện tại Tiếp diễn",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Present Continuous: S + am/is/are + V-ing",
  grammar_pattern: "Subject + am/is/are + verb-ing + (object)",
  grammar_examples: [
    "A boy is running in the park.",
    "The children are playing soccer.",
    "An old man is sitting on the bench.",
    "A girl is eating ice cream.",
    "People are walking their dogs."
  ],
  
  // === TARGET VOCABULARY (10 SCHOOL SUPPLIES) ===
  target_vocab: [
    {
      word: "running",
      pronunciation: "/ˈrʌnɪŋ/",
      definition_vi: "chạy",
      definition_en: "moving fast on foot",
      example: "A boy is running in the park.",
      syllabus_context: "Action verbs"
    },
    {
      word: "walking",
      pronunciation: "/ˈwɔːkɪŋ/",
      definition_vi: "đi bộ",
      definition_en: "moving on foot at a normal speed",
      example: "People are walking in the park.",
      syllabus_context: "Action verbs"
    },
    {
      word: "sitting",
      pronunciation: "/ˈsɪtɪŋ/",
      definition_vi: "ngồi",
      definition_en: "resting on a chair or bench",
      example: "An old man is sitting on the bench.",
      syllabus_context: "Action verbs"
    },
    {
      word: "eating",
      pronunciation: "/ˈiːtɪŋ/",
      definition_vi: "ăn",
      definition_en: "having food",
      example: "A girl is eating ice cream.",
      syllabus_context: "Action verbs"
    },
    {
      word: "flying",
      pronunciation: "/ˈflaɪɪŋ/",
      definition_vi: "thả (diều)",
      definition_en: "making a kite move in the air",
      example: "The children are flying a kite.",
      syllabus_context: "Action verbs"
    },
    {
      word: "playing",
      pronunciation: "/ˈpleɪɪŋ/",
      definition_vi: "chơi",
      definition_en: "having fun with games or toys",
      example: "Kids are playing soccer.",
      syllabus_context: "Action verbs"
    },
    {
      word: "jogging",
      pronunciation: "/ˈdʒɒɡɪŋ/",
      definition_vi: "chạy bộ",
      definition_en: "running slowly for exercise",
      example: "A woman is jogging in the morning.",
      syllabus_context: "Exercise activities"
    },
    {
      word: "relaxing",
      pronunciation: "/rɪˈlæksɪŋ/",
      definition_vi: "thư giãn",
      definition_en: "resting and becoming calm",
      example: "Families are relaxing on the grass.",
      syllabus_context: "Leisure activities"
    },
    {
      word: "picnic",
      pronunciation: "/ˈpɪknɪk/",
      definition_vi: "dã ngoại",
      definition_en: "an outdoor meal",
      example: "They are having a picnic under the tree.",
      syllabus_context: "Park activities"
    },
    {
      word: "fountain",
      pronunciation: "/ˈfaʊntən/",
      definition_vi: "đài phun nước",
      definition_en: "a structure that shoots water into the air",
      example: "Children are playing near the fountain.",
      syllabus_context: "Park features"
    }
  ],
  
  global_vocab: ["running", "walking", "sitting", "eating", "flying", "playing", "jogging", "relaxing", "picnic", "fountain"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and observant like a park guide",
    tone: "Warm, curious, loves watching people enjoying the park",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Nova! I am at the park right now! It is so busy here! So many people! Look! What is that boy doing? Say: He is...",
      mission_2: "Welcome back! Let's play 'Spot the Action'! I will describe someone, and you guess what they are doing! Ready? I see a girl with ice cream in her hand.",
      mission_3: "Wow! The park is full of surprises today! I see something colorful in the sky! What are the children flying? Let's describe all the amazing things happening!"
    },
    conversation_style: [
      "Natural and flowing - like watching the park together",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use Present Continuous: 'S + am/is/are + V-ing' - Week 15 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "Boy run park.",
      nova_recast: "Yes! The boy IS RUNNING in the park! He is running very fast! What else do you see?"
    },
    vocabulary_scaffolding: [
      "Mission 1: running, walking, sitting, eating - basic actions people do in parks",
      "Mission 2: flying, playing, jogging - more dynamic park activities",
      "Mission 3: relaxing, picnic, fountain - combine all vocab to describe the busy park scene"
    ],
    questioning_skill: [
      "What is the boy doing?",
      "Is the girl eating ice cream?",
      "What are the children playing?",
      "Who is sitting on the bench?",
      "What are people doing in the park?"
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
      title: "Busy Park Observation",
      title_vi: "Quan Sát Công Viên Sôi Động",
      theme: "Park Activities",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Nova",
        personality: "Friendly guide who loves watching people in the park",
        backstory: "Nova visits the park every day to see people having fun!",
        speaking_style: "Warm, describes actions, uses Present Continuous",
        facts: {
          loves_parks: true,
          visits_daily: true,
          favorite_activity: "watching people",
          favorite_place: "park bench",
          observant: true,
          enjoys_nature: true
        }
      },
      
      // 🎬 OPENING NARRATIVE
      opening_narrative: "Hi! I'm Nova! I'm at the park! 🏞️ It's so busy here! Look! What is that boy doing? He is running! What is your name? Say: My name is ___ or I am ___!",
      
      nova_greeting: "Hi! Let's watch the park together!", // DEPRECATED
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 15 Mission 1 - Busy Park Observation. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova loves watching people at the park and describing what they are doing. OPENING: Ask student's name, then say "Look at the park! It's so busy! What is that boy doing? Say: He is running or He is walking or He is playing!" STRICT GAME RULES: 1. ONLY ask about ACTIONS people are doing at the park. 2. Student MUST say "He/She is [V-ing]" or "They are [V-ing]". 3. If student gives yes/no only, prompt full sentence with 2-3 choices: "Say: He is running or He is walking or They are playing!" 4. Ask about ONE person/action per question. VOCABULARY TARGET: running, walking, sitting, eating, flying, playing, jogging, relaxing. ALLOWED QUESTIONS: "What is he doing?", "Is she eating?", "What are they doing?", "Where is he sitting?" GRAMMAR ENFORCEMENT: Every answer must practice Present Continuous "He/She is V-ing" - recast all errors naturally. GAME MECHANIC: Point at ONE person → student says 'He/She is [V-ing]' → confirm/recast → point at next person. FORBIDDEN: Do NOT ask about feelings, preferences, or unrelated topics. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. AVOID: Multiple people per turn, complex sentences. Cover at least 5 different actions. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["running", "walking", "sitting", "eating", "flying", "playing", "jogging", "relaxing"],
      
      grammar_pattern: "He/She is sing-ing",
      
      // 📖 STORY ARC
      story_arc: [
        {
          phase: "observe_first_actions",
          turns: "1-4",
          goal: "Observe people doing basic actions at the park",
          required_vocab: ["running", "walking", "sitting"],
          phase_questions: [
            {
              template: "(After name) {student_answer}! Great name! Look! That boy over there! What is he doing? Say: He is running or He is walking",
              hints: ["He", "is", "running", "walking", "jogging"]
            },
            {
              template: "(After first action) {student_answer}! Good! Look at that girl! What is she doing? Say: She is sitting or She is walking",
              hints: ["She", "is", "sitting", "walking", "running"]
            },
            {
              template: "(After second action) {student_answer}! Great! Look at the old man on the bench! What is he doing? Say: He is sitting or He is relaxing",
              hints: ["He", "is", "sitting", "relaxing", "resting"]
            },
            {
              template: "(After third action) {student_answer}! Perfect! The park is so busy! Let's look at more people! 🏞️",
              hints: ["Yes", "Okay", "Great"]
            }
          ]
        },
        {
          phase: "observe_more_actions",
          turns: "5-12",
          goal: "Observe more people doing different activities",
          required_vocab: ["eating", "playing", "flying"],
          phase_questions: [
            {
              template: "Look at that girl with ice cream! What is she doing? Say: She is eating or She is eating ice cream",
              hints: ["She", "is", "eating", "ice cream"]
            },
            {
              template: "Look at those children over there! What are they doing? Say: They are playing or They are playing soccer",
              hints: ["They", "are", "playing", "soccer", "games"]
            },
            {
              template: "Wow! Look up! What are those kids doing? Say: They are flying kites or They are flying a kite",
              hints: ["They", "are", "flying", "kites", "a kite"]
            },
            {
              template: "Look at that woman in the jogging clothes! What is she doing? Say: She is jogging or She is running",
              hints: ["She", "is", "jogging", "running", "exercising"]
            },
            {
              template: "Look at that family on the grass! What are they doing? Say: They are having a picnic or They are relaxing",
              hints: ["They", "are", "having", "a picnic", "relaxing", "eating"]
            },
            {
              template: "Look near the fountain! Who is there? Say: Children are playing or People are sitting",
              hints: ["Children", "are", "playing", "People", "sitting", "walking"]
            },
            {
              template: "What is happening at the fountain? Say: Children are playing or Water is splashing",
              hints: ["Children", "are", "playing", "Water", "splashing", "running"]
            },
            {
              template: "Look at those people under the tree! What are they doing? Say: They are relaxing or They are sitting",
              hints: ["They", "are", "relaxing", "sitting", "resting"]
            }
          ]
        },
        {
          phase: "action_details",
          turns: "13-16",
          goal: "Describe actions with more details",
          required_vocab: [],
          phase_questions: [
            {
              template: "Tell me one thing YOU see at the park! Say: I see a boy running or I see a girl eating",
              hints: ["I", "see", "a boy", "running", "a girl", "eating"]
            },
            {
              template: "What is YOUR favorite activity at the park? Say: I like playing or I like running",
              hints: ["I", "like", "playing", "running", "eating", "relaxing"]
            },
            {
              template: "What can you do at the park? Say: I can run or I can play",
              hints: ["I", "can", "run", "play", "sit", "eat"]
            },
            {
              template: "Are the people happy? Say: Yes, they are happy or Yes, they are having fun",
              hints: ["Yes", "they", "are", "happy", "having fun"]
            }
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          goal: "Wrap up park observation",
          required_vocab: [],
          phase_questions: [
            {
              template: "The park is so busy! Everyone is having fun! Great job watching!",
              hints: ["Thank", "you", "Yes", "Great"]
            },
            {
              template: "Let's go to the park soon! Goodbye! Say: Goodbye!",
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
      title: "Spot the Action Game",
      title_vi: "Trò Chơi Đoán Hành Động",
      theme: "Park Action Guessing",
      
      nova_greeting: "Let's play Spot the Action! I describe, you guess!", // DEPRECATED
      default_hints: ["He", "is", "running"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 15 Mission 2 - Spot the Action Game. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ACTIONS people are doing. GRAMMAR: "He/She is [V-ing]" pattern. Give FULL scaffolding with 2-3 choices: "Say: He is running or She is walking or They are playing". VOCABULARY: running, walking, sitting, eating, flying, playing, jogging, relaxing. STRICT FOCUS: ACTION IDENTIFICATION ONLY - Every question must be about WHAT people are doing. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?", "Do you want...?". ONLY allowed questions: "What is he doing?", "Is she eating?", "What are they doing?". GAME MECHANIC: Describe ONE person's action → student says 'He/She is [V-ing]' → confirm/recast → describe next action. NEVER ask about preferences, feelings, or descriptions - ONLY IDENTIFY ACTIONS. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["running", "walking", "sitting", "eating", "flying", "playing", "jogging", "relaxing"],
      
      grammar_pattern: "He/She is sing-ing",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Nova",
        personality: "friendly observer, loves guessing what people are doing",
        backstory: "I love playing guessing games at the park! Let's guess together!",
        speaking_style: "excited, gives clues about actions, celebrates correct answers",
        facts: {
          loves_games: true,
          favorite_game: "action guessing",
          visits_park: true,
          observant: true,
          playful: true,
          enjoys_guessing: true
        },
        role: "Game host giving action clues"
      },

      opening_narrative: "Hi! I'm Nova! 🔍 Let's play Spot the Action! I see someone with ice cream! What is she doing? Say: She is eating or She is drinking or She is sitting!",

      story_arc: [
        {
          phase: "action_clues_easy",
          turns: "1-4",
          phase_name: "Easy Action Clues!",
          focus: "Guess simple actions from clues",
          phase_questions: [
            "🏃 I see someone moving very fast! Legs going fast! What is it? Say: Running or He is running or She is jogging!",
            "🚶 I see someone moving slowly! One step, two step, three step! What is it? Say: Walking or She is walking or He is walking!",
            "🪑 I see someone on a bench! Not moving! Resting! What is it? Say: Sitting or He is sitting or She is relaxing!",
            "🍦 I see someone with ice cream! Mouth open, ice cream going in! What is it? Say: Eating or She is eating or Eating ice cream!"
          ],
          example_answers: [
            "Running",
            "Walking",
            "Sitting",
            "Eating"
          ]
        },
        {
          phase: "action_clues_harder",
          turns: "5-12",
          phase_name: "Harder Action Clues!",
          focus: "Guess more actions with full sentences",
          phase_questions: [
            "⚽ I see kids with a ball! Kicking! Running! Having fun! What are they doing? Say: They are playing or Playing soccer!",
            "🪁 I see something flying in the sky! String! Wind! Not a bird! What are they doing? Say: Flying kites or They are flying a kite!",
            "🏃‍♀️ I see someone in sports clothes! Running slowly! Exercise! What is she doing? Say: She is jogging or Jogging!",
            "😌 I see a family lying on the grass! Peaceful! Not busy! Eyes closed! What are they doing? Say: They are relaxing or Relaxing!",
            "🧺 I see food on a blanket! Sandwiches! Fruit! Family eating outside! What are they doing? Say: Having a picnic or They are having a picnic!",
            "⛲ I see water! Splashing! Children laughing! Near water! Where are they? Say: At the fountain or Near the fountain!",
            "📖 I see someone with a book! Sitting on bench! Looking at pages! What is he doing? Say: He is reading or Reading!",
            "🎶 I see someone moving to music! Arms up! Feet moving! What is she doing? Say: She is dancing or Dancing!"
          ],
          example_answers: [
            "Playing soccer",
            "Flying kites",
            "Jogging",
            "Relaxing",
            "Having a picnic",
            "At the fountain",
            "Reading",
            "Dancing"
          ]
        },
        {
          phase: "full_sentences",
          turns: "13-16",
          phase_name: "Full Sentence Practice",
          focus: "Use complete Present Continuous sentences",
          phase_questions: [
            "Point at someone running! Say: He is running or She is running!",
            "Point at someone sitting! Say: He is sitting or She is sitting on the bench!",
            "Point at children playing! Say: They are playing or The children are playing!",
            "What is happening at the park? Say: People are having fun or Everyone is playing!"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Game Complete",
          focus: "Celebrate action spotting success",
          phase_questions: [
            "You found all the actions! You are a great action spotter! Which action do you like? Running, eating, or playing?",
            "Great job! See you at the park! Goodbye! 👋"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "Park Story Time",
      title_vi: "Giờ Kể Chuyện Công Viên",
      theme: "Creating a Park Story",
      
      nova_greeting: "Let's make a park story together! What do you see?", // DEPRECATED
      default_hints: ["He", "is", "running"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 15 Mission 3 - Park Story Time. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. Build a story together about the park scene. GRAMMAR: "He/She is [V-ing]" and "They are [V-ing]" pattern. Give FULL scaffolding with 2-3 choices: "Say: A boy is running or I see children playing or A girl is eating". VOCABULARY: running, walking, sitting, eating, flying, playing, jogging, relaxing, picnic, fountain. STRICT FOCUS: STORY BUILDING - Each question adds one sentence to the park story. FORBIDDEN: Do NOT ask "Do you like...?", "What do you think...?", "How do you feel...?". ONLY allowed questions: "What is happening?", "Who is there?", "What are they doing?". GAME MECHANIC: Nova starts story → student adds one action sentence → Nova adds next part → student adds action → build complete park story together. NEVER ask about preferences or feelings - ONLY BUILD STORY WITH ACTIONS. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["running", "walking", "sitting", "eating", "flying", "playing", "jogging", "relaxing", "picnic", "fountain"],
      
      grammar_pattern: "They are sing-ing / A [person] is sing-ing",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Nova",
        personality: "creative storyteller, loves making up park stories",
        backstory: "I love creating stories about the busy park! Let's build one together!",
        speaking_style: "engaging, builds story step by step, celebrates each addition",
        facts: {
          loves_stories: true,
          creative: true,
          visits_park: true,
          favorite_story: "park adventures",
          enjoys_collaboration: true,
          imaginative: true
        },
        role: "Story guide helping student build park narrative"
      },

      opening_narrative: "📖 Let's make a park story together! It's a sunny day... The park is busy... What do you see first? Say: I see a boy running or I see children playing!",

      story_arc: [
        {
          phase: "story_opening",
          turns: "1-4",
          phase_name: "Start the Story!",
          focus: "Begin park story with first characters",
          phase_questions: [
            "It's a sunny day at the park! Who do you see? Say: I see a boy or I see a girl or I see children!",
            "{student_answer}! Good! What is the boy doing? Say: He is running or He is walking!",
            "{student_answer}! Great! There are more people! Who else is there? Say: I see an old man or I see a woman!",
            "{student_answer}! Perfect! What is she doing? Say: She is sitting or She is jogging!"
          ],
          example_answers: [
            "I see a boy",
            "He is running",
            "I see a woman",
            "She is jogging"
          ]
        },
        {
          phase: "story_middle",
          turns: "5-12",
          phase_name: "Build the Story!",
          focus: "Add more actions and characters",
          phase_questions: [
            "Look! Near the fountain! Who is there? Say: Children are there or A girl is there!",
            "What are the children doing? Say: They are playing or They are splashing water!",
            "Wow! Look at the sky! What do you see? Say: I see a kite or I see kites flying!",
            "Who is flying the kite? Say: A boy is flying a kite or Children are flying kites!",
            "On the grass! A family! What are they doing? Say: They are having a picnic or They are eating!",
            "Under the tree! Someone is resting! What is he doing? Say: He is sitting or He is relaxing!",
            "Near the path! A woman in sports clothes! What is she doing? Say: She is jogging or She is running!",
            "Everyone looks happy! What is happening? Say: They are having fun or People are enjoying the park!"
          ],
          example_answers: [
            "Children are there",
            "They are playing",
            "I see kites flying",
            "Children are flying kites",
            "They are having a picnic",
            "He is relaxing",
            "She is jogging",
            "They are having fun"
          ]
        },
        {
          phase: "story_ending",
          turns: "13-16",
          phase_name: "Finish the Story!",
          focus: "Complete the story with wrap-up",
          phase_questions: [
            "The sun is shining! The park is busy! What is your favorite part? Say: I like the fountain or I like the picnic!",
            "Who is having the most fun? Say: The children or Everyone!",
            "What do you want to do at the park? Say: I want to run or I want to play!",
            "Great story! Shall we read it again? Say: Yes or Okay!"
          ]
        },
        {
          phase: "conclusion",
          turns: "17-18",
          phase_name: "Story Complete!",
          focus: "Celebrate the completed story",
          phase_questions: [
            "We made a wonderful park story! You are a great storyteller! 📖",
            "Let's go to the park and make our own story! Goodbye! 👋"
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
    week_title: "The Busy Park (Actions Now)",
    week_number: 15,
    theme: "Park Activities and Present Continuous",
    
    knowledge_base: [
      "Park activities: running, walking, sitting, eating, flying kites, playing, jogging, relaxing, having a picnic",
      "Places at the park: fountain, bench, grass, trees, path, playground",
      "Grammar: Present Continuous - He/She is [V-ing], They are [V-ing]",
      "People run and jog for exercise at the park",
      "Children play games and fly kites in open spaces",
      "Families have picnics on the grass and relax under trees",
      "The fountain is a popular place where children play",
      "People eat snacks and ice cream while enjoying the park",
      "The park is busy with people doing many different activities",
      "We use Present Continuous to describe actions happening now"
    ],
    
    example_opening_questions: [
      "What do you see at the park?",
      "What is the boy doing?",
      "Is the girl eating ice cream?",
      "What are the children playing?",
      "Who is sitting on the bench?",
      "What are people doing at the park?",
      "Do you like going to the park?"
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
      id: 'week15_park_observer',
      label_en: "Park Observer 🏞️",
      label_vi: "Quan Sát Công Viên 🏞️",
      icon: "🏞️",
      ai_role: "Friendly guide at the park",
      user_role: "Child observing people at the park",
      intro: "Hi! Welcome to the park! It's so busy here! Look around! What do you see? Who is running? Who is playing?",
      context: "Week 15 theme - The Busy Park. AI acts as friendly park guide observing people doing activities (running, walking, sitting, eating, flying kites, playing, jogging, relaxing, having a picnic). Guide asks 'What is he/she doing?' and student responds with Present Continuous 'He/She is [V-ing]' patterns. Guide should be enthusiastic and use simple words suitable for A0+ level."
    }
  },


  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_right_now',
      emoji: '🌳',
      title: 'Right Now!',
      bridge: 'Look at the park — everyone is running, jumping, eating, laughing all at once! 🏃',
      seed_question: 'What are you doing right now? Are you sitting or standing?',
      frames: [
        { template: 'I am ___', follow_up_q: 'What are you doing right now? Are you learning or sitting?', hints: ['learning', 'sitting', 'studying'] },
        { template: 'I am ___ing right now', follow_up_q: 'What are you doing right now?', hints: ['read', 'listen', 'think'] },
        { template: 'My teacher is ___', follow_up_q: 'What is your teacher doing? Is she teaching or talking?', hints: ['teaching', 'talking', 'smiling'] },
        { template: 'My friend is ___', follow_up_q: 'What is your friend doing? Writing or drawing?', hints: ['writing', 'drawing', 'laughing'] },
        { template: 'I am not sleeping, I am ___ing', follow_up_q: 'What are you NOT doing? What ARE you doing?', hints: ['learn', 'read', 'study'] },
        { template: 'She is reading and I am ___ing', follow_up_q: 'What is she doing and what are you doing?', hints: ['learn', 'listen', 'write'] },
        { template: 'Everyone is ___ing', follow_up_q: 'What is everyone doing?', hints: ['learn', 'work', 'play'] },
        { template: 'I am ___ing and I feel happy', follow_up_q: 'What are you doing and how do you feel?', hints: ['learn', 'read', 'study'] }
      ],
      scaffold_frames: ['I am ___ing', 'I can see ___', 'Next to me there is ___'],
      vocab_focus: ['sitting', 'holding', 'looking', 'thinking', 'watching'],
      turns: 8,
    },
    {
      id: 'spark_action_reporter',
      emoji: '📡',
      title: 'Action Reporter',
      bridge: 'Our reporter described EVERYTHING happening in the park — live and on camera! 🎙️',
      seed_question: 'What is happening right now? Is someone running or talking?',
      frames: [
        { template: 'I am reporting! ___ is running!', follow_up_q: 'What is happening? Is someone running or jumping?', hints: ['A dog', 'A child', 'My friend'] },
        { template: 'Right now, ___ is singing', follow_up_q: 'What is happening right now around you?', hints: ['the wind', 'a bird', 'the sun'] },
        { template: 'Look! ___ is jumping!', follow_up_q: 'What can you see? What is someone doing?', hints: ['My cat', 'My friend', 'The teacher'] },
        { template: 'I can see ___ is walking', follow_up_q: 'What can you see happening?', hints: ['a car', 'a bird', 'children'] },
        { template: 'I am watching ___ing', follow_up_q: 'What are you watching? A bird flying or children playing?', hints: ['birds fly', 'children play', 'the rain fall'] },
        { template: 'The teacher is ___ and the students are happy', follow_up_q: 'What is the teacher doing and what are students doing?', hints: ['teaching', 'writing', 'smiling'] },
        { template: 'In the park, people are ___', follow_up_q: 'What are people doing in the park?', hints: ['walking', 'playing', 'running'] },
        { template: 'I am a reporter and I am ___ing', follow_up_q: 'What are you doing as a reporter?', hints: ['speak', 'watch', 'report'] }
      ],
      scaffold_frames: ['In this room, ___ is ___ing', 'I can see ___', 'Right now, ___ is ___'],
      vocab_focus: ['running', 'sitting', 'playing', 'eating', 'working'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "what_are_they_doing",
      title: "What Are They Doing?",
      emoji: "👀",
      theme: "Park Activities — Present Continuous",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Look at the park! A boy is there! What is he doing? Say: He is running or He is playing or He is walking!",
          accept: ["He", "is", "running", "playing", "walking", "He is running", "He is playing"]
        },
        {
          ai: "I see a girl with ice cream! What is she doing? Say: She is eating or She is walking or She is sitting!",
          accept: ["She", "is", "eating", "walking", "sitting", "She is eating", "She is walking"]
        },
        {
          ai: "An old man is on the bench! Is he sitting? Say: Yes, he is sitting! or No, he is walking!",
          options: ["Yes, he is sitting!", "No, he is walking!"]
        },
        {
          ai: "Children are near the fountain! What are they doing? Say: They are playing or They are splashing or They are running!",
          accept: ["They", "are", "playing", "splashing", "running", "They are playing", "having fun"]
        },
        {
          ai: "Tell me one thing you see! Say: I see a boy running or I see a girl eating or I see children playing!",
          accept: ["I", "see", "boy", "girl", "children", "running", "walking", "eating", "playing", "is", "are"]
        }
      ],
      completion_message: "Great job! 👀 You used Present Continuous: He is running! She is eating! They are playing!"
    },
    {
      id: "at_the_park_now",
      title: "At the Park Now!",
      emoji: "🏞️",
      theme: "Describing Current Actions",
      difficulty: "medium",
      exchanges: [
        {
          ai: "What is happening at the park NOW? Say: A boy is running NOW or A girl is eating NOW or Children are playing NOW!",
          accept: ["boy", "girl", "children", "is", "are", "running", "eating", "playing", "now", "A boy is running"]
        },
        {
          ai: "I see a girl with ice cream! What is she doing NOW? Choose: She is eating ice cream or She is holding ice cream",
          options: ["She is eating ice cream", "She is holding ice cream"]
        },
        {
          ai: "Look up! What do you see? Say: A kite is flying or Kites are flying or I see a bird!",
          accept: ["kite", "kites", "bird", "is", "are", "flying", "A kite is", "Kites are", "I see"]
        },
        {
          ai: "Look at that woman in sports clothes! What is she doing? Say: She is jogging or She is sitting or She is walking!",
          accept: ["She", "is", "jogging", "sitting", "walking", "running", "She is jogging", "She is sitting"]
        },
        {
          ai: "A family on the grass with food! What are they doing? Say: They are having a picnic or They are eating or They are relaxing!",
          accept: ["They", "are", "having", "picnic", "eating", "relaxing", "lunch", "fun"]
        },
        {
          ai: "Tell me TWO things happening now! Say: A boy is running and a girl is eating or Children are playing and a man is sitting!",
          accept: ["boy", "girl", "children", "man", "is", "are", "running", "eating", "playing", "sitting", "and", "walking"]
        }
      ],
      completion_message: "Perfect! 🏞️ You described actions happening NOW using Present Continuous!"
    },
    {
      id: "park_action_game",
      title: "Park Action Game!",
      emoji: "🎯",
      theme: "Guessing Park Activities",
      difficulty: "medium",
      exchanges: [
        {
          ai: "I see someone moving very fast! Legs going fast! What is it? Say: Running or He is running or Jogging!",
          accept: ["Running", "Jogging", "He", "She", "is", "running", "jogging", "He is running"]
        },
        {
          ai: "I see something flying in the sky! String! Wind! What is it? Say: A kite is flying or Kites are flying or Flying a kite!",
          accept: ["kite", "kites", "is", "are", "flying", "A kite is", "Kites are", "They are"]
        },
        {
          ai: "Mouth open! Ice cream going in! Yummy! What is happening? Say: She is eating or She is licking or She is tasting!",
          accept: ["She", "is", "eating", "licking", "tasting", "holding", "She is eating", "She is licking"]
        },
        {
          ai: "I see food on a blanket! Family together! Outdoors! What are they doing? Say: They are having a picnic or They are eating or They are relaxing!",
          accept: ["They", "are", "having", "picnic", "eating", "relaxing", "lunch"],
          accept_words: ["a picnic", "lunch", "fun", "dinner"]
        },
        {
          ai: "Now YOU! What are you doing at the park? Say: I am running or I am sitting or I am playing!",
          accept: ["I", "am", "running", "sitting", "playing", "walking", "eating", "I am running", "I am sitting", "I am playing"]
        },
        {
          ai: "Last one! Water splashing! Children laughing! Where are they? Say: the fountain fountain!",
          fill_blank: "___ fountain",
          accept_words: ["at the", "near the", "fountain", "the fountain"]
        }
      ],
      completion_message: "You win! 🎯🏆 You guessed all the park actions! Great job using Present Continuous!"
    }
  ]
};

export default week15RealData;