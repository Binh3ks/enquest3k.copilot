/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 127 | Theme: "Global Climate Systems & Renewable Energy" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.311Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 127,
  "theme": "Global Climate Systems & Renewable Energy",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "If nations had invested earlier, emissions would be lower today.",
      "options": [
        "would be",
        "will be",
        "had been"
      ],
      "answer": "would be",
      "explanation": "Mixed conditional (past action, present result) uses 'had + past participle' in if-clause and 'would + base verb' in main clause."
    },
    {
      "sentence": "Clara presented strong evidence to counter the opponent's argument.",
      "options": [
        "to counter",
        "countering",
        "countered"
      ],
      "answer": "to counter",
      "explanation": "Use the infinitive of purpose 'to counter' to explain the reason for presenting evidence."
    },
    {
      "sentence": "Scientists disagree on the optimal timeline for grid modernization.",
      "options": [
        "disagree",
        "disagrees",
        "disagreeing"
      ],
      "answer": "disagree",
      "explanation": "Plural subject 'Scientists' takes plural base verb 'disagree'."
    },
    {
      "sentence": "It is true that solar module manufacturing costs have fallen.",
      "options": [
        "is true",
        "are true",
        "being true"
      ],
      "answer": "is true",
      "explanation": "Impersonal structure 'It is true that' requires singular auxiliary 'is'."
    },
    {
      "sentence": "The claim that renewable power causes instability is completely false.",
      "options": [
        "is",
        "are",
        "were"
      ],
      "answer": "is",
      "explanation": "Singular subject 'The claim' takes singular verb 'is'."
    }
  ],
  "singapore_math": [
    {
      "id": "w127_p1",
      "type": "part_whole",
      "title": "Regional Renewable Power Generation",
      "question": "A coastal regional grid receives 480 megawatts from offshore wind turbines and 320 megawatts from solar photovoltaic farms. What is the total renewable power generated in megawatts?",
      "storyContext": "Clara tallies live grid telemetry on the central control room monitors.",
      "modelData": {
        "bars": [
          {
            "label": "Wind Turbines",
            "value": 480,
            "color": "#0ea5e9"
          },
          {
            "label": "Solar Farms",
            "value": 320,
            "color": "#f59e0b"
          }
        ],
        "total": 800,
        "unit": "megawatts"
      },
      "target_answer": 800,
      "unit": "megawatts",
      "steps": [
        "Take 480 megawatts from offshore wind.",
        "Add 320 megawatts from solar farms.",
        "480 + 320 = 800 megawatts in total."
      ]
    },
    {
      "id": "w127_p2",
      "type": "comparison",
      "title": "Carbon Emissions Reduction Comparison",
      "question": "A coal plant produced 750 metric tons of carbon emissions daily, whereas an upgraded geothermal plant produces only 50 metric tons. By how many metric tons were daily carbon emissions reduced?",
      "storyContext": "Dr. Thorne evaluates emission logs after replacing a decommissioned boiler.",
      "modelData": {
        "bars": [
          {
            "label": "Coal Boiler",
            "value": 750,
            "color": "#ef4444"
          },
          {
            "label": "Geothermal Plant",
            "value": 50,
            "color": "#10b981"
          }
        ],
        "difference": 700,
        "unit": "metric tons"
      },
      "target_answer": 700,
      "unit": "metric tons",
      "steps": [
        "Start with 750 metric tons from the coal boiler.",
        "Subtract 50 metric tons from the geothermal plant.",
        "750 - 50 = 700 metric tons reduction."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Global Climate Systems & Renewable Energy Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Renewable vs Fossil Energy Systems",
        "diagram_type": "energy_classification",
        "instruction": "Sort each generation technology into Renewable or Fossil Fuel categories.",
        "items": [
          {
            "label": "Offshore Wind Turbine",
            "target": "renewable"
          },
          {
            "label": "Photovoltaic Solar Farm",
            "target": "renewable"
          },
          {
            "label": "Coal-Fired Boiler",
            "target": "fossil_fuel"
          },
          {
            "label": "Natural Gas Peaker",
            "target": "fossil_fuel"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Smart Grid Power Balancing",
        "diagram_type": "grid_balance_loop",
        "instruction": "Trace the flow of electricity during midday peak generation hours.",
        "items": [
          {
            "label": "Solar Farms Generate Excess Midday Power",
            "target": "step_1"
          },
          {
            "label": "Battery Storage Stores Surplus Energy",
            "target": "step_2"
          },
          {
            "label": "Discharge to Cities During Evening Peak",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Climate Policy Implementation",
        "diagram_type": "policy_milestones",
        "instruction": "Order the stages required to enact a national renewable energy transition.",
        "items": [
          {
            "label": "Empirical Emissions Audit",
            "target": "stage_1"
          },
          {
            "label": "Smart Grid Infrastructure Upgrade",
            "target": "stage_2"
          },
          {
            "label": "Phase Out Obsolete Coal Subsidies",
            "target": "stage_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
