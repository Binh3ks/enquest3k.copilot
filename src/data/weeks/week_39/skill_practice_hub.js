/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 39 | Theme: "Habitats (Persuasion Intro)" | CEFR: "A2 Flyers"
 * Updated: 2026-11-13T04:18:06.386Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 39,
  "theme": "Habitats (Persuasion Intro)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "I think the camel belongs in the dry desert.",
      "options": [
        "belongs",
        "belonging",
        "belonged"
      ],
      "answer": "belongs",
      "explanation": "Use 3rd person singular present tense 'belongs' with 'the camel'."
    },
    {
      "sentence": "Parrots build their nests high in the rainforest canopy.",
      "options": [
        "build",
        "builds",
        "building"
      ],
      "answer": "build",
      "explanation": "Use plural present form 'build' with 'parrots'."
    },
    {
      "sentence": "Polar bears have thick white fur to stay warm.",
      "options": [
        "have",
        "has",
        "having"
      ],
      "answer": "have",
      "explanation": "Use plural verb 'have' with 'polar bears'."
    },
    {
      "sentence": "The nature reserve is safe for all wild creatures.",
      "options": [
        "safe",
        "safely",
        "safety"
      ],
      "answer": "safe",
      "explanation": "Use adjective 'safe' after the linking verb 'is'."
    },
    {
      "sentence": "In my opinion, every animal needs a protected habitat.",
      "options": [
        "opinion",
        "idea",
        "mind"
      ],
      "answer": "opinion",
      "explanation": "The standard collocation for giving a view is 'In my opinion'."
    }
  ],
  "singapore_math": [
    {
      "id": "w39_p1",
      "type": "part_whole",
      "title": "Wildlife Sanctuary Habitat Acres",
      "question": "The Green Valley Sanctuary has 45 acres of desert land and 55 acres of rainforest land. How many acres does the sanctuary protect in total?",
      "storyContext": "Ranger David measures the sanctuary boundary to make sure all animals have enough space.",
      "modelData": {
        "bars": [
          {
            "label": "Desert Zone",
            "value": 45,
            "color": "#f59e0b"
          },
          {
            "label": "Rainforest Zone",
            "value": 55,
            "color": "#10b981"
          }
        ],
        "total": 100,
        "unit": "acres"
      },
      "target_answer": 100,
      "unit": "acres",
      "steps": [
        "Add the desert zone: 45 acres.",
        "Add the rainforest zone: 55 acres.",
        "45 + 55 = 100 acres in total."
      ]
    },
    {
      "id": "w39_p2",
      "type": "comparison",
      "title": "Comparing Marine and Polar Animals",
      "question": "The sanctuary rescued 36 marine turtles and 14 polar seabirds. How many more turtles were rescued than seabirds?",
      "storyContext": "Emma tallies the rescued animals resting in safe recovery pools.",
      "modelData": {
        "bars": [
          {
            "label": "Sea Turtles",
            "value": 36,
            "color": "#0ea5e9"
          },
          {
            "label": "Polar Seabirds",
            "value": 14,
            "color": "#6366f1"
          }
        ],
        "difference": 22,
        "unit": "animals"
      },
      "target_answer": 22,
      "unit": "animals",
      "steps": [
        "Start with the 36 sea turtles.",
        "Subtract the 14 polar seabirds.",
        "36 - 14 = 22 more sea turtles."
      ]
    },
    {
      "id": 3,
      "title": "Problem 3: Mangrove Seedling Restoration (Part-Whole)",
      "difficulty": "easy",
      "type": "part_whole",
      "problemText": "Conservation volunteers planted 52 mangrove seedlings along the shore and 38 seedlings along the river estuary. How many mangrove seedlings were planted in total?",
      "question": "Conservation volunteers planted 52 mangrove seedlings along the shore and 38 seedlings along the river estuary. How many mangrove seedlings were planted in total?",
      "correctAnswer": 90,
      "target_answer": 90,
      "unit": "seedlings",
      "hintText": "Add shoreline seedlings (52) and estuary seedlings (38) together.",
      "steps": [
        "Shoreline planting: 52 seedlings.",
        "Estuary planting: 38 seedlings.",
        "Total planted: 52 + 38 = 90 seedlings."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Shore: 52",
            "value": 52,
            "color": "#059669"
          },
          {
            "label": "Estuary: 38",
            "value": 38,
            "color": "#10b981"
          }
        ],
        "totalLabel": "Total: 90 seedlings"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Mountain Sanctuary Animals (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "In the alpine habitat zone, rangers documented 46 bighorn sheep and 28 mountain goats. How many more bighorn sheep were documented than mountain goats?",
      "question": "In the alpine habitat zone, rangers documented 46 bighorn sheep and 28 mountain goats. How many more bighorn sheep were documented than mountain goats?",
      "correctAnswer": 18,
      "target_answer": 18,
      "unit": "animals",
      "hintText": "Subtract mountain goats (28) from bighorn sheep (46).",
      "steps": [
        "Bighorn sheep: 46.",
        "Mountain goats: 28.",
        "Difference: 46 - 28 = 18 more sheep."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Sheep: 46",
            "value": 46,
            "color": "#d97706"
          },
          {
            "label": "Goats: 28",
            "value": 28,
            "color": "#64748b"
          }
        ],
        "differenceLabel": "18 more sheep"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Freshwater Wetland Capacity (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A freshwater wetland habitat can accommodate 80 water birds. Currently, there are 25 mallards and 35 herons living there. How many more water birds can the wetland shelter before reaching capacity?",
      "question": "A freshwater wetland habitat can accommodate 80 water birds. Currently, there are 25 mallards and 35 herons living there. How many more water birds can the wetland shelter before reaching capacity?",
      "correctAnswer": 20,
      "target_answer": 20,
      "unit": "birds",
      "hintText": "Add resident mallards (25) and herons (35) first. Then subtract from total capacity (80).",
      "steps": [
        "Current resident birds: 25 + 35 = 60 birds.",
        "Remaining capacity: 80 - 60 = 20 birds."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Mallards: 25",
            "value": 25,
            "color": "#2563eb"
          },
          {
            "label": "Herons: 35",
            "value": 35,
            "color": "#06b6d4"
          },
          {
            "label": "Capacity: 20",
            "value": 20,
            "color": "#cbd5e1"
          }
        ],
        "totalLabel": "Max: 80 birds"
      }
    }
  ],
  "science_lab": {
    "title_en": "Habitats (Persuasion Intro) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Desert vs Polar Features",
        "diagram_type": "habitat_temperature_cards",
        "instruction": "Sort the survival adaptations into Desert or Polar categories.",
        "items": [
          {
            "label": "Thick Blubber Fat",
            "target": "polar"
          },
          {
            "label": "Water-Storing Hump",
            "target": "desert"
          },
          {
            "label": "Snow Camouflage Fur",
            "target": "polar"
          },
          {
            "label": "Cool Deep Burrow",
            "target": "desert"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Food and Shelter Matching",
        "diagram_type": "food_shelter_slots",
        "instruction": "Match each wild animal to its correct shelter and food source.",
        "items": [
          {
            "label": "Parrot -> Rainforest Canopy",
            "target": "canopy"
          },
          {
            "label": "Tortoise -> Sandy Burrow",
            "target": "burrow"
          },
          {
            "label": "Seal -> Icy Polar Shelf",
            "target": "ice_shelf"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Building a Safe Nature Reserve",
        "diagram_type": "reserve_protection_plan",
        "instruction": "Assemble the three essential elements of a safe animal sanctuary.",
        "items": [
          {
            "label": "Clean Freshwater Source",
            "target": "resources"
          },
          {
            "label": "Protected Leafy Shelter",
            "target": "shelter"
          },
          {
            "label": "Active Ranger Patrol",
            "target": "safety"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
