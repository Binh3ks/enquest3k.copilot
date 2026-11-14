/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 64 | Theme: "ELA: Data Stories / Math: Pictographs"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const skillPracticeHubData = {
  "week": 64,
  "theme": "ELA: Data Stories / Math: Pictographs",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "Adventure was the ___ popular category in the entire school survey.",
      "options": [
        "most",
        "more",
        "much"
      ],
      "answer": "most",
      "explanation": "Use 'most' with adjectives of two or more syllables for superlative comparison.",
      "promptText": "Adventure was the ___ popular category in the entire school survey.",
      "sentence": "Adventure was the ___ popular category in the entire school survey."
    },
    {
      "id": 2,
      "question": "Poetry received the ___ number of student votes among the four choices.",
      "options": [
        "least",
        "less",
        "few"
      ],
      "answer": "least",
      "explanation": "'Least' is the superlative form representing the lowest quantity.",
      "promptText": "Poetry received the ___ number of student votes among the four choices.",
      "sentence": "Poetry received the ___ number of student votes among the four choices."
    },
    {
      "id": 3,
      "question": "If each icon represents 5 books, then 8 icons represent ___ books.",
      "options": [
        "40",
        "13",
        "35"
      ],
      "answer": "40",
      "explanation": "8 * 5 = 40.",
      "promptText": "If each icon represents 5 books, then 8 icons represent ___ books.",
      "sentence": "If each icon represents 5 books, then 8 icons represent ___ books."
    },
    {
      "id": 4,
      "question": "The chart had an accurate key; ___, students interpreted the totals without error.",
      "options": [
        "therefore",
        "because",
        "although"
      ],
      "answer": "therefore",
      "explanation": "Therefore indicates the consequence of having an accurate chart key.",
      "promptText": "The chart had an accurate key; ___, students interpreted the totals without error.",
      "sentence": "The chart had an accurate key; ___, students interpreted the totals without error."
    },
    {
      "id": 5,
      "question": "Room Four read ___ as many books as Room Two.",
      "options": [
        "twice",
        "two",
        "second"
      ],
      "answer": "twice",
      "explanation": "'Twice as many' is the standard phrase for two times the quantity.",
      "promptText": "Room Four read ___ as many books as Room Two.",
      "sentence": "Room Four read ___ as many books as Room Two."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Adventure Books on the Pictograph",
      "problemText": "On a reading pictograph, each star symbol represents 5 books. The Adventure row has 8 star symbols. How many books does this row represent in total?",
      "correctAnswer": 40,
      "target_answer": 40,
      "unit": "books",
      "hintText": "Step 1: Symbols = 8. Step 2: Scale = 5. Step 3: Total = 8 * 5 = 40 books.",
      "steps": [
        "Step 1: 8 * 5 = 40 books."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 20,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 20,
            "color": "#10B981"
          }
        ],
        "total": 40,
        "unit": "books",
        "comparisonType": "pictograph_scale"
      },
      "problem_text": "On a reading pictograph, each star symbol represents 5 books. The Adventure row has 8 star symbols. How many books does this row represent in total?",
      "problem_en": "On a reading pictograph, each star symbol represents 5 books. The Adventure row has 8 star symbols. How many books does this row represent in total?",
      "answer": 40,
      "step_by_step": "Step 1: Symbols = 8. Step 2: Scale = 5. Step 3: Total = 8 * 5 = 40 books.",
      "question": "On a reading pictograph, each star symbol represents 5 books. The Adventure row has 8 star symbols. How many books does this row represent in total?"
    },
    {
      "id": 2,
      "title": "Library Volumes Represented by Books",
      "problemText": "In a municipal library chart, each book icon represents 10 volumes. If the Biography section has 6 icons, how many volumes are there?",
      "correctAnswer": 60,
      "target_answer": 60,
      "unit": "volumes",
      "hintText": "Step 1: Icons = 6. Step 2: Scale = 10. Step 3: Total = 6 * 10 = 60 volumes.",
      "steps": [
        "Step 1: 6 * 10 = 60 volumes."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 30,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 30,
            "color": "#10B981"
          }
        ],
        "total": 60,
        "unit": "volumes",
        "comparisonType": "pictograph_scale"
      },
      "problem_text": "In a municipal library chart, each book icon represents 10 volumes. If the Biography section has 6 icons, how many volumes are there?",
      "problem_en": "In a municipal library chart, each book icon represents 10 volumes. If the Biography section has 6 icons, how many volumes are there?",
      "answer": 60,
      "step_by_step": "Step 1: Icons = 6. Step 2: Scale = 10. Step 3: Total = 6 * 10 = 60 volumes.",
      "question": "In a municipal library chart, each book icon represents 10 volumes. If the Biography section has 6 icons, how many volumes are there?"
    },
    {
      "id": 3,
      "title": "Difference Between Sports Votes",
      "problemText": "Each ball icon represents 4 student votes. Football has 7 icons and Tennis has 3 icons. What is the difference in student votes between Football and Tennis?",
      "correctAnswer": 16,
      "target_answer": 16,
      "unit": "votes",
      "hintText": "Step 1: Difference in icons = 7 - 3 = 4 icons. Step 2: Vote difference = 4 * 4 = 16 votes.",
      "steps": [
        "Step 1: 7 - 3 = 4 icons.",
        "Step 2: 4 * 4 = 16 votes."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Football (28)",
            "value": 28,
            "color": "#F59E0B"
          },
          {
            "label": "Tennis (12)",
            "value": 12,
            "color": "#8B5CF6"
          }
        ],
        "total": 16,
        "unit": "votes",
        "comparisonType": "difference"
      },
      "problem_text": "Each ball icon represents 4 student votes. Football has 7 icons and Tennis has 3 icons. What is the difference in student votes between Football and Tennis?",
      "problem_en": "Each ball icon represents 4 student votes. Football has 7 icons and Tennis has 3 icons. What is the difference in student votes between Football and Tennis?",
      "answer": 16,
      "step_by_step": "Step 1: Difference in icons = 7 - 3 = 4 icons. Step 2: Vote difference = 4 * 4 = 16 votes.",
      "question": "Each ball icon represents 4 student votes. Football has 7 icons and Tennis has 3 icons. What is the difference in student votes between Football and Tennis?"
    },
    {
      "id": 4,
      "title": "Combining Healthy Snack Symbols",
      "problemText": "A snack chart uses an apple symbol for 5 children. Grade 4A has 4 apple symbols and Grade 4B has 6 apple symbols. How many children are represented in both classes combined?",
      "correctAnswer": 50,
      "target_answer": 50,
      "unit": "children",
      "hintText": "Step 1: Total symbols = 4 + 6 = 10. Step 2: Children = 10 * 5 = 50 children.",
      "steps": [
        "Step 1: 4 + 6 = 10 symbols.",
        "Step 2: 10 * 5 = 50 children."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Grade 4A (20)",
            "value": 20,
            "color": "#EF4444"
          },
          {
            "label": "Grade 4B (30)",
            "value": 30,
            "color": "#06B6D4"
          }
        ],
        "total": 50,
        "unit": "children",
        "comparisonType": "part_whole"
      },
      "problem_text": "A snack chart uses an apple symbol for 5 children. Grade 4A has 4 apple symbols and Grade 4B has 6 apple symbols. How many children are represented in both classes combined?",
      "problem_en": "A snack chart uses an apple symbol for 5 children. Grade 4A has 4 apple symbols and Grade 4B has 6 apple symbols. How many children are represented in both classes combined?",
      "answer": 50,
      "step_by_step": "Step 1: Total symbols = 4 + 6 = 10. Step 2: Children = 10 * 5 = 50 children.",
      "question": "A snack chart uses an apple symbol for 5 children. Grade 4A has 4 apple symbols and Grade 4B has 6 apple symbols. How many children are represented in both classes combined?"
    },
    {
      "id": 5,
      "title": "Rainfall Measurement Symbols",
      "problemText": "A weather station pictograph uses a cloud symbol to represent 8 liters of rainfall per square meter. If May records 9 cloud symbols, what is the total rainfall?",
      "correctAnswer": 72,
      "target_answer": 72,
      "unit": "liters",
      "hintText": "Step 1: Symbols = 9. Step 2: Scale = 8 liters. Step 3: Total = 9 * 8 = 72 liters.",
      "steps": [
        "Step 1: 9 * 8 = 72 liters."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Part A",
            "value": 36,
            "color": "#3B82F6"
          },
          {
            "label": "Part B",
            "value": 36,
            "color": "#10B981"
          }
        ],
        "total": 72,
        "unit": "liters",
        "comparisonType": "pictograph_scale"
      },
      "problem_text": "A weather station pictograph uses a cloud symbol to represent 8 liters of rainfall per square meter. If May records 9 cloud symbols, what is the total rainfall?",
      "problem_en": "A weather station pictograph uses a cloud symbol to represent 8 liters of rainfall per square meter. If May records 9 cloud symbols, what is the total rainfall?",
      "answer": 72,
      "step_by_step": "Step 1: Symbols = 9. Step 2: Scale = 8 liters. Step 3: Total = 9 * 8 = 72 liters.",
      "question": "A weather station pictograph uses a cloud symbol to represent 8 liters of rainfall per square meter. If May records 9 cloud symbols, what is the total rainfall?"
    }
  ],
  "science_lab": {
    "title_en": "Data Stories: Reading Pictographs Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Comparative vs Superlative Degree",
        "diagram_type": "grammar_scale",
        "instruction": "Sort each data phrase into Comparative Degree (comparing two) or Superlative Degree (comparing all).",
        "items": [
          {
            "label": "Twice as many books as Poetry",
            "target": "comparative_degree",
            "name": "Twice as many books as Poetry",
            "text": "Twice as many books as Poetry",
            "type": "comparative_degree",
            "description": ""
          },
          {
            "label": "The most popular reading genre",
            "target": "superlative_degree",
            "name": "The most popular reading genre",
            "text": "The most popular reading genre",
            "type": "superlative_degree",
            "description": ""
          },
          {
            "label": "More votes than Tennis club",
            "target": "comparative_degree",
            "name": "More votes than Tennis club",
            "text": "More votes than Tennis club",
            "type": "comparative_degree",
            "description": ""
          },
          {
            "label": "The least common snack choice",
            "target": "superlative_degree",
            "name": "The least common snack choice",
            "text": "The least common snack choice",
            "type": "superlative_degree",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Pictograph Key Translation",
        "diagram_type": "symbol_converter",
        "instruction": "Match each symbol row count to its actual value when Key: 1 Icon = 5 Items.",
        "items": [
          {
            "label": "8 Star icons (8 * 5)",
            "target": "value_40",
            "name": "8 Star icons (8 * 5)",
            "text": "8 Star icons (8 * 5)",
            "type": "value_40",
            "description": ""
          },
          {
            "label": "3 Star icons (3 * 5)",
            "target": "value_15",
            "name": "3 Star icons (3 * 5)",
            "text": "3 Star icons (3 * 5)",
            "type": "value_15",
            "description": ""
          },
          {
            "label": "6 Star icons (6 * 5)",
            "target": "value_30",
            "name": "6 Star icons (6 * 5)",
            "text": "6 Star icons (6 * 5)",
            "type": "value_30",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Data Difference Verification",
        "diagram_type": "difference_meter",
        "instruction": "Match the difference calculation to its correct numerical answer (16 Votes or 25 Books).",
        "items": [
          {
            "label": "Adventure (40) minus Poetry (15)",
            "target": "diff_25",
            "name": "Adventure (40) minus Poetry (15)",
            "text": "Adventure (40) minus Poetry (15)",
            "type": "diff_25",
            "description": ""
          },
          {
            "label": "Football (28) minus Tennis (12)",
            "target": "diff_16",
            "name": "Football (28) minus Tennis (12)",
            "text": "Football (28) minus Tennis (12)",
            "type": "diff_16",
            "description": ""
          },
          {
            "label": "Four icon difference at 4 votes each",
            "target": "diff_16",
            "name": "Four icon difference at 4 votes each",
            "text": "Four icon difference at 4 votes each",
            "type": "diff_16",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
