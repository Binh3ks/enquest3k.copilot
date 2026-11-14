/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 65 | Theme: "Cycle 2.1 Review: Logic and Data Mastery" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 65,
  "theme": "Cycle 2.1 Review: Logic and Data Mastery",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute speech reflecting on your favorite learning achievement during this study cycle. Explain the skill, how you practiced it, and why it matters.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Review Leader A",
      "cues": [
        "Cycle topic reviewed",
        "Grammar pattern mastered",
        "Math expression evaluated",
        "Calculated final score",
        "Reflection on progress"
      ]
    },
    "card_b": {
      "role": "Review Leader B",
      "cues": [
        "Cycle topic reviewed",
        "Grammar pattern mastered",
        "Math expression evaluated",
        "Calculated final score",
        "Reflection on progress"
      ]
    },
    "table_a": {
      "title": "Review Leader A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Review Leader A",
      "fields": [
        {
          "id": "f1",
          "label": "Cycle topic reviewed",
          "cue_prompt": "what / cycle topic reviewed?",
          "cue_word": "cycle",
          "is_missing": true,
          "acceptable_questions": [
            "What is the cycle topic reviewed?",
            "Can you tell me the cycle topic reviewed?"
          ],
          "nova_reply": "The cycle topic reviewed is recorded for Cycle 2.1 Review: Logic and Data Mastery."
        },
        {
          "id": "f2",
          "label": "Grammar pattern mastered",
          "cue_prompt": "what / grammar pattern mastered?",
          "cue_word": "grammar",
          "is_missing": true,
          "acceptable_questions": [
            "What is the grammar pattern mastered?",
            "Can you tell me the grammar pattern mastered?"
          ],
          "nova_reply": "The grammar pattern mastered is recorded for Cycle 2.1 Review: Logic and Data Mastery."
        },
        {
          "id": "f3",
          "label": "Math expression evaluated",
          "cue_prompt": "what / math expression evaluated?",
          "cue_word": "math",
          "is_missing": false,
          "card_value": "Math expression evaluated verified",
          "value": "Math expression evaluated verified",
          "examiner_question": "What is the math expression evaluated?",
          "acceptable_answers": [
            "It is math expression evaluated.",
            "Math expression evaluated."
          ]
        },
        {
          "id": "f4",
          "label": "Calculated final score",
          "cue_prompt": "what / calculated final score?",
          "cue_word": "calculated",
          "is_missing": false,
          "card_value": "Calculated final score verified",
          "value": "Calculated final score verified",
          "examiner_question": "What is the calculated final score?",
          "acceptable_answers": [
            "It is calculated final score.",
            "Calculated final score."
          ]
        },
        {
          "id": "f5",
          "label": "Reflection on progress",
          "cue_prompt": "what / reflection on progress?",
          "cue_word": "reflection",
          "is_missing": false,
          "card_value": "Reflection on progress verified",
          "value": "Reflection on progress verified",
          "examiner_question": "What is the reflection on progress?",
          "acceptable_answers": [
            "It is reflection on progress.",
            "Reflection on progress."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Review Leader B's Info Card",
      "subtitle": "Partner Card",
      "person": "Review Leader B",
      "fields": [
        {
          "id": "fb1",
          "label": "Cycle topic reviewed",
          "cue_prompt": "what / cycle topic reviewed?",
          "cue_word": "cycle",
          "is_missing": false,
          "card_value": "Cycle topic reviewed on file",
          "value": "Cycle topic reviewed on file",
          "examiner_question": "What is the cycle topic reviewed?",
          "acceptable_answers": [
            "It is cycle topic reviewed.",
            "Cycle topic reviewed."
          ]
        },
        {
          "id": "fb2",
          "label": "Grammar pattern mastered",
          "cue_prompt": "what / grammar pattern mastered?",
          "cue_word": "grammar",
          "is_missing": false,
          "card_value": "Grammar pattern mastered on file",
          "value": "Grammar pattern mastered on file",
          "examiner_question": "What is the grammar pattern mastered?",
          "acceptable_answers": [
            "It is grammar pattern mastered.",
            "Grammar pattern mastered."
          ]
        },
        {
          "id": "fb3",
          "label": "Math expression evaluated",
          "cue_prompt": "what / math expression evaluated?",
          "cue_word": "math",
          "is_missing": true,
          "acceptable_questions": [
            "What is the math expression evaluated?",
            "Can you tell me the math expression evaluated?"
          ],
          "nova_reply": "The math expression evaluated is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Calculated final score",
          "cue_prompt": "what / calculated final score?",
          "cue_word": "calculated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the calculated final score?",
            "Can you tell me the calculated final score?"
          ],
          "nova_reply": "The calculated final score is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Reflection on progress",
          "cue_prompt": "what / reflection on progress?",
          "cue_word": "reflection",
          "is_missing": true,
          "acceptable_questions": [
            "What is the reflection on progress?",
            "Can you tell me the reflection on progress?"
          ],
          "nova_reply": "The reflection on progress is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
