/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 50 | Theme: "Review Station 1 (Grammar Mix)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 50,
  "theme": "Review Station 1 (Grammar Mix)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "If we use clean energy, we ___ air pollution in our city.",
      "options": [
        "will reduce",
        "reduced",
        "are reducing"
      ],
      "answer": "will reduce",
      "explanation": "First conditional uses present simple in the 'if' clause and 'will + base verb' in the result clause."
    },
    {
      "id": 2,
      "question": "What will happen if drivers charge their cars with solar power?",
      "options": [
        "They will protect the planet.",
        "They protect the planet yesterday.",
        "They protected the planet."
      ],
      "answer": "They will protect the planet.",
      "explanation": "First conditional result clause takes 'will + protect'."
    },
    {
      "id": 3,
      "question": "Yesterday, the electric bus ___ sixty kilometers across town.",
      "options": [
        "traveled",
        "will travel",
        "travels"
      ],
      "answer": "traveled",
      "explanation": "'Yesterday' signals past simple tense."
    },
    {
      "id": 4,
      "question": "Right now, the technician ___ the battery.",
      "options": [
        "is charging",
        "charged",
        "will charge"
      ],
      "answer": "is charging",
      "explanation": "'Right now' indicates present continuous tense."
    },
    {
      "id": 5,
      "question": "In the future, most cars ___ electric.",
      "options": [
        "will be",
        "were",
        "are being"
      ],
      "answer": "will be",
      "explanation": "'In the future' calls for future simple with 'will be'."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Electric Car Travel Range",
      "problem_text": "An electric car traveled 48 km in the morning and 37 km in the afternoon. What was the total distance traveled?",
      "correctAnswer": 85,
      "target_answer": 85,
      "answer_unit": "km",
      "step_by_step": "Step 1: Morning distance = 48 km. Step 2: Afternoon distance = 37 km. Step 3: Total = 48 + 37 = 85 km.",
      "modelData": {
        "bars": [
          {
            "label": "Morning",
            "value": 48,
            "color": "#3B82F6"
          },
          {
            "label": "Afternoon",
            "value": 37,
            "color": "#10B981"
          }
        ],
        "total": 85,
        "unit": "km",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 2,
      "title": "Charging Station Plugs",
      "problem_text": "A city station has 24 standard chargers and 18 ultra-fast chargers. How many charging plugs are available in total?",
      "correctAnswer": 42,
      "target_answer": 42,
      "answer_unit": "plugs",
      "step_by_step": "Step 1: Standard = 24. Step 2: Ultra-fast = 18. Step 3: Total = 24 + 18 = 42 plugs.",
      "modelData": {
        "bars": [
          {
            "label": "Standard",
            "value": 24,
            "color": "#F59E0B"
          },
          {
            "label": "Ultra-fast",
            "value": 18,
            "color": "#8B5CF6"
          }
        ],
        "total": 42,
        "unit": "plugs",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 3,
      "title": "Solar Roof Panel Difference",
      "problem_text": "Station East has 65 solar panels. Station West has 42 solar panels. How many more solar panels are at Station East?",
      "correctAnswer": 23,
      "target_answer": 23,
      "answer_unit": "panels",
      "step_by_step": "Step 1: Station East = 65 panels. Step 2: Station West = 42 panels. Step 3: Difference = 65 - 42 = 23 panels.",
      "modelData": {
        "bars": [
          {
            "label": "Station East",
            "value": 65,
            "color": "#EC4899"
          },
          {
            "label": "Station West",
            "value": 42,
            "color": "#14B8A6"
          }
        ],
        "total": 65,
        "unit": "panels",
        "comparisonType": "difference"
      }
    },
    {
      "id": 4,
      "title": "Battery Charging Target",
      "problem_text": "A car battery needs 80 units of charge. It currently has 55 units. How many units of charge are needed to reach the target?",
      "correctAnswer": 25,
      "target_answer": 25,
      "answer_unit": "units",
      "step_by_step": "Step 1: Target = 80 units. Step 2: Current = 55 units. Step 3: Needed = 80 - 55 = 25 units.",
      "modelData": {
        "bars": [
          {
            "label": "Current",
            "value": 55,
            "color": "#6366F1"
          },
          {
            "label": "Needed",
            "value": 25,
            "color": "#F97316"
          }
        ],
        "total": 80,
        "unit": "units",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 5,
      "title": "Clean School Buses in Fleet",
      "problem_text": "A school district owns 28 electric buses and plans to add 19 more next month. How many electric buses will the fleet have in total?",
      "correctAnswer": 47,
      "target_answer": 47,
      "answer_unit": "buses",
      "step_by_step": "Step 1: Current buses = 28. Step 2: Added buses = 19. Step 3: Total = 28 + 19 = 47 buses.",
      "modelData": {
        "bars": [
          {
            "label": "Current Fleet",
            "value": 28,
            "color": "#06B6D4"
          },
          {
            "label": "New Buses",
            "value": 19,
            "color": "#A855F7"
          }
        ],
        "total": 47,
        "unit": "buses",
        "comparisonType": "part_whole"
      }
    }
  ],
  "science_lab": {
    "title_en": "Review Station 1 (Grammar Mix) Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "EV Charging Circuit Setup",
        "description": "Connect the high-voltage charging cable securely to the vehicle port.",
        "instructions": "Attach the charging plug to the vehicle port and verify green status LED.",
        "items": [
          {
            "id": "ccs_plug",
            "name": "Rapid CCS Plug",
            "type": "cable"
          },
          {
            "id": "ground_wire",
            "name": "Safety Ground Wire",
            "type": "wire"
          }
        ],
        "dropZones": [
          {
            "id": "vehicle_socket",
            "label": "Vehicle Charging Port (Active)"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Solar Canopy Energy Flow",
        "description": "Route direct current from photovoltaic panels to the power inverter.",
        "instructions": "Drag the inverter module between the solar panels and the grid storage.",
        "items": [
          {
            "id": "inverter",
            "name": "Power Inverter Unit",
            "type": "converter"
          },
          {
            "id": "isolator",
            "name": "Circuit Isolator Switch",
            "type": "switch"
          }
        ],
        "dropZones": [
          {
            "id": "junction_box",
            "label": "Solar Distribution Junction"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Battery Temperature Management",
        "description": "Monitor lithium battery cooling channels during fast charge cycles.",
        "instructions": "Place the liquid coolant flow pump onto the battery pack manifold.",
        "items": [
          {
            "id": "coolant_pump",
            "name": "Electric Coolant Pump",
            "type": "pump"
          },
          {
            "id": "temp_sensor",
            "name": "Thermal Probe Matrix",
            "type": "sensor"
          }
        ],
        "dropZones": [
          {
            "id": "battery_manifold",
            "label": "Battery Pack Thermal Enclosure"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
