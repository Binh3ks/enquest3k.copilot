const week12RealData = {
  // === METADATA ===
  week_id: 12,
  phase: 1,
  block: "A",
  unit: 2,
  week_number: 12,
  
  // === OFFICIAL SYLLABUS DATA ===
  title: "Week 12: The Talent Show",
  week_title_en: "The Talent Show (Personal Abilities)",
  week_title_vi: "Cuộc Thi Tài Năng (Khả Năng Cá Nhân)",
  
  topic: "Skills and Adjectives - Using 'can' and 'can't' for abilities",
  topic_vi: "Kỹ năng và tính từ - Sử dụng 'can' và 'can't' cho khả năng",
  
  // === KEY LEARNING OUTCOME ===
  learning_outcome: "Express abilities using 'can' and 'can't'",
  learning_outcome_vi: "Diễn đạt khả năng bằng 'can' và 'can't'",
  
  // === GRAMMAR FOCUS ===
  grammar_focus: "Can / Can't (Abilities)",
  grammar_pattern: "[Subject] + can / can't + [Verb]",
  grammar_examples: [
    "I can sing a song.",
    "She can dance well.",
    "He can't ride a bike.",
    "They can swim fast."
  ],
  
  // === TARGET VOCABULARY (10 ACTION VERBS) ===
  target_vocab: [
    {
      word: "sing",
      pronunciation: "/sɪŋ/",
      definition_vi: "hát",
      definition_en: "to make music with your voice",
      example: "I can sing a song.",
      syllabus_context: "Talent show activities"
    },
    {
      word: "dance",
      pronunciation: "/dæns/",
      definition_vi: "nhảy",
      definition_en: "to move your body to music",
      example: "She can dance well.",
      syllabus_context: "Performance skills"
    },
    {
      word: "run",
      pronunciation: "/rʌn/",
      definition_vi: "chạy",
      definition_en: "to move fast with your legs",
      example: "He can run fast.",
      syllabus_context: "Physical abilities"
    },
    {
      word: "jump",
      pronunciation: "/dʒʌmp/",
      definition_vi: "nhảy",
      definition_en: "to push your body up into the air",
      example: "I can jump high.",
      syllabus_context: "Physical skills"
    },
    {
      word: "climb",
      pronunciation: "/klaɪm/",
      definition_vi: "leo",
      definition_en: "to go up something using your hands and feet",
      example: "She can climb trees.",
      syllabus_context: "Adventure activities"
    },
    {
      word: "draw",
      pronunciation: "/drɔː/",
      definition_vi: "vẽ",
      definition_en: "to make pictures with a pen or pencil",
      example: "He can draw pictures.",
      syllabus_context: "Creative skills"
    },
    {
      word: "ride",
      pronunciation: "/raɪd/",
      definition_vi: "đi (xe)",
      definition_en: "to sit on and control a bike or animal",
      example: "I can ride a bike.",
      syllabus_context: "Sports activities"
    },
    {
      word: "swim",
      pronunciation: "/swɪm/",
      definition_vi: "bơi",
      definition_en: "to move through water",
      example: "She can swim in the pool.",
      syllabus_context: "Water sports"
    },
    {
      word: "cook",
      pronunciation: "/kʊk/",
      definition_vi: "nấu ăn",
      definition_en: "to make food by heating it",
      example: "He can cook dinner.",
      syllabus_context: "Life skills"
    },
    {
      word: "play",
      pronunciation: "/pleɪ/",
      definition_vi: "chơi",
      definition_en: "to do an activity for fun",
      example: "They can play piano.",
      syllabus_context: "Musical abilities"
    }
  ],
  
  // === AI TUTOR CONFIGURATION ===
  aiTutorConfig: {
    character: {
      name: "Ms. Nova",
      role: "Talent Show Host",
      personality: "encouraging, enthusiastic, supportive",
      voice_model: "nova-2"
    },
    
    // === STORY MISSIONS ===
    story_missions: [
      {
        mission_id: 1,
        mission_title: "Skills Check",
        mission_title_vi: "Kiểm Tra Kỹ Năng",
        mission_objective: "Tell Ms. Nova what you CAN do for the talent show",
        mission_objective_vi: "Nói với cô Nova bạn CÓ THỂ làm gì cho cuộc thi tài năng",
        
        opening_narrative: "Welcome to the talent show! I'm Ms. Nova, your host today. We want to know what amazing things YOU can do! Can you tell me one thing you can do? For example, 'I can sing' or 'I can dance'.",
        
        phase_questions: [
          "What can you do? Tell me one skill!",
          "That's wonderful! Can you tell me HOW you do it? For example, 'I can sing well' or 'I can dance fast'.",
          "Amazing! Now tell me WHERE you usually do this. For example, 'I can sing at school' or 'I can dance at home'.",
          "Perfect! Last question: WHO do you do this with? For example, 'I can sing with my friends'."
        ],
        
        success_message: "Wonderful! You're ready for the talent show! I learned that you have an amazing skill. Keep practicing and you'll be a star!",
        target_grammar: ["can + verb"],
        required_vocab_count: 2
      },
      
      {
        mission_id: 2,
        mission_title: "My Favorite & Least Favorite",
        mission_title_vi: "Thích Nhất và Không Thích",
        mission_objective: "Share what you LIKE and DON'T LIKE to do",
        mission_objective_vi: "Chia sẻ điều bạn THÍCH và KHÔNG THÍCH làm",
        
        opening_narrative: "Now let's talk about your favorite activities! Everyone has things they love to do and things they don't enjoy. I want to hear about BOTH! Let's start with something you LIKE to do.",
        
        phase_questions: [
          "What do you LIKE to do? Tell me one activity you enjoy!",
          "That sounds fun! Now tell me something you DON'T LIKE to do.",
          "I understand! Can you tell me WHY you don't like it? Use 'because'.",
          "Last question: What would you rather do INSTEAD?"
        ],
        
        success_message: "Thank you for being honest! It's okay to have favorites and things we don't enjoy. Everyone is different and that's what makes us special!",
        target_grammar: ["I like + V-ing", "I don't like + V-ing"],
        required_vocab_count: 2
      },
      
      {
        mission_id: 3,
        mission_title: "Learn Something New",
        mission_title_vi: "Học Điều Mới",
        mission_objective: "Talk about what you WANT TO LEARN",
        mission_objective_vi: "Nói về điều bạn MUỐN HỌC",
        
        opening_narrative: "The best part about talent shows is LEARNING new things! I want to know: What skill do you WANT TO LEARN? Something you CAN'T do now, but WANT to learn in the future!",
        
        phase_questions: [
          "What skill do you WANT TO LEARN? Tell me one thing you can't do now.",
          "Great choice! WHY do you want to learn this? Tell me your reason.",
          "That's a good reason! WHO can teach you this skill?",
          "Perfect! WHEN will you start learning? Tell me your plan!"
        ],
        
        success_message: "I'm so excited for you! Learning new things is the best way to grow. Remember: everyone starts as a beginner. Keep trying and you WILL learn it!",
        target_grammar: ["want to + verb", "can't + verb"],
        required_vocab_count: 2
      }
    ],
    
    // === FREE TALK GAME TEMPLATES ===
    freeTalkGames: [
      {
        game_id: "word_chain",
        game_name: "Ability Word Chain",
        instructions: "Let's play word chain with action verbs! I say a verb (like 'sing'), then you say another verb that starts with the last letter (like 'give'). Use 'can' in your sentence!",
        example: "Nova: 'I can SING' → You: 'I can GIVE' → Nova: 'I can EXPLORE'",
        starter_words: ["sing", "dance", "run", "jump", "climb", "draw"]
      },
      {
        game_id: "twenty_questions",
        game_name: "Guess The Talent",
        instructions: "I'm thinking of a talent/skill. Ask me YES/NO questions to guess it! Use 'Can you...?' format.",
        example: "Student: 'Can you do it indoors?' → Nova: 'Yes!' → Student: 'Can you do it with music?'",
        possible_talents: ["singing", "dancing", "drawing", "cooking", "swimming", "playing piano"]
      },
      {
        game_id: "sentence_builder",
        game_name: "Build My Day",
        instructions: "Tell me 3 things you CAN do today, then 3 things you CAN'T do today. Use full sentences!",
        example: "I can run in the morning. I can draw after school. I can cook with Mom. I can't swim today (no pool). I can't climb (it's raining). I can't ride my bike (it's broken).",
        required_sentences: 6
      }
    ]
  },
  
  // === READING STORY ARC ===
  reading_story: {
    title: "The Amazing Talent Show",
    title_vi: "Cuộc Thi Tài Năng Tuyệt Vời",
    summary: "Students prepare for the school talent show by practicing their special skills",
    summary_vi: "Các bạn học sinh chuẩn bị cho cuộc thi tài năng trường bằng cách luyện tập các kỹ năng đặc biệt",
    
    story_sentences: [
      "Today is the big talent show.",
      "Emma can sing very well.",
      "She will sing her favorite song.",
      "Tom can dance to the music.",
      "He learned to dance from his sister.",
      "Maya can draw beautiful pictures.",
      "She will draw a picture on stage.",
      "Jake can play the piano.",
      "He practices every day after school.",
      "Lily can't sing, but she can cook!",
      "She will make cookies for everyone.",
      "Mia can swim very fast.",
      "She won a gold medal last year.",
      "Everyone has a special talent to share!"
    ]
  },
  
  // === GAME ADAPTATION ===
  game_templates: {
    word_chain: {
      starter_words: ["sing", "dance", "run", "jump", "climb", "draw"],
      difficulty: "medium",
      time_limit: 10
    },
    twenty_questions: {
      objects: ["singing", "dancing", "drawing", "cooking", "swimming", "playing piano"],
      max_questions: 20
    },
    sentence_builder: {
      patterns: [
        "I can [verb].",
        "She can [verb] well.",
        "He can't [verb].",
        "They can [verb] fast."
      ]
    }
  }
};

export default week12RealData;
