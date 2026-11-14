/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 61 | Theme: "Main Idea Hunter: Volcanic Eruptions" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 61,
  "theme": "Main Idea Hunter: Volcanic Eruptions",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "The ___ idea tells the reader what the entire paragraph is mostly about.",
      "options": [
        "main",
        "small",
        "random"
      ],
      "answer": "main",
      "explanation": "The 'main idea' is the key message of a paragraph.",
      "promptText": "The ___ idea tells the reader what the entire paragraph is mostly about.",
      "sentence": "The ___ idea tells the reader what the entire paragraph is mostly about."
    },
    {
      "id": 2,
      "question": "Supporting details provide specific ___ to explain the author's point.",
      "options": [
        "facts",
        "riddles",
        "mistakes"
      ],
      "answer": "facts",
      "explanation": "Supporting details consist of factual evidence and descriptions.",
      "promptText": "Supporting details provide specific ___ to explain the author's point.",
      "sentence": "Supporting details provide specific ___ to explain the author's point."
    },
    {
      "id": 3,
      "question": "In the lab problem, 4 times 15 is 60, and 60 minus 18 leaves ___.",
      "options": [
        "42",
        "32",
        "52"
      ],
      "answer": "42",
      "explanation": "60 - 18 = 42.",
      "promptText": "In the lab problem, 4 times 15 is 60, and 60 minus 18 leaves ___.",
      "sentence": "In the lab problem, 4 times 15 is 60, and 60 minus 18 leaves ___."
    },
    {
      "id": 4,
      "question": "Magma stays underground; ___, when it flows outside, it is called lava.",
      "options": [
        "however",
        "because",
        "since"
      ],
      "answer": "however",
      "explanation": "'However' contrasts magma underground with lava on the surface.",
      "promptText": "Magma stays underground; ___, when it flows outside, it is called lava.",
      "sentence": "Magma stays underground; ___, when it flows outside, it is called lava."
    },
    {
      "id": 5,
      "question": "Which sentence expresses a clear main idea?",
      "options": [
        "Volcanoes dramatically reshape Earth's surface.",
        "Yesterday at 2 PM.",
        "Pumice has tiny holes."
      ],
      "answer": "Volcanoes dramatically reshape Earth's surface.",
      "explanation": "A complete sentence stating a broad truth functions as a main idea.",
      "promptText": "Which sentence expresses a clear main idea?",
      "sentence": "Which sentence expresses a clear main idea?"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Volcanic Rock Samples in Storage",
      "problemText": "A geology laboratory prepares 4 crates containing 15 volcanic rock samples each. They donate 18 samples to a local school. How many rock samples remain in the laboratory?",
      "correctAnswer": 42,
      "target_answer": 42,
      "unit": "samples",
      "hintText": "Step 1: Total samples = 4 * 15 = 60. Step 2: Remaining = 60 - 18 = 42 samples.",
      "steps": [
        "Step 1: 4 * 15 = 60.",
        "Step 2: 60 - 18 = 42 samples."
      ],
      "modelData": {
        "bars": [
          {
            "label": "4 Crates of 15 (60)",
            "value": 60,
            "color": "#3B82F6"
          },
          {
            "label": "Donated (18)",
            "value": 18,
            "color": "#EF4444"
          }
        ],
        "total": 42,
        "unit": "samples",
        "comparisonType": "multi_step"
      },
      "problem_text": "A geology laboratory prepares 4 crates containing 15 volcanic rock samples each. They donate 18 samples to a local school. How many rock samples remain in the laboratory?",
      "problem_en": "A geology laboratory prepares 4 crates containing 15 volcanic rock samples each. They donate 18 samples to a local school. How many rock samples remain in the laboratory?",
      "answer": 42,
      "step_by_step": "Step 1: Total samples = 4 * 15 = 60. Step 2: Remaining = 60 - 18 = 42 samples."
    },
    {
      "id": 2,
      "title": "Sorting Pumice Stones into Trays",
      "problemText": "A field geologist collects 85 pumice stones and sorts them equally into 5 wooden specimen boxes. How many pumice stones are placed in each box?",
      "correctAnswer": 17,
      "target_answer": 17,
      "unit": "stones",
      "hintText": "Step 1: Total = 85. Step 2: Boxes = 5. Step 3: Stones per box = 85 / 5 = 17 stones.",
      "steps": [
        "Step 1: Total = 85.",
        "Step 2: Boxes = 5.",
        "Step 3: Quotient = 85 / 5 = 17 stones."
      ],
      "modelData": {
        "bars": [
          {
            "label": "5 Boxes of 17",
            "value": 85,
            "color": "#10B981"
          }
        ],
        "total": 85,
        "unit": "stones",
        "comparisonType": "equal_sharing"
      },
      "problem_text": "A field geologist collects 85 pumice stones and sorts them equally into 5 wooden specimen boxes. How many pumice stones are placed in each box?",
      "problem_en": "A field geologist collects 85 pumice stones and sorts them equally into 5 wooden specimen boxes. How many pumice stones are placed in each box?",
      "answer": 17,
      "step_by_step": "Step 1: Total = 85. Step 2: Boxes = 5. Step 3: Stones per box = 85 / 5 = 17 stones."
    },
    {
      "id": 3,
      "title": "Combining Mineral Weights",
      "problemText": "The museum weighs two bags of mineral sand: bag one weighs 35 kilograms and bag two weighs 48 kilograms. What is the total combined mass of the mineral sand?",
      "correctAnswer": 83,
      "target_answer": 83,
      "unit": "kilograms",
      "hintText": "Step 1: Bag 1 = 35. Step 2: Bag 2 = 48. Step 3: Sum = 35 + 48 = 83 kg.",
      "steps": [
        "Step 1: 35 + 48 = 83 kg."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Bag 1",
            "value": 35,
            "color": "#F59E0B"
          },
          {
            "label": "Bag 2",
            "value": 48,
            "color": "#8B5CF6"
          }
        ],
        "total": 83,
        "unit": "kilograms",
        "comparisonType": "part_whole"
      },
      "problem_text": "The museum weighs two bags of mineral sand: bag one weighs 35 kilograms and bag two weighs 48 kilograms. What is the total combined mass of the mineral sand?",
      "problem_en": "The museum weighs two bags of mineral sand: bag one weighs 35 kilograms and bag two weighs 48 kilograms. What is the total combined mass of the mineral sand?",
      "answer": 83,
      "step_by_step": "Step 1: Bag 1 = 35. Step 2: Bag 2 = 48. Step 3: Sum = 35 + 48 = 83 kg."
    },
    {
      "id": 4,
      "title": "Temperature Drop on the Mountain Slope",
      "problemText": "At the volcanic vent, the surface temperature was 92 degrees Celsius. Down near the campsite, the temperature was 37 degrees Celsius. What is the temperature difference?",
      "correctAnswer": 55,
      "target_answer": 55,
      "unit": "degrees",
      "hintText": "Step 1: Vent = 92. Step 2: Camp = 37. Step 3: Difference = 92 - 37 = 55 degrees.",
      "steps": [
        "Step 1: Difference = 92 - 37 = 55 degrees."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Vent Temp",
            "value": 92,
            "color": "#EF4444"
          },
          {
            "label": "Camp Temp",
            "value": 37,
            "color": "#06B6D4"
          }
        ],
        "total": 92,
        "unit": "degrees",
        "comparisonType": "difference"
      },
      "problem_text": "At the volcanic vent, the surface temperature was 92 degrees Celsius. Down near the campsite, the temperature was 37 degrees Celsius. What is the temperature difference?",
      "problem_en": "At the volcanic vent, the surface temperature was 92 degrees Celsius. Down near the campsite, the temperature was 37 degrees Celsius. What is the temperature difference?",
      "answer": 55,
      "step_by_step": "Step 1: Vent = 92. Step 2: Camp = 37. Step 3: Difference = 92 - 37 = 55 degrees."
    },
    {
      "id": 5,
      "title": "Geology Reference Books",
      "problemText": "The museum archive fills 6 library shelves with geology books. If each shelf holds exactly 14 books, how many geology books are on the shelves altogether?",
      "correctAnswer": 84,
      "target_answer": 84,
      "unit": "books",
      "hintText": "Step 1: Shelves = 6. Step 2: Books per shelf = 14. Step 3: Total = 6 * 14 = 84 books.",
      "steps": [
        "Step 1: 6 * 14 = 84 books."
      ],
      "modelData": {
        "bars": [
          {
            "label": "6 Shelves of 14",
            "value": 84,
            "color": "#EC4899"
          }
        ],
        "total": 84,
        "unit": "books",
        "comparisonType": "equal_groups"
      },
      "problem_text": "The museum archive fills 6 library shelves with geology books. If each shelf holds exactly 14 books, how many geology books are on the shelves altogether?",
      "problem_en": "The museum archive fills 6 library shelves with geology books. If each shelf holds exactly 14 books, how many geology books are on the shelves altogether?",
      "answer": 84,
      "step_by_step": "Step 1: Shelves = 6. Step 2: Books per shelf = 14. Step 3: Total = 6 * 14 = 84 books."
    }
  ],
  "science_lab": {
    "title_en": "Main Idea Hunter: Volcanic Eruptions Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Main Idea vs Supporting Detail Classifier",
        "diagram_type": "reading_strategy_board",
        "instruction": "Sort each sentence into whether it represents a Main Idea or a Supporting Detail.",
        "items": [
          {
            "label": "Volcanoes erupt due to underground pressure",
            "target": "main_idea_category",
            "name": "Volcanoes erupt due to underground pressure",
            "text": "Volcanoes erupt due to underground pressure",
            "type": "main_idea_category",
            "description": ""
          },
          {
            "label": "Magma collects in a chamber 5 kilometers deep",
            "target": "supporting_detail_category",
            "name": "Magma collects in a chamber 5 kilometers deep",
            "text": "Magma collects in a chamber 5 kilometers deep",
            "type": "supporting_detail_category",
            "description": ""
          },
          {
            "label": "Earth's crust contains multiple shifting plates",
            "target": "main_idea_category",
            "name": "Earth's crust contains multiple shifting plates",
            "text": "Earth's crust contains multiple shifting plates",
            "type": "main_idea_category",
            "description": ""
          },
          {
            "label": "Four crates contained 15 rock samples each",
            "target": "supporting_detail_category",
            "name": "Four crates contained 15 rock samples each",
            "text": "Four crates contained 15 rock samples each",
            "type": "supporting_detail_category",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Volcanic Anatomy Matching",
        "diagram_type": "volcano_diagram",
        "instruction": "Match each feature to its correct location (Underground or Above Ground).",
        "items": [
          {
            "label": "Molten rock magma chamber",
            "target": "underground_zone",
            "name": "Molten rock magma chamber",
            "text": "Molten rock magma chamber",
            "type": "underground_zone",
            "description": ""
          },
          {
            "label": "Flowing hot surface lava stream",
            "target": "above_ground_zone",
            "name": "Flowing hot surface lava stream",
            "text": "Flowing hot surface lava stream",
            "type": "above_ground_zone",
            "description": ""
          },
          {
            "label": "Subterranean feeding vent conduit",
            "target": "underground_zone",
            "name": "Subterranean feeding vent conduit",
            "text": "Subterranean feeding vent conduit",
            "type": "underground_zone",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Two-Step Calculation Stages",
        "diagram_type": "step_calculator",
        "instruction": "Match each step of the rock calculation to Step 1 (Multiplication) or Step 2 (Subtraction).",
        "items": [
          {
            "label": "Multiply 4 crates by 15 samples = 60",
            "target": "step_1_mult",
            "name": "Multiply 4 crates by 15 samples = 60",
            "text": "Multiply 4 crates by 15 samples = 60",
            "type": "step_1_mult",
            "description": ""
          },
          {
            "label": "Subtract 18 donated samples from 60 = 42",
            "target": "step_2_sub",
            "name": "Subtract 18 donated samples from 60 = 42",
            "text": "Subtract 18 donated samples from 60 = 42",
            "type": "step_2_sub",
            "description": ""
          },
          {
            "label": "Verify final remainder count equals 42",
            "target": "step_2_sub",
            "name": "Verify final remainder count equals 42",
            "text": "Verify final remainder count equals 42",
            "type": "step_2_sub",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
