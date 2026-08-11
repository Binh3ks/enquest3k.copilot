/**
 * Week 33 Gold Standard Reference Data — Nova Speaking Hub
 * Includes 2-Phase Podcast Shadowing (5 Sentences + 1 Long Paragraph) and 5-Turn Live Talk Show.
 */

export const speakingHubData = {
  week: 33,
  theme: "Apologizing for Clumsy Accidents",

  // Phase 1: EXACTLY 5 Single Podcast Shadowing Sentences
  shadowing_sentences: [
    {
      id: "sh_01",
      speaker: "Tom",
      text: "I am so sorry! I broke the alarm clock because I was clumsy in the morning.",
      phonetic_guide: "aɪ æm soʊ ˈsɑːri! aɪ broʊk ðə əˈlɑːrm klɑːk bɪˈkɑːz aɪ wɑːz ˈklʌmzi..."
    },
    {
      id: "sh_02",
      speaker: "Mia",
      text: "Don't worry! Accidents happen, but we must be more careful next time.",
      phonetic_guide: "doʊnt ˈwɜːri! ˈæksədənts ˈhæpən, bʌt wiː mʌst biː mɔːr ˈkerfəl..."
    },
    {
      id: "sh_03",
      speaker: "Tom",
      text: "While I was running downstairs, I slipped on a wet puddle and fell onto the rug.",
      phonetic_guide: "waɪl aɪ wɑːz ˈrʌnɪŋ ˌdaʊnˈsterz, aɪ slɪpt ɑːn ə wet ˈpʌdəl ænd fel ˈɑːntu ðə rʌɡ."
    },
    {
      id: "sh_04",
      speaker: "Tom",
      text: "Thank you for finding my lost backpack on the bus seat!",
      phonetic_guide: "θæŋk juː fɔːr ˈfaɪndɪŋ maɪ lɔːst ˈbæk.pæk ɑːn ðə bʌs siːt!"
    },
    {
      id: "sh_05",
      speaker: "Mia",
      text: "You should apologize to your teacher and promise to be more cautious in the future.",
      phonetic_guide: "juː ʃʊd əˈpɑːlədʒaɪz tuː jʊər ˈtiːtʃər ænd ˈprɑːmɪs tuː biː mɔːr ˈkɑːʃəs..."
    }
  ],

  // Phase 2: 1 Continuous Long Paragraph combining all 5 sentences above
  shadowing_paragraph: {
    title: "Continuous Shadowing: Tom's Clumsy Morning Story",
    text: "I am so sorry! I broke the alarm clock because I was clumsy in the morning. Don't worry! Accidents happen, but we must be more careful next time. While I was running downstairs, I slipped on a wet puddle and fell onto the rug. Thank you for finding my lost backpack on the bus seat! You should apologize to your teacher and promise to be more cautious in the future.",
    phonetic_guide: "Full story intonation guide: Practice continuous rhythm, rising pitch on questions, and falling pitch on apologies."
  },

  // 5-Turn Interactive Live Talk Show Logic
  talkshow_turns: [
    {
      turn_number: 1,
      nova_question: "Welcome to Nova Live Talk Show! Can you tell me what broke when Tom woke up in the morning?",
      hint_response: "Tom broke his alarm clock because he reached clumsily for his glasses."
    },
    {
      turn_number: 2,
      nova_question: "Oh no! And why did he fall down while running downstairs?",
      hint_response: "He slipped on a wet puddle on the floor and fell onto the rug."
    },
    {
      turn_number: 3,
      nova_question: "What happened when Tom dropped the glass of orange juice?",
      hint_response: "He damaged his homework notebook with the spilled juice."
    },
    {
      turn_number: 4,
      nova_question: "Who found Tom's lost backpack on the school bus?",
      hint_response: "His kind friend Mia found his backpack on the bus seat."
    },
    {
      turn_number: 5,
      nova_question: "What important lesson did Tom learn at the end of the day?",
      hint_response: "Tom learned to apologize for his mistakes and be more cautious next time."
    }
  ]
};
