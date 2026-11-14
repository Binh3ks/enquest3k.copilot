/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 62 | Theme: "The Movie Trailer: Summarizing Stories" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 62,
  "theme": "The Movie Trailer: Summarizing Stories",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "question": "To round 48 to the nearest ten, we look at the ones digit 8 and round ___ to 50.",
      "options": [
        "up",
        "down",
        "sideways"
      ],
      "answer": "up",
      "explanation": "Digits 5, 6, 7, 8, and 9 round up to the next ten.",
      "promptText": "To round 48 to the nearest ten, we look at the ones digit 8 and round ___ to 50.",
      "sentence": "To round 48 to the nearest ten, we look at the ones digit 8 and round ___ to 50."
    },
    {
      "id": 2,
      "question": "When summarizing, good writers ___ the text instead of copying sentences directly.",
      "options": [
        "paraphrase",
        "delete",
        "ignore"
      ],
      "answer": "paraphrase",
      "explanation": "Paraphrasing means putting the meaning into your own words.",
      "promptText": "When summarizing, good writers ___ the text instead of copying sentences directly.",
      "sentence": "When summarizing, good writers ___ the text instead of copying sentences directly."
    },
    {
      "id": 3,
      "question": "What is 268 rounded to the nearest hundred?",
      "options": [
        "300",
        "200",
        "270"
      ],
      "answer": "300",
      "explanation": "Because the tens digit 6 is >= 5, 268 rounds up to 300.",
      "promptText": "What is 268 rounded to the nearest hundred?",
      "sentence": "What is 268 rounded to the nearest hundred?"
    },
    {
      "id": 4,
      "question": "The trailer was concise; ___, it communicated the entire plot in 60 seconds.",
      "options": [
        "therefore",
        "because",
        "although"
      ],
      "answer": "therefore",
      "explanation": "Therefore signals the result of the trailer being concise.",
      "promptText": "The trailer was concise; ___, it communicated the entire plot in 60 seconds.",
      "sentence": "The trailer was concise; ___, it communicated the entire plot in 60 seconds."
    },
    {
      "id": 5,
      "question": "What is 134 rounded to the nearest ten?",
      "options": [
        "130",
        "140",
        "100"
      ],
      "answer": "130",
      "explanation": "The ones digit 4 is less than 5, so 134 rounds down to 130.",
      "promptText": "What is 134 rounded to the nearest ten?",
      "sentence": "What is 134 rounded to the nearest ten?"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Rounding Friday Premiere Tickets",
      "problemText": "A movie theater sells 48 tickets for the morning trailer screening. What is 48 rounded to the nearest ten?",
      "correctAnswer": 50,
      "target_answer": 50,
      "unit": "tickets",
      "hintText": "Step 1: Ones digit is 8. Step 2: Since 8 >= 5, round up. Step 3: Result = 50.",
      "steps": [
        "Step 1: Ones digit = 8.",
        "Step 2: 8 >= 5 -> round up.",
        "Step 3: 48 rounds to 50."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Actual (48)",
            "value": 48,
            "color": "#3B82F6"
          },
          {
            "label": "Rounded to 10 (50)",
            "value": 50,
            "color": "#10B981"
          }
        ],
        "total": 50,
        "unit": "tickets",
        "comparisonType": "rounding"
      },
      "problem_text": "A movie theater sells 48 tickets for the morning trailer screening. What is 48 rounded to the nearest ten?",
      "problem_en": "A movie theater sells 48 tickets for the morning trailer screening. What is 48 rounded to the nearest ten?",
      "answer": 50,
      "step_by_step": "Step 1: Ones digit is 8. Step 2: Since 8 >= 5, round up. Step 3: Result = 50."
    },
    {
      "id": 2,
      "title": "Rounding Afternoon Seating",
      "problemText": "The afternoon screening has 134 audience members seated in the hall. What is 134 rounded to the nearest ten?",
      "correctAnswer": 130,
      "target_answer": 130,
      "unit": "members",
      "hintText": "Step 1: Ones digit is 4. Step 2: Since 4 < 5, round down. Step 3: Result = 130.",
      "steps": [
        "Step 1: Ones digit = 4.",
        "Step 2: 4 < 5 -> round down.",
        "Step 3: 134 rounds to 130."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Actual (134)",
            "value": 134,
            "color": "#F59E0B"
          },
          {
            "label": "Rounded to 10 (130)",
            "value": 130,
            "color": "#8B5CF6"
          }
        ],
        "total": 130,
        "unit": "members",
        "comparisonType": "rounding"
      },
      "problem_text": "The afternoon screening has 134 audience members seated in the hall. What is 134 rounded to the nearest ten?",
      "problem_en": "The afternoon screening has 134 audience members seated in the hall. What is 134 rounded to the nearest ten?",
      "answer": 130,
      "step_by_step": "Step 1: Ones digit is 4. Step 2: Since 4 < 5, round down. Step 3: Result = 130."
    },
    {
      "id": 3,
      "title": "Rounding Saturday Night Bookings",
      "problemText": "Saturday evening ticket sales reach 268 admissions. What is 268 rounded to the nearest hundred?",
      "correctAnswer": 300,
      "target_answer": 300,
      "unit": "admissions",
      "hintText": "Step 1: Tens digit is 6. Step 2: Since 6 >= 5, round up to next hundred. Step 3: Result = 300.",
      "steps": [
        "Step 1: Tens digit = 6.",
        "Step 2: 6 >= 5 -> round up.",
        "Step 3: 268 rounds to 300."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Actual (268)",
            "value": 268,
            "color": "#EF4444"
          },
          {
            "label": "Rounded to 100 (300)",
            "value": 300,
            "color": "#06B6D4"
          }
        ],
        "total": 300,
        "unit": "admissions",
        "comparisonType": "rounding"
      },
      "problem_text": "Saturday evening ticket sales reach 268 admissions. What is 268 rounded to the nearest hundred?",
      "problem_en": "Saturday evening ticket sales reach 268 admissions. What is 268 rounded to the nearest hundred?",
      "answer": 300,
      "step_by_step": "Step 1: Tens digit is 6. Step 2: Since 6 >= 5, round up to next hundred. Step 3: Result = 300."
    },
    {
      "id": 4,
      "title": "Estimating Popcorn Buckets",
      "problemText": "The cinema concession stand sells 415 popcorn tubs over the weekend. What is 415 rounded to the nearest hundred?",
      "correctAnswer": 400,
      "target_answer": 400,
      "unit": "tubs",
      "hintText": "Step 1: Tens digit is 1. Step 2: Since 1 < 5, round down. Step 3: Result = 400.",
      "steps": [
        "Step 1: Tens digit = 1.",
        "Step 2: 1 < 5 -> round down.",
        "Step 3: 415 rounds to 400."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Actual (415)",
            "value": 415,
            "color": "#EC4899"
          },
          {
            "label": "Rounded to 100 (400)",
            "value": 400,
            "color": "#6366F1"
          }
        ],
        "total": 400,
        "unit": "tubs",
        "comparisonType": "rounding"
      },
      "problem_text": "The cinema concession stand sells 415 popcorn tubs over the weekend. What is 415 rounded to the nearest hundred?",
      "problem_en": "The cinema concession stand sells 415 popcorn tubs over the weekend. What is 415 rounded to the nearest hundred?",
      "answer": 400,
      "step_by_step": "Step 1: Tens digit is 1. Step 2: Since 1 < 5, round down. Step 3: Result = 400."
    },
    {
      "id": 5,
      "title": "Rounding Film Festival Badges",
      "problemText": "A student film festival issues 783 participant badges. What is 783 rounded to the nearest ten?",
      "correctAnswer": 780,
      "target_answer": 780,
      "unit": "badges",
      "hintText": "Step 1: Ones digit is 3. Step 2: Since 3 < 5, round down. Step 3: Result = 780.",
      "steps": [
        "Step 1: Ones digit = 3.",
        "Step 2: 3 < 5 -> round down.",
        "Step 3: 783 rounds to 780."
      ],
      "modelData": {
        "bars": [
          {
            "label": "Actual (783)",
            "value": 783,
            "color": "#14B8A6"
          },
          {
            "label": "Rounded to 10 (780)",
            "value": 780,
            "color": "#F97316"
          }
        ],
        "total": 780,
        "unit": "badges",
        "comparisonType": "rounding"
      },
      "problem_text": "A student film festival issues 783 participant badges. What is 783 rounded to the nearest ten?",
      "problem_en": "A student film festival issues 783 participant badges. What is 783 rounded to the nearest ten?",
      "answer": 780,
      "step_by_step": "Step 1: Ones digit is 3. Step 2: Since 3 < 5, round down. Step 3: Result = 780."
    }
  ],
  "science_lab": {
    "title_en": "The Movie Trailer: Summarizing Stories Workshop Lab",
    "scenarios": [
      {
        "stage": 1,
        "title": "Rounding Rule Classifier",
        "diagram_type": "rounding_ladder",
        "instruction": "Sort numbers by whether they Round Up or Round Down when rounding to the nearest ten.",
        "items": [
          {
            "label": "Number 48 (ones digit 8)",
            "target": "round_up",
            "name": "Number 48 (ones digit 8)",
            "text": "Number 48 (ones digit 8)",
            "type": "round_up",
            "description": ""
          },
          {
            "label": "Number 134 (ones digit 4)",
            "target": "round_down",
            "name": "Number 134 (ones digit 4)",
            "text": "Number 134 (ones digit 4)",
            "type": "round_down",
            "description": ""
          },
          {
            "label": "Number 783 (ones digit 3)",
            "target": "round_down",
            "name": "Number 783 (ones digit 3)",
            "text": "Number 783 (ones digit 3)",
            "type": "round_down",
            "description": ""
          },
          {
            "label": "Number 57 (ones digit 7)",
            "target": "round_up",
            "name": "Number 57 (ones digit 7)",
            "text": "Number 57 (ones digit 7)",
            "type": "round_up",
            "description": ""
          }
        ]
      },
      {
        "stage": 2,
        "title": "Three-Sentence Trailer Structure",
        "diagram_type": "trailer_flow",
        "instruction": "Match each sentence of a trailer summary to its dramatic narrative role.",
        "items": [
          {
            "label": "Introduce heroes and setting: Sentence 1",
            "target": "setting_intro",
            "name": "Introduce heroes and setting: Sentence 1",
            "text": "Introduce heroes and setting: Sentence 1",
            "type": "setting_intro",
            "description": ""
          },
          {
            "label": "Reveal the dangerous conflict: Sentence 2",
            "target": "conflict_reveal",
            "name": "Reveal the dangerous conflict: Sentence 2",
            "text": "Reveal the dangerous conflict: Sentence 2",
            "type": "conflict_reveal",
            "description": ""
          },
          {
            "label": "Build up to the climax: Sentence 3",
            "target": "climax_hook",
            "name": "Build up to the climax: Sentence 3",
            "text": "Build up to the climax: Sentence 3",
            "type": "climax_hook",
            "description": ""
          }
        ]
      },
      {
        "stage": 3,
        "title": "Hundred Rounding Targets",
        "diagram_type": "hundred_scales",
        "instruction": "Match each number to its value rounded to the nearest hundred (300 or 400).",
        "items": [
          {
            "label": "268 tickets",
            "target": "target_300",
            "name": "268 tickets",
            "text": "268 tickets",
            "type": "target_300",
            "description": ""
          },
          {
            "label": "415 popcorn tubs",
            "target": "target_400",
            "name": "415 popcorn tubs",
            "text": "415 popcorn tubs",
            "type": "target_400",
            "description": ""
          },
          {
            "label": "320 festival flyers",
            "target": "target_300",
            "name": "320 festival flyers",
            "text": "320 festival flyers",
            "type": "target_300",
            "description": ""
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
