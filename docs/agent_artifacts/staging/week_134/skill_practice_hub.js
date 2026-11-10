/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 134 | Theme: "Identifying Fallacies" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.456Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 134,
  "theme": "Identifying Fallacies",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "Many adolescent players tend to develop strong teamwork skills.",
      "options": [
        "tend to",
        "tend on",
        "tending to"
      ],
      "answer": "tend to",
      "explanation": "Use 'tend to' followed by a base verb to express a habitual likelihood or disposition."
    },
    {
      "sentence": "Claiming that all gamers are unmotivated is an invalid generalization.",
      "options": [
        "an invalid",
        "a invalid",
        "invalid an"
      ],
      "answer": "an invalid",
      "explanation": "Use the indefinite article 'an' before the vowel sound in 'invalid'."
    },
    {
      "sentence": "Critical thinkers use qualifiers such as some, many, and often.",
      "options": [
        "such as",
        "as such",
        "such like"
      ],
      "answer": "such as",
      "explanation": "Use 'such as' to introduce specific illustrative examples."
    },
    {
      "sentence": "An argument is sound only when its foundational premises are true.",
      "options": [
        "premises are true",
        "premises is true",
        "premise are true"
      ],
      "answer": "premises are true",
      "explanation": "The plural subject 'premises' requires the plural verb 'are'."
    },
    {
      "sentence": "Drawing a hasty conclusion from a single example creates misleading stereotypes.",
      "options": [
        "creates",
        "create",
        "creating"
      ],
      "answer": "creates",
      "explanation": "The singular gerund phrase 'Drawing a hasty conclusion...' takes the singular verb 'creates'."
    }
  ],
  "singapore_math": [
    {
      "id": "w134_p1",
      "type": "part_whole",
      "title": "Tallying Logical Fallacies in a Media Sample",
      "question": "In an audit of 50 opinion articles, Zoe identified 18 hasty generalizations and 12 false cause fallacies. How many total fallacies did she detect across these two categories?",
      "storyContext": "Zoe categorizes reasoning errors on a media audit ledger.",
      "modelData": {
        "bars": [
          {
            "label": "Hasty Generalizations",
            "value": 18,
            "color": "#ef4444"
          },
          {
            "label": "False Cause Fallacies",
            "value": 12,
            "color": "#f59e0b"
          }
        ],
        "total": 30,
        "unit": "fallacies"
      },
      "target_answer": 30,
      "unit": "fallacies",
      "steps": [
        "Take hasty generalizations: 18.",
        "Add false cause fallacies: 12.",
        "18 + 12 = 30 total fallacies detected."
      ]
    },
    {
      "id": "w134_p2",
      "type": "comparison",
      "title": "Comparing Qualified Statements vs Universal Generalizations",
      "question": "In a debate transcript, team A used 35 qualified statements (using 'some' or 'often'), while team B used only 14 qualified statements, relying mostly on sweeping extremes. How many more qualified statements did team A use?",
      "storyContext": "Liam compares rhetorical qualifiers on a debate balance graph.",
      "modelData": {
        "bars": [
          {
            "label": "Team A (Careful Qualifiers)",
            "value": 35,
            "color": "#10b981"
          },
          {
            "label": "Team B (Sweeping Extremes)",
            "value": 14,
            "color": "#64748b"
          }
        ],
        "difference": 21,
        "unit": "statements"
      },
      "target_answer": 21,
      "unit": "statements",
      "steps": [
        "Start with Team A: 35 statements.",
        "Subtract Team B: 14 statements.",
        "35 - 14 = 21 more qualified statements."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Identifying Fallacies Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Dismantling Hasty Generalization Syllogisms",
        "diagram_type": "syllogistic_fallacy_breakdown_flow",
        "instruction": "Identify the flawed inductive leap from an isolated anecdote to a universal premise.",
        "items": [
          {
            "label": "Isolated Particular Case",
            "target": "narrow_observation"
          },
          {
            "label": "Unwarranted Inductive Leap",
            "target": "fallacious_step"
          },
          {
            "label": "Flawed Universal Stereotype",
            "target": "invalid_conclusion"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Inserting Epistemic Modal Qualifiers",
        "diagram_type": "epistemic_qualifier_tuning_matrix",
        "instruction": "Calibrate universal assertions with probability qualifiers ('often', 'tend to', 'some').",
        "items": [
          {
            "label": "Universal Extreme ('All / Never')",
            "target": "vulnerable_extreme"
          },
          {
            "label": "Nuanced Qualifier Filter",
            "target": "epistemic_moderator"
          },
          {
            "label": "Defensible Empirical Claim",
            "target": "sound_assertion"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Validating Deductive Soundness Matrix",
        "diagram_type": "deductive_truth_soundness_tree",
        "instruction": "Test both structural logical validity and empirical factual truth of premises.",
        "items": [
          {
            "label": "Factually True Premise A",
            "target": "empirical_basis"
          },
          {
            "label": "Valid Deductive Inference Step",
            "target": "structural_rule"
          },
          {
            "label": "Sound and Incontestable Conclusion",
            "target": "verified_soundness"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
