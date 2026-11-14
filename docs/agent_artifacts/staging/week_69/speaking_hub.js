/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 69 | Theme: "Environmental Protection: Eco-Warriors" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 69,
  "theme": "Environmental Protection: Eco-Warriors",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute speech encouraging people to adopt green habits. Use modal verbs like 'must', 'should', and 'ought to' to give persuasive advice.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Eco-Warrior A",
      "cues": [
        "Environmental issue targeted",
        "Modal verb rule stated",
        "Volunteer line plot data",
        "Total hours calculated",
        "Long-term conservation goal"
      ]
    },
    "card_b": {
      "role": "Eco-Warrior B",
      "cues": [
        "Environmental issue targeted",
        "Modal verb rule stated",
        "Volunteer line plot data",
        "Total hours calculated",
        "Long-term conservation goal"
      ]
    },
    "table_a": {
      "title": "Eco-Warrior A's Info Card",
      "subtitle": "Candidate Card",
      "person": "Eco-Warrior A",
      "fields": [
        {
          "id": "f1",
          "label": "Environmental issue targeted",
          "cue_prompt": "what / environmental issue targeted?",
          "cue_word": "environmental",
          "is_missing": true,
          "acceptable_questions": [
            "What is the environmental issue targeted?",
            "Can you tell me the environmental issue targeted?"
          ],
          "nova_reply": "The environmental issue targeted is recorded for Environmental Protection: Eco-Warriors."
        },
        {
          "id": "f2",
          "label": "Modal verb rule stated",
          "cue_prompt": "what / modal verb rule stated?",
          "cue_word": "modal",
          "is_missing": true,
          "acceptable_questions": [
            "What is the modal verb rule stated?",
            "Can you tell me the modal verb rule stated?"
          ],
          "nova_reply": "The modal verb rule stated is recorded for Environmental Protection: Eco-Warriors."
        },
        {
          "id": "f3",
          "label": "Volunteer line plot data",
          "cue_prompt": "what / volunteer line plot data?",
          "cue_word": "volunteer",
          "is_missing": false,
          "card_value": "Volunteer line plot data verified",
          "value": "Volunteer line plot data verified",
          "examiner_question": "What is the volunteer line plot data?",
          "acceptable_answers": [
            "It is volunteer line plot data.",
            "Volunteer line plot data."
          ]
        },
        {
          "id": "f4",
          "label": "Total hours calculated",
          "cue_prompt": "what / total hours calculated?",
          "cue_word": "total",
          "is_missing": false,
          "card_value": "Total hours calculated verified",
          "value": "Total hours calculated verified",
          "examiner_question": "What is the total hours calculated?",
          "acceptable_answers": [
            "It is total hours calculated.",
            "Total hours calculated."
          ]
        },
        {
          "id": "f5",
          "label": "Long-term conservation goal",
          "cue_prompt": "what / long-term conservation goal?",
          "cue_word": "long-term",
          "is_missing": false,
          "card_value": "Long-term conservation goal verified",
          "value": "Long-term conservation goal verified",
          "examiner_question": "What is the long-term conservation goal?",
          "acceptable_answers": [
            "It is long-term conservation goal.",
            "Long-term conservation goal."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Eco-Warrior B's Info Card",
      "subtitle": "Partner Card",
      "person": "Eco-Warrior B",
      "fields": [
        {
          "id": "fb1",
          "label": "Environmental issue targeted",
          "cue_prompt": "what / environmental issue targeted?",
          "cue_word": "environmental",
          "is_missing": false,
          "card_value": "Environmental issue targeted on file",
          "value": "Environmental issue targeted on file",
          "examiner_question": "What is the environmental issue targeted?",
          "acceptable_answers": [
            "It is environmental issue targeted.",
            "Environmental issue targeted."
          ]
        },
        {
          "id": "fb2",
          "label": "Modal verb rule stated",
          "cue_prompt": "what / modal verb rule stated?",
          "cue_word": "modal",
          "is_missing": false,
          "card_value": "Modal verb rule stated on file",
          "value": "Modal verb rule stated on file",
          "examiner_question": "What is the modal verb rule stated?",
          "acceptable_answers": [
            "It is modal verb rule stated.",
            "Modal verb rule stated."
          ]
        },
        {
          "id": "fb3",
          "label": "Volunteer line plot data",
          "cue_prompt": "what / volunteer line plot data?",
          "cue_word": "volunteer",
          "is_missing": true,
          "acceptable_questions": [
            "What is the volunteer line plot data?",
            "Can you tell me the volunteer line plot data?"
          ],
          "nova_reply": "The volunteer line plot data is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Total hours calculated",
          "cue_prompt": "what / total hours calculated?",
          "cue_word": "total",
          "is_missing": true,
          "acceptable_questions": [
            "What is the total hours calculated?",
            "Can you tell me the total hours calculated?"
          ],
          "nova_reply": "The total hours calculated is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Long-term conservation goal",
          "cue_prompt": "what / long-term conservation goal?",
          "cue_word": "long-term",
          "is_missing": true,
          "acceptable_questions": [
            "What is the long-term conservation goal?",
            "Can you tell me the long-term conservation goal?"
          ],
          "nova_reply": "The long-term conservation goal is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
