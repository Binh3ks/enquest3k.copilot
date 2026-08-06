const week19RealData = {
  week_id: 19,
  week_number: 19,
  title: "When I Was Small",
  weekTitle_en: "When I Was Small",
  weekTitle_vi: "Khi Tôi Còn Nhỏ",
  topic: "Talking about the past using was/were",
  topic_vi: "Nói về quá khứ sử dụng was/were",
  theme: "Childhood memories and past states",

  grammar_focus: "Past Simple: was/were (Past State)",
  grammar_pattern: "Subject + was/were + adjective/noun",
  grammar_examples: [
    "I was a baby when I was one year old.",
    "I was small and cute.",
    "My face was round.",
    "I was in kindergarten when I was five.",
    "The photos were in an old album."
  ],

  // === TARGET VOCABULARY (13 CHILDHOOD WORDS) ===
  target_vocab: [
    { word: "baby",        pronunciation: "/ˈbeɪ.bi/",            definition_vi: "em bé",      definition_en: "a very young child who cannot yet walk or talk",  example: "I was a baby when I was one year old.",         syllabus_context: "Early childhood" },
    { word: "cute",        pronunciation: "/kjuːt/",              definition_vi: "dễ thương",  definition_en: "attractive in a pretty or endearing way",        example: "I was very cute when I was small.",             syllabus_context: "Describing past appearance" },
    { word: "little",      pronunciation: "/ˈlɪt.əl/",            definition_vi: "nhỏ bé",     definition_en: "small in size or young in age",                  example: "I was little when I was three.",                syllabus_context: "Size/age" },
    { word: "noisy",       pronunciation: "/ˈnɔɪ.zi/",            definition_vi: "ồn ào",      definition_en: "making a lot of loud sounds",                    example: "I was a noisy baby and cried a lot.",           syllabus_context: "Past behavior" },
    { word: "quiet",       pronunciation: "/ˈkwaɪ.ət/",           definition_vi: "yên tĩnh",   definition_en: "making little or no noise",                      example: "I was quiet when I was sleeping.",              syllabus_context: "Past behavior" },
    { word: "kindergarten", pronunciation: "/ˈkɪn.dɚ.ɡɑːr.tən/", definition_vi: "mẫu giáo",   definition_en: "a school for young children ages 3-5",           example: "I was in kindergarten when I was five.",        syllabus_context: "Education" },
    { word: "grow",        pronunciation: "/ɡroʊ/",               definition_vi: "lớn lên",    definition_en: "to increase in size or develop over time",       example: "I grew bigger every year.",                     syllabus_context: "Physical development" },
    { word: "past",        pronunciation: "/pæst/",               definition_vi: "quá khứ",    definition_en: "the time before now",                            example: "In the past, I was small.",                     syllabus_context: "Time concepts" },
    { word: "young",       pronunciation: "/jʌŋ/",                definition_vi: "trẻ",        definition_en: "being in an early stage of life; not old",       example: "I was young when I learned to walk.",           syllabus_context: "Age" },
    { word: "small",       pronunciation: "/smɔːl/",              definition_vi: "nhỏ",        definition_en: "not large in size, amount, or extent",           example: "I was so small when I was a baby.",             syllabus_context: "Size" },
    { word: "photo",       pronunciation: "/ˈfoʊ.t̬oʊ/",           definition_vi: "ảnh",        definition_en: "a picture made using a camera",                  example: "This photo shows me when I was a baby.",        syllabus_context: "Memory objects" },
    { word: "album",       pronunciation: "/ˈæl.bəm/",            definition_vi: "album ảnh",  definition_en: "a book for keeping photographs",                 example: "My mom keeps my baby photos in an album.",      syllabus_context: "Memory objects" },
    { word: "memory",      pronunciation: "/ˈmem.ɚ.i/",           definition_vi: "ký ức",      definition_en: "something that you remember from the past",      example: "I have a memory of my first day at kindergarten.", syllabus_context: "Recollection" }
  ],

  global_vocab: ["baby", "cute", "little", "noisy", "quiet", "kindergarten", "grow", "past", "young", "small", "photo", "album", "memory"],

  // === AI TUTOR BEHAVIOR (week-level tuning) ===
  nova_instructions: {
    persona: "Warm and nostalgic grandma figure, loves hearing about childhood memories",
    tone: "Gentle, nostalgic, encouraging, patient",
    opening_lines_by_mission: {
      mission_1: "Hi sweetie! Let's look at some old photos together! Were you cute when you were a baby? Say: I was...",
      mission_2: "Welcome back! Let's talk about kindergarten! Were you in kindergarten? Say: I was...",
      mission_3: "Hi again! Let's talk about how you grew! Were you small when you were little? Say: I was..."
    },
    conversation_style: [
      "Warm and nostalgic - like looking at old albums with grandma",
      "One clear question per turn",
      "Model Past Simple (was/were) in every response",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-12 turns per mission",
      "ONLY use Past Simple: 'S + was/were + adj/noun' - Week 19 grammar scope",
      "NO action verbs (was running X) - ONLY states (was small ✓)"
    ],
    recast_strategy: "ALWAYS recast student errors by modeling correct Past Simple form naturally",
    recast_example: {
      student: "I am baby.",
      nova_recast: "Yes! You WERE a baby! Say: I WAS a baby! How old were you?"
    },
    vocabulary_scaffolding: [
      "Mission 1: baby, cute, little, small, photo, album — describing baby photos",
      "Mission 2: kindergarten, young, noisy, quiet, memory — talking about kindergarten days",
      "Mission 3: grow, past, small, memory — describing growth from past to now"
    ],
    questioning_skill: [
      "Were you cute when you were a baby?",
      "How old were you?",
      "Were you in kindergarten?",
      "Was your kindergarten fun?",
      "Were you noisy or quiet?"
    ]
  },

  // === AI RESPONSE FORMAT CONTRACT (V28 standard) ===
  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Oh!", "I see!", "Nice!", "Sweet!", "Lovely!", "Wonderful!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student's key word back in Past Simple form",
      "Fix grammar naturally without explanation",
      "Keep it conversational and warm"
    ],
    question_patterns_allowed: [
      "Were you...?",
      "Was...?",
      "How old were you...?",
      "What was...?",
      "Where were you...?"
    ],
    question_patterns_forbidden: [
      "Why...?",
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "I cute baby.", tutor_response: "Oh! You WERE a cute baby! Say: I was a cute baby. How old were you?" },
      { student: "I small.", tutor_response: "Yes! You WERE small! Say: I was small. Were you also little?" },
      { student: "In kindergarten.", tutor_response: "Nice! You WERE in kindergarten! Say: I was in kindergarten. How old were you there?" }
    ]
  },

  // === 3 STORY MISSIONS ===
  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Looking at Baby Photos",
      title_en: "Looking at Baby Photos",
      title_vi: "Nhìn Ảnh Em Bé",
      theme: "Describing past appearance using was/were",
      
      nova_greeting: "Hi sweetie! I'm Grandma Nova. Let's look at these old photos!",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 19 Mission 1 - Looking at Baby Photos. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Grandma Nova is a warm grandma figure looking at old photo albums with the student. She asks about baby photos and how the student looked when they were small. OPENING: Greet student warmly, show interest in old photos, then ask about baby appearance. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. GRAMMAR FOCUS: "I was [adjective]" and "I was a [noun]" - model the full sentence every turn. Give scaffolding every turn: "Say: I was cute" or "Say: I was a baby." VOCABULARY: baby, cute, little, small, photo, album. STRICT FOCUS: PAST STATE DESCRIPTIONS - always use was/were for how things WERE, NOT actions. Ask about appearance, age, size. FORBIDDEN: NO action verbs (was running X, was playing X) - ONLY states (was small ✓, was cute ✓). RECAST ERRORS: student says "I cute baby" → model Past Simple: "You WERE a cute baby! Say: I was a cute baby!" SAMPLE TURN: "Look at this photo! Were you cute when you were a baby? Say: I was cute or I was very cute!" → Student: "cute" → "Oh! You WERE cute! How old were you in this photo? Say: I was one year old or I was two years old!" GAME FLOW: (1) Ask about baby appearance → (2) Ask about age in photo → (3) Ask about size → (4) Ask about behavior (noisy/quiet) → (5) Compare past to now. One question per turn, model Past Simple each step. FORBIDDEN: No present tense, no future, only past state with was/were. NEVER say 'Tell me more!' or 'I see!' as filler. Keep it warm: "Oh!" "How lovely!" "Were you...?" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["baby", "cute", "little", "small", "photo"],
      target_pattern: "I was [adjective]. / I was a [noun].",
      
      conversation_topics: [
        "Looking at a baby photo (introduction)",
        "Were you cute? (appearance)",
        "How old were you? (age in photo)",
        "Were you small? (size)",
        "Were you a noisy baby? (behavior)",
        "What else do you see in the photo? (describe)",
        "Do you remember this? (memory)",
        "Where was this photo taken? (location)",
        "Were your eyes big or small? (detail)",
        "Closing: These are sweet memories!"
      ],
      
      story_character: {
        name: "Grandma Nova",
        personality: "warm, nostalgic, loves old photos and memories",
        backstory: "I love looking at old albums! Every photo tells a story about when we were small!",
        speaking_style: "gentle, asks about past with was/were, uses warm words",
        facts: {
          loves_memories: true,
          keeps_photo_albums: true,
          asks_about_past: true,
          favorite_phrase: "Were you...?"
        },
        role: "Nostalgic grandma looking at photos"
      },
      
      opening_narrative: "📷 Hi sweetie! I'm Grandma Nova! Look at this old photo! This was you when you were a baby! Were you cute? Say: I was cute or I was very cute",
      
      story_arc: [
        {
          phase: "baby_description",
          turns: "1-5",
          phase_name: "Describing Baby Appearance",
          focus: "Past Simple for appearance",
          goal: "Student describes how they looked as a baby",
          phase_questions: [
            "Oh! You WERE cute! How old were you in this photo? Say: I was one year old or I was two years old or I was three months old",
            "Lovely! Were you small or big when you were a baby? Say: I was small or I was very small or I was little",
            "Yes! You WERE small! What color was your hair? Say: My hair was black or My hair was brown",
            "Nice! Were your eyes big or small? Say: My eyes were big or My eyes were small",
            "I see! Look at your face! Was it round? Say: Yes my face was round or No it was not round"
          ]
        },
        {
          phase: "baby_behavior",
          turns: "6-10",
          phase_name: "Describing Baby Behavior",
          focus: "Past Simple for behavior/states",
          goal: "Student describes baby behavior",
          phase_questions: [
            "Sweet! Were you a noisy baby or a quiet baby? Say: I was noisy or I was quiet",
            "Oh! Were you noisy? Did you cry a lot? Say: Yes I cried a lot or No I was quiet when I slept",
            "I see! Where were you in this photo? Were you at home? Say: I was at home or I was at grandma's house",
            "Nice! Were you with your mom or your dad? Say: I was with my mom or I was with my dad or I was with both",
            "Wonderful! Do you remember this day? Say: Yes I remember or No I don't remember or I was too small to remember"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Reflecting on Memories",
          focus: "Final reflection and goodbye",
          goal: "Wrap up with gratitude for memories",
          phase_questions: [
            "These photos are precious memories! Tell me: Are you big now or still small? Say: I am big now or I am bigger now",
            "Yes! You WERE small in the past, but now you ARE bigger! Such sweet memories! Thank you for sharing your baby photos with me! 📷"
          ]
        }
      ],
      
      minimum_turns: 8,
      maximum_turns: 12
    },
    
    {
      mission_id: 2,
      id: 2,
      title: "My Kindergarten Days",
      title_en: "My Kindergarten Days",
      title_vi: "Ngày Ở Mẫu Giáo",
      theme: "Talking about kindergarten using was/were",
      
      nova_greeting: "Hi! I'm Grandma Nova! Let's talk about kindergarten!",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 19 Mission 2 - My Kindergarten Days. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Grandma Nova is asking about kindergarten experiences - what it was like, what the student was like, and memories from that time. OPENING: Greet student warmly, ask if they went to kindergarten, then explore memories. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. GRAMMAR FOCUS: "I was in kindergarten" and "It was [adjective]" - model the full sentence every turn. Give scaffolding every turn: "Say: I was in kindergarten" or "Say: It was fun." VOCABULARY: kindergarten, young, noisy, quiet, memory, photo. STRICT FOCUS: PAST STATE at kindergarten - use was/were for descriptions of place, feelings, experiences. Ask about kindergarten life. FORBIDDEN: NO action verbs (was playing X, was learning X) - ONLY states (was happy ✓, was young ✓, was noisy ✓). RECAST ERRORS: student says "I in kindergarten" →model Past Simple: "You WERE in kindergarten! Say: I was in kindergarten!" SAMPLE TURN: "Were you in kindergarten? Say: Yes I was in kindergarten or Yes I was!" → Student: "yes kindergarten" → "Nice! You WERE in kindergarten! How old were you? Say: I was five years old or I was four years old!" GAME FLOW: (1) Ask if they were in kindergarten → (2) Ask age at kindergarten → (3) Ask what it was like → (4) Ask about behavior → (5) Ask about memories. One topic per turn, model Past Simple each step. FORBIDDEN: No present tense about current school, only past kindergarten with was/were. NEVER say 'Tell me more!' as filler. Keep it nostalgic: "Oh!" "I see!" "Was it...?" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["kindergarten", "young", "noisy", "quiet", "memory"],
      target_pattern: "I was in kindergarten. / It was [adjective].",
      
      conversation_topics: [
        "Were you in kindergarten? (yes/no)",
        "How old were you? (age)",
        "Was it fun? (feelings)",
        "Were you noisy or quiet? (behavior in class)",
        "Who was your teacher? (people)",
        "Were there many children? (environment)",
        "What was your favorite activity? (preferences)",
        "Were you shy or brave? (personality)",
        "Do you have photos from kindergarten? (memories)",
        "Closing: Kindergarten was a happy time!"
      ],
      
      story_character: {
        name: "Grandma Nova",
        personality: "warm, curious about school memories, encouraging",
        backstory: "I love hearing about kindergarten! It's where children grow and learn!",
        speaking_style: "asks about experiences, uses was/were, shows interest",
        facts: {
          loves_school_stories: true,
          asks_about_feelings: true,
          remembers_details: true,
          favorite_question: "What was it like?"
        },
        role: "Grandma asking about kindergarten"
      },
      
      opening_narrative: "🏫 Hi! I'm Grandma Nova! Let's talk about kindergarten! Were you in kindergarten? Say: Yes I was in kindergarten or Yes I was or No I was not",
      
      story_arc: [
        {
          phase: "kindergarten_intro",
          turns: "1-5",
          phase_name: "Talking About Kindergarten",
          focus: "Past Simple for school experience",
          goal: "Student describes kindergarten attendance",
          phase_questions: [
            "Nice! How old were you when you were in kindergarten? Say: I was five years old or I was four years old or I was three years old",
            "Lovely! Was kindergarten fun or boring? Say: It was fun or It was very fun or It was sometimes fun",
            "Great! Was your kindergarten big or small? Say: It was big or It was small",
            "I see! Were there many children with you? Say: Yes there were many children or No there were a few children",
            "Wonderful! Who was your teacher? Was your teacher nice? Say: Yes my teacher was nice or My teacher was very kind"
          ]
        },
        {
          phase: "kindergarten_life",
          turns: "6-10",
          phase_name: "Describing Kindergarten Life",
          focus: "Past Simple for behavior and feelings",
          goal: "Student describes what kindergarten was like",
          phase_questions: [
            "Nice! Were you noisy in kindergarten or were you quiet? Say: I was noisy or I was quiet or Sometimes I was noisy",
            "Oh! What was your favorite activity? Was it painting or singing or playing? Say: My favorite was painting or My favorite was singing",
            "Lovely! Were you shy when you first started kindergarten? Say: Yes I was shy or No I was brave or I was a little shy",
            "I see! Did you have friends there? Were they nice? Say: Yes I had friends or Yes they were nice",
            "Sweet! Do you have photos from kindergarten? Say: Yes I have photos or No I don't have photos or I have some photos"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Reflecting on Kindergarten",
          focus: "Final thoughts and goodbye",
          goal: "Wrap up with positive reflection",
          phase_questions: [
            "Kindergarten sounds lovely! Tell me: Are you in kindergarten now or are you older? Say: I am older now or I am in primary school now",
            "Yes! You WERE in kindergarten in the past, and now you ARE bigger! Kindergarten was a happy time with sweet memories! Thank you for sharing! 🏫"
          ]
        }
      ],
      
      minimum_turns: 10,
      maximum_turns: 12
    },
    
    {
      mission_id: 3,
      id: 3,
      title: "How I Grew",
      title_en: "How I Grew",
      title_vi: "Tôi Đã Lớn Lên Thế Nào",
      theme: "Comparing past and present using was/were",
      
      nova_greeting: "Hi! I'm Grandma Nova! Let's talk about how you grew!",
      
      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 19 Mission 3 - How I Grew. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Grandma Nova explores how the student has grown and changed from the past to now. She compares past (was/were) with present (am/is/are) to show growth. OPENING: Greet student warmly, introduce growth topic, then compare past vs now. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. GRAMMAR FOCUS: "I was [adjective] in the past. Now I am [adjective]" - model comparison every turn. Give scaffolding every turn: "Say: I was small. Now I am big." VOCABULARY: grow, past, small, memory, album, photo. STRICT FOCUS: COMPARISON of past state (was/were) vs present state (am/is/are). Ask about physical growth and change. FORBIDDEN: NO action verbs - ONLY state comparisons (was small → am big ✓). RECAST ERRORS: student says "I small, now I big" → model: "Yes! You WERE small, and now you ARE big! Say: I was small. Now I am big!" SAMPLE TURN: "Were you small in the past? Say: Yes I was small or Yes I was very small!" → Student: "yes small" → "Oh! You WERE small! And now? Are you big now? Say: Now I am big or Now I am bigger!" GAME FLOW: (1) Ask about past size → (2) Compare to present → (3) Ask about physical changes → (4) Ask about clothes/height → (5) Reflect on memories. One comparison per turn, model both tenses each step. FORBIDDEN: No complex tenses, keep it to simple was/were vs am/is/are. NEVER say 'Tell me more!' as filler. Show amazement: "Wow!" "You grew so much!" "Were you...?" Do NOT ask another question on the last turn.`,
      
      target_vocab: ["grow", "past", "small", "memory"],
      target_pattern: "I was [small] in the past. Now I am [big].",
      
      conversation_topics: [
        "Were you small in the past? (past size)",
        "Are you big now? (present size)",
        "Did you grow taller? (physical change)",
        "Were your clothes small? (past clothes)",
        "Can you wear them now? (present comparison)",
        "Do you remember the past? (memory)",
        "What changed the most? (reflection)",
        "Do you have photos showing growth? (evidence)",
        "How do you feel about growing? (emotions)",
        "Closing: You grew so much!"
      ],
      
      story_character: {
        name: "Grandma Nova",
        personality: "amazed by growth, proud, encouraging",
        backstory: "I love seeing how children grow! You were so small, and now look at you!",
        speaking_style: "compares past and present, shows amazement, uses was/were vs am/is/are",
        facts: {
          loves_growth_stories: true,
          compares_past_present: true,
          keeps_track_of_changes: true,
          favorite_word: "grow"
        },
        role: "Grandma marveling at growth"
      },
      
      opening_narrative: "🌱 Hi! I'm Grandma Nova! Let's talk about how you GREW! Were you small in the past? Say: Yes I was small or Yes I was very small",
      
      story_arc: [
        {
          phase: "past_size",
          turns: "1-5",
          phase_name: "Describing Past Size",
          focus: "Past Simple for past state",
          goal: "Student describes past appearance",
          phase_questions: [
            "Oh! You WERE small in the past! And now? Are you big now? Say: Now I am big or Now I am bigger or Yes I am big",
            "Wonderful! You WERE small, and now you ARE big! You grew! How tall were you in the past? Say: I was short or I was very short or I don't remember",
            "I see! Were you a baby in the past? Say: Yes I was a baby or Yes when I was one year old",
            "Lovely! Were your hands little? Say: Yes my hands were little or Yes they were very small",
            "Yes! They WERE little! Are your hands big now? Say: Yes they are big now or Yes they are bigger now"
          ]
        },
        {
          phase: "comparing_growth",
          turns: "6-10",
          phase_name: "Comparing Past and Present",
          focus: "Contrast was/were with am/is/are",
          goal: "Student compares then and now",
          phase_questions: [
            "Amazing! Look at your old clothes! Were they small? Say: Yes my old clothes were small or Yes they were very small",
            "Yes! They WERE small! Can you wear them now? Say: No I cannot wear them now or No they are too small for me now",
            "Ha! You grew too much! Were you short or tall in the past? Say: I was short or I was very short",
            "And now? Are you tall now? Say: I am taller now or Yes I am tall now",
            "Wonderful! Do you have photos showing how you grew? Say: Yes I have photos or Yes I have some photos or No I don't have photos"
          ]
        },
        {
          phase: "closing",
          turns: "11-12",
          phase_name: "Reflecting on Growth",
          focus: "Final comparison and goodbye",
          goal: "Celebrate growth journey",
          phase_questions: [
            "Let's remember: In the PAST you were small. NOW you are big! Do you like growing? Say: Yes I like growing or Yes I like being big",
            "Wonderful! You WERE small, but now you ARE big! You grew SO MUCH! These memories show your amazing journey! Keep growing! 🌱"
          ]
        }
      ],
      
      minimum_turns: 12,
      maximum_turns: 12
    }
  ],

  
  learning_outcomes: [
    "Use Past Simple (was/were) to describe past states",
    "Apply childhood vocabulary to talk about memories",
    "Compare past and present using was/were vs am/is/are",
    "Build confidence in sharing personal memories"
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "When I Was Small",
    week_number: 19,
    theme: "Childhood Memories & Past Simple (was/were)",

    knowledge_base: [
      "Childhood vocabulary: baby, cute, little, noisy, quiet, kindergarten, grow, past, young, small, photo, album, memory",
      "Grammar: Past Simple — I was [adjective/noun], You were [adjective/noun], They were...",
      "Babies are small and cannot walk or talk yet",
      "Photos in albums show memories from the past",
      "Kindergarten is school for young children (ages 3-5)",
      "People grow bigger and taller over time",
      "The past is different from now — we compare using was/were vs am/is/are",
      "Some babies are noisy and cry a lot; some are quiet",
      "Memories help us remember when we were small",
      "We use Past Simple for states (was small, was cute), NOT actions"
    ],

    example_opening_questions: [
      "Were you cute when you were a baby?",
      "How old were you in kindergarten?",
      "Was your kindergarten fun?",
      "Were you noisy or quiet?",
      "Do you have photos from when you were small?",
      "Are you big now or still small?"
    ],

    // ✅ FREE TALK 2.0: Starter prompts
    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask_anything" }
    ],

    // Bonus roleplay scenario
    bonus_roleplay: {
      id: 'week19_photo_album',
      label_en: "Looking at Photo Album 📷",
      label_vi: "Xem Album Ảnh 📷",
      icon: "📷",
      ai_role: "Grandma looking at photos together",
      user_role: "Child sharing childhood memories",
      intro: "Let's look at this old album! I see a cute baby in this photo! Was that you? Tell me! Use: I was... / It was... / I was a baby!",
      context: "Week 19 theme - When I Was Small. AI acts as warm grandma looking at photo album with the student. Guide asks 'Who was this?' 'How old were you?' and student responds with Past Simple 'I was...' / 'I was a baby' patterns. Guide should be nostalgic, warm, and help student describe past states (NOT actions)."
    }
  },

  // 💬 SPARK TALK: AI-driven personal expression, bridged from the week's story
  spark_talk: [
    {
      id: 'spark_baby_me',
      emoji: '👶',
      title: 'Baby Me',
      bridge: 'The character found an old photo album full of memories from when they were little! 📷',
      seed_question: 'What were you like as a baby? Were you small or very funny?',
      frames: [
        { template: 'I was ___', follow_up_q: 'What were you like as a baby? Were you small or cute?', hints: ['small', 'cute', 'a happy baby'] },
        { template: 'I was ___ when I was little', follow_up_q: 'What were you like when you were little?', hints: ['very small', 'very funny', 'always laughing'] },
        { template: 'I was ___ years old', follow_up_q: 'How old were you? Three years old or five years old?', hints: ['three', 'four', 'five'] },
        { template: 'When I was little, I was ___', follow_up_q: 'What were you like when you were little?', hints: ['very playful', 'always hungry', 'very funny'] },
        { template: 'My hair was ___', follow_up_q: 'What was your hair like when you were a baby?', hints: ['short', 'curly', 'black and soft'] },
        { template: 'I was happy because ___', follow_up_q: 'Why were you happy as a baby?', hints: ['I had toys', 'I was always with my mum', 'I could eat and sleep'] },
        { template: 'My family was ___', follow_up_q: 'What was your family like? Were they happy or excited?', hints: ['happy', 'excited to see me', 'very proud'] },
        { template: 'I was a ___ baby', follow_up_q: 'What kind of baby were you? Happy or noisy?', hints: ['happy', 'noisy', 'cute and small'] }
      ],
      scaffold_frames: ['When I was small, I ___', 'I remember ___', 'I used to ___'],
      vocab_focus: ['remember', 'when', 'small', 'before', 'used to'],
      turns: 8,
    },
    {
      id: 'spark_best_birthday',
      emoji: '🎂',
      title: 'My Best Birthday',
      bridge: 'They remembered the best birthday party ever — cake, balloons, dancing, and laughter! 🎉',
      seed_question: 'How did you feel on your best birthday? Were you excited or surprised?',
      frames: [
        { template: 'I was so ___ on my birthday!', follow_up_q: 'How did you feel on your best birthday? Were you excited or happy?', hints: ['excited', 'happy', 'surprised'] },
        { template: 'I was at the ___', follow_up_q: 'Where were you for your birthday?', hints: ['park', 'restaurant', 'home'] },
        { template: 'My cake was ___', follow_up_q: 'What was your birthday cake like?', hints: ['chocolate', 'pink and beautiful', 'huge'] },
        { template: 'My friends were ___', follow_up_q: 'What were your friends like at the party?', hints: ['happy and excited', 'singing for me', 'so funny'] },
        { template: 'The party was ___', follow_up_q: 'What was the party like? Was it big or loud?', hints: ['big', 'loud and fun', 'wonderful'] },
        { template: 'I was wearing ___', follow_up_q: 'What were you wearing on your birthday?', hints: ['a blue dress', 'my favourite shirt', 'a party hat'] },
        { template: 'I was with my ___', follow_up_q: 'Who were you with on your birthday?', hints: ['family', 'best friends', 'cousins'] },
        { template: 'It was the best birthday because ___', follow_up_q: 'Why was it the best birthday?', hints: ['everyone was there', 'the cake was amazing', 'I got a great present'] }
      ],
      scaffold_frames: ['On my birthday I ___', 'I got ___', 'My best birthday was when ___'],
      vocab_focus: ['birthday', 'cake', 'present', 'friends', 'celebrate'],
      turns: 8,
    },
  ],

  conversation_cards: [
    {
      id: "baby_photos",
      title: "Baby Photos",
      emoji: "📷",
      theme: "Describing Baby Photos",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Hi! I'm Grandma Nova. Look at this photo! Were you a baby here? Say: Yes I was a baby or Yes that was me",
          options: ["Yes I was a baby", "Yes that was me"]
        },
        {
          ai: "Oh how sweet! How old were you in this photo? Say: I was one year(s) old! or I was two year(s) old! or I was three year(s) old!",
          fill_blank: "I was ___ year(s) old",
          accept_words: ["one", "two", "three", "1", "2", "3"]
        },
        {
          ai: "Lovely! Were you cute? Say: Yes I was cute or Yes I was very cute",
          options: ["Yes I was cute", "Yes I was very cute"]
        },
        {
          ai: "I can see! Were you small or big? Say: I was small or I was very small",
          options: ["I was small", "I was very small"]
        },
        {
          ai: "And now? Are you big now? Say: Yes I am big now or Yes I am bigger now",
          options: ["Yes I am big now", "Yes I am bigger now"]
        },
        {
          ai: "Amazing! You grew so much! Do you have more photos from when you were small? Say: Yes I have more or Yes or No",
          options: ["Yes I have more", "Yes", "No"]
        }
      ],
      completion_message: "Such sweet memories! 📷 You used Past Simple (was/were) perfectly!"
    },
    {
      id: "kindergarten_days",
      title: "Kindergarten Days",
      emoji: "🏫",
      theme: "Talking About Kindergarten",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Were you in kindergarten? Tell me! Say: Yes I was or Yes I was in kindergarten",
          options: ["Yes I was", "Yes I was in kindergarten"]
        },
        {
          ai: "Nice! How old were you? Say: I was three years old! or I was four years old! or I was five years old!",
          fill_blank: "I was ___ years old",
          accept_words: ["three", "four", "five", "3", "4", "5"]
        },
        {
          ai: "Great! Was kindergarten fun? Say: Yes it was fun or It was very fun",
          options: ["Yes it was fun", "It was very fun"]
        },
        {
          ai: "Wonderful! Were you noisy in class or were you quiet? Say: I was noisy or I was quiet",
          options: ["I was noisy", "I was quiet"]
        },
        {
          ai: "I see! Did you have friends there? Say: Yes I had friends or Yes I had many friends",
          options: ["Yes I had friends", "Yes I had many friends"]
        }
      ],
      completion_message: "Kindergarten sounds lovely! 🏫 You remembered so well!"
    },
    {
      id: "how_i_grew",
      title: "How I Grew",
      emoji: "🌱",
      theme: "Comparing Past and Present",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Let's talk about how you grew! Were you small in the past? Say: Yes I was small or Yes I was very small",
          options: ["Yes I was small", "Yes I was very small"]
        },
        {
          ai: "And now? Are you big? Say: Now I am big or Now I am bigger",
          options: ["Now I am big", "Now I am bigger"]
        },
        {
          ai: "Amazing! Look at your old clothes! Were they small? Say: Yes my clothes were small",
          accept: ["Yes", "Yes my clothes were small", "They were small"]
        },
        {
          ai: "Can you wear them now? Say: No I cannot or No they are too small",
          options: ["No I cannot", "No they are too small"]
        },
        {
          ai: "Ha! You grew! Tell me: Do you like growing and being bigger? Say: Yes I like growing or Yes",
          options: ["Yes I like growing", "Yes"]
        }
      ],
      completion_message: "You grew SO much! 🌱 Great job using was/were and am/is/are!"
    }
  ]
};

export default week19RealData;
