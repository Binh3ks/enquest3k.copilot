/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 133 | Theme: "Astrophysics: Black Holes, Galaxies & Gravity" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.318Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 133,
  "theme": "Astrophysics: Black Holes, Galaxies & Gravity",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "The detected gravitational signal must have originated from colliding black holes.",
      "options": [
        "must have originated",
        "can originate",
        "should originate"
      ],
      "answer": "must have originated",
      "explanation": "Modal of deduction for logical certainty about a past event uses 'must have + past participle'."
    },
    {
      "sentence": "The distant galaxy cannot be younger than ten billion years.",
      "options": [
        "cannot be",
        "must not have been",
        "might to be"
      ],
      "answer": "cannot be",
      "explanation": "Modal of deduction for present impossibility uses 'cannot + base verb'."
    },
    {
      "sentence": "The majority of large galaxies harbor supermassive black holes.",
      "options": [
        "harbor",
        "harbors",
        "harboring"
      ],
      "answer": "harbor",
      "explanation": "Subject 'The majority of large galaxies' takes plural verb form 'harbor'."
    },
    {
      "sentence": "Statistical data confirms that cosmic expansion is accelerating.",
      "options": [
        "confirms",
        "confirm",
        "confirming"
      ],
      "answer": "confirms",
      "explanation": "Non-count collective noun 'Statistical data' treated as singular subject takes 'confirms'."
    },
    {
      "sentence": "Light from the supernova could have taken billions of years to reach Earth.",
      "options": [
        "could have taken",
        "must take",
        "can have taken"
      ],
      "answer": "could have taken",
      "explanation": "Modal of past possibility uses 'could have + past participle'."
    }
  ],
  "singapore_math": [
    {
      "id": "w133_p1",
      "type": "part_whole",
      "title": "Galactic Black Hole Survey Population",
      "question": "An astronomical survey analyzed 720 spiral galaxies and 280 elliptical galaxies for central supermassive black holes. What was the total population of galaxies surveyed?",
      "storyContext": "Zoe verifies galaxy classification tallies in the deep-space survey catalog.",
      "modelData": {
        "bars": [
          {
            "label": "Spiral Galaxies",
            "value": 720,
            "color": "#3b82f6"
          },
          {
            "label": "Elliptical Galaxies",
            "value": 280,
            "color": "#10b981"
          }
        ],
        "total": 1000,
        "unit": "galaxies"
      },
      "target_answer": 1000,
      "unit": "galaxies",
      "steps": [
        "Take 720 spiral galaxies surveyed.",
        "Add 280 elliptical galaxies surveyed.",
        "720 + 280 = 1000 galaxies in total."
      ]
    },
    {
      "id": "w133_p2",
      "type": "comparison",
      "title": "Merging Black Hole Solar Mass Comparison",
      "question": "In a binary black hole merger, the primary black hole possessed 36 solar masses, while the secondary black hole possessed 29 solar masses. By how many solar masses was the primary black hole larger?",
      "storyContext": "Dr. Sagan-Smith computes gravitational wave mass parameters from laser telemetry.",
      "modelData": {
        "bars": [
          {
            "label": "Primary Black Hole",
            "value": 36,
            "color": "#8b5cf6"
          },
          {
            "label": "Secondary Black Hole",
            "value": 29,
            "color": "#06b6d4"
          }
        ],
        "difference": 7,
        "unit": "solar masses"
      },
      "target_answer": 7,
      "unit": "solar masses",
      "steps": [
        "Start with 36 solar masses of the primary black hole.",
        "Subtract 29 solar masses of the secondary black hole.",
        "36 - 29 = 7 solar masses difference."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Astrophysics: Black Holes, Galaxies & Gravity Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Astrophysical Classification",
        "diagram_type": "celestial_scale_matrix",
        "instruction": "Match each cosmic structure to its corresponding physical scale.",
        "items": [
          {
            "label": "Singularity -> Infinite Density Point",
            "target": "singularity"
          },
          {
            "label": "Event Horizon -> Boundary of No Escape",
            "target": "event_horizon"
          },
          {
            "label": "Spiral Galaxy -> Billions of Stars in Orbit",
            "target": "galaxy"
          },
          {
            "label": "Gravitational Wave -> Spacetime Ripple",
            "target": "wave"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Gravitational Wave Detection Pipeline",
        "diagram_type": "detection_pipeline",
        "instruction": "Trace the sequence of detection from cosmic collision to scientific proof.",
        "items": [
          {
            "label": "Black Holes Merge in Distant Galaxy",
            "target": "step_1"
          },
          {
            "label": "Spacetime Ripples Travel Across Light-Years",
            "target": "step_2"
          },
          {
            "label": "Laser Interferometer Records Waveform",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Scientific Survey Verification",
        "diagram_type": "astrophysics_milestones",
        "instruction": "Order the mandatory stages for validating a new cosmic phenomenon.",
        "items": [
          {
            "label": "Multi-Telescope Array Calibration",
            "target": "stage_1"
          },
          {
            "label": "Statistical Data and Redshift Analysis",
            "target": "stage_2"
          },
          {
            "label": "Peer-Reviewed Observational Publication",
            "target": "stage_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
