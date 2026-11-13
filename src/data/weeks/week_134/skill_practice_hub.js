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
      "sentence": "Many middle school players tend to build strong teamwork skills.",
      "options": [
        "tend to",
        "tend on",
        "tending to"
      ],
      "answer": "tend to",
      "explanation": "Use 'tend to' followed by a base verb to express a habitual likelihood or disposition."
    },
    {
      "sentence": "Saying that all gamers are lazy is an invalid generalization.",
      "options": [
        "an invalid",
        "a invalid",
        "invalid an"
      ],
      "answer": "an invalid",
      "explanation": "Use the indefinite article 'an' before the vowel sound in 'invalid'."
    },
    {
      "sentence": "Careful thinkers use words such as some, many, and often.",
      "options": [
        "such as",
        "as such",
        "such like"
      ],
      "answer": "such as",
      "explanation": "Use 'such as' to introduce specific illustrative examples."
    },
    {
      "sentence": "An argument works only when its starting premises are true.",
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
      "id": 1,
      "title": "Classifying Triangle ABC by Sides",
      "difficulty": "easy",
      "type": "geometry_triangles",
      "problemText": "Inspect triangle ΔABC with side lengths 7 cm, 7 cm, and 10 cm shown in the diagram. Classify this triangle by its sides: enter 1 for Equilateral (all 3 sides equal), 2 for Isosceles (at least 2 sides equal), or 3 for Scalene (no equal sides).",
      "question": "Inspect triangle ΔABC with side lengths 7 cm, 7 cm, and 10 cm shown in the diagram. Classify this triangle by its sides: enter 1 for Equilateral (all 3 sides equal), 2 for Isosceles (at least 2 sides equal), or 3 for Scalene (no equal sides).",
      "correctAnswer": 2,
      "unit": "category (1, 2, or 3)",
      "hintText": "Count how many sides share matching tick marks and equal 7 cm lengths.",
      "steps": [
        "Sides AB = 7 cm and AC = 7 cm are equal, while BC = 10 cm differs.",
        "Check triangle inequality: 7 + 7 = 14 > 10 (valid triangle).",
        "A triangle with two equal sides matches code 2."
      ],
      "svg_url": "/images/week134/w134_triangle_p1.svg",
      "modelData": null
    },
    {
      "id": 2,
      "title": "Finding Equal Sides from Perimeter",
      "difficulty": "medium",
      "type": "geometry_triangles",
      "problemText": "Triangle ΔPQR has a total perimeter of 44 cm and a base QR = 12 cm. The remaining two sides PQ and PR have equal length (x cm each, shown by matching tick marks). What is the value of x in cm?",
      "question": "Triangle ΔPQR has a total perimeter of 44 cm and a base QR = 12 cm. The remaining two sides PQ and PR have equal length (x cm each, shown by matching tick marks). What is the value of x in cm?",
      "correctAnswer": 16,
      "unit": "cm",
      "hintText": "Subtract the 12 cm base from the 44 cm perimeter first, then divide the remaining length evenly between the 2 equal sides.",
      "steps": [
        "Subtract the base: 44 - 12 = 32 cm for the two equal sides combined.",
        "Divide by 2: 32 / 2 = 16 cm.",
        "Check triangle inequality: 16 + 16 = 32 > 12 (valid)."
      ],
      "svg_url": "/images/week134/w134_triangle_p2.svg",
      "modelData": null
    },
    {
      "id": 3,
      "title": "Classifying Triangle XYZ by Sides",
      "difficulty": "easy",
      "type": "geometry_triangles",
      "problemText": "Inspect triangle ΔXYZ with side lengths 6 cm, 9 cm, and 12 cm shown in the diagram. Classify this triangle by its sides: enter 1 for Equilateral (all 3 sides equal), 2 for Isosceles (exactly 2 sides equal), or 3 for Scalene (all 3 sides different).",
      "question": "Inspect triangle ΔXYZ with side lengths 6 cm, 9 cm, and 12 cm shown in the diagram. Classify this triangle by its sides: enter 1 for Equilateral (all 3 sides equal), 2 for Isosceles (exactly 2 sides equal), or 3 for Scalene (all 3 sides different).",
      "correctAnswer": 3,
      "unit": "category (1, 2, or 3)",
      "hintText": "Compare all three side lengths and notice the three different tick markings (|, ||, |||).",
      "steps": [
        "The side lengths 6 cm, 9 cm, and 12 cm are all different.",
        "Check triangle inequality: 6 + 9 = 15 > 12 (valid triangle).",
        "Three unequal sides match code 3."
      ],
      "svg_url": "/images/week134/w134_triangle_p3.svg",
      "modelData": null
    },
    {
      "id": 4,
      "title": "Maximum Whole Side by Triangle Inequality",
      "difficulty": "hard",
      "type": "geometry_triangles",
      "problemText": "Two sides of triangle ΔDEF measure 7 cm and 11 cm. By the Triangle Inequality Theorem (the sum of any two sides must be strictly greater than the third side), what is the GREATEST possible whole-number length in cm for side c?",
      "question": "Two sides of triangle ΔDEF measure 7 cm and 11 cm. By the Triangle Inequality Theorem (the sum of any two sides must be strictly greater than the third side), what is the GREATEST possible whole-number length in cm for side c?",
      "correctAnswer": 17,
      "unit": "cm",
      "hintText": "Side c must be strictly less than 7 + 11. Find the largest whole number strictly below that sum.",
      "steps": [
        "Triangle inequality rule requires c < 7 + 11, so c < 18.",
        "Since c must be a whole number strictly less than 18, the greatest value is 17 cm.",
        "Verify: 7 + 11 = 18 > 17."
      ],
      "svg_url": "/images/week134/w134_triangle_p4.svg",
      "modelData": null
    },
    {
      "id": 5,
      "title": "Angle Sum with Equal Sides",
      "difficulty": "hard",
      "type": "geometry_triangles",
      "problemText": "In triangle ΔKLM, sides KL and KM are equal (10 cm each), which forces base angles ∠L and ∠M to have the same measure (x° each). If top angle ∠K measures 44°, what is the measure of angle x (∠L) in degrees?",
      "question": "In triangle ΔKLM, sides KL and KM are equal (10 cm each), which forces base angles ∠L and ∠M to have the same measure (x° each). If top angle ∠K measures 44°, what is the measure of angle x (∠L) in degrees?",
      "correctAnswer": 68,
      "unit": "degrees",
      "hintText": "Interior angles of every triangle sum to 180°. Subtract 44° from 180°, then divide equally between ∠L and ∠M.",
      "steps": [
        "Sum of all three angles in a triangle = 180°.",
        "Remaining degrees for ∠L + ∠M = 180 - 44 = 136°.",
        "Since ∠L = ∠M, x = 136 / 2 = 68°."
      ],
      "svg_url": "/images/week134/w134_triangle_p5.svg",
      "modelData": null
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
            "label": "Fair Checked Statement",
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
