const week17RealData = {
  weekId: 17,
  week_number: 17,
  title: "Weather & Clothes",
  weekTitle_en: "Weather & Clothes",
  weekTitle_vi: "Thời tiết & Trang phục",
  topic: "Dressing for the weather using cause and effect",
  topic_vi: "Mặc đồ theo thời tiết dùng quan hệ nhân quả",
  theme: "Weather conditions and appropriate clothing choices",

  grammar_focus: "Cause and Effect: It is [weather], so I am wearing [clothes].",
  grammar_pattern: "It is [adjective/verb-ing], so I am wearing [noun].",
  grammar_examples: [
    "It is raining, so I am wearing a raincoat.",
    "It is sunny, so I am wearing a hat.",
    "It is cold, so I am wearing my coat and boots.",
    "It is snowing, so I am wearing warm clothes.",
    "It is warm, so I am wearing a light jacket."
  ],

  target_vocab: [
    { word: "raining",       pronunciation: "/ˈreɪnɪŋ/",        definition_vi: "đang mưa",        definition_en: "water is falling from the sky",               example: "It is raining outside. Take your umbrella!",         syllabus_context: "Weather conditions" },
    { word: "snowing",       pronunciation: "/ˈsnoʊɪŋ/",        definition_vi: "đang tuyết rơi",  definition_en: "white snowflakes are falling from the sky",   example: "It is snowing, so school is closed today.",          syllabus_context: "Weather conditions" },
    { word: "sunny",         pronunciation: "/ˈsʌni/",           definition_vi: "có nắng",         definition_en: "bright and full of sunlight",                 example: "It is sunny and warm today!",                        syllabus_context: "Weather conditions" },
    { word: "cold",          pronunciation: "/koʊld/",           definition_vi: "lạnh",            definition_en: "low temperature, not warm",                   example: "It is very cold in winter.",                         syllabus_context: "Temperature" },
    { word: "warm",          pronunciation: "/wɔːrm/",           definition_vi: "ấm",              definition_en: "comfortable temperature, not too hot or cold", example: "Spring is warm and pleasant.",                       syllabus_context: "Temperature" },
    { word: "coat",          pronunciation: "/koʊt/",            definition_vi: "áo khoác",        definition_en: "a heavy jacket worn in cold weather",          example: "I am wearing my coat because it is cold.",           syllabus_context: "Clothing items" },
    { word: "boots",         pronunciation: "/buːts/",           definition_vi: "ủng",             definition_en: "strong shoes that cover your ankles",          example: "She is wearing boots because it is raining.",        syllabus_context: "Footwear" },
    { word: "hat",           pronunciation: "/hæt/",             definition_vi: "mũ",              definition_en: "something you wear on your head",              example: "He is wearing a hat because it is sunny.",           syllabus_context: "Accessories" },
    { word: "umbrella",      pronunciation: "/ʌmˈbrɛlə/",       definition_vi: "ô/dù",           definition_en: "you open this to stay dry when it rains",      example: "I am carrying my umbrella today.",                   syllabus_context: "Weather accessories" },
    { word: "wearing",       pronunciation: "/ˈwɛrɪŋ/",         definition_vi: "đang mặc",        definition_en: "having clothes on your body right now",        example: "I am wearing a blue coat today.",                    syllabus_context: "Present Continuous action" },
    { word: "evaporation",   pronunciation: "/ɪˌvæpəˈreɪʃən/", definition_vi: "sự bốc hơi",     definition_en: "water turning into invisible gas or vapor",    example: "Evaporation happens when the sun heats water.",      syllabus_context: "Water cycle / Science" },
    { word: "atmosphere",    pronunciation: "/ˈætməsˌfɪr/",     definition_vi: "bầu khí quyển",  definition_en: "the layer of air and gas around Earth",        example: "Clouds form high in the atmosphere.",                syllabus_context: "Earth science" },
    { word: "precipitation", pronunciation: "/prɪˌsɪpɪˈteɪʃən/", definition_vi: "lượng mưa",    definition_en: "water falling from clouds as rain or snow",    example: "Rain and snow are types of precipitation.",          syllabus_context: "Water cycle / Science" }
  ],

  global_vocab: ["raining", "snowing", "sunny", "cold", "warm", "coat", "boots", "hat", "umbrella", "wearing", "evaporation", "atmosphere", "precipitation"],

  nova_instructions: {
    persona: "Cheerful weather reporter named Nova, enthusiastic about weather science",
    tone: "Warm, encouraging, connects weather to clothing choices naturally",
    opening_lines_by_mission: {
      mission_1: "Hi! I am Nova, your weather reporter! Look outside! What is the weather like today? Say: It is raining or It is sunny or It is cold!",
      mission_2: "Welcome back, weather expert! You are now on TV! Tell the viewers about today's weather! What are people wearing? Say: People are wearing...",
      mission_3: "Amazing weather knowledge! Now let's think like scientists! Why does rain happen? What causes clouds? Say: Clouds are made of..."
    },
    conversation_style: [
      "Friendly and enthusiastic - like watching the weather forecast together",
      "One clear cause-effect connection per turn",
      "Model the full pattern: It is [weather], so I am wearing [clothes]",
      "NO emojis - text-to-speech will read them aloud",
      "Keep responses under 30 words",
      "Maintain conversation for minimum 10-12 turns per mission",
      "GRAMMAR FOCUS: Cause-effect linking word 'so' - connect weather to clothing"
    ],
    recast_strategy: "ALWAYS recast with correct cause-effect pattern: 'Yes! It is raining, SO I am wearing...'",
    recast_example: {
      student: "I wear coat because cold.",
      nova_recast: "Great! Say: It is cold, SO I am wearing a coat! Try it!"
    },
    vocabulary_scaffolding: [
      "Mission 1: raining, sunny, cold, warm - weather conditions",
      "Mission 2: coat, boots, hat, umbrella, wearing - clothing choices",
      "Mission 3: evaporation, atmosphere, precipitation - weather science"
    ],
    questioning_skill: [
      "What is the weather like today?",
      "What are you wearing?",
      "Why are you wearing that?",
      "Is it raining or sunny?",
      "What do you wear when it is cold?"
    ]
  },

  v28_format_notes: {
    response_format: "ack + recast + question (V28 ONLY - NOT V25)",
    ack_options: ["Nice!", "Great!", "Wonderful!", "Good job!", "Perfect!"],
    recast_max_words: 8,
    recast_rules: [
      "Mirror the student's cause-effect sentence back with correct grammar",
      "Fix grammar naturally without explanation",
      "Keep it conversational and encouraging"
    ],
    question_patterns_allowed: [
      "What is...?",
      "What are...?",
      "Is it...?",
      "Are you...?",
      "Why are you wearing...?"
    ],
    question_patterns_forbidden: [
      "What does... mean?",
      "Do you understand?"
    ],
    example_exchanges: [
      { student: "It rain so I wear coat.", tutor_response: "Great! It IS raining, so I AM wearing a coat! Say that again! What are you wearing on your feet?" },
      { student: "I am wearing boots.", tutor_response: "Perfect! You are wearing boots! Why? Say: It is raining, so I am wearing boots!" }
    ]
  },

  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "The Weather Reporter",
      title_en: "The Weather Reporter",
      title_vi: "Phóng viên Thời tiết",
      theme: "Describing weather conditions using cause-effect",

      nova_greeting: "Hi! I am Nova, your weather reporter! Let's talk about today's weather!",

      mission_context: "CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT DIFFERENT question from the story, (3) give 2-3 hint choices: Say: ___ or ___! NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. CRITICAL NO-REPEAT RULE: The opening already asked 'What is the weather like today?' — the student has already answered this. Do NOT ask about the weather type again on Turn 2. Move immediately to clothing: 'What are you wearing?' or 'Say: It is [weather], so I am wearing [clothes]'. DO NOT repeat any question already asked. This is Week 17 Mission 1 - The Weather Reporter. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. CHARACTER: Nova is a cheerful weather reporter who asks students to describe the weather and their clothing. LANGUAGE RULES: Use VERY SIMPLE words. Max 10 words per sentence. GRAMMAR FOCUS: Cause and Effect - It is [weather], so I am wearing [clothes]. Give scaffolding every turn: Say: It is raining, so I am wearing a coat or Say: It is sunny, so I am wearing a hat. VOCABULARY: raining, snowing, sunny, cold, warm, coat, boots, hat, umbrella, wearing. STRICT FOCUS: WEATHER CONDITIONS and CLOTHING CHOICES - always connect with so. RECAST ERRORS: student says I wear coat model: You ARE wearing a coat! Say: It is cold, so I am wearing a coat! GAME FLOW: Turn 1=student answers weather (already done in opening), Turn 2=ask what they are wearing, Turn 3=ask WHY (cause-effect), Turn 4-8=extend with more weather types and clothing, Turn 9-11=practice full cause-effect sentences, Turn 12=closing. FORBIDDEN: No past tense. Only present conditions. FORBIDDEN: Never ask the same question twice.",

      target_vocab: ["raining", "sunny", "cold", "coat", "hat"],
      target_pattern: "It is [weather], so I am wearing [clothes].",

      conversation_topics: [
        "What is the weather like today? (raining/sunny/cold)",
        "What are you wearing now? (coat/hat/boots)",
        "Why are you wearing that? (cause-effect: It is cold, so...)",
        "Is it raining or sunny? (weather choice)",
        "What do you wear when it rains? (clothes choice)",
        "Are you wearing boots today? (footwear question)",
        "Is it warm or cold outside? (temperature)",
        "What is happening with the weather? (conditions)",
        "What do you wear when it is sunny? (cause-effect)",
        "Closing: Great weather report today!"
      ],

      story_character: {
        name: "Nova",
        personality: "cheerful, curious, loves weather science",
        backstory: "I am Nova, a weather reporter. I go outside every day to check the weather. I love wearing the right clothes for every type of weather!",
        speaking_style: "enthusiastic, connects weather to clothing, uses cause-effect naturally",
        facts: {
          loves_weather: true,
          teaches_cause_effect: true,
          checks_weather_daily: true,
          favorite_phrase: "It is [weather], so I am wearing [clothes]!"
        },
        role: "Weather reporter connecting weather conditions to clothing choices"
      },

      opening_narrative: "Hi! I am Nova, your weather reporter! Look outside the window! What is the weather like today? Say: It is raining or It is sunny or It is cold",

      story_arc: [
        {
          phase: "weather_check",
          turns: "1-4",
          phase_name: "Describing the Weather",
          focus: "Present weather conditions then clothing connection",
          goal: "Student describes weather then connects to clothing with cause-effect",
          note: "CRITICAL: opening_narrative already asked 'What is the weather like today?'. Turn 1 is the student's weather answer. Phase question 1 must NOT repeat the weather question — move directly to clothing/cause-effect.",
          phase_questions: [
            "Great! Now tell me: what are you wearing today? Say: It is ___, so I am wearing ___ or I am wearing a coat or I am wearing boots",
            "Is it warm or cold today? Say: It is warm or It is cold or It is very cold",
            "Connect weather to clothes! Say: It is cold so I am wearing a coat or It is sunny so I am wearing a hat or It is raining so I am carrying an umbrella",
            "What do you think about this weather? Say: I like this weather or I do not like this weather or It is nice weather"
          ]
        },
        {
          phase: "clothing_choices",
          turns: "5-9",
          phase_name: "Choosing the Right Clothes",
          focus: "Cause and effect - weather to clothing",
          goal: "Student connects weather to clothing choice with 'so'",
          phase_questions: [
            "Because of the weather, what are you wearing today? Say: It is cold, so I am wearing a coat or It is sunny, so I am wearing a hat",
            "What are you wearing on your feet? Say: I am wearing boots or I am wearing shoes or It is raining so I am wearing boots",
            "Do you have an umbrella today? Say: Yes, it is raining so I am carrying my umbrella or No, it is sunny today",
            "Tell me one thing you are wearing! Say: I am wearing my ___ because it is ___",
            "Now give me the full sentence! Say: It is [weather], so I am wearing [clothes]!"
          ]
        },
        {
          phase: "closing",
          turns: "10-12",
          phase_name: "Weather Report Complete",
          focus: "Final cause-effect check and goodbye",
          goal: "Wrap up with a full cause-effect weather report",
          phase_questions: [
            "Tell me the weather and your clothes in ONE sentence. Say: It is ___, so I am wearing ___",
            "What about tomorrow's weather? Say: Tomorrow it will be sunny or Tomorrow it will be rainy or Tomorrow it will be cold",
            "Wonderful! You learned to connect weather and clothes! Say: It is [weather] so I am wearing [clothes]. Great job! See you at the next weather report!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 2,
      id: 2,
      title: "The TV Weather Show",
      title_en: "The TV Weather Show",
      title_vi: "Chương trình Thời tiết trên TV",
      theme: "Reporting weather and advising on clothing as a TV presenter",

      nova_greeting: "Welcome back! You are now a TV weather presenter! Tell the viewers about today's weather!",

      mission_context: "This is Week 17 Mission 2 - The TV Weather Show. STUDENT PROFILE: 6-12 years old Vietnamese children, A1 level. CHARACTER: Nova is the studio producer and the student is now the TV weather presenter. PREMISE: Student must describe weather, temperatures, and advise viewers on what to wear. LANGUAGE RULES: Simple sentences. GRAMMAR FOCUS: Cause and Effect - It is [weather], so [people] are wearing [clothes]. Now using third person too. VOCABULARY: coat, boots, hat, umbrella, wearing, raining, snowing, sunny, cold, warm. SCAFFOLDING: Give options every turn. GAME FLOW: (1) Introduce today's weather report, (2) Describe weather in different places, (3) Give clothing advice, (4) Answer viewer questions about clothing, (5) Close the weather show. RECAST: Student says People wear boots - Yes! People ARE wearing boots! Why? Because it is raining! Say: It is raining, so people are wearing boots! FORBIDDEN: No past tense. Only present weather conditions. CRITICAL: END on turn 12 with congratulations, no more questions.",

      target_vocab: ["coat", "boots", "umbrella", "wearing", "raining"],
      target_pattern: "It is [weather], so [people] are wearing [clothes].",

      conversation_topics: [
        "What is today's top weather story? (rain/snow/sun)",
        "What is the temperature like? (warm/cold)",
        "What should viewers wear today? (coat/hat/boots/umbrella)",
        "Is it raining in the city? (raining/not raining)",
        "What about in the mountains? (colder/snowing)",
        "What do people wear when it snows? (heavy coat and boots)",
        "Advise: Should I bring an umbrella? (yes if raining)",
        "What happens to the streets when it rains? (wet and slippery)",
        "How is the weather today? (hot/warm/cold/freezing)",
        "Close the weather show with a forecast!"
      ],

      story_character: {
        name: "Nova",
        personality: "professional TV presenter, enthusiastic about weather",
        backstory: "Nova is the studio director. Today, the student is the TV weather presenter!",
        speaking_style: "professional but fun, gives feedback on student's weather reports",
        facts: {
          loves_weather_tv: true,
          director_role: true,
          favorite_phrase: "And that's today's weather! Back to you!"
        },
        role: "TV studio director coaching student weather presenter"
      },

      opening_narrative: "Welcome to the TV weather studio! You are the weather presenter today! Tell our viewers: What is the weather like? Say: Good morning viewers. Today it is ___ so please wear ___",

      story_arc: [
        {
          phase: "weather_intro",
          turns: "1-4",
          phase_name: "Opening the Weather Show",
          focus: "Present weather conditions formally",
          goal: "Student gives a TV-style weather introduction",
          phase_questions: [
            "Action! You are on TV! Start your weather report! Say: Good morning viewers! Today it is raining or Today it is sunny or Today it is cold",
            "Give clothing advice to viewers! Say: It is raining so please wear a coat or It is sunny so please wear a hat or It is cold so please wear boots",
            "What is the temperature like today? Say: It is warm today or It is cold today or It is very cold today",
            "Tell viewers about the rain! Is it raining a little or a lot? Say: It is raining a little or It is raining a lot or It is not raining today"
          ]
        },
        {
          phase: "clothing_advice",
          turns: "5-9",
          phase_name: "Giving Clothing Advice",
          focus: "Third person cause-effect sentences",
          goal: "Student advises viewers on clothing using cause-effect",
          phase_questions: [
            "Give your viewers advice! What should they wear today? Say: Please wear your coat or Please bring your umbrella or Please wear warm boots",
            "What about children going to school? What should they wear? Say: Children should wear a coat or Children should carry an umbrella or Children should wear boots",
            "Is it snowing anywhere today? Say: Yes, it is snowing in the mountains so people are wearing heavy coats or No, it is not snowing",
            "What should people NOT wear today? Say: Do not wear a T-shirt. It is too cold or Do not forget your umbrella. It is raining",
            "Tell us one weather safety tip! Say: When it is raining, wear boots or When it is sunny, wear a hat or When it is cold, wear a coat"
          ]
        },
        {
          phase: "closing",
          turns: "10-12",
          phase_name: "Closing the Weather Show",
          focus: "Final weather summary and goodbye",
          goal: "Student closes the weather show professionally",
          phase_questions: [
            "Time to close the weather show! Give your final advice! Say: Remember viewers, it is [weather] today, so please wear ___",
            "Say goodbye to viewers! Say: Stay safe and dress for the weather! See you tomorrow!",
            "Amazing TV show! You learned to describe weather and give clothing advice! You used: It is [weather], so [people] are wearing [clothes]! Great job today!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    },

    {
      mission_id: 3,
      id: 3,
      title: "The Weather Scientist",
      title_en: "The Weather Scientist",
      title_vi: "Nhà khoa học Thời tiết",
      theme: "Exploring weather science: evaporation, atmosphere, precipitation",

      nova_greeting: "Welcome to my science lab! I study weather. Why does it rain? Why are there clouds? Let's find out together!",

      mission_context: "This is Week 17 Mission 3 - The Weather Scientist. STUDENT PROFILE: 6-12 years old Vietnamese children, A1+ level. CHARACTER: Nova is a weather scientist explaining how weather works. PREMISE: Student learns about the water cycle and weather science through conversation. LANGUAGE RULES: Simple sentences but introduce science vocabulary. GRAMMAR FOCUS: Cause and Effect extended - When water evaporates, it goes into the atmosphere. Then it falls as precipitation. VOCABULARY FOCUS: evaporation, atmosphere, precipitation, raining, snowing. SCAFFOLDING: Explain each science word simply, then ask student to use it. GAME FLOW: (1) Introduction to water cycle, (2) What is evaporation?, (3) What is atmosphere?, (4) What is precipitation?, (5) Connect weather to clothing choices with science. CRITICAL: END on turn 12 with congratulations, no more questions.",

      target_vocab: ["evaporation", "atmosphere", "precipitation", "raining", "snowing"],
      target_pattern: "When water evaporates, it goes into the atmosphere. Then it falls as precipitation.",

      conversation_topics: [
        "Where does rain come from? (clouds/sky/water cycle)",
        "What is evaporation? (water turning to gas)",
        "Where does water go when it evaporates? (into the atmosphere)",
        "What is the atmosphere? (layer of air around Earth)",
        "What is precipitation? (rain or snow falling from clouds)",
        "Why do clouds form? (water vapor collecting in atmosphere)",
        "Is snow a type of precipitation? (yes!)",
        "How does the water cycle help plants grow? (rain/watering)",
        "Why do some places get more rain? (closer to ocean/mountains)",
        "Connect: what do we wear because of precipitation?"
      ],

      story_character: {
        name: "Dr. Nova",
        personality: "curious scientist, loves explaining weather to kids",
        backstory: "Dr. Nova studies weather science. She knows why it rains, snows, and how clouds form!",
        speaking_style: "explains science in simple language, connects science to everyday life",
        facts: {
          studies_water_cycle: true,
          teaches_science_vocabulary: true,
          favorite_phrase: "Great science thinking!"
        },
        role: "Weather scientist teaching about water cycle and weather causes"
      },

      opening_narrative: "Welcome to my weather science lab! Big question: Why does it rain? The answer is the water cycle! First, water evaporates. Then it goes into the atmosphere. Then it falls as precipitation! Say: The water cycle or Evaporation",

      story_arc: [
        {
          phase: "water_cycle_intro",
          turns: "1-4",
          phase_name: "The Water Cycle",
          focus: "Understanding evaporation and atmosphere",
          goal: "Student understands basic water cycle vocabulary",
          phase_questions: [
            "Where does rain come from? Say: Rain comes from clouds or Rain comes from the sky or Rain comes from the water cycle",
            "Where do clouds come from? Water evaporates from lakes and rivers! What does evaporation mean? Say: Water becomes gas or Water goes up or Water turns invisible",
            "Water vapor goes up into the atmosphere. What is the atmosphere? Say: It is the air around Earth or It is the sky or It is a layer of air",
            "So: water evaporates and goes into the atmosphere. Then what happens? Say: It forms clouds or It rains or It cools down and becomes drops"
          ]
        },
        {
          phase: "precipitation_science",
          turns: "5-9",
          phase_name: "Understanding Precipitation",
          focus: "Types of precipitation and their causes",
          goal: "Student understands precipitation equals rain and snow",
          phase_questions: [
            "When water drops in clouds get heavy, they fall! This is called precipitation. What is precipitation? Say: Rain and snow or Water falling from clouds or Both rain and snow",
            "Is rain a type of precipitation? Say: Yes, rain is precipitation or Yes, it falls from clouds or Yes, it is water falling down",
            "What about snow? Is snow also precipitation? Say: Yes, snow is precipitation too or Yes, snow falls from clouds too or Yes, it is frozen water falling",
            "So we have two types of precipitation: rain and snow! When is it raining? Say: When water falls as liquid or When it is warm and wet or When clouds release drops",
            "When is it snowing? Say: When it is very cold and precipitation freezes or When it is winter and cold or When the temperature is below zero"
          ]
        },
        {
          phase: "closing",
          turns: "10-12",
          phase_name: "Science to Real Life",
          focus: "Connecting weather science to clothing choices",
          goal: "Student connects weather science to everyday clothing decisions",
          phase_questions: [
            "When there is a lot of precipitation today, what do you wear? Say: I wear boots and a coat or I carry an umbrella or It is raining so I wear a raincoat",
            "Can you explain the water cycle in one sentence? Say: Water evaporates, goes into the atmosphere, and falls as precipitation or The water cycle makes rain and snow",
            "You are now a weather scientist! You learned: evaporation, atmosphere, and precipitation! When it rains, remember: that water evaporated from oceans and rivers! Great science work today!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12
    }
  ],

  free_talk_scenarios: [
    {
      id: "rainy_day",
      title: "Rainy Day Conversation",
      emoji: "Rainy",
      theme: "Talking about rainy weather",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Oh no! It is raining today! Are you wearing a raincoat? Say: Yes I am or No I am not",
          accept: ["Yes", "Yes I am", "No", "No I am not"]
        },
        {
          ai: "I see! What are you wearing because of the rain? Say: I am wearing boots or I am wearing a coat or I have my umbrella",
          options: ["I am wearing boots", "I am wearing a coat", "I have my umbrella"]
        },
        {
          ai: "Smart! Give me a full sentence! Say: It is raining, so I am wearing ___",
          fill_blank: "It is raining, so I am wearing ___",
          accept_words: ["boots", "coat", "raincoat", "umbrella", "hat"]
        },
        {
          ai: "Perfect cause-effect sentence! Do you like rainy days? Say: Yes, I like rain or No, I do not like rain or Sometimes I like rain",
          options: ["Yes, I like rain", "No, I do not like rain", "Sometimes I like rain"]
        },
        {
          ai: "What do you do on rainy days inside? Say: I read books or I watch TV or I play games inside",
          options: ["I read books", "I watch TV", "I play games inside"]
        }
      ],
      completion_message: "Great weather talk! You used cause and effect perfectly!"
    },
    {
      id: "seasons_clothes",
      title: "Seasons and Clothes",
      emoji: "Seasons",
      theme: "Matching seasons to clothing choices",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Let's talk about seasons! Which season is it now? Say: It is winter or It is summer or It is spring or It is autumn",
          options: ["It is winter", "It is summer", "It is spring", "It is autumn"]
        },
        {
          ai: "What is the weather like in that season? Say: It is cold and snowing or It is hot and sunny or It is warm and rainy",
          options: ["It is cold and snowing", "It is hot and sunny", "It is warm and rainy"]
        },
        {
          ai: "Because of the weather, what do you wear in that season? Say: I am wearing a heavy coat or I am wearing shorts or I am wearing light clothes",
          fill_blank: "I am wearing ___",
          accept_words: ["coat", "boots", "hat", "umbrella", "light clothes", "heavy coat", "shorts"]
        },
        {
          ai: "What is your favorite weather to wear nice clothes in? Say: I love sunny weather or I love cold weather or I love rainy weather",
          options: ["I love sunny weather", "I love cold weather", "I love rainy weather"]
        },
        {
          ai: "Give me your best cause-effect sentence about seasons! Say: It is winter so I am wearing or It is summer so I am wearing",
          fill_blank: "It is ___, so I am wearing ___",
          accept_words: ["coat", "boots", "hat", "shorts", "light jacket"]
        }
      ],
      completion_message: "Wonderful! You matched seasons to clothing using cause-effect!"
    },
    {
      id: "weather_science",
      title: "Weather Science Chat",
      emoji: "Science",
      theme: "Talking about the science of weather",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Let's talk science! What makes rain? Say: Clouds make rain or Water evaporates and makes clouds or The water cycle makes rain",
          options: ["Clouds make rain", "Water evaporates and makes clouds", "The water cycle makes rain"]
        },
        {
          ai: "Correct! Is rain called precipitation? Say: Yes, rain is precipitation or Yes, it is water falling or Yes, precipitation includes rain and snow",
          options: ["Yes, rain is precipitation", "Yes, it is water falling", "Yes, precipitation includes rain and snow"]
        },
        {
          ai: "What is the atmosphere? Say: It is the air around Earth or It is the sky above us or It is where clouds form",
          options: ["It is the air around Earth", "It is the sky above us", "It is where clouds form"]
        },
        {
          ai: "Because there is precipitation today, what are you wearing? Say: It is raining so I am wearing boots or I have my umbrella because it is raining",
          options: ["It is raining so I am wearing boots", "I have my umbrella because it is raining"]
        },
        {
          ai: "Last question! Can you say the water cycle in order? Say: Water evaporates, then goes into the atmosphere, then falls as precipitation",
          accept: ["evaporates", "atmosphere", "precipitation", "water cycle"]
        }
      ],
      completion_message: "Excellent! You talked about weather science! Evaporation, atmosphere, and precipitation!"
    }
  ]
};

export default week17RealData;
