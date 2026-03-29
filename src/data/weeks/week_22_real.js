const week22RealData = {
  week_id: 22,
  week_number: 22,
  title: "The Time Detective",
  weekTitle_en: "The Time Detective",
  weekTitle_vi: "Tham Tu Thoi Gian",
  topic: "Asking and answering past yes/no questions in detective interviews",
  topic_vi: "Dat va tra loi cau hoi yes/no trong qua khu theo boi canh tham tu",
  theme: "Time detective interviews, past clues, yesterday actions",

  grammar_focus: "Past Simple Questions with Did",
  grammar_pattern: "Did + subject + base verb? | Yes, subject did. / No, subject didn't.",
  grammar_examples: [
    "Did Detective Nova open her notebook yesterday?",
    "Did the suspect answer clearly last night?",
    "The detective recorded every clue in the report.",
    "Nova asked one clear question at a time.",
    "Did the suspect report anything about last week?"
  ],

  target_vocab: [
    { word: "yesterday",  pronunciation: "/jEs.t@.deI/",  definition_vi: "hom qua",        definition_en: "the day before today",                                  example: "I walked to school yesterday.",              syllabus_context: "Time expression" },
    { word: "last night", pronunciation: "/lAEst naIt/",  definition_vi: "toi qua",        definition_en: "the night before today",                                example: "She watched TV last night.",                 syllabus_context: "Time expression" },
    { word: "last week",  pronunciation: "/lAEst wiEk/",  definition_vi: "tuan truoc",     definition_en: "the week before this week",                             example: "We played soccer last week.",                syllabus_context: "Time expression" },
    { word: "interview", pronunciation: "/In.t@.vjuE/",   definition_vi: "cuoc phong van", definition_en: "a meeting where someone asks another person questions",  example: "Detective Nova started the interview.",      syllabus_context: "Detective case" },
    { word: "detective", pronunciation: "/dI.tEk.tIv/",   definition_vi: "tham tu",        definition_en: "a person who finds answers by asking questions",         example: "The detective opened her notebook.",         syllabus_context: "Detective case" },
    { word: "clue",      pronunciation: "/kluE/",          definition_vi: "manh moi",       definition_en: "a fact that helps you find the answer",                 example: "Nova found a clue in the case file.",        syllabus_context: "Detective case" },
    { word: "notebook",  pronunciation: "/n@Ut.bUk/",     definition_vi: "so tay",         definition_en: "a small book you write notes in",                       example: "She wrote every clue in her notebook.",      syllabus_context: "Detective tool" },
    { word: "clearly",   pronunciation: "/klI@.liE/",     definition_vi: "ro rang",        definition_en: "in a way that is easy to understand",                   example: "Max answered clearly every question.",       syllabus_context: "Communication" },
    { word: "case",      pronunciation: "/keIs/",          definition_vi: "vu an",          definition_en: "a mystery or problem a detective must solve",            example: "Nova closed the case after the interview.",  syllabus_context: "Detective case" },
    { word: "report",    pronunciation: "/rI.pOEt/",      definition_vi: "bao cao",        definition_en: "a written record of facts and findings",                example: "She finished her report about yesterday.",   syllabus_context: "Detective tool" },
    { word: "question",  pronunciation: "/kwEs.tS@n/",    definition_vi: "cau hoi",        definition_en: "something you ask to get information",                  example: "The detective asked one question at a time.", syllabus_context: "Interview" },
    { word: "answer",    pronunciation: "/AEn.s@/",       definition_vi: "cau tra loi",    definition_en: "what you say when asked a question",                    example: "Max gave a clear answer to each question.",  syllabus_context: "Interview" },
    { word: "suspect",   pronunciation: "/sVs.pEkt/",     definition_vi: "nghi can",       definition_en: "a person the detective wants to ask questions",          example: "Max was the first suspect in the case.",    syllabus_context: "Detective case" }
  ],

  global_vocab: ["yesterday", "last night", "last week", "interview", "detective", "clue", "notebook", "clearly", "case", "report", "question", "answer", "suspect"],

  nova_instructions: {
    persona: "Enthusiastic time detective who solves yesterday case files",
    tone: "Curious, encouraging, warm, detective-like",
    opening_lines_by_mission: {
      mission_1: "Case file open! I found Max detective notebook! Did Max answer questions clearly yesterday? Say: Yes he answered clearly or He reported the clue!",
      mission_2: "Welcome back, detective! Now let us build YOUR personal case report! Did you answer questions clearly yesterday? Say: Yes I answered clearly or I recorded my clues!",
      mission_3: "Hi detective! Let us interview your family! Did anyone in your family answer questions about last night? Say: Yes she answered clearly or He reported about last week!"
    },
    conversation_style: [
      "Warm time-detective energy - discovering what happened like finding clues",
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
      student: "Nova open the notebook.",
      nova_recast: "Yes! Nova OPENED the notebook! Say: Nova opened her notebook. What was the first clue?"
    },
    vocabulary_scaffolding: [
      "Mission 1: detective, clue, notebook, case, interview - Max detective case file vocabulary",
      "Mission 2: suspect, question, answer, clearly, report - personal detective report vocabulary",
      "Mission 3: yesterday, last night, last week, interview, case - time detective family vocabulary"
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
      { student: "Nova open the notebook", tutor_response: "Nice! Nova OPENED the notebook! Say: She opened her notebook. What was the first clue?" },
      { student: "the suspect answer clearly", tutor_response: "Great! The suspect ANSWERED clearly! Say: The suspect answered clearly. What was the answer?" },
      { student: "Nova record the clue", tutor_response: "Wow! Nova RECORDED the clue! Say: Nova recorded the clue. What happened next?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Max Case File - Yesterday Clues",
      title_en: "Max Case File - Yesterday Clues",
      title_vi: "Ho So Cua Max - Manh Moi Hom Qua",
      theme: "Reading Max case file and discovering what he did yesterday",

      nova_greeting: "Hello time detective! I found Max case file from yesterday! Let us find all the clues!",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 22 Mission 1. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: Subject + verb-ed. VOCABULARY: walked, talked, listened, played, watched. STRICT FOCUS: REGULAR PAST TENSE ONLY. RECAST ERRORS: student says Max walk - model: Yes! Max WALKED! Say: He walked to school! Do NOT ask another question on the last turn.",

      target_vocab: ["detective", "clue", "notebook", "case", "interview"],
      target_pattern: "Subject + verb(-ed) [+ detective object/time].",

      conversation_topics: [
        "Introduction: Case file open! Nova has a detective notebook! (detective opener)",
        "Did Max open his notebook during the interview? (notebook clue)",
        "Did Nova ask Max one clear question? (question clue)",
        "Did Max answer each question clearly? (clearly clue)",
        "Did Nova record each answer as a clue? (clue recording)",
        "Did the suspect give Nova an important case clue? (case clue)",
        "Did Nova ask about last night? (last night clue)",
        "Did Max report anything about last week? (last week clue)",
        "Did Nova record all answers in the report? (report)",
        "Did Nova close the case notebook? (case closed)"
      ],

      story_character: {
        name: "Detective Nova",
        personality: "curious, loves checking case files and finding clues about the past",
        backstory: "I found Max case file in the Time Detective Agency! Let us read the entries and discover what he did yesterday!",
        speaking_style: "case-reading detective, asks about timeline entries, uses -ed patterns always",
        facts: {
          loves_casefiles: true,
          finds_clues: true,
          checks_timeline: true,
          favorite_phrase: "What did Max do?"
        },
        role: "Time Detective reading Max yesterday case entries"
      },

      opening_narrative: "Case notebook open! I am Detective Nova and I have a new case! First question for my suspect - did Max open his notebook during the detective interview? Say: Yes Max opened his notebook or He opened the case file yesterday",

      story_arc: [
        {
          phase: "morning_casefile",
          turns: "1-5",
          phase_name: "Opening the Case File",
          focus: "detective, notebook, interview, question, clue",
          goal: "Student reads Max case file and discovers detective interview clues",
          phase_questions: [
            "Notebook open! Did Detective Nova start the interview by asking one clear question? Say: Yes she started the interview or She asked the first question clearly",
            "Interview started! Did Max answer each question clearly? Say: Yes Max answered clearly or He answered every question clearly and carefully",
            "Clear answers! Did Nova record each answer as a new clue in her notebook? Say: Yes she recorded each clue or She added each answer to the case notebook",
            "Notebook filling up! Did the suspect give Nova an important clue about the case? Say: Yes the suspect gave a clue or Max gave Nova the important case clue",
            "First clues found! Did Nova start reporting what she discovered for the case? Say: Yes she started the report or She began recording the case report"
          ]
        },
        {
          phase: "afternoon_casefile",
          turns: "6-10",
          phase_name: "Discovering More Clues",
          focus: "yesterday, last night, last week, report, case",
          goal: "Student discovers time-based case clues",
          phase_questions: [
            "Morning case recorded! Did Max answer questions about last night? Say: Yes Max answered about last night or He reported about last night clearly",
            "Last night clue! Did the suspect also report something about last week? Say: Yes the suspect answered about last week or He described last week in the interview",
            "Last week evidence! Did Nova write every answer in her detective report? Say: Yes she recorded everything or Nova added every answer to the report",
            "Report in progress! Did Nova ask the suspect one final clear question? Say: Yes she asked a final question or She recorded the last case question",
            "Final clue! Did Detective Nova solve the case with all the notebook clues? Say: Yes she solved the case or Nova finished the interview and closed the case"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Case File Closed!",
          focus: "Summary and goodbye",
          goal: "Wrap up Max case file investigation",
          phase_questions: [
            "One last clue needed! Did the suspect answer one final question about the case? Say: The suspect answered clearly or He gave Nova one last important clue",
            "Case file closed! Max opened his notebook, answered every question clearly, Nova recorded every clue, and the report is complete! You are a brilliant time detective!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 2,
      id: 2,
      title: "Your Case Report - What Did YOU Do?",
      title_en: "Your Case Report - What Did YOU Do?",
      title_vi: "Ho So Cua Ban - Ban Da Lam Gi?",
      theme: "Building your personal case report about yesterday",

      nova_greeting: "Hello time detective! Now it is YOUR turn! Let us build your case report about yesterday!",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 22 Mission 2. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: I + verb-ed. VOCABULARY: cooked, cleaned, helped, washed, finished. STRICT FOCUS: First-person PAST TENSE ONLY. RECAST ERRORS: student says I walk - model: Yes! I WALKED! Say: I walked to school! Do NOT ask another question on the last turn.",

      target_vocab: ["suspect", "question", "answer", "clearly", "report"],
      target_pattern: "I + verb(-ed) [+ detective object/time].",

      conversation_topics: [
        "Introduction: Your detective notebook is open! (personal context)",
        "Did you answer any questions clearly yesterday? (clearly)",
        "Did you open your notebook or school book yesterday? (notebook)",
        "Did you ask someone a question yesterday? (question)",
        "Did you record or write notes yesterday? (record)",
        "Did you answer about last night? (last night)",
        "Did you open your notebook last night? (last night notebook)",
        "Did you notice anything about last week? (last week)",
        "Did your report turn out clearly? (report)",
        "Closing: Your detective report is complete!"
      ],

      story_character: {
        name: "Detective Nova",
        personality: "warm, encouraging, genuinely interested in the student day",
        backstory: "Every detective writes a case report! Let me help you build YOUR case report for yesterday!",
        speaking_style: "personal questions, first-person focus, warm and supportive",
        facts: {
          loves_personal_stories: true,
          encourages_sharing: true,
          celebrates_small_actions: true,
          favorite_question: "What did you do next?"
        },
        role: "Time Detective interviewing student to build their personal case report"
      },

      opening_narrative: "Your detective notebook is open! Now I need to build your personal case report! First question - did you answer any questions clearly yesterday? Say: Yes I answered questions clearly or I answered my teacher clearly yesterday",

      story_arc: [
        {
          phase: "morning_you",
          turns: "1-5",
          phase_name: "Your Morning Case Report",
          focus: "I + verb-ed with detective vocabulary",
          goal: "Student talks about their own activities using W22 detective words",
          phase_questions: [
            "First clue for your report! Did you open your notebook yesterday morning? Say: Yes I opened my notebook or I opened my school book yesterday",
            "Notebook open! Did you ask anyone a question yesterday at school? Say: Yes I asked a question yesterday or I asked my teacher a question clearly",
            "Question clue noted! Did you answer all your questions clearly yesterday? Say: Yes I answered clearly or I answered every question the teacher asked",
            "Clear answers recorded! Did you write or record any notes in your notebook yesterday? Say: Yes I recorded my notes or I started writing in my notebook",
            "Notes recorded! Did you report anything interesting about your morning yesterday? Say: Yes I reported to my friend or I described my morning clearly"
          ]
        },
        {
          phase: "afternoon_you",
          turns: "6-10",
          phase_name: "Your Afternoon Case Report",
          focus: "I + verb-ed with time detective clues",
          goal: "Student talks using last night, last week, report, case vocabulary",
          phase_questions: [
            "Great morning case report! Did you answer any questions about last night? Say: Yes I answered questions about last night or I described last night clearly",
            "Last night clue! Did you open your notebook or diary last night? Say: Yes I opened my notebook last night or I started writing last night",
            "Notebook opened! Did you notice anything interesting and report it last week? Say: Yes I noticed something last week or I reported about last week",
            "Last week evidence! Did your detective report turn out clearly written? Say: Yes my report is clear or I answered every question completely",
            "Report ready! Did you close your notebook last night after recording your clues? Say: Yes I closed my notebook or I finished recording last night"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Your Case Report Complete!",
          focus: "Summary and celebration",
          goal: "Complete the student detective case report with praise",
          phase_questions: [
            "Your detective report is almost done! What was the last clue you added? Say: I answered the last question or I recorded the final clue clearly",
            "Your case report is AMAZING! You opened your notebook, answered every question clearly, recorded your clues, and finished your report! You are a WONDERFUL time detective!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 3,
      id: 3,
      title: "Family Case Interview",
      title_en: "Family Case Interview",
      title_vi: "Phong Van Ho So Gia Dinh",
      theme: "Interviewing family members about what they did yesterday",

      nova_greeting: "Hello time detective! Today we will interview your family! What did they do yesterday?",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 22 Mission 3. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. GRAMMAR FOCUS: She/He + verb-ed. VOCABULARY: started, opened, looked, talked, helped. STRICT FOCUS: Third-person PAST TENSE ONLY. RECAST ERRORS: student says Mom cook - model: Yes! Mom COOKED! Say: She cooked rice! Do NOT ask another question on the last turn.",

      target_vocab: ["yesterday", "last night", "last week", "interview", "case"],
      target_pattern: "She/He + verb(-ed) [+ detective object/time].",

      conversation_topics: [
        "Introduction: Family interview open! Open the detective notebook! (third person context)",
        "Did your mom answer questions clearly yesterday? (mom answers)",
        "Did your mom open any notebook or book yesterday? (mom notebook)",
        "Did your mom report anything about last week? (mom last week)",
        "Did your mom answer your questions clearly? (mom clearly)",
        "Did your dad answer questions about last night? (dad last night)",
        "Did your dad open his notebook or workspace last night? (dad notebook)",
        "Did your dad report anything about last week? (dad last week)",
        "Did the whole family answer together? (family together)",
        "Closing: Family case interview complete!"
      ],

      story_character: {
        name: "Detective Nova",
        personality: "genuinely interested in Vietnamese family life, warm and inclusive",
        backstory: "Every time detective needs to interview their family! Let me help you ask about THEIR yesterday!",
        speaking_style: "third-person questions, warm and family-focused, -ed patterns for she/he",
        facts: {
          loves_family_stories: true,
          asks_about_family: true,
          celebrates_family_activities: true,
          favorite_question: "What did she do next?"
        },
        role: "Time Detective interviewing student about family activities yesterday"
      },

      opening_narrative: "Family detective interview starting now! Open your notebook detective! First - did your mom answer any questions about her day yesterday? Say: Yes my mom answered questions yesterday or She answered clearly about her day",

      story_arc: [
        {
          phase: "mom_interview",
          turns: "1-4",
          phase_name: "Interviewing Mom",
          focus: "She + verb-ed with detective time vocabulary",
          goal: "Student talks about mom using detective case vocabulary",
          phase_questions: [
            "Mom clue noted! Did your mom open any notebook or start reading something yesterday? Say: Yes she opened a book or She started reading yesterday",
            "Mom reading noted! Did your mom answer your questions clearly when you asked her? Say: Yes she answered me clearly or She gave a clear answer",
            "Mom answer recorded! Did your mom report anything about last week to the family? Say: Yes she reported about last week or She described last week to us",
            "Mom last week clue! Did your mom notice anything interesting about yesterday and describe it clearly? Say: Yes she noticed something interesting or She answered clearly about it"
          ]
        },
        {
          phase: "dad_interview",
          turns: "5-8",
          phase_name: "Interviewing Dad",
          focus: "He + verb-ed with detective time vocabulary",
          goal: "Student talks about dad using detective case vocabulary",
          phase_questions: [
            "Mom interview complete! Now the dad interview! Did your dad answer any questions about last night? Say: Yes he answered questions last night or He reported about last night",
            "Dad last night clue! Did your dad open his notebook or start working last night? Say: Yes he opened his notebook or He started working last night",
            "Dad work noted! Did your dad report anything interesting about last week? Say: Yes he reported something last week or He described last week clearly",
            "Dad last week clue! Did your dad ask you a clear question yesterday? Say: Yes he asked me clearly or He questioned me about yesterday"
          ]
        },
        {
          phase: "family_together",
          turns: "9-12",
          phase_name: "Family Case File Together",
          focus: "Everyone + verb-ed for family case activities",
          goal: "Student describes what the whole family did using detective vocabulary",
          phase_questions: [
            "Amazing family interview! Did your whole family answer questions clearly together yesterday? Say: Yes we answered together or We all answered the questions clearly",
            "Family answers recorded! Did anyone in your family open a notebook or start recording notes last night? Say: Yes someone opened a notebook or Someone started taking notes",
            "Family evidence! Did someone in your family report something interesting about last week? Say: Yes someone reported about last week or We talked about last week clearly",
            "Your family case interview is COMPLETE! Your family answered clearly, opened their notebooks, reported clues, and you recorded everything! Brilliant family detective work!"
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
      theme: "Opening a Case File About Your Morning",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Case notebook open! I am Detective Nova and you are my suspect today! First clue question - did you see or find anything interesting yesterday? Say: Yes I found something interesting yesterday or I discovered a clue yesterday",
          options: ["Yes I found something interesting yesterday", "I discovered a clue yesterday"]
        },
        {
          ai: "First clue recorded in my notebook! Now tell me about last night - did anything unusual happen last night? Say: Yes something happened last night or Last night was quiet and normal",
          options: ["Yes something happened last night", "Last night was quiet and normal"]
        },
        {
          ai: "Last night clue noted! I need a clear answer now - did Detective Nova or a teacher ask you a question yesterday? Say: Yes someone asked me a question yesterday or My teacher asked me a question yesterday",
          options: ["Yes someone asked me a question yesterday", "My teacher asked me a question yesterday"]
        },
        {
          ai: "Question clue confirmed! Think about last week - did you find or report any problem or clue last week? Say: Yes I found a clue last week or I reported a problem last week",
          options: ["Yes I found a clue last week", "I reported a problem last week"]
        },
        {
          ai: "Report clue written! Now I need your clearest answer - did you write anything in your notebook or make any notes yesterday? Say: Yes I wrote in my notebook yesterday or I made notes about the case yesterday",
          options: ["Yes I wrote in my notebook yesterday", "I made notes about the case yesterday"]
        },
        {
          ai: "Final case question! You have been a great suspect! Can you give me one clear answer to close this case - are you innocent? Say: Yes I am innocent and my answer is clear or I gave all my clues and I am innocent",
          options: ["Yes I am innocent and my answer is clear", "I gave all my clues and I am innocent"]
        }
      ],
      completion_message: "Morning case file complete! Six perfect clues recorded. You are a true time detective!"
    },
    {
      id: "afternoon_case_interview",
      title: "Afternoon Case Interview",
      emoji: "B",
      theme: "Detective Interview About Your Afternoon",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Afternoon case interview started! I am opening my notebook now. When you got home, did you start your homework right away? Say: Yes I started right away or I started after a snack",
          options: ["Yes I started right away", "I started after a snack"]
        },
        {
          ai: "Clue one written! Next question for my report - did you help at home this afternoon? Say: Yes I helped my mom or I helped set the table",
          options: ["Yes I helped my mom", "I helped set the table"]
        },
        {
          ai: "Family clue found! Very important evidence - did your family cook dinner last night? Say: Yes mom cooked dinner or She cooked rice and vegetables",
          options: ["Yes mom cooked dinner", "She cooked rice and vegetables"]
        },
        {
          ai: "Dinner clue recorded in the notebook! Did you clean anything after dinner? Say: Yes I cleaned my room or I cleaned the table",
          options: ["Yes I cleaned my room", "I cleaned the table"]
        },
        {
          ai: "Final afternoon clue! Did you watch TV or relax before bed last night? Say: Yes I watched TV or I watched a cartoon",
          options: ["Yes I watched TV", "I watched a cartoon"]
        }
      ],
      completion_message: "Afternoon case interview complete! Five perfect clues recorded in my notebook!"
    },
    {
      id: "family_case_file",
      title: "Family Case File",
      emoji: "F",
      theme: "Interviewing Your Family Like a Time Detective",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Family case file open! Notebook ready! What did your mom do yesterday morning? Say: She cooked breakfast or She cleaned the house",
          options: ["She cooked breakfast", "She cleaned the house"]
        },
        {
          ai: "Mom clue recorded! Did your mom go anywhere yesterday? Say: Yes she walked to the market or She stayed at home",
          options: ["Yes she walked to the market", "She stayed at home"]
        },
        {
          ai: "Excellent evidence! Now the dad interview - what did your dad do last night? Say: He watched TV or He helped with homework",
          options: ["He watched TV", "He helped with homework"]
        },
        {
          ai: "Dad clue written in my notebook! Did your family talk together at dinner last night? Say: Yes we talked at dinner or We talked about our day",
          options: ["Yes we talked at dinner", "We talked about our day"]
        },
        {
          ai: "Final family clue! Who finished their work last in your family yesterday? Say: Dad finished last or Mom finished last",
          options: ["Dad finished last", "Mom finished last"]
        }
      ],
      completion_message: "Family case file complete! All family clues recorded. Excellent detective investigation!"
    }
  ]
};

export default week22RealData;
