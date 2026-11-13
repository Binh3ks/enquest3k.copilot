/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 75 | Theme: "History/ELA: Ancient Egypt / Math: Timelines" | CEFR: "B1 Preliminary"
 * Updated: 2026-11-13T04:18:06.393Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 */

export const skillPracticeHubData = {
  "week": 75,
  "theme": "History/ELA: Ancient Egypt / Math: Timelines",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "Ancient Egyptians used to build monumental stone pyramids.",
      "options": [
        "used to",
        "use to",
        "using to"
      ],
      "answer": "used to",
      "explanation": "Use 'used to + base verb' to express past habits or states that are no longer true."
    },
    {
      "sentence": "Stonemasons would drag limestone blocks across the desert sand.",
      "options": [
        "would drag",
        "will drag",
        "would dragged"
      ],
      "answer": "would drag",
      "explanation": "Use 'would + base verb' to describe repeated past routine actions in history."
    },
    {
      "sentence": "Farmers used to depend on the annual flooding of the Nile.",
      "options": [
        "depend",
        "depended",
        "depending"
      ],
      "answer": "depend",
      "explanation": "After 'used to', always use the bare infinitive ('depend')."
    },
    {
      "sentence": "Temple scribes would write sacred rituals on papyrus paper.",
      "options": [
        "write",
        "wrote",
        "written"
      ],
      "answer": "write",
      "explanation": "After modal 'would', use the base form of the verb ('write')."
    },
    {
      "sentence": "The Great Sphinx is a famous stone monument in Egypt.",
      "options": [
        "monument",
        "monumental",
        "monumentally"
      ],
      "answer": "monument",
      "explanation": "The noun 'monument' means an enduring historic statue or architectural structure."
    }
  ],
  "singapore_math": [
    {
      "id": "w75_p1",
      "type": "part_whole",
      "title": "Calculating Duration on an Ancient Egyptian Historical Timeline",
      "question": "An archaeological timeline spans from the start of the Old Kingdom in 2686 BC to its conclusion in 2181 BC. How many years did this historical period last?",
      "storyContext": "Professor Tariq helps Sophia compute historical dynasty durations on a museum timeline chart.",
      "modelData": {
        "bars": [
          {
            "label": "Old Kingdom Era",
            "value": 505,
            "color": "#d97706"
          },
          {
            "label": "Transition Period",
            "value": 125,
            "color": "#b45309"
          }
        ],
        "total": 630,
        "unit": "years"
      },
      "target_answer": 505,
      "unit": "years",
      "steps": [
        "Identify the start year: 2686 BC.",
        "Subtract the end year: 2181 BC.",
        "2686 - 2181 = 505 years duration."
      ]
    },
    {
      "id": "w75_p2",
      "type": "comparison",
      "title": "Comparing Dynasty Durations (18th vs 19th Dynasty)",
      "question": "The 18th Dynasty lasted 245 years, while the 19th Dynasty ruled for 110 years. How many more years did the 18th Dynasty govern than the 19th Dynasty?",
      "storyContext": "Sophia compares the longevity of two famous New Kingdom pharaonic dynasties.",
      "modelData": {
        "bars": [
          {
            "label": "18th Dynasty",
            "value": 245,
            "color": "#b45309"
          },
          {
            "label": "19th Dynasty",
            "value": 110,
            "color": "#78350f"
          }
        ],
        "difference": 135,
        "unit": "years"
      },
      "target_answer": 135,
      "unit": "years",
      "steps": [
        "Start with the 18th Dynasty duration: 245 years.",
        "Subtract the 19th Dynasty duration: 110 years.",
        "245 - 110 = 135 years difference."
      ]
    },
    {
      "id": 3,
      "title": "Problem 3: Temple Sanctuary Construction (Part-Whole)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "The construction of a grand temple sanctuary took 45 years under Pharaoh Ahmose and an additional 35 years under Pharaoh Amenhotep. How many years did the full construction project span?",
      "question": "The construction of a grand temple sanctuary took 45 years under Pharaoh Ahmose and an additional 35 years under Pharaoh Amenhotep. How many years did the full construction project span?",
      "correctAnswer": 80,
      "target_answer": 80,
      "unit": "years",
      "hintText": "Add the years under Pharaoh Ahmose (45) and Pharaoh Amenhotep (35) together.",
      "steps": [
        "Ahmose era: 45 years.",
        "Amenhotep era: 35 years.",
        "Total duration: 45 + 35 = 80 years."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Ahmose: 45y",
            "value": 45,
            "color": "#f59e0b"
          },
          {
            "label": "Amenhotep: 35y",
            "value": 35,
            "color": "#d97706"
          }
        ],
        "totalLabel": "Total: 80 years"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Monument Height Comparison (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "The Great Pyramid originally stood at 146 meters tall, while the neighboring Pyramid of Menkaure reached 65 meters. What was the difference in height between the two monuments?",
      "question": "The Great Pyramid originally stood at 146 meters tall, while the neighboring Pyramid of Menkaure reached 65 meters. What was the difference in height between the two monuments?",
      "correctAnswer": 81,
      "target_answer": 81,
      "unit": "meters",
      "hintText": "Subtract Menkaure height (65) from Great Pyramid height (146).",
      "steps": [
        "Great Pyramid: 146 m.",
        "Menkaure Pyramid: 65 m.",
        "Height difference: 146 - 65 = 81 meters."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Great: 146m",
            "value": 146,
            "color": "#d97706"
          },
          {
            "label": "Menkaure: 65m",
            "value": 65,
            "color": "#b45309"
          }
        ],
        "differenceLabel": "81 meters taller"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Valley Excavation Field Season (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "An archaeology mission planned a 90-day field season. The team spent 28 days cataloging inscriptions and 37 days mapping royal tombs. How many days remained for artifact preservation?",
      "question": "An archaeology mission planned a 90-day field season. The team spent 28 days cataloging inscriptions and 37 days mapping royal tombs. How many days remained for artifact preservation?",
      "correctAnswer": 25,
      "target_answer": 25,
      "unit": "days",
      "hintText": "Add inscription days (28) and mapping days (37) first. Then subtract from total season (90 days).",
      "steps": [
        "Documented days: 28 + 37 = 65 days.",
        "Remaining preservation days: 90 - 65 = 25 days."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Inscriptions: 28d",
            "value": 28,
            "color": "#78716c"
          },
          {
            "label": "Mapping: 37d",
            "value": 37,
            "color": "#a8a29e"
          },
          {
            "label": "Preservation: 25d",
            "value": 25,
            "color": "#e7e5e4"
          }
        ],
        "totalLabel": "Season: 90 days"
      }
    }
  ],
  "science_lab": {
    "title_en": "History/ELA: Ancient Egypt / Math: Timelines Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Nile Flooding & Silt Agriculture",
        "diagram_type": "nile_irrigation_basin",
        "instruction": "Sequence the agricultural stages of ancient Egyptian farming along the river.",
        "items": [
          {
            "label": "Summer Inundation Flood",
            "target": "inundation"
          },
          {
            "label": "Fertile Silt Deposition",
            "target": "silt"
          },
          {
            "label": "Barley & Flax Cultivation",
            "target": "crops"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Limestone Quarrying & Ramp Sledges",
        "diagram_type": "pyramid_construction_ramp",
        "instruction": "Assemble the tools used by stonemasons to erect giant pyramids.",
        "items": [
          {
            "label": "Tura Limestone Quarry",
            "target": "quarry"
          },
          {
            "label": "Wet Sand Sledge Transit",
            "target": "transport"
          },
          {
            "label": "Earthen Construction Ramp",
            "target": "ramp"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Papyrus Processing & Hieroglyphs",
        "diagram_type": "papyrus_manuscript_bench",
        "instruction": "Select the materials used by ancient scribes to produce sacred records.",
        "items": [
          {
            "label": "Pressed Reed Strips",
            "target": "papyrus"
          },
          {
            "label": "Soot & Ochre Ink Wells",
            "target": "pigment"
          },
          {
            "label": "Hieroglyphic Cartouche Carving",
            "target": "inscription"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
