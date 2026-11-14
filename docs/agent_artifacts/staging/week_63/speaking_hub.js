/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 63 | Theme: "Reading Maps: Navigating the Island" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 63,
  "theme": "Reading Maps: Navigating the Island",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Explain how to give someone directions using compass points and map grid coordinates instead of left and right.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Navigator A",
      "cues": [
        "Starting coordinate",
        "Units moved east",
        "Units moved north",
        "Destination coordinate",
        "Total distance walked"
      ]
    },
    "card_b": {
      "role": "Navigator B",
      "cues": [
        "Starting coordinate",
        "Units moved east",
        "Units moved north",
        "Destination coordinate",
        "Total distance walked"
      ]
    },
    "table_a": {
      "title": "Navigator A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Navigator A",
      "fields": [
        {
          "id": "f1",
          "label": "Starting coordinate",
          "cue_prompt": "what / starting coordinate?",
          "cue_word": "starting",
          "is_missing": true,
          "acceptable_questions": [
            "What is the starting coordinate?",
            "Can you tell me the starting coordinate?"
          ],
          "nova_reply": "The starting coordinate is recorded for Reading Maps: Navigating the Island."
        },
        {
          "id": "f2",
          "label": "Units moved east",
          "cue_prompt": "what / units moved east?",
          "cue_word": "units",
          "is_missing": true,
          "acceptable_questions": [
            "What is the units moved east?",
            "Can you tell me the units moved east?"
          ],
          "nova_reply": "The units moved east is recorded for Reading Maps: Navigating the Island."
        },
        {
          "id": "f3",
          "label": "Units moved north",
          "cue_prompt": "what / units moved north?",
          "cue_word": "units",
          "is_missing": false,
          "card_value": "Units moved north verified",
          "value": "Units moved north verified",
          "examiner_question": "What is the units moved north?",
          "acceptable_answers": [
            "It is units moved north.",
            "Units moved north."
          ]
        },
        {
          "id": "f4",
          "label": "Destination coordinate",
          "cue_prompt": "what / destination coordinate?",
          "cue_word": "destination",
          "is_missing": false,
          "card_value": "Destination coordinate verified",
          "value": "Destination coordinate verified",
          "examiner_question": "What is the destination coordinate?",
          "acceptable_answers": [
            "It is destination coordinate.",
            "Destination coordinate."
          ]
        },
        {
          "id": "f5",
          "label": "Total distance walked",
          "cue_prompt": "what / total distance walked?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total distance walked verified",
          "value": "Total distance walked verified",
          "examiner_question": "What is the total distance walked?",
          "acceptable_answers": [
            "It is total distance walked.",
            "Total distance walked."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Navigator B's Info Card",
      "subtitle": "Partner Card",
      "person": "Navigator B",
      "fields": [
        {
          "id": "fb1",
          "label": "Starting coordinate",
          "cue_prompt": "what / starting coordinate?",
          "cue_word": "starting",
          "is_missing": false,
          "card_value": "Starting coordinate on file",
          "value": "Starting coordinate on file",
          "examiner_question": "What is the starting coordinate?",
          "acceptable_answers": [
            "It is starting coordinate.",
            "Starting coordinate."
          ]
        },
        {
          "id": "fb2",
          "label": "Units moved east",
          "cue_prompt": "what / units moved east?",
          "cue_word": "units",
          "is_missing": false,
          "card_value": "Units moved east on file",
          "value": "Units moved east on file",
          "examiner_question": "What is the units moved east?",
          "acceptable_answers": [
            "It is units moved east.",
            "Units moved east."
          ]
        },
        {
          "id": "fb3",
          "label": "Units moved north",
          "cue_prompt": "what / units moved north?",
          "cue_word": "units",
          "is_missing": true,
          "acceptable_questions": [
            "What is the units moved north?",
            "Can you tell me the units moved north?"
          ],
          "nova_reply": "The units moved north is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Destination coordinate",
          "cue_prompt": "what / destination coordinate?",
          "cue_word": "destination",
          "is_missing": true,
          "acceptable_questions": [
            "What is the destination coordinate?",
            "Can you tell me the destination coordinate?"
          ],
          "nova_reply": "The destination coordinate is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Total distance walked",
          "cue_prompt": "what / total distance walked?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total distance walked?",
            "Can you tell me the total distance walked?"
          ],
          "nova_reply": "The total distance walked is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
