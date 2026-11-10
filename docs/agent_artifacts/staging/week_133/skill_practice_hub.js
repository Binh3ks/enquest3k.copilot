/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 133 | Theme: "Deep Research & Data" | CEFR: B2 First
 * Generated: 2026-11-10T03:12:16.455Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 133,
  "theme": "Deep Research & Data",
  "cefr_level": "B2 First",
  "grammar_drills": [
    {
      "sentence": "According to a study by university psychologists, seventy percent play video games.",
      "options": [
        "According to",
        "According with",
        "According from"
      ],
      "answer": "According to",
      "explanation": "Use 'According to' followed by a source or authority to introduce cited evidence."
    },
    {
      "sentence": "Statistics demonstrate that a small minority exhibits signs of fatigue.",
      "options": [
        "demonstrate",
        "demonstrates",
        "demonstrating"
      ],
      "answer": "demonstrate",
      "explanation": "The plural noun 'Statistics' takes the plural verb 'demonstrate'."
    },
    {
      "sentence": "Data reveals that cooperative games build strong teamwork skills.",
      "options": [
        "reveals that",
        "reveals for",
        "revealing that"
      ],
      "answer": "reveals that",
      "explanation": "Use 'reveals that' followed by a declarative clause to present research findings."
    },
    {
      "sentence": "Researchers analyzed a randomized demographic sample of two thousand students.",
      "options": [
        "analyzed",
        "analyze",
        "analyzing"
      ],
      "answer": "analyzed",
      "explanation": "Use past simple 'analyzed' to describe completed research actions."
    },
    {
      "sentence": "A substantial majority of respondents reported positive social connections.",
      "options": [
        "majority of",
        "majority to",
        "majority from"
      ],
      "answer": "majority of",
      "explanation": "Use the preposition 'of' after 'majority' to specify the population subgroup."
    }
  ],
  "singapore_math": [
    {
      "id": "w133_p1",
      "type": "part_whole",
      "title": "Calculating Survey Cohort Participation Numbers",
      "question": "In a survey of 1,000 students, 700 students (70 percent) reported playing video games weekly, while 300 students reported zero gaming activity. What is the total survey sample size?",
      "storyContext": "Hannah tallies demographic participation numbers in a research ledger.",
      "modelData": {
        "bars": [
          {
            "label": "Weekly Gamers (70%)",
            "value": 700,
            "color": "#10b981"
          },
          {
            "label": "Non-Gamers (30%)",
            "value": 300,
            "color": "#64748b"
          }
        ],
        "total": 1000,
        "unit": "students"
      },
      "target_answer": 1000,
      "unit": "students",
      "steps": [
        "Take weekly gamers: 700 students.",
        "Add non-gamers: 300 students.",
        "700 + 300 = 1,000 total students in the sample."
      ]
    },
    {
      "id": "w133_p2",
      "type": "comparison",
      "title": "Comparing Majority Cooperative Gamers vs Minority Solitary Gamers",
      "question": "Out of 700 adolescent gamers, 490 students play cooperative multiplayer titles, while 210 students play solitary single-player games. How many more students play cooperative games than solitary games?",
      "storyContext": "Ethan graphs gaming modality distributions on a comparative chart.",
      "modelData": {
        "bars": [
          {
            "label": "Cooperative Multiplayer",
            "value": 490,
            "color": "#3b82f6"
          },
          {
            "label": "Solitary Single-Player",
            "value": 210,
            "color": "#f59e0b"
          }
        ],
        "difference": 280,
        "unit": "students"
      },
      "target_answer": 280,
      "unit": "students",
      "steps": [
        "Start with cooperative players: 490 students.",
        "Subtract solitary players: 210 students.",
        "490 - 210 = 280 more students playing cooperative titles."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Deep Research & Data Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Sampling Representative Demographic Populations",
        "diagram_type": "stratified_population_sample_matrix",
        "instruction": "Calibrate demographic sampling proportions across age, school district, and gender.",
        "items": [
          {
            "label": "Target Adolescent Population",
            "target": "universe_scope"
          },
          {
            "label": "Stratified Demographic Quota",
            "target": "sampling_filter"
          },
          {
            "label": "Randomized Participant Cohort",
            "target": "empirical_sample"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Mapping Quantitative Survey Correlation Curves",
        "diagram_type": "scatter_plot_correlation_regression",
        "instruction": "Analyze statistical regression lines connecting gaming hours with academic grades.",
        "items": [
          {
            "label": "Weekly Active Gaming Hours (X-Axis)",
            "target": "independent_var"
          },
          {
            "label": "Academic Grade Point Average (Y-Axis)",
            "target": "dependent_var"
          },
          {
            "label": "Non-Linear Regression Threshold Curve",
            "target": "correlation_line"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Publishing Verifiable Open-Access Datasets",
        "diagram_type": "academic_data_repository_pipeline",
        "instruction": "Package raw survey responses, statistical scripts, and methodology documentation.",
        "items": [
          {
            "label": "Anonymized Survey Microdata",
            "target": "raw_dataset"
          },
          {
            "label": "Reproducible Analysis Script",
            "target": "code_repository"
          },
          {
            "label": "Peer-Reviewed Open Access Report",
            "target": "published_study"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
