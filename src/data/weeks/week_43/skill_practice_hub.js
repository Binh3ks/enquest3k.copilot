/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 43 | Theme: "The "Plus" Machine (Addition Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.165Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 43,
  "theme": "The \"Plus\" Machine (Addition Language)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "Four plus five equals nine on the chalkboard.",
      "options": [
        "equals",
        "equal",
        "equaling"
      ],
      "answer": "equals",
      "explanation": "Use 3rd person singular 'equals' when stating mathematical equations."
    },
    {
      "sentence": "We can combine two groups of blocks together.",
      "options": [
        "combine",
        "combines",
        "combined"
      ],
      "answer": "combine",
      "explanation": "Use bare infinitive 'combine' after the modal auxiliary 'can'."
    },
    {
      "sentence": "If you add three red marbles, you get seven.",
      "options": [
        "add",
        "adds",
        "added"
      ],
      "answer": "add",
      "explanation": "Use base verb 'add' with subject 'you' in present conditional."
    },
    {
      "sentence": "The total number of wooden blocks is twenty.",
      "options": [
        "is",
        "are",
        "were"
      ],
      "answer": "is",
      "explanation": "Use singular verb 'is' with the singular head noun 'The total number'."
    },
    {
      "sentence": "Six and four make ten blocks altogether.",
      "options": [
        "altogether",
        "almost",
        "already"
      ],
      "answer": "altogether",
      "explanation": "Use adverb 'altogether' meaning 'in total sum'."
    }
  ],
  "singapore_math": [
    {
      "id": "w43_p1",
      "type": "part_whole",
      "title": "Combining Workshop Marbles",
      "question": "Alex dropped 25 red marbles into the Plus Machine and Mia dropped 15 blue marbles. How many marbles did they combine in total?",
      "storyContext": "Alex and Mia tally the total marbles collected in the wooden tray.",
      "modelData": {
        "bars": [
          {
            "label": "Red Marbles",
            "value": 25,
            "color": "#ef4444"
          },
          {
            "label": "Blue Marbles",
            "value": 15,
            "color": "#3b82f6"
          }
        ],
        "total": 40,
        "unit": "marbles"
      },
      "target_answer": 40,
      "unit": "marbles",
      "steps": [
        "Count the red marbles: 25 marbles.",
        "Add the blue marbles: 15 marbles.",
        "25 + 15 = 40 marbles in total."
      ]
    },
    {
      "id": "w43_p2",
      "type": "part_whole",
      "title": "Wooden Blocks for the Tower",
      "question": "The students stacked 32 yellow blocks and 28 green blocks to build a tower. How many blocks did they use altogether?",
      "storyContext": "Mr. Davis measures the tall tower built from combined wooden toy blocks.",
      "modelData": {
        "bars": [
          {
            "label": "Yellow Blocks",
            "value": 32,
            "color": "#eab308"
          },
          {
            "label": "Green Blocks",
            "value": 28,
            "color": "#22c55e"
          }
        ],
        "total": 60,
        "unit": "blocks"
      },
      "target_answer": 60,
      "unit": "blocks",
      "steps": [
        "Take the yellow blocks: 32 blocks.",
        "Add the green blocks: 28 blocks.",
        "32 + 28 = 60 blocks altogether."
      ]
    }
  ],
  "science_lab": {
    "title_en": "The \"Plus\" Machine (Addition Language) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Addition Sentence Builder",
        "diagram_type": "equation_builder_slots",
        "instruction": "Drag the numbers and math words into the correct slots to make a true sentence.",
        "items": [
          {
            "label": "Number Slot: 4",
            "target": "first_number"
          },
          {
            "label": "Math Word: plus",
            "target": "math_operator"
          },
          {
            "label": "Number Slot: 3",
            "target": "second_number"
          },
          {
            "label": "Verb Slot: equals 7",
            "target": "sum_result"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Machine Chute Sorting",
        "diagram_type": "dual_chute_distributor",
        "instruction": "Sort the items into Chute A and Chute B before pulling the combine lever.",
        "items": [
          {
            "label": "5 Red Glass Spheres",
            "target": "chute_a"
          },
          {
            "label": "5 Blue Glass Spheres",
            "target": "chute_b"
          },
          {
            "label": "Combined Output Tray: 10 Spheres",
            "target": "tray_result"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Total Sum Verification",
        "diagram_type": "math_scale_balance",
        "instruction": "Match each addition equation to its correct total sum.",
        "items": [
          {
            "label": "12 plus 8",
            "target": "equals_20"
          },
          {
            "label": "15 plus 15",
            "target": "equals_30"
          },
          {
            "label": "24 plus 6",
            "target": "equals_30"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
