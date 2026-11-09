/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 41 | Theme: "Life Cycles (Process)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.163Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
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
