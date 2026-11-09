/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 74 | Theme: "Science/ELA: Food Chains / Math: Complex Charts" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.697Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
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
