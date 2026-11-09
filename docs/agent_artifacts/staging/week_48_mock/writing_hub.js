/**
 * STAGED MOCK EXAM DELIVERABLE: Writing Hub (Picture Story & Writing Ladder)
 * Week: 48 | Level: A2 Flyers | Mode: FULL_MOCK
 * Cumulative Sourcing: Weeks 45, 46, 47, 48
 */

export const writingHubData = {
  "week": 48,
  "theme": "Measuring Up (Length)",
  "cefr_level": "A2 Flyers",
  "picture_story": {
    "title": "Building the Tallest Wooden Tower",
    "instructions": "Look at the three pictures. Write the story. Write 20 or more words.",
    "min_words": 20,
    "model_sentence": "One sunny afternoon, William and Holly measured rectangular wooden blocks carefully using a thirty-centimeter ruler in their school craft studio. They stacked thirty blocks in a sturdy repeating pattern to build a very tall tower. Finally, the teacher measured their impressive tower at seventy centimeters, and the delighted children celebrated winning first prize.",
    "rubric": {
      "content": 2,
      "grammar_flow": 2,
      "vocab_spelling": 1,
      "total": 5
    },
    "panels": [
      {
        "panel_id": 1,
        "title": "Measuring the Blocks",
        "image_url": "/images/week48/writing_panel_1.png",
        "caption": "William and Holly measure wooden blocks with a plastic ruler on the craft table.",
        "word_bank": [
          "measure",
          "blocks",
          "ruler",
          "careful",
          "centimeter"
        ]
      },
      {
        "panel_id": 2,
        "title": "Stacking in Sequence",
        "image_url": "/images/week48/writing_panel_2.png",
        "caption": "They stack thirty rectangular blocks in a steady, repeating sequence.",
        "word_bank": [
          "stack",
          "tower",
          "pattern",
          "sequence",
          "tall"
        ]
      },
      {
        "panel_id": 3,
        "title": "Winning the Trophy",
        "image_url": "/images/week48/writing_panel_3.png",
        "caption": "Their seventy-centimeter tower wins first prize, and the children smile proudly.",
        "word_bank": [
          "measured",
          "winner",
          "trophy",
          "delighted",
          "proud"
        ]
      }
    ],
    "ladder_steps": [
      {
        "stage": "MODEL",
        "focus": "Analyze 3-panel narrative using measurement descriptions and Past Simple"
      },
      {
        "stage": "BUILD",
        "focus": "Draft 1-2 sentences per panel connecting building steps and dimensions"
      },
      {
        "stage": "WRITE",
        "focus": "Compose complete paragraph narrative ensuring >= 20 words"
      },
      {
        "stage": "EXPAND",
        "focus": "Add descriptive details (sturdy blocks, repeating pattern, proud)"
      }
    ]
  }
};

export default writingHubData;
