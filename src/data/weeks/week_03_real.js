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
  weekId: 'week-3',  // 🔥 NovaEngine expects camelCase
  week_id: 'week-3',
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
      title: "My Friend Tom",
      title_en: "My Friend Tom",
      title_vi: "Bạn Tôi Tom",
      context_en: "Ms. Nova asks you to describe your friend Tom. What does he look like?",
      context_vi: "Cô Nova yêu cầu bạn miêu tả bạn Tom. Cậu ấy trông như thế nào?",
      target_vocab: ["tall", "short", "hair", "eyes", "curly", "straight"],
      learning_focus: "Use 'He is' and 'He has' to describe others"
    },
    {
      mission_id: 3,
      title: "My Family Portraits",
      title: "My Family Portraits",
      title_en: "My Family Portraits",
      title_vi: "Chân Dung Gia Đình Tôi",
      context_en: "Ms. Nova shows you family photos. Describe each person.",
      context_vi: "Cô Nova cho bạn xem ảnh gia đình. Miêu tả từng người.",
      target_vocab: ["tall", "short", "long", "curly", "straight", "glasses", "smile"],
      learning_focus: "Practice 'is' vs 'has' with multiple people"
    }
  ],
  
  // 🔥 ALIAS for compatibility with StoryMissionTab
  story_missions: [
    {
      mission_id: 1,
      title: "Looking in the Mirror",
      title_en: "Looking in the Mirror",
      title_vi: "Nhìn Vào Gương",
      nova_greeting: "Hi! I'm Ms. Nova! How are you? Look in the mirror. What do you see?",
      default_hints: ["I", "am", "see", "face", "hair", "eyes"],
      context_en: "Ms. Nova asks you to look in a mirror and describe what you see.",
      context_vi: "Cô Nova yêu cầu bạn nhìn vào gương và miêu tả những gì bạn thấy.",
      target_vocab: ["tall", "short", "hair", "eyes", "face", "smile"],
      learning_focus: "Use 'I am' for qualities and 'I have' for features"
    },
    {
      mission_id: 2,
      title: "My Friend Tom",
      title_en: "My Friend Tom",
      title_vi: "Bạn Tôi Tom",
      nova_greeting: "Hello! Do you have a friend? Tell me about your friend. What does your friend look like?",
      default_hints: ["His", "name", "is", "He", "has", "friend"],
      context_en: "Ms. Nova asks you to describe your friend Tom. What does he look like?",
      context_vi: "Cô Nova yêu cầu bạn miêu tả bạn Tom. Cậu ấy trông như thế nào?",
      target_vocab: ["tall", "short", "hair", "eyes", "curly", "straight"],
      learning_focus: "Use 'He is' and 'He has' to describe others"
    },
    {
      mission_id: 3,
      title: "My Family Portraits",
      title_en: "My Family Portraits",
      title_vi: "Chân Dung Gia Đình",
      nova_greeting: "Hi again! I want to see your family photos. Tell me about your family. What do they look like?",
      default_hints: ["My", "mother", "father", "is", "has", "They"],
      context_en: "Ms. Nova asks you to describe your family members. What do they look like?",
      context_vi: "Cô Nova yêu cầu bạn miêu tả các thành viên gia đình. Họ trông như thế nào?",
      target_vocab: ["tall", "short", "long", "curly", "straight", "glasses"],
      learning_focus: "Practice 'is' vs 'has' with multiple people"
    }
  ],
  
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

