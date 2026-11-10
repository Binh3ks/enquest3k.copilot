/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 127 | Theme: "Rebuttal Practice" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.447Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 127,
  "theme": "Rebuttal Practice",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "On the contrary, recent scientific evidence proves that the premise was false.",
      "options": [
        "On the contrary,",
        "In addition to,",
        "Consequently,"
      ],
      "answer": "On the contrary,",
      "explanation": "Use 'On the contrary,' to signal that a preceding assertion was incorrect and the opposite is true."
    },
    {
      "sentence": "While proponents claim that costs are high, long-term savings outweigh initial expenses.",
      "options": [
        "While",
        "During",
        "Because of"
      ],
      "answer": "While",
      "explanation": "Use 'While' to introduce a concession clause that contrasts with the main clause."
    },
    {
      "sentence": "They claim that space travel is wasteful, but evidence shows it pioneers vital medical technologies.",
      "options": [
        "shows",
        "show",
        "showing"
      ],
      "answer": "shows",
      "explanation": "The uncountable singular noun 'evidence' takes the singular verb 'shows'."
    },
    {
      "sentence": "Debaters must disagree with arguments without attacking an opponent's character.",
      "options": [
        "disagree with",
        "disagree to",
        "disagree for"
      ],
      "answer": "disagree with",
      "explanation": "Use the preposition 'with' after the verb 'disagree' when referring to arguments or people."
    },
    {
      "sentence": "If the foundational premise is invalid, the entire conclusion collapses.",
      "options": [
        "invalid",
        "invalided",
        "invalidity"
      ],
      "answer": "invalid",
      "explanation": "Use the adjective 'invalid' after the linking verb 'is'."
    }
  ],
  "singapore_math": [
    {
      "id": "w127_p1",
      "type": "part_whole",
      "title": "Tallying Debate Tournament Score Elements",
      "question": "In a debate adjudication, the affirmative team scored 42 points for constructive argument delivery and 48 points for rebuttal responsiveness. What was their total score?",
      "storyContext": "Lucas tallies score cards after the tournament round.",
      "modelData": {
        "bars": [
          {
            "label": "Constructive Arguments",
            "value": 42,
            "color": "#3b82f6"
          },
          {
            "label": "Rebuttal Responsiveness",
            "value": 48,
            "color": "#10b981"
          }
        ],
        "total": 90,
        "unit": "points"
      },
      "target_answer": 90,
      "unit": "points",
      "steps": [
        "Take constructive points: 42.",
        "Add rebuttal points: 48.",
        "42 + 48 = 90 points in total."
      ]
    },
    {
      "id": "w127_p2",
      "type": "comparison",
      "title": "Comparing Rebuttal Speaking Times",
      "question": "The affirmative speaker spent 180 seconds refuting statistical claims, whereas the negative speaker spent only 105 seconds. How many more seconds did the affirmative speaker devote to evidence rebuttal?",
      "storyContext": "Nora reviews audio recording timestamps to assess speaking time allocation.",
      "modelData": {
        "bars": [
          {
            "label": "Affirmative Rebuttal",
            "value": 180,
            "color": "#6366f1"
          },
          {
            "label": "Negative Rebuttal",
            "value": 105,
            "color": "#f59e0b"
          }
        ],
        "difference": 75,
        "unit": "seconds"
      },
      "target_answer": 75,
      "unit": "seconds",
      "steps": [
        "Start with affirmative time: 180 seconds.",
        "Subtract negative time: 105 seconds.",
        "180 - 105 = 75 seconds more devoted to rebuttal."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Rebuttal Practice Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Dissecting Opposing Arguments & Identifying Flaws",
        "diagram_type": "argument_claim_premise_breakdown",
        "instruction": "Deconstruct an opposing claim into underlying premises, evidence, and logical flaws.",
        "items": [
          {
            "label": "Opponent Core Claim",
            "target": "thesis_target"
          },
          {
            "label": "Unproven Premise Assumption",
            "target": "logical_flaw"
          },
          {
            "label": "Counter-Evidence Repository",
            "target": "rebuttal_proof"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Mapping the 'They Say... But I Say...' Structure",
        "diagram_type": "rebuttal_contrast_scaffolding",
        "instruction": "Assemble contrasting rhetorical units using rebuttal transition signals.",
        "items": [
          {
            "label": "Opposing View: 'They argue that...'",
            "target": "concession_node"
          },
          {
            "label": "Contrast Connector: 'On the contrary...'",
            "target": "pivot_marker"
          },
          {
            "label": "Affirmative Claim: 'Evidence demonstrates...'",
            "target": "counter_thesis"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Adjudicating Rebuttal Persuasiveness",
        "diagram_type": "debate_scoring_rubric_matrix",
        "instruction": "Evaluate responsiveness, empirical citations, and ethical cross-examination.",
        "items": [
          {
            "label": "Direct Argument Engagement",
            "target": "responsiveness_metric"
          },
          {
            "label": "Verifiable Empirical Citation",
            "target": "evidence_metric"
          },
          {
            "label": "Absence of Fallacious Attacks",
            "target": "ethics_metric"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
