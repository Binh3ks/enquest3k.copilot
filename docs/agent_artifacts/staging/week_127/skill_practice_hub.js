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
      "id": "w127_p1",
      "type": "part_whole",
      "title": "Problem 1: Critical Thinking on Debater Points",
      "question": "A debater made a false calculation claim. In critical thinking analysis, Team A scored 40 valid points on speech 1 and 30 valid points on speech 2. What is their true combined score?",
      "storyContext": "Debate judges check scoring logs for calculation errors.",
      "modelData": {
        "bars": [
          {
            "label": "Speech 1",
            "value": 40,
            "color": "#0284c7"
          },
          {
            "label": "Speech 2",
            "value": 30,
            "color": "#10b981"
          }
        ],
        "total": 70,
        "unit": "points"
      },
      "target_answer": 70,
      "unit": "points",
      "steps": [
        "Speech 1 points: 40.",
        "Speech 2 points: 30.",
        "40 + 30 = 70 points in truth."
      ]
    },
    {
      "id": "w127_p2",
      "type": "comparison",
      "title": "Problem 2: Critical Thinking Math on Survey Size",
      "question": "A critical thinking analysis exposes a misleading claim. School A surveyed 150 students while School B surveyed only 90 students. How many more students participated in School A's true sample?",
      "storyContext": "Researchers verify statistical claims before debate rounds.",
      "modelData": {
        "bars": [
          {
            "label": "School A",
            "value": 150,
            "color": "#6366f1"
          },
          {
            "label": "School B",
            "value": 90,
            "color": "#f59e0b"
          }
        ],
        "difference": 60,
        "unit": "students"
      },
      "target_answer": 60,
      "unit": "students",
      "steps": [
        "School A sample: 150 students.",
        "School B sample: 90 students.",
        "150 - 90 = 60 students."
      ]
    },
    {
      "id": "w127_p3",
      "type": "part_whole",
      "title": "Problem 3: Rebutting Exaggerated Survey Claims",
      "question": "An opponent claimed 100 people supported a plan. The rebuttal team verified 55 true votes and 25 false entries on the roster. How many total entries were submitted for inspection?",
      "storyContext": "Auditors review ballot claims for mathematical accuracy.",
      "modelData": {
        "bars": [
          {
            "label": "True Votes",
            "value": 55,
            "color": "#14b8a6"
          },
          {
            "label": "Invalid Entries",
            "value": 25,
            "color": "#ef4444"
          }
        ],
        "total": 80,
        "unit": "entries"
      },
      "target_answer": 80,
      "unit": "entries",
      "steps": [
        "Valid entries: 55.",
        "Invalid entries: 25.",
        "55 + 25 = 80 total entries."
      ]
    },
    {
      "id": "w127_p4",
      "type": "comparison",
      "title": "Problem 4: Critical Thinking on Discrepancy",
      "question": "Critical thinking math reveals that a speaker claimed 120 affirmative votes, but the official tally showed only 85 votes. What was the false exaggeration discrepancy?",
      "storyContext": "Fact-checkers calculate discrepancies in debate evidence.",
      "modelData": {
        "bars": [
          {
            "label": "Claimed Votes",
            "value": 120,
            "color": "#e11d48"
          },
          {
            "label": "Actual Votes",
            "value": 85,
            "color": "#0d9488"
          }
        ],
        "difference": 35,
        "unit": "votes"
      },
      "target_answer": 35,
      "unit": "votes",
      "steps": [
        "Claimed votes: 120.",
        "Actual votes: 85.",
        "120 - 85 = 35 votes."
      ]
    },
    {
      "id": "w127_p5",
      "type": "part_whole",
      "title": "Problem 5: Balanced Arguments in Critical Thinking",
      "question": "A critical thinking dossier compiles 35 supporting evidence cards and 25 counter arguments. How many total argument cards are compiled in the debate folder?",
      "storyContext": "Debaters assemble balanced evidence sets for rebuttal rounds.",
      "modelData": {
        "bars": [
          {
            "label": "Pro Cards",
            "value": 35,
            "color": "#3b82f6"
          },
          {
            "label": "Counter Cards",
            "value": 25,
            "color": "#8b5cf6"
          }
        ],
        "total": 60,
        "unit": "argument cards"
      },
      "target_answer": 60,
      "unit": "argument cards",
      "steps": [
        "Supporting cards: 35.",
        "Counter cards: 25.",
        "35 + 25 = 60 cards."
      ]
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
