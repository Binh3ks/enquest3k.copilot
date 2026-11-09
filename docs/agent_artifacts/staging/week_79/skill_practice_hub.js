/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 79 | Theme: "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.703Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 79,
  "theme": "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "Yes, space research is inspiring, but Earth restoration is more urgent.",
      "options": [
        "Yes, but",
        "Because so",
        "Although if"
      ],
      "answer": "Yes, but",
      "explanation": "Use 'Yes, but...' as a conversational rebuttal structure to acknowledge a point before disagreeing."
    },
    {
      "sentence": "Public funds should be allocated toward preserving our only planet.",
      "options": [
        "allocated",
        "allocate",
        "allocating"
      ],
      "answer": "allocated",
      "explanation": "After 'should be' in passive voice, use the past participle 'allocated'."
    },
    {
      "sentence": "Weather satellites are designed to monitor atmospheric changes.",
      "options": [
        "are designed",
        "designed",
        "designing"
      ],
      "answer": "are designed",
      "explanation": "Use present passive 'are designed' when the subject receives the action."
    },
    {
      "sentence": "Restoring biodiversity is far more critical than building lunar colonies.",
      "options": [
        "more critical",
        "most critical",
        "critical"
      ],
      "answer": "more critical",
      "explanation": "Use the comparative 'more critical' followed by 'than' to compare two priorities."
    },
    {
      "sentence": "Saving endangered wetlands is an urgent environmental responsibility.",
      "options": [
        "urgent",
        "urgently",
        "urgency"
      ],
      "answer": "urgent",
      "explanation": "Use the adjective 'urgent' before the noun phrase 'environmental responsibility'."
    }
  ],
  "singapore_math": [
    {
      "id": "w79_p1",
      "type": "part_whole",
      "title": "Comparing Budget Allocations between Space Research and Clean Energy",
      "question": "A national science council allocates 65 million dollars to satellite climate monitoring and 85 million dollars to community reforestation. What is the total environmental budget in millions of dollars?",
      "storyContext": "Kevin analyzes public budget graphs for his debate rebuttal on environmental priorities.",
      "modelData": {
        "bars": [
          {
            "label": "Satellite Observation",
            "value": 65,
            "color": "#3b82f6"
          },
          {
            "label": "Reforestation Grants",
            "value": 85,
            "color": "#10b981"
          }
        ],
        "total": 150,
        "unit": "million dollars"
      },
      "target_answer": 150,
      "unit": "million dollars",
      "steps": [
        "Take the satellite monitoring allocation: 65 million dollars.",
        "Add the reforestation allocation: 85 million dollars.",
        "65 + 85 = 150 million dollars in total."
      ]
    },
    {
      "id": "w79_p2",
      "type": "comparison",
      "title": "Comparing Tree Planting Target vs Actual Progress",
      "question": "Nora's reforestation team set a target to plant 190 thousand trees this season. By October, they had planted 125 thousand trees. How many more trees must be planted to meet the target?",
      "storyContext": "Nora tallies coastal mangrove saplings on a progress comparison chart.",
      "modelData": {
        "bars": [
          {
            "label": "Seasonal Target",
            "value": 190,
            "color": "#047857"
          },
          {
            "label": "Planted to Date",
            "value": 125,
            "color": "#10b981"
          }
        ],
        "difference": 65,
        "unit": "thousand trees"
      },
      "target_answer": 65,
      "unit": "thousand trees",
      "steps": [
        "Start with the seasonal target: 190 thousand trees.",
        "Subtract the trees planted to date: 125 thousand trees.",
        "190 - 125 = 65 thousand trees remaining."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Social Studies/ELA: Space Exploration vs Earth Restoration / Math: Micro-Debate Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Satellite Telemetry & Earth Monitoring",
        "diagram_type": "orbital_satellite_telemetry",
        "instruction": "Select orbital data layers that assist climate scientists on Earth.",
        "items": [
          {
            "label": "Atmospheric CO2 Sensors",
            "target": "telemetry"
          },
          {
            "label": "Thermal Forest Fire Scanners",
            "target": "infrared"
          },
          {
            "label": "Radar Sea Level Altimeters",
            "target": "oceanography"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Biodiversity & Reforestation Carbon Sinks",
        "diagram_type": "reforestation_carbon_plot",
        "instruction": "Route agricultural land into multi-tiered native rainforest restoration.",
        "items": [
          {
            "label": "Pioneer Broadleaf Seedlings",
            "target": "canopy_layer"
          },
          {
            "label": "Wetland Mangrove Buffer",
            "target": "coastal_protection"
          },
          {
            "label": "Soil Humus Carbon Storage",
            "target": "carbon_sink"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Synthesizing Space and Earth Funding",
        "diagram_type": "integrated_budget_flow",
        "instruction": "Balance public funds between space-based observation and terrestrial conservation.",
        "items": [
          {
            "label": "Orbital Climate Monitoring",
            "target": "space_tech"
          },
          {
            "label": "Renewable Energy Grid Transition",
            "target": "earth_action"
          },
          {
            "label": "Sustainable Planetary Harmony",
            "target": "equilibrium"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
