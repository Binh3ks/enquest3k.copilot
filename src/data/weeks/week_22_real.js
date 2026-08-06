const week22RealData = {
  week_id: 22,
  week_number: 22,
  title: "The Time Detective",
  weekTitle_en: "The Time Detective",
  weekTitle_vi: "Tham Tu Thoi Gian",
  topic: "Asking and answering past yes/no questions in detective interviews",
  topic_vi: "Dat va tra loi cau hoi yes/no trong qua khu theo boi canh tham tu",

  chunk_focus: [
    "solve a case",
    "step by step",
    "look for",
    "every clue",
    "at a time",
    "every answer",
    "last night",
    "What happened",
    "last week",
    "Little by little",
    "full story",
    "solve cases",
    "all over the world",
    "looks for",
    "official report",
    "do interviews",
    "what happened",
    "one question",
    "listen to",
    "piece of the puzzle"
  ],
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

      minimum_turns: 8,
      maximum_turns: 10
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

      minimum_turns: 8,
      maximum_turns: 10
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
      maximum_turns: 10
    }
  ],

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_guess_my_day',
      emoji: '🕵️',
      title: 'Guess My Day',
      bridge: 'The detective asked smart questions to figure out exactly what happened and when! 🔎',
      seed_question: 'Where did you go yesterday? Did you go to the park or stay home?',
      frames: [
        { template: 'I went to ___', follow_up_q: 'Where did you go? To the park or the school?', hints: ['the park', 'the school', 'the market'] },
        { template: 'I went to ___ with my family', follow_up_q: 'Where did you go and who was with you?', hints: ['the park', 'the mall', 'the beach'] },
        { template: 'I did ___ yesterday', follow_up_q: 'What did you do yesterday? Homework or exercise?', hints: ['homework', 'exercise', 'something fun'] },
        { template: 'I went to ___ and ate pho', follow_up_q: 'Where did you go and what did you eat?', hints: ['the restaurant', 'the market', 'the park'] },
        { template: 'I went to ___ but did not stay long', follow_up_q: 'Where did you go but what did you NOT do?', hints: ['the park', 'the market', 'school'] },
        { template: 'I went to ___ last weekend', follow_up_q: 'Where did you go last weekend?', hints: ['the zoo', 'the cinema', 'my grandma\'s house'] },
        { template: 'The best place I went was ___', follow_up_q: 'What was the best place you visited?', hints: ['the beach', 'the zoo', 'the park'] },
        { template: 'I went, I saw, and I ___', follow_up_q: 'What did you do? Go, see, and...?', hints: ['enjoyed everything', 'came home happy', 'felt excited'] }
      ],
      scaffold_frames: ['I woke up at ___', 'I went to ___', 'I was with ___'],
      vocab_focus: ['when', 'where', 'who', 'what', 'how long'],
      turns: 8,
    },
    {
      id: 'spark_best_week_ever',
      emoji: '📆',
      title: 'My Best Week Ever',
      bridge: "The detective discovered that last week was the BEST week of the character's whole life! 🌟",
      seed_question: 'What was your best week? Did you go somewhere special or do something amazing?',
      frames: [
        { template: 'My best week started when I went to ___', follow_up_q: 'What happened at the start of your best week?', hints: ['the zoo', 'the park', 'my friend\'s house'] },
        { template: 'I did ___ and it was amazing', follow_up_q: 'What did you do that was amazing?', hints: ['something new', 'a sport', 'a project'] },
        { template: 'I went to ___ and saw many animals', follow_up_q: 'Where did you go and what did you see?', hints: ['the zoo', 'the park', 'the market'] },
        { template: 'I did homework and then I went to ___', follow_up_q: 'What did you do after homework?', hints: ['the park', 'my friend\'s house', 'the cinema'] },
        { template: 'My favourite day was when I went to ___', follow_up_q: 'What was your favourite day last week?', hints: ['the zoo', 'a birthday party', 'my grandma\'s house'] },
        { template: 'I did ___ every day that week', follow_up_q: 'What did you do every day?', hints: ['something fun', 'exercise', 'read a book'] },
        { template: 'The best thing I did was ___', follow_up_q: 'What was the best thing you did?', hints: ['went to the zoo', 'had a party', 'met a new friend'] },
        { template: 'It was the best week because I went to ___', follow_up_q: 'Why was it the best week?', hints: ['the beach with my family', 'a new park for the first time', 'my favourite restaurant'] }
      ],
      scaffold_frames: ['My best week was when ___', 'Every day we ___', 'The best part was ___'],
      vocab_focus: ['best', 'special', 'amazing', 'we', 'together'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "did_you_find_a_clue",
      title: "Did You Find a Clue?",
      emoji: "D",
      theme: "Practicing Did questions with detective vocabulary",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Case notebook open! I am Detective Nova! First clue question - did you open any notebook or book yesterday? Say: Yes I opened my notebook yesterday or I opened my school book yesterday",
          options: ["Yes I opened my notebook yesterday", "I opened my school book yesterday"]
        },
        {
          ai: "Notebook clue found! Did you find anything interesting or unusual yesterday? Say: Yes I found something interesting yesterday or I found a clue at school yesterday",
          options: ["Yes I found something interesting yesterday", "I found a clue at school yesterday"]
        },
        {
          ai: "Interesting clue! Did someone ask you a question yesterday? Say: Yes someone asked me a question yesterday or My teacher asked me a question clearly",
          options: ["Yes someone asked me a question yesterday", "My teacher asked me a question clearly"]
        },
        {
          ai: "Question clue recorded! Did you answer clearly when someone asked you? Say: Yes I answered every question clearly or Yes I gave a clear answer",
          options: ["Yes I answered every question clearly", "Yes I gave a clear answer"]
        },
        {
          ai: "Clear answer noted! Did you notice or report anything unusual last week? Say: Yes I noticed something last week or I reported something interesting last week",
          options: ["Yes I noticed something last week", "I reported something interesting last week"]
        },
        {
          ai: "Last week clue found! Final question - did you write any answers or notes in your notebook yesterday? Say: Yes I wrote notes in my notebook or I recorded my answers yesterday",
          options: ["Yes I wrote notes in my notebook", "I recorded my answers yesterday"]
        }
      ],
      completion_message: "Case interview complete! Six perfect clues found! You answered every Did question clearly!"
    },
    {
      id: "case_notebook_report",
      title: "Case Notebook Report",
      emoji: "B",
      theme: "Building a case report using Did questions about yesterday",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Case report time! Notebook open! Did you ask anyone a question yesterday at school? Say: Yes I asked a question yesterday or I asked my teacher a question clearly",
          options: ["Yes I asked a question yesterday", "I asked my teacher a question clearly"]
        },
        {
          ai: "First report clue noted! Did you write any answers or record any notes last night? Say: Yes I wrote my notes last night or I recorded my answers last night",
          options: ["Yes I wrote my notes last night", "I recorded my answers last night"]
        },
        {
          ai: "Last night evidence recorded! Did anyone give you a clear answer yesterday that helped you? Say: Yes someone answered me clearly or My friend gave me a clear answer yesterday",
          options: ["Yes someone answered me clearly", "My friend gave me a clear answer yesterday"]
        },
        {
          ai: "Clear answer clue! Very important question - did you notice any clue or interesting fact last week? Say: Yes I noticed a clue last week or I found something interesting last week",
          options: ["Yes I noticed a clue last week", "I found something interesting last week"]
        },
        {
          ai: "Last week clue in the report! Final question - did you solve any question or problem correctly yesterday? Say: Yes I solved a question correctly yesterday or I answered all my questions yesterday",
          options: ["Yes I solved a question correctly yesterday", "I answered all my questions yesterday"]
        }
      ],
      completion_message: "Case notebook report complete! Every clue answered with Did questions! You are a brilliant time detective!"
    },
    {
      id: "family_case_file",
      title: "Family Case File",
      emoji: "F",
      theme: "Interviewing your family like a time detective with Did questions",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Family case file open! Notebook ready! First suspect: your mom! Did your mom answer any questions clearly yesterday? Say: Yes mom answered questions clearly or She gave clear answers yesterday",
          options: ["Yes mom answered questions clearly", "She gave clear answers yesterday"]
        },
        {
          ai: "Mom clue recorded! Did your mom open any book or notebook and start reading or writing last night? Say: Yes she opened her notebook last night or She started writing last night",
          options: ["Yes she opened her notebook last night", "She started writing last night"]
        },
        {
          ai: "Mom notebook clue found! Now dad interview! Did your dad report or describe anything interesting about last week? Say: Yes dad described last week clearly or He reported something interesting last week",
          options: ["Yes dad described last week clearly", "He reported something interesting last week"]
        },
        {
          ai: "Dad clue written! Did your whole family answer questions or share stories together last night? Say: Yes we answered questions together last night or We shared our day clearly",
          options: ["Yes we answered questions together last night", "We shared our day clearly"]
        },
        {
          ai: "Final family clue! Who asked the most questions in your family yesterday? Say: Mom asked the most questions yesterday or Dad asked the most questions yesterday",
          options: ["Mom asked the most questions yesterday", "Dad asked the most questions yesterday"]
        }
      ],
      completion_message: "Family case file complete! All family clues recorded with Did questions! Excellent detective investigation!"
    }
  ],
  freetalk_knowledge: {
    week_title: "The Time Detective",
    week_number: 22,
    theme: "Time detective interviews — asking and answering questions about past actions",

    knowledge_base: [
      "Detective vocabulary: clue, notebook, case, interview, investigate, discover, suspect, witness, evidence, solve",
      "Grammar: Past Simple Questions with Did",
      "Pattern: Did + subject + base verb? | Yes, subject did. / No, subject did not.",
      "Examples: Did you go to the park? Yes, I did. Did she eat breakfast? No, she did not.",
      "Important: Use BASE verb (not -ed) after Did",
      "Time detective investigates: when, where, who, what in the past",
      "Follow-up questions: What did you do next? Who did you see there?",
      "Useful phrases: I found a clue! I discovered that... The evidence shows..."
    ],

    example_opening_questions: [
      "Did you go anywhere special yesterday?",
      "Did you play with your friends after school?",
      "Did you watch a movie or TV show last night?",
      "Did you help your parents at home yesterday?",
      "Where did you go last weekend?",
      "What did you find interesting at school today?"
    ],

    // FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask" }
    ]
  },
};

export default week22RealData;
