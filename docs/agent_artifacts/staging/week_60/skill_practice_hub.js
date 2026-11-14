/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 60 | Theme: "ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const skillPracticeHubData = {
  "week": 60,
  "theme": "ELA: The Mayor's Request (Formal Writing) / Math: Order of Operations",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "Which phrase is the most respectful opening for a formal letter to a city leader?",
      "options": [
        "Dear Mayor Davis,",
        "Hi Mayor Davis!",
        "To Davis,"
      ],
      "answer": "Dear Mayor Davis,",
      "explanation": "'Dear Mayor Davis,' is the standard respectful formal salutation.",
      "promptText": "Which phrase is the most respectful opening for a formal letter to a city leader?",
      "sentence": "Which phrase is the most respectful opening for a formal letter to a city leader?"
    },
    {
      "id": 2,
      "question": "We would like to ___ request funding for new streetlamps.",
      "options": [
        "respectfully",
        "rudely",
        "loudly"
      ],
      "answer": "respectfully",
      "explanation": "'Respectfully' conveys appropriate deference in official correspondence.",
      "promptText": "We would like to ___ request funding for new streetlamps.",
      "sentence": "We would like to ___ request funding for new streetlamps."
    },
    {
      "id": 3,
      "question": "In the expression 15 + 4 * 6, which operation must be calculated first?",
      "options": [
        "4 * 6",
        "15 + 4",
        "Either one"
      ],
      "answer": "4 * 6",
      "explanation": "Multiplication has higher priority than addition in the order of operations.",
      "promptText": "In the expression 15 + 4 * 6, which operation must be calculated first?",
      "sentence": "In the expression 15 + 4 * 6, which operation must be calculated first?"
    },
    {
      "id": 4,
      "question": "The budget was approved; ___, municipal contractors began work immediately.",
      "options": [
        "therefore",
        "because",
        "although"
      ],
      "answer": "therefore",
      "explanation": "Therefore indicates the logical result following the budget approval.",
      "promptText": "The budget was approved; ___, municipal contractors began work immediately.",
      "sentence": "The budget was approved; ___, municipal contractors began work immediately."
    },
    {
      "id": 5,
      "question": "Which formal closing should precede your official signature?",
      "options": [
        "Yours sincerely,",
        "Cheers,",
        "Later, friend,"
      ],
      "answer": "Yours sincerely,",
      "explanation": "'Yours sincerely,' is the standard formal closing when addressing a named recipient.",
      "promptText": "Which formal closing should precede your official signature?",
      "sentence": "Which formal closing should precede your official signature?"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Lighting Post Cost Expression",
      "problemText": "A town council calculates lighting costs using the expression 15 + 4 * 6. Following the correct order of operations, what is the final calculated cost?",
      "correctAnswer": 39,
      "target_answer": 39,
      "unit": "dollars",
      "hintText": "Step 1: Multiplication first: 4 * 6 = 24. Step 2: Addition: 15 + 24 = 39.",
      "steps": [
        "Step 1: 4 * 6 = 24.",
        "Step 2: 15 + 24 = 39."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Base (15)",
            "value": 15,
            "color": "#3B82F6"
          },
          {
            "label": "4 * 6 (24)",
            "value": 24,
            "color": "#10B981"
          }
        ],
        "total": 39,
        "unit": "dollars",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "A town council calculates lighting costs using the expression 15 + 4 * 6. Following the correct order of operations, what is the final calculated cost?",
      "problem_en": "A town council calculates lighting costs using the expression 15 + 4 * 6. Following the correct order of operations, what is the final calculated cost?",
      "answer": 39,
      "step_by_step": "Step 1: Multiplication first: 4 * 6 = 24. Step 2: Addition: 15 + 24 = 39.",
      "question": "A town council calculates lighting costs using the expression 15 + 4 * 6. Following the correct order of operations, what is the final calculated cost?"
    },
    {
      "id": 2,
      "title": "Parentheses in Playground Budget",
      "problemText": "The parks department evaluates the expression (24 - 8) / 2 to determine the number of swing sets. What is the value of this expression?",
      "correctAnswer": 8,
      "target_answer": 8,
      "unit": "swings",
      "hintText": "Step 1: Parentheses first: 24 - 8 = 16. Step 2: Division: 16 / 2 = 8.",
      "steps": [
        "Step 1: (24 - 8) = 16.",
        "Step 2: 16 / 2 = 8."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 4,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 4,
            "color": "#10B981"
          }
        ],
        "total": 8,
        "unit": "swings",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "The parks department evaluates the expression (24 - 8) / 2 to determine the number of swing sets. What is the value of this expression?",
      "problem_en": "The parks department evaluates the expression (24 - 8) / 2 to determine the number of swing sets. What is the value of this expression?",
      "answer": 8,
      "step_by_step": "Step 1: Parentheses first: 24 - 8 = 16. Step 2: Division: 16 / 2 = 8.",
      "question": "The parks department evaluates the expression (24 - 8) / 2 to determine the number of swing sets. What is the value of this expression?"
    },
    {
      "id": 3,
      "title": "Community Park Bench Installation",
      "problemText": "A park planner calculates bench funding with the expression 50 - 5 * 7. Following the order of operations, what is the evaluated result?",
      "correctAnswer": 15,
      "target_answer": 15,
      "unit": "benches",
      "hintText": "Step 1: Multiply: 5 * 7 = 35. Step 2: Subtract: 50 - 35 = 15.",
      "steps": [
        "Step 1: 5 * 7 = 35.",
        "Step 2: 50 - 35 = 15."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Total (50)",
            "value": 50,
            "color": "#8B5CF6"
          },
          {
            "label": "5 * 7 (35)",
            "value": 35,
            "color": "#EF4444"
          }
        ],
        "total": 15,
        "unit": "benches",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "A park planner calculates bench funding with the expression 50 - 5 * 7. Following the order of operations, what is the evaluated result?",
      "problem_en": "A park planner calculates bench funding with the expression 50 - 5 * 7. Following the order of operations, what is the evaluated result?",
      "answer": 15,
      "step_by_step": "Step 1: Multiply: 5 * 7 = 35. Step 2: Subtract: 50 - 35 = 15.",
      "question": "A park planner calculates bench funding with the expression 50 - 5 * 7. Following the order of operations, what is the evaluated result?"
    },
    {
      "id": 4,
      "title": "Trees for School Border",
      "problemText": "Evaluate the expression 3 * (12 + 6) to find the total number of cedar seedlings ordered by the civic club.",
      "correctAnswer": 54,
      "target_answer": 54,
      "unit": "seedlings",
      "hintText": "Step 1: Parentheses first: 12 + 6 = 18. Step 2: Multiply: 3 * 18 = 54.",
      "steps": [
        "Step 1: 12 + 6 = 18.",
        "Step 2: 3 * 18 = 54."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 27,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 27,
            "color": "#10B981"
          }
        ],
        "total": 54,
        "unit": "seedlings",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "Evaluate the expression 3 * (12 + 6) to find the total number of cedar seedlings ordered by the civic club.",
      "problem_en": "Evaluate the expression 3 * (12 + 6) to find the total number of cedar seedlings ordered by the civic club.",
      "answer": 54,
      "step_by_step": "Step 1: Parentheses first: 12 + 6 = 18. Step 2: Multiply: 3 * 18 = 54.",
      "question": "Evaluate the expression 3 * (12 + 6) to find the total number of cedar seedlings ordered by the civic club."
    },
    {
      "id": 5,
      "title": "Safety Vest Packaging",
      "problemText": "The municipal safety depot calculates high-visibility vests with the expression 18 + 36 / 4. What is the value of this expression?",
      "correctAnswer": 27,
      "target_answer": 27,
      "unit": "vests",
      "hintText": "Step 1: Division first: 36 / 4 = 9. Step 2: Addition: 18 + 9 = 27.",
      "steps": [
        "Step 1: 36 / 4 = 9.",
        "Step 2: 18 + 9 = 27."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Base (18)",
            "value": 18,
            "color": "#EC4899"
          },
          {
            "label": "36 / 4 (9)",
            "value": 9,
            "color": "#14B8A6"
          }
        ],
        "total": 27,
        "unit": "vests",
        "comparisonType": "order_of_operations"
      },
      "problem_text": "The municipal safety depot calculates high-visibility vests with the expression 18 + 36 / 4. What is the value of this expression?",
      "problem_en": "The municipal safety depot calculates high-visibility vests with the expression 18 + 36 / 4. What is the value of this expression?",
      "answer": 27,
      "step_by_step": "Step 1: Division first: 36 / 4 = 9. Step 2: Addition: 18 + 9 = 27.",
      "question": "The municipal safety depot calculates high-visibility vests with the expression 18 + 36 / 4. What is the value of this expression?"
    }
  ],
  "science_lab": {
    "title_en": "The Mayor's Request: Civic Action Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Formal vs Informal Register Sorting",
        "diagram_type": "register_matrix",
        "instruction": "Sort each phrase into whether it belongs in a Formal Civic Letter or an Informal Note.",
        "items": [
          {
            "label": "We would like to respectfully request",
            "target": "formal_register",
            "name": "We would like to respectfully request",
            "text": "We would like to respectfully request",
            "type": "formal_register",
            "description": ""
          },
          {
            "label": "Hey buddy what's up with the park",
            "target": "informal_register",
            "name": "Hey buddy what's up with the park",
            "text": "Hey buddy what's up with the park",
            "type": "informal_register",
            "description": ""
          },
          {
            "label": "Yours sincerely and respectfully",
            "target": "formal_register",
            "name": "Yours sincerely and respectfully",
            "text": "Yours sincerely and respectfully",
            "type": "formal_register",
            "description": ""
          },
          {
            "label": "Catch you later this afternoon",
            "target": "informal_register",
            "name": "Catch you later this afternoon",
            "text": "Catch you later this afternoon",
            "type": "informal_register",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Order of Operations Sequence",
        "diagram_type": "pemdas_ladder",
        "instruction": "Match each operation type to its evaluation priority order (Priority 1: Parentheses, Priority 2: Multiply/Divide, Priority 3: Add/Subtract).",
        "items": [
          {
            "label": "Expressions inside parentheses ( )",
            "target": "priority_1",
            "name": "Expressions inside parentheses ( )",
            "text": "Expressions inside parentheses ( )",
            "type": "priority_1",
            "description": ""
          },
          {
            "label": "Multiplication and division operations",
            "target": "priority_2",
            "name": "Multiplication and division operations",
            "text": "Multiplication and division operations",
            "type": "priority_2",
            "description": ""
          },
          {
            "label": "Addition and subtraction operations",
            "target": "priority_3",
            "name": "Addition and subtraction operations",
            "text": "Addition and subtraction operations",
            "type": "priority_3",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Expression Evaluation Match",
        "diagram_type": "expression_target",
        "instruction": "Match each math expression to its correct evaluated integer answer.",
        "items": [
          {
            "label": "15 + 4 * 6",
            "target": "result_39",
            "name": "15 + 4 * 6",
            "text": "15 + 4 * 6",
            "type": "result_39",
            "description": ""
          },
          {
            "label": "(24 - 8) / 2",
            "target": "result_8",
            "name": "(24 - 8) / 2",
            "text": "(24 - 8) / 2",
            "type": "result_8",
            "description": ""
          },
          {
            "label": "50 - 5 * 7",
            "target": "result_15",
            "name": "50 - 5 * 7",
            "text": "50 - 5 * 7",
            "type": "result_15",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
