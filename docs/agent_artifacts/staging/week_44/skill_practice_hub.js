/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 44 | Theme: "The Cookie Monster (Subtraction Language)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.167Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 44,
  "theme": "The Cookie Monster (Subtraction Language)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "sentence": "Ten minus four equals six chocolate cookies.",
      "options": [
        "minus",
        "plus",
        "times"
      ],
      "answer": "minus",
      "explanation": "Use 'minus' to show subtraction between two numbers."
    },
    {
      "sentence": "If you take away two treats, four treats remain.",
      "options": [
        "take",
        "takes",
        "taking"
      ],
      "answer": "take",
      "explanation": "Use base verb 'take' with pronoun 'you' in conditional clause."
    },
    {
      "sentence": "How many delicious cookies are left on the tray?",
      "options": [
        "left",
        "leave",
        "leaving"
      ],
      "answer": "left",
      "explanation": "Use participle adjective 'left' meaning remaining."
    },
    {
      "sentence": "Only five golden cookies remain on the baking sheet.",
      "options": [
        "remain",
        "remains",
        "remained"
      ],
      "answer": "remain",
      "explanation": "Use plural verb 'remain' with plural subject 'five golden cookies'."
    },
    {
      "sentence": "There are fewer cookies on the table than before.",
      "options": [
        "fewer",
        "less",
        "little"
      ],
      "answer": "fewer",
      "explanation": "Use 'fewer' with countable plural nouns like 'cookies'."
    }
  ],
  "singapore_math": [
    {
      "id": "w44_p1",
      "type": "comparison",
      "title": "Cookie Jar Subtraction",
      "question": "Grandma baked 45 cookies in total. The children ate 15 cookies during snack time. How many cookies are left in the jar?",
      "storyContext": "Chloe tallies the remaining cookies before placing the glass lid on the jar.",
      "modelData": {
        "bars": [
          {
            "label": "Total Baked",
            "value": 45,
            "color": "#d97706"
          },
          {
            "label": "Eaten Cookies",
            "value": 15,
            "color": "#ef4444"
          }
        ],
        "difference": 30,
        "unit": "cookies"
      },
      "target_answer": 30,
      "unit": "cookies",
      "steps": [
        "Start with the 45 baked cookies.",
        "Subtract the 15 eaten cookies.",
        "45 - 15 = 30 cookies left."
      ]
    },
    {
      "id": "w44_p2",
      "type": "comparison",
      "title": "Bake Sale Plate Count",
      "question": "The school bake sale started with 50 lemon cupcakes. Customers bought 22 cupcakes by noon. How many cupcakes remain for the afternoon?",
      "storyContext": "Lucas counts the cupcakes on the table before the afternoon bell rings.",
      "modelData": {
        "bars": [
          {
            "label": "Starting Cupcakes",
            "value": 50,
            "color": "#facc15"
          },
          {
            "label": "Sold Cupcakes",
            "value": 22,
            "color": "#f97316"
          }
        ],
        "difference": 28,
        "unit": "cupcakes"
      },
      "target_answer": 28,
      "unit": "cupcakes",
      "steps": [
        "Start with the 50 starting cupcakes.",
        "Subtract the 22 sold cupcakes.",
        "50 - 22 = 28 cupcakes remain."
      ]
    }
  ],
  "science_lab": {
    "title_en": "The Cookie Monster (Subtraction Language) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Cookie Take Away Lab",
        "diagram_type": "take_away_tray_grid",
        "instruction": "Drag 4 cookies from the tray to the Cookie Monster's plate and observe what remains.",
        "items": [
          {
            "label": "10 Cookies on Metal Tray",
            "target": "original_group"
          },
          {
            "label": "Remove 4 for Monster Snack",
            "target": "subtraction_action"
          },
          {
            "label": "6 Cookies Left on Tray",
            "target": "remaining_group"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Subtraction Equation Matching",
        "diagram_type": "math_sentence_cards",
        "instruction": "Match each word problem to its correct subtraction equation.",
        "items": [
          {
            "label": "Start with 8, take away 3",
            "target": "8_minus_3_equals_5"
          },
          {
            "label": "Start with 12, take away 5",
            "target": "12_minus_5_equals_7"
          },
          {
            "label": "Start with 15, take away 6",
            "target": "15_minus_6_equals_9"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Fair Sharing Balance",
        "diagram_type": "snack_distribution_table",
        "instruction": "Distribute the 6 remaining cookies equally between Lucas and Chloe.",
        "items": [
          {
            "label": "3 Cookies -> Lucas's Napkin",
            "target": "plate_lucas"
          },
          {
            "label": "3 Cookies -> Chloe's Napkin",
            "target": "plate_chloe"
          },
          {
            "label": "Fair Share: 3 each",
            "target": "equal_share"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
