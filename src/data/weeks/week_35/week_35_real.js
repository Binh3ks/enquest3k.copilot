// WEEK 35: Environmental Issues
// AI Tutor V28 Format — Environmental Protection
// DO NOT USE PYTHON TO CREATE THIS FILE

const week35RealData = {
  week_id: 35,
  week_number: 35,
  title: "Our Planet Needs Our Help",
  weekTitle_en: "Environmental Issues",
  weekTitle_vi: "Các Vấn Đề Môi Trường",
  topic: "Environmental Issues — protecting our planet, climate change, renewable energy, and the role of young people in environmental action",
  topic_vi: "Các Vấn Đề Môi Trường — bảo vệ hành tinh, biến đổi khí hậu, năng lượng tái tạo, và vai trò của giới trẻ trong hành động vì môi trường",
  theme: "environmental_issues",
  grammar_focus: "Modal Verbs — MUST (obligation), SHOULD (advice), CAN (possibility)",
  grammar_pattern: "We MUST protect our planet. We SHOULD reduce, reuse, and recycle. Solar power CAN replace fossil fuels.",
  grammar_examples: [
    "We must protect our planet from pollution.",
    "We should reduce, reuse, and recycle every day.",
    "Solar power can replace fossil fuels."
  ],

  chunk_focus: [
    "our planet Earth",
    "is in danger",
    "cutting down trees",
    "throwing away plastic",
    "is getting warmer",
    "polar ice is melting",
    "sea levels are rising",
    "can make a difference",
    "must protect our planet",
    "must not litter",
    "renewable energy",
    "fossil fuels",
    "act now"
  ],

  target_vocab: [
    { word: "planet", pronunciation: "/ˈplænɪt/", definition_vi: "hành tinh", definition_en: "a large round object in space, e.g. Earth" },
    { word: "pollution", pronunciation: "/pəˈluːʃən/", definition_vi: "sự ô nhiễm", definition_en: "harmful substances that damage air, water, or land" },
    { word: "climate", pronunciation: "/ˈklaɪmɪt/", definition_vi: "khí hậu", definition_en: "the usual weather conditions of a place over a long time" },
    { word: "emissions", pronunciation: "/ɪˈmɪʃənz/", definition_vi: "lượng khí thải", definition_en: "gases released into the air, especially from factories and cars" },
    { word: "renewable", pronunciation: "/rɪˈnjuːəbəl/", definition_vi: "tái tạo", definition_en: "energy that comes from sources that do not run out, e.g. sun, wind" },
    { word: "recycle", pronunciation: "/ˌriːˈsaɪkəl/", definition_vi: "tái chế", definition_en: "to process used materials so they can be used again" },
    { word: "fossil fuels", pronunciation: "/ˌfɒsəl ˈfjuːəlz/", definition_vi: "nhiên liệu hóa thạch", definition_en: "energy sources like coal, oil, and gas that come from ancient plants" },
    { word: "melting", pronunciation: "/ˈmeltɪŋ/", definition_vi: "sự tan chảy", definition_en: "ice or snow becoming liquid because of warmth" }
  ],

  nova_instructions: {
    role: "Nova is a friendly British English teacher (female, age 28) who speaks in a warm, encouraging British accent.",
    personality: "Passionate about environmental topics, uses phrases like 'brilliant', 'absolutely', 'well done'. Engages students with real-world examples of climate action. Encourages young people to feel empowered.",
    language: "British English (RP accent)",
    correction_style: "Gentle and constructive — never criticise mistakes harshly",
    feedback: "Always praise effort first, then gently correct"
  },

  v28_format_notes: "W35 follows V28 schema: story_missions[], spark_talk[], freetalk_knowledge{}. Theme: environmental_issues. Grammar: Modal Verbs (MUST/SHOULD/CAN). Chunks from read.js bold vocabulary.",

  story_missions: [
    {
      mission_id: '1',
      id: 1,
      title: "Protecting Our Planet — What Can You Do?",
      title_en: "Protecting Our Planet — What Can You Do?",
      title_vi: "Bảo Vệ Hành Tinh — Bạn Có Thể Làm Gì?",
      theme: "Student reflects on personal environmental actions using modal verbs",
      type: "reflection",
      character: {
        name: "You — Young Environmental Hero",
        attributes: {
          student_is_learner: true,
          can_take_action: true,
          cares_about_planet: true
        },
        role: "A young person who wants to help protect the Earth"
      },
      opening_narrative: "Our planet Earth is very beautiful, but it is in danger! Today we are going to talk about what we MUST, SHOULD, and CAN do to help our planet. Think about your own life — what do you already do to help the environment? Even small actions can make a big difference!",
      story_arc: [
        {
          phase: "personal_habits",
          turns: "1-5",
          phase_name: "Your Daily Habits (must/should/can)",
          focus: "Personal actions for environmental protection using modal verbs",
          goal: "Student describes what they must, should, and can do to help the planet",
          phase_questions: [
            {
              template: "Do you think our planet Earth is in danger right now? That is such an important question! Say: Yes, our planet is in danger because of pollution, or I think our planet is in danger from climate change",
              hints: ["Yes", "planet", "in danger", "pollution", "climate change"]
            },
            {
              template: "What MUST we do to protect our planet? Absolutely right — we MUST act now! Say: We must protect our planet, or We must reduce pollution",
              hints: ["must", "protect", "planet", "reduce", "pollution", "act"]
            },
            {
              template: "What SHOULD we do every day to help the environment? Brilliant ideas! Say: We should recycle, or We should turn off lights when we leave, or We should use less plastic",
              hints: ["should", "recycle", "turn off", "lights", "plastic", "less"]
            },
            {
              template: "What CAN you do at home to help? Those are wonderful actions! Say: I can plant more trees, or I can turn off lights, or I can recycle paper and plastic",
              hints: ["can", "plant", "trees", "recycle", "turn off", "lights", "plastic"]
            },
            {
              template: "Do you think young people like you CAN make a difference? Yes, absolutely! Say: We can make a difference, or Young people can help protect the environment",
              hints: ["can", "make a difference", "protect", "environment", "help"]
            }
          ]
        },
        {
          phase: "school_community",
          turns: "6-10",
          phase_name: "Actions at School and in Your Community",
          focus: "Expanding environmental thinking to school and community",
          goal: "Student describes broader environmental actions using modal verbs",
          phase_questions: [
            {
              template: "What should we do at school to help the environment? Those are great suggestions! Say: We should plant trees at school, or We should use less paper",
              hints: ["should", "plant", "trees", "school", "paper", "less"]
            },
            {
              template: "Should we throw away plastic? That is a very important point — NO, we MUST NOT throw away plastic! Say: We must not throw plastic into the ocean, or We should not throw away plastic",
              hints: ["must not", "throw", "plastic", "ocean", "recycle"]
            },
            {
              template: "Can we use renewable energy at home? Yes, absolutely — solar power CAN replace fossil fuels! Say: We can use solar power, or Solar power can help our planet",
              hints: ["can", "solar", "power", "renewable", "energy", "fossil fuels"]
            },
            {
              template: "What do you think countries must do to stop climate change? Such thoughtful ideas! Say: Countries must reduce carbon emissions, or Countries should invest in renewable energy",
              hints: ["must", "reduce", "carbon", "emissions", "invest", "renewable", "energy"]
            },
            {
              template: "Use a modal verb to make a sentence about the environment. Say: We must protect our planet, or Solar power can replace fossil fuels, or We should recycle more",
              hints: ["must", "should", "can", "protect", "planet", "recycle", "solar"]
            }
          ]
        }
      ],
      minimum_turns: 8
    },
    {
      mission_id: 2,
      id: 2,
      title: "The Problems and Solutions — Climate Change",
      title_en: "The Problems and Solutions — Climate Change",
      title_vi: "Vấn Đề và Giải Pháp — Biến Đổi Khí Hậu",
      theme: "Identifying environmental problems and proposing solutions using modal verbs",
      type: "problem_solution",
      character: {
        name: "Environmental Scientist",
        attributes: {
          studies_climate: true,
          knows_problems: true,
          knows_solutions: true,
          polar_ice_melting: true,
          sea_levels_rising: true,
          fossil_fuels_burning: true
        },
        role: "An expert who explains climate problems and solutions to students"
      },
      opening_narrative: "Let us think about the biggest environmental problems in the world. Climate change is a serious problem. The Earth is getting warmer. Polar ice is melting. Sea levels are rising. But we know what we MUST and SHOULD do to fix these problems. Let us explore the issues and solutions together!",
      story_arc: [
        {
          phase: "problems",
          turns: "1-6",
          phase_name: "What Are the Problems?",
          focus: "Identifying environmental problems using can/must not",
          goal: "Student identifies problems and uses modal verbs correctly",
          phase_questions: [
            {
              template: "What is climate change? That is exactly right! Say: Climate change is when the Earth is getting warmer, or Climate change is a serious problem",
              hints: ["climate", "change", "Earth", "getting warmer", "problem"]
            },
            {
              template: "What happens when polar ice is melting? Yes — the sea levels are rising! Say: Polar ice is melting, or The ice is melting because the Earth is getting warmer",
              hints: ["polar ice", "melting", "sea levels", "rising", "warmer"]
            },
            {
              template: "What do factories do that is bad for the environment? Exactly right! Say: Factories produce harmful gases, or Factories make carbon emissions that warm the Earth",
              hints: ["factories", "produce", "harmful gases", "carbon emissions", "pollution"]
            },
            {
              template: "What should factories NOT do? Brilliant — we MUST NOT let factories pollute our air! Say: Factories should not release harmful gases, or We must not let factories damage our planet",
              hints: ["must not", "should not", "release", "harmful gases", "pollute", "air"]
            },
            {
              template: "Can burning fossil fuels cause climate change? Yes, absolutely — fossil fuels CAN warm our planet! Say: Burning fossil fuels can cause climate change, or Fossil fuels can make the Earth warmer",
              hints: ["can", "burning fossil fuels", "cause", "climate change", "warmer"]
            },
            {
              template: "Use CAN or MUST NOT to describe a problem: Factories ___ release harmful gases into our oceans! We MUST NOT throw plastic into the ocean!",
              hints: ["must not", "can", "throw", "plastic", "ocean", "release"]
            }
          ]
        },
        {
          phase: "solutions",
          turns: "7-12",
          phase_name: "What Are the Solutions?",
          focus: "Proposing environmental solutions using must/should/can",
          goal: "Student proposes solutions using all three modal verbs",
          phase_questions: [
            {
              template: "What MUST we do to stop climate change? Those are exactly right! Say: We must reduce carbon emissions, or We must invest in renewable energy, or We must act now",
              hints: ["must", "reduce", "carbon emissions", "renewable energy", "act now"]
            },
            {
              template: "What SHOULD governments do? Wonderful ideas from you! Say: Governments should ban single-use plastic, or Countries should plant more trees, or They should invest in renewable energy",
              hints: ["should", "ban", "single-use plastic", "plant trees", "invest"]
            },
            {
              template: "Can solar power and wind power replace fossil fuels? Yes, they CAN! Say: Solar power can replace fossil fuels, or Wind power can help our planet, or Renewable energy can save our planet",
              hints: ["can", "solar power", "wind power", "replace", "fossil fuels", "renewable"]
            },
            {
              template: "Should we cut down trees? No, we MUST NOT! Say: We must not cut down trees, or Cutting down trees destroys animal homes, or We should protect our forests",
              hints: ["must not", "should not", "cut down trees", "protect", "forests", "animal homes"]
            },
            {
              template: "What should we do with plastic? We SHOULD recycle! Say: We should recycle plastic, or We should not throw away plastic, or We can recycle paper and plastic",
              hints: ["should", "recycle", "plastic", "throw away", "less"]
            },
            {
              template: "Make three sentences: one with MUST, one with SHOULD, one with CAN about the environment. Excellent work — you used all three modal verbs perfectly!",
              hints: ["must", "should", "can", "protect", "planet", "recycle", "solar"]
            }
          ]
        }
      ],
      minimum_turns: 10
    },
    {
      mission_id: 3,
      id: 3,
      title: "Design an Environmental Campaign",
      title_en: "Design an Environmental Campaign",
      title_vi: "Thiết Kế Chiến Dịch Bảo Vệ Môi Trường",
      theme: "Student creates an environmental campaign poster and slogan using modal verbs",
      type: "creative",
      character: {
        name: "Young Environmental Activist",
        attributes: {
          designs_campaign: true,
          creates_slogans: true,
          inspires_others: true,
          acts_now: true
        },
        role: "A young activist who creates campaigns to inspire others to protect the planet"
      },
      opening_narrative: "Now it is your turn to be an environmental activist! You are going to design your own environmental campaign. Think about the most important message you want to share with the world. What MUST people know? What SHOULD they do? What CAN they do? Your campaign slogan will inspire others to act now!",
      story_arc: [
        {
          phase: "campaign_idea",
          turns: "1-5",
          phase_name: "Choosing Your Campaign Topic",
          focus: "Selecting a focused environmental topic and explaining why it matters",
          goal: "Student selects a campaign topic and justifies their choice",
          phase_questions: [
            {
              template: "What environmental problem is most important to you? That is a wonderful choice! Say: Climate change is the most important problem, or Plastic pollution is the most important problem to me",
              hints: ["climate change", "plastic pollution", "most important", "problem"]
            },
            {
              template: "Why does this problem matter? Your reasoning is excellent! Say: It matters because polar ice is melting, or It matters because our planet is in danger, or It matters because animals are losing their homes",
              hints: ["matters", "polar ice", "melting", "planet", "in danger", "animals", "homes"]
            },
            {
              template: "What MUST people know about this problem? Exactly right — we MUST make people understand! Say: People must know that our planet is in danger, or Everyone must know that climate change is serious",
              hints: ["must", "know", "planet", "in danger", "climate change", "serious"]
            },
            {
              template: "Can you think of a catchy slogan? Something like 'Act now to save our planet!' or 'Protect our planet today!' Those are brilliant slogans!",
              hints: ["Act now", "save", "planet", "Protect", "together", "make a difference"]
            }
          ]
        },
        {
          phase: "slogan_design",
          turns: "6-10",
          phase_name: "Creating Your Slogan and Action Plan",
          focus: "Writing campaign slogans and action steps using modal verbs",
          goal: "Student creates a slogan and action plan using must/should/can",
          phase_questions: [
            {
              template: "Write your slogan using MUST: We MUST protect our planet! Or Act now or lose our planet forever! Those are powerful messages!",
              hints: ["must", "protect", "planet", "Act now", "save"]
            },
            {
              template: "Write your slogan using SHOULD: We SHOULD reduce, reuse, recycle! Or Everyone should care for our Earth! Beautiful slogans!",
              hints: ["should", "reduce", "reuse", "recycle", "care for"]
            },
            {
              template: "Write your slogan using CAN: Together we CAN make a difference! Or Solar power can save our planet! Absolutely inspiring!",
              hints: ["can", "make a difference", "together", "solar power", "save"]
            },
            {
              template: "What three things should people MUST do after seeing your campaign? Perfect actions! Say: People must reduce pollution, or We must act now, or Everyone must protect our planet",
              hints: ["must", "reduce", "pollution", "act now", "protect", "planet"]
            },
            {
              template: "What SHOULD people change in their daily life? Those are practical and wonderful suggestions! Say: We should turn off lights, or We should recycle more, or We should use less plastic",
              hints: ["should", "turn off", "lights", "recycle", "plastic", "less"]
            },
            {
              template: "What CAN young people do to spread the word? Think about school, social media, or community events. Those are fantastic ideas! You are a true environmental activist!",
              hints: ["can", "young people", "school", "social media", "community", "spread"]
            }
          ]
        }
      ],
      minimum_turns: 8
    }
  ],

  spark_talk: [
    {
      id: '1',
      emoji: '🧠',
      title: "Modal Verb Quick Practice",
      title_vi: "Luyện Tập Nhanh Động Từ Khuyết Thiếu",
      focus: "Grammar reinforcement — MUST, SHOULD, CAN",
      bridge: "Great work on the story! Now let's practice modal verbs for the environment. Modal verbs help us talk about what we MUST do, what we SHOULD do, and what we CAN do to help our planet!",
      seed_question: "Complete: We ___ (must/should/can) protect our planet! Can you fill in the correct modal verb?",
      grammar_examples: [
        "We MUST protect our planet — it is very important!",
        "We SHOULD recycle paper and plastic every day.",
        "Solar power CAN replace fossil fuels."
      ],
      frames: [
        {
          template: "We ___ protect our planet.",
          follow_up_q: "Good! Now try: Factories ___ reduce carbon emissions. (must/should/can)",
          hints: ["must", "should", "can"],
          hint_en: "We MUST protect our planet!"
        },
        {
          template: "Factories ___ reduce carbon emissions.",
          follow_up_q: "Exactly! What about: Young people ___ help the environment. (must/should/can)",
          hints: ["must", "should", "can"],
          hint_en: "Factories MUST reduce carbon emissions."
        },
        {
          template: "We must not ___ plastic into the ocean.",
          follow_up_q: "Perfect! Solar power and wind power ___ replace fossil fuels. (can/must/should)",
          hints: ["must not", "throw", "dump", "put", "can"],
          hint_en: "We must NOT throw plastic into the ocean."
        },
        {
          template: "We ___ act now to save our planet.",
          follow_up_q: "Excellent! You have mastered all three modal verbs!",
          hints: ["must", "can", "should"],
          hint_en: "We MUST act now to save our planet!"
        },
        {
          template: "We ___ recycle ___ and ___ to help our planet.",
                    hint_en: "We should recycle paper and plastic to help our planet.",
          follow_up_q: "Absolutely! What else should we recycle? And what MUST we reduce to help the environment? ♻️",
          hints: ["should", "must", "can", "paper", "plastic", "glass", "reduce", "reuse"]
        },
        {
          template: "Everyone ___ take ___ of our planet Earth right ___.",
                    hint_en: "Everyone must take care of our planet Earth right now.",
          follow_up_q: "What can young people like you do to take care of our planet? Think of three things you CAN do today! 🌍",
          hints: ["must", "should", "can", "care", "action", "now", "today", "immediately"]
        },
        {
          template: "We ___ turn off lights and taps to ___ energy and ___.",
                    hint_en: "We should turn off lights and taps to save energy and water.",
          follow_up_q: "Great thinking! What other small habits can save water and energy at home? 🌊",
          hints: ["should", "must", "can", "turn off", "save", "conserve", "energy", "water", "electricity"]
        },
        {
          template: "Together we ___ make a big ___ if we all ___ for our planet.",
                    hint_en: "Together we can make a big difference if we all act for our planet.",
          follow_up_q: "You have mastered all the modal verbs! You are a true environmental hero! What will you do to help our planet starting today? 🦸",
          hints: ["can", "will", "must", "should", "difference", "change", "act", "work", "help"]
        }
      ],
      scaffold_frames: [
        "We MUST ___ our planet.",
        "Factories MUST ___ carbon emissions.",
        "We must NOT ___ plastic into the ocean.",
        "We MUST act now to save our planet.",
        "We SHOULD recycle ___ and ___.",
        "Everyone MUST ___ ___ of our planet Earth right ___.",
        "We SHOULD turn off lights and taps to ___ energy and ___.",
        "Together we CAN make a big ___ if we all ___ for our planet.",
        "We SHOULD ___ and ___ every day.",
        "Solar power CAN ___ fossil fuels.",
        "We must not ___ ___ into the ___."
      ],
      vocab_focus: ["must", "should", "can", "protect", "recycle", "solar power", "fossil fuels", "renewable"],
      turns: 8,
      prompts: [
        "Complete: We ___ (must/should/can) protect our planet!",
        "Complete: Factories ___ reduce carbon emissions. (must/should/can)",
        "Complete: Young people ___ help the environment. (must/should/can)",
        "Correct the mistake: We can protect our planet. (Change to strong obligation — use MUST)",
        "Correct the mistake: We must recycle. (Change to advice — use SHOULD)",
        "Complete: We must not ___ plastic into the ocean. (throw/dump/put)",
        "Complete: Solar power and wind power ___ replace fossil fuels. (can/must/should)",
        "Complete: We ___ act now to save our planet. (must/can/should)"
      ]
    },
    {
      id: '2',
      title: "Environmental Collocation Challenge",
      title_vi: "Thử Thách Cụm Từ Môi Trường",
      focus: "Environmental collocations from read.js",
      bridge: "Now let's practice the key collocations from our reading! These phrases will help you talk about environmental issues more naturally.",
      seed_question: "Complete: Our planet ___ in danger. (is/are). What collocations can you use?",
      grammar_examples: [
        "Our planet Earth is very beautiful but it is in danger.",
        "The Earth is getting warmer and polar ice is melting.",
        "We can make a difference if we act now!"
      ],
      frames: [
        {
          template: "Our planet ___ in danger.",
          follow_up_q: "Good! The Earth ___ getting warmer. (is/are)",
          hints: ["is", "are", "getting warmer"],
          hint_en: "Our planet IS in danger."
        },
        {
          template: "The Earth ___ getting warmer.",
          follow_up_q: "Right! Polar ice ___ melting. (is/are)",
          hints: ["is", "are", "melting"],
          hint_en: "The Earth IS getting warmer."
        },
        {
          template: "We can ___ a big difference.",
          follow_up_q: "Great! We must ___ our planet. (protect/destroy/hurt)",
          hints: ["make", "a difference", "protect"],
          hint_en: "We CAN make a big difference!"
        },
        {
          template: "We must ___ our planet.",
          follow_up_q: "Excellent! You have mastered the key collocations!",
          hints: ["protect", "save", "care for"],
          hint_en: "We MUST protect our planet!"
        },
        {
          template: "Polar ice ___ ___ because our planet is ___ ___.",
                    hint_en: "Polar ice is melting because our planet is getting warmer.",
          follow_up_q: "That is exactly right! What happens to animals when polar ice melts? Can you think of any animals in danger? 🐻‍❄️",
          hints: ["is", "are", "melting", "getting warmer", "getting hotter", "warmer", "hotter"]
        },
        {
          template: "Sea ___ are ___ because the ice is ___.",
                    hint_en: "Sea levels are rising because the ice is melting.",
          follow_up_q: "And why is that a problem? What can happen to coastal cities and islands when sea levels rise? 🏝️",
          hints: ["levels", "rising", "going up", "melting", "disappearing", "shrinking"]
        },
        {
          template: "I ___ to do my part because our planet ___ my ___ home.",
                    hint_en: "I want to do my part because our planet is my only home.",
          follow_up_q: "That is such a beautiful way to think about it! What does our planet being your home mean to you? 🏠",
          hints: ["want", "need", "hope", "promise", "vow", "is", "is my", "only", "only", "precious", "beautiful", "home"]
        },
        {
          template: "Climate ___ means our planet is getting ___ and ___ are ___.",
                    hint_en: "Climate change means our planet is getting warmer and weather patterns are changing.",
          follow_up_q: "You have mastered all the key collocations! Do you feel hopeful or worried about our planet? What gives you hope? 🌈",
          hints: ["change", "warmer", "hotter", "weather patterns", "climate", "patterns", "storms", "changing", "worse"]
        }
      ],
      scaffold_frames: [
        "Our planet ___ in danger.",
        "The Earth ___ getting warmer.",
        "Polar ice ___ ___ because our planet is ___ ___.",
        "Sea ___ are ___ because the ice is ___.",
        "We CAN ___ a big difference.",
        "We MUST ___ our planet.",
        "I ___ to do my part because our planet ___ my ___ home.",
        "Climate ___ means our planet is getting ___ and ___ are ___.",
        "Polar ice ___ melting.",
        "We can ___ a big difference.",
        "We must ___ our planet."
      ],
      vocab_focus: ["in danger", "getting warmer", "polar ice", "melting", "sea levels", "rising", "make a difference", "act now"],
      turns: 8,
      prompts: [
        "Complete: Our planet ___ in danger. (is/are)",
        "Complete: The Earth ___ getting warmer. (is/are)",
        "Complete: Polar ice ___ melting because of climate change. (is/are)",
        "Complete: Sea levels are ___. (rising/falling/dropping)",
        "Complete: We can ___ a big difference. (make/take/have)",
        "Complete: We must ___ our planet. (protect/destroy/hurt)",
        "Complete: Factories must ___ carbon emissions. (reduce/increase/create)",
        "Complete: We should ___ in renewable energy. (invest/spend/waste)"
      ]
    }
  ],

  // ── Free Talk Knowledge Base ────────────────────────────────────────────────
  freetalk_knowledge: {
    week_title: "Environmental Issues",
    week_number: 35,
    theme: "environmental_issues",
    knowledge_base: [
      "Environmental Issues: pollution, climate change, melting ice, rising sea levels, deforestation",
      "Modal verbs for environmental action: MUST = obligation, SHOULD = advice, CAN = possibility",
      "IMPORTANT — Chunk-first vocabulary: 'our planet Earth', 'is in danger', 'cutting down trees', 'throwing away plastic', 'is getting warmer', 'polar ice is melting', 'sea levels are rising', 'can make a difference', 'must protect our planet', 'renewable energy', 'fossil fuels', 'act now'",
      "IMPORTANT — When a student expresses worry about climate change, be empathetic and empowering. Say 'I understand your concern — that is why we MUST act now!' or 'It is great that you care. We CAN make a difference together!' NEVER say 'Great!' dismissively after a student expresses environmental anxiety.",
      "Renewable energy sources: solar power, wind power, hydroelectric power",
      "Solutions to environmental problems: reduce, reuse, recycle; invest in renewable energy; protect forests; reduce carbon emissions",
      "Young people CAN make a difference — small daily actions add up: turn off lights, recycle, use less plastic, plant trees",
      "Modal verb correction: If student says 'We must recycle' for advice (not strong obligation), gently correct: 'Good idea! We SHOULD recycle — SHOULD means advice.' Use MUST for: We must protect our planet, We must reduce pollution. Use SHOULD for: We should recycle, We should use less plastic. Use CAN for: Solar power can help, We can plant trees.",
      "The urgency message: We must act now — our planet needs our help today, not tomorrow"
    ],
    example_opening_questions: [
      "What is one thing you do at home to help the environment?",
      "What MUST we do to protect our planet Earth right now?",
      "What SHOULD governments do to stop climate change?",
      "What CAN young people do to help the environment?"
    ],
    starter_prompts: [
      "I think we MUST ___ to help our planet because ___.",
      "At home, we SHOULD ___ every day to be more environmentally friendly.",
      "Solar power CAN ___ our planet because ___."
    ]
  },

  // ── Conversation Cards ─────────────────────────────────────────────────────
  conversation_cards: [
    {
      id: 1,
      title: "Environmental Action Plan",
      title_vi: "Kế Hoạch Hành Động Môi Trường",
      completion_message: "Brilliant! You have created a fantastic environmental action plan using MUST, SHOULD, and CAN. Our planet needs people like you who care and take action. Keep protecting our planet Earth!",
      exchanges: [
        { speaker: "nova", text: "What is one thing you MUST do every day to help the environment?" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "Excellent! And what SHOULD other people do?" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "Absolutely right! What CAN we all do together to make an even bigger difference?" },
        { speaker: "student", text: "" }
      ]
    },
    {
      id: 2,
      title: "Climate Change Discussion",
      title_vi: "Thảo Luận Về Biến Đổi Khí Hậu",
      completion_message: "You have shown excellent understanding of climate change and its solutions. Remember — we must act now! Together, we can make a difference and protect our beautiful planet Earth.",
      exchanges: [
        { speaker: "nova", text: "Why is climate change a serious problem?" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "That is exactly right! What MUST countries do to stop it?" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "Wonderful ideas! And what CAN renewable energy replace?" },
        { speaker: "student", text: "" }
      ]
    },
    {
      id: 3,
      title: "Daily Green Habits",
      title_vi: "Thói Quen Xanh Hàng Ngày",
      completion_message: "You have thought of so many practical ways to help the environment! Every small action counts. Turning off lights, recycling, using less plastic — these all add up. You are a true environmental hero!",
      exchanges: [
        { speaker: "nova", text: "Do you turn off lights when you leave a room? You SHOULD — it saves energy!" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "That is a great habit! Do you recycle at home?" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "Perfect! And what MUST we all do to protect our planet?" },
        { speaker: "student", text: "" }
      ]
    },
    {
      id: 4,
      title: "Young People Can Make a Difference",
      title_vi: "Giới Trẻ Có Thể Tạo Ra Sự Khác Biệt",
      completion_message: "You are absolutely right — young people CAN make a big difference! Your ideas and energy are so important for our planet's future. Act now, and together we will protect our beautiful planet Earth!",
      exchanges: [
        { speaker: "nova", text: "Do you think young people like you CAN make a difference for the environment?" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "I completely agree! What should we all do to act now?" },
        { speaker: "student", text: "" },
        { speaker: "nova", text: "Those are brilliant actions! Why is it important that we act now?" },
        { speaker: "student", text: "" }
      ]
    }
  ]
};

export default week35RealData;
