// Week 13 Real Data — Daily Routines
// Grammar: Present Simple (I wake up, I go)  
// Vocab: wake up, brush teeth, eat breakfast, go to school, have lunch, play, do homework, have dinner, watch TV, go to bed

const week13RealData = {
  week_id: 13,
  phase: 1,
  title: "Week 13: Daily Routines",
  week_title_en: "Daily Routines",
  week_title_vi: "Thói quen Hàng ngày",

  grammar_focus: "Present Simple (I wake up, I go)",
  grammar_pattern: "I [verb] every day / I [verb] at [time]",

  target_vocab: [
    "wake up", "brush teeth", "eat breakfast", "go to school", "have lunch",
    "play", "do homework", "have dinner", "watch TV", "go to bed"
  ],

  grammar_examples: [
    "I wake up at 7 o'clock every day.",
    "I brush my teeth in the morning.",
    "I eat breakfast with my family.",
    "I go to school at 8 o'clock.",
    "I play with my friends after school.",
    "I do my homework in the evening.",
    "I watch TV before bed.",
    "I go to bed at 9 o'clock."
  ],

  story_missions: [
    {
      mission_id: 1,
      title: "My Morning Routine",
      title_vi: "Thói quen Buổi sáng",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher",
        personality: "Cheerful morning person who loves routines",
        avatar: "nova",
        teaching_style: "Supportive scaffolding — models sentences about daily routines"
      },

      opening_narrative: "Good morning! ☀️ I wake up at 6 o'clock every day! Then I brush my teeth! 🦷 What time do YOU wake up? Say: I wake up at 7 o'clock! or I wake up at 8 o'clock!",
      nova_greeting: "Good morning! Let's talk about your morning!",

      mission_context: `CRITICAL RULE: After EVERY student response you MUST: (1) ACKNOWLEDGE with "Great! You wake up at [time]!" echoing their sentence, (2) ask the NEXT question from the story arc, (3) give 2-3 hint choices: "Say: ___ or ___!". NEVER end without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. GRAMMAR GUARD — WEEK 13 RULE: This week ONLY uses Present Simple tense. FORBIDDEN TENSES: NEVER use past tense (woke up, ate), NEVER use present perfect (have woken up), NEVER use future (will wake up) unless asking about plans. ONLY ALLOWED: I wake up, I brush my teeth, I eat breakfast, I go to school. Use PRESENT SIMPLE for routines. OPENING: Ask about THEIR morning routine: 'What time do you wake up? Say: I wake up at 7 o'clock!' Do NOT ask for the student's name — go straight to the routine topic. STORY: Focus on their morning activities — what time they wake up, what they eat for breakfast, how they get ready for school. VOCABULARY TARGET: wake up, brush teeth, eat breakfast, go to school, morning, time. GRAMMAR ENFORCEMENT: Every answer must use 'I [verb]' in present simple — recast naturally. FORBIDDEN: Do NOT ask about talents or abilities. This is about DAILY ROUTINES, not CAN/CAN'T. Do NOT use past tense at any point. Do NOT ask another question on the last turn.`,

      target_vocab: ["wake up", "brush teeth", "eat breakfast", "go to school", "morning"],
      grammar_pattern: "I [verb] at [time] / I [verb] every day",

      story_arc: [
        {
          phase: "morning_start",
          phase_name: "Waking Up",
          phase_questions: [
            "What do you do first in the morning? Say: I brush my teeth first! or I eat breakfast first!",
            "What do you eat for breakfast? Say: I eat rice! or I eat bread! or I eat eggs!"
          ]
        },
        {
          phase: "getting_ready",
          phase_name: "Getting Ready",
          phase_questions: [
            "What time do you go to school? Say: I go to school at 7 o'clock! or I go at 8 o'clock!",
            "How do you go to school? Say: I walk to school! or I go by motorbike! or I go by bus!",
            "What do you bring to school? Say: I bring my backpack! or I bring my books!"
          ]
        },
        {
          phase: "school_morning",
          phase_name: "At School",
          phase_questions: [
            "What do you do at school in the morning? Say: I study English! or I study math!",
            "What time do you have lunch? Say: I have lunch at 11 o'clock! or I have lunch at 12 o'clock!",
            "What do you eat for lunch? Say: I eat rice! or I eat noodles!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "Your Perfect Morning",
          phase_questions: [
            "Do you like your morning routine? Say: Yes, I like my morning! or It's okay!",
            "Wonderful! You have a great morning routine!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    },

    {
      mission_id: 2,
      title: "My Perfect Day",
      title_vi: "Ngày Hoàn hảo",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher & Daily Planner",
        personality: "Organized and enthusiastic about daily activities",
        avatar: "nova",
        teaching_style: "Encouraging repetition — helps student describe full day"
      },

      opening_narrative: "Let's plan YOUR perfect day! ⭐ From morning to night! What do you do after school? Say: I play with friends! or I do homework! or I watch TV!",
      nova_greeting: "Let's talk about your perfect day!",

      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 13 Mission 2 - My Perfect Day. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova helps student describe their full day from morning to night. OPENING: Ask "What do you do after school? Say: I play! or I do homework!" STRICT GAME RULES: 1. ONLY ask about daily routines and activities. 2. Student MUST say "I [verb]" in present simple. 3. If student gives yes/no only, prompt: "Say: I play with friends! or I watch TV!" 4. Ask about ONE activity per question. VOCABULARY TARGET: play, homework, dinner, watch TV, go to bed, evening, afternoon, night. ALLOWED QUESTIONS: "What do you do after school?", "When do you do homework?", "What do you eat for dinner?", "What time do you watch TV?", "What time do you go to bed?" GRAMMAR ENFORCEMENT: Every answer must practice "I [verb]" in present simple — recast all errors naturally. GAME MECHANIC: Go through the day chronologically → after school → homework → dinner → evening → bedtime. FORBIDDEN: Do NOT ask about abilities (can/can't). NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. AVOID: Complex sentences, multiple tasks per turn. Do NOT ask another question on the last turn.`,

      target_vocab: ["play", "do homework", "have dinner", "watch TV", "go to bed", "evening", "night"],
      grammar_pattern: "I [verb] after school / I [verb] in the evening",

      story_arc: [
        {
          phase: "after_school",
          phase_name: "After School Time",
          phase_questions: [
            "What do you do first after school? Say: I play with friends! or I do homework!",
            "Where do you play? Say: I play at home! or I play outside! or I play at the park!",
            "Who do you play with? Say: I play with my friends! or I play with my brother!"
          ]
        },
        {
          phase: "evening_activities",
          phase_name: "Evening Time",
          phase_questions: [
            "What time do you do homework? Say: I do homework at 5 o'clock! or I do homework at 6 o'clock!",
            "What time do you have dinner? Say: I have dinner at 6 o'clock! or I have dinner at 7 o'clock!",
            "What do you eat for dinner? Say: I eat rice and chicken! or I eat noodles!"
          ]
        },
        {
          phase: "night_routine",
          phase_name: "Before Bed",
          phase_questions: [
            "Do you watch TV in the evening? Say: Yes, I watch TV! or No, I don't watch TV!",
            "What time do you go to bed? Say: I go to bed at 9 o'clock! or I go to bed at 10 o'clock!",
            "Do you brush your teeth before bed? Say: Yes, I brush my teeth! or Sometimes I forget!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "Perfect Day Complete",
          phase_questions: [
            "That sounds like a wonderful day! Good job describing your routine!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    },

    {
      mission_id: 3,
      title: "The Magic Clock",
      title_vi: "Đồng hồ Kỳ diệu",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher & Time Keeper",
        personality: "Fun and magical, helps students learn about time",
        avatar: "nova",
        teaching_style: "Playful questioning — makes learning time fun"
      },

      opening_narrative: "Look! I have a MAGIC CLOCK! ⏰✨ It can tell us what time you do things! What time do YOU wake up? The magic clock wants to know! Say: I wake up at 7 o'clock!",
      nova_greeting: "Let's use the magic clock to learn about your day!",

      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge with time-related praise "Great! 7 o'clock!", (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 13 Mission 3 - The Magic Clock. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova has a magic clock and asks about times for daily activities. OPENING: Show the magic clock and ask "What time do you wake up? The magic clock wants to know! Say: I wake up at 7 o'clock!" STRICT GAME RULES: 1. ONLY ask about times for daily activities. 2. Student MUST say "I [verb] at [time] o'clock" 3. If student gives activity without time, prompt: "Say: I wake up at 7 o'clock!" 4. Ask about ONE time per question. VOCABULARY TARGET: o'clock, time, morning, afternoon, evening, early, late. ALLOWED QUESTIONS: "What time do you wake up?", "What time do you eat breakfast?", "What time do you go to school?", "What time do you have lunch?", "What time do you go to bed?" GRAMMAR ENFORCEMENT: Every answer must practice "I [verb] at [number] o'clock" — recast all errors naturally. GAME MECHANIC: The magic clock "ticks" and shows different times → student says their routine times → clock gives feedback. FORBIDDEN: Do NOT ask about feelings unrelated to time. NEVER skip the time focus. AVOID: Complex sentences, multiple times per turn. Do NOT ask another question on the last turn.`,

      target_vocab: ["o'clock", "time", "early", "late", "morning", "afternoon", "evening", "night"],
      grammar_pattern: "I [verb] at [time] o'clock",

      story_arc: [
        {
          phase: "morning_times",
          phase_name: "Morning Schedule",
          phase_questions: [
            "The magic clock says MORNING! ☀️ What time do you wake up? Say: I wake up at 7 o'clock!",
            "What time do you eat breakfast? Say: I eat breakfast at 7:30! or I eat breakfast at 8 o'clock!",
            "What time do you go to school? Say: I go to school at 8 o'clock!"
          ]
        },
        {
          phase: "afternoon_times",
          phase_name: "Afternoon Schedule",
          phase_questions: [
            "The magic clock says AFTERNOON! ⛅ What time do you have lunch? Say: I have lunch at 12 o'clock!",
            "What time do you finish school? Say: I finish at 4 o'clock! or I finish at 5 o'clock!",
            "Do you go home early or late? Say: I go home early! or I go home late!"
          ]
        },
        {
          phase: "evening_times",
          phase_name: "Evening Schedule",
          phase_questions: [
            "The magic clock says EVENING! 🌙 What time do you have dinner? Say: I have dinner at 6 o'clock!",
            "What time do you do homework? Say: I do homework at 7 o'clock!",
            "What time do you go to bed? Say: I go to bed at 9 o'clock!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "Magic Clock Complete",
          phase_questions: [
            "The magic clock is happy! You know all your times! Great job!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    }
  ],

  freetalk_knowledge: {
    week_title: "Daily Routines",
    week_number: 13,
    theme: "Daily routines and time",

    knowledge_base: [
      "Daily routines: wake up, brush teeth, eat breakfast, go to school, have lunch, play, do homework, have dinner, watch TV, go to bed",
      "Grammar: I wake up at 7 o'clock. I go to school every day. I brush my teeth in the morning.",
      "Time words: o'clock, morning, afternoon, evening, night, early, late",
      "Everyone has different routines and schedules",
      "Routines help us stay organized and healthy",
      "We do some things every day (routines), and some things sometimes (hobbies)"
    ],

    world_facts: [
      "Different countries have different school times",
      "Some children wake up very early, some wake up later",
      "Breakfast foods are different around the world",
      "Most children go to bed between 8-10 o'clock"
    ],

    conversational_topics: [
      "Morning routine: waking up, getting ready, breakfast",
      "School day: going to school, lunch time, coming home",
      "Evening routine: homework, dinner, playing, watching TV",
      "Bedtime: brushing teeth, going to bed, sleep time",
      "Weekend routines vs weekday routines"
    ]
  },

  conversation_cards: [
    {
      id: "morning_routine",
      title: "My Morning Routine",
      emoji: "☀️",
      theme: "Daily Routines: Morning Activities",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Good morning! What time do you wake up? Choose: I wake up at 6 o'clock or I wake up at 7 o'clock or I wake up at 8 o'clock",
          options: ["I wake up at 6 o'clock", "I wake up at 7 o'clock", "I wake up at 8 o'clock"]
        },
        {
          ai: "Nice! What do you do first? Say: I ___ first.",
          fill_blank: "I ___ first.",
          accept_words: ["brush my teeth", "wash my face", "eat breakfast", "get dressed", "brush teeth"]
        },
        {
          ai: "Great! What do you eat for breakfast? Say: I eat ___ for breakfast.",
          fill_blank: "I eat ___ for breakfast.",
          accept_words: ["rice", "bread", "eggs", "noodles", "cereal", "milk", "pho"]
        },
        {
          ai: "Yummy! What time do you go to school? Say: I go to school at ___ o'clock.",
          fill_blank: "I go to school at ___ o'clock.",
          accept_words: ["7", "8", "6", "seven", "eight", "six"]
        },
        {
          ai: "Do you like your morning? Choose: Yes, I like my morning! or My morning is okay or I don't like mornings",
          options: ["Yes, I like my morning!", "My morning is okay", "I don't like mornings"]
        }
      ],
      completion_message: "Amazing morning routine! ☀️ You used: wake up, brush teeth, eat breakfast, and go to school perfectly!"
    },
    {
      id: "after_school_fun",
      title: "After School Fun!",
      emoji: "🎮",
      theme: "Daily Routines: Afternoon Activities",
      difficulty: "medium",
      exchanges: [
        {
          ai: "School is done! What do you do first after school? Choose: I play with friends or I do homework or I have a snack",
          options: ["I play with friends", "I do homework", "I have a snack"]
        },
        {
          ai: "Fun! What do you play? Say: I play ___.",
          fill_blank: "I play ___.",
          accept_words: ["soccer", "games", "with friends", "basketball", "video games", "outside", "tag", "hide and seek"]
        },
        {
          ai: "What time do you do homework? Say: I do homework at ___ o'clock.",
          fill_blank: "I do homework at ___ o'clock.",
          accept_words: ["4", "5", "6", "7", "four", "five", "six", "seven"]
        },
        {
          ai: "What do you eat for dinner? Say: I eat ___ for dinner.",
          fill_blank: "I eat ___ for dinner.",
          accept_words: ["rice", "chicken", "noodles", "fish", "vegetables", "soup", "meat"]
        },
        {
          ai: "After dinner, do you watch TV? Choose: Yes, I watch TV or No, I read a book or I play with my family",
          options: ["Yes, I watch TV", "No, I read a book", "I play with my family"]
        },
        {
          ai: "What time do you go to bed? Say: I go to bed at ___ o'clock.",
          fill_blank: "I go to bed at ___ o'clock.",
          accept_words: ["8", "9", "10", "eight", "nine", "ten"]
        }
      ],
      completion_message: "What a great day! 🎮 You described your whole afternoon: play, homework, dinner, and bedtime!"
    },
    {
      id: "time_detective",
      title: "Time Detective",
      emoji: "🕐",
      theme: "Daily Routines: Telling Time",
      difficulty: "medium",
      exchanges: [
        {
          ai: "I'm a time detective! 🕐 What time do you wake up? Say: I wake up at ___ o'clock.",
          fill_blank: "I wake up at ___ o'clock.",
          accept_words: ["6", "7", "8", "six", "seven", "eight"]
        },
        {
          ai: "Good clue! What time do you eat breakfast? Say: I eat breakfast at ___ o'clock.",
          fill_blank: "I eat breakfast at ___ o'clock.",
          accept_words: ["6", "7", "8", "six", "seven", "eight"]
        },
        {
          ai: "What time do you go to school? Say: I go to school at ___ o'clock.",
          fill_blank: "I go to school at ___ o'clock.",
          accept_words: ["7", "8", "seven", "eight"]
        },
        {
          ai: "What time do you have lunch? Say: I have lunch at ___ o'clock.",
          fill_blank: "I have lunch at ___ o'clock.",
          accept_words: ["11", "12", "eleven", "twelve", "noon"]
        },
        {
          ai: "What time do you go to bed? Say: I go to bed at ___ o'clock.",
          fill_blank: "I go to bed at ___ o'clock.",
          accept_words: ["8", "9", "10", "eight", "nine", "ten"]
        }
      ],
      completion_message: "Case solved! 🕐🔍 You told me ALL the times in your day! Great time detective work!"
    }
  ]
};

export default week13RealData;