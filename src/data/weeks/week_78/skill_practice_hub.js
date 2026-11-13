/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 78 | Theme: "Social Studies/ELA: Cultures / Math: Surveys" | CEFR: "B1 PET"
 * Updated: 2026-11-13T04:18:06.394Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
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
    },
    {
      "id": 3,
      "title": "Problem 3: Cultural Fair Pavilion Visitors (Part-Whole)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "At the multicultural heritage fair, 185 guests attended the folklore pavilion and 165 guests visited the culinary arts tent. What was the combined attendance across both exhibits?",
      "question": "At the multicultural heritage fair, 185 guests attended the folklore pavilion and 165 guests visited the culinary arts tent. What was the combined attendance across both exhibits?",
      "correctAnswer": 350,
      "target_answer": 350,
      "unit": "attendees",
      "hintText": "Add folklore pavilion attendance (185) and culinary tent attendance (165) together.",
      "steps": [
        "Folklore pavilion: 185 attendees.",
        "Culinary tent: 165 attendees.",
        "Total attendance: 185 + 165 = 350 attendees."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Folklore: 185",
            "value": 185,
            "color": "#dc2626"
          },
          {
            "label": "Culinary: 165",
            "value": 165,
            "color": "#ea580c"
          }
        ],
        "totalLabel": "Total: 350 attendees"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Language Workshop Survey Margin (Comparison)",
      "difficulty": "medium",
      "type": "comparison",
      "problemText": "In a student survey on language electives, 140 learners chose Spanish conversation and 85 learners chose Mandarin calligraphy. How many more students selected Spanish?",
      "question": "In a student survey on language electives, 140 learners chose Spanish conversation and 85 learners chose Mandarin calligraphy. How many more students selected Spanish?",
      "correctAnswer": 55,
      "target_answer": 55,
      "unit": "students",
      "hintText": "Subtract Mandarin learners (85) from Spanish learners (140).",
      "steps": [
        "Spanish conversation: 140 students.",
        "Mandarin calligraphy: 85 students.",
        "Difference: 140 - 85 = 55 students."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Spanish: 140",
            "value": 140,
            "color": "#2563eb"
          },
          {
            "label": "Mandarin: 85",
            "value": 85,
            "color": "#059669"
          }
        ],
        "differenceLabel": "55 more students"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Community Heritage Parade (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "The youth council registered 300 participants for the annual heritage parade. In the first cohort, 110 musicians marched, and in the second cohort, 125 dancers performed. How many participants marched in the final community cohort?",
      "question": "The youth council registered 300 participants for the annual heritage parade. In the first cohort, 110 musicians marched, and in the second cohort, 125 dancers performed. How many participants marched in the final community cohort?",
      "correctAnswer": 65,
      "target_answer": 65,
      "unit": "participants",
      "hintText": "Add musicians (110) and dancers (125) first. Then subtract from total 300 participants.",
      "steps": [
        "Musicians and dancers: 110 + 125 = 235 participants.",
        "Final cohort: 300 - 235 = 65 participants."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Musicians: 110",
            "value": 110,
            "color": "#7c3aed"
          },
          {
            "label": "Dancers: 125",
            "value": 125,
            "color": "#db2777"
          },
          {
            "label": "Community: 65",
            "value": 65,
            "color": "#e2e8f0"
          }
        ],
        "totalLabel": "Total: 300 parade members"
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
