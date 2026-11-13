/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 46 | Theme: "The Pattern Code (Logic)" | CEFR: "A2 Flyers"
 * Updated: 2026-11-13T04:18:06.389Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 46,
  "theme": "The Pattern Code (Logic)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "A pattern repeats shapes and colors using a clear rule.",
      "options": [
        "repeats",
        "repeat",
        "repeating"
      ],
      "answer": "repeats",
      "explanation": "Use 3rd person singular 'repeats' with singular subject 'A pattern'."
    },
    {
      "sentence": "If the tile is a square, then the color is red.",
      "options": [
        "is",
        "are",
        "were"
      ],
      "answer": "is",
      "explanation": "Use singular verb 'is' with singular subject 'the tile'."
    },
    {
      "sentence": "Look closely at the sequence to find what comes next.",
      "options": [
        "comes",
        "come",
        "coming"
      ],
      "answer": "comes",
      "explanation": "Use 3rd person singular 'comes' with interrogative pronoun 'what'."
    },
    {
      "sentence": "Arrange the geometric tokens in the exact right order.",
      "options": [
        "order",
        "ordered",
        "ordering"
      ],
      "answer": "order",
      "explanation": "Use noun 'order' in the prepositional phrase 'in the exact right order'."
    },
    {
      "sentence": "Can you predict which colored shape completes the puzzle?",
      "options": [
        "predict",
        "predicts",
        "predicted"
      ],
      "answer": "predict",
      "explanation": "Use bare infinitive 'predict' after modal verb 'can'."
    }
  ],
  "singapore_math": [
    {
      "id": "w46_p1",
      "type": "part_whole",
      "title": "Beads in the Repeating Necklace",
      "question": "Noah used 36 red beads and 24 blue beads to make a long pattern necklace. How many beads are on the necklace in total?",
      "storyContext": "Noah counts all the beads threaded on the silver wire before tying the knot.",
      "modelData": {
        "bars": [
          {
            "label": "Red Beads",
            "value": 36,
            "color": "#ef4444"
          },
          {
            "label": "Blue Beads",
            "value": 24,
            "color": "#3b82f6"
          }
        ],
        "total": 60,
        "unit": "beads"
      },
      "target_answer": 60,
      "unit": "beads",
      "steps": [
        "Count the red beads: 36 beads.",
        "Add the blue beads: 24 beads.",
        "36 + 24 = 60 beads in total."
      ]
    },
    {
      "id": "w46_p2",
      "type": "comparison",
      "title": "Comparing Pattern Tile Counts",
      "question": "The arcade puzzle board has 45 square tiles and 27 triangular tiles. How many more square tiles are there than triangular tiles?",
      "storyContext": "Lily sorts the wooden puzzle pieces into compartments before starting the next challenge.",
      "modelData": {
        "bars": [
          {
            "label": "Square Tiles",
            "value": 45,
            "color": "#10b981"
          },
          {
            "label": "Triangular Tiles",
            "value": 27,
            "color": "#a855f7"
          }
        ],
        "difference": 18,
        "unit": "tiles"
      },
      "target_answer": 18,
      "unit": "tiles",
      "steps": [
        "Start with the 45 square tiles.",
        "Subtract the 27 triangular tiles.",
        "45 - 27 = 18 more square tiles."
      ]
    },
    {
      "id": 3,
      "title": "Problem 3: Binary Code Matrix Grid (Part-Whole)",
      "difficulty": "easy",
      "type": "part_whole",
      "problemText": "In a digital puzzle matrix, there are 54 green code chips and 46 gold code chips. How many total code chips are inserted into the matrix?",
      "question": "In a digital puzzle matrix, there are 54 green code chips and 46 gold code chips. How many total code chips are inserted into the matrix?",
      "correctAnswer": 100,
      "target_answer": 100,
      "unit": "chips",
      "hintText": "Add green code chips (54) and gold code chips (46) together.",
      "steps": [
        "Green chips: 54.",
        "Gold chips: 46.",
        "Total code chips: 54 + 46 = 100 chips."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Green: 54",
            "value": 54,
            "color": "#10b981"
          },
          {
            "label": "Gold: 46",
            "value": 46,
            "color": "#f59e0b"
          }
        ],
        "totalLabel": "Total: 100 chips"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Logic Algorithm Cycles (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "Algorithm Alpha completed 72 logic cycles in one minute, while Algorithm Beta completed 48 logic cycles. How many more cycles did Algorithm Alpha complete?",
      "question": "Algorithm Alpha completed 72 logic cycles in one minute, while Algorithm Beta completed 48 logic cycles. How many more cycles did Algorithm Alpha complete?",
      "correctAnswer": 24,
      "target_answer": 24,
      "unit": "cycles",
      "hintText": "Subtract Algorithm Beta cycles (48) from Algorithm Alpha cycles (72).",
      "steps": [
        "Algorithm Alpha: 72 cycles.",
        "Algorithm Beta: 48 cycles.",
        "Difference: 72 - 48 = 24 more cycles."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Alpha: 72",
            "value": 72,
            "color": "#6366f1"
          },
          {
            "label": "Beta: 48",
            "value": 48,
            "color": "#64748b"
          }
        ],
        "differenceLabel": "24 more cycles"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Pattern Bead Necklace Goal (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "Sophia needs 120 patterned beads to finish an ornamental code belt. She has strung 45 striped beads and 40 dotted beads. How many more beads must she string?",
      "question": "Sophia needs 120 patterned beads to finish an ornamental code belt. She has strung 45 striped beads and 40 dotted beads. How many more beads must she string?",
      "correctAnswer": 35,
      "target_answer": 35,
      "unit": "beads",
      "hintText": "Add striped beads (45) and dotted beads (40) first. Then subtract from the 120-bead goal.",
      "steps": [
        "Strung beads: 45 + 40 = 85 beads.",
        "Remaining needed: 120 - 85 = 35 beads."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Striped: 45",
            "value": 45,
            "color": "#ec4899"
          },
          {
            "label": "Dotted: 40",
            "value": 40,
            "color": "#8b5cf6"
          },
          {
            "label": "Needed: 35",
            "value": 35,
            "color": "#cbd5e1"
          }
        ],
        "totalLabel": "Goal: 120 beads"
      }
    }
  ],
  "science_lab": {
    "title_en": "The Pattern Code (Logic) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Core Pattern Identifier",
        "diagram_type": "sequence_core_selector",
        "instruction": "Select the core repeating unit for this visual color sequence.",
        "items": [
          {
            "label": "Sequence: Red-Blue-Yellow-Red-Blue-Yellow",
            "target": "full_sequence"
          },
          {
            "label": "Core Unit: [Red - Blue - Yellow]",
            "target": "core_block"
          },
          {
            "label": "Prediction for Slot 7: Red",
            "target": "next_item"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Conditional Shape Rules",
        "diagram_type": "logic_gate_distributor",
        "instruction": "Apply the conditional logic rule: If Shape = Square -> Red; If Shape = Circle -> Blue.",
        "items": [
          {
            "label": "Input: Square Token",
            "target": "assign_red"
          },
          {
            "label": "Input: Circle Token",
            "target": "assign_blue"
          },
          {
            "label": "Input: Triangle Token",
            "target": "assign_yellow"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Pattern Code Vault Lock",
        "diagram_type": "vault_dial_sequence",
        "instruction": "Arrange the 4 colored geometric tiles in exact order to unlock the master vault.",
        "items": [
          {
            "label": "Slot 1: Red Square",
            "target": "vault_slot_1"
          },
          {
            "label": "Slot 2: Blue Circle",
            "target": "vault_slot_2"
          },
          {
            "label": "Slot 3: Yellow Triangle",
            "target": "vault_slot_3"
          },
          {
            "label": "Slot 4: Red Square",
            "target": "vault_slot_4"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
