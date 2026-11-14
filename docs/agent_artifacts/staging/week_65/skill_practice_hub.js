/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 65 | Theme: "Cycle 2.1 Review: Logic and Data Mastery" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 65,
  "theme": "Cycle 2.1 Review: Logic and Data Mastery",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "In the expression (36 + 24) / 5, which operation is calculated first?",
      "options": [
        "36 + 24",
        "24 / 5",
        "Either one"
      ],
      "answer": "36 + 24",
      "explanation": "Operations inside parentheses must always be computed first.",
      "promptText": "In the expression (36 + 24) / 5, which operation is calculated first?",
      "sentence": "In the expression (36 + 24) / 5, which operation is calculated first?"
    },
    {
      "id": 2,
      "question": "The students prepared thoroughly; ___, they passed the rotary assessment easily.",
      "options": [
        "therefore",
        "because",
        "although"
      ],
      "answer": "therefore",
      "explanation": "Therefore indicates the logical result of thorough preparation.",
      "promptText": "The students prepared thoroughly; ___, they passed the rotary assessment easily.",
      "sentence": "The students prepared thoroughly; ___, they passed the rotary assessment easily."
    },
    {
      "id": 3,
      "question": "What is the value of 4 * 15 - 18?",
      "options": [
        "42",
        "32",
        "52"
      ],
      "answer": "42",
      "explanation": "4 * 15 = 60, and 60 - 18 = 42.",
      "promptText": "What is the value of 4 * 15 - 18?",
      "sentence": "What is the value of 4 * 15 - 18?"
    },
    {
      "id": 4,
      "question": "Which phrase is the standard formal closing in respectful correspondence?",
      "options": [
        "Yours sincerely,",
        "See ya,",
        "Best buddies,"
      ],
      "answer": "Yours sincerely,",
      "explanation": "'Yours sincerely,' is the polite and dignified formal letter closing.",
      "promptText": "Which phrase is the standard formal closing in respectful correspondence?",
      "sentence": "Which phrase is the standard formal closing in respectful correspondence?"
    },
    {
      "id": 5,
      "question": "Review and consolidation help students achieve complete ___ of core skills.",
      "options": [
        "mastery",
        "confusion",
        "forgetting"
      ],
      "answer": "mastery",
      "explanation": "Review strengthens understanding into durable mastery.",
      "promptText": "Review and consolidation help students achieve complete ___ of core skills.",
      "sentence": "Review and consolidation help students achieve complete ___ of core skills."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Parentheses and Division Puzzle",
      "problemText": "Evaluate the mathematical expression (36 + 24) / 5 following the correct order of operations.",
      "correctAnswer": 12,
      "target_answer": 12,
      "unit": "units",
      "hintText": "Step 1: Parentheses first: 36 + 24 = 60. Step 2: Divide: 60 / 5 = 12.",
      "steps": [
        "Step 1: 36 + 24 = 60.",
        "Step 2: 60 / 5 = 12."
      ],
      "modelData": {
        "bars": [
          {
            "label": "(36 + 24) = 60",
            "value": 60,
            "color": "#3B82F6"
          }
        ],
        "total": 12,
        "unit": "units",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "Evaluate the mathematical expression (36 + 24) / 5 following the correct order of operations.",
      "problem_en": "Evaluate the mathematical expression (36 + 24) / 5 following the correct order of operations.",
      "answer": 12,
      "step_by_step": "Step 1: Parentheses first: 36 + 24 = 60. Step 2: Divide: 60 / 5 = 12."
    },
    {
      "id": 2,
      "title": "Multiplication Before Subtraction",
      "problemText": "Calculate the value of the expression 4 * 15 - 18 using mathematical priority rules.",
      "correctAnswer": 42,
      "target_answer": 42,
      "unit": "units",
      "hintText": "Step 1: Multiply first: 4 * 15 = 60. Step 2: Subtract: 60 - 18 = 42.",
      "steps": [
        "Step 1: 4 * 15 = 60.",
        "Step 2: 60 - 18 = 42."
      ],
      "modelData": {
        "bars": [
          {
            "label": "4 * 15 (60)",
            "value": 60,
            "color": "#10B981"
          },
          {
            "label": "Subtract (18)",
            "value": 18,
            "color": "#EF4444"
          }
        ],
        "total": 42,
        "unit": "units",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "Calculate the value of the expression 4 * 15 - 18 using mathematical priority rules.",
      "problem_en": "Calculate the value of the expression 4 * 15 - 18 using mathematical priority rules.",
      "answer": 42,
      "step_by_step": "Step 1: Multiply first: 4 * 15 = 60. Step 2: Subtract: 60 - 18 = 42."
    },
    {
      "id": 3,
      "title": "Subtracting Product from Total",
      "problemText": "Evaluate the arithmetic expression 75 - 8 * 6 following the proper order of operations.",
      "correctAnswer": 27,
      "target_answer": 27,
      "unit": "units",
      "hintText": "Step 1: Multiply: 8 * 6 = 48. Step 2: Subtract: 75 - 48 = 27.",
      "steps": [
        "Step 1: 8 * 6 = 48.",
        "Step 2: 75 - 48 = 27."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Total (75)",
            "value": 75,
            "color": "#F59E0B"
          },
          {
            "label": "8 * 6 (48)",
            "value": 48,
            "color": "#8B5CF6"
          }
        ],
        "total": 27,
        "unit": "units",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "Evaluate the arithmetic expression 75 - 8 * 6 following the proper order of operations.",
      "problem_en": "Evaluate the arithmetic expression 75 - 8 * 6 following the proper order of operations.",
      "answer": 27,
      "step_by_step": "Step 1: Multiply: 8 * 6 = 48. Step 2: Subtract: 75 - 48 = 27."
    },
    {
      "id": 4,
      "title": "Multiplying Parentheses Sum",
      "problemText": "What is the value of the mathematical expression 3 * (14 + 16)?",
      "correctAnswer": 90,
      "target_answer": 90,
      "unit": "units",
      "hintText": "Step 1: Parentheses first: 14 + 16 = 30. Step 2: Multiply: 3 * 30 = 90.",
      "steps": [
        "Step 1: 14 + 16 = 30.",
        "Step 2: 3 * 30 = 90."
      ],
      "modelData": {
        "bars": [
          {
            "label": "3 * 30",
            "value": 90,
            "color": "#06B6D4"
          }
        ],
        "total": 90,
        "unit": "units",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "What is the value of the mathematical expression 3 * (14 + 16)?",
      "problem_en": "What is the value of the mathematical expression 3 * (14 + 16)?",
      "answer": 90,
      "step_by_step": "Step 1: Parentheses first: 14 + 16 = 30. Step 2: Multiply: 3 * 30 = 90."
    },
    {
      "id": 5,
      "title": "Division and Addition Chain",
      "problemText": "Evaluate the expression 96 / 8 + 25 following standard mathematical priority.",
      "correctAnswer": 37,
      "target_answer": 37,
      "unit": "units",
      "hintText": "Step 1: Division first: 96 / 8 = 12. Step 2: Add: 12 + 25 = 37.",
      "steps": [
        "Step 1: 96 / 8 = 12.",
        "Step 2: 12 + 25 = 37."
      ],
      "modelData": {
        "bars": [
          {
            "label": "96 / 8 (12)",
            "value": 12,
            "color": "#EC4899"
          },
          {
            "label": "Add (25)",
            "value": 25,
            "color": "#14B8A6"
          }
        ],
        "total": 37,
        "unit": "units",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "Evaluate the expression 96 / 8 + 25 following standard mathematical priority.",
      "problem_en": "Evaluate the expression 96 / 8 + 25 following standard mathematical priority.",
      "answer": 37,
      "step_by_step": "Step 1: Division first: 96 / 8 = 12. Step 2: Add: 12 + 25 = 37."
    }
  ],
  "science_lab": {
    "title_en": "Cycle 2.1 Review: Logic and Data Mastery Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Rotary Cycle Skill Matching",
        "diagram_type": "skill_synthesizer",
        "instruction": "Match each studied concept to its primary domain (Language Conventions or Math Operations).",
        "items": [
          {
            "label": "Formal closing Yours sincerely",
            "target": "language_domain",
            "name": "Formal closing Yours sincerely",
            "text": "Formal closing Yours sincerely",
            "type": "language_domain",
            "description": ""
          },
          {
            "label": "Evaluating parentheses in PEMDAS",
            "target": "math_domain",
            "name": "Evaluating parentheses in PEMDAS",
            "text": "Evaluating parentheses in PEMDAS",
            "type": "math_domain",
            "description": ""
          },
          {
            "label": "Cause and effect with therefore",
            "target": "language_domain",
            "name": "Cause and effect with therefore",
            "text": "Cause and effect with therefore",
            "type": "language_domain",
            "description": ""
          },
          {
            "label": "Finding perimeter 2 * (L + W)",
            "target": "math_domain",
            "name": "Finding perimeter 2 * (L + W)",
            "text": "Finding perimeter 2 * (L + W)",
            "type": "math_domain",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Order of Operations Priority Ladder",
        "diagram_type": "priority_ladder",
        "instruction": "Sort the operations by their evaluation priority in arithmetic expressions.",
        "items": [
          {
            "label": "Expressions inside parentheses ( )",
            "target": "priority_first",
            "name": "Expressions inside parentheses ( )",
            "text": "Expressions inside parentheses ( )",
            "type": "priority_first",
            "description": ""
          },
          {
            "label": "Multiplication and division operations",
            "target": "priority_second",
            "name": "Multiplication and division operations",
            "text": "Multiplication and division operations",
            "type": "priority_second",
            "description": ""
          },
          {
            "label": "Addition and subtraction operations",
            "target": "priority_third",
            "name": "Addition and subtraction operations",
            "text": "Addition and subtraction operations",
            "type": "priority_third",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Evaluated Value Matching",
        "diagram_type": "value_matcher",
        "instruction": "Match each math expression to its correct evaluated integer answer (12, 42, or 27).",
        "items": [
          {
            "label": "(36 + 24) / 5",
            "target": "ans_12",
            "name": "(36 + 24) / 5",
            "text": "(36 + 24) / 5",
            "type": "ans_12",
            "description": ""
          },
          {
            "label": "4 * 15 - 18",
            "target": "ans_42",
            "name": "4 * 15 - 18",
            "text": "4 * 15 - 18",
            "type": "ans_42",
            "description": ""
          },
          {
            "label": "75 - 8 * 6",
            "target": "ans_27",
            "name": "75 - 8 * 6",
            "text": "75 - 8 * 6",
            "type": "ans_27",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
