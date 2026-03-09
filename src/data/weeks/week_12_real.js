// Week 12 Real Data — The Talent Show
// Grammar: I can / I can't
// Vocab: sing, dance, draw, run, jump, swim, climb, cook, talent, perform

const week12RealData = {
  week_id: 12,
  phase: 1,
  title: "Week 12: The Talent Show",
  week_title_en: "The Talent Show",
  week_title_vi: "Chương trình Tài năng",

  grammar_focus: "I can / I can't",
  grammar_pattern: "I can [verb] / I can't [verb]",

  target_vocab: [
    "sing", "dance", "draw", "run", "jump", "swim",
    "climb", "cook", "talent", "perform"
  ],

  story_missions: [
    {
      mission_id: 1,
      title: "My Talents",
      title_vi: "Tài năng của Tôi",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher",
        personality: "Friendly, encouraging and enthusiastic about student abilities",
        avatar: "nova",
        teaching_style: "Supportive scaffolding — gives full model sentences before asking student to repeat"
      },

      opening_narrative: "Hi! I'm Ms. Nova! 🌟 Let's talk about YOUR talents! I can sing! La la la! What can YOU do? Say: I can sing! or I can dance! or I can draw!",
      nova_greeting: "Hi! Let's talk about your talents!", // DEPRECATED

      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 12 Mission 1 - My Talents. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova is curious about the student's special abilities and wants to celebrate them. OPENING: Ask student's name, then say "I can sing! Can you sing? Say: Yes, I can sing! or No, I can't sing!" STRICT GAME RULES: 1. ONLY ask about abilities using "I can / I can't". 2. Student MUST say "I can [verb]" or "I can't [verb]". 3. If student gives yes/no only, prompt full sentence: "Say: I can dance!" 4. Ask about ONE ability per question. VOCABULARY TARGET: sing, dance, draw, run, jump, swim, climb, cook, talent, perform. ALLOWED QUESTIONS: "Can you sing?", "Can you dance?", "What can you do?", "What is your talent?", "Can you swim?", "Can you draw?" GRAMMAR ENFORCEMENT: Every answer must practice "I can [verb]" or "I can't [verb]" — recast all errors naturally. GAME MECHANIC: Ask about ONE ability per turn → student says 'I can [verb]' or 'I can't [verb]' → confirm/recast → ask about next ability. FORBIDDEN: Do NOT ask about feelings, preferences, or unrelated topics. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. AVOID: Multiple verbs per turn, complex sentences. Cover at least 5 different abilities. Do NOT ask another question on the last turn.`,

      target_vocab: ["sing", "dance", "draw", "run", "jump", "swim"],
      grammar_pattern: "I can [verb] / I can't [verb]",

      story_arc: [
        {
          phase: "introduction",
          phase_name: "Meet Nova",
          phase_questions: [
            "What is your name?",
            "Can you sing? Say: Yes, I can sing! or No, I can't sing!"
          ]
        },
        {
          phase: "talent_check",
          phase_name: "Discover Talents",
          phase_questions: [
            "Can you dance?",
            "Can you draw?",
            "Can you run fast?",
            "Can you jump high?"
          ]
        },
        {
          phase: "more_talents",
          phase_name: "More Abilities",
          phase_questions: [
            "Can you swim?",
            "Can you cook?",
            "What is your best talent? Say: I can sing very well! or I can dance very well!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "Celebrate Talents",
          phase_questions: [
            "Tell me one more thing you can do!",
            "Wonderful! You have amazing talents!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    },

    {
      mission_id: 2,
      title: "The Talent Show Night",
      title_vi: "Đêm Tài năng",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher & Talent Show Host",
        personality: "Excited emcee who celebrates every performance",
        avatar: "nova",
        teaching_style: "Enthusiastic encouragement — models sentences then invites student to perform"
      },

      opening_narrative: "Welcome to THE TALENT SHOW! 🎤🌟 I am the host tonight! Can YOU perform? What can you do ON STAGE? Say: I can sing on stage! or I can dance on stage!",
      nova_greeting: "Welcome to the Talent Show! I'm the host tonight!", // DEPRECATED

      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 12 Mission 2 - The Talent Show Night. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova hosts a talent show and invites the student to perform. OPENING: Welcome student to the show, ask "What is your talent? Say: I can [verb]. I can sing!" STRICT GAME RULES: 1. ONLY ask about performing abilities. 2. Student MUST say "I can [verb]" or "I can't [verb] yet". 3. If student gives yes/no only, prompt: "Say: I can perform! or I can't yet but I want to try!" 4. Ask about ONE performance per question. VOCABULARY TARGET: sing, dance, perform, talent, stage, audience, practice, amazing. ALLOWED QUESTIONS: "What can you do on stage?", "Can you sing for us?", "Can you perform?", "What is your special talent?", "Can you dance?" GRAMMAR ENFORCEMENT: Every answer must practice "I can [verb]" or "I can't [verb] yet" — recast all errors naturally. GAME MECHANIC: Announce ONE performance slot per turn → student says what they can do → applaud/recast → next performance slot. FORBIDDEN: Do NOT ask about feelings unrelated to the show. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. AVOID: Complex sentences, multiple tasks per turn. Do NOT ask another question on the last turn.`,

      target_vocab: ["sing", "dance", "perform", "talent", "stage", "practice", "amazing", "audience"],
      grammar_pattern: "I can [verb] on stage / I can't [verb] yet",

      story_arc: [
        {
          phase: "show_opening",
          phase_name: "Welcome to the Show!",
          phase_questions: [
            "Welcome! What is your talent? Say: My talent is singing! or My talent is dancing!",
            "Can you sing? Say: Yes, I can sing! or No, I can't sing!"
          ]
        },
        {
          phase: "performances",
          phase_name: "Time to Perform!",
          phase_questions: [
            "Can you dance on stage?",
            "Can you draw a picture for everyone?",
            "Can you run or do something fast?",
            "What else can you do? Say: I can sing! or I can draw!"
          ]
        },
        {
          phase: "practice_talk",
          phase_name: "Talk About Practice",
          phase_questions: [
            "Do you practice your talent? Say: I practice singing every day! or I practice dancing every day!",
            "What can't you do yet? Say: I can't swim yet. But I want to learn!"
          ]
        },
        {
          phase: "conclusion",
          phase_name: "Show Finale",
          phase_questions: [
            "Last performance! What is your BEST talent?",
            "Everyone claps! You are amazing!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    },

    {
      mission_id: 3,
      title: "The Talent Challenge",
      title_vi: "Thử thách Tài năng",

      story_character: {
        name: "Ms. Nova",
        role: "AI English Teacher & Game Host",
        personality: "Playful challenger who asks yes/no ability questions",
        avatar: "nova",
        teaching_style: "Question-answer game — asks Can you? and waits for Yes, I can / No, I can't"
      },

      opening_narrative: "Hey! 🏆 Let's play TALENT CHALLENGE! I will ask: Can you ___? You say: Yes, I can! or No, I can't! Ready? Can YOU run? Say: Yes, I can run! or No, I can't run!",
      nova_greeting: "Let's play Talent Challenge! Can you do it?", // DEPRECATED

      mission_context: `CRITICAL RULE: After EVERY student response, you MUST (1) acknowledge briefly, (2) ask the NEXT question from the story, (3) give 2-3 hint choices: "Say: ___ or ___!" NEVER end a response without a question + choices. LAST TURN (turn 12) ONLY: short goodbye + what student learned. No more questions. This is Week 12 Mission 3 - The Talent Challenge. STUDENT PROFILE: 6-12 years old Vietnamese children, A0+ level. CHARACTER: Ms. Nova plays a rapid-fire ability challenge game, asking "Can you [verb]?" questions one by one. OPENING: Explain the game: "I ask 'Can you [verb]?' You answer 'Yes, I can [verb]!' or 'No, I can't [verb]!' Let's start! Can you swim?" STRICT GAME RULES: 1. ONLY ask "Can you [verb]?" questions. 2. Student MUST answer "Yes, I can [verb]!" or "No, I can't [verb]!" 3. If student gives yes/no only, prompt: "Say the full answer: Yes, I can swim! or No, I can't swim!" 4. One question per turn. VOCABULARY TARGET: swim, climb, cook, ride, jump, fly, sing, draw, run, dance, ability, learn. ALLOWED QUESTIONS: "Can you swim?", "Can you climb a tree?", "Can you cook?", "Can you ride a bike?", "Can you fly?" (fun/impossible ones allowed for humor) GRAMMAR ENFORCEMENT: Every answer must use full "Yes, I can [verb]" or "No, I can't [verb]" — recast all short answers. GAME MECHANIC: Ask "Can you [verb]?" → student says 'Yes, I can [verb]!' or 'No, I can't [verb]!' → celebrate/recast → next challenge. FORBIDDEN: Do NOT ask open-ended questions about feelings. NEVER say 'Tell me more!', 'What do you want to talk about?', or 'I see!' as filler. Include 1-2 funny/impossible questions (Can you fly?) to make it fun. Do NOT ask another question on the last turn.`,

      target_vocab: ["swim", "climb", "cook", "ride", "jump", "sing", "draw", "run", "ability", "learn"],
      grammar_pattern: "Can you [verb]? Yes, I can! / No, I can't!",

      story_arc: [
        {
          phase: "game_start",
          phase_name: "Challenge Begins!",
          phase_questions: [
            "Can you run? Say: Yes, I can run! or No, I can't run!",
            "Can you jump? Say: Yes, I can jump! or No, I can't jump!"
          ]
        },
        {
          phase: "sport_challenge",
          phase_name: "Sports Talents!",
          phase_questions: [
            "Can you swim?",
            "Can you climb a tree?",
            "Can you ride a bike?"
          ]
        },
        {
          phase: "art_challenge",
          phase_name: "Creative Talents!",
          phase_questions: [
            "Can you sing?",
            "Can you draw?",
            "Can you dance?"
          ]
        },
        {
          phase: "funny_challenge",
          phase_name: "Funny Challenge!",
          phase_questions: [
            "Can you fly? (Ha ha!) Say: No, I can't fly!",
            "What is one thing you WANT to learn? Say: I want to learn to swim! or I want to learn to cook!"
          ]
        }
      ],

      minimum_turns: 10,
      maximum_turns: 12,
      expected_duration: "10-12 minutes"
    }
  ],

  // === FREE TALK KNOWLEDGE BASE ===
  freetalk_knowledge: {
    week_title: "The Talent Show",
    week_number: 12,
    theme: "Abilities & Talents",

    knowledge_base: [
      "Abilities: sing, dance, draw, run, jump, swim, climb, cook, perform, ride",
      "Grammar: I can sing. I can't swim yet. Can you dance? Yes, I can! No, I can't!",
      "A talent is something you can do very well",
      "Everyone has different talents and abilities",
      "We practice to get better at our talents",
      "Singing uses your voice and music",
      "Dancing uses your body and music",
      "Drawing uses your hands and creativity",
      "Swimming is a talent and also a life skill",
      "You can say 'I can't ... yet' when you are still learning"
    ],

    example_opening_questions: [
      "What can you do?",
      "What is your talent?",
      "Can you sing?",
      "Can you swim?",
      "What can't you do yet?",
      "What do you want to learn?",
      "Who has an amazing talent in your family?"
    ],

    starter_prompts: [
      { text_en: "I want to play games! 🎮", text_vi: "Tôi muốn chơi game!", type: "game" },
      { text_en: "Translate this for me... 📖", text_vi: "Dịch giúp con câu/chữ này...", type: "help" },
      { text_en: "Let's do roleplay! 🎭", text_vi: "Chơi nhập vai đi cô!", type: "roleplay" },
      { text_en: "I have a question! ❓", text_vi: "Con có câu hỏi!", type: "ask_anything" }
    ],

    bonus_roleplay: {
      id: 'week12_talent_show',
      label_en: "Talent Show Host 🎤",
      label_vi: "MC Chương trình Tài năng 🎤",
      icon: "🎤",
      ai_role: "Talent show host interviewing contestants",
      user_role: "Student performing in the talent show",
      intro: "Welcome to the TALENT SHOW! 🌟 What is your talent? What can you do on stage?",
      context: "Week 12 theme - Abilities. AI acts as enthusiastic talent show host asking student about their abilities (I can sing/dance/draw/swim). Host asks 'Can you [verb]?' and student responds 'Yes, I can [verb]!' or 'No, I can't [verb] yet!' Celebrate every answer with applause. Use simple words suitable for A0+ level."
    }
  },

  conversation_cards: [
    {
      id: "can_you_do_it",
      title: "Can You Do It?",
      emoji: "🌟",
      theme: "Abilities — I can / I can't",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Can you sing? Say: Yes, I can sing! or No, I can't sing!",
          options: ["Yes, I can sing!", "No, I can't sing!"]
        },
        {
          ai: "Can you dance? Say: I can dance! or I can't dance!",
          fill_blank: "I ___ dance",
          accept_words: ["can", "can't", "cannot", "I can", "I can't"]
        },
        {
          ai: "Can you swim? Say: Yes, I can swim! or No, I can't swim yet!",
          options: ["Yes, I can swim!", "No, I can't swim yet!"]
        },
        {
          ai: "What is your talent? Say: My talent is ___ing!",
          fill_blank: "My talent is ___ing",
          accept_words: ["singing", "dancing", "drawing", "running", "cooking", "swimming", "climbing"]
        },
        {
          ai: "What can you NOT do yet? Say: I can't ___ yet!",
          fill_blank: "I can't ___ yet",
          accept_words: ["swim", "sing", "dance", "draw", "cook", "climb", "fly", "ride"]
        }
      ],
      completion_message: "Amazing talents! 🌟 You practiced: I can sing/dance/swim! I can't fly yet!"
    },
    {
      id: "talent_show_stage",
      title: "On the Stage!",
      emoji: "🎤",
      theme: "Performing — I can perform",
      difficulty: "medium",
      exchanges: [
        {
          ai: "Welcome to the Talent Show! What can you do on stage? Say: I can [verb]!",
          fill_blank: "I can ___",
          accept_words: ["sing", "dance", "draw", "perform", "run", "jump", "I can"]
        },
        {
          ai: "Can you sing a song? Say: Yes, I can sing! or No, I can't sing but I can ___!",
          options: ["Yes, I can sing!", "No, I can't sing but I can dance!"]
        },
        {
          ai: "The audience is watching! What is your best talent? Say: My best talent is ___ing!",
          fill_blank: "My best talent is ___ing",
          accept_words: ["singing", "dancing", "drawing", "running", "jumping", "cooking"]
        },
        {
          ai: "Can you teach me ONE thing you can do? Say: I can [verb]. You try: [verb]!",
          fill_blank: "I can ___. You try: ___!",
          accept_words: ["sing", "dance", "draw", "jump", "run", "swim", "I can"]
        },
        {
          ai: "Last question: Can you do something I can't do? Say: I can ___ but you can't!",
          fill_blank: "I can ___",
          accept_words: ["sing", "dance", "run", "jump", "swim", "draw", "cook", "climb"]
        }
      ],
      completion_message: "Bravo! 👏 You performed great! You used: I can sing! I can dance! On stage!"
    },
    {
      id: "ability_challenge",
      title: "Ability Challenge!",
      emoji: "🏆",
      theme: "Can you? Yes/No Answers",
      difficulty: "easy",
      exchanges: [
        {
          ai: "Challenge 1! Can you run fast? Say: Yes, I can run fast! or No, I can't run fast!",
          options: ["Yes, I can run fast!", "No, I can't run fast!"]
        },
        {
          ai: "Challenge 2! Can you jump high? Say: Yes, I can jump high! or No, I can't jump high!",
          options: ["Yes, I can jump high!", "No, I can't jump high!"]
        },
        {
          ai: "Challenge 3! Can you draw a star? Say: Yes, I can draw! or No, I can't draw!",
          options: ["Yes, I can draw!", "No, I can't draw!"]
        },
        {
          ai: "Challenge 4! Can you cook? Say: Yes, I can cook! or No, I can't cook yet!",
          options: ["Yes, I can cook!", "No, I can't cook yet!"]
        },
        {
          ai: "Final challenge! Can you fly? Ha ha! Say: No, I can't fly! I am not a bird!",
          options: ["No, I can't fly!", "Ha ha! I can't fly!"]
        }
      ],
      completion_message: "Challenge complete! 🏆 You used: Yes, I can! No, I can't! Great job!"
    }
  ]
};

export default week12RealData;
