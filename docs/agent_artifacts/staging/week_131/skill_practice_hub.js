/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 131 | Theme: "Opinion Project 3: Persuasive Techniques" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.868Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 131,
  "theme": "Opinion Project 3: Persuasive Techniques",
  "cefr_level": "B1+ Academic",
  "grammar_drills": [
    {
      "sentence": "Not only does digital moderation protect sleep, but it also improves attention.",
      "options": [
        "does digital moderation protect",
        "digital moderation protects",
        "did digital moderation protected"
      ],
      "answer": "does digital moderation protect",
      "explanation": "After the negative or limiting expression 'Not only...', invert the auxiliary verb and subject: 'does digital moderation protect'."
    },
    {
      "sentence": "By uniting emotion and logic, the speaker convinced skeptical listeners.",
      "options": [
        "convinced",
        "convince",
        "convincing"
      ],
      "answer": "convinced",
      "explanation": "Use past simple 'convinced' to describe completed persuasive action."
    },
    {
      "sentence": "The speech was both articulate and deeply moving to the audience.",
      "options": [
        "both",
        "either",
        "neither"
      ],
      "answer": "both",
      "explanation": "Use 'both... and...' to join two parallel positive adjectives."
    },
    {
      "sentence": "Varying vocal cadence reinforces the emotional weight of key phrases.",
      "options": [
        "reinforces",
        "reinforce",
        "reinforcing"
      ],
      "answer": "reinforces",
      "explanation": "The singular gerund subject 'Varying vocal cadence' takes the singular verb 'reinforces'."
    },
    {
      "sentence": "Ethos establishes personal credibility through consistent moral integrity.",
      "options": [
        "through",
        "with of",
        "across to"
      ],
      "answer": "through",
      "explanation": "Use 'through' to denote the means or agency by which credibility is established."
    }
  ],
  "singapore_math": [
    {
      "id": "w131_p1",
      "type": "part_whole",
      "title": "Problem 1: Percentage Mode Audience Survey",
      "question": "In an audience poll of 100 students, 60 listeners were persuaded by logos and 40 listeners were persuaded by pathos. What is the total audience accounted for on the chart?",
      "storyContext": "Debate coaches evaluate persuasive mode efficacy from survey results.",
      "modelData": {
        "bars": [
          {
            "label": "Logos Persuaded",
            "value": 60,
            "color": "#0ea5e9"
          },
          {
            "label": "Pathos Persuaded",
            "value": 40,
            "color": "#ec4899"
          }
        ],
        "total": 100,
        "unit": "listeners"
      },
      "target_answer": 100,
      "unit": "listeners",
      "steps": [
        "Logos count: 60.",
        "Pathos count: 40.",
        "60 + 40 = 100 listeners."
      ]
    },
    {
      "id": "w131_p2",
      "type": "comparison",
      "title": "Problem 2: Comparing Percentage Points in Persuasion",
      "question": "A speech poll showed that 65% of listeners trusted an argument with ethos, compared to 45% who trusted a speech without citations. What is the percentage point advantage?",
      "storyContext": "Students calculate percentage point improvements from speaker credibility.",
      "modelData": {
        "bars": [
          {
            "label": "With Ethos (65%)",
            "value": 65,
            "color": "#10b981"
          },
          {
            "label": "Without Ethos (45%)",
            "value": 45,
            "color": "#94a3b8"
          }
        ],
        "difference": 20,
        "unit": "percentage points"
      },
      "target_answer": 20,
      "unit": "percentage points",
      "steps": [
        "With ethos: 65%.",
        "Without ethos: 45%.",
        "65 - 45 = 20 percentage points."
      ]
    },
    {
      "id": "w131_p3",
      "type": "part_whole",
      "title": "Problem 3: Persuasive Vote Tally Logic",
      "question": "In a classroom mock debate on school uniforms, 45 students voted in favor after hearing a logos speech and 35 voted against. What was the total votes cast?",
      "storyContext": "The debate secretary tallies audience votes after the rebuttal round.",
      "modelData": {
        "bars": [
          {
            "label": "Affirmative Votes",
            "value": 45,
            "color": "#6366f1"
          },
          {
            "label": "Negative Votes",
            "value": 35,
            "color": "#f59e0b"
          }
        ],
        "total": 80,
        "unit": "votes"
      },
      "target_answer": 80,
      "unit": "votes",
      "steps": [
        "Affirmative: 45 votes.",
        "Negative: 35 votes.",
        "45 + 35 = 80 total votes."
      ]
    },
    {
      "id": "w131_p4",
      "type": "comparison",
      "title": "Problem 4: Comparing Emotion vs Logic Impact",
      "question": "In a persuasive technique poll, 75 listeners rated a personal story as powerful, whereas 50 rated pure statistics as powerful. How many more listeners preferred the story?",
      "storyContext": "Students compare pathos versus logos preferences in audience logs.",
      "modelData": {
        "bars": [
          {
            "label": "Pathos Story",
            "value": 75,
            "color": "#f43f5e"
          },
          {
            "label": "Pure Stats",
            "value": 50,
            "color": "#0284c7"
          }
        ],
        "difference": 25,
        "unit": "listeners"
      },
      "target_answer": 25,
      "unit": "listeners",
      "steps": [
        "Pathos rating: 75.",
        "Stats rating: 50.",
        "75 - 50 = 25 listeners."
      ]
    },
    {
      "id": "w131_p5",
      "type": "part_whole",
      "title": "Problem 5: Audience Feedback Classification",
      "question": "A speech evaluation sheet recorded 55 positive comments about speaker credibility and 35 positive comments about presentation clarity. How many total positive notes were counted?",
      "storyContext": "Debaters analyze post-speech evaluation slips.",
      "modelData": {
        "bars": [
          {
            "label": "Credibility Notes",
            "value": 55,
            "color": "#14b8a6"
          },
          {
            "label": "Clarity Notes",
            "value": 35,
            "color": "#8b5cf6"
          }
        ],
        "total": 90,
        "unit": "comments"
      },
      "target_answer": 90,
      "unit": "comments",
      "steps": [
        "Credibility notes: 55.",
        "Clarity notes: 35.",
        "55 + 35 = 90 comments."
      ]
    }
  ],
  "science_lab": {
    "title_en": "Opinion Project 3: Persuasive Techniques Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Ethos Credibility Foundation",
        "diagram_type": "ethos_pillar",
        "instruction": "Anchor a speech argument in personal integrity and trusted authorities.",
        "items": [
          {
            "label": "Expert Teacher Citation",
            "target": "foundation_base"
          },
          {
            "label": "Speaker Honest Disclosure",
            "target": "pillar_core"
          },
          {
            "label": "Respectful Tone Indicator",
            "target": "capital_crest"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Pathos Emotional Bridge",
        "diagram_type": "pathos_bridge",
        "instruction": "Connect shared human values with audience empathy.",
        "items": [
          {
            "label": "Relatable Real Student Story",
            "target": "bridge_approach"
          },
          {
            "label": "Empathy Connecting Phrase",
            "target": "bridge_arch"
          },
          {
            "label": "Inspiring Call to Action",
            "target": "bridge_landing"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Logos Analytical Logic Chain",
        "diagram_type": "logos_chain",
        "instruction": "Link verified premises to an inescapable logical conclusion.",
        "items": [
          {
            "label": "Verified Factual Premise A",
            "target": "first_link"
          },
          {
            "label": "Supporting Data Stat B",
            "target": "middle_link"
          },
          {
            "label": "Sound Concluding Finding C",
            "target": "anchor_link"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
