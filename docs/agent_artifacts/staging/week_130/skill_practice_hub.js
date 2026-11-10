/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 130 | Theme: "Opinion Project 3: Comparing Global Approaches" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.865Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 130,
  "theme": "Opinion Project 3: Comparing Global Approaches",
  "cefr_level": "B1+ Academic",
  "grammar_drills": [
    {
      "sentence": "In contrast to France's nationwide ban, Florida opted for a decentralized approach.",
      "options": [
        "In contrast to",
        "In addition to",
        "As a result of"
      ],
      "answer": "In contrast to",
      "explanation": "Use 'In contrast to' to highlight a prominent difference between two subjects."
    },
    {
      "sentence": "Whereas France bans all devices, Florida restricts access to specific platforms.",
      "options": [
        "Whereas",
        "Because",
        "Despite"
      ],
      "answer": "Whereas",
      "explanation": "Use 'Whereas' to contrast two facts or situations in adjoining clauses."
    },
    {
      "sentence": "Students with documented health conditions receive an official exemption.",
      "options": [
        "exemption",
        "exempted",
        "exempting"
      ],
      "answer": "exemption",
      "explanation": "Use the noun 'exemption' following the adjective 'official'."
    },
    {
      "sentence": "Consistent enforcement ensures that all students comply with school policies.",
      "options": [
        "comply with",
        "comply to",
        "comply for"
      ],
      "answer": "comply with",
      "explanation": "Use the preposition 'with' following the verb 'comply'."
    },
    {
      "sentence": "Lawmakers enacted statutory measures to protect student wellbeing.",
      "options": [
        "enacted",
        "enact",
        "enacting"
      ],
      "answer": "enacted",
      "explanation": "Use the past simple 'enacted' to describe completed legislative actions."
    }
  ],
  "singapore_math": [
    {
      "id": "w130_p1",
      "type": "comparison",
      "title": "Problem 1: Decimal Comparison of Daily Screen Hours",
      "question": "A comparative study shows that students under a strict policy average 2.5 hours of daily phone use, while students without limits average 4.5 hours. What is the decimal difference in hours?",
      "storyContext": "Researchers compare daily usage averages between two regions.",
      "modelData": {
        "bars": [
          {
            "label": "Without Limits",
            "value": 45,
            "color": "#ef4444"
          },
          {
            "label": "With Strict Policy",
            "value": 25,
            "color": "#10b981"
          }
        ],
        "difference": 20,
        "unit": "tenths of an hour (2.0 hours)"
      },
      "target_answer": 20,
      "unit": "tenths of an hour",
      "steps": [
        "Average without limits: 4.5 hours (45 tenths).",
        "Average with policy: 2.5 hours (25 tenths).",
        "45 - 25 = 20 tenths (2.0 hours)."
      ]
    },
    {
      "id": "w130_p2",
      "type": "part_whole",
      "title": "Problem 2: Decimal Addition of Study App Time",
      "question": "In a French pilot school, a student used a vocabulary app for 1.5 hours in the morning and a math app for 1.2 hours in the afternoon. What was the total app study time in tenths of an hour?",
      "storyContext": "Students log educational device usage during class workshops.",
      "modelData": {
        "bars": [
          {
            "label": "Morning App",
            "value": 15,
            "color": "#0ea5e9"
          },
          {
            "label": "Afternoon App",
            "value": 12,
            "color": "#8b5cf6"
          }
        ],
        "total": 27,
        "unit": "tenths of an hour (2.7 hours)"
      },
      "target_answer": 27,
      "unit": "tenths of an hour",
      "steps": [
        "Morning time: 1.5 hours (15 tenths).",
        "Afternoon time: 1.2 hours (12 tenths).",
        "15 + 12 = 27 tenths (2.7 hours)."
      ]
    },
    {
      "id": "w130_p3",
      "type": "comparison",
      "title": "Problem 3: Comparing School District Compliance Decimals",
      "question": "In a regional review, District A reported 3.8 hours of uninterrupted focus time per student day, compared to 2.3 hours in District B. What is the focus time advantage for District A?",
      "storyContext": "Superintendents compare student focus metrics across districts.",
      "modelData": {
        "bars": [
          {
            "label": "District A",
            "value": 38,
            "color": "#14b8a6"
          },
          {
            "label": "District B",
            "value": 23,
            "color": "#f59e0b"
          }
        ],
        "difference": 15,
        "unit": "tenths of an hour (1.5 hours)"
      },
      "target_answer": 15,
      "unit": "tenths of an hour",
      "steps": [
        "District A: 3.8 hours (38 tenths).",
        "District B: 2.3 hours (23 tenths).",
        "38 - 23 = 15 tenths (1.5 hours)."
      ]
    },
    {
      "id": "w130_p4",
      "type": "part_whole",
      "title": "Problem 4: Combined School Budget for Lock Pouches",
      "question": "School 1 invested $400 for classroom phone pouches and School 2 invested $500. What was the total investment combined for the two schools?",
      "storyContext": "Administrators calculate the cost of pouch hardware.",
      "modelData": {
        "bars": [
          {
            "label": "School 1",
            "value": 400,
            "color": "#6366f1"
          },
          {
            "label": "School 2",
            "value": 500,
            "color": "#06b6d4"
          }
        ],
        "total": 900,
        "unit": "dollars"
      },
      "target_answer": 900,
      "unit": "dollars",
      "steps": [
        "School 1 investment: $400.",
        "School 2 investment: $500.",
        "400 + 500 = $900."
      ]
    },
    {
      "id": "w130_p5",
      "type": "comparison",
      "title": "Problem 5: Comparing Classroom Disruption Decimals",
      "question": "Before a phone ban, teachers recorded 5.4 disruptions per day. After the ban, disruptions fell to 1.4 per day. What was the decimal reduction in disruptions?",
      "storyContext": "School evaluators graph disruption decreases after policy changes.",
      "modelData": {
        "bars": [
          {
            "label": "Before Ban",
            "value": 54,
            "color": "#e11d48"
          },
          {
            "label": "After Ban",
            "value": 14,
            "color": "#10b981"
          }
        ],
        "difference": 40,
        "unit": "tenths (4.0 disruptions)"
      },
      "target_answer": 40,
      "unit": "tenths of disruptions",
      "steps": [
        "Before ban: 5.4 disruptions (54 tenths).",
        "After ban: 1.4 disruptions (14 tenths).",
        "54 - 14 = 40 tenths (4.0 disruptions)."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Opinion Project 3: Comparing Global Approaches Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "French Classroom Storage Box",
        "diagram_type": "lockbox_storage",
        "instruction": "Simulate the morning collection and safe storage of school phones.",
        "items": [
          {
            "label": "Morning Check-In Bag",
            "target": "entry_bin"
          },
          {
            "label": "Classroom Lockbox",
            "target": "secure_chest"
          },
          {
            "label": "Dismissal Return Shelf",
            "target": "exit_bin"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Digital Research Access Gate",
        "diagram_type": "research_access_gate",
        "instruction": "Route approved educational domains while restricting social apps.",
        "items": [
          {
            "label": "School Research Portal",
            "target": "permitted_network"
          },
          {
            "label": "Teacher Verification Pin",
            "target": "access_key"
          },
          {
            "label": "Social Media Firewall",
            "target": "blocked_network"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Device-Free Play Yard Circles",
        "diagram_type": "device_free_yard",
        "instruction": "Organize recess zones that foster face-to-face peer interaction.",
        "items": [
          {
            "label": "Active Basketball Court",
            "target": "sports_area"
          },
          {
            "label": "Reading Bench Circle",
            "target": "quiet_area"
          },
          {
            "label": "Discussion Group Table",
            "target": "social_area"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
