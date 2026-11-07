/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 125 | Theme: "Intro & Conclusion (Academic Essay Structure)" | CEFR: B1+ Academic
 * Generated: 2026-11-07T07:16:42.031Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 125,
  "theme": "Intro & Conclusion (Academic Essay Structure)",
  "cefr_level": "B1+ Academic",
  "grammar_drills": [
    {
      "id": 1,
      "prompt": "Scholars ___ policymakers to prioritize environmental investments immediately.",
      "options": [
        "urge",
        "urging",
        "urged to"
      ],
      "answer": "urge"
    },
    {
      "id": 2,
      "prompt": "We ___ that students review empirical evidence before drafting their thesis.",
      "options": [
        "recommend",
        "recommending",
        "recommends"
      ],
      "answer": "recommend"
    },
    {
      "id": 3,
      "prompt": "Academic essays ___ always maintain a cohesive and rigorous argumentative structure.",
      "options": [
        "should",
        "cannot",
        "dare"
      ],
      "answer": "should"
    },
    {
      "id": 4,
      "prompt": "The concluding chapter ___ a comprehensive synthesis of all survey data.",
      "options": [
        "provides",
        "providing",
        "to provide"
      ],
      "answer": "provides"
    },
    {
      "id": 5,
      "prompt": "Researchers ___ for ethical governance in emerging artificial intelligence research.",
      "options": [
        "advocate",
        "advocates",
        "advocating"
      ],
      "answer": "advocate"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Problem 1: Academic Word Count Allocation (Fraction / Part-Whole)",
      "problemText": "An academic paper has a target length of 2,400 words. The introduction accounts for 1/8 of the total word count, and the conclusion accounts for 1/8. What is the combined word count of the introduction and conclusion?",
      "correctAnswer": 600,
      "answer": "600 words",
      "hintText": "1/8 of 2,400 = 300 words each. Intro (300) + Conclusion (300) = 600 words total.",
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "value": 300,
            "label": "Intro: 300w (1/8)",
            "color": "#8b5cf6"
          },
          {
            "value": 1800,
            "label": "Body: 1,800w (6/8)",
            "color": "#64748b"
          },
          {
            "value": 300,
            "label": "Conclusion: 300w (1/8)",
            "color": "#ec4899"
          }
        ],
        "totalLabel": "2,400 words total"
      }
    },
    {
      "id": 2,
      "title": "Problem 2: Empirical Citation Comparison (Comparison)",
      "problemText": "Group A cited 48 peer-reviewed research papers in their essay. Group B cited 32 research papers. How many more citations did Group A include than Group B?",
      "correctAnswer": 16,
      "answer": "16 citations",
      "hintText": "Group A citations (48) - Group B citations (32) = 16 more citations.",
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "value": 48,
            "label": "Group A: 48 citations",
            "color": "#3b82f6"
          },
          {
            "value": 32,
            "label": "Group B: 32 citations",
            "color": "#f43f5e"
          }
        ],
        "differenceLabel": "16 citations difference"
      }
    }
  ],
  "science_lab": {
    "title_en": "Intro & Conclusion (Academic Essay Structure) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Rhetorical Hook Formulation Lab",
        "instruction": "Transform bland introductory statements into engaging rhetorical questions."
      },
      {
        "stage": 2,
        "title": "Thesis Statement Precision Calibration",
        "instruction": "Identify and refine weak thesis statements into specific, debatable claims."
      },
      {
        "stage": 3,
        "title": "Concluding Synthesis Architecture",
        "instruction": "Construct a cohesive synthesis integrating disparate empirical claims into unified implications."
      }
    ]
  }
};
export default skillPracticeHubData;
