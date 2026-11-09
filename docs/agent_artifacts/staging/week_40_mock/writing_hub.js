/**
 * STAGED MOCK EXAM DELIVERABLE: Writing Hub (Picture Story & Writing Ladder)
 * Week: 40 | Level: A2 Flyers | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks 37, 38, 39, 40
 */

export const writingHubData = {
  "week": 40,
  "theme": "Beast Battle (Comparisons)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Finding the Lost Bear Cub",
    "instructions": "Look at the three pictures. Write the story. Write 20 or more words.",
    "min_words": 20,
    "model_sentence": "One sunny morning, Sam and Ranger David were hiking along a mountain trail when they discovered fresh bear paw prints in the damp mud. They followed the tracks carefully through the pine trees and discovered a frightened little cub sheltering behind a boulder. Ranger David gently guided the cub towards the meadow, where its delighted mother bear was waiting safely.",
    "rubric": {
      "content": 2,
      "grammar_flow": 2,
      "vocab_spelling": 1,
      "total": 5
    },
    "panels": [
      {
        "panel_id": 1,
        "title": "Spotting Animal Tracks",
        "image_url": "/images/week40/writing_panel_1.png",
        "caption": "Sam and Ranger David discover fresh bear paw tracks beside the forest stream.",
        "word_bank": [
          "track",
          "paw",
          "mud",
          "hike",
          "careful"
        ]
      },
      {
        "panel_id": 2,
        "title": "Discovering the Cub",
        "image_url": "/images/week40/writing_panel_2.png",
        "caption": "They find a small brown cub hiding behind a rocky boulder looking hungry.",
        "word_bank": [
          "cub",
          "boulder",
          "fur",
          "frightened",
          "shelter"
        ]
      },
      {
        "panel_id": 3,
        "title": "Reuniting with Mother Bear",
        "image_url": "/images/week40/writing_panel_3.png",
        "caption": "The cub runs happily across the sunny meadow to its grateful mother bear.",
        "word_bank": [
          "reunited",
          "mother",
          "meadow",
          "delighted",
          "safe"
        ]
      }
    ],
    "ladder_steps": [
      {
        "stage": "MODEL",
        "focus": "Analyze 3-panel sequential storyline using Past Simple and connectors"
      },
      {
        "stage": "BUILD",
        "focus": "Draft 1-2 descriptive sentences per panel using animal vocabulary"
      },
      {
        "stage": "WRITE",
        "focus": "Compose complete paragraph narrative ensuring >= 20 words"
      },
      {
        "stage": "EXPAND",
        "focus": "Add descriptive adjectives (sharp claws, thick fur, grateful)"
      }
    ]
  }
};

export default writingHubData;
