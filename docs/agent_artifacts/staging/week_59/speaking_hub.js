/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 59 | Theme: "Message in a Bottle: Island Mystery" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 59,
  "theme": "Message in a Bottle: Island Mystery",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Imagine you found an ancient message in a bottle. Describe what it said, who wrote it, and what clues were inside.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Beachcomber A",
      "cues": [
        "Bottle color and material",
        "Greeting in the letter",
        "Total shells inside",
        "Divisor and remainder",
        "Informal closing phrase"
      ]
    },
    "card_b": {
      "role": "Beachcomber B",
      "cues": [
        "Bottle color and material",
        "Greeting in the letter",
        "Total shells inside",
        "Divisor and remainder",
        "Informal closing phrase"
      ]
    },
    "table_a": {
      "title": "Beachcomber A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Beachcomber A",
      "fields": [
        {
          "id": "f1",
          "label": "Bottle color and material",
          "cue_prompt": "what / bottle color and material?",
          "cue_word": "bottle",
          "is_missing": true,
          "acceptable_questions": [
            "What is the bottle color and material?",
            "Can you tell me the bottle color and material?"
          ],
          "nova_reply": "The bottle color and material is recorded for Message in a Bottle: Island Mystery."
        },
        {
          "id": "f2",
          "label": "Greeting in the letter",
          "cue_prompt": "what / greeting in the letter?",
          "cue_word": "greeting",
          "is_missing": true,
          "acceptable_questions": [
            "What is the greeting in the letter?",
            "Can you tell me the greeting in the letter?"
          ],
          "nova_reply": "The greeting in the letter is recorded for Message in a Bottle: Island Mystery."
        },
        {
          "id": "f3",
          "label": "Total shells inside",
          "cue_prompt": "what / total shells inside?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total shells inside verified",
          "value": "Total shells inside verified",
          "examiner_question": "What is the total shells inside?",
          "acceptable_answers": [
            "It is total shells inside.",
            "Total shells inside."
          ]
        },
        {
          "id": "f4",
          "label": "Divisor and remainder",
          "cue_prompt": "what / divisor and remainder?",
          "cue_word": "divisor",
          "is_missing": false,
          "card_value": "Divisor and remainder verified",
          "value": "Divisor and remainder verified",
          "examiner_question": "What is the divisor and remainder?",
          "acceptable_answers": [
            "It is divisor and remainder.",
            "Divisor and remainder."
          ]
        },
        {
          "id": "f5",
          "label": "Informal closing phrase",
          "cue_prompt": "what / informal closing phrase?",
          "cue_word": "informal",
          "is_missing": false,
          "card_value": "Informal closing phrase verified",
          "value": "Informal closing phrase verified",
          "examiner_question": "What is the informal closing phrase?",
          "acceptable_answers": [
            "It is informal closing phrase.",
            "Informal closing phrase."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Beachcomber B's Info Card",
      "subtitle": "Partner Card",
      "person": "Beachcomber B",
      "fields": [
        {
          "id": "fb1",
          "label": "Bottle color and material",
          "cue_prompt": "what / bottle color and material?",
          "cue_word": "bottle",
          "is_missing": false,
          "card_value": "Bottle color and material on file",
          "value": "Bottle color and material on file",
          "examiner_question": "What is the bottle color and material?",
          "acceptable_answers": [
            "It is bottle color and material.",
            "Bottle color and material."
          ]
        },
        {
          "id": "fb2",
          "label": "Greeting in the letter",
          "cue_prompt": "what / greeting in the letter?",
          "cue_word": "greeting",
          "is_missing": false,
          "card_value": "Greeting in the letter on file",
          "value": "Greeting in the letter on file",
          "examiner_question": "What is the greeting in the letter?",
          "acceptable_answers": [
            "It is greeting in the letter.",
            "Greeting in the letter."
          ]
        },
        {
          "id": "fb3",
          "label": "Total shells inside",
          "cue_prompt": "what / total shells inside?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total shells inside?",
            "Can you tell me the total shells inside?"
          ],
          "nova_reply": "The total shells inside is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Divisor and remainder",
          "cue_prompt": "what / divisor and remainder?",
          "cue_word": "divisor",
          "is_missing": true,
          "acceptable_questions": [
            "What is the divisor and remainder?",
            "Can you tell me the divisor and remainder?"
          ],
          "nova_reply": "The divisor and remainder is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Informal closing phrase",
          "cue_prompt": "what / informal closing phrase?",
          "cue_word": "informal",
          "is_missing": true,
          "acceptable_questions": [
            "What is the informal closing phrase?",
            "Can you tell me the informal closing phrase?"
          ],
          "nova_reply": "The informal closing phrase is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
