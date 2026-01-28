const week4RealData = {
  // === METADATA ===
  week_id: 4,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 4,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 4: My Happy Jar",
  week_title_en: "My Happy Jar (Emotions & Likes)",
  week_title_vi: "Lọ Hạnh Phúc của Tôi (Cảm xúc & Sở thích)",
  
  topic: "Personality - Emotions and Likes",
  topic_vi: "Tính cách - Cảm xúc và Sở thích",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Express emotions and preferences using 'I like + V-ing' naturally.",
  learning_outcome_vi: "Diễn đạt cảm xúc và sở thích bằng 'I like + V-ing' một cách tự nhiên.",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Pattern 'I like + V-ing'",
  grammar_pattern: "I like [verb]-ing",
  grammar_examples: [
    "I like playing.",
    "I like reading books.",
    "I like drawing pictures.",
    "I like singing songs."
  ],
  
  // === TARGET VOCABULARY (10 WORDS) ===
  target_vocab: [
    {
      word: "happy",
      pronunciation: "/ˈhæpi/",
      definition_vi: "vui vẻ",
      definition_en: "feeling very good and joyful",
      example: "I am happy today.",
      syllabus_context: "Emotions"
    },
    {
      word: "sad",
      pronunciation: "/sæd/",
      definition_vi: "buồn",
      definition_en: "feeling unhappy or not good",
      example: "She feels sad today.",
      syllabus_context: "Emotions"
    },
    {
      word: "funny",
      pronunciation: "/ˈfʌni/",
      definition_vi: "hài hước, vui nhộn",
      definition_en: "making people laugh and smile",
      example: "He is very funny.",
      syllabus_context: "Personality traits"
    },
    {
      word: "friendly",
      pronunciation: "/ˈfrendli/",
      definition_vi: "thân thiện",
      definition_en: "kind and nice to others",
      example: "My teacher is friendly.",
      syllabus_context: "Personality traits"
    },
    {
      word: "excited",
      pronunciation: "/ɪkˈsaɪtɪd/",
      definition_vi: "phấn khích",
      definition_en: "very happy about something coming",
      example: "I am excited about my birthday.",
      syllabus_context: "Emotions"
    },
    {
      word: "playing",
      pronunciation: "/ˈpleɪɪŋ/",
      definition_vi: "chơi",
      definition_en: "doing fun games or sports",
      example: "I like playing games.",
      syllabus_context: "Activities"
    },
    {
      word: "reading",
      pronunciation: "/ˈriːdɪŋ/",
      definition_vi: "đọc",
      definition_en: "looking at words in books",
      example: "I like reading books.",
      syllabus_context: "Activities"
    },
    {
      word: "drawing",
      pronunciation: "/ˈdrɔːɪŋ/",
      definition_vi: "vẽ",
      definition_en: "making pictures with pencils or crayons",
      example: "I like drawing pictures.",
      syllabus_context: "Activities"
    },
    {
      word: "singing",
      pronunciation: "/ˈsɪŋɪŋ/",
      definition_vi: "hát",
      definition_en: "making music with your voice",
      example: "She likes singing songs.",
      syllabus_context: "Activities"
    },
    {
      word: "jar",
      pronunciation: "/dʒɑːr/",
      definition_vi: "lọ, hũ",
      definition_en: "a glass container for keeping things",
      example: "I put happy things in my jar.",
      syllabus_context: "Objects"
    }
  ],
  
  global_vocab: ["happy", "sad", "funny", "friendly", "excited", "playing", "reading", "drawing", "singing", "jar"],
  
  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      title: "The Happy Jar",
      title_vi: "Lọ Hạnh Phúc",
      theme: "Emotions & Preferences",
      
      // 🎭 STORY CHARACTER
      story_character: {
        name: "Ms. Nova",
        personality: "Cheerful, loves collecting happy moments, emotional and expressive",
        backstory: "Ms. Nova has a special jar where she puts happy memories! Every time she feels happy, she writes it on paper and puts it in the jar. Today she wants to help you make YOUR happy jar!",
        speaking_style: "Warm, enthusiastic about emotions, asks about feelings and likes",
        facts: {
          has_happy_jar: true,
          jar_color: "blue",
          favorite_activity: "drawing",
          loves_singing: true,
          plays_games: true,
          reads_books: true,
          favorite_emotion: "excited",
          collects_happy_moments: true
        }
      },
      
      // 🎬 OPENING NARRATIVE
      opening_narrative: "Hi! I'm Ms. Nova! 🌟 Look at my Happy Jar! 🏺 When I feel happy, I put it in here! Today, let's make YOUR Happy Jar! What do I call you?",
      
      nova_greeting: "Hi! Let's make a Happy Jar together!", // DEPRECATED
      
      mission_context: `This is Week 4 Mission 1 - The Happy Jar. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ACTIVITIES using "I like + V-ing" pattern. GRAMMAR: "I like [verb]-ing". Give FULL scaffolding: "Say: I like playing" or "Say: I like reading books". VOCABULARY: happy, sad, funny, friendly, excited, playing, reading, drawing, singing, jar. STRICT FOCUS: ACTIVITIES WITH "I LIKE + V-ING" ONLY - Every question must be about what student LIKES DOING. FORBIDDEN: Do NOT ask "What color...?", "Is it big?", "Do you want...?", "Where is...?", "How are you?". ONLY allowed questions: "What do you like doing?", "Do you like playing?", "Do you like reading?", "What makes you happy?". NEVER ask about locations, objects, or descriptions - ONLY ACTIVITIES WITH "I LIKE + V-ING" PATTERN.`,
      
      target_vocab: ["happy", "excited", "playing", "reading", "drawing", "singing"],
      
      grammar_pattern: "I like [verb]-ing",
      
      // 📖 STORY ARC
      story_arc: [
        {
          phase: "introduction",
          turns: "1-5",
          goal: "Learn student's name, introduce Happy Jar concept",
          required_vocab: [],
          phase_questions: [
            "What do I call you?",
            "Look at my Happy Jar! 🏺 Do you know what a jar is? Say: Yes, I know OR No, I don't know.",
            "My jar has happy things! When I'm happy, I put it in the jar! Are you happy today? Say: Yes, I am happy OR No, I am not happy.",
            "What makes you happy? Playing? Reading? Or drawing?",
            "Great! Let's make YOUR Happy Jar! 🌟"
          ]
        },
        {
          phase: "discovering_likes",
          turns: "6-12",
          goal: "Discover what activities student likes using 'I like + V-ing'",
          required_vocab: ["playing", "reading", "drawing", "singing"],
          phase_questions: [
            "Do you like playing? Say: Yes, I like playing OR No, I don't like playing.",
            "What do you like playing? Games? Sports? Or toys? Say: I like playing...",
            "Do you like reading? Say: Yes, I like reading OR No, I don't like reading.",
            "What do you like reading? Books? Stories? Or comics? Say: I like reading...",
            "Do you like drawing? Say: Yes, I like drawing OR No, I don't like drawing.",
            "What do you like drawing? Animals? People? Or flowers? Say: I like drawing...",
            "Do you like singing? Say: Yes, I like singing OR No, I don't like singing."
          ]
        },
        {
          phase: "filling_jar",
          turns: "13-17",
          goal: "Put happy activities into student's jar",
          required_vocab: ["happy", "excited", "jar"],
          phase_questions: [
            "Let's put your likes in the jar! ✨ First: I like playing! Put it in! 🏺",
            "Next! What else do you like? Say: I like...",
            "Wonderful! Put that in the jar too! 🌟",
            "When you do these things, are you happy or excited? Say: I am happy OR I am excited.",
            "Your Happy Jar is full of good things! 🎉"
          ]
        },
        {
          phase: "conclusion",
          turns: "18-20",
          goal: "Celebrate Happy Jar, say goodbye",
          required_vocab: [],
          phase_questions: [
            "Your Happy Jar has: playing, reading, drawing, singing! So many happy things! Which one makes you MOST happy?",
            "Perfect! You can look at your Happy Jar when you feel sad! It will make you happy again! 💖",
            "Great job making your Happy Jar! Goodbye! See you soon! 👋"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,
      
      objectives: [
        {
          stepKey: "student_name",
          category: "Identity",
          question_variants: [
            {
              question: "What do I call you?",
              hints: ["name", "is", "My", "I", "am"]
            },
            {
              question: "What is your name?",
              hints: ["is", "My", "name"]
            },
            {
              question: "Tell me your name!",
              hints: ["call", "me", "You", "can", "My", "name"]
            }
          ],
          target_keywords: ["my", "name", "is", "I", "am"],
          ack_options: ["Nice to meet you!", "Hello!", "Great!"],
          recast_templates: [
            "Your name is {name}!",
            "Nice to meet you, {name}!"
          ],
          success_criteria: "Student says their name"
        },
        {
          stepKey: "likes_playing",
          category: "Activity - Playing",
          question_variants: [
            {
              question: "Do you like playing?",
              hints: ["I", "like", "playing", "Yes"]
            },
            {
              question: "What do you like doing? Playing?",
              hints: ["like", "I", "playing"]
            },
            {
              question: "Tell me: Do you like playing games?",
              hints: ["Yes", "I", "like", "playing", "games"]
            }
          ],
          target_keywords: ["like", "playing", "yes", "I"],
          ack_options: ["Great!", "Wonderful!", "Nice!"],
          recast_templates: [
            "You like playing!",
            "Playing makes you happy!"
          ],
          success_criteria: "Student says 'I like playing'"
        },
        {
          stepKey: "likes_reading",
          category: "Activity - Reading",
          question_variants: [
            {
              question: "Do you like reading?",
              hints: ["I", "like", "reading", "Yes"]
            },
            {
              question: "What about reading? Do you like it?",
              hints: ["like", "I", "reading"]
            },
            {
              question: "Do you like reading books?",
              hints: ["Yes", "I", "like", "reading", "books"]
            }
          ],
          target_keywords: ["like", "reading", "yes", "books"],
          ack_options: ["Excellent!", "Great!", "Wonderful!"],
          recast_templates: [
            "You like reading!",
            "Reading is fun!"
          ],
          success_criteria: "Student says 'I like reading'"
        },
        {
          stepKey: "likes_drawing",
          category: "Activity - Drawing",
          question_variants: [
            {
              question: "Do you like drawing?",
              hints: ["I", "like", "drawing", "Yes"]
            },
            {
              question: "What about drawing? Do you like it?",
              hints: ["like", "I", "drawing"]
            },
            {
              question: "Do you like drawing pictures?",
              hints: ["Yes", "I", "like", "drawing", "pictures"]
            }
          ],
          target_keywords: ["like", "drawing", "yes", "pictures"],
          ack_options: ["Amazing!", "Great!", "Perfect!"],
          recast_templates: [
            "You like drawing!",
            "Drawing is fun!"
          ],
          success_criteria: "Student says 'I like drawing'"
        },
        {
          stepKey: "likes_singing",
          category: "Activity - Singing",
          question_variants: [
            {
              question: "Do you like singing?",
              hints: ["I", "like", "singing", "Yes"]
            },
            {
              question: "What about singing? Do you like it?",
              hints: ["like", "I", "singing"]
            },
            {
              question: "Do you like singing songs?",
              hints: ["Yes", "I", "like", "singing", "songs"]
            }
          ],
          target_keywords: ["like", "singing", "yes", "songs"],
          ack_options: ["Beautiful!", "Great!", "Wonderful!"],
          recast_templates: [
            "You like singing!",
            "Singing is fun!"
          ],
          success_criteria: "Student says 'I like singing'"
        },
        {
          stepKey: "feeling_today",
          category: "Emotions",
          question_variants: [
            {
              question: "How are you feeling today? Happy or sad?",
              hints: ["I", "am", "happy", "feel"]
            },
            {
              question: "Are you happy today?",
              hints: ["Yes", "I", "am", "happy"]
            },
            {
              question: "When you play, are you happy or excited?",
              hints: ["am", "I", "happy", "excited"]
            }
          ],
          target_keywords: ["happy", "sad", "excited", "feel", "am"],
          ack_options: ["Good!", "Great!", "Wonderful!"],
          recast_templates: [
            "You are {emotion}!",
            "You feel {emotion}!"
          ],
          success_criteria: "Student names emotion"
        },
        {
          stepKey: "favorite_activity",
          category: "Preference",
          question_variants: [
            {
              question: "What do you like MOST? Playing, reading, or drawing?",
              hints: ["like", "I", "playing", "most"]
            },
            {
              question: "Which one makes you MOST happy?",
              hints: ["makes", "Playing", "me", "happy"]
            },
            {
              question: "What is your favorite? Playing or reading?",
              hints: ["favorite", "My", "is", "playing"]
            }
          ],
          target_keywords: ["like", "most", "favorite", "playing", "reading", "drawing", "singing"],
          ack_options: ["Perfect!", "Great choice!", "Wonderful!"],
          recast_templates: [
            "You like {activity} most!",
            "{activity} is your favorite!"
          ],
          success_criteria: "Student names favorite activity"
        },
        {
          stepKey: "goodbye",
          category: "Closing",
          type: "termination",
          canonical_question: "",
          target_keywords: [],
          ack_options: ["Wonderful!"],
          hints: [],
          recast_templates: [],
          goodbye_en: "Your Happy Jar is amazing! It has playing, reading, drawing, singing! Keep it safe! When you feel sad, look at it and remember happy things! Goodbye! 🌟",
          goodbye_vi: "Lọ Hạnh Phúc của bạn tuyệt vời! Nó có chơi, đọc, vẽ, hát! Giữ nó cẩn thận! Khi buồn, nhìn vào và nhớ những điều vui! Tạm biệt! 🌟",
          success_criteria: "Mission complete"
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20,
      expected_duration: "15+ minutes"
    },
    {
      mission_id: 2,
      title: "The Feeling Game",
      title_vi: "Trò chơi Cảm xúc",
      theme: "Emotions - Guessing & Acting",
      
      nova_greeting: "Let's play the Feeling Game! I show feelings, you guess!", // DEPRECATED
      default_hints: ["I", "am", "happy"],
      
      mission_context: `This is Week 4 Mission 2 - The Feeling Game. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about EMOTIONS and ACTIVITIES. GRAMMAR: "I like [verb]-ing" and "I am [emotion]". Give FULL scaffolding: "Say: I am happy" or "Say: I like playing". VOCABULARY: happy, sad, funny, friendly, excited, playing, reading, drawing, singing, jar. STRICT FOCUS: EMOTIONS & ACTIVITIES ONLY - Every question must be about HOW student FEELS or WHAT student LIKES. FORBIDDEN: Do NOT ask "What color...?", "Is it big?", "Where is...?", "Do you want...?", "What do you think?". ONLY allowed questions: "(Act 🎭) How do I feel?", "When do you feel happy?", "What do you like doing?". NEVER ask about locations, objects, or descriptions - ONLY EMOTIONS AND "I LIKE + V-ING".`,
      
      target_vocab: ["happy", "sad", "excited", "funny", "friendly", "playing", "reading", "drawing"],
      
      grammar_pattern: "I am [emotion] / I like [verb]-ing",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Ms. Nova",
        personality: "Playful, expressive, loves acting out emotions",
        backstory: "Ms. Nova is an actress! She can show many different feelings! Today she will act, and you guess the emotion!",
        speaking_style: "Dramatic, uses emojis and actions, celebrates correct guesses",
        facts: {
          loves_acting: true,
          can_show_emotions: true,
          favorite_game: "feeling game",
          teaches_emotions: true,
          acts_happy: true,
          acts_sad: true,
          acts_excited: true
        },
        role: "Emotion actress teaching feelings through acting"
      },

      opening_narrative: "Hi! I'm Ms. Nova the Actress! 🎭 Let's play the Feeling Game! I will ACT, you GUESS the feeling! Ready? (Act happy 😊) How do I feel? Say: You are happy!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-4",
          phase_name: "Learning to Guess Emotions",
          focus: "Guess basic emotions from acting",
          phase_questions: [
            "(Act happy 😊) Look at my face! How do I feel? Say: You are happy!",
            "(Act sad 😢) Now look! How do I feel? Say: You are sad!",
            "(Act excited 🤩) WOW! How do I feel? Say: You are excited!",
            "Great! You know the feelings! Now let's play together!"
          ],
          example_answers: [
            "You are happy",
            "You are sad",
            "You are excited",
            "Yes"
          ]
        },
        {
          phase: "student_feelings",
          turns: "5-10",
          phase_name: "Student Shares Feelings",
          focus: "Student tells when they feel emotions",
          phase_questions: [
            "When are YOU happy? When you play? Say: I am happy when I play.",
            "When are YOU sad? When you stop playing? Say: I am sad when...",
            "When are YOU excited? Before your birthday? Say: I am excited when...",
            "What do you like doing when you're happy? Say: I like playing OR I like reading.",
            "Good! Playing makes you happy! What else? Say: I like...",
            "When you sing, are you happy? Say: Yes, I am happy OR No, I am not happy."
          ],
          example_answers: [
            "I am happy when I play",
            "I am sad when I stop playing",
            "I am excited when it's my birthday",
            "I like playing",
            "I like drawing",
            "Yes, I am happy"
          ]
        },
        {
          phase: "likes_and_feelings",
          turns: "11-14",
          phase_name: "Connect Likes to Feelings",
          focus: "Connect 'I like' to emotions",
          phase_questions: [
            "You like playing! Does it make you happy? Say: Yes, playing makes me happy.",
            "You like reading! Does it make you excited? Say: Yes, reading makes me excited.",
            "What makes you MOST happy? Playing or reading? Say: Playing makes me most happy.",
            "When do you feel MOST excited? Say: I feel excited when..."
          ],
          example_answers: [
            "Yes, playing makes me happy",
            "Yes, reading makes me excited",
            "Playing makes me most happy",
            "I feel excited when I play"
          ]
        },
        {
          phase: "conclusion",
          turns: "15-16",
          phase_name: "Wrap Up Feeling Game",
          focus: "Celebrate learning emotions",
          phase_questions: [
            "You know happy, sad, excited! And you know: I like playing, reading, drawing! Great job! 🎭",
            "Remember: Do things you like! They make you happy! Goodbye! 👋"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 18,
      expected_duration: "12+ minutes"
    },
    {
      mission_id: 3,
      title: "The Happiness Detective",
      title_vi: "Thám tử Hạnh Phúc",
      theme: "Finding What Makes People Happy",
      
      nova_greeting: "I'm Detective Nova! Let's find what makes people happy!", // DEPRECATED
      default_hints: ["I", "like", "playing"],
      
      mission_context: `This is Week 4 Mission 3 - The Happiness Detective. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. ONLY ask about ACTIVITIES and EMOTIONS. GRAMMAR: "I like [verb]-ing" pattern. Give FULL scaffolding: "Say: I like playing" or "Say: I am happy". VOCABULARY: happy, sad, funny, friendly, excited, playing, reading, drawing, singing, jar. STRICT FOCUS: "I LIKE + V-ING" AND EMOTIONS ONLY - Every question must be about WHAT makes student happy. FORBIDDEN: Do NOT ask "What color...?", "Is it big?", "Where is...?", "Do you want...?", "What do you think?", "How are you?". ONLY allowed questions: "What makes you happy?", "Do you like...?", "What do your friends like?", "What makes people happy?". NEVER ask about locations, objects, or descriptions - ONLY ACTIVITIES WITH "I LIKE + V-ING".`,
      
      target_vocab: ["happy", "sad", "excited", "friendly", "funny", "playing", "reading", "drawing", "singing"],
      
      grammar_pattern: "I like [verb]-ing / [Person] likes [verb]-ing",

      // === STORY MODE CONFIGURATION ===
      story_character: {
        name: "Detective Nova",
        personality: "Curious, investigative, loves solving happiness mysteries",
        backstory: "Detective Nova solves happiness mysteries! She finds out what makes people happy! Today she needs YOUR help to solve the case!",
        speaking_style: "Curious, asks investigation questions, takes notes of student's likes",
        facts: {
          is_detective: true,
          solves_mysteries: true,
          has_notebook: true,
          writes_clues: true,
          favorite_clue: "playing makes people happy",
          investigates_happiness: true
        },
        role: "Detective investigating what makes student and others happy"
      },

      opening_narrative: "Hello! I'm Detective Nova! 🕵️‍♀️ I solve happiness mysteries! Today's case: What makes YOU happy? Let's investigate! First clue: Do you like playing or reading? Say: I like playing OR I like reading.",

      story_arc: [
        {
          phase: "intro",
          turns: "1-2",
          phase_name: "Opening the Case",
          focus: "Start happiness investigation",
          phase_questions: [
            "Aha! First clue! ✍️ You like {activity}! Does it make you happy or excited? Say: It makes me happy OR It makes me excited.",
            "Perfect! I write that in my detective notebook! 📒 Clue #2: Do you like drawing or singing? Say: I like drawing OR I like singing."
          ],
          example_answers: [
            "It makes me happy",
            "I like drawing"
          ]
        },
        {
          phase: "collecting_clues",
          turns: "3-7",
          phase_name: "Collecting Happiness Clues",
          focus: "Discover multiple activities student likes",
          phase_questions: [
            "Great clue! ✨ Clue #3: When you {previous activity}, are you happy or excited? Say: I am happy OR I am excited.",
            "Excellent! 🔍 Clue #4: Do your friends like playing or reading? Say: My friends like playing OR My friends like reading.",
            "So many clues! ✍️ Clue #5: What makes you MOST happy? Playing, reading, drawing, or singing? Say: {activity} makes me most happy.",
            "Amazing detective work! 🎉 Now I know what makes YOU happy!",
            "Final clue: When you do things you like, do you feel happy or excited? Say: I feel happy OR I feel excited."
          ],
          example_answers: [
            "I am excited",
            "My friends like playing",
            "Playing makes me most happy",
            "Yes",
            "I feel happy"
          ]
        },
        {
          phase: "solving_mystery",
          turns: "8-10",
          phase_name: "Solving the Happiness Mystery",
          focus: "Conclude what makes people happy",
          phase_questions: [
            "I found many clues! ✍️ You like: {activities}! What's the mystery answer? Doing things we like makes us happy or sad? Say: It makes us happy.",
            "Case solved! 🎉 Mystery answer: Doing things we LIKE makes us happy! When you play, read, draw, or sing - you feel happy or excited! Right? Say: Yes, I feel happy.",
            "Perfect! The Happiness Mystery is solved! 🕵️‍♀️ Great detective work!"
          ],
          example_answers: [
            "It makes us happy",
            "Yes, I feel happy",
            "Thank you"
          ]
        },
        {
          phase: "conclusion",
          turns: "12",
          phase_name: "Closing the Case",
          focus: "Celebrate solving happiness mystery",
          phase_questions: [
            "Case closed! 🎉 The answer: Do things you LIKE! They make you happy! 📒✨ Goodbye, Detective Partner! Keep being happy! 👋"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 18,
      expected_duration: "12+ minutes"
    }
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "My Happy Jar (Emotions & Likes)",
    week_number: 4,
    theme: "Emotions and Activities",
    
    knowledge_base: [
      "Emotions: happy, sad, excited, funny, friendly",
      "Activities: playing, reading, drawing, singing",
      "Grammar: I like + V-ing (I like playing, I like reading)",
      "We can feel different emotions: happy, sad, excited",
      "Doing things we like makes us happy",
      "A jar can hold happy memories and moments",
      "Playing games makes many people happy",
      "Reading books can be exciting and fun",
      "Drawing pictures helps us express feelings",
      "Singing songs makes us feel joyful",
      "When we feel sad, we can do things we like to feel better"
    ],
    
    example_opening_questions: [
      "What do you like doing?",
      "Do you like playing games?",
      "What makes you happy?",
      "Are you happy today?",
      "Do you like reading or drawing more?",
      "What do you like playing?",
      "When do you feel excited?"
    ],
    
    // ✅ FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask_anything" }
    ],
    
    // Legacy bonus roleplay
    bonus_roleplay: {
      id: 'week4_happiness_coach',
      label_en: "Happiness Coach 🌟",
      label_vi: "Huấn luyện viên Hạnh phúc 🌟",
      icon: "🌟",
      ai_role: "Happiness coach helping student find joy",
      user_role: "Student learning about happiness",
      intro: "Hi! I'm your Happiness Coach! Let's find what makes you happy! What do you like doing?",
      context: "Week 4 theme - Emotions & Likes. AI acts as happiness coach helping student discover activities they enjoy using 'I like + V-ing' pattern. Coach asks 'What do you like?' and student responds with activities (playing, reading, drawing, singing). Should be encouraging and use simple words for A0+ level."
    }
  },

  // ✨ DYNAMIC ROLEPLAY SCENARIOS (3 HIGH-QUALITY SCENARIOS ONLY)
  roleplay_scenarios: [
      {
        id: "rp_happiness_tv",
        title: "Happy TV Show 🎤",
        title_en: "Happy TV Show",
        title_vi: "Chương trình Happy TV",
        emoji: "🎤",
        description: "You're a guest on Happy TV! Share what activities you like!",
        
        // AI Persona
        ai_role: "TV Host (Ms. Nova) - Interviews student about likes",
        user_role: "TV Guest - Student shares activities they enjoy",
        context: "Student is a special guest on 'Happy TV' talk show. Ms. Nova asks about activities that make them happy. CRITICAL: Every question MUST use 'Do you like [A] or [B]?' format to force full sentence responses.",
        
        // Pedagogical Focus
        vocab_focus: ["happy", "excited", "playing", "reading", "drawing", "singing", "like"],
        
        // Opening (MUST have OR)
        opening_line: "Welcome to Happy TV! 🎤 You're our star guest! First question: Do you like playing games or reading books? Say the full answer: I like playing games OR I like reading books.",
        
        // Guide rules for AI behavior - SUPER STRICT
        guide_rules: "CRITICAL RULES - FOLLOW EXACTLY: (1) EVERY question MUST use format: 'Do you like [activity A] or [activity B]?' (2) NEVER ask yes/no questions like 'Do you play with friends?' (3) NEVER ask open questions like 'What do you like?' (4) Student MUST answer 'I like + V-ing'. (5) After answer, acknowledge with excitement: 'I like [activity]! Wonderful! Our audience loves that! 👏' (6) Then ask NEXT question with OR immediately. (7) Activities sequence (ask in order, don't repeat): Question 1: playing games or reading books → Question 2: drawing pictures or singing songs → Question 3: reading books or playing games (different order) → Question 4: singing songs or drawing pictures → Question 5: playing games or drawing pictures. (8) TRACK which questions asked - NEVER repeat same pair. (9) ONE question per turn. FORBIDDEN: Asking same question twice, 'Do you play', 'with friends', 'What', 'How'. ONLY use: 'Do you like [A] or [B]?' with NEW combinations each time.",
        
        // Backup questions (ALL use OR format)
        backup_questions: [
          "Do you like reading books or drawing pictures? Say: I like reading books OR I like drawing pictures.",
          "Do you like playing games or singing songs? Say: I like playing games OR I like singing songs.",
          "Which do you prefer: drawing pictures or reading books? Say: I like drawing OR I like reading.",
          "Do you like singing songs or playing games? Say: I like singing OR I like playing.",
          "Final question! Do you like reading or playing more? Say: I like reading more OR I like playing more."
        ]
      },
      {
        id: "rp_emotion_game",
        title: "How Do You Feel? 😊",
        title_en: "How Do You Feel?",
        title_vi: "Bạn cảm thấy thế nào?",
        emoji: "😊",
        description: "Tell Ms. Nova about YOUR feelings in different situations!",
        
        ai_role: "Emotion Guide (Ms. Nova) - Describes situations",
        user_role: "Student - Shares their feelings",
        context: "Ms. Nova describes different situations and student tells how THEY feel using 'I am...' or 'I feel...' pattern. CRITICAL: Questions ask about STUDENT emotions with OR choices.",
        
        vocab_focus: ["happy", "sad", "excited", "funny", "friendly", "feel"],
        
        opening_line: "Let's talk about YOUR feelings! 😊 When you play games with friends, how do you feel? Are you happy or excited? Say: I am happy OR I am excited.",
        
        guide_rules: "CRITICAL RULES: (1) Describe a situation (playing with friends, reading a book, winning a game, helping someone, drawing). (2) Ask: 'How do YOU feel? Are you [emotion A] or [emotion B]?' (3) Student answers: 'I am [emotion]' or 'I feel [emotion]'. (4) React: 'I am happy! That's a great feeling! 😊 Next situation...' (5) Situations sequence (don't repeat): playing with friends → reading a book → winning a game → helping someone → drawing a picture. (6) Emotions to offer: happy, excited, sad, friendly. (7) ONE situation per turn. (8) TRACK situations asked - NEVER repeat same situation. FORBIDDEN: Asking about AI emotions ('Am I...?'), repeating situations, 'Do you like...?', 'What makes you...?'. ONLY ask: 'When you [situation], how do YOU feel? Are you [A] or [B]?'",
        
        backup_questions: [
          "When you read a fun book, how do you feel? Are you happy or excited? Say: I am happy OR I am excited.",
          "When you help a friend, how do you feel? Are you friendly or happy? Say: I am friendly OR I am happy.",
          "When you win a game, how do you feel? Are you excited or happy? Say: I am excited OR I am happy.",
          "When you draw a beautiful picture, how do you feel? Are you happy or excited? Say: I am happy OR I am excited.",
          "When you sing songs, how do you feel? Are you happy or excited? Say: I am happy OR I am excited."
        ]
      },
      {
        id: "rp_happiness_jar",
        title: "Fill the Happy Jar 🏺",
        title_en: "Fill the Happy Jar",
        title_vi: "Lấp đầy Lọ Hạnh phúc",
        emoji: "🏺",
        description: "Collect happy activities to fill a magical jar!",
        
        ai_role: "Jar Keeper (Ms. Nova) - Collects happy moments",
        user_role: "Helper - Student shares activities",
        context: "Ms. Nova has a magical Happy Jar (0/5 full). Each activity student likes becomes a glowing ball that fills the jar. CRITICAL: Questions must offer 2 activity choices with OR.",
        
        vocab_focus: ["happy", "excited", "jar", "playing", "reading", "drawing", "singing", "like"],
        
        opening_line: "Look at my Happy Jar! 🏺 It's empty (0/5). Let's fill it! First ball: Do you like playing games or reading books? Say: I like playing OR I like reading.",
        
        guide_rules: "CRITICAL JAR STORY RULES: (1) Show jar progress: 'The jar is 1/5 full 🏺' (2) Ask: 'Do you like [activity A] or [activity B]?' (3) Student answers: 'I like + V-ing'. (4) React: '*Put [activity] in jar* ✨ The jar glows! Now 2/5 full!' (5) Ask for NEXT activity with OR. (6) When 5/5: 'WOW! The jar is FULL of happiness! 🎉 It's shining!' (7) Activities: playing games, reading books, drawing pictures, singing songs. (8) ONE question per turn. FORBIDDEN: Do NOT ask 'What do you like?', 'What makes you happy?' without OR. ONLY use: 'Do you like [A] or [B]?' format.",
        
        backup_questions: [
          "Next ball! Do you like drawing pictures or singing songs? Say: I like drawing OR I like singing.",
          "Keep going! Do you like reading books or playing games? Say: I like reading OR I like playing.",
          "Almost there! Do you like singing songs or drawing pictures? Say: I like singing OR I like drawing.",
          "One more! Do you like playing or reading? Say: I like playing OR I like reading.",
          "Last ball! Which do you prefer: singing or drawing? Say: I like singing OR I like drawing."
        ]
      }
    ]
};

export default week4RealData;
