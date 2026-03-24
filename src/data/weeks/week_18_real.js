const week18RealData = {
  weekId: 18,
  week_number: 18,
  title: "The Live Reporter",
  weekTitle_en: "The Live Reporter",
  weekTitle_vi: "Phóng Viên Trực Tiếp",
  topic: "Describing what is happening using Present Continuous",
  topic_vi: "Mô tả những gì đang xảy ra bằng thì Hiện tại tiếp diễn",
  theme: "Being a live reporter and describing scenes using am/is/are + verb-ing",

  grammar_focus: "Present Continuous: I am + verb-ing / She is + verb-ing / They are + verb-ing.",
  grammar_pattern: "[Subject] + am/is/are + [verb]-ing.",
  grammar_examples: [
    "I am describing the scene right now.",
    "She is holding a microphone.",
    "They are watching the live news.",
    "Alex is interviewing Maya.",
    "The cat is sleeping on the sofa."
  ],

  target_vocab: [
    { word: "reporter",    pronunciation: "/rɪˈpɔːrtər/",    definition_vi: "phóng viên",         definition_en: "a person who tells the news",                              example: "Alex is a reporter at school.",               syllabus_context: "Media / Reporter role" },
    { word: "camera",      pronunciation: "/ˈkæmərə/",       definition_vi: "máy quay / máy ảnh", definition_en: "a device for taking pictures or video",                    example: "She is holding a camera.",                   syllabus_context: "News equipment" },
    { word: "microphone",  pronunciation: "/ˈmaɪkrəfoʊn/",  definition_vi: "micro",               definition_en: "a device that makes your voice louder",                    example: "He is speaking into a microphone.",           syllabus_context: "News equipment" },
    { word: "news",        pronunciation: "/njuːz/",          definition_vi: "tin tức",             definition_en: "information about what is happening",                      example: "I am watching the news right now.",           syllabus_context: "Media" },
    { word: "live",        pronunciation: "/laɪv/",           definition_vi: "trực tiếp",           definition_en: "happening right now, not recorded",                        example: "This is live news!",                          syllabus_context: "Media" },
    { word: "describe",    pronunciation: "/dɪˈskraɪb/",     definition_vi: "mô tả",               definition_en: "use words to explain what you see",                        example: "I am describing the exciting scene.",         syllabus_context: "Language skill" },
    { word: "scene",       pronunciation: "/siːn/",           definition_vi: "khung cảnh",          definition_en: "a view or situation to describe",                          example: "He is filming the scene outside.",            syllabus_context: "Reporter vocabulary" },
    { word: "studio",      pronunciation: "/ˈstjuːdioʊ/",   definition_vi: "trường quay",         definition_en: "a room where TV shows are made",                           example: "They are working in the studio.",             syllabus_context: "Media" },
    { word: "report",      pronunciation: "/rɪˈpɔːrt/",      definition_vi: "bản tin / báo cáo",   definition_en: "to tell about an event in detail",                         example: "She is giving a live report.",                syllabus_context: "Media" },
    { word: "exciting",    pronunciation: "/ɪkˈsaɪtɪŋ/",    definition_vi: "hào hứng",            definition_en: "makes you feel happy and interested",                      example: "The news is so exciting today!",              syllabus_context: "Emotions / Adjective" },
    { word: "happening",   pronunciation: "/ˈhæpənɪŋ/",     definition_vi: "đang xảy ra",         definition_en: "taking place right now",                                   example: "Look at what is happening in Room 5!",        syllabus_context: "Present Continuous" },
    { word: "audience",    pronunciation: "/ˈɔːdiəns/",      definition_vi: "khán giả",            definition_en: "people watching a show or performance",                    example: "The audience is cheering for Alex.",          syllabus_context: "Media" },
    { word: "interview",   pronunciation: "/ˈɪntərvjuː/",   definition_vi: "phỏng vấn",           definition_en: "ask someone questions to learn more",                      example: "Alex is interviewing his friend Maya.",       syllabus_context: "Reporter skill" }
  ],

  global_vocab: ["reporter", "camera", "microphone", "news", "live", "describe", "scene", "studio", "report", "exciting", "happening", "audience", "interview"],

  nova_instructions: {
    persona: "Enthusiastic live TV news anchor named Nova who loves breaking news",
    tone: "Exciting, fast-paced, encouraging — like a real TV news show",
    opening_lines_by_mission: {
      mission_1: "Good morning! I am Nova, your live news anchor! Today YOU are the reporter! Look around you. What is happening right now? Say: I am [verb]-ing or She is [verb]-ing!",
      mission_2: "Welcome back, star reporter! Now interview someone near you! Ask: What are you doing? Then report back to the audience! Say: She is [verb]-ing!",
      mission_3: "Amazing reporting! Now let's find out how TV news really works! A reporter uses a camera and microphone. What do YOU do first? Say: First, I am picking up the microphone!"
    },
    conversation_style: [
      "Energetic and TV news presenter style — like going LIVE on air",
      "One Present Continuous sentence per turn — model it for the student",
      "NO emojis — text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-12 turns per mission",
      "GRAMMAR FOCUS: Present Continuous — am/is/are + verb-ing to describe what is happening NOW",
      "Always give scaffolding: Say: I am [verb]-ing or Say: She is [verb]-ing"
    ],
    recast_strategy: "ALWAYS recast with correct Present Continuous: 'Yes! She IS reading! Say: She is reading quietly!'",
    recast_example: {
      student: "She read a book.",
      nova_recast: "Great! She IS reading a book RIGHT NOW! Say: She is reading a book!"
    },
    vocabulary_scaffolding: [
      "Mission 1: happening, describe, scene, exciting — what is happening right now",
      "Mission 2: interview, reporter, audience, report — do a live interview",
      "Mission 3: camera, microphone, studio, live, news — how news works"
    ],
    questioning_skill: [
      "What is happening right now?",
      "What are you doing?",
      "What is [person/animal] doing?",
      "Who are you interviewing?",
      "What is the exciting news today?"
    ]
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY — NOT V25)",
    ack_options: ["Nice!", "Great!", "You are live!", "Breaking news!", "Good job!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student's sentence back with correct Present Continuous grammar",
      "Fix grammar naturally without explanation",
      "Keep it exciting and TV news-style"
    ],
    question_patterns_allowed: [
      "What is...?",
      "What are...?",
      "Who is...?",
      "What is [name] doing?",
      "What is happening in...?"
    ],
    question_patterns_forbidden: [
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "My teacher write on board.", tutor_response: "Breaking news! My teacher IS writing on the board! Say that again! What are the students doing?" },
      { student: "They sit and read.", tutor_response: "Yes! They ARE sitting and reading! Great live report! Who else can you see?" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Be a Live Reporter!",
      title_en: "Be a Live Reporter!",
      title_vi: "Trở thành Phóng viên Trực tiếp!",
      theme: "Describing classroom/home scenes using Present Continuous",

      nova_greeting: "Good morning! I am Nova! Today YOU are the reporter! Look around. What is happening right now?",

      mission_context: "This is Week 18 Mission 1 — Be a Live Reporter! STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. CHARACTER: Nova is an energetic TV news anchor. The student is a live reporter describing what is happening around them. PREMISE: Student looks around their classroom or home and describes each person/thing using Present Continuous. LANGUAGE RULES: Very simple sentences. Max 10 words each. GRAMMAR FOCUS: Present Continuous — I am + verb-ing / She is + verb-ing / They are + verb-ing. SCAFFOLDING: Give choices every turn: Say: I am sitting or Say: She is reading - let student pick. GAME FLOW: Turn 1=opening already asked what is happening, Turn 2=ask what THEY are doing (I am...), Turn 3=ask about ONE person near them (She/He is...), Turns 4-8=describe more people/animals/things, Turn 9-11=give a short live report summary with 3 things, Turn 12=closing. RECAST: Student says teacher write — recast: Great! The teacher IS writing! Say: The teacher is writing on the board! FORBIDDEN: No past tense. Only describe what is happening NOW. CRITICAL: END on turn 12 with congratulations and what student learned. NO more questions on turn 12. CRITICAL NO-REPEAT: Do NOT ask the same question twice.",

      target_vocab: ["happening", "describe", "scene", "exciting", "reporter"],
      target_pattern: "[Subject] + am/is/are + [verb]-ing + [object/place].",

      conversation_topics: [
        "What is happening right now around you?",
        "What are YOU doing right now? (I am...)",
        "Describe ONE person near you — what are they doing? (She/He is...)",
        "What about another person — what are they doing?",
        "Is anyone reading, writing, eating, or playing?",
        "What is outside the window right now?",
        "Describe something happening near you (an animal, a fan, a clock)",
        "Put it all together — give a mini live report with 3 things",
        "Is the scene exciting or quiet?",
        "Closing: Great live report! What did you describe today?"
      ],

      story_character: {
        name: "Nova",
        personality: "enthusiastic, fast-paced TV anchor, loves breaking news",
        backstory: "I am Nova, your live news anchor. I help young reporters like you describe what is happening right now!",
        speaking_style: "exciting, uses TV news language, models Present Continuous every turn",
        facts: {
          loves_breaking_news: true,
          teaches_present_continuous: true,
          favorite_phrase: "We are going live right NOW!"
        },
        role: "TV anchor coaching student to be a live reporter"
      },

      opening_narrative: "Good morning! I am Nova, your live news anchor! Today YOU are the reporter! Look around you right now. What is happening? Say: I am sitting or She is reading or The teacher is writing",

      story_arc: [
        {
          phase: "self_report",
          turns: "1-4",
          phase_name: "What YOU Are Doing",
          focus: "Student describes their own actions first (I am...)",
          goal: "Student uses I am + verb-ing confidently",
          note: "Opening already asked what is happening. Turn 1 = student answered. Phase Q1 MUST ask about I am... what the student personally is doing. Do NOT repeat the opening question.",
          phase_questions: [
            "You are live! What are YOU doing right now? Say: I am sitting and learning or I am holding a pencil or I am looking at the screen",
            "Are you sitting or standing? Say: I am sitting at my desk or I am standing by the board or I am sitting on the floor",
            "What are your hands doing right now? Say: I am holding a pencil or I am typing on a keyboard or I am writing in my book",
            "Is your room quiet or exciting? Say: My room is quiet or My room is exciting or It is a busy scene!"
          ]
        },
        {
          phase: "others_report",
          turns: "5-9",
          phase_name: "What Others Are Doing",
          focus: "Student describes people around them using He/She/They is/are...",
          goal: "Student correctly uses He is / She is / They are + verb-ing",
          note: "Build ON what student already said in phase 1. Now look OUTWARD. Do NOT re-ask about what student is doing.",
          phase_questions: [
            "Great! Now look at someone near you! What are THEY doing? Say: She is reading quietly or He is writing on the board or They are talking together",
            "Is there an animal near you — a cat, dog, or bird? What is it doing? Say: My cat is sleeping or My dog is playing or There is no animal here",
            "Look at ONE more person! What are they doing? Say: My friend is drawing or My teacher is standing or My mum is cooking",
            "Is anyone eating or drinking right now? Say: Yes, someone is eating or No, nobody is eating right now",
            "What else can you see in the scene? Say: The fan is spinning or The clock is ticking or The window is open"
          ]
        },
        {
          phase: "live_report",
          turns: "10-12",
          phase_name: "Deliver Your Live Report",
          focus: "Student gives a complete 3-sentence live report summary",
          goal: "Student delivers a mini live report combining I am, She/He is, and They are",
          phase_questions: [
            "Now give me your LIVE REPORT! Describe 3 things happening! Say: I am ___, my teacher is ___, and my friend is ___!",
            "Is this scene exciting or normal? Say: This is an exciting scene! or This is a normal day at school or This is happening right now at my home!",
            "Wonderful live report! You are a real reporter now! What did you describe today? Name ONE person and what they are doing. Then say: That's all from [your name], your live reporter! Back to you Nova!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 2,
      id: 2,
      title: "The News Report",
      title_en: "The News Report",
      title_vi: "Bản Tin Tức",
      theme: "Interviewing someone and reporting their actions to the audience",

      nova_greeting: "Welcome back, star reporter! Now you must INTERVIEW someone near you! Ask: What are you doing? Then report back to the audience!",

      mission_context: "This is Week 18 Mission 2 — The News Report. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. CHARACTER: Nova is the studio anchor. The student is a field reporter who interviews someone near them and reports back. PREMISE: Student picks one person (parent, sibling, friend, pet), asks what they are doing, then reports to Nova using He/She is + verb-ing. LANGUAGE RULES: Simple sentences. GRAMMAR FOCUS: Interview question: What are you doing? / What is [name] doing? Reporting: He/She/It is + verb-ing. SCAFFOLDING: Model the question AND the report each turn. GAME FLOW: (1) Student picks who to interview, (2) Student ask the question, (3) Student reports the answer to Nova, (4-8) Nova asks for details, more questions, longer reports, (9-11) Student gives a full report with 2-3 sentences, (12) Closing. RECAST: He write — He IS writing! Say: He is writing a letter! FORBIDDEN: No past tense. CRITICAL: END on turn 12. No more questions.",

      target_vocab: ["interview", "reporter", "audience", "report", "happening"],
      target_pattern: "[Name] is + [verb]-ing + [object].",

      conversation_topics: [
        "Who are you going to interview? (parent/sibling/friend/pet)",
        "Ask the interview question: What are you doing?",
        "Report the answer to the audience: She/He is...",
        "Ask a follow-up question: Why are you doing that?",
        "Report the follow-up answer",
        "What does the person say about the news?",
        "Is the interview exciting or quiet?",
        "Give the full interview report to the audience",
        "What is the most exciting part of your report?",
        "Closing the interview: Back to you, Nova!"
      ],

      story_character: {
        name: "Nova",
        personality: "studio anchor, coaches field reporters",
        backstory: "Nova is in the TV studio. The student is the field reporter calling in live!",
        speaking_style: "professional, coaching, uses TV language like 'Over to you' and 'Back to the studio'",
        facts: {
          loves_field_reports: true,
          coaches_interview_skills: true,
          favorite_phrase: "And now, over to our field reporter!"
        },
        role: "Studio anchor receiving live field reports from the student"
      },

      opening_narrative: "And now, over to our field reporter! Hello reporter! Pick ONE person near you to interview. Who are you going to interview? Say: I am going to interview my mum or my friend or my brother",

      story_arc: [
        {
          phase: "choose_subject",
          turns: "1-3",
          phase_name: "Choose Who to Interview",
          focus: "Student picks a subject and asks the interview question",
          goal: "Student uses What are you doing? or What is [name] doing?",
          phase_questions: [
            "Who is near you right now? Say: My mum is near me or My friend is here or My cat is sleeping next to me",
            "Now ask them the interview question! Say: What are you doing? Say it to them!",
            "What did they say? Report it to me! Say: She is cooking or He is reading or My cat is sleeping"
          ]
        },
        {
          phase: "interview_details",
          turns: "4-9",
          phase_name: "The Interview",
          focus: "Getting and reporting more details about the subject's actions",
          goal: "Student builds longer Present Continuous reports: She is cooking soup in the kitchen",
          phase_questions: [
            "Add more detail! WHERE is that happening? Say: She is cooking in the kitchen or He is reading in his room or The cat is sleeping on the sofa",
            "Ask your subject: Why are you doing that? Then report the answer to me!",
            "What are their hands doing? Say: She is using a spoon or He is turning a page or Its paws are under its chin",
            "What is happening around your subject? Say: The TV is on or The music is playing or It is quiet around them",
            "Is this scene exciting news? Say: Yes, it is exciting because or No, it is very quiet today but that is okay",
            "Give your FULL field report so far! Two sentences: [Subject] is [verb]-ing in [place]. And [another thing] is [happening]."
          ]
        },
        {
          phase: "report_to_anchor",
          turns: "10-12",
          phase_name: "Report Back to Studio",
          focus: "Full live report back to Nova with 2-3 Present Continuous sentences",
          goal: "Student gives a complete multi-sentence report using correct Present Continuous",
          phase_questions: [
            "Now give your FULL live report to the audience! Three sentences! Say: [Name] is ___, [name] is ___, and [thing] is ___!",
            "What is the most interesting thing happening in your report? Say: The most interesting thing is that [subject] is [verb]-ing!",
            "Great field report! Time to close! Say: This is [your name], your field reporter, reporting from [home/school]. Back to you Nova!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 3,
      id: 3,
      title: "The Science of Communication",
      title_en: "The Science of Communication",
      title_vi: "Khoa Học Về Truyền Thông",
      theme: "How reporters and cameras send news to the audience",

      nova_greeting: "Amazing reporting! Now let's think like scientists! You used a microphone and camera. How does the news travel from YOU to the audience at home?",

      mission_context: "This is Week 18 Mission 3 — The Science of Communication. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. CHARACTER: Nova is now a science teacher explaining how TV news works. PREMISE: Student learns how a reporter's voice/image travels via camera → signal → satellite/cable → TV to reach the audience. Vocab: camera, microphone, studio, signal, audience, live, news. LANGUAGE RULES: Simple. GRAMMAR FOCUS: Review all Present Continuous from this week + CLIL science vocabulary. SCAFFOLDING: Give 1 step at a time with choices. GAME FLOW: (1) Reporter → microphone → camera, (2) Signal sent to studio, (3) Studio sends to satellite or cable, (4) Signal reaches home TV, (5) Audience watches live. RECAST: signal go fast — The signal IS going very fast! Say: The signal is traveling to the satellite! FORBIDDEN: No complex science. Keep A1 level. CRITICAL: END on turn 12. No more questions.",

      target_vocab: ["camera", "microphone", "studio", "live", "news", "audience", "describe"],
      target_pattern: "The [noun] is [verb]-ing the [object].",

      conversation_topics: [
        "What does a reporter hold to speak? (microphone)",
        "What does a reporter use to show the scene? (camera)",
        "Where does the reporter stand? (in front of the camera / in the studio)",
        "How does the signal travel? (to satellite → to TV at home)",
        "What is the audience doing right now? (watching the live news)",
        "What happens at the TV studio? (people check the news)",
        "Why do we watch live news? (to see what is happening right now)",
        "What would you describe if you were a real reporter today?",
        "What is the most exciting news happening right now?",
        "Closing: How does news travel from reporter to audience?"
      ],

      story_character: {
        name: "Nova",
        personality: "scientist-teacher mode, curious, explains step by step",
        backstory: "Nova now switches to science mode and explains how the camera, microphone, and signal bring the news to the audience.",
        speaking_style: "step by step, simple science words, models Present Continuous throughout",
        facts: {
          loves_science: true,
          explains_clearly: true,
          favorite_phrase: "The signal is traveling right now!"
        },
        role: "Science explainer helping student understand how live TV news works"
      },

      opening_narrative: "Amazing reporter! Now let's think like scientists! You picked up the microphone. The camera is filming. What is happening to the signal right now? Say: The signal is traveling to the studio or I do not know yet — tell me Nova!",

      story_arc: [
        {
          phase: "reporter_tools",
          turns: "1-4",
          phase_name: "Reporter Tools",
          focus: "Microphone, camera — what they do and how to use them",
          goal: "Student describes what the reporter is holding and doing with each tool",
          phase_questions: [
            "The reporter is holding something. What is it? Say: The reporter is holding a microphone or The reporter is holding a camera",
            "What is the microphone DOING right now? Say: The microphone is picking up the reporter's voice or The microphone is making the voice loud",
            "What is the camera doing? Say: The camera is filming the scene or The camera is recording what is happening",
            "The reporter is standing in front of the camera. What is the reporter describing? Say: The reporter is describing the classroom or The reporter is describing what is happening"
          ]
        },
        {
          phase: "signal_travel",
          turns: "5-9",
          phase_name: "How the Signal Travels",
          focus: "Camera → signal → satellite/cable → studio → TV → audience",
          goal: "Student follows the path of the news signal step by step using Present Continuous",
          phase_questions: [
            "The camera sends a signal! Where is the signal going? Say: The signal is going to the studio or The signal is traveling to the satellite",
            "The studio is receiving the signal! What are the people at the studio doing? Say: The people are checking the news or The people are sending it to homes",
            "Now the signal is in homes! What is the audience doing? Say: The audience is watching the live news or The audience is listening to the reporter",
            "Why do we call it LIVE news? Say: Because it is happening right now or Because it is not recorded — it is happening at this moment",
            "Can the audience see the reporter right now? Say: Yes! The audience is watching the reporter describe the scene right now!"
          ]
        },
        {
          phase: "science_summary",
          turns: "10-12",
          phase_name: "Science Summary",
          focus: "Full summary of how news travels from reporter to audience",
          goal: "Student gives a complete 3-step science summary using Present Continuous",
          phase_questions: [
            "Give me the FULL science summary! Three steps! Say: Step 1: The reporter is describing. Step 2: The signal is traveling. Step 3: The audience is watching!",
            "What is YOUR favourite part of being a reporter? Say: I love describing the scene or I love holding the microphone or I love talking to the audience!",
            "Amazing science thinking! You are a reporter AND a scientist! Say: I am a reporter. I am describing what is happening. The audience is watching me right now! Great work!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    }
  ],

  conversation_cards: [
    {
      id: "classroom_reporter",
      title: "Classroom Reporter",
      emoji: "📰",
      theme: "Live Reporting — Present Continuous",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Welcome to the news desk! I am Nova. You are the reporter today! Look around you. What is happening right now? Say: I am sitting or She is reading or He is writing",
          fill_blank: "I am ___",
          accept_words: ["sitting", "standing", "reading", "writing", "learning", "watching", "talking", "drawing"]
        },
        {
          ai: "Great report! Now describe someone near you. What is that person doing? Say: My mum is cooking or My friend is playing or My teacher is talking",
          fill_blank: "___ is ___ing",
          accept_words: ["is", "are"]
        },
        {
          ai: "Wonderful! Are two people doing the same thing or different things? Say: They are both studying or They are doing different things",
          options: ["They are both studying", "They are doing different things", "They are both working"]
        },
        {
          ai: "This just in — what is the most exciting thing happening right now? Say: The most exciting thing is ___",
          fill_blank: "The most exciting thing is ___",
          accept_words: ["happening", "is", "are", "my", "the"]
        },
        {
          ai: "Back to the studio! Great live report, reporter! What are YOU doing right now? Say: I am reporting or I am learning English or I am being a reporter",
          options: ["I am reporting", "I am learning English", "I am being a reporter"]
        }
      ],
      completion_message: "Excellent reporting! 📰 You described real actions using Present Continuous!"
    },
    {
      id: "interview_practice",
      title: "Interview Practice",
      emoji: "🎤",
      theme: "Asking & Answering with Present Continuous",
      difficulty: "medium",
      exchanges: [
        {
          ai: "You are interviewing me for the school news! Say hello and ask what I am doing. Say: What are you doing right now?",
          accept: ["What are you doing", "What are you doing right now", "What is happening"]
        },
        {
          ai: "I am preparing the evening news broadcast! Now ask me — who else is working here? Say: Who else is working?",
          accept: ["Who else is working", "Who is working", "Who is helping you"]
        },
        {
          ai: "My cameraman Alex is filming, and Maya is writing the script right now. Can you repeat that? Say: Alex is filming and Maya is writing",
          options: ["Alex is filming and Maya is writing", "Alex is writing and Maya is filming", "They are both filming"]
        },
        {
          ai: "Great! Now ask me what the audience at home is doing right now. Say: What is the audience doing?",
          accept: ["What is the audience doing", "What are the viewers doing", "What are people doing at home"]
        },
        {
          ai: "The audience is watching and cheering right now! Thank your interviewee. Say: Thank you for talking with me or Thank you for your time",
          options: ["Thank you for talking with me", "Thank you for your time", "Thank you very much"]
        }
      ],
      completion_message: "Perfect interview technique! 🎤 You used 'What are you doing?' and Present Continuous answers!"
    },
    {
      id: "live_scene_description",
      title: "Describe the Scene",
      emoji: "🎬",
      theme: "Multiple Subjects with is/are + verb-ing",
      difficulty: "medium",
      exchanges: [
        {
          ai: "You are a live reporter at the school! Describe what is happening using 'is'. Say: The teacher is writing or A student is reading",
          fill_blank: "The ___ is ___ing",
          accept_words: ["is", "teacher", "student", "child", "reporter", "person"]
        },
        {
          ai: "Now use 'are' for more than one person. Say: The students are studying or The children are playing or My friends are running",
          fill_blank: "The ___ are ___ing",
          accept_words: ["are", "students", "children", "friends", "people", "teachers"]
        },
        {
          ai: "Excellent! Now describe TWO different actions at the same time. Say: One person is ___ and another is ___",
          fill_blank: "One person is ___ and another is ___",
          accept_words: ["and", "is", "one", "another", "person"]
        },
        {
          ai: "What is the most interesting action you can see? Use: Right now, ___ is/are ___ing",
          fill_blank: "Right now, ___ is/are ___ing",
          accept_words: ["right", "now", "is", "are"]
        },
        {
          ai: "Brilliant scene description! Sign off your report. Say: This is your reporter, signing off or That is all from the scene or Thank you for watching",
          options: ["This is your reporter, signing off", "That is all from the scene", "Thank you for watching"]
        }
      ],
      completion_message: "Amazing scene description! 🎬 You used is/are + verb-ing with multiple subjects like a real reporter!"
    }
  ]
};

export default week18RealData;
