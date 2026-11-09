/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 131 | Theme: "Genetics & Biotechnology: Modern Agriculture" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.316Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 131,
  "theme": "Genetics & Biotechnology: Modern Agriculture",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "Drought-resistant crops, which researchers developed, yield more grain.",
      "options": [
        "which",
        "who",
        "where"
      ],
      "answer": "which",
      "explanation": "Non-defining relative clause modifying a thing ('Drought-resistant crops') requires relative pronoun 'which'."
    },
    {
      "sentence": "Farmers whose fields suffer from salinity welcomed the new seeds.",
      "options": [
        "whose",
        "whom",
        "which"
      ],
      "answer": "whose",
      "explanation": "Relative possessive pronoun 'whose' indicates ownership ('whose fields')."
    },
    {
      "sentence": "The laboratory where the genome was sequenced is world-renowned.",
      "options": [
        "where",
        "which",
        "when"
      ],
      "answer": "where",
      "explanation": "Relative adverb 'where' introduces a relative clause describing a physical place ('The laboratory')."
    },
    {
      "sentence": "Wild grass varieties provide traits that breeders need for resistance.",
      "options": [
        "that",
        "who",
        "whom"
      ],
      "answer": "that",
      "explanation": "Defining relative pronoun 'that' refers to things ('traits')."
    },
    {
      "sentence": "Agronomists who study plant genetics develop sustainable crop solutions.",
      "options": [
        "who",
        "which",
        "whose"
      ],
      "answer": "who",
      "explanation": "Defining relative pronoun 'who' refers to people ('Agronomists')."
    }
  ],
  "singapore_math": [
    {
      "id": "w131_p1",
      "type": "part_whole",
      "title": "Seed Bank Trait Preservation Registry",
      "question": "A conservation seed bank preserves 520 wild drought-resistant cereal varieties and 280 pest-resistant legume varieties. What is the total number of resilient seed varieties cataloged?",
      "storyContext": "Naomi tallies barcoded seed cryo-tubes in the national germplasm vault.",
      "modelData": {
        "bars": [
          {
            "label": "Drought Cereals",
            "value": 520,
            "color": "#f59e0b"
          },
          {
            "label": "Resistant Legumes",
            "value": 280,
            "color": "#10b981"
          }
        ],
        "total": 800,
        "unit": "varieties"
      },
      "target_answer": 800,
      "unit": "varieties",
      "steps": [
        "Take 520 wild drought-resistant cereal varieties.",
        "Add 280 pest-resistant legume varieties.",
        "520 + 280 = 800 varieties preserved."
      ]
    },
    {
      "id": "w131_p2",
      "type": "comparison",
      "title": "Experimental Crop Yield Comparison",
      "question": "A test field planted with bioengineered wheat produced 65 bushels per hectare, whereas the unedited traditional crop yielded only 40 bushels per hectare under drought. How many more bushels per hectare did the bioengineered wheat yield?",
      "storyContext": "Dr. Thorne weighs grain combines following seasonal harvest trials.",
      "modelData": {
        "bars": [
          {
            "label": "Bioengineered Wheat",
            "value": 65,
            "color": "#10b981"
          },
          {
            "label": "Unedited Traditional",
            "value": 40,
            "color": "#ef4444"
          }
        ],
        "difference": 25,
        "unit": "bushels"
      },
      "target_answer": 25,
      "unit": "bushels",
      "steps": [
        "Start with 65 bushels per hectare from bioengineered wheat.",
        "Subtract 40 bushels per hectare from unedited crop.",
        "65 - 40 = 25 more bushels per hectare."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Genetics & Biotechnology: Modern Agriculture Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Genetic Trait Selection",
        "diagram_type": "trait_selection_grid",
        "instruction": "Match each agricultural challenge to its corresponding genetic defense trait.",
        "items": [
          {
            "label": "Arid Soil -> Deep Root Architecture",
            "target": "drought"
          },
          {
            "label": "Coastal Salt Inundation -> Ion Exclusion Pump",
            "target": "salinity"
          },
          {
            "label": "Fungal Spore Infection -> Chitinase Enzyme Defense",
            "target": "pest"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Crop Breeding Pipeline",
        "diagram_type": "breeding_pipeline",
        "instruction": "Trace the developmental sequence from wild gene discovery to harvest.",
        "items": [
          {
            "label": "Identify Beneficial Trait in Wild Relative",
            "target": "step_1"
          },
          {
            "label": "Greenhouse Hydroponic Stress Screening",
            "target": "step_2"
          },
          {
            "label": "Multi-Season Coastal Field Trials",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Global Food Security Governance",
        "diagram_type": "governance_pyramid",
        "instruction": "Order the institutional milestones for ethical seed deployment.",
        "items": [
          {
            "label": "Environmental Biosafety Assessment",
            "target": "phase_1"
          },
          {
            "label": "Open-Source Humanitarian Licensing",
            "target": "phase_2"
          },
          {
            "label": "Farmer Cooperative Seed Handover",
            "target": "phase_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
