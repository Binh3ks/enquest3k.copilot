/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 44 | Theme: "The Cookie Monster (Subtraction Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 44,
  "theme": "The Cookie Monster (Subtraction Language)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "Ten cookies ___ four cookies leaves six cookies.",
      "options": [
        "minus",
        "plus",
        "times"
      ],
      "answer": "minus",
      "explanation": "Use 'minus' to indicate subtraction in arithmetic sentences."
    },
    {
      "sentence": "Please ___ two cookies from the warm tray.",
      "options": [
        "take away",
        "take over",
        "take up"
      ],
      "answer": "take away",
      "explanation": "Phrasal verb 'take away' means remove from a group."
    },
    {
      "sentence": "If we eat three apples, how many are ___?",
      "options": [
        "left",
        "leave",
        "leaving"
      ],
      "answer": "left",
      "explanation": "'Left' is used to ask about remaining quantity."
    },
    {
      "sentence": "The baker ___ the fresh batch of chocolate cookies.",
      "options": [
        "shares",
        "share",
        "sharing"
      ],
      "answer": "shares",
      "explanation": "Use 3rd person singular present tense 'shares'."
    },
    {
      "sentence": "We ___ fifteen from forty to find the difference.",
      "options": [
        "subtract",
        "subtracts",
        "subtracting"
      ],
      "answer": "subtract",
      "explanation": "Use base verb 'subtract' with plural subject 'we'."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "type": "before_after",
      "title": "Bakery Tray Cookie Subtraction",
      "problemText": "A baker baked 72 cookies on metal trays. Children at the bakery snack bar ate 28 cookies. How many cookies were left on the trays?",
      "question": "A baker baked 72 cookies on metal trays. Children at the bakery snack bar ate 28 cookies. How many cookies were left on the trays?",
      "correctAnswer": 44,
      "target_answer": 44,
      "unit": "cookies",
      "hintText": "Subtract the 28 cookies eaten from the 72 initial cookies.",
      "steps": [
        "Initial baked cookies: 72.",
        "Cookies eaten: 28.",
        "Cookies left: 72 - 28 = 44 cookies."
      ],
      "modelData": {
        "type": "before_after",
        "bars": [
          {
            "label": "Baked Total",
            "value": 72,
            "color": "#d35400"
          },
          {
            "label": "Eaten",
            "value": 28,
            "color": "#c0392b"
          },
          {
            "label": "Remaining",
            "value": 44,
            "color": "#27ae60"
          }
        ],
        "finalValue": 44,
        "label": "Remaining: 44 cookies"
      }
    },
    {
      "id": 2,
      "type": "comparison",
      "title": "Chocolate and Vanilla Cookie Jar Comparison",
      "problemText": "A large jar holds 85 chocolate cookies. A smaller jar holds 50 vanilla cookies. How many more chocolate cookies are there than vanilla cookies?",
      "question": "A large jar holds 85 chocolate cookies. A smaller jar holds 50 vanilla cookies. How many more chocolate cookies are there than vanilla cookies?",
      "correctAnswer": 35,
      "target_answer": 35,
      "unit": "cookies",
      "hintText": "Subtract 50 vanilla cookies from 85 chocolate cookies.",
      "steps": [
        "Chocolate jar: 85 cookies.",
        "Vanilla jar: 50 cookies.",
        "Difference: 85 - 50 = 35 cookies."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Chocolate",
            "value": 85,
            "color": "#795548"
          },
          {
            "label": "Vanilla",
            "value": 50,
            "color": "#f1c40f"
          }
        ],
        "difference": 35,
        "differenceLabel": "Difference: 35 cookies"
      }
    },
    {
      "id": 3,
      "type": "before_after",
      "title": "Morning Bake Sale Cookie Sales",
      "problemText": "The school bake sale started with 96 oatmeal cookies. Morning customers bought and took away 42 cookies. How many oatmeal cookies remained for the afternoon?",
      "question": "The school bake sale started with 96 oatmeal cookies. Morning customers bought and took away 42 cookies. How many oatmeal cookies remained for the afternoon?",
      "correctAnswer": 54,
      "target_answer": 54,
      "unit": "cookies",
      "hintText": "Subtract 42 from 96.",
      "steps": [
        "Initial cookies: 96.",
        "Cookies taken away: 42.",
        "Remaining: 96 - 42 = 54 cookies."
      ],
      "modelData": {
        "type": "before_after",
        "bars": [
          {
            "label": "Initial Batch",
            "value": 96,
            "color": "#e67e22"
          },
          {
            "label": "Sold",
            "value": 42,
            "color": "#e74c3c"
          },
          {
            "label": "Remaining",
            "value": 54,
            "color": "#2ecc71"
          }
        ],
        "finalValue": 54,
        "label": "Remaining: 54 cookies"
      }
    },
    {
      "id": 4,
      "type": "comparison",
      "title": "Large and Small Baking Tray Capacity",
      "problemText": "A large commercial baking tray holds 65 butter cookies. A small home tray holds 25 cookies. What is the difference in cookie capacity between the two trays?",
      "question": "A large commercial baking tray holds 65 butter cookies. A small home tray holds 25 cookies. What is the difference in cookie capacity between the two trays?",
      "correctAnswer": 40,
      "target_answer": 40,
      "unit": "cookies",
      "hintText": "Subtract 25 from 65.",
      "steps": [
        "Large tray capacity: 65.",
        "Small tray capacity: 25.",
        "Difference: 65 - 25 = 40 cookies."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Large Tray",
            "value": 65,
            "color": "#95a5a6"
          },
          {
            "label": "Small Tray",
            "value": 25,
            "color": "#bdc3c7"
          }
        ],
        "difference": 40,
        "differenceLabel": "Difference: 40 cookies"
      }
    },
    {
      "id": 5,
      "type": "before_after",
      "title": "Bakery Cookie Stock Take Away",
      "problemText": "The bakery had 100 ginger cookies in stock. The afternoon catering order took away 65 cookies. How many ginger cookies were left in the bakery?",
      "question": "The bakery had 100 ginger cookies in stock. The afternoon catering order took away 65 cookies. How many ginger cookies were left in the bakery?",
      "correctAnswer": 35,
      "target_answer": 35,
      "unit": "cookies",
      "hintText": "Subtract 65 from 100.",
      "steps": [
        "Initial stock: 100 cookies.",
        "Catering order took away: 65.",
        "Cookies left: 100 - 65 = 35 cookies."
      ],
      "modelData": {
        "type": "before_after",
        "bars": [
          {
            "label": "Total Stock",
            "value": 100,
            "color": "#d35400"
          },
          {
            "label": "Took Away",
            "value": 65,
            "color": "#c0392b"
          },
          {
            "label": "Left",
            "value": 35,
            "color": "#27ae60"
          }
        ],
        "finalValue": 35,
        "label": "Left: 35 cookies"
      }
    }
  ],
  "science_lab": {
    "title_en": "The Cookie Monster (Subtraction Language) Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Subtraction Language Modeling",
        "instruction": "Match each math phrase to its meaning.",
        "items": [
          {
            "label": "Take away 5",
            "target": "Remove 5 items"
          },
          {
            "label": "Minus symbol (-)",
            "target": "Subtraction operation"
          },
          {
            "label": "How many left",
            "target": "Remaining amount"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Tray to Jar Inventory",
        "instruction": "Sort cookies into initial batch, eaten snack, and remaining jar.",
        "items": [
          {
            "label": "Tray of 72 Fresh Cookies",
            "target": "Initial Batch"
          },
          {
            "label": "Plate of 28 Eaten Snacks",
            "target": "Subtracted Portion"
          },
          {
            "label": "Jar of 44 Saved Cookies",
            "target": "Remaining Inventory"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Fair Cookie Sharing Lab",
        "instruction": "Calculate remaining cookies after equal friend shares.",
        "items": [
          {
            "label": "30 Cookies Minus 10",
            "target": "20 Left"
          },
          {
            "label": "50 Cookies Minus 25",
            "target": "25 Left"
          },
          {
            "label": "100 Cookies Minus 65",
            "target": "35 Left"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
