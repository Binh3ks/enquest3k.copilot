/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 79 | Theme: "The Industrial Revolution" | CEFR: B1 Preliminary
 * Generated: 2026-11-10T03:12:16.360Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 79,
  "theme": "The Industrial Revolution",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "Everyday tools were manufactured by machines in urban factories.",
      "options": [
        "were manufactured",
        "was manufactured",
        "are manufacturing"
      ],
      "answer": "were manufactured",
      "explanation": "Use plural past passive 'were manufactured' with the plural subject 'tools'."
    },
    {
      "sentence": "As a result of steam power, railway transit expanded rapidly.",
      "options": [
        "As a result of",
        "Because that",
        "Although for"
      ],
      "answer": "As a result of",
      "explanation": "Use 'As a result of' followed by a noun phrase to introduce a causal factor."
    },
    {
      "sentence": "Textile production increased due to automated mechanical equipment.",
      "options": [
        "due to",
        "because",
        "so that"
      ],
      "answer": "due to",
      "explanation": "Use 'due to' before a noun phrase to state the cause of an outcome."
    },
    {
      "sentence": "Tough iron beams were forged to construct strong railway bridges.",
      "options": [
        "were forged",
        "forged",
        "forging"
      ],
      "answer": "were forged",
      "explanation": "Use past passive 'were forged' when the iron beams receive the action."
    },
    {
      "sentence": "Consequently, industrial cities grew much faster than farming villages.",
      "options": [
        "Consequently,",
        "However,",
        "Although,"
      ],
      "answer": "Consequently,",
      "explanation": "Use 'Consequently,' as a transitional adverb to signal a logical historical result."
    }
  ],
  "singapore_math": [
    {
      "id": "w79_p1",
      "type": "part_whole",
      "title": "Calculating Daily Coal Consumption for Foundry Boilers",
      "question": "A Birmingham iron foundry burns 45 tons of coal for smelting furnaces and 35 tons of coal for steam engine boilers each day. What is the total coal consumed daily in tons?",
      "storyContext": "William calculates the foundry fuel logs to ensure steady deliveries of coal.",
      "modelData": {
        "bars": [
          {
            "label": "Smelting Furnaces",
            "value": 45,
            "color": "#475569"
          },
          {
            "label": "Engine Boilers",
            "value": 35,
            "color": "#0ea5e9"
          }
        ],
        "total": 80,
        "unit": "tons of coal"
      },
      "target_answer": 80,
      "unit": "tons of coal",
      "steps": [
        "Record the furnace fuel: 45 tons of coal.",
        "Add the boiler fuel: 35 tons of coal.",
        "45 + 35 = 80 tons of coal consumed in total."
      ]
    },
    {
      "id": "w79_p2",
      "type": "comparison",
      "title": "Comparing Cloth Output: Hand Loom vs Mechanical Loom",
      "question": "An automated mechanical loom produces 140 yards of cotton textile per day, whereas a traditional hand loom produces only 25 yards. How many more yards does the mechanical loom produce daily?",
      "storyContext": "A mill manager compares weaving yields on an industrial output chart.",
      "modelData": {
        "bars": [
          {
            "label": "Mechanical Loom",
            "value": 140,
            "color": "#10b981"
          },
          {
            "label": "Traditional Hand Loom",
            "value": 25,
            "color": "#f59e0b"
          }
        ],
        "difference": 115,
        "unit": "yards of cloth"
      },
      "target_answer": 115,
      "unit": "yards of cloth",
      "steps": [
        "Start with the mechanical loom output: 140 yards.",
        "Subtract the hand loom output: 25 yards.",
        "140 - 25 = 115 yards more produced by the mechanical loom."
      ]
    }
  ],
  "science_lab": {
    "title_en": "The Industrial Revolution Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Steam Engine Mechanics & Condenser Cycle",
        "diagram_type": "steam_boiler_piston_cycle",
        "instruction": "Identify the core mechanical components that convert boiling steam into engine motion.",
        "items": [
          {
            "label": "Coal Furnace Boiler",
            "target": "heat_source"
          },
          {
            "label": "High-Pressure Piston Cylinder",
            "target": "motion_drive"
          },
          {
            "label": "Separate Cooling Condenser",
            "target": "efficiency_cycle"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Textile Mill Automated Power Drive",
        "diagram_type": "factory_pulley_distribution",
        "instruction": "Route rotational steam power through driveshafts and leather belts to automated looms.",
        "items": [
          {
            "label": "Central Steam Driveshaft",
            "target": "main_power"
          },
          {
            "label": "Tensioned Leather Belt",
            "target": "power_transfer"
          },
          {
            "label": "Automated Weaving Shuttle",
            "target": "textile_loom"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Industrial Railway Transport Network",
        "diagram_type": "freight_logistics_rail_link",
        "instruction": "Connect coal mines, iron foundries, and coastal shipping docks using freight trains.",
        "items": [
          {
            "label": "Coal Colliery Loading Depot",
            "target": "raw_materials"
          },
          {
            "label": "Steam Freight Locomotive",
            "target": "rail_transport"
          },
          {
            "label": "Coastal Export Maritime Dock",
            "target": "global_shipping"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
