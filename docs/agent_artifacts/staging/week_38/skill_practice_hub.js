/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 38 | Theme: "Animal Abilities (Modals)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T07:16:42.028Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
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
