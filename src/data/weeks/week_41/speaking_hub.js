/**
 * STAGED DELIVERABLE: Speaking Hub & Talkshow/Info Exchange Cards
 * Week: 41 | Theme: "Life Cycles (Process)" | CEFR: A2 Flyers
 * Generated: 2026-11-07T10:57:56.163Z
 * Pipeline: scripts/generate_giaidoan2_content.mjs (Round 61 Phase 1 Pilot Fixed)
 * Provenance: Grounded in blueprint.json + Source B Syllabus
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 41,
  "theme": "Life Cycles (Process)",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": {
    "topic": "The Life Cycle of a Butterfly",
    "question": "Hi Oliver! Can you explain how a tiny caterpillar changes into a flying butterfly?",
    "model_response": "Yes! First, a mother butterfly lays an egg on a green leaf. When the egg hatches, a hungry caterpillar crawls out and eats leaves to grow big. Next, it builds a protective chrysalis around itself. Inside, its body changes completely. Finally, a colorful butterfly emerges and spreads its wings to fly!"
  },
  "info_exchange_cards": {
    "table_a": {
      "title": "Oliver's Butterfly Life Cycle Study",
      "subtitle": "Candidate's Question Card (Ask Examiner)",
      "person": "Oliver",
      "fields": [
        {
          "id": "field_a1",
          "cue_prompt": "where / butterfly lay egg?",
          "cue_word": "where",
          "is_missing": true,
          "acceptable_questions": [
            "Where does the mother butterfly lay her egg?",
            "Where does the butterfly lay an egg?",
            "Where is the egg laid?"
          ],
          "nova_reply": "The butterfly lays a tiny round egg on the underside of a green leaf."
        },
        {
          "id": "field_a2",
          "cue_prompt": "what / caterpillar eat?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What does the caterpillar eat?",
            "What food does the caterpillar eat?",
            "What does it eat after hatching?"
          ],
          "nova_reply": "It eats fresh green plant leaves day and night to grow."
        },
        {
          "id": "field_a3",
          "cue_prompt": "how long / inside chrysalis?",
          "cue_word": "how",
          "is_missing": true,
          "acceptable_questions": [
            "How long does it stay inside the chrysalis?",
            "How many days does it spend in the chrysalis?",
            "How long does it take inside the chrysalis?"
          ],
          "nova_reply": "It stays inside the protective chrysalis for about ten to fourteen days."
        },
        {
          "id": "field_a4",
          "cue_prompt": "what color / newly emerged wings?",
          "cue_word": "what",
          "is_missing": true,
          "acceptable_questions": [
            "What color are the butterfly's wings?",
            "What color are its new wings?",
            "What pattern does it have on its wings?"
          ],
          "nova_reply": "It has bright orange wings with striking black lines and white spots."
        },
        {
          "id": "field_a5",
          "cue_prompt": "why / dry wings before flying?",
          "cue_word": "why",
          "is_missing": true,
          "acceptable_questions": [
            "Why must it dry its wings before flying?",
            "Why does it dry its wings?",
            "Why can't it fly immediately?"
          ],
          "nova_reply": "Its wings are wet and soft, so it must pump fluid into them to dry and harden."
        }
      ]
    },
    "table_b": {
      "title": "Sophia's Pond Frog Life Cycle Study",
      "subtitle": "Information Card (Answer Examiner's Questions)",
      "person": "Sophia",
      "fields": [
        {
          "id": "field_b1",
          "cue_prompt": "where / mother frog lay eggs?",
          "cue_word": "where",
          "value": "In shallow calm water among floating pond plants.",
          "nova_question": "Where does the mother frog lay her jelly-like eggs?",
          "acceptable_answers": [
            "In shallow calm water among floating pond plants.",
            "In shallow calm water.",
            "In the pond water."
          ]
        },
        {
          "id": "field_b2",
          "cue_prompt": "what / hatch from frog egg?",
          "cue_word": "what",
          "value": "A tiny swimming tadpole with gills and a long tail.",
          "nova_question": "What creature hatches out of the frog egg?",
          "acceptable_answers": [
            "A tiny swimming tadpole with gills and a long tail.",
            "A tiny swimming tadpole.",
            "A tadpole."
          ]
        },
        {
          "id": "field_b3",
          "cue_prompt": "how / tadpole breathe underwater?",
          "cue_word": "how",
          "value": "Through delicate gills that absorb air from water.",
          "nova_question": "How does the young tadpole breathe underwater?",
          "acceptable_answers": [
            "Through delicate gills that absorb air from water.",
            "Through delicate gills.",
            "With its gills."
          ]
        },
        {
          "id": "field_b4",
          "cue_prompt": "what legs / grow first?",
          "cue_word": "what",
          "value": "Two strong hind legs appear first near its tail.",
          "nova_question": "Which legs appear first as the tadpole develops?",
          "acceptable_answers": [
            "Two strong hind legs appear first near its tail.",
            "Two strong hind legs.",
            "Its hind legs."
          ]
        },
        {
          "id": "field_b5",
          "cue_prompt": "how / adult frog move on land?",
          "cue_word": "how",
          "value": "It leaps powerfully using its long muscular legs.",
          "nova_question": "How does the adult frog move when it leaves the pond?",
          "acceptable_answers": [
            "It leaps powerfully using its long muscular legs.",
            "It leaps powerfully.",
            "By jumping and leaping."
          ]
        }
      ]
    }
  }
};
export default speakingHubData;
