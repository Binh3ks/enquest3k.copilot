// Skill Practice Hub for Week 33 (Extracted from Legacy Hub 2)
// Contains Day 2 Action Lab, Day 3 Grammar Duel & Singapore Math, and Dictation
export const skillPracticeHub = {
  dictation: [
    { id: 1, text: "Hello Tom, please come into Room 4B.", audio_url: "/audio/week33/dictation_1.mp3" },
    { id: 2, text: "Thank you Nurse Sarah, I slipped on the wet floor at 10:15 AM.", audio_url: "/audio/week33/dictation_2.mp3" },
    { id: 3, text: "Let me put an ice pack on your ankle for 15 minutes.", audio_url: "/audio/week33/dictation_3.mp3" },
    { id: 4, text: "Can I walk back to class on Monday afternoon?", audio_url: "/audio/week33/dictation_4.mp3" },
    { id: 5, text: "No, you should rest your foot at home for 2 days.", audio_url: "/audio/week33/dictation_5.mp3" },
    { id: 6, text: "Please call my mother on 0988 123 456.", audio_url: "/audio/week33/dictation_6.mp3" },
    { id: 7, text: "I will call her now and give you a clean bandage.", audio_url: "/audio/week33/dictation_7.mp3" },
    { id: 8, text: "Thank you Nurse Sarah, see you this Friday morning!", audio_url: "/audio/week33/dictation_8.mp3" }
  ],
  flash_arena: {
    set1_nouns_adj: [
      { id: 'fa_n1', en: 'corridor', vi: 'hành lang' },
      { id: 'fa_n2', en: 'bandage', vi: 'băng gạc' },
      { id: 'fa_n3', en: 'nurse', vi: 'y tá' },
      { id: 'fa_n4', en: 'puddle', vi: 'vũng nước' },
      { id: 'fa_n5', en: 'tiles', vi: 'gạch lát sàn' },
      { id: 'fa_n6', en: 'friction', vi: 'lực ma sát' },
      { id: 'fa_n7', en: 'warning sign', vi: 'biển cảnh báo' },
      { id: 'fa_n8', en: 'rubber soles', vi: 'đế giày cao su' }
    ],
    set2_verbs: [
      { id: 'fa_v1', en: 'slipped', vi: 'trượt chân' },
      { id: 'fa_v2', en: 'walked', vi: 'đi bộ' },
      { id: 'fa_v3', en: 'hurried', vi: 'vội vã' },
      { id: 'fa_v4', en: 'helped', vi: 'giúp đỡ' },
      { id: 'fa_v5', en: 'treated', vi: 'chữa trị' },
      { id: 'fa_v6', en: 'praised', vi: 'khen ngợi' },
      { id: 'fa_v7', en: 'lost balance', vi: 'mất thăng bằng' },
      { id: 'fa_v8', en: 'recovered', vi: 'hồi phục' }
    ],
    set3_chunks: [
      { id: 'fa_c1', en: 'wet floor', vi: 'sàn nhà ướt' },
      { id: 'fa_c2', en: 'rubber soles', vi: 'đế cao su chống trượt' },
      { id: 'fa_c3', en: 'ice pack', vi: 'túi chườm đá' },
      { id: 'fa_c4', en: 'clean bandage', vi: 'băng gạc sạch' },
      { id: 'fa_c5', en: 'smooth tiles', vi: 'nền gạch trơn nhẵn' },
      { id: 'fa_c6', en: 'walk carefully', vi: 'đi bộ cẩn thận' }
    ],
    set4_definitions: [
      { id: 'fa_d1', en: 'friction', vi: 'lực cản ngăn ngừa trơn trượt' },
      { id: 'fa_d2', en: 'bandage', vi: 'dải băng gạc băng bó vết thương' },
      { id: 'fa_d3', en: 'nurse', vi: 'người chăm sóc y tế tại trường' },
      { id: 'fa_d4', en: 'corridor', vi: 'lối đi dài nối các lớp học' }
    ]
  },
  grammar_drills: [
    {
      id: "st2_w33_g01",
      grammar_tag: "past_continuous_while",
      text_en: "While Jake was walking down the corridor, Tom slipped on the wet floor.",
      instruction: "Sắp xếp các khối từ để miêu tả sự việc khi Jake đang đi bộ:",
      prompt_vi: "Khi Jake đang đi bộ dọc hành lang, Tom bị trượt chân trên sàn ướt.",
      prompt_en: "While Jake was walking down the corridor, Tom slipped on the wet floor.",
      word_blocks: ["While", "Jake", "was", "walking", "down", "the", "corridor", ",", "Tom", "slipped", "on", "the", "wet", "floor", "."],
      valid_structures: [
        ["While", "Jake", "was", "walking", "down", "the", "corridor", ",", "Tom", "slipped", "on", "the", "wet", "floor", "."],
        ["Tom", "slipped", "on", "the", "wet", "floor", "while", "Jake", "was", "walking", "down", "the", "corridor", "."]
      ],
      distractor_blocks: ["is", "slips", "walks"]
    },
    {
      id: "st2_w33_g02",
      grammar_tag: "past_continuous_while",
      text_en: "While Tom was running in a hurry, he slipped and hurt his knee.",
      instruction: "Sắp xếp các khối từ để miêu tả hành động vội vàng của Tom:",
      prompt_vi: "Khi Tom đang vội vàng chạy, cậu ấy bị trượt ngã và đau đầu gối.",
      prompt_en: "While Tom was running in a hurry, he slipped and hurt his knee.",
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
      text_en: "While Jake was helping Tom, Nurse Sarah arrived quickly.",
      instruction: "Sắp xếp các khối từ miêu tả sự xuất hiện kịp thời của cô y tá:",
      prompt_vi: "Trong khi Jake đang giúp đỡ Tom, cô y tá Sarah đã nhanh chóng đến nơi.",
      prompt_en: "While Jake was helping Tom, Nurse Sarah arrived quickly.",
      word_blocks: ["While", "Jake", "was", "helping", "Tom", ",", "Nurse", "Sarah", "arrived", "quickly", "."],
      valid_structures: [
        ["While", "Jake", "was", "helping", "Tom", ",", "Nurse", "Sarah", "arrived", "quickly", "."],
        ["Nurse", "Sarah", "arrived", "quickly", "while", "Jake", "was", "helping", "Tom", "."]
      ],
      distractor_blocks: ["is", "helps", "arrives"]
    },
    {
      id: "st2_w33_g04",
      grammar_tag: "past_continuous_while",
      text_en: "While Nurse Sarah was treating his ankle, Tom felt very relieved.",
      instruction: "Sắp xếp các khối từ miêu tả việc sơ cứu cho Tom:",
      prompt_vi: "Trong khi cô y tá Sarah đang chăm sóc mắt cá chân, Tom cảm thấy rất nhẹ nhõm.",
      prompt_en: "While Nurse Sarah was treating his ankle, Tom felt very relieved.",
      word_blocks: ["While", "Nurse", "Sarah", "was", "treating", "his", "ankle", ",", "Tom", "felt", "very", "relieved", "."],
      valid_structures: [
        ["While", "Nurse", "Sarah", "was", "treating", "his", "ankle", ",", "Tom", "felt", "very", "relieved", "."],
        ["Tom", "felt", "very", "relieved", "while", "Nurse", "Sarah", "was", "treating", "his", "ankle", "."]
      ],
      distractor_blocks: ["treats", "feels", "is"]
    },
    {
      id: "st2_w33_g05",
      grammar_tag: "past_continuous_while",
      text_en: "While the cleaners were drying the floor, the headmaster praised Jake.",
      instruction: "Sắp xếp các khối từ miêu tả hành động của thầy hiệu trưởng:",
      prompt_vi: "Trong khi các cô chú lao công đang lau khô sàn, thầy hiệu trưởng đã khen ngợi Jake.",
      prompt_en: "While the cleaners were drying the floor, the headmaster praised Jake.",
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
    diagramImage: "/images/week33/webtoon_scene_2.png",
    background_image: "/images/week33/webtoon_scene_2.png",
    explanation: "Drag the physics principles and safety tools to the correct positions across 3 scenarios to discover how friction protects everyone in school corridors!",
    description_en: "Drag the physics principles and safety tools to the correct positions across 3 scenarios to discover how friction protects everyone in school corridors!",
    stages: [
      {
        id: "stage_1_puddle",
        stageNumber: 1,
        title: "Stage 1: Wet Floor & Low Friction Hazard",
        diagramImage: "/images/week33/webtoon_scene_2.png",
        background_image: "/images/week33/webtoon_scene_2.png",
        explanation: "Explore how spilled water reduces friction between shoes and smooth corridor tiles!",
        zones: [
          {
            id: "z1_1",
            label: "Wet Floor Puddle",
            correct_label: "Low Friction Zone",
            x: 58,
            y: 84,
            micro_explanation: "⚠️ Water forms a thin layer that drastically lowers tile friction."
          },
          {
            id: "z1_2",
            label: "Running Fast",
            correct_label: "Forward Motion",
            x: 64,
            y: 38,
            micro_explanation: "⚡ Running fast builds momentum that cannot stop without floor grip."
          },
          {
            id: "z1_3",
            label: "Yellow Caution Sign",
            correct_label: "Hazard Alert",
            x: 76,
            y: 68,
            micro_explanation: "💡 Bright yellow sign warns everyone to slow down and walk carefully."
          },
          {
            id: "z1_4",
            label: "Dry Floor Tiles",
            correct_label: "Firm Walking Area",
            x: 24,
            y: 78,
            micro_explanation: "🧱 Dry tiles provide normal friction so students walk steadily."
          }
        ],
        labels: [
          { id: "lbl_1_1", text: "Low Friction Zone", targetId: "z1_1" },
          { id: "lbl_1_2", text: "Forward Motion", targetId: "z1_2" },
          { id: "lbl_1_3", text: "Hazard Alert", targetId: "z1_3" },
          { id: "lbl_1_4", text: "Firm Walking Area", targetId: "z1_4" }
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
            x: 30,
            y: 76,
            micro_explanation: "👟 Textured rubber grooves grip floor tiles and prevent slipping."
          },
          {
            id: "z2_2",
            label: "Smooth Plastic Sole",
            correct_label: "Zero Grip Hazard",
            x: 76,
            y: 78,
            micro_explanation: "⚠️ Smooth soles slide right over water without catching the floor."
          },
          {
            id: "z2_3",
            label: "Dry Ceramic Floor",
            correct_label: "Firm Footing Area",
            x: 16,
            y: 38,
            micro_explanation: "🧱 Dry tiles provide normal friction so students walk steadily."
          },
          {
            id: "z2_4",
            label: "Careful Walking Pace",
            correct_label: "Balanced Body Motion",
            x: 50,
            y: 20,
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
            x: 42,
            y: 70,
            micro_explanation: "🧊 Applying cold ice constricts blood vessels and eases joint pain."
          },
          {
            id: "z3_2",
            label: "Clean Bandage",
            correct_label: "Protects Skin Cut",
            x: 74,
            y: 74,
            micro_explanation: "🩹 A clean bandage shields skin wounds from dust and germs."
          },
          {
            id: "z3_3",
            label: "School Nurse Care",
            correct_label: "Medical Assessment",
            x: 78,
            y: 26,
            micro_explanation: "👩‍⚕️ Nurse assesses injury severity and comforts the student."
          },
          {
            id: "z3_4",
            label: "Resting On Bench",
            correct_label: "Safe Recovery Rest",
            x: 20,
            y: 42,
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
