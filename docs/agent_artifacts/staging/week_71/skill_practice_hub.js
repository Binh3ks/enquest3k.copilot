/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 71 | Theme: "Science/ELA: The Solar System / Math: Large Numbers"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const skillPracticeHubData = {
  "week": 71,
  "theme": "Science/ELA: The Solar System / Math: Large Numbers",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "Jupiter is the ___ planet in our solar system.",
      "options": [
        "largest",
        "larger",
        "large"
      ],
      "answer": "largest",
      "explanation": "'Largest' is the superlative form used when comparing all eight planets.",
      "promptText": "Jupiter is the ___ planet in our solar system.",
      "sentence": "Jupiter is the ___ planet in our solar system."
    },
    {
      "id": 2,
      "question": "In the number 5,630, the digit 5 is in the ___ place value.",
      "options": [
        "thousands",
        "hundreds",
        "tens"
      ],
      "answer": "thousands",
      "explanation": "The fourth digit from the right occupies the thousands column.",
      "promptText": "In the number 5,630, the digit 5 is in the ___ place value.",
      "sentence": "In the number 5,630, the digit 5 is in the ___ place value."
    },
    {
      "id": 3,
      "question": "What is 3,450 plus 2,180 kilometers?",
      "options": [
        "5,630",
        "5,530",
        "5,730"
      ],
      "answer": "5,630",
      "explanation": "3,450 + 2,180 = 5,630.",
      "promptText": "What is 3,450 plus 2,180 kilometers?",
      "sentence": "What is 3,450 plus 2,180 kilometers?"
    },
    {
      "id": 4,
      "question": "The Sun's gravity is immense; ___, planets maintain stable elliptical orbits.",
      "options": [
        "therefore",
        "because",
        "although"
      ],
      "answer": "therefore",
      "explanation": "Therefore signals the consequence of the Sun's immense gravity.",
      "promptText": "The Sun's gravity is immense; ___, planets maintain stable elliptical orbits.",
      "sentence": "The Sun's gravity is immense; ___, planets maintain stable elliptical orbits."
    },
    {
      "id": 5,
      "question": "What is 8,500 minus 3,700 kilometers?",
      "options": [
        "4,800",
        "4,200",
        "5,200"
      ],
      "answer": "4,800",
      "explanation": "8,500 - 3,700 = 4,800.",
      "promptText": "What is 8,500 minus 3,700 kilometers?",
      "sentence": "What is 8,500 minus 3,700 kilometers?"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Adding Planetary Crater Distances",
      "problemText": "A space rover travels 3,450 kilometers across a lunar plain and then another 2,180 kilometers to reach an ancient crater. What is the total distance traveled?",
      "correctAnswer": 5630,
      "target_answer": 5630,
      "unit": "kilometers",
      "hintText": "Step 1: Distance 1 = 3,450. Step 2: Distance 2 = 2,180. Step 3: Sum = 3,450 + 2,180 = 5,630 km.",
      "steps": [
        "Step 1: 3450 + 2180 = 5630 km."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Leg 1 (3450)",
            "value": 3450,
            "color": "#3B82F6"
          },
          {
            "label": "Leg 2 (2180)",
            "value": 2180,
            "color": "#10B981"
          }
        ],
        "total": 5630,
        "unit": "kilometers",
        "comparisonType": "part_whole"
      },
      "problem_text": "A space rover travels 3,450 kilometers across a lunar plain and then another 2,180 kilometers to reach an ancient crater. What is the total distance traveled?",
      "problem_en": "A space rover travels 3,450 kilometers across a lunar plain and then another 2,180 kilometers to reach an ancient crater. What is the total distance traveled?",
      "answer": 5630,
      "step_by_step": "Step 1: Distance 1 = 3,450. Step 2: Distance 2 = 2,180. Step 3: Sum = 3,450 + 2,180 = 5,630 km.",
      "question": "A space rover travels 3,450 kilometers across a lunar plain and then another 2,180 kilometers to reach an ancient crater. What is the total distance traveled?"
    },
    {
      "id": 2,
      "title": "Orbital Altitude Difference",
      "problemText": "Satellite Alpha orbits at an altitude of 8,500 kilometers. Satellite Beta orbits at an altitude of 3,700 kilometers. What is the difference in altitude between the two satellites?",
      "correctAnswer": 4800,
      "target_answer": 4800,
      "unit": "kilometers",
      "hintText": "Step 1: Alpha = 8,500. Step 2: Beta = 3,700. Step 3: Difference = 8,500 - 3,700 = 4,800 km.",
      "steps": [
        "Step 1: 8500 - 3700 = 4800 km."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Alpha (8500)",
            "value": 8500,
            "color": "#EF4444"
          },
          {
            "label": "Beta (3700)",
            "value": 3700,
            "color": "#F59E0B"
          }
        ],
        "total": 4800,
        "unit": "kilometers",
        "comparisonType": "difference"
      },
      "problem_text": "Satellite Alpha orbits at an altitude of 8,500 kilometers. Satellite Beta orbits at an altitude of 3,700 kilometers. What is the difference in altitude between the two satellites?",
      "problem_en": "Satellite Alpha orbits at an altitude of 8,500 kilometers. Satellite Beta orbits at an altitude of 3,700 kilometers. What is the difference in altitude between the two satellites?",
      "answer": 4800,
      "step_by_step": "Step 1: Alpha = 8,500. Step 2: Beta = 3,700. Step 3: Difference = 8,500 - 3,700 = 4,800 km.",
      "question": "Satellite Alpha orbits at an altitude of 8,500 kilometers. Satellite Beta orbits at an altitude of 3,700 kilometers. What is the difference in altitude between the two satellites?"
    },
    {
      "id": 3,
      "title": "Four Satellite Solar Panels",
      "problemText": "A space station features 4 large solar wings. If each solar wing contains 2,500 photovoltaic cells, what is the total number of solar cells on the station?",
      "correctAnswer": 10000,
      "target_answer": 10000,
      "unit": "cells",
      "hintText": "Step 1: Wings = 4. Step 2: Cells per wing = 2,500. Step 3: Total = 4 * 2,500 = 10,000 cells.",
      "steps": [
        "Step 1: 4 * 2500 = 10000 cells."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 5000,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 5000,
            "color": "#10B981"
          }
        ],
        "total": 10000,
        "unit": "cells",
        "comparisonType": "equal_groups"
      },
      "problem_text": "A space station features 4 large solar wings. If each solar wing contains 2,500 photovoltaic cells, what is the total number of solar cells on the station?",
      "problem_en": "A space station features 4 large solar wings. If each solar wing contains 2,500 photovoltaic cells, what is the total number of solar cells on the station?",
      "answer": 10000,
      "step_by_step": "Step 1: Wings = 4. Step 2: Cells per wing = 2,500. Step 3: Total = 4 * 2,500 = 10,000 cells.",
      "question": "A space station features 4 large solar wings. If each solar wing contains 2,500 photovoltaic cells, what is the total number of solar cells on the station?"
    },
    {
      "id": 4,
      "title": "Hundreds Place Value in Asteroid Diameter",
      "problemText": "In the asteroid diameter measurement 6,782 kilometers, what is the value represented by the digit 7?",
      "correctAnswer": 700,
      "target_answer": 700,
      "unit": "kilometers",
      "hintText": "Step 1: The digit 7 is in the hundreds place. Step 2: Value = 7 * 100 = 700.",
      "steps": [
        "Step 1: 7 in hundreds place = 700."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 350,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 350,
            "color": "#10B981"
          }
        ],
        "total": 700,
        "unit": "kilometers",
        "comparisonType": "place_value"
      },
      "problem_text": "In the asteroid diameter measurement 6,782 kilometers, what is the value represented by the digit 7?",
      "problem_en": "In the asteroid diameter measurement 6,782 kilometers, what is the value represented by the digit 7?",
      "answer": 700,
      "step_by_step": "Step 1: The digit 7 is in the hundreds place. Step 2: Value = 7 * 100 = 700.",
      "question": "In the asteroid diameter measurement 6,782 kilometers, what is the value represented by the digit 7?"
    },
    {
      "id": 5,
      "title": "Difference in Planetary Distances",
      "problemText": "Astronomers compare two deep-space probe distances: Probe One is at 9,400 thousand kilometers and Probe Two is at 5,600 thousand kilometers. What is the difference?",
      "correctAnswer": 3800,
      "target_answer": 3800,
      "unit": "thousand km",
      "hintText": "Step 1: Probe 1 = 9,400. Step 2: Probe 2 = 5,600. Step 3: Difference = 9,400 - 5,600 = 3,800.",
      "steps": [
        "Step 1: 9400 - 5600 = 3800."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Probe 1 (9400)",
            "value": 9400,
            "color": "#EC4899"
          },
          {
            "label": "Probe 2 (5600)",
            "value": 5600,
            "color": "#14B8A6"
          }
        ],
        "total": 3800,
        "unit": "thousand km",
        "comparisonType": "difference"
      },
      "problem_text": "Astronomers compare two deep-space probe distances: Probe One is at 9,400 thousand kilometers and Probe Two is at 5,600 thousand kilometers. What is the difference?",
      "problem_en": "Astronomers compare two deep-space probe distances: Probe One is at 9,400 thousand kilometers and Probe Two is at 5,600 thousand kilometers. What is the difference?",
      "answer": 3800,
      "step_by_step": "Step 1: Probe 1 = 9,400. Step 2: Probe 2 = 5,600. Step 3: Difference = 9,400 - 5,600 = 3,800.",
      "question": "Astronomers compare two deep-space probe distances: Probe One is at 9,400 thousand kilometers and Probe Two is at 5,600 thousand kilometers. What is the difference?"
    }
  ],
  "science_lab": {
    "title_en": "The Solar System: Planetary Wonders Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Planetary Superlative Matcher",
        "diagram_type": "planet_scale",
        "instruction": "Match each planet to its correct astronomical superlative.",
        "items": [
          {
            "label": "Jupiter: The biggest planet in volume",
            "target": "largest_planet",
            "name": "Jupiter: The biggest planet in volume",
            "text": "Jupiter: The biggest planet in volume",
            "type": "largest_planet",
            "description": ""
          },
          {
            "label": "Mercury: The smallest planet in size",
            "target": "smallest_planet",
            "name": "Mercury: The smallest planet in size",
            "text": "Mercury: The smallest planet in size",
            "type": "smallest_planet",
            "description": ""
          },
          {
            "label": "Venus: The hottest planet in temperature",
            "target": "hottest_planet",
            "name": "Venus: The hottest planet in temperature",
            "text": "Venus: The hottest planet in temperature",
            "type": "hottest_planet",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Four-Digit Place Value Columns",
        "diagram_type": "place_value_chart",
        "instruction": "Sort the digits of the number 5,630 into their correct place value columns.",
        "items": [
          {
            "label": "Digit 5 representing 5,000",
            "target": "thousands_col",
            "name": "Digit 5 representing 5,000",
            "text": "Digit 5 representing 5,000",
            "type": "thousands_col",
            "description": ""
          },
          {
            "label": "Digit 6 representing 600",
            "target": "hundreds_col",
            "name": "Digit 6 representing 600",
            "text": "Digit 6 representing 600",
            "type": "hundreds_col",
            "description": ""
          },
          {
            "label": "Digit 3 representing 30",
            "target": "tens_col",
            "name": "Digit 3 representing 30",
            "text": "Digit 3 representing 30",
            "type": "tens_col",
            "description": ""
          },
          {
            "label": "Digit 0 representing single units",
            "target": "ones_col",
            "name": "Digit 0 representing single units",
            "text": "Digit 0 representing single units",
            "type": "ones_col",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Four-Digit Distance Calculation",
        "diagram_type": "cosmic_calculator",
        "instruction": "Match the four-digit math problem to its calculated answer (5,630 km or 4,800 km).",
        "items": [
          {
            "label": "3,450 km + 2,180 km sum",
            "target": "ans_5630",
            "name": "3,450 km + 2,180 km sum",
            "text": "3,450 km + 2,180 km sum",
            "type": "ans_5630",
            "description": ""
          },
          {
            "label": "8,500 km - 3,700 km difference",
            "target": "ans_4800",
            "name": "8,500 km - 3,700 km difference",
            "text": "8,500 km - 3,700 km difference",
            "type": "ans_4800",
            "description": ""
          },
          {
            "label": "Rover travel total distance",
            "target": "ans_5630",
            "name": "Rover travel total distance",
            "text": "Rover travel total distance",
            "type": "ans_5630",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
