/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 76 | Theme: "History/ELA: Explorers / Math: Map Scales" | CEFR: "B1 Preliminary"
 * Updated: 2026-11-13T04:18:06.394Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 76,
  "theme": "History/ELA: Explorers / Math: Map Scales",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "Magellan sailed through the narrow strait into the Pacific Ocean.",
      "options": [
        "through",
        "across",
        "under"
      ],
      "answer": "through",
      "explanation": "Use 'through' when passing within a 3D channel or passage like a strait."
    },
    {
      "sentence": "If the crew had citrus fruit, they did not suffer from scurvy.",
      "options": [
        "suffer",
        "suffered",
        "suffering"
      ],
      "answer": "suffer",
      "explanation": "After auxiliary 'did not', use base bare infinitive 'suffer'."
    },
    {
      "sentence": "The map scale indicates that one centimeter represents five kilometers.",
      "options": [
        "represents",
        "representing",
        "represented"
      ],
      "answer": "represents",
      "explanation": "Use 3rd person singular present simple for general cartographic rules."
    },
    {
      "sentence": "The ancient caravel was discovered on a sandy seabed south of the reef.",
      "options": [
        "was discovered",
        "discovered",
        "discovering"
      ],
      "answer": "was discovered",
      "explanation": "Use past passive voice 'was discovered' because the caravel received the action."
    },
    {
      "sentence": "Navigators must keep magnetic compasses away from electrical equipment.",
      "options": [
        "away from",
        "into",
        "towards"
      ],
      "answer": "away from",
      "explanation": "The prepositional phrase 'away from' indicates maintaining physical distance."
    }
  ],
  "singapore_math": [
    {
      "id": "w76_p1",
      "type": "part_whole",
      "title": "Calculating Real Distance Using Map Scale",
      "question": "On a maritime chart with a scale of 1 cm = 15 km, Captain Miller measures 8 cm from the island harbor to the coral reef. What is the real distance in kilometers?",
      "storyContext": "Liam uses map scales to calculate nautical distances across the archipelago.",
      "modelData": {
        "bars": [
          {
            "label": "Chart Distance (8 units of 15 km)",
            "value": 120,
            "color": "#0ea5e9"
          }
        ],
        "total": 120,
        "unit": "km"
      },
      "target_answer": 120,
      "unit": "km",
      "steps": [
        "Each 1 cm on the map equals 15 km in reality.",
        "Multiply 8 cm by 15 km.",
        "8 x 15 = 120 km total real distance."
      ]
    },
    {
      "id": "w76_p2",
      "type": "comparison",
      "title": "Comparing Two Sea Navigation Routes",
      "question": "Route Alpha across the strait is 165 kilometers, while Route Beta around the outer cape is 240 kilometers. How many kilometers shorter is Route Alpha than Route Beta?",
      "storyContext": "The navigators compare two alternative channels to save sailing time.",
      "modelData": {
        "bars": [
          {
            "label": "Route Beta (Outer Cape)",
            "value": 240,
            "color": "#6366f1"
          },
          {
            "label": "Route Alpha (Strait)",
            "value": 165,
            "color": "#10b981"
          }
        ],
        "difference": 75,
        "unit": "km"
      },
      "target_answer": 75,
      "unit": "km",
      "steps": [
        "Start with Route Beta: 240 km.",
        "Subtract Route Alpha: 165 km.",
        "240 - 165 = 75 km shorter."
      ]
    },
    {
      "id": 3,
      "title": "Problem 3: Archipelago Expedition Distance (Part-Whole)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A sailing vessel covered 140 nautical miles through the western sound and 175 nautical miles along the outer reefs. What was the total distance covered across both legs?",
      "question": "A sailing vessel covered 140 nautical miles through the western sound and 175 nautical miles along the outer reefs. What was the total distance covered across both legs?",
      "correctAnswer": 315,
      "target_answer": 315,
      "unit": "nautical miles",
      "hintText": "Add sound distance (140) and reef distance (175) together.",
      "steps": [
        "Western sound leg: 140 nm.",
        "Outer reef leg: 175 nm.",
        "Total distance: 140 + 175 = 315 nautical miles."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Sound: 140nm",
            "value": 140,
            "color": "#0284c7"
          },
          {
            "label": "Reefs: 175nm",
            "value": 175,
            "color": "#0369a1"
          }
        ],
        "totalLabel": "Total: 315 nm"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Coastline Survey Margin (Comparison)",
      "difficulty": "medium",
      "type": "comparison",
      "problemText": "Surveyor Elena mapped 320 kilometers of northern coastline, while her colleague mapped 245 kilometers of southern coastline. How many more kilometers did Elena survey?",
      "question": "Surveyor Elena mapped 320 kilometers of northern coastline, while her colleague mapped 245 kilometers of southern coastline. How many more kilometers did Elena survey?",
      "correctAnswer": 75,
      "target_answer": 75,
      "unit": "km",
      "hintText": "Subtract southern survey (245) from northern survey (320).",
      "steps": [
        "Northern survey: 320 km.",
        "Southern survey: 245 km.",
        "Difference: 320 - 245 = 75 kilometers."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "North: 320km",
            "value": 320,
            "color": "#2563eb"
          },
          {
            "label": "South: 245km",
            "value": 245,
            "color": "#475569"
          }
        ],
        "differenceLabel": "75 km difference"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Voyage Provisions Allocation (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "An exploration caravel stocked 450 barrels of provisions for a transatlantic voyage. The crew consumed 130 barrels in month one and 160 barrels in month two. How many barrels remained for month three?",
      "question": "An exploration caravel stocked 450 barrels of provisions for a transatlantic voyage. The crew consumed 130 barrels in month one and 160 barrels in month two. How many barrels remained for month three?",
      "correctAnswer": 160,
      "target_answer": 160,
      "unit": "barrels",
      "hintText": "Add month one (130) and month two (160) consumption first. Then subtract from total stock (450).",
      "steps": [
        "Barrels consumed: 130 + 160 = 290 barrels.",
        "Remaining barrels: 450 - 290 = 160 barrels."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Month 1: 130",
            "value": 130,
            "color": "#d97706"
          },
          {
            "label": "Month 2: 160",
            "value": 160,
            "color": "#b45309"
          },
          {
            "label": "Remaining: 160",
            "value": 160,
            "color": "#e2e8f0"
          }
        ],
        "totalLabel": "Total: 450 barrels"
      }
    }
  ],
  "science_lab": {
    "title_en": "Maritime Navigation & Cartography Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Magnetic Declination & Compass Alignment",
        "diagram_type": "compass_declination_grid",
        "instruction": "Align the compass needle with geographic true north.",
        "items": [
          {
            "label": "Magnetic Needle Pointer",
            "target": "magnetic_north"
          },
          {
            "label": "Rotating Compass Bezel",
            "target": "degrees_ring"
          },
          {
            "label": "Map True North Meridian",
            "target": "grid_north"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Scale Conversion Bar Calculation",
        "diagram_type": "linear_map_scale_ruler",
        "instruction": "Calibrate map scale units to physical ground kilometers.",
        "items": [
          {
            "label": "1 Centimeter Map Span",
            "target": "paper_unit"
          },
          {
            "label": "10 Kilometer Ratio Multiplier",
            "target": "scale_factor"
          },
          {
            "label": "Real Ground Navigation Path",
            "target": "real_distance"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Ocean Current & Speed Vector Plotting",
        "diagram_type": "marine_drift_vector",
        "instruction": "Calculate vessel course correction accounting for ocean currents.",
        "items": [
          {
            "label": "Caravel Heading Vector",
            "target": "ship_course"
          },
          {
            "label": "Equatorial Current Drift",
            "target": "water_flow"
          },
          {
            "label": "Resultant Course Over Ground",
            "target": "true_path"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
