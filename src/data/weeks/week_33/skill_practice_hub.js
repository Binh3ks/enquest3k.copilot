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
    explanation: "Drag the physics principles and safety tools to the correct positions across 3 scenarios to discover how friction protects everyone in school corridors!",
    description_en: "Drag the physics principles and safety tools to the correct positions across 3 scenarios to discover how friction protects everyone in school corridors!",
    stages: [
      {
        id: "stage_1_puddle",
        stageNumber: 1,
        title: "Stage 1: Wet Floor & Low Friction Hazard",
        diagramImage: "/images/week33/read_cover_w33.jpg",
        background_image: "/images/week33/read_cover_w33.jpg",
        explanation: "Explore how spilled water reduces friction between shoes and smooth corridor tiles!",
        zones: [
          {
            id: "z1_1",
            label: "Wet Floor Puddle",
            correct_label: "Low Friction Zone",
            x: 50,
            y: 84,
            micro_explanation: "⚠️ Water forms a thin layer that drastically lowers tile friction."
          },
          {
            id: "z1_2",
            label: "Running Fast",
            correct_label: "Forward Motion",
            x: 50,
            y: 28,
            micro_explanation: "⚡ Running fast builds speed that cannot stop without floor grip."
          },
          {
            id: "z1_3",
            label: "Yellow Caution Sign",
            correct_label: "Hazard Alert",
            x: 20,
            y: 68,
            micro_explanation: "💡 Bright yellow sign warns everyone to slow down."
          },
          {
            id: "z1_4",
            label: "First Aid Treatment",
            correct_label: "Cold Pack & Bandage",
            x: 82,
            y: 55,
            micro_explanation: "🩹 Cold pack cools swelling and clean bandage protects the cut."
          }
        ],
        labels: [
          { id: "lbl_1_1", text: "Low Friction Zone", targetId: "z1_1" },
          { id: "lbl_1_2", text: "Forward Motion", targetId: "z1_2" },
          { id: "lbl_1_3", text: "Hazard Alert", targetId: "z1_3" },
          { id: "lbl_1_4", text: "Cold Pack & Bandage", targetId: "z1_4" }
        ]
      },
      {
        id: "stage_2_shoe_grip",
        stageNumber: 2,
        title: "Stage 2: Shoe Sole Grip & Material Friction",
        diagramImage: "/images/week33/webtoon_scene_3.png",
        background_image: "/images/week33/webtoon_scene_3.png",
        explanation: "Compare how rubber soles provide strong grip while smooth soles slide dangerously!",
        zones: [
          {
            id: "z2_1",
            label: "Rubber Sole Tread",
            correct_label: "Strong Grip Friction",
            x: 32,
            y: 74,
            micro_explanation: "👟 Textured rubber grooves grip floor tiles and prevent slipping."
          },
          {
            id: "z2_2",
            label: "Smooth Plastic Sole",
            correct_label: "Zero Grip Hazard",
            x: 72,
            y: 78,
            micro_explanation: "⚠️ Smooth soles slide right over water without catching the floor."
          },
          {
            id: "z2_3",
            label: "Dry Ceramic Floor",
            correct_label: "Firm Footing Area",
            x: 18,
            y: 42,
            micro_explanation: "🧱 Dry tiles provide normal friction so students walk steadily."
          },
          {
            id: "z2_4",
            label: "Careful Walking Pace",
            correct_label: "Balanced Body Motion",
            x: 50,
            y: 30,
            micro_explanation: "🚶 Walking at a sensible pace keeps your center of mass balanced."
          }
        ],
        labels: [
          { id: "lbl_2_1", text: "Strong Grip Friction", targetId: "z2_1" },
          { id: "lbl_2_2", text: "Zero Grip Hazard", targetId: "z2_2" },
          { id: "lbl_2_3", text: "Firm Footing Area", targetId: "z2_3" },
          { id: "lbl_2_4", text: "Balanced Body Motion", targetId: "z2_4" }
        ]
      },
      {
        id: "stage_3_first_aid",
        stageNumber: 3,
        title: "Stage 3: Nurse First Aid & Safety Protocol",
        diagramImage: "/images/week33/webtoon_scene_4.png",
        background_image: "/images/week33/webtoon_scene_4.png",
        explanation: "Investigate first aid care and recovery procedures when a school accident occurs!",
        zones: [
          {
            id: "z3_1",
            label: "Ice Cold Pack",
            correct_label: "Reduces Swelling",
            x: 48,
            y: 65,
            micro_explanation: "🧊 Applying cold ice constricts blood vessels and eases joint pain."
          },
          {
            id: "z3_2",
            label: "Clean Bandage",
            correct_label: "Protects Skin Cut",
            x: 76,
            y: 70,
            micro_explanation: "🩹 A clean bandage shields skin wounds from dust and germs."
          },
          {
            id: "z3_3",
            label: "School Nurse Care",
            correct_label: "Medical Assessment",
            x: 74,
            y: 32,
            micro_explanation: "👩‍⚕️ Nurse assesses injury severity and comforts the student."
          },
          {
            id: "z3_4",
            label: "Resting On Bench",
            correct_label: "Safe Recovery Rest",
            x: 24,
            y: 48,
            micro_explanation: "🪑 Sitting still prevents further stress on the hurt knee joint."
          }
        ],
        labels: [
          { id: "lbl_3_1", text: "Reduces Swelling", targetId: "z3_1" },
          { id: "lbl_3_2", text: "Protects Skin Cut", targetId: "z3_2" },
          { id: "lbl_3_3", text: "Medical Assessment", targetId: "z3_3" },
          { id: "lbl_3_4", text: "Safe Recovery Rest", targetId: "z3_4" }
        ]
      }
    ],
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
