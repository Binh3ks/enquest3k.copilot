/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 58 | Theme: "Problem and Solution: Sharing Resources" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 58,
  "theme": "Problem and Solution: Sharing Resources",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "State your opinion on why students should share classroom supplies. Propose a fair system for dividing resources.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Librarian A",
      "cues": [
        "Resource being shared",
        "Total items received",
        "Number of recipient groups",
        "Quotient per group",
        "Opinion on fair sharing"
      ]
    },
    "card_b": {
      "role": "Librarian B",
      "cues": [
        "Resource being shared",
        "Total items received",
        "Number of recipient groups",
        "Quotient per group",
        "Opinion on fair sharing"
      ]
    },
    "table_a": {
      "title": "Librarian A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Librarian A",
      "fields": [
        {
          "id": "f1",
          "label": "Resource being shared",
          "cue_prompt": "what / resource being shared?",
          "cue_word": "resource",
          "is_missing": true,
          "acceptable_questions": [
            "What is the resource being shared?",
            "Can you tell me the resource being shared?"
          ],
          "nova_reply": "The resource being shared is recorded for Problem and Solution: Sharing Resources."
        },
        {
          "id": "f2",
          "label": "Total items received",
          "cue_prompt": "what / total items received?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total items received?",
            "Can you tell me the total items received?"
          ],
          "nova_reply": "The total items received is recorded for Problem and Solution: Sharing Resources."
        },
        {
          "id": "f3",
          "label": "Number of recipient groups",
          "cue_prompt": "what / number of recipient groups?",
          "cue_word": "number",
          "is_missing": false,
          "card_value": "Number of recipient groups verified",
          "value": "Number of recipient groups verified",
          "examiner_question": "What is the number of recipient groups?",
          "acceptable_answers": [
            "It is number of recipient groups.",
            "Number of recipient groups."
          ]
        },
        {
          "id": "f4",
          "label": "Quotient per group",
          "cue_prompt": "what / quotient per group?",
          "cue_word": "quotient",
          "is_missing": false,
          "card_value": "Quotient per group verified",
          "value": "Quotient per group verified",
          "examiner_question": "What is the quotient per group?",
          "acceptable_answers": [
            "It is quotient per group.",
            "Quotient per group."
          ]
        },
        {
          "id": "f5",
          "label": "Opinion on fair sharing",
          "cue_prompt": "what / opinion on fair sharing?",
          "cue_word": "opinion",
          "is_missing": false,
          "card_value": "Opinion on fair sharing verified",
          "value": "Opinion on fair sharing verified",
          "examiner_question": "What is the opinion on fair sharing?",
          "acceptable_answers": [
            "It is opinion on fair sharing.",
            "Opinion on fair sharing."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Librarian B's Info Card",
      "subtitle": "Partner Card",
      "person": "Librarian B",
      "fields": [
        {
          "id": "fb1",
          "label": "Resource being shared",
          "cue_prompt": "what / resource being shared?",
          "cue_word": "resource",
          "is_missing": false,
          "card_value": "Resource being shared on file",
          "value": "Resource being shared on file",
          "examiner_question": "What is the resource being shared?",
          "acceptable_answers": [
            "It is resource being shared.",
            "Resource being shared."
          ]
        },
        {
          "id": "fb2",
          "label": "Total items received",
          "cue_prompt": "what / total items received?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total items received on file",
          "value": "Total items received on file",
          "examiner_question": "What is the total items received?",
          "acceptable_answers": [
            "It is total items received.",
            "Total items received."
          ]
        },
        {
          "id": "fb3",
          "label": "Number of recipient groups",
          "cue_prompt": "what / number of recipient groups?",
          "cue_word": "number",
          "is_missing": true,
          "acceptable_questions": [
            "What is the number of recipient groups?",
            "Can you tell me the number of recipient groups?"
          ],
          "nova_reply": "The number of recipient groups is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Quotient per group",
          "cue_prompt": "what / quotient per group?",
          "cue_word": "quotient",
          "is_missing": true,
          "acceptable_questions": [
            "What is the quotient per group?",
            "Can you tell me the quotient per group?"
          ],
          "nova_reply": "The quotient per group is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Opinion on fair sharing",
          "cue_prompt": "what / opinion on fair sharing?",
          "cue_word": "opinion",
          "is_missing": true,
          "acceptable_questions": [
            "What is the opinion on fair sharing?",
            "Can you tell me the opinion on fair sharing?"
          ],
          "nova_reply": "The opinion on fair sharing is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
