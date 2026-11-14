/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 57 | Theme: "Problem and Solution: Clever Inventions" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 57,
  "theme": "Problem and Solution: Clever Inventions",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Talk about a useful household invention. Explain what problem it solves, how it works, and why it is helpful.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Inventor A",
      "cues": [
        "Invention name",
        "Problem it solves",
        "Number of components",
        "Array arrangement",
        "Target users"
      ]
    },
    "card_b": {
      "role": "Inventor B",
      "cues": [
        "Invention name",
        "Problem it solves",
        "Number of components",
        "Array arrangement",
        "Target users"
      ]
    },
    "table_a": {
      "title": "Inventor A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Inventor A",
      "fields": [
        {
          "id": "f1",
          "label": "Invention name",
          "cue_prompt": "what / invention name?",
          "cue_word": "invention",
          "is_missing": true,
          "acceptable_questions": [
            "What is the invention name?",
            "Can you tell me the invention name?"
          ],
          "nova_reply": "The invention name is recorded for Problem and Solution: Clever Inventions."
        },
        {
          "id": "f2",
          "label": "Problem it solves",
          "cue_prompt": "what / problem it solves?",
          "cue_word": "problem",
          "is_missing": true,
          "acceptable_questions": [
            "What is the problem it solves?",
            "Can you tell me the problem it solves?"
          ],
          "nova_reply": "The problem it solves is recorded for Problem and Solution: Clever Inventions."
        },
        {
          "id": "f3",
          "label": "Number of components",
          "cue_prompt": "what / number of components?",
          "cue_word": "number",
          "is_missing": false,
          "card_value": "Number of components verified",
          "value": "Number of components verified",
          "examiner_question": "What is the number of components?",
          "acceptable_answers": [
            "It is number of components.",
            "Number of components."
          ]
        },
        {
          "id": "f4",
          "label": "Array arrangement",
          "cue_prompt": "what / array arrangement?",
          "cue_word": "array",
          "is_missing": false,
          "card_value": "Array arrangement verified",
          "value": "Array arrangement verified",
          "examiner_question": "What is the array arrangement?",
          "acceptable_answers": [
            "It is array arrangement.",
            "Array arrangement."
          ]
        },
        {
          "id": "f5",
          "label": "Target users",
          "cue_prompt": "what / target users?",
          "cue_word": "target",
          "is_missing": false,
          "card_value": "Target users verified",
          "value": "Target users verified",
          "examiner_question": "What is the target users?",
          "acceptable_answers": [
            "It is target users.",
            "Target users."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Inventor B's Info Card",
      "subtitle": "Partner Card",
      "person": "Inventor B",
      "fields": [
        {
          "id": "fb1",
          "label": "Invention name",
          "cue_prompt": "what / invention name?",
          "cue_word": "invention",
          "is_missing": false,
          "card_value": "Invention name on file",
          "value": "Invention name on file",
          "examiner_question": "What is the invention name?",
          "acceptable_answers": [
            "It is invention name.",
            "Invention name."
          ]
        },
        {
          "id": "fb2",
          "label": "Problem it solves",
          "cue_prompt": "what / problem it solves?",
          "cue_word": "problem",
          "is_missing": false,
          "card_value": "Problem it solves on file",
          "value": "Problem it solves on file",
          "examiner_question": "What is the problem it solves?",
          "acceptable_answers": [
            "It is problem it solves.",
            "Problem it solves."
          ]
        },
        {
          "id": "fb3",
          "label": "Number of components",
          "cue_prompt": "what / number of components?",
          "cue_word": "number",
          "is_missing": true,
          "acceptable_questions": [
            "What is the number of components?",
            "Can you tell me the number of components?"
          ],
          "nova_reply": "The number of components is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Array arrangement",
          "cue_prompt": "what / array arrangement?",
          "cue_word": "array",
          "is_missing": true,
          "acceptable_questions": [
            "What is the array arrangement?",
            "Can you tell me the array arrangement?"
          ],
          "nova_reply": "The array arrangement is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Target users",
          "cue_prompt": "what / target users?",
          "cue_word": "target",
          "is_missing": true,
          "acceptable_questions": [
            "What is the target users?",
            "Can you tell me the target users?"
          ],
          "nova_reply": "The target users is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
