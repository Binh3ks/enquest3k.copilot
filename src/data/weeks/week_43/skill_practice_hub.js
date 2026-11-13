/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 43 | Theme: "The \"Plus\" Machine (Addition Language)" | CEFR: "A2 Flyers"
 * Updated: 2026-11-13T04:18:06.388Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
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
    },
    {
      "id": 3,
      "title": "Problem 3: Gear Wheel Teeth Difference (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "The primary gear inside the Plus Machine has 48 teeth, while the secondary drive gear has 33 teeth. How many more teeth does the primary gear have than the secondary gear?",
      "question": "The primary gear inside the Plus Machine has 48 teeth, while the secondary drive gear has 33 teeth. How many more teeth does the primary gear have than the secondary gear?",
      "correctAnswer": 15,
      "target_answer": 15,
      "unit": "teeth",
      "hintText": "Subtract secondary gear teeth (33) from primary gear teeth (48).",
      "steps": [
        "Primary gear: 48 teeth.",
        "Secondary gear: 33 teeth.",
        "Difference: 48 - 33 = 15 teeth."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Primary: 48",
            "value": 48,
            "color": "#6366f1"
          },
          {
            "label": "Secondary: 33",
            "value": 33,
            "color": "#f97316"
          }
        ],
        "differenceLabel": "15 more teeth"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Laboratory Battery Cells (Part-Whole)",
      "difficulty": "easy",
      "type": "part_whole",
      "problemText": "The engineering lab connected a battery pack with 36 lithium cells and another pack with 24 alkaline cells. How many cells were connected in total?",
      "question": "The engineering lab connected a battery pack with 36 lithium cells and another pack with 24 alkaline cells. How many cells were connected in total?",
      "correctAnswer": 60,
      "target_answer": 60,
      "unit": "cells",
      "hintText": "Add lithium cells (36) and alkaline cells (24) together.",
      "steps": [
        "Lithium pack: 36 cells.",
        "Alkaline pack: 24 cells.",
        "Combined count: 36 + 24 = 60 cells."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Lithium: 36",
            "value": 36,
            "color": "#06b6d4"
          },
          {
            "label": "Alkaline: 24",
            "value": 24,
            "color": "#8b5cf6"
          }
        ],
        "totalLabel": "Total: 60 cells"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Sorter Tray Marbles (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A digital marble sorter needs 90 marbles to complete its test cycle. Maya loaded 34 silver marbles and Leo loaded 26 copper marbles. How many more marbles are needed to reach 90?",
      "question": "A digital marble sorter needs 90 marbles to complete its test cycle. Maya loaded 34 silver marbles and Leo loaded 26 copper marbles. How many more marbles are needed to reach 90?",
      "correctAnswer": 30,
      "target_answer": 30,
      "unit": "marbles",
      "hintText": "Add loaded silver (34) and copper (26) marbles first. Then subtract from the 90-marble goal.",
      "steps": [
        "Loaded marbles: 34 + 26 = 60 marbles.",
        "Remaining needed: 90 - 60 = 30 marbles."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Silver: 34",
            "value": 34,
            "color": "#94a3b8"
          },
          {
            "label": "Copper: 26",
            "value": 26,
            "color": "#d97706"
          },
          {
            "label": "Remaining: 30",
            "value": 30,
            "color": "#e2e8f0"
          }
        ],
        "totalLabel": "Goal: 90 marbles"
      }
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
