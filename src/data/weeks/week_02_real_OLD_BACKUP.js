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
  week_id: 2,  // 🔥 Number for GAME_TEMPLATES lookup
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
  
  // === STORY MISSIONS (3 missions, ~20 turns each) ===
  missions: [
    {
      mission_id: 1,
      title: "Meet My Family",
      title_en: "Meet My Family",
      title_vi: "Gặp Gỡ Gia Đình Tôi",
      theme: "Introducing Family Members",
      
      nova_greeting: "Hi! I want to learn about your family! Tell me about your family!",
      default_hints: ["My", "mother", "father", "is", "kind"],
      
      mission_context: `This is Week 2 Mission 1 - Meet My Family (Introduction).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- DON'T modify or shorten the questions
- COPY question text word-for-word from phase_questions
- Each student answer = Move to NEXT question in phase_questions array

🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS - NEVER EVER ASK THESE: 🚨🚨🚨
❌ "What do you think?" - FORBIDDEN!
❌ "How do you feel?" - FORBIDDEN!
❌ "Do you like...?" (without options) - FORBIDDEN!
❌ "What can I do for you?" - FORBIDDEN!
❌ Personal opinion questions - FORBIDDEN!
❌ Breaking character - FORBIDDEN!

✅ ONLY ASK QUESTIONS FROM THE phase_questions ARRAY BELOW!

GRAMMAR: "My [family member] is [adjective]" pattern
VOCABULARY: mother, father, brother, sister, family, home, kind, happy, love, together`,
      
      target_vocab: ["mother", "father", "brother", "sister", "family", "home", "kind", "happy"],
      grammar_pattern: "My [family member] is [adjective].",

      story_character: {
        name: "Ms. Nova",
        personality: "warm, curious about families, encouraging",
        backstory: "I love learning about different families! Every family is special and unique!",
        speaking_style: "asks about family members one by one, celebrates each answer, uses 'my' and 'your' correctly",
        facts: [
          "I think families are wonderful teams!",
          "Every family member is important!",
          "Families help each other and love each other!",
          "I love hearing students describe their families!"
        ],
        role: "Family conversation guide"
      },

      opening_narrative: "🏠 Hi! I'm Ms. Nova! I want to learn about YOUR family! First, who do you live with? Say: I live with my mother, my father... Tell me!",

      story_arc: [
        {
          phase: "intro",
          turns: "1-5",
          phase_name: "Family Members Introduction",
          focus: "Name family members and start describing",
          phase_questions: [
            "(After student says who they live with) Great! Tell me about your mother! What is your mother like? Say: My mother is kind OR My mother is nice OR My mother is beautiful",
            "(After describing mother) Wonderful! Your mother is {student_answer}! ❤️ Now tell me about your father! What is your father like? Say: My father is strong OR My father is kind OR My father is tall",
            "(After describing father) Excellent! Your father is {student_answer}! 💪 Do you have brothers or sisters? Say: Yes, I have a brother OR Yes, I have a sister OR No, I don't have brothers or sisters",
            "(After sibling answer) I see! Now, tell me about your brother or sister! What are they like? Say: My brother is funny OR My sister is smart OR My brother is kind",
            "(After sibling description) Nice! {student_answer}! ✨ Now tell me - is your family big or small? Say: My family is big OR My family is small"
          ]
        },
        {
          phase: "family_details",
          turns: "6-11",
          phase_name: "Family Characteristics",
          focus: "Describe family personality and relationships",
          phase_questions: [
            "(After family size) Good! Your family is {student_answer}! 👨‍👩‍👧‍👦 What does your mother do at home? Say: My mother cooks OR My mother cleans OR My mother helps me",
            "(After mother's activities) Great! She {student_answer}! 🍳 What about your father? What does your father do? Say: My father works OR My father plays with me OR My father helps me",
            "(After father's activities) Excellent! He {student_answer}! 💼 Do you help your family? Say: Yes, I help my mother OR Yes, I help my father OR Yes, I help clean",
            "(After helping answer) Wonderful! You {student_answer}! 👏 What do you do together with your family? Say: We eat together OR We play together OR We watch TV together",
            "(After family activities) Nice! You {student_answer}! 🎉 Is your home big or small? Say: My home is big OR My home is small",
            "(After home size) Good! Your home is {student_answer}! 🏠 Is your family happy? Say: Yes, my family is happy OR Yes, my family is very happy"
          ]
        },
        {
          phase: "family_love",
          turns: "12-17",
          phase_name: "Family Love and Togetherness",
          focus: "Express feelings about family",
          phase_questions: [
            "(After happiness answer) Wonderful! {student_answer}! 😊 Who is your favorite in your family? Say: My mother is my favorite OR My father is my favorite OR My brother is my favorite",
            "(After favorite person) I see! {student_answer}! ❤️ Why do you love your mother? Say: I love my mother because she is kind OR because she helps me OR because she cooks for me",
            "(After mother love reason) Beautiful! You love her because {student_answer}! 💝 Why do you love your father? Say: I love my father because he is strong OR because he plays with me OR because he is kind",
            "(After father love reason) Perfect! You love him because {student_answer}! 💙 Do your brothers or sisters play with you? Say: Yes, they play with me OR Yes, we play together OR No, I don't have brothers or sisters",
            "(After sibling play) Great! {student_answer}! 🎮 What makes your family happy? Say: We are happy when we eat together OR when we play together OR when we help each other",
            "(After what makes family happy) Beautiful! Your family is happy when {student_answer}! 🌟 Do you love your family? Say: Yes, I love my family very much!"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Celebration and Gratitude",
          focus: "Wrap up with appreciation for family",
          phase_questions: [
            "(After expressing love) Wonderful! You said: {student_answer}! ❤️❤️❤️ Tell me one more thing - what is special about your family? Say: My family is special because we love each other OR because we are happy OR because we help each other",
            "(After what's special) Perfect! Your family is special because {student_answer}! ✨ Last question - can you say thank you to your family? Say: Thank you mother, thank you father, thank you family!",
            "(After thank you) Beautiful! 🎉 You have a wonderful family! Thank you for telling me about them! Your family is lucky to have you! Great job! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20
    },
    {
      mission_id: 2,
      title: "My Mother's Day",
      title_en: "My Mother's Day",
      title_vi: "Ngày Của Mẹ Tôi",
      theme: "Mother's Daily Routine",
      
      nova_greeting: "Hi! Let's talk about your mother! What does she do every day?",
      default_hints: ["My", "mother", "cooks", "works", "helps"],
      
      mission_context: `This is Week 2 Mission 2 - My Mother's Day (Daily Routine Game).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- Each student answer = Move to NEXT question
- NEVER ask same question twice
- ALWAYS acknowledge student's EXACT answer with {student_answer}

🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS: 🚨🚨🚨
❌ "What do you think?"
❌ "How do you feel?"
❌ "Tell me more" (too vague!)
❌ Breaking character

✅ ONLY ASK QUESTIONS FROM phase_questions!

GRAMMAR: "My mother [verb]" pattern, present simple
VOCABULARY: mother, cook, work, help, clean, home, morning, love, kind`,
      
      target_vocab: ["mother", "cook", "work", "help", "clean", "home", "morning", "love", "kind"],
      grammar_pattern: "My mother [verb].",

      story_character: {
        name: "Ms. Nova",
        personality: "appreciative, curious about mothers",
        backstory: "I think mothers are amazing! They do so much for their families!",
        speaking_style: "asks about mother's activities step by step, celebrates mother's role",
        facts: [
          "Mothers are wonderful!",
          "Mothers cook, clean, and help!",
          "Mothers love their children!",
          "Every mother is special!"
        ],
        role: "Mother appreciation guide"
      },

      opening_narrative: "🌅 Good morning! Let's talk about your mother! What does your mother do in the morning? Say: My mother cooks OR My mother cleans OR My mother works",

      story_arc: [
        {
          phase: "morning",
          turns: "1-5",
          phase_name: "Mother's Morning",
          focus: "Morning activities",
          phase_questions: [
            "(After morning activity) Great! She {student_answer} in the morning! 🌞 What does she cook? Say: She cooks rice OR She cooks bread OR She cooks food for me",
            "(After what she cooks) Yummy! She cooks {student_answer}! 🍳 Does your mother work? Say: Yes, she works OR No, she stays at home",
            "(After work question) I see! {student_answer}! 💼 What does she do at home? Say: She cleans the house OR She helps me OR She cooks",
            "(After home activities) Good! She {student_answer}! 🏠 Does your mother help you? Say: Yes, she helps me study OR Yes, she helps me eat OR Yes, she helps me",
            "(After helping) Wonderful! She {student_answer}! 👏 Is your mother kind? Say: Yes, my mother is kind OR Yes, my mother is very kind"
          ]
        },
        {
          phase: "afternoon",
          turns: "6-11",
          phase_name: "Mother's Afternoon & Evening",
          focus: "More daily activities",
          phase_questions: [
            "(After kind question) Beautiful! {student_answer}! ❤️ What does your mother do in the afternoon? Say: She works OR She cooks OR She cleans OR She rests",
            "(After afternoon activity) Good! She {student_answer}! ☀️ Does she play with you? Say: Yes, she plays with me OR Sometimes she plays with me OR No, she is busy",
            "(After play question) I see! {student_answer}! 🎮 What do you do together? Say: We talk OR We eat together OR We watch TV together",
            "(After together activity) Nice! You {student_answer}! 📺 Does your mother cook dinner? Say: Yes, she cooks dinner OR Yes, she cooks every day",
            "(After dinner cooking) Great! {student_answer}! 🍽️ Is dinner good? Say: Yes, dinner is good OR Yes, I love my mother's cooking",
            "(After dinner taste) Yummy! {student_answer}! 😋 What does your mother do at night? Say: She cleans OR She helps me OR She rests"
          ]
        },
        {
          phase: "appreciation",
          turns: "12-17",
          phase_name: "Appreciating Mother",
          focus: "Express love and gratitude",
          phase_questions: [
            "(After night activity) Good! She {student_answer}! 🌙 Is your mother tired? Say: Yes, she is tired OR Sometimes she is tired",
            "(After tired question) {student_answer}! 😴 Does she love you? Say: Yes, she loves me very much OR Yes, my mother loves me",
            "(After love question) Beautiful! {student_answer}! ❤️ Why do you love your mother? Say: I love her because she is kind OR because she helps me OR because she cooks for me",
            "(After why love) Perfect! You love her because {student_answer}! 💝 Do you help your mother? Say: Yes, I help her clean OR Yes, I help her cook OR Yes, I help her",
            "(After helping mother) Wonderful! You {student_answer}! 👏 What do you say to your mother? Say: Thank you mother OR I love you mother",
            "(After what you say) Beautiful! You say: {student_answer}! 🌟 Is your mother happy when you help? Say: Yes, she is happy OR Yes, she smiles"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Final Celebration",
          focus: "Wrap up with love",
          phase_questions: [
            "(After mother happy) Excellent! {student_answer}! 😊 Your mother is wonderful! Can you tell her: I love you, mother! Say: I love you, mother!",
            "(After I love you) Perfect! 💕 Your mother is lucky to have you! One more time - what is your mother like? Say: My mother is kind OR My mother is beautiful OR My mother is strong",
            "(After final description) Beautiful! Your mother is {student_answer}! 🌟 Thank you for telling me about your wonderful mother! Mothers are amazing! Great job! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20
    },
    {
      mission_id: 3,
      title: "My Father's Day",
      title_en: "My Father's Day",
      title_vi: "Ngày Của Bố Tôi",
      theme: "Father's Daily Routine",
      
      nova_greeting: "Hi! Now let's talk about your father! What does he do every day?",
      default_hints: ["My", "father", "works", "plays", "helps"],
      
      mission_context: `This is Week 2 Mission 3 - My Father's Day (Daily Routine Game).

🚨 CRITICAL: USE EXACT TEXT FROM phase_questions ARRAY
- Each student answer = Move to NEXT question
- NEVER ask same question twice
- ALWAYS acknowledge student's EXACT answer with {student_answer}

🚨🚨🚨 ABSOLUTELY FORBIDDEN QUESTIONS: 🚨🚨🚨
❌ "What do you think?"
❌ "How do you feel?"
❌ "Tell me more" (too vague!)
❌ Breaking character

✅ ONLY ASK QUESTIONS FROM phase_questions!

GRAMMAR: "My father [verb]" pattern, present simple
VOCABULARY: father, work, play, help, strong, kind, home, love, together`,
      
      target_vocab: ["father", "work", "play", "help", "strong", "kind", "home", "love", "together"],
      grammar_pattern: "My father [verb].",

      story_character: {
        name: "Ms. Nova",
        personality: "respectful, curious about fathers",
        backstory: "I think fathers are heroes! They work hard and love their families!",
        speaking_style: "asks about father's activities step by step, celebrates father's role",
        facts: [
          "Fathers are strong and kind!",
          "Fathers work to help their families!",
          "Fathers play and help their children!",
          "Every father is special!"
        ],
        role: "Father appreciation guide"
      },

      opening_narrative: "🌅 Good morning! Let's talk about your father! What does your father do in the morning? Say: My father works OR My father eats breakfast OR My father goes to work",

      story_arc: [
        {
          phase: "morning",
          turns: "1-5",
          phase_name: "Father's Morning",
          focus: "Morning routine",
          phase_questions: [
            "(After morning activity) Great! He {student_answer} in the morning! 🌞 Where does your father work? Say: He works in an office OR He works at a company OR He works at home",
            "(After where he works) Good! He works {student_answer}! 💼 Is your father strong? Say: Yes, my father is strong OR Yes, my father is very strong",
            "(After strong question) Excellent! {student_answer}! 💪 What does your father do at work? Say: He works hard OR He helps people OR He does his job",
            "(After what he does at work) Good! He {student_answer}! 👔 Does your father come home? Say: Yes, he comes home in the evening OR Yes, he comes home after work",
            "(After coming home) Nice! {student_answer}! 🏠 Is your father tired when he comes home? Say: Yes, he is tired OR Sometimes he is tired"
          ]
        },
        {
          phase: "evening",
          turns: "6-11",
          phase_name: "Father's Evening Time",
          focus: "Time with family",
          phase_questions: [
            "(After tired question) I see! {student_answer}! 😴 What does your father do at home? Say: He rests OR He plays with me OR He watches TV",
            "(After home activity) Good! He {student_answer}! 📺 Does your father play with you? Say: Yes, he plays with me OR Sometimes he plays with me",
            "(After play question) Great! {student_answer}! 🎮 What do you play together? Say: We play games OR We play ball OR We play together",
            "(After what you play) Fun! You {student_answer}! ⚽ Does your father help you? Say: Yes, he helps me study OR Yes, he helps me OR Yes, he teaches me",
            "(After helping) Wonderful! He {student_answer}! 📚 Does your father eat dinner with you? Say: Yes, we eat together OR Yes, we eat dinner together",
            "(After dinner together) Nice! {student_answer}! 🍽️ Does your father talk to you? Say: Yes, he talks to me OR Yes, we talk together"
          ]
        },
        {
          phase: "appreciation",
          turns: "12-17",
          phase_name: "Appreciating Father",
          focus: "Express love and respect",
          phase_questions: [
            "(After talking) Good! {student_answer}! 💬 Is your father kind? Say: Yes, my father is kind OR Yes, my father is very kind",
            "(After kind question) Beautiful! {student_answer}! ❤️ Does your father love you? Say: Yes, he loves me very much OR Yes, my father loves me",
            "(After love question) Wonderful! {student_answer}! 💙 Why do you love your father? Say: I love him because he is strong OR because he helps me OR because he is kind",
            "(After why love) Perfect! You love him because {student_answer}! 💝 Do you help your father? Say: Yes, I help him OR Sometimes I help him",
            "(After helping father) Great! {student_answer}! 👏 What do you say to your father? Say: Thank you father OR I love you father",
            "(After what you say) Beautiful! You say: {student_answer}! 🌟 Is your father happy when you help? Say: Yes, he is happy OR Yes, he smiles"
          ]
        },
        {
          phase: "closing",
          turns: "18-20",
          phase_name: "Final Celebration",
          focus: "Wrap up with appreciation",
          phase_questions: [
            "(After father happy) Excellent! {student_answer}! 😊 Your father is wonderful! Can you tell him: I love you, father! Say: I love you, father!",
            "(After I love you) Perfect! 💕 Your father is lucky to have you! One more time - what is your father like? Say: My father is strong OR My father is kind OR My father is hardworking",
            "(After final description) Beautiful! Your father is {student_answer}! 🌟 Thank you for telling me about your wonderful father! Fathers are heroes! Great job! Goodbye!"
          ]
        }
      ],
      
      minimum_turns: 15,
      maximum_turns: 20
    }
  ],
  
  // 🔥 ALIAS for compatibility with StoryMissionTab
  get story_missions() {
    return this.missions;
  },
  
  // === FREETALK KNOWLEDGE (FOR STORY MISSION & DEBATE TAB) ===
  freetalk_knowledge: {
    week_title: "My Family Squad",
    week_number: 2,
    theme: "Family and Home",
    
    knowledge_base: [
      "Family members: mother, father, brother, sister, grandmother, grandfather",
      "Families live together in homes",
      "Families help each other and work as a team",
      "People in families love each other",
      "Brothers and sisters play together and help each other",
      "Mothers and fathers take care of children and work",
      "Families eat together and talk",
      "Every family is different and special",
      "We can show love to family by helping and listening",
      "Family makes home a happy place"
    ],
    
    example_opening_questions: [
      "Tell me about your family.",
      "How many people live in your home?",
      "Who is in your family?",
      "What is your mother like?",
      "What is your father like?",
      "Do you have brothers or sisters?",
      "Is your family happy?",
      "What do you love about your family?"
    ]
  },
  
  // === ROLEPLAY SCENARIOS ===
  roleplay_scenarios: [
    {
      id: "rp_family_photo",
      title: "Family Photo Album 📸",
      title_en: "Family Photo Album",
      title_vi: "Album Ảnh Gia Đình",
      emoji: "📸",
      context: "You and Ms. Nova are looking at family photos. Describe each person!",
      nova_role: "Photo album viewer asking about each family member",
      student_role: "Describe family members in photos",
      opening_line: "Wow! Let's look at your family photos! Who is this?",
      guide_rules: [
        "🚫 NEVER ask: 'What do you think about this photo?'",
        "🚫 NEVER ask: 'How do you feel?'",
        "🚫 NEVER ask yes/no questions without giving options",
        "✅ ALWAYS ask: 'Who is this? Your mother or your father?'",
        "✅ ALWAYS ask: 'What is your mother like? Is she kind or tall?'",
        "✅ ALWAYS give 2-3 word choices in questions",
        "✅ Point to different photos and ask about each person",
        "✅ Build on student's answer: 'Kind! Your mother is kind! What about your father?'"
      ],
      vocab_focus: ["mother", "father", "brother", "sister", "kind", "strong", "happy", "love"],
      expected_patterns: [
        "This is my mother.",
        "My mother is kind.",
        "This is my father.",
        "My father is strong."
      ]
    },
    {
      id: "rp_dinner_time",
      title: "Family Dinner Time 🍽️",
      title_en: "Family Dinner Time",
      title_vi: "Giờ Ăn Tối Gia Đình",
      emoji: "🍽️",
      context: "It's dinner time! Talk about who does what in your family!",
      nova_role: "Curious about family dinner routine",
      student_role: "Describe family dinner activities",
      opening_line: "It's dinner time! Who cooks dinner in your family?",
      guide_rules: [
        "🚫 NEVER ask: 'Do you like dinner?'",
        "🚫 NEVER ask: 'What do you think about cooking?'",
        "🚫 NEVER ask open-ended feeling questions",
        "✅ ALWAYS ask: 'Who cooks? Your mother or your father?'",
        "✅ ALWAYS ask: 'What does your mother cook? Rice or noodles?'",
        "✅ ALWAYS give specific vocabulary choices",
        "✅ Ask about each family member's role at dinner",
        "✅ Build on answers: 'Your mother cooks! Great! What about your father?'"
      ],
      vocab_focus: ["mother", "father", "cook", "help", "eat", "together", "home", "happy"],
      expected_patterns: [
        "My mother cooks dinner.",
        "We eat together.",
        "My family is happy.",
        "I help my mother."
      ]
    },
    {
      id: "rp_weekend_family",
      title: "Weekend with Family 🎉",
      title_en: "Weekend with Family",
      title_vi: "Cuối Tuần Với Gia Đình",
      emoji: "🎉",
      context: "It's the weekend! Talk about what your family does together!",
      nova_role: "Asking about weekend family activities",
      student_role: "Describe family weekend activities",
      opening_line: "It's Saturday! What does your family do on the weekend?",
      guide_rules: [
        "🚫 NEVER ask: 'Do you like weekends?'",
        "🚫 NEVER ask: 'How do you feel about family time?'",
        "🚫 NEVER ask vague questions",
        "✅ ALWAYS ask: 'What do you do? Play or eat together?'",
        "✅ ALWAYS ask: 'Who do you play with? Your brother or your sister?'",
        "✅ ALWAYS give activity choices (play, eat, watch TV)",
        "✅ Ask about different family members",
        "✅ Build on answers: 'You play together! Fun! What do you play?'"
      ],
      vocab_focus: ["family", "play", "together", "brother", "sister", "happy", "home", "love"],
      expected_patterns: [
        "We play together.",
        "My brother plays with me.",
        "My family is happy.",
        "I love my family."
      ]
    }
  ],
  
  // === PEDAGOGICAL NOTES ===
  pedagogy: {
    approach: "Visual anchor with family photos, TPR for family roles and activities",
    immersion_note: "Introduce family members through real or cartoon family photos. Use ZERO L1 - only English.",
    production_task: "Students draw their family and describe each person using 'My [family member] is [adjective]'",
    ai_tutor_mission: "Ms. Nova guides student through describing their family, asking scaffolded questions with clear choices"
  },
  
  // === VOICE CONFIGURATION ===
  voice_config: {
    voice_name: "en-US-Neural2-C",
    speaking_rate: 0.9,
    pitch: 2.0,
    character: "Ms. Nova - Friendly AI tutor"
  }
};

export default week2RealData;
