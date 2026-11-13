/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 35 | Theme: "Storytelling Practice 2 (Personal Recount)" | CEFR: "A2 Flyers"
 * Updated: 2026-11-13T04:18:06.384Z (Round 89 Singapore Math 2/5 -> 5/5 Expansion)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
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
    },
    {
      "id": 3,
      "title": "Problem 3: Travel Journal Stamps (Multi-Step)",
      "difficulty": "medium",
      "type": "part_whole",
      "problemText": "Liam pasted 18 souvenir stamps in chapter one and 24 stamps in chapter two of his travel journal. His goal is 60 stamps. How many more stamps does Liam need to reach his goal?",
      "question": "Liam pasted 18 souvenir stamps in chapter one and 24 stamps in chapter two of his travel journal. His goal is 60 stamps. How many more stamps does Liam need to reach his goal?",
      "correctAnswer": 18,
      "target_answer": 18,
      "unit": "stamps",
      "hintText": "Add chapter one (18) and chapter two (24) first. Then subtract from the 60-stamp goal.",
      "steps": [
        "Current stamps: 18 + 24 = 42 stamps.",
        "Remaining needed: 60 - 42 = 18 stamps."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Ch 1: 18",
            "value": 18,
            "color": "#4f46e5"
          },
          {
            "label": "Ch 2: 24",
            "value": 24,
            "color": "#06b6d4"
          },
          {
            "label": "Needed: 18",
            "value": 18,
            "color": "#94a3b8"
          }
        ],
        "totalLabel": "Goal: 60 stamps"
      }
    },
    {
      "id": 4,
      "title": "Problem 4: Historic Artifact Sketches (Comparison)",
      "difficulty": "easy",
      "type": "comparison",
      "problemText": "In his sketchbook, Noah drew 32 castle towers and 19 historic bridges during his holiday. How many more castle towers did he draw than historic bridges?",
      "question": "In his sketchbook, Noah drew 32 castle towers and 19 historic bridges during his holiday. How many more castle towers did he draw than historic bridges?",
      "correctAnswer": 13,
      "target_answer": 13,
      "unit": "sketches",
      "hintText": "Subtract the number of historic bridges (19) from castle towers (32).",
      "steps": [
        "Castle towers: 32.",
        "Historic bridges: 19.",
        "Difference: 32 - 19 = 13 more towers."
      ],
      "modelData": {
        "type": "comparison",
        "bars": [
          {
            "label": "Towers: 32",
            "value": 32,
            "color": "#0ea5e9"
          },
          {
            "label": "Bridges: 19",
            "value": 19,
            "color": "#ef4444"
          }
        ],
        "differenceLabel": "13 more towers"
      }
    },
    {
      "id": 5,
      "title": "Problem 5: Memory Exhibit Visitors (Part-Whole)",
      "difficulty": "easy",
      "type": "part_whole",
      "problemText": "At the local memory exhibit, 48 visitors arrived before noon and 37 visitors arrived in the afternoon. How many visitors explored the exhibit in total?",
      "question": "At the local memory exhibit, 48 visitors arrived before noon and 37 visitors arrived in the afternoon. How many visitors explored the exhibit in total?",
      "correctAnswer": 85,
      "target_answer": 85,
      "unit": "visitors",
      "hintText": "Add morning visitors (48) and afternoon visitors (37) together.",
      "steps": [
        "Morning attendance: 48 visitors.",
        "Afternoon attendance: 37 visitors.",
        "Total attendance: 48 + 37 = 85 visitors."
      ],
      "modelData": {
        "type": "part_whole",
        "bars": [
          {
            "label": "Morning: 48",
            "value": 48,
            "color": "#3b82f6"
          },
          {
            "label": "Afternoon: 37",
            "value": 37,
            "color": "#10b981"
          }
        ],
        "totalLabel": "Total: 85 visitors"
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
