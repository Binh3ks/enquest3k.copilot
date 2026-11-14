/**
 * STAGED DELIVERABLE: Round 93 Production Standard
 * Week: 67 | Theme: "The OREO Structure: Persuasive Power" | CEFR: A2 Flyers
 * Generated: 2026-11-14T03:28:50.000Z
 * Pipeline: scripts/round93_data_generator.py
 * Staging Status: STAGED_FOR_REVIEW (Requires Claude ESL Sign-off before merge)
 */

export const speakingHubData = {
  "week": 67,
  "theme": "The OREO Structure: Persuasive Power",
  "cefr_level": "A2 Flyers",
  "talkshow_prompt": "Deliver a 1-minute persuasive speech using the OREO structure. State your opinion on a school rule, give a reason, share an example, and restate your opinion.",
  "info_exchange_cards": {
    "card_a": {
      "role": "Speaker A (Nutrition)",
      "cues": [
        "Persuasive topic chosen",
        "Stated opinion",
        "Core reason provided",
        "Concrete example given",
        "Ingredient mass measured"
      ]
    },
    "card_b": {
      "role": "Speaker B (Nutrition)",
      "cues": [
        "Persuasive topic chosen",
        "Stated opinion",
        "Core reason provided",
        "Concrete example given",
        "Ingredient mass measured"
      ]
    },
    "table_a": {
      "title": "Speaker A (Nutrition)'s Info Card",
      "subtitle": "Candidate Card",
      "person": "Speaker A (Nutrition)",
      "fields": [
        {
          "id": "f1",
          "label": "Persuasive topic chosen",
          "cue_prompt": "what / persuasive topic chosen?",
          "cue_word": "persuasive",
          "is_missing": true,
          "acceptable_questions": [
            "What is the persuasive topic chosen?",
            "Can you tell me the persuasive topic chosen?"
          ],
          "nova_reply": "The persuasive topic chosen is recorded for The OREO Structure: Persuasive Power."
        },
        {
          "id": "f2",
          "label": "Stated opinion",
          "cue_prompt": "what / stated opinion?",
          "cue_word": "stated",
          "is_missing": true,
          "acceptable_questions": [
            "What is the stated opinion?",
            "Can you tell me the stated opinion?"
          ],
          "nova_reply": "The stated opinion is recorded for The OREO Structure: Persuasive Power."
        },
        {
          "id": "f3",
          "label": "Core reason provided",
          "cue_prompt": "what / core reason provided?",
          "cue_word": "core",
          "is_missing": false,
          "card_value": "Core reason provided verified",
          "value": "Core reason provided verified",
          "examiner_question": "What is the core reason provided?",
          "acceptable_answers": [
            "It is core reason provided.",
            "Core reason provided."
          ]
        },
        {
          "id": "f4",
          "label": "Concrete example given",
          "cue_prompt": "what / concrete example given?",
          "cue_word": "concrete",
          "is_missing": false,
          "card_value": "Concrete example given verified",
          "value": "Concrete example given verified",
          "examiner_question": "What is the concrete example given?",
          "acceptable_answers": [
            "It is concrete example given.",
            "Concrete example given."
          ]
        },
        {
          "id": "f5",
          "label": "Ingredient mass measured",
          "cue_prompt": "what / ingredient mass measured?",
          "cue_word": "ingredient",
          "is_missing": false,
          "card_value": "Ingredient mass measured verified",
          "value": "Ingredient mass measured verified",
          "examiner_question": "What is the ingredient mass measured?",
          "acceptable_answers": [
            "It is ingredient mass measured.",
            "Ingredient mass measured."
          ]
        }
      ]
    },
    "table_b": {
      "title": "Speaker B (Nutrition)'s Info Card",
      "subtitle": "Partner Card",
      "person": "Speaker B (Nutrition)",
      "fields": [
        {
          "id": "fb1",
          "label": "Persuasive topic chosen",
          "cue_prompt": "what / persuasive topic chosen?",
          "cue_word": "persuasive",
          "is_missing": false,
          "card_value": "Persuasive topic chosen on file",
          "value": "Persuasive topic chosen on file",
          "examiner_question": "What is the persuasive topic chosen?",
          "acceptable_answers": [
            "It is persuasive topic chosen.",
            "Persuasive topic chosen."
          ]
        },
        {
          "id": "fb2",
          "label": "Stated opinion",
          "cue_prompt": "what / stated opinion?",
          "cue_word": "stated",
          "is_missing": false,
          "card_value": "Stated opinion on file",
          "value": "Stated opinion on file",
          "examiner_question": "What is the stated opinion?",
          "acceptable_answers": [
            "It is stated opinion.",
            "Stated opinion."
          ]
        },
        {
          "id": "fb3",
          "label": "Core reason provided",
          "cue_prompt": "what / core reason provided?",
          "cue_word": "core",
          "is_missing": true,
          "acceptable_questions": [
            "What is the core reason provided?",
            "Can you tell me the core reason provided?"
          ],
          "nova_reply": "The core reason provided is confirmed in our notes."
        },
        {
          "id": "fb4",
          "label": "Concrete example given",
          "cue_prompt": "what / concrete example given?",
          "cue_word": "concrete",
          "is_missing": true,
          "acceptable_questions": [
            "What is the concrete example given?",
            "Can you tell me the concrete example given?"
          ],
          "nova_reply": "The concrete example given is confirmed in our notes."
        },
        {
          "id": "fb5",
          "label": "Ingredient mass measured",
          "cue_prompt": "what / ingredient mass measured?",
          "cue_word": "ingredient",
          "is_missing": true,
          "acceptable_questions": [
            "What is the ingredient mass measured?",
            "Can you tell me the ingredient mass measured?"
          ],
          "nova_reply": "The ingredient mass measured is confirmed in our notes."
        }
      ]
    }
  }
};
export default speakingHubData;
