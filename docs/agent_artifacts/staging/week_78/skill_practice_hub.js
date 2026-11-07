/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 78 | Theme: "Social Studies/ELA: Cultures / Math: Surveys" | CEFR: B1 PET
 * Generated: 2026-11-07T07:16:42.030Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 78,
  "theme": "Social Studies/ELA: Cultures / Math: Surveys",
  "cefr_level": "B1 PET",
  "grammar_drills": [
    {
      "id": 1,
      "prompt": "___ western holidays where meals are private, Latin carnivals take place outdoors.",
      "options": [
        "Unlike",
        "Similar",
        "Whereas"
      ],
      "answer": "Unlike"
    },
    {
      "id": 2,
      "prompt": "Asian mid-autumn celebrations are ___ to European harvest feasts in their communal spirit.",
      "options": [
        "similar",
        "same",
        "differently"
      ],
      "answer": "similar"
    },
    {
      "id": 3,
      "prompt": "Older rituals were solemn, ___ contemporary celebrations are lively and colorful.",
      "options": [
        "whereas",
        "unlike",
        "similar to"
      ],
      "answer": "whereas"
    },
    {
      "id": 4,
      "prompt": "The students tallied the survey results ___ than expected.",
      "options": [
        "faster",
        "fastest",
        "more fast"
      ],
      "answer": "faster"
    },
    {
      "id": 5,
      "prompt": "___ other cultural projects, our team surveyed three separate communities.",
      "options": [
        "Similar to",
        "Whereas",
        "Differently"
      ],
      "answer": "Similar to"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Problem 1: Festival Attendance Survey (Part-Whole)",
      "problemText": "In a survey of 250 students, 145 students celebrated the Lantern Festival and 85 students celebrated the Harvest Fair. The remaining students celebrated both. How many students celebrated both festivals?",
      "correctAnswer": 20,
      "answer": "20 students",
      "hintText": "Total (250) - Only Lantern (145) - Only Harvest (85) = 20 students celebrating both.",
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "value": 145,
            "label": "Lantern (145)",
            "color": "#f97316"
          },
          {
            "value": 85,
            "label": "Harvest (85)",
            "color": "#eab308"
          },
          {
            "value": 20,
            "label": "Both (20)",
            "color": "#10b981"
          }
        ],
        "totalLabel": "250 students surveyed"
      }
    },
    {
      "id": 2,
      "title": "Problem 2: Survey Voting Tally (Comparison)",
      "problemText": "In a class election for the festival theme, Traditional Arts received 36 votes, whereas Modern Fusion received 24 votes. How many more votes did Traditional Arts receive?",
      "correctAnswer": 12,
      "answer": "12 votes",
      "hintText": "Traditional Arts (36) - Modern Fusion (24) = 12 votes difference.",
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "value": 36,
            "label": "Traditional Arts: 36",
            "color": "#6366f1"
          },
          {
            "value": 24,
            "label": "Modern Fusion: 24",
            "color": "#ec4899"
          }
        ],
        "differenceLabel": "12 more votes"
      }
    }
  ],
  "science_lab": {
    "title_en": "Social Studies/ELA: Cultures / Math: Surveys Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Survey Questionnaire Design",
        "instruction": "Formulate unbiased multiple-choice inquiry prompts regarding holiday heritage."
      },
      {
        "stage": 2,
        "title": "Tally Chart Tabulation",
        "instruction": "Aggregate raw demographic poll responses into organized frequency data matrices."
      },
      {
        "stage": 3,
        "title": "Comparative Cultural Synthesis",
        "instruction": "Draft comparative sentences contrasting festival traditions using 'Unlike' and 'Whereas'."
      }
    ]
  }
};
export default skillPracticeHubData;
