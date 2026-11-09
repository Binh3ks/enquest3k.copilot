/**
 * STAGED DELIVERABLE: Skill Practice Hub (Math Bar Models, Action Lab, Grammar Duel)
 * Week: 82 | Theme: "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data" | CEFR: B1 Preliminary
 * Generated: 2026-11-09T08:30:07.706Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const skillPracticeHubData = {
  "week": 82,
  "theme": "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data",
  "cefr_level": "B1 Preliminary",
  "grammar_drills": [
    {
      "sentence": "The observation deck offered a spectacular panoramic view.",
      "options": [
        "panoramic",
        "panorama",
        "panoramas"
      ],
      "answer": "panoramic",
      "explanation": "Use the adjective 'panoramic' before the noun 'view'."
    },
    {
      "sentence": "A crisp morning breeze carried the sweet fragrance of flowers.",
      "options": [
        "crisp",
        "crisply",
        "crispness"
      ],
      "answer": "crisp",
      "explanation": "Use the sensory adjective 'crisp' to describe refreshing, cool air."
    },
    {
      "sentence": "The rich aroma of roasted coffee drifted across the square.",
      "options": [
        "aroma",
        "aromas",
        "aromatic"
      ],
      "answer": "aroma",
      "explanation": "The noun 'aroma' refers to a distinctive pleasant food or drink smell."
    },
    {
      "sentence": "Church bells echo softly across the peaceful valley at dusk.",
      "options": [
        "echo",
        "echos",
        "echoing"
      ],
      "answer": "echo",
      "explanation": "Use the plural present verb 'echo' with the plural subject 'Church bells'."
    },
    {
      "sentence": "Writers use vivid adjectives to describe authentic experiences.",
      "options": [
        "vivid",
        "vividly",
        "vividness"
      ],
      "answer": "vivid",
      "explanation": "Use the adjective 'vivid' to describe powerful, distinct imagery."
    }
  ],
  "singapore_math": [
    {
      "id": "w82_p1",
      "type": "part_whole",
      "title": "Analyzing Travel Vlog Video Views across Two Episodes",
      "question": "Chloe's mountain sunrise vlog received 280 viewer likes, while her harbor tour episode received 220 viewer likes. How many total likes did the two episodes receive combined?",
      "storyContext": "Liam compiles viewer engagement statistics for their video analytics report.",
      "modelData": {
        "bars": [
          {
            "label": "Mountain Sunrise",
            "value": 280,
            "color": "#f59e0b"
          },
          {
            "label": "Harbor Tour",
            "value": 220,
            "color": "#06b6d4"
          }
        ],
        "total": 500,
        "unit": "likes"
      },
      "target_answer": 500,
      "unit": "likes",
      "steps": [
        "Take the mountain sunrise likes: 280 likes.",
        "Add the harbor tour likes: 220 likes.",
        "280 + 220 = 500 total likes."
      ]
    },
    {
      "id": "w82_p2",
      "type": "comparison",
      "title": "Comparing Most and Least Watched Video Clips",
      "question": "The most watched clip (Sunrise Panorama) received 310 views, while the least watched clip (Map Discussion) received 140 views. What is the difference in views between the most and least watched clips?",
      "storyContext": "Chloe interprets audience retention data to see which scenery viewers preferred most.",
      "modelData": {
        "bars": [
          {
            "label": "Most Watched (Panorama)",
            "value": 310,
            "color": "#ec4899"
          },
          {
            "label": "Least Watched (Map)",
            "value": 140,
            "color": "#94a3b8"
          }
        ],
        "difference": 170,
        "unit": "views"
      },
      "target_answer": 170,
      "unit": "views",
      "steps": [
        "Start with the most watched views: 310 views.",
        "Subtract the least watched views: 140 views.",
        "310 - 140 = 170 views difference."
      ]
    }
  ],
  "science_lab": {
    "title_en": "ELA: The Travel Vlogger (Drafting) / Math: Analyzing Data Lab Workshop",
    "scenarios": [
      {
        "stage": 1,
        "title": "Sensory Detail Classification",
        "diagram_type": "five_senses_sorting",
        "instruction": "Classify descriptive travel terms into the correct sensory categories.",
        "items": [
          {
            "label": "Panoramic Golden Horizon",
            "target": "sight"
          },
          {
            "label": "Crisp Mountain Breeze",
            "target": "touch"
          },
          {
            "label": "Echoing Church Bells",
            "target": "sound"
          }
        ]
      },
      {
        "stage": 2,
        "title": "Culinary Aroma & Taste Matching",
        "diagram_type": "aroma_flavor_palette",
        "instruction": "Associate local marketplace experiences with smell and taste vocabulary.",
        "items": [
          {
            "label": "Roasted Coffee Bean Vapor",
            "target": "aroma"
          },
          {
            "label": "Wild Pine Needle Scent",
            "target": "fragrance"
          },
          {
            "label": "Freshly Baked Warm Pastry",
            "target": "taste"
          }
        ]
      },
      {
        "stage": 3,
        "title": "Atmospheric Serenity & Voiceover Pacing",
        "diagram_type": "voiceover_timeline_sync",
        "instruction": "Match voiceover descriptive pacing to scenic video footage.",
        "items": [
          {
            "label": "Quiet Dawn Time-Lapse",
            "target": "slow_pacing"
          },
          {
            "label": "Bustling Street Market",
            "target": "energetic_pacing"
          },
          {
            "label": "Peaceful Harbor Sunset",
            "target": "tranquil_reflection"
          }
        ]
      }
    ]
  }
};
export default skillPracticeHubData;
