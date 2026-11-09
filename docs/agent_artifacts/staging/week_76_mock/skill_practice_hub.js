/**
 * STAGED MOCK EXAM DELIVERABLE: Skill Practice Hub (B1 PET Exam Strategies)
 * Week: 76 | Level: Cambridge B1 Preliminary | Mode: FULL_MOCK
 * Pipeline: scripts/generate_pet_mock_content.mjs (Round 67 PET Pilot)
 * Cumulative Sourcing: Weeks 73, 74, 75, 76
 */

export const skillPracticeHubData = {
  week: 76,
  theme: "History/ELA: Explorers / Math: Map Scales",
  cefr_level: "B1 Preliminary",
  grammar_drills: [
    { sentence: "Magellan sailed through the narrow strait into the Pacific Ocean.", options: ["through", "across", "under"], answer: "through", explanation: "Use 'through' when passing within a 3D channel or passage like a strait." },
    { sentence: "If the crew had citrus fruit, they did not suffer from scurvy.", options: ["suffer", "suffered", "suffering"], answer: "suffer", explanation: "After auxiliary 'did not', use base bare infinitive 'suffer'." },
    { sentence: "The map scale indicates that one centimeter represents five kilometers.", options: ["represents", "representing", "represented"], answer: "represents", explanation: "Use 3rd person singular present simple for general cartographic rules." },
    { sentence: "The ancient caravel was discovered on a sandy seabed south of the reef.", options: ["was discovered", "discovered", "discovering"], answer: "was discovered", explanation: "Use past passive voice 'was discovered' because the caravel received the action." },
    { sentence: "Navigators must keep magnetic compasses away from electrical equipment.", options: ["away from", "into", "towards"], answer: "away from", explanation: "The prepositional phrase 'away from' indicates maintaining physical distance." }
  ],
  singapore_math: [
    {
      id: "w76_p1",
      type: "part_whole",
      title: "Calculating Real Distance Using Map Scale",
      question: "On a maritime chart with a scale of 1 cm = 15 km, Captain Miller measures 8 cm from the island harbor to the coral reef. What is the real distance in kilometers?",
      storyContext: "Liam uses map scales to calculate nautical distances across the archipelago.",
      modelData: {
        bars: [
          { label: "Chart Distance (8 units of 15 km)", value: 120, color: "#0ea5e9" }
        ],
        total: 120,
        unit: "km"
      },
      target_answer: 120,
      unit: "km",
      steps: [
        "Each 1 cm on the map equals 15 km in reality.",
        "Multiply 8 cm by 15 km.",
        "8 x 15 = 120 km total real distance."
      ]
    },
    {
      id: "w76_p2",
      type: "comparison",
      title: "Comparing Two Sea Navigation Routes",
      question: "Route Alpha across the strait is 165 kilometers, while Route Beta around the outer cape is 240 kilometers. How many kilometers shorter is Route Alpha than Route Beta?",
      storyContext: "The navigators compare two alternative channels to save sailing time.",
      modelData: {
        bars: [
          { label: "Route Beta (Outer Cape)", value: 240, color: "#6366f1" },
          { label: "Route Alpha (Strait)", value: 165, color: "#10b981" }
        ],
        difference: 75,
        unit: "km"
      },
      target_answer: 75,
      unit: "km",
      steps: [
        "Start with Route Beta: 240 km.",
        "Subtract Route Alpha: 165 km.",
        "240 - 165 = 75 km shorter."
      ]
    }
  ],
  science_lab: {
    title_en: "Maritime Navigation & Cartography Workshop",
    scenarios: [
      {
        stage: 1,
        title: "Magnetic Declination & Compass Alignment",
        diagram_type: "compass_declination_grid",
        instruction: "Align the compass needle with geographic true north.",
        items: [
          { label: "Magnetic Needle Pointer", target: "magnetic_north" },
          { label: "Rotating Compass Bezel", target: "degrees_ring" },
          { label: "Map True North Meridian", target: "grid_north" }
        ]
      },
      {
        stage: 2,
        title: "Scale Conversion Bar Calculation",
        diagram_type: "linear_map_scale_ruler",
        instruction: "Calibrate map scale units to physical ground kilometers.",
        items: [
          { label: "1 Centimeter Map Span", target: "paper_unit" },
          { label: "10 Kilometer Ratio Multiplier", target: "scale_factor" },
          { label: "Real Ground Navigation Path", target: "real_distance" }
        ]
      },
      {
        stage: 3,
        title: "Ocean Current & Speed Vector Plotting",
        diagram_type: "marine_drift_vector",
        instruction: "Calculate vessel course correction accounting for ocean currents.",
        items: [
          { label: "Caravel Heading Vector", target: "ship_course" },
          { label: "Equatorial Current Drift", target: "water_flow" },
          { label: "Resultant Course Over Ground", target: "true_path" }
        ]
      }
    ]
  }
};

export default skillPracticeHubData;
