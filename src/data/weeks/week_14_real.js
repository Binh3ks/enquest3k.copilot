// Week 14 Real Data — Welcome to My World (Project Showcase)
// Grammar: Review Present Simple, Can/Can't, Possessives (my/your/his/her)
// Vocab: present, poster, introduce, family, talented, confident, proud, describe, audience, project

const week14RealData = {
  week_id: 14,
  phase: 1,
  title: "Week 14: Welcome to My World",
  week_title_en: "Welcome to My World",
  week_title_vi: "Chào mừng đến Thế giới của Tôi",

  grammar_focus: "Review: Present Simple, Can/Can't, Possessives (my/your/his/her)",
  grammar_pattern: "I am [name], I can [verb], This is my [noun]",

  target_vocab: [
    "present", "poster", "introduce", "family", "talented",
    "confident", "proud", "describe", "audience", "project"
  ],

  grammar_examples: [
    "I am introducing my project today.",
    "This is my poster about my family.",
    "I can describe my talents.",
    "My family is very important to me.",
    "I am confident when I present.",
    "I am proud of my work.",
    "The audience listens to my presentation.",
    "I introduce myself to everyone."
  ],

  story_missions: [
    {
      mission_id: 1,
      title: "My Poster Presentation",
      title_vi: "Bài thuyết trình Áp phích",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher",
        personality: "Supportive presentation coach who encourages confidence",
        avatar: "nova",
        teaching_style: "Supportive scaffolding — helps students present about themselves"
      },

      opening_narrative: "Hello! 👋 It's Presentation Day! I am so excited to see your poster! Let's introduce yourself first! What is YOUR name? Say: I am [your name]! or My name is [your name]!",
      nova_greeting: "Welcome! Let's present your poster together!",

      mission_context: `CRITICAL RULE: After EVERY student response you MUST: (1) ACKNOWLEDGE with "Great! You are [name]!" echoing their sentence, (2) ask the NEXT question from the story arc, (3) give 2-3 hint choices: "Say: ___ or ___!". NEVER end without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. GRAMMAR GUARD — WEEK 14 RULE: This week reviews Present Simple, Can/Can't, and Possessives. ALLOWED TENSES: Present Simple (I am, I have, I like), Can/Can't (I can sing, I can't fly), Possessives (my family, my poster, my name). FORBIDDEN: Do NOT use past tense or future tense unless student naturally uses it. Focus on PRESENT facts about themselves. OPENING: Ask for THEIR name first, then proceed to poster presentation. STORY: Help them introduce themselves, describe their poster, talk about what makes them special. VOCABULARY TARGET: present, poster, introduce, name, my, proud, show, tell. GRAMMAR ENFORCEMENT: Use "I am...", "My name is...", "This is my..." — recast naturally if needed. FORBIDDEN: Do NOT rush. Let them describe their poster in detail. Do NOT skip to talents — save that for Mission 3. This mission is about INTRODUCTION and POSTER. Do NOT ask another question on the last turn.`,

      target_vocab: ["present", "poster", "introduce", "name", "proud"],
      grammar_pattern: "I am [name], This is my [noun], My [noun] is [adjective]",

      story_arc: [
        {
          phase: "introduction",
          phase_name: "Introducing Myself",
          phase_questions: [
            "How old are you? Say: I am 7 years old! or I am 8 years old!",
            "Where are you from? Say: I am from Vietnam! or I am from [city]!"
          ]
        },
        {
          phase: "poster_description",
          phase_name: "My Poster",
          phase_questions: [
            "Tell me about your poster! What is on your poster? Say: There is my family! or There are pictures!",
            "What colors are on your poster? Say: There is red and blue! or There are many colors!",
            "Are you proud of your poster? Say: Yes, I am proud! or I am very happy!"
          ]
        },
        {
          phase: "favorites",
          phase_name: "About Me",
          phase_questions: [
            "What is your favorite subject? Say: I like English! or I like math!",
            "What do you like to do? Say: I like to play! or I like to read!",
            "Do you have any pets? Say: Yes, I have a dog! or No, I don't have pets!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "Great Presentation!",
          phase_questions: [
            "You did a great job presenting! Are you happy with your presentation? Say: Yes, I am happy! or Yes, I am proud!",
            "Wonderful! Your poster is amazing! Great presentation!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    },

    {
      mission_id: 2,
      title: "My Family and Friends",
      title_vi: "Gia đình và Bạn bè",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher",
        personality: "Warm and caring, loves hearing about families",
        avatar: "nova",
        teaching_style: "Encouraging sharing — helps students describe their loved ones"
      },

      opening_narrative: "Now let's talk about the people you love! 💕 Tell me about YOUR family! How many people are in your family? Say: I have 4 people! or I have 5 people!",
      nova_greeting: "Let's talk about your family and friends!",

      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 14 Mission 2 - My Family and Friends. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova helps student describe family and friends. OPENING: Ask "How many people are in your family? Say: I have 4 people! or I have 5 people!" STRICT GAME RULES: 1. ONLY ask about family members and friends. 2. Student uses "I have...", "My [family member] is...", "His/Her name is..." 3. Practice possessives: my, your, his, her. VOCABULARY TARGET: family, mother, father, brother, sister, friend, have, love. ALLOWED QUESTIONS: Family size, names, ages, what they do, favorite family member, best friends. GRAMMAR ENFORCEMENT: Practice "I have...", "My mother is...", "His name is..." — recast naturally. GAME MECHANIC: Start with family size → parents → siblings → extended family → friends. FORBIDDEN: Do NOT ask about routines or abilities. This mission is about PEOPLE, not activities. AVOID: Complex family structure questions. Do NOT ask another question on the last turn.`,

      target_vocab: ["family", "have", "mother", "father", "brother", "sister", "friend", "love"],
      grammar_pattern: "I have [number] people, My [family member] is [adjective], His/Her name is [name]",

      story_arc: [
        {
          phase: "family_members",
          phase_name: "My Family",
          phase_questions: [
            "Who is in your family? Say: I have my mother and father! or I have my parents and brother!",
            "What is your mother's name? Say: Her name is [name]! or My mother's name is [name]!",
            "What is your father's name? Say: His name is [name]! or My father's name is [name]!"
          ]
        },
        {
          phase: "siblings_and_extended",
          phase_name: "Brothers, Sisters & More",
          phase_questions: [
            "Do you have brothers or sisters? Say: Yes, I have a brother! or No, I don't have siblings!",
            "Do you have grandparents? Say: Yes, I have grandparents! or They live far away!",
            "Who do you live with? Say: I live with my parents! or I live with my family!"
          ]
        },
        {
          phase: "friends",
          phase_name: "My Friends",
          phase_questions: [
            "Do you have a best friend? Say: Yes, his name is [name]! or Yes, her name is [name]!",
            "What do you do with your friends? Say: We play together! or We study together!",
            "Do you love your family and friends? Say: Yes, I love them! or They are important to me!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "People I Love",
          phase_questions: [
            "Your family and friends sound wonderful! Great job describing them!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    },

    {
      mission_id: 3,
      title: "What I Can Do",
      title_vi: "Điều tôi có thể làm",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher & Talent Scout",
        personality: "Enthusiastic and supportive, celebrates all talents",
        avatar: "nova",
        teaching_style: "Encouraging exploration — helps students share their abilities"
      },

      opening_narrative: "Now the FUN part! 🌟 Let's talk about your TALENTS! What can YOU do? Can you sing? Can you dance? Can you draw? Tell me! Say: I can sing! or I can draw! or I can dance!",
      nova_greeting: "Let's discover all your amazing talents!",

      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge with enthusiasm "Wow! You can [talent]!", (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 14 Mission 3 - What I Can Do. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova is a talent scout who wants to discover all the student's abilities. OPENING: Ask "What can YOU do? Can you sing? Say: I can sing! or I can draw!" STRICT GAME RULES: 1. ONLY ask about abilities using CAN/CAN'T. 2. Student MUST say "I can [verb]" or "I can't [verb]". 3. If student gives yes/no only, prompt: "Say: I can sing! or I can't sing!" 4. Ask about ONE talent per question. VOCABULARY TARGET: can, can't, sing, dance, draw, swim, run, jump, play, cook, help. ALLOWED QUESTIONS: "What can you do?", "Can you sing?", "Can you draw?", "Can you swim?", "Can you cook?", "What is your best talent?" GRAMMAR ENFORCEMENT: Every answer must practice "I can [verb]" or "I can't [verb]" — recast all errors naturally. GAME MECHANIC: Discover multiple talents → praise each one → ask about practice → identify "special talent". FORBIDDEN: Do NOT ask about routines or times. This mission is about ABILITIES (can/can't), not schedules. NEVER say negative things about talents. AVOID: Complex ability questions. Do NOT ask another question on the last turn.`,

      target_vocab: ["can", "can't", "sing", "dance", "draw", "swim", "talented", "good"],
      grammar_pattern: "I can [verb], I can't [verb], I am good at [verb+ing]",

      story_arc: [
        {
          phase: "discovering_talents",
          phase_name: "Discovering Talents",
          phase_questions: [
            "Let's find out what you can do! Can you sing? Say: Yes, I can sing! or No, I can't sing!",
            "Can you dance? Say: Yes, I can dance! or No, I can't dance!",
            "Can you draw or paint? Say: Yes, I can draw! or I can paint!"
          ]
        },
        {
          phase: "more_abilities",
          phase_name: "More Abilities",
          phase_questions: [
            "Can you swim? Say: Yes, I can swim! or No, I can't swim!",
            "Can you run fast? Say: Yes, I can run fast! or I can run a little!",
            "Can you help at home? Say: Yes, I can help! or I help my mom!"
          ]
        },
        {
          phase: "special_talent",
          phase_name: "Your Special Talent",
          phase_questions: [
            "What is your BEST talent? What are you really good at? Say: I am good at [talent]!",
            "Are you proud of your talents? Say: Yes, I am proud! or I want to learn more!",
            "Do you want to show your talents to people? Say: Yes, I want to show them! or Maybe!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "You Are Talented!",
          phase_questions: [
            "You have so many wonderful talents! You are amazing! Great presentation!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    }
  ],

  freetalk_knowledge: {
    week_title: "Welcome to My World",
    week_number: 14,
    theme: "Self-introduction, family, and talents presentation",

    knowledge_base: [
      "Presentation skills: introduce yourself, describe poster, share talents",
      "Grammar: I am [name], I can [verb], This is my [noun], My [noun] is [adjective]",
      "Self: name, age, where you're from, favorites, what makes you special",
      "Family: my mother, my father, my brother, my sister, I have [number] people, I love my family",
      "Talents: I can sing, I can dance, I can't swim, I am good at drawing",
      "Feelings: I am proud, I am confident, I am happy, I am excited"
    ],

    world_facts: [
      "Children around the world present in different ways",
      "Families come in all sizes - big families, small families, extended families",
      "Everyone has different talents and that's what makes us special",
      "Presenting about yourself helps build confidence"
    ],

    conversational_topics: [
      "Self-introduction: My name is..., I am... years old, I am from...",
      "My poster: What's on your poster, colors you used, why you're proud",
      "My family: Who is in your family, their names, what they do",
      "My talents: What I can do, what I can't do, what I'm good at",
      "Being confident: Feeling proud of your work, sharing with others"
    ]
  },

  conversation_cards: [
    {
      id: "my_poster_presentation",
      title: "My Poster Presentation",
      emoji: "📊",
      theme: "Project Showcase: Presenting My Work",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Hello! What is your poster about? Choose: My poster is about my family or My poster is about my talents or My poster is about my hobbies",
          options: ["My poster is about my family", "My poster is about my talents", "My poster is about my hobbies"]
        },
        {
          ai: "Great topic! How do you introduce yourself? Say: My name is Binh and I am a student or My name is Binh and I am talented or My name is Binh and I am confident",
          options: ["My name is Binh and I am a student", "My name is Binh and I am talented", "My name is Binh and I am confident", "My name is Binh and I am 8 years old"]
        },
        {
          ai: "Nice introduction! What can you do? Say: I can sing or I can dance or I can draw",
          options: ["I can sing", "I can dance", "I can draw", "I can play guitar", "I can speak English"]
        },
        {
          ai: "That's a great talent! How do you feel when you present? Say: I feel confident or I feel proud or I feel happy",
          options: ["I feel confident", "I feel proud", "I feel happy", "I feel excited"]
        },
        {
          ai: "What does the audience do? Choose: The audience listens carefully or The audience smiles at me or The audience claps their hands",
          options: ["The audience listens carefully", "The audience smiles at me", "The audience claps their hands"]
        }
      ],
      completion_message: "Excellent presentation! 📊 You used: present, poster, introduce, confident, proud, and audience perfectly!"
    },
    {
      id: "my_family_showcase",
      title: "My Family Showcase",
      emoji: "👨‍👩‍👧‍👦",
      theme: "Project Showcase: Introducing My Family",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Welcome to your family presentation! How many people are in your family? Choose: My family has 3 people or My family has 4 people or My family has 5 people",
          options: ["My family has 3 people", "My family has 4 people", "My family has 5 people"]
        },
        {
          ai: "Who is in your family? Say: I have mom and dad or I have a sister or I have a brother",
          options: ["I have mom and dad", "I have a sister", "I have a brother", "I have mom dad and sister"]
        },
        {
          ai: "Tell me about someone in your family. Say: My mom is kind or My dad is funny or My sister is talented",
          options: ["My mom is kind", "My dad is funny", "My sister is talented", "My brother is smart"]
        },
        {
          ai: "What does your family do together? Say: We play together or We eat dinner or We watch TV",
          options: ["We play together", "We eat dinner", "We watch TV", "We go to the park"]
        },
        {
          ai: "How do you feel about your family? Choose: I am proud of my family or I love my family or My family is special",
          options: ["I am proud of my family", "I love my family", "My family is special"]
        },
        {
          ai: "Great job describing your family! Are you proud? Say: Yes, I am proud of my family or Yes, I am proud of my poster or Yes, I am proud of myself",
          options: ["Yes, I am proud of my family", "Yes, I am proud of my poster", "Yes, I am proud of myself"]
        }
      ],
      completion_message: "Beautiful family presentation! 👨‍👩‍👧‍👦 You described your family with: introduce, family, talented, proud, and describe!"
    },
    {
      id: "talent_showcase",
      title: "Talent Showcase",
      emoji: "⭐",
      theme: "Project Showcase: Sharing My Talents",
      difficulty: "medium",
      exchanges: [
        {
          ai: "It's talent time! 🌟 What talent do you want to show? Say: I can sing or I can dance or I can draw pictures",
          options: ["I can sing", "I can dance", "I can draw pictures", "I can play guitar", "I can speak English well"]
        },
        {
          ai: "That's amazing! How often do you practice? Say: I practice every day or I practice sometimes or I practice a lot",
          options: ["I practice every day", "I practice sometimes", "I practice a lot"]
        },
        {
          ai: "Do you practice a lot? Choose: Yes, I practice every day or I practice sometimes or Yes, I love practicing",
          options: ["Yes, I practice every day", "I practice sometimes", "Yes, I love practicing"]
        },
        {
          ai: "What do people say when they see your talent? Say: They say good job or They say wow or They say you are talented",
          options: ["They say good job", "They say wow", "They say you are talented", "They say amazing"]
        },
        {
          ai: "How do you feel about your talent? Say: I feel confident when I perform or I feel proud when I perform or I feel happy when I perform",
          options: ["I feel confident when I perform", "I feel proud when I perform", "I feel happy when I perform", "I feel excited when I perform"]
        }
      ],
      completion_message: "Star performance! ⭐ You shared your talents using: can, talented, confident, proud, and present wonderfully!"
    }
  ]
};

export default week14RealData;