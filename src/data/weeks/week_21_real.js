const week21RealData = {
  week_id: 21,
  week_number: 21,
  title: "Yesterday's Diary",
  weekTitle_en: "Yesterday's Diary",
  weekTitle_vi: "Nhat Ky Hom Qua",
  topic: "Talking about past actions using Past Simple Regular Verbs (-ed)",
  topic_vi: "Noi ve cac hanh dong trong qua khu su dung Dong tu Qua khu Don co quy tac (-ed)",
  theme: "Daily diary, yesterday activities, time detective agency",

  grammar_focus: "Past Simple Regular Verbs (-ed)",
  grammar_pattern: "Subject + verb(-ed) + object/place/time",
  grammar_examples: [
    "I walked to school yesterday.",
    "She cooked dinner last night.",
    "They played soccer after school.",
    "He cleaned his room in the evening.",
    "We watched TV for thirty minutes."
  ],

  target_vocab: [
    { word: "walked",   pronunciation: "/wOkt/",        definition_vi: "da di bo",       definition_en: "moved on foot from one place to another",               example: "I walked to school with my friend.",        syllabus_context: "Daily diary" },
    { word: "looked",   pronunciation: "/lUkt/",         definition_vi: "da nhin",        definition_en: "directed your eyes toward something to see it",         example: "I looked at the stars outside.",             syllabus_context: "Evening activity" },
    { word: "cooked",   pronunciation: "/kUkt/",         definition_vi: "da nau an",      definition_en: "prepared food using heat",                              example: "Mom cooked dinner for the whole family.",    syllabus_context: "Home activities" },
    { word: "played",   pronunciation: "/pleId/",        definition_vi: "da choi",        definition_en: "took part in a game or activity for fun",               example: "I played soccer at break time.",             syllabus_context: "School play" },
    { word: "watched",  pronunciation: "/wOtSt/",        definition_vi: "da xem",         definition_en: "looked at something for a period of time",              example: "I watched TV for thirty minutes.",           syllabus_context: "Evening activities" },
    { word: "cleaned",  pronunciation: "/kliEnd/",       definition_vi: "da don dep",     definition_en: "made something free of dirt or mess",                   example: "I cleaned my room after school.",            syllabus_context: "Chores" },
    { word: "helped",   pronunciation: "/hElpt/",        definition_vi: "da giup do",     definition_en: "gave assistance to someone",                            example: "I helped my mother with the shopping.",     syllabus_context: "Family life" },
    { word: "talked",   pronunciation: "/tOkt/",         definition_vi: "da noi chuyen",  definition_en: "spoke with someone in a conversation",                  example: "We talked about our homework on the way.",  syllabus_context: "Social interaction" },
    { word: "listened", pronunciation: "/lIs@nd/",       definition_vi: "da lang nghe",   definition_en: "paid attention to a sound",                             example: "I listened to the teacher carefully.",       syllabus_context: "School activity" },
    { word: "opened",   pronunciation: "/@Up@nd/",       definition_vi: "da mo",          definition_en: "moved something so it was no longer closed",            example: "I opened the door for my grandmother.",     syllabus_context: "Actions" },
    { word: "washed",   pronunciation: "/wOSt/",         definition_vi: "da rua",         definition_en: "cleaned something with water and soap",                 example: "I washed my hands before dinner.",           syllabus_context: "Daily hygiene" },
    { word: "finished", pronunciation: "/fInISt/",       definition_vi: "da hoan thanh",  definition_en: "completed something; came to the end of a task",        example: "I finished my homework at seven o clock.",   syllabus_context: "School tasks" },
    { word: "started",  pronunciation: "/stAErtId/",     definition_vi: "da bat dau",     definition_en: "began doing an activity",                               example: "I started my project in the morning.",       syllabus_context: "Time sequence" }
  ],

  global_vocab: ["walked", "looked", "cooked", "played", "watched", "cleaned", "helped", "talked", "listened", "opened", "washed", "finished", "started"],

  nova_instructions: {
    persona: "Enthusiastic diary detective who loves discovering what happened yesterday",
    tone: "Curious, encouraging, warm, detective-like",
    opening_lines_by_mission: {
      mission_1: "Hello diary detective! I found Max diary! What did Max do yesterday? Say: He walked to school or He played soccer!",
      mission_2: "Welcome back, detective! Now let us write YOUR diary! What did YOU do yesterday? Say: I walked to school or I played outside!",
      mission_3: "Hi detective! Let us interview your family! What did they do yesterday? Say: She cooked dinner or He cleaned the room!"
    },
    conversation_style: [
      "Warm diary-detective energy - discovering what happened like finding clues",
      "One clear question per turn",
      "Model regular past tense (-ed) in every response",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-12 turns per mission",
      "ONLY use regular -ed verbs - NOT irregular verbs",
      "Scaffold: Say: I walked... or I played..."
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct -ed form naturally",
    recast_example: {
      student: "I walk to school.",
      nova_recast: "Yes! I WALKED to school! Say: I walked to school. What did you do next?"
    },
    vocabulary_scaffolding: [
      "Mission 1: walked, talked, listened, played, watched - Max diary story",
      "Mission 2: cooked, cleaned, helped, washed, finished - your daily activities",
      "Mission 3: started, opened, looked, talked, helped - family diary interview"
    ],
    questioning_skill: [
      "What did you do yesterday?",
      "Did you walk or take the bus?",
      "Who did you help?",
      "What did you watch?",
      "When did you finish your homework?"
    ]
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Wow!", "Really?", "Interesting!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student key verb back in correct -ed form",
      "Fix grammar naturally without explanation",
      "Keep it detective-like and curious"
    ],
    question_patterns_allowed: [
      "What did you...?",
      "Did you...?",
      "Who did you...?",
      "Where did you...?",
      "When did you...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "I walk to school", tutor_response: "Nice! I WALKED to school! Say: I walked to school. Who did you walk with?" },
      { student: "play soccer", tutor_response: "Great! I PLAYED soccer! Say: I played soccer. When did you play?" },
      { student: "help mom", tutor_response: "Wow! I HELPED mom! Say: I helped my mom. What did you help with?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Max Diary - Yesterday Clues",
      title_en: "Max Diary - Yesterday Clues",
      title_vi: "Nhat Ky Cua Max - Manh Moi Hom Qua",
      theme: "Reading Max diary and discovering what he did yesterday",

      nova_greeting: "Hello diary detective! I found Detective Max diary from yesterday! Let us find all the clues!",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 21 Mission 1. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: Subject + verb-ed. VOCABULARY: walked, talked, listened, played, watched. STRICT FOCUS: REGULAR PAST TENSE ONLY. RECAST ERRORS: student says Max walk - model: Yes! Max WALKED! Say: He walked to school! Do NOT ask another question on the last turn.",

      target_vocab: ["walked", "talked", "listened", "played", "watched"],
      target_pattern: "Subject + verb(-ed) [+ object/time].",

      conversation_topics: [
        "Introduction: I found Max diary! (detective opener)",
        "Did Max walk to school? (morning routine)",
        "Who did Max talk to on the way? (social interaction)",
        "Did Max listen to the teacher? (school activity)",
        "What did Max play at break time? (play)",
        "Did Max wash his hands after playing? (hygiene)",
        "Did Max finish his schoolwork? (study)",
        "Did Max help someone at home? (family)",
        "Did Max watch TV in the evening? (evening routine)",
        "Did Max look at the stars? (nature element)"
      ],

      story_character: {
        name: "Detective Nova",
        personality: "curious, loves reading diaries and finding clues about the past",
        backstory: "I found Max diary in the Time Detective Agency! Let us read the entries and discover what he did yesterday!",
        speaking_style: "diary-reading detective, asks about entries, uses -ed patterns always",
        facts: {
          loves_diaries: true,
          finds_clues: true,
          reads_entries: true,
          favorite_phrase: "What did Max do?"
        },
        role: "Diary Detective reading Max yesterday entries"
      },

      opening_narrative: "Hello diary detective! Look! I found Max diary from yesterday! Let us read it together! The first entry says - Max was busy! Did Max walk to school? Say: Yes he walked to school or He walked with a friend",

      story_arc: [
        {
          phase: "morning_diary",
          turns: "1-5",
          phase_name: "Morning Diary Entries",
          focus: "verb-ed for morning activities",
          goal: "Student reads and reports what Max did in the morning",
          phase_questions: [
            "Great clue! He WALKED to school! Did Max talk to his friend on the way? Say: Yes he talked to his friend or They talked about homework",
            "Nice! They TALKED about homework! What did Max do at school? Did he listen to the teacher? Say: Yes he listened carefully or He listened and wrote notes",
            "Excellent! He LISTENED to the teacher! Did Max play soccer at break time? Say: Yes he played soccer or He played with his classmates",
            "Wow! He PLAYED soccer! Did he wash his hands after the game? Say: Yes he washed his hands or He always washed his hands",
            "Right! He WASHED his hands! Did Max finish his schoolwork before home time? Say: Yes he finished his work or He finished everything early"
          ]
        },
        {
          phase: "afternoon_diary",
          turns: "6-10",
          phase_name: "Afternoon Diary Entries",
          focus: "verb-ed for afternoon and evening",
          goal: "Student continues reading the diary for afternoon activities",
          phase_questions: [
            "Great! He FINISHED his work! Did Max help his teacher after school? Say: Yes he helped the teacher or He helped collect the books",
            "Wow! He HELPED the teacher! What did Max do at home? Did he clean his room? Say: Yes he cleaned his room or He cleaned and organized his desk",
            "Nice! He CLEANED his room! Did Max watch TV in the evening? Say: Yes he watched TV or He watched for thirty minutes",
            "Great clue! He WATCHED TV! What did Max do before going to bed? Did he look at the stars? Say: Yes he looked at the stars or He looked out the window",
            "Amazing! He LOOKED at the stars! Did Max start his diary before sleeping? Say: Yes he started his diary or He opened his notebook"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Diary Case Solved!",
          focus: "Summary and goodbye",
          goal: "Wrap up Max diary investigation",
          phase_questions: [
            "Amazing detective work! Tell me one last thing from the diary - what did Max do last before sleeping? Say: He finished his diary or He opened his notebook",
            "Case solved! Max had a wonderful day! He walked, talked, listened, played, and looked at the stars! Great diary detective work! Thank you for reading with me!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 2,
      id: 2,
      title: "Your Diary - Tell Me About Yesterday!",
      title_en: "Your Diary - Tell Me About Yesterday!",
      title_vi: "Nhat Ky Cua Ban - Ke Cho Toi Nghe Ve Hom Qua!",
      theme: "Writing your own diary entry about yesterday",

      nova_greeting: "Hello diary detective! Now it is YOUR turn! Let us write your diary about yesterday!",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 21 Mission 2. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: I + verb-ed. VOCABULARY: cooked, cleaned, helped, washed, finished. STRICT FOCUS: First-person PAST TENSE ONLY. RECAST ERRORS: student says I walk - model: Yes! I WALKED! Say: I walked to school! Do NOT ask another question on the last turn.",

      target_vocab: ["cooked", "cleaned", "helped", "washed", "finished"],
      target_pattern: "I + verb(-ed) [+ object/time].",

      conversation_topics: [
        "Introduction: Your diary starts now! (personal context)",
        "Did you walk to school? (morning transport)",
        "What did you do at school? (school activities)",
        "Did you finish your homework? (after school)",
        "Did you help at home? (chores)",
        "Did your family cook dinner? (family meal)",
        "Did you clean your room? (tidying up)",
        "Did you wash your hands? (hygiene habit)",
        "Did you watch something in the evening? (leisure)",
        "Closing: Your diary is amazing!"
      ],

      story_character: {
        name: "Detective Nova",
        personality: "warm, encouraging, genuinely interested in the student day",
        backstory: "Every detective keeps a diary! Let me help you write YOUR diary entry for yesterday!",
        speaking_style: "personal questions, first-person focus, warm and supportive",
        facts: {
          loves_personal_stories: true,
          encourages_sharing: true,
          celebrates_small_actions: true,
          favorite_question: "What did you do next?"
        },
        role: "Diary Detective helping student write their own diary"
      },

      opening_narrative: "Hello diary detective! Now it is YOUR turn! Let us write your diary! First - did you walk to school yesterday? Say: Yes I walked to school or I walked with my friend",

      story_arc: [
        {
          phase: "morning_you",
          turns: "1-5",
          phase_name: "Your Morning",
          focus: "I + verb-ed for morning activities",
          goal: "Student talks about their own morning activities",
          phase_questions: [
            "Nice! I WALKED to school! Did you talk to your friend on the way? Say: Yes I talked to my friend or I talked about the homework",
            "Great! I TALKED to my friend! What did you do at school? Did you listen to all your teachers? Say: Yes I listened carefully or I listened and wrote notes",
            "Well done! I LISTENED to my teachers! Did you play at break time? Say: Yes I played outside or I played with my classmates",
            "Amazing! I PLAYED outside! Did you wash your hands after playing? Say: Yes I washed my hands or I always washed my hands",
            "Perfect! I WASHED my hands! Did you finish all your schoolwork? Say: Yes I finished everything or I finished most of my schoolwork"
          ]
        },
        {
          phase: "afternoon_you",
          turns: "6-10",
          phase_name: "Your Afternoon",
          focus: "I + verb-ed for afternoon and home activities",
          goal: "Student talks about their afternoon and evening",
          phase_questions: [
            "Excellent! I FINISHED my schoolwork! When you got home, did you help with dinner? Say: Yes I helped cook dinner or I helped set the table",
            "Wonderful! I HELPED at home! Did your family cook dinner? Say: Yes mom cooked dinner or Yes dad cooked the rice",
            "Delicious! Someone COOKED dinner! Did you clean your room after dinner? Say: Yes I cleaned my room or I cleaned and organized my things",
            "Great job! I CLEANED my room! Did you watch TV or a video before bed? Say: Yes I watched TV or I watched a cartoon",
            "Fun! I WATCHED TV! Before bed, did you open your diary or look at anything? Say: Yes I looked at my books or I opened my diary"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Your Diary Is Complete!",
          focus: "Summary and celebration",
          goal: "Complete the student diary entry with praise",
          phase_questions: [
            "Your diary is almost done! What was the LAST thing you did before sleeping? Say: I started to sleep at nine or I finished reading",
            "Your diary is AMAZING! Yesterday you walked, talked, listened, helped, and finished your homework! That is a great day! You are a WONDERFUL diary detective!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 3,
      id: 3,
      title: "Family Diary Interview",
      title_en: "Family Diary Interview",
      title_vi: "Phong Van Nhat Ky Gia Dinh",
      theme: "Interviewing family members about what they did yesterday",

      nova_greeting: "Hello diary detective! Today we will interview your family! What did they do yesterday?",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 21 Mission 3. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: She/He + verb-ed. VOCABULARY: started, opened, looked, talked, helped. STRICT FOCUS: Third-person PAST TENSE ONLY. RECAST ERRORS: student says Mom cook - model: Yes! Mom COOKED! Say: She cooked rice! Do NOT ask another question on the last turn.",

      target_vocab: ["started", "opened", "looked", "talked", "helped"],
      target_pattern: "She/He + verb(-ed) [+ object/time].",

      conversation_topics: [
        "Introduction: Let us interview your family! (third person context)",
        "What did your mom do in the morning? (mom activities)",
        "Did your mom clean or cook? (mom chores)",
        "What did your dad do yesterday? (dad activities)",
        "Did your dad help at home? (dad helping)",
        "Who started dinner? (family cooking)",
        "Who opened the door when you came home? (family actions)",
        "Who did you talk to most yesterday? (family conversation)",
        "Who helped you with homework? (study support)",
        "Closing: Your family had a busy day!"
      ],

      story_character: {
        name: "Detective Nova",
        personality: "genuinely interested in Vietnamese family life, warm and inclusive",
        backstory: "Every diary detective needs to interview their family! Let me help you ask about THEIR yesterday!",
        speaking_style: "third-person questions, warm and family-focused, -ed patterns for she/he",
        facts: {
          loves_family_stories: true,
          asks_about_family: true,
          celebrates_family_activities: true,
          favorite_question: "What did she do next?"
        },
        role: "Diary Detective interviewing student family members"
      },

      opening_narrative: "Hello diary detective! Let us interview your family about yesterday! First - what did your mom do? Did she cook in the morning? Say: Yes she cooked breakfast or She started cooking early",

      story_arc: [
        {
          phase: "mom_interview",
          turns: "1-4",
          phase_name: "Interviewing Mom",
          focus: "She + verb-ed for mom activities",
          goal: "Student talks about mom yesterday activities",
          phase_questions: [
            "Nice! She COOKED breakfast! Did your mom walk anywhere? Say: Yes she walked to the market or She walked to the shop",
            "Interesting! She WALKED! Did your mom talk to the neighbors or anyone? Say: Yes she talked to them or She talked on the phone",
            "Great! She TALKED to the neighbors! Did your mom clean the house? Say: Yes she cleaned the house or She cleaned in the morning",
            "Wow! She CLEANED the house! Did your mom help you with homework? Say: Yes she helped me or She helped before dinner"
          ]
        },
        {
          phase: "dad_interview",
          turns: "5-8",
          phase_name: "Interviewing Dad",
          focus: "He + verb-ed for dad activities",
          goal: "Student talks about dad yesterday activities",
          phase_questions: [
            "Sweet! She HELPED you! Now let us ask about your dad! Did he start work early? Say: Yes he started work early or He worked all day",
            "Busy dad! He STARTED work early! Did your dad cook or help with dinner? Say: Yes he cooked rice or He helped wash the dishes",
            "Great teamwork! He HELPED with dinner! Did your dad open any books or look at anything? Say: Yes he looked at his phone or He opened a book",
            "Interesting! He LOOKED after dinner! Did your dad talk to you last night? Say: Yes he talked to me or He talked to the whole family"
          ]
        },
        {
          phase: "family_together",
          turns: "9-12",
          phase_name: "Family Together",
          focus: "Everyone + verb-ed for family activities",
          goal: "Student describes what the whole family did together",
          phase_questions: [
            "Wonderful! He TALKED to the family! What did your whole family do together? Say: We watched TV or We talked and laughed at dinner",
            "How lovely! Your family time together! Who finished last in your house? Say: Dad finished last or Mom finished last",
            "Perfect! Tell me one special thing your family did together yesterday! Say: We cooked together or We watched stars or We talked at dinner",
            "That is BEAUTIFUL! Your family cooked, talked, cleaned, helped, and finished the day together! That is the best diary entry of all! Thank you for sharing your family story, detective!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    }
  ],

  conversation_cards: [
    {
      id: "morning_detective",
      title: "Morning Detective",
      emoji: "D",
      theme: "Discovering What Happened in the Morning",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Hi! I am Nova! Let us find morning clues! Did you walk to school yesterday? Say: Yes I walked to school or I walked with my friend",
          options: ["Yes I walked to school", "I walked with my friend"]
        },
        {
          ai: "Nice clue! Did you talk to anyone on the way? Say: Yes I talked to my friend or I talked to my neighbor",
          options: ["Yes I talked to my friend", "I talked to my neighbor"]
        },
        {
          ai: "Interesting! Did you listen to the teacher at school? Say: Yes I listened carefully or I listened and wrote notes",
          options: ["Yes I listened carefully", "I listened and wrote notes"]
        },
        {
          ai: "Great! Did you play outside at break time? Say: Yes I played outside or I played with my classmates",
          options: ["Yes I played outside", "I played with my classmates"]
        },
        {
          ai: "Exciting! Did you wash your hands after playing? Say: Yes I washed my hands or I always washed my hands",
          options: ["Yes I washed my hands", "I always washed my hands"]
        },
        {
          ai: "Perfect habit! Did you finish your schoolwork? Say: Yes I finished everything or I finished before lunch",
          options: ["Yes I finished everything", "I finished before lunch"]
        }
      ],
      completion_message: "Amazing morning detective work! You used -ed verbs perfectly!"
    },
    {
      id: "afternoon_diary",
      title: "Afternoon Diary",
      emoji: "B",
      theme: "Recording Afternoon Activities",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Let us write your afternoon diary! When you got home, did you start your homework? Say: Yes I started homework right away or I started after a snack",
          options: ["Yes I started homework right away", "I started after a snack"]
        },
        {
          ai: "Hard worker! Did you help at home? Say: Yes I helped mom or I helped clean the kitchen",
          options: ["Yes I helped mom", "I helped clean the kitchen"]
        },
        {
          ai: "Helpful! Did your mom cook dinner? Say: Yes she cooked dinner or She cooked rice and vegetables",
          options: ["Yes she cooked dinner", "She cooked rice and vegetables"]
        },
        {
          ai: "Delicious! Did you clean your room after dinner? Say: Yes I cleaned my room or I cleaned and organized my things",
          options: ["Yes I cleaned my room", "I cleaned and organized my things"]
        },
        {
          ai: "Tidy! Did you watch TV in the evening? Say: Yes I watched TV or I watched a cartoon",
          options: ["Yes I watched TV", "I watched a cartoon"]
        }
      ],
      completion_message: "Your afternoon diary is complete! Great -ed verb detective!"
    },
    {
      id: "family_activities",
      title: "Family Activities",
      emoji: "F",
      theme: "Sharing What Your Family Did Yesterday",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Tell me about your family yesterday! What did your mom do? Say: She cooked dinner or She cleaned the house",
          options: ["She cooked dinner", "She cleaned the house"]
        },
        {
          ai: "Busy mom! Did your dad help at home? Say: Yes he helped with dinner or He washed the dishes",
          options: ["Yes he helped with dinner", "He washed the dishes"]
        },
        {
          ai: "Teamwork! Did your family talk together at dinner? Say: Yes we talked at dinner or We talked about our day",
          options: ["Yes we talked at dinner", "We talked about our day"]
        },
        {
          ai: "Lovely! Did anyone look at the stars last night? Say: Yes I looked at the stars or We looked at the sky together",
          options: ["Yes I looked at the stars", "We looked at the sky together"]
        },
        {
          ai: "Magical! Who finished last in your family? Say: Dad finished last or Mom finished last",
          options: ["Dad finished last", "Mom finished last"]
        }
      ],
      completion_message: "Beautiful family diary! Your family worked together wonderfully!"
    }
  ]
};

export default week21RealData;
