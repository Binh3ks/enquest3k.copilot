/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 37 | Theme: "Living vs. Non-Living (Reasoning)" | CEFR: A2 Flyers
 * Generated: 2026-11-09T13:11:07.328Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 37,
  "theme": "Living vs. Non-Living (Reasoning)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "Living Things vs Non-Living Objects",
    "question": "Hello Mia! Can you explain why a garden caterpillar is living, but a plastic toy car is not?",
    "model_response": "Hello! A garden caterpillar is living because it breathes air, feeds on green leaves, and grows bigger every day. When it grows up, it turns into a butterfly and reproduces. In contrast, a plastic toy car never breathes, does not need water, and stays the exact same size forever. That is why the car is a non-living object!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Mia's Garden Butterfly Project",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Mia",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / butterfly live?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does the garden butterfly live?",
            "Where does the butterfly live?",
            "Where is its home?"
          ],
          "nova_reply": "The butterfly lives among colorful flowering bushes in our sunny school garden."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / eat for food?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What does the butterfly eat for food?",
            "What food does it eat?",
            "What does it drink?"
          ],
          "nova_reply": "It sips sweet flower nectar with its long curled straw-like tongue."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how / breathe air?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How does the butterfly breathe air?",
            "How does it breathe?",
            "How does air enter its body?"
          ],
          "nova_reply": "It breathes fresh air through tiny openings called spiracles along its body."
        },
        {
          "id": "field_a4",
          "cue_prompt": "why / need warm sunshine?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why does it need warm sunshine?",
            "Why does the butterfly like the sun?",
            "Why does it need warmth?"
          ],
          "nova_reply": "Warm sunshine gives energy to its wing muscles so it can fly easily."
        },
        {
          "id": "field_a5",
          "cue_prompt": "when / lay tiny eggs?",
          "cue_word": "when",
          "is_missing": true,
          "acceptable_questions": [
            "When does it lay tiny eggs?",
            "When does the butterfly reproduce?",
            "When are eggs laid?"
          ],
          "nova_reply": "It lays tiny round eggs on green leaves during warm spring afternoons."
        }
      ]
    },
    "table_b": {
      "title": "Oliver's Granite Rock Project",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Oliver",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / rock found?",
          "cue_word": "where",
          "value": "Oliver found this heavy gray rock near the garden fish pond.",
          "nova_question": "Where did Oliver discover this heavy gray rock?",
          "acceptable_answers": [
            "Oliver found this heavy gray rock near the garden fish pond.",
            "Near the garden fish pond.",
            "By the fish pond."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / made of?",
          "cue_word": "what",
          "value": "It is composed of hard natural minerals pressed together deep in Earth.",
          "nova_question": "What natural materials is the rock made of?",
          "acceptable_answers": [
            "It is composed of hard natural minerals pressed together deep in Earth.",
            "Hard natural minerals.",
            "Natural minerals from the Earth."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "why / not grow bigger?",
          "cue_word": "why",
          "value": "Because it is non-living and does not absorb food or energy.",
          "nova_question": "Why does the gray rock never grow larger?",
          "acceptable_answers": [
            "Because it is non-living and does not absorb food or energy.",
            "It is non-living and does not absorb food.",
            "Because rocks are non-living."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "how old / stone?",
          "cue_word": "how old",
          "value": "Scientists estimate this natural river pebble is over two thousand years old.",
          "nova_question": "How old is Oliver's smooth garden pebble?",
          "acceptable_answers": [
            "Scientists estimate this natural river pebble is over two thousand years old.",
            "Over two thousand years old.",
            "More than two thousand years old."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "why / non-living object?",
          "cue_word": "why",
          "value": "It cannot breathe, cannot reproduce, and never moves by itself.",
          "nova_question": "Why does Oliver classify this pebble as a non-living object?",
          "acceptable_answers": [
            "It cannot breathe, cannot reproduce, and never moves by itself.",
            "Because it cannot breathe or move by itself.",
            "It does not breathe or reproduce."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
