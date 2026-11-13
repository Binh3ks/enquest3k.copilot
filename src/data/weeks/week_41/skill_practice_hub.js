/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 41 | Theme: "Life Cycles (Process)" | CEFR: "A2 Flyers"
 * Updated: 2026-11-13T04:18:06.387Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 41,
  "theme": "Life Cycles (Process)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "A tiny caterpillar hatches from an egg on the leaf.",
      "options": [
        "hatches",
        "hatch",
        "hatching"
      ],
      "answer": "hatches",
      "explanation": "Use 3rd person singular 'hatches' with singular subject 'caterpillar'."
    },
    {
      "sentence": "Inside the chrysalis, its body changes completely.",
      "options": [
        "changes",
        "change",
        "changing"
      ],
      "answer": "changes",
      "explanation": "Use 3rd person singular present tense 'changes' with 'its body'."
    },
    {
      "sentence": "The tadpole grows strong legs before leaving the water.",
      "options": [
        "grows",
        "grow",
        "growing"
      ],
      "answer": "grows",
      "explanation": "Use 3rd person singular 'grows' with singular subject 'the tadpole'."
    },
    {
      "sentence": "Finally, the insect becomes a colorful adult butterfly.",
      "options": [
        "becomes",
        "become",
        "becoming"
      ],
      "answer": "becomes",
      "explanation": "Use 3rd person singular 'becomes' with subject 'the insect'."
    },
    {
      "sentence": "First, the mother frog lays her eggs in the pond.",
      "options": [
        "lays",
        "lay",
        "laying"
      ],
      "answer": "lays",
      "explanation": "Use 3rd person singular 'lays' with singular subject 'the mother frog'."
    }
  ],
  "singapore_math": [
    {
      "id": "w41_p1",
      "type": "part_whole",
      "title": "Caterpillar Leaf Consumption",
      "question": "A hungry caterpillar ate 18 small leaves on Monday and 24 leaves on Tuesday. How many leaves did it eat altogether?",
      "storyContext": "Sophia tracks how much foliage the growing caterpillar needs each day.",
      "modelData": {
        "bars": [
          {
            "label": "Monday Leaves",
            "value": 18,
            "color": "#22c55e"
          },
          {
            "label": "Tuesday Leaves",
            "value": 24,
            "color": "#16a34a"
          }
        ],
        "total": 42,
        "unit": "leaves"
      },
      "target_answer": 42,
      "unit": "leaves",
      "steps": [
        "Add the leaves from Monday: 18 leaves.",
        "Add the leaves from Tuesday: 24 leaves.",
        "18 + 24 = 42 leaves in total."
      ]
    },
    {
      "id": "w41_p2",
      "type": "comparison",
      "title": "Pond Tadpole Stage Comparison",
      "question": "In the garden pond, there are 35 swimming tadpoles and 15 young frogs. How many more tadpoles are there than frogs?",
      "storyContext": "Oliver counts the amphibians at different development stages near the water lily pads.",
      "modelData": {
        "bars": [
          {
            "label": "Tadpoles",
            "value": 35,
            "color": "#06b6d4"
          },
          {
            "label": "Young Frogs",
            "value": 15,
            "color": "#84cc16"
          }
        ],
        "difference": 20,
        "unit": "amphibians"
      },
      "target_answer": 20,
      "unit": "amphibians",
      "steps": [
        "Start with the 35 tadpoles.",
        "Subtract the 15 young frogs.",
        "35 - 15 = 20 more tadpoles."
      ]
    },
    {
      "id": 3,
      "title": "Problem 3: Chrysalis Observation Count (Part-Whole)",
      "difficulty": "easy",
      "type": "part_whole",
      "problemText": "Student botanists counted 27 butterfly chrysalises in the greenhouse and 33 chrysalises in the outdoor garden. How many chrysalises did they count in total?",
      "question": "Student botanists counted 27 butterfly chrysalises in the greenhouse and 33 chrysalises in the outdoor garden. How many chrysalises did they count in total?",
      "correctAnswer": 60,
      "target_answer": 60,
      "unit": "chrysalises",
      "hintText": "Add greenhouse count (27) and outdoor garden count (33) together.",
      "steps": [
        "Greenhouse: 27 chrysalises.",
        "Outdoor garden: 33 chrysalises.",
        "Total observed: 27 + 33 = 60 chrysalises."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Greenhouse: 27",
            "value": 27,
            "color": "#16a34a"
          },
          {
            "label": "Garden: 33",
            "value": 33,
            "color": "#84cc16"
          }
        ],
        "totalLabel": "Total: 60 chrysalises"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Seedling Height Growth (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "A sunflower seedling grew to 42 centimeters in three weeks, while a bean seedling grew to 26 centimeters. How many centimeters taller is the sunflower seedling?",
      "question": "A sunflower seedling grew to 42 centimeters in three weeks, while a bean seedling grew to 26 centimeters. How many centimeters taller is the sunflower seedling?",
      "correctAnswer": 16,
      "target_answer": 16,
      "unit": "cm",
      "hintText": "Subtract bean height (26) from sunflower height (42).",
      "steps": [
        "Sunflower height: 42 cm.",
        "Bean seedling height: 26 cm.",
        "Height difference: 42 - 26 = 16 cm."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Sunflower: 42cm",
            "value": 42,
            "color": "#eab308"
          },
          {
            "label": "Bean: 26cm",
            "value": 26,
            "color": "#65a30d"
          }
        ],
        "differenceLabel": "16 cm taller"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Sprouting Seeds Experiment (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "In a biology tray containing 75 bean seeds, 28 seeds sprouted on day three and 32 seeds sprouted on day four. How many seeds have not sprouted yet?",
      "question": "In a biology tray containing 75 bean seeds, 28 seeds sprouted on day three and 32 seeds sprouted on day four. How many seeds have not sprouted yet?",
      "correctAnswer": 15,
      "target_answer": 15,
      "unit": "seeds",
      "hintText": "Add day three (28) and day four (32) sprouted seeds first. Then subtract from 75 total seeds.",
      "steps": [
        "Sprouted seeds: 28 + 32 = 60 seeds.",
        "Unsprouted seeds: 75 - 60 = 15 seeds."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Day 3: 28",
            "value": 28,
            "color": "#4ade80"
          },
          {
            "label": "Day 4: 32",
            "value": 32,
            "color": "#22c55e"
          },
          {
            "label": "Unsprouted: 15",
            "value": 15,
            "color": "#94a3b8"
          }
        ],
        "totalLabel": "Total: 75 seeds"
      }
    }
  ],
  "science_lab": {
    "title_en": "Life Cycles (Process) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Butterfly Stage Sequence",
        "diagram_type": "cycle_sequencing_ring",
        "instruction": "Arrange the four butterfly life cycle stages in correct order.",
        "items": [
          {
            "label": "Step 1: Leaf Egg",
            "target": "egg_stage"
          },
          {
            "label": "Step 2: Feeding Caterpillar",
            "target": "larva_stage"
          },
          {
            "label": "Step 3: Resting Chrysalis",
            "target": "pupa_stage"
          },
          {
            "label": "Step 4: Flying Butterfly",
            "target": "adult_stage"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Frog Metamorphosis Lab",
        "diagram_type": "amphibian_transformation_slots",
        "instruction": "Match each amphibian body feature to its stage of life.",
        "items": [
          {
            "label": "Swimming Tail & Gills",
            "target": "early_tadpole"
          },
          {
            "label": "Sprouting Hind Legs",
            "target": "developing_tadpole"
          },
          {
            "label": "Leaping Muscular Legs & Lungs",
            "target": "adult_frog"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Habitat Needs for Metamorphosis",
        "diagram_type": "lifecycle_habitat_board",
        "instruction": "Assign each creature to the habitat it needs to transform safely.",
        "items": [
          {
            "label": "Monarch Caterpillar -> Milkweed Plant",
            "target": "garden_leaves"
          },
          {
            "label": "Spotted Tadpole -> Calm Freshwater Pond",
            "target": "clean_pond"
          },
          {
            "label": "Adult Butterfly -> Sunny Nectar Flowers",
            "target": "flower_bed"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
