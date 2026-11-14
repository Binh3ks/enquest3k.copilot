/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 63 | Theme: "Reading Maps: Navigating the Island" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 63,
  "theme": "Reading Maps: Navigating the Island",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "A compass needle always points toward magnetic ___.",
      "options": [
        "north",
        "south",
        "west"
      ],
      "answer": "north",
      "explanation": "The magnetic needle of a compass points toward the North Pole.",
      "promptText": "A compass needle always points toward magnetic ___.",
      "sentence": "A compass needle always points toward magnetic ___."
    },
    {
      "id": 2,
      "question": "When reading coordinates (4, 7), we read the ___ number first.",
      "options": [
        "horizontal",
        "vertical",
        "diagonal"
      ],
      "answer": "horizontal",
      "explanation": "In an ordered pair (x, y), the horizontal x-value is always read first.",
      "promptText": "When reading coordinates (4, 7), we read the ___ number first.",
      "sentence": "When reading coordinates (4, 7), we read the ___ number first."
    },
    {
      "id": 3,
      "question": "The hikers walked 5 units east and 8 units north, totaling ___ units.",
      "options": [
        "13",
        "40",
        "3"
      ],
      "answer": "13",
      "explanation": "5 + 8 = 13.",
      "promptText": "The hikers walked 5 units east and 8 units north, totaling ___ units.",
      "sentence": "The hikers walked 5 units east and 8 units north, totaling ___ units."
    },
    {
      "id": 4,
      "question": "The map had clear coordinates; ___, the explorers found the cave easily.",
      "options": [
        "therefore",
        "because",
        "since"
      ],
      "answer": "therefore",
      "explanation": "Therefore indicates the logical result of having clear coordinates.",
      "promptText": "The map had clear coordinates; ___, the explorers found the cave easily.",
      "sentence": "The map had clear coordinates; ___, the explorers found the cave easily."
    },
    {
      "id": 5,
      "question": "What is the perimeter of a rectangle with length 9 and width 6?",
      "options": [
        "30",
        "54",
        "15"
      ],
      "answer": "30",
      "explanation": "Perimeter = 2 * (9 + 6) = 2 * 15 = 30.",
      "promptText": "What is the perimeter of a rectangle with length 9 and width 6?",
      "sentence": "What is the perimeter of a rectangle with length 9 and width 6?"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Grid Hiking Distance",
      "problemText": "Explorers hike 5 units east along the x-axis and then 8 units north along the y-axis to reach a lookout tower. What is the total grid distance they walked?",
      "correctAnswer": 13,
      "target_answer": 13,
      "unit": "units",
      "hintText": "Step 1: East distance = 5. Step 2: North distance = 8. Step 3: Total = 5 + 8 = 13 units.",
      "steps": [
        "Step 1: 5 + 8 = 13 units."
      ],
      "modelData": {
        "bars": [
          {
            "label": "East (5)",
            "value": 5,
            "color": "#3B82F6"
          },
          {
            "label": "North (8)",
            "value": 8,
            "color": "#10B981"
          }
        ],
        "total": 13,
        "unit": "units",
        "comparisonType": "part_whole"
      },
      "problem_text": "Explorers hike 5 units east along the x-axis and then 8 units north along the y-axis to reach a lookout tower. What is the total grid distance they walked?",
      "problem_en": "Explorers hike 5 units east along the x-axis and then 8 units north along the y-axis to reach a lookout tower. What is the total grid distance they walked?",
      "answer": 13,
      "step_by_step": "Step 1: East distance = 5. Step 2: North distance = 8. Step 3: Total = 5 + 8 = 13 units."
    },
    {
      "id": 2,
      "title": "Campground Boundary Perimeter",
      "problemText": "A rectangular tent area on the map is 6 units wide and 9 units long. What is the perimeter around the campground?",
      "correctAnswer": 30,
      "target_answer": 30,
      "unit": "units",
      "hintText": "Step 1: Width = 6, Length = 9. Step 2: Perimeter = 2 * (6 + 9) = 2 * 15 = 30 units.",
      "steps": [
        "Step 1: 6 + 9 = 15.",
        "Step 2: 2 * 15 = 30 units."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Widths 2*6 (12)",
            "value": 12,
            "color": "#F59E0B"
          },
          {
            "label": "Lengths 2*9 (18)",
            "value": 18,
            "color": "#8B5CF6"
          }
        ],
        "total": 30,
        "unit": "units",
        "comparisonType": "perimeter"
      },
      "problem_text": "A rectangular tent area on the map is 6 units wide and 9 units long. What is the perimeter around the campground?",
      "problem_en": "A rectangular tent area on the map is 6 units wide and 9 units long. What is the perimeter around the campground?",
      "answer": 30,
      "step_by_step": "Step 1: Width = 6, Length = 9. Step 2: Perimeter = 2 * (6 + 9) = 2 * 15 = 30 units."
    },
    {
      "id": 3,
      "title": "Campground Enclosed Area",
      "problemText": "A fenced supply yard occupies a rectangular grid space measuring 7 units by 8 units. What is the total area in square units?",
      "correctAnswer": 56,
      "target_answer": 56,
      "unit": "square units",
      "hintText": "Step 1: Side 1 = 7. Step 2: Side 2 = 8. Step 3: Area = 7 * 8 = 56 square units.",
      "steps": [
        "Step 1: 7 * 8 = 56 square units."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Area 7 * 8",
            "value": 56,
            "color": "#EF4444"
          }
        ],
        "total": 56,
        "unit": "square units",
        "comparisonType": "area"
      },
      "problem_text": "A fenced supply yard occupies a rectangular grid space measuring 7 units by 8 units. What is the total area in square units?",
      "problem_en": "A fenced supply yard occupies a rectangular grid space measuring 7 units by 8 units. What is the total area in square units?",
      "answer": 56,
      "step_by_step": "Step 1: Side 1 = 7. Step 2: Side 2 = 8. Step 3: Area = 7 * 8 = 56 square units."
    },
    {
      "id": 4,
      "title": "Steps to the Hidden Spring",
      "problemText": "From the origin, hikers move 4 units east and 7 units north to reach a hidden spring. How many total grid steps is the spring from (0, 0)?",
      "correctAnswer": 11,
      "target_answer": 11,
      "unit": "steps",
      "hintText": "Step 1: East = 4. Step 2: North = 7. Step 3: Total steps = 4 + 7 = 11 steps.",
      "steps": [
        "Step 1: 4 + 7 = 11 steps."
      ],
      "modelData": {
        "bars": [
          {
            "label": "East (4)",
            "value": 4,
            "color": "#06B6D4"
          },
          {
            "label": "North (7)",
            "value": 7,
            "color": "#EC4899"
          }
        ],
        "total": 11,
        "unit": "steps",
        "comparisonType": "part_whole"
      },
      "problem_text": "From the origin, hikers move 4 units east and 7 units north to reach a hidden spring. How many total grid steps is the spring from (0, 0)?",
      "problem_en": "From the origin, hikers move 4 units east and 7 units north to reach a hidden spring. How many total grid steps is the spring from (0, 0)?",
      "answer": 11,
      "step_by_step": "Step 1: East = 4. Step 2: North = 7. Step 3: Total steps = 4 + 7 = 11 steps."
    },
    {
      "id": 5,
      "title": "Missing Y-Coordinate Value",
      "problemText": "A mountain peak is plotted at coordinate (x, y). The x-coordinate is 8, and the total sum of the two coordinates is 20. What is the value of the y-coordinate?",
      "correctAnswer": 12,
      "target_answer": 12,
      "unit": "units",
      "hintText": "Step 1: Sum = 20. Step 2: x = 8. Step 3: y = 20 - 8 = 12.",
      "steps": [
        "Step 1: 20 - 8 = 12."
      ],
      "modelData": {
        "bars": [
          {
            "label": "X-coord (8)",
            "value": 8,
            "color": "#6366F1"
          },
          {
            "label": "Y-coord (12)",
            "value": 12,
            "color": "#14B8A6"
          }
        ],
        "total": 20,
        "unit": "units",
        "comparisonType": "part_whole"
      },
      "problem_text": "A mountain peak is plotted at coordinate (x, y). The x-coordinate is 8, and the total sum of the two coordinates is 20. What is the value of the y-coordinate?",
      "problem_en": "A mountain peak is plotted at coordinate (x, y). The x-coordinate is 8, and the total sum of the two coordinates is 20. What is the value of the y-coordinate?",
      "answer": 12,
      "step_by_step": "Step 1: Sum = 20. Step 2: x = 8. Step 3: y = 20 - 8 = 12."
    }
  ],
  "science_lab": {
    "title_en": "Reading Maps: Navigating the Island Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Cardinal Direction Mapping",
        "diagram_type": "compass_rose",
        "instruction": "Sort the direction terms into Cardinal Primary (N, S, E, W) or Axis Line (Horizontal, Vertical).",
        "items": [
          {
            "label": "Compass North direction",
            "target": "cardinal_group",
            "name": "Compass North direction",
            "text": "Compass North direction",
            "type": "cardinal_group",
            "description": ""
          },
          {
            "label": "Compass South direction",
            "target": "cardinal_group",
            "name": "Compass South direction",
            "text": "Compass South direction",
            "type": "cardinal_group",
            "description": ""
          },
          {
            "label": "Horizontal x-axis line",
            "target": "axis_group",
            "name": "Horizontal x-axis line",
            "text": "Horizontal x-axis line",
            "type": "axis_group",
            "description": ""
          },
          {
            "label": "Vertical y-axis line",
            "target": "axis_group",
            "name": "Vertical y-axis line",
            "text": "Vertical y-axis line",
            "type": "axis_group",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Coordinate Order Rule",
        "diagram_type": "coordinate_plotter",
        "instruction": "Match each part of the coordinate pair (4, 7) to its correct axis movement.",
        "items": [
          {
            "label": "First number 4: Move horizontal on x-axis",
            "target": "x_axis_movement",
            "name": "First number 4: Move horizontal on x-axis",
            "text": "First number 4: Move horizontal on x-axis",
            "type": "x_axis_movement",
            "description": ""
          },
          {
            "label": "Second number 7: Move vertical on y-axis",
            "target": "y_axis_movement",
            "name": "Second number 7: Move vertical on y-axis",
            "text": "Second number 7: Move vertical on y-axis",
            "type": "y_axis_movement",
            "description": ""
          },
          {
            "label": "Starting intersection point (0, 0)",
            "target": "origin_point",
            "name": "Starting intersection point (0, 0)",
            "text": "Starting intersection point (0, 0)",
            "type": "origin_point",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Perimeter vs Area Classification",
        "diagram_type": "geometry_calc",
        "instruction": "Classify the calculation result as Perimeter (Boundary length) or Area (Enclosed space).",
        "items": [
          {
            "label": "2 * (6 + 9) = 30 units around outside",
            "target": "perimeter_result",
            "name": "2 * (6 + 9) = 30 units around outside",
            "text": "2 * (6 + 9) = 30 units around outside",
            "type": "perimeter_result",
            "description": ""
          },
          {
            "label": "7 * 8 = 56 square units inside boundary",
            "target": "area_result",
            "name": "7 * 8 = 56 square units inside boundary",
            "text": "7 * 8 = 56 square units inside boundary",
            "type": "area_result",
            "description": ""
          },
          {
            "label": "Measuring boundary fence length",
            "target": "perimeter_result",
            "name": "Measuring boundary fence length",
            "text": "Measuring boundary fence length",
            "type": "perimeter_result",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
