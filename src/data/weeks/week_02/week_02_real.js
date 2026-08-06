/**
 * ✅ WEEK 2 REAL SYLLABUS DATA
 * 
 * Source: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
 * Phase 1 - Block A: Week 2
 * 
 * Generated per: WEEK_PRODUCTION_PROMPT_V2.1.md (Jan 27, 2026)
 * - Cloned from Week 5 structure (proven template)
 * - Story Missions với story_arc (4 phases each)
 * - Natural question phrasing với {student_answer} placeholders
 * - Full scaffolding patterns
 */

const week2RealData = {
  // === METADATA ===
  week_id: 2,
  phase: 1,
  block: "A",
  unit: 1,
  week_number: 2,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 2: My Family Squad",
  week_title_en: "My Family Squad (Relationships)",
  week_title_vi: "Biệt đội Gia đình (Mối quan hệ)",
  
  topic: "Family members and relationships",
  topic_vi: "Các thành viên gia đình và mối quan hệ",

  chunk_focus: [
    "My name",
    "my family",
    "are like a team",
    "my mother",
    "our family",
    "every day",
    "my father",
    "strong and kind",
    "works hard",
    "big brother",
    "helps me with",
    "little sister",
    "funny and sweet",
    "each other",
    "Our home",
    "in the world",
    "help each other",
    "take care",
    "Brothers and sisters",
    "play together",
    "full of love",
    "work together",
    "family squad",
    "family is like",
    "their home"
  ],
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe family members using possessive adjectives (my, your) and simple present tense.",
  learning_outcome_vi: "Mô tả các thành viên gia đình bằng cách sử dụng tính từ sở hữu (my, your) và thì hiện tại đơn.",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Possessive Adjectives (My, Your)",
  grammar_pattern: "My [family member] is [adjective].",
  grammar_examples: [
    "My mother is kind.",
    "My father is strong.",
    "My brother is funny.",
    "My sister is smart.",
    "My family is happy."
  ],
  
  // === TARGET VOCABULARY (TIER 1 - A0++) ===
  target_vocab: [
    {
      word: "mother",
      pronunciation: "/ˈmʌðər/",
      definition_vi: "Mẹ",
      definition_en: "A female parent.",
      example: "My mother is kind.",
      syllabus_context: "Family members"
    },
    {
      word: "father",
      pronunciation: "/ˈfɑːðər/",
      definition_vi: "Bố",
      definition_en: "A male parent.",
      example: "My father is strong.",
      syllabus_context: "Family members"
    },
    {
      word: "brother",
      pronunciation: "/ˈbrʌðər/",
      definition_vi: "Anh/Em trai",
      definition_en: "A male sibling.",
      example: "My brother is funny.",
      syllabus_context: "Family members"
    },
    {
      word: "sister",
      pronunciation: "/ˈsɪstər/",
      definition_vi: "Chị/Em gái",
      definition_en: "A female sibling.",
      example: "My sister is smart.",
      syllabus_context: "Family members"
    },
    {
      word: "family",
      pronunciation: "/ˈfæməli/",
      definition_vi: "Gia đình",
      definition_en: "People related by blood who live together.",
      example: "My family is happy.",
      syllabus_context: "Family concept"
    },
    {
      word: "home",
      pronunciation: "/hoʊm/",
      definition_vi: "Nhà",
      definition_en: "The place where you live.",
      example: "My home is nice.",
      syllabus_context: "Family setting"
    },
    {
      word: "kind",
      pronunciation: "/kaɪnd/",
      definition_vi: "Tốt bụng",
      definition_en: "Friendly and caring.",
      example: "My mother is kind.",
      syllabus_context: "Personality traits"
    },
    {
      word: "happy",
      pronunciation: "/ˈhæpi/",
      definition_vi: "Hạnh phúc, vui vẻ",
      definition_en: "Feeling joy and contentment.",
      example: "My family is happy.",
      syllabus_context: "Emotions"
    },
    {
      word: "love",
      pronunciation: "/lʌv/",
      definition_vi: "Yêu",
      definition_en: "Strong affection for someone.",
      example: "I love my family.",
      syllabus_context: "Emotions"
    },
    {
      word: "together",
      pronunciation: "/təˈɡeðər/",
      definition_vi: "Cùng nhau",
      definition_en: "With each other, as a group.",
      example: "We play together.",
      syllabus_context: "Family activities"
    }
  ],
  

  global_vocab: ["mother", "father", "brother", "sister", "family", "home", "kind", "happy", "love", "together"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Friendly English teacher, warm and human-like",
    tone: "Warm, caring, genuinely interested in students' families",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Nova! I want to learn about YOUR family! They sound amazing! What do I call you? Say: My name is your name.",
      mission_2: "Wow! I have some family photos here! I see someone who is very kind. Tell me about your family! Who is kind in your family?",
      mission_3: "Oh no! I keep making mistakes about families! Can you help me? I say: Your mother is kind. But wait - who is kind? Help me get it right!"
    },
    conversation_style: [
      "Natural and flowing - like talking with a friend",
      "One clear question per turn",
      "Build on previous answers - show active listening",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-15 turns per mission",
      "ONLY use present simple with 'My [family member] is [adjective]' - Week 2 grammar scope"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct form naturally in your response",
    recast_example: {
      student: "My mother kind.",
      nova_recast: "Yes! Your mother IS kind! What else is your mother like?"
    },
    vocabulary_scaffolding: [
      "Mission 1: mother, father, brother, sister, family, home - introduce family members",
      "Mission 2: kind, happy, love, together - adjectives describing family",
      "Mission 3: combine all - full 'My [family member] is [adjective]' sentences"
    ],
    questioning_skill: [
      "Who is in your family?",
      "What is your mother like?",
      "Is your father kind or funny?",
      "Do you have a brother or sister?",
      "What is your family like?"
    ],
    must_use_vocab: ["mother", "father", "brother", "sister", "family", "kind", "happy", "love"],
    must_avoid: [
      "Emojis or special characters",
      "Vietnamese translation",
      "Explicit grammar rules",
      "Corrections without recast",
      "Multiple questions in one turn",
      "Past tense or future tense (Week 2 scope is present simple only)"
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
      "Is...?",
      "Do you...?",
      "Who is...?",
      "Can you...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      {
        student: "My mother kind.",
        tutor_response: "Nice! My mother IS kind. What else is your mother like?"
      },
      {
        student: "Father is have brother.",
        tutor_response: "Great! My father HAS a brother. Does your father have a sister too?"
      },
      {
        student: "My sister happy.",
        tutor_response: "Wonderful! My sister IS happy. Is she funny too?"
      }
    ]
  },
  // === 3 STORY MISSIONS ===
  missions: [
    {
      mission_id: 1,
      title: "Meet My Family",
      title_en: "Meet My Family",
      title_vi: "Gặp Gỡ Gia Đình Tôi",
      theme: "Introducing Family Members",
      
      nova_greeting: "Hi! I want to learn about your family! Tell me about your family!",
      default_hints: ["I", "live", "with", "my", "mother", "father"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 2 Mission 1 - Meet My Family. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova wants to learn about the student's family. She is curious and warm, asks about each family member one at a time. OPENING: Ask who the student lives with, then ask about each family member's characteristics. LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "My mother is kind" / "My father is tall" - model "My [member] is [adjective]" every turn. Give scaffolding: "Say: My mother is kind" or "Say: I have a sister." VOCABULARY: mother, father, sister, brother, grandmother, grandfather, kind, tall, young, old, friendly. STRICT FOCUS: FAMILY MEMBERS AND THEIR TRAITS ONLY. Ask about one person at a time. RECAST ERRORS: student says "Mother is kind" → "Your MOTHER IS kind! Say: My mother is kind!" SAMPLE TURN: "Who is in your family? Say: I have a mother and a father." → "mother and father" → "Nice! Is your mother kind or strict? Say: My mother is kind or My mother is nice!" GAME FLOW: (1) Ask who is in family → (2) Ask mother's trait → (3) Ask father's trait → (4) Ask about sibling(s) → (5) More members if time. One person per turn, model 'My [member] is [adjective]' every step. FORBIDDEN: No school topics, no location, no preferences about activities. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. covering at least 3 family members. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["mother", "father", "brother", "sister", "family", "home", "kind", "happy"],
      grammar_pattern: "My [family member] is [adjective].",

      story_character: {
        name: "Nova",
        personality: "warm, curious about families, encouraging",
        backstory: "I love learning about different families! Every family is special and unique!",
        speaking_style: "asks about family members one by one, celebrates each answer, uses 'my' and 'your' correctly",
        facts: {
          loves_families: true,
          thinks_families_are_teams: true,
          every_member_important: true,
          families_help_each_other: true,
          loves_hearing_descriptions: true,
          favorite_topic: "family love",
          believes_every_family_special: true
        },
        role: "Family conversation guide"
      },

      opening_narrative: "🏠 Hi! I'm Nova! I want to learn about YOUR family! First, who do you live with? Say: I live with my mother or I live with my father",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "Family Members Introduction",
          focus: "Name family members and start describing",
          goal: "Learn about student's family members and their characteristics",
          phase_questions: [
            "(After student says who they live with) Great! Tell me about your mother! What is your mother like? Say: My mother is kind or My mother is nice",
            "(After describing mother) Wonderful! Your mother is {student_answer}! ❤️ Now tell me about your father! What is your father like? Say: My father is strong or My father is kind",
            "(After describing father) Excellent! Your father is {student_answer}! 💪 Do you have brothers or sisters? Say: Yes, I have a brother or Yes, I have a sister",
            "(After sibling answer) I see! Tell me about your brother or sister! What is your brother like? What is your sister like? Say: My brother is funny or My sister is smart",
            "(After sibling description) Nice! {student_answer}! ✨ Now tell me - is your family big or small? Say: My family is big or My family is small"
          ]
        },
        {
          phase: "family_details",
          turns: "6-11",
          phase_name: "Family Characteristics",
          focus: "Describe family personality and relationships",
          goal: "Explore family activities, roles, and daily life together",
          phase_questions: [
            "(After family size) Good! Your family is {student_answer}! 👨‍👩‍👧‍👦 What does your mother do at home? Say: My mother cooks or My mother cleans",
            "(After mother's activities) Great! She {student_answer}! 🍳 What about your father? What does your father do? Say: My father works or My father plays with me",
            "(After father's activities) Excellent! He {student_answer}! 💼 Do you help your family? Say: Yes, I help my mother or Yes, I help my father",
            "(After helping answer) Wonderful! You {student_answer}! 👏 What do you do together with your family? Say: We eat together or We play together",
            "(After family activities) Nice! You {student_answer}! 🎉 Is your home big or small? Say: My home is big or My home is small",
            "(After home size) Good! Your home is {student_answer}! 🏠 Is your family happy? Say: Yes, my family is happy or Yes, my family is very happy"
          ]
        },
        {
          phase: "family_love",
          turns: "12-17",
          phase_name: "Family Love and Togetherness",
          focus: "Express feelings about family",
          goal: "Help student express love and appreciation for family members",
          phase_questions: [
            "(After happiness answer) Wonderful! {student_answer}! 😊 Who is your favorite in your family? Say: My mother is my favorite or My father is my favorite",
            "(After favorite person) I see! {student_answer}! ❤️ Why do you love your mother? Say: I love my mother because she is kind or Because she helps me",
            "(After mother love reason) Beautiful! You love her because {student_answer}! 💝 Why do you love your father? Say: I love my father because he is strong or Because he plays with me",
            "(After father love reason) Perfect! You love him because {student_answer}! 💙 Do your brothers or sisters play with you? Say: Yes, they play with me or Yes, we play together",
            "(After sibling play) Great! {student_answer}! 🎮 What makes your family happy? Say: We are happy when we eat together or When we play together",
            "(After what makes family happy) Beautiful! Your family is happy when {student_answer}! 🌟 Do you love your family? Say: Yes, I love my family very much or Yes, I love them"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Celebration and Gratitude",
          focus: "Wrap up with appreciation for family",
          goal: "Celebrate family love and say goodbye with gratitude",
          phase_questions: [
            "(After expressing love) Wonderful! You said: {student_answer}! ❤️❤️❤️ Tell me one more thing - what is special about your family? Say: My family is special because we love each other or Because we are happy",
            "(After what's special) Perfect! Your family is special because {student_answer}! ✨ Last question - can you say thank you to your family? Say: Thank you mother or Thank you father",
            "(After thank you) Beautiful! 🎉 You have a wonderful family! Thank you for telling me about them! Your family is lucky to have you! Great job! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 8,
      maximum_turns: 12,

      // 🔥 OBJECTIVES ARRAY (Winner feature from Week 4-7)
    },
    {
      mission_id: 2,
      title: "Family Photos",
      title_en: "Family Photos",
      title_vi: "Ảnh Gia Đình",
      theme: "Family Description Game",
      
      nova_greeting: "📸 Wow! I have your family photos! Let's play a guessing game!",
      default_hints: ["My", "mother", "is", "kind", "father"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 2 Mission 2 - Family Photos. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova has family photos and asks the student to describe people in each photo. GAME MECHANIC: Nova shows a "photo" (describes a family member) → student guesses who it is using "My ___ is ___". LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "My [family member] is [adjective]" and "He/She is [adjective]" - practice both forms. Give scaffolding: "Say: My mother is kind" or "Say: He is tall." VOCABULARY: mother, father, sister, brother, grandmother, grandfather, kind, tall, young, old, friendly, funny. STRICT FOCUS: DESCRIBE FAMILY MEMBERS - always link adjective to specific person. RECAST ERRORS: student says "tall" → "Your father IS tall! Say: My father is tall!" SAMPLE TURN: "Look at this photo! This person is kind and helpful. Who is this? Say: My mother is kind." → "mother" → "Yes! My mother IS kind! Is your father tall or short?" FORBIDDEN: No school topics, no colors of clothes, no activities. covering at least 4 different family members. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["mother", "father", "brother", "sister", "kind", "happy", "love", "together"],
      grammar_pattern: "My [family member] is [adjective].",


      story_character: {
        name: "Nova",
        personality: "curious, playful, loves guessing games about families",
        backstory: "I have your family photo album! Let's play a guessing game with the photos!",
        speaking_style: "gives clues, asks who/what, celebrates correct guesses",
        facts: [
          "I love looking at family photos!",
          "Each family member is special!",
          "I'll give you clues and you guess!",
          "We use 'My mother is...' and 'My father is...' patterns!"
        ],
        role: "Photo game host giving family member clues"
      },

      opening_narrative: "📸 Wow! I have your family photos! Look at this one! I see someone who is kind. Who is kind in your family? Say: My mother is kind OR My father is kind",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "First Photo Clues",
          focus: "Guess family members from descriptions",
          phase_questions: [
            "(After student says mother) Yes! Your mother! ❤️ What is your mother like? Say: My mother is kind OR My mother is nice OR My mother is beautiful",
            "(After describing mother) Beautiful! Your mother is {student_answer}! 💖 Next photo! I see someone who is strong. Who is strong in your family? Say: My father is strong OR My brother is strong",
            "(After student says father) Correct! Your father! 💪 What is your father like? Say: My father is strong OR My father is kind OR My father is hardworking",
            "(After describing father) Great! Your father is {student_answer}! 👔 Look! This photo shows everyone together! Are they happy together? Say: Yes, my family is happy together OR My family is very happy",
            "(After family happy) Wonderful! {student_answer}! 👨‍👩‍👧‍👦 Do you love your family? Say: Yes, I love my family OR Yes, I love them very much"
          ]
        },
        {
          phase: "middle",
          turns: "6-11",
          phase_name: "More Family Members",
          focus: "Continue guessing siblings and family",
          phase_questions: [
            "(After happy family) Wonderful! {student_answer}! 😊 New photo! This person plays with you at home. Do you have a brother or a sister? Say: I have a brother OR I have a sister OR I have both",
            "(After sibling) Nice! {student_answer}! 👫 What is your brother/sister like? Say: My brother is funny OR My sister is smart OR My brother is kind",
            "(After describing sibling) {student_answer}! Great! 🎮 Look at this photo! Your family is together. Where is your family? Say: At home OR In the park OR At a restaurant",
            "(After location) You are {student_answer}! 🏠 What does your family do together? Say: We play OR We eat OR We watch TV",
            "(After activity) You {student_answer} together! 📺 Does your family love each other? Say: Yes, we love each other OR Yes, my family loves each other",
            "(After love) Beautiful! {student_answer}! ❤️ Who cooks in your family? Say: My mother cooks OR My father cooks OR My mother and father cook"
          ]
        },
        {
          phase: "your_turn",
          turns: "12-16",
          phase_name: "You Describe Photos",
          focus: "Student describes family members",
          phase_questions: [
            "(After cooking) {student_answer}! 🍳 Now YOUR turn! Tell me about your mother! What is she like? Say: My mother is kind OR My mother is beautiful OR My mother is nice",
            "(After mother description) Your mother is {student_answer}! Wonderful! ❤️ Now tell me about your father! What is he like? Say: My father is strong OR My father is kind OR My father is hardworking",
            "(After father description) Your father is {student_answer}! Great! 💪 Do you help your mother and father at home? Say: Yes, I help them OR Yes, I help my mother OR Yes, I help my father",
            "(After helping) Good job! {student_answer}! 🙌 What do you say to your family? Say: I love you OR Thank you OR I love my family",
            "(After what you say) Perfect! {student_answer}! 💕 Last photo question! What makes your family happy? Say: When we are together OR When we play together OR When we love each other"
          ]
        },
        {
          phase: "closing",
          turns: "17-20",
          phase_name: "Celebration",
          focus: "Celebrate family love",
          phase_questions: [
            "(After family happy) Beautiful! {student_answer}! 😊 Your family photos are wonderful! Say: Thank you! OR My family is great!",
            "(After thank you) {student_answer}! ❤️ One more time - who do you love most? Say: I love my mother OR I love my father OR I love my family",
            "(After love) You {student_answer}! 💖 And they love you too! Say: Yes, they love me!",
            "(After they love) Perfect! 👨‍👩‍👧‍👦 Your family is amazing! Thank you for sharing your photos with me! Great job! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12
    },
    {
      mission_id: 3,
      title: "Mixed Up Family",
      title_en: "Mixed Up Family",
      title_vi: "Gia Đình Lẫn Lộn",
      theme: "My vs Your Grammar Game",
      
      nova_greeting: "🤔 Oh no! I keep saying the wrong words! Can you fix my mistakes?",
      default_hints: ["My", "mother", "is", "kind"],
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 2 Mission 3 - Mixed Up Family. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Nova makes mistakes about the student's family. Student must correct her kindly. GAME MECHANIC: Nova says a WRONG sentence about family → student corrects it. WRONG examples: "Your father is a woman" → correction: "My father is a man." "You have a old sister" → "My sister is young." LANGUAGE RULES: Use VERY SIMPLE words. Max 8 words per sentence. GRAMMAR FOCUS: "My [family member] is [adjective]" - correct possessive + verb form every time. Give scaffolding after each mistake: "Say: My father is a man!" or "Say: My sister is young!" VOCABULARY: mother, father, sister, brother, grandmother, grandfather, kind, tall, young, old, friendly, man, woman. STRICT FOCUS: CORRECT THE FAMILY DESCRIPTION. Every turn = Nova says wrong → student fixes. RECAST: Always confirm the correction - "YES! Your father IS a man! Well done!" FORBIDDEN: No other topics. Keep the correction game going every turn. with a mix of gender and adjective correction errors. Do NOT ask another question on the last turn.`,
      
      target_vocab: ["mother", "father", "brother", "sister", "family", "kind", "happy", "love"],
      grammar_pattern: "My [family member] is... / Your [family member] is...",


      story_character: {
        name: "Nova",
        personality: "silly, makes mistakes, needs help fixing sentences",
        backstory: "Oh no! I keep mixing up MY and YOUR! Please help me fix my mistakes!",
        speaking_style: "makes deliberate errors with 'my' vs 'your', thanks student for corrections, immediately gives next error",
        facts: [
          "I keep saying the wrong words!",
          "I mix up MY and YOUR!",
          "You're so smart at fixing my mistakes!",
          "Let's fix all the sentences together!"
        ],
        role: "Grammar mistake maker who needs corrections"
      },

      opening_narrative: "🤔 Oh no! I keep making mistakes! Listen: 'Your mother is kind' - but I'm talking about My mother! Can you fix this? Say: My mother is kind",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "First Mistakes",
          focus: "Learn to fix My vs Your",
          phase_questions: [
            {
              template: "Yes! My mother is kind! ✅ Next error: 'Your father is strong' - but My father! Say: My father is strong?",
              hints: ["My", "father", "is", "strong"]
            },
            {
              template: "Perfect! My father is strong! ✅ Next error: 'Your brother is funny' - but My brother! Say: My brother is funny?",
              hints: ["My", "brother", "is", "funny"]
            },
            {
              template: "Great! My brother is funny! ✅ Next error: 'Your sister is smart' - but My sister! Say: My sister is smart?",
              hints: ["My", "sister", "is", "smart"]
            },
            {
              template: "Excellent! My sister is smart! ✅ Next error: 'Your family is happy' - but My family! Say: My family is happy?",
              hints: ["My", "family", "is", "happy"]
            },
            {
              template: "Yes! My family is happy! ✅ Next error: 'Your mother cooks' - but My mother! Say: My mother cooks?",
              hints: ["My", "mother", "cooks"]
            }
          ]
        },
        {
          phase: "middle",
          turns: "6-11",
          phase_name: "More Mixed Up Sentences",
          focus: "Continue fixing grammar",
          phase_questions: [
            {
              template: "Perfect! My mother cooks! ✅ Next error: 'Your father works' - but My father! Say: My father works?",
              hints: ["My", "father", "works"]
            },
            {
              template: "Great! My father works! ✅ Next error: 'Your family loves you' - but My family! Say: My family loves me?",
              hints: ["My", "family", "loves", "me"]
            },
            {
              template: "Excellent! My family loves me! ✅ Next error: 'Your brother is kind' - but My brother! Say: My brother is kind?",
              hints: ["My", "brother", "is", "kind"]
            },
            {
              template: "Yes! My brother is kind! ✅ Next error: 'Your sister is beautiful' - but My sister! Say: My sister is beautiful?",
              hints: ["My", "sister", "is", "beautiful"]
            },
            {
              template: "Perfect! My sister is beautiful! ✅ Next error: 'Your mother is nice' - but My mother! Say: My mother is nice?",
              hints: ["My", "mother", "is", "nice"]
            },
            {
              template: "Great! My mother is nice! ✅ Next error: 'Your father is hardworking' - but My father! Say: My father is hardworking?",
              hints: ["My", "father", "is", "hardworking"]
            }
          ]
        },
        {
          phase: "tricky",
          turns: "12-16",
          phase_name: "Tricky Ones",
          focus: "Harder mixed-up sentences",
          phase_questions: [
            {
              template: "Excellent! My father is hardworking! ✅ Next error: 'Your family is together' - but My family! Say: My family is together?",
              hints: ["My", "family", "is", "together"]
            },
            {
              template: "Yes! My family is together! ✅ Next error: 'Your brother helps you' - but My brother! Say: My brother helps me?",
              hints: ["My", "brother", "helps", "me"]
            },
            {
              template: "Perfect! My brother helps me! ✅ Next error: 'Your sister plays' - but My sister! Say: My sister plays?",
              hints: ["My", "sister", "plays"]
            },
            {
              template: "Great! My sister plays! ✅ Next error: 'Your family is at home' - but My family! Say: My family is at home?",
              hints: ["My", "family", "is", "at", "home"]
            },
            {
              template: "Excellent! My family is at home! ✅ Last error: 'Your mother and father love you' - but My parents! Say: My mother and father love me?",
              hints: ["My", "mother", "and", "father", "love", "me"]
            }
          ]
        },
        {
          phase: "victory",
          turns: "17-20",
          phase_name: "All Fixed!",
          focus: "Celebration and final check",
          phase_questions: [
            {
              template: "(After fix) Perfect! YOUR mother and father love you! ✅ Amazing! You fixed all my mistakes! Now YOU make a sentence using MY! Say: My mother is... OR My father is...",
              hints: ["My", "mother", "father", "is", "are"]
            },
            {
              template: "(After student sentence) Great sentence! {student_answer}! ✅ Now make a sentence using YOUR! Say: Your mother is... OR Your father is...",
              hints: ["Your", "mother", "father", "is", "are"]
            },
            {
              template: "(After your sentence) Perfect! {student_answer}! ✅ You're a grammar expert! You know MY vs YOUR perfectly! 🎉 Thank you for fixing all my mistakes! Great job! Goodbye!",
              hints: []
            },
            {
              template: "(Backup celebration) You're amazing! All mistakes fixed! Goodbye! 🌟",
              hints: []
            }
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 12
    }
  ],
  
  // 🔥 ALIAS for compatibility with StoryMissionTab
  get story_missions() {
    return this.missions;
  },

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "My Family Squad",
    week_number: 2,
    theme: "Family Members and Relationships",
    
    knowledge_base: [
      "Family members: mother, father, brother, sister, family",
      "Adjectives: kind, happy, strong, smart, funny, beautiful, nice",
      "Grammar: Possessive Adjectives (My mother is kind, Your father is strong)",
      "Mothers are kind and loving - they cook, clean, and help us",
      "Fathers are strong and hardworking - they work and protect us",
      "Brothers and sisters play with us - we are friends",
      "Family members live together at home",
      "We love our family - family is important",
      "We use 'My' to talk about our family (My mother, My father)",
      "We describe family using adjectives (kind, happy, beautiful)"
    ],
    
    example_opening_questions: [
      "Who do you live with?",
      "What is your mother like?",
      "What is your father like?",
      "Do you have a brother or sister?",
      "What does your mother do?",
      "Where does your father work?",
      "Do you love your family?"
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
      id: 'week2_family_intro',
      label_en: "Family Introduction 👨‍👩‍👧‍👦",
      label_vi: "Giới thiệu Gia đình 👨‍👩‍👧‍👦",
      icon: "👨‍👩‍👧‍👦",
      ai_role: "Friendly visitor asking about student's family",
      user_role: "Student introducing their family",
      intro: "Hello! I want to learn about your family! Tell me - who do you live with?",
      context: "Week 2 theme - Family Members. AI acts as curious visitor asking about family members (mother, father, brother, sister). AI asks what they look like, what they do, and how student feels about them. Uses 'My...' patterns and adjectives (kind, happy, beautiful). Should be warm, encouraging, and use simple words suitable for A0+ level."
    }
  },


  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_my_family',
      emoji: '👨‍👩‍👧',
      title: 'My Family',
      bridge: 'In the story, Emma describes her amazing family — mum, dad, brother Tom, and sister Lily! 📖',
      seed_question: 'Who is in your family? Is it a big family or a small family?',
      frames: [
        { template: 'My family has ___', follow_up_q: 'Is it a big family or a small family?', hints: ['two people', 'four people', 'many people'] },
        { template: 'My mother is ___', follow_up_q: 'Is your mum kind or funny?', hints: ['kind', 'funny', 'beautiful'] },
        { template: 'My father is ___', follow_up_q: 'Is your dad tall or strong?', hints: ['tall', 'strong', 'kind'] },
        { template: 'My family is ___', follow_up_q: 'Is your family big or happy?', hints: ['big', 'happy', 'small'] },
        { template: 'My ___ is my favourite person', follow_up_q: 'Who is your favourite? Is it your mum or your dad?', hints: ['mum', 'dad', 'grandma'] },
        { template: 'My sister is ___', follow_up_q: 'Is your sister kind or funny?', hints: ['kind', 'funny', 'my best friend'] },
        { template: 'My brother is ___', follow_up_q: 'Is your brother funny or smart?', hints: ['funny', 'smart', 'my hero'] },
        { template: 'My family is so ___', follow_up_q: 'Is your family so kind or so happy?', hints: ['kind', 'happy', 'wonderful'] }
      ],
      scaffold_frames: ['My family has ___', 'My ___ is ___', 'I love my family because ___'],
      vocab_focus: ['mother', 'father', 'brother', 'sister', 'family'],
      turns: 8
    },
    {
      id: 'spark_family_superpower',
      emoji: '💪',
      title: 'Family Superpowers',
      bridge: 'Emma says her mum is a leader and her dad is strong and kind. Everyone has a superpower! 🌟',
      seed_question: 'What is a superpower in your family? Is your mum very kind or your dad very strong?',
      frames: [
        { template: 'My ___ is very kind', follow_up_q: 'Who is very strong or very kind in your family?', hints: ['mum', 'dad', 'sister'] },
        { template: 'My ___ is a teacher', follow_up_q: 'Is your mum a teacher or a nurse?', hints: ['mum', 'dad', 'grandma'] },
        { template: 'My mum is a ___', follow_up_q: 'What does your mum do? Is she a teacher or a doctor?', hints: ['teacher', 'doctor', 'hero'] },
        { template: 'My dad is a ___', follow_up_q: 'What does your dad do? Is he a driver or a hero?', hints: ['driver', 'hero', 'kind person'] },
        { template: 'My ___ is so amazing', follow_up_q: 'Who is so amazing in your family?', hints: ['mum', 'dad', 'grandma'] },
        { template: 'My ___ is my hero', follow_up_q: 'Who is your hero? Is it your mum or your dad?', hints: ['mum', 'dad', 'teacher'] },
        { template: 'My ___ is the best cook', follow_up_q: 'Who is the best cook or the best driver?', hints: ['mum', 'dad', 'grandma'] },
        { template: 'I think my ___ is amazing', follow_up_q: 'Who do you think is super? Is it your mum or your dad?', hints: ['mum', 'dad', 'family'] },
      ],
      scaffold_frames: ['My ___ is very ___', 'My ___ can ___', 'I think my ___ is ___'],
      vocab_focus: ['strong', 'kind', 'funny', 'smart', 'helper'],
      turns: 8
    }
  ],

  conversation_cards: [
    {
      id: "my_family_tree",
      title: "My Family Tree",
      emoji: "🌳",
      theme: "Family Members",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Hello! Let's talk about your family! 🏡 Who is in your family? Say: My mother and father are in my family! or I have a big family!",
          accept: ["mother", "father", "family", "big", "small", "have", "my"]
        },
        {
          ai: "Great! Tell me about your father! What is he like? Say: My father is kind! or My father is tall!",
          accept: ["kind", "tall", "funny", "nice", "happy", "short", "father", "is"]
        },
        {
          ai: "Do you have a brother or sister? Say: I have a brother! or I have a sister!",
          options: ["I have a brother", "I have a sister", "I have a brother and a sister", "I am an only child"]
        },
        {
          ai: "How many people are in your family? Say: I have 3 people in my family! or I have 4 people in my family!",
          options: ["I have 3 people in my family", "I have 4 people in my family", "I have 5 people in my family", "I have a big family"]
        },
        {
          ai: "Do you love your family? Say: Yes, I love my family!",
          accept: ["Yes", "I love", "love", "family"]
        }
      ],
      completion_message: "Wonderful! You talked about your family! 🎉 You used: mother, father, brother, sister!"
    },
    {
      id: "family_fun_time",
      title: "Family Fun Time",
      emoji: "🎮",
      theme: "What Families Do Together",
      difficulty: "medium",
      exchanges: [
        {
          ai: "What does your family do together? Choose: We eat together or We watch TV or We play together",
          options: ["We eat together", "We watch TV", "We play together"]
        },
        {
          ai: "Does your mother cook? Say: My mother cooks! or My mother works! or My mother helps!",
          fill_blank: "My mother ___",
          accept_words: ["cooks", "cook", "works", "helps", "sings", "reads", "mother"]
        },
        {
          ai: "Does your father work? Say: Yes, my father works! or My father works at home.",
          accept: ["Yes", "my father", "works", "father"]
        },
        {
          ai: "What do you do with your mother? Choose: I hug my mother or I help my mother or I talk with my mother",
          options: ["I hug my mother", "I help my mother", "I talk with my mother"]
        },
        {
          ai: "What is your favourite thing to do with your family? Say: I like to play with my family! or I like to eat with my family! or I like to watch with my family!",
          fill_blank: "I like to ___ with my family",
          accept_words: ["play", "eat", "watch", "talk", "cook", "walk", "sing"]
        },
        {
          ai: "Do you help your family? Say: I help my mother! or I help my father! or I help my brother!",
          fill_blank: "I help my ___",
          accept_words: ["mother", "father", "brother", "sister", "family", "parents", "help"]
        }
      ],
      completion_message: "Great job! You talked about your family activities! 👏 You used: my mother, my father, and action verbs!"
    },
    {
      id: "guess_my_family",
      title: "Guess My Family!",
      emoji: "🔍",
      theme: "Family Descriptions",
      difficulty: "medium",
      exchanges: [
        {
          ai: "I am going to describe someone! This person is a woman. She loves you very much. Who is she? Say: She is my mother!",
          accept: ["mother", "mom", "mum", "she is"]
        },
        {
          ai: "This person is a man. He works every day for the family. Who is he? Say: He is my father!",
          accept: ["father", "dad", "papa", "he is"]
        },
        {
          ai: "This person is a child. They are older than you. Who are they? Choose: My brother or My sister or My older sibling",
          options: ["My brother", "My sister", "My older sibling"]
        },
        {
          ai: "This person is old and loves to give you food! They are your parent's parent! Who are they? Say: My grandmother! or My grandfather! or My grandma!",
          fill_blank: "My ___",
          accept_words: ["grandmother", "grandfather", "grandma", "grandpa", "granny"]
        },
        {
          ai: "Now you describe a family member! Say: My mother loves me! or My father loves me! or My family loves me!",
          accept: ["loves me", "love me", "my mother", "my father", "my sister", "my brother"]
        }
      ],
      completion_message: "Excellent detective work! 🔍 You know all your family words: mother, father, brother, sister, grandmother, grandfather!"
    }
  ]
};

export { week2RealData };
export default week2RealData;
