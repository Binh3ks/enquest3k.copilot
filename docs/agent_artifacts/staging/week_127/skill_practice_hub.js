/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 127 | Theme: "Rebuttal Practice" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.855Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 127,
  "theme": "Rebuttal Practice",
  "cefr_level": "B1+ Academic",
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
      "id": 1,
      "title": "Exposing a Double-Counting Claim",
      "difficulty": "medium",
      "type": "critical_thinking",
      "problemText": "An opponent argues: 'In our 60-student grade, 38 students read news blogs and 34 watch video debates, so 72 different students follow current events!' Suppose every student does at least one of those two activities. At minimum, how many students did the opponent count twice?",
      "question": "An opponent argues: 'In our 60-student grade, 38 students read news blogs and 34 watch video debates, so 72 different students follow current events!' Suppose every student does at least one of those two activities. At minimum, how many students did the opponent count twice?",
      "correctAnswer": 12,
      "unit": "students",
      "hintText": "A 60-student grade cannot contain 72 separate students. The excess above 60 reveals the minimum overlap counted twice.",
      "steps": [
        "Sum of the two separate counts: 38 + 34 = 72.",
        "Subtract the real maximum population of the grade (60).",
        "Double-counted overlap: 72 - 60 = 12 students."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Claimed Sum: 72",
            "value": 72,
            "color": "#ef4444"
          },
          {
            "label": "Real Grade: 60",
            "value": 60,
            "color": "#4f46e5"
          }
        ]
      }
    },
    {
      "id": 2,
      "title": "Refuting Contradictory Ballot Totals",
      "difficulty": "medium",
      "type": "critical_thinking",
      "problemText": "A debate tally sheet claims that out of 80 total ballots cast, Team Alpha earned 44 votes, Team Beta earned 38 votes, and 14 ballots were left blank. Each ballot has only one mark (or blank). How many phantom (impossible) extra votes appear in that claimed tally?",
      "question": "A debate tally sheet claims that out of 80 total ballots cast, Team Alpha earned 44 votes, Team Beta earned 38 votes, and 14 ballots were left blank. Each ballot has only one mark (or blank). How many phantom (impossible) extra votes appear in that claimed tally?",
      "correctAnswer": 16,
      "unit": "votes",
      "hintText": "Add all three mutually exclusive categories together, then compare the sum against the 80 real ballots cast.",
      "steps": [
        "Claimed total across categories: 44 + 38 + 14 = 96.",
        "Compare against actual ballots cast: 80.",
        "Contradiction gap (phantom votes): 96 - 80 = 16."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Alpha: 44",
            "value": 44,
            "color": "#4f46e5"
          },
          {
            "label": "Beta: 38",
            "value": 38,
            "color": "#06b6d4"
          },
          {
            "label": "14",
            "value": 14,
            "color": "#94a3b8"
          }
        ],
        "totalLabel": "Claim 96 vs Real 80"
      }
    },
    {
      "id": 3,
      "title": "Detecting Denominator Neglect in Rates",
      "difficulty": "hard",
      "type": "critical_thinking",
      "problemText": "Speaker A claims School X performs better because it produced 45 debate winners out of 150 applicants (30%), whereas School Y produced 36 winners out of 90 applicants (40%). If School Y maintained its 40% winning rate across 150 applicants just like School X, how many MORE winners would School Y produce than School X?",
      "question": "Speaker A claims School X performs better because it produced 45 debate winners out of 150 applicants (30%), whereas School Y produced 36 winners out of 90 applicants (40%). If School Y maintained its 40% winning rate across 150 applicants just like School X, how many MORE winners would School Y produce than School X?",
      "correctAnswer": 15,
      "unit": "winners",
      "hintText": "Control for sample size first by finding 40% of 150 applicants for School Y, then subtract School X's 45 winners.",
      "steps": [
        "Compute School Y winners on an equal 150-applicant base: 40% of 150 = 60 winners.",
        "Compare fairly with School X (45 winners out of 150).",
        "Difference at equal scale: 60 - 45 = 15 more winners."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Y at 150: 40%",
            "value": 60,
            "color": "#10b981"
          },
          {
            "label": "X at 150: 45",
            "value": 45,
            "color": "#4f46e5"
          }
        ]
      }
    },
    {
      "id": 4,
      "title": "Exposing an Unweighted Average Fallacy",
      "difficulty": "hard",
      "type": "critical_thinking",
      "problemText": "A debater scores 60 points in Round 1 and 90 points in the Final Round, claiming a final average of 75 points. However, the rubric states that the Final Round counts TWICE as much (2 weights) as Round 1 (1 weight). What is the debater's true weighted average?",
      "question": "A debater scores 60 points in Round 1 and 90 points in the Final Round, claiming a final average of 75 points. However, the rubric states that the Final Round counts TWICE as much (2 weights) as Round 1 (1 weight). What is the debater's true weighted average?",
      "correctAnswer": 80,
      "unit": "points",
      "hintText": "Count Round 1 once (60) and the Final Round twice (90 + 90), then divide by the total number of weights (3).",
      "steps": [
        "Weighted sum: 60 + 90 + 90 = 240.",
        "Total weights: 1 + 2 = 3.",
        "True weighted average: 240 / 3 = 80 points."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "R1: 60",
            "value": 60,
            "color": "#4f46e5"
          },
          {
            "label": "R2 (x1): 90",
            "value": 90,
            "color": "#06b6d4"
          },
          {
            "label": "R2 (x2): 90",
            "value": 90,
            "color": "#10b981"
          }
        ],
        "totalLabel": "240 / 3 Weights = ?"
      }
    },
    {
      "id": 5,
      "title": "Challenging an Inflated Fraction Claim",
      "difficulty": "hard",
      "type": "critical_thinking",
      "problemText": "During a rebuttal, a speaker asserts that 3/5 of the 120 surveyed students oppose the new schedule. In reality, out of 120 students, 60 support the plan, 12 are undecided, and the rest oppose it. By how many students does the speaker exaggerate the opposition?",
      "question": "During a rebuttal, a speaker asserts that 3/5 of the 120 surveyed students oppose the new schedule. In reality, out of 120 students, 60 support the plan, 12 are undecided, and the rest oppose it. By how many students does the speaker exaggerate the opposition?",
      "correctAnswer": 24,
      "unit": "students",
      "hintText": "Find the claimed opposition (3/5 of 120) and the actual opposition (120 - 60 - 12), then subtract.",
      "steps": [
        "Claimed opposition: (3/5) x 120 = 72 students.",
        "Actual opposition: 120 - 60 - 12 = 48 students.",
        "Exaggeration: 72 - 48 = 24 students."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Claimed 3/5: 72",
            "value": 72,
            "color": "#ef4444"
          },
          {
            "label": "Real Oppose: ?",
            "value": 48,
            "color": "#4f46e5"
          }
        ]
      }
    }
  ],
  "science_lab": {
    "title_en": "Rebuttal Practice Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Identifying Claim vs Counter Evidence",
        "diagram_type": "claim_vs_evidence",
        "instruction": "Separate an opponent assertion from verified rebuttal facts.",
        "items": [
          {
            "label": "Opponent Generalization",
            "target": "claim_slot"
          },
          {
            "label": "Factual Counter Statistic",
            "target": "evidence_slot"
          },
          {
            "label": "Polite Rebuttal Phrase",
            "target": "bridge_slot"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Four-Step Rebuttal Frame",
        "diagram_type": "four_step_rebuttal",
        "instruction": "Assemble the standard four-part rebuttal formula.",
        "items": [
          {
            "label": "They claim that...",
            "target": "step_1_they_say"
          },
          {
            "label": "However, I argue that...",
            "target": "step_2_i_say"
          },
          {
            "label": "Because research indicates that...",
            "target": "step_3_because"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Politeness Register Calibration",
        "diagram_type": "politeness_register",
        "instruction": "Select polite connectors that respect the speaker while countering the idea.",
        "items": [
          {
            "label": "While I see your point...",
            "target": "polite_concession"
          },
          {
            "label": "On the other hand...",
            "target": "factual_contrast"
          },
          {
            "label": "Therefore, the balance shifts...",
            "target": "logical_conclusion"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
