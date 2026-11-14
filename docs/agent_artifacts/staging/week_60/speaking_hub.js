/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 60 | Theme: "The Mayor's Request: Civic Action" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 60,
  "theme": "The Mayor's Request: Civic Action",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute formal speech to the town council proposing a community improvement project. State the problem, your budget estimate, and why it matters.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Council Petitioner A",
      "cues": [
        "Town leader addressed",
        "Civic request topic",
        "Math cost formula",
        "Calculated total cost",
        "Formal closing used"
      ]
    },
    "card_b": {
      "role": "Council Petitioner B",
      "cues": [
        "Town leader addressed",
        "Civic request topic",
        "Math cost formula",
        "Calculated total cost",
        "Formal closing used"
      ]
    },
    "table_a": {
      "title": "Council Petitioner A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Council Petitioner A",
      "fields": [
        {
          "id": "f1",
          "label": "Town leader addressed",
          "cue_prompt": "what / town leader addressed?",
          "cue_word": "town",
          "is_missing": true,
          "acceptable_questions": [
            "What is the town leader addressed?",
            "Can you tell me the town leader addressed?"
          ],
          "nova_reply": "The town leader addressed is recorded for The Mayor's Request: Civic Action."
        },
        {
          "id": "f2",
          "label": "Civic request topic",
          "cue_prompt": "what / civic request topic?",
          "cue_word": "civic",
          "is_missing": true,
          "acceptable_questions": [
            "What is the civic request topic?",
            "Can you tell me the civic request topic?"
          ],
          "nova_reply": "The civic request topic is recorded for The Mayor's Request: Civic Action."
        },
        {
          "id": "f3",
          "label": "Math cost formula",
          "cue_prompt": "what / math cost formula?",
          "cue_word": "math",
          "is_missing": false,
          "card_value": "Math cost formula verified",
          "value": "Math cost formula verified",
          "examiner_question": "What is the math cost formula?",
          "acceptable_answers": [
            "It is math cost formula.",
            "Math cost formula."
          ]
        },
        {
          "id": "f4",
          "label": "Calculated total cost",
          "cue_prompt": "what / calculated total cost?",
          "cue_word": "calculated",
          "is_missing": false,
          "card_value": "Calculated total cost verified",
          "value": "Calculated total cost verified",
          "examiner_question": "What is the calculated total cost?",
          "acceptable_answers": [
            "It is calculated total cost.",
            "Calculated total cost."
          ]
        },
        {
          "id": "f5",
          "label": "Formal closing used",
          "cue_prompt": "what / formal closing used?",
          "cue_word": "formal",
          "is_missing": false,
          "card_value": "Formal closing used verified",
          "value": "Formal closing used verified",
          "examiner_question": "What is the formal closing used?",
          "acceptable_answers": [
            "It is formal closing used.",
            "Formal closing used."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Council Petitioner B's Info Card",
      "subtitle": "Partner Card",
      "person": "Council Petitioner B",
      "fields": [
        {
          "id": "fb1",
          "label": "Town leader addressed",
          "cue_prompt": "what / town leader addressed?",
          "cue_word": "town",
          "is_missing": false,
          "card_value": "Town leader addressed on file",
          "value": "Town leader addressed on file",
          "examiner_question": "What is the town leader addressed?",
          "acceptable_answers": [
            "It is town leader addressed.",
            "Town leader addressed."
          ]
        },
        {
          "id": "fb2",
          "label": "Civic request topic",
          "cue_prompt": "what / civic request topic?",
          "cue_word": "civic",
          "is_missing": false,
          "card_value": "Civic request topic on file",
          "value": "Civic request topic on file",
          "examiner_question": "What is the civic request topic?",
          "acceptable_answers": [
            "It is civic request topic.",
            "Civic request topic."
          ]
        },
        {
          "id": "fb3",
          "label": "Math cost formula",
          "cue_prompt": "what / math cost formula?",
          "cue_word": "math",
          "is_missing": true,
          "acceptable_questions": [
            "What is the math cost formula?",
            "Can you tell me the math cost formula?"
          ],
          "nova_reply": "The math cost formula is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Calculated total cost",
          "cue_prompt": "what / calculated total cost?",
          "cue_word": "calculated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the calculated total cost?",
            "Can you tell me the calculated total cost?"
          ],
          "nova_reply": "The calculated total cost is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Formal closing used",
          "cue_prompt": "what / formal closing used?",
          "cue_word": "formal",
          "is_missing": true,
          "acceptable_questions": [
            "What is the formal closing used?",
            "Can you tell me the formal closing used?"
          ],
          "nova_reply": "The formal closing used is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
