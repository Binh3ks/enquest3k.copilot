/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 77 | Theme: "Social Studies/ELA: World Landmarks / Math: 3D Geometry" | CEFR: "B1 Preliminary"
 * Updated: 2026-11-13T04:18:06.394Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 77,
  "theme": "Social Studies/ELA: World Landmarks / Math: 3D Geometry",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "The Colosseum is made of durable volcanic concrete.",
      "options": [
        "made of",
        "made from",
        "made in"
      ],
      "answer": "made of",
      "explanation": "Use 'made of' when the original material is still recognizable in the final structure."
    },
    {
      "sentence": "The central tower is shaped like a tall cylinder.",
      "options": [
        "shaped like",
        "shaped as",
        "shape of"
      ],
      "answer": "shaped like",
      "explanation": "Use 'shaped like + noun' to describe physical geometric resemblance."
    },
    {
      "sentence": "Polished white marble gives the monument perfect symmetry.",
      "options": [
        "symmetry",
        "symmetrical",
        "symmetrically"
      ],
      "answer": "symmetry",
      "explanation": "Use the noun 'symmetry' as the direct object of the verb 'gives'."
    },
    {
      "sentence": "Sturdy limestone pillars support the heavy roof.",
      "options": [
        "pillars",
        "pillows",
        "piles"
      ],
      "answer": "pillars",
      "explanation": "The noun 'pillars' means vertical stone columns that carry structural weight."
    },
    {
      "sentence": "The Eiffel Tower is an internationally recognized landmark.",
      "options": [
        "landmark",
        "landscape",
        "landlord"
      ],
      "answer": "landmark",
      "explanation": "A 'landmark' is a prominent, well-known building or geographic feature."
    }
  ],
  "singapore_math": [
    {
      "id": "w77_p1",
      "type": "part_whole",
      "title": "Calculating Vertices, Edges, and Faces of Architectural 3D Solids",
      "question": "A scale model of the Louvre Pyramid has 5 faces and 8 edges. An architect adds a rectangular base prism with 6 faces and 12 edges. How many total faces do the two geometric solids have together?",
      "storyContext": "Marcus tallies geometric properties of 3D building components for his engineering portfolio.",
      "modelData": {
        "bars": [
          {
            "label": "Pyramid Faces",
            "value": 5,
            "color": "#8b5cf6"
          },
          {
            "label": "Prism Faces",
            "value": 6,
            "color": "#ec4899"
          }
        ],
        "total": 11,
        "unit": "faces"
      },
      "target_answer": 11,
      "unit": "faces",
      "steps": [
        "Count the pyramid faces: 5 faces.",
        "Add the rectangular prism faces: 6 faces.",
        "5 + 6 = 11 faces combined."
      ]
    },
    {
      "id": "w77_p2",
      "type": "comparison",
      "title": "Comparing Edges between a Cube and a Triangular Prism",
      "question": "A foundation block shaped like a cube has 12 edges, while a roof pediment shaped like a triangular prism has 9 edges. How many more edges does the cube have than the triangular prism?",
      "storyContext": "Elena compares edge counts of standard stone building blocks.",
      "modelData": {
        "bars": [
          {
            "label": "Cube Edges",
            "value": 12,
            "color": "#6366f1"
          },
          {
            "label": "Triangular Prism Edges",
            "value": 9,
            "color": "#14b8a6"
          }
        ],
        "difference": 3,
        "unit": "edges"
      },
      "target_answer": 3,
      "unit": "edges",
      "steps": [
        "Start with the cube edges: 12 edges.",
        "Subtract the triangular prism edges: 9 edges.",
        "12 - 9 = 3 edges difference."
      ]
    },
    {
      "id": 3,
      "title": "Problem 3: Colosseum Tier Arch Count (Part-Whole)",
      "difficulty": "easy",
      "type": "part_whole",
      "problemText": "The lower tier of an ancient arena structure features 80 exterior stone arches and the middle tier features 80 matching arches. How many arches are built across both tiers combined?",
      "question": "The lower tier of an ancient arena structure features 80 exterior stone arches and the middle tier features 80 matching arches. How many arches are built across both tiers combined?",
      "correctAnswer": 160,
      "target_answer": 160,
      "unit": "arches",
      "hintText": "Add the 80 lower tier arches and 80 middle tier arches together.",
      "steps": [
        "Lower tier: 80 arches.",
        "Middle tier: 80 arches.",
        "Total arches: 80 + 80 = 160 arches."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Lower: 80",
            "value": 80,
            "color": "#78716c"
          },
          {
            "label": "Middle: 80",
            "value": 80,
            "color": "#a8a29e"
          }
        ],
        "totalLabel": "Total: 160 arches"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Monument Height Differential (Comparison)",
      "difficulty": "medium",
      "type": "comparison",
      "problemText": "The Eiffel Tower in Paris rises to 330 meters, while the statue tower in the park stands 95 meters tall. How much taller is the Eiffel Tower?",
      "question": "The Eiffel Tower in Paris rises to 330 meters, while the statue tower in the park stands 95 meters tall. How much taller is the Eiffel Tower?",
      "correctAnswer": 235,
      "target_answer": 235,
      "unit": "meters",
      "hintText": "Subtract statue tower height (95) from Eiffel Tower height (330).",
      "steps": [
        "Eiffel Tower: 330 m.",
        "Statue tower: 95 m.",
        "Difference: 330 - 95 = 235 meters."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Eiffel: 330m",
            "value": 330,
            "color": "#475569"
          },
          {
            "label": "Statue: 95m",
            "value": 95,
            "color": "#94a3b8"
          }
        ],
        "differenceLabel": "235 meters taller"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Geometric Block Assembly (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "A stonemason needs 250 carved stone blocks to build a vaulted rotunda arch. She prepared 85 blocks on Monday and 95 blocks on Tuesday. How many more blocks must she carve to complete the assembly?",
      "question": "A stonemason needs 250 carved stone blocks to build a vaulted rotunda arch. She prepared 85 blocks on Monday and 95 blocks on Tuesday. How many more blocks must she carve to complete the assembly?",
      "correctAnswer": 70,
      "target_answer": 70,
      "unit": "blocks",
      "hintText": "Add Monday (85) and Tuesday (95) blocks first. Then subtract from total required (250).",
      "steps": [
        "Blocks prepared: 85 + 95 = 180 blocks.",
        "Remaining needed: 250 - 180 = 70 blocks."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Mon: 85",
            "value": 85,
            "color": "#d97706"
          },
          {
            "label": "Tue: 95",
            "value": 95,
            "color": "#f59e0b"
          },
          {
            "label": "Needed: 70",
            "value": 70,
            "color": "#e2e8f0"
          }
        ],
        "totalLabel": "Goal: 250 blocks"
      }
    }
  ],
  "science_lab": {
    "title_en": "Social Studies/ELA: World Landmarks / Math: 3D Geometry Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Roman Keystone Arch Mechanics",
        "diagram_type": "keystone_arch_compression",
        "instruction": "Place the voussoir stones and central keystone to complete the self-supporting arch.",
        "items": [
          {
            "label": "Travertine Springing Stone",
            "target": "base"
          },
          {
            "label": "Wedge-Shaped Voussoirs",
            "target": "arch_flank"
          },
          {
            "label": "Central Locking Keystone",
            "target": "keystone"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Hemispherical Dome Weight Load",
        "diagram_type": "hemisphere_dome_thrust",
        "instruction": "Balance the lateral thrust of a hemispherical marble dome.",
        "items": [
          {
            "label": "Circular Masonry Drum",
            "target": "drum"
          },
          {
            "label": "Curved Hemispherical Shell",
            "target": "dome"
          },
          {
            "label": "Reinforcing Minaret Counterweights",
            "target": "buttress"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Metallic Truss Pyramidal Stability",
        "diagram_type": "lattice_pyramid_truss",
        "instruction": "Assemble crisscrossed puddle iron trusses to withstand high-altitude wind pressure.",
        "items": [
          {
            "label": "Four-Legged Iron Footing",
            "target": "foundation"
          },
          {
            "label": "Lattice Girder Trusses",
            "target": "framework"
          },
          {
            "label": "Tapering Spire Apex",
            "target": "pinnacle"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
