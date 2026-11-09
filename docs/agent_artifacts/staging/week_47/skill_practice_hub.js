/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 47 | Theme: "Big Numbers (Place Value)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:30.707Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 47,
  "theme": "Big Numbers (Place Value)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "How many saplings did the village volunteers plant today?",
      "options": [
        "How many",
        "How much",
        "How long"
      ],
      "answer": "How many",
      "explanation": "Use 'How many' with plural countable nouns like 'saplings'."
    },
    {
      "sentence": "There are twenty-five young trees growing in the orchard.",
      "options": [
        "twenty-five",
        "twenty five",
        "twenties-five"
      ],
      "answer": "twenty-five",
      "explanation": "Compound numbers from 21 to 99 are written with a hyphen."
    },
    {
      "sentence": "Forty plus fifty is equal to ninety trees in total.",
      "options": [
        "equal",
        "equals",
        "equaling"
      ],
      "answer": "equal",
      "explanation": "Use adjective 'equal' in the phrase 'is equal to'."
    },
    {
      "sentence": "Sophie neatly groups the green saplings into bundles of ten.",
      "options": [
        "groups",
        "group",
        "grouping"
      ],
      "answer": "groups",
      "explanation": "Use 3rd person singular present tense 'groups' with singular subject 'Sophie'."
    },
    {
      "sentence": "Lucas counted eighty shining stars in the clear night sky.",
      "options": [
        "counted",
        "counts",
        "counting"
      ],
      "answer": "counted",
      "explanation": "Use past tense 'counted' to narrate completed observation."
    }
  ],
  "singapore_math": [
    {
      "id": "w47_p1",
      "type": "part_whole",
      "title": "Tree Planting Total by Tens",
      "question": "Volunteers planted 60 pine saplings and 40 birch saplings in the village park. How many saplings did they plant in total?",
      "storyContext": "Sophie enters the group totals into the festival scoreboard ledger.",
      "modelData": {
        "bars": [
          {
            "label": "Pine Saplings (6 tens)",
            "value": 60,
            "color": "#10b981"
          },
          {
            "label": "Birch Saplings (4 tens)",
            "value": 40,
            "color": "#f59e0b"
          }
        ],
        "total": 100,
        "unit": "saplings"
      },
      "target_answer": 100,
      "unit": "saplings",
      "steps": [
        "Take 60 pine saplings (6 tens).",
        "Add 40 birch saplings (4 tens).",
        "60 + 40 = 100 saplings in total."
      ]
    },
    {
      "id": "w47_p2",
      "type": "comparison",
      "title": "Stargazing Count Comparison",
      "question": "Sophie counted 75 stars through her telescope, while Lucas counted 50 stars with his binoculars. How many more stars did Sophie count than Lucas?",
      "storyContext": "Lucas and Sophie compare their stargazing tallies on top of Oak Hill.",
      "modelData": {
        "bars": [
          {
            "label": "Sophie's Stars",
            "value": 75,
            "color": "#6366f1"
          },
          {
            "label": "Lucas's Stars",
            "value": 50,
            "color": "#0ea5e9"
          }
        ],
        "difference": 25,
        "unit": "stars"
      },
      "target_answer": 25,
      "unit": "stars",
      "steps": [
        "Start with Sophie's 75 stars.",
        "Subtract Lucas's 50 stars.",
        "75 - 50 = 25 more stars counted by Sophie."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Big Numbers (Place Value) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Place Value Tens and Ones Sorting",
        "diagram_type": "place_value_blocks",
        "instruction": "Drag each compound number to its matching tens and units configuration.",
        "items": [
          {
            "label": "Forty-Five -> 4 Tens + 5 Units",
            "target": "tens_4_units_5"
          },
          {
            "label": "Seventy-Two -> 7 Tens + 2 Units",
            "target": "tens_7_units_2"
          },
          {
            "label": "Ninety-Six -> 9 Tens + 6 Units",
            "target": "tens_9_units_6"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Tree Orchard Counting Grid",
        "diagram_type": "orchard_group_grid",
        "instruction": "Match each orchard section to its correct bundle calculation.",
        "items": [
          {
            "label": "3 Bundles of Ten -> Thirty Trees",
            "target": "thirty"
          },
          {
            "label": "5 Bundles of Ten -> Fifty Trees",
            "target": "fifty"
          },
          {
            "label": "8 Bundles of Ten -> Eighty Trees",
            "target": "eighty"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Community Counting Verification",
        "diagram_type": "total_verification_steps",
        "instruction": "Order the three steps for verifying a large collection total.",
        "items": [
          {
            "label": "Group Items into Sets of Ten",
            "target": "step_1"
          },
          {
            "label": "Add the Tens Together",
            "target": "step_2"
          },
          {
            "label": "Record Final Total with Hyphenated Word",
            "target": "step_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
