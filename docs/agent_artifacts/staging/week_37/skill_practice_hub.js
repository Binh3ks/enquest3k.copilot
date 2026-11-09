/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 37 | Theme: "Living vs. Non-Living (Reasoning)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:07.328Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 37,
  "theme": "Living vs. Non-Living (Reasoning)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "The caterpillar is living because it breathes air and eats leaves.",
      "options": [
        "breathes",
        "breathing",
        "breathed"
      ],
      "answer": "breathes",
      "explanation": "Use 3rd person singular present tense 'breathes' with singular subject 'it'."
    },
    {
      "sentence": "A gray rock is non-living because it does not need water.",
      "options": [
        "does",
        "do",
        "doing"
      ],
      "answer": "does",
      "explanation": "Use auxiliary 'does' with 3rd person singular 'it' in negative present tense."
    },
    {
      "sentence": "Green plants grow taller when they receive warm sunlight.",
      "options": [
        "grow",
        "grows",
        "growing"
      ],
      "answer": "grow",
      "explanation": "Use base plural form 'grow' with plural subject 'plants'."
    },
    {
      "sentence": "Plastic toys never change or develop over time.",
      "options": [
        "never",
        "always",
        "every"
      ],
      "answer": "never",
      "explanation": "Use frequency adverb 'never' to indicate inanimate objects do not develop."
    },
    {
      "sentence": "Mia and Oliver classify garden items using clear scientific reasons.",
      "options": [
        "classify",
        "classifies",
        "classified"
      ],
      "answer": "classify",
      "explanation": "Use plural present tense verb 'classify' with compound subject 'Mia and Oliver'."
    }
  ],
  "singapore_math": [
    {
      "id": "w37_p1",
      "type": "part_whole",
      "title": "Counting Living and Non-Living Objects",
      "question": "Mia counted 28 living insects and 32 non-living garden stones along the path. How many objects did she count in total?",
      "storyContext": "Mia tallies findings in her nature detective notebook during the science walk.",
      "modelData": {
        "bars": [
          {
            "label": "Living Insects",
            "value": 28,
            "color": "#10b981"
          },
          {
            "label": "Garden Stones",
            "value": 32,
            "color": "#64748b"
          }
        ],
        "total": 60,
        "unit": "objects"
      },
      "target_answer": 60,
      "unit": "objects",
      "steps": [
        "Start with 28 living insects.",
        "Add 32 non-living garden stones.",
        "28 + 32 = 60 total items counted."
      ]
    },
    {
      "id": "w37_p2",
      "type": "comparison",
      "title": "Seedling Growth Comparison",
      "question": "Oliver planted 45 sunflower seedlings in the rich soil. Snails ate 17 seedlings before they grew tall. How many sunflower seedlings survived and continued to grow?",
      "storyContext": "Oliver measures healthy sunflower seedlings thriving in the sunny patch.",
      "modelData": {
        "bars": [
          {
            "label": "Planted Seedlings",
            "value": 45,
            "color": "#f59e0b"
          },
          {
            "label": "Lost to Snails",
            "value": 17,
            "color": "#ef4444"
          }
        ],
        "difference": 28,
        "unit": "seedlings"
      },
      "target_answer": 28,
      "unit": "seedlings",
      "steps": [
        "Take 45 planted sunflower seedlings.",
        "Subtract 17 seedlings eaten by snails.",
        "45 - 17 = 28 seedlings survived."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Living vs. Non-Living (Reasoning) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Sorting Living vs Non-Living",
        "diagram_type": "classification_baskets",
        "instruction": "Drag each garden discovery into the Living or Non-Living container.",
        "items": [
          {
            "label": "Wiggling Earthworm",
            "target": "living"
          },
          {
            "label": "Smooth Gray Pebble",
            "target": "non_living"
          },
          {
            "label": "Blooming Rosebush",
            "target": "living"
          },
          {
            "label": "Cracked Plastic Pot",
            "target": "non_living"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Essential Needs of Living Things",
        "diagram_type": "survival_needs_board",
        "instruction": "Connect each living creature to the primary resource it needs to survive.",
        "items": [
          {
            "label": "Sunflower -> Fresh Water & Sunlight",
            "target": "sun_water"
          },
          {
            "label": "Caterpillar -> Fresh Green Leaves",
            "target": "plant_food"
          },
          {
            "label": "Garden Robin -> Garden Soil Worms",
            "target": "protein_food"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Nature Detective Action Plan",
        "diagram_type": "investigation_steps",
        "instruction": "Arrange the three investigation steps in correct logical order.",
        "items": [
          {
            "label": "Observe Movement and Breathing",
            "target": "step_1"
          },
          {
            "label": "Check if Object Needs Food or Water",
            "target": "step_2"
          },
          {
            "label": "Record Classification with Reasons",
            "target": "step_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
