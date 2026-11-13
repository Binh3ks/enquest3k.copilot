/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 80 | Theme: "Supply, Demand & Market Prices / Math: Market Equilibrium Graphs" | CEFR: "B1 Preliminary"
 * Updated: 2026-11-13T04:18:06.396Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 80,
  "theme": "Supply, Demand & Market Prices / Math: Market Equilibrium Graphs",
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
      "title": "Problem 3: Wholesale Market Supply Total (Part-Whole)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A local agricultural co-op delivered 260 crates of organic apples and 190 crates of citrus fruits to the central exchange. How many total crates of fruit were supplied to the market?",
      "question": "A local agricultural co-op delivered 260 crates of organic apples and 190 crates of citrus fruits to the central exchange. How many total crates of fruit were supplied to the market?",
      "correctAnswer": 450,
      "target_answer": 450,
      "unit": "crates",
      "hintText": "Add apple crates (260) and citrus crates (190) together.",
      "steps": [
        "Apple supply: 260 crates.",
        "Citrus supply: 190 crates.",
        "Total market supply: 260 + 190 = 450 crates."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Apples: 260",
            "value": 260,
            "color": "#ef4444"
          },
          {
            "label": "Citrus: 190",
            "value": 190,
            "color": "#f97316"
          }
        ],
        "totalLabel": "Total: 450 crates"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Equilibrium Price Shift (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "During high holiday demand, the price of festive honey jars rose to 45 dollars, compared to the off-season equilibrium price of 28 dollars. What was the price increase in dollars?",
      "question": "During high holiday demand, the price of festive honey jars rose to 45 dollars, compared to the off-season equilibrium price of 28 dollars. What was the price increase in dollars?",
      "correctAnswer": 17,
      "target_answer": 17,
      "unit": "dollars",
      "hintText": "Subtract off-season price (28) from peak holiday price (45).",
      "steps": [
        "Peak holiday price: $45.",
        "Off-season price: $28.",
        "Price difference: 45 - 28 = 17 dollars."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Peak: $45",
            "value": 45,
            "color": "#eab308"
          },
          {
            "label": "Off-season: $28",
            "value": 28,
            "color": "#64748b"
          }
        ],
        "differenceLabel": "$17 price increase"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Artisan Bakery Production Batch (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "An artisan bakery produced 400 loaves of sourdough bread. Morning retail customers bought 175 loaves, and lunch catering orders took 145 loaves. How many loaves remained for evening discount sales?",
      "question": "An artisan bakery produced 400 loaves of sourdough bread. Morning retail customers bought 175 loaves, and lunch catering orders took 145 loaves. How many loaves remained for evening discount sales?",
      "correctAnswer": 80,
      "target_answer": 80,
      "unit": "loaves",
      "hintText": "Add morning sales (175) and catering sales (145) first. Then subtract from total production (400).",
      "steps": [
        "Sold loaves: 175 + 145 = 320 loaves.",
        "Remaining for evening: 400 - 320 = 80 loaves."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Morning: 175",
            "value": 175,
            "color": "#d97706"
          },
          {
            "label": "Catering: 145",
            "value": 145,
            "color": "#b45309"
          },
          {
            "label": "Evening: 80",
            "value": 80,
            "color": "#fed7aa"
          }
        ],
        "totalLabel": "Batch: 400 loaves"
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
