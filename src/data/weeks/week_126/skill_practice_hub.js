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
      "sentence": "Moving on to our second finding, let us look at the survey data.",
      "options": [
        "Moving on to",
        "Move on at",
        "Moved on for"
      ],
      "answer": "Moving on to",
      "explanation": "Use 'Moving on to...' as an oral signpost to transition smoothly to a new topic."
    },
    {
      "sentence": "Having examined the class survey, we can now plan our speech.",
      "options": [
        "Having examined",
        "Have examined",
        "Examine"
      ],
      "answer": "Having examined",
      "explanation": "Use the perfect participle clause 'Having examined...' to summarize prior context before introducing a new focus."
    },
    {
      "sentence": "Turning our attention to the school library, book loans grew fast.",
      "options": [
        "Turning our attention to",
        "Turn our attention on",
        "Turned attention with"
      ],
      "answer": "Turning our attention to",
      "explanation": "Use 'Turning our attention to...' to direct listeners' focus toward a specific aspect."
    },
    {
      "sentence": "Speakers should pause briefly so that listeners can follow hard ideas.",
      "options": [
        "so that",
        "because of",
        "in order"
      ],
      "answer": "so that",
      "explanation": "Use 'so that' followed by a clause to express the intended purpose of an action."
    },
    {
      "sentence": "Varying your voice keeps the audience interested through your whole speech.",
      "options": [
        "keeps",
        "keep",
        "keeping"
      ],
      "answer": "keeps",
      "explanation": "The singular gerund phrase 'Varying your voice' takes the singular verb 'keeps'."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Ordering the Finalist Speeches",
      "difficulty": "medium",
      "type": "logic_puzzle",
      "problemText": "Four speakers (Ava, Ben, Cara, and Dan) present in Slots 1, 2, 3, and 4, earning 12, 16, 20, and 24 points respectively for their slot difficulty. Clue 1: Ben speaks immediately after Ava. Clue 2: Cara speaks before Ava. Clue 3: Dan speaks in neither Slot 1 nor Slot 4. What is the combined score of Ava and Cara?",
      "question": "Four speakers (Ava, Ben, Cara, and Dan) present in Slots 1, 2, 3, and 4, earning 12, 16, 20, and 24 points respectively for their slot difficulty. Clue 1: Ben speaks immediately after Ava. Clue 2: Cara speaks before Ava. Clue 3: Dan speaks in neither Slot 1 nor Slot 4. What is the combined score of Ava and Cara?",
      "correctAnswer": 32,
      "unit": "points",
      "hintText": "Try placing Dan in Slot 2 or Slot 3 first. Only one placement leaves two adjacent slots for Ava followed by Ben while keeping Cara before Ava.",
      "steps": [
        "If Dan were in Slot 3, the remaining slots {1, 2, 4} force Ava-Ben into (1, 2), leaving Cara in Slot 4 (violates Cara before Ava).",
        "So Dan must be in Slot 2. Then Ava-Ben take consecutive Slots (3, 4), and Cara takes Slot 1.",
        "Cara (Slot 1 = 12) + Ava (Slot 3 = 20) = 32 points."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "S1: 12",
            "value": 12,
            "color": "#4f46e5"
          },
          {
            "label": "S2: 16",
            "value": 16,
            "color": "#94a3b8"
          },
          {
            "label": "S3: 20",
            "value": 20,
            "color": "#06b6d4"
          },
          {
            "label": "S4: 24",
            "value": 24,
            "color": "#cbd5e1"
          }
        ],
        "totalLabel": "All 4 Slots = 72"
      }
    },
    {
      "id": 2,
      "title": "Cue Card Allocation Logic",
      "difficulty": "medium",
      "type": "logic_puzzle",
      "problemText": "Three debaters—Leo, Mia, and Noah—prepare a combined total of 36 cue cards. Leo brings twice as many cue cards as Mia. Noah brings 4 fewer cue cards than Leo. How many cue cards does Noah bring?",
      "question": "Three debaters—Leo, Mia, and Noah—prepare a combined total of 36 cue cards. Leo brings twice as many cue cards as Mia. Noah brings 4 fewer cue cards than Leo. How many cue cards does Noah bring?",
      "correctAnswer": 12,
      "unit": "cue cards",
      "hintText": "Represent Mia as 1 unit (u). Express Leo (2u) and Noah (2u - 4), add 4 to the total to make 5 equal units, then solve for u first.",
      "steps": [
        "Let Mia = 1 unit, Leo = 2 units, and Noah = 2 units - 4.",
        "Total units equation: 5 units - 4 = 36, so 5 units = 40 and 1 unit = 8.",
        "Noah = 2(8) - 4 = 12 cue cards."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "M: 1u",
            "value": 8,
            "color": "#4f46e5"
          },
          {
            "label": "L: 2u",
            "value": 16,
            "color": "#06b6d4"
          },
          {
            "label": "N: 2u-4",
            "value": 12,
            "color": "#10b981"
          }
        ],
        "totalLabel": "36 cue cards"
      }
    },
    {
      "id": 3,
      "title": "Keynote Room Assignment Grid",
      "difficulty": "medium",
      "type": "logic_puzzle",
      "problemText": "Three speech workshops—Rhetoric, Delivery, and Pacing—are assigned to Room A (18 seats), Room B (26 seats), and Room C (42 seats). Clue 1: Pacing is assigned to neither the smallest room nor Room C. Clue 2: Rhetoric requires at least 30 seats. How many more seats are in the Rhetoric room than in the Delivery room?",
      "question": "Three speech workshops—Rhetoric, Delivery, and Pacing—are assigned to Room A (18 seats), Room B (26 seats), and Room C (42 seats). Clue 1: Pacing is assigned to neither the smallest room nor Room C. Clue 2: Rhetoric requires at least 30 seats. How many more seats are in the Rhetoric room than in the Delivery room?",
      "correctAnswer": 24,
      "unit": "seats",
      "hintText": "Deduce which workshop belongs in Room B first using Clue 1, then place Rhetoric using Clue 2.",
      "steps": [
        "Clue 1 eliminates Room A (smallest) and Room C for Pacing, so Pacing is in Room B (26 seats).",
        "Clue 2 requires at least 30 seats for Rhetoric, so Rhetoric is in Room C (42 seats), leaving Delivery in Room A (18 seats).",
        "Difference: 42 - 18 = 24 seats."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Rm A: 18",
            "value": 18,
            "color": "#06b6d4"
          },
          {
            "label": "Rm B: 26",
            "value": 26,
            "color": "#94a3b8"
          },
          {
            "label": "Rm C: 42",
            "value": 42,
            "color": "#4f46e5"
          }
        ],
        "totalLabel": "86 total seats"
      }
    },
    {
      "id": 4,
      "title": "Overlapping Rehearsal Workshops",
      "difficulty": "hard",
      "type": "logic_puzzle",
      "problemText": "Every one of the 45 members in the Speech Club joins at least one afternoon session: Elocution or Intonation (or both). Exactly 28 members attend Elocution and 26 members attend Intonation. How many members attend BOTH sessions?",
      "question": "Every one of the 45 members in the Speech Club joins at least one afternoon session: Elocution or Intonation (or both). Exactly 28 members attend Elocution and 26 members attend Intonation. How many members attend BOTH sessions?",
      "correctAnswer": 9,
      "unit": "students",
      "hintText": "Adding 28 + 26 counts the students who attend both sessions twice. Compare that sum to the 45 real club members.",
      "steps": [
        "Combined attendance counts: 28 + 26 = 54.",
        "Since only 45 distinct members exist and everyone joins at least one, the extra count equals the overlap.",
        "Students in both sessions: 54 - 45 = 9."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Combined Sum: 54",
            "value": 54,
            "color": "#4f46e5"
          },
          {
            "label": "Club Members: 45",
            "value": 45,
            "color": "#10b981"
          }
        ]
      }
    },
    {
      "id": 5,
      "title": "The Three-Digit Keynote Passcode",
      "difficulty": "hard",
      "type": "logic_puzzle",
      "problemText": "Maya locks her keynote slides with a 3-digit passcode [A B C], where A, B, and C are single whole digits from 1 to 9. Clue 1: B is 3 times A. Clue 2: C is 2 greater than B. Clue 3: The sum A + B + C equals 16. What is the 3-digit passcode?",
      "question": "Maya locks her keynote slides with a 3-digit passcode [A B C], where A, B, and C are single whole digits from 1 to 9. Clue 1: B is 3 times A. Clue 2: C is 2 greater than B. Clue 3: The sum A + B + C equals 16. What is the 3-digit passcode?",
      "correctAnswer": 268,
      "unit": "passcode",
      "hintText": "Since C <= 9 and C = 3A + 2, test the only small digits possible for A (1 or 2) against Clue 3.",
      "steps": [
        "From B = 3A and C = B + 2 <= 9, A can only be 1 or 2 (A = 3 would make C = 11).",
        "Test A = 1 -> 1 + 3 + 5 = 9 (false). Test A = 2 -> B = 6, C = 8 -> 2 + 6 + 8 = 16 (true!).",
        "The 3-digit passcode [A B C] is 268."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "A",
            "value": 2,
            "color": "#4f46e5"
          },
          {
            "label": "3A",
            "value": 6,
            "color": "#06b6d4"
          },
          {
            "label": "3A+2",
            "value": 8,
            "color": "#10b981"
          }
        ],
        "totalLabel": "Sum = 16"
      }
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
