/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 70 | Theme: "Presentation: Pitching a Green Idea" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 70,
  "theme": "Presentation: Pitching a Green Idea",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "Which discourse marker is most suitable to introduce the first main point of a speech?",
      "options": [
        "First of all,",
        "Suddenly,",
        "To conclude,"
      ],
      "answer": "First of all,",
      "explanation": "'First of all,' introduces the initial topic in a structured presentation.",
      "promptText": "Which discourse marker is most suitable to introduce the first main point of a speech?",
      "sentence": "Which discourse marker is most suitable to introduce the first main point of a speech?"
    },
    {
      "id": 2,
      "question": "Use '___' to introduce an additional reinforcing point in your presentation.",
      "options": [
        "Furthermore,",
        "Instead,",
        "Although,"
      ],
      "answer": "Furthermore,",
      "explanation": "'Furthermore,' adds an extra persuasive argument.",
      "promptText": "Use '___' to introduce an additional reinforcing point in your presentation.",
      "sentence": "Use '___' to introduce an additional reinforcing point in your presentation."
    },
    {
      "id": 3,
      "question": "What is the sum of 32, 48, 25, and 15 kg from the quarterly table?",
      "options": [
        "120 kg",
        "110 kg",
        "130 kg"
      ],
      "answer": "120 kg",
      "explanation": "32 + 48 + 25 + 15 = 120.",
      "promptText": "What is the sum of 32, 48, 25, and 15 kg from the quarterly table?",
      "sentence": "What is the sum of 32, 48, 25, and 15 kg from the quarterly table?"
    },
    {
      "id": 4,
      "question": "The presentation was structured clearly; ___, the judges awarded it first prize.",
      "options": [
        "therefore",
        "because",
        "although"
      ],
      "answer": "therefore",
      "explanation": "Therefore indicates the logical result of the presentation being well-structured.",
      "promptText": "The presentation was structured clearly; ___, the judges awarded it first prize.",
      "sentence": "The presentation was structured clearly; ___, the judges awarded it first prize."
    },
    {
      "id": 5,
      "question": "Four recycling bins holding 18 kg each equal a total capacity of ___ kg.",
      "options": [
        "72",
        "64",
        "80"
      ],
      "answer": "72",
      "explanation": "4 * 18 = 72.",
      "promptText": "Four recycling bins holding 18 kg each equal a total capacity of ___ kg.",
      "sentence": "Four recycling bins holding 18 kg each equal a total capacity of ___ kg."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Four-Quarter Recycling Table Sum",
      "problemText": "A school recycling table records 32 kg in Quarter 1, 48 kg in Quarter 2, 25 kg in Quarter 3, and 15 kg in Quarter 4. What is the total mass of paper recycled across all four quarters?",
      "correctAnswer": 120,
      "target_answer": 120,
      "unit": "kilograms",
      "hintText": "Step 1: Add 32, 48, 25, and 15. Step 2: Sum = 32 + 48 + 25 + 15 = 120 kg.",
      "steps": [
        "Step 1: 32 + 48 + 25 + 15 = 120 kg."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Q1 (32)",
            "value": 32,
            "color": "#3B82F6"
          },
          {
            "label": "Q2 (48)",
            "value": 48,
            "color": "#10B981"
          },
          {
            "label": "Q3 (25)",
            "value": 25,
            "color": "#F59E0B"
          },
          {
            "label": "Q4 (15)",
            "value": 15,
            "color": "#8B5CF6"
          }
        ],
        "total": 120,
        "unit": "kilograms",
        "comparisonType": "part_whole"
      },
      "problem_text": "A school recycling table records 32 kg in Quarter 1, 48 kg in Quarter 2, 25 kg in Quarter 3, and 15 kg in Quarter 4. What is the total mass of paper recycled across all four quarters?",
      "problem_en": "A school recycling table records 32 kg in Quarter 1, 48 kg in Quarter 2, 25 kg in Quarter 3, and 15 kg in Quarter 4. What is the total mass of paper recycled across all four quarters?",
      "answer": 120,
      "step_by_step": "Step 1: Add 32, 48, 25, and 15. Step 2: Sum = 32 + 48 + 25 + 15 = 120 kg."
    },
    {
      "id": 2,
      "title": "Seasonal Solar Production Difference",
      "problemText": "A solar panel bar chart records peak production of 95 kWh in July and 45 kWh in December. What is the seasonal difference in kilowatt-hours produced?",
      "correctAnswer": 50,
      "target_answer": 50,
      "unit": "kWh",
      "hintText": "Step 1: July = 95. Step 2: December = 45. Step 3: Difference = 95 - 45 = 50 kWh.",
      "steps": [
        "Step 1: 95 - 45 = 50 kWh."
      ],
      "modelData": {
        "bars": [
          {
            "label": "July (95)",
            "value": 95,
            "color": "#EF4444"
          },
          {
            "label": "December (45)",
            "value": 45,
            "color": "#06B6D4"
          }
        ],
        "total": 50,
        "unit": "kWh",
        "comparisonType": "difference"
      },
      "problem_text": "A solar panel bar chart records peak production of 95 kWh in July and 45 kWh in December. What is the seasonal difference in kilowatt-hours produced?",
      "problem_en": "A solar panel bar chart records peak production of 95 kWh in July and 45 kWh in December. What is the seasonal difference in kilowatt-hours produced?",
      "answer": 50,
      "step_by_step": "Step 1: July = 95. Step 2: December = 45. Step 3: Difference = 95 - 45 = 50 kWh."
    },
    {
      "id": 3,
      "title": "Capacity of Four Recycling Bins",
      "problemText": "The school places 4 paper recycling bins in hallways. If each bin holds 18 kilograms of paper, what is their total combined capacity?",
      "correctAnswer": 72,
      "target_answer": 72,
      "unit": "kilograms",
      "hintText": "Step 1: Bins = 4. Step 2: Capacity each = 18 kg. Step 3: Total = 4 * 18 = 72 kg.",
      "steps": [
        "Step 1: 4 * 18 = 72 kg."
      ],
      "modelData": {
        "bars": [
          {
            "label": "4 Bins * 18 kg",
            "value": 72,
            "color": "#EC4899"
          }
        ],
        "total": 72,
        "unit": "kilograms",
        "comparisonType": "equal_groups"
      },
      "problem_text": "The school places 4 paper recycling bins in hallways. If each bin holds 18 kilograms of paper, what is their total combined capacity?",
      "problem_en": "The school places 4 paper recycling bins in hallways. If each bin holds 18 kilograms of paper, what is their total combined capacity?",
      "answer": 72,
      "step_by_step": "Step 1: Bins = 4. Step 2: Capacity each = 18 kg. Step 3: Total = 4 * 18 = 72 kg."
    },
    {
      "id": 4,
      "title": "Solar Energy Reduction Savings",
      "problemText": "A community center expected an electricity bill of 150 dollars. Thanks to rooftop solar panels, their bill was reduced by 65 dollars. How much did they pay?",
      "correctAnswer": 85,
      "target_answer": 85,
      "unit": "dollars",
      "hintText": "Step 1: Expected = 150. Step 2: Saved = 65. Step 3: Paid = 150 - 65 = 85 dollars.",
      "steps": [
        "Step 1: 150 - 65 = 85 dollars."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Original (150)",
            "value": 150,
            "color": "#6366F1"
          },
          {
            "label": "Saved (65)",
            "value": 65,
            "color": "#14B8A6"
          }
        ],
        "total": 85,
        "unit": "dollars",
        "comparisonType": "difference"
      },
      "problem_text": "A community center expected an electricity bill of 150 dollars. Thanks to rooftop solar panels, their bill was reduced by 65 dollars. How much did they pay?",
      "problem_en": "A community center expected an electricity bill of 150 dollars. Thanks to rooftop solar panels, their bill was reduced by 65 dollars. How much did they pay?",
      "answer": 85,
      "step_by_step": "Step 1: Expected = 150. Step 2: Saved = 65. Step 3: Paid = 150 - 65 = 85 dollars."
    },
    {
      "id": 5,
      "title": "Trees Planted by Volunteers",
      "problemText": "Eco-volunteers plant 28 cedar trees on Friday, 34 on Saturday, and 38 on Sunday. How many trees were planted over the three-day weekend?",
      "correctAnswer": 100,
      "target_answer": 100,
      "unit": "trees",
      "hintText": "Step 1: Add 28, 34, and 38. Step 2: Sum = 28 + 34 + 38 = 100 trees.",
      "steps": [
        "Step 1: 28 + 34 + 38 = 100 trees."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Friday (28)",
            "value": 28,
            "color": "#F97316"
          },
          {
            "label": "Saturday (34)",
            "value": 34,
            "color": "#3B82F6"
          },
          {
            "label": "Sunday (38)",
            "value": 38,
            "color": "#10B981"
          }
        ],
        "total": 100,
        "unit": "trees",
        "comparisonType": "part_whole"
      },
      "problem_text": "Eco-volunteers plant 28 cedar trees on Friday, 34 on Saturday, and 38 on Sunday. How many trees were planted over the three-day weekend?",
      "problem_en": "Eco-volunteers plant 28 cedar trees on Friday, 34 on Saturday, and 38 on Sunday. How many trees were planted over the three-day weekend?",
      "answer": 100,
      "step_by_step": "Step 1: Add 28, 34, and 38. Step 2: Sum = 28 + 34 + 38 = 100 trees."
    }
  ],
  "science_lab": {
    "title_en": "Presentation: Pitching a Green Idea Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Discourse Marker Sequencing",
        "diagram_type": "speech_flow",
        "instruction": "Sort the speech markers into their correct presentation phase (Introduction, Body Extension, or Conclusion).",
        "items": [
          {
            "label": "First of all we are thrilled to present",
            "target": "speech_intro",
            "name": "First of all we are thrilled to present",
            "text": "First of all we are thrilled to present",
            "type": "speech_intro",
            "description": ""
          },
          {
            "label": "Furthermore our data proves viability",
            "target": "speech_extension",
            "name": "Furthermore our data proves viability",
            "text": "Furthermore our data proves viability",
            "type": "speech_extension",
            "description": ""
          },
          {
            "label": "To conclude investing in solar saves money",
            "target": "speech_conclusion",
            "name": "To conclude investing in solar saves money",
            "text": "To conclude investing in solar saves money",
            "type": "speech_conclusion",
            "description": ""
          },
          {
            "label": "In addition to these energy benefits",
            "target": "speech_extension",
            "name": "In addition to these energy benefits",
            "text": "In addition to these energy benefits",
            "type": "speech_extension",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Multi-Graph Data Sourcing",
        "diagram_type": "graph_evaluator",
        "instruction": "Match each data finding to its graphical source (Table, Bar Graph, or Math Equation).",
        "items": [
          {
            "label": "Four quarterly figures totaling 120 kg",
            "target": "table_source",
            "name": "Four quarterly figures totaling 120 kg",
            "text": "Four quarterly figures totaling 120 kg",
            "type": "table_source",
            "description": ""
          },
          {
            "label": "July vs December peak solar comparison",
            "target": "bar_graph_source",
            "name": "July vs December peak solar comparison",
            "text": "July vs December peak solar comparison",
            "type": "bar_graph_source",
            "description": ""
          },
          {
            "label": "4 bins * 18 kg each = 72 kg",
            "target": "equation_source",
            "name": "4 bins * 18 kg each = 72 kg",
            "text": "4 bins * 18 kg each = 72 kg",
            "type": "equation_source",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Green Initiative Quantities",
        "diagram_type": "quantity_target",
        "instruction": "Match the environmental initiative to its calculated numerical total (120 kg or 72 kg).",
        "items": [
          {
            "label": "Quarterly paper recycling sum",
            "target": "total_120_kg",
            "name": "Quarterly paper recycling sum",
            "text": "Quarterly paper recycling sum",
            "type": "total_120_kg",
            "description": ""
          },
          {
            "label": "Four recycling bin capacity",
            "target": "total_72_kg",
            "name": "Four recycling bin capacity",
            "text": "Four recycling bin capacity",
            "type": "total_72_kg",
            "description": ""
          },
          {
            "label": "32 + 48 + 25 + 15 kg sum",
            "target": "total_120_kg",
            "name": "32 + 48 + 25 + 15 kg sum",
            "text": "32 + 48 + 25 + 15 kg sum",
            "type": "total_120_kg",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
