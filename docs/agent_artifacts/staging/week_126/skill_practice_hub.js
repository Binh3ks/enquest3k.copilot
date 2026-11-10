/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 126 | Theme: "From Essay to Speech" | CEFR: B1+ Academic
 * Generated: 2026-11-10T04:07:29.826Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 126,
  "theme": "From Essay to Speech",
  "cefr_level": "B1+ Academic",
  "grammar_drills": [
    {
      "sentence": "Moving on to our second main finding, let us examine the survey data.",
      "options": [
        "Moving on to",
        "Move on at",
        "Moved on for"
      ],
      "answer": "Moving on to",
      "explanation": "Use 'Moving on to...' as an oral signpost to transition smoothly to a new topic."
    },
    {
      "sentence": "Having examined the historical background, we can now address current policies.",
      "options": [
        "Having examined",
        "Have examined",
        "Examine"
      ],
      "answer": "Having examined",
      "explanation": "Use the perfect participle clause 'Having examined...' to summarize prior context before introducing a new focus."
    },
    {
      "sentence": "Turning our attention to the global market, export numbers grew significantly.",
      "options": [
        "Turning our attention to",
        "Turn our attention on",
        "Turned attention with"
      ],
      "answer": "Turning our attention to",
      "explanation": "Use 'Turning our attention to...' to direct listeners' focus toward a specific aspect."
    },
    {
      "sentence": "Speakers should pause deliberately so that listeners can absorb difficult points.",
      "options": [
        "so that",
        "because of",
        "in order"
      ],
      "answer": "so that",
      "explanation": "Use 'so that' followed by a clause to express the intended purpose of an action."
    },
    {
      "sentence": "Varying vocal intonation keeps the audience engaged throughout the address.",
      "options": [
        "keeps",
        "keep",
        "keeping"
      ],
      "answer": "keeps",
      "explanation": "The singular gerund subject 'Varying vocal intonation' takes the singular verb 'keeps'."
    }
  ],
  "singapore_math": [
    {
      "id": "w126_p1",
      "type": "part_whole",
      "title": "Problem 1: Logic Puzzle of Speaker Time Slots",
      "question": "In a speech logic puzzle, Speaker A speaks for 45 seconds and Speaker B speaks for 35 seconds to introduce the topic. What is their combined speaking time?",
      "storyContext": "Debaters time their speech transitions using a logic stopwatch.",
      "modelData": {
        "bars": [
          {
            "label": "Speaker A",
            "value": 45,
            "color": "#0ea5e9"
          },
          {
            "label": "Speaker B",
            "value": 35,
            "color": "#10b981"
          }
        ],
        "total": 80,
        "unit": "seconds"
      },
      "target_answer": 80,
      "unit": "seconds",
      "steps": [
        "Speaker A time: 45 seconds.",
        "Speaker B time: 35 seconds.",
        "45 + 35 = 80 seconds."
      ]
    },
    {
      "id": "w126_p2",
      "type": "comparison",
      "title": "Problem 2: Logic Constraint on Cue Cards",
      "question": "A logic puzzle states: Maya prepared 14 cue cards for her presentation. Liam prepared 8 fewer cue cards than Maya under the tournament rules. How many cue cards did Liam prepare?",
      "storyContext": "Students organize their speech cue cards under logic rules.",
      "modelData": {
        "bars": [
          {
            "label": "Maya's Cards",
            "value": 14,
            "color": "#8b5cf6"
          },
          {
            "label": "Difference",
            "value": 8,
            "color": "#ef4444"
          }
        ],
        "difference": 6,
        "unit": "cue cards"
      },
      "target_answer": 6,
      "unit": "cue cards",
      "steps": [
        "Maya has 14 cards.",
        "Liam has 8 fewer cards.",
        "14 - 8 = 6 cards for Liam."
      ]
    },
    {
      "id": "w126_p3",
      "type": "part_whole",
      "title": "Problem 3: Speech Structure Logic Puzzle",
      "question": "Under the debate timing rules, the introduction takes 30 seconds and the main arguments take 60 seconds. What is the total allotted time for this speech section?",
      "storyContext": "Speech coaches solve timing constraints for the debate showcase.",
      "modelData": {
        "bars": [
          {
            "label": "Introduction",
            "value": 30,
            "color": "#f59e0b"
          },
          {
            "label": "Main Arguments",
            "value": 60,
            "color": "#3b82f6"
          }
        ],
        "total": 90,
        "unit": "seconds"
      },
      "target_answer": 90,
      "unit": "seconds",
      "steps": [
        "Intro duration: 30 seconds.",
        "Body duration: 60 seconds.",
        "30 + 60 = 90 seconds total."
      ]
    },
    {
      "id": "w126_p4",
      "type": "comparison",
      "title": "Problem 4: Logic Deduction of Signpost Markers",
      "question": "In a speech analysis puzzle, Team 1 used 15 signpost phrases while Team 2 used 9 signpost phrases. How many more signpost markers did Team 1 use?",
      "storyContext": "Adjudicators count transition cues in speech transcripts.",
      "modelData": {
        "bars": [
          {
            "label": "Team 1",
            "value": 15,
            "color": "#ec4899"
          },
          {
            "label": "Team 2",
            "value": 9,
            "color": "#64748b"
          }
        ],
        "difference": 6,
        "unit": "signpost markers"
      },
      "target_answer": 6,
      "unit": "signpost markers",
      "steps": [
        "Team 1 count: 15 markers.",
        "Team 2 count: 9 markers.",
        "15 - 9 = 6 more markers."
      ]
    },
    {
      "id": "w126_p5",
      "type": "part_whole",
      "title": "Problem 5: Audience Feedback Logic Venn",
      "question": "A presentation logic puzzle tracks 40 feedback slips. 25 listeners commended the speaker's vocal volume and 15 commended the signpost clarity. How many total positive notes were counted?",
      "storyContext": "Students tally audience comment cards after the speeches.",
      "modelData": {
        "bars": [
          {
            "label": "Volume Praise",
            "value": 25,
            "color": "#14b8a6"
          },
          {
            "label": "Signpost Praise",
            "value": 15,
            "color": "#f97316"
          }
        ],
        "total": 40,
        "unit": "feedback slips"
      },
      "target_answer": 40,
      "unit": "feedback slips",
      "steps": [
        "Volume feedback: 25 slips.",
        "Signpost feedback: 15 slips.",
        "25 + 15 = 40 slips total."
      ]
    }
  ],
  "science_lab": {
    "title_en": "From Essay to Speech Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Cue Card Indexing System",
        "diagram_type": "cue_card_indexing",
        "instruction": "Organize speaking cues in logical sequence from hook to call to action.",
        "items": [
          {
            "label": "Hook & Topic Card",
            "target": "opening_card"
          },
          {
            "label": "Two Supporting Reasons Card",
            "target": "body_card"
          },
          {
            "label": "Memorable Final Thought Card",
            "target": "conclusion_card"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Signpost Roadmapping",
        "diagram_type": "signpost_roadmapping",
        "instruction": "Place directional signposts to guide listeners through speech stages.",
        "items": [
          {
            "label": "Today I will discuss...",
            "target": "intro_signpost"
          },
          {
            "label": "Moving on to my next point...",
            "target": "body_signpost"
          },
          {
            "label": "In conclusion, we have seen...",
            "target": "final_signpost"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Vocal Delivery and Pause Meter",
        "diagram_type": "vocal_pause_meter",
        "instruction": "Match speech segments with appropriate vocal volume and deliberate pauses.",
        "items": [
          {
            "label": "Clear Conversational Volume",
            "target": "normal_phrase"
          },
          {
            "label": "Deliberate 2-Second Silence",
            "target": "pause_interval"
          },
          {
            "label": "Emphatic Key Term Stress",
            "target": "focus_word"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
