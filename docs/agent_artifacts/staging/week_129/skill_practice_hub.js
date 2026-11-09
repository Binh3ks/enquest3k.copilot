/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 129 | Theme: "Architecture of the Future: Megacities & Sustainability" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.313Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 129,
  "theme": "Architecture of the Future: Megacities & Sustainability",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "By 2050, planners will have constructed self-cooling skyscrapers.",
      "options": [
        "will have constructed",
        "will construct",
        "are constructing"
      ],
      "answer": "will have constructed",
      "explanation": "Future Perfect ('will have + past participle') indicates an action completed before a specified future time point ('By 2050')."
    },
    {
      "sentence": "Millions of citizens will be living in eco-districts by mid-century.",
      "options": [
        "will be living",
        "will have lived",
        "lived"
      ],
      "answer": "will be living",
      "explanation": "Future Continuous ('will be + verb-ing') describes an ongoing activity taking place at a specific future period."
    },
    {
      "sentence": "Modular construction techniques allow apartments to be built quickly.",
      "options": [
        "allow",
        "allows",
        "allowing"
      ],
      "answer": "allow",
      "explanation": "Plural subject 'techniques' takes plural base verb 'allow'."
    },
    {
      "sentence": "Passive ventilation draws cool breezes into the central atrium naturally.",
      "options": [
        "draws",
        "draw",
        "drawing"
      ],
      "answer": "draws",
      "explanation": "Singular non-count subject 'Passive ventilation' requires 3rd person singular verb 'draws'."
    },
    {
      "sentence": "Pedestrian skybridges eliminate the necessity for street crossings.",
      "options": [
        "eliminate",
        "eliminates",
        "eliminated"
      ],
      "answer": "eliminate",
      "explanation": "Plural subject 'skybridges' takes base plural verb 'eliminate'."
    }
  ],
  "singapore_math": [
    {
      "id": "w129_p1",
      "type": "part_whole",
      "title": "Vertical Forest Tower Floor Allocation",
      "question": "A sustainable skyscraper has 42 floors dedicated to residential modular apartments and 18 floors reserved for vertical hydroponic farms. How many total operational floors does the tower possess?",
      "storyContext": "Julian tallies structural zoning floor areas on the architectural blueprint.",
      "modelData": {
        "bars": [
          {
            "label": "Residential Floors",
            "value": 42,
            "color": "#3b82f6"
          },
          {
            "label": "Vertical Farms",
            "value": 18,
            "color": "#10b981"
          }
        ],
        "total": 60,
        "unit": "floors"
      },
      "target_answer": 60,
      "unit": "floors",
      "steps": [
        "Take 42 residential modular floors.",
        "Add 18 vertical hydroponic farm floors.",
        "42 + 18 = 60 floors in total."
      ]
    },
    {
      "id": "w129_p2",
      "type": "comparison",
      "title": "Commuter Travel Time Optimization",
      "question": "Traditional street-level bus commutes through city traffic averaged 65 minutes, whereas the direct elevated skybridge walk requires only 20 minutes. By how many minutes was average commute duration reduced?",
      "storyContext": "Maya analyzes pedestrian mobility data across the newly interconnected district.",
      "modelData": {
        "bars": [
          {
            "label": "Bus Commute",
            "value": 65,
            "color": "#ef4444"
          },
          {
            "label": "Skybridge Walk",
            "value": 20,
            "color": "#06b6d4"
          }
        ],
        "difference": 45,
        "unit": "minutes"
      },
      "target_answer": 45,
      "unit": "minutes",
      "steps": [
        "Start with 65 minutes of traditional bus transit.",
        "Subtract 20 minutes for the elevated skybridge walk.",
        "65 - 20 = 45 minutes saved per commute."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Architecture of the Future: Megacities & Sustainability Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Sustainable Architecture Elements",
        "diagram_type": "tower_systems_schematic",
        "instruction": "Match each innovative building feature to its ecological function.",
        "items": [
          {
            "label": "Balcony Hydroponics -> Local Food Production",
            "target": "food"
          },
          {
            "label": "Central Aeration Atrium -> Passive Cooling",
            "target": "cooling"
          },
          {
            "label": "Photovoltaic Glazing -> Clean Electricity",
            "target": "energy"
          },
          {
            "label": "Basement Geothermal Loop -> Thermal Regulation",
            "target": "heating"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Pedestrian Transit Zoning",
        "diagram_type": "mobility_network",
        "instruction": "Trace the commuter path from modular apartment to transit station.",
        "items": [
          {
            "label": "Exit Modular Apartment",
            "target": "step_1"
          },
          {
            "label": "Walk Across Elevated Skybridge",
            "target": "step_2"
          },
          {
            "label": "Board Magnetic Levitation Train",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Megacity Master Planning Milestones",
        "diagram_type": "zoning_approval_ladder",
        "instruction": "Order the statutory stages required for municipal eco-district ratification.",
        "items": [
          {
            "label": "Wind & Solar Environmental Audit",
            "target": "phase_1"
          },
          {
            "label": "Structural Composite Stress Testing",
            "target": "phase_2"
          },
          {
            "label": "City Council Zoning Ratification",
            "target": "phase_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
