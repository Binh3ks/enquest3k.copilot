/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 42 | Theme: "The Water Journey (Cycle)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 42,
  "theme": "The Water Journey (Cycle)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "First, the warm sun ___ water on the lake surface.",
      "options": [
        "heats",
        "heat",
        "heating"
      ],
      "answer": "heats",
      "explanation": "Use 3rd person singular present tense 'heats' with singular subject 'sun'."
    },
    {
      "sentence": "Next, invisible water vapors ___ high into the sky.",
      "options": [
        "rise",
        "rises",
        "rising"
      ],
      "answer": "rise",
      "explanation": "Use plural verb 'rise' with plural subject 'vapors'."
    },
    {
      "sentence": "Then, cool air ___ the vapors into puffy clouds.",
      "options": [
        "turns",
        "turn",
        "turning"
      ],
      "answer": "turns",
      "explanation": "Use 3rd person singular 'turns' with 'cool air'."
    },
    {
      "sentence": "Finally, raindrops ___ down onto the mountain forest.",
      "options": [
        "fall",
        "falls",
        "falling"
      ],
      "answer": "fall",
      "explanation": "Use plural verb 'fall' with 'raindrops'."
    },
    {
      "sentence": "The river ___ fresh water back into the deep ocean.",
      "options": [
        "carries",
        "carry",
        "carrying"
      ],
      "answer": "carries",
      "explanation": "Use 3rd person singular 'carries' with 'the river'."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "type": "part_whole",
      "title": "Rainwater Tank Collection",
      "problemText": "A school garden rainwater tank collected 45 liters of rain on Monday and 55 liters on Tuesday. How many liters of rainwater did the tank collect in total?",
      "question": "A school garden rainwater tank collected 45 liters of rain on Monday and 55 liters on Tuesday. How many liters of rainwater did the tank collect in total?",
      "correctAnswer": 100,
      "target_answer": 100,
      "unit": "liters",
      "hintText": "Add Monday's rainfall (45 L) and Tuesday's rainfall (55 L).",
      "steps": [
        "Monday rainfall: 45 liters.",
        "Tuesday rainfall: 55 liters.",
        "Total collection: 45 + 55 = 100 liters."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Monday",
            "value": 45,
            "color": "#3498db"
          },
          {
            "label": "Tuesday",
            "value": 55,
            "color": "#2980b9"
          }
        ],
        "total": 100,
        "totalLabel": "Total: 100 liters"
      }
    },
    {
      "id": 2,
      "type": "comparison",
      "title": "Reservoir Lake and Garden Pond Depth",
      "problemText": "A reservoir lake is 85 meters deep. A shallow garden pond is 15 meters deep. How many meters deeper is the reservoir lake than the garden pond?",
      "question": "A reservoir lake is 85 meters deep. A shallow garden pond is 15 meters deep. How many meters deeper is the reservoir lake than the garden pond?",
      "correctAnswer": 70,
      "target_answer": 70,
      "unit": "meters",
      "hintText": "Subtract the pond depth (15 m) from the lake depth (85 m).",
      "steps": [
        "Lake depth: 85 meters.",
        "Pond depth: 15 meters.",
        "Difference: 85 - 15 = 70 meters deeper."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Lake",
            "value": 85,
            "color": "#1abc9c"
          },
          {
            "label": "Pond",
            "value": 15,
            "color": "#16a085"
          }
        ],
        "difference": 70,
        "differenceLabel": "Difference: 70 meters"
      }
    },
    {
      "id": 3,
      "type": "part_whole",
      "title": "Cloud Experiment Beaker Water",
      "problemText": "In a science class cloud experiment, Beaker A condensed 64 milliliters of water and Beaker B condensed 36 milliliters. How many milliliters of water condensed altogether?",
      "question": "In a science class cloud experiment, Beaker A condensed 64 milliliters of water and Beaker B condensed 36 milliliters. How many milliliters of water condensed altogether?",
      "correctAnswer": 100,
      "target_answer": 100,
      "unit": "ml",
      "hintText": "Add 64 ml and 36 ml together.",
      "steps": [
        "Beaker A condensation: 64 ml.",
        "Beaker B condensation: 36 ml.",
        "Total: 64 + 36 = 100 ml."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Beaker A",
            "value": 64,
            "color": "#34495e"
          },
          {
            "label": "Beaker B",
            "value": 36,
            "color": "#2c3e50"
          }
        ],
        "total": 100,
        "totalLabel": "Total: 100 ml"
      }
    },
    {
      "id": 4,
      "type": "comparison",
      "title": "Mountain River and Stream Length",
      "problemText": "The Pine River flows 95 kilometers from the highlands to the ocean. The valley stream flows for 38 kilometers. How many kilometers longer is the Pine River than the valley stream?",
      "question": "The Pine River flows 95 kilometers from the highlands to the ocean. The valley stream flows for 38 kilometers. How many kilometers longer is the Pine River than the valley stream?",
      "correctAnswer": 57,
      "target_answer": 57,
      "unit": "km",
      "hintText": "Subtract 38 km from 95 km.",
      "steps": [
        "River length: 95 km.",
        "Stream length: 38 km.",
        "Difference: 95 - 38 = 57 km longer."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Pine River",
            "value": 95,
            "color": "#2980b9"
          },
          {
            "label": "Stream",
            "value": 38,
            "color": "#7f8c8d"
          }
        ],
        "difference": 57,
        "differenceLabel": "Difference: 57 km"
      }
    },
    {
      "id": 5,
      "type": "before_after",
      "title": "Solar Evaporation Basin Water",
      "problemText": "A solar basin held 120 liters of water at sunrise. Under the hot noon sun, 35 liters evaporated into the atmosphere. How many liters of water remained in the basin at sunset?",
      "question": "A solar basin held 120 liters of water at sunrise. Under the hot noon sun, 35 liters evaporated into the atmosphere. How many liters of water remained in the basin at sunset?",
      "correctAnswer": 85,
      "target_answer": 85,
      "unit": "liters",
      "hintText": "Subtract the evaporated water (35 L) from the initial volume (120 L).",
      "steps": [
        "Initial volume: 120 liters.",
        "Evaporated water: 35 liters.",
        "Remaining: 120 - 35 = 85 liters."
      ],
      "modelData": {
        "type": "before_after",
        "bars": [
          {
            "label": "Initial Basin",
            "value": 120,
            "color": "#3498db"
          },
          {
            "label": "Evaporated",
            "value": 35,
            "color": "#e74c3c"
          },
          {
            "label": "Remaining",
            "value": 85,
            "color": "#2ecc71"
          }
        ],
        "finalValue": 85,
        "label": "Remaining: 85 liters"
      }
    }
  ],
  "science_lab": {
    "title_en": "The Water Journey (Cycle) Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Solar Evaporation Stage",
        "instruction": "Identify how heat turns liquid into vapor.",
        "items": [
          {
            "label": "Liquid Water Basin",
            "target": "Ocean Surface"
          },
          {
            "label": "Solar Thermal Heat",
            "target": "Energy Source"
          },
          {
            "label": "Rising Water Vapor",
            "target": "Evaporation"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Cloud Condensation Stage",
        "instruction": "Sequence how vapors cool to form water droplets.",
        "items": [
          {
            "label": "Cool High Atmosphere",
            "target": "Chilling Zone"
          },
          {
            "label": "Gathering Droplets",
            "target": "Cloud Formation"
          },
          {
            "label": "Heavy Cloud Layer",
            "target": "Precipitation Ready"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Precipitation and Collection",
        "instruction": "Guide raindrops from sky back to ocean basin.",
        "items": [
          {
            "label": "Falling Raindrops",
            "target": "Precipitation"
          },
          {
            "label": "Mountain Stream",
            "target": "Runoff Flow"
          },
          {
            "label": "Coastal Estuary",
            "target": "Ocean Return"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
