/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 48 | Theme: "Measuring Up (Length)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 48,
  "theme": "Measuring Up (Length)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "How do you state the length of the pencil?",
      "options": [
        "It is fifteen centimeters long.",
        "It has fifteen centimeters long.",
        "It is fifteen centimeters length."
      ],
      "answer": "It is fifteen centimeters long.",
      "explanation": "Use 'It is [number] centimeters long' to express length."
    },
    {
      "id": 2,
      "question": "Complete the zero conditional: If you freeze water, it ___ into ice.",
      "options": [
        "turns",
        "will turned",
        "turned"
      ],
      "answer": "turns",
      "explanation": "Zero conditional uses present simple in both clauses for scientific facts."
    },
    {
      "id": 3,
      "question": "The classroom door is two ___ tall.",
      "options": [
        "meters",
        "centimeter",
        "millimeters"
      ],
      "answer": "meters",
      "explanation": "Doors are measured in meters (plural for two)."
    },
    {
      "id": 4,
      "question": "If temperature drops below zero, liquid water ___.",
      "options": [
        "freezes",
        "freeze",
        "freezing"
      ],
      "answer": "freezes",
      "explanation": "Liquid water is singular, taking the verb 'freezes'."
    },
    {
      "id": 5,
      "question": "Which sentence is correct?",
      "options": [
        "The wooden ruler gives accurate measurements.",
        "The wooden ruler give accurate measurements.",
        "The wooden ruler giving accurate measurements."
      ],
      "answer": "The wooden ruler gives accurate measurements.",
      "explanation": "Third person singular subject requires 'gives'."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Ribbon Length Comparison",
      "problem_text": "Lucas has a blue ribbon that is 45 cm long. Emma has a red ribbon that is 28 cm long. How many centimeters longer is the blue ribbon?",
      "correctAnswer": 17,
      "target_answer": 17,
      "answer_unit": "cm",
      "step_by_step": "Step 1: Blue ribbon = 45 cm. Step 2: Red ribbon = 28 cm. Step 3: Difference = 45 - 28 = 17 cm.",
      "modelData": {
        "bars": [
          {
            "label": "Blue Ribbon",
            "value": 45,
            "color": "#3B82F6"
          },
          {
            "label": "Red Ribbon",
            "value": 28,
            "color": "#EF4444"
          }
        ],
        "total": 45,
        "unit": "cm",
        "comparisonType": "difference"
      }
    },
    {
      "id": 2,
      "title": "Total Ribbon for Project",
      "problem_text": "A student needs 35 cm of ribbon for a poster and 42 cm of ribbon for a model. How much ribbon does the student need in total?",
      "correctAnswer": 77,
      "target_answer": 77,
      "answer_unit": "cm",
      "step_by_step": "Step 1: Poster ribbon = 35 cm. Step 2: Model ribbon = 42 cm. Step 3: Total = 35 + 42 = 77 cm.",
      "modelData": {
        "bars": [
          {
            "label": "Poster Ribbon",
            "value": 35,
            "color": "#10B981"
          },
          {
            "label": "Model Ribbon",
            "value": 42,
            "color": "#F59E0B"
          }
        ],
        "total": 77,
        "unit": "cm",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 3,
      "title": "Desk Length to One Meter",
      "problem_text": "A wooden study desk is 68 cm long. How many more centimeters are needed to make it 100 cm (1 meter) long?",
      "correctAnswer": 32,
      "target_answer": 32,
      "answer_unit": "cm",
      "step_by_step": "Step 1: Target = 100 cm. Step 2: Current length = 68 cm. Step 3: Needed = 100 - 68 = 32 cm.",
      "modelData": {
        "bars": [
          {
            "label": "Current Desk",
            "value": 68,
            "color": "#8B5CF6"
          },
          {
            "label": "Remaining to 1m",
            "value": 32,
            "color": "#EC4899"
          }
        ],
        "total": 100,
        "unit": "cm",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 4,
      "title": "Sunflower Growth Measurement",
      "problem_text": "A sunflower was 54 cm tall last Monday. By this Monday, it grew to 71 cm tall. How many centimeters did the sunflower grow?",
      "correctAnswer": 17,
      "target_answer": 17,
      "answer_unit": "cm",
      "step_by_step": "Step 1: New height = 71 cm. Step 2: Old height = 54 cm. Step 3: Growth = 71 - 54 = 17 cm.",
      "modelData": {
        "bars": [
          {
            "label": "Old Height",
            "value": 54,
            "color": "#6366F1"
          },
          {
            "label": "Growth",
            "value": 17,
            "color": "#10B981"
          }
        ],
        "total": 71,
        "unit": "cm",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 5,
      "title": "Three Wire Segments",
      "problem_text": "An electric circuit needs three wire pieces: 20 cm, 25 cm, and 30 cm. What is the total length of wire required?",
      "correctAnswer": 75,
      "target_answer": 75,
      "answer_unit": "cm",
      "step_by_step": "Step 1: Wire pieces = 20, 25, 30 cm. Step 2: Sum = 20 + 25 + 30 = 75 cm.",
      "modelData": {
        "bars": [
          {
            "label": "Wire 1",
            "value": 20,
            "color": "#06B6D4"
          },
          {
            "label": "Wire 2",
            "value": 25,
            "color": "#F97316"
          },
          {
            "label": "Wire 3",
            "value": 30,
            "color": "#14B8A6"
          }
        ],
        "total": 75,
        "unit": "cm",
        "comparisonType": "part_whole"
      }
    }
  ],
  "science_lab": {
    "title_en": "Measuring Up (Length) Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Measuring With Rulers",
        "description": "Align the object with zero on the metric ruler scale.",
        "instructions": "Place the yellow pencil on the ruler starting exactly at 0 cm.",
        "items": [
          {
            "id": "pencil",
            "name": "Yellow Pencil (15 cm)",
            "type": "tool"
          },
          {
            "id": "marker",
            "name": "Green Marker (12 cm)",
            "type": "tool"
          }
        ],
        "dropZones": [
          {
            "id": "ruler_scale",
            "label": "Metric Ruler 0-30 cm"
          }
        ]
      },
      {
        "stage": 2,
        "title": "The Ice and Salt Freezing Point",
        "description": "Observe how adding salt lowers the freezing temperature of water.",
        "instructions": "Sprinkle table salt onto the ice cubes and read the digital thermometer.",
        "items": [
          {
            "id": "salt_shaker",
            "name": "Table Salt Shaker",
            "type": "chemical"
          },
          {
            "id": "thermometer",
            "name": "Digital Thermometer Probe",
            "type": "instrument"
          }
        ],
        "dropZones": [
          {
            "id": "ice_beaker",
            "label": "Ice Cube Beaker (-2°C Zone)"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Water Expansion Measurement",
        "description": "Measure the change in height when liquid water freezes into solid ice.",
        "instructions": "Place the measuring scale beside the frozen graduated cylinder.",
        "items": [
          {
            "id": "graduated_cylinder",
            "name": "Frozen Water Cylinder",
            "type": "glassware"
          },
          {
            "id": "indicator_arrow",
            "name": "Expansion Marker (+2 mm)",
            "type": "tag"
          }
        ],
        "dropZones": [
          {
            "id": "expansion_zone",
            "label": "Volume Comparison Station"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
