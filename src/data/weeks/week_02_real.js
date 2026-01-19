/**
 * ✅ WEEK 2 REAL SYLLABUS DATA
 * 
 * Source: 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
 * Phase 1 - Block A: Week 2
 * 
 * This file contains the OFFICIAL syllabus content for Week 2,
 * extracted from the master curriculum document.
 * 
 * Ms. Nova MUST use this data as the source of truth for:
 * - Story Mission vocabulary
 * - Grammar patterns to teach  
 * - Learning outcomes
 * 
 * Generated per: ENGQUEST MASTER PROMPT V27-FINAL.txt
 * - 3 Story Missions (Family Squad theme)
 * - 15 turns per mission (EXACT)
 * - ACK + RECAST + ENCOURAGE + ASK formula
 * - 5-6 hints per turn (progressive difficulty)
 */

export const week2RealData = {
  // === METADATA ===
  week_id: 'week-2',
  week_number: 2,
  phase: 1,
  block: "A",
  unit: 1,
  
  // === OFFICIAL SYLLABUS DATA ===
  week_title_en: "My Family Squad (Relationships)",
  week_title_vi: "Biệt đội Gia đình (Mối quan hệ)",
  
  topic: "Family members and relationships",
  topic_vi: "Các thành viên gia đình và mối quan hệ",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Describe family members using possessive adjectives (my, your) and simple present tense.",
  learning_outcome_vi: "Mô tả các thành viên gia đình bằng cách sử dụng tính từ sở hữu (my, your) và thì hiện tại đơn.",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Possessive Adjectives (My, Your)",
  grammar_pattern: "My [family member] is [adjective]",
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
      definition_en: "A male child in a family.",
      example: "My brother is funny.",
      syllabus_context: "Family members"
    },
    {
      word: "sister",
      pronunciation: "/ˈsɪstər/",
      definition_vi: "Chị/Em gái",
      definition_en: "A female child in a family.",
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
    }
  ],
  
  // === CEFR LEVEL ===
  cefr_level: "A0++",
  cefr_justification: "Week 2: Present simple with possessive adjectives. Simple family vocabulary. No complex structures.",
  
  // === STORY MISSIONS (3 TOTAL, 15 TURNS EACH) ===
  story_missions: [
    {
      mission_id: 1,
      title: "Tell Me About Your Family",
      title_vi: "Kể Cho Tôi Nghe Về Gia Đình Của Bạn",
      theme: "Family composition and relationships",
      
      nova_greeting: "Hello! I want to know about your family. Tell me about your family. Who is in your family?",
      default_hints: ["My", "family", "has", "people", "mother", "father"],
      
      mission_context: `In this mission, the student introduces their family members to Ms. Nova. The conversation focuses on family composition and using possessive adjectives (my, your).

⚡ KEY POINTS:
- Focus on FAMILY COMPOSITION first
- Then move to DESCRIPTIONS of family members
- Keep questions open-ended (Who? What? Which?)
- Avoid Yes/No questions
- Use "My family has..." pattern
- Allow student to mention siblings or extended family naturally

GRAMMAR SCOPE:
- "My mother/father/brother/sister is..."
- "My family has..."
- Simple Present only
- Possessive adjectives: my, your

VOCABULARY FOCUS:
- mother, father, brother, sister, family, home, big, small, happy, kind, funny`,

      turns: [
        {
          turn_num: 1,
          step: "Introduction - family size",
          nova_prompt: "Tell me about your family. How many people are in your family?",
          target_vocab: ["family", "mother", "father"],
          expected_answer_pattern: "My family has... people",
          hints: ["My", "family", "has", "people", "numbers"]
        },
        {
          turn_num: 2,
          step: "Who lives with you",
          nova_prompt: "Who lives with you? Do you have a mother?",
          target_vocab: ["mother", "father"],
          expected_answer_pattern: "Yes, my mother/father is...",
          hints: ["Yes", "my", "mother", "father", "lives"]
        },
        {
          turn_num: 3,
          step: "Describe mother",
          nova_prompt: "Tell me about your mother. What is your mother like?",
          target_vocab: ["mother", "kind", "nice"],
          expected_answer_pattern: "My mother is [adjective]",
          hints: ["My", "mother", "is", "kind", "nice"]
        },
        {
          turn_num: 4,
          step: "Father introduction",
          nova_prompt: "What about your father? Tell me about your father.",
          target_vocab: ["father", "strong", "kind"],
          expected_answer_pattern: "My father is [adjective]",
          hints: ["My", "father", "is", "strong", "nice"]
        },
        {
          turn_num: 5,
          step: "Siblings - brothers",
          nova_prompt: "Do you have a brother? Tell me about your brother.",
          target_vocab: ["brother", "funny"],
          expected_answer_pattern: "Yes, my brother is... / No, I don't have a brother",
          hints: ["My", "brother", "is", "funny", "has"]
        },
        {
          turn_num: 6,
          step: "Siblings - sisters",
          nova_prompt: "Do you have a sister? What is your sister like?",
          target_vocab: ["sister", "smart", "funny"],
          expected_answer_pattern: "Yes, my sister is... / No, I don't have a sister",
          hints: ["My", "sister", "is", "smart", "kind"]
        },
        {
          turn_num: 7,
          step: "Family feeling",
          nova_prompt: "Is your family happy? Tell me why.",
          target_vocab: ["happy", "family", "love"],
          expected_answer_pattern: "Yes, my family is happy because...",
          hints: ["Yes", "my", "family", "is", "happy"]
        },
        {
          turn_num: 8,
          step: "Where is home",
          nova_prompt: "Where is your home? Is your home big or small?",
          target_vocab: ["home", "big", "small"],
          expected_answer_pattern: "My home is [adjective]",
          hints: ["My", "home", "is", "big", "small"]
        },
        {
          turn_num: 9,
          step: "Family activities",
          nova_prompt: "What do you do with your family? Tell me.",
          target_vocab: ["play", "eat", "talk"],
          expected_answer_pattern: "We play/eat/talk together",
          hints: ["We", "play", "together", "eat", "talk"]
        },
        {
          turn_num: 10,
          step: "Favorite family member",
          nova_prompt: "Who is your favorite in your family? Tell me who.",
          target_vocab: ["favorite", "mother", "father"],
          expected_answer_pattern: "My [family member] is my favorite",
          hints: ["My", "mother", "father", "is", "favorite"]
        },
        {
          turn_num: 11,
          step: "Parent roles - mother",
          nova_prompt: "What does your mother do? Tell me about your mother's day.",
          target_vocab: ["work", "cook", "help"],
          expected_answer_pattern: "My mother [verb]...",
          hints: ["My", "mother", "cooks", "works", "helps"]
        },
        {
          turn_num: 12,
          step: "Parent roles - father",
          nova_prompt: "What does your father do? Tell me about your father.",
          target_vocab: ["work", "play", "help"],
          expected_answer_pattern: "My father [verb]...",
          hints: ["My", "father", "works", "plays", "helps"]
        },
        {
          turn_num: 13,
          step: "Sibling relationship",
          nova_prompt: "Do your brothers or sisters help you? How do they help?",
          target_vocab: ["help", "play", "together"],
          expected_answer_pattern: "Yes, they help me... / We play together",
          hints: ["Yes", "they", "help", "play", "together"]
        },
        {
          turn_num: 14,
          step: "Family love",
          nova_prompt: "Do you love your family? Tell me why you love them.",
          target_vocab: ["love", "kind", "happy"],
          expected_answer_pattern: "Yes, I love my family because they are...",
          hints: ["Yes", "I", "love", "my", "family"]
        },
        {
          turn_num: 15,
          step: "Closing - family is team",
          nova_prompt: "Thank you for telling me about your family! Your family sounds wonderful and happy! Great job!",
          target_vocab: ["family", "wonderful"],
          expected_answer_pattern: "Thank you!",
          hints: ["Thank", "you"]
        }
      ],
      
      success_criteria: [
        "Uses possessive adjectives (my, your) correctly",
        "Names at least 3 family members",
        "Describes family members with adjectives",
        "Uses present simple tense consistently",
        "Shows understanding of family relationships"
      ]
    },
    
    {
      mission_id: 2,
      title: "My Mother's Day",
      title_vi: "Ngày Của Mẹ Tôi",
      theme: "Daily routines and family roles - Mother focus",
      
      nova_greeting: "Hi! Tell me about your mother. What does she do in the morning?",
      default_hints: ["My", "mother", "wakes", "cooks", "morning"],
      
      mission_context: `In this mission, the student describes a typical day for their mother, focusing on daily activities and routines. The conversation deepens understanding of family roles and introduces action verbs.

⚡ KEY POINTS:
- Focus on DAILY ACTIVITIES (wake up, eat, work, cook)
- Time-related vocabulary (morning, afternoon, evening)
- Action verbs (cook, work, help, play, sleep)
- "My mother [verb]" pattern
- Connect to family togetherness

GRAMMAR SCOPE:
- Present simple: "She cooks", "My mother works"
- Time expressions: morning, afternoon, evening
- Adverbs of frequency: always, usually, sometimes

VOCABULARY FOCUS:
- Activities: cook, work, clean, help, play, sleep
- Time: morning, afternoon, evening, day
- Feelings: happy, tired, busy`,

      turns: [
        {
          turn_num: 1,
          step: "Morning routine",
          nova_prompt: "What does your mother do in the morning? Tell me.",
          target_vocab: ["morning", "wake", "cook"],
          expected_answer_pattern: "My mother [verb] in the morning",
          hints: ["My", "mother", "wakes", "cooks", "morning"]
        },
        {
          turn_num: 2,
          step: "Breakfast time",
          nova_prompt: "Does your mother cook breakfast? What does she cook?",
          target_vocab: ["cook", "breakfast", "food"],
          expected_answer_pattern: "My mother cooks [food]",
          hints: ["My", "mother", "cooks", "breakfast", "eggs"]
        },
        {
          turn_num: 3,
          step: "During day",
          nova_prompt: "What does your mother do during the day? Is she busy?",
          target_vocab: ["busy", "work", "day"],
          expected_answer_pattern: "My mother [verb] during the day",
          hints: ["My", "mother", "is", "busy", "works"]
        },
        {
          turn_num: 4,
          step: "Work or home",
          nova_prompt: "Does your mother work? Where does she work?",
          target_vocab: ["work", "home", "office"],
          expected_answer_pattern: "My mother works at [place]",
          hints: ["My", "mother", "works", "home", "office"]
        },
        {
          turn_num: 5,
          step: "Afternoon activities",
          nova_prompt: "What does your mother do in the afternoon?",
          target_vocab: ["afternoon", "clean", "help"],
          expected_answer_pattern: "My mother [verb] in the afternoon",
          hints: ["My", "mother", "cleans", "helps", "afternoon"]
        },
        {
          turn_num: 6,
          step: "Dinner preparation",
          nova_prompt: "Does your mother cook dinner? What is your favorite dinner?",
          target_vocab: ["dinner", "cook", "favorite"],
          expected_answer_pattern: "Yes, my mother cooks [food]",
          hints: ["Yes", "my", "mother", "cooks", "dinner"]
        },
        {
          turn_num: 7,
          step: "Evening time",
          nova_prompt: "What does your mother do in the evening? Is she happy?",
          target_vocab: ["evening", "happy", "relax"],
          expected_answer_pattern: "My mother [verb] in the evening",
          hints: ["My", "mother", "is", "happy", "relaxes"]
        },
        {
          turn_num: 8,
          step: "Family time",
          nova_prompt: "Does your mother spend time with the family? What do you do together?",
          target_vocab: ["family", "together", "play"],
          expected_answer_pattern: "Yes, we [verb] together",
          hints: ["Yes", "we", "play", "talk", "together"]
        },
        {
          turn_num: 9,
          step: "Mother's feelings",
          nova_prompt: "Is your mother happy? Is she sometimes tired?",
          target_vocab: ["happy", "tired", "busy"],
          expected_answer_pattern: "Yes, my mother is [feeling]",
          hints: ["Yes", "my", "mother", "is", "happy"]
        },
        {
          turn_num: 10,
          step: "Help at home",
          nova_prompt: "Does your mother need help? How can you help her?",
          target_vocab: ["help", "clean", "kitchen"],
          expected_answer_pattern: "I help my mother [action]",
          hints: ["I", "help", "my", "mother", "clean"]
        },
        {
          turn_num: 11,
          step: "Bedtime",
          nova_prompt: "When does your mother go to sleep? Is she tired at night?",
          target_vocab: ["sleep", "night", "bed"],
          expected_answer_pattern: "My mother sleeps at [time]",
          hints: ["My", "mother", "sleeps", "at", "night"]
        },
        {
          turn_num: 12,
          step: "Mother's personality",
          nova_prompt: "What is your mother like? Tell me three things about her.",
          target_vocab: ["kind", "smart", "strong"],
          expected_answer_pattern: "My mother is [adjectives]",
          hints: ["My", "mother", "is", "kind", "smart"]
        },
        {
          turn_num: 13,
          step: "Love and appreciation",
          nova_prompt: "Why do you love your mother? Tell me one reason.",
          target_vocab: ["love", "because", "kind"],
          expected_answer_pattern: "I love my mother because she is...",
          hints: ["I", "love", "my", "mother", "because"]
        },
        {
          turn_num: 14,
          step: "Most special thing",
          nova_prompt: "What is the most special thing about your mother? Tell me.",
          target_vocab: ["special", "mother", "love"],
          expected_answer_pattern: "My mother is [adjective] because...",
          hints: ["My", "mother", "is", "special", "kind"]
        },
        {
          turn_num: 15,
          step: "Closing",
          nova_prompt: "Thank you! Your mother sounds wonderful! You are a wonderful child! Great job today!",
          target_vocab: ["wonderful", "thank"],
          expected_answer_pattern: "Thank you!",
          hints: ["Thank", "you"]
        }
      ],
      
      success_criteria: [
        "Describes daily activities using action verbs",
        "Uses present simple tense correctly",
        "Shows understanding of family roles",
        "Expresses appreciation for mother",
        "Can describe routines chronologically"
      ]
    },
    
    {
      mission_id: 3,
      title: "My Father's Strength",
      title_vi: "Sức Mạnh Của Bố Tôi",
      theme: "Family roles, emotions, and relationships",
      
      nova_greeting: "Now tell me about your father! What is your father like? What makes your father special?",
      default_hints: ["My", "father", "is", "strong", "kind", "special"],
      
      mission_context: `In this mission, the student describes their father, focusing on his roles, qualities, and the special relationship they have. The conversation reinforces family vocabulary and encourages emotional expression.

⚡ KEY POINTS:
- Focus on FATHER'S ROLES and QUALITIES
- Emotional connection: "I love my father because..."
- Action verbs: work, play, help, teach
- Adjectives: strong, kind, funny, smart, brave
- "My father is..." pattern

GRAMMAR SCOPE:
- Present simple describing characteristics
- "My father [verb]" for actions
- Emotional statements: "I love my father because..."
- Comparative structures if needed: bigger, stronger

VOCABULARY FOCUS:
- Qualities: strong, kind, funny, smart, brave
- Activities: work, play, teach, help, protect
- Emotions: love, happy, proud`,

      turns: [
        {
          turn_num: 1,
          step: "Father introduction",
          nova_prompt: "Tell me about your father. What is your father's name?",
          target_vocab: ["father", "name"],
          expected_answer_pattern: "My father's name is [name]",
          hints: ["My", "father's", "name", "is"]
        },
        {
          turn_num: 2,
          step: "Physical description",
          nova_prompt: "What does your father look like? Is he tall or short?",
          target_vocab: ["tall", "short", "strong"],
          expected_answer_pattern: "My father is [adjective]",
          hints: ["My", "father", "is", "tall", "strong"]
        },
        {
          turn_num: 3,
          step: "Father's work",
          nova_prompt: "What does your father do? Does he work?",
          target_vocab: ["work", "job", "teach"],
          expected_answer_pattern: "My father [verb] / My father is a [job]",
          hints: ["My", "father", "works", "is", "teacher"]
        },
        {
          turn_num: 4,
          step: "Father's hobbies",
          nova_prompt: "What does your father like? What is his hobby?",
          target_vocab: ["hobby", "play", "sports"],
          expected_answer_pattern: "My father likes [activity]",
          hints: ["My", "father", "likes", "plays", "sports"]
        },
        {
          turn_num: 5,
          step: "Play together",
          nova_prompt: "Do you play with your father? What do you play together?",
          target_vocab: ["play", "together", "fun"],
          expected_answer_pattern: "Yes, we play [activity] together",
          hints: ["Yes", "we", "play", "together", "football"]
        },
        {
          turn_num: 6,
          step: "Father's strength",
          nova_prompt: "What can your father do that shows he is strong? Tell me.",
          target_vocab: ["strong", "carry", "help"],
          expected_answer_pattern: "My father can [action]",
          hints: ["My", "father", "can", "carry", "help"]
        },
        {
          turn_num: 7,
          step: "Teaching/Learning",
          nova_prompt: "Does your father teach you things? What does he teach?",
          target_vocab: ["teach", "learn", "help"],
          expected_answer_pattern: "My father teaches me [activity/skill]",
          hints: ["My", "father", "teaches", "me", "swimming"]
        },
        {
          turn_num: 8,
          step: "Personality",
          nova_prompt: "What is your father's personality like? Is he funny? Is he kind?",
          target_vocab: ["funny", "kind", "serious"],
          expected_answer_pattern: "My father is [adjectives]",
          hints: ["My", "father", "is", "funny", "kind"]
        },
        {
          turn_num: 9,
          step: "Spending time",
          nova_prompt: "What is your favorite thing to do with your father?",
          target_vocab: ["favorite", "father", "fun"],
          expected_answer_pattern: "My favorite thing is [activity] with my father",
          hints: ["My", "favorite", "is", "with", "father"]
        },
        {
          turn_num: 10,
          step: "Father's values",
          nova_prompt: "What is important to your father? What does he care about?",
          target_vocab: ["important", "family", "love"],
          expected_answer_pattern: "My father cares about [topic]",
          hints: ["My", "father", "cares", "about", "family"]
        },
        {
          turn_num: 11,
          step: "Help from father",
          nova_prompt: "How does your father help you? In what ways?",
          target_vocab: ["help", "support", "encourage"],
          expected_answer_pattern: "My father helps me [action/way]",
          hints: ["My", "father", "helps", "me", "with"]
        },
        {
          turn_num: 12,
          step: "Father's advice",
          nova_prompt: "Does your father give you advice? What does he tell you?",
          target_vocab: ["advice", "tell", "important"],
          expected_answer_pattern: "My father tells me [topic]",
          hints: ["My", "father", "tells", "me", "important"]
        },
        {
          turn_num: 13,
          step: "Love and respect",
          nova_prompt: "Why do you love your father? Tell me one reason.",
          target_vocab: ["love", "because", "kind"],
          expected_answer_pattern: "I love my father because he is...",
          hints: ["I", "love", "my", "father", "because"]
        },
        {
          turn_num: 14,
          step: "Special memory",
          nova_prompt: "Tell me about a special memory with your father. What happened?",
          target_vocab: ["memory", "time", "fun"],
          expected_answer_pattern: "[Describe a memory]",
          hints: ["We", "played", "had", "fun", "together"]
        },
        {
          turn_num: 15,
          step: "Closing",
          nova_prompt: "Thank you for telling me about your wonderful father! Your father must be very proud of you! Excellent work!",
          target_vocab: ["wonderful", "proud"],
          expected_answer_pattern: "Thank you!",
          hints: ["Thank", "you"]
        }
      ],
      
      success_criteria: [
        "Describes father using varied adjectives",
        "Uses possessive and simple present correctly",
        "Expresses emotional connection to father",
        "Demonstrates understanding of family roles",
        "Can narrate activities and memories"
      ]
    }
  ],
  
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
  
  // === PEDAGOGICAL NOTES ===
  pedagogy: {
    approach: "Visual anchor with family photos, TPR for family roles and activities",
    immersion_note: "Introduce family members through real or cartoon family photos. Use ZERO L1 - only English.",
    production_task: "Students draw their family and describe each person using 'My [family member] is [adjective]'",
    ai_tutor_mission: "Ms. Nova guides student through describing their family, asking open-ended questions about relationships and daily routines"
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
