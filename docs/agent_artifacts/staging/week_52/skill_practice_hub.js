/**
 * STAGED DELIVERABLE: Round 91 Production Standard
 * Week: 52 | Theme: "Have You Ever\" Bingo (Seeding)" | CEFR: A2 Flyers
 * Generated: 2026-11-13T05:53:06.000Z
 * Pipeline: scripts/round91_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 52,
  "theme": "Have You Ever\" Bingo (Seeding)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "Which question correctly asks about a life experience?",
      "options": [
        "Have you ever seen the pyramids?",
        "Did you ever saw the pyramids?",
        "Have you ever saw the pyramids?"
      ],
      "answer": "Have you ever seen the pyramids?",
      "explanation": "'Have you ever' must be followed by past participle 'seen'."
    },
    {
      "id": 2,
      "question": "I have ___ ridden a camel in the desert.",
      "options": [
        "never",
        "ever",
        "not ever been"
      ],
      "answer": "never",
      "explanation": "'I have never' expresses that an action did not occur in your past."
    },
    {
      "id": 3,
      "question": "She has ___ delicious sushi in Tokyo.",
      "options": [
        "eaten",
        "ate",
        "eat"
      ],
      "answer": "eaten",
      "explanation": "Past participle of 'eat' is 'eaten'."
    },
    {
      "id": 4,
      "question": "Have you ever ___ to London in the winter?",
      "options": [
        "been",
        "went",
        "go"
      ],
      "answer": "been",
      "explanation": "Use 'been' to describe visiting and returning from a location."
    },
    {
      "id": 5,
      "question": "They have ___ across the Pacific Ocean.",
      "options": [
        "flown",
        "flew",
        "fly"
      ],
      "answer": "flown",
      "explanation": "Past participle of 'fly' is 'flown'."
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Bingo Game Points Scored",
      "problem_text": "In round one, Harper scored 35 points. In round two, she scored 42 points. How many points did she score in total?",
      "correctAnswer": 77,
      "target_answer": 77,
      "answer_unit": "points",
      "step_by_step": "Step 1: Round one = 35 points. Step 2: Round two = 42 points. Step 3: Total = 35 + 42 = 77 points.",
      "modelData": {
        "bars": [
          {
            "label": "Round 1",
            "value": 35,
            "color": "#3B82F6"
          },
          {
            "label": "Round 2",
            "value": 42,
            "color": "#10B981"
          }
        ],
        "total": 77,
        "unit": "points",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 2,
      "title": "Travel Passport Stamps",
      "problem_text": "A student passport contains 18 national park stamps and 26 museum stamps. How many stamps are in the passport altogether?",
      "correctAnswer": 44,
      "target_answer": 44,
      "answer_unit": "stamps",
      "step_by_step": "Step 1: Park stamps = 18. Step 2: Museum stamps = 26. Step 3: Total = 18 + 26 = 44 stamps.",
      "modelData": {
        "bars": [
          {
            "label": "Park Stamps",
            "value": 18,
            "color": "#F59E0B"
          },
          {
            "label": "Museum Stamps",
            "value": 26,
            "color": "#6366F1"
          }
        ],
        "total": 44,
        "unit": "stamps",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 3,
      "title": "Flight Travel Hours Difference",
      "problem_text": "Flight A lasted 54 hours across multiple stops. Flight B lasted 38 hours. How many more hours did Flight A take than Flight B?",
      "correctAnswer": 16,
      "target_answer": 16,
      "answer_unit": "hours",
      "step_by_step": "Step 1: Flight A = 54 hours. Step 2: Flight B = 38 hours. Step 3: Difference = 54 - 38 = 16 hours.",
      "modelData": {
        "bars": [
          {
            "label": "Flight A",
            "value": 54,
            "color": "#EC4899"
          },
          {
            "label": "Flight B",
            "value": 38,
            "color": "#14B8A6"
          }
        ],
        "total": 54,
        "unit": "hours",
        "comparisonType": "difference"
      }
    },
    {
      "id": 4,
      "title": "Bingo Cards Printed",
      "problem_text": "The teacher needs 75 bingo cards for the grade level. She has printed 52 cards so far. How many cards still need to be printed?",
      "correctAnswer": 23,
      "target_answer": 23,
      "answer_unit": "cards",
      "step_by_step": "Step 1: Total needed = 75 cards. Step 2: Printed = 52 cards. Step 3: Remaining = 75 - 52 = 23 cards.",
      "modelData": {
        "bars": [
          {
            "label": "Printed",
            "value": 52,
            "color": "#8B5CF6"
          },
          {
            "label": "Remaining",
            "value": 23,
            "color": "#F97316"
          }
        ],
        "total": 75,
        "unit": "cards",
        "comparisonType": "part_whole"
      }
    },
    {
      "id": 5,
      "title": "Museum Badges Collected",
      "problem_text": "Daniel collected 27 science badges and 36 history badges. How many badges did he collect in all?",
      "correctAnswer": 63,
      "target_answer": 63,
      "answer_unit": "badges",
      "step_by_step": "Step 1: Science = 27 badges. Step 2: History = 36 badges. Step 3: Total = 27 + 36 = 63 badges.",
      "modelData": {
        "bars": [
          {
            "label": "Science Badges",
            "value": 27,
            "color": "#06B6D4"
          },
          {
            "label": "History Badges",
            "value": 36,
            "color": "#A855F7"
          }
        ],
        "total": 63,
        "unit": "badges",
        "comparisonType": "part_whole"
      }
    }
  ],
  "science_lab": {
    "title_en": "Have You Ever\" Bingo (Seeding) Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Irregular Participle Pairing",
        "description": "Connect base verbs to their correct past participle forms.",
        "instructions": "Pair 'see' with 'seen' and 'fly' with 'flown'.",
        "items": [
          {
            "id": "participle_seen",
            "name": "seen (participle)",
            "type": "verb_form"
          },
          {
            "id": "participle_flown",
            "name": "flown (participle)",
            "type": "verb_form"
          }
        ],
        "dropZones": [
          {
            "id": "base_see",
            "label": "Base Verb: see"
          },
          {
            "id": "base_fly",
            "label": "Base Verb: fly"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Bingo Card Line Completion",
        "description": "Place affirmative response tokens onto the 4x4 experience grid.",
        "instructions": "Complete four tokens in a straight diagonal line to trigger the Bingo alert.",
        "items": [
          {
            "id": "token_visited",
            "name": "Visited Museum Token",
            "type": "marker"
          },
          {
            "id": "token_eaten",
            "name": "Eaten Tropical Fruit Token",
            "type": "marker"
          }
        ],
        "dropZones": [
          {
            "id": "grid_diag_1",
            "label": "Card Square A1"
          },
          {
            "id": "grid_diag_2",
            "label": "Card Square B2"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Speaking Prompt Exchange",
        "description": "Formulate a valid 'Have you ever...?' inquiry for your interview partner.",
        "instructions": "Assemble the chunk: [Have you ever] + [been to] + [a foreign country]?",
        "items": [
          {
            "id": "chunk_have_you",
            "name": "Have you ever",
            "type": "starter"
          },
          {
            "id": "chunk_been_to",
            "name": "been to",
            "type": "verb_chunk"
          },
          {
            "id": "chunk_country",
            "name": "a foreign country?",
            "type": "predicate"
          }
        ],
        "dropZones": [
          {
            "id": "prompt_slot",
            "label": "Question Formatter Bar"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
