/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 40 | Theme: "Beast Battle (Comparisons)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.161Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 40,
  "theme": "Beast Battle (Comparisons)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "A Siberian tiger is heavier than an African cheetah.",
      "options": [
        "heavier",
        "heavy",
        "heaviest"
      ],
      "answer": "heavier",
      "explanation": "Use comparative adjective 'heavier' with 'than'."
    },
    {
      "sentence": "The cheetah runs faster than any other land animal.",
      "options": [
        "faster",
        "fast",
        "fastest"
      ],
      "answer": "faster",
      "explanation": "Use comparative 'faster' when comparing two entities."
    },
    {
      "sentence": "Grizzly bears have stronger jaws than wolves.",
      "options": [
        "stronger",
        "strong",
        "strongest"
      ],
      "answer": "stronger",
      "explanation": "Use comparative 'stronger' followed by 'than'."
    },
    {
      "sentence": "A leopard climbs trees better than a heavy lion.",
      "options": [
        "better",
        "good",
        "best"
      ],
      "answer": "better",
      "explanation": "'Better' is the comparative form of 'well/good'."
    },
    {
      "sentence": "We can compare the physical size of wild predators.",
      "options": [
        "compare",
        "comparing",
        "compared"
      ],
      "answer": "compare",
      "explanation": "Use bare infinitive 'compare' after modal verb 'can'."
    }
  ],
  "singapore_math": [
    {
      "id": "w40_p1",
      "type": "comparison",
      "title": "Predator Body Weight Comparison",
      "question": "A male Siberian tiger weighs 300 kilograms. A cheetah weighs 60 kilograms. How much heavier is the tiger than the cheetah?",
      "storyContext": "Marcus examines the museum animal scales to compare big cat body weights.",
      "modelData": {
        "bars": [
          {
            "label": "Siberian Tiger",
            "value": 300,
            "color": "#f97316"
          },
          {
            "label": "Cheetah",
            "value": 60,
            "color": "#eab308"
          }
        ],
        "difference": 240,
        "unit": "kg"
      },
      "target_answer": 240,
      "unit": "kg",
      "steps": [
        "Start with the tiger's weight: 300 kg.",
        "Subtract the cheetah's weight: 60 kg.",
        "300 - 60 = 240 kg heavier."
      ]
    },
    {
      "id": "w40_p2",
      "type": "part_whole",
      "title": "Total Food for the Big Cats",
      "question": "The zoo keepers prepared 28 kilograms of meat for the lions and 16 kilograms for the leopards. How much meat did they prepare in total?",
      "storyContext": "Maya tallies the food buckets before the afternoon feeding time.",
      "modelData": {
        "bars": [
          {
            "label": "Lion Meat",
            "value": 28,
            "color": "#ef4444"
          },
          {
            "label": "Leopard Meat",
            "value": 16,
            "color": "#8b5cf6"
          }
        ],
        "total": 44,
        "unit": "kg"
      },
      "target_answer": 44,
      "unit": "kg",
      "steps": [
        "Add the lion food: 28 kg.",
        "Add the leopard food: 16 kg.",
        "28 + 16 = 44 kg in total."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Beast Battle (Comparisons) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Claws and Teeth Matching",
        "diagram_type": "predator_weapon_slots",
        "instruction": "Match each physical tool to its hunting function.",
        "items": [
          {
            "label": "Sharp Curved Claws",
            "target": "tree_climbing"
          },
          {
            "label": "Crushing Powerful Jaws",
            "target": "bone_crushing"
          },
          {
            "label": "Flexible Agile Spine",
            "target": "high_speed_running"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Speed vs Strength Sorting",
        "diagram_type": "speed_strength_matrix",
        "instruction": "Sort the predators by their main hunting advantage.",
        "items": [
          {
            "label": "African Cheetah",
            "target": "speed_specialist"
          },
          {
            "label": "Grizzly Bear",
            "target": "strength_specialist"
          },
          {
            "label": "Spotted Leopard",
            "target": "climbing_specialist"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Apex Predator Rank",
        "diagram_type": "predator_ranking_board",
        "instruction": "Place the three predators in order from heaviest to lightest.",
        "items": [
          {
            "label": "Grizzly Bear (400kg)",
            "target": "rank_1_heaviest"
          },
          {
            "label": "Siberian Tiger (300kg)",
            "target": "rank_2_medium"
          },
          {
            "label": "Cheetah (50kg)",
            "target": "rank_3_lightest"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
