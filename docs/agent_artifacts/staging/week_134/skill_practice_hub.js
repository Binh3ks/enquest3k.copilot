/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 134 | Theme: "Identifying Fallacies" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.875Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 134,
  "theme": "Identifying Fallacies",
  "cefr_level": "B1+ Academic",
  "grammar_drills": [
    {
      "sentence": "Many adolescent players tend to develop strong teamwork skills.",
      "options": [
        "tend to",
        "tend on",
        "tending to"
      ],
      "answer": "tend to",
      "explanation": "Use 'tend to' followed by a base verb to express a habitual likelihood or disposition."
    },
    {
      "sentence": "Claiming that all gamers are unmotivated is an invalid generalization.",
      "options": [
        "an invalid",
        "a invalid",
        "invalid an"
      ],
      "answer": "an invalid",
      "explanation": "Use the indefinite article 'an' before the vowel sound in 'invalid'."
    },
    {
      "sentence": "Critical thinkers use qualifiers such as some, many, and often.",
      "options": [
        "such as",
        "as such",
        "such like"
      ],
      "answer": "such as",
      "explanation": "Use 'such as' to introduce specific illustrative examples."
    },
    {
      "sentence": "An argument is sound only when its foundational premises are true.",
      "options": [
        "premises are true",
        "premises is true",
        "premise are true"
      ],
      "answer": "premises are true",
      "explanation": "The plural subject 'premises' requires the plural verb 'are'."
    },
    {
      "sentence": "Drawing a hasty conclusion from a single example creates misleading stereotypes.",
      "options": [
        "creates",
        "create",
        "creating"
      ],
      "answer": "creates",
      "explanation": "The singular gerund phrase 'Drawing a hasty conclusion...' takes the singular verb 'creates'."
    }
  ],
  "singapore_math": [
    {
      "id": "w134_p1",
      "type": "part_whole",
      "title": "Problem 1: Perimeter of an Equilateral Triangle",
      "question": "A geometric model of an equilateral triangle has 3 equal sides measuring 15 cm each. What is the total perimeter of the triangle in centimeters?",
      "storyContext": "Students construct triangle models in the math lab.",
      "modelData": {
        "bars": [
          {
            "label": "Side 1",
            "value": 15,
            "color": "#0ea5e9"
          },
          {
            "label": "Side 2",
            "value": 15,
            "color": "#10b981"
          },
          {
            "label": "Side 3",
            "value": 15,
            "color": "#8b5cf6"
          }
        ],
        "total": 45,
        "unit": "cm"
      },
      "target_answer": 45,
      "unit": "cm",
      "steps": [
        "Side 1: 15 cm.",
        "Side 2: 15 cm.",
        "Side 3: 15 cm.",
        "15 + 15 + 15 = 45 cm."
      ]
    },
    {
      "id": "w134_p2",
      "type": "comparison",
      "title": "Problem 2: Comparing Sides in an Isosceles Triangle",
      "question": "An isosceles triangle has a base of 20 cm and two equal sides of 14 cm each. How many centimeters longer is the base than one of the equal sides?",
      "storyContext": "Learners classify triangles by side length differences.",
      "modelData": {
        "bars": [
          {
            "label": "Base",
            "value": 20,
            "color": "#f59e0b"
          },
          {
            "label": "Equal Side",
            "value": 14,
            "color": "#6366f1"
          }
        ],
        "difference": 6,
        "unit": "cm"
      },
      "target_answer": 6,
      "unit": "cm",
      "steps": [
        "Base: 20 cm.",
        "Equal side: 14 cm.",
        "20 - 14 = 6 cm."
      ]
    },
    {
      "id": "w134_p3",
      "type": "part_whole",
      "title": "Problem 3: Perimeter of a Scalene Triangle",
      "question": "A scalene triangle has 3 sides of different lengths: 10 cm, 12 cm, and 18 cm. What is the perimeter of this scalene triangle in centimeters?",
      "storyContext": "Math students measure scalene geometric perimeter.",
      "modelData": {
        "bars": [
          {
            "label": "Side A",
            "value": 10,
            "color": "#14b8a6"
          },
          {
            "label": "Side B",
            "value": 12,
            "color": "#ec4899"
          },
          {
            "label": "Side C",
            "value": 18,
            "color": "#0284c7"
          }
        ],
        "total": 40,
        "unit": "cm"
      },
      "target_answer": 40,
      "unit": "cm",
      "steps": [
        "Side A: 10 cm.",
        "Side B: 12 cm.",
        "Side C: 18 cm.",
        "10 + 12 + 18 = 40 cm."
      ]
    },
    {
      "id": "w134_p4",
      "type": "comparison",
      "title": "Problem 4: Side Difference in Triangular Banner",
      "question": "A debate tournament banner is cut in a triangle shape. The longest side measures 25 cm and the shortest side measures 15 cm. What is the difference between these two sides?",
      "storyContext": "Students measure decorative debate banners.",
      "modelData": {
        "bars": [
          {
            "label": "Longest Side",
            "value": 25,
            "color": "#f43f5e"
          },
          {
            "label": "Shortest Side",
            "value": 15,
            "color": "#94a3b8"
          }
        ],
        "difference": 10,
        "unit": "cm"
      },
      "target_answer": 10,
      "unit": "cm",
      "steps": [
        "Longest side: 25 cm.",
        "Shortest side: 15 cm.",
        "25 - 15 = 10 cm."
      ]
    },
    {
      "id": "w134_p5",
      "type": "part_whole",
      "title": "Problem 5: Total Perimeter of Triangular Garden Plot",
      "question": "A triangular school garden plot has sides measuring 30 meters, 40 meters, and 50 meters. What is the total length of fencing needed to enclose the triangle?",
      "storyContext": "Geometry applied to real-world boundary perimeters.",
      "modelData": {
        "bars": [
          {
            "label": "Side 1",
            "value": 30,
            "color": "#22c55e"
          },
          {
            "label": "Side 2",
            "value": 40,
            "color": "#3b82f6"
          },
          {
            "label": "Side 3",
            "value": 50,
            "color": "#a855f7"
          }
        ],
        "total": 120,
        "unit": "meters"
      },
      "target_answer": 120,
      "unit": "meters",
      "steps": [
        "Side 1: 30 m.",
        "Side 2: 40 m.",
        "Side 3: 50 m.",
        "30 + 40 + 50 = 120 meters."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Identifying Fallacies Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Hasty Generalization Filter",
        "diagram_type": "generalization_filter",
        "instruction": "Catch an unproven universal claim and add a fair qualifier.",
        "items": [
          {
            "label": "Absolute Word ('Always/All')",
            "target": "error_tag"
          },
          {
            "label": "Qualifier Filter ('Often/Many')",
            "target": "corrective_lens"
          },
          {
            "label": "Fair Balanced Statement",
            "target": "sound_claim"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Ad Hominem Discard Bin",
        "diagram_type": "ad_hominem_filter",
        "instruction": "Filter out personal attacks and retain only policy arguments.",
        "items": [
          {
            "label": "Personal Comment Card",
            "target": "discard_bin"
          },
          {
            "label": "Policy Evidence Card",
            "target": "analysis_table"
          },
          {
            "label": "Objective Summary Statement",
            "target": "debate_ledger"
          }
        ]
      },
      {
        "stage": 3,
        "title": "False Dilemma Spectrum",
        "diagram_type": "false_dilemma_spectrum",
        "instruction": "Reject extreme black-and-white choices by finding balanced middle ground.",
        "items": [
          {
            "label": "Extreme Option A",
            "target": "left_pole"
          },
          {
            "label": "Extreme Option B",
            "target": "right_pole"
          },
          {
            "label": "Balanced Realistic Solution C",
            "target": "center_fulcrum"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
