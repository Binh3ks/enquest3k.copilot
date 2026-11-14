/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 68 | Theme: "Developing Strong Reasons: Evidence and Data" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 68,
  "theme": "Developing Strong Reasons: Evidence and Data",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Present an argument advocating for new library books or playground equipment. Cite two strong reasons and quote specific numerical evidence from a chart.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Petitioner A",
      "cues": [
        "Club or equipment proposed",
        "Primary reason given",
        "Specific survey vote count",
        "Calculated vote difference",
        "Combined club total"
      ]
    },
    "card_b": {
      "role": "Petitioner B",
      "cues": [
        "Club or equipment proposed",
        "Primary reason given",
        "Specific survey vote count",
        "Calculated vote difference",
        "Combined club total"
      ]
    },
    "table_a": {
      "title": "Petitioner A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Petitioner A",
      "fields": [
        {
          "id": "f1",
          "label": "Club or equipment proposed",
          "cue_prompt": "what / club or equipment proposed?",
          "cue_word": "club",
          "is_missing": true,
          "acceptable_questions": [
            "What is the club or equipment proposed?",
            "Can you tell me the club or equipment proposed?"
          ],
          "nova_reply": "The club or equipment proposed is recorded for Developing Strong Reasons: Evidence and Data."
        },
        {
          "id": "f2",
          "label": "Primary reason given",
          "cue_prompt": "what / primary reason given?",
          "cue_word": "primary",
          "is_missing": true,
          "acceptable_questions": [
            "What is the primary reason given?",
            "Can you tell me the primary reason given?"
          ],
          "nova_reply": "The primary reason given is recorded for Developing Strong Reasons: Evidence and Data."
        },
        {
          "id": "f3",
          "label": "Specific survey vote count",
          "cue_prompt": "what / specific survey vote count?",
          "cue_word": "specific",
          "is_missing": false,
          "card_value": "Specific survey vote count verified",
          "value": "Specific survey vote count verified",
          "examiner_question": "What is the specific survey vote count?",
          "acceptable_answers": [
            "It is specific survey vote count.",
            "Specific survey vote count."
          ]
        },
        {
          "id": "f4",
          "label": "Calculated vote difference",
          "cue_prompt": "what / calculated vote difference?",
          "cue_word": "calculated",
          "is_missing": false,
          "card_value": "Calculated vote difference verified",
          "value": "Calculated vote difference verified",
          "examiner_question": "What is the calculated vote difference?",
          "acceptable_answers": [
            "It is calculated vote difference.",
            "Calculated vote difference."
          ]
        },
        {
          "id": "f5",
          "label": "Combined club total",
          "cue_prompt": "what / combined club total?",
          "cue_word": "combined",
          "is_missing": false,
          "card_value": "Combined club total verified",
          "value": "Combined club total verified",
          "examiner_question": "What is the combined club total?",
          "acceptable_answers": [
            "It is combined club total.",
            "Combined club total."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Petitioner B's Info Card",
      "subtitle": "Partner Card",
      "person": "Petitioner B",
      "fields": [
        {
          "id": "fb1",
          "label": "Club or equipment proposed",
          "cue_prompt": "what / club or equipment proposed?",
          "cue_word": "club",
          "is_missing": false,
          "card_value": "Club or equipment proposed on file",
          "value": "Club or equipment proposed on file",
          "examiner_question": "What is the club or equipment proposed?",
          "acceptable_answers": [
            "It is club or equipment proposed.",
            "Club or equipment proposed."
          ]
        },
        {
          "id": "fb2",
          "label": "Primary reason given",
          "cue_prompt": "what / primary reason given?",
          "cue_word": "primary",
          "is_missing": false,
          "card_value": "Primary reason given on file",
          "value": "Primary reason given on file",
          "examiner_question": "What is the primary reason given?",
          "acceptable_answers": [
            "It is primary reason given.",
            "Primary reason given."
          ]
        },
        {
          "id": "fb3",
          "label": "Specific survey vote count",
          "cue_prompt": "what / specific survey vote count?",
          "cue_word": "specific",
          "is_missing": true,
          "acceptable_questions": [
            "What is the specific survey vote count?",
            "Can you tell me the specific survey vote count?"
          ],
          "nova_reply": "The specific survey vote count is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Calculated vote difference",
          "cue_prompt": "what / calculated vote difference?",
          "cue_word": "calculated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the calculated vote difference?",
            "Can you tell me the calculated vote difference?"
          ],
          "nova_reply": "The calculated vote difference is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Combined club total",
          "cue_prompt": "what / combined club total?",
          "cue_word": "combined",
          "is_missing": true,
          "acceptable_questions": [
            "What is the combined club total?",
            "Can you tell me the combined club total?"
          ],
          "nova_reply": "The combined club total is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
