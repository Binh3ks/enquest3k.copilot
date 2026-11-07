/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 46 | Theme: "The Pattern Code (Logic)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.169Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
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
