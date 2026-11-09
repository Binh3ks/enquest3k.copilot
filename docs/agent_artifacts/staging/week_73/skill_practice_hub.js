/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 73 | Theme: "Science/ELA: The Water Cycle (Advanced) / Math: Volume" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.694Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 73,
  "theme": "Science/ELA: The Water Cycle (Advanced) / Math: Volume",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "The sun warms the lake; subsequently, water vapor ascends into the sky.",
      "options": [
        "subsequently",
        "prior",
        "yesterday"
      ],
      "answer": "subsequently",
      "explanation": "Use 'subsequently' as an advanced sequence connector to show what happens next."
    },
    {
      "sentence": "Following this condensation stage, heavy clouds produce precipitation.",
      "options": [
        "Following",
        "Followed",
        "Follows"
      ],
      "answer": "Following",
      "explanation": "Use 'Following this [noun]' as a formal sequence transition phrase."
    },
    {
      "sentence": "Eventually, mountain runoff collects in the valley reservoir.",
      "options": [
        "Eventually",
        "Eventual",
        "Events"
      ],
      "answer": "Eventually",
      "explanation": "Use the adverb 'Eventually' to introduce the final outcome of a process."
    },
    {
      "sentence": "Millions of tiny droplets combine to form dense clouds.",
      "options": [
        "droplets",
        "dropsy",
        "drop"
      ],
      "answer": "droplets",
      "explanation": "The noun 'droplets' refers to microscopic spheres of condensed liquid."
    },
    {
      "sentence": "The water cycle is a continuous process that circulates around the globe.",
      "options": [
        "continuous",
        "continually",
        "continuation"
      ],
      "answer": "continuous",
      "explanation": "Use the adjective 'continuous' before the noun 'process'."
    }
  ],
  "singapore_math": [
    {
      "id": "w73_p1",
      "type": "part_whole",
      "title": "Calculating Reservoir Water Volume in Cubic Units",
      "question": "A water storage section at the Jade Creek Reservoir is built using cubic blocks. The lower level contains 120 cubic units of storage and the upper expansion adds 80 cubic units. What is the total volume in cubic units?",
      "storyContext": "Dr. Aris calculates the total capacity of the concrete holding tank before the rainy season begins.",
      "modelData": {
        "bars": [
          {
            "label": "Lower Section",
            "value": 120,
            "color": "#0ea5e9"
          },
          {
            "label": "Upper Expansion",
            "value": 80,
            "color": "#38bdf8"
          }
        ],
        "total": 200,
        "unit": "cubic units"
      },
      "target_answer": 200,
      "unit": "cubic units",
      "steps": [
        "Take the lower storage section: 120 cubic units.",
        "Add the upper expansion volume: 80 cubic units.",
        "120 + 80 = 200 cubic units in total capacity."
      ]
    },
    {
      "id": "w73_p2",
      "type": "comparison",
      "title": "Comparing Precipitation in Two Valley Sectors",
      "question": "Sector A collected 155 cubic meters of rainwater while Sector B collected 95 cubic meters. How many more cubic meters of water did Sector A collect than Sector B?",
      "storyContext": "Maya compares rainfall collection across two valley monitoring stations.",
      "modelData": {
        "bars": [
          {
            "label": "Sector A Collection",
            "value": 155,
            "color": "#0284c7"
          },
          {
            "label": "Sector B Collection",
            "value": 95,
            "color": "#64748b"
          }
        ],
        "difference": 60,
        "unit": "cubic meters"
      },
      "target_answer": 60,
      "unit": "cubic meters",
      "steps": [
        "Start with Sector A's collection: 155 cubic meters.",
        "Subtract Sector B's collection: 95 cubic meters.",
        "155 - 95 = 60 cubic meters difference."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Science/ELA: The Water Cycle (Advanced) / Math: Volume Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Evaporation & Transpiration Energy",
        "diagram_type": "evaporation_chamber",
        "instruction": "Select the correct atmospheric inputs that cause water to turn into vapor.",
        "items": [
          {
            "label": "Solar Thermal Energy",
            "target": "heat_source"
          },
          {
            "label": "Plant Stomata Release",
            "target": "transpiration"
          },
          {
            "label": "Rising Warm Vapor",
            "target": "gas_phase"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Condensation & Cloud Droplet Formation",
        "diagram_type": "condensation_column",
        "instruction": "Sequence the steps of cloud condensation in high altitudes.",
        "items": [
          {
            "label": "Warm Vapor Ascends",
            "target": "step_1"
          },
          {
            "label": "Cool Air Temperature",
            "target": "step_2"
          },
          {
            "label": "Droplets Combine into Clouds",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Runoff & Aquifer Collection",
        "diagram_type": "basin_collection",
        "instruction": "Route precipitation into surface reservoirs and subterranean groundwater.",
        "items": [
          {
            "label": "Surface River Inflow",
            "target": "reservoir"
          },
          {
            "label": "Soil Water Infiltration",
            "target": "groundwater"
          },
          {
            "label": "Evaporation Loop Reset",
            "target": "cycle"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
