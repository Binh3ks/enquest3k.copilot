/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 79 | Theme: "The Industrial Revolution" | CEFR: B1 PET
 * Generated: 2026-11-10T04:07:36.004Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 79,
  "theme": "The Industrial Revolution",
  "cefr_level": "B1 PET",
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
      "title": "Problem 1: Bar Graph of Daily Coal Deliveries",
      "question": "A bar graph shows coal deliveries to a factory. The smelting furnace received 45 tons and the steam engine received 35 tons. What was the total coal delivered on the chart?",
      "storyContext": "William records daily coal deliveries on a bar graph chart.",
      "modelData": {
        "bars": [
          {
            "label": "Smelting Furnace",
            "value": 45,
            "color": "#475569"
          },
          {
            "label": "Steam Engine",
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
        "Read the bar graph value for furnace: 45 tons.",
        "Read the engine bar: 35 tons.",
        "Calculate total: 45 + 35 = 80 tons."
      ]
    },
    {
      "id": "w79_p2",
      "type": "comparison",
      "title": "Problem 2: Representing Cloth Output on a Chart",
      "question": "A factory chart compares weaving output. A mechanical loom produced 140 yards of cloth while a hand loom produced 25 yards. How many more yards did the mechanical loom produce?",
      "storyContext": "A mill manager compares machine output on a data chart.",
      "modelData": {
        "bars": [
          {
            "label": "Mechanical Loom",
            "value": 140,
            "color": "#10b981"
          },
          {
            "label": "Hand Loom",
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
        "Mechanical loom bar: 140 yards.",
        "Hand loom bar: 25 yards.",
        "140 - 25 = 115 yards difference."
      ]
    },
    {
      "id": "w79_p3",
      "type": "part_whole",
      "title": "Problem 3: Representing Shift Attendance on a Frequency Table",
      "question": "A frequency table represents factory workers on duty. Shift A has 120 workers and Shift B has 80 workers. How many workers are represented altogether on the table?",
      "storyContext": "The supervisor plots worker attendance data.",
      "modelData": {
        "bars": [
          {
            "label": "Shift A",
            "value": 120,
            "color": "#6366f1"
          },
          {
            "label": "Shift B",
            "value": 80,
            "color": "#a855f7"
          }
        ],
        "total": 200,
        "unit": "workers"
      },
      "target_answer": 200,
      "unit": "workers",
      "steps": [
        "Shift A count: 120 workers.",
        "Shift B count: 80 workers.",
        "120 + 80 = 200 workers in total."
      ]
    },
    {
      "id": "w79_p4",
      "type": "comparison",
      "title": "Problem 4: Bar Graph Comparison of Iron Production",
      "question": "A bar chart represents iron ingots produced by two foundries. Foundry 1 cast 95 ingots and Foundry 2 cast 60 ingots. What is the difference shown on the vertical axis?",
      "storyContext": "Foundry logs track monthly ingot production.",
      "modelData": {
        "bars": [
          {
            "label": "Foundry 1",
            "value": 95,
            "color": "#0284c7"
          },
          {
            "label": "Foundry 2",
            "value": 60,
            "color": "#ea580c"
          }
        ],
        "difference": 35,
        "unit": "iron ingots"
      },
      "target_answer": 35,
      "unit": "iron ingots",
      "steps": [
        "Foundry 1 bar height: 95 ingots.",
        "Foundry 2 bar height: 60 ingots.",
        "95 - 60 = 35 ingots difference."
      ]
    },
    {
      "id": "w79_p5",
      "type": "part_whole",
      "title": "Problem 5: Data Summary of Locomotive Trips",
      "question": "A railway data summary shows locomotive trips. In the first half of the month, the train made 40 trips. In the second half, it made 50 trips. How many trips are represented on the monthly summary?",
      "storyContext": "The stationmaster charts freight train journeys.",
      "modelData": {
        "bars": [
          {
            "label": "First Half",
            "value": 40,
            "color": "#14b8a6"
          },
          {
            "label": "Second Half",
            "value": 50,
            "color": "#f43f5e"
          }
        ],
        "total": 90,
        "unit": "trips"
      },
      "target_answer": 90,
      "unit": "trips",
      "steps": [
        "First half trips: 40.",
        "Second half trips: 50.",
        "40 + 50 = 90 total trips."
      ]
    }
  ],
  "science_lab": {
    "title_en": "The Industrial Revolution Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Steam Boiler Pressure Mechanics",
        "diagram_type": "steam_boiler_pressure",
        "instruction": "Assemble the high-pressure steam boiler components to drive the piston.",
        "items": [
          {
            "label": "Coal Firebox",
            "target": "heat_source"
          },
          {
            "label": "Pressurized Water Chamber",
            "target": "boiler_core"
          },
          {
            "label": "Safety Relief Valve",
            "target": "exhaust_port"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Mechanical Loom Shuttle Assembly",
        "diagram_type": "mechanical_loom_shuttle",
        "instruction": "Arrange the automated loom parts to weave cotton cloth continuously.",
        "items": [
          {
            "label": "Yarn Spindle Beam",
            "target": "warp_feed"
          },
          {
            "label": "Flying Shuttle Mechanism",
            "target": "weft_slider"
          },
          {
            "label": "Beater Comb",
            "target": "fabric_roller"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Locomotive Traction on Iron Rails",
        "diagram_type": "locomotive_wheel_traction",
        "instruction": "Fit the flanged wheel and drive crank onto the iron track for smooth hauling.",
        "items": [
          {
            "label": "Smooth Iron Rail",
            "target": "track_base"
          },
          {
            "label": "Flanged Guide Wheel",
            "target": "wheel_rim"
          },
          {
            "label": "Piston Connecting Rod",
            "target": "crank_axis"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
