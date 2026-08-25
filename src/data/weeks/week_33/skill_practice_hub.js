// Skill Practice Hub for Week 33 (Extracted from Legacy Hub 2)
// Contains Day 2 Action Lab, Day 3 Grammar Duel & Singapore Math, and Dictation
export const skillPracticeHub = {
  dictation: [
    { id: 1, text: "Jake was walking carefully down the corridor.", audio_url: "/audio/week33/dictation_1.mp3" },
    { id: 2, text: "A boy ran fast and slipped on the wet floor.", audio_url: "/audio/week33/dictation_2.mp3" },
    { id: 3, text: "Jake stopped immediately to help his classmate.", audio_url: "/audio/week33/dictation_3.mp3" },
    { id: 4, text: "The school nurse arrived quickly with a bandage.", audio_url: "/audio/week33/dictation_4.mp3" },
    { id: 5, text: "Everyone felt relieved and followed safety rules.", audio_url: "/audio/week33/dictation_5.mp3" }
  ],
  grammar_drills: [
    {
      id: "st2_w33_g01",
      grammar_tag: "past_continuous_while",
      text_en: "Build a past continuous sentence with 'While'.",
      word_blocks: ["While", "Jake", "was", "walking", "in", "the", "corridor", ",", "a", "boy", "slipped", "."],
      distractor_blocks: ["is", "slips", "run"]
    },
    {
      id: "st2_w33_g02",
      grammar_tag: "past_simple_incident",
      text_en: "Build a sentence about the incident.",
      word_blocks: ["The", "running", "student", "fell", "heavily", "on", "the", "wet", "tiles", "."],
      distractor_blocks: ["falls", "slip", "fast"]
    },
    {
      id: "st2_w33_g03",
      grammar_tag: "past_simple_help",
      text_en: "Build a sentence about calling the nurse.",
      word_blocks: ["Jake", "called", "the", "school", "nurse", "right", "away", "for", "help", "."],
      distractor_blocks: ["calls", "helping", "quick"]
    },
    {
      id: "st2_w33_g04",
      grammar_tag: "past_simple_treatment",
      text_en: "Build a treatment sentence with the bandage.",
      word_blocks: ["The", "nurse", "applied", "a", "clean", "bandage", "gently", "."],
      distractor_blocks: ["applies", "applying", "was"]
    },
    {
      id: "st2_w33_g05",
      grammar_tag: "past_simple_praise",
      text_en: "Build a praise sentence during assembly.",
      word_blocks: ["The", "headmaster", "praised", "Jake", "for", "responsible", "action", "."],
      distractor_blocks: ["praises", "praising", "never"]
    }
  ],
  singapore_math: [
    { id: 1, problem_en: "Jake walked 40 meters. The corridor is 100 meters long. How many meters are left?", bar_model_svg: "/images/week33/barmodel_w33_adv_p1.svg", answer_value: 60 },
    { id: 2, problem_en: "A box has 85 bandages. The nurse used 28 bandages. How many bandages remain?", bar_model_svg: "/images/week33/barmodel_w33_adv_p2.svg", answer_value: 57 },
    { id: 3, problem_en: "Tom walked 65 meters. Jake walked 90 meters. How much further did Jake walk?", bar_model_svg: "/images/week33/barmodel_w33_adv_p3.svg", answer_value: 25 },
    { id: 4, problem_en: "The nurse had 4 packs of 12 cold packs. How many cold packs does she have in total?", bar_model_svg: "/images/week33/barmodel_w33_adv_p4.svg", answer_value: 48 },
    { id: 5, problem_en: "45 students were in the corridor. 27 entered classrooms. How many students are still in the corridor?", bar_model_svg: "/images/week33/barmodel_w33_adv_p5.svg", answer_value: 18 }
  ],
  science_lab: {
    experimentTitle: "Corridor Friction & Safety Physics Lab",
    diagramImage: "/images/week33/explore_cover_w33.jpg",
    explanation: "Drag the science labels into the correct target zones to show how friction keeps school corridors safe!",
    targets: [
      { id: "t1", name: "Wet Corridor Tiles", x: 25, y: 70 },
      { id: "t2", name: "Rubber Shoe Soles", x: 75, y: 65 },
      { id: "t3", name: "Yellow Caution Sign", x: 50, y: 35 },
      { id: "t4", name: "Handrail Support", x: 80, y: 25 }
    ],
    labels: [
      { id: "lbl_1", text: "Low Friction Surface (Water Layer)", targetId: "t1" },
      { id: "lbl_2", text: "High Grip Surface (Rubber Tread)", targetId: "t2" },
      { id: "lbl_3", text: "Visual Safety Warning Notice", targetId: "t3" },
      { id: "lbl_4", text: "Physical Balance & Stability Aid", targetId: "t4" }
    ]
  }
};

export const skillPracticeHubData = skillPracticeHub;
export default skillPracticeHub;
