/**
 * Week 33 Gold Standard Reference Data — Nova Speaking Hub
 * Includes 2-Phase Podcast Shadowing (5 Single Sentences + Continuous Story) and 5-Turn Live Talk Show.
 */

export const speakingHubData = {
  week: 33,
  theme: "Apologizing for Clumsy Accidents & Retelling the Picture Story",

  // Phase 1: EXACTLY 5 Single Podcast Shadowing Sentences
  shadowing_sentences: [
    {
      id: "sh_01",
      speaker: "Tom",
      text: "I had a terrible morning today because I woke up late and accidentally broke my alarm clock.",
      phonetic_guide: "aɪ hæd ə ˈterəbəl ˈmɔːrnɪŋ təˈdeɪ bɪˈkɑːz aɪ woʊk ʌp leɪt ænd ˌæksəˈdentəli broʊk..."
    },
    {
      id: "sh_02",
      speaker: "Tom",
      text: "I felt so clumsy when I dropped my glasses on the rug.",
      phonetic_guide: "aɪ felt soʊ ˈklʌmzi wen aɪ drɑːpt maɪ ˈɡlæsəz ɑːn ðə rʌɡ."
    },
    {
      id: "sh_03",
      speaker: "Tom",
      text: "While I was running downstairs, I slipped on a wet puddle.",
      phonetic_guide: "waɪl aɪ wɑːz ˈrʌnɪŋ ˌdaʊnˈsterz, aɪ slɪpt ɑːn ə wet ˈpʌdəl."
    },
    {
      id: "sh_04",
      speaker: "Tom",
      text: "To make things worse, I lost my backpack on the school bus seat!",
      phonetic_guide: "tuː meɪk θɪŋz wɜːrs, aɪ lɔːst maɪ ˈbæk.pæk ɑːn ðə skuːl bʌs siːt!"
    },
    {
      id: "sh_05",
      speaker: "Mia",
      text: "My mom told me not to worry, because accidents happen, but I promised to be more careful next time.",
      phonetic_guide: "maɪ mɑːm toʊld miː nɑːt tuː ˈwɜːri, bɪˈkɑːz ˈæksədənts ˈhæpən, bʌt aɪ ˈprɑːmɪst..."
    }
  ],

  // Phase 2: Continuous Story (Exact Cambridge Flyers Standard Intonation Text)
  shadowing_paragraph: {
    title: "Continuous Shadowing: Tom's Clumsy Morning Story",
    text: "I had a terrible morning today! First, I woke up late and accidentally broke my alarm clock. I felt so clumsy. Then, while I was running downstairs, I slipped on a wet puddle. To make things worse, I lost my backpack on the bus! My mom told me not to worry, because accidents happen, but I promised to be more careful next time.",
    phonetic_guide: "Full story intonation guide: Practice continuous rhythm, rising pitch on exclamation points, and falling pitch on resolutions."
  },

  // EXACTLY 5-Turn Interactive Live Talk Show Logic (Contextually aligned with Hub 3 Picture Story)
  talkshow_turns: [
    {
      turn_number: 1,
      nova_question: "Welcome to Nova Live Talk Show! In Hub 3, you wrote a 3-picture story script. Can you tell me what happened in Panel 1 when Tom was in the living room?",
      hint_response: "First, Tom was playing with his soccer ball inside the living room near the wooden table."
    },
    {
      turn_number: 2,
      nova_question: "Oh dear! And what clumsy accident happened in Panel 2 when the soccer ball hit the table?",
      hint_response: "The ball hit the table by accident, and a glass flower vase fell down and broke into pieces."
    },
    {
      turn_number: 3,
      nova_question: "How did Tom feel when he saw the broken flower vase on the floor?",
      hint_response: "Tom felt very clumsy and sorry because he caused an unexpected accident."
    },
    {
      turn_number: 4,
      nova_question: "In Panel 3, what did Tom do to make amends with his mom after the accident?",
      hint_response: "Tom apologized to his mom immediately and carefully cleaned up the broken glass pieces."
    },
    {
      turn_number: 5,
      nova_question: "What an important lesson! What did Tom promise to do next time to avoid clumsy mistakes?",
      hint_response: "Tom promised to be more cautious and careful whenever he plays indoors."
    }
  ]
};
