/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 66 | Theme: "Micro-Debate: Digital Emails vs Handwritten Letters" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 66,
  "theme": "Micro-Debate: Digital Emails vs Handwritten Letters",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute persuasive debate opening speech supporting either digital emails or handwritten letters. State your primary argument with a supporting comparison.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Debater A (Email)",
      "cues": [
        "Medium supported",
        "Primary speed benefit",
        "Survey message count",
        "Calculated difference",
        "Contrasting argument acknowledged"
      ]
    },
    "card_b": {
      "role": "Debater B (Letters)",
      "cues": [
        "Medium supported",
        "Primary emotional benefit",
        "Survey message count",
        "Calculated difference",
        "Contrasting argument acknowledged"
      ]
    },
    "table_a": {
      "title": "Debater A (Email)'s Info Card",
      "subtitle": "Candidate Card",
      "person": "Debater A (Email)",
      "fields": [
        {
          "id": "f1",
          "label": "Medium supported",
          "cue_prompt": "what / medium supported?",
          "cue_word": "medium",
          "is_missing": true,
          "acceptable_questions": [
            "What is the medium supported?",
            "Can you tell me the medium supported?"
          ],
          "nova_reply": "The medium supported is recorded for Micro-Debate: Digital Emails vs Handwritten Letters."
        },
        {
          "id": "f2",
          "label": "Primary speed benefit",
          "cue_prompt": "what / primary speed benefit?",
          "cue_word": "primary",
          "is_missing": true,
          "acceptable_questions": [
            "What is the primary speed benefit?",
            "Can you tell me the primary speed benefit?"
          ],
          "nova_reply": "The primary speed benefit is recorded for Micro-Debate: Digital Emails vs Handwritten Letters."
        },
        {
          "id": "f3",
          "label": "Survey message count",
          "cue_prompt": "what / survey message count?",
          "cue_word": "survey",
          "is_missing": false,
          "card_value": "Survey message count verified",
          "value": "Survey message count verified",
          "examiner_question": "What is the survey message count?",
          "acceptable_answers": [
            "It is survey message count.",
            "Survey message count."
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
          "label": "Contrasting argument acknowledged",
          "cue_prompt": "what / contrasting argument acknowledged?",
          "cue_word": "contrasting",
          "is_missing": false,
          "card_value": "Contrasting argument acknowledged verified",
          "value": "Contrasting argument acknowledged verified",
          "examiner_question": "What is the contrasting argument acknowledged?",
          "acceptable_answers": [
            "It is contrasting argument acknowledged.",
            "Contrasting argument acknowledged."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Debater B (Letters)'s Info Card",
      "subtitle": "Partner Card",
      "person": "Debater B (Letters)",
      "fields": [
        {
          "id": "fb1",
          "label": "Medium supported",
          "cue_prompt": "what / medium supported?",
          "cue_word": "medium",
          "is_missing": false,
          "card_value": "Medium supported on file",
          "value": "Medium supported on file",
          "examiner_question": "What is the medium supported?",
          "acceptable_answers": [
            "It is medium supported.",
            "Medium supported."
          ]
        },
        {
          "id": "fb2",
          "label": "Primary emotional benefit",
          "cue_prompt": "what / primary emotional benefit?",
          "cue_word": "primary",
          "is_missing": false,
          "card_value": "Primary emotional benefit on file",
          "value": "Primary emotional benefit on file",
          "examiner_question": "What is the primary emotional benefit?",
          "acceptable_answers": [
            "It is primary emotional benefit.",
            "Primary emotional benefit."
          ]
        },
        {
          "id": "fb3",
          "label": "Survey message count",
          "cue_prompt": "what / survey message count?",
          "cue_word": "survey",
          "is_missing": true,
          "acceptable_questions": [
            "What is the survey message count?",
            "Can you tell me the survey message count?"
          ],
          "nova_reply": "The survey message count is confirmed in our notes."
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
          "label": "Contrasting argument acknowledged",
          "cue_prompt": "what / contrasting argument acknowledged?",
          "cue_word": "contrasting",
          "is_missing": true,
          "acceptable_questions": [
            "What is the contrasting argument acknowledged?",
            "Can you tell me the contrasting argument acknowledged?"
          ],
          "nova_reply": "The contrasting argument acknowledged is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
