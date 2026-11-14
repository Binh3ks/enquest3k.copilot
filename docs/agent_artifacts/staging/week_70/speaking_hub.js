/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 70 | Theme: "Presentation: Pitching a Green Idea" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 70,
  "theme": "Presentation: Pitching a Green Idea",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute presentation pitching a green idea (solar panels, tree planting, or zero waste). Use discourse markers: 'First of all', 'Furthermore', and 'To conclude'.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Green Pitcher A",
      "cues": [
        "Green initiative pitched",
        "Opening discourse marker",
        "Total recycled kilograms",
        "Four-bin calculated capacity",
        "Concluding discourse marker"
      ]
    },
    "card_b": {
      "role": "Green Pitcher B",
      "cues": [
        "Green initiative pitched",
        "Opening discourse marker",
        "Total recycled kilograms",
        "Four-bin calculated capacity",
        "Concluding discourse marker"
      ]
    },
    "table_a": {
      "title": "Green Pitcher A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Green Pitcher A",
      "fields": [
        {
          "id": "f1",
          "label": "Green initiative pitched",
          "cue_prompt": "what / green initiative pitched?",
          "cue_word": "green",
          "is_missing": true,
          "acceptable_questions": [
            "What is the green initiative pitched?",
            "Can you tell me the green initiative pitched?"
          ],
          "nova_reply": "The green initiative pitched is recorded for Presentation: Pitching a Green Idea."
        },
        {
          "id": "f2",
          "label": "Opening discourse marker",
          "cue_prompt": "what / opening discourse marker?",
          "cue_word": "opening",
          "is_missing": true,
          "acceptable_questions": [
            "What is the opening discourse marker?",
            "Can you tell me the opening discourse marker?"
          ],
          "nova_reply": "The opening discourse marker is recorded for Presentation: Pitching a Green Idea."
        },
        {
          "id": "f3",
          "label": "Total recycled kilograms",
          "cue_prompt": "what / total recycled kilograms?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total recycled kilograms verified",
          "value": "Total recycled kilograms verified",
          "examiner_question": "What is the total recycled kilograms?",
          "acceptable_answers": [
            "It is total recycled kilograms.",
            "Total recycled kilograms."
          ]
        },
        {
          "id": "f4",
          "label": "Four-bin calculated capacity",
          "cue_prompt": "what / four-bin calculated capacity?",
          "cue_word": "four-bin",
          "is_missing": false,
          "card_value": "Four-bin calculated capacity verified",
          "value": "Four-bin calculated capacity verified",
          "examiner_question": "What is the four-bin calculated capacity?",
          "acceptable_answers": [
            "It is four-bin calculated capacity.",
            "Four-bin calculated capacity."
          ]
        },
        {
          "id": "f5",
          "label": "Concluding discourse marker",
          "cue_prompt": "what / concluding discourse marker?",
          "cue_word": "concluding",
          "is_missing": false,
          "card_value": "Concluding discourse marker verified",
          "value": "Concluding discourse marker verified",
          "examiner_question": "What is the concluding discourse marker?",
          "acceptable_answers": [
            "It is concluding discourse marker.",
            "Concluding discourse marker."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Green Pitcher B's Info Card",
      "subtitle": "Partner Card",
      "person": "Green Pitcher B",
      "fields": [
        {
          "id": "fb1",
          "label": "Green initiative pitched",
          "cue_prompt": "what / green initiative pitched?",
          "cue_word": "green",
          "is_missing": false,
          "card_value": "Green initiative pitched on file",
          "value": "Green initiative pitched on file",
          "examiner_question": "What is the green initiative pitched?",
          "acceptable_answers": [
            "It is green initiative pitched.",
            "Green initiative pitched."
          ]
        },
        {
          "id": "fb2",
          "label": "Opening discourse marker",
          "cue_prompt": "what / opening discourse marker?",
          "cue_word": "opening",
          "is_missing": false,
          "card_value": "Opening discourse marker on file",
          "value": "Opening discourse marker on file",
          "examiner_question": "What is the opening discourse marker?",
          "acceptable_answers": [
            "It is opening discourse marker.",
            "Opening discourse marker."
          ]
        },
        {
          "id": "fb3",
          "label": "Total recycled kilograms",
          "cue_prompt": "what / total recycled kilograms?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total recycled kilograms?",
            "Can you tell me the total recycled kilograms?"
          ],
          "nova_reply": "The total recycled kilograms is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Four-bin calculated capacity",
          "cue_prompt": "what / four-bin calculated capacity?",
          "cue_word": "four-bin",
          "is_missing": true,
          "acceptable_questions": [
            "What is the four-bin calculated capacity?",
            "Can you tell me the four-bin calculated capacity?"
          ],
          "nova_reply": "The four-bin calculated capacity is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Concluding discourse marker",
          "cue_prompt": "what / concluding discourse marker?",
          "cue_word": "concluding",
          "is_missing": true,
          "acceptable_questions": [
            "What is the concluding discourse marker?",
            "Can you tell me the concluding discourse marker?"
          ],
          "nova_reply": "The concluding discourse marker is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
