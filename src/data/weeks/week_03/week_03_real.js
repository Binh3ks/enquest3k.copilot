/**
 * ✅ WEEK 3 REAL SYLLABUS DATA
 * 
 * Source: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
 * Phase 1 - Block A: Week 3
 * 
 * Generated per: ENGQUEST MASTER PROMPT V28-RECAST-FIX.txt
 * - Story Missions vocabulary & patterns
 * - Grammar: is vs has (describing appearance)
 * - V28 Format: ack + recast + question (NOT teacher_ack/etc)
 */

export const week3RealData = {
  // === METADATA ===
  weekId: 3,  // 🔥 NovaEngine expects number for GAME_TEMPLATES
  week_id: 3,
  week_number: 3,
  phase: 1,
  block: "A",
  unit: 1,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "The Mirror Game (Appearance)",  // 🔥 Compatibility alias
  week_title_en: "The Mirror Game (Appearance)",
  week_title_vi: "Trò chơi Soi Gương (Ngoại hình)",
  
  topic: "Physical appearance and descriptions",
  topic_vi: "Miêu tả ngoại hình và đặc điểm vật lý",

  chunk_focus: [
    "My teacher",
    "very tall",
    "lovely personality",
    "long black hair",
    "big brown eyes",
    "wears glasses",
    "to see the board clearly",
    "kind face",
    "warm smile",
    "her students",
    "my teacher",
    "very nice",
    "smart and caring",
    "gentle and kind",
    "very happy"
  ],
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe physical appearance using 'is' for qualities (tall, short) and 'has' for possessions (long hair, blue eyes).",
  learning_outcome_vi: "Miêu tả ngoại hình sử dụng 'is' cho tính chất (cao, thấp) và 'has' cho sở hữu (tóc dài, mắt xanh).",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "is vs has (describing people)",
  grammar_pattern: "She is [adjective]. / She has [noun].",
  grammar_examples: [
    "She is tall.",
    "She has long hair.",
    "He is short.",
    "He has blue eyes.",
    "I am not tall."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++) ===
  target_vocab: [
    {
      word: "tall",
      pronunciation: "/tɔːl/",
      definition_vi: "Cao",
      definition_en: "Of great height.",
      example: "She is tall.",
      syllabus_context: "Physical description"
    },
    {
      word: "short",
      pronunciation: "/ʃɔːrt/",
      definition_vi: "Thấp",
      definition_en: "Of small height.",
      example: "He is short.",
      syllabus_context: "Physical description"
    },
    {
      word: "hair",
      pronunciation: "/heər/",
      definition_vi: "Tóc",
      definition_en: "Strands growing on the head.",
      example: "She has long hair.",
      syllabus_context: "Body parts"
    },
    {
      word: "eyes",
      pronunciation: "/aɪz/",
      definition_vi: "Mắt",
      definition_en: "Organs for seeing.",
      example: "I have brown eyes.",
      syllabus_context: "Body parts"
    },
    {
      word: "long",
      pronunciation: "/lɔːŋ/",
      definition_vi: "Dài",
      definition_en: "Extended in length.",
      example: "She has long hair.",
      syllabus_context: "Descriptive adjectives"
    },
    {
      word: "curly",
      pronunciation: "/ˈkɜːrli/",
      definition_vi: "Xoăn",
      definition_en: "Having curves or waves.",
      example: "My hair is curly.",
      syllabus_context: "Hair descriptions"
    },
    {
      word: "straight",
      pronunciation: "/streɪt/",
      definition_vi: "Thẳng",
      definition_en: "Not curved or wavy.",
      example: "His hair is straight.",
      syllabus_context: "Hair descriptions"
    },
    {
      word: "glasses",
      pronunciation: "/ˈɡlæsɪz/",
      definition_vi: "Kính",
      definition_en: "Eyewear to help you see.",
      example: "I wear glasses.",
      syllabus_context: "Accessories"
    },
    {
      word: "face",
      pronunciation: "/feɪs/",
      definition_vi: "Mặt",
      definition_en: "The front of the head.",
      example: "She has a kind face.",
      syllabus_context: "Body parts"
    },
    {
      word: "smile",
      pronunciation: "/smaɪl/",
      definition_vi: "Nụ cười",
      definition_en: "A happy expression.",
      example: "She has a big smile.",
      syllabus_context: "Expressions"
    }
  ],
  

  global_vocab: ["tall", "short", "hair", "eyes", "long", "curly", "straight", "glasses", "face", "smile"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and human-like",
    tone: "Playful, encouraging, loves describing and guessing games",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Nova! Look in the mirror! Can you describe yourself? Are you tall or short? Say: I am tall or I am short.",
      mission_2: "Let's play a guessing game! I am thinking of a mystery friend. First clue: She is tall. Can you guess who? Ask me for more clues!",
      mission_3: "I have a broken robot here! Robot says wrong things: She is long hair. Can you fix it? Say: She HAS long hair. Help me fix the robot!"
    },
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use 'She is [adjective]' and 'She has [noun]' - Week 3 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "She is long hair.",
      nova_recast: "She HAS long hair. Say: She HAS long hair! What color is her hair?"
    },
    vocabulary_scaffolding: [
      "Mission 1: tall, short, hair, eyes, face, smile - physical description with 'is + adjective'",
      "Mission 2: long, curly, straight, glasses - hair/face details using 'has + noun'",
      "Mission 3: combine all description vocab - is vs has correction practice"
    ],
    questioning_skill: [
      "Are you tall or short?",
      "What is your hair like?",
      "Do you have long hair or short hair?",
      "Does she have glasses?",
      "Is she tall or short?"
    ],
    must_use_vocab: ["tall", "short", "hair", "eyes", "long", "curly", "straight", "glasses"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Past tense or future tense (Week 3 scope is present simple only)"
    ]
  },
  // === STORY MISSIONS (3 missions, ~15 turns each) ===
  missions: [
    {
      mission_id: 1,
      title: "Looking in the Mirror",
      title_en: "Looking in the Mirror",
      title_vi: "Nhìn Vào Gương",
      theme: "Self-description with appearance vocabulary",
      
      nova_greeting: "Hi! I'm Nova! Look in the mirror! 🪞",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 3 Mission 1 - Looking in the Mirror. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova holds a magic mirror and describes what she sees about the student. She asks about height, hair, and eyes. OPENING: Ask about height first ("Are you tall or short?"), then hair length, then hair color, then eye color. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "I am [tall/short]" and "I have [long/short/dark] hair" - model BOTH patterns in each new topic. Give scaffolding every turn: "Say: I am tall" or "Say: I have long hair." VOCABULARY: tall, short, long, small, hair, dark, light, brown, black, eyes, big, face. STRICT FOCUS: PHYSICAL APPEARANCE ONLY - height, hair length, hair color, eye features. RECAST ERRORS: student says "I tall" → "You ARE tall! Say: I AM tall!" Model subject + verb always. SAMPLE TURN: "Are you tall or short? Say: I am tall or I am short!" → "short" → "You ARE short! Say: I am short! Now, do you have long hair or short hair?" GAME FLOW: (1) Ask height (tall/short) → (2) Ask hair length (long/short) → (3) Ask hair color (dark/light/brown/black) → (4) Ask eye color. One feature per turn, model both I am/I have patterns. FORBIDDEN: No clothes, feelings, preferences. Do NOT ask "Do you like...?" NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. covering height, hair, and eyes. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["tall", "short", "hair", "eyes", "face", "smile"],
      grammar_pattern: "I am [adjective]. / I have [noun].",
      
      story_character: {
        name: "Nova",
        role: "friendly teacher",
        personality: "encouraging, curious, loves learning about students",
        speaking_style: "warm and supportive, asks simple questions",
        facts: {
          loves_mirrors: true,
          likes_descriptions: true,
          thinks_everyone_is_unique: true
        }
      },
      
      nova_greeting: "Hi! I'm Nova! Look in the mirror! 🪞",
      
      opening_narrative: "Hi! I'm Nova! Look in the mirror! 🪞 Are you tall or short? Say: I am tall or I am short",
      
      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          goal: "Student describes basic appearance",
          phase_questions: [
            "Great name! Now look in the mirror! Are you tall or short? Say: I am tall or I am short",
            "Good! Now look at your hair! Is your hair long or short? Say: My hair is long or My hair is short",
            "Nice! What about your hair style? Is your hair curly or straight? Say: My hair is curly or My hair is straight",
            "Perfect! Now look at your eyes! What color are your eyes? Say: My eyes are brown or My eyes are blue",
            "Wonderful! Do you wear glasses? Say: Yes I have glasses or No I don't have glasses"
          ]
        },
        {
          phase: "details",
          turns: "6-11",
          goal: "More detailed self-description",
          phase_questions: [
            "Great! Now tell me about your face! Do you have a big smile or a small smile? Say: I have a big smile or I have a small smile",
            "Lovely! What color is your hair? Say: My hair is black or My hair is brown",
            "Perfect! Are your eyes big or small? Say: My eyes are big or My eyes are small",
            "Good! Is your hair wavy or straight? Say: My hair is wavy or My hair is straight",
            "Nice! Do you have long eyelashes or short eyelashes? Say: I have long eyelashes or I have short eyelashes",
            "Wonderful! What about your nose? Say: My nose is big or My nose is small"
          ]
        },
        {
          phase: "feelings",
          turns: "12-16",
          goal: "Express feelings about appearance",
          phase_questions: [
            "You described yourself so well! Do you like your hair? Say: Yes I like my hair or No I don't like my hair",
            "Good! Do you think you are tall or short for your age? Say: I am tall for my age or I am short for my age",
            "Great! When you look in the mirror, are you happy or sad? Say: I am happy or I am sad",
            "Perfect! Do you like looking in the mirror? Say: Yes I like it or No I don't like it",
            "Wonderful! You are unique and special! 🌟"
          ]
        },
        {
          phase: "closing",
          turns: "17-20",
          goal: "Wrap up and say goodbye",
          phase_questions: [
            "Thank you for sharing! You described yourself beautifully! What do you like most? Your hair or your eyes? Say: I like my hair or I like my eyes",
            "Perfect! Remember, everyone is different and that's beautiful! Are you proud of how you look? Say: Yes I am proud or I am learning to be proud",
            "You are wonderful just the way you are! 💖 Goodbye! Say: Goodbye Nova"
          ]
        }
      ],
      
      minimum_turns: 8,
      maximum_turns: 12
    },
    {
      mission_id: 2,
      title: "Guess My Friend",
      title_en: "Guess My Friend",
      title_vi: "Đoán Bạn Tôi",
      theme: "Appearance Description Game",
      
      nova_greeting: "I'm thinking of a friend! Can you guess who? I'll give you clues!",
      default_hints: ["She", "is", "tall", "has", "hair"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 3 Mission 2 - Guess My Friend. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova is thinking of a mystery friend and gives clues one at a time. Student answers using third-person description. GAME MECHANIC: Nova gives one physical clue → student says what the mystery friend is like using "She is..." or "She has...". LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "She is [tall/short]" and "She has [long/dark] hair" - ALWAYS third person. Model correct form every turn. Give scaffolding: "Say: She is tall" or "Say: She has curly hair." VOCABULARY: tall, short, long, small, hair, dark, light, curly, straight, eyes, big. STRICT FOCUS: DESCRIBE A THIRD PERSON ONLY - always "She is..." or "She has...". Never let student answer in first person. RECAST ERRORS: student says "She tall" → "She IS tall! Say: She IS tall!" SAMPLE TURN: "My friend is tall or short? Say: She is tall or She is short!" → "tall" → "Yes! She IS tall! Now - does she have long hair or short hair?" FORBIDDEN: No first-person answers, no feelings, no preferences. covering height, hair length, hair color. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["tall", "short", "hair", "eyes", "curly", "straight", "glasses"],
      grammar_pattern: "She is [adjective]. / She has [adjective] [noun].",

      story_character: {
        name: "Nova",
        personality: "playful, mysterious, loves guessing games",
        backstory: "I have many friends with different appearances. Let's see if you can guess who I'm thinking of!",
        speaking_style: "gives clues step by step, encouraging, uses 'is' and 'has' correctly",
        facts: [
          "I love description games!",
          "My friends look very different!",
          "I'll give you clues about appearance!",
          "We use 'is' for tall/short and 'has' for hair/eyes!"
        ],
        role: "Game host giving appearance clues"
      },

      opening_narrative: "🎯 Let's play a guessing game! I'm thinking of a mystery friend! First clue: She is tall. Second clue: She has long hair. Now you tell me - does she have curly hair or straight hair? Say: She has curly hair or She has straight hair?",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "First Friend Clues",
          focus: "Practice 'is' vs 'has' with specific questions",
          phase_questions: [
            {
              template: "Good! She has curly hair! ✨ Now, what color is her hair? Say: Her hair is black or brown or blonde?",
              hints: ["Her", "hair", "is", "black", "brown", "blonde"]
            },
            {
              template: "Nice! Her hair is brown! 🖤 What about her eyes? Say: Her eyes are brown or blue?",
              hints: ["Her", "eyes", "are", "brown", "blue"]
            },
            {
              template: "Her eyes are brown! 👀 Does she wear glasses? Say: Yes she has glasses or No she doesn't have glasses?",
              hints: ["Yes", "she", "has", "glasses", "No", "doesn't", "have"]
            },
            {
              template: "I see! 👓 Now tell me - is she your friend or your sister? Say: She is my friend or my sister?",
              hints: ["She", "is", "my", "friend", "sister"]
            },
            {
              template: "Perfect! ❤️ New friend! He is short. He has straight hair. What color is his hair? Say: His hair is black or brown?",
              hints: ["His", "hair", "is", "black", "brown"]
            }
          ]
        },
        {
          phase: "middle",
          turns: "6-11",
          phase_name: "More Mystery Friends",
          focus: "Continue guessing game with varied descriptions",
          phase_questions: [
            {
              template: "His hair is black! 🤎 What about his eyes? Say: His eyes are brown or blue?",
              hints: ["His", "eyes", "are", "brown", "blue"]
            },
            {
              template: "His eyes are brown! 👀 Does he wear glasses? Say: Yes he has glasses or No he doesn't have glasses?",
              hints: ["Yes", "he", "has", "glasses", "No", "doesn't", "have"]
            },
            {
              template: "Good! 👓 New friend! She is tall. She has long hair. Does she have curly hair or straight hair? Say: She has curly hair or straight hair?",
              hints: ["She", "has", "curly", "straight", "hair"]
            },
            {
              template: "She has curly hair! ✨ What color is her hair? Say: Her hair is black or brown or blonde?",
              hints: ["Her", "hair", "is", "black", "brown", "blonde"]
            },
            {
              template: "Her hair is black! 🖤 What about her eyes? Say: Her eyes are brown or blue?",
              hints: ["Her", "eyes", "are", "brown", "blue"]
            },
            {
              template: "Her eyes are brown! 👀 Does she wear glasses? Say: Yes she has glasses or No she doesn't have glasses",
              hints: ["Yes", "she", "has", "glasses", "No", "doesn't", "have"]
            }
          ]
        },
        {
          phase: "more_practice",
          turns: "12-16",
          phase_name: "Quick Descriptions",
          focus: "Faster paced friend descriptions",
          phase_questions: [
            {
              template: "Perfect! 👓 Next friend! He is tall. Does he have long hair or short hair? Say: He has long hair or short hair?",
              hints: ["He", "has", "long", "short", "hair"]
            },
            {
              template: "He has short hair! ✂️ Is he your friend or your brother? Say: He is my friend or my brother?",
              hints: ["He", "is", "my", "friend", "brother"]
            },
            {
              template: "Nice! ❤️ One more! She is short. She has curly hair. What color is her hair? Say: Her hair is black or brown or blonde?",
              hints: ["Her", "hair", "is", "black", "brown", "blonde"]
            },
            {
              template: "Her hair is brown! 🤎 Does she wear glasses? Say: Yes she has glasses or No she doesn't have glasses?",
              hints: ["Yes", "she", "has", "glasses", "No", "doesn't", "have"]
            },
            {
              template: "Great job! 🎉 Now your turn! Think of a friend. Is your friend tall or short? Say: My friend is tall or short?",
              hints: ["My", "friend", "is", "tall", "short"]
            }
          ]
        },
        {
          phase: "closing",
          turns: "17-20",
          phase_name: "You Describe!",
          focus: "Student creates their own descriptions",
          phase_questions: [
            {
              template: "Good! Your friend is tall! Does your friend have long hair or short hair? Say: My friend has long hair or short hair?",
              hints: ["My", "friend", "has", "long", "short", "hair"]
            },
            {
              template: "Your friend has long hair! ✂️ What color is your friend's hair? Say: My friend has black hair or brown hair or blonde hair?",
              hints: ["My", "friend", "has", "black", "brown", "blonde", "hair"]
            },
            {
              template: "Perfect! Your friend has brown hair! 🖤 What about your friend's eyes? Say: My friend has brown eyes or blue eyes?",
              hints: ["My", "friend", "has", "brown", "blue", "eyes"]
            },
            {
              template: "Wonderful! You're so good at this! 🌟 Thanks for playing with me! Goodbye?",
              hints: ["Thank", "you", "Goodbye", "Bye"]
            }
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12
    },
    {
      mission_id: 3,
      title: "Broken Robot",
      title_en: "Broken Robot",
      title_vi: "Robot Hỏng",
      theme: "is vs has Grammar Game",
      
      nova_greeting: "Oh no! My robot is broken! It says wrong sentences! Can you fix them?",
      default_hints: ["She", "is", "has", "tall", "long"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 3 Mission 3 - Broken Robot. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Detective Nova has a Broken Robot that mixes up "is" and "has" in appearance sentences. Student must FIX the robot. GAME MECHANIC: Nova/Robot says a WRONG appearance sentence → student corrects it with the right form. WRONG examples: "She is long hair" (fix: She HAS long hair), "She has tall" (fix: She IS tall). LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "She IS [adjective]" vs "She HAS [noun feature]" - this is the ONLY grammar point. Give clear scaffolding after each mistake: "Say: She has long hair!" or "Say: She is tall!" VOCABULARY: tall, short, long, small, hair, dark, light, curly, straight, eyes, big. STRICT FOCUS: IS vs HAS confusion ONLY. Every turn = Robot says wrong → student fixes. RECAST: Always confirm the correct form - "YES! She HAS long hair! Robot is fixed!" FORBIDDEN: No other topics. Do NOT skip the correction mechanic., mix of "is" errors and "has" errors equally. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["tall", "short", "long", "curly", "straight", "glasses", "smile"],
      grammar_pattern: "is [adjective] vs has [noun]",

      story_character: {
        name: "Nova",
        personality: "helpful, patient robot repair expert",
        backstory: "My robot friend is broken! It mixes up 'is' and 'has'. Help me fix it!",
        speaking_style: "shows broken sentences, celebrates fixes with 'Fixed!' emoji 🤖✅",
        facts: [
          "My robot keeps making grammar mistakes!",
          "We need to fix 'is' and 'has' errors!",
          "You're the repair expert!",
          "Every fix makes the robot better!"
        ],
        role: "Robot repair coordinator"
      },

      opening_narrative: "🤖 Robot says: 'She is long hair.' ❌ Broken! Can you fix it? Say: She HAS long hair!",

      story_arc: [
        {
          phase: "simple_fixes",
          turns: "1-6",
          phase_name: "Easy Robot Errors",
          focus: "Fix simple is/has mistakes",
          phase_questions: [
            {
              template: "Yes! She has long hair! ✅ Next error: '🤖 He has tall.' What's the correct sentence?",
              hints: ["He", "is", "tall"]
            },
            {
              template: "Perfect! He is tall! ✅ Robot says: '🤖 I has brown eyes.' Fix it?",
              hints: ["I", "have", "brown", "eyes"]
            },
            {
              template: "Great fix! I have brown eyes! ✅ New broken sentence: '🤖 They are glasses.' Is this right or wrong?",
              hints: ["They", "have", "glasses"]
            },
            {
              template: "Correct! They have glasses! ✅ Fix this: '🤖 She have curly hair.' Should it be have or has?",
              hints: ["She", "has", "curly", "hair"]
            },
            {
              template: "Yes! She has curly hair! ✅ Next: '🤖 You is my friend.' What should it be?",
              hints: ["You", "are", "my", "friend"]
            },
            {
              template: "Correct! You are my friend! ✅ Robot error: '🤖 We has a cat.' Can you fix it?",
              hints: ["We", "have", "a", "cat"]
            }
          ]
        },
        {
          phase: "harder_fixes",
          turns: "7-13",
          phase_name: "Trickier Errors",
          focus: "More complex sentence errors",
          phase_questions: [
            {
              template: "Perfect! We have a cat! ✅ Next: '🤖 She are beautiful.' Fix this one?",
              hints: ["She", "is", "beautiful"]
            },
            {
              template: "Yes! She is beautiful! ✅ Error: '🤖 He have short hair.' What's wrong?",
              hints: ["He", "has", "short", "hair"]
            },
            {
              template: "Great! He has short hair! ✅ Fix: '🤖 I are happy.' Should it be am or are?",
              hints: ["I", "am", "happy"]
            },
            {
              template: "Yes! I am happy! ✅ New error: '🤖 They is tall.' What's the correct sentence?",
              hints: ["They", "are", "tall"]
            },
            {
              template: "Perfect! They are tall! ✅ Error: '🤖 My mom has beautiful.' Can you fix this?",
              hints: ["My", "mom", "is", "beautiful"]
            },
            {
              template: "Excellent! My mom is beautiful! ✅ Robot says: '🤖 You is smart.' Fix it?",
              hints: ["You", "are", "smart"]
            },
            {
              template: "Great! You are smart! ✅ Final tricky error: '🤖 She have a big smile.' What's the correct sentence?",
              hints: ["She", "has", "a", "big", "smile"]
            }
          ]
        },
        {
          phase: "final_check",
          turns: "14-17",
          phase_name: "Last Tests",
          focus: "Final robot repairs",
          phase_questions: [
            {
              template: "Perfect! She has a big smile! ✅ Robot says: '🤖 He are kind.' Fix it?",
              hints: ["He", "is", "kind"]
            },
            {
              template: "Yes! He is kind! ✅ Error: '🤖 I has glasses.' What should it be?",
              hints: ["I", "have", "glasses"]
            },
            {
              template: "Great! I have glasses! ✅ Last one: '🤖 They has long hair.' Can you fix this?",
              hints: ["They", "have", "long", "hair"]
            },
            {
              template: "Excellent! They have long hair! ✅ Amazing work?",
              hints: ["Thank", "you", "Great", "job"]
            }
          ]
        },
        {
          phase: "victory",
          turns: "18-20",
          phase_name: "Robot Fixed!",
          focus: "Celebration and wrap-up",
          phase_questions: [
            {
              template: "Robot is working again! 🤖✅ Let's do a final test! Say a sentence using 'is' - something about yourself?",
              hints: ["I", "am", "is", "tall", "short", "happy"]
            },
            {
              template: "Perfect! Now say a sentence using 'has' - what do you have?",
              hints: ["I", "have", "hair", "eyes", "glasses"]
            },
            {
              template: "Amazing! You're a robot repair expert! The robot is 100% fixed! 🎉 Thank you so much! Goodbye?",
              hints: ["Thank", "you", "Goodbye", "Bye"]
            }
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 12
    }
  ],
  
  // 🔥 ALIAS for compatibility with StoryMissionTab
  // Points to the same missions array above
  get story_missions() {
    return this.missions;
  },
  
  // === FREETALK KNOWLEDGE (FOR STORY MISSION & DEBATE TAB) ===
  freetalk_knowledge: {
    week_title: "The Mirror Game",
    week_number: 3,
    theme: "Physical Appearance and Descriptions",
    
    knowledge_base: [
      "People can be tall or short",
      "Hair can be long, short, curly, or straight",
      "Hair has different colors: black, brown, blonde, red",
      "Eyes can be brown, blue, green, or black",
      "Some people wear glasses to help them see",
      "Faces can be round, long, or oval",
      "Everyone looks different and special",
      "We use 'is' for qualities (tall, short) and 'has' for features (hair, eyes)",
      "A smile makes faces look happy and friendly",
      "Friends and family can look similar or different"
    ],
    
    example_opening_questions: [
      "What do you see in the mirror?",
      "What do you look like?",
      "Tell me about your appearance.",
      "What is your hair like?",
      "Are you tall or short?",
      "Do you have long hair or short hair?",
      "What color are your eyes?",
      "Tell me about your friend's appearance."
    ],

    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" }
    ]
  },

  // === CONVERSATION CARDS (Structured Dialogue Practice) ===
  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_face',
      emoji: '🪞',
      title: 'My Mirror',
      bridge: 'In the story, we looked in the mirror and described what we saw — hair, eyes, face! 📖',
      seed_question: 'What do you look like? Do you have big eyes or small eyes?',
      frames: [
        { template: 'My face has ___', follow_up_q: 'Does it have two eyes or one nose?', hints: ['two eyes', 'one nose', 'a big smile'] },
        { template: 'My eyes are ___', follow_up_q: 'Are your eyes big or small?', hints: ['big', 'small', 'beautiful'] },
        { template: 'My hair is ___', follow_up_q: 'Is your hair long or short?', hints: ['long', 'short', 'black'] },
        { template: 'My nose is ___', follow_up_q: 'Is your nose big or small?', hints: ['small', 'big', 'cute'] },
        { template: 'My mouth is ___', follow_up_q: 'Is your mouth big or small?', hints: ['small', 'big', 'always smiling'] },
        { template: 'My face is ___', follow_up_q: 'Is your face round or oval?', hints: ['round', 'small', 'cute'] },
        { template: 'My ears are ___', follow_up_q: 'Are your ears small or big?', hints: ['small', 'big', 'perfect'] },
        { template: 'My face has ___', follow_up_q: 'What does your face have? Two eyes and one nose?', hints: ['two eyes and a nose', 'long hair and big eyes', 'a cute nose and a smile'] },
      ],
      scaffold_frames: ['I have ___ hair', 'My eyes are ___', 'I am ___'],
      vocab_focus: ['hair', 'eyes', 'face', 'tall', 'short'],
      turns: 8
    },
    {
      id: 'spark_guess_my_friend',
      emoji: '🕵️',
      title: 'Guess My Friend',
      bridge: 'We played a describing game in the story — can Nova guess who you mean? 🔍',
      seed_question: 'Think of a friend. Do they have long hair or short hair?',
      frames: [
        { template: 'My friend has ___', follow_up_q: 'What does your friend look like? Does she have long hair or short hair?', hints: ['long hair', 'short hair', 'big eyes'] },
        { template: 'My friend is ___', follow_up_q: 'Is your friend tall or short?', hints: ['tall', 'short', 'very kind'] },
        { template: 'My friend has ___ eyes', follow_up_q: 'Are your friend\'s eyes big or small?', hints: ['big', 'small', 'beautiful'] },
        { template: 'My friend has ___ hair', follow_up_q: 'Is your friend\'s hair long or short?', hints: ['long', 'short', 'black'] },
        { template: 'My friend is ___', follow_up_q: 'Is your friend tall and kind or short and funny?', hints: ['tall and kind', 'short and funny', 'small and smart'] },
        { template: 'My friend has a ___ face', follow_up_q: 'Does your friend have a round face or a small face?', hints: ['round', 'small', 'lovely'] },
        { template: 'My friend has a ___ smile', follow_up_q: 'Does your friend have a big smile or a cute smile?', hints: ['big', 'cute', 'beautiful'] },
        { template: 'My best friend is ___', follow_up_q: 'Is your best friend kind or funny?', hints: ['kind', 'funny', 'my favourite person'] }
      ],
      scaffold_frames: ['They have ___ hair', 'They are ___', 'They have ___ eyes'],
      vocab_focus: ['long', 'short', 'black', 'brown', 'tall'],
      turns: 8
    }
  ],

  conversation_cards: [
    {
      id: "meet_classmate",
      title: "Meeting New Classmate",
      emoji: "👋",
      theme: "Introduction & Appearance Description",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Hi! I am Lily. What is your name? Say: My name is ___",
          student_template: "My name is {NAME}",
          accept: ["My name is", "I am", "I'm", "My name"]
        },
        {
          ai: "Nice to meet you! I am tall. Are you tall or short? Choose: I am tall or I am short",
          options: ["I am tall", "I am short"]
        },
        {
          ai: "Cool! My hair is long and curly. Is your hair long or short? Say: My hair is long! or My hair is short!",
          fill_blank: "My hair is ___",
          accept_words: ["long", "short"]
        },
        {
          ai: "Interesting! Does your hair have curls? Choose: Yes, my hair is curly or No, my hair is straight",
          options: ["Yes, my hair is curly", "No, my hair is straight"]
        },
        {
          ai: "I see! I wear glasses. Do you wear glasses? Say yes or no",
          fill_blank: "___",
          accept_words: ["yes", "no", "I wear", "I don't", "glasses"]
        },
        {
          ai: "You are very nice! What do you think about my appearance? Choose: You are beautiful or You are pretty or You look nice",
          options: ["You are beautiful", "You are pretty", "You look nice"]
        }
      ],
      completion_message: "Excellent! You practiced greetings and describing appearance! 🎉 You used Week 3 vocabulary!"
    },
    {
      id: "describe_friend",
      title: "Describing Your Friend",
      emoji: "🧑‍🤝‍🧑",
      theme: "Physical Appearance Descriptions",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Do you have a friend? Tell me! Say: Yes or I have a friend",
          accept: ["Yes", "I have", "My friend"]
        },
        {
          ai: "Great! Is your friend tall or short? Say: My friend is tall! or My friend is short!",
          fill_blank: "My friend is ___",
          accept_words: ["tall", "short"]
        },
        {
          ai: "I see! Does your friend have long hair or short hair? Choose: My friend has long hair or My friend has short hair",
          options: ["My friend has long hair", "My friend has short hair"]
        },
        {
          ai: "Cool! Is your friend's hair curly or straight? Say: My friend's hair is curly! or My friend's hair is straight!",
          fill_blank: "My friend's hair is ___",
          accept_words: ["curly", "straight"]
        },
        {
          ai: "Interesting! Does your friend wear glasses? Choose: Yes, my friend has glasses or No, my friend doesn't have glasses",
          options: ["Yes, my friend has glasses", "No, my friend doesn't have glasses"]
        },
        {
          ai: "What do you think about your friend? Say: beautiful, pretty, nice, or good",
          accept: ["beautiful", "pretty", "nice", "good"]
        }
      ],
      completion_message: "Amazing! You described your friend's appearance! 👏 You used: tall/short, long/short hair, curly/straight, and glasses!"
    },
    {
      id: "family_appearance",
      title: "Family Appearance",
      emoji: "👨‍👩‍👧‍👦",
      theme: "Describing Family Members",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Tell me about your family! Is your mother tall or short? Say: My mother is tall! or My mother is short!",
          fill_blank: "My mother is ___",
          accept_words: ["tall", "short"]
        },
        {
          ai: "I see! Does your mother have long hair? Choose: Yes, she has long hair or No, she has short hair",
          options: ["Yes, she has long hair", "No, she has short hair"]
        },
        {
          ai: "Cool! Now tell me about your father. Is he tall or short? Say: My father is tall! or My father is short!",
          fill_blank: "My father is ___",
          accept_words: ["tall", "short"]
        },
        {
          ai: "Does your father wear glasses? Choose: Yes, he has glasses or No, he doesn't have glasses",
          options: ["Yes, he has glasses", "No, he doesn't have glasses"]
        },
        {
          ai: "Do you look like your mother or your father? Say: I look like my mother! or I look like my father! or I look like my mom!",
          fill_blank: "I look like my ___",
          accept_words: ["mother", "father", "mom", "dad", "look like", "I look"]
        }
      ],
      completion_message: "Wonderful! You described your family's appearance! 🎉 Great use of 'is' and 'has'!"
    }
  ],

  // === V28 AI TUTOR GUIDELINES ===
  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Nice!", "Great!", "Wonderful!", "Good job!", "Perfect!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror student's subject (if they say 'she', use 'she' in recast)",
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
      "How...? (only for 'How tall', 'How old')"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "How many...?",
      "What does... mean?"
    ],
    example_exchanges: [
      {
        student: "She tall.",
        tutor_response: "Great! She is tall. Is she your friend?"
      },
      {
        student: "He have long hair.",
        tutor_response: "Wonderful! He has long hair. What color is his hair?"
      },
      {
        student: "My sister is have glasses.",
        tutor_response: "Nice try! My sister has glasses. Does she like her glasses?"
      }
    ]
  }
};

export default week3RealData;

