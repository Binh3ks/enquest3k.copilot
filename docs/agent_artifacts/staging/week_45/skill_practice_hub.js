/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 45 | Theme: "Shape Detectives (Geometry)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.168Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 45,
  "theme": "Shape Detectives (Geometry)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "A square has four equal straight sides.",
      "options": [
        "has",
        "have",
        "having"
      ],
      "answer": "has",
      "explanation": "Use singular verb 'has' with singular subject 'A square'."
    },
    {
      "sentence": "The classroom wall clock is completely round.",
      "options": [
        "round",
        "roundly",
        "rounds"
      ],
      "answer": "round",
      "explanation": "Use predicate adjective 'round' after linking verb 'is'."
    },
    {
      "sentence": "Use a plastic ruler to draw a straight line.",
      "options": [
        "straight",
        "straightly",
        "straighten"
      ],
      "answer": "straight",
      "explanation": "Use adjective 'straight' to modify noun 'line'."
    },
    {
      "sentence": "A triangle has three sharp corners pointing out.",
      "options": [
        "corners",
        "corner",
        "cornered"
      ],
      "answer": "corners",
      "explanation": "Use plural noun 'corners' after the cardinal number 'three'."
    },
    {
      "sentence": "Can you describe this object using shape words?",
      "options": [
        "describe",
        "describes",
        "described"
      ],
      "answer": "describe",
      "explanation": "Use bare infinitive 'describe' after modal verb 'can'."
    }
  ],
  "singapore_math": [
    {
      "id": "w45_p1",
      "type": "part_whole",
      "title": "Perimeter of the Classroom Desk",
      "question": "A student desk has two long sides of 60 centimeters each and two short sides of 40 centimeters each. What is the total perimeter around the desk?",
      "storyContext": "Ben measures the perimeter around his rectangular classroom desk.",
      "modelData": {
        "bars": [
          {
            "label": "Two Long Sides",
            "value": 120,
            "color": "#3b82f6"
          },
          {
            "label": "Two Short Sides",
            "value": 80,
            "color": "#10b981"
          }
        ],
        "total": 200,
        "unit": "cm"
      },
      "target_answer": 200,
      "unit": "cm",
      "steps": [
        "Add the two long sides: 60 + 60 = 120 cm.",
        "Add the two short sides: 40 + 40 = 80 cm.",
        "120 + 80 = 200 cm in total."
      ]
    },
    {
      "id": "w45_p2",
      "type": "comparison",
      "title": "Counting Classroom Geometric Shapes",
      "question": "The shape detectives found 28 rectangular objects and 16 circular objects in the room. How many more rectangles did they find than circles?",
      "storyContext": "Zoe tallies her detective checklist after surveying the classroom library.",
      "modelData": {
        "bars": [
          {
            "label": "Rectangles",
            "value": 28,
            "color": "#8b5cf6"
          },
          {
            "label": "Circles",
            "value": 16,
            "color": "#f59e0b"
          }
        ],
        "difference": 12,
        "unit": "shapes"
      },
      "target_answer": 12,
      "unit": "shapes",
      "steps": [
        "Start with the 28 rectangular objects.",
        "Subtract the 16 circular objects.",
        "28 - 16 = 12 more rectangles."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Shape Detectives (Geometry) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Shape Sorter Machine",
        "diagram_type": "shape_sorting_baskets",
        "instruction": "Drag each classroom object into its correct geometric shape basket.",
        "items": [
          {
            "label": "Circular Wall Clock",
            "target": "circle_basket"
          },
          {
            "label": "Rectangular Whiteboard",
            "target": "rectangle_basket"
          },
          {
            "label": "Square Floor Tile",
            "target": "square_basket"
          },
          {
            "label": "Triangular Caution Cone",
            "target": "triangle_basket"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Sides and Corners Counter",
        "diagram_type": "property_matrix_grid",
        "instruction": "Match each shape name to its correct number of straight sides.",
        "items": [
          {
            "label": "Triangle -> 3 Straight Sides",
            "target": "three_sides"
          },
          {
            "label": "Square -> 4 Equal Sides",
            "target": "four_equal_sides"
          },
          {
            "label": "Circle -> 0 Straight Sides",
            "target": "zero_sides"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Geometric Pattern Builder",
        "diagram_type": "pattern_tile_assembler",
        "instruction": "Place the geometric shapes to complete the classroom window design.",
        "items": [
          {
            "label": "Bottom Base: Rectangle",
            "target": "base_slot"
          },
          {
            "label": "Center Pane: Square",
            "target": "center_slot"
          },
          {
            "label": "Top Arch: Semicircle",
            "target": "arch_slot"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
