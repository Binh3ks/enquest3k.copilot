/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 68 | Theme: "ELA: Strong Reasons / Math: Bar Graphs"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const skillPracticeHubData = {
  "week": 68,
  "theme": "ELA: Strong Reasons / Math: Bar Graphs",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "Use '___' to introduce an exact numerical data point in your argument.",
      "options": [
        "Specifically",
        "Suddenly",
        "Maybe"
      ],
      "answer": "Specifically",
      "explanation": "'Specifically' signals precise factual details and numbers.",
      "promptText": "Use '___' to introduce an exact numerical data point in your argument.",
      "sentence": "Use '___' to introduce an exact numerical data point in your argument."
    },
    {
      "id": 2,
      "question": "Use '___' to add another supporting reason to your paragraph.",
      "options": [
        "In addition",
        "Instead of",
        "Because of"
      ],
      "answer": "In addition",
      "explanation": "'In addition' connects a supplementary supporting argument.",
      "promptText": "Use '___' to add another supporting reason to your paragraph.",
      "sentence": "Use '___' to add another supporting reason to your paragraph."
    },
    {
      "id": 3,
      "question": "On the bar graph, the difference between 65 votes and 42 votes is ___.",
      "options": [
        "23",
        "13",
        "33"
      ],
      "answer": "23",
      "explanation": "65 - 42 = 23.",
      "promptText": "On the bar graph, the difference between 65 votes and 42 votes is ___.",
      "sentence": "On the bar graph, the difference between 65 votes and 42 votes is ___."
    },
    {
      "id": 4,
      "question": "The evidence was convincing; ___, the school board funded the new chess club.",
      "options": [
        "therefore",
        "because",
        "although"
      ],
      "answer": "therefore",
      "explanation": "Therefore introduces the positive outcome resulting from convincing evidence.",
      "promptText": "The evidence was convincing; ___, the school board funded the new chess club.",
      "sentence": "The evidence was convincing; ___, the school board funded the new chess club."
    },
    {
      "id": 5,
      "question": "What is the total of 35, 40, and 55 players on the bar chart?",
      "options": [
        "130",
        "120",
        "140"
      ],
      "answer": "130",
      "explanation": "35 + 40 + 55 = 130.",
      "promptText": "What is the total of 35, 40, and 55 players on the bar chart?",
      "sentence": "What is the total of 35, 40, and 55 players on the bar chart?"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Difference Between Club Votes",
      "problemText": "On a school bar graph, the Chess Club bar reaches 65 votes and the Drama Club bar reaches 42 votes. What is the difference in votes between the two clubs?",
      "correctAnswer": 23,
      "target_answer": 23,
      "unit": "votes",
      "hintText": "Step 1: Chess = 65. Step 2: Drama = 42. Step 3: Difference = 65 - 42 = 23 votes.",
      "steps": [
        "Step 1: 65 - 42 = 23 votes."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Chess (65)",
            "value": 65,
            "color": "#3B82F6"
          },
          {
            "label": "Drama (42)",
            "value": 42,
            "color": "#10B981"
          }
        ],
        "total": 23,
        "unit": "votes",
        "comparisonType": "difference"
      },
      "problem_text": "On a school bar graph, the Chess Club bar reaches 65 votes and the Drama Club bar reaches 42 votes. What is the difference in votes between the two clubs?",
      "problem_en": "On a school bar graph, the Chess Club bar reaches 65 votes and the Drama Club bar reaches 42 votes. What is the difference in votes between the two clubs?",
      "answer": 23,
      "step_by_step": "Step 1: Chess = 65. Step 2: Drama = 42. Step 3: Difference = 65 - 42 = 23 votes.",
      "question": "On a school bar graph, the Chess Club bar reaches 65 votes and the Drama Club bar reaches 42 votes. What is the difference in votes between the two clubs?"
    },
    {
      "id": 2,
      "title": "Total Across Three Sports Bars",
      "problemText": "A sports bar chart displays 35 runners, 40 basketball players, and 55 soccer players. What is the total combined participation across all three sports?",
      "correctAnswer": 130,
      "target_answer": 130,
      "unit": "players",
      "hintText": "Step 1: Add 35, 40, and 55. Step 2: Sum = 35 + 40 + 55 = 130 players.",
      "steps": [
        "Step 1: 35 + 40 + 55 = 130 players."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Running (35)",
            "value": 35,
            "color": "#F59E0B"
          },
          {
            "label": "Basketball (40)",
            "value": 40,
            "color": "#8B5CF6"
          },
          {
            "label": "Soccer (55)",
            "value": 55,
            "color": "#EF4444"
          }
        ],
        "total": 130,
        "unit": "players",
        "comparisonType": "part_whole"
      },
      "problem_text": "A sports bar chart displays 35 runners, 40 basketball players, and 55 soccer players. What is the total combined participation across all three sports?",
      "problem_en": "A sports bar chart displays 35 runners, 40 basketball players, and 55 soccer players. What is the total combined participation across all three sports?",
      "answer": 130,
      "step_by_step": "Step 1: Add 35, 40, and 55. Step 2: Sum = 35 + 40 + 55 = 130 players.",
      "question": "A sports bar chart displays 35 runners, 40 basketball players, and 55 soccer players. What is the total combined participation across all three sports?"
    },
    {
      "id": 3,
      "title": "Books Read by Fifth Grade",
      "problemText": "A reading bar chart has a vertical scale with intervals of 10. If the fifth-grade bar reaches the 80-unit mark, how many books did they read?",
      "correctAnswer": 80,
      "target_answer": 80,
      "unit": "books",
      "hintText": "Step 1: Bar height reaches 80. Step 2: Total = 80 books.",
      "steps": [
        "Step 1: Height = 80 books."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 40,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 40,
            "color": "#10B981"
          }
        ],
        "total": 80,
        "unit": "books",
        "comparisonType": "bar_graph"
      },
      "problem_text": "A reading bar chart has a vertical scale with intervals of 10. If the fifth-grade bar reaches the 80-unit mark, how many books did they read?",
      "problem_en": "A reading bar chart has a vertical scale with intervals of 10. If the fifth-grade bar reaches the 80-unit mark, how many books did they read?",
      "answer": 80,
      "step_by_step": "Step 1: Bar height reaches 80. Step 2: Total = 80 books.",
      "question": "A reading bar chart has a vertical scale with intervals of 10. If the fifth-grade bar reaches the 80-unit mark, how many books did they read?"
    },
    {
      "id": 4,
      "title": "Art Project Submissions",
      "problemText": "Students submit 24 drawings, 36 paintings, and 48 clay sculptures for the art fair. What is the total number of submitted art projects?",
      "correctAnswer": 108,
      "target_answer": 108,
      "unit": "projects",
      "hintText": "Step 1: Add 24, 36, and 48. Step 2: Total = 24 + 36 + 48 = 108 projects.",
      "steps": [
        "Step 1: 24 + 36 + 48 = 108 projects."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Drawings (24)",
            "value": 24,
            "color": "#EC4899"
          },
          {
            "label": "Paintings (36)",
            "value": 36,
            "color": "#6366F1"
          },
          {
            "label": "Clay (48)",
            "value": 48,
            "color": "#14B8A6"
          }
        ],
        "total": 108,
        "unit": "projects",
        "comparisonType": "part_whole"
      },
      "problem_text": "Students submit 24 drawings, 36 paintings, and 48 clay sculptures for the art fair. What is the total number of submitted art projects?",
      "problem_en": "Students submit 24 drawings, 36 paintings, and 48 clay sculptures for the art fair. What is the total number of submitted art projects?",
      "answer": 108,
      "step_by_step": "Step 1: Add 24, 36, and 48. Step 2: Total = 24 + 36 + 48 = 108 projects.",
      "question": "Students submit 24 drawings, 36 paintings, and 48 clay sculptures for the art fair. What is the total number of submitted art projects?"
    },
    {
      "id": 5,
      "title": "Comparing Two Library Sections",
      "problemText": "A library bar graph shows 94 science books and 67 history books checked out. What is the difference in checked-out books between the two sections?",
      "correctAnswer": 27,
      "target_answer": 27,
      "unit": "books",
      "hintText": "Step 1: Science = 94. Step 2: History = 67. Step 3: Difference = 94 - 67 = 27 books.",
      "steps": [
        "Step 1: 94 - 67 = 27 books."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Science (94)",
            "value": 94,
            "color": "#F97316"
          },
          {
            "label": "History (67)",
            "value": 67,
            "color": "#3B82F6"
          }
        ],
        "total": 27,
        "unit": "books",
        "comparisonType": "difference"
      },
      "problem_text": "A library bar graph shows 94 science books and 67 history books checked out. What is the difference in checked-out books between the two sections?",
      "problem_en": "A library bar graph shows 94 science books and 67 history books checked out. What is the difference in checked-out books between the two sections?",
      "answer": 27,
      "step_by_step": "Step 1: Science = 94. Step 2: History = 67. Step 3: Difference = 94 - 67 = 27 books.",
      "question": "A library bar graph shows 94 science books and 67 history books checked out. What is the difference in checked-out books between the two sections?"
    }
  ],
  "science_lab": {
    "title_en": "Developing Strong Reasons: Evidence and Data Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Reasoning Connectors Function",
        "diagram_type": "connector_classifier",
        "instruction": "Sort the connectors into Example Introducer (For instance), Exact Number Indicator (Specifically), or Additional Point (In addition).",
        "items": [
          {
            "label": "For instance our school planted trees",
            "target": "example_connector",
            "name": "For instance our school planted trees",
            "text": "For instance our school planted trees",
            "type": "example_connector",
            "description": ""
          },
          {
            "label": "Specifically sixty-five students voted",
            "target": "specific_connector",
            "name": "Specifically sixty-five students voted",
            "text": "Specifically sixty-five students voted",
            "type": "specific_connector",
            "description": ""
          },
          {
            "label": "In addition cycling saves bus fare",
            "target": "additional_connector",
            "name": "In addition cycling saves bus fare",
            "text": "In addition cycling saves bus fare",
            "type": "additional_connector",
            "description": ""
          },
          {
            "label": "For example fourth graders stayed focused",
            "target": "example_connector",
            "name": "For example fourth graders stayed focused",
            "text": "For example fourth graders stayed focused",
            "type": "example_connector",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Bar Graph Reading Mechanics",
        "diagram_type": "bar_inspector",
        "instruction": "Match each bar chart element to its analytical function.",
        "items": [
          {
            "label": "Vertical axis scale with step of 10",
            "target": "quantity_measurement",
            "name": "Vertical axis scale with step of 10",
            "text": "Vertical axis scale with step of 10",
            "type": "quantity_measurement",
            "description": ""
          },
          {
            "label": "Horizontal axis labeling clubs and sports",
            "target": "category_classification",
            "name": "Horizontal axis labeling clubs and sports",
            "text": "Horizontal axis labeling clubs and sports",
            "type": "category_classification",
            "description": ""
          },
          {
            "label": "Difference between bar at 65 and bar at 42",
            "target": "comparative_gap",
            "name": "Difference between bar at 65 and bar at 42",
            "text": "Difference between bar at 65 and bar at 42",
            "type": "comparative_gap",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Calculated Total Matching",
        "diagram_type": "total_scale",
        "instruction": "Match the graph dataset to its correct combined total (130 Players or 108 Projects).",
        "items": [
          {
            "label": "35 runners + 40 basketball + 55 soccer",
            "target": "total_130",
            "name": "35 runners + 40 basketball + 55 soccer",
            "text": "35 runners + 40 basketball + 55 soccer",
            "type": "total_130",
            "description": ""
          },
          {
            "label": "24 drawings + 36 paintings + 48 clay",
            "target": "total_108",
            "name": "24 drawings + 36 paintings + 48 clay",
            "text": "24 drawings + 36 paintings + 48 clay",
            "type": "total_108",
            "description": ""
          },
          {
            "label": "Combined three sports participant sum",
            "target": "total_130",
            "name": "Combined three sports participant sum",
            "text": "Combined three sports participant sum",
            "type": "total_130",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
