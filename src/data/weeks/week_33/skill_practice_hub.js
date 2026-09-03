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
      text_en: "While Jake was walking down the corridor, a boy slipped on the wet floor.",
      word_blocks: ["While", "Jake", "was", "walking", "down", "the", "corridor", ",", "a", "boy", "slipped", "on", "the", "wet", "floor", "."],
      valid_structures: [
        ["While", "Jake", "was", "walking", "down", "the", "corridor", ",", "a", "boy", "slipped", "on", "the", "wet", "floor", "."],
        ["A", "boy", "slipped", "on", "the", "wet", "floor", "while", "Jake", "was", "walking", "down", "the", "corridor", "."]
      ],
      distractor_blocks: ["is", "slips", "walks"]
    },
    {
      id: "st2_w33_g02",
      grammar_tag: "past_continuous_while",
      text_en: "While Tom was running in a hurry, he slipped and hurt his knee.",
      word_blocks: ["While", "Tom", "was", "running", "in", "a", "hurry", ",", "he", "slipped", "and", "hurt", "his", "knee", "."],
      valid_structures: [
        ["While", "Tom", "was", "running", "in", "a", "hurry", ",", "he", "slipped", "and", "hurt", "his", "knee", "."],
        ["Tom", "slipped", "and", "hurt", "his", "knee", "while", "he", "was", "running", "in", "a", "hurry", "."]
      ],
      distractor_blocks: ["is", "runs", "hurts"]
    },
    {
      id: "st2_w33_g03",
      grammar_tag: "past_continuous_while",
      text_en: "While Jake was helping his classmate, the school nurse arrived quickly.",
      word_blocks: ["While", "Jake", "was", "helping", "his", "classmate", ",", "the", "school", "nurse", "arrived", "quickly", "."],
      valid_structures: [
        ["While", "Jake", "was", "helping", "his", "classmate", ",", "the", "school", "nurse", "arrived", "quickly", "."],
        ["The", "school", "nurse", "arrived", "quickly", "while", "Jake", "was", "helping", "his", "classmate", "."]
      ],
      distractor_blocks: ["is", "helps", "arrives"]
    },
    {
      id: "st2_w33_g04",
      grammar_tag: "past_continuous_while",
      text_en: "While the nurse was treating his knee, Tom felt very relieved.",
      word_blocks: ["While", "the", "nurse", "was", "treating", "his", "knee", ",", "Tom", "felt", "very", "relieved", "."],
      valid_structures: [
        ["While", "the", "nurse", "was", "treating", "his", "knee", ",", "Tom", "felt", "very", "relieved", "."],
        ["Tom", "felt", "very", "relieved", "while", "the", "nurse", "was", "treating", "his", "knee", "."]
      ],
      distractor_blocks: ["treats", "feels", "is"]
    },
    {
      id: "st2_w33_g05",
      grammar_tag: "past_continuous_while",
      text_en: "While the cleaners were drying the floor, the headmaster praised Jake.",
      word_blocks: ["While", "the", "cleaners", "were", "drying", "the", "floor", ",", "the", "headmaster", "praised", "Jake", "."],
      valid_structures: [
        ["While", "the", "cleaners", "were", "drying", "the", "floor", ",", "the", "headmaster", "praised", "Jake", "."],
        ["The", "headmaster", "praised", "Jake", "while", "the", "cleaners", "were", "drying", "the", "floor", "."]
      ],
      distractor_blocks: ["dries", "praises", "was"]
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
        x: 50,
        y: 84,
        micro_explanation: "⚠️ Physics Alert: Water makes tiles very slippery! Friction is reduced, causing sudden falls."
      },
      {
        id: "z2",
        label: "Running Fast",
        correct_label: "Forward Motion",
        x: 50,
        y: 28,
        micro_explanation: "⚡ Safety Alert: Running fast makes it hard to stop safely on wet tiles!"
      },
      {
        id: "z3",
        label: "Yellow Caution Sign",
        correct_label: "Hazard Alert",
        x: 20,
        y: 68,
        micro_explanation: "💡 Safety Alert: Warning signs tell everyone to slow down and walk carefully."
      },
      {
        id: "z4",
        label: "First Aid Treatment",
        correct_label: "Cold Pack & Bandage",
        x: 82,
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
