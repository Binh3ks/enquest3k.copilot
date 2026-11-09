/**
 * STAGED MOCK EXAM DELIVERABLE: Writing Hub (Picture Story & Writing Ladder)
 * Week: 36 | Level: Cambridge A2 Flyers | Mode: FULL_MOCK
 * Pipeline: scripts/generate_mock_exam_content.mjs (Round 65 Pilot Mock)
 * Cumulative Sourcing: Weeks 33, 34, 35, 36
 */

export const writingHubData = {
  week: 36,
  theme: "Review & Project 3: \"My Adventure Book\"",
  cefr_level: "A2 Flyers",

  // ── Cambridge Reading & Writing Part 7 Component Contract ─────────────────
  picture_story: {
    title: "The Mountain Adventure Expedition",
    instructions: "Look at the three pictures. Write the story. Write 20 or more words.",
    min_words: 20,
    model_sentence: "One sunny morning, Alex and Mia packed their backpacks with a compass, food, and a warm blanket. They walked carefully across a wooden bridge over the river. Finally, they reached the hilltop, pitched their blue tent, and happily watched the sunset together.",
    rubric: {
      content: 2,
      grammar_flow: 2,
      vocab_spelling: 1,
      total: 5
    },
    panels: [
      {
        panel_id: 1,
        title: "Preparing the Expedition",
        image_url: "/images/week36/writing_panel_1.png",
        caption: "Alex and Mia pack their backpacks with maps, flashlights, and a first-aid kit.",
        word_bank: ["pack", "backpack", "compass", "map", "careful"]
      },
      {
        panel_id: 2,
        title: "Crossing the River Bridge",
        image_url: "/images/week36/writing_panel_2.png",
        caption: "The children carefully cross a suspension bridge over a rushing stream.",
        word_bank: ["walked", "carefully", "bridge", "river", "journey"]
      },
      {
        panel_id: 3,
        title: "Camping on the Summit",
        image_url: "/images/week36/writing_panel_3.png",
        caption: "They reach the hilltop campsite, pitch their tent, and celebrate their journey.",
        word_bank: ["pitched", "tent", "campfire", "delighted", "sunset"]
      }
    ],
    ladder_steps: [
      { stage: "MODEL", focus: "Analyze the 3-panel sequential storyline and transition words" },
      { stage: "BUILD", focus: "Draft 1-2 sentences per panel using Past Simple and connector words" },
      { stage: "WRITE", focus: "Compose complete paragraph narrative ensuring >= 20 words" },
      { stage: "EXPAND", focus: "Add descriptive emotion adjectives (delighted, brave, memorable)" }
    ]
  }
};

export default writingHubData;
