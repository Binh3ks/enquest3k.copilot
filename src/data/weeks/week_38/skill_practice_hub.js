/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 38 | Theme: "Animal Abilities (Modals)" | CEFR: "A2 Flyers"
 * Updated: 2026-11-13T04:18:06.386Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 38,
  "theme": "Animal Abilities (Modals)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "prompt": "Fish ___ breathe underwater using their gills.",
      "options": [
        "can",
        "cannot",
        "must"
      ],
      "answer": "can"
    },
    {
      "id": 2,
      "prompt": "Heavy adult elephants ___ jump off the ground.",
      "options": [
        "cannot",
        "can",
        "could"
      ],
      "answer": "cannot"
    },
    {
      "id": 3,
      "prompt": "Owls ___ see clearly during the dark night.",
      "options": [
        "can",
        "cannot",
        "are"
      ],
      "answer": "can"
    },
    {
      "id": 4,
      "prompt": "Penguins ___ fly in the sky like seagulls.",
      "options": [
        "can't",
        "can",
        "are"
      ],
      "answer": "can't"
    },
    {
      "id": 5,
      "prompt": "Cheetahs ___ run faster than racehorses.",
      "options": [
        "can",
        "cannot",
        "do"
      ],
      "answer": "can"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Problem 1: Cheetah vs Gazelle Running Speed (Comparison)",
      "problemText": "A cheetah can run at 110 kilometers per hour. A gazelle can run at 80 kilometers per hour. What is the difference in their running speeds?",
      "correctAnswer": 30,
      "answer": "30 km/h",
      "hintText": "Cheetah speed (110) - Gazelle speed (80) = 30 km/h difference.",
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "value": 110,
            "label": "Cheetah 110 km/h",
            "color": "#f59e0b"
          },
          {
            "value": 80,
            "label": "Gazelle 80 km/h",
            "color": "#10b981"
          }
        ],
        "differenceLabel": "30 km/h difference"
      }
    },
    {
      "id": 2,
      "title": "Problem 2: Kangaroo Jumping Distance (Part-Whole)",
      "problemText": "In three hops, a red kangaroo jumped 9 meters, 8 meters, and 10 meters. What was the total distance jumped?",
      "correctAnswer": 27,
      "answer": "27 meters",
      "hintText": "Hop 1 (9m) + Hop 2 (8m) + Hop 3 (10m) = 27 meters total.",
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "value": 9,
            "label": "Hop 1: 9m",
            "color": "#6366f1"
          },
          {
            "value": 8,
            "label": "Hop 2: 8m",
            "color": "#3b82f6"
          },
          {
            "value": 10,
            "label": "Hop 3: 10m",
            "color": "#14b8a6"
          }
        ],
        "totalLabel": "27 meters total"
      }
    },
    {
      "id": 3,
      "title": "Problem 3: Diving Depth Comparison (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "An emperor penguin can dive to a depth of 65 meters, while a sea otter dives to 25 meters. How many meters deeper can the emperor penguin dive than the sea otter?",
      "question": "An emperor penguin can dive to a depth of 65 meters, while a sea otter dives to 25 meters. How many meters deeper can the emperor penguin dive than the sea otter?",
      "correctAnswer": 40,
      "target_answer": 40,
      "unit": "meters",
      "hintText": "Subtract sea otter depth (25) from emperor penguin depth (65).",
      "steps": [
        "Penguin diving depth: 65 m.",
        "Sea otter diving depth: 25 m.",
        "Difference: 65 - 25 = 40 meters deeper."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Penguin: 65m",
            "value": 65,
            "color": "#0284c7"
          },
          {
            "label": "Otter: 25m",
            "value": 25,
            "color": "#f59e0b"
          }
        ],
        "differenceLabel": "40 meters deeper"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Migrating Flight Leg (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "An Arctic tern flew 45 kilometers in the morning and 55 kilometers in the afternoon. The total leg of its daily journey is 130 kilometers. How many kilometers must it still fly to finish the day's flight?",
      "question": "An Arctic tern flew 45 kilometers in the morning and 55 kilometers in the afternoon. The total leg of its daily journey is 130 kilometers. How many kilometers must it still fly to finish the day's flight?",
      "correctAnswer": 30,
      "target_answer": 30,
      "unit": "km",
      "hintText": "Add morning (45) and afternoon (55) distance first. Then subtract from the 130 km target.",
      "steps": [
        "Distance flown: 45 + 55 = 100 km.",
        "Remaining distance: 130 - 100 = 30 km."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Morning: 45km",
            "value": 45,
            "color": "#6366f1"
          },
          {
            "label": "Afternoon: 55km",
            "value": 55,
            "color": "#14b8a6"
          },
          {
            "label": "Remaining: 30km",
            "value": 30,
            "color": "#cbd5e1"
          }
        ],
        "totalLabel": "Target: 130 km"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Dolphin Pod Census (Part-Whole)",
      "difficulty": "easy",
      "type": "part_whole",
      "problemText": "Marine biologists spotted a coastal pod with 14 adult dolphins and 8 calves swimming together. How many dolphins were in the pod altogether?",
      "question": "Marine biologists spotted a coastal pod with 14 adult dolphins and 8 calves swimming together. How many dolphins were in the pod altogether?",
      "correctAnswer": 22,
      "target_answer": 22,
      "unit": "dolphins",
      "hintText": "Add adult dolphins (14) and young calves (8) together.",
      "steps": [
        "Adult dolphins: 14.",
        "Calves: 8.",
        "Total pod count: 14 + 8 = 22 dolphins."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Adults: 14",
            "value": 14,
            "color": "#3b82f6"
          },
          {
            "label": "Calves: 8",
            "value": 8,
            "color": "#93c5fd"
          }
        ],
        "totalLabel": "Pod: 22 dolphins"
      }
    }
  ],
  "science_lab": {
    "title_en": "Animal Abilities (Modals) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Anatomical Adaptation Matching",
        "instruction": "Pair body structures (fins, wings, hollow bones) with animal locomotion abilities."
      },
      {
        "stage": 2,
        "title": "Predator vs Prey Speed Comparison",
        "instruction": "Analyze velocity bar charts to predict hunting success rates in savanna biomes."
      },
      {
        "stage": 3,
        "title": "Animal Ability Classification Lab",
        "instruction": "Sort animals into categorical matrices based on modal abilities (Can Fly vs Cannot Fly)."
      }
    ]
  }
};
export default skillPracticeHubData;
