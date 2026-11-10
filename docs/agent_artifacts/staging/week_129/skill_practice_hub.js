/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 129 | Theme: "Opinion Project 3: Smartphones Under 12?" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.859Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 129,
  "theme": "Opinion Project 3: Smartphones Under 12?",
  "cefr_level": "B1+ Academic",
  "grammar_drills": [
    {
      "sentence": "Excessive screen usage may disrupt natural adolescent sleep cycles.",
      "options": [
        "may disrupt",
        "must to disrupt",
        "can disrupting"
      ],
      "answer": "may disrupt",
      "explanation": "Use modal 'may' followed by the base verb 'disrupt' to express a well-founded possibility."
    },
    {
      "sentence": "It is imperative that parents establish clear screen-time guidelines.",
      "options": [
        "establish",
        "establishes",
        "established"
      ],
      "answer": "establish",
      "explanation": "After the subjunctive trigger 'It is imperative that...', use the base verb form 'establish'."
    },
    {
      "sentence": "Pediatric evidence suggests that unrestricted social media impairs focus.",
      "options": [
        "suggests that",
        "suggests for",
        "suggest that"
      ],
      "answer": "suggests that",
      "explanation": "The singular noun 'evidence' takes singular verb 'suggests' followed by 'that'."
    },
    {
      "sentence": "Families should practice digital moderation rather than imposing total bans.",
      "options": [
        "rather than",
        "instead",
        "whereas"
      ],
      "answer": "rather than",
      "explanation": "Use 'rather than' followed by a gerund or parallel structure to express a preferred alternative."
    },
    {
      "sentence": "Adolescent brains are particularly vulnerable to digital stimulation.",
      "options": [
        "vulnerable to",
        "vulnerable with",
        "vulnerable on"
      ],
      "answer": "vulnerable to",
      "explanation": "Use the preposition 'to' after the adjective 'vulnerable'."
    }
  ],
  "singapore_math": [
    {
      "id": "w129_p1",
      "type": "part_whole",
      "title": "Problem 1: Fractions in a Student Phone Survey",
      "question": "In a survey of 80 sixth graders, 1/4 of the students own a smartphone and 3/4 do not. How many students in the survey sample own a smartphone?",
      "storyContext": "Class researchers calculate fractional parts of survey samples.",
      "modelData": {
        "bars": [
          {
            "label": "Phone Owners (1/4)",
            "value": 20,
            "color": "#0ea5e9"
          },
          {
            "label": "Non-Owners (3/4)",
            "value": 60,
            "color": "#94a3b8"
          }
        ],
        "total": 80,
        "unit": "students"
      },
      "target_answer": 20,
      "unit": "students",
      "steps": [
        "Total sample: 80 students.",
        "Fraction who own phones: 1/4.",
        "80 / 4 = 20 students."
      ]
    },
    {
      "id": "w129_p2",
      "type": "comparison",
      "title": "Problem 2: Comparing Fractions of Screen Time",
      "question": "In a math logic review, Group A had 30 students with phone limits and Group B had 20 students with phone limits out of 50 total. How many more students in Group A had limits?",
      "storyContext": "Students compare screen time fractions between two classes.",
      "modelData": {
        "bars": [
          {
            "label": "Group A",
            "value": 30,
            "color": "#10b981"
          },
          {
            "label": "Group B",
            "value": 20,
            "color": "#f59e0b"
          }
        ],
        "difference": 10,
        "unit": "students"
      },
      "target_answer": 10,
      "unit": "students",
      "steps": [
        "Group A: 30 students.",
        "Group B: 20 students.",
        "30 - 20 = 10 students."
      ]
    },
    {
      "id": "w129_p3",
      "type": "part_whole",
      "title": "Problem 3: Fractions of Homework Study Time",
      "question": "A student spent 20 minutes doing online research and 40 minutes reading paper books during a 60-minute study period. How many total minutes were studied?",
      "storyContext": "A student tracks fractions of digital study time.",
      "modelData": {
        "bars": [
          {
            "label": "Online Research",
            "value": 20,
            "color": "#6366f1"
          },
          {
            "label": "Book Reading",
            "value": 40,
            "color": "#ec4899"
          }
        ],
        "total": 60,
        "unit": "minutes"
      },
      "target_answer": 60,
      "unit": "minutes",
      "steps": [
        "Online time: 20 minutes.",
        "Book time: 40 minutes.",
        "20 + 40 = 60 minutes."
      ]
    },
    {
      "id": "w129_p4",
      "type": "comparison",
      "title": "Problem 4: Comparing Survey Fractions",
      "question": "A school poll showed that 45 students supported a no-phone rule at lunch while 25 students opposed it. What is the difference between these survey groups?",
      "storyContext": "Researchers compare opinion factions in the lunch poll.",
      "modelData": {
        "bars": [
          {
            "label": "Support Rule",
            "value": 45,
            "color": "#0d9488"
          },
          {
            "label": "Oppose Rule",
            "value": 25,
            "color": "#f43f5e"
          }
        ],
        "difference": 20,
        "unit": "students"
      },
      "target_answer": 20,
      "unit": "students",
      "steps": [
        "Supporters: 45.",
        "Opponents: 25.",
        "45 - 25 = 20 students."
      ]
    },
    {
      "id": "w129_p5",
      "type": "part_whole",
      "title": "Problem 5: Total Sample Size from Fraction Groups",
      "question": "In a grade-level study on smartphone habits, 35 boys and 35 girls completed the full research questionnaire. How many total learners participated?",
      "storyContext": "Researchers compute the full sample size.",
      "modelData": {
        "bars": [
          {
            "label": "Boys Sample",
            "value": 35,
            "color": "#3b82f6"
          },
          {
            "label": "Girls Sample",
            "value": 35,
            "color": "#a855f7"
          }
        ],
        "total": 70,
        "unit": "learners"
      },
      "target_answer": 70,
      "unit": "learners",
      "steps": [
        "Boys: 35.",
        "Girls: 35.",
        "35 + 35 = 70 learners."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Opinion Project 3: Smartphones Under 12? Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Screen Time Sleep Barrier",
        "diagram_type": "screen_time_sleep",
        "instruction": "Demonstrate how late-night device light delays sleep cycles.",
        "items": [
          {
            "label": "Blue Screen Emission",
            "target": "light_source"
          },
          {
            "label": "Delayed Hormone Release",
            "target": "brain_clock"
          },
          {
            "label": "Restful Sleep Period",
            "target": "night_cycle"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Notification Filter Filter",
        "diagram_type": "notification_filter",
        "instruction": "Configure phone alert levels during scheduled study hours.",
        "items": [
          {
            "label": "Family Emergency Contact",
            "target": "allowed_channel"
          },
          {
            "label": "Study Do-Not-Disturb Mode",
            "target": "active_filter"
          },
          {
            "label": "Gaming Alert Lockout",
            "target": "blocked_channel"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Balanced Daily Student Schedule",
        "diagram_type": "balanced_student_day",
        "instruction": "Build a healthy 24-hour balance of school, outdoor play, and device time.",
        "items": [
          {
            "label": "Outdoor Physical Play (1 hr)",
            "target": "play_block"
          },
          {
            "label": "Homework & Family Dinner (3 hrs)",
            "target": "family_block"
          },
          {
            "label": "Educational Screen Window (45 mins)",
            "target": "tech_block"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
