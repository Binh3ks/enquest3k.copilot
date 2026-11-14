/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 55 | Theme: "Cause and Effect: The Chain Reaction" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 55,
  "theme": "Cause and Effect: The Chain Reaction",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Explain a simple cause-and-effect event that happened at school or home. Use words like because, so, and therefore.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Science Student A",
      "cues": [
        "Experiment name",
        "Number of dominoes",
        "Main cause of fall",
        "Time taken",
        "Total fallen blocks"
      ]
    },
    "card_b": {
      "role": "Science Student B",
      "cues": [
        "Experiment name",
        "Number of dominoes",
        "Main cause of fall",
        "Time taken",
        "Total fallen blocks"
      ]
    },
    "table_a": {
      "title": "Science Student A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Science Student A",
      "fields": [
        {
          "id": "f1",
          "label": "Experiment name",
          "cue_prompt": "what / experiment name?",
          "cue_word": "experiment",
          "is_missing": true,
          "acceptable_questions": [
            "What is the experiment name?",
            "Can you tell me the experiment name?"
          ],
          "nova_reply": "The experiment name is recorded for Cause and Effect: The Chain Reaction."
        },
        {
          "id": "f2",
          "label": "Number of dominoes",
          "cue_prompt": "what / number of dominoes?",
          "cue_word": "number",
          "is_missing": true,
          "acceptable_questions": [
            "What is the number of dominoes?",
            "Can you tell me the number of dominoes?"
          ],
          "nova_reply": "The number of dominoes is recorded for Cause and Effect: The Chain Reaction."
        },
        {
          "id": "f3",
          "label": "Main cause of fall",
          "cue_prompt": "what / main cause of fall?",
          "cue_word": "main",
          "is_missing": false,
          "card_value": "Main cause of fall verified",
          "value": "Main cause of fall verified",
          "examiner_question": "What is the main cause of fall?",
          "acceptable_answers": [
            "It is main cause of fall.",
            "Main cause of fall."
          ]
        },
        {
          "id": "f4",
          "label": "Time taken",
          "cue_prompt": "what / time taken?",
          "cue_word": "time",
          "is_missing": false,
          "card_value": "Time taken verified",
          "value": "Time taken verified",
          "examiner_question": "What is the time taken?",
          "acceptable_answers": [
            "It is time taken.",
            "Time taken."
          ]
        },
        {
          "id": "f5",
          "label": "Total fallen blocks",
          "cue_prompt": "what / total fallen blocks?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total fallen blocks verified",
          "value": "Total fallen blocks verified",
          "examiner_question": "What is the total fallen blocks?",
          "acceptable_answers": [
            "It is total fallen blocks.",
            "Total fallen blocks."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Science Student B's Info Card",
      "subtitle": "Partner Card",
      "person": "Science Student B",
      "fields": [
        {
          "id": "fb1",
          "label": "Experiment name",
          "cue_prompt": "what / experiment name?",
          "cue_word": "experiment",
          "is_missing": false,
          "card_value": "Experiment name on file",
          "value": "Experiment name on file",
          "examiner_question": "What is the experiment name?",
          "acceptable_answers": [
            "It is experiment name.",
            "Experiment name."
          ]
        },
        {
          "id": "fb2",
          "label": "Number of dominoes",
          "cue_prompt": "what / number of dominoes?",
          "cue_word": "number",
          "is_missing": false,
          "card_value": "Number of dominoes on file",
          "value": "Number of dominoes on file",
          "examiner_question": "What is the number of dominoes?",
          "acceptable_answers": [
            "It is number of dominoes.",
            "Number of dominoes."
          ]
        },
        {
          "id": "fb3",
          "label": "Main cause of fall",
          "cue_prompt": "what / main cause of fall?",
          "cue_word": "main",
          "is_missing": true,
          "acceptable_questions": [
            "What is the main cause of fall?",
            "Can you tell me the main cause of fall?"
          ],
          "nova_reply": "The main cause of fall is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Time taken",
          "cue_prompt": "what / time taken?",
          "cue_word": "time",
          "is_missing": true,
          "acceptable_questions": [
            "What is the time taken?",
            "Can you tell me the time taken?"
          ],
          "nova_reply": "The time taken is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Total fallen blocks",
          "cue_prompt": "what / total fallen blocks?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total fallen blocks?",
            "Can you tell me the total fallen blocks?"
          ],
          "nova_reply": "The total fallen blocks is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
