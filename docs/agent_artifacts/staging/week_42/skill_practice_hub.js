/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 42 | Theme: "The Water Journey (Cycle)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:07.330Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 42,
  "theme": "The Water Journey (Cycle)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "First, the warm sun heats the surface of the lake.",
      "options": [
        "heats",
        "heating",
        "heated"
      ],
      "answer": "heats",
      "explanation": "Use 3rd person singular present tense 'heats' with singular subject 'the warm sun'."
    },
    {
      "sentence": "Next, invisible water vapor begins to go up into the sky.",
      "options": [
        "go up",
        "goes up",
        "going up"
      ],
      "answer": "go up",
      "explanation": "After infinitive marker 'to', use base verb form 'go up'."
    },
    {
      "sentence": "As the rising air cools, fluffy white clouds form above.",
      "options": [
        "cools",
        "cool",
        "cooling"
      ],
      "answer": "cools",
      "explanation": "Use singular verb form 'cools' with non-count singular noun 'air'."
    },
    {
      "sentence": "Heavy raindrops come down when clouds gather over the hills.",
      "options": [
        "come down",
        "comes down",
        "came down"
      ],
      "answer": "come down",
      "explanation": "Use plural verb form 'come down' with plural subject 'heavy raindrops'."
    },
    {
      "sentence": "Finally, the wide river flows steadily into the ocean.",
      "options": [
        "flows",
        "flow",
        "flowing"
      ],
      "answer": "flows",
      "explanation": "Use 3rd person singular present tense 'flows' with singular subject 'the wide river'."
    }
  ],
  "singapore_math": [
    {
      "id": "w42_p1",
      "type": "part_whole",
      "title": "Measuring Valley Stream Rainfall",
      "question": "A mountain rainstorm added 46 liters of water to the north stream and 54 liters to the south stream. How many liters of rainwater were collected in total?",
      "storyContext": "Maya checks the stream collection rain gauges after a gentle afternoon shower.",
      "modelData": {
        "bars": [
          {
            "label": "North Stream Gauge",
            "value": 46,
            "color": "#0ea5e9"
          },
          {
            "label": "South Stream Gauge",
            "value": 54,
            "color": "#3b82f6"
          }
        ],
        "total": 100,
        "unit": "liters"
      },
      "target_answer": 100,
      "unit": "liters",
      "steps": [
        "Record 46 liters from the north stream.",
        "Add 54 liters from the south stream.",
        "46 + 54 = 100 liters of water collected."
      ]
    },
    {
      "id": "w42_p2",
      "type": "comparison",
      "title": "Lake Water Level Comparison",
      "question": "The lake water level rose by 38 centimeters during rainy spring, but dropped by 15 centimeters during hot sunny summer evaporation. How many centimeters higher is the lake now compared to winter?",
      "storyContext": "Noah reads the water level measuring ruler anchored near the wooden lake pier.",
      "modelData": {
        "bars": [
          {
            "label": "Spring Rise",
            "value": 38,
            "color": "#10b981"
          },
          {
            "label": "Summer Evaporation",
            "value": 15,
            "color": "#f59e0b"
          }
        ],
        "difference": 23,
        "unit": "centimeters"
      },
      "target_answer": 23,
      "unit": "centimeters",
      "steps": [
        "Start with 38 centimeters of spring rain rise.",
        "Subtract 15 centimeters lost to summer evaporation.",
        "38 - 15 = 23 centimeters higher."
      ]
    }
  ],
  "science_lab": {
    "title_en": "The Water Journey (Cycle) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Sequencing the Water Journey",
        "diagram_type": "water_cycle_wheel",
        "instruction": "Place the four natural water cycle stages in chronological order.",
        "items": [
          {
            "label": "Sunlight Causes Evaporation",
            "target": "phase_1"
          },
          {
            "label": "Vapor Goes Up and Cools into Clouds",
            "target": "phase_2"
          },
          {
            "label": "Rain Comes Down Over Mountains",
            "target": "phase_3"
          },
          {
            "label": "River Flows Water to the Ocean",
            "target": "phase_4"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Temperature and Water States",
        "diagram_type": "temperature_chamber",
        "instruction": "Match each temperature condition to its correct water transformation.",
        "items": [
          {
            "label": "Warm Sun -> Liquid Water Evaporates",
            "target": "evaporation"
          },
          {
            "label": "Cool Sky -> Water Vapor Condenses",
            "target": "condensation"
          },
          {
            "label": "Heavy Droplets -> Precipitation Falls",
            "target": "precipitation"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Protecting Watershed Health",
        "diagram_type": "clean_water_action",
        "instruction": "Select the three positive community actions that keep rivers clean.",
        "items": [
          {
            "label": "Plant Trees Along Stream Banks",
            "target": "protect_banks"
          },
          {
            "label": "Clean Up Plastic Bottles Near Shore",
            "target": "remove_waste"
          },
          {
            "label": "Monitor Rain Gauges Regularly",
            "target": "track_data"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
