/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 56 | Theme: "Cause and Effect: The Community Garden" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 56,
  "theme": "Cause and Effect: The Community Garden",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Describe a time when you solved a problem with plants or pets. Explain the cause of the problem, the action you took, and the result.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Gardener A",
      "cues": [
        "Garden location",
        "Total seedlings planted",
        "Main problem faced",
        "Watering method used",
        "Seedlings saved"
      ]
    },
    "card_b": {
      "role": "Gardener B",
      "cues": [
        "Garden location",
        "Total seedlings planted",
        "Main problem faced",
        "Watering method used",
        "Seedlings saved"
      ]
    },
    "table_a": {
      "title": "Gardener A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Gardener A",
      "fields": [
        {
          "id": "f1",
          "label": "Garden location",
          "cue_prompt": "what / garden location?",
          "cue_word": "garden",
          "is_missing": true,
          "acceptable_questions": [
            "What is the garden location?",
            "Can you tell me the garden location?"
          ],
          "nova_reply": "The garden location is recorded for Cause and Effect: The Community Garden."
        },
        {
          "id": "f2",
          "label": "Total seedlings planted",
          "cue_prompt": "what / total seedlings planted?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total seedlings planted?",
            "Can you tell me the total seedlings planted?"
          ],
          "nova_reply": "The total seedlings planted is recorded for Cause and Effect: The Community Garden."
        },
        {
          "id": "f3",
          "label": "Main problem faced",
          "cue_prompt": "what / main problem faced?",
          "cue_word": "main",
          "is_missing": false,
          "card_value": "Main problem faced verified",
          "value": "Main problem faced verified",
          "examiner_question": "What is the main problem faced?",
          "acceptable_answers": [
            "It is main problem faced.",
            "Main problem faced."
          ]
        },
        {
          "id": "f4",
          "label": "Watering method used",
          "cue_prompt": "what / watering method used?",
          "cue_word": "watering",
          "is_missing": false,
          "card_value": "Watering method used verified",
          "value": "Watering method used verified",
          "examiner_question": "What is the watering method used?",
          "acceptable_answers": [
            "It is watering method used.",
            "Watering method used."
          ]
        },
        {
          "id": "f5",
          "label": "Seedlings saved",
          "cue_prompt": "what / seedlings saved?",
          "cue_word": "seedlings",
          "is_missing": false,
          "card_value": "Seedlings saved verified",
          "value": "Seedlings saved verified",
          "examiner_question": "What is the seedlings saved?",
          "acceptable_answers": [
            "It is seedlings saved.",
            "Seedlings saved."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Gardener B's Info Card",
      "subtitle": "Partner Card",
      "person": "Gardener B",
      "fields": [
        {
          "id": "fb1",
          "label": "Garden location",
          "cue_prompt": "what / garden location?",
          "cue_word": "garden",
          "is_missing": false,
          "card_value": "Garden location on file",
          "value": "Garden location on file",
          "examiner_question": "What is the garden location?",
          "acceptable_answers": [
            "It is garden location.",
            "Garden location."
          ]
        },
        {
          "id": "fb2",
          "label": "Total seedlings planted",
          "cue_prompt": "what / total seedlings planted?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total seedlings planted on file",
          "value": "Total seedlings planted on file",
          "examiner_question": "What is the total seedlings planted?",
          "acceptable_answers": [
            "It is total seedlings planted.",
            "Total seedlings planted."
          ]
        },
        {
          "id": "fb3",
          "label": "Main problem faced",
          "cue_prompt": "what / main problem faced?",
          "cue_word": "main",
          "is_missing": true,
          "acceptable_questions": [
            "What is the main problem faced?",
            "Can you tell me the main problem faced?"
          ],
          "nova_reply": "The main problem faced is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Watering method used",
          "cue_prompt": "what / watering method used?",
          "cue_word": "watering",
          "is_missing": true,
          "acceptable_questions": [
            "What is the watering method used?",
            "Can you tell me the watering method used?"
          ],
          "nova_reply": "The watering method used is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Seedlings saved",
          "cue_prompt": "what / seedlings saved?",
          "cue_word": "seedlings",
          "is_missing": true,
          "acceptable_questions": [
            "What is the seedlings saved?",
            "Can you tell me the seedlings saved?"
          ],
          "nova_reply": "The seedlings saved is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
