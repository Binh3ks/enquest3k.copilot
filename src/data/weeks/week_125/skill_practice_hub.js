/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 125 | Theme: "Intro & Conclusion (Academic Essay Structure)" | CEFR: "B1+ Academic"
 * Updated: 2026-11-13T04:18:06.398Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
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
    },
    {
      "id": 3,
      "title": "Problem 3: Academic Journal Database Index (Part-Whole)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A university digital library added 360 peer-reviewed journal papers in humanities and 440 papers in natural sciences this semester. How many total scholarly papers were indexed?",
      "question": "A university digital library added 360 peer-reviewed journal papers in humanities and 440 papers in natural sciences this semester. How many total scholarly papers were indexed?",
      "correctAnswer": 800,
      "target_answer": 800,
      "unit": "papers",
      "hintText": "Add humanities papers (360) and natural science papers (440) together.",
      "steps": [
        "Humanities collection: 360 papers.",
        "Sciences collection: 440 papers.",
        "Total papers indexed: 360 + 440 = 800 papers."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Humanities: 360",
            "value": 360,
            "color": "#4338ca"
          },
          {
            "label": "Sciences: 440",
            "value": 440,
            "color": "#0284c7"
          }
        ],
        "totalLabel": "Total: 800 papers"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Debate Adjudication Score Margin (Comparison)",
      "difficulty": "medium",
      "type": "comparison",
      "problemText": "Team Affirmative scored 285 total rubric points across all speaking criteria, while Team Negative scored 248 points. By how many rubric points did Team Affirmative win the round?",
      "question": "Team Affirmative scored 285 total rubric points across all speaking criteria, while Team Negative scored 248 points. By how many rubric points did Team Affirmative win the round?",
      "correctAnswer": 37,
      "target_answer": 37,
      "unit": "points",
      "hintText": "Subtract Negative points (248) from Affirmative points (285).",
      "steps": [
        "Affirmative score: 285 points.",
        "Negative score: 248 points.",
        "Winning margin: 285 - 248 = 37 points."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Affirmative: 285",
            "value": 285,
            "color": "#16a34a"
          },
          {
            "label": "Negative: 248",
            "value": 248,
            "color": "#dc2626"
          }
        ],
        "differenceLabel": "37 points margin"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Dissertation Chapter Word Allocation (Multi-Step)",
      "difficulty": "hard",
      "type": "part_whole",
      "problemText": "A senior academic thesis has a mandated limit of 1,200 words for its synthesis chapter. The literature review occupies 480 words and the methodology takes 420 words. How many words are allocated to the concluding evaluation?",
      "question": "A senior academic thesis has a mandated limit of 1,200 words for its synthesis chapter. The literature review occupies 480 words and the methodology takes 420 words. How many words are allocated to the concluding evaluation?",
      "correctAnswer": 300,
      "target_answer": 300,
      "unit": "words",
      "hintText": "Add literature review (480) and methodology (420) first. Then subtract from the 1,200-word limit.",
      "steps": [
        "Review and methodology: 480 + 420 = 900 words.",
        "Concluding evaluation: 1200 - 900 = 300 words."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Lit Review: 480w",
            "value": 480,
            "color": "#6366f1"
          },
          {
            "label": "Methodology: 420w",
            "value": 420,
            "color": "#06b6d4"
          },
          {
            "label": "Evaluation: 300w",
            "value": 300,
            "color": "#cbd5e1"
          }
        ],
        "totalLabel": "Limit: 1200 words"
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
