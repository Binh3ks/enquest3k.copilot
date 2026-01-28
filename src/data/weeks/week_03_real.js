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
  
  // === STORY MISSIONS (3 missions, ~15 turns each) ===
  missions: [
    {
      mission_id: 1,
      title: "Looking in the Mirror",
      title_en: "Looking in the Mirror",
      title_vi: "Nhìn Vào Gương",
      context_en: "Ms. Nova asks you to look in a mirror and describe what you see.",
      context_vi: "Cô Nova yêu cầu bạn nhìn vào gương và miêu tả những gì bạn thấy.",
      target_vocab: ["tall", "short", "hair", "eyes", "face", "smile"],
      learning_focus: "Use 'I am' for qualities and 'I have' for features"
    },
    {
      mission_id: 2,
      title: "Guess My Friend",
      title_en: "Guess My Friend",
      title_vi: "Đoán Bạn Tôi",
      theme: "Appearance Description Game",
      
      nova_greeting: "I'm thinking of a friend! Can you guess who? I'll give you clues!",
      default_hints: ["She", "is", "tall", "has", "hair"],
      
      mission_context: `This is Week 3 Mission 2 - Guess My Friend (Description Game).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- DON'T modify or shorten the questions
- COPY question text word-for-word from phase_questions
- Each student answer = Move to NEXT question in phase_questions array

QUESTION TRACKING:
- Question #1 (after opening): "Good! She has curly hair! ✨ What color is her hair? Is it black, brown, or blonde?"
- Question #2: "Nice! Her hair is black! 🖤 What about her eyes? Are they brown or blue?"
- Question #3: "Her eyes are brown! 👀 Does she wear glasses? Yes or no?"
- Question #4: "I see! 👓 Is she your friend or your sister?"
- Question #5: "Perfect! ❤️ Now new friend! He is short. He has straight hair. What color? Black or brown?"

STRICT RULES:
1. After student answers, use NEXT question from list above
2. NEVER ask same question twice
3. ALWAYS include choices: "Black or brown?", "Yes or no?", "Are they brown or blue?"
4. If you said "What color is her hair?" already → NEVER ask about hair color again

FORBIDDEN:
❌ "What color?" (missing choices!)
❌ Asking about hair color twice
❌ "What else can you say?"
❌ "Describe her!"

CORRECT FORMAT:
✅ "What color? Black or brown?" (WITH CHOICES)
✅ "What about her eyes? Are they brown or blue?" (WITH CHOICES)
✅ "Does she wear glasses? Yes or no?" (WITH CHOICES)

GRAMMAR: "is" for qualities (tall), "has" for features (hair, eyes)
VOCABULARY: tall, short, long, curly, straight, glasses, brown, black, blonde`,
      
      target_vocab: ["tall", "short", "hair", "eyes", "curly", "straight", "glasses"],
      grammar_pattern: "She is [adjective]. / She has [adjective] [noun].",

      story_character: {
        name: "Ms. Nova",
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

      opening_narrative: "🎯 Let's play a guessing game! I'm thinking of a mystery friend! First clue: She is tall. Second clue: She has long hair. Now you tell me - does she have curly hair or straight hair?",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "First Friend Clues",
          focus: "Practice 'is' vs 'has' with specific questions",
          phase_questions: [
            "(After student says curly/straight) Good! She has {student_answer} hair! ✨ Now, what color is her hair? Say: Her hair is black OR Her hair is brown OR Her hair is blonde",
            "(After student says color) Nice! Her hair is {student_answer}! 🖤 What about her eyes? Say: Her eyes are brown OR Her eyes are blue",
            "(After student says eye color) Her eyes are {student_answer}! 👀 Does she wear glasses? Say: Yes, she has glasses OR No, she doesn't have glasses",
            "(After glasses answer) I see! 👓 Now tell me - is she your friend or your sister? Say: She is my friend OR She is my sister",
            "(After relationship) Perfect! ❤️ New friend! He is short. He has straight hair. What color is his hair? Say: His hair is black OR His hair is brown"
          ]
        },
        {
          phase: "middle",
          turns: "6-11",
          phase_name: "More Mystery Friends",
          focus: "Continue guessing game with varied descriptions",
          phase_questions: [
            "(After hair color) His hair is {student_answer}! 🤎 What about his eyes? Say: His eyes are brown OR His eyes are blue",
            "(After eye color) His eyes are {student_answer}! 👀 Does he wear glasses? Say: Yes, he has glasses OR No, he doesn't have glasses",
            "(After glasses) Good! 👓 New friend! She is tall. She has long hair. Does she have curly hair or straight hair? Say: She has curly hair OR She has straight hair",
            "(After hair type) She has {student_answer} hair! ✨ What color is her hair? Say: Her hair is black OR Her hair is brown OR Her hair is blonde",
            "(After color) Her hair is {student_answer}! 🖤 What about her eyes? Say: Her eyes are brown OR Her eyes are blue",
            "(After eyes) Her eyes are {student_answer}! 👀 Does she wear glasses? Say: Yes, she has glasses OR No, she doesn't have glasses"
          ]
        },
        {
          phase: "more_practice",
          turns: "12-16",
          phase_name: "Quick Descriptions",
          focus: "Faster paced friend descriptions",
          phase_questions: [
            "(After glasses) Perfect! 👓 Next friend! He is tall. Does he have long hair or short hair? Say: He has long hair OR He has short hair",
            "(After hair length) He has {student_answer} hair! ✂️ Is he your friend or your brother? Say: He is my friend OR He is my brother",
            "(After relationship) Nice! ❤️ One more! She is short. She has curly hair. What color is her hair? Say: Her hair is black OR Her hair is brown OR Her hair is blonde",
            "(After color) Her hair is {student_answer}! 🤎 Does she wear glasses? Say: Yes, she has glasses OR No, she doesn't have glasses",
            "(After glasses) Great job! 🎉 Now it's YOUR turn! Think of a friend. Is your friend tall or short? Say: My friend is tall OR My friend is short"
          ]
        },
        {
          phase: "closing",
          turns: "17-20",
          phase_name: "You Describe!",
          focus: "Student creates their own descriptions",
          phase_questions: [
            "(After tall/short) Good! Your friend is {student_answer}! Does your friend have long hair or short hair? Say: My friend has long hair OR My friend has short hair",
            "(After hair length) Your friend has {student_answer} hair! ✂️ What color is your friend's hair? Say: My friend has black hair OR My friend has brown hair OR My friend has blonde hair",
            "(After color) Perfect! Your friend has {student_answer} hair! 🖤 What about your friend's eyes? Say: My friend has brown eyes OR My friend has blue eyes",
            "(After eyes) Wonderful! You're so good at this! 🌟 Thanks for playing with me, Rainbow! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20
    },
    {
      mission_id: 3,
      title: "Broken Robot",
      title_en: "Broken Robot",
      title_vi: "Robot Hỏng",
      theme: "is vs has Grammar Game",
      
      nova_greeting: "Oh no! My robot is broken! It says wrong sentences! Can you fix them?",
      default_hints: ["She", "is", "has", "tall", "long"],
      
      mission_context: `This is Week 3 Mission 3 - Broken Robot (Grammar Correction Game).

STRICT GAME RULES:
1. Robot says WRONG sentence mixing "is" and "has"
2. Student fixes it
3. Ms. Nova confirms: "Yes! Fixed! She HAS long hair! ✅"
4. IMMEDIATELY ask next question with NEW broken sentence

RESPONSE FORMAT - MUST FOLLOW:
"Great! You fixed it! She HAS long hair! ✅ Next robot error: '🤖 He has tall.' Can you fix this one?"
"Perfect! He IS tall! ✅ Robot says: '🤖 I has brown eyes.' Fix it!"
"Yes! Fixed! ✅ New error: '🤖 They are glasses.' Is it right or wrong?"

QUESTION PATTERNS (ALWAYS USE):
✅ "🤖 Robot says: '[WRONG SENTENCE].' Can you fix it?"
✅ "Next error: '🤖 [WRONG].' What's the correct sentence?"
✅ "🤖 '[WRONG SENTENCE].' Is this right or wrong?"
✅ "Fix this: '🤖 [WRONG].' Should it be 'is' or 'has'?"

FORBIDDEN:
❌ Do NOT just celebrate without next question
❌ Do NOT ask "What do you think?"
❌ Do NOT explain grammar rules
❌ ALWAYS give next broken sentence immediately

BROKEN SENTENCES EXAMPLES:
❌ "She is long hair" → ✅ "She has long hair"
❌ "He has tall" → ✅ "He is tall"  
❌ "I has brown eyes" → ✅ "I have brown eyes"
❌ "They are glasses" → ✅ "They have glasses"
❌ "She have curly hair" → ✅ "She has curly hair"

GRAMMAR ENFORCEMENT: Always use "is/am/are" for adjectives and "has/have" for nouns`,
      
      target_vocab: ["tall", "short", "long", "curly", "straight", "glasses", "smile"],
      grammar_pattern: "is [adjective] vs has [noun]",

      story_character: {
        name: "Ms. Nova",
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

      opening_narrative: "🤖 Robot says: 'She is long hair.' ❌ Broken! Can you fix it?",

      story_arc: [
        {
          phase: "simple_fixes",
          turns: "1-6",
          phase_name: "Easy Robot Errors",
          focus: "Fix simple is/has mistakes",
          phase_questions: [
            "(After student fixes first error) Yes! SHE HAS long hair! ✅ Next error: '🤖 He has tall.' What's the correct sentence?",
            "(After fix) Perfect! HE IS tall! ✅ Robot says: '🤖 I has brown eyes.' Fix it!",
            "(After fix) Great fix! I HAVE brown eyes! ✅ New broken sentence: '🤖 They are glasses.' Is this right or wrong?",
            "(After fix) Correct! THEY HAVE glasses! ✅ Fix this: '🤖 She have curly hair.' Should it be 'have' or 'has'?",
            "(After fix) Yes! SHE HAS curly hair! ✅ Next: '🤖 You is my friend.' What should it be?",
            "(After fix) Correct! YOU ARE my friend! ✅ Robot error: '🤖 We has a cat.' Can you fix it?"
          ]
        },
        {
          phase: "harder_fixes",
          turns: "7-13",
          phase_name: "Trickier Errors",
          focus: "More complex sentence errors",
          phase_questions: [
            "(After fix) Perfect! WE HAVE a cat! ✅ Next: '🤖 She are beautiful.' Fix this one!",
            "(After fix) Yes! SHE IS beautiful! ✅ Error: '🤖 He have short hair.' What's wrong?",
            "(After fix) Great! HE HAS short hair! ✅ Fix: '🤖 I are happy.' Should it be 'am' or 'are'?",
            "(After fix) Yes! I AM happy! ✅ New error: '🤖 They is tall.' What's the correct sentence?",
            "(After fix) Perfect! THEY ARE tall! ✅ Error: '🤖 My mom has beautiful.' Can you fix this?",
            "(After fix) Excellent! MY MOM IS beautiful! ✅ Robot says: '🤖 You is smart.' Fix it!",
            "(After fix) Great! YOU ARE smart! ✅ Final tricky error: '🤖 She have a big smile.' What's the correct sentence?"
          ]
        },
        {
          phase: "final_check",
          turns: "14-17",
          phase_name: "Last Tests",
          focus: "Final robot repairs",
          phase_questions: [
            "(After fix) Perfect! SHE HAS a big smile! ✅ Robot says: '🤖 He are kind.' Fix it!",
            "(After fix) Yes! HE IS kind! ✅ Error: '🤖 I has glasses.' What should it be?",
            "(After fix) Great! I HAVE glasses! ✅ Last one: '🤖 They has long hair.' Can you fix this?",
            "(After fix) Excellent! THEY HAVE long hair! ✅ Amazing work!"
          ]
        },
        {
          phase: "victory",
          turns: "18-20",
          phase_name: "Robot Fixed!",
          focus: "Celebration and wrap-up",
          phase_questions: [
            "(After last fix) Robot is working again! 🤖✅ Let's do a final test! Say a sentence using 'is' - something about yourself!",
            "(After student says 'is' sentence) Perfect! Now say a sentence using 'has' - what do you have?",
            "(After student says 'has' sentence) Amazing! You're a robot repair expert! The robot is 100% fixed! 🎉 Thank you so much! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20
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
    ]
  },
  
  // === ROLEPLAY SCENARIOS ===
  roleplay_scenarios: [
    {
      id: "rp_mirror_friend",
      title: "Mirror Friend 🪞",
      title_en: "Mirror Friend",
      title_vi: "Bạn trong Gương",
      emoji: "🪞",
      description: "Meet your mirror friend and describe each other!",
      
      ai_role: "Mirror Friend (Ms. Nova)",
      user_role: "Self",
      context: "You look in a magic mirror and Ms. Nova appears! She wants to know what you look like.",
      
      vocab_focus: ["tall", "short", "hair", "eyes", "long", "curly", "straight", "glasses", "smile"],
      
      opening_line: "Hello! I'm your mirror friend! I can't see you clearly. Tell me, are you tall or short?",
      
      guide_rules: "Be curious about appearance. Ask about hair (long/short/curly/straight), eyes (color), and accessories (glasses). React with excitement. Use 'You are...' and 'You have...' patterns. Always end with a question.",
      
      backup_questions: [
        "What does your hair look like? Is it long or short?",
        "What color are your eyes? Brown, blue, or black?",
        "Do you wear glasses?",
        "Do you have curly hair or straight hair?",
        "Do you have a big smile?"
      ]
    },
    {
      id: "rp_family_album",
      title: "Family Album 📸",
      title_en: "Family Album",
      title_vi: "Album Gia Đình",
      emoji: "📸",
      description: "Show Ms. Nova your family photos and describe them!",
      
      ai_role: "Curious Friend (Ms. Nova)",
      user_role: "Photo Owner",
      context: "Ms. Nova wants to see your family photos and learn about each person's appearance.",
      
      vocab_focus: ["tall", "short", "long", "hair", "eyes", "curly", "straight", "glasses", "smile", "mother", "father", "brother", "sister"],
      
      opening_line: "Wow! Family photos! Who is this person? Is she your mother or your sister?",
      
      guide_rules: "Be interested in family members. Ask about each person's appearance using 'is' and 'has'. Compare family members. React warmly. Always end with a question.",
      
      backup_questions: [
        "What does your mother look like? Is she tall?",
        "Does your father have glasses?",
        "Who has long hair in your family?",
        "Is your brother tall or short?",
        "Who has the biggest smile?"
      ]
    },
    {
      id: "rp_fashion_show",
      title: "Fashion Show 👗",
      title_en: "Fashion Show",
      title_vi: "Trình diễn Thời trang",
      emoji: "👗",
      description: "Describe models in a fun fashion show!",
      
      ai_role: "Fashion Show Host (Ms. Nova)",
      user_role: "Audience / Commentator",
      context: "Ms. Nova is hosting a fashion show with different models. Help describe each model!",
      
      vocab_focus: ["tall", "short", "long", "hair", "curly", "straight", "glasses", "beautiful", "pretty"],
      
      opening_line: "Welcome to the Fashion Show! Here comes Model 1! She is tall. What else can you say about her?",
      
      guide_rules: "Present different models one by one. Ask student to describe using 'is' and 'has'. Give positive reactions. Mix appearances (tall/short, long/curly hair, glasses/no glasses). Always end with a question.",
      
      backup_questions: [
        "Look at her hair! Is it long or short?",
        "Does she have glasses?",
        "Is she tall or short?",
        "What color is her hair? Black, brown, or blonde?",
        "Next model! What do you see?"
      ]
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

