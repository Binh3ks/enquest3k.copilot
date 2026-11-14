/**
 * STAGED DELIVERABLE: Round 94 Production Standard (CEFR A2 Flyers)
 * Week: 65 | Theme: "Review & Consolidation (Cycle 2.1)"
 * Generated: 2026-11-14T04:22:25.047Z
 * Pipeline: scripts/round94_generator.mjs
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */
export const speakingHubData = {
  "week": 65,
  "theme": "Review & Consolidation (Cycle 2.1)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute speech reflecting on your favorite learning achievement during this study cycle. Explain the skill, how you practiced it, and why it matters.",
  "info_exchange_cards": {
    "title": "Henry and Ruby's Review Fair Exchange",
    "table_a": {
      "title": "Henry's Science Fair Booth",
      "person": "Henry",
      "fields": [
        {
          "id": "field_a1",
          "label": "what / Henry's fair booth?",
          "cue_prompt": "what / Henry's fair booth?",
          "cue_word": "what",
          "is_missing": true,
          "value": "The Cause & Effect Domino Booth",
          "acceptable_questions": [
            "What is Henry's fair booth?",
            "What did Henry display at the fair?",
            "What was his station called?"
          ],
          "nova_reply": "Henry ran the Cause and Effect Domino Demonstration Booth at the science fair."
        },
        {
          "id": "field_a2",
          "label": "where / booth located?",
          "cue_prompt": "where / booth located?",
          "cue_word": "where",
          "is_missing": true,
          "value": "By the main auditorium doors",
          "acceptable_questions": [
            "Where is his booth located?",
            "Where was his table set up?",
            "Where in the fair was Henry?"
          ],
          "nova_reply": "His demonstration booth was located right beside the main auditorium doors."
        },
        {
          "id": "field_a3",
          "label": "how many / dominoes set up?",
          "cue_prompt": "how many / dominoes set up?",
          "cue_word": "how many",
          "is_missing": true,
          "value": "200 colorful dominoes",
          "acceptable_questions": [
            "How many dominoes did he set up?",
            "How many tiles were on his table?",
            "How many blocks did he use?"
          ],
          "nova_reply": "Henry set up 200 colorful dominoes in a double-spiral track."
        },
        {
          "id": "field_a4",
          "label": "how long / presentation took?",
          "cue_prompt": "how long / presentation took?",
          "cue_word": "how long",
          "is_missing": true,
          "value": "5 minutes per group",
          "acceptable_questions": [
            "How long did his presentation take?",
            "How many minutes was each talk?",
            "How long was each demonstration?"
          ],
          "nova_reply": "Each demonstration talk lasted 5 minutes for visiting parents."
        },
        {
          "id": "field_a5",
          "label": "who / was Henry's partner?",
          "cue_prompt": "who / was Henry's partner?",
          "cue_word": "who",
          "is_missing": true,
          "value": "His friend Jack",
          "acceptable_questions": [
            "Who was Henry's partner?",
            "Who worked with Henry?",
            "Who helped him at the booth?"
          ],
          "nova_reply": "His classmate Jack was his presentation partner."
        }
      ]
    },
    "table_b": {
      "title": "Ruby's Math Challenge Station",
      "person": "Ruby",
      "fields": [
        {
          "id": "field_b1",
          "label": "what / Ruby's station topic?",
          "cue_prompt": "what / Ruby's station topic?",
          "cue_word": "what",
          "is_missing": false,
          "value": "The Map Coordinate Puzzle",
          "nova_question": "What was the topic of Ruby's math station?",
          "acceptable_answers": [
            "The Map Coordinate Puzzle",
            "Map coordinates.",
            "Her station was the Map Coordinate Puzzle.",
            "Coordinate puzzle"
          ]
        },
        {
          "id": "field_b2",
          "label": "where / station placed?",
          "cue_prompt": "where / station placed?",
          "cue_word": "where",
          "is_missing": false,
          "value": "In the center of the gym",
          "nova_question": "Where was Ruby's challenge station placed?",
          "acceptable_answers": [
            "In the center of the gym",
            "In the gym center.",
            "It was placed in the center of the gym.",
            "Gym center"
          ]
        },
        {
          "id": "field_b3",
          "label": "how many / puzzle cards?",
          "cue_prompt": "how many / puzzle cards?",
          "cue_word": "how many",
          "is_missing": false,
          "value": "25 coordinate cards",
          "nova_question": "How many puzzle cards did she prepare for visitors?",
          "acceptable_answers": [
            "25 coordinate cards",
            "Twenty-five coordinate cards",
            "She prepared 25 cards.",
            "25 cards"
          ]
        },
        {
          "id": "field_b4",
          "label": "what time / station opened?",
          "cue_prompt": "what time / station opened?",
          "cue_word": "what time",
          "is_missing": false,
          "value": "At 9:15 AM",
          "nova_question": "What time did Ruby's math station open?",
          "acceptable_answers": [
            "At 9:15 AM",
            "At 9:15",
            "It opened at 9:15 AM.",
            "9:15 AM"
          ]
        },
        {
          "id": "field_b5",
          "label": "who / won the top prize?",
          "cue_prompt": "who / won the top prize?",
          "cue_word": "who",
          "is_missing": false,
          "value": "A student named Leo",
          "nova_question": "Who won the top prize at her puzzle station?",
          "acceptable_answers": [
            "A student named Leo",
            "Leo",
            "Leo won the top prize.",
            "Student Leo"
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
