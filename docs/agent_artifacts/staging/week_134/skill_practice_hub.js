/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 134 | Theme: "Economics & International Trade: Globalization" | CEFR: B2 First
 * Generated: 2026-11-09T13:11:11.320Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 134,
  "theme": "Economics & International Trade: Globalization",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "Whereas tariffs protect domestic firms, they nevertheless raise consumer prices.",
      "options": [
        "nevertheless",
        "furthermore",
        "because"
      ],
      "answer": "nevertheless",
      "explanation": "Concessive discourse marker 'nevertheless' introduces a contrasting consequence after a concessive 'Whereas' clause."
    },
    {
      "sentence": "Despite exchange rate fluctuations, bilateral trade continued to expand.",
      "options": [
        "Despite",
        "Although",
        "Whereas"
      ],
      "answer": "Despite",
      "explanation": "Preposition 'Despite' takes a noun phrase ('exchange rate fluctuations') to show concession."
    },
    {
      "sentence": "The assumption that deficits cause poverty is an economic fallacy.",
      "options": [
        "is",
        "are",
        "were"
      ],
      "answer": "is",
      "explanation": "Singular subject 'The assumption' takes singular verb 'is'."
    },
    {
      "sentence": "Valid economic models incorporate empirical import and export data.",
      "options": [
        "incorporate",
        "incorporates",
        "incorporating"
      ],
      "answer": "incorporate",
      "explanation": "Plural subject 'Valid economic models' takes base plural verb 'incorporate'."
    },
    {
      "sentence": "Comparative advantage demonstrates that mutual trade benefits both nations.",
      "options": [
        "demonstrates",
        "demonstrate",
        "demonstrating"
      ],
      "answer": "demonstrates",
      "explanation": "Singular non-count subject 'Comparative advantage' takes 3rd person singular verb 'demonstrates'."
    }
  ],
  "singapore_math": [
    {
      "id": "w134_p1",
      "type": "part_whole",
      "title": "Bilateral Trade Value Calculation",
      "question": "A nation exported 620 million dollars of manufactured electronics and 380 million dollars of agricultural goods. What was the total value of its exports in millions of dollars?",
      "storyContext": "Oliver aggregates international customs shipment invoices on the central ledger.",
      "modelData": {
        "bars": [
          {
            "label": "Manufactured Electronics",
            "value": 620,
            "color": "#3b82f6"
          },
          {
            "label": "Agricultural Produce",
            "value": 380,
            "color": "#10b981"
          }
        ],
        "total": 1000,
        "unit": "million dollars"
      },
      "target_answer": 1000,
      "unit": "million dollars",
      "steps": [
        "Take 620 million dollars from electronics exports.",
        "Add 380 million dollars from agricultural exports.",
        "620 + 380 = 1000 million dollars in total exports."
      ]
    },
    {
      "id": "w134_p2",
      "type": "comparison",
      "title": "Trade Balance Surplus vs Deficit",
      "question": "A country recorded 850 million dollars in total exports and 600 million dollars in total imports during the fourth quarter. How large was its commercial trade surplus in millions of dollars?",
      "storyContext": "Dr. Vance computes the national trade balance sheet at the ministry.",
      "modelData": {
        "bars": [
          {
            "label": "Total Exports",
            "value": 850,
            "color": "#10b981"
          },
          {
            "label": "Total Imports",
            "value": 600,
            "color": "#f59e0b"
          }
        ],
        "difference": 250,
        "unit": "million dollars"
      },
      "target_answer": 250,
      "unit": "million dollars",
      "steps": [
        "Start with 850 million dollars in exports.",
        "Subtract 600 million dollars in imports.",
        "850 - 600 = 250 million dollars trade surplus."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Economics & International Trade: Globalization Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Economic Concepts Classification",
        "diagram_type": "economic_matrix",
        "instruction": "Match each economic term to its correct definition.",
        "items": [
          {
            "label": "Tariff -> Import Tax on Crossing Customs",
            "target": "tariff"
          },
          {
            "label": "Subsidy -> State Financial Grant to Industry",
            "target": "subsidy"
          },
          {
            "label": "Surplus -> Exports Exceed Total Imports",
            "target": "surplus"
          },
          {
            "label": "Deficit -> Imports Exceed Total Exports",
            "target": "deficit"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Comparative Advantage Flow",
        "diagram_type": "trade_specialization",
        "instruction": "Trace the sequence of specialization from opportunity cost to mutual gain.",
        "items": [
          {
            "label": "Identify Lower Opportunity Cost Production",
            "target": "step_1"
          },
          {
            "label": "Specialize in Exporting Efficient Commodities",
            "target": "step_2"
          },
          {
            "label": "Mutual Gains Expand Total Consumption",
            "target": "step_3"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Trade Accord Enactment",
        "diagram_type": "treaty_milestones",
        "instruction": "Order the mandatory stages before multilateral treaty enforcement.",
        "items": [
          {
            "label": "Bilateral Tariff Schedule Negotiations",
            "target": "phase_1"
          },
          {
            "label": "Empirical Economic Impact Modeling",
            "target": "phase_2"
          },
          {
            "label": "Multilateral Legislative Ratification",
            "target": "phase_3"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
