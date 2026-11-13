/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 74 | Theme: "Science/ELA: Food Chains / Math: Complex Charts" | CEFR: "B1 Preliminary"
 * Updated: 2026-11-13T04:18:06.393Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 74,
  "theme": "Science/ELA: Food Chains / Math: Complex Charts",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "If plants capture sunlight, they produce chemical food.",
      "options": [
        "produce",
        "produced",
        "producing"
      ],
      "answer": "produce",
      "explanation": "Zero conditional uses present simple in both clauses for scientific facts."
    },
    {
      "sentence": "When herbivores eat green leaves, energy transfers up the food chain.",
      "options": [
        "transfers",
        "transferred",
        "transferring"
      ],
      "answer": "transfers",
      "explanation": "Use 3rd person singular present simple 'transfers' with the singular subject 'energy'."
    },
    {
      "sentence": "If a predator disappears, herbivore populations explode.",
      "options": [
        "disappears",
        "disappeared",
        "disappearing"
      ],
      "answer": "disappears",
      "explanation": "In the 'if' clause of a zero conditional, use present simple ('disappears')."
    },
    {
      "sentence": "Decomposers break down dead logs to enrich the soil.",
      "options": [
        "break",
        "breaks",
        "breaking"
      ],
      "answer": "break",
      "explanation": "Use the base plural verb 'break' with the plural subject 'Decomposers'."
    },
    {
      "sentence": "Every living organism plays a vital role in its ecosystem.",
      "options": [
        "organism",
        "organic",
        "organ"
      ],
      "answer": "organism",
      "explanation": "The noun 'organism' means any individual living plant, animal, or microbe."
    }
  ],
  "singapore_math": [
    {
      "id": "w74_p1",
      "type": "part_whole",
      "title": "Comparing Herbivore and Carnivore Counts on Complex Charts",
      "question": "In the Oak Ridge Reserve survey, researchers counted 140 herbivores (rabbits and deer) and 35 carnivores (hawks and foxes). How many total animals were recorded in the population chart?",
      "storyContext": "Ranger Chloe plots multi-set animal survey data onto an ecological double bar graph.",
      "modelData": {
        "bars": [
          {
            "label": "Herbivores (Prey)",
            "value": 140,
            "color": "#10b981"
          },
          {
            "label": "Carnivores (Predators)",
            "value": 35,
            "color": "#ef4444"
          }
        ],
        "total": 175,
        "unit": "animals"
      },
      "target_answer": 175,
      "unit": "animals",
      "steps": [
        "Record the herbivore population: 140 animals.",
        "Add the carnivore population: 35 animals.",
        "140 + 35 = 175 total animals in the survey."
      ]
    },
    {
      "id": "w74_p2",
      "type": "comparison",
      "title": "Comparing Biomass Yield in Two Forest Sectors",
      "question": "Sector North produced 180 kilograms of plant biomass per hectare, while Sector South produced 115 kilograms. How many more kilograms of biomass did Sector North produce than Sector South?",
      "storyContext": "Leo compares primary producer biomass between two woodland study quadrants.",
      "modelData": {
        "bars": [
          {
            "label": "Sector North Biomass",
            "value": 180,
            "color": "#059669"
          },
          {
            "label": "Sector South Biomass",
            "value": 115,
            "color": "#d97706"
          }
        ],
        "difference": 65,
        "unit": "kg"
      },
      "target_answer": 65,
      "unit": "kg",
      "steps": [
        "Start with Sector North biomass: 180 kg.",
        "Subtract Sector South biomass: 115 kg.",
        "180 - 115 = 65 kg difference in biomass."
      ]
    },
    {
      "id": 3,
      "title": "Problem 3: Invertebrate Biomass Census (Part-Whole)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "An ecological survey recorded 240 grams of insect biomass, 160 grams of crustacean biomass, and 120 grams of mollusk biomass per square meter. What is the total invertebrate biomass?",
      "question": "An ecological survey recorded 240 grams of insect biomass, 160 grams of crustacean biomass, and 120 grams of mollusk biomass per square meter. What is the total invertebrate biomass?",
      "correctAnswer": 520,
      "target_answer": 520,
      "unit": "grams",
      "hintText": "Add insect biomass (240), crustacean biomass (160), and mollusk biomass (120) together.",
      "steps": [
        "Insects and crustaceans: 240 + 160 = 400 g.",
        "Add mollusks: 400 + 120 = 520 g."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Insects: 240g",
            "value": 240,
            "color": "#16a34a"
          },
          {
            "label": "Crustaceans: 160g",
            "value": 160,
            "color": "#059669"
          },
          {
            "label": "Mollusks: 120g",
            "value": 120,
            "color": "#10b981"
          }
        ],
        "totalLabel": "Total: 520 g"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Primary Producers Energy Yield (Comparison)",
      "difficulty": "medium",
      "type": "comparison",
      "problemText": "Grassland Plot Alpha produced 450 kilocalories of vegetative energy per square meter, while Shrubland Plot Beta produced 275 kilocalories. How many more kilocalories were produced in Plot Alpha?",
      "question": "Grassland Plot Alpha produced 450 kilocalories of vegetative energy per square meter, while Shrubland Plot Beta produced 275 kilocalories. How many more kilocalories were produced in Plot Alpha?",
      "correctAnswer": 175,
      "target_answer": 175,
      "unit": "kcal",
      "hintText": "Subtract Plot Beta energy (275) from Plot Alpha energy (450).",
      "steps": [
        "Plot Alpha yield: 450 kcal.",
        "Plot Beta yield: 275 kcal.",
        "Difference: 450 - 275 = 175 kcal."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Plot Alpha: 450",
            "value": 450,
            "color": "#84cc16"
          },
          {
            "label": "Plot Beta: 275",
            "value": 275,
            "color": "#a16207"
          }
        ],
        "differenceLabel": "175 kcal difference"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Apex Predator Prey Tracking (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A tracked hawk consumed 80 small rodents in a month. Field observations identified 32 field mice and 28 voles. The remaining prey were shrews. How many shrews did the hawk consume?",
      "question": "A tracked hawk consumed 80 small rodents in a month. Field observations identified 32 field mice and 28 voles. The remaining prey were shrews. How many shrews did the hawk consume?",
      "correctAnswer": 20,
      "target_answer": 20,
      "unit": "shrews",
      "hintText": "Add field mice (32) and voles (28) first. Then subtract from total prey (80).",
      "steps": [
        "Mice and voles: 32 + 28 = 60 rodents.",
        "Shrews: 80 - 60 = 20 shrews."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Mice: 32",
            "value": 32,
            "color": "#6366f1"
          },
          {
            "label": "Voles: 28",
            "value": 28,
            "color": "#8b5cf6"
          },
          {
            "label": "Shrews: 20",
            "value": 20,
            "color": "#cbd5e1"
          }
        ],
        "totalLabel": "Total: 80 prey"
      }
    }
  ],
  "science_lab": {
    "title_en": "Science/ELA: Food Chains / Math: Complex Charts Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Photosynthesis & Solar Capture",
        "diagram_type": "producer_energy_harness",
        "instruction": "Select the required components for primary producers to manufacture glucose.",
        "items": [
          {
            "label": "Solar Radiation Influx",
            "target": "sunlight"
          },
          {
            "label": "Chlorophyll Absorption",
            "target": "photosynthesis"
          },
          {
            "label": "Glucose Energy Output",
            "target": "biomass"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Herbivore to Carnivore Transfer",
        "diagram_type": "trophic_transfer_chain",
        "instruction": "Connect the feeding pathways between trophic tiers in the woodland.",
        "items": [
          {
            "label": "Green Oak Leaves",
            "target": "producer"
          },
          {
            "label": "Meadow Caterpillar",
            "target": "primary_consumer"
          },
          {
            "label": "Red-Tailed Hawk",
            "target": "apex_predator"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Nutrient Recycling & Decomposition",
        "diagram_type": "decomposer_substrate",
        "instruction": "Route organic matter into the fungal decomposition network.",
        "items": [
          {
            "label": "Fallen Leaf Litter",
            "target": "organic_matter"
          },
          {
            "label": "Mycelium Fungal Web",
            "target": "decomposer"
          },
          {
            "label": "Soil Mineral Replenishment",
            "target": "nutrients"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
