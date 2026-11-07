/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 35 | Theme: "Storytelling Practice 2 (Personal Recount)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T07:16:42.026Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 35,
  "theme": "Storytelling Practice 2 (Personal Recount)",
  "cefr_level": "A2 Flyers",
  "grammar_drills": [
    {
      "id": 1,
      "prompt": "While Emma ___ her journal, her brother painted a picture.",
      "options": [
        "was writing",
        "wrote",
        "writes"
      ],
      "answer": "was writing"
    },
    {
      "id": 2,
      "prompt": "The children were very ___ when the magic show started.",
      "options": [
        "excited",
        "excitedly",
        "exciting"
      ],
      "answer": "excited"
    },
    {
      "id": 3,
      "prompt": "Suddenly, the train ___ at the quiet mountain station.",
      "options": [
        "stopped",
        "was stopping",
        "stops"
      ],
      "answer": "stopped"
    },
    {
      "id": 4,
      "prompt": "Grandpa ___ a wonderful photograph of our whole family.",
      "options": [
        "took",
        "takes",
        "was taking"
      ],
      "answer": "took"
    },
    {
      "id": 5,
      "prompt": "We ___ loudly at the clown's funny dance yesterday.",
      "options": [
        "laughed",
        "laugh",
        "are laughing"
      ],
      "answer": "laughed"
    }
  ],
  "singapore_math": [
    {
      "id": 1,
      "title": "Problem 1: Photograph Album (Part-Whole)",
      "problemText": "Emma took 45 photographs on Saturday and 35 photographs on Sunday. How many photographs did she take altogether?",
      "correctAnswer": 80,
      "answer": "80 photographs",
      "hintText": "Saturday photos (45) + Sunday photos (35) = 80 total photographs.",
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "value": 45,
            "label": "45 Saturday",
            "color": "#4f46e5"
          },
          {
            "value": 35,
            "label": "35 Sunday",
            "color": "#06b6d4"
          }
        ],
        "totalLabel": "80 photographs total"
      }
    },
    {
      "id": 2,
      "title": "Problem 2: Souvenir Postcards (Comparison)",
      "problemText": "The museum gift shop sold 64 postcards in the morning and 28 postcards in the afternoon. How many more postcards were sold in the morning?",
      "correctAnswer": 36,
      "answer": "36 postcards",
      "hintText": "Morning sales (64) - Afternoon sales (28) = 36 more postcards.",
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "value": 64,
            "label": "64 Morning",
            "color": "#0ea5e9"
          },
          {
            "value": 28,
            "label": "28 Afternoon",
            "color": "#ef4444"
          }
        ],
        "differenceLabel": "36 more postcards"
      }
    }
  ],
  "science_lab": {
    "title_en": "Storytelling Practice 2 (Personal Recount) Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Identifying Emotional Tone",
        "instruction": "Match recount excerpts to their emotional mood (Excited vs Peaceful)."
      },
      {
        "stage": 2,
        "title": "Chronological Sequence Assembly",
        "instruction": "Order narrative sentences using transition adverbs (First, Suddenly, Finally)."
      },
      {
        "stage": 3,
        "title": "Adjective Elevation Workshop",
        "instruction": "Replace flat adjectives (good, nice) with vivid alternatives (delighted, magnificent)."
      }
    ]
  }
};
export default skillPracticeHubData;
