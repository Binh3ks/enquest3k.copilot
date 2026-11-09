/**
 * STAGED MOCK EXAM DELIVERABLE: Speaking Paper (All 4 Parts Solo-AI Partner "Nova")
 * Week: 36 | Level: Cambridge A2 Flyers | Mode: FULL_MOCK
 * Pipeline: scripts/generate_mock_exam_content.mjs (Round 65 Pilot Mock)
 * Cumulative Sourcing: Weeks 33, 34, 35, 36
 */

export const speakingHubData = {
  week: 36,
  theme: "Review & Project 3: \"My Adventure Book\"",
  cefr_level: "A2 Flyers",
  paper: "Speaking",
  total_parts: 4,
  approx_minutes: 8,
  ai_partner: "Nova (Examiner & Conversation Partner)",

  // ── Part 1: Spot the Differences (5 differences) ──────────────────────────
  find_differences: {
    part: 1,
    instructions: "Examiner Nova points out one difference. The student finds and describes the other four to five differences between Picture A and Picture B.",
    scene_description: "Two contrasting outdoor campsite scenes near the forest edge.",
    image_a: "/images/week36/speaking_p1_scene_a.png",
    image_b: "/images/week36/speaking_p1_scene_b.png",
    example_difference: "In my picture (A), the scout's tent is blue, but in your picture (B), the tent is yellow.",
    differences: [
      {
        id: 1,
        feature: "Weather / Sky",
        picture_a: "In Picture A, there are two fluffy clouds in the sky.",
        picture_b: "In Picture B, there is a bright yellow sun with no clouds.",
        cue_phrase: "clouds vs sun"
      },
      {
        id: 2,
        feature: "Flashlight on Table",
        picture_a: "In Picture A, the flashlight on the picnic table is red.",
        picture_b: "In Picture B, the flashlight on the table is green.",
        cue_phrase: "red flashlight vs green flashlight"
      },
      {
        id: 3,
        feature: "Boy's Activity",
        picture_a: "In Picture A, the boy is reading an adventure book.",
        picture_b: "In Picture B, the boy is looking through a brass compass.",
        cue_phrase: "reading book vs using compass"
      },
      {
        id: 4,
        feature: "Wild Animal near Trees",
        picture_a: "In Picture A, there is a brown fox sitting near the pine tree.",
        picture_b: "In Picture B, there is a grey squirrel climbing the pine tree.",
        cue_phrase: "fox vs squirrel"
      },
      {
        id: 5,
        feature: "Girl's Backpack",
        picture_a: "In Picture A, the girl is wearing a large blue backpack.",
        picture_b: "In Picture B, the girl is holding a small camera in her hand.",
        cue_phrase: "wearing backpack vs holding camera"
      }
    ]
  },

  // ── Part 2: Information Exchange (Solo-AI Cue Cards — table_a / table_b) ──
  info_exchange_cards: {
    table_a: {
      title: "David's Mountain Camp",
      subtitle: "Candidate's Question Card (Ask Examiner)",
      person: "David",
      fields: [
        {
          id: "field_a1",
          cue_prompt: "where / mountain camp?",
          cue_word: "where",
          is_missing: true,
          acceptable_questions: [
            "Where is David's mountain camp?",
            "Where is the mountain camp?",
            "Where is the camp located?"
          ],
          nova_reply: "It is in Pine Valley near Eagle Peak."
        },
        {
          id: "field_a2",
          cue_prompt: "what / pack in backpack?",
          cue_word: "what",
          is_missing: true,
          acceptable_questions: [
            "What must campers pack in their backpacks?",
            "What do campers pack in their backpacks?",
            "What do they need to pack?"
          ],
          nova_reply: "They must pack a warm jacket and a flashlight."
        },
        {
          id: "field_a3",
          cue_prompt: "how many / tents at camp?",
          cue_word: "how many",
          is_missing: true,
          acceptable_questions: [
            "How many tents are there at the camp?",
            "How many tents are there?",
            "How many green tents are at the camp?"
          ],
          nova_reply: "There are six green tents."
        },
        {
          id: "field_a4",
          cue_prompt: "what time / breakfast served?",
          cue_word: "what time",
          is_missing: true,
          acceptable_questions: [
            "What time is breakfast served?",
            "What time do they have breakfast?",
            "When is breakfast served?"
          ],
          nova_reply: "Breakfast is served at half past seven in the morning."
        },
        {
          id: "field_a5",
          cue_prompt: "what / favorite activity?",
          cue_word: "what",
          is_missing: true,
          acceptable_questions: [
            "What is the campers' favorite activity?",
            "What is their favorite activity?",
            "What activity do campers like best?"
          ],
          nova_reply: "Their favorite activity is singing around the warm campfire."
        }
      ]
    },
    table_b: {
      title: "Sarah's Forest Cabin",
      subtitle: "Information Card (Answer Examiner's Questions)",
      person: "Sarah",
      fields: [
        {
          id: "field_b1",
          cue_prompt: "where / Sarah's cabin?",
          cue_word: "where",
          value: "Silver River Forest, behind the old mill.",
          nova_question: "Where is Sarah's forest cabin?",
          acceptable_answers: [
            "It is located in Silver River Forest, behind the old mill.",
            "Silver River Forest, behind the old mill.",
            "In Silver River Forest behind the old mill."
          ]
        },
        {
          id: "field_b2",
          cue_prompt: "what equipment / provided?",
          cue_word: "what",
          value: "Sleeping bags, trail maps, and first-aid kits.",
          nova_question: "What equipment is provided for the scouts?",
          acceptable_answers: [
            "They provide sleeping bags, trail maps, and first-aid kits.",
            "Sleeping bags, trail maps, and first-aid kits.",
            "Sleeping bags and first-aid kits."
          ]
        },
        {
          id: "field_b3",
          cue_prompt: "how many / bedrooms inside cabin?",
          cue_word: "how many",
          value: "Four cosy wooden bedrooms.",
          nova_question: "How many bedrooms are there inside the cabin?",
          acceptable_answers: [
            "There are four cosy wooden bedrooms.",
            "Four cosy wooden bedrooms.",
            "Four bedrooms."
          ]
        },
        {
          id: "field_b4",
          cue_prompt: "what time / dinner served?",
          cue_word: "what time",
          value: "Quarter to six in the evening.",
          nova_question: "What time do they have dinner?",
          acceptable_answers: [
            "Dinner is served at quarter to six in the evening.",
            "Quarter to six in the evening.",
            "At quarter to six."
          ]
        },
        {
          id: "field_b5",
          cue_prompt: "what / popular hobby?",
          cue_word: "what",
          value: "Taking photographs of wild woodland birds.",
          nova_question: "What is the most popular hobby at the cabin?",
          acceptable_answers: [
            "The most popular hobby is taking photographs of wild birds.",
            "Taking photographs of wild woodland birds.",
            "Taking photographs of wild birds."
          ]
        }
      ]
    }
  },

  // ── Part 3: Picture Story Continuation (5 pictures) ───────────────────────
  picture_story: {
    part: 3,
    title: "The Lost Compass",
    instructions: "Look at the five pictures. They tell a story called 'The Lost Compass'. Nova will introduce Picture 1. You continue telling the story for Pictures 2 to 5.",
    examiner_intro: "Look at Picture 1. Liam and his friend Emma are starting their hike in the hills. Liam is checking their trail map, but he cannot find his metal compass.",
    frames: [
      {
        frame: 1,
        title: "The Missing Compass",
        narration_prompt: "Liam looks inside his backpack, but his compass is missing. He feels worried because the forest trails are unfamiliar."
      },
      {
        frame: 2,
        title: "Retracing Their Steps",
        narration_prompt: "Emma suggests walking back to the wooden bridge where they sat to drink water. They look carefully along the rocky path."
      },
      {
        frame: 3,
        title: "A Helpful Friend",
        narration_prompt: "Near the river bank, they see Ranger David. He is holding a shiny brass object that he found on a mossy boulder."
      },
      {
        frame: 4,
        title: "The Compass Returned",
        narration_prompt: "Ranger David smiles and hands the compass back to Liam. Liam is delighted and thanks the kind ranger."
      },
      {
        frame: 5,
        title: "Reaching the Sunset Camp",
        narration_prompt: "Using their compass, the children hike safely to the hilltop campsite before dark. They pitch their tent happily."
      }
    ]
  },

  // ── Part 4: Personal Interview Questions (4 items) ────────────────────────
  personal_questions: {
    part: 4,
    instructions: "Examiner Nova asks the student four personal questions about outdoor activities, books, and school projects.",
    questions: [
      {
        id: 1,
        topic: "Outdoor Activities",
        question: "Do you like going on trips or walking in the countryside? Why?",
        sample_answer: "Yes, I love walking in the countryside because I can breathe fresh air and see colourful trees."
      },
      {
        id: 2,
        topic: "Packing for Trips",
        question: "What items must you always pack when you go on a school picnic?",
        sample_answer: "I must always pack a water bottle, some healthy snacks, and a clean bandage or tissue."
      },
      {
        id: 3,
        topic: "Reading & Stories",
        question: "What kind of stories do you enjoy reading in your free time?",
        sample_answer: "I enjoy reading exciting adventure stories about brave explorers and animal rescues."
      },
      {
        id: 4,
        topic: "Creative Projects",
        question: "Tell me about a memorable project you made at school with your friends.",
        sample_answer: "Last month, my classmates and I drew a big map of an imaginary island and wrote a storybook together."
      }
    ]
  }
};

export default speakingHubData;
