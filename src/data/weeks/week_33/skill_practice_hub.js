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
    { id: 2, problem_en: "The nurse had 25 bandages. She used 8 bandages. How many bandages remain?", bar_model_svg: "/images/week33/barmodel_w33_adv_p2.svg", answer_value: 17 },
    { id: 3, problem_en: "Tom rested for 15 minutes and applied ice for 10 minutes. What is the total treatment time?", bar_model_svg: "/images/week33/barmodel_w33_adv_p3.svg", answer_value: 25 },
    { id: 4, problem_en: "Class 4A has 30 students. 24 students followed safety rules. How many ran?", bar_model_svg: "/images/week33/barmodel_w33_adv_p4.svg", answer_value: 6 },
    { id: 5, problem_en: "The headmaster gave 5 safety stars to each of 4 helpers. How many stars in total?", bar_model_svg: "/images/week33/barmodel_w33_adv_p5.svg", answer_value: 20 }
  ],
  science_lab: {
    id: "sci_w33_lab1",
    experimentTitle: "Corridor Friction & Safety Physics Lab",
    title_en: "Corridor Friction & Safety Physics Lab",
    title_vi: "Phòng Thí Nghiệm Vật Lý Ma Sát & An Toàn Hành Lang",
    diagramImage: "/images/week33/read_cover_w33.jpg",
    background_image: "/images/week33/read_cover_w33.jpg",
    explanation: "Drag the physics principles and first aid tools to the correct positions on the diagram to show how friction keeps school corridors safe!",
    description_en: "Drag the physics principles and first aid tools to the correct positions on the diagram to show how friction keeps school corridors safe!",
    zones: [
      {
        id: "z1",
        label: "Wet Floor Puddle",
        correct_label: "Low Friction Zone",
        x: 48,
        y: 76,
        micro_explanation: "⚠️ Physics Alert: Water makes tiles very slippery! Friction is reduced, causing sudden falls."
      },
      {
        id: "z2",
        label: "Running Fast",
        correct_label: "Forward Motion",
        x: 62,
        y: 45,
        micro_explanation: "⚡ Safety Alert: Running fast makes it hard to stop safely on wet tiles!"
      },
      {
        id: "z3",
        label: "Yellow Caution Sign",
        correct_label: "Hazard Alert",
        x: 28,
        y: 65,
        micro_explanation: "💡 Safety Alert: Warning signs tell everyone to slow down and walk carefully."
      },
      {
        id: "z4",
        label: "First Aid Treatment",
        correct_label: "Cold Pack & Bandage",
        x: 80,
        y: 55,
        micro_explanation: "🩹 First Aid: A cold pack cools the sore knee, while a clean bandage protects the cut."
      }
    ],
    labels: [
      { id: "lbl_1", text: "Low Friction Zone", targetId: "z1" },
      { id: "lbl_2", text: "Forward Motion", targetId: "z2" },
      { id: "lbl_3", text: "Hazard Alert", targetId: "z3" },
      { id: "lbl_4", text: "Cold Pack & Bandage", targetId: "z4" }
    ]
  }

};

export const skillPracticeHubData = skillPracticeHub;
export default skillPracticeHub;
