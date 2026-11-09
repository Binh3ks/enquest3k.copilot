/**
 * STAGED MOCK EXAM DELIVERABLE: Speaking Paper (All 4 Parts)
 * Week: 76 | Level: Cambridge B1 Preliminary (PET) | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const speakingHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  cefr_level: "B1 Preliminary",
  paper: "Speaking",
  total_parts: 4,
  time_allowed_minutes: 12,

  // ── Part 1: Personal Interview with Nova (2 minutes) ──────────────────────
  part1_interview: {
    instructions: "Examiner Nova asks the candidate general personal questions about daily life, school, and interests.",
    questions: [
      { id: 1, prompt: "What subjects at school do you enjoy studying most, and why?", model_answer: "I really enjoy studying world history and geography because learning about ancient civilizations and great sea voyages inspires me to travel and explore new cultures." },
      { id: 2, prompt: "Do you prefer traveling to natural landscapes like mountains or visiting historic cities?", model_answer: "I prefer visiting natural landscapes because hiking through pine forests and along coastal cliffs offers clean crisp air, breathtaking views, and peaceful serenity." },
      { id: 3, prompt: "How do you usually use maps or digital navigation apps when you visit an unfamiliar place?", model_answer: "I use GPS apps on my phone to check distances and follow street routes, but in science class, we also practice reading topographic paper maps with map scales." },
      { id: 4, prompt: "If you could join any scientific expedition in the world, where would you choose to go?", model_answer: "I would choose to join a marine research expedition exploring coral reef ecosystems in the Pacific Ocean because discovering marine organisms helps us protect ocean biodiversity." }
    ]
  },

  // ── Part 2: Simulated Situation Discussion (Nova & Candidate) ─────────────
  // Validates Table A and Table B UI Schema Contract!
  info_exchange_cards: {
    table_a: {
      title: "Liam's Mountain River Expedition",
      subtitle: "Candidate's Question Card (Ask Examiner Nova)",
      person: "Liam",
      fields: [
        {
          id: "field_a1",
          cue_prompt: "where / expedition base camp located?",
          cue_word: "where",
          is_missing: true,
          acceptable_questions: [
            "Where is the expedition base camp located?",
            "Where is the base camp?",
            "Where do they set up base camp?"
          ],
          nova_reply: "The base camp is set up beside Jade Lake at the foot of the mountain range."
        },
        {
          id: "field_a2",
          cue_prompt: "what / map scale used on trail maps?",
          cue_word: "what",
          is_missing: true,
          acceptable_questions: [
            "What map scale is used on the trail maps?",
            "What is the map scale?",
            "What scale do the maps use?"
          ],
          nova_reply: "The topographic trail map uses a scale of one centimeter to one kilometer."
        },
        {
          id: "field_a3",
          cue_prompt: "how many / kilometers to the river source?",
          cue_word: "how many",
          is_missing: true,
          acceptable_questions: [
            "How many kilometers is it to the river source?",
            "How far is the river source?",
            "What is the distance to the source?"
          ],
          nova_reply: "The total trekking distance to the mountain river source is twelve kilometers."
        },
        {
          id: "field_a4",
          cue_prompt: "who / leads the geological survey team?",
          cue_word: "who",
          is_missing: true,
          acceptable_questions: [
            "Who leads the geological survey team?",
            "Who is the team leader?",
            "Who supervises the survey team?"
          ],
          nova_reply: "Chief Geologist Dr. Rachel Adams supervises the research students."
        },
        {
          id: "field_a5",
          cue_prompt: "why / carry backup magnetic compasses?",
          cue_word: "why",
          is_missing: true,
          acceptable_questions: [
            "Why must they carry backup magnetic compasses?",
            "Why do they need backup compasses?",
            "Why are compasses necessary on the trek?"
          ],
          nova_reply: "Because deep granite canyons frequently block electronic satellite signals."
        }
      ]
    },
    table_b: {
      title: "Nova's Coastal Marine Survey",
      subtitle: "Information Card (Answer Examiner Nova's Questions)",
      person: "Nova",
      fields: [
        {
          id: "field_b1",
          cue_prompt: "where / marine survey research ship anchored?",
          cue_word: "where",
          value: "Inside the sheltered harbor of St. Ives Cove.",
          nova_question: "Where is your marine survey research vessel anchored?",
          acceptable_answers: [
            "Inside the sheltered harbor of St. Ives Cove.",
            "In St. Ives Cove.",
            "Inside the sheltered harbor."
          ]
        },
        {
          id: "field_b2",
          cue_prompt: "what / instruments used to chart seabed?",
          cue_word: "what",
          value: "Digital sonar sounders and underwater lidar cameras.",
          nova_question: "What navigation instruments do you use to chart the rocky seabed?",
          acceptable_answers: [
            "Digital sonar sounders and underwater lidar cameras.",
            "Sonar sounders and lidar cameras.",
            "Sonar and underwater cameras."
          ]
        },
        {
          id: "field_b3",
          cue_prompt: "how long / daily diving shift on reef?",
          cue_word: "how long",
          value: "Ninety minutes during morning slack water tide.",
          nova_question: "How long does each research diving shift last on the reef?",
          acceptable_answers: [
            "Ninety minutes during morning slack water tide.",
            "Ninety minutes.",
            "About ninety minutes."
          ]
        },
        {
          id: "field_b4",
          cue_prompt: "who / navigates the coastal research vessel?",
          cue_word: "who",
          value: "Captain Marcus Miller, an experienced maritime navigator.",
          nova_question: "Who is in charge of navigating the coastal research vessel?",
          acceptable_answers: [
            "Captain Marcus Miller, an experienced maritime navigator.",
            "Captain Marcus Miller.",
            "An experienced maritime captain."
          ]
        },
        {
          id: "field_b5",
          cue_prompt: "why / track ocean water temperature daily?",
          cue_word: "why",
          value: "To predict how rising heat affects fragile coral ecosystems.",
          nova_question: "Why does the scientific team record ocean water temperatures daily?",
          acceptable_answers: [
            "To predict how rising heat affects fragile coral ecosystems.",
            "To protect fragile coral ecosystems.",
            "To study how heat affects coral."
          ]
        }
      ]
    }
  },

  // ── Part 3: Extended Photo Description (3 minutes) ────────────────────────
  part3_photo_description: {
    instructions: "Candidate speaks for about one minute describing a color photograph of an outdoor exploration team.",
    photo_prompt: {
      title: "Young Researchers Navigating Coastal Cliffs",
      image_url: "/images/week76/speaking_photo_p3.png",
      setting: "A high rocky cliff overlooking a sparkling blue ocean under a clear sky.",
      people: "Three teenage students wearing backpacks, waterproof jackets, and sturdy hiking boots.",
      actions: "One boy holds a large topographic map, a girl checks directions with a brass compass, and another student records coordinates on a digital notebook.",
      prompts_to_cover: [
        "Describe what the people are doing and wearing.",
        "Talk about the weather and physical landscape.",
        "Explain what equipment they are using to navigate."
      ],
      model_turn: "In this photograph, I can see three teenage researchers standing on a rocky coastal cliff overlooking a sparkling blue ocean. The weather looks bright and sunny, but there is probably a cool sea breeze because they are wearing warm waterproof jackets and sturdy hiking boots. In the center, a boy is holding an open paper map, studying the contour lines. The girl on the left is holding a brass compass in her hand, carefully checking their heading, while the third student is writing notes on a digital tablet. They look focused and determined, probably participating in an outdoor navigation field project."
    }
  },

  // ── Part 4: Topic Discussion (3 minutes) ──────────────────────────────────
  part4_discussion: {
    instructions: "Examiner Nova and candidate discuss general topics related to the theme of exploration and navigation.",
    theme: "Exploration in the Past and Today",
    discussion_points: [
      {
        question: "Do you think exploring the world was harder for ancient sailors than it is for modern explorers?",
        model_exchange: "Yes, definitely. Ancient sailors had to cross uncharted oceans in wooden ships without weather forecasts or satellite communication. They suffered from scurvy and starvation, whereas modern explorers have GPS, emergency rescue teams, and advanced scientific gear."
      },
      {
        question: "Why is it still important for students to learn paper map reading and compass skills when we have smartphones?",
        model_exchange: "It is essential because smartphone batteries can run out and remote mountain or ocean areas often have zero satellite signal. Knowing how to read map scales and orient a magnetic compass ensures you can always navigate safely."
      },
      {
        question: "Which unexplored part of our world would you like to see explored in the future?",
        model_exchange: "I would love to see deeper exploration of the oceanic abyss. More than eighty percent of our ocean floor remains unmapped, and discovering new deep-sea organisms could teach us so much about biological adaptation."
      }
    ]
  }
};

export default speakingHubData;
