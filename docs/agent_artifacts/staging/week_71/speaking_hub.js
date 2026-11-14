/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 71 | Theme: "The Solar System: Planetary Wonders" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 71,
  "theme": "The Solar System: Planetary Wonders",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Describe your favorite planet in the solar system. Use superlatives like 'largest', 'coldest', or 'hottest' and mention its distance from the Sun.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Astronomer A",
      "cues": [
        "Planet investigated",
        "Superlative attribute",
        "Orbital distance (4 digits)",
        "Calculated difference",
        "Atmosphere description"
      ]
    },
    "card_b": {
      "role": "Astronomer B",
      "cues": [
        "Planet investigated",
        "Superlative attribute",
        "Orbital distance (4 digits)",
        "Calculated difference",
        "Atmosphere description"
      ]
    },
    "table_a": {
      "title": "Astronomer A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Astronomer A",
      "fields": [
        {
          "id": "f1",
          "label": "Planet investigated",
          "cue_prompt": "what / planet investigated?",
          "cue_word": "planet",
          "is_missing": true,
          "acceptable_questions": [
            "What is the planet investigated?",
            "Can you tell me the planet investigated?"
          ],
          "nova_reply": "The planet investigated is recorded for The Solar System: Planetary Wonders."
        },
        {
          "id": "f2",
          "label": "Superlative attribute",
          "cue_prompt": "what / superlative attribute?",
          "cue_word": "superlative",
          "is_missing": true,
          "acceptable_questions": [
            "What is the superlative attribute?",
            "Can you tell me the superlative attribute?"
          ],
          "nova_reply": "The superlative attribute is recorded for The Solar System: Planetary Wonders."
        },
        {
          "id": "f3",
          "label": "Orbital distance (4 digits)",
          "cue_prompt": "what / orbital distance (4 digits)?",
          "cue_word": "orbital",
          "is_missing": false,
          "card_value": "Orbital distance (4 digits) verified",
          "value": "Orbital distance (4 digits) verified",
          "examiner_question": "What is the orbital distance (4 digits)?",
          "acceptable_answers": [
            "It is orbital distance (4 digits).",
            "Orbital distance (4 digits)."
          ]
        },
        {
          "id": "f4",
          "label": "Calculated difference",
          "cue_prompt": "what / calculated difference?",
          "cue_word": "calculated",
          "is_missing": false,
          "card_value": "Calculated difference verified",
          "value": "Calculated difference verified",
          "examiner_question": "What is the calculated difference?",
          "acceptable_answers": [
            "It is calculated difference.",
            "Calculated difference."
          ]
        },
        {
          "id": "f5",
          "label": "Atmosphere description",
          "cue_prompt": "what / atmosphere description?",
          "cue_word": "atmosphere",
          "is_missing": false,
          "card_value": "Atmosphere description verified",
          "value": "Atmosphere description verified",
          "examiner_question": "What is the atmosphere description?",
          "acceptable_answers": [
            "It is atmosphere description.",
            "Atmosphere description."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Astronomer B's Info Card",
      "subtitle": "Partner Card",
      "person": "Astronomer B",
      "fields": [
        {
          "id": "fb1",
          "label": "Planet investigated",
          "cue_prompt": "what / planet investigated?",
          "cue_word": "planet",
          "is_missing": false,
          "card_value": "Planet investigated on file",
          "value": "Planet investigated on file",
          "examiner_question": "What is the planet investigated?",
          "acceptable_answers": [
            "It is planet investigated.",
            "Planet investigated."
          ]
        },
        {
          "id": "fb2",
          "label": "Superlative attribute",
          "cue_prompt": "what / superlative attribute?",
          "cue_word": "superlative",
          "is_missing": false,
          "card_value": "Superlative attribute on file",
          "value": "Superlative attribute on file",
          "examiner_question": "What is the superlative attribute?",
          "acceptable_answers": [
            "It is superlative attribute.",
            "Superlative attribute."
          ]
        },
        {
          "id": "fb3",
          "label": "Orbital distance (4 digits)",
          "cue_prompt": "what / orbital distance (4 digits)?",
          "cue_word": "orbital",
          "is_missing": true,
          "acceptable_questions": [
            "What is the orbital distance (4 digits)?",
            "Can you tell me the orbital distance (4 digits)?"
          ],
          "nova_reply": "The orbital distance (4 digits) is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Calculated difference",
          "cue_prompt": "what / calculated difference?",
          "cue_word": "calculated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the calculated difference?",
            "Can you tell me the calculated difference?"
          ],
          "nova_reply": "The calculated difference is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Atmosphere description",
          "cue_prompt": "what / atmosphere description?",
          "cue_word": "atmosphere",
          "is_missing": true,
          "acceptable_questions": [
            "What is the atmosphere description?",
            "Can you tell me the atmosphere description?"
          ],
          "nova_reply": "The atmosphere description is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
