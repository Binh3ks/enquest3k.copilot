// WEEK 35: Environmental Issues
// AI Tutor V28 Format — Environmental Modal Verbs
// DO NOT USE PYTHON TO CREATE THIS FILE

const week35RealData = {
  week_id: 35,
  week_number: 35,
  title: "Environmental Issues",
  weekTitle_en: "Environmental Issues (Modal Verbs)",
  weekTitle_vi: "Các Vấn Đề Môi Trường (Động Từ Modal)",
  topic: "Environmental Issues and Modal Verbs — must, should, can for protecting our planet",
  topic_vi: "Các vấn đề môi trường và động từ modal — must, should, can để bảo vệ hành tinh",
  theme: "environmental_issues",
  grammar_focus: "Modal Verbs — MUST, SHOULD, CAN",
  grammar_pattern: "We MUST protect (obligation). We SHOULD recycle (advice). We CAN plant trees (possibility).",
  grammar_examples: [
    "We must protect our planet.",
    "We should reduce, reuse, and recycle.",
    "We can plant more trees to help the environment."
  ],

  // Chunks/collocations AI must reinforce — from read.js bold chunks
  chunk_focus: [
    "blue oceans",
    "green forests",
    "high mountains",
    "our planet",
    "are changing",
    "produce harmful gases",
    "cutting down trees",
    "throwing away plastic",
    "climate change",
    "is getting warmer",
    "polar ice",
    "sea levels",
    "can make a difference",
    "must protect",
    "reduce, reuse, and recycle",
    "Climate change",
    "for thousands of years",
    "Greenhouse gases",
    "burn fossil fuels",
    "every day"
  ],

  target_vocab: [
    { word: "planet", pronunciation: "/ˈplænɪt/", definition_vi: "hành tinh", definition_en: "a large body in space like Earth" },
    { word: "pollution", pronunciation: "/pəˈluːʃən/", definition_vi: "ô nhiễm", definition_en: "harmful substances in the environment" },
    { word: "climate", pronunciation: "/ˈklaɪmɪt/", definition_vi: "khí hậu", definition_en: "weather patterns over time" },
    { word: "recycle", pronunciation: "/ˌriːˈsaɪkəl/", definition_vi: "tái chế", definition_en: "to use materials again" },
    { word: "renewable", pronunciation: "/rɪˈnjuːəbəl/", definition_vi: "tái tạo", definition_en: "energy that does not run out" },
    { word: "emissions", pronunciation: "/ɪˈmɪʃənz/", definition_vi: "khí thải", definition_en: "gases released into the air" },
    { word: "fossil fuels", pronunciation: "/ˌfɒsəl ˈfjuːəlz/", definition_vi: "nhiên liệu hóa thạch", definition_en: "coal, oil, gas for energy" },
    { word: "melting", pronunciation: "/ˈmeltɪŋ/", definition_vi: "tan chảy", definition_en: "turning from solid to liquid" },
    { word: "sea level", pronunciation: "/siː ˈlevəl/", definition_vi: "mực nước biển", definition_en: "height of ocean surface" },
    { word: "solar power", pronunciation: "/ˈsoʊlər ˈpaʊər/", definition_vi: "năng lượng mặt trời", definition_en: "energy from the sun" },
    { word: "wind power", pronunciation: "/wɪnd ˈpaʊər/", definition_vi: "năng lượng gió", definition_en: "energy from wind" }
  ],

  nova_instructions: {
    role: "Nova is a friendly British English teacher (female, age 28) who speaks in a warm, encouraging British accent.",
    personality: "Patient, supportive, uses British expressions like 'brilliant', 'lovely', 'well done'. For environmental themes: caring, passionate about nature, encourages action.",
    language: "British English (RP accent)",
    correction_style: "Gentle and constructive — never criticise mistakes harshly",
    feedback: "Always praise effort first, then gently correct"
  },

  v28_format_notes: "W35 follows V28 schema: story_missions[], spark_talk[], freetalk_knowledge{}. Theme: environmental_issues. Grammar: Modal Verbs (MUST/SHOULD/CAN). IMPORTANT: Never say 'Great!' after a student describes environmental damage or negative experiences. Use empathetic responses.",

  story_character: {
    name: "Nova - Environmental Teacher",
    personality: "Caring, passionate about nature, encourages action, patient and supportive",
    backstory: "I am Nova, your AI English teacher. I care deeply about the environment and want to help students understand how we can protect our beautiful planet.",
    speaking_style: "Warm, encouraging, uses modal verbs in every response, empathetic about environmental problems",
    facts: {
      loves_environment: true,
      teaches_modal_verbs: true,
      cares_about_planet: true,
      favorite_phrase: "We can make a difference!"
    },
    role: "Environmental education teacher who guides students to use must/should/can"
  },

  // ── Story Missions ────────────────────────────────────────────────────────────
  story_missions: [
    {
      mission_id: 1,
      id: 1,
      title: "Our Beautiful Planet",
      title_en: "Our Beautiful Planet",
      title_vi: "Hành Tinh Đẹp Của Chúng Ta",
      theme: "Describing Earth's beauty and environmental threats",
      type: "story",
      character: {
        name: "Nova - Environmental Teacher",
        attributes: {
          planet_is_beautiful: true,
          has_blue_oceans: true,
          has_green_forests: true,
          has_high_mountains: true,
          planet_in_danger: true,
          pollution_exists: true,
          climate_changing: true
        },
        role: "Teacher who cares about the environment and wants students to protect it"
      },
      opening_narrative: "Hi! I am Nova, your AI English teacher. Today we will learn about Environmental Issues. Our planet Earth is very beautiful. It has blue oceans, green forests, and high mountains. But our planet is in danger because of pollution. Let us explore this together!",
      story_arc: [
        {
          phase: "beautiful_planet",
          turns: "1-5",
          phase_name: "Earth's Beauty",
          focus: "Describing what makes our planet beautiful using modal verbs",
          goal: "Student describes Earth's features using must/should/can",
          phase_questions: [
            "What does our planet look like? That sounds wonderful! Say: Our planet has blue oceans, or Our planet has green forests, or Our planet has high mountains",
            "Why must we protect our planet? That is so important! Say: We must protect it because it is beautiful, or We must protect it because it gives us life",
            "What should we do to keep oceans clean? Brilliant idea! Say: We should not throw plastic in oceans, or We should keep water clean",
            "Use MUST to talk about protecting forests! Say: We must protect our forests, or We must not cut down all trees",
            "What can we do to help mountains stay beautiful? Excellent thinking! Say: We can plant more trees, or We can not litter"
          ]
        },
        {
          phase: "threats",
          turns: "6-9",
          phase_name: "Environmental Threats",
          focus: "Understanding pollution and climate change with empathy",
          goal: "Student describes threats using modal verbs with concern",
          phase_questions: [
            "What is happening to our planet? That sounds worrying! Say: The planet is getting warmer, or Climate change is happening, or Pollution is increasing",
            "What are factories doing? That is not good! Say: Factories produce harmful gases, or Factories pollute the air",
            "What happens when we cut down trees? Poor animals! Say: Animals lose their homes, or Forests disappear",
            "Use SHOULD to talk about stopping pollution! Say: We should stop producing harmful gases, or We should reduce pollution"
          ]
        },
        {
          phase: "hope",
          turns: "10-13",
          phase_name: "Making a Difference",
          focus: "Empowerment through actions using modal verbs",
          goal: "Student suggests solutions using must/should/can",
          phase_questions: [
            "What can we do to make a difference? That is brilliant! Say: We can reduce, reuse, and recycle, or We can plant more trees",
            "What must countries do together? Yes! Cooperation is key! Say: Countries must work together, or Countries must act now",
            "How can solar power help? Smart thinking! Say: Solar power can replace fossil fuels, or Solar power is clean energy",
            "What should you do at home? Personal action matters! Say: I should turn off lights, or I should recycle paper",
            "Finish this sentence: Together we can ___! Say: Together we can save our planet, or Together we can make a difference"
          ]
        }
      ],
      minimum_turns: 10,
      maximum_turns: 15,
      story_text: "Our planet Earth is beautiful with blue oceans, green forests, and high mountains. But our planet is in danger. Factories produce harmful gases that pollute the air. People are cutting down trees and throwing away plastic. Climate change is making the Earth warmer. Polar ice is melting and sea levels are rising. But we can make a difference! We must protect our planet. We should reduce, reuse, and recycle. We can plant more trees and use renewable energy like solar power and wind power. Small actions can make a big difference. Together, we must act now to save our planet.",
      story_text_vi: "Hành tinh Trái Đất của chúng ta rất đẹp với đại dương xanh, rừng xanh và núi cao. Nhưng hành tinh của chúng ta đang gặp nguy hiểm. Các nhà máy sản xuất khí độc hại gây ô nhiễm không khí. Mọi người đang đốn cây và vứt rác thải nhựa. Biến đổi khí hậu đang làm Trái Đất nóng lên. Băng ở hai cực đang tan và mực nước biển đang dâng. Nhưng chúng ta có thể tạo ra sự khác biệt! Chúng ta phải bảo vệ hành tinh. Chúng ta nên giảm thiểu, tái sử dụng và tái chế. Chúng ta có thể trồng thêm cây và sử dụng năng lượng tái tạo như năng lượng mặt trời và gió. Những hành động nhỏ có thể tạo ra sự khác biệt lớn. Cùng nhau, chúng ta phải hành động ngay bây giờ để cứu hành tinh."
    },
    {
      mission_id: 2,
      id: 2,
      title: "Climate Change Effects",
      title_en: "Climate Change Effects",
      title_vi: "Tác Động Của Biến Đổi Khí Hậu",
      theme: "Understanding climate change impacts using modal verbs",
      type: "practice",
      character: {
        name: "Dr. Climate - Science Expert",
        role: "Explaining climate change effects and solutions"
      },
      opening_narrative: "Hello! I am Dr. Climate. Today we will learn about climate change effects. The Earth is getting warmer because of pollution. Let us understand what is happening and what we can do!",
      story_arc: [
        {
          phase: "warming",
          turns: "1-5",
          phase_name: "Earth Getting Warmer",
          focus: "Temperature rise and its effects",
          goal: "Student describes warming using modal verbs",
          phase_questions: [
            "Why is Earth getting warmer? That is an important question! Say: Because of pollution, or Because factories produce harmful gases",
            "What must we do about warming? Yes! Action is needed! Say: We must reduce emissions, or We must stop using fossil fuels",
            "What can renewable energy do? Brilliant! Say: Renewable energy can replace fossil fuels, or Solar power can help",
            "Use SHOULD to give advice about warming! Say: We should use less energy, or We should turn off lights"
          ]
        },
        {
          phase: "ice_sea",
          turns: "6-10",
          phase_name: "Melting Ice & Rising Seas",
          focus: "Polar ice melting and sea level rise",
          goal: "Student describes ice/sea changes with concern",
          phase_questions: [
            "What is happening to polar ice? That is worrying! Say: Polar ice is melting, or Ice is disappearing",
            "What happens when ice melts? Yes! Sea levels rise! Say: Sea levels are rising, or Oceans are getting higher",
            "What must coastal cities do? Important thinking! Say: Cities must prepare for rising seas, or Cities must build walls",
            "Use CAN to talk about helping polar animals! Say: We can protect polar bears, or We can reduce warming to help animals"
          ]
        }
      ],
      minimum_turns: 8,
      maximum_turns: 12,
      story_text: "Climate change is making Earth warmer. Factories and cars produce harmful gases. These gases trap heat in the atmosphere. Polar ice is melting because of warmer temperatures. When ice melts, sea levels rise. This is dangerous for coastal cities. But we can help! We must reduce emissions. We should use renewable energy. We can plant trees to absorb carbon dioxide.",
      discussion_prompts: [
        {
          id: 1,
          question_en: "What are the main effects of climate change? Use MUST and SHOULD in your answer.",
          prompt_vi: "Những tác động chính của biến đổi khí hậu là gì? Dùng MUST và SHOULD trong câu trả lời.",
          grammar_hint: "The Earth is getting warmer. Polar ice is melting. We must act now. We should reduce emissions.",
          example_answer: "Climate change is making Earth warmer. Polar ice is melting and sea levels are rising. We must reduce emissions to stop this. We should use renewable energy instead of fossil fuels."
        }
      ]
    },
    {
      mission_id: 3,
      id: 3,
      title: "Taking Action for Our Planet",
      title_en: "Taking Action for Our Planet",
      title_vi: "Hành Động Cho Hành Tinh Của Chúng Ta",
      theme: "Student creates environmental action plan using modal verbs",
      type: "creative",
      character: {
        name: "Young Environmental Hero",
        role: "A student who wants to protect the environment"
      },
      opening_narrative: "Imagine YOU are an environmental hero! Think of three things you MUST do, three things you SHOULD do, and three things you CAN do to help the planet. What is your action plan? Tell me your ideas!",
      story_arc: [
        {
          phase: "must_actions",
          turns: "1-4",
          phase_name: "Must-Do Actions (Obligation)",
          focus: "Student identifies mandatory environmental actions",
          ai_prompts: [
            "What is one thing you MUST do to help the planet? This is non-negotiable! Say: I must recycle every day, or I must not use plastic bags",
            "What else must you do? That is essential! Say: I must save water, or I must protect forests",
            "Use MUST to describe another obligation! Say: I must teach others about pollution, or I must reduce my carbon footprint"
          ]
        },
        {
          phase: "should_actions",
          turns: "3-4",
          phase_name: "Should-Do Actions (Advice)",
          focus: "Student identifies recommended environmental actions",
          ai_prompts: [
            "What is something you SHOULD do? Good advice! Say: I should use reusable bags, or I should turn off lights when not needed",
            "What else should you do? Wise choice! Say: I should plant more trees, or I should use public transport"
          ]
        },
        {
          phase: "can_actions",
          turns: "3-4",
          phase_name: "Can-Do Actions (Possibility)",
          focus: "Student identifies possible environmental actions",
          ai_prompts: [
            "What is something you CAN do easily? Great idea! Say: I can pick up litter, or I can share environmental facts",
            "Finish your plan: I can also ___! Say: I can join environmental groups, or I can write to leaders about climate"
          ]
        }
      ],
      minimum_turns: 8,
      maximum_turns: 12,
      story_text: "Environmental heroes take action every day. They MUST recycle and reduce waste. They SHOULD use renewable energy and save water. They CAN plant trees and teach others about climate change. Everyone can make a difference if they act now. The planet needs our help!"
    }
  ],

  // ── Spark Talk ──────────────────────────────────────────────────────────────
  spark_talk: [
    {
      id: 'spark_personal_action',
      emoji: '🌍',
      title: 'Personal Environmental Action',
      bridge: 'We all must protect our planet! What about YOU — what do you do to help? 🌟',
      seed_question: 'What is one thing you do to help the environment? Say: I recycle because..., or I turn off lights because...',
      frames: [
        {
          template: 'I always ___ to help the planet.',
          follow_up_q: 'That is brilliant! Why do you do that? 🌱',
          hints: ['recycle', 'save water', 'plant trees', 'use less plastic', 'turn off lights']
        },
        {
          template: 'I think we should ___ more often.',
          follow_up_q: 'Excellent idea! How can we encourage others? 💡',
          hints: ['recycle', 'use public transport', 'pick up litter', 'share information']
        },
        {
          template: 'If everyone ___, the planet would be healthier.',
          follow_up_q: 'That is such a wise answer! You think like a true environmental hero! 🌍',
          hints: ['recycled', 'saved energy', 'protected forests', 'used renewable energy']
        }
      ],
      scaffold_frames: [
        'I always ___ to help the planet.',
        'I think we should ___ more often.',
        'If everyone ___, the planet would be healthier.'
      ],
      vocab_focus: ['recycle', 'protect', 'renewable', 'act now', 'make a difference'],
      turns: 8
    },
    {
      id: 'spark_empathy',
      emoji: '💚',
      title: 'Caring for Our Planet',
      bridge: 'When we hear about environmental problems, it can feel scary. Let us talk about hope and action! 🌻',
      seed_question: 'How do you feel when you hear about climate change? Say: I feel worried because..., or I feel hopeful because...',
      frames: [
        {
          template: 'I feel ___ when I hear about pollution.',
          follow_up_q: 'That is very honest! What can we do about it? 🌱',
          hints: ['worried', 'sad', 'concerned', 'hopeful', 'motivated']
        },
        {
          template: 'But I know we can ___ to help.',
          follow_up_q: 'You are so right! What gives you hope? 💚',
          hints: ['recycle', 'plant trees', 'use clean energy', 'teach others', 'act now']
        },
        {
          template: 'Small actions like ___ can make a big difference.',
          follow_up_q: 'That is a wonderful perspective! You understand environmental action! 🌍',
          hints: ['recycling', 'saving water', 'using less plastic', 'walking instead of driving']
        }
      ],
      scaffold_frames: [
        'I feel ___ when I hear about pollution.',
        'But I know we can ___ to help.',
        'Small actions like ___ can make a big difference.'
      ],
      vocab_focus: ['worried', 'hopeful', 'action', 'difference', 'together'],
      turns: 8
    }
  ],

  // ── Free Talk Knowledge Base ────────────────────────────────────────────────
  freetalk_knowledge: {
    week_title: "Environmental Issues",
    week_number: 35,
    theme: "environmental_issues",
    knowledge_base: [
      "Modal verbs: MUST = obligation, SHOULD = advice, CAN = possibility",
      "IMPORTANT — Use these chunks in conversation: 'blue oceans', 'green forests', 'our planet', 'climate change', 'is getting warmer', 'polar ice melting', 'sea levels rising', 'must protect', 'should recycle', 'can make a difference'",
      "IMPORTANT — Empathetic responses required. When a student describes environmental damage or pollution effects, say 'I am sorry to hear that' or 'That sounds worrying'. NEVER say 'Great!' after a student describes negative environmental events.",
      "Environmental problems: pollution, deforestation, climate change, fossil fuel use",
      "Solutions: reduce/reuse/recycle, renewable energy, planting trees, acting now",
      "Everyone can make a difference through small daily actions"
    ],
    example_opening_questions: [
      "What environmental problem worries you most?",
      "What should we do to protect our planet?",
      "How can renewable energy help?"
    ],
    starter_prompts: [
      "I think we must protect our planet by...",
      "We should reduce pollution because...",
      "I can help by recycling and..."
    ]
  },

  // ── Conversation Cards (V28 requirement: >= 3 cards with completion_message) ──
  conversation_cards: [
    {
      id: 1,
      topic: "Environmental Problems",
      situation_en: "A friend asks you: 'Why is our planet in danger?'",
      situation_vi: "Bạn hỏi: 'Tại sao hành tinh của chúng ta đang gặp nguy hiểm?'",
      sample_answer_en: "Our planet is in danger because of pollution. Factories make harmful gases and throwing away plastic pollutes our oceans.",
      vocabulary_hints: ["pollution", "harmful gases", "throwing away plastic"],
      completion_message: "Great! You explained that pollution is making our planet in danger."
    },
    {
      id: 2,
      topic: "Taking Action",
      situation_en: "A friend asks: 'What should we do to help?'",
      situation_vi: "Bạn hỏi: 'Chúng ta nên làm gì để giúp?'",
      sample_answer_en: "We should reduce, reuse, and recycle. We can plant more trees. We must act now to save our planet!",
      vocabulary_hints: ["reduce", "reuse", "recycle", "act now"],
      completion_message: "Excellent! You used must, should, and can to describe how we can help."
    },
    {
      id: 3,
      topic: "Renewable Energy",
      situation_en: "A friend asks: 'What energy sources can help our planet?'",
      situation_vi: "Bạn hỏi: 'Nguồn năng lượng nào có thể giúp hành tinh của chúng ta?'",
      sample_answer_en: "Solar power and wind power are renewable energy. They can replace fossil fuels and help reduce pollution.",
      vocabulary_hints: ["solar power", "wind power", "renewable energy", "fossil fuels"],
      completion_message: "Well done! Solar power and wind power are great examples of renewable energy!"
    }
  ]
};

export default week35RealData;