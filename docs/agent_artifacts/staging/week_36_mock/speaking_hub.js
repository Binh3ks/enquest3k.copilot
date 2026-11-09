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

  // ── Part 2: Information Exchange (Solo-AI Cue Cards) ──────────────────────
  info_exchange_cards: {
    part: 2,
    instructions: "Cambridge Speaking Part 2 Solo-AI Format. Card A: Student asks Nova questions using cue words. Card B: Student answers Nova's questions using card data.",
    card_a: {
      role: "Student asks questions / Nova answers",
      topic: "David's Mountain Camp",
      cue_questions: [
        { id: 1, cue: "Where / camp?", question: "Where is David's mountain camp?", expected_answer: "It is in Pine Valley near Eagle Peak." },
        { id: 2, cue: "What / pack?", question: "What must campers pack in their backpacks?", expected_answer: "They must pack a warm jacket and a flashlight." },
        { id: 3, cue: "How many / tents?", question: "How many tents are there at the camp?", expected_answer: "There are six green tents." },
        { id: 4, cue: "What time / breakfast?", question: "What time is breakfast served?", expected_answer: "Breakfast is served at half past seven in the morning." },
        { id: 5, cue: "Favorite activity?", question: "What is the campers' favorite activity?", expected_answer: "Their favorite activity is singing around the warm campfire." }
      ]
    },
    card_b: {
      role: "Nova asks questions / Student answers",
      topic: "Sarah's Forest Cabin",
      data: {
        location: "Silver River Forest, behind the old mill",
        equipment_provided: "Sleeping bags, trail maps, and first-aid kits",
        number_of_rooms: "Four cosy wooden bedrooms",
        dinner_time: "Quarter to six in the evening",
        popular_hobby: "Taking photographs of wild woodland birds"
      },
      questions_from_nova: [
        { id: 1, question: "Where is Sarah's forest cabin?", answer_cue: "It is located in Silver River Forest, behind the old mill." },
        { id: 2, question: "What equipment is provided for the scouts?", answer_cue: "They provide sleeping bags, trail maps, and first-aid kits." },
        { id: 3, question: "How many bedrooms are there inside the cabin?", answer_cue: "There are four cosy wooden bedrooms." },
        { id: 4, question: "What time do they have dinner?", answer_cue: "Dinner is served at quarter to six in the evening." },
        { id: 5, question: "What is the most popular hobby at the cabin?", answer_cue: "The most popular hobby is taking photographs of wild birds." }
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
