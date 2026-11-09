/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 130 | Theme: "Deep Ocean Exploration & Abyssal Organisms" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.315Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 130,
  "theme": "Deep Ocean Exploration & Abyssal Organisms",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "Never before had marine biologists seen such bioluminescent fish.",
      "options": [
        "had marine biologists seen",
        "marine biologists had seen",
        "did marine biologists saw"
      ],
      "answer": "had marine biologists seen",
      "explanation": "Negative inversion after 'Never before' requires auxiliary verb 'had' before the subject 'marine biologists'."
    },
    {
      "sentence": "Under no circumstances should commercial mining disrupt benthic habitats.",
      "options": [
        "should commercial mining disrupt",
        "commercial mining should disrupt",
        "commercial mining disrupts"
      ],
      "answer": "should commercial mining disrupt",
      "explanation": "Negative prepositional phrase 'Under no circumstances' triggers subject-auxiliary inversion ('should commercial mining')."
    },
    {
      "sentence": "Rarely do human divers reach hadal trench depths without submersibles.",
      "options": [
        "do human divers reach",
        "human divers reach",
        "human divers do reach"
      ],
      "answer": "do human divers reach",
      "explanation": "Limiting adverb 'Rarely' triggers present tense inversion with auxiliary 'do' ('do human divers reach')."
    },
    {
      "sentence": "Barely had the probe touched the seabed when crustaceans appeared.",
      "options": [
        "had the probe touched",
        "the probe had touched",
        "did the probe touch"
      ],
      "answer": "had the probe touched",
      "explanation": "Time adverbial 'Barely' triggers past perfect inversion ('had the probe touched')."
    },
    {
      "sentence": "Specialized enzymes protect trench organisms from extreme pressure.",
      "options": [
        "protect",
        "protects",
        "protecting"
      ],
      "answer": "protect",
      "explanation": "Plural subject 'Specialized enzymes' requires plural base verb 'protect'."
    }
  ],
  "singapore_math": [
    {
      "id": "w130_p1",
      "type": "part_whole",
      "title": "Trench Survey Biological Specimen Catalog",
      "question": "During a hadal dive, oceanographers collected 28 benthic crustacean specimens and 32 hadal tubeworm specimens. What is the total volume of specimens cataloged in the dive?",
      "storyContext": "Liam logs biological samples into the refrigerated specimen freezer.",
      "modelData": {
        "bars": [
          {
            "label": "Benthic Crustaceans",
            "value": 28,
            "color": "#06b6d4"
          },
          {
            "label": "Hadal Tubeworms",
            "value": 32,
            "color": "#10b981"
          }
        ],
        "total": 60,
        "unit": "specimens"
      },
      "target_answer": 60,
      "unit": "specimens",
      "steps": [
        "Take 28 benthic crustacean specimens.",
        "Add 32 hadal tubeworm specimens.",
        "28 + 32 = 60 specimens in total."
      ]
    },
    {
      "id": "w130_p2",
      "type": "comparison",
      "title": "Hydrostatic Pressure Comparison",
      "question": "Atmospheric pressure at sea level is 1 atmosphere, whereas hydrostatic pressure at the hadal trench bottom reaches 1,050 atmospheres. How many more atmospheres of pressure are exerted at the trench floor?",
      "storyContext": "Dr. Brooks calibrates titanium hull strain gauges before deep descent.",
      "modelData": {
        "bars": [
          {
            "label": "Trench Floor Pressure",
            "value": 1050,
            "color": "#ef4444"
          },
          {
            "label": "Sea Level Pressure",
            "value": 1,
            "color": "#3b82f6"
          }
        ],
        "difference": 1049,
        "unit": "atmospheres"
      },
      "target_answer": 1049,
      "unit": "atmospheres",
      "steps": [
        "Start with 1050 atmospheres at trench depth.",
        "Subtract 1 atmosphere at sea level.",
        "1050 - 1 = 1049 atmospheres greater."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Deep Ocean Exploration & Abyssal Organisms Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Ocean Depth Zones and Organisms",
        "diagram_type": "ocean_depth_zones",
        "instruction": "Match each marine creature to its natural oceanic depth zone.",
        "items": [
          {
            "label": "Sunlit Dolphin -> Epipelagic Zone (0-200m)",
            "target": "epipelagic"
          },
          {
            "label": "Anglerfish -> Midnight Zone (1000-4000m)",
            "target": "bathypelagic"
          },
          {
            "label": "Giant Tubeworm -> Hadal Trench (>6000m)",
            "target": "hadal"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Chemosynthetic Energy Cycle",
        "diagram_type": "chemosynthesis_pathway",
        "instruction": "Trace the flow of chemical energy from volcanic magma to trench predator.",
        "items": [
          {
            "label": "Hydrothermal Vent Emits Hydrogen Sulfide",
            "target": "step_1"
          },
          {
            "label": "Bacteria Metabolize Minerals via Chemosynthesis",
            "target": "step_2"
          },
          {
            "label": "Crustaceans and Snailfish Graze on Bacteria",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Benthic Sanctuary Protection",
        "diagram_type": "conservation_priority",
        "instruction": "Select the three crucial international protocols that safeguard abyssal trenches.",
        "items": [
          {
            "label": "Establish Marine Protected Area Boundaries",
            "target": "safeguard_1"
          },
          {
            "label": "Prohibit Commercial Seabed Dredging",
            "target": "safeguard_2"
          },
          {
            "label": "Mandate Open-Access Scientific Telemetry",
            "target": "safeguard_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
